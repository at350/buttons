#!/usr/bin/env node
// Headless integration check: loads the live page, verifies every element mounts without errors,
// measures row packing, and exercises the infinite feed (eviction + refill).
// Usage: node scripts/smoke.mjs [url]   (default http://127.0.0.1:4173/)
// Needs a Chromium binary: set CHROME=/path/to/binary, or it looks in the Playwright cache.
import { spawn } from 'node:child_process';
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const URL_ = process.argv[2] || 'http://127.0.0.1:4173/';

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

const chrome = spawn(findChrome(), ['--headless=new', '--remote-debugging-port=0', '--window-size=1280,900', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-first-run', '--no-default-browser-check', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
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
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}, sessionId) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });

const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);
await send('Page.navigate', { url: URL_ + (URL_.includes('?') ? '&' : '?') + 'smoke=' + Date.now() }, sessionId);
await new Promise((r) => setTimeout(r, 4000));

const evaluate = async (fn) => {
  const r = await send('Runtime.evaluate', { expression: `(${fn})()`, awaitPromise: true, returnByValue: true }, sessionId);
  if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 500));
  return r.result.result.value;
};

const out = await evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const errors = [];
  const oe = console.error; console.error = (...a) => { errors.push(a.map(String).join(' ').slice(0, 200)); oe(...a); };
  addEventListener('error', (e) => errors.push('window: ' + e.message));
  const flow = document.getElementById('flow');
  const rows = () => [...flow.querySelectorAll(':scope > .row')];
  const W = flow.clientWidth - 32;
  const fillOf = (r) => Math.round(100 * ([...r.children].reduce((s, k) => s + k.getBoundingClientRect().width, 0) + 18 * (r.children.length - 1)) / W);
  const wrappedOf = (r) => { const k = [...r.children]; return k.some((c, i) => i > 0 && c.getBoundingClientRect().left < k[i - 1].getBoundingClientRect().left); };

  // 1. every element mounts without errors (sequentially, so WebGL context limits don't skew it)
  const { loadComponents } = await import('/components/manifest.js');
  const defs = await loadComponents();
  const BASE = ':host{display:block;max-width:100%}*,*::before,*::after{box-sizing:border-box}';
  const area = document.getElementById('measure');
  const zero = [];
  let mounted = 0;
  for (const d of defs) {
    const host = document.createElement('div');
    host.className = 'item size-' + (d.size || 'auto');
    const root = host.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${BASE}${d.css || ''}</style>${d.html || ''}`;
    let cleanup;
    try { cleanup = d.init && d.init(root, host); mounted++; } catch (e) { errors.push(`${d.id}: ${e.message}`); }
    area.appendChild(host);
    // fluid `wide` elements (content is width:100%) legitimately have no natural width in the measuring area
    if (host.offsetHeight === 0 || (host.offsetWidth === 0 && d.size !== 'wide')) zero.push(d.id);
    // WebGL elements only create their context near the viewport (IntersectionObserver), so show canvas
    // elements on screen for a couple of frames: the shader compiles and a compile error reaches console.error
    if ((d.html || '').includes('<canvas')) {
      host.style.cssText = 'position:fixed;left:0;top:0;z-index:9';
      document.body.appendChild(host);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      await sleep(0);
    }
    try { typeof cleanup === 'function' && cleanup(); } catch (e) { errors.push(`${d.id} cleanup: ${e.message}`); }
    host.remove();
  }

  // 2. packing quality of the rows on screen (width fill, and area fill = how much of the row box is covered)
  const fills = rows().map(fillOf);
  const areaOf = (r) => { const rb = r.getBoundingClientRect(); const a = [...r.querySelectorAll('.item')].reduce((s, k) => { const b = k.getBoundingClientRect(); return s + b.width * b.height; }, 0); return Math.round(100 * a / (rb.width * rb.height)); };
  const areas = rows().map(areaOf);
  const stacks = rows().reduce((s, r) => s + r.querySelectorAll('.cell').length, 0);
  const wrapped = rows().filter(wrappedOf).length;
  const overflowX = document.documentElement.scrollWidth > document.documentElement.clientWidth;

  // 3. scroll far: eviction, then refill upward; scroll position must stay stable
  const t0 = performance.now();
  for (let i = 0; i < 60; i++) { scrollTo(0, 1e9); dispatchEvent(new Event('scroll')); await sleep(60); }
  const scrollMs = Math.round(performance.now() - t0);
  const sp = flow.querySelector('.spacer');
  const liveRows = rows().length, liveItems = flow.querySelectorAll('.item').length, spacerAfterScroll = sp.style.height;
  const probe = sp.nextElementSibling; probe.dataset.probe = '1';
  const before = probe.getBoundingClientRect().top + scrollY;
  for (let i = 0; i < 4; i++) { scrollTo(0, Math.max(0, parseFloat(sp.style.height) - 600)); dispatchEvent(new Event('scroll')); await sleep(100); }
  const after = flow.querySelector('[data-probe]').getBoundingClientRect().top + scrollY;
  const ids = [...flow.querySelectorAll('.item')].map((i) => i.dataset.id);

  // 4. jump straight to the top: the viewport must show rows, not the empty spacer
  scrollTo(0, 0); dispatchEvent(new Event('scroll')); await sleep(300); dispatchEvent(new Event('scroll')); await sleep(300);
  const visibleAtTop = [...flow.querySelectorAll('.item')].filter((i) => { const b = i.getBoundingClientRect(); return b.top < innerHeight && b.bottom > 0; }).length;
  return {
    topJump: { spacer: sp.style.height, visibleItems: visibleAtTop, scrollY },
    components: defs.length, mounted, zeroSized: zero, errors: errors.slice(0, 15), nErrors: errors.length,
    rowsOnScreen: fills.length, avgFill: Math.round(fills.reduce((a, b) => a + b, 0) / fills.length), minFill: Math.min(...fills), wrappedRows: wrapped, overflowX,
    avgAreaFill: Math.round(areas.reduce((a, b) => a + b, 0) / areas.length), minAreaFill: Math.min(...areas), stacksOnScreen: stacks,
    scrollMs, liveRows, liveItems, spacerAfterScroll, spacerAfterRefill: sp.style.height, refillStable: before === after,
    adjacentDuplicates: ids.filter((x, i) => i > 0 && x === ids[i - 1]).length, distinctOnPage: new Set(ids).size,
  };
});

console.log(JSON.stringify(out, null, 2));
if (process.env.SHOT) {
  await evaluate(() => { scrollTo(0, 0); return new Promise((r) => setTimeout(r, 600)); });
  const { result: { data } } = await send('Page.captureScreenshot', { format: 'png' }, sessionId);
  const { writeFileSync } = await import('node:fs');
  writeFileSync(process.env.SHOT, Buffer.from(data, 'base64'));
  console.log('screenshot written to ' + process.env.SHOT);
}
ws.close();
chrome.kill();
const ok = out.nErrors === 0 && out.zeroSized.length === 0 && !out.overflowX && out.wrappedRows === 0 && out.refillStable && out.topJump.visibleItems > 0;
process.exit(ok ? 0 : 1);
