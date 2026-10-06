// Canvas 2D: snow globe with 120 settling flakes; press shakes the globe.
const S = 150, N = 120, R = 66, CX = 75, CY = 72, GROUND = 118;

export default {
  id: 'sh-snow-globe',
  credit: 'Snow globe button — 2D-canvas flakes with gravity and drag inside a glass sphere; click (shake) throws them into a swirl that slowly settles back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: block; width: 150px; height: 170px; padding: 0; border: 0; background: transparent; cursor: pointer; }
    .cv { position: absolute; left: 0; top: 0; width: 150px; height: 150px; display: block; pointer-events: none; transition: transform .1s; }
    .btn:active .cv, .btn.shake .cv { animation: shake .4s ease-in-out; }
    @keyframes shake { 0%, 100% { transform: none; } 25% { transform: translate(-3px, -2px) rotate(-3deg); } 50% { transform: translate(3px, 1px) rotate(3deg); } 75% { transform: translate(-2px, 2px) rotate(-2deg); } }
    .base { position: absolute; left: 20px; right: 20px; bottom: 0; height: 30px; border-radius: 6px 6px 10px 10px; background: linear-gradient(180deg, #7a4a2a, #4a2a14); box-shadow: inset 0 2px 0 rgba(255,255,255,.2), 0 6px 14px -6px rgba(0,0,0,.5); }
    .base::before { content: ''; position: absolute; left: 0; right: 0; top: -6px; height: 10px; border-radius: 50%; background: #8b5a34; }
    .btn:focus-visible { outline: 2px solid #8bb8ff; outline-offset: 2px; border-radius: 50%; }
  `,
  html: `<button class="btn" type="button" aria-label="Shake the snow globe"><canvas class="cv"></canvas><span class="base"></span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
    cv.width = S * dpr; cv.height = S * dpr;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    ctx.scale(dpr, dpr);
    const F = new Float32Array(N * 5); // x y vx vy r
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2, d = Math.sqrt(Math.random()) * (R - 4);
      F[i * 5] = CX + Math.cos(a) * d; F[i * 5 + 1] = Math.min(GROUND - 2, CY + Math.sin(a) * d); F[i * 5 + 4] = .8 + Math.random() * 1.4;
    }
    let raf = 0, last = 0, moving = 0, hover = false, mx = CX, my = CY, pmx = CX;
    const draw = () => {
      ctx.clearRect(0, 0, S, S);
      ctx.save(); ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.clip();
      const g = ctx.createRadialGradient(CX - 20, CY - 25, 5, CX, CY, R); g.addColorStop(0, '#2d4a7a'); g.addColorStop(1, '#0b1630');
      ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);
      ctx.fillStyle = '#e8f0ff'; ctx.beginPath(); ctx.ellipse(CX, GROUND + 10, R, 16, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#5a3a22'; ctx.fillRect(CX - 3, GROUND - 26, 6, 20);
      ctx.fillStyle = '#2f7a3a'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(CX, GROUND - 48 + k * 9); ctx.lineTo(CX - 14 - k * 4, GROUND - 28 + k * 9); ctx.lineTo(CX + 14 + k * 4, GROUND - 28 + k * 9); ctx.fill(); }
      ctx.fillStyle = '#fff';
      for (let i = 0; i < N; i++) { ctx.beginPath(); ctx.arc(F[i * 5], F[i * 5 + 1], F[i * 5 + 4], 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
      ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(CX, CY, R - 8, Math.PI * 1.15, Math.PI * 1.45); ctx.stroke();
    };
    const tick = (now) => {
      raf = 0;
      const dt = Math.min(.05, (now - last) / 1000 || .016); last = now;
      const wind = hover ? (mx - pmx) * 6 : 0; pmx = mx; moving = 0;
      for (let i = 0; i < N; i++) {
        const k = i * 5; let x = F[k], y = F[k + 1], vx = F[k + 2], vy = F[k + 3];
        vy += 38 * dt; vx += wind * dt; vx *= .985; vy *= .985;
        x += vx * dt; y += vy * dt;
        const dx = x - CX, dy = y - CY, d = Math.hypot(dx, dy);
        if (d > R - 3) { const nx = dx / d, ny = dy / d; x = CX + nx * (R - 3); y = CY + ny * (R - 3); const dot = vx * nx + vy * ny; vx -= 1.4 * dot * nx; vy -= 1.4 * dot * ny; }
        if (y > GROUND - 1) { y = GROUND - 1; vy = Math.abs(vy) > 8 ? -vy * .25 : 0; vx *= .7; }
        moving += Math.abs(vx) + Math.abs(vy);
        F[k] = x; F[k + 1] = y; F[k + 2] = vx; F[k + 3] = vy;
      }
      draw();
      if (moving > 2 || hover) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const shake = () => {
      for (let i = 0; i < N; i++) { const a = Math.random() * Math.PI * 2, sp = 60 + Math.random() * 160; F[i * 5 + 2] = Math.cos(a) * sp; F[i * 5 + 3] = Math.sin(a) * sp - 80; }
      btn.classList.remove('shake'); void btn.offsetWidth; btn.classList.add('shake'); kick();
    };
    btn.addEventListener('pointermove', (e) => { const r = cv.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width * S; my = (e.clientY - r.top) / r.height * S; });
    btn.addEventListener('pointerenter', () => { hover = true; pmx = mx; kick(); });
    btn.addEventListener('pointerleave', () => { hover = false; });
    btn.addEventListener('click', shake);
    draw();
    return () => cancelAnimationFrame(raf);
  },
};
