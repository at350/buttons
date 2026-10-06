export default {
  id: 'rt-mac-traffic-lights',
  credit: 'macOS (Big Sur and later) — window traffic lights: close / minimize / zoom with hover glyphs and gray inactive state',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 220px; height: 120px; border-radius: 12px; position: relative; overflow: hidden;
      background: linear-gradient(160deg, #5d8bd8, #a879d6 55%, #f0a5b8); }
    .win { position: absolute; left: 22px; top: 18px; width: 176px; height: 84px; border-radius: 10px; background: #fff;
      box-shadow: 0 0 0 .5px rgba(0,0,0,.25), 0 8px 24px rgba(0,0,0,.28); transform-origin: 50% 100%;
      transition: transform .35s cubic-bezier(.32,.72,0,1), opacity .25s, left .3s cubic-bezier(.32,.72,0,1), top .3s cubic-bezier(.32,.72,0,1), width .3s cubic-bezier(.32,.72,0,1), height .3s cubic-bezier(.32,.72,0,1), border-radius .3s; }
    .bar { height: 28px; display: flex; align-items: center; gap: 8px; padding-left: 10px; border-radius: 10px 10px 0 0; background: #ececec; border-bottom: 1px solid #d8d8d8; }
    .win.zoomed { left: 0; top: 0; width: 220px; height: 120px; border-radius: 0; }
    .win.zoomed .bar { border-radius: 0; }
    .win.closed { opacity: 0; transform: scale(.94); pointer-events: none; }
    .win.mini { transform: translateY(60px) scale(.15, .05); opacity: 0; pointer-events: none; transition: transform .45s cubic-bezier(.5,0,.75,0), opacity .45s ease-in; }
    .l { width: 12px; height: 12px; border-radius: 50%; padding: 0; margin: 0; display: grid; place-items: center; cursor: default; outline: none; border: none; }
    .l svg { width: 8px; height: 8px; opacity: 0; }
    .lights:hover svg, .lights:focus-within svg { opacity: 1; }
    .red { background: #ff5f57; box-shadow: inset 0 0 0 .5px #e0443e; }
    .yel { background: #febc2e; box-shadow: inset 0 0 0 .5px #dea123; }
    .grn { background: #28c840; box-shadow: inset 0 0 0 .5px #1aab29; }
    .l:active { filter: brightness(.85); }
    .l:focus-visible { box-shadow: 0 0 0 2px rgba(0,122,255,.6); }
    .lights { display: flex; gap: 8px; }
    .win.inactive .l { background: #dcdcdc; box-shadow: inset 0 0 0 .5px #c8c8c8; }
    .win.inactive .lights:not(:hover) svg { opacity: 0; }
    .ttl { font: 600 13px -apple-system, system-ui, "Helvetica Neue", sans-serif; color: #4d4d4d; margin-left: 10px; }
    .win.inactive .ttl { color: #b3b3b3; }
  `,
  html: `
    <div class="stage">
      <div class="win">
        <div class="bar">
          <div class="lights">
            <button class="l red" type="button" aria-label="Close"><svg viewBox="0 0 8 8"><path d="M1.75 1.75l4.5 4.5M6.25 1.75l-4.5 4.5" stroke="#4d0000" stroke-width="1.1" stroke-linecap="round"/></svg></button>
            <button class="l yel" type="button" aria-label="Minimize"><svg viewBox="0 0 8 8"><path d="M1.2 4h5.6" stroke="#995700" stroke-width="1.2" stroke-linecap="round"/></svg></button>
            <button class="l grn" type="button" aria-label="Zoom" aria-pressed="false"><svg viewBox="0 0 8 8"><path d="M1.6 6.4V2.9l3.5 3.5zM6.4 1.6v3.5L2.9 1.6z" fill="#006500"/></svg></button>
          </div>
          <span class="ttl">Untitled</span>
        </div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), win = root.querySelector('.win'), grn = root.querySelector('.grn');
    let t = 0;
    const back = (cls, ms) => { win.classList.add(cls); clearTimeout(t); t = setTimeout(() => win.classList.remove(cls), ms); };
    root.querySelector('.red').addEventListener('click', () => back('closed', 900));
    root.querySelector('.yel').addEventListener('click', () => back('mini', 1000));
    grn.addEventListener('click', () => grn.setAttribute('aria-pressed', String(win.classList.toggle('zoomed'))));
    stage.addEventListener('pointerdown', (e) => win.classList.toggle('inactive', !win.contains(e.target)));
    return () => clearTimeout(t);
  },
};
