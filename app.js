import { loadComponents } from './components/manifest.js';

// ---- tuning ----------------------------------------------------------------
const ROWS_PER_FILL = 6;   // rows appended per fill
const MAX_ROWS = 90;       // live rows kept in the DOM; older rows are evicted into a spacer
const POOL_MIN = 48;       // keep at least this many measured candidates ready for packing
const POOL_FILL = 64;      // how many to mount into the measuring area at a time
const WINDOW = 64;         // candidates the packer may choose from (keeps the feed random-ish)
const H_SLACK = 48;        // px a stack's first element may exceed the current row height by
const LOOKAHEAD = 1200;    // px beyond the viewport at which we fill / refill
const WIDE_BASIS = 420;    // packing width assumed for `wide` elements (they then grow)
const FONT_WAIT = 1000;    // ms the first rows wait for the web fonts (boxes are measured once, so with the real font)
const IDLE_MARGIN = '200px 0px'; // how far outside the viewport animations keep running
// Base styles for every shadow root. `data-idle` is set by the shell while an element is far from the viewport
// (or still in the measuring area): a CSS animation ticking anywhere on the page costs a full main frame over
// all live elements, and Chromium does not throttle offscreen main-thread animations on its own.
const BASE_CSS = ':host{display:block;max-width:100%}*,*::before,*::after{box-sizing:border-box}'
  + ':host([data-idle]),:host([data-idle])::before,:host([data-idle])::after,' // the host itself too
  + ':host([data-idle]) *,:host([data-idle]) *::before,:host([data-idle]) *::after{animation-play-state:paused!important}';

const flow = document.getElementById('flow');
const measure = document.getElementById('measure');
const sentinel = document.getElementById('sentinel');
const boot = document.getElementById('boot');
const GAP = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gap')) || 18;

// Ask for the web fonts now, while the components download. Nothing requests a face before the first mount, so
// without this the first rows would be measured with fallback fonts. The font stylesheet loads without blocking
// (index.html), so wait for it first. The faces are the ones CONTRACT.md rule 1 allows (their latin subsets).
const FACES = ['1em Inter', '1em "DM Sans"', '1em "Space Grotesk"', '1em "Bricolage Grotesque"', '1em Syne', '1em Unbounded',
  '1em Fraunces', '1em "Playfair Display"', 'italic 1em "Playfair Display"', '1em "Instrument Serif"', 'italic 1em "Instrument Serif"',
  '1em "JetBrains Mono"', '1em "IBM Plex Mono"', '600 1em "IBM Plex Mono"', '1em "Roboto Flex"'];
const fontsReady = (async () => {
  if (!document.fonts) return;
  const link = document.getElementById('webfonts');
  if (link && link.media !== 'all') await new Promise((r) => { for (const t of ['load', 'error']) link.addEventListener(t, r, { once: true }); });
  await Promise.all(FACES.map((f) => document.fonts.load(f).catch(() => null)));
})();

// Height-preserving placeholder for evicted rows, so the scrollbar and scroll position stay put.
const spacer = document.createElement('div');
spacer.className = 'spacer';
spacer.style.height = '0px';
spacer.setAttribute('aria-hidden', 'true');
flow.appendChild(spacer);
let spacerH = 0;

let allRegistry = [];   // every loaded element
let registry = [];      // the elements currently in the feed (after the category filter)
let order = [];
let cursor = 0;
const pool = []; // mounted + measured hosts waiting to be packed into a row
let lastId = null; // id of the most recently placed element
let packedW = 0;   // the width the live rows were packed for (NaN: rows of several widths)

// ---- registry ---------------------------------------------------------------
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function next() {
  if (cursor >= order.length) {
    const fresh = shuffle(registry);
    if (order.length > 1 && fresh[0] === order[order.length - 1]) [fresh[0], fresh[1]] = [fresh[1], fresh[0]];
    order = fresh;
    cursor = 0;
  }
  return order[cursor++];
}

