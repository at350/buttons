export default {
  id: 'au-push-start',
  credit: 'Push-to-start ignition — brushed-aluminium "ENGINE START STOP" button in a chrome bezel; press to crank (amber ring pulses, the button shudders) and the ring settles to green while running',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: grid; place-items: center; width: 190px; height: 190px; border-radius: 12px; background: radial-gradient(circle at 50% 40%, #2c2d30, #121315 70%), #121315; }
    .bezel { position: relative; width: 132px; height: 132px; border-radius: 50%; background: conic-gradient(from 200deg, #f2f2f2, #8b8f95, #e6e7e9, #6e7278, #f2f2f2, #9a9ea4, #f2f2f2); box-shadow: 0 8px 16px rgba(0,0,0,.7), inset 0 0 0 1px rgba(0,0,0,.4); display: grid; place-items: center; }
    .well { position: relative; width: 116px; height: 116px; border-radius: 50%; background: #0b0b0c; box-shadow: inset 0 3px 6px rgba(0,0,0,.9); display: grid; place-items: center; }
    .ring { position: absolute; inset: 4px; border-radius: 50%; box-shadow: 0 0 0 2px #2a2a2a, inset 0 0 0 2px #2a2a2a; transition: box-shadow .4s; }
    .crank .ring { animation: amber .45s ease-in-out infinite alternate; }
    @keyframes amber { from { box-shadow: 0 0 0 2px #7a4a00, inset 0 0 0 2px #7a4a00; } to { box-shadow: 0 0 0 2px #ffb000, 0 0 14px 2px rgba(255,176,0,.75), inset 0 0 0 2px #ffb000, inset 0 0 12px rgba(255,176,0,.6); } }
    .run .ring { box-shadow: 0 0 0 2px #2dff7a, 0 0 16px 3px rgba(45,255,122,.6), inset 0 0 0 2px #2dff7a, inset 0 0 12px rgba(45,255,122,.5); }
    .btn {
      position: relative; width: 96px; height: 96px; border: 0; padding: 0; border-radius: 50%; cursor: pointer; color: #1d1f22;
      background: radial-gradient(circle at 50% 50%, transparent 0 60%, rgba(0,0,0,.08) 61%, transparent 63%), repeating-radial-gradient(circle at 50% 50%, #c9ccd1 0 1px, #b4b8be 1px 2px, #d6d8dc 2px 3px), #c4c7cc;
      box-shadow: 0 4px 0 #6f737a, 0 6px 10px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.9), inset 0 -2px 3px rgba(0,0,0,.25);
      display: grid; place-items: center; align-content: center; gap: 3px; transition: transform .08s, box-shadow .08s; -webkit-tap-highlight-color: transparent;
    }
    .btn::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from 30deg, rgba(255,255,255,.55), transparent 15%, transparent 35%, rgba(255,255,255,.4) 50%, transparent 65%, transparent 85%, rgba(255,255,255,.55)); mix-blend-mode: soft-light; pointer-events: none; }
    .btn:hover { filter: brightness(1.04); }
    .btn:active { transform: translateY(3px); box-shadow: 0 1px 0 #6f737a, 0 2px 4px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.7), inset 0 -1px 2px rgba(0,0,0,.25); }
    .btn:focus-visible { outline: 2px solid #4da3ff; outline-offset: 10px; }
    .crank .btn { animation: shake .09s linear infinite; }
    @keyframes shake { 25% { transform: translate(.6px, -.4px); } 75% { transform: translate(-.6px, .4px); } }
    .btn span { position: relative; font: 700 11px/1 Inter, 'Helvetica Neue', system-ui, sans-serif; letter-spacing: .14em; margin-right: -.14em; }
    .btn span.s { font-size: 8.5px; letter-spacing: .2em; margin-right: -.2em; color: #3a3d42; }
    .btn i { position: relative; width: 26px; height: 1px; background: rgba(0,0,0,.35); box-shadow: 0 1px 0 rgba(255,255,255,.7); }
  `,
  html: `
    <div class="stage">
      <div class="bezel"><div class="well"><span class="ring"></span>
        <button class="btn" type="button" aria-pressed="false" aria-label="Engine start stop"><span>ENGINE</span><i></i><span class="s">START</span><span class="s">STOP</span></button>
      </div></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), btn = root.querySelector('.btn');
    let t = 0, state = 'off';
    btn.addEventListener('click', () => {
      clearTimeout(t);
      if (state === 'off') {
        state = 'crank'; stage.classList.add('crank');
        t = setTimeout(() => { state = 'run'; stage.classList.remove('crank'); stage.classList.add('run'); btn.setAttribute('aria-pressed', 'true'); }, 900);
      } else {
        state = 'off'; stage.classList.remove('crank', 'run'); btn.setAttribute('aria-pressed', 'false');
      }
    });
    return () => clearTimeout(t);
  },
};
