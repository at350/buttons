const SPRING = 'linear(0, 0.144, 0.433, 0.717, 0.926, 1.046, 1.091, 1.09, 1.066, 1.038, 1.014, 1, 0.992, 0.991, 0.993, 0.995, 0.998, 1, 1.001)';

export default {
  id: 'mo-stagger-menu',
  credit: 'Staggered menu reveal — the panel pops with display/@starting-style + allow-discrete, items cascade in from blur to sharp (Raycast / Arc menus)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { position: relative; width: 200px; height: 240px; font-family: Inter, system-ui, sans-serif; }
    .trig { position: absolute; top: 0; left: 0; height: 40px; padding: 0 14px; border-radius: 10px; border: 1px solid #e2e2de; background: #fff; color: #111; font: 500 13.5px Inter, system-ui, sans-serif; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 1px 2px rgba(0,0,0,.05); transition: background .2s, transform .15s; }
    .trig:hover { background: #f7f7f5; } .trig:active { transform: scale(.97); }
    .trig:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .trig svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; transition: transform .45s ${SPRING}; }
    .trig[aria-expanded="true"] svg { transform: rotate(180deg); }
    .menu {
      position: absolute; top: 48px; left: 0; width: 200px; padding: 6px; border-radius: 12px; background: #fff; border: 1px solid #e5e5e0; box-shadow: 0 12px 30px -10px rgba(0,0,0,.25);
      display: none; opacity: 0; transform: translateY(-8px) scale(.96); transform-origin: top left;
      transition: opacity .25s, transform .45s ${SPRING}, display .45s allow-discrete, overlay .45s allow-discrete;
    }
    .menu.open { display: block; opacity: 1; transform: none; }
    @starting-style { .menu.open { opacity: 0; transform: translateY(-8px) scale(.96); } }
    .it { display: flex; align-items: center; gap: 10px; width: 100%; height: 34px; padding: 0 10px; border: 0; border-radius: 8px; background: transparent; color: #222; font: 500 13px Inter, system-ui, sans-serif; cursor: pointer; text-align: left;
      opacity: 0; transform: translateY(6px); filter: blur(5px); transition: opacity .3s, transform .5s ${SPRING}, filter .3s, background .15s; }
    .menu.open .it { opacity: 1; transform: none; filter: none; transition-delay: calc(var(--i) * 45ms + 40ms); }
    .it:hover { background: #f3f3f0; } .it:focus-visible { outline: 2px solid #111; outline-offset: -2px; }
    .it svg { width: 15px; height: 15px; fill: none; stroke: #666; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .it kbd { margin-left: auto; font: 500 11px 'JetBrains Mono', ui-monospace, monospace; color: #999; }
    .sep { height: 1px; background: #efefeb; margin: 4px 6px; }
  `,
  html: `
    <div class="wrap">
      <button class="trig" type="button" aria-expanded="false" aria-haspopup="menu">Actions<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
      <div class="menu" role="menu">
        <button class="it" type="button" role="menuitem" style="--i:0"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>New file<kbd>N</kbd></button>
        <button class="it" type="button" role="menuitem" style="--i:1"><svg viewBox="0 0 24 24"><path d="M4 20h4l10-10-4-4L4 16z"/></svg>Rename<kbd>R</kbd></button>
        <button class="it" type="button" role="menuitem" style="--i:2"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4V4h11v1"/></svg>Duplicate<kbd>D</kbd></button>
        <div class="sep"></div>
        <button class="it" type="button" role="menuitem" style="--i:3"><svg viewBox="0 0 24 24"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M12 3v12M8 7l4-4 4 4"/></svg>Share<kbd>S</kbd></button>
        <button class="it" type="button" role="menuitem" style="--i:4"><svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>Delete<kbd>⌫</kbd></button>
      </div>
    </div>`,
  init(root) {
    const wrap = root.querySelector('.wrap'), trig = root.querySelector('.trig'), menu = root.querySelector('.menu'), items = [...root.querySelectorAll('.it')];
    const set = (o) => { menu.classList.toggle('open', o); trig.setAttribute('aria-expanded', String(o)); };
    trig.addEventListener('click', () => set(!menu.classList.contains('open')));
    items.forEach((it) => it.addEventListener('click', () => { set(false); trig.focus(); }));
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { set(false); trig.focus(); }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); if (!menu.classList.contains('open')) set(true);
        const i = items.indexOf(root.activeElement); items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus();
      }
    });
    wrap.addEventListener('focusout', (e) => { if (!wrap.contains(e.relatedTarget)) set(false); });
  },
};
