// Pointer-anchored tooltip: it springs up (stiffness 500, damping 30) from where the cursor entered and then glides
// after it along the button, clamped so it never leaves its own box. Linear-style dark tooltip with a keycap.
const SPRING = 'linear(0, 0.04, 0.126, 0.249, 0.374, 0.509, 0.625, 0.737, 0.824, 0.9, 0.954, 0.998, 1.027, 1.044, 1.053, 1.056, 1.054, 1.05, 1.043, 1.036, 1.028, 1.021, 1.015, 1.01, 1.006, 1.003, 1, 0.999, 0.998, 0.997, 0.997, 0.997, 0.997, 0.998, 0.998, 0.998, 0.999, 0.999, 0.999, 1, 1)';

export default {
  id: 'mo-spring-tooltip',
  credit: 'Pointer-anchored tooltip (Linear-style, with keycaps) — springs up from wherever the cursor enters, then glides after it on the same spring',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { position: relative; width: 200px; padding-top: 44px; display: flex; justify-content: center; font-family: Inter, system-ui, sans-serif; }
    .btn { position: relative; height: 42px; padding: 0 20px; border-radius: 10px; border: 1px solid #e2e2de; background: #fff; color: #111; font: 500 14px Inter, system-ui, sans-serif; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,.05); transition: background .2s, transform .15s; display: inline-flex; align-items: center; gap: 8px; }
    .btn:hover { background: #f7f7f5; } .btn:active { transform: scale(.97); }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .btn svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .tip {
      position: absolute; top: 6px; left: var(--x, 50%); transform: translate(-50%, 10px) scale(.6); transform-origin: 50% 100%; opacity: 0; pointer-events: none;
      display: flex; align-items: center; gap: 8px; padding: 5px 6px 5px 10px; border-radius: 8px; background: #1c1c1f; color: #f4f4f5; font-size: 12px; font-weight: 500; white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,.18), 0 0 0 1px rgba(255,255,255,.06) inset;
      transition: transform .5s ${SPRING}, opacity .15s, left .45s ${SPRING};
    }
    .tip::after { content: ''; position: absolute; left: 50%; bottom: -4px; width: 8px; height: 8px; background: #1c1c1f; border-radius: 1px; transform: translateX(-50%) rotate(45deg); }
    .tip kbd { display: inline-grid; place-items: center; min-width: 18px; height: 18px; padding: 0 4px; border-radius: 4px; background: rgba(255,255,255,.12); color: #d4d4d8; font: 500 11px Inter, system-ui, sans-serif; }
    .wrap.on .tip { opacity: 1; transform: translate(-50%, 0) scale(1); }
    .wrap.in .tip { transition: transform .55s ${SPRING}, opacity .2s, left 0s; }
  `,
  html: `
    <div class="wrap">
      <span class="tip" role="tooltip" id="t">Save changes<kbd>⌘</kbd><kbd style="margin-left:-5px">S</kbd></span>
      <button class="btn" type="button" aria-describedby="t"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>Save</button>
    </div>`,
  init(root) {
    const wrap = root.querySelector('.wrap'), btn = root.querySelector('.btn'), tip = root.querySelector('.tip');
    let t = 0;
    const place = (e) => { const r = wrap.getBoundingClientRect(), h = tip.offsetWidth / 2 + 2; tip.style.setProperty('--x', Math.max(h, Math.min(r.width - h, e.clientX - r.left)) + 'px'); };
    btn.addEventListener('pointerenter', (e) => { wrap.classList.add('in'); place(e); wrap.classList.add('on'); clearTimeout(t); t = setTimeout(() => wrap.classList.remove('in'), 50); });
    btn.addEventListener('pointermove', place);
    btn.addEventListener('pointerleave', () => wrap.classList.remove('on'));
    btn.addEventListener('focus', () => { if (!btn.matches(':focus-visible')) return; tip.style.setProperty('--x', '50%'); wrap.classList.add('on'); });
    btn.addEventListener('blur', () => wrap.classList.remove('on'));
    return () => clearTimeout(t);
  },
};
