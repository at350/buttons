export default {
  id: 'ph-uk-rocker',
  credit: 'UK 1-gang light switch — small white rocker with a red ON indicator (MK Logic Plus style)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 20px; border-radius: 12px; background: linear-gradient(#efeee9, #dfddd5); }
    .plate {
      position: relative; width: 86px; height: 86px; border-radius: 3px;
      background: linear-gradient(160deg, #ffffff, #f0f1ee);
      box-shadow: 0 1px 2px rgba(0,0,0,.2), 0 8px 18px rgba(0,0,0,.12);
    }
    .screw {
      position: absolute; top: 50%; width: 7px; height: 7px; margin-top: -3.5px; border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #fff, #d8d8d4 60%, #a9a9a4);
      box-shadow: inset 0 1px 1px rgba(0,0,0,.3);
    }
    .screw::after { content: ''; position: absolute; left: 1px; right: 1px; top: 50%; height: 1px; background: #777; transform: rotate(40deg); }
    .screw.l { left: 7px; } .screw.r { right: 7px; }
    .well {
      position: absolute; left: 50%; top: 50%; width: 22px; height: 38px; margin: -19px 0 0 -11px;
      border: 0; padding: 0; background: #b9b9b4; border-radius: 1px; cursor: pointer;
      box-shadow: inset 0 1px 3px rgba(0,0,0,.5); perspective: 120px; -webkit-tap-highlight-color: transparent;
    }
    .well:focus-visible { outline: 2px solid #3b82f6; outline-offset: 4px; }
    .rocker {
      position: absolute; left: 1px; top: 1px; width: 20px; height: 36px; border-radius: 1px;
      background: linear-gradient(180deg, #fff, #f4f4f1 50%, #d6d7d2);
      box-shadow: 0 2px 2px rgba(0,0,0,.35), inset 0 1px 0 #fff;
      transform: rotateX(14deg); transition: transform .08s cubic-bezier(.3,1.4,.6,1), background .08s, box-shadow .08s;
    }
    .led {
      position: absolute; left: 4px; right: 4px; top: 4px; height: 4px; border-radius: 1px;
      background: #c9c9c5; box-shadow: inset 0 1px 1px rgba(0,0,0,.2); transition: background .1s, box-shadow .1s;
    }
    .well[aria-pressed="true"] .rocker { transform: rotateX(-14deg); background: linear-gradient(0deg, #fff, #f4f4f1 50%, #d6d7d2); box-shadow: 0 -2px 2px rgba(0,0,0,.3), inset 0 -1px 0 #fff; }
    .well[aria-pressed="true"] .led { background: #e8281e; box-shadow: 0 0 6px rgba(232,40,30,.7), inset 0 1px 0 rgba(255,255,255,.4); }
    .well:active .rocker { transform: rotateX(0deg); }
  `,
  html: `
    <div class="stage">
      <div class="plate">
        <span class="screw l"></span>
        <button class="well" type="button" aria-pressed="false" aria-label="light switch"><span class="rocker"><span class="led"></span></span></button>
        <span class="screw r"></span>
      </div>
    </div>`,
  init(root) {
    const b = root.querySelector('.well');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
