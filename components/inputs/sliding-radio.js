// macOS Finder toolbar "View" control (Big Sur → Sequoia): four borderless 36×28 toolbar segments —
// Icons, List, Columns, Gallery — on the #f6f6f6 unified toolbar; the selected one sits on a 6px-radius
// rgba(0,0,0,.1) plate that glides between segments (AppKit spring), unselected glyphs labelColor at 50%.
export default {
  id: 'in-sliding-radio',
  credit: 'macOS Finder toolbar view control — Icons / List / Columns / Gallery, the gray selection plate glides between them',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .bar { display: inline-flex; padding: 8px 10px; border-radius: 12px; background: #f6f6f6; box-shadow: inset 0 -1px 0 rgba(0,0,0,.1); }
    .g { position: relative; display: inline-flex; }
    .plate { position: absolute; top: 0; left: 0; width: 36px; height: 28px; border-radius: 6px; background: rgba(0,0,0,.1); transition: transform .3s cubic-bezier(.32,.72,0,1); }
    .o {
      position: relative; z-index: 1; width: 36px; height: 28px; border: 0; background: none; padding: 0; cursor: default; border-radius: 6px;
      display: grid; place-items: center; color: rgba(0,0,0,.5); transition: color .15s, background-color .15s; -webkit-tap-highlight-color: transparent;
    }
    .o:hover:not([aria-checked="true"]) { background: rgba(0,0,0,.05); color: rgba(0,0,0,.7); }
    .o:active { color: rgba(0,0,0,.9); }
    .o:focus-visible { outline: 3px solid rgba(0,122,255,.5); outline-offset: -1px; }
    .o[aria-checked="true"] { color: rgba(0,0,0,.85); }
    .o svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `<div class="bar"><div class="g" role="radiogroup" aria-label="View">
    <span class="plate"></span>
    <button class="o" type="button" role="radio" aria-checked="true" aria-label="as Icons"><svg viewBox="0 0 24 24"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg></button>
    <button class="o" type="button" role="radio" aria-checked="false" aria-label="as List"><svg viewBox="0 0 24 24"><path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/></svg></button>
    <button class="o" type="button" role="radio" aria-checked="false" aria-label="as Columns"><svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="M15 3v18"/></svg></button>
    <button class="o" type="button" role="radio" aria-checked="false" aria-label="as Gallery"><svg viewBox="0 0 24 24"><path d="M7 2h10"/><path d="M5 6h14"/><rect width="18" height="12" x="3" y="10" rx="2"/></svg></button>
  </div></div>`,
  init(root) {
    const g = root.querySelector('.g'), plate = root.querySelector('.plate');
    const opts = [...root.querySelectorAll('.o')];
    let idx = 0;
    const set = (i, focus) => {
      idx = (i + opts.length) % opts.length;
      opts.forEach((o, j) => o.setAttribute('aria-checked', j === idx));
      plate.style.transform = 'translateX(' + idx * 36 + 'px)';
      if (focus) opts[idx].focus({ preventScroll: true });
    };
    opts.forEach((o, i) => o.addEventListener('click', () => set(i)));
    g.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); set(idx + 1, true); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); set(idx - 1, true); }
    });
  },
};
