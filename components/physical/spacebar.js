export default {
  id: 'ph-spacebar',
  credit: 'Mechanical keyboard spacebar — 6.25u convex PBT bar with stabilizers, presses as one piece',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { padding: 18px 22px; border-radius: 12px; background: linear-gradient(#2e3137, #1a1c20); }
    .housing { position: relative; height: 50px; max-width: 340px; margin: 0 auto; }
    .housing::before { content: ''; position: absolute; left: 8px; right: 8px; top: 6px; bottom: 2px; border-radius: 4px; background: #08090a; box-shadow: inset 0 3px 5px rgba(0,0,0,.9); }
    .key {
      position: absolute; left: 0; right: 0; top: 0; height: 46px; border: 0; padding: 0; border-radius: 6px; cursor: pointer;
      background: linear-gradient(#55585e, #3f424a 50%, #2a2d33 100%);
      box-shadow: 0 1px 0 rgba(255,255,255,.2) inset, 0 6px 0 -2px rgba(0,0,0,.7), 0 7px 8px rgba(0,0,0,.5);
      transition: transform .05s ease-out, box-shadow .05s ease-out; -webkit-tap-highlight-color: transparent;
    }
    .top {
      position: absolute; left: 6px; right: 6px; top: 3px; bottom: 9px; border-radius: 4px;
      background: linear-gradient(180deg, #70747c 0%, #5f636b 35%, #5a5e66 65%, #6c7079 100%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.28), inset 0 -1px 0 rgba(0,0,0,.2);
    }
    .key:hover .top { background: linear-gradient(180deg, #787c84 0%, #666a72 35%, #61656d 65%, #74788a 100%); }
    .key:active, .key.down { transform: translateY(2px); box-shadow: 0 1px 0 rgba(255,255,255,.2) inset, 0 3px 0 -2px rgba(0,0,0,.7), 0 3px 4px rgba(0,0,0,.5); }
    .key:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="housing"><button class="key" type="button" aria-label="space"><span class="top"></span></button></div>
    </div>`,
  init(root) {
    const k = root.querySelector('.key');
    k.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') k.classList.add('down'); });
    k.addEventListener('keyup', () => k.classList.remove('down'));
    k.addEventListener('blur', () => k.classList.remove('down'));
  },
};