// ---- mounting ---------------------------------------------------------------
// One parsed stylesheet per definition, shared by every instance (a <style> per shadow root re-parses the
// CSS on each mount). Falls back to inline <style> where constructable stylesheets are unavailable.
const CONSTRUCTABLE = typeof CSSStyleSheet === 'function' && 'replaceSync' in CSSStyleSheet.prototype && 'adoptedStyleSheets' in ShadowRoot.prototype;
const sheets = new WeakMap(); // def -> CSSStyleSheet
function sheetFor(def) {
  let s = sheets.get(def);
  if (!s) {
    s = new CSSStyleSheet();
    s.replaceSync(BASE_CSS + (def.css || ''));
    sheets.set(def, s);
  }
  return s;
}

// Images start downloading as soon as their markup is parsed, including the dozens of pooled elements
// waiting off-screen; mark them lazy so only images near the viewport are fetched, and decode them off
// the main thread. Boxes are measured and locked independently of image loading, so nothing shifts.
const LAZY_IMG = /<img\b(?![^>]*\bloading=)/gi;
function htmlFor(def) {
  if (def._html === undefined) def._html = (def.html || '').replace(LAZY_IMG, '<img loading="lazy" decoding="async"');
  return def._html;
}

// Pauses the CSS animations of elements that are not near the viewport (see BASE_CSS).
const idleIO = new IntersectionObserver((entries) => {
  for (const e of entries) e.target.toggleAttribute('data-idle', !e.isIntersecting);
}, { rootMargin: IDLE_MARGIN });

function mount(def) {
  const host = document.createElement('div');
  host.className = 'item size-' + (def.size || 'auto');
  host.setAttribute('data-idle', ''); // paused until it comes near the viewport
  idleIO.observe(host);
  host.dataset.id = def.id;
  host._size = def.size || 'auto';
  host._def = def;
  if (def.credit) host.title = def.credit;
  const root = host.attachShadow({ mode: 'open' });
  if (CONSTRUCTABLE) {
    root.adoptedStyleSheets = [sheetFor(def)];
    root.innerHTML = htmlFor(def);
  } else {
    root.innerHTML = `<style>${BASE_CSS}${def.css || ''}</style>${htmlFor(def)}`;
  }
  if (typeof def.init === 'function') {
    try {
      const cleanup = def.init(root, host);
      if (typeof cleanup === 'function') host._cleanup = cleanup;
    } catch (err) {
      console.error(`[buttons] init failed for "${def.id}"`, err);
    }
  }
  return host;
}

function unmount(host) {
  idleIO.unobserve(host);
  try { host._cleanup && host._cleanup(); } catch (err) { console.error(`[buttons] cleanup failed for "${host.dataset.id}"`, err); }
  host.remove();
}

// Mount a batch into the hidden measuring area and record each element's natural size.
function fillPool(n = POOL_FILL) {
  const fresh = [];
  for (let i = 0; i < n; i++) {
    const h = mount(next());
    measure.appendChild(h);
    fresh.push(h);
  }
  const W = flowWidth();
  for (const h of fresh) { // one forced layout for the whole batch
    const b = h.getBoundingClientRect();
    h._w = Math.ceil(b.width);
    h._h = Math.ceil(b.height);
    // fluid `wide` elements (content is width:100%) have no natural width: let them grow to the row
    if (h._size === 'wide') h._w = Math.max(h._w || W, WIDE_BASIS);
  }
  pool.push(...fresh);
}

// Keep the pool topped up during idle time, in small batches, so a scroll-driven fill rarely has to
// mount dozens of elements inside one task.
const TOPUP = 16;
let topupId = 0;
const idle = window.requestIdleCallback ? (fn) => requestIdleCallback(fn, { timeout: 500 }) : (fn) => setTimeout(fn, 50);
const cancelIdle = window.cancelIdleCallback ? (id) => cancelIdleCallback(id) : (id) => clearTimeout(id);
function topUp() {
  if (topupId || pool.length >= POOL_FILL) return;
  topupId = idle(() => {
    topupId = 0;
    if (pool.length >= POOL_FILL) return;
    fillPool(Math.min(TOPUP, POOL_FILL - pool.length));
    topUp();
  });
}

// ---- packing ----------------------------------------------------------------
const PAD_L = parseFloat(getComputedStyle(flow).paddingLeft) || 0; // fixed by the stylesheet
const flowWidth = () => flow.clientWidth - 2 * PAD_L;
const packW = (h) => (h._size === 'wide' ? Math.min(WIDE_BASIS, h._w) : h._w);

