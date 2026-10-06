export default {
  id: 'ph-doorbell',
  credit: 'Brass doorbell with a lit ring — press it to ring',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 22px 26px; border-radius: 12px; background: linear-gradient(#b89b7a, #a4876a); }
    .plate {
      position: relative; width: 64px; height: 96px; border-radius: 6px;
      background: linear-gradient(135deg, #f2d58a 0%, #c9a24f 35%, #e9c877 55%, #a97f33 100%);
      box-shadow: 0 2px 3px rgba(0,0,0,.35), 0 8px 16px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.6), inset 0 -1px 0 rgba(0,0,0,.3);
    }
    .screw { position: absolute; left: 50%; width: 7px; height: 7px; margin-left: -3.5px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff2c2, #c8a04d 60%, #7a5a1c); box-shadow: inset 0 1px 1px rgba(0,0,0,.4); }
    .screw::after { content: ''; position: absolute; left: 1px; right: 1px; top: 50%; height: 1px; background: #5b4312; transform: rotate(-30deg); }
    .screw.t { top: 7px; } .screw.b { bottom: 7px; }
    .bezel {
      position: absolute; left: 50%; top: 50%; width: 44px; height: 44px; margin: -22px; border-radius: 50%;
      background: radial-gradient(circle at 50% 50%, #7a5a1c 0 55%, #e4c272 62%, #8f6a22 100%);
      box-shadow: inset 0 2px 3px rgba(0,0,0,.5), 0 1px 0 rgba(255,255,255,.5);
    }
    .ring {
      position: absolute; inset: 5px; border-radius: 50%; background: #c98b2a;
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.3); transition: background .15s, box-shadow .15s;
    }
    .btn {
      position: absolute; inset: 9px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: radial-gradient(circle at 40% 35%, #fff, #e9e6dc 60%, #b9b4a6);
      box-shadow: 0 2px 3px rgba(0,0,0,.5), inset 0 1px 0 #fff; transition: transform .06s, box-shadow .06s;
      -webkit-tap-highlight-color: transparent;
    }
    .btn:active { transform: translateY(1.5px); box-shadow: 0 0 1px rgba(0,0,0,.5); }
    .btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .bezel.ringing .ring { background: #ffd56a; box-shadow: 0 0 10px 3px rgba(255,200,80,.9), inset 0 0 0 1px rgba(0,0,0,.2); animation: pulse .18s 4 alternate; }
    .bezel.ringing { animation: shake .09s 7; }
    @keyframes pulse { to { background: #ff9e1a; box-shadow: 0 0 4px 1px rgba(255,160,40,.7); } }
    @keyframes shake { 0% { transform: translate(0,0); } 25% { transform: translate(-.7px, .5px); } 75% { transform: translate(.7px, -.5px); } 100% { transform: translate(0,0); } }
  `,
  html: `
    <div class="stage">
      <div class="plate">
        <span class="screw t"></span>
        <div class="bezel"><span class="ring"></span><button class="btn" type="button" aria-label="doorbell"></button></div>
        <span class="screw b"></span>
      </div>
    </div>`,
  init(root) {
    const bezel = root.querySelector('.bezel');
    const ring = root.querySelector('.ring');
    root.querySelector('.btn').addEventListener('click', () => { bezel.classList.remove('ringing'); void bezel.offsetWidth; bezel.classList.add('ringing'); });
    ring.addEventListener('animationend', () => bezel.classList.remove('ringing'));
  },
};
