#!/usr/bin/env node
// Performance benchmark: loads the page in headless Chromium and reports, per run, the load timeline
// (requests, bytes, time to first rows), scroll-stress frame times and long tasks, idle CPU
// (animation loops running while nobody interacts) and heap / DOM size after the stress.
// Usage: node scripts/bench.mjs [url] [--runs=3] [--net=local|4g|3g] [--json=file]
// Needs a Chromium binary: set CHROME=/path/to/binary, or it looks in the Playwright cache.
import { spawn } from 'node:child_process';
import { readdirSync, existsSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const args = process.argv.slice(2);
const opt = (k, d) => { const a = args.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };
const URL_ = args.find((a) => !a.startsWith('--')) || 'http://127.0.0.1:4173/';
const RUNS = +opt('runs', 3);
const NET = opt('net', 'local');
const JSON_OUT = opt('json', '');
const NETS = {
  local: null,
  // latency in ms, throughput in bytes/s (Chrome's presets: "Fast 4G" ≈ 20ms/9Mbps, "Slow 4G" ≈ 150ms/1.6Mbps)
  '4g': { latency: 40, downloadThroughput: (9 * 1024 * 1024) / 8, uploadThroughput: (1.5 * 1024 * 1024) / 8 },
  '3g': { latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 },
};

// Prefer a full Chromium (new headless mode has a real compositor, so requestAnimationFrame ticks at
// display rate); chrome-headless-shell only produces frames on demand, which skews frame-time metrics.
function findChrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const cache = join(homedir(), 'Library/Caches/ms-playwright');
  if (existsSync(cache)) {
    const dirs = readdirSync(cache).filter((d) => d.startsWith('chromium-')).sort().reverse();
    for (const d of dirs) {
      const p = join(cache, d, 'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing');
      if (existsSync(p)) return p;
    }
  }
  for (const p of ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge']) if (existsSync(p)) return p;
  throw new Error('No Chromium found; set CHROME=/path/to/binary');
}

const PROFILE = args.includes('--profile');
// --swiftshader forces software WebGL (deterministic but ~100x slower context creation than a GPU)
const GL = args.includes('--swiftshader') ? ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] : [];
const chrome = spawn(findChrome(), ['--headless=new', '--remote-debugging-port=0', '--window-size=1280,900', ...GL, '--no-first-run', '--use-mock-keychain', '--no-default-browser-check', '--disable-background-timer-throttling', '--user-data-dir=' + join(process.env.TMPDIR || '/tmp', 'buttons-bench-' + process.pid), 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
const cleanup = () => { try { chrome.kill(); } catch {} try { rmSync(join(process.env.TMPDIR || '/tmp', 'buttons-bench-' + process.pid), { recursive: true, force: true }); } catch {} };
process.on('exit', cleanup);
process.on('uncaughtException', (e) => { console.error(e); cleanup(); process.exit(1); });
const wsUrl = await new Promise((res, rej) => {
  let buf = '';
  chrome.stderr.on('data', (d) => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) res(m[1]); });
  chrome.on('exit', (c) => rej(new Error('chrome exited ' + c)));
  setTimeout(() => rej(new Error('chrome did not start')), 15000);
});

