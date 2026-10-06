// A big red mushroom pushbutton in a chrome bezel on a powder-coated panel, under an engraved
// brass "DO NOT PRESS" plate held by two screws. Pressing it sets off the panel's alarm wash.
export default {
  id: 'ph-do-not-press',
  credit: '"DO NOT PRESS" — engraved brass plate over a big red 60 mm pushbutton. You will press it.',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative; display: inline-flex; flex-direction: column; align-items: center; gap: 14px; padding: 18px 24px 22px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.035) 0 .8px, transparent 1px) 0 0 / 3px 3px, linear-gradient(#34373c, #1d1f23);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
    }
    .stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0; background: radial-gradient(circle at 50% 60%, rgba(255,40,30,.55), rgba(140,0,0,.35) 60%, transparent 100%); }
    .stage.alarm::after { animation: alarm .42s steps(1) 4; }
    @keyframes alarm { 0% { opacity: 1; } 50% { opacity: 0; } }
    .plaque {
      position: relative; padding: 6px 20px 5px; border-radius: 2px;
      font: 800 12px/1 "Roboto Flex", Inter, Arial, sans-serif; font-variation-settings: "wdth" 80; letter-spacing: 2.2px; color: #3b2a07;
      background:
        repeating-linear-gradient(90deg, rgba(255,255,255,.08) 0 1px, rgba(0,0,0,.035) 1px 2px),
        linear-gradient(100deg, #b98f3e, #ecd08a 30%, #c69a48 55%, #f3dc98 78%, #b38735);
      text-shadow: 0 1px 0 rgba(255,240,200,.7), 0 -1px 0 rgba(0,0,0,.35);
      box-shadow: 0 1px 1px rgba(0,0,0,.7), 0 3px 5px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,250,220,.7), inset 0 -1px 0 rgba(90,60,10,.5);
    }
    .plaque i { position: absolute; top: 50%; width: 6px; height: 6px; margin-top: -3px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff3c8, #b78e3e 60%, #6d4f15); box-shadow: inset 0 0 0 .5px rgba(0,0,0,.4); }
    .plaque i::after { content: ''; position: absolute; left: 1px; right: 1px; top: 2.5px; height: 1px; background: #4f390c; transform: rotate(35deg); }
    .plaque i:first-child { left: 6px; } .plaque i:last-child { right: 6px; }
    .ring {
      position: relative; width: 92px; height: 92px; border-radius: 50%;
      background: conic-gradient(from 210deg, #7d8186, #f2f4f6 15%, #9a9fa4 32%, #e6e8ea 50%, #7a7e83 68%, #eceef0 84%, #7d8186);
      box-shadow: 0 2px 2px rgba(0,0,0,.6), 0 8px 12px -2px rgba(0,0,0,.5), inset 0 1px 1px rgba(255,255,255,.7);
    }
    .ring::before { content: ''; position: absolute; inset: 9px; border-radius: 50%; background: #0b0b0c; box-shadow: inset 0 3px 6px rgba(0,0,0,1); }
    .btn {
      position: absolute; left: 14px; top: 10px; width: 64px; height: 64px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: radial-gradient(ellipse 60% 45% at 42% 28%, #ffb1a9 0, #ff5a4c 30%, rgba(232,32,26,0) 70%), radial-gradient(circle at 50% 45%, #e8201a 0 50%, #b80f0b 80%, #820603 100%);
      box-shadow: 0 7px 0 #6e0402, 0 8px 1px rgba(0,0,0,.6), 0 12px 8px rgba(0,0,0,.55), inset 0 -3px 5px rgba(80,0,0,.35);
      transition: transform .16s cubic-bezier(.3,1.9,.5,1), box-shadow .16s cubic-bezier(.3,1.9,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { filter: brightness(1.06); }
    .btn:active { transform: translateY(6px); box-shadow: 0 1px 0 #6e0402, 0 2px 1px rgba(0,0,0,.6), 0 3px 3px rgba(0,0,0,.5), inset 0 -2px 4px rgba(80,0,0,.4); transition-duration: .05s; }
    .btn:focus-visible { outline: 2px solid #fff; outline-offset: 6px; }
  `,
  html: `
    <div class="stage">
      <span class="plaque"><i></i>DO NOT PRESS<i></i></span>
      <div class="ring"><button class="btn" type="button" aria-label="Do not press"></button></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage');
    root.querySelector('.btn').addEventListener('click', () => { stage.classList.remove('alarm'); void stage.offsetWidth; stage.classList.add('alarm'); });
    stage.addEventListener('animationend', () => stage.classList.remove('alarm'));
  },
};
