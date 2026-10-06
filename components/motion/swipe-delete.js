// iOS Mail swipe actions — drag a message left: More (systemGray), Flag (systemOrange) and Trash (systemRed) are
// revealed in thirds, a long swipe lets Trash swallow the row and deletes it, short swipes spring open or shut.
// iOS feel: non-bouncy spring (response .4s, damping .8 → linear()). Glyphs: Phosphor fill (SF Symbols look-alikes).
const IOS = 'linear(0, 0.036, 0.122, 0.232, 0.352, 0.469, 0.578, 0.673, 0.755, 0.823, 0.877, 0.919, 0.951, 0.974, 0.991, 1.002, 1.008, 1.012, 1.014, 1.014, 1.013, 1.012, 1.01, 1.008, 1.007, 1.005, 1.004, 1.003, 1.002, 1.001, 1.001, 1.001, 1)';
const MORE = '<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.13,104.13,0,0,0,128,24ZM84,140a12,12,0,1,1,12-12A12,12,0,0,1,84,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,172,140Z"/></svg>';
const FLAG = '<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M232,56V176a8,8,0,0,1-2.76,6c-15.28,13.23-29.89,18-43.82,18-18.91,0-36.57-8.74-53-16.85C105.87,170,82.79,158.61,56,179.77V224a8,8,0,0,1-16,0V56a8,8,0,0,1,2.77-6h0c36-31.18,68.31-15.21,96.79-1.12C167,62.46,190.79,74.2,218.76,50A8,8,0,0,1,232,56Z"/></svg>';
const TRASH = '<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z"/></svg>';