// Lock an element to its measured box so later content changes overlay neighbours instead of reflowing.
function lock(h) {
  if (h._size === 'auto') {
    h.style.width = h._w + 'px';
    h.style.height = h._h + 'px';
  } else {
    if (h._size === 'wide') h.style.maxWidth = h._w + 'px'; // grow, but never past the element's natural width
    h.style.height = Math.ceil(h.getBoundingClientRect().height) + 'px'; // measured in its final row width
  }
}

// Node.moveBefore (Chromium 133+) moves a connected host without resetting it (focus, running animations,
// inner scroll offsets); elsewhere a move is a remove + insert.
const put = (parent, node) => (parent.moveBefore && parent.isConnected && node.isConnected ? parent.moveBefore(node, null) : parent.appendChild(node));

// Build one row as a shelf of cells. A cell is a single element or a vertical stack of shorter
// elements, so the space beside a tall element (a calendar, a tuner) is filled instead of left blank.
// The first candidate is always taken (randomness); the rest are best-fit from a window of candidates.
// With `at`, the row goes into the feed before that node first, so placed hosts can move in with put().
function buildRow(W, at) {
  if (pool.length < POOL_MIN) fillPool();
  const row = document.createElement('div');
  row.className = 'row';
  // never place the same element right after itself (the packer can reorder across the shuffle seam), unless the
  // next one is the same too: skipping pool[0] for good would stall repack(), which waits for it
  const first = pool.length > 1 && pool[0].dataset.id === lastId && pool[1].dataset.id !== lastId ? pool.splice(1, 1)[0] : pool.shift();
  const cells = [[first]];
  let last = first;
  if (first._size !== 'full') {
    let used = packW(first);
    let H = first._h;                       // row height; may grow a little for a stack's first element
    let hasWide = first._size === 'wide';
    const win = () => Math.min(pool.length, WINDOW);
    for (;;) {
      const remW = W - used - GAP;
      if (remW < 40) break;
      // --- start a stack with the widest element that fits the remaining width and (roughly) the row height
      let best = -1, bestScore = -1;
      for (let i = 0; i < win(); i++) {
        const c = pool[i];
        if (c._size === 'full' || c.dataset.id === last.dataset.id) continue;
        const w = packW(c);
        if (w > remW || c._h > H + H_SLACK) continue;
        const score = w * Math.min(c._h, H);   // prefer the element that covers the most of the gap
        if (score > bestScore) { best = i; bestScore = score; }
      }
      if (best < 0) break;
      const head = pool.splice(best, 1)[0];
      const stack = [head];
      last = head;
      let stackW = packW(head);
      let stackH = head._h;
      H = Math.max(H, head._h);
      if (head._size === 'wide') hasWide = true;
      // --- fill the stack downward with elements of similar width until the row height is used up
      if (head._size === 'auto') {
        for (;;) {
          const remH = H - stackH - GAP;
          if (remH < 24) break;
          let b = -1, bScore = -1;
          for (let i = 0; i < win(); i++) {
            const c = pool[i];
            if (c._size !== 'auto' || c.dataset.id === last.dataset.id) continue;
            const w = c._w;
            if (c._h > remH || w > Math.max(stackW * 1.15, stackW + 24) || w > remW) continue;
            const score = c._h * Math.min(w, stackW) - Math.abs(w - stackW) * 2;
            if (score > bScore) { b = i; bScore = score; }
          }
          if (b < 0) break;
          const c = pool.splice(b, 1)[0];
          stack.push(c);
          last = c;
          stackH += GAP + c._h;
          stackW = Math.max(stackW, c._w);
        }
      }
      cells.push(stack);
      used += GAP + stackW;
    }
    const leftover = W - used;
    if (cells.length > 1 && leftover > 0 && leftover < W * 0.35) row.classList.add('spread');
  }
  if (at) flow.insertBefore(row, at);
  for (const stack of cells) {
    let box = row;
    if (stack.length > 1) {
      box = document.createElement('div');
      box.className = 'cell';
      row.appendChild(box);
    }
    for (const h of stack) { put(box, h); if (h._size === 'auto') lock(h); }
  }
  lastId = last.dataset.id;
  return row;
}

