#!/usr/bin/env node
// Visual review sheets: screenshots every element in a category at rest and after its first interaction
// (2x, images awaited), then composes contact sheets of 12 elements each for quick visual triage.
//
//   node scripts/sheet.mjs <category> [more categories] [--out <dir>]
// Output: <out>/<category>/<id>.png, <id>-click.png and <category>-sheet-N.png (default out: ./.sheets, gitignored).
// Needs the dev server (http://127.0.0.1:4173/) and a Chromium (Playwright cache or CHROME=...).
import { spawn } from 'node:child_process';
import { readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';

const args = process.argv.slice(2);
const oi = args.indexOf('--out');
const OUT = resolve(oi >= 0 ? args.splice(oi, 2)[1] : '.sheets');
const cats = args;
if (!cats.length) { console.error('usage: node scripts/sheet.mjs <category...> [--out dir]'); process.exit(2); }
const BASE = process.env.BASE || 'http://127.0.0.1:4173/';

function findChrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const cache = join(homedir(), 'Library/Caches/ms-playwright');
  if (existsSync(cache)) for (const d of readdirSync(cache).filter((d) => d.startsWith('chromium_headless_shell-')).sort().reverse()) {
    const p = join(cache, d, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); if (existsSync(p)) return p;
  }
  throw new Error('No Chromium found; set CHROME=/path/to/binary');
}
const chrome = spawn(findChrome(), ['--headless=new', '--remote-debugging-port=0', '--window-size=1280,900', '--force-device-scale-factor=2', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-first-run', '--hide-scrollbars', 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
process.on('exit', () => chrome.kill());
const wsUrl = await new Promise((res, rej) => { let b = ''; chrome.stderr.on('data', (d) => { b += d; const m = b.match(/DevTools listening on (ws:\/\/\S+)/); if (m) res(m[1]); }); setTimeout(() => rej(new Error('chrome did not start')), 20000); });
const ws = new WebSocket(wsUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
const send = (method, params = {}, sessionId) => new Promise((res) => { const i = ++id; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });
const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
await send('Page.enable', {}, sessionId);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }, sessionId); if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 400)); return r.result.result.value; };
const shot = async (clip, file) => { const { result: { data } } = await send('Page.captureScreenshot', { format: 'png', clip: { ...clip, scale: 1 }, captureBeyondViewport: true }, sessionId); writeFileSync(file, Buffer.from(data, 'base64')); };
const mouse = (type, x, y) => send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 }, sessionId);

await send('Page.navigate', { url: BASE + '?sheet=' + Date.now() }, sessionId);
await sleep(3500);
await ev(`(() => { const flow = document.getElementById('flow'); for (const n of flow.querySelectorAll(':scope > .row, :scope > .spacer')) n.remove(); const row = document.createElement('div'); row.className = 'row'; row.id = 'sheet-row'; flow.appendChild(row); 1 })()`);

const HARNESS = `window.__sheet = {
  async mount(cat, cid) {
    const m = await import('/components/' + cat + '/index.js'); const d = m.default.find((x) => x.id === cid);
    const row = document.getElementById('sheet-row'); row.innerHTML = '';
    const host = document.createElement('div'); host.className = 'item size-' + (d.size || 'auto'); const root = host.attachShadow({ mode: 'open' });
    root.innerHTML = '<style>:host{display:block;max-width:100%}*,*::before,*::after{box-sizing:border-box}' + (d.css || '') + '</style>' + (d.html || '');
    try { d.init && d.init(root, host); } catch (e) { host.dataset.err = e.message; }
    document.getElementById('measure').appendChild(host); const b0 = host.getBoundingClientRect(); row.appendChild(host);
    if ((d.size || 'auto') === 'auto') { host.style.width = Math.ceil(b0.width) + 'px'; host.style.height = Math.ceil(b0.height) + 'px'; } else host.style.height = Math.ceil(host.getBoundingClientRect().height) + 'px';
    scrollTo(0, 0); this.host = host; this.root = root;
    await this.settle();
    const b = host.getBoundingClientRect(); return { x: Math.max(0, b.left - 8), y: Math.max(0, b.top - 8), width: Math.min(1264, b.width + 16), height: b.height + 16, err: host.dataset.err || null };
  },
  async settle() {
    const root = this.root;
    const imgs = [...root.querySelectorAll('img')]; await Promise.all(imgs.map((im) => im.complete ? 0 : new Promise((r) => { im.onload = im.onerror = r; setTimeout(r, 6000); })));
    const urls = new Set(); for (const el of root.querySelectorAll('*')) for (const m of getComputedStyle(el).backgroundImage.matchAll(/url\\\\(["']?([^"')]+)["']?\\\\)/g)) if (!/^data:/.test(m[1])) urls.add(m[1]);
    await Promise.all([...urls].map((u) => new Promise((r) => { const i = new Image(); i.onload = i.onerror = r; i.src = u; setTimeout(r, 6000); })));
    await new Promise((r) => setTimeout(r, 350));
  },
  control() {
    const el = this.root.querySelector('button, [role="button"], [role="switch"], [role="checkbox"], [role="radio"], [role="tab"], [role="option"], [role="menuitem"], input, [tabindex="0"], a[href], label');
    if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.left + Math.min(r.width / 2, 40), y: r.top + Math.min(r.height / 2, 30) };
  },
  box() { const b = this.host.getBoundingClientRect(); return { x: Math.max(0, b.left - 8), y: Math.max(0, b.top - 8), width: Math.min(1264, b.width + 16), height: b.height + 16 }; }
}; 1`;
await ev(HARNESS);

