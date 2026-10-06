// Canvas 2D: curl-noise flow field particles with fading trails (no WebGL needed).
const W = 260, H = 72, N = 220;
const hash = (x, y) => { const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return n - Math.floor(n); };
const lerp = (a, b, t) => a + (b - a) * t;
function noise(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y); let fx = x - ix, fy = y - iy;
  fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
  return lerp(lerp(hash(ix, iy), hash(ix + 1, iy), fx), lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), fx), fy);
}
function curl(x, y, t, out) {
  const e = .02, sx = x * .012 + t * .08, sy = y * .012 + t * .05;
  out[0] = (noise(sx, sy + e) - noise(sx, sy - e)) / (2 * e);
  out[1] = -(noise(sx + e, sy) - noise(sx - e, sy)) / (2 * e);
}

export default {
  id: 'sh-flow-field',
  credit: 'Curl-noise flow field pill — 220 particles advected through a divergence-free noise field on a 2D canvas; hover draws them to the pointer, press scatters them',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 260px; height: 72px; max-width: 100%; padding: 0; border: 1px solid rgba(255,255,255,.12); border-radius: 999px; overflow: hidden; background: #080a14; cursor: pointer; isolation: isolate; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .l { position: relative; z-index: 1; color: #fff; font: 600 16px/1 'DM Sans', system-ui, sans-serif; letter-spacing: .06em; text-transform: uppercase; pointer-events: none; text-shadow: 0 0 12px rgba(0,0,0,.9); }
    .btn[aria-pressed="true"] .l { color: #ffd166; }
    .btn:focus-visible { outline: 2px solid #4cc9f0; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false"><canvas class="cv"></canvas><span class="l">Flow</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    ctx.scale(dpr, dpr);
    const P = new Float32Array(N * 4); // x, y, vx, vy
    for (let i = 0; i < N; i++) { P[i * 4] = Math.random() * W; P[i * 4 + 1] = Math.random() * H; }
    let raf = 0, t = 0, last = 0, hover = 0, hoverT = 0, settle = 0, mx = W / 2, my = H / 2, burst = 0;
    const v = [0, 0];
    ctx.fillStyle = '#080a14'; ctx.fillRect(0, 0, W, H);
    const tick = (now) => {
      raf = 0;
      const dt = Math.min(.05, (now - last) / 1000 || .016); last = now; t += dt;
      hover += (hoverT - hover) * Math.min(1, dt * 8);
      burst = Math.max(0, burst - dt * 2);
      ctx.fillStyle = 'rgba(8,10,20,.14)'; ctx.fillRect(0, 0, W, H);
      const speed = 22 + 60 * hover;
      for (let i = 0; i < N; i++) {
        const k = i * 4; let x = P[k], y = P[k + 1];
        curl(x, y, t, v);
        let vx = P[k + 2] * .9 + v[0] * speed * .1, vy = P[k + 3] * .9 + v[1] * speed * .1;
        const dx = mx - x, dy = my - y, d2 = dx * dx + dy * dy + 40;
        vx += dx / d2 * 900 * hover; vy += dy / d2 * 900 * hover;
        vx -= dx / d2 * 9000 * burst; vy -= dy / d2 * 9000 * burst;
        x += vx * dt; y += vy * dt;
        if (x < 0) x += W; if (x > W) x -= W; if (y < 0) y += H; if (y > H) y -= H;
        P[k] = x; P[k + 1] = y; P[k + 2] = vx; P[k + 3] = vy;
        const sp = Math.min(1, Math.hypot(vx, vy) / 90);
        ctx.fillStyle = `hsl(${200 + sp * 120 + burst * 60}, 90%, ${55 + sp * 25}%)`;
        ctx.fillRect(x, y, 1.6, 1.6);
      }
      if (hoverT || hover > .01 || burst > 0 || (settle -= dt) > 0) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const pos = (e) => { const r = cv.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width * W; my = (e.clientY - r.top) / r.height * H; };
    btn.addEventListener('pointerenter', (e) => { pos(e); hoverT = 1; kick(); });
    btn.addEventListener('pointermove', pos);
    btn.addEventListener('pointerleave', () => { hoverT = 0; settle = 1.5; kick(); });
    btn.addEventListener('pointerdown', (e) => { pos(e); burst = 1; kick(); });
    btn.addEventListener('focus', () => { if (btn.matches(':focus-visible')) { hoverT = 1; kick(); } });
    btn.addEventListener('blur', () => { if (!btn.matches(':hover')) { hoverT = 0; settle = 1.5; kick(); } });
    btn.addEventListener('click', (e) => { if (!e.detail) { burst = 1; kick(); } btn.setAttribute('aria-pressed', String(btn.getAttribute('aria-pressed') !== 'true')); });
    kick();
    return () => cancelAnimationFrame(raf);
  },
};
