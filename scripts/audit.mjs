#!/usr/bin/env node
// Per-element overflow audit. Mounts each element in a locked box exactly as app.js does, then drives
// real pointer input (hover, click, leave) through the DevTools protocol and reports any content that
// escapes the element's box in any state. Overlaps on the page come from exactly this.
//
// Usage: node scripts/audit.mjs [category ...] [--ids id1,id2] [--json out.json] [--all]
//   default: prints only elements with findings; --all prints every element.
// Needs the dev server (http://127.0.0.1:4173/) and a Chromium (Playwright cache or CHROME=...).
// WIDTH=390 runs the pass at phone width (any element wider than the screen then fails).
import { spawn } from 'node:child_process';
import { readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args.splice(i, 2)[1] : null; };
const jsonOut = flag('--json');
const onlyIds = flag('--ids');
const showAll = args.includes('--all'); if (showAll) args.splice(args.indexOf('--all'), 1);
const restOnly = args.includes('--rest'); if (restOnly) args.splice(args.indexOf('--rest'), 1);
const BASE = process.env.BASE || 'http://127.0.0.1:4173/';
const categories = args.length ? args : null;

function findChrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const cache = join(homedir(), 'Library/Caches/ms-playwright');
  if (existsSync(cache)) {
    const dirs = readdirSync(cache).filter((d) => d.startsWith('chromium_headless_shell-')).sort().reverse();
    for (const d of dirs) { const p = join(cache, d, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); if (existsSync(p)) return p; }
  }
  for (const p of ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge']) if (existsSync(p)) return p;
  throw new Error('No Chromium found; set CHROME=/path/to/binary');
}

