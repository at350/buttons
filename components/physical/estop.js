export default {
  id: 'ph-estop',
  credit: 'Industrial emergency-stop mushroom button (Schneider XB4 style) — press latches, press again twists to release',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 20px; border-radius: 12px; background: linear-gradient(#8e949a, #6b7177); }
    .base {
      position: relative; width: 104px; height: 104px; border-radius: 50%;
      background: #ffd400;
      box-shadow: 0 2px 3px rgba(0,0,0,.4), 0 10px 18px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.5);
    }
    .hazard {
      position: absolute; inset: 8px; border-radius: 50%;
      background: repeating-conic-gradient(#111 0 15deg, #ffd400 15deg 30deg);
      -webkit-mask: radial-gradient(circle, transparent 0 56%, #000 57%); mask: radial-gradient(circle, transparent 0 56%, #000 57%);
    }
    .collar {
      position: absolute; left: 50%; top: 50%; width: 60px; height: 60px; margin: -30px; border-radius: 50%;
      background: radial-gradient(circle at 50% 50%, #333 0 70%, #777 80%, #222 100%);
      box-shadow: inset 0 3px 5px rgba(0,0,0,.7);
    }
    .head {
      position: absolute; left: 50%; top: 50%; width: 76px; height: 76px; margin: -46px 0 0 -38px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: radial-gradient(circle at 40% 32%, #ff7b73 0, #e4201b 35%, #b90f0c 75%, #7a0806 100%);
      box-shadow: 0 10px 0 #8a0a08, 0 12px 4px rgba(0,0,0,.35), 0 16px 14px rgba(0,0,0,.35), inset 0 2px 3px rgba(255,255,255,.35);
      transition: transform .07s cubic-bezier(.4,0,.6,1), box-shadow .07s, margin .07s; -webkit-tap-highlight-color: transparent;
    }
    .head::after { content: ''; position: absolute; left: 50%; top: 50%; width: 30px; height: 30px; margin: -15px; border-radius: 50%; border: 2px solid rgba(255,255,255,.28); }
    .head:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
    .head:hover { background: radial-gradient(circle at 40% 32%, #ff8f88 0, #ea2a25 35%, #c01310 75%, #7a0806 100%); }
    .head[aria-pressed="true"] { margin-top: -38px; box-shadow: 0 2px 0 #8a0a08, 0 3px 3px rgba(0,0,0,.5), inset 0 2px 3px rgba(255,255,255,.3); }
    .head.release { animation: twist .32s ease-out; }
    @keyframes twist { 0% { transform: rotate(0); } 50% { transform: rotate(32deg); margin-top: -38px; } 100% { transform: rotate(32deg); margin-top: -46px; } }
  `,
  html: `
    <div class="stage">
      <div class="base">
        <div class="hazard"></div>
        <div class="collar"></div>
        <button class="head" type="button" aria-pressed="false" aria-label="emergency stop"></button>
      </div>
    </div>`,
  init(root) {
    const h = root.querySelector('.head');
    h.addEventListener('click', () => {
      if (h.classList.contains('release')) return;
      if (h.getAttribute('aria-pressed') === 'true') { h.classList.add('release'); }
      else h.setAttribute('aria-pressed', 'true');
    });
    h.addEventListener('animationend', () => { h.classList.remove('release'); h.setAttribute('aria-pressed', 'false'); });
  },
};
