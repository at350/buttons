const SPRING = 'linear(0, 0.143, 0.453, 0.779, 1.028, 1.168, 1.205, 1.173, 1.109, 1.043, 0.992, 0.965, 0.958, 0.965, 0.978, 0.992, 1.002, 1.007, 1.009, 1.007, 1.004, 1.002, 1)';

export default {
  id: 'mo-spring-tooltip',
  credit: 'Pointer-anchored tooltip — springs up from wherever the cursor is, then glides along as you move (Family / Linear tooltips)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { position: relative; padding-top: 46px; font-family: Inter, system-ui, sans-serif; }
    .btn { position: relative; height: 42px; padding: 0 20px; border-radius: 10px; border: 1px solid #e2e2de; background: #fff; color: #111; font: 500 14px Inter, system-ui, sans-serif; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,.05); transition: background .2s, transform .15s; display: inline-flex; align-items: center; gap: 8px; }
    .btn:hover { background: #f7f7f5; } .btn:active { transform: scale(.97); }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .btn svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .tip {
      position: absolute; top: 6px; left: var(--x, 50%); transform: translate(-50%, 10px) scale(.6); transform-origin: 50% 100%; opacity: 0; pointer-events: none;
      padding: 7px 10px; border-radius: 8px; background: #111; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap;
      transition: transform .55s ${SPRING}, opacity .2s, left .35s cubic-bezier(.2, .8, .2, 1);
    }
    .tip::after { content: ''; position: absolute; left: 50%; bottom: -4px; width: 8px; height: 8px; background: #111; border-radius: 1px; transform: translateX(-50%) rotate(45deg); }
    .tip kbd { font: 500 11px 'JetBrains Mono', ui-monospace, monospace; background: rgba(255,255,255,.15); padding: 1px 5px; border-radius: 4px; margin-left: 6px; }
    .wrap.on .tip { opacity: 1; transform: translate(-50%, 0) scale(1); }
    .wrap.in .tip { transition: transform .55s ${SPRING}, opacity .2s, left 0s; }
  `,
  html: `
    <div class="wrap">
      <span class="tip" role="tooltip" id="t">Save changes<kbd>⌘S</kbd></span>
      <button class="btn" type="button" aria-describedby="t"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6"/></svg>Save</button>
    </div>`,
  init(root) {
    const wrap = root.querySelector('.wrap'), btn = root.querySelector('.btn'), tip = root.querySelector('.tip');
    let t = 0;
    const place = (e) => { const r = wrap.getBoundingClientRect(); tip.style.setProperty('--x', Math.max(50, Math.min(r.width - 50, e.clientX - r.left)) + 'px'); };
    btn.addEventListener('pointerenter', (e) => { wrap.classList.add('in'); place(e); wrap.classList.add('on'); clearTimeout(t); t = setTimeout(() => wrap.classList.remove('in'), 50); });
    btn.addEventListener('pointermove', place);
    btn.addEventListener('pointerleave', () => wrap.classList.remove('on'));
    btn.addEventListener('focus', () => { tip.style.setProperty('--x', '50%'); wrap.classList.add('on'); });
    btn.addEventListener('blur', () => wrap.classList.remove('on'));
    return () => clearTimeout(t);
  },
};
