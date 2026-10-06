export default {
  id: 'gm-switch-tile',
  credit: 'Nintendo Switch HOME menu — game tiles with the pulsing cyan selection frame, title above and the Ⓐ "Start" prompt',
  size: 'wide',
  css: `
    :host { display: block; max-width: 100%; }
    .stage { background: #ebebeb; border-radius: 12px; padding: 14px 18px 12px; overflow: hidden; font-family: 'Inter', system-ui, sans-serif; }
    .title { height: 16px; font: 600 12px/16px 'Inter', system-ui, sans-serif; color: #2d2d2d; margin-bottom: 8px; padding-left: 2px; }
    .row { display: flex; gap: 8px; }
    .tile { width: 56px; height: 56px; flex: none; border: none; padding: 0; cursor: pointer; border-radius: 3px; position: relative; box-shadow: 0 1px 3px rgba(0,0,0,.2); }
    .tile::after { content: ""; position: absolute; inset: -4px; border: 4px solid #22c4d6; border-radius: 5px; opacity: 0; pointer-events: none; }
    .tile.sel::after { opacity: 1; animation: glow 1.3s ease-in-out infinite alternate; }
    @keyframes glow { from { border-color: #19a7d9; box-shadow: 0 0 6px rgba(25,167,217,.6); } to { border-color: #7fe7ff; box-shadow: 0 0 12px rgba(127,231,255,.9); } }
    .tile:focus-visible { outline: 2px solid #ff4554; outline-offset: 6px; }
    .a1 { background: linear-gradient(135deg, #ffd34d, #ff8a00 60%, #d94f00); } .a2 { background: linear-gradient(135deg, #8ad6ff, #2a7fd6 60%, #163f99); }
    .a3 { background: linear-gradient(135deg, #e74c3c, #7a1313); } .a4 { background: linear-gradient(135deg, #9be68c, #2e8b57 65%, #14472b); }
    .a5 { background: linear-gradient(135deg, #f7f7f7, #c7c7c7); } .a6 { background: linear-gradient(135deg, #c993ff, #6b2fbf); }
    .tile svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .foot { display: flex; justify-content: flex-end; align-items: center; gap: 14px; margin-top: 10px; font: 500 11px 'Inter', system-ui, sans-serif; color: #2d2d2d; }
    .k { display: inline-flex; align-items: center; gap: 5px; }
    .key { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid #2d2d2d; display: grid; place-items: center; font: 700 9px 'Inter', system-ui, sans-serif; }
    .foot .btn { border: none; background: none; cursor: pointer; padding: 0; font: inherit; color: inherit; }
    .foot .btn:focus-visible { outline: 2px solid #22c4d6; border-radius: 4px; }
    .k.on .key { background: #2d2d2d; color: #fff; }
  `,
  html: `
    <div class="stage">
      <div class="title">Animal Crossing: New Horizons</div>
      <div class="row" role="listbox" aria-label="Software">
        <button class="tile a1 sel" type="button" role="option" aria-selected="true" aria-label="Animal Crossing: New Horizons"><svg viewBox="0 0 10 10"><path d="M5 2 7 4.5 5 7 3 4.5z" fill="#fff" opacity=".8"/></svg></button>
        <button class="tile a2" type="button" role="option" aria-selected="false" aria-label="Mario Kart 8 Deluxe"><svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="2.2" fill="#fff" opacity=".8"/></svg></button>
        <button class="tile a3" type="button" role="option" aria-selected="false" aria-label="Super Mario Odyssey"><svg viewBox="0 0 10 10"><rect x="3" y="2.5" width="4" height="5" rx=".5" fill="#fff" opacity=".8"/></svg></button>
        <button class="tile a4" type="button" role="option" aria-selected="false" aria-label="Zelda"><svg viewBox="0 0 10 10"><path d="M5 2 8 7H2z" fill="#fff" opacity=".8"/></svg></button>
        <button class="tile a5" type="button" role="option" aria-selected="false" aria-label="Nintendo eShop"><svg viewBox="0 0 10 10"><path d="M2 4h6l-.6 4H2.6z" fill="#ff4554"/></svg></button>
        <button class="tile a6" type="button" role="option" aria-selected="false" aria-label="Tetris 99"><svg viewBox="0 0 10 10"><path d="M2 5h2v2H2zM4 3h2v2H4zM6 5h2v2H6z" fill="#fff" opacity=".8"/></svg></button>
      </div>
      <div class="foot">
        <button class="btn k" type="button" aria-pressed="false"><span class="key">+</span>Options</button>
        <button class="btn k start" type="button" aria-pressed="false"><span class="key">A</span>Start</button>
      </div>
    </div>`,
  init(root) {
    const tiles = [...root.querySelectorAll('.tile')], title = root.querySelector('.title'), start = root.querySelector('.start');
    const pick = (t) => { tiles.forEach((o) => { const on = o === t; o.classList.toggle('sel', on); o.setAttribute('aria-selected', String(on)); }); title.textContent = t.getAttribute('aria-label'); start.classList.remove('on'); start.setAttribute('aria-pressed', 'false'); };
    tiles.forEach((t, i) => {
      t.addEventListener('click', () => pick(t));
      t.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!d) return; e.preventDefault(); const n = tiles[(i + d + tiles.length) % tiles.length]; pick(n); n.focus(); });
    });
    root.querySelectorAll('.foot .btn').forEach((b) => b.addEventListener('click', () => { const on = b.classList.toggle('on'); b.setAttribute('aria-pressed', String(on)); }));
  },
};
