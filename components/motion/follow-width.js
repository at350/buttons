// Threads-style Follow → Following. The button's width is animated between the two measured label widths on a
// spring (stiffness 380, damping 28 → linear()), the labels blur-crossfade and roll, and the black fill gives way to
// the outlined "Following" state. The outer box reserves the widest state so nothing around it ever shifts.
const SPRING = 'linear(0, 0.023, 0.085, 0.164, 0.264, 0.36, 0.465, 0.557, 0.649, 0.724, 0.79, 0.852, 0.899, 0.94, 0.97, 0.995, 1.012, 1.024, 1.031, 1.036, 1.037, 1.037, 1.035, 1.032, 1.028, 1.025, 1.021, 1.017, 1.014, 1.011, 1.008, 1.006, 1.004, 1.003, 1.001, 1, 1, 0.999, 0.999, 0.999, 1)';

export default {
  id: 'mo-follow-width',
  credit: 'Threads Follow → Following — the button springs to the measured width of its new label while the labels blur-crossfade and the fill flips to outline',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .box { width: 128px; height: 40px; display: flex; align-items: center; justify-content: center; }
    .btn {
      position: relative; height: 34px; width: var(--w, 76px); padding: 0; border-radius: 10px; border: 1px solid #000; background: #000; color: #fff; cursor: pointer; overflow: hidden;
      font: 600 15px system-ui, -apple-system, 'SF Pro Text', Inter, sans-serif; letter-spacing: -.01em; white-space: nowrap;
      transition: width .5s ${SPRING}, background .25s, color .25s, border-color .25s, transform .2s ${SPRING};
    }
    .btn:active { transform: scale(.96); }
    .btn:focus-visible { outline: 2px solid #000; outline-offset: 2px; }
    .btn[aria-pressed="true"] { background: #fff; color: #000; border-color: rgba(0,0,0,.15); }
    .btn[aria-pressed="true"]:hover { background: #f5f5f5; }
    .btn:not([aria-pressed="true"]):hover { background: #1f1f1f; }
    .l { position: absolute; left: 50%; top: 50%; padding: 0 16px; translate: -50% -50%; transition: opacity .2s, filter .2s, transform .4s ${SPRING}; }
    .l2 { opacity: 0; filter: blur(4px); transform: translateY(8px); }
    .btn[aria-pressed="true"] .l1 { opacity: 0; filter: blur(4px); transform: translateY(-8px); }
    .btn[aria-pressed="true"] .l2 { opacity: 1; filter: none; transform: none; }
  `,
  html: `
    <div class="box">
      <button class="btn" type="button" aria-pressed="false"><span class="l l1">Follow</span><span class="l l2">Following</span></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn'), l1 = root.querySelector('.l1'), l2 = root.querySelector('.l2');
    const fit = () => b.style.setProperty('--w', ((b.getAttribute('aria-pressed') === 'true' ? l2 : l1).offsetWidth + 2) + 'px');
    const ro = new ResizeObserver(() => { const t = b.style.transition; b.style.transition = 'none'; fit(); b.offsetWidth; b.style.transition = t; });
    ro.observe(l1); ro.observe(l2);
    b.addEventListener('click', () => { b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')); fit(); });
    return () => ro.disconnect();
  },
};
