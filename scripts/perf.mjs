#!/usr/bin/env node
// Reproducible performance numbers for the live page, so a change can be compared before/after.
// Every run starts a fresh headless Chromium, loads the page with the cache disabled and records:
//   network  requests + encoded bytes by resource type, finished by first content and by network idle
//   timing   DOMContentLoaded, app.js / manifest / last component module, #boot hidden, first .row in #flow
//            (= first content), fonts ready, FCP, LCP, long tasks + blocking time (navigation → first content + 3 s)
//   main     Performance.getMetrics at first content and at load idle
//   idle     main-thread cost of 5 s with no input (animation loops, timers, CSS animations), at rest and
//            again after the scroll session; plus running animations and live rows/elements
//   scroll   40 viewport-height steps: wall time, main-thread cost, long tasks, frame gaps, live DOM, WebGL
//   top      memory after scrolling back to the top and a forced GC
// stdout is JSON { meta, median, perRun } with stable keys (median of every number across runs); a table goes
// to stderr. Durations are ms, heap is MB. Math.random is seeded in the page (--seed N, 0 = off) so every run
// shows the same feed; otherwise run-to-run noise is mostly "which elements happened to come up".
//
// Usage: node scripts/perf.mjs [url] [--runs N] [--json out.json] [--seed N]   (default http://127.0.0.1:4173/?bundle, 3 runs)
// Needs the dev server and a Chromium binary: set CHROME=/path/to/binary, or it looks in the Playwright cache.
import { spawn } from 'node:child_process';
import { readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir, cpus, loadavg } from 'node:os';

const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args.splice(i, 2)[1] : null; };
const RUNS = Math.max(1, +(flag('--runs') || 3));
const jsonOut = flag('--json');
const SEED = +(flag('--seed') ?? 1);
const URL_ = args[0] || 'http://127.0.0.1:4173/?bundle'; // ?bundle: load components/bundle.js like the deployed page does
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const r1 = (v) => Math.round(v * 10) / 10;
const within = (p, ms, what) => { let t; return Promise.race([p, new Promise((_, j) => (t = setTimeout(() => j(new Error(what + ' timed out')), ms)))]).finally(() => clearTimeout(t)); };

function findChrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const cache = join(homedir(), 'Library/Caches/ms-playwright');
  if (existsSync(cache)) {
    const dirs = readdirSync(cache).filter((d) => d.startsWith('chromium_headless_shell-')).sort().reverse();
    for (const d of dirs) {
      const p = join(cache, d, 'chrome-headless-shell-mac-arm64/chrome-headless-shell');
      if (existsSync(p)) return p;
    }
  }
  for (const p of ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge']) if (existsSync(p)) return p;
  throw new Error('No Chromium found; set CHROME=/path/to/binary');
}
const FLAGS = ['--headless=new', '--remote-debugging-port=0', '--window-size=1280,900', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-first-run', '--no-default-browser-check', '--disable-dev-shm-usage', ...(process.getuid?.() === 0 ? ['--no-sandbox'] : []), 'about:blank'];

// ---- in-page instrumentation: installed with Page.addScriptToEvaluateOnNewDocument, before app.js runs ----
function instrument(seed) {
  if (window !== top) return;
  const P = (window.__perf = { t: {}, longtasks: [], lcp: null, raf: 0, timers: 0, gl: { created: 0, lost: 0, loseCalls: 0, createMs: 0 }, glOf: new WeakMap() });
  const now = () => Math.round(performance.now());
  if (seed) { // mulberry32: same shuffle, same feed, every run
    let s = seed | 0;
    Math.random = () => { let t = (s = (s + 0x6d2b79f5) | 0); t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const observe = (type, fn) => { try { new PerformanceObserver((l) => l.getEntries().forEach(fn)).observe({ type, buffered: true }); } catch {} };
  observe('longtask', (e) => P.longtasks.push([Math.round(e.startTime), Math.round(e.duration)]));
  observe('largest-contentful-paint', (e) => (P.lcp = Math.round(e.startTime)));
  // scheduled work: every requestAnimationFrame / setTimeout call and every setInterval tick
  const raf = window.requestAnimationFrame, st = window.setTimeout, si = window.setInterval;
  window.requestAnimationFrame = (cb) => { P.raf++; return raf.call(window, cb); };
  window.setTimeout = (...a) => { P.timers++; return st.apply(window, a); };
  window.setInterval = (fn, ...a) => si.call(window, typeof fn === 'function' ? (...x) => { P.timers++; fn(...x); } : fn, ...a);
  // WebGL: contexts created (and main-thread time spent creating them), contexts lost (released, or evicted by
  // the browser's context limit), explicit loseContext() calls; glOf lets liveState find the live ones
  const getContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...a) {
    const t = performance.now(), ctx = getContext.call(this, type, ...a);
    if (ctx && /webgl/i.test(type) && !P.glOf.has(this)) {
      P.glOf.set(this, ctx); P.gl.created++; P.gl.createMs += performance.now() - t;
      this.addEventListener('webglcontextlost', () => P.gl.lost++);
    }
    return ctx;
  };
  for (const C of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) {
    const getExtension = C?.prototype.getExtension;
    if (getExtension) C.prototype.getExtension = function (name) {
      const x = getExtension.call(this, name);
      if (x && /lose_context/i.test(name) && !x.__perf) { x.__perf = 1; const lose = x.loseContext; x.loseContext = function () { P.gl.loseCalls++; return lose.call(this); }; }
      return x;
    };
  }
  // marks. At readyState 'interactive' the body is parsed but app.js (a deferred module) has not run yet.
  document.addEventListener('DOMContentLoaded', () => (P.t.domContentLoaded = now()));
  document.addEventListener('readystatechange', () => {
    if (document.readyState !== 'interactive') return;
    const flow = document.getElementById('flow'), boot = document.getElementById('boot');
    if (boot) new MutationObserver((_, o) => { if (boot.classList.contains('hidden')) { o.disconnect(); P.t.bootHidden = now(); } }).observe(boot, { attributes: true });
    if (flow) new MutationObserver((_, o) => {
      if (!flow.querySelector(':scope > .row')) return;
      o.disconnect(); P.t.firstContent = now();
      window.__perfBinding?.('firstContent'); // tells the script to grab Performance.getMetrics now
    }).observe(flow, { childList: true });
  });
  document.fonts?.ready.then(() => { P.t.fontsReady = now(); P.fontsStatusAtReady = document.fonts.status; });
}

// in-page probes (passed to Runtime.evaluate as source)
function liveState() {
  const items = [...document.querySelectorAll('#flow .item')], pooled = [...document.querySelectorAll('#measure .item')];
  // Each element lives in its own shadow root. In Chrome neither document.getAnimations() nor
  // host.getAnimations({ subtree: true }) reaches into shadow trees (both return 0 here), so ask each shadow root.
  const anims = (hosts) => hosts.flatMap((h) => h.getAnimations().concat(h.shadowRoot ? h.shadowRoot.getAnimations() : []));
  const running = (l) => l.filter((a) => a.playState === 'running').length;
  const inItems = anims(items);
  const glLive = items.concat(pooled).flatMap((h) => [...(h.shadowRoot?.querySelectorAll('canvas') || [])]).filter((c) => __perf.glOf.get(c)?.isContextLost() === false).length;
  return { rows: document.querySelectorAll('#flow > .row').length, items: items.length, pooled: pooled.length, webglInDom: glLive,
    animations: { inItems: inItems.length, inItemsRunning: running(inItems), inPoolRunning: running(anims(pooled)) } };
}
// frames the page actually gets per second (60 on real hardware; lower means the compositor/GPU is starved)
async function fps() {
  let n = 0; const t0 = performance.now();
  await new Promise((r) => requestAnimationFrame(function f() { n++; performance.now() - t0 < 1000 ? requestAnimationFrame(f) : r(); }));
  return Math.round((n * 1000) / (performance.now() - t0));
}
async function scrollSession(steps) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const gaps = []; let on = true, last = null;
  const tick = (t) => { if (last != null) gaps.push(t - last); last = t; if (on) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  // Scroll to absolute targets one viewport apart, so every run covers the same distance and mounts the same
  // elements, even when the page shifts underneath (scroll anchoring, the measuring pool changing height).
  // Before each step wait (at most 3 s) until the feed has real rows down to the new viewport's bottom.
  const sentinelY = () => document.getElementById('sentinel').getBoundingClientRect().top + scrollY;
  const t0 = performance.now(), y0 = scrollY;
  let y = y0, waitMs = 0;
  for (let i = 0; i < steps; i++) {
    y += innerHeight;
    const w0 = performance.now();
    while (sentinelY() < y + innerHeight && performance.now() - w0 < 3000) await sleep(50);
    waitMs += performance.now() - w0;
    scrollTo(0, y);
    await sleep(150);
  }
  const t1 = performance.now(); on = false;
  const scrolledPx = Math.round(scrollY - y0);
  await sleep(300); // let the long-task observer deliver the session's last entries
  const lt = __perf.longtasks.filter(([s]) => s >= t0 && s <= t1);
  gaps.sort((a, b) => a - b);
  return { t0: Math.round(t0), t1: Math.round(t1), wallMs: Math.round(t1 - t0), waitMs: Math.round(waitMs), scrolledPx, longTasks: lt.length, tbtMs: lt.reduce((s, [, d]) => s + Math.max(0, d - 50), 0),
    frames: { count: gaps.length, over50: gaps.filter((g) => g > 50).length, over100: gaps.filter((g) => g > 100).length,
      p95Ms: Math.round(gaps[Math.floor(gaps.length * 0.95)] || 0), maxGapMs: Math.round(gaps.at(-1) || 0) } };
}
function pageTimings() {
  const P = __perf, fc = P.t.firstContent ?? Infinity;
  const lt = P.longtasks.filter(([s]) => s <= fc + 3000);
  const fcp = performance.getEntriesByType('paint').find((e) => e.name === 'first-contentful-paint');
  const faces = [...document.fonts];
  return { timeOrigin: performance.timeOrigin, t: P.t, fcp: fcp ? Math.round(fcp.startTime) : null, lcp: P.lcp, longTasks: lt.length, tbtMs: lt.reduce((s, [, d]) => s + Math.max(0, d - 50), 0),
    fonts: { status: document.fonts.status, statusAtReady: P.fontsStatusAtReady ?? null, faces: faces.length, facesLoaded: faces.filter((f) => f.status === 'loaded').length } };
}

// Performance.getMetrics names → output keys (durations s → ms, heap bytes → MB)
const MET = { taskMs: 'TaskDuration', scriptMs: 'ScriptDuration', layoutMs: 'LayoutDuration', recalcStyleMs: 'RecalcStyleDuration', layoutCount: 'LayoutCount', recalcStyleCount: 'RecalcStyleCount', heapMB: 'JSHeapUsedSize', nodes: 'Nodes', listeners: 'JSEventListeners' };
const ALL = Object.keys(MET), COST = ['taskMs', 'scriptMs', 'layoutMs', 'layoutCount', 'recalcStyleMs', 'recalcStyleCount'];
const conv = (k, v) => (k.endsWith('Ms') ? r1(v * 1000) : k === 'heapMB' ? r1(v / 1048576) : v);
const pick = (m, keys = ALL) => Object.fromEntries(keys.map((k) => [k, conv(k, m[MET[k]])]));
const delta = (a, b, keys = COST) => Object.fromEntries(keys.map((k) => [k, conv(k, b[MET[k]] - a[MET[k]])]));
const TYPES = ['Document', 'Script', 'Stylesheet', 'Font', 'Image', 'Other'];
function tally(list) {
  const out = { requests: list.length, bytes: 0, failed: 0, byType: Object.fromEntries(TYPES.map((t) => [t, { requests: 0, bytes: 0 }])) };
  for (const r of list) { const b = out.byType[TYPES.includes(r.type) ? r.type : 'Other']; b.requests++; b.bytes += r.bytes; out.bytes += r.bytes; out.failed += r.failed ? 1 : 0; }
  return out;
}

// ---- one run: fresh browser → load → idle → scroll → idle → top -------------------------------------------
const procs = new Set();
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => { for (const p of procs) p.kill('SIGKILL'); process.exit(130); }); // never orphan a browser
let chromeVersion = null;
async function runOnce() {
  const loadAtStart = loadavg()[0];
  const chrome = spawn(findChrome(), FLAGS, { stdio: ['ignore', 'ignore', 'pipe'] });
  procs.add(chrome);
  let ws;
  try {
    const wsUrl = await new Promise((res, rej) => {
      let buf = '';
      chrome.stderr.on('data', (d) => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) { res(m[1]); buf = ''; } }); // dbus noise etc. is ignored
      chrome.on('exit', (c) => rej(new Error('chrome exited ' + c)));
      setTimeout(() => rej(new Error('chrome did not start')), 15000);
    });
    ws = new WebSocket(wsUrl);
    await within(new Promise((r, j) => { ws.onopen = r; ws.onerror = () => j(new Error('websocket error')); }), 10000, 'websocket');
    let id = 0;
    const pending = new Map(), on = {};
    ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } else if (m.method) on[m.method]?.(m.params); };
    const send = (method, params = {}, sessionId, ms = 30000) => within(new Promise((res, rej) => {
      const i = ++id;
      pending.set(i, (m) => (m.error ? rej(new Error(`${method}: ${m.error.message}`)) : res(m.result)));
      ws.send(JSON.stringify({ id: i, method, params, sessionId }));
    }), ms, method);
    chromeVersion = (await send('Browser.getVersion')).product;
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
    const S = (method, params, ms) => send(method, params, sessionId, ms);
    const evaluate = async (fn, arg, ms) => {
      const r = await S('Runtime.evaluate', { expression: `(${fn})(${JSON.stringify(arg ?? null)})`, awaitPromise: true, returnByValue: true }, ms);
      if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 500));
      return r.result.value;
    };
    const metrics = async () => Object.fromEntries((await S('Performance.getMetrics')).metrics.map((m) => [m.name, m.value]));

    // network log (http/https only; data: and blob: URLs are not requests). Timestamps are CDP monotonic seconds.
    const reqs = new Map();
    let lastNet = Date.now();
    on['Network.requestWillBeSent'] = (p) => { if (/^https?:/.test(p.request.url)) { reqs.set(p.requestId, { url: p.request.url, type: p.type || 'Other', start: p.timestamp, wall: p.wallTime, end: null, bytes: 0, status: 0, failed: false }); lastNet = Date.now(); } };
    on['Network.responseReceived'] = (p) => { const r = reqs.get(p.requestId); if (r) r.status = p.response.status; };
    on['Network.loadingFinished'] = (p) => { const r = reqs.get(p.requestId); if (r) { r.end = p.timestamp; r.bytes = p.encodedDataLength; lastNet = Date.now(); } };
    on['Network.loadingFailed'] = (p) => { const r = reqs.get(p.requestId); if (r) { r.end = p.timestamp; r.failed = true; lastNet = Date.now(); } };
    let gotFirst;
    const firstMetrics = new Promise((r) => (gotFirst = r));
    on['Runtime.bindingCalled'] = (p) => p.name === '__perfBinding' && gotFirst(metrics());

    for (const m of ['Page.enable', 'Runtime.enable', 'Network.enable', 'Performance.enable']) await S(m);
    await S('Network.setCacheDisabled', { cacheDisabled: true });
    await S('Runtime.addBinding', { name: '__perfBinding' });
    await S('Page.addScriptToEvaluateOnNewDocument', { source: `(${instrument})(${SEED})` });
    const t0 = Date.now();
    await S('Page.navigate', { url: URL_ + (URL_.includes('?') ? '&' : '?') + 'perf=' + t0 });

    // load idle = first content is in and the network has been quiet for 500 ms (capped at 15 s after navigation)
    const mFirst = await within(firstMetrics, 30000, 'first .row');
    const inflight = () => [...reqs.values()].filter((r) => r.end == null).length;
    while (Date.now() - t0 < 15000 && (inflight() > 0 || Date.now() - lastNet < 500)) await sleep(50);
    const netCapped = inflight() > 0;
    const loadReqs = [...reqs.values()];
    const mIdle = await metrics();

    // 5 s with no input: whatever the main thread does now is pure overhead (rAF loops, intervals, CSS animations)
    const idle = async () => {
      const c0 = await evaluate(() => ({ raf: __perf.raf, timers: __perf.timers }));
      const a = await metrics(); await sleep(5000); const b = await metrics();
      const c1 = await evaluate(() => ({ raf: __perf.raf, timers: __perf.timers }));
      return { ...delta(a, b), rafCalls: c1.raf - c0.raf, timerCalls: c1.timers - c0.timers, ...(await evaluate(liveState)), fps: await evaluate(fps) };
    };
    const idleAtRest = await idle();
    const page = await evaluate(pageTimings); // after first content + 3 s, so the long-task window is complete

    const s0 = await metrics();
    const sc = await evaluate(scrollSession, 40, 300000);
    const s1 = await metrics();
    const afterScroll = await evaluate(liveState);
    const gl = await evaluate(() => __perf.gl); // cumulative since navigation
    const idleAfterScroll = await idle();

    await evaluate(async () => { scrollTo(0, 0); await new Promise((r) => setTimeout(r, 1000)); });
    await S('HeapProfiler.collectGarbage', {}, 60000);
    const mTop = await metrics();

    // CDP monotonic seconds → ms since navigation start (the page's performance.timeOrigin), via the document request
    const doc = loadReqs.find((r) => r.type === 'Document');
    const ms = (ts) => (ts == null ? null : Math.round((ts - doc.start) * 1000 + doc.wall * 1000 - page.timeOrigin));
    const origin = new URL(URL_).origin;
    const path = (r) => (r.url.startsWith(origin) ? new URL(r.url).pathname : '');
    const lastEnd = (re) => { const l = loadReqs.filter((r) => re.test(path(r)) && r.end != null).map((r) => ms(r.end)); return l.length ? Math.max(...l) : null; };
    const fc = page.t.firstContent;
    const gfonts = loadReqs.filter((r) => /^https:\/\/fonts\.(googleapis|gstatic)\.com\//.test(r.url));
    const scrollReqs = [...reqs.values()].filter((r) => ms(r.start) >= sc.t0 && ms(r.start) <= sc.t1);
    return {
      load1m: r1(loadAtStart), // 1-minute load average when the run started: other busy processes skew everything
      network: {
        firstContent: tally(loadReqs.filter((r) => r.end != null && ms(r.end) <= fc)),
        idle: tally(loadReqs),
        idleMs: Math.max(...loadReqs.map((r) => ms(r.end) ?? 0)), idleCapped: netCapped,
      },
      timing: {
        domContentLoadedMs: page.t.domContentLoaded ?? null, appJsMs: lastEnd(/^\/app\.js$/), manifestMs: lastEnd(/^\/components\/manifest\.js$/),
        lastComponentModuleMs: lastEnd(/^\/components\/[^/]+\/[^/]+\.js$/), componentModules: loadReqs.filter((r) => /^\/components\/[^/]+\/[^/]+\.js$/.test(path(r))).length,
        lastFontMs: Math.max(0, ...loadReqs.filter((r) => r.type === 'Font' && r.end != null).map((r) => ms(r.end))) || null,
        bootHiddenMs: page.t.bootHidden ?? null, firstContentMs: fc ?? null, fontsReadyMs: page.t.fontsReady ?? null, fcpMs: page.fcp, lcpMs: page.lcp,
        longTasks: page.longTasks, tbtMs: page.tbtMs,
      },
      fonts: { googleRequests: gfonts.length, googleOk: gfonts.filter((r) => !r.failed && r.status > 0 && r.status < 400).length, googleFailed: gfonts.filter((r) => r.failed || r.status >= 400).length, ...page.fonts },
      main: { firstContent: pick(mFirst), loadIdle: pick(mIdle) },
      idleAtRest,
      scroll: {
        wallMs: sc.wallMs, waitMs: sc.waitMs, scrolledPx: sc.scrolledPx, ...delta(s0, s1), longTasks: sc.longTasks, tbtMs: sc.tbtMs, frames: sc.frames,
        requests: scrollReqs.length, bytes: scrollReqs.reduce((s, r) => s + r.bytes, 0),
        rows: afterScroll.rows, items: afterScroll.items, nodes: s1.Nodes, heapMB: conv('heapMB', s1.JSHeapUsedSize),
        webgl: { created: gl.created, lost: gl.lost, loseCalls: gl.loseCalls, notLost: gl.created - gl.lost, inDom: afterScroll.webglInDom, createMs: Math.round(gl.createMs) },
      },
      idleAfterScroll,
      top: pick(mTop, ['nodes', 'heapMB', 'listeners']),
    };
  } finally {
    try { ws?.close(); } catch {}
    chrome.kill();
    await within(new Promise((r) => (chrome.exitCode != null ? r() : chrome.once('exit', r))), 3000, 'chrome exit').catch(() => chrome.kill('SIGKILL'));
    procs.delete(chrome);
  }
}