function rowsFragment(n) {
  const frag = document.createDocumentFragment();
  const rows = [];
  const W = flowWidth(); // read once: locking pooled elements between rows would otherwise force a layout per row
  packedW = liveRows() && W !== packedW ? NaN : W; // added at another width (before a pending repack): mixed, so repack
  for (let i = 0; i < n; i++) { const r = buildRow(W); rows.push(r); frag.appendChild(r); }
  return { frag, rows };
}

// Heights of wide/full elements depend on their final row width, so lock them once the row is in the
// document: the max-widths first (they set that width), then all reads, then all writes, so the batch costs one
// layout instead of one per element.
function lockRows(rows) {
  const hosts = [];
  for (const r of rows) hosts.push(...r.querySelectorAll('.item.size-wide, .item.size-full'));
  for (const h of hosts) if (h._size === 'wide') h.style.maxWidth = h._w + 'px';
  const heights = hosts.map((h) => Math.ceil(h.getBoundingClientRect().height));
  hosts.forEach((h, i) => { h.style.height = heights[i] + 'px'; });
}

// ---- windowing --------------------------------------------------------------
const liveRows = () => flow.childElementCount - 2; // children: #measure, the spacer, then rows

function setSpacer(h) {
  spacerH = Math.max(0, h);
  spacer.style.height = spacerH + 'px';
}

function evictTop(keep = null) { // `keep`: stop at this row
  const gone = [];
  for (let r = spacer.nextElementSibling, n = liveRows(); r && r !== keep && n > MAX_ROWS; r = r.nextElementSibling, n--) gone.push(r);
  if (!gone.length) return;
  let h = 0;
  for (const r of gone) h += r.offsetHeight + GAP; // measure everything before the first removal
  for (const r of gone) { for (const host of r.querySelectorAll('.item')) unmount(host); r.remove(); }
  setSpacer(spacerH + h);
}

function evictBottom() {
  while (liveRows() > MAX_ROWS) {
    const r = flow.lastElementChild;
    if (!r || r === spacer) break;
    for (const host of r.querySelectorAll(".item")) unmount(host);
    r.remove();
  }
}

function appendRows(n = ROWS_PER_FILL) {
  const { frag, rows } = rowsFragment(n);
  flow.appendChild(frag);
  lockRows(rows);
  evictTop();
  topUp();
}

function prependRows(n = ROWS_PER_FILL) {
  if (spacerH <= 0) return;
  const before = flow.offsetHeight;
  const { frag, rows } = rowsFragment(n);
  flow.insertBefore(frag, spacer.nextSibling);
  lockRows(rows);
  const added = flow.offsetHeight - before;
  if (added <= spacerH) setSpacer(spacerH - added);
  else { const jump = added - spacerH; setSpacer(0); window.scrollBy(0, jump); }
  evictBottom();
  topUp();
}

function check() {
  if (sentinel.getBoundingClientRect().top < window.innerHeight + LOOKAHEAD) appendRows();
  if (spacerH > 0) {
    const r = spacer.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > window.innerHeight + LOOKAHEAD) {
      // The viewport jumped deep into evicted territory (Home key, scrollbar drag): collapse the
      // spacer so live rows slide up to meet it instead of showing a blank page.
      const y = window.scrollY;
      const h = spacerH;
      setSpacer(0);
      window.scrollTo(0, Math.max(0, y - h));
      setTimeout(check, 0);
    } else if (r.bottom > -LOOKAHEAD) {
      prependRows();
    }
  }
}