for (const cat of cats) {
  const dir = join(OUT, cat); mkdirSync(dir, { recursive: true });
  const ids = await ev(`import('/components/${cat}/index.js').then((m) => m.default.map((d) => d.id))`);
  console.log(`${cat}: ${ids.length} elements`);
  const entries = [];
  for (const cid of ids) {
    try {
      const box = await ev(`window.__sheet.mount('${cat}', '${cid}')`);
      await shot(box, join(dir, `${cid}.png`));
      const c = await ev('window.__sheet.control()');
      let clicked = false;
      if (c) {
        await mouse('mouseMoved', c.x, c.y); await sleep(250);
        await mouse('mousePressed', c.x, c.y); await sleep(80); await mouse('mouseReleased', c.x, c.y);
        await sleep(700); await ev('window.__sheet.settle()');
        await shot(await ev('window.__sheet.box()'), join(dir, `${cid}-click.png`));
        await mouse('mouseMoved', 5, 890); clicked = true;
      }
      entries.push({ cid, clicked, err: box.err });
      if (box.err) console.log(`  ! ${cid}: init error ${box.err}`);
    } catch (e) { console.log(`  ✗ ${cid}: ${e.message.slice(0, 120)}`); entries.push({ cid, clicked: false, err: e.message }); }
  }
  // contact sheets: 12 per sheet, rest + click side by side
  const per = 12;
  for (let i = 0; i < entries.length; i += per) {
    const chunk = entries.slice(i, i + per);
    const html = `<!doctype html><meta charset=utf-8><style>body{margin:0;background:#ecece8;font:12px/1.3 system-ui}.g{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:14px;width:1252px}figure{margin:0;background:#fff;border-radius:8px;padding:8px;overflow:hidden}figcaption{font-weight:600;margin-bottom:6px;color:#111}.pair{display:flex;gap:6px}img{max-width:100%;max-height:220px;object-fit:contain;flex:1;min-width:0;background:#ecece8;border-radius:4px}small{color:#777}</style><div class=g>${chunk.map((e) => `<figure><figcaption>${e.cid}${e.err ? ' <small>⚠ ' + e.err.slice(0, 40) + '</small>' : ''}</figcaption><div class=pair><img src="file://${join(dir, e.cid + '.png')}">${e.clicked ? `<img src="file://${join(dir, e.cid + '-click.png')}">` : ''}</div></figure>`).join('')}</div>`;
    const hp = join(dir, `_sheet-${i / per + 1}.html`); writeFileSync(hp, html);
    await send('Page.navigate', { url: 'file://' + hp }, sessionId); await sleep(1500);
    const h = await ev('document.documentElement.scrollHeight');
    await shot({ x: 0, y: 0, width: 1280, height: h }, join(dir, `${cat}-sheet-${i / per + 1}.png`));
    await send('Page.navigate', { url: BASE + '?sheet=' + Date.now() }, sessionId); await sleep(2500);
    await ev(`(() => { const flow = document.getElementById('flow'); for (const n of flow.querySelectorAll(':scope > .row, :scope > .spacer')) n.remove(); const row = document.createElement('div'); row.className = 'row'; row.id = 'sheet-row'; flow.appendChild(row); 1 })()`);
    await ev(HARNESS);
  }
  console.log(`  sheets: ${Math.ceil(entries.length / per)} → ${dir}`);
}
ws.close(); chrome.kill(); process.exit(0);
