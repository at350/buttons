export default {
  id: 'gm-dualsense-face',
  credit: 'Sony DualSense (PS5) — △ ○ ✕ □ face-button cluster; each lights up and stays lit when pressed',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: radial-gradient(circle at 50% 40%, #f4f4f6, #d9d9de 70%, #c4c4cb); padding: 16px; border-radius: 12px; }
    .pad { position: relative; width: 112px; height: 112px; }
    .fb { position: absolute; width: 36px; height: 36px; border-radius: 50%; border: none; padding: 0; cursor: pointer;
      background: radial-gradient(circle at 50% 35%, #2c2c33, #15151a 70%); box-shadow: 0 2px 0 #0a0a0c, 0 3px 4px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.08);
      display: grid; place-items: center; transition: transform .06s, box-shadow .06s, filter .2s; }
    .fb svg { width: 16px; height: 16px; fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; transition: filter .2s; }
    .tri { left: 38px; top: 0; }
    .tri svg { stroke: #2fbf7f; }
    .cir { right: 0; top: 38px; }
    .cir svg { stroke: #ff4a5a; }
    .cro { left: 38px; bottom: 0; }
    .cro svg { stroke: #6f9cff; }
    .squ { left: 0; top: 38px; }
    .squ svg { stroke: #ff7bd1; }
    .fb:active { transform: translateY(2px); box-shadow: 0 0 0 #0a0a0c, inset 0 2px 4px rgba(0,0,0,.6); }
    .fb.on svg { filter: drop-shadow(0 0 4px currentColor) drop-shadow(0 0 9px currentColor); }
    .tri.on svg { color: #2fbf7f; }
    .cir.on svg { color: #ff4a5a; }
    .cro.on svg { color: #6f9cff; }
    .squ.on svg { color: #ff7bd1; }
    .fb.on { background: radial-gradient(circle at 50% 35%, #3a3a44, #1b1b22 70%); }
    .fb:focus-visible { outline: 2px solid #2e6cf6; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="pad">
        <button class="fb tri" type="button" aria-label="Triangle" aria-pressed="false"><svg viewBox="0 0 16 16"><path d="M8 2.5 14 13H2z"/></svg></button>
        <button class="fb cir" type="button" aria-label="Circle" aria-pressed="false"><svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5"/></svg></button>
        <button class="fb cro" type="button" aria-label="Cross" aria-pressed="false"><svg viewBox="0 0 16 16"><path d="M3 3l10 10M13 3 3 13"/></svg></button>
        <button class="fb squ" type="button" aria-label="Square" aria-pressed="false"><svg viewBox="0 0 16 16"><rect x="3" y="3" width="10" height="10"/></svg></button>
      </div>
    </div>`,
  init(root) {
    root.querySelectorAll('.fb').forEach((b) => b.addEventListener('click', () => {
      const on = b.classList.toggle('on'); b.setAttribute('aria-pressed', String(on));
    }));
  },
};