// Re-measure every element once if the web fonts arrive after the first rows were locked (the pool too: it was
// measured with the fallback fonts). A row was packed with the old sizes: if the new ones no longer fit it, it keeps
// the old ones (a box locked a few px too small overlays its neighbours, which is what locked boxes are for; a
// re-packed row would wrap).
function relockAll() {
  const W = flowWidth();
  const rows = [...flow.querySelectorAll(':scope > .row')];
  const placed = rows.flatMap((r) => [...r.querySelectorAll('.item')]);
  const old = new Map(placed.map((h) => [h, [h._w, h._h]]));
  for (const h of placed) { h.style.width = ''; h.style.height = ''; if (h._size === 'wide') h.style.maxWidth = ''; }
  const autos = placed.filter((h) => h._size === 'auto');
  const boxes = [...autos, ...pool].map((h) => h.getBoundingClientRect()); // one layout for all reads
  autos.forEach((h, i) => { h._w = Math.ceil(boxes[i].width); h._h = Math.ceil(boxes[i].height); });
  pool.forEach((h, i) => {
    const b = boxes[autos.length + i];
    h._w = Math.ceil(b.width);
    h._h = Math.ceil(b.height);
    if (h._size === 'wide') h._w = Math.max(h._w || W, WIDE_BASIS);
  });
  for (const r of rows) {
    const cells = [...r.children];
    const used = cells.reduce((s, c) => s + Math.max(...(c.classList.contains('cell') ? [...c.children] : [c]).map(packW)), 0) + GAP * (cells.length - 1);
    if (used > W) for (const h of r.querySelectorAll('.item')) [h._w, h._h] = old.get(h);
  }
  for (const h of autos) lock(h);
  const rest = placed.filter((h) => h._size !== 'auto');
  for (const h of rest) if (h._size === 'wide') h.style.maxWidth = h._w + 'px';
  const heights = rest.map((h) => Math.ceil(h.getBoundingClientRect().height)); // measured in the final row width
  rest.forEach((h, i) => { h.style.height = heights[i] + 'px'; });
}

// The element at the top of the viewport and its offset, noted after scrolling: once a resize event arrives the
// rows have already reflowed to the new width, and another element sits at the top. An element in use (focused, or
// with a popover open) is noted instead while it is in view, so a rotation does not carry an open menu off-screen.
let anchor = null; // { host, top, y: scrollY when noted }
function noteAnchor() {
  anchor = null;
  for (const h of [document.activeElement && document.activeElement.closest('#flow > .row .item'), ...flow.querySelectorAll(':scope > .row .item[data-open]')]) {
    const b = h && h.getBoundingClientRect();
    if (b && b.bottom > 0 && b.top < innerHeight) { anchor = { host: h, top: b.top, y: scrollY }; return; }
  }
  for (let r = spacer.nextElementSibling; r; r = r.nextElementSibling) {
    if (r.getBoundingClientRect().bottom <= 0) continue;
    const h = [...r.querySelectorAll('.item')].find((x) => x.getBoundingClientRect().bottom > 0);
    if (h) { anchor = { host: h, top: h.getBoundingClientRect().top, y: scrollY }; return; }
  }
}

// Rows are packed for one width. When it changes (rotation, window resize), re-measure the elements at the new width
// and pack the live ones again, in their order. Hosts are moved, never remounted, so they keep their state, and the
// noted top element keeps its offset (with at least part of it in view).
function repack() {
  const rows = [...flow.querySelectorAll(':scope > .row')];
  const placed = rows.flatMap((r) => [...r.querySelectorAll('.item')]);
  if (!placed.length) return;
  let a = anchor && placed.includes(anchor.host) ? anchor : null;
  if (!a) { const h = placed.find((x) => x.getBoundingClientRect().bottom > 0) || placed[0]; a = { host: h, top: h.getBoundingClientRect().top }; }
  const fh = document.activeElement && document.activeElement.closest('.item');
  const focused = fh && fh.shadowRoot.activeElement; // a plain move drops focus; put back below
  const W = packedW = flowWidth();
  // natural sizes, measured in place as in the measuring area (wide elements unflexed), with one layout
  for (const h of placed) { h.style.width = h.style.height = h.style.maxWidth = ''; if (h._size === 'wide') h.style.flex = '0 0 auto'; }
  const hosts = [...placed.filter((h) => h._size !== 'full'), ...pool];
  const boxes = hosts.map((h) => h.getBoundingClientRect());
  hosts.forEach((h, i) => {
    h._w = Math.ceil(boxes[i].width);
    h._h = Math.ceil(boxes[i].height);
    if (h._size === 'wide') { h.style.flex = ''; h._w = Math.max(h._w || W, WIDE_BASIS); }
  });
  // the live hosts go first in the pool, so the packer takes them in order and the pool fills out the last rows
  const live = new Set(placed);
  pool.unshift(...placed);
  lastId = null;
  const fresh = [];
  while (live.has(pool[0])) fresh.push(buildRow(W, rows[0]));
  for (const r of rows) r.remove();
  lockRows(fresh);
  const to = Math.min(Math.max(a.top, Math.min(0, 48 - a.host.offsetHeight)), innerHeight / 2);
  const settle = () => window.scrollBy(0, a.host.getBoundingClientRect().top - to);
  settle();
  // narrower rows can outnumber MAX_ROWS: trim far above the anchor (into the spacer), then below it
  evictTop(fresh.find((r) => r.getBoundingClientRect().bottom > -LOOKAHEAD));
  evictBottom();
  if (focused && fh.shadowRoot.activeElement !== focused) focused.focus({ preventScroll: true });
  check();
  settle(); // check() may have added rows below a page that was too short to scroll the anchor back
  noteAnchor(); // the top element of the new packing, for the next width change
  topUp();
}