const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
const listeners = new Set();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  else if (m.method) for (const l of listeners) l(m);
};
const send = (method, params = {}, sessionId) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Installed before any page script runs: timeline marks, counters for animation loops, and a seeded
// Math.random so every run (and every before/after pair) mounts the same sequence of elements.
const prelude = (seed) => `(() => {
  let s = ${seed >>> 0};
  Math.random = () => { s += 0x6D2B79F5; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const B = window.__bench = { t: {}, raf: 0, intervals: 0, frames: [], longTasks: [] };
  const mo = new MutationObserver(() => {
    const boot = document.getElementById('boot');
    if (boot && boot.classList.contains('hidden') && !B.t.loaded) B.t.loaded = performance.now();
    const flow = document.getElementById('flow');
    if (flow && !B.t.firstRow && flow.querySelector(':scope > .row')) B.t.firstRow = performance.now();
    if (B.t.firstRow && !B.t.filled && document.documentElement.scrollHeight > innerHeight + 200) B.t.filled = performance.now();
  });
  mo.observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] }); // documentElement may not exist yet
  const raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => raf((t) => { B.raf++; cb(t); });
  const si = window.setInterval.bind(window), ci = window.clearInterval.bind(window);
  const live = new Set();
  window.setInterval = (...a) => { const h = si(...a); live.add(h); B.intervals = live.size; return h; };
  window.clearInterval = (h) => { live.delete(h); B.intervals = live.size; return ci(h); };
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) B.longTasks.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: 'longtask', buffered: true }); } catch (e) { B.err = String(e); }
  // frame-time recorder, started on demand
  B.recordFrames = (ms) => new Promise((done) => {
    B.frames = []; let last = performance.now(); const end = last + ms;
    const tick = (t) => { B.frames.push(t - last); last = t; if (t < end) raf(tick); else done(B.frames); };
    raf(tick);
  });
})();`;
// sanity check: the prelude must parse and define the recorder
{
  const w = { requestAnimationFrame() {}, setInterval() {}, clearInterval() {} };
  const g = { window: w, document: { getElementById() { return null; }, documentElement: {} }, MutationObserver: class { observe() {} }, PerformanceObserver: class { observe() {} }, performance: { now: () => 0 } };
  new Function(...Object.keys(g), prelude(1))(...Object.values(g));
  if (typeof w.__bench.recordFrames !== 'function') throw new Error('prelude broken');
}

const metricsOf = async (sessionId) => {
  const { result: { metrics } } = await send('Performance.getMetrics', {}, sessionId);
  return Object.fromEntries(metrics.map((m) => [m.name, m.value]));
};
const pct = (arr, p) => { const a = [...arr].sort((x, y) => x - y); return a.length ? a[Math.min(a.length - 1, Math.floor(p * a.length))] : 0; };
const round = (n, d = 0) => Math.round(n * 10 ** d) / 10 ** d;

