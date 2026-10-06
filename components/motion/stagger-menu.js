// Raycast action panel (⌘K) — opens from the footer's "Actions" button, anchored bottom-right: the panel scales from
// .96 with a fast ease-out while the rows cascade in 25ms apart from blur(4px), keycap shortcuts on the right.
// Arrow keys move the highlight, Enter runs, Esc or a click outside closes. Lucide icons.
const EASE = 'cubic-bezier(.23, 1, .32, 1)';
const I = {
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
  trash: '<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  file: '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/>',
};
const svg = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${I[k]}</svg>`;
const ITEMS = [['globe', 'Open in Browser', ['↵']], ['copy', 'Copy Link', ['⌘', 'C']], ['pencil', 'Rename', ['⌘', 'R']], ['trash', 'Delete File', ['⌃', 'X'], 'danger']];

export default {
  id: 'mo-stagger-menu',
  credit: 'Raycast action panel (⌘K) — springs open from the footer, rows cascade in from a 4px blur 25ms apart, keycap shortcuts, full keyboard control',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .win { position: relative; width: 290px; height: 250px; max-width: 100%; border-radius: 12px; background: #1f1f21; border: 1px solid #2f2f32; overflow: hidden; font-family: Inter, system-ui, sans-serif; color: #f5f5f7; }
    .list { padding: 8px; display: flex; flex-direction: column; gap: 2px; transition: opacity .2s; }
    .win.open .list { opacity: .45; }
    .li { display: flex; align-items: center; gap: 10px; height: 36px; padding: 0 10px; border-radius: 8px; font-size: 13px; color: #e6e6e8; }
    .li.sel { background: rgba(255,255,255,.08); }
    .li svg, .it svg { width: 16px; height: 16px; flex: none; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .li svg { color: #9b9ba1; } .li small { margin-left: auto; font-size: 12px; color: #8b8b91; }
    .foot { position: absolute; left: 0; right: 0; bottom: 0; height: 40px; display: flex; align-items: center; gap: 8px; padding: 0 6px 0 12px; border-top: 1px solid rgba(255,255,255,.07); background: #1c1c1e; font-size: 12px; color: #8b8b91; }
    .foot .dot { width: 14px; height: 14px; border-radius: 4px; background: linear-gradient(135deg, #ff6363, #ff2f55); }
    .foot .sp { flex: 1; }
    .foot .open-cmd { color: #e6e6e8; } .vr { width: 1px; height: 14px; background: rgba(255,255,255,.12); }
    kbd { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 4px; background: rgba(255,255,255,.1); color: #c7c7cc; font: 500 11px Inter, system-ui, sans-serif; }
    .trig { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 6px 0 8px; border: 0; border-radius: 6px; background: transparent; color: #e6e6e8; font: 500 12px Inter, system-ui, sans-serif; cursor: pointer; transition: background .15s; }
    .trig:hover, .trig[aria-expanded="true"] { background: rgba(255,255,255,.08); }
    .trig:focus-visible { outline: 2px solid #6e6ef7; outline-offset: 1px; }
    .menu {
      position: absolute; right: 8px; bottom: 46px; width: 228px; padding: 6px; border-radius: 12px; background: #2a2a2d; border: 1px solid rgba(255,255,255,.1);
      box-shadow: 0 16px 40px -8px rgba(0,0,0,.6), 0 0 0 .5px rgba(0,0,0,.6); transform-origin: 100% 100%;
      opacity: 0; transform: scale(.96) translateY(4px); visibility: hidden; transition: opacity .15s, transform .2s ${EASE}, visibility 0s .2s;
    }
    .menu.open { opacity: 1; transform: none; visibility: visible; transition: opacity .15s, transform .25s ${EASE}, visibility 0s; }
    .it { display: flex; align-items: center; gap: 10px; width: 100%; height: 32px; padding: 0 6px 0 8px; border: 0; border-radius: 7px; background: transparent; color: #f5f5f7; font: 400 13px Inter, system-ui, sans-serif; text-align: left; cursor: pointer; outline: none;
      opacity: 0; filter: blur(4px); transform: translateY(4px); transition: opacity .2s, filter .2s, transform .3s ${EASE}, background .1s; }
    .menu.open .it { opacity: 1; filter: none; transform: none; transition-delay: calc(var(--i) * 25ms + 30ms), calc(var(--i) * 25ms + 30ms), calc(var(--i) * 25ms + 30ms), 0s; }
    .it.act { background: rgba(255,255,255,.1); }
    .it span { flex: 1; } .it .ks { display: flex; gap: 3px; flex: none; }
    .it.danger { color: #ff6363; }
    .sep { height: 1px; margin: 5px 4px; background: rgba(255,255,255,.08); }
    .search { height: 32px; display: flex; align-items: center; padding: 0 8px; font-size: 13px; color: #6f6f75; }
  `,
  html: `
    <div class="win">
      <div class="list" aria-hidden="true">
        <div class="li sel">${svg('file')}Q3 Roadmap.pdf<small>Downloads</small></div>
        <div class="li">${svg('file')}Brand Guidelines.fig<small>Design</small></div>
        <div class="li">${svg('file')}invoice-0412.pdf<small>Finance</small></div>
        <div class="li">${svg('file')}Meeting notes.md<small>Notes</small></div>
        <div class="li">${svg('file')}launch-video.mp4<small>Movies</small></div>
      </div>
      <div class="menu" role="menu" aria-label="Actions">
        ${ITEMS.slice(0, 3).map(([ic, l, ks], i) => `<button class="it" type="button" role="menuitem" tabindex="-1" style="--i:${i}">${svg(ic)}<span>${l}</span><span class="ks">${ks.map((k) => `<kbd>${k}</kbd>`).join('')}</span></button>`).join('')}
        <div class="sep"></div>
        ${ITEMS.slice(3).map(([ic, l, ks, c], i) => `<button class="it ${c}" type="button" role="menuitem" tabindex="-1" style="--i:${i + 3}">${svg(ic)}<span>${l}</span><span class="ks">${ks.map((k) => `<kbd>${k}</kbd>`).join('')}</span></button>`).join('')}
        <div class="sep"></div>
        <div class="search" aria-hidden="true">Search for actions…</div>
      </div>
      <div class="foot"><span class="dot" aria-hidden="true"></span><span class="sp"></span><span class="open-cmd">Open</span><kbd>↵</kbd><span class="vr"></span>
        <button class="trig" type="button" aria-haspopup="menu" aria-expanded="false">Actions <kbd>⌘</kbd><kbd>K</kbd></button></div>
    </div>`,
  init(root) {
    const win = root.querySelector('.win'), trig = root.querySelector('.trig'), menu = root.querySelector('.menu'), items = [...root.querySelectorAll('.it')];
    let open = false, act = 0;
    const hi = (i) => { act = (i + items.length) % items.length; items.forEach((it, k) => it.classList.toggle('act', k === act)); items[act].focus({ preventScroll: true }); };
    const set = (o, focusTrig = true) => {
      open = o; menu.classList.toggle('open', o); win.classList.toggle('open', o); trig.setAttribute('aria-expanded', String(o));
      if (o) hi(0); else { items.forEach((it) => it.classList.remove('act')); if (focusTrig) trig.focus({ preventScroll: true }); }
    };
    trig.addEventListener('click', () => set(!open));
    items.forEach((it, i) => { it.addEventListener('pointermove', () => { if (act !== i) hi(i); }); it.addEventListener('click', () => set(false)); });
    win.addEventListener('keydown', (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); set(!open); return; }
      if (!open) return;
      if (e.key === 'Escape') { e.preventDefault(); set(false); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); hi(act + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); hi(act - 1); }
    });
    win.addEventListener('pointerdown', (e) => { if (open && !menu.contains(e.target) && !trig.contains(e.target)) set(false, false); });
    win.addEventListener('focusout', (e) => { if (open && !win.contains(e.relatedTarget)) set(false, false); });
  },
};