// ---- boot -------------------------------------------------------------------
const mark = (n) => { try { performance.mark('buttons:' + n); } catch {} };

async function main() {
  allRegistry = await loadComponents();
  mark('components-loaded');
  boot.classList.add('hidden');
  if (!allRegistry.length) {
    console.error('[buttons] no components loaded');
    return;
  }
  registry = filtered(loadFilter());
  setupFilter();
  setupLongPress();
  // Box locking depends on text metrics, so wait (bounded) for the web fonts requested at start-up, and if
  // they arrive later anyway, re-measure every element once.
  let fontsDone = false;
  await Promise.race([fontsReady.then(() => { fontsDone = true; }), new Promise((r) => setTimeout(r, FONT_WAIT))]);
  mark('fonts-settled');
  appendRows(ROWS_PER_FILL * 2);
  mark('first-rows');
  if (!fontsDone) fontsReady.then(() => relockAll());

  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) appendRows();
  }, { rootMargin: `${LOOKAHEAD}px 0px` });
  io.observe(sentinel);

  let ticking = false;
  let rt = 0; // pending repack
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    setTimeout(() => {
      ticking = false;
      check();
      if (!rt && (!anchor || anchor.y !== scrollY)) noteAnchor(); // not while the rows have the old width's packing
    }, 50);
  };
  addEventListener('scroll', onScroll, { passive: true });
  // an element taken into use without scrolling (a click, Tab within the viewport) becomes the anchor; noted once the
  // element and the page have handled the event (an outside click closes the last popover at the document)
  const onUse = () => setTimeout(() => { if (!rt) noteAnchor(); }, 0);
  flow.addEventListener('focusin', onUse);
  flow.addEventListener('click', onUse);

  let lastW = innerWidth;
  addEventListener('resize', () => {
    if (innerWidth === lastW) return; // height-only changes (a mobile URL bar) keep the packing
    lastW = innerWidth;
    clearTimeout(rt);
    // so does a width that ends where the rows were packed (a drag back, the 1 px blip of a full-page screenshot)
    rt = setTimeout(() => { rt = 0; if (flowWidth() !== packedW) repack(); }, 150);
  }, { passive: true });

  const fill = () => {
    if (document.documentElement.scrollHeight <= window.innerHeight + 200) {
      appendRows();
      requestAnimationFrame(fill);
    } else mark('screen-filled');
  };
  requestAnimationFrame(fill);
}

// ---- category filter ----------------------------------------------------------
const FILTER_KEY = 'buttons.categories';
const categories = () => [...new Set(allRegistry.map((d) => d._cat))];
let active = null; // null = all categories

function loadFilter() {
  try {
    const raw = localStorage.getItem(FILTER_KEY);
    if (raw) { const arr = JSON.parse(raw); if (Array.isArray(arr) && arr.length) return new Set(arr); }
  } catch {}
  return null;
}
function saveFilter() {
  try { active ? localStorage.setItem(FILTER_KEY, JSON.stringify([...active])) : localStorage.removeItem(FILTER_KEY); } catch {}
}
function filtered(set) {
  active = set && set.size ? set : null;
  const list = active ? allRegistry.filter((d) => active.has(d._cat)) : allRegistry;
  return list.length ? list : allRegistry;
}