async function runOnce(n) {
  const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
  const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
  await send('Page.enable', {}, sessionId);
  await send('Network.enable', {}, sessionId);
  await send('Network.setCacheDisabled', { cacheDisabled: true }, sessionId);
  if (NETS[NET]) await send('Network.emulateNetworkConditions', { offline: false, ...NETS[NET] }, sessionId);
  await send('Performance.enable', {}, sessionId);
  await send('HeapProfiler.enable', {}, sessionId);
  await send('Page.addScriptToEvaluateOnNewDocument', { source: prelude(1000 + n) }, sessionId);

  // network accounting
  const reqs = new Map();
  const onEvent = (m) => {
    if (m.sessionId !== sessionId) return;
    if (m.method === 'Network.requestWillBeSent') reqs.set(m.params.requestId, { url: m.params.request.url, type: m.params.type, bytes: 0, done: false, t0: m.params.timestamp });
    if (m.method === 'Network.responseReceived') { const r = reqs.get(m.params.requestId); if (r) { r.type = m.params.type; r.status = m.params.response.status; } }
    if (m.method === 'Network.loadingFinished') { const r = reqs.get(m.params.requestId); if (r) { r.bytes = m.params.encodedDataLength; r.done = true; r.t1 = m.params.timestamp; } }
  };
  listeners.add(onEvent);

  const evaluate = async (fn, ...a) => {
    const r = await send('Runtime.evaluate', { expression: `(${fn})(${a.map((x) => JSON.stringify(x)).join(',')})`, awaitPromise: true, returnByValue: true }, sessionId);
    if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 500));
    return r.result.result.value;
  };

  const t0 = Date.now();
  await send('Page.navigate', { url: URL_ + (URL_.includes('?') ? '&' : '?') + 'bench=' + Date.now() }, sessionId);
  // wait until the first screen is filled (or give up after 30s)
  for (let i = 0; i < 300; i++) {
    const t = await evaluate(() => window.__bench && window.__bench.t);
    if (t && t.filled) break;
    await sleep(100);
  }
  await sleep(500); // let stragglers (fonts, images) land
  const marks = await evaluate(() => window.__bench.t);
  const appMarks = await evaluate(() => Object.fromEntries(performance.getEntriesByType('mark').filter((m) => m.name.startsWith('buttons:')).map((m) => [m.name.slice(8), Math.round(m.startTime)])));
  const loadReqs = [...reqs.values()];
  const byType = {};
  for (const r of loadReqs) { const k = (r.type || 'Other').toLowerCase(); byType[k] = byType[k] || { n: 0, kb: 0 }; byType[k].n++; byType[k].kb += r.bytes / 1024; }
  for (const k in byType) byType[k].kb = round(byType[k].kb);
  const thirdParty = loadReqs.filter((r) => !r.url.startsWith(URL_.split('/').slice(0, 3).join('/')));
  const navT0 = Math.min(...loadReqs.map((r) => r.t0));
  const scripts = loadReqs.filter((r) => r.type === 'Script' && r.t1);
  const scriptsDoneMs = scripts.length ? round((Math.max(...scripts.map((r) => r.t1)) - navT0) * 1000) : 0;
  const mLoad = await metricsOf(sessionId);

  // Sampling CPU profile of a window, printed as self time by function and by file (attribution only:
  // sampling inflates native calls such as WebGL context creation, so compare ratios, not totals).
  const profileReport = async (label) => {
    const { result: { profile } } = await send('Profiler.stop', {}, sessionId);
    const byNode = new Map(profile.nodes.map((x) => [x.id, x]));
    const self = new Map();
    for (let i = 0; i < profile.samples.length; i++) {
      const cf = byNode.get(profile.samples[i]).callFrame;
      const key = `${cf.functionName || '(anon)'}  ${cf.url.replace(/^https?:\/\/[^/]+\//, '')}:${cf.lineNumber + 1}`;
      self.set(key, (self.get(key) || 0) + (profile.timeDeltas[i] || 0));
    }
    const byFile = new Map();
    for (const [k, v] of self) { const f = k.split('  ')[1].split(':')[0] || '(native)'; byFile.set(f, (byFile.get(f) || 0) + v); }
    const top = (m, k) => [...m].sort((a, b) => b[1] - a[1]).slice(0, k).map(([key, v]) => `${String(round(v / 1000)).padStart(7)} ms  ${key}`);
    console.error(`\n--- CPU profile: ${label}, run ${n}\nby function:\n${top(self, 25).join('\n')}\nby file:\n${top(byFile, 15).join('\n')}\n`);
  };
  const profileStart = async () => { await send('Profiler.enable', {}, sessionId); await send('Profiler.setSamplingInterval', { interval: 250 }, sessionId); await send('Profiler.start', {}, sessionId); };

  // --- idle: nobody touches the page for 5s at the top
  await evaluate(() => { scrollTo(0, 0); window.__bench.raf = 0; });
  await sleep(500);
  const m0 = await metricsOf(sessionId);
  const raf0 = await evaluate(() => window.__bench.raf);
  if (PROFILE) await profileStart();
  await sleep(5000);
  if (PROFILE) await profileReport('5s idle at the top of the page');
  const m1 = await metricsOf(sessionId);
  const raf1 = await evaluate(() => window.__bench.raf);
  const intervals = await evaluate(() => window.__bench.intervals);
  const idle = {
    rafPerSec: round((raf1 - raf0) / 5, 1),
    cpuMsPerSec: round(((m1.TaskDuration - m0.TaskDuration) * 1000) / 5, 1),
    scriptMsPerSec: round(((m1.ScriptDuration - m0.ScriptDuration) * 1000) / 5, 1),
    liveIntervals: intervals,
  };

  // --- scroll stress: 40 viewport-sized steps, frame times recorded with rAF
  await evaluate(() => { window.__bench.longTasks = []; });
  const lt0 = (await evaluate(() => performance.now()));
  const ms0 = await metricsOf(sessionId);
  if (PROFILE) await profileStart();
  const frames = await evaluate(async () => {
    const B = window.__bench;
    const p = B.recordFrames(40 * 150 + 200);
    for (let i = 0; i < 40; i++) { scrollBy(0, 900); await new Promise((r) => setTimeout(r, 150)); }
    return p;
  });
  if (PROFILE) { await profileReport('scroll stress'); await send('Profiler.disable', {}, sessionId); }
  const ms1 = await metricsOf(sessionId);
  const longTasks = await evaluate((t) => window.__bench.longTasks.filter((x) => x[0] >= t), lt0);
  const stress = {
    frames: frames.length,
    p50: round(pct(frames, 0.5), 1), p95: round(pct(frames, 0.95), 1), max: round(Math.max(...frames), 1),
    framesOver50ms: frames.filter((f) => f > 50).length,
    longTasks: longTasks.length, longTaskMs: longTasks.reduce((s, x) => s + x[1], 0),
    cpuMs: round((ms1.TaskDuration - ms0.TaskDuration) * 1000),
    scriptMs: round((ms1.ScriptDuration - ms0.ScriptDuration) * 1000),
    layoutMs: round((ms1.LayoutDuration - ms0.LayoutDuration) * 1000),
    styleMs: round((ms1.RecalcStyleDuration - ms0.RecalcStyleDuration) * 1000),
    layouts: ms1.LayoutCount - ms0.LayoutCount,
  };
  const live = await evaluate(() => ({ rows: document.querySelectorAll('#flow > .row').length, items: document.querySelectorAll('#flow .item').length, pooled: document.querySelectorAll('#measure .item').length }));

  // --- memory after stress
  await send('HeapProfiler.collectGarbage', {}, sessionId);
  await sleep(300);
  const mEnd = await metricsOf(sessionId);
  const totalBytes = loadReqs.reduce((s, r) => s + r.bytes, 0);
  listeners.delete(onEvent);
  await send('Target.closeTarget', { targetId });
  return {
    run: n,
    load: {
      scriptsDoneMs, componentsLoadedMs: appMarks['components-loaded'] ?? round(marks.loaded), fontsSettledMs: appMarks['fonts-settled'] ?? 0,
      firstRowMs: appMarks['first-rows'] ?? round(marks.firstRow), screenFilledMs: appMarks['screen-filled'] ?? round(marks.filled),
      requests: loadReqs.length, kb: round(totalBytes / 1024), thirdPartyRequests: thirdParty.length, thirdPartyKb: round(thirdParty.reduce((s, r) => s + r.bytes, 0) / 1024),
      byType, domNodes: mLoad.Nodes, heapMb: round(mLoad.JSHeapUsedSize / 1048576, 1),
    },
    idle, stress, live,
    after: { heapMb: round(mEnd.JSHeapUsedSize / 1048576, 1), domNodes: mEnd.Nodes, listeners: mEnd.JSEventListeners, documents: mEnd.Documents },
    wallMs: Date.now() - t0,
  };
}

