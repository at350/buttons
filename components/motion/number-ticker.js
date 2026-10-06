// Magic UI <NumberTicker /> — a motion value is driven by useSpring({ damping: 60, stiffness: 100 }) and every frame is
// re-formatted with Intl.NumberFormat('en-US'), "inline-block tracking-wider tabular-nums". Starts once in view.
// The same spring is integrated here (mass 1, ζ = 3) in a rAF loop that only runs while the value is moving.
export default {
  id: 'mo-number-ticker',
  credit: 'Magic UI NumberTicker — the number is pushed through a useSpring (stiffness 100, damping 60), so it counts up fast then eases into the value, formatted with Intl.NumberFormat on every frame',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .card { display: inline-flex; align-items: center; gap: 18px; padding: 16px 16px 16px 22px; border-radius: 12px; background: #fff; border: 1px solid #e4e4e7; box-shadow: 0 1px 2px rgba(0,0,0,.05); font-family: Inter, system-ui, sans-serif; }
    .num { display: inline-block; min-width: 4.3ch; font-size: 48px; font-weight: 500; line-height: 1; letter-spacing: -.05em; color: #000; font-variant-numeric: tabular-nums; text-align: right; }
    .btn { width: 36px; height: 36px; border-radius: 8px; border: 1px solid #e4e4e7; background: #fff; color: #09090b; cursor: pointer; display: grid; place-items: center; transition: background .15s, transform .15s; }
    .btn:hover { background: #f4f4f5; } .btn:active { transform: scale(.94); }
    .btn:focus-visible { outline: 2px solid #09090b; outline-offset: 2px; }
    .btn svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .5s cubic-bezier(.32, .72, 0, 1); }
    .btn.spin svg { transform: rotate(360deg); transition: none; }
  `,
  html: `
    <div class="card">
      <span class="num" role="status" aria-live="polite">0</span>
      <button class="btn" type="button" aria-label="Replay"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg></button>
    </div>`,
  init(root) {
    const el = root.querySelector('.num'), btn = root.querySelector('.btn');
    const fmt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
    const targets = [8462, 1250, 9999, 3018, 6730];
    let k = 0, x = 0, v = 0, target = 0, raf = 0, last = 0;
    const tick = (t) => {
      const dt = Math.min(0.032, (t - last) / 1000 || 0.016); last = t;
      for (let i = 0; i < 4; i++) { const a = -100 * (x - target) - 60 * v; v += a * dt / 4; x += v * dt / 4; }
      el.textContent = fmt.format(Math.round(x));
      if (Math.abs(target - x) < .5 && Math.abs(v) < 1) { x = target; el.textContent = fmt.format(target); raf = 0; return; }
      raf = requestAnimationFrame(tick);
    };
    const go = (to, from) => { if (from !== undefined) { x = from; v = 0; } target = to; if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); go(targets[k]); } });
    io.observe(el);
    btn.addEventListener('click', () => {
      k = (k + 1) % targets.length; go(targets[k], 0);
      btn.classList.add('spin'); requestAnimationFrame(() => requestAnimationFrame(() => btn.classList.remove('spin')));
    });
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  },
};
