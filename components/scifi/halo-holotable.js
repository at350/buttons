// Halo — the UNSC holotable on the Pillar of Autumn: Installation 04 as a blue hologram over the hex table. Hover to turn it, click to activate the ring.
export default {
  id: 'sf-halo-holotable',
  credit: 'Halo: Combat Evolved — Pillar of Autumn holotable projecting Installation 04: flickering blue hologram ring with scanlines over the hex pedestal; hover to rotate, click to fire the ring (pulse) and again to stand down',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 280px; max-width: 100%; border-radius: 12px; overflow: hidden; background: radial-gradient(ellipse at 50% 100%, #0e2238, #03070c 70%); }
    .tbl { display: block; position: relative; width: 100%; border: 0; padding: 0; background: none; cursor: pointer; }
    .tbl:focus-visible { outline: 2px solid #7fd0ff; outline-offset: -4px; border-radius: 12px; }
    canvas { display: block; width: 280px; height: 190px; max-width: 100%; }
  `,
  html: `<div class="stage"><button class="tbl" type="button" aria-pressed="false" aria-label="Installation 04"><canvas width="560" height="380"></canvas></button></div>`,
  init(root) {
    const b = root.querySelector('.tbl'), cv = root.querySelector('canvas'), c = cv.getContext('2d');
    const W = 280, H = 190, dpr = Math.min(2, devicePixelRatio || 1); cv.width = W * dpr; cv.height = H * dpr; c.scale(dpr, dpr);
    let yaw = .6, raf = 0, hov = false, pulse = 0, last = 0, t = 0;
    const draw = () => {
      c.globalCompositeOperation = 'source-over'; c.clearRect(0, 0, W, H);
      const cx = W / 2, cy = 84, on = b.getAttribute('aria-pressed') === 'true';
      c.fillStyle = '#0b141d'; c.beginPath();
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + Math.PI / 6; c.lineTo(cx + Math.cos(a) * 96, 168 + Math.sin(a) * 18); } c.closePath(); c.fill();
      c.strokeStyle = '#2b5a7d'; c.lineWidth = 1; c.stroke();
      const cone = c.createLinearGradient(0, 40, 0, 168); cone.addColorStop(0, 'rgba(80,170,255,0)'); cone.addColorStop(1, 'rgba(80,170,255,.22)');
      c.fillStyle = cone; c.beginPath(); c.moveTo(cx - 30, 168); c.lineTo(cx - 92, 70); c.lineTo(cx + 92, 70); c.lineTo(cx + 30, 168); c.fill();
      c.globalCompositeOperation = 'lighter';
      const R = 60, w = 7, fl = .85 + .15 * Math.sin(t * 37) * Math.sin(t * 13), seg = 96;
      const cyw = Math.cos(yaw), syw = Math.sin(yaw), ct = Math.cos(.38), stt = Math.sin(.38);
      const P = (a, z) => { const x = R * Math.cos(a), y = R * Math.sin(a), x1 = x * cyw + z * syw, z1 = -x * syw + z * cyw, y1 = y * ct - z1 * stt, d = y * stt + z1 * ct; return [cx + x1, cy + y1, d]; };
      for (let i = 0; i < seg; i++) {
        const a0 = i / seg * Math.PI * 2, a1 = (i + 1) / seg * Math.PI * 2, q = [P(a0, -w), P(a1, -w), P(a1, w), P(a0, w)], front = q[0][2] < 0;
        const land = (i * 7 % 11) < 4 ? .12 : 0;
        c.fillStyle = front ? `rgba(110,195,255,${((.22 + land) * fl).toFixed(3)})` : `rgba(70,150,255,${((.1 + land * .5) * fl).toFixed(3)})`;
        c.beginPath(); q.forEach(([x, y], k) => (k ? c.lineTo(x, y) : c.moveTo(x, y))); c.fill();
      }
      c.strokeStyle = `rgba(175,228,255,${(.8 * fl).toFixed(3)})`; c.lineWidth = 1;
      for (const z of [-w, w]) { c.beginPath(); for (let i = 0; i <= seg; i++) { const [x, y] = P(i / seg * Math.PI * 2, z); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); }
      const tilt = .5;
      if (on) { c.fillStyle = 'rgba(200,240,255,.5)'; c.beginPath(); c.arc(cx, cy, 4 + Math.sin(t * 6) * 1.5, 0, 7); c.fill(); }
      if (pulse > 0) { c.strokeStyle = `rgba(220,245,255,${pulse})`; c.lineWidth = 2; c.beginPath(); c.ellipse(cx, cy, (1 - pulse) * 140, (1 - pulse) * 140 * tilt, 0, 0, 7); c.stroke(); }
      c.globalCompositeOperation = 'source-over'; c.fillStyle = 'rgba(0,0,0,.22)';
      for (let y = 0; y < H; y += 3) c.fillRect(0, y, W, 1);
    };
    const tick = (now) => {
      raf = 0; const dt = Math.min(.1, (now - last) / 1000); if (dt < 1 / 30) { raf = requestAnimationFrame(tick); return; } last = now;
      t += dt; if (hov) yaw += dt * .5; pulse = Math.max(0, pulse - dt * .9); draw();
      if (hov || pulse > 0) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) { last = performance.now() - 40; raf = requestAnimationFrame(tick); } };
    b.addEventListener('pointerenter', () => { hov = true; kick(); });
    b.addEventListener('pointerleave', () => { hov = false; });
    b.addEventListener('focus', () => { hov = true; kick(); }); b.addEventListener('blur', () => { hov = false; });
    b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(on)); if (on) pulse = 1; kick(); });
    draw();
    return () => { cancelAnimationFrame(raf); raf = 0; hov = false; };
  },
};
