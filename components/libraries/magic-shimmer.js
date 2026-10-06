export default {
  id: 'lb-magic-shimmer',
  credit: 'Magic UI — Shimmer Button: the spark slides edge to edge (shimmer-slide, 3s alternate) while spinning with holds at 90° / 270° (spin-around, 6s), cut 0.05em inside a black pill',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 36px; border-radius: 12px; background: #fff; display: inline-block; overflow: hidden; }
    .sh { --spread: 90deg; --shimmer-color: #ffffff; --radius: 100px; --speed: 3s; --cut: 0.05em; --bg: rgba(0, 0, 0, 1);
      position: relative; z-index: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; white-space: nowrap;
      padding: 12px 24px; border-radius: var(--radius); border: 1px solid rgba(255,255,255,.1); background: var(--bg); color: #fff; cursor: pointer;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,.25);
      transform: translateZ(0); transition: transform .3s ease-in-out; -webkit-tap-highlight-color: transparent; }
    .sh:active { transform: translateY(1px); }
    .sh:focus-visible { outline: 2px solid #171717; outline-offset: 3px; }
    .spark { position: absolute; inset: 0; z-index: -3; overflow: visible; container-type: size; filter: blur(2px); }
    .slide { position: absolute; inset: 0; height: 100cqh; aspect-ratio: 1; border-radius: 0; animation: shimmer-slide var(--speed) ease-in-out infinite alternate; }
    .cone { position: absolute; inset: -100%; width: auto;
      background: conic-gradient(from calc(270deg - (var(--spread) * 0.5)), transparent 0, var(--shimmer-color) var(--spread), transparent var(--spread));
      animation: spin-around calc(var(--speed) * 2) infinite linear; }
    @keyframes shimmer-slide { to { transform: translate(calc(100cqw - 100%), 0); } }
    @keyframes spin-around { 0% { transform: translateZ(0) rotate(0); } 15%, 35% { transform: translateZ(0) rotate(90deg); } 65%, 85% { transform: translateZ(0) rotate(270deg); } 100% { transform: translateZ(0) rotate(360deg); } }
    .lbl { font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; letter-spacing: -0.025em; text-align: center; }
    .hl { position: absolute; inset: 0; border-radius: 16px; box-shadow: inset 0 -8px 10px #ffffff1f; transform: translateZ(0); transition: all .3s ease-in-out; }
    .sh:hover .hl { box-shadow: inset 0 -6px 10px #ffffff3f; }
    .sh:active .hl { box-shadow: inset 0 -10px 10px #ffffff3f; }
    .backdrop { position: absolute; inset: var(--cut); z-index: -2; border-radius: var(--radius); background: var(--bg); }
  `,
  html: `
    <div class="stage">
      <button class="sh" type="button">
        <span class="spark"><span class="slide"><span class="cone"></span></span></span>
        <span class="lbl">Shimmer Button</span>
        <span class="hl"></span>
        <span class="backdrop"></span>
      </button>
    </div>`,
};
