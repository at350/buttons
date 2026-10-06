export default {
  id: 'ph-do-not-press',
  credit: '"DO NOT PRESS" — engraved brass plaque, big red button. You will press it.',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px 26px; border-radius: 12px; background: linear-gradient(#2b2d31, #15161a); position: relative; overflow: hidden; }
    .stage.alarm { animation: alarm .5s 2; }
    @keyframes alarm { 0%, 100% { background: linear-gradient(#2b2d31, #15161a); } 50% { background: linear-gradient(#7a1010, #3a0606); } }
    .plaque {
      padding: 5px 12px; border-radius: 3px; font: 800 11px/1 ui-monospace, Menlo, monospace; letter-spacing: 2px; color: #4a3608;
      background: linear-gradient(135deg, #f2d58a, #c9a24f 40%, #e9c877 60%, #a97f33);
      text-shadow: 0 1px 0 rgba(255,255,255,.55); box-shadow: 0 1px 2px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.5);
    }
    .ring { position: relative; width: 84px; height: 84px; border-radius: 50%; background: radial-gradient(circle, #111 0 62%, #8a8d92 66%, #d9dcdf 70%, #5c5f64 78%); box-shadow: inset 0 3px 6px rgba(0,0,0,.8), 0 2px 3px rgba(0,0,0,.6); }
    .btn {
      position: absolute; left: 50%; top: 50%; width: 60px; height: 60px; margin: -34px 0 0 -30px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: radial-gradient(circle at 40% 30%, #ff9a92, #e82a22 38%, #a90d0a 88%);
      box-shadow: 0 8px 0 #6e0705, 0 10px 6px rgba(0,0,0,.6), inset 0 2px 3px rgba(255,255,255,.35);
      transition: margin .07s, box-shadow .07s; -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: radial-gradient(circle at 40% 30%, #ffaba4, #ef352d 38%, #b2110e 88%); }
    .btn:active { margin-top: -27px; box-shadow: 0 1px 0 #6e0705, 0 2px 2px rgba(0,0,0,.6), inset 0 2px 3px rgba(255,255,255,.3); }
    .btn:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
    .stage.alarm .plaque { animation: wobble .12s 8; }
    @keyframes wobble { 0%, 100% { transform: rotate(0); } 50% { transform: rotate(-3deg); } }
  `,
  html: `
    <div class="stage">
      <span class="plaque">DO NOT PRESS</span>
      <div class="ring"><button class="btn" type="button" aria-label="do not press"></button></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage');
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => { stage.classList.remove('alarm'); void stage.offsetWidth; stage.classList.add('alarm'); });
    stage.addEventListener('animationend', (e) => { if (e.target === stage) stage.classList.remove('alarm'); });
  },
};
