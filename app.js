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
const BASE_CSS = `:host{display:block;max-width:100%}*,*::before,*::after{box-sizing:border-box}`;

const flow = document.getElementById('flow');
const measure = document.getElementById('measure');
const sentinel = document.getElementById('sentinel');
const boot = document.getElementById('boot');
const GAP = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gap')) || 18;

// Height-preserving placeholder for evicted rows, so the scrollbar and scroll position stay put.
const spacer = document.createElement('div');
spacer.className = 'spacer';
spacer.style.height = '0px';
spacer.setAttribute('aria-hidden', 'true');
flow.appendChild(spacer);
let spacerH = 0;

let registry = [];
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
function mount(def) {
  const host = document.createElement('div');
  host.className = 'item size-' + (def.size || 'auto');
  host.dataset.id = def.id;
  host._size = def.size || 'auto';
  if (def.credit) host.title = def.credit;
  const root = host.attachShadow({ mode: 'open' });
  root.innerHTML = `<style>${BASE_CSS}${def.css || ''}</style>${def.html || ''}`;
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
  try { host._cleanup && host._cleanup(); } catch (err) { console.error(`[buttons] cleanup failed for "${host.dataset.id}"`, err); }
  host.remove();
}

// Mount a batch into the hidden measuring area and record each element's natural size.
function fillPool() {
  const fresh = [];
  for (let i = 0; i < POOL_FILL; i++) {
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

// ---- packing ----------------------------------------------------------------
const flowWidth = () => flow.clientWidth - 2 * parseFloat(getComputedStyle(flow).paddingLeft);
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
function lockRows(rows) {
  for (const r of rows) for (const h of r.querySelectorAll('.item.size-wide, .item.size-full')) lock(h);
}

// ---- windowing --------------------------------------------------------------
const liveRows = () => flow.querySelectorAll(':scope > .row').length;

function setSpacer(h) {
  spacerH = Math.max(0, h);
  spacer.style.height = spacerH + 'px';
}

function evictTop() {
  while (liveRows() > MAX_ROWS) {
    const r = spacer.nextElementSibling;
    if (!r) break;
    const h = r.offsetHeight + GAP;
    for (const host of r.querySelectorAll(".item")) unmount(host);
    r.remove();
    setSpacer(spacerH + h);
  }
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

// Re-measure every live element (used once if web fonts arrive after the first rows were locked).
function relockAll() {
  const hosts = [...flow.querySelectorAll('.item')];
  for (const h of hosts) { h.style.width = ''; h.style.height = ''; if (h._size === 'wide') h.style.maxWidth = ''; }
  for (const h of hosts) {
    if (h._size === 'auto') { const b = h.getBoundingClientRect(); h._w = Math.ceil(b.width); h._h = Math.ceil(b.height); }
    lock(h);
  }
}

// Re-lock responsive (wide/full) heights after the viewport width changes.
function relock() {
  const hosts = flow.querySelectorAll('.item.size-wide, .item.size-full');
  for (const h of hosts) h.style.height = '';
  for (const h of hosts) h.style.height = Math.ceil(h.getBoundingClientRect().height) + 'px';
}

// ---- boot -------------------------------------------------------------------
async function main() {
  registry = await loadComponents();
  boot.classList.add('hidden');
  if (!registry.length) {
    console.error('[buttons] no components loaded');
    return;
  }
  // Box locking depends on text metrics, so wait for the web fonts (bounded), and if they arrive
  // later anyway, re-measure every live element once.
  let fontsDone = !document.fonts || document.fonts.status === 'loaded';
  if (!fontsDone) {
    await Promise.race([document.fonts.ready.then(() => { fontsDone = true; }), new Promise((r) => setTimeout(r, 4000))]);
  }
  appendRows(ROWS_PER_FILL * 2);
  if (!fontsDone && document.fonts) document.fonts.ready.then(() => relockAll());

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
    rt = setTimeout(() => { relock(); check(); }, 150);
  }, { passive: true });

  const fill = () => {
    if (document.documentElement.scrollHeight <= window.innerHeight + 200) {
      appendRows();
      requestAnimationFrame(fill);
    }
  };
  requestAnimationFrame(fill);
}

main();