export default {
  id: 'mo-swipe-delete',
  credit: 'iOS Mail swipe actions — drag a message left to reveal More / Flag / Trash, keep pulling and Trash takes the whole row and deletes it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .list { width: 320px; max-width: 100%; border-radius: 12px; background: #fff; border: 1px solid #e5e5ea; overflow: hidden; font-family: system-ui, -apple-system, 'SF Pro Text', Inter, sans-serif; }
    .item { position: relative; height: 82px; overflow: hidden; touch-action: pan-y; transition: height .38s cubic-bezier(.32, .72, 0, 1); }
    .item + .item::before { content: ''; position: absolute; top: 0; left: 28px; right: 0; height: 1px; background: #e5e5ea; z-index: 2; }
    .item.gone { height: 0; }
    .acts { position: absolute; top: 0; bottom: 0; right: 0; width: var(--aw, 0px); display: flex; transition: width .5s ${IOS}; }
    .acts button {
      flex: 1 1 0; min-width: 0; border: 0; padding: 0; color: #fff; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; overflow: hidden;
      font: 400 13px system-ui, -apple-system, Inter, sans-serif; transition: flex-grow .3s cubic-bezier(.32, .72, 0, 1), filter .15s;
    }
    .acts button:active { filter: brightness(.88); }
    .acts button:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }
    .acts svg { width: 21px; height: 21px; fill: #fff; flex: none; }
    .acts span { white-space: nowrap; }
    .more { background: #8e8e93; } .flag { background: #ff9500; } .trash { background: #ff3b30; }
    .acts.full .more, .acts.full .flag { flex-grow: 0.0001; }
    .acts.full .trash { flex-grow: 40; }
    .row {
      position: absolute; inset: 0; display: flex; gap: 8px; padding: 10px 14px 10px 10px; background: #fff; transform: translateX(var(--x, 0px)); transition: transform .5s ${IOS};
      cursor: grab; user-select: none; -webkit-user-select: none; outline: none;
    }
    .row:focus-visible { box-shadow: inset 0 0 0 2px #007aff; }
    .drag .row, .drag .acts { transition: none; }
    .dot { width: 10px; height: 10px; margin-top: 5px; border-radius: 50%; background: #007aff; flex: none; transition: transform .3s ${IOS}; }
    .read .dot { transform: scale(0); }
    .txt { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
    .l1 { display: flex; align-items: center; gap: 6px; }
    .l1 b { flex: 1; font-size: 15px; font-weight: 600; color: #000; letter-spacing: -.01em; }
    .l1 time { font-size: 14px; color: #8e8e93; }
    .l1 svg.ch { width: 8px; height: 13px; fill: none; stroke: #c4c4c7; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .l1 .fl { width: 11px; height: 11px; fill: #ff9500; transform: scale(0); transition: transform .35s ${IOS}; }
    .flagged .l1 .fl { transform: scale(1); }
    .sub { font-size: 14px; color: #000; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .pre { font-size: 14px; color: #8e8e93; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  `,
  html: `
    <div class="list">
      <div class="item" data-k="0">
        <div class="acts"><button class="more" type="button" tabindex="-1">${MORE}<span>More</span></button><button class="flag" type="button" tabindex="-1">${FLAG}<span>Flag</span></button><button class="trash" type="button" tabindex="-1">${TRASH}<span>Trash</span></button></div>
        <div class="row" tabindex="0" aria-label="Alex Chen, Thursday offsite. Swipe left or press the left arrow for actions"><span class="dot"></span><span class="txt"><span class="l1"><b>Alex Chen</b>${FLAG.replace('<svg', '<svg class="fl"')}<time>9:41 AM</time><svg class="ch" viewBox="0 0 8 13"><path d="m1.5 1.5 5 5-5 5"/></svg></span><span class="sub">Thursday offsite</span><span class="pre">Are we still on for Thursday? I booked the room…</span></span></div>
      </div>
      <div class="item">
        <div class="row read" tabindex="-1"><span class="dot"></span><span class="txt"><span class="l1"><b>Mia Jones</b><time>Yesterday</time><svg class="ch" viewBox="0 0 8 13"><path d="m1.5 1.5 5 5-5 5"/></svg></span><span class="sub">Design review notes</span><span class="pre">Attached are the notes from today’s review.</span></span></div>
      </div>
    </div>`,
  init(root) {
    const item = root.querySelector('.item[data-k]'), row = item.querySelector('.row'), acts = item.querySelector('.acts');
    const btns = [...acts.querySelectorAll('button')];
    const OPEN = 216;
    let x = 0, sx = 0, base = 0, full = false, timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const W = () => item.offsetWidth;
    const setX = (v) => { x = v; row.style.setProperty('--x', v + 'px'); acts.style.setProperty('--aw', Math.max(0, -v) + 'px'); };
    const setFull = (f) => { full = f; acts.classList.toggle('full', f); };
    const snap = (open) => { item.classList.remove('drag'); setFull(false); setX(open ? -OPEN : 0); btns.forEach((b) => (b.tabIndex = open ? 0 : -1)); };
    const del = () => {
      item.classList.remove('drag'); setFull(true); setX(-W()); btns.forEach((b) => (b.tabIndex = -1));
      later(() => item.classList.add('gone'), 260);
      later(() => { setFull(false); item.classList.add('drag'); setX(0); item.offsetWidth; item.classList.remove('drag', 'gone'); row.classList.remove('read'); row.focus({ preventScroll: true }); }, 2000);
    };
    row.addEventListener('pointerdown', (e) => { if (item.classList.contains('gone')) return; row.setPointerCapture(e.pointerId); sx = e.clientX; base = x; item.classList.add('drag'); });
    row.addEventListener('pointermove', (e) => {
      if (!row.hasPointerCapture(e.pointerId)) return;
      let v = base + e.clientX - sx;
      if (v > 0) v = 0.25 * v;
      setX(v); setFull(-v > W() * .68);
    });
    const end = (e) => {
      if (!item.classList.contains('drag')) return;
      if (full) del(); else if (Math.abs(e.clientX - sx) < 4 && base === 0) { item.classList.remove('drag'); row.classList.add('read'); } else snap(x < -OPEN / 2);
    };
    row.addEventListener('pointerup', end); row.addEventListener('pointercancel', () => snap(false));
    row.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') snap(true);
      if (e.key === 'ArrowRight' || e.key === 'Escape') snap(false);
      if (e.key === 'Delete' || e.key === 'Backspace') del();
    });
    acts.querySelector('.trash').addEventListener('click', del);
    acts.querySelector('.flag').addEventListener('click', () => { row.classList.toggle('flagged'); snap(false); row.focus({ preventScroll: true }); });
    acts.querySelector('.more').addEventListener('click', () => { snap(false); row.focus({ preventScroll: true }); });
    return () => timers.forEach(clearTimeout);
  },
};
