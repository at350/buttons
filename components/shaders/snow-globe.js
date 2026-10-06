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
    .base { position: absolute; left: 18px; right: 18px; bottom: 0; height: 30px; border-radius: 6px 6px 12px 12px; background: linear-gradient(90deg, #3e2312, #7a4a2a 35%, #8f5a34 50%, #5a3420 80%, #3e2312); box-shadow: inset 0 3px 0 #c9a24a, inset 0 4px 0 #7a5a1a, 0 6px 14px -6px rgba(0,0,0,.5); }
    .base::before { content: ''; position: absolute; left: 4px; right: 4px; top: -6px; height: 10px; border-radius: 50%; background: linear-gradient(90deg, #8a6a24, #e3c46a 45%, #a8862e); }
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
    const pine = (x, base, h, w) => {
      // tiered pine: four overlapping tiers, each shaded left-dark/right-light with a snow cap on its lower edge
      ctx.fillStyle = '#4a2e1a'; ctx.fillRect(x - 1.5, base - h * .18, 3, h * .2);
      for (let k = 0; k < 4; k++) {
        const top = base - h + k * h * .2, bot = base - h * .42 + k * h * .15, hw = w * (.45 + k * .2);
        const g = ctx.createLinearGradient(x - hw, 0, x + hw, 0); g.addColorStop(0, '#163f2a'); g.addColorStop(.55, '#2a6b40'); g.addColorStop(1, '#3d8a52');
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, top); ctx.quadraticCurveTo(x - hw * .35, bot - (bot - top) * .35, x - hw, bot); ctx.quadraticCurveTo(x, bot - 2.5, x + hw, bot); ctx.quadraticCurveTo(x + hw * .35, bot - (bot - top) * .35, x, top); ctx.fill();
        ctx.strokeStyle = 'rgba(240,246,255,.9)'; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x - hw * .92, bot - .3); ctx.quadraticCurveTo(x, bot - 3, x + hw * .55, bot - 1); ctx.stroke();
      }
      ctx.fillStyle = 'rgba(245,250,255,.95)'; ctx.beginPath(); ctx.arc(x, base - h + 1.5, 1.6, 0, Math.PI * 2); ctx.fill();
    };
    const draw = () => {
      ctx.clearRect(0, 0, S, S);
      ctx.save(); ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2); ctx.clip();
      const g = ctx.createRadialGradient(CX - 18, CY - 30, 4, CX, CY, R * 1.05); g.addColorStop(0, '#34588f'); g.addColorStop(.6, '#162b55'); g.addColorStop(1, '#0a1530');
      ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);
      // flakes behind the scene (smaller, dimmer = farther)
      for (let i = 0; i < N; i += 2) { ctx.fillStyle = 'rgba(220,232,255,.55)'; ctx.beginPath(); ctx.arc(F[i * 5], F[i * 5 + 1], F[i * 5 + 4] * .75, 0, Math.PI * 2); ctx.fill(); }
      // snow mound
      const sg = ctx.createLinearGradient(0, GROUND - 8, 0, S); sg.addColorStop(0, '#f4f8ff'); sg.addColorStop(1, '#a9bedc');
      ctx.fillStyle = sg; ctx.beginPath(); ctx.moveTo(0, S); ctx.lineTo(0, GROUND + 2); ctx.quadraticCurveTo(CX - 30, GROUND - 7, CX, GROUND - 4); ctx.quadraticCurveTo(CX + 34, GROUND - 1, S, GROUND + 3); ctx.lineTo(S, S); ctx.fill();
      pine(CX - 30, GROUND - 1, 30, 11); pine(CX + 29, GROUND, 26, 10); pine(CX + 2, GROUND - 3, 50, 17);
      // flakes in front
      for (let i = 1; i < N; i += 2) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(F[i * 5], F[i * 5 + 1], F[i * 5 + 4], 0, Math.PI * 2); ctx.fill(); }
      // glass: inner edge shadow and reflections
      const eg = ctx.createRadialGradient(CX, CY, R * .72, CX, CY, R); eg.addColorStop(0, 'rgba(0,0,20,0)'); eg.addColorStop(1, 'rgba(0,0,20,.35)');
      ctx.fillStyle = eg; ctx.fillRect(0, 0, S, S);
      ctx.restore();
      ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(CX, CY, R - .75, 0, Math.PI * 2); ctx.stroke();
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.arc(CX, CY, R - 8, Math.PI * 1.13, Math.PI * 1.42); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(CX, CY, R - 8, Math.PI * 1.5, Math.PI * 1.56); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(CX, CY, R - 6, Math.PI * .15, Math.PI * .4); ctx.stroke();
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
