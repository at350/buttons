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
const POOL_TARGET = POOL_MIN + 32; // the pool is topped up to this in idle time, so a fill rarely has to mount synchronously
const PREFILL_CHUNK = 8;   // hosts mounted per idle slice
// Base styles for every shadow root. `data-idle` is set by the shell while an element is far from the viewport
// (or still in the measuring area): a CSS animation ticking anywhere on the page costs a full main frame over
// all ~450 live elements, and Chromium does not throttle offscreen main-thread animations on its own.
const BASE_CSS = ':host{display:block;max-width:100%}*,*::before,*::after{box-sizing:border-box}'
  + ':host([data-idle]) *,:host([data-idle]) *::before,:host([data-idle]) *::after{animation-play-state:paused!important}'
  + '@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important}}';
const IDLE_MARGIN = '200px 0px'; // how far outside the viewport animations keep running
// One parsed stylesheet per element definition, shared by every instance (fewer nodes, less memory); older
// engines get the same CSS as an inline <style>.
const ADOPT = 'adoptedStyleSheets' in ShadowRoot.prototype && 'replaceSync' in CSSStyleSheet.prototype;
const BASE_SHEET = ADOPT ? new CSSStyleSheet() : null;
if (ADOPT) BASE_SHEET.replaceSync(BASE_CSS);
const sheetOf = (def) => def._sheet || ((def._sheet = new CSSStyleSheet()).replaceSync(def.css || ''), def._sheet);

const flow = document.getElementById('flow');
const measure = document.getElementById('measure');
const sentinel = document.getElementById('sentinel');
const boot = document.getElementById('boot');
const GAP = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gap')) || 18;

// Ask for the web fonts now, while the components download. The font stylesheet loads without blocking
// (index.html), and nothing requests a face before the first mount, so without this the first rows would be
// measured with fallback fonts. The faces are the ones CONTRACT.md rule 1 allows (their latin subsets).
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
  // pictures load when the element is near the viewport, not while it waits in the measuring area
  const html = (def.html || '').replace(/<img\b/g, '<img loading="lazy" decoding="async"');
  if (ADOPT) { root.adoptedStyleSheets = [BASE_SHEET, sheetOf(def)]; root.innerHTML = html; }
  else root.innerHTML = `<style>${BASE_CSS}${def.css || ''}</style>${html}`;
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

// Top the pool up in idle time, a few elements per slice, so a fill on the scroll path seldom has to mount and
// measure 64 elements at once (that was the one long task left while scrolling).
const onIdle = window.requestIdleCallback ? (f) => requestIdleCallback(f, { timeout: 1000 }) : (f) => setTimeout(f, 50);
let prefillQueued = false;
function schedulePrefill() {
  if (prefillQueued || pool.length >= POOL_TARGET) return;
  prefillQueued = true;
  onIdle(() => { prefillQueued = false; if (pool.length < POOL_TARGET) fillPool(Math.min(PREFILL_CHUNK, POOL_TARGET - pool.length)); schedulePrefill(); });
}

// ---- packing ----------------------------------------------------------------
// The row width only changes on resize (html{overflow-y:scroll} keeps the scrollbar from changing it), so read it
// once: a read per row forced a layout per row, with the previous row's hosts freshly moved out of the pool.
let flowW = 0;
const flowWidth = () => flowW || (flowW = flow.clientWidth - 2 * parseFloat(getComputedStyle(flow).paddingLeft));
const placedItems = (sel = '.item') => flow.querySelectorAll(`:scope > .row ${sel}`); // live hosts, not the pool
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

// Build one row as a shelf of cells. A cell is a single element or a vertical stack of shorter
// elements, so the space beside a tall element (a calendar, a tuner) is filled instead of left blank.
// The first candidate is always taken (randomness); the rest are best-fit from a window of candidates.
function buildRow() {
  if (pool.length < POOL_MIN) fillPool();
  const W = flowWidth();
  const row = document.createElement('div');
  row.className = 'row';
  // never place the same element right after itself (the packer can reorder across the shuffle seam)
  const first = pool.length > 1 && pool[0].dataset.id === lastId ? pool.splice(1, 1)[0] : pool.shift();
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
  for (const stack of cells) {
    if (stack.length === 1) {
      row.appendChild(stack[0]);
    } else {
      const cell = document.createElement('div');
      cell.className = 'cell';
      for (const h of stack) cell.appendChild(h);
      row.appendChild(cell);
    }
    for (const h of stack) if (h._size === 'auto') lock(h);
  }
  lastId = last.dataset.id;
  return row;
}