// Warm the browser once (renderer + GPU process start-up, font and image caches) so run 1 is not an
// outlier; every measured run still loads with the HTTP cache disabled.
{
  const { result: { targetId } } = await send('Target.createTarget', { url: URL_ + (URL_.includes('?') ? '&' : '?') + 'warmup=1' });
  await sleep(4000);
  await send('Target.closeTarget', { targetId });
}

const runs = [];
for (let i = 1; i <= RUNS; i++) {
  const r = await runOnce(i);
  runs.push(r);
  console.error(`run ${i}/${RUNS}: scripts ${r.load.scriptsDoneMs}ms, components ${r.load.componentsLoadedMs}ms, fonts ${r.load.fontsSettledMs}ms, first rows ${r.load.firstRowMs}ms, filled ${r.load.screenFilledMs}ms, ${r.load.requests} req / ${r.load.kb} KB; idle ${r.idle.rafPerSec} raf/s ${r.idle.cpuMsPerSec} cpu ms/s; stress p95 ${r.stress.p95}ms max ${r.stress.max}ms, ${r.stress.longTasks} long tasks (${r.stress.longTaskMs}ms); heap ${r.after.heapMb} MB`);
}

// median of each numeric leaf across runs
const med = (xs) => { const a = [...xs].sort((x, y) => x - y); return a[Math.floor(a.length / 2)]; };
const merge = (objs) => {
  const out = {};
  for (const k of Object.keys(objs[0])) {
    const vs = objs.map((o) => o[k]);
    out[k] = typeof vs[0] === 'number' ? med(vs) : typeof vs[0] === 'object' && vs[0] ? merge(vs) : vs[0];
  }
  return out;
};
const summary = merge(runs);
delete summary.run;
const report = { url: URL_, net: NET, runs: RUNS, chromeHeadless: true, median: summary, all: runs };
console.log(JSON.stringify({ url: URL_, net: NET, runs: RUNS, median: summary }, null, 2));
if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify(report, null, 2));
ws.close();
chrome.kill();
