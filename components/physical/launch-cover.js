// "Missile switch": big red pushbutton under a hinged, yellow/black striped safety cover.
// The cover is hinged at the top and flips up and over — drawn as a true projection (height = L*cos θ)
// so it stays on the panel. An amber ARM lamp lights while the cover is up; then the button can fire.
export default {
  id: 'ph-launch-cover',
  credit: 'Big red launch button under a hinged striped safety cover — flip the cover (ARM lamp lights), then fire',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px 20px; border-radius: 12px; background: linear-gradient(#2f343a, #1b1f23); }
    .panel {
      position: relative; width: 112px; height: 158px; border-radius: 5px;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.04) 0 .7px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #5b6168, #3d4248);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.16), inset 0 -1px 0 rgba(0,0,0,.5), 0 2px 4px rgba(0,0,0,.6), 0 10px 18px -6px rgba(0,0,0,.5);
    }
    .panel > i { position: absolute; width: 6px; height: 6px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #c9cdd2, #60656b); box-shadow: inset 0 0 0 .5px #000; }
    .panel > i:nth-of-type(1) { left: 5px; top: 5px; } .panel > i:nth-of-type(2) { right: 5px; top: 5px; } .panel > i:nth-of-type(3) { left: 5px; bottom: 5px; } .panel > i:nth-of-type(4) { right: 5px; bottom: 5px; }
    .lamp { position: absolute; left: 14px; bottom: 12px; width: 10px; height: 10px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #8a6a2a, #4a3410); box-shadow: 0 0 0 2px #23262a, 0 0 0 3px #7c8288; transition: background .1s, box-shadow .2s; }
    .legend { position: absolute; left: 32px; bottom: 13px; font: 700 8px/1 "Roboto Flex", Inter, Arial, sans-serif; font-variation-settings: "wdth" 80; letter-spacing: 1.6px; color: #eceff1; }
    .panel.armed .lamp { background: radial-gradient(circle at 40% 35%, #fff4c9, #ffb51c 55%, #e08a00); box-shadow: 0 0 0 2px #23262a, 0 0 0 3px #7c8288, 0 0 10px 3px rgba(255,170,30,.7); }
    .ring { position: absolute; left: 50%; top: 80px; width: 72px; height: 72px; margin: -36px; border-radius: 50%;
      background: conic-gradient(from 210deg, #7d8186, #f2f4f6 15%, #9a9fa4 32%, #e6e8ea 50%, #7a7e83 68%, #eceef0 84%, #7d8186);
      box-shadow: 0 2px 3px rgba(0,0,0,.6), inset 0 1px 1px rgba(255,255,255,.7); }
    .ring::before { content: ''; position: absolute; inset: 7px; border-radius: 50%; background: #0b0b0c; box-shadow: inset 0 3px 5px #000; }
    .fire {
      position: absolute; left: 11px; top: 8px; width: 50px; height: 50px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: radial-gradient(ellipse 60% 45% at 42% 28%, #ffb1a9 0, #ff5a4c 30%, rgba(232,32,26,0) 70%), radial-gradient(circle at 50% 45%, #e8201a 0 50%, #b80f0b 80%, #820603 100%);
      box-shadow: 0 6px 0 #6e0402, 0 7px 1px rgba(0,0,0,.6), 0 10px 7px rgba(0,0,0,.5), inset 0 -3px 5px rgba(80,0,0,.35);
      transition: transform .15s cubic-bezier(.3,1.9,.5,1), box-shadow .15s cubic-bezier(.3,1.9,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .fire:active { transform: translateY(5px); box-shadow: 0 1px 0 #6e0402, 0 2px 1px rgba(0,0,0,.6), 0 3px 3px rgba(0,0,0,.5), inset 0 -2px 4px rgba(80,0,0,.4); transition-duration: .04s; }
    .fire:focus-visible { outline: 2px solid #fff; outline-offset: 5px; }
    .fire.hot { animation: flash .6s ease-out; }
    @keyframes flash { 0% { filter: brightness(1.8) saturate(.8); } 100% { filter: none; } }
    .hinge { position: absolute; left: 16px; top: 25px; width: 80px; height: 9px; border-radius: 4px; z-index: 3; background: linear-gradient(#f2f3f4, #9aa0a6 55%, #5e636a); box-shadow: 0 1px 2px rgba(0,0,0,.6); }
    .cover {
      position: absolute; left: 18px; top: 30px; width: 76px; height: 98px; border: 0; padding: 0; cursor: pointer; z-index: 2;
      border-radius: 4px 4px 10px 10px; transform-origin: 50% 0;
      background:
        linear-gradient(90deg, rgba(0,0,0,.35), rgba(255,255,255,.12) 30%, rgba(255,255,255,0) 60%, rgba(0,0,0,.3)),
        repeating-linear-gradient(135deg, #f5c400 0 11px, #161616 11px 22px);
      box-shadow: 0 5px 8px rgba(0,0,0,.55), inset 0 0 0 2px rgba(0,0,0,.35), inset 0 -4px 0 rgba(0,0,0,.25);
      transition: transform .36s cubic-bezier(.3,1.25,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .cover::before { content: ''; position: absolute; left: 50%; bottom: 7px; width: 28px; height: 9px; margin-left: -14px; border-radius: 4px; background: linear-gradient(#f2f3f4, #8c9298); box-shadow: 0 1px 2px rgba(0,0,0,.6); }
    .cover::after { content: ''; position: absolute; inset: 0; border-radius: inherit; opacity: 0; transition: opacity 0s .12s;
      background: linear-gradient(90deg, #7a6200, #b89400 25%, #a48300 75%, #6a5500); box-shadow: inset 0 0 0 3px #d9ad00, inset 0 8px 10px rgba(0,0,0,.55); }
    .cover[aria-expanded="true"] { transform: scaleY(-0.24); box-shadow: 0 -2px 3px rgba(0,0,0,.4); }
    .cover[aria-expanded="true"]::after { opacity: 1; }
    .cover:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="panel">
        <i></i><i></i><i></i><i></i>
        <div class="ring"><button class="fire" type="button" aria-label="Launch" tabindex="-1"></button></div>
        <button class="cover" type="button" aria-expanded="false" aria-label="Safety cover"></button>
        <div class="hinge"></div>
        <span class="lamp"></span><span class="legend" aria-hidden="true">ARM</span>
      </div>
    </div>`,
  init(root) {
    const panel = root.querySelector('.panel'), cover = root.querySelector('.cover'), fire = root.querySelector('.fire');
    cover.addEventListener('click', () => {
      const open = cover.getAttribute('aria-expanded') !== 'true';
      cover.setAttribute('aria-expanded', open); panel.classList.toggle('armed', open);
      fire.tabIndex = open ? 0 : -1;
    });
    fire.addEventListener('click', () => { fire.classList.remove('hot'); void fire.offsetWidth; fire.classList.add('hot'); });
    fire.addEventListener('animationend', () => fire.classList.remove('hot'));
  },
};
