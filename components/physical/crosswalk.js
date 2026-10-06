// Polara Navigator-style accessible pedestrian push-button station: yellow housing with speaker grille,
// a 2" stainless Bulldog-type piezo button with a raised tactile arrow and a red confirmation LED.
export default {
  id: 'ph-crosswalk',
  credit: 'Polara Navigator / Bulldog-style crosswalk button — stainless piezo dome with raised arrow, red LED confirms the call',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 16px 24px; border-radius: 12px; background: linear-gradient(90deg, #5d666e, #8a939a 45%, #616a72); }
    .box {
      position: relative; width: 96px; height: 140px; border-radius: 10px 10px 8px 8px;
      background: linear-gradient(160deg, #ffd43a, #f2b705 55%, #d79e00);
      box-shadow: 0 1px 1px rgba(0,0,0,.4), 0 10px 18px -4px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.55), inset 0 -3px 0 rgba(120,80,0,.25);
    }
    .grille { position: absolute; left: 22px; right: 22px; top: 14px; height: 26px; display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px 5px; }
    .grille i { height: 5px; border-radius: 3px; background: #2a2000; box-shadow: inset 0 1px 1px #000, 0 1px 0 rgba(255,255,255,.45); }
    .bezel {
      position: absolute; left: 50%; top: 52px; width: 70px; height: 70px; margin-left: -35px; border-radius: 50%;
      background: radial-gradient(circle, #34383c 0 66%, #9aa0a6 70%, #e9ecef 76%, #8c9298 86%, #c9cdd1 100%);
      box-shadow: 0 2px 3px rgba(80,50,0,.5), inset 0 1px 1px rgba(255,255,255,.6);
    }
    .btn {
      position: absolute; left: 11px; top: 11px; width: 48px; height: 48px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background:
        repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,.10) 0 .7px, rgba(0,0,0,.05) .7px 1.4px),
        conic-gradient(from 210deg, #9da3a9, #f4f6f7 14%, #b1b6bb 30%, #eceff1 50%, #979da3 66%, #e4e7ea 84%, #9da3a9);
      box-shadow: 0 2px 2px rgba(0,0,0,.6), inset 0 0 0 1px rgba(0,0,0,.25), inset 0 2px 2px rgba(255,255,255,.75);
      transition: transform .12s cubic-bezier(.3,1.8,.5,1), box-shadow .12s; -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { box-shadow: 0 2px 2px rgba(0,0,0,.6), inset 0 0 0 1px rgba(0,0,0,.25), inset 0 2px 2px rgba(255,255,255,.9), inset 0 0 12px rgba(255,255,255,.35); }
    .btn:active { transform: translateY(1px) scale(.985); box-shadow: 0 0 1px rgba(0,0,0,.7), inset 0 0 0 1px rgba(0,0,0,.3), inset 0 2px 3px rgba(0,0,0,.2); transition-duration: .04s; }
    .btn:focus-visible { outline: 3px solid #111; outline-offset: 4px; }
    .btn svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .arrow { fill: url(#cw-steel); stroke: rgba(0,0,0,.35); stroke-width: .6; filter: drop-shadow(0 1.2px .6px rgba(0,0,0,.45)); }
    .led { fill: #4a0d0d; stroke: rgba(0,0,0,.6); stroke-width: .6; transition: fill .08s; }
    .btn.on .led { fill: #ff2b1f; filter: drop-shadow(0 0 3px #ff3b2a); animation: led 2.6s ease-in forwards; }
    @keyframes led { 0%, 80% { fill: #ff2b1f; } 100% { fill: #4a0d0d; filter: none; } }
  `,
  html: `
    <div class="stage">
      <div class="box">
        <div class="grille" aria-hidden="true">${'<i></i>'.repeat(18)}</div>
        <div class="bezel">
          <button class="btn" type="button" aria-label="Push button for walk signal">
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <defs><linearGradient id="cw-steel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfcfd"/><stop offset=".55" stop-color="#c3c8cd"/><stop offset="1" stop-color="#8d9399"/></linearGradient></defs>
              <path class="arrow" d="M9 21.5h20v-7l11 9.5-11 9.5v-7H9z"/>
              <circle class="led" cx="24" cy="12" r="2.6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>`,
  init(root) {
    const btn = root.querySelector('.btn'), led = root.querySelector('.led');
    btn.addEventListener('click', () => { btn.classList.remove('on'); void btn.offsetWidth; btn.classList.add('on'); });
    led.addEventListener('animationend', () => btn.classList.remove('on'));
  },
};
