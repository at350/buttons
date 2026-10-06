// UK 86 × 86 mm one-gang white moulded plate (MK Logic Plus 20A DP switch with neon style): screw
// fixings left and right, a rocker that is pressed at the bottom for ON (UK convention), and a red neon
// lens above it that glows while the circuit is live.
export default {
  id: 'ph-uk-rocker',
  credit: 'UK 20A DP switch with neon (MK Logic Plus style) — press the bottom for ON, the neon lens glows red',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 20px; border-radius: 12px; background: linear-gradient(160deg, #eeece6, #dcd9d0); }
    .plate {
      position: relative; width: 104px; height: 104px; border-radius: 4px;
      background: linear-gradient(160deg, #ffffff, #f3f3f0 70%, #ebebe6);
      box-shadow: 0 1px 1px rgba(0,0,0,.16), 0 10px 18px -6px rgba(0,0,0,.25), inset 0 1px 0 #fff, inset 0 -1px 1px rgba(0,0,0,.07), inset 0 0 0 1px rgba(0,0,0,.035);
    }
    .screw { position: absolute; top: 50%; width: 8px; height: 8px; margin-top: -4px; border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #ffffff, #dcdcd6 55%, #aaaaa3); box-shadow: inset 0 1px 1px rgba(0,0,0,.28), 0 1px 0 #fff; }
    .screw::after { content: ''; position: absolute; left: 1.5px; right: 1.5px; top: 50%; height: 1px; margin-top: -.5px; background: #7c7c76; transform: rotate(40deg); }
    .screw.l { left: 9px; } .screw.r { right: 9px; }
    .neon { position: absolute; left: 50%; top: 20px; width: 14px; height: 6px; margin-left: -7px; border-radius: 1.5px;
      background: linear-gradient(#6d1410, #41100c); box-shadow: inset 0 1px 1px rgba(0,0,0,.6), 0 0 0 1.5px #e9e9e4, 0 0 0 2px rgba(0,0,0,.1); transition: background .15s, box-shadow .2s; }
    .well {
      position: absolute; left: 50%; top: 34px; width: 30px; height: 48px; margin-left: -15px; border: 0; padding: 0; border-radius: 2px; cursor: pointer;
      background: #cfd0cb; box-shadow: inset 0 1px 2px rgba(0,0,0,.35); perspective: 160px; -webkit-tap-highlight-color: transparent;
    }
    .well:focus-visible { outline: 2px solid #2563eb; outline-offset: 4px; }
    .rocker {
      position: absolute; inset: 1px; border-radius: 2px;
      background: linear-gradient(180deg, #ffffff 0%, #f8f8f5 44%, #e3e3de 52%, #f2f2ee 100%);
      box-shadow: 0 2px 2px -1px rgba(0,0,0,.3), inset 0 1px 0 #fff, inset 0 0 0 1px rgba(0,0,0,.04);
      transform: rotateX(9deg); transition: transform .12s cubic-bezier(.3,1.9,.5,1), background .12s, box-shadow .12s;
    }
    .well[aria-pressed="true"] .rocker { transform: rotateX(-9deg); background: linear-gradient(180deg, #f2f2ee 0%, #e3e3de 48%, #f8f8f5 56%, #ffffff 100%); box-shadow: 0 -2px 2px -1px rgba(0,0,0,.2), inset 0 -1px 0 #fff, inset 0 0 0 1px rgba(0,0,0,.04); }
    .well:active .rocker { transform: rotateX(0deg); transition-duration: .05s; }
    .well[aria-pressed="true"] ~ .neon, .plate.on .neon { background: radial-gradient(ellipse at 50% 40%, #ffd2bf, #ff4a1c 50%, #d41f05); box-shadow: inset 0 0 1px rgba(255,255,255,.6), 0 0 0 1.5px #e9e9e4, 0 0 8px 2px rgba(255,70,20,.55); }
  `,
  html: `
    <div class="stage">
      <div class="plate">
        <span class="screw l"></span><span class="screw r"></span>
        <button class="well" type="button" aria-pressed="false" aria-label="20A double-pole switch"><span class="rocker"></span></button>
        <span class="neon"></span>
      </div>
    </div>`,
  init(root) {
    const b = root.querySelector('.well');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
