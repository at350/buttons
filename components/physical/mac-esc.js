// MacBook Pro (2021+) Magic Keyboard "esc" key: wide function-row cap, matte black with a laser-etched
// backlit legend, sitting in its cut-out in the bead-blasted space-grey top case. Scissor switch, 1 mm travel.
export default {
  id: 'ph-mac-esc',
  credit: 'MacBook Pro Magic Keyboard "esc" key — scissor switch, 1 mm travel, backlit legend in a space-grey top case',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 22px 26px; border-radius: 12px;
      background:
        radial-gradient(circle at 1px 1px, rgba(255,255,255,.05) 0 .6px, transparent .9px) 0 0 / 2px 2px,
        linear-gradient(160deg, #8a8c90, #6f7175); box-shadow: inset 0 1px 0 rgba(255,255,255,.18); }
    .cut { padding: 2px; border-radius: 7px; background: #0a0a0b; box-shadow: inset 0 1px 1px rgba(0,0,0,.9), 0 1px 0 rgba(255,255,255,.18), 0 -1px 0 rgba(0,0,0,.25); }
    .key {
      position: relative; display: block; width: 76px; height: 44px; border: 0; padding: 0; border-radius: 5px; cursor: pointer;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.025) 0 .5px, transparent .8px) 0 0 / 2px 2px, linear-gradient(#232326, #1a1a1c);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.09), inset 0 -1px 0 rgba(0,0,0,.6), 0 1px 0 #000;
      transition: transform .09s cubic-bezier(.3,1.8,.5,1), box-shadow .09s, background .09s; -webkit-tap-highlight-color: transparent;
    }
    .key span { position: absolute; left: 7px; bottom: 6px; font: 400 11.5px/1 -apple-system, "SF Pro Text", system-ui, "Helvetica Neue", sans-serif; letter-spacing: .2px;
      color: #f4f4f6; text-shadow: 0 0 2px rgba(255,255,255,.55), 0 0 6px rgba(220,230,255,.25); }
    .key:hover { background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.03) 0 .5px, transparent .8px) 0 0 / 2px 2px, linear-gradient(#27272b, #1d1d20); }
    .key:active, .key.down { transform: translateY(.75px) scale(.992); background: linear-gradient(#1b1b1d, #151517); box-shadow: inset 0 1px 1px rgba(0,0,0,.6), inset 0 -1px 0 rgba(255,255,255,.03); transition-duration: .03s; }
    .key:focus-visible { outline: 2px solid #3b8cff; outline-offset: 4px; }
  `,
  html: `
    <div class="stage">
      <div class="cut"><button class="key" type="button" aria-label="Escape"><span>esc</span></button></div>
    </div>`,
  init(root) {
    const k = root.querySelector('.key');
    k.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') k.classList.add('down'); });
    k.addEventListener('keyup', () => k.classList.remove('down'));
    k.addEventListener('blur', () => k.classList.remove('down'));
  },
};