const WIDTH = +(process.env.WIDTH || 1280); // viewport width; e.g. WIDTH=390 for a phone-width pass
const chrome = spawn(findChrome(), ['--headless=new', '--remote-debugging-port=0', `--window-size=${WIDTH},900`, '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
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
await send('Page.navigate', { url: BASE + '?audit=' + Date.now() }, sessionId);
await new Promise((r) => setTimeout(r, 3500));
const evaluate = async (expr) => {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }, sessionId);
  if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 600));
  return r.result.result.value;
};
const mouse = async (type, x, y, extra = {}) => send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1, ...extra }, sessionId);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- in-page harness ------------------------------------------------------------------------
await evaluate(`(async () => {
  const flow = document.getElementById('flow');
  for (const n of flow.querySelectorAll(':scope > .row, :scope > .spacer')) n.remove();
  const row = document.createElement('div'); row.className = 'row'; row.id = 'audit-row'; flow.appendChild(row);
  window.scrollTo(0, 0);
  const BASE_CSS = ':host{display:block;max-width:100%}*,*::before,*::after{box-sizing:border-box}';
  window.__audit = {
    defs: [],
    async load(cats) {
      const out = [];
      for (const c of cats) { const m = await import('/components/' + c + '/index.js?x=' + Date.now()); for (const d of m.default) out.push({ cat: c, def: d }); }
      this.defs = out; return out.map((o) => ({ cat: o.cat, id: o.def.id, size: o.def.size || 'auto' }));
    },
    mount(i) {
      const { def } = this.defs[i];
      row.innerHTML = '';
      const host = document.createElement('div');
      host.className = 'item size-' + (def.size || 'auto');
      host.dataset.id = def.id;
      const root = host.attachShadow({ mode: 'open' });
      root.innerHTML = '<style>' + BASE_CSS + (def.css || '') + '</style>' + (def.html || '');
      let err = null;
      try { const c = def.init && def.init(root, host); host._cleanup = typeof c === 'function' ? c : null; } catch (e) { err = e.message; }
      // measure in the hidden area like app.js, then lock
      const meas = document.getElementById('measure'); meas.appendChild(host);
      const b0 = host.getBoundingClientRect(); const w = Math.ceil(b0.width), h = Math.ceil(b0.height);
      row.appendChild(host);
      if ((def.size || 'auto') === 'auto') { host.style.width = w + 'px'; host.style.height = h + 'px'; }
      else { host.style.height = Math.ceil(host.getBoundingClientRect().height) + 'px'; }
      this.host = host; this.root = root;
      return { err, w, h };
    },
    control() {
      const el = this.root.querySelector('button, [role="button"], [role="switch"], [role="checkbox"], [role="radio"], [role="tab"], [role="option"], [role="menuitem"], input, [tabindex="0"], a[href], label');
      const r = (el || this.host).getBoundingClientRect();
      return { x: r.left + Math.min(r.width / 2, 40), y: r.top + Math.min(r.height / 2, 30), tag: el ? el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '') : null };
    },
    measure() {
      const host = this.host, hr = host.getBoundingClientRect();
      let worst = { amt: 0 }; let count = 0;
      const name = (el) => el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\\s+/)[0] : '');
      const clipped = (el, stopAt) => { let p = el.parentElement; while (p && p !== stopAt) { const cs = getComputedStyle(p); if (cs.overflow !== 'visible' || cs.overflowX !== 'visible' || cs.overflowY !== 'visible' || cs.clipPath !== 'none' || cs.contain.includes('paint')) return true; p = p.parentElement; } return false; };
      // a "container" is an ancestor that paints its own box (background, border or shadow): content must stay inside it
      const isContainer = (cs) => (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent') || cs.backgroundImage !== 'none' || parseFloat(cs.borderTopWidth) > 0 || cs.boxShadow !== 'none';
      const consider = (el, r, cs, box, label, inner) => {
        const over = { l: box.left - r.left, t: box.top - r.top, r: r.right - box.right, b: r.bottom - box.bottom };
        const amt = Math.max(over.l, over.t, over.r, over.b);
        if (amt <= (inner ? 4 : 3)) return;
        count++;
        if (amt > worst.amt) worst = { amt: Math.round(amt), side: Object.entries(over).sort((a, b) => b[1] - a[1])[0][0], el: name(el), of: label, pos: cs.position, abs: cs.position === 'absolute' || cs.position === 'fixed' };
      };
      for (const el of this.root.querySelectorAll('*')) {
        if (el.tagName === 'STYLE') continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const cs = getComputedStyle(el);
        if (cs.display === 'none') continue;
        if (cs.visibility === 'hidden' || +cs.opacity === 0) {
          // invisible but still laid out: it widens the page if it extends past the host (page scroll bug)
          if (!clipped(el, null) && (r.right > hr.right + 3 || r.left < hr.left - 3)) { count++; const amt = Math.round(Math.max(r.right - hr.right, hr.left - r.left)); if (amt > worst.amt) worst = { amt, side: r.right > hr.right + 3 ? 'r' : 'l', el: name(el), of: 'host (hidden content)', pos: cs.position, abs: false, hidden: true }; }
          continue;
        }
        // 1. against the host box
        if (!clipped(el, null)) consider(el, r, cs, hr, 'host', false);
        // 2. against the nearest painted container inside the element. Absolutely positioned content gets a
        //    looser threshold (badges may overhang a little) and is exempt while the host is flagged open (popovers).
        const abs = cs.position === 'absolute' || cs.position === 'fixed';
        if (abs && host.hasAttribute('data-open')) continue;
        if (el.closest('[data-overhang]')) continue; // declared intentional protrusion (still checked against the host above)
        let p = el.parentElement;
        while (p) {
          const pcs = getComputedStyle(p);
          if (pcs.overflow !== 'visible' || pcs.overflowX !== 'visible' || pcs.overflowY !== 'visible' || pcs.clipPath !== 'none') break; // clipped: fine
          if (isContainer(pcs)) {
            const box = p.getBoundingClientRect();
            const over = Math.max(box.left - r.left, box.top - r.top, r.right - box.right, r.bottom - box.bottom);
            if (over > (abs ? 12 : 4)) consider(el, r, cs, box, name(p), true);
            break;
          }
          p = p.parentElement;
        }
      }
      return { worst, count, open: host.hasAttribute('data-open'), hostW: Math.round(hr.width), hostH: Math.round(hr.height) };
    },
    async images() {
      // every <img> must load, and every background-image url must resolve (local assets/ only)
      const bad = [];
      const imgs = [...this.root.querySelectorAll('img')];
      await Promise.all(imgs.map((im) => (im.complete ? Promise.resolve() : new Promise((r) => { im.addEventListener('load', r, { once: true }); im.addEventListener('error', r, { once: true }); setTimeout(r, 4000); }))));
      for (const im of imgs) if (!im.naturalWidth) bad.push('img ' + (im.getAttribute('src') || '').slice(0, 80));
      const urls = new Set();
      for (const el of this.root.querySelectorAll('*')) { const bg = getComputedStyle(el).backgroundImage; for (const m of bg.matchAll(/url\\(["']?([^"')]+)["']?\\)/g)) if (!/^data:/.test(m[1])) urls.add(m[1]); }
      for (const el of this.root.querySelectorAll('[style*="assets/"]')) for (const m of (el.getAttribute('style') || '').matchAll(/url\\(["']?([^"')]+)["']?\\)/g)) urls.add(m[1]);
      window.__urlCache = window.__urlCache || new Map();
      for (const u of urls) { if (!window.__urlCache.has(u)) window.__urlCache.set(u, fetch(u, { method: 'HEAD' }).then((r) => r.ok).catch(() => false)); if (!(await window.__urlCache.get(u))) bad.push('background ' + u.slice(0, 80)); }
      return bad;
    },
    unmount() { try { this.host._cleanup && this.host._cleanup(); } catch (e) {} this.host.remove(); }
  };
})()`);

