export default {
  id: 'ph-typewriter-key',
  credit: 'Vintage typewriter key — black glass top, chrome ring, on a steel stem that sinks when struck',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 18px 28px 12px; border-radius: 12px; background: linear-gradient(#2d3a2e, #1a231b); }
    .wrap { position: relative; width: 48px; height: 86px; }
    .stem {
      position: absolute; left: 50%; bottom: 0; width: 7px; height: 46px; margin-left: -3.5px; border-radius: 2px 2px 0 0;
      background: linear-gradient(90deg, #4a4a4a, #c9c9c9 45%, #8a8a8a 60%, #3a3a3a);
      transform-origin: 50% 100%; transition: transform .06s ease-out;
    }
    .key {
      position: absolute; left: 0; top: 0; width: 48px; height: 48px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: radial-gradient(circle at 50% 50%, #0d0d0f 0 58%, #f3f3f3 63%, #9b9b9b 70%, #4e4e4e 78%, #d6d6d6 84%, #6b6b6b 100%);
      box-shadow: 0 5px 6px rgba(0,0,0,.7), inset 0 0 0 1px rgba(255,255,255,.1);
      color: #f5f1e6; font: 500 20px/48px Georgia, "Times New Roman", serif;
      transition: transform .06s ease-out, box-shadow .06s ease-out; -webkit-tap-highlight-color: transparent;
    }
    .key::before { content: ''; position: absolute; left: 11px; top: 7px; width: 18px; height: 9px; border-radius: 50%; background: radial-gradient(ellipse at 50% 40%, rgba(255,255,255,.45), transparent 70%); }
    .key:hover { box-shadow: 0 5px 6px rgba(0,0,0,.7), inset 0 0 0 1px rgba(255,255,255,.25); }
    .key:active, .key.down { transform: translateY(6px) rotateX(10deg); box-shadow: 0 1px 2px rgba(0,0,0,.7), inset 0 0 0 1px rgba(255,255,255,.1); }
    .key:active ~ .stem, .key.down ~ .stem { transform: scaleY(.85); }
    .key:focus-visible { outline: 2px solid #ffd27a; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="wrap"><button class="key" type="button" aria-label="key T">T</button><span class="stem"></span></div>
    </div>`,
  init(root) {
    const k = root.querySelector('.key');
    k.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') k.classList.add('down'); });
    k.addEventListener('keyup', () => k.classList.remove('down'));
    k.addEventListener('blur', () => k.classList.remove('down'));
  },
};