// Tear the feed down and start it again from the current registry.
function resetFeed() {
  for (const h of flow.querySelectorAll('.item')) unmount(h);
  for (const r of flow.querySelectorAll(':scope > .row')) r.remove();
  for (const h of pool.splice(0)) unmount(h);
  measure.innerHTML = '';
  if (topupId) { cancelIdle(topupId); topupId = 0; }
  order = []; cursor = 0; lastId = null;
  setSpacer(0);
  window.scrollTo(0, 0);
  appendRows(ROWS_PER_FILL * 2);
  requestAnimationFrame(function fill() {
    if (document.documentElement.scrollHeight <= window.innerHeight + 200) { appendRows(); requestAnimationFrame(fill); }
  });
}

function setupFilter() {
  const btn = document.getElementById('filter');
  const panel = document.getElementById('filter-panel');
  const cats = categories().filter((c) => c !== 'core').sort();
  const chips = new Map();
  const paint = () => {
    for (const [c, el] of chips) el.setAttribute('aria-pressed', String(!active || active.has(c)));
    all.setAttribute('aria-pressed', String(!active));
    btn.dataset.active = String(!!active);
  };
  const apply = (set) => { registry = filtered(set); saveFilter(); paint(); resetFeed(); };
  const all = document.createElement('button');
  all.type = 'button'; all.className = 'all'; all.textContent = 'all';
  all.addEventListener('click', () => apply(null));
  panel.appendChild(all);
  for (const c of cats) {
    const el = document.createElement('button');
    el.type = 'button';
    el.textContent = c.replace(/-/g, ' ');
    el.addEventListener('click', (e) => {
      // plain click toggles one category; alt/option-click shows only that category
      let set = new Set(active || cats);
      if (e.altKey) set = new Set([c]);
      else if (set.has(c) && set.size > 1) set.delete(c);
      else set.add(c);
      apply(set.size === cats.length ? null : set);
    });
    chips.set(c, el);
    panel.appendChild(el);
  }
  const open = (v) => { panel.hidden = !v; btn.setAttribute('aria-expanded', String(v)); };
  btn.addEventListener('click', () => open(panel.hidden));
  document.addEventListener('pointerdown', (e) => { if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) open(false); }); // the icon too
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) { open(false); btn.focus(); } });
  paint();
}

// ---- long-press: copy an element's source module -----------------------------
const sourceCache = new Map(); // category -> Promise<Map<id, { path, text }>>

