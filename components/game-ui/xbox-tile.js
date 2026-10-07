// Xbox Series X|S dashboard: near-black canvas, square tiles with 4px radius, the focused tile scales ~5%
// with a thick white focus frame, Segoe UI type, #107C10 Game Pass tile; the pin control toggles a pinned badge.
const XBOX = 'M4.102 21.033C6.211 22.881 8.977 24 12 24c3.026 0 5.789-1.119 7.902-2.967 1.877-1.912-4.316-8.709-7.902-11.417-3.582 2.708-9.779 9.505-7.898 11.417zm11.16-14.406c2.5 2.961 7.484 10.313 6.076 12.912C23.002 17.48 24 14.861 24 12.004c0-3.34-1.365-6.362-3.57-8.536 0 0-.027-.022-.082-.042-.063-.022-.152-.045-.281-.045-.592 0-1.985.434-4.805 3.246zM3.654 3.426c-.057.02-.082.041-.086.042C1.365 5.642 0 8.664 0 12.004c0 2.854.998 5.473 2.661 7.533-1.401-2.605 3.579-9.951 6.08-12.91-2.82-2.813-4.216-3.245-4.806-3.245-.131 0-.223.021-.281.046v-.002zM12 3.551S9.055 1.828 6.755 1.746c-.903-.033-1.454.295-1.521.339C7.379.646 9.659 0 11.984 0H12c2.334 0 4.605.646 6.766 2.085-.068-.046-.615-.372-1.52-.339C14.946 1.828 12 3.545 12 3.545v.006z';
const PIN = 'M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z';
export default {
  id: 'gm-xbox-tile',
  credit: 'Microsoft Xbox Series X|S dashboard — #107C10 Game Pass tile and neighbours; focus scales the tile with the thick white frame, the pin toggles',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; padding: 22px 22px 18px; border-radius: 12px; overflow: hidden; display: flex; gap: 12px; align-items: flex-start;
      background: radial-gradient(ellipse at 20% 0%, rgba(16,124,16,.28), transparent 60%), #0e0e0e;
      font-family: 'Segoe UI', 'Segoe UI Variable Text', system-ui, -apple-system, sans-serif; }
    .t { position: relative; flex: none; border: none; padding: 0; cursor: pointer; border-radius: 4px; color: #fff; text-align: left;
      transition: transform 167ms cubic-bezier(0,0,0,1), box-shadow 167ms cubic-bezier(0,0,0,1); box-shadow: 0 4px 10px rgba(0,0,0,.5); }
    .t::after { content: ""; position: absolute; inset: -6px; border: 3px solid #fff; border-radius: 7px; opacity: 0; transition: opacity 120ms; pointer-events: none; }
    .t:hover, .t:focus-visible, .t.sel { transform: scale(1.05); box-shadow: 0 10px 22px rgba(0,0,0,.7); outline: none; z-index: 1; }
    .t:hover::after, .t:focus-visible::after, .t.sel::after { opacity: 1; }
    .t:active { transform: scale(1.01); }
    .gp { width: 112px; height: 112px; background: #107c10; }
    .gp svg { position: absolute; left: 50%; top: 42%; width: 40px; height: 40px; transform: translate(-50%, -50%); fill: #fff; }
    .lbl { position: absolute; left: 9px; bottom: 7px; font: 600 12px/1.2 'Segoe UI', system-ui, sans-serif; white-space: nowrap; }
    .col { display: flex; flex-direction: column; gap: 12px; }
    .sm { width: 50px; height: 50px; display: grid; place-items: center; }
    .store { background: #2d2d2d; } .store svg { width: 24px; height: 24px; fill: none; stroke: #fff; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .halo { background: #1d262c url(assets/real/game-halo-infinite-cover.png) center / cover; }
    .pin { position: absolute; right: 6px; top: 6px; z-index: 2; width: 22px; height: 22px; border-radius: 50%; border: none; padding: 0; cursor: pointer; display: grid; place-items: center;
      background: rgba(0,0,0,.35); transition: background 120ms; }
    .pin svg { width: 13px; height: 13px; fill: #fff; transform: rotate(45deg); transition: transform 167ms cubic-bezier(0,0,0,1); }
    .pin:hover { background: rgba(0,0,0,.6); }
    .pin.on { background: #fff; } .pin.on svg { fill: #107c10; transform: rotate(0); }
    .pin:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .wrap { position: relative; }
  `,
  html: `
    <div class="stage">
      <div class="wrap">
        <button class="t gp" type="button" aria-pressed="false" aria-label="Xbox Game Pass"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${XBOX}"/></svg><span class="lbl">Game Pass</span></button>
        <button class="pin" type="button" aria-label="Pin to Home" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${PIN}"/></svg></button>
      </div>
      <div class="col">
        <button class="t sm store" type="button" aria-label="Microsoft Store" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 10a4 4 0 0 1-8 0"/><path d="M3.103 6.034h17.794"/><path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"/></svg></button>
        <button class="t sm halo" type="button" aria-label="Halo Infinite" aria-pressed="false"></button>
      </div>
    </div>`,
  init(root) {
    const tiles = [...root.querySelectorAll('.t')];
    tiles.forEach((t) => t.addEventListener('click', () => {
      tiles.forEach((o) => { const on = o === t && !o.classList.contains('sel'); o.classList.toggle('sel', on); o.setAttribute('aria-pressed', String(on)); });
    }));
    const pin = root.querySelector('.pin');
    pin.addEventListener('click', (e) => { e.stopPropagation(); const on = pin.classList.toggle('on'); pin.setAttribute('aria-pressed', String(on)); pin.setAttribute('aria-label', on ? 'Unpin from Home' : 'Pin to Home'); });
  },
};
