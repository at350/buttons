// Prometheus (2012) — the Engineers' orrery (Territory Studio / Compuhire): a hologram of glowing gold-green worlds on orbits. Drag to turn it, click to find LV-223.
const NAMES = ['LV-223', 'ZETA² RETICULI', 'LV-426', 'LV-178', 'LV-1201'];
export default {
  id: 'sf-prometheus-orrery',
  credit: 'Prometheus (2012) — the Engineers\' holographic orrery: a particle globe of gold-green light with worlds on tilted orbits; drag to turn it, click to step the lock to the next world (LV-223 first)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 290px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 10px; background: radial-gradient(circle at 50% 55%, #0d1a10, #010302 70%); }
    .holo { position: relative; outline: none; cursor: grab; touch-action: none; border-radius: 8px; }
    .holo:active { cursor: grabbing; }
    .holo:focus-visible { box-shadow: 0 0 0 1px #d6ff8f; }
    canvas { display: block; width: 270px; height: 180px; max-width: 100%; }
    .lab { position: absolute; left: 8px; bottom: 6px; font: 500 9px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .2em; color: #e8ffb8; text-shadow: 0 0 6px #9cff5a; white-space: nowrap; }
  `,
  html: `<div class="stage"><div class="holo" role="button" tabindex="0" aria-label="Orrery"><canvas width="540" height="360"></canvas><span class="lab">LV-223</span></div></div>`,
  init(root) {
    const h = root.querySelector('.holo'), cv = root.querySelector('canvas'), c = cv.getContext('2d'), lab = root.querySelector('.lab');
    const W = 270, H = 180; c.scale(2, 2);
    const pts = []; for (let i = 0; i < 360; i++) { const y = 1 - (i / 359) * 2, r = Math.sqrt(1 - y * y), a = i * 2.39996; pts.push([Math.cos(a) * r * 56, y * 56, Math.sin(a) * r * 56]); }
    const orbits = [[70, .5, 0], [88, -.3, 1.6], [104, .9, 3.1], [120, .2, 4.4], [132, -.7, 5.5]];
    let yaw = 0.4, pitch = 0.32, sel = 0, raf = 0, hov = false, drag = false, lx = 0, ly = 0, pulse = 0, last = 0;
    const P = (x, y, z) => { const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      const x1 = x * cy - z * sy, z1 = x * sy + z * cy, y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp, k = 260 / (260 + z2);
      return [W / 2 + x1 * k * .8, H / 2 + y1 * k * .8, z2, k]; };
    const draw = () => {
      c.globalCompositeOperation = 'source-over'; c.fillStyle = '#010302'; c.fillRect(0, 0, W, H);
      c.globalCompositeOperation = 'lighter';
      for (const [x, y, z] of pts) { const [sx, sy, sz, k] = P(x, y, z); c.fillStyle = `rgba(190,255,120,${(.25 + .35 * (1 - sz / 60)).toFixed(2)})`; c.fillRect(sx, sy, 1.3 * k, 1.3 * k); }
      const g = c.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 22); g.addColorStop(0, 'rgba(255,240,170,.9)'); g.addColorStop(1, 'rgba(255,200,80,0)');
      c.fillStyle = g; c.beginPath(); c.arc(W / 2, H / 2, 22, 0, 7); c.fill();
      orbits.forEach(([r, tilt, ph], i) => {
        c.strokeStyle = i === sel ? 'rgba(255,230,140,.75)' : 'rgba(170,255,110,.28)'; c.lineWidth = i === sel ? 1 : .6; c.beginPath();
        for (let a = 0; a <= 64; a++) { const t = (a / 64) * Math.PI * 2, [sx, sy] = P(Math.cos(t) * r, Math.sin(t) * r * Math.sin(tilt), Math.sin(t) * r * Math.cos(tilt)); a ? c.lineTo(sx, sy) : c.moveTo(sx, sy); }
        c.stroke();
        const t = ph, [px, py, , k] = P(Math.cos(t) * r, Math.sin(t) * r * Math.sin(tilt), Math.sin(t) * r * Math.cos(tilt));
        c.fillStyle = i === sel ? '#fff4c2' : '#c8ff8a'; c.beginPath(); c.arc(px, py, (i === sel ? 3.6 : 2.6) * k, 0, 7); c.fill();
        if (i === sel) { c.strokeStyle = `rgba(255,236,160,${(1 - pulse).toFixed(2)})`; c.lineWidth = 1; c.beginPath(); c.arc(px, py, 6 + pulse * 14, 0, 7); c.stroke(); c.strokeRect(px - 9, py - 9, 18, 18); }
      });
    };
    const tick = (now) => {
      raf = 0; const dt = Math.min(.1, (now - last) / 1000); if (dt < 1 / 30) { raf = requestAnimationFrame(tick); return; } last = now;
      if (hov && !drag) yaw += dt * .35; pulse = (pulse + dt * .9) % 1; draw();
      if (hov || drag) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) { last = performance.now() - 40; raf = requestAnimationFrame(tick); } };
    let moved = 0;
    h.addEventListener('pointerenter', () => { hov = true; kick(); });
    h.addEventListener('pointerleave', () => { hov = false; });
    h.addEventListener('pointerdown', (e) => { drag = true; moved = 0; lx = e.clientX; ly = e.clientY; h.setPointerCapture && h.setPointerCapture(e.pointerId); kick(); });
    h.addEventListener('pointermove', (e) => { if (!drag) return; yaw += (e.clientX - lx) * .01; pitch = Math.max(-1.2, Math.min(1.2, pitch + (e.clientY - ly) * .008)); moved += Math.abs(e.clientX - lx) + Math.abs(e.clientY - ly); lx = e.clientX; ly = e.clientY; });
    const next = () => { sel = (sel + 1) % orbits.length; lab.textContent = NAMES[sel]; pulse = 0; draw(); };
    h.addEventListener('pointerup', () => { drag = false; if (moved < 4) next(); });
    h.addEventListener('pointercancel', () => { drag = false; });
    h.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); next(); } if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { yaw += e.key === 'ArrowLeft' ? -.2 : .2; draw(); } });
    draw();
    return () => { cancelAnimationFrame(raf); raf = 0; hov = drag = false; };
  },
};