// ---- runs → medians ------------------------------------------------------------------------------------
const median = (xs) => { const s = xs.filter((x) => typeof x === 'number').sort((a, b) => a - b); const m = s.length >> 1; return !s.length ? null : s.length % 2 ? s[m] : r1((s[m - 1] + s[m]) / 2); };
const agg = (list) => { const v = list.find((x) => x != null); if (typeof v === 'number') return median(list); if (v && typeof v === 'object') return Object.fromEntries(Object.keys(v).map((k) => [k, agg(list.map((x) => x?.[k]))])); return v ?? null; };
const flat = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, p + k + '.') : [[p + k, v]]));

const perRun = [], errors = [];
for (let i = 0; i < RUNS; i++) {
  try {
    const r = await within(runOnce(), 600000, 'run');
    perRun.push(r);
    console.error(`run ${i + 1}/${RUNS}: first content ${r.timing.firstContentMs} ms, scroll ${r.scroll.wallMs} ms, idle task ${r.idleAtRest.taskMs} ms/5 s`);
  } catch (e) { errors.push(String(e?.message || e)); console.error(`run ${i + 1}/${RUNS} failed: ${e?.message || e}`); }
}
const out = { meta: { url: URL_, runs: RUNS, ok: perRun.length, seed: SEED, chrome: chromeVersion, viewport: '1280x900', cpus: cpus().length, date: new Date().toISOString(), errors }, median: perRun.length ? agg(perRun) : null, perRun };
console.log(JSON.stringify(out, null, 2));
if (jsonOut) writeFileSync(jsonOut, JSON.stringify(out, null, 2) + '\n');
if (out.median) {
  // table: every number that is not zero in all runs; median, then each run
  const per = perRun.map((r) => new Map(flat(r)));
  console.error('\n' + 'metric'.padEnd(46) + 'median'.padStart(10) + '   runs');
  for (const [k, v] of flat(out.median)) if (typeof v === 'number' && per.some((m) => m.get(k))) console.error(k.padEnd(46) + String(v).padStart(10) + '   ' + per.map((m) => m.get(k)).join(' / '));
}
for (const p of procs) p.kill('SIGKILL');
process.exit(perRun.length ? 0 : 1);
