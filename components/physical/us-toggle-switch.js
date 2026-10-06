// American toggle light switch: Leviton-style ivory thermoset one-gang plate (2.75 × 4.5 in) with two
// slotted screws and the classic tapered toggle lever poking out of its rectangular slot. The lever snaps
// over centre, overshooting slightly; up is ON.
export default {
  id: 'ph-us-toggle-switch',
  credit: 'American toggle light switch on an ivory Leviton-style plate — the lever snaps over centre, up is ON',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 18px 30px; border-radius: 12px; background: linear-gradient(160deg, #efe9da, #ddd5c2); }
    .plate {
      position: relative; width: 74px; height: 120px; border-radius: 4px;
      background: linear-gradient(150deg, #fbf6e8, #f1ead7 60%, #e7dfc9);
      box-shadow: 0 1px 1px rgba(60,40,0,.2), 0 10px 18px -6px rgba(60,40,0,.3), inset 0 1px 0 #fffdf4, inset 0 -1px 1px rgba(80,60,20,.12), inset 0 0 0 1px rgba(80,60,20,.06);
    }
    .screw { position: absolute; left: 50%; width: 9px; height: 9px; margin-left: -4.5px; border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #fffcf0, #e0d7bf 55%, #a99f83); box-shadow: inset 0 1px 1px rgba(0,0,0,.3), 0 1px 0 #fff; }
    .screw::after { content: ''; position: absolute; left: 1.5px; right: 1.5px; top: 50%; height: 1.5px; margin-top: -.75px; background: #6e6650; transform: rotate(-22deg); }
    .screw.t { top: 9px; } .screw.b { bottom: 9px; }
    .sw { position: absolute; left: 50%; top: 50%; width: 30px; height: 64px; margin: -32px 0 0 -15px; border: 0; padding: 0; background: transparent; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .sw:focus-visible { outline: 2px solid #2563eb; outline-offset: 3px; border-radius: 4px; }
    .slot { position: absolute; left: 9px; top: 18px; width: 12px; height: 28px; border-radius: 2px; background: linear-gradient(#5b5340, #2f2a1f); box-shadow: inset 0 1px 2px rgba(0,0,0,.7), 0 1px 0 rgba(255,255,255,.7); }
    .lever {
      position: absolute; left: 6px; top: 32px; width: 18px; height: 30px;
      filter: drop-shadow(0 5px 2px rgba(60,40,0,.4)) drop-shadow(0 1px 0 rgba(60,40,0,.25));
      transform-origin: 50% 0; transform: scaleY(1);
      transition: transform .11s cubic-bezier(.5,0,.3,1.6), filter .11s;
    }
    .lever i { position: absolute; inset: 0 0 4px; clip-path: polygon(22% 0, 78% 0, 100% 100%, 0 100%);
      background: linear-gradient(90deg, rgba(90,70,30,.28), rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(90,70,30,.32)), linear-gradient(180deg, #b9ae92 0%, #ddd4bd 45%, #f6f1e3 100%); }
    .lever b { position: absolute; left: 0; right: 0; bottom: 0; height: 9px; border-radius: 3px 3px 8px 8px;
      background: radial-gradient(ellipse 60% 70% at 45% 35%, #ffffff, #f4eedd 50%, #d6ccb1); box-shadow: inset 0 -1px 1px rgba(90,70,30,.35); }
    .sw[aria-pressed="true"] .lever { transform: scaleY(-1); filter: drop-shadow(0 -1px 1px rgba(60,40,0,.35)) drop-shadow(0 -4px 3px rgba(60,40,0,.12)); }
    .sw:active .lever { transform: scaleY(.25); transition-duration: .06s; }
    .sw[aria-pressed="true"]:active .lever { transform: scaleY(-.25); }
  `,
  html: `
    <div class="stage">
      <div class="plate">
        <span class="screw t"></span>
        <button class="sw" type="button" aria-pressed="false" aria-label="Light switch"><span class="slot"></span><span class="lever"><i></i><b></b></span></button>
        <span class="screw b"></span>
      </div>
    </div>`,
  init(root) {
    const b = root.querySelector('.sw');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
