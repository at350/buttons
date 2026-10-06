// Spring: stiffness 500, damping 22 (ζ .49) integrated into CSS linear() — the knob overshoots ~16% and settles.
const SPRING = 'linear(0, 0.098, 0.318, 0.574, 0.81, 0.983, 1.102, 1.158, 1.165, 1.141, 1.102, 1.059, 1.022, 0.995, 0.979, 0.972, 0.973, 0.978, 0.985, 0.992, 0.998, 1.002, 1.004, 1.005, 1.004, 1.003, 1.002, 1.001, 1, 1, 1)';

export default {
  id: 'mo-spring-toggle',
  credit: 'Physically-sprung toggle — the knob rides a real underdamped spring (computed into CSS linear()), overshoots the end and settles; press squashes it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 14px; padding: 12px 16px; border-radius: 14px; background: #fff; border: 1px solid #e5e5e0; font-family: Inter, system-ui, sans-serif; }
    .row > span { font-size: 14px; font-weight: 500; color: #111; }
    .sw { position: relative; width: 56px; height: 32px; border-radius: 16px; border: 0; padding: 0; cursor: pointer; background: #d4d4d0; transition: background .45s cubic-bezier(.3, .7, .3, 1); }
    .sw[aria-checked="true"] { background: #111; }
    .sw:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
    .knob {
      position: absolute; top: 3px; left: 3px; width: 26px; height: 26px; border-radius: 50%; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,.25);
      transform: translateX(var(--x, 0px)) scale(var(--sx, 1), var(--sy, 1)); transform-origin: center;
      transition: transform .63s ${SPRING};
    }
    .sw[aria-checked="true"] .knob { --x: 24px; }
    .sw:active .knob { --sx: 1.25; --sy: .85; transition: transform .15s cubic-bezier(.4, 0, .6, 1); }
    .sw[aria-checked="true"]:active .knob { --x: 18px; } .sw[aria-checked="false"]:active .knob { --x: 6px; }
    .knob::after { content: ''; position: absolute; inset: 9px; border-radius: 50%; background: #111; transform: scale(0); transition: transform .6s ${SPRING}; }
    .sw[aria-checked="true"] .knob::after { transform: scale(1); }
    .glow { position: absolute; inset: -6px; border-radius: 22px; background: radial-gradient(closest-side, rgba(17,17,17,.25), transparent); opacity: 0; transition: opacity .4s; pointer-events: none; }
    .sw[aria-checked="true"] .glow { opacity: 1; }
  `,
  html: `
    <div class="row">
      <button class="sw" type="button" role="switch" aria-checked="false" aria-label="Haptics"><span class="glow"></span><span class="knob"></span></button>
      <span>Haptics</span>
    </div>`,
  init(root) {
    const sw = root.querySelector('.sw');
    sw.addEventListener('click', () => sw.setAttribute('aria-checked', String(sw.getAttribute('aria-checked') !== 'true')));
  },
};