function rowsFragment(n) {
  const frag = document.createDocumentFragment();
  const rows = [];
  for (let i = 0; i < n; i++) { const r = buildRow(); rows.push(r); frag.appendChild(r); }
  return { frag, rows };
}

// Heights of wide/full elements depend on their final row width, so lock them once the row is in the document.
// Writes, then one read pass, then writes: one forced layout for all rows instead of one per element.
function lockHeights(hosts) {
  for (const h of hosts) if (h._size === 'wide') h.style.maxWidth = h._w + 'px'; // grow, but never past the natural width
  const H = hosts.map((h) => Math.ceil(h.getBoundingClientRect().height)); // measured in the final row width
  hosts.forEach((h, i) => { h.style.height = H[i] + 'px'; });
}
function lockRows(rows) {
  lockHeights(rows.flatMap((r) => [...r.querySelectorAll('.item.size-wide, .item.size-full')]));
}

// Tell the elements of freshly placed rows that they are in the document (shaders use it to draw before the first
// paint; IntersectionObserver callbacks would come one frame later).
function placed(rows) {
  for (const r of rows) for (const h of r.querySelectorAll('.item')) h.dispatchEvent(new Event('placed'));
}

// ---- windowing --------------------------------------------------------------
const liveRows = () => flow.querySelectorAll(':scope > .row').length;

function setSpacer(h) {
  spacerH = Math.max(0, h);
  spacer.style.height = spacerH + 'px';
}

function evictTop() {
  const out = [];
  for (let r = spacer.nextElementSibling, k = liveRows() - MAX_ROWS; r && k > 0; r = r.nextElementSibling, k--) out.push(r);
  if (!out.length) return;
  const add = out.reduce((s, r) => s + r.offsetHeight + GAP, 0); // one read pass before the removals
  for (const r of out) { for (const host of r.querySelectorAll('.item')) unmount(host); r.remove(); }
  setSpacer(spacerH + add);
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
  placed(rows);
  evictTop();
  schedulePrefill();
}

