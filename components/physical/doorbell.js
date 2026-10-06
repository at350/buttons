// Lighted doorbell push (NuTone / Heath Zenith style): satin-brass plate with two screws, an ivory
// button in a brass bezel and the amber night-light ring around it that flares while the chime rings.
export default {
  id: 'ph-doorbell',
  credit: 'Lighted brass doorbell push (NuTone style) — amber ring glows, flares while it rings',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 20px 30px; border-radius: 12px;
      background: repeating-linear-gradient(0deg, rgba(0,0,0,.05) 0 1px, transparent 1px 14px), repeating-linear-gradient(0deg, #c9b79f 0 14px, #c2af96 14px 28px); }
    .plate {
      position: relative; width: 66px; height: 104px; border-radius: 6px;
      background:
        repeating-linear-gradient(90deg, rgba(255,255,255,.07) 0 1px, rgba(0,0,0,.03) 1px 2px),
        linear-gradient(115deg, #a88136 0%, #e3c374 30%, #bb9244 52%, #f0d690 75%, #a37a2e 100%);
      box-shadow: 0 1px 1px rgba(60,40,10,.5), 0 8px 14px -3px rgba(60,40,10,.45), inset 0 1px 0 rgba(255,245,210,.7), inset 0 -1px 0 rgba(80,55,10,.5), inset 0 0 0 1px rgba(90,60,10,.25);
    }
    .screw { position: absolute; left: 50%; width: 7px; height: 7px; margin-left: -3.5px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff2c2, #c8a04d 60%, #7a5a1c); box-shadow: inset 0 1px 1px rgba(0,0,0,.35), 0 1px 0 rgba(255,240,200,.6); }
    .screw::after { content: ''; position: absolute; left: 1px; right: 1px; top: 50%; height: 1px; background: #5b4312; transform: rotate(-30deg); }
    .screw.t { top: 8px; } .screw.b { bottom: 8px; }
    .bezel {
      position: absolute; left: 50%; top: 50%; width: 46px; height: 46px; margin: -23px; border-radius: 50%;
      background: conic-gradient(from 200deg, #8d6a26, #f6e1a2 15%, #a98236 35%, #ebcd7f 55%, #8a6622 72%, #f0d58e 88%, #8d6a26);
      box-shadow: 0 1px 1px rgba(60,40,10,.6), 0 3px 4px rgba(60,40,10,.35);
    }
    .ring {
      position: absolute; inset: 5px; border-radius: 50%;
      background: radial-gradient(circle, #ffcf6e 55%, #e89a2a 80%, #b7680f 100%);
      box-shadow: inset 0 1px 2px rgba(0,0,0,.45), 0 0 0 .5px rgba(0,0,0,.4);
      filter: brightness(.82); transition: filter .2s, box-shadow .2s;
    }
    .btn {
      position: absolute; inset: 10px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: radial-gradient(circle at 42% 32%, #ffffff, #f2eee2 45%, #d6d0bf 85%, #bdb6a2);
      box-shadow: 0 2px 0 #a59f8c, 0 3px 3px rgba(0,0,0,.45), inset 0 1px 0 #fff;
      transition: transform .14s cubic-bezier(.3,1.9,.5,1), box-shadow .14s cubic-bezier(.3,1.9,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: radial-gradient(circle at 42% 32%, #ffffff, #f6f2e8 45%, #dbd5c4 85%, #c2bba7); }
    .btn:active { transform: translateY(2px) scale(.98); box-shadow: 0 0 0 #a59f8c, 0 1px 1px rgba(0,0,0,.45), inset 0 1px 1px rgba(0,0,0,.08); transition-duration: .04s; }
    .btn:focus-visible { outline: 2px solid #fff; outline-offset: 5px; }
    .bezel.ringing .ring { animation: flare 1.1s ease-out; }
    @keyframes flare {
      0% { filter: brightness(1.35) saturate(1.2); box-shadow: inset 0 1px 2px rgba(0,0,0,.3), 0 0 10px 3px rgba(255,190,80,.9); }
      35% { filter: brightness(1.1); box-shadow: inset 0 1px 2px rgba(0,0,0,.3), 0 0 6px 1px rgba(255,190,80,.6); }
      45% { filter: brightness(1.35) saturate(1.2); box-shadow: inset 0 1px 2px rgba(0,0,0,.3), 0 0 10px 3px rgba(255,190,80,.9); }
      100% { filter: brightness(.82); box-shadow: inset 0 1px 2px rgba(0,0,0,.45), 0 0 0 .5px rgba(0,0,0,.4); }
    }
  `,
  html: `
    <div class="stage">
      <div class="plate">
        <span class="screw t"></span>
        <div class="bezel"><span class="ring"></span><button class="btn" type="button" aria-label="Ring doorbell"></button></div>
        <span class="screw b"></span>
      </div>
    </div>`,
  init(root) {
    const bezel = root.querySelector('.bezel'), ring = root.querySelector('.ring');
    root.querySelector('.btn').addEventListener('click', () => { bezel.classList.remove('ringing'); void bezel.offsetWidth; bezel.classList.add('ringing'); });
    ring.addEventListener('animationend', () => bezel.classList.remove('ringing'));
  },
};