async function sourcesFor(cat) {
  if (!sourceCache.has(cat)) {
    sourceCache.set(cat, (async () => {
      const idx = await (await fetch(`./components/${cat}/index.js`)).text();
      const paths = [...idx.matchAll(/from\s+['"]\.\/([^'"]+)['"]/g)].map((m) => m[1]);
      const files = await Promise.all(paths.map(async (p) => ({ path: `components/${cat}/${p}`, text: await (await fetch(`./components/${cat}/${p}`)).text() })));
      const map = new Map();
      for (const f of files) {
        const m = f.text.match(/\bid\s*:\s*['"`]([^'"`]+)['"`]/);
        if (m) map.set(m[1], f);
      }
      return map;
    })());
  }
  return sourceCache.get(cat);
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch {}
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:absolute;left:-9999px;top:0';
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch { return false; }
}

const toast = document.getElementById('toast');
let toastTimer;
function showToast(x, y, ok, path) {
  toast.innerHTML = ok
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>${path.split('/').pop()}`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
  toast.style.left = Math.max(80, Math.min(innerWidth - 80, x)) + 'px';
  toast.style.top = Math.max(40, y) + 'px';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1400);
}

// A clipboard write needs user activation: a mouse press grants it at pointerdown (for a few seconds), a touch or pen
// press only on release, and Safari wants the call inside that handler. So the write starts synchronously, with the
// text prefetched during the press, or else (Safari, Chromium) as a ClipboardItem whose text is still a promise.
function copySource(p) {
  if (p.ready) return p.src ? copyText(p.src.text) : Promise.resolve(false);
  if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
    const blob = p.load.then((s) => (s ? new Blob([s.text], { type: 'text/plain' }) : Promise.reject(new Error('no source'))));
    return navigator.clipboard.write([new ClipboardItem({ 'text/plain': blob })]).then(() => true, () => false);
  }
  return p.load.then((s) => (s ? copyText(s.text) : false));
}

// The click that ends a long-press belongs to it, not to the element (a toggle would flip).
const swallow = (e) => { e.preventDefault(); e.stopImmediatePropagation(); };
function swallowClick() {
  addEventListener('click', swallow, { capture: true, once: true });
  setTimeout(() => removeEventListener('click', swallow, true), 500); // released off the element: no click comes
}

function setupLongPress() {
  const HOLD = 600, SLOP = 8, PREFETCH = 200; // a tap is over before PREFETCH, so only presses fetch the source
  let timer = 0, p = null; // the press being timed
  let touching = false;    // a touch / pen press on an element is down
  const end = () => { clearTimeout(timer); timer = 0; if (p) p.host.classList.remove('holding', 'touch'); p = null; };
  const load = (q) => q.load || (q.load = sourcesFor(q.host._def._cat).then((m) => m.get(q.host._def.id), () => undefined)
    .then((s) => { q.src = s; q.ready = true; return s; }));
  const copy = (q) => {
    const ok = copySource(q); // first, while the event handler still runs
    Promise.all([ok, load(q)]).then(([ok, s]) => {
      q.host.classList.remove('copied'); void q.host.offsetWidth; q.host.classList.add('copied');
      showToast(q.x, q.y, ok && !!s, s ? s.path : '');
    });
  };
  // Bubble phase, so the element's own handlers have run: one that handles the press itself (a hold-to-confirm, a drag)
  // prevents its default, and one whose interaction is press-and-hold says `hold: true` in its definition.
  document.addEventListener('pointerdown', (e) => {
    end();
    if (!e.isPrimary || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const path = e.composedPath();
    const h = path.find((n) => n instanceof HTMLElement && n.classList.contains('item') && n.parentElement && n.parentElement.closest('#flow'));
    const t = path[0];
    if (!h || !h._def || t.isContentEditable || typeof t.selectionStart === 'number') return; // text fields: select / paste
    touching = e.pointerType !== 'mouse';
    if (h._def.hold || e.defaultPrevented) return;
    const q = p = { host: h, id: e.pointerId, touch: touching, x: e.clientX, y: e.clientY };
    h.classList.add('holding');
    if (q.touch) h.classList.add('touch');
    timer = setTimeout(() => {
      load(q);
      timer = setTimeout(() => {
        timer = 0;
        if (q.touch) { q.armed = true; return; } // copied on release, when touch grants activation
        q.done = true;
        h.classList.remove('holding');
        copy(q);
      }, HOLD - PREFETCH);
    }, PREFETCH);
  });
  // the same press handled in mousedown / touchstart instead
  for (const t of ['mousedown', 'touchstart']) document.addEventListener(t, (e) => { if (e.defaultPrevented && p && !p.armed && !p.done) end(); }, { passive: true });
  document.addEventListener('pointermove', (e) => {
    if (p && !p.done && e.pointerId === p.id && Math.hypot(e.clientX - p.x, e.clientY - p.y) > SLOP) end();
  }, true);
  addEventListener('pointerup', (e) => {
    touching = false;
    if (!p || e.pointerId !== p.id) return;
    if (p.armed) copy(p);
    if (p.armed || p.done) swallowClick();
    end();
  }, true);
  addEventListener('pointercancel', () => { touching = false; end(); }, true);
  addEventListener('blur', end); // window lost focus (element blurs don't reach here without capture)
  // keep the mobile long-press from opening the context menu (or a selection) while holding an element
  document.addEventListener('contextmenu', (e) => { if (p || touching) e.preventDefault(); });
}

// scripts/sheet.mjs and scripts/audit.mjs open the page with ?harness and mount the elements they test themselves:
// no feed then, so nothing packs, refills or repacks rows under them.
if (new URLSearchParams(location.search).has('harness')) boot.classList.add('hidden');
else main();
