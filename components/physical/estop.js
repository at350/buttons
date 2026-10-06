// Schneider Harmony XB4-style emergency stop (ZB4BS844-like): 40 mm red mushroom with moulded
// turn-to-release arrows, chrome metal bezel, on a 60 mm yellow EMERGENCY STOP legend plate.
// Press latches it down; press again and it twists clockwise and springs back out.
export default {
  id: 'ph-estop',
  credit: 'Schneider Harmony XB4-style emergency stop — mushroom latches down, twist-to-release springs it back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px; border-radius: 12px;
      background: radial-gradient(circle at 1px 1px, rgba(0,0,0,.035) 0 .8px, transparent 1px) 0 0 / 3px 3px, linear-gradient(#e1e1dd, #c9c9c4); }
    .plate { position: relative; width: 150px; height: 150px; border-radius: 50%;
      background: radial-gradient(circle at 45% 35%, #ffe24a, #f8cf00 60%, #e7b900);
      box-shadow: 0 1px 1px rgba(0,0,0,.3), 0 6px 10px -2px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.6), inset 0 -1px 1px rgba(120,90,0,.35); }
    .plate svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .legend { font: 800 11.5px "Roboto Flex", Inter, Arial, sans-serif; font-variation-settings: "wdth" 85; letter-spacing: 1.2px; fill: #111; }
    .bezel { position: absolute; left: 50%; top: 50%; width: 68px; height: 68px; margin: -34px; border-radius: 50%;
      background: conic-gradient(from 210deg, #8a8e93, #f4f5f6 14%, #a2a6ab 32%, #e9eaec 50%, #84888d 68%, #eff0f2 84%, #8a8e93);
      box-shadow: 0 2px 3px rgba(0,0,0,.45), inset 0 0 0 1px rgba(0,0,0,.25); }
    .bezel::before { content: ''; position: absolute; inset: 7px; border-radius: 50%; background: #1b1b1c; box-shadow: inset 0 2px 4px #000; }
    .head {
      position: absolute; left: 50%; top: 50%; width: 76px; height: 76px; margin: -46px 0 0 -38px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: radial-gradient(ellipse 55% 40% at 42% 30%, rgba(255,170,160,.85), rgba(255,90,80,0) 70%), radial-gradient(circle at 50% 46%, #e5231d 0 52%, #c4150f 78%, #8f0a06 100%);
      box-shadow: 0 9px 0 #8a0905, 0 10px 1px rgba(0,0,0,.45), 0 14px 10px rgba(0,0,0,.35), inset 0 -2px 4px rgba(90,0,0,.4);
      transition: transform .16s cubic-bezier(.3,1.8,.5,1), box-shadow .16s cubic-bezier(.3,1.8,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .head:hover { filter: brightness(1.05); }
    .head:active { transform: translateY(5px); box-shadow: 0 4px 0 #8a0905, 0 5px 1px rgba(0,0,0,.45), 0 7px 6px rgba(0,0,0,.35), inset 0 -2px 4px rgba(90,0,0,.4); transition-duration: .05s; }
    .head[aria-pressed="true"] { transform: translateY(7px); box-shadow: 0 2px 0 #8a0905, 0 3px 1px rgba(0,0,0,.5), 0 4px 4px rgba(0,0,0,.35), inset 0 -2px 4px rgba(90,0,0,.4); transition-timing-function: cubic-bezier(.5,0,.2,1.4); }
    .head:focus-visible { outline: 2px solid #111; outline-offset: 4px; }
    .arrows { position: absolute; inset: 0; width: 100%; height: 100%; transition: transform .25s; }
    .arrows path { fill: none; stroke: #a10e0a; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 .8px 0 rgba(255,140,130,.55)); }
    .head.release .arrows { transform: rotate(40deg); }
  `,
  html: `
    <div class="stage">
      <div class="plate">
        <svg viewBox="0 0 150 150" aria-hidden="true">
          <defs><path id="es-top" d="M 17 75 A 58 58 0 0 1 133 75"/><path id="es-bot" d="M 15 75 A 60 60 0 0 0 135 75"/></defs>
          <text class="legend"><textPath href="#es-top" startOffset="50%" text-anchor="middle">EMERGENCY</textPath></text>
          <text class="legend"><textPath href="#es-bot" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">STOP</textPath></text>
        </svg>
        <div class="bezel"></div>
        <button class="head" type="button" aria-pressed="false" aria-label="Emergency stop">
          <svg class="arrows" viewBox="0 0 82 82" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <path d="M24 30 A20 20 0 0 1 52 23"/><path d="M47 18.5 53 23.5 46 26.5"/>
            <path d="M58 52 A20 20 0 0 1 30 59"/><path d="M35 63.5 29 58.5 36 55.5"/>
          </svg>
        </button>
      </div>
    </div>`,
  init(root) {
    const h = root.querySelector('.head');
    let t = 0;
    h.addEventListener('click', () => {
      if (h.classList.contains('release')) return;
      if (h.getAttribute('aria-pressed') !== 'true') { h.setAttribute('aria-pressed', 'true'); return; }
      h.classList.add('release'); // twist, then the spring pops the head back out
      t = setTimeout(() => { h.setAttribute('aria-pressed', 'false'); h.classList.remove('release'); }, 260);
    });
    return () => clearTimeout(t);
  },
};
