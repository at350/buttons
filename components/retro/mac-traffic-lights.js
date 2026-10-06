export default {
  id: 'rt-mac-traffic-lights',
  credit: 'macOS — window traffic lights (close / minimize / zoom) with hover glyphs',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #e8e8e8; padding: 10px 14px; border-radius: 12px; display: inline-block; }
    .bar { display: flex; gap: 8px; padding: 2px; border-radius: 8px; }
    .bar:hover .l svg, .bar:focus-within .l svg { opacity: 1; }
    .l { width: 12px; height: 12px; border-radius: 50%; border: .5px solid rgba(0,0,0,.18); padding: 0; display: grid; place-items: center; cursor: default; transition: transform .15s, opacity .2s; }
    .l svg { width: 8px; height: 8px; opacity: 0; transition: opacity .12s; }
    .l:active { filter: brightness(.8); }
    .l:focus-visible { outline: 2px solid #3d7cf4; outline-offset: 2px; }
    .red { background: #ff5f57; } .yel { background: #febc2e; } .grn { background: #28c840; }
    .red.gone { transform: scale(0); }
    .yel.mini { transform: translateY(14px) scale(.6); opacity: .4; }
    .grn.zoom { transform: scale(1.6); }
  `,
  html: `
    <div class="stage">
      <div class="bar">
        <button class="l red" type="button" aria-label="Close"><svg viewBox="0 0 8 8"><path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="#4d0000" stroke-width="1.3" stroke-linecap="round"/></svg></button>
        <button class="l yel" type="button" aria-label="Minimize"><svg viewBox="0 0 8 8"><path d="M1.2 4h5.6" stroke="#995700" stroke-width="1.3" stroke-linecap="round"/></svg></button>
        <button class="l grn" type="button" aria-label="Zoom" aria-pressed="false"><svg viewBox="0 0 8 8"><path d="M1.5 6.5V3h3.5zM6.5 1.5V5H3z" fill="#006500"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const red = root.querySelector('.red'), yel = root.querySelector('.yel'), grn = root.querySelector('.grn');
    red.addEventListener('click', () => { red.classList.add('gone'); setTimeout(() => red.classList.remove('gone'), 900); });
    yel.addEventListener('click', () => { yel.classList.add('mini'); setTimeout(() => yel.classList.remove('mini'), 900); });
    grn.addEventListener('click', () => { const on = grn.classList.toggle('zoom'); grn.setAttribute('aria-pressed', String(on)); });
  },
};
