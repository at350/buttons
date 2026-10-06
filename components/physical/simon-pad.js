export default {
  id: 'ph-simon-pad',
  credit: 'Simon (Milton Bradley, 1978) — four colored pads that light up when pressed',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px; border-radius: 12px; background: linear-gradient(#e2e0d8, #cfccc2); }
    .disc { position: relative; width: 160px; height: 160px; border-radius: 50%; background: radial-gradient(circle, #1a1a1a, #000 70%); box-shadow: 0 6px 14px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.1); }
    .pad {
      position: absolute; width: 70px; height: 70px; border: 0; padding: 0; cursor: pointer; -webkit-tap-highlight-color: transparent;
      transition: filter .08s, box-shadow .08s, transform .05s; box-shadow: inset 0 0 0 1px rgba(0,0,0,.3), inset 0 2px 4px rgba(255,255,255,.15);
    }
    .g { left: 8px; top: 8px; border-radius: 70px 0 0 0; background: #0d8a2a; }
    .r { right: 8px; top: 8px; border-radius: 0 70px 0 0; background: #c91a1f; }
    .y { left: 8px; bottom: 8px; border-radius: 0 0 0 70px; background: #d7b400; }
    .b { right: 8px; bottom: 8px; border-radius: 0 0 70px 0; background: #0c4fc4; }
    .pad:hover { filter: brightness(1.12); }
    .pad:active, .pad.lit { transform: scale(.985); }
    .g:active, .g.lit { background: #39ff5a; box-shadow: 0 0 22px 4px rgba(60,255,90,.75), inset 0 0 0 1px rgba(0,0,0,.2); }
    .r:active, .r.lit { background: #ff4a3d; box-shadow: 0 0 22px 4px rgba(255,80,60,.75), inset 0 0 0 1px rgba(0,0,0,.2); }
    .y:active, .y.lit { background: #ffe93a; box-shadow: 0 0 22px 4px rgba(255,235,60,.8), inset 0 0 0 1px rgba(0,0,0,.2); }
    .b:active, .b.lit { background: #4a8dff; box-shadow: 0 0 22px 4px rgba(80,140,255,.8), inset 0 0 0 1px rgba(0,0,0,.2); }
    .pad:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }
    .hub { position: absolute; left: 50%; top: 50%; width: 56px; height: 56px; margin: -28px; border-radius: 50%; background: radial-gradient(circle at 45% 40%, #2a2a2a, #050505 80%); box-shadow: 0 0 0 4px #000, 0 2px 6px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.1); pointer-events: none; }
    .hub::after { content: ''; position: absolute; left: 50%; top: 50%; width: 8px; height: 8px; margin: -4px; border-radius: 50%; background: #3a0b0b; box-shadow: inset 0 1px 1px rgba(0,0,0,.8); }
  `,
  html: `
    <div class="stage">
      <div class="disc">
        <button class="pad g" type="button" aria-label="green"></button>
        <button class="pad r" type="button" aria-label="red"></button>
        <button class="pad y" type="button" aria-label="yellow"></button>
        <button class="pad b" type="button" aria-label="blue"></button>
        <span class="hub"></span>
      </div>
    </div>`,
  init(root) {
    root.querySelectorAll('.pad').forEach((p) => {
      let t = 0;
      p.addEventListener('click', () => { p.classList.add('lit'); clearTimeout(t); t = setTimeout(() => p.classList.remove('lit'), 260); });
    });
  },
};
