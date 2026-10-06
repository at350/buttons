// Canvas 2D flow field in the Tyler Hobbs manner: a smooth noise angle field steers ink particles that lay
// down thin strokes on paper in a four-colour palette. The field is prewarmed in init so the streamlines
// are already drawn at rest; hover lets the ink keep flowing and pulls it into a swirl around the pointer,
// press blows the strokes outward.
const W = 260, H = 72, N = 260;
const PAL = ['#e4572e', '#1d3557', '#2a9d8f', '#e9b44c'];
const PAPER = [242, 236, 222];
const hash = (x, y) => { const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return n - Math.floor(n); };
const lerp = (a, b, t) => a + (b - a) * t;
function noise(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y); let fx = x - ix, fy = y - iy;
  fx = fx * fx * (3 - 2 * fx); fy = fy * fy * (3 - 2 * fy);
  return lerp(lerp(hash(ix, iy), hash(ix + 1, iy), fx), lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), fx), fy);
}

export default {
  id: 'sh-flow-field',
  credit: 'Flow-field pill (after Tyler Hobbs) — ink particles follow a smooth noise angle field on a 2D canvas, laying four-colour strokes on paper; hover keeps the ink flowing and swirls it round the pointer, press blows it outward',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 260px; height: 72px; max-width: 100%; padding: 0; border: 0; border-radius: 999px; overflow: hidden; background: rgb(242,236,222); cursor: pointer; isolation: isolate; box-shadow: inset 0 0 0 1px rgba(29,53,87,.18), 0 1px 2px rgba(0,0,0,.12); transition: box-shadow .2s, transform .15s; }
    .btn:hover { box-shadow: inset 0 0 0 1px rgba(29,53,87,.35), 0 6px 16px -8px rgba(29,53,87,.45); }
    .btn:active { transform: scale(.985); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .l { position: relative; z-index: 1; padding: 7px 16px; border-radius: 999px; background: rgba(242,236,222,.88); color: #1d3557; font: 700 15px/1 'DM Sans', system-ui, sans-serif; letter-spacing: .02em; pointer-events: none; box-shadow: 0 0 0 1px rgba(29,53,87,.14); }
    .btn:focus-visible { outline: 2px solid #1d3557; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button"><canvas class="cv"></canvas><span class="l">Go with the flow</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    ctx.scale(dpr, dpr); ctx.lineCap = 'round';
    const P = new Float32Array(N * 5); // x, y, vx, vy, life
    const C = new Uint8Array(N);
    const spawn = (i) => { P[i * 5] = Math.random() * W; P[i * 5 + 1] = Math.random() * H; P[i * 5 + 2] = 0; P[i * 5 + 3] = 0; P[i * 5 + 4] = 40 + Math.random() * 120; C[i] = (Math.random() * PAL.length) | 0; };
    for (let i = 0; i < N; i++) spawn(i);
    let raf = 0, t = 0, last = 0, hover = 0, hoverT = 0, mx = W / 2, my = H / 2, burst = 0, dead = false;
    const angle = (x, y) => noise(x * .011 + 3, y * .011 + t * .05) * Math.PI * 3.2 + noise(x * .03, y * .03 - t * .1) * .8;
    const advance = (dt, fade) => {
      if (fade) { ctx.fillStyle = `rgba(${PAPER[0]},${PAPER[1]},${PAPER[2]},${fade})`; ctx.fillRect(0, 0, W, H); }
      ctx.lineWidth = .9;
      for (let c = 0; c < PAL.length; c++) {
        ctx.strokeStyle = PAL[c]; ctx.globalAlpha = .55; ctx.beginPath();
        for (let i = 0; i < N; i++) {
          if (C[i] !== c) continue;
          const k = i * 5; const x = P[k], y = P[k + 1];
          const a = angle(x, y); let vx = Math.cos(a) * 26, vy = Math.sin(a) * 26;
          if (hover > .01) { const dx = x - mx, dy = y - my, d2 = dx * dx + dy * dy + 60, s = 2600 * hover / d2; vx += -dy * s * .06; vy += dx * s * .06; }
          if (burst > 0) { const dx = x - mx, dy = y - my, d = Math.hypot(dx, dy) + 6; vx += dx / d * 160 * burst; vy += dy / d * 160 * burst; }
          const nx = x + vx * dt, ny = y + vy * dt;
          P[k + 4] -= 1;
          if (nx < -2 || nx > W + 2 || ny < -2 || ny > H + 2 || P[k + 4] <= 0) { spawn(i); continue; }
          ctx.moveTo(x, y); ctx.lineTo(nx, ny);
          P[k] = nx; P[k + 1] = ny;
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };
    // prewarm: the streamlines are already on the paper at rest
    ctx.fillStyle = `rgb(${PAPER.join(',')})`; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 240; i++) advance(1 / 30, .014);
    const tick = (now) => {
      raf = 0; if (dead) return;
      const dt = Math.min(.05, (now - last) / 1000 || .016); last = now; t += dt;
      hover += (hoverT - hover) * Math.min(1, dt * 6); burst = Math.max(0, burst - dt * 2.2);
      advance(dt, .014);
      if (hoverT || hover > .02 || burst > 0) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf && !dead) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const pos = (e) => { const r = cv.getBoundingClientRect(); if (r.width) { mx = (e.clientX - r.left) / r.width * W; my = (e.clientY - r.top) / r.height * H; } };
    btn.addEventListener('pointerenter', (e) => { pos(e); hoverT = 1; kick(); });
    btn.addEventListener('pointermove', pos);
    btn.addEventListener('pointerleave', () => { hoverT = 0; kick(); });
    btn.addEventListener('pointerdown', (e) => { pos(e); burst = 1; kick(); });
    btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { mx = W / 2; my = H / 2; burst = 1; kick(); } });
    btn.addEventListener('focus', () => { if (btn.matches(':focus-visible')) { hoverT = 1; kick(); } });
    btn.addEventListener('blur', () => { if (!btn.matches(':hover')) { hoverT = 0; kick(); } });
    return () => { dead = true; cancelAnimationFrame(raf); };
  },
};