const cats = categories || (await evaluate(`import('/components/manifest.js').then(m => m.CATEGORIES)`));
let list = await evaluate(`window.__audit.load(${JSON.stringify(cats)})`);
if (onlyIds) { const set = new Set(onlyIds.split(',')); list = list.map((d, i) => ({ ...d, i })).filter((d) => set.has(d.id)); } else list = list.map((d, i) => ({ ...d, i }));

const results = [];
for (const item of list) {
  const m = await evaluate(`window.__audit.mount(${item.i})`);
  await sleep(500);
  const rest = await evaluate('window.__audit.measure()');
  const badImages = await evaluate('window.__audit.images()');
  if (restOnly) {
    await evaluate('window.__audit.unmount()');
    const findings = [];
    if (rest.worst.amt > 3 && !(rest.open && rest.worst.abs)) findings.push(`rest: ${rest.worst.el} escapes ${rest.worst.of || 'host'} ${rest.worst.side} by ${rest.worst.amt}px${rest.worst.hidden ? ' (hidden content)' : ''}`);
    for (const b of badImages) findings.push('broken image: ' + b);
    if (m.err) findings.unshift('init error: ' + m.err);
    const rec = { cat: item.cat, id: item.id, size: item.size, box: `${m.w}×${m.h}`, findings };
    results.push(rec);
    if (findings.length || showAll) console.log(`${findings.length ? '✗' : '✓'} ${item.cat}/${item.id} [${rec.box}]${findings.length ? '\n    ' + findings.join('\n    ') : ''}`);
    continue;
  }
  const c = await evaluate('window.__audit.control()');
  await mouse('mouseMoved', c.x, c.y);
  await sleep(450);
  const hover = await evaluate('window.__audit.measure()');
  await mouse('mousePressed', c.x, c.y);
  await sleep(80);
  await mouse('mouseReleased', c.x, c.y);
  await sleep(700);
  const clicked = await evaluate('window.__audit.measure()');
  await mouse('mouseMoved', 5, 890);
  await sleep(500);
  const after = await evaluate('window.__audit.measure()');
  await evaluate('window.__audit.unmount()');
  const states = { rest, hover, clicked, after };
  const findings = [];
  for (const [s, v] of Object.entries(states)) {
    if (v.worst.amt > 3 && !(v.open && v.worst.abs)) findings.push(`${s}: ${v.worst.el} escapes ${v.worst.of && v.worst.of !== 'host' ? v.worst.of + ' ' : ''}${v.worst.side} by ${v.worst.amt}px${v.worst.abs ? ' (absolute)' : ''}${v.worst.hidden ? ' (hidden content)' : ''}${v.open ? ' [open]' : ''}`);
  }
  for (const b of badImages) findings.push('broken image: ' + b);
  if (m.err) findings.unshift('init error: ' + m.err);
  if (m.w === 0 || m.h === 0) findings.unshift(`zero-sized at mount (${m.w}×${m.h})`);
  const rec = { cat: item.cat, id: item.id, size: item.size, box: `${m.w}×${m.h}`, control: c.tag, findings };
  results.push(rec);
  if (findings.length || showAll) console.log(`${findings.length ? '✗' : '✓'} ${item.cat}/${item.id} [${rec.box}]${findings.length ? '\n    ' + findings.join('\n    ') : ''}`);
}
const bad = results.filter((r) => r.findings.length);
console.log(`\n${results.length} elements audited, ${bad.length} with findings`);
if (jsonOut) writeFileSync(jsonOut, JSON.stringify(results, null, 2));
ws.close();
chrome.kill();
process.exit(bad.length ? 1 : 0);
