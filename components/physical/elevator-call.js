// Elevator hall station: hairline-brushed stainless faceplate with four security screws and a pair of
// stainless up/down call buttons. Each has a raised tactile arrow and an LED halo that stays lit once called.
const ARROW = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;

export default {
  id: 'ph-elevator-call',
  credit: 'Elevator hall call station (Otis / KONE style) — stainless up/down buttons with raised arrows and amber halos that stay lit',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 16px 30px; border-radius: 12px; background: linear-gradient(90deg, #cfcbc2, #e3e0d8 50%, #cbc7be); }
    .plate {
      position: relative; width: 76px; height: 146px; border-radius: 3px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
      background:
        repeating-linear-gradient(90deg, rgba(255,255,255,.14) 0 1px, rgba(0,0,0,.05) 1px 2px, transparent 2px 3px),
        linear-gradient(90deg, #a8acb0, #dfe2e5 30%, #b9bdc1 55%, #e4e6e8 78%, #a6aaae);
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.7), 0 1px 1px rgba(0,0,0,.3), 0 8px 14px -4px rgba(0,0,0,.35);
    }
    .screw { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff, #c5c6c9 55%, #7d7f84); box-shadow: inset 0 1px 1px rgba(0,0,0,.4), 0 1px 0 rgba(255,255,255,.6); }
    .screw::after { content: ''; position: absolute; left: 1.8px; top: 1.8px; width: 2.4px; height: 2.4px; background: #55585c; clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); }
    .screw.a { top: 6px; left: 6px; } .screw.b { top: 6px; right: 6px; } .screw.c { bottom: 6px; left: 6px; } .screw.d { bottom: 6px; right: 6px; }
    .halo { position: relative; width: 48px; height: 48px; border-radius: 50%; padding: 4px;
      background: radial-gradient(circle, #6f7378 0 64%, #e8e8e4 68%, #d8d6cf 92%, #9a9da1 100%);
      box-shadow: inset 0 1px 2px rgba(0,0,0,.35), 0 1px 0 rgba(255,255,255,.7); transition: background .12s, box-shadow .2s; }
    .btn {
      position: relative; display: block; width: 40px; height: 40px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background:
        repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,.12) 0 .6px, rgba(0,0,0,.05) .6px 1.2px),
        conic-gradient(from 210deg, #9ba0a5, #f3f5f6 14%, #b3b7bb 30%, #eceef0 50%, #959a9f 66%, #e3e6e8 84%, #9ba0a5);
      box-shadow: 0 2px 0 #7c8085, 0 3px 3px rgba(0,0,0,.4), inset 0 1px 1px rgba(255,255,255,.8), inset 0 0 0 1px rgba(0,0,0,.18);
      transition: transform .13s cubic-bezier(.3,1.9,.5,1), box-shadow .13s cubic-bezier(.3,1.9,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .btn:active { transform: translateY(2px); box-shadow: 0 0 0 #7c8085, 0 1px 1px rgba(0,0,0,.4), inset 0 1px 1px rgba(255,255,255,.6), inset 0 0 0 1px rgba(0,0,0,.2); transition-duration: .04s; }
    .btn:focus-visible { outline: 2px solid #1d4ed8; outline-offset: 6px; }
    .btn svg { position: absolute; left: 50%; top: 50%; width: 20px; height: 20px; margin: -10px; fill: url(#el-steel); stroke: rgba(0,0,0,.35); stroke-width: .7; filter: drop-shadow(0 1px .5px rgba(0,0,0,.45)); }
    .halo:has(.btn[aria-pressed="true"]) { background: radial-gradient(circle, #6f7378 0 64%, #fff6dc 68%, #ffc552 80%, #f29a13 100%); box-shadow: 0 0 12px 2px rgba(255,170,40,.55), inset 0 0 3px rgba(255,255,255,.6); }
    .btn[aria-pressed="true"] svg { fill: #ffb733; stroke: rgba(150,80,0,.6); filter: drop-shadow(0 0 2px rgba(255,170,40,.9)); }
  `,
  html: `
    <div class="stage">
      <svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="el-steel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#c4c8cc"/><stop offset="1" stop-color="#8e9398"/></linearGradient></defs></svg>
      <div class="plate">
        <span class="screw a"></span><span class="screw b"></span><span class="screw c"></span><span class="screw d"></span>
        <div class="halo"><button class="btn" type="button" aria-pressed="false" aria-label="Call elevator going up">${ARROW('M12 5 21 18H3z')}</button></div>
        <div class="halo"><button class="btn" type="button" aria-pressed="false" aria-label="Call elevator going down">${ARROW('M12 19 3 6h18z')}</button></div>
      </div>
    </div>`,
  init(root) {
    root.querySelectorAll('.btn').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
  },
};
