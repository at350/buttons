export default {
  id: 'gm-xbox-tile',
  credit: 'Microsoft Xbox Series X|S dashboard — green game tile that lifts with a white focus frame and glow; pin toggles the corner badge',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: linear-gradient(160deg, #1f1f23, #0e0e11); padding: 24px 28px; border-radius: 12px; display: inline-flex; gap: 14px; }
    .tile { position: relative; width: 120px; height: 120px; border-radius: 6px; border: none; padding: 0; cursor: pointer; text-align: left; overflow: visible;
      background: linear-gradient(135deg, #1aa34a, #107c10 55%, #0a4d0a); color: #fff; font: 700 13px 'Inter', system-ui, sans-serif;
      box-shadow: 0 6px 14px rgba(0,0,0,.5); transition: transform .18s ease, box-shadow .18s ease; }
    .tile::before { content: ""; position: absolute; inset: -5px; border-radius: 9px; border: 3px solid #fff; opacity: 0; transition: opacity .18s; pointer-events: none; }
    .tile:hover, .tile:focus-visible, .tile.sel { transform: translateY(-6px) scale(1.04); box-shadow: 0 14px 28px rgba(0,0,0,.6), 0 0 26px rgba(16,124,16,.7); outline: none; }
    .tile:hover::before, .tile:focus-visible::before, .tile.sel::before { opacity: 1; }
    .tile:active { transform: translateY(-2px) scale(1.0); }
    .logo { position: absolute; left: 10px; top: 10px; width: 24px; height: 24px; }
    .logo svg { width: 100%; height: 100%; fill: #fff; }
    .name { position: absolute; left: 10px; bottom: 10px; right: 10px; text-shadow: 0 1px 2px rgba(0,0,0,.5); }
    .pin { position: absolute; right: 8px; top: 8px; width: 22px; height: 22px; border-radius: 50%; border: none; cursor: pointer; padding: 0;
      background: rgba(0,0,0,.45); color: #fff; display: grid; place-items: center; opacity: .75; }
    .pin svg { width: 12px; height: 12px; fill: #fff; transition: transform .2s; }
    .pin.on { background: #fff; opacity: 1; } .pin.on svg { fill: #107c10; transform: rotate(-45deg); }
    .pin:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .small { width: 60px; height: 120px; display: flex; flex-direction: column; gap: 10px; }
    .mini { flex: 1; border-radius: 6px; border: none; cursor: pointer; background: #2a2a30; transition: transform .18s, box-shadow .18s; position: relative; }
    .mini::before { content: ""; position: absolute; inset: -4px; border-radius: 8px; border: 3px solid #fff; opacity: 0; transition: opacity .18s; }
    .mini:hover, .mini:focus-visible, .mini.sel { transform: scale(1.06); outline: none; box-shadow: 0 8px 18px rgba(0,0,0,.6); }
    .mini:hover::before, .mini:focus-visible::before, .mini.sel::before { opacity: 1; }
    .m1 { background: linear-gradient(135deg, #3b6ef0, #1e3a8a); } .m2 { background: linear-gradient(135deg, #e94b7a, #7a1d3a); }
  `,
  html: `
    <div class="stage">
      <div style="position:relative">
        <button class="tile" type="button" aria-pressed="false">
          <span class="logo"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-6.4 2.3c1.9-.6 4.3.9 6.4 2.6 2.1-1.7 4.5-3.2 6.4-2.6A10 10 0 0 0 12 2zM4.3 5.9A10 10 0 0 0 5.2 19c-.6-2.9 2.4-7.6 4.9-10.5C8.1 6.6 5.9 5.4 4.3 5.9zm15.4 0c-1.6-.5-3.8.7-5.8 2.6 2.5 2.9 5.5 7.6 4.9 10.5a10 10 0 0 0 .9-13.1zM12 10.4c-3.5 3.3-6.9 7.9-5.6 9.8A10 10 0 0 0 12 22a10 10 0 0 0 5.6-1.8c1.3-1.9-2.1-6.5-5.6-9.8z"/></svg></span>
          <span class="name">Halo Infinite</span>
        </button>
        <button class="pin" type="button" aria-label="Pin" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M14 2l8 8-3 1-3 3 .5 5.5L14 17l-4 4-1-1 4-4-2.5-2.5L5 14l1-3 3-3 1-3 2 2 2-2z"/></svg></button>
      </div>
      <div class="small">
        <button class="mini m1" type="button" aria-label="Store" aria-pressed="false"></button>
        <button class="mini m2" type="button" aria-label="Game Pass" aria-pressed="false"></button>
      </div>
    </div>`,
  init(root) {
    const tiles = [...root.querySelectorAll('.tile, .mini')];
    tiles.forEach((t) => t.addEventListener('click', () => {
      tiles.forEach((o) => { const on = o === t && !o.classList.contains('sel'); o.classList.toggle('sel', on); o.setAttribute('aria-pressed', String(on)); });
    }));
    const pin = root.querySelector('.pin');
    pin.addEventListener('click', (e) => { e.stopPropagation(); const on = pin.classList.toggle('on'); pin.setAttribute('aria-pressed', String(on)); });
  },
};