function prependRows(n = ROWS_PER_FILL) {
  if (spacerH <= 0) return;
  const before = flow.offsetHeight;
  const { frag, rows } = rowsFragment(n);
  flow.insertBefore(frag, spacer.nextSibling);
  lockRows(rows);
  placed(rows);
  const added = flow.offsetHeight - before;
  if (added <= spacerH) setSpacer(spacerH - added);
  else { const jump = added - spacerH; setSpacer(0); window.scrollBy(0, jump); }
  evictBottom();
  schedulePrefill();
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

// Re-measure every live element (used once if web fonts arrive after the first rows were locked). A row was
// packed with the old sizes: if the new ones no longer fit it, it keeps the old ones (a box locked a few px too
// small overlays its neighbours, which is what locked boxes are for; a re-packed row would wrap).
function relockAll() {
  const W = flowWidth();
  const rows = [...flow.querySelectorAll(':scope > .row')].map((r) => ({ r, hosts: [...r.querySelectorAll('.item')] }));
  const all = rows.flatMap((x) => x.hosts);
  const old = new Map(all.map((h) => [h, [h._w, h._h]]));
  for (const h of all) { h.style.width = ''; h.style.height = ''; if (h._size === 'wide') h.style.maxWidth = ''; }
  for (const h of all) if (h._size === 'auto') { const b = h.getBoundingClientRect(); h._w = Math.ceil(b.width); h._h = Math.ceil(b.height); } // one layout
  for (const { r, hosts } of rows) {
    const used = [...r.children].reduce((s, c) => s + Math.max(...[...(c.classList.contains('cell') ? c.children : [c])].map(packW)), 0) + GAP * (r.children.length - 1);
    if (used > W) for (const h of hosts) [h._w, h._h] = old.get(h);
  }
  for (const h of all) if (h._size === 'auto') lock(h);
  lockHeights(all.filter((h) => h._size !== 'auto'));
}

// Re-lock responsive (wide/full) heights after the viewport width changes.
function relock() {
  const hosts = [...placedItems('.item.size-wide, :scope > .row .item.size-full')];
  for (const h of hosts) h.style.height = '';
  const H = hosts.map((h) => Math.ceil(h.getBoundingClientRect().height)); // one layout
  hosts.forEach((h, i) => { h.style.height = H[i] + 'px'; });
}

// ---- boot -------------------------------------------------------------------
async function main() {
  allRegistry = await loadComponents();
  if (!allRegistry.length) {
    boot.classList.add('hidden');
    console.error('[buttons] no components loaded');
    return;
  }
  registry = filtered(loadFilter());
  setupFilter();
  setupLongPress();
  // Box locking depends on text metrics, so wait (bounded) for the web fonts requested at start-up, and if
  // they arrive later anyway, re-measure every live element once.
  let fontsDone = false;
  await Promise.race([fontsReady.then(() => { fontsDone = true; }), new Promise((r) => setTimeout(r, FONT_WAIT))]);
  appendRows(ROWS_PER_FILL * 2);
  boot.classList.add('hidden');
  if (!fontsDone) fontsReady.then(() => relockAll());

  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) appendRows();
  }, { rootMargin: `${LOOKAHEAD}px 0px` });
  io.observe(sentinel);

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    setTimeout(() => { ticking = false; check(); }, 50);
  };
  addEventListener('scroll', onScroll, { passive: true });

  let rt;
  let lastW = innerWidth;
  addEventListener('resize', () => {
    if (innerWidth === lastW) return;
    lastW = innerWidth;
    clearTimeout(rt);
    rt = setTimeout(() => { flowW = 0; relock(); check(); }, 150);
  }, { passive: true });

  const fill = () => {
    if (document.documentElement.scrollHeight <= window.innerHeight + 200) {
      appendRows();
      requestAnimationFrame(fill);
    }
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
  for (const h of placedItems()) unmount(h);
  for (const r of flow.querySelectorAll(':scope > .row')) r.remove();
  for (const h of pool.splice(0)) unmount(h);
  measure.innerHTML = '';
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
  document.addEventListener('pointerdown', (e) => { if (!panel.hidden && !panel.contains(e.target) && e.target !== btn) open(false); });
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

function setupLongPress() {
  const HOLD = 600, SLOP = 8;
  let timer = 0, host = null, sx = 0, sy = 0;
  const cancel = () => { clearTimeout(timer); timer = 0; if (host) host.classList.remove('holding'); host = null; };
  const fire = async () => {
    const h = host;
    if (!h) return;
    const def = h._def;
    const x = sx, y = sy;
    cancel();
    let ok = false, path = '';
    try {
      const map = await sourcesFor(def._cat);
      const src = map.get(def.id);
      if (src) { path = src.path; ok = await copyText(src.text); }
    } catch (err) { console.error('[buttons] copy failed', err); }
    h.classList.remove('copied'); void h.offsetWidth; h.classList.add('copied');
    showToast(x, y, ok, path);
  };
  document.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const h = e.composedPath().find((n) => n instanceof HTMLElement && n.classList.contains('item') && n.parentElement && n.parentElement.closest('#flow'));
    if (!h || !h._def) return;
    cancel();
    host = h; sx = e.clientX; sy = e.clientY;
    h.classList.add('holding');
    timer = setTimeout(fire, HOLD);
  }, true);
  document.addEventListener('pointermove', (e) => {
    if (!host) return;
    if (Math.hypot(e.clientX - sx, e.clientY - sy) > SLOP) cancel();
  }, true);
  for (const t of ['pointerup', 'pointercancel']) addEventListener(t, cancel, true);
  addEventListener('blur', cancel); // window lost focus (element blurs don't reach here without capture)
  // keep the mobile long-press from opening the context menu while holding an element
  document.addEventListener('contextmenu', (e) => { if (host) e.preventDefault(); });
}

main();
