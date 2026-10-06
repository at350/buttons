// Aircraft-panel guarded toggle (MS24658-style red flip cover over an MS24523-style bat switch).
// The guard is hinged at the top: it flips up and over (drawn as a true projection — its height is
// L*cos(angle), so it never leaves the panel). Closing the guard forces the switch back to OFF.
export default {
  id: 'ph-guard-toggle',
  credit: 'Aircraft-style guarded toggle (MS24658 red flip guard) — lift the guard, flip the bat; closing the guard forces it off',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px 22px; border-radius: 12px; background: linear-gradient(#2c3035, #1b1e22); }
    .panel {
      position: relative; width: 96px; height: 156px; border-radius: 4px;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.04) 0 .7px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #50555c, #393d43);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.16), inset 0 -1px 0 rgba(0,0,0,.5), 0 2px 4px rgba(0,0,0,.6);
    }
    .panel > i { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #c9cdd2, #60656b); box-shadow: inset 0 0 0 .5px #000; }
    .panel > i:nth-of-type(1) { left: 5px; top: 5px; } .panel > i:nth-of-type(2) { right: 5px; top: 5px; } .panel > i:nth-of-type(3) { left: 5px; bottom: 5px; } .panel > i:nth-of-type(4) { right: 5px; bottom: 5px; }
    .legend { position: absolute; left: 0; right: 0; bottom: 12px; text-align: center; font: 700 8px/1 "Roboto Flex", Inter, Arial, sans-serif; font-variation-settings: "wdth" 80; letter-spacing: 1.4px; color: #eceff1; }
    .mark { position: absolute; left: 72px; font: 700 7.5px/1 "Roboto Flex", Inter, Arial, sans-serif; font-variation-settings: "wdth" 80; color: #eceff1; letter-spacing: .6px; }
    .mark.on { top: 46px; } .mark.off { top: 98px; }
    /* switch */
    .nut { position: absolute; left: 31px; top: 61px; width: 34px; height: 34px;
      background: radial-gradient(circle, #121315 0 26%, #8f959b 29%, #eef0f2 40%, #9aa0a6 62%, #5f656b 100%);
      clip-path: polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%); }
    .sw { position: absolute; left: 33px; top: 34px; width: 30px; height: 88px; border: 0; padding: 0; background: transparent; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .sw:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 2px; border-radius: 4px; }
    .bat {
      position: absolute; left: 50%; top: 44px; width: 10px; height: 34px; margin-left: -5px; border-radius: 5px 5px 3px 3px;
      background: linear-gradient(90deg, #6b7076, #f4f6f7 38%, #b9bdc2 62%, #5d6268);
      box-shadow: 0 3px 3px rgba(0,0,0,.6);
      transform: translateY(0); transition: transform .1s cubic-bezier(.6,0,.3,1.5);
    }
    .bat::before { content: ''; position: absolute; left: -1px; right: -1px; bottom: -1px; height: 11px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #fff, #b7bcc1 55%, #60656b); }
    .sw[aria-pressed="true"] .bat { transform: translateY(-34px) scaleY(-1); }
    /* guard: hinge at y=30, 78px long */
    .hinge { position: absolute; left: 24px; top: 25px; width: 48px; height: 9px; border-radius: 4px; z-index: 3; background: linear-gradient(#f2f3f4, #9aa0a6 55%, #5e636a); box-shadow: 0 1px 2px rgba(0,0,0,.6); }
    .guard {
      position: absolute; left: 26px; top: 30px; width: 44px; height: 86px; border: 0; padding: 0; cursor: pointer; z-index: 2;
      border-radius: 4px 4px 8px 8px; transform-origin: 50% 0;
      background: linear-gradient(90deg, #7c0b0d, #d81e1b 18%, #f0352f 40%, #c51714 70%, #6d090b);
      box-shadow: 0 4px 6px rgba(0,0,0,.55), inset 0 -3px 0 rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.3);
      transition: transform .34s cubic-bezier(.3,1.25,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .guard::before { content: ''; position: absolute; left: 50%; bottom: 7px; width: 18px; height: 8px; margin-left: -9px; border-radius: 4px; background: linear-gradient(#5d0708, #a71512); box-shadow: inset 0 1px 2px rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.2); }
    .guard::after { content: ''; position: absolute; inset: 0; border-radius: inherit; opacity: 0; transition: opacity 0s .1s;
      background: linear-gradient(90deg, #4a0607, #8f100f 20%, #6d0b0b 80%, #3e0505); box-shadow: inset 0 0 0 3px #b51713, inset 0 6px 8px rgba(0,0,0,.6); }
    .guard[aria-expanded="true"] { transform: scaleY(-0.25); box-shadow: 0 -2px 3px rgba(0,0,0,.4); }
    .guard[aria-expanded="true"]::after { opacity: 1; }
    .guard:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="panel">
        <i></i><i></i><i></i><i></i>
        <span class="mark on" aria-hidden="true">ON</span><span class="mark off" aria-hidden="true">OFF</span>
        <div class="nut"></div>
        <button class="sw" type="button" aria-pressed="false" aria-label="Master arm switch" tabindex="-1"><span class="bat"></span></button>
        <button class="guard" type="button" aria-expanded="false" aria-label="Switch guard"></button>
        <div class="hinge"></div>
        <span class="legend" aria-hidden="true">MASTER ARM</span>
      </div>
    </div>`,
  init(root) {
    const guard = root.querySelector('.guard'), sw = root.querySelector('.sw');
    guard.addEventListener('click', () => {
      const open = guard.getAttribute('aria-expanded') !== 'true';
      guard.setAttribute('aria-expanded', open); sw.tabIndex = open ? 0 : -1;
      if (!open) sw.setAttribute('aria-pressed', 'false');
    });
    sw.addEventListener('click', () => sw.setAttribute('aria-pressed', sw.getAttribute('aria-pressed') !== 'true'));
  },
};
