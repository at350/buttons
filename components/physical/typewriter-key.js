// Glass-top typewriter key (Underwood / Royal, 1930s–50s): nickel-plated rim, white-on-black paper
// legend under a domed glass lens, riding on a flat steel key lever. A strike drives it a long way down
// fast, and the lever spring kicks it back with a small rebound.
export default {
  id: 'ph-typewriter-key',
  credit: 'Vintage glass-top typewriter key (Underwood style) — nickel rim, legend under glass, long throw on a steel key lever',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 16px 30px 0; border-radius: 12px; overflow: hidden;
      background: radial-gradient(ellipse at 50% 0%, #2b2d2a, #121311 80%); }
    .wrap { position: relative; width: 54px; height: 104px; }
    .lever { position: absolute; left: 50%; top: 26px; bottom: 0; width: 8px; margin-left: -4px;
      background: linear-gradient(90deg, #2b2d30, #8e9398 35%, #c7cbcf 50%, #6b7075 70%, #24262a); box-shadow: 0 0 6px rgba(0,0,0,.6);
      transform-origin: 50% 100%; transition: transform .16s cubic-bezier(.3,1.8,.5,1); }
    .key {
      position: absolute; left: 0; top: 0; width: 54px; height: 54px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; z-index: 1;
      background: conic-gradient(from 200deg, #7f848a, #f6f7f8 14%, #9ea3a9 30%, #e6e8ea 50%, #7b8086 66%, #f0f1f3 84%, #7f848a);
      box-shadow: 0 6px 6px rgba(0,0,0,.65), 0 2px 1px rgba(0,0,0,.5);
      transition: transform .16s cubic-bezier(.3,1.8,.5,1), box-shadow .16s cubic-bezier(.3,1.8,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .face { position: absolute; inset: 5px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
      background: radial-gradient(circle at 50% 50%, #151515 0 62%, #0a0a0a 100%); box-shadow: inset 0 0 0 1px rgba(0,0,0,.8), inset 0 2px 3px rgba(0,0,0,.9);
      font: 600 21px/1 "Space Grotesk", Inter, Arial, sans-serif; color: #f1ece0; }
    .face::after { content: ''; position: absolute; inset: 0; border-radius: 50%; pointer-events: none;
      background: radial-gradient(ellipse 55% 32% at 42% 24%, rgba(255,255,255,.55), rgba(255,255,255,0) 70%), radial-gradient(circle, transparent 60%, rgba(255,255,255,.08) 82%, rgba(255,255,255,0) 100%); }
    .key:hover .face::after { background: radial-gradient(ellipse 55% 32% at 42% 24%, rgba(255,255,255,.65), rgba(255,255,255,0) 70%), radial-gradient(circle, transparent 60%, rgba(255,255,255,.12) 82%, rgba(255,255,255,0) 100%); }
    .key:active, .key.down { transform: translateY(12px) scale(.96); box-shadow: 0 1px 2px rgba(0,0,0,.7); transition-duration: .05s; transition-timing-function: cubic-bezier(.6,0,.9,.5); }
    .key:active ~ .lever, .key.down ~ .lever { transform: scaleY(.84); transition-duration: .05s; transition-timing-function: cubic-bezier(.6,0,.9,.5); }
    .key:focus-visible { outline: 2px solid #ffd27a; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="wrap"><button class="key" type="button" aria-label="T"><span class="face">T</span></button><span class="lever"></span></div>
    </div>`,
  init(root) {
    const k = root.querySelector('.key');
    k.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') k.classList.add('down'); });
    k.addEventListener('keyup', () => k.classList.remove('down'));
    k.addEventListener('blur', () => k.classList.remove('down'));
  },
};
