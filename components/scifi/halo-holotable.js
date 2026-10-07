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
    const W = 280, H = 190; c.scale(2, 2);
    let yaw = .6, raf = 0, hov = false, pulse = 0, last = 0, t = 0;
    // Installation 04: a ring world seen from above its plane, so the far arc shows the habitable inner surface
    // (land and sea strips between the two retaining walls) and the near arc shows the ribbed outer hull
    const N = (a, s) => { const v = Math.sin(a * 12.9898 + s * 78.233) * 43758.5453; return v - Math.floor(v); };
    const land = (a, s) => { const u = a * 14; const i = Math.floor(u), f = u - i, k = f * f * (3 - 2 * f); return N(i, s) * (1 - k) + N(i + 1, s) * k; };
    const draw = () => {
      c.globalCompositeOperation = 'source-over'; c.clearRect(0, 0, W, H);
      const cx = W / 2, cy = 82, on = b.getAttribute('aria-pressed') === 'true', TY = 168;
      // the holotable: round console top with emitter rings
      c.fillStyle = '#081019'; c.beginPath(); c.ellipse(cx, TY + 4, 112, 18, 0, 0, 7); c.fill();
      c.fillStyle = '#0d1824'; c.beginPath(); c.ellipse(cx, TY, 112, 16, 0, 0, 7); c.fill();
      c.strokeStyle = '#2b5a7d'; c.lineWidth = 1; c.stroke();
      for (const [rx, al] of [[92, .35], [70, .25], [46, .4]]) { c.strokeStyle = `rgba(110,190,255,${al})`; c.beginPath(); c.ellipse(cx, TY, rx, rx * .14, 0, 0, 7); c.stroke(); }
      const em = c.createRadialGradient(cx, TY, 0, cx, TY, 26); em.addColorStop(0, 'rgba(200,240,255,.9)'); em.addColorStop(1, 'rgba(80,170,255,0)');
      c.fillStyle = em; c.beginPath(); c.ellipse(cx, TY, 26, 5, 0, 0, 7); c.fill();
      const cone = c.createLinearGradient(0, 40, 0, TY); cone.addColorStop(0, 'rgba(80,170,255,0)'); cone.addColorStop(1, 'rgba(80,170,255,.2)');
      c.fillStyle = cone; c.beginPath(); c.moveTo(cx - 22, TY); c.lineTo(cx - 104, 64); c.lineTo(cx + 104, 64); c.lineTo(cx + 22, TY); c.fill();
      c.globalCompositeOperation = 'lighter';
      const R = 96, w = 5, T = 1.2, ro = -.2, cr = Math.cos(ro), sr = Math.sin(ro), fl = (on ? 1.15 : .88) + .12 * Math.sin(t * 37) * Math.sin(t * 13), seg = 128, ct = Math.cos(T), stt = Math.sin(T);
      const P = (a, z) => { const x = R * Math.cos(a + yaw), y = R * Math.sin(a + yaw), y1 = y * ct - z * stt, z1 = y * stt + z * ct, f = 420 / (420 - z1), X = x * f, Y = y1 * f; return [cx + X * cr - Y * sr, cy + X * sr + Y * cr]; };
      const quad = (q) => { c.beginPath(); q.forEach(([x, y], k) => (k ? c.lineTo(x, y) : c.moveTo(x, y))); c.closePath(); c.fill(); };
      for (let i = 0; i < seg; i++) {
        const a0 = i / seg * Math.PI * 2, a1 = (i + 1) / seg * Math.PI * 2, am = (a0 + a1) / 2, inner = Math.sin(am + yaw) < 0;
        if (inner) {
          // inner surface: four strips of terrain, land brighter than sea, mountains brightest
          for (let s = 0; s < 3; s++) {
            const z0 = -w * .82 + s * w * .82 * 2 / 3, z1 = z0 + w * .82 * 2 / 3, h = land(am, s + 1), al = h > .62 ? .5 : h > .42 ? .3 : .09;
            c.fillStyle = `rgba(${h > .62 ? '170,225,255' : '90,180,255'},${(al * fl).toFixed(3)})`; quad([P(a0, z0), P(a1, z0), P(a1, z1), P(a0, z1)]);
          }
        } else {
          c.fillStyle = `rgba(70,150,255,${((i % 8 === 0 ? .3 : .11) * fl).toFixed(3)})`; quad([P(a0, -w), P(a1, -w), P(a1, w), P(a0, w)]);
        }
      }
      // retaining walls on both rims (white-hot while the ring is firing)
      c.lineWidth = on ? 1.8 : 1.2; if (on) { c.shadowColor = '#cdeeff'; c.shadowBlur = 10; }
      for (const z of [-w, w]) { c.strokeStyle = `rgba(190,235,255,${(.85 * fl).toFixed(3)})`; c.beginPath(); for (let i = 0; i <= seg; i++) { const [x, y] = P(i / seg * Math.PI * 2, z); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); }
      c.lineWidth = .6; c.strokeStyle = `rgba(150,215,255,${(.35 * fl).toFixed(3)})`;
      c.shadowBlur = 0;
      for (const z of [-w * .82, w * .82]) { c.beginPath(); for (let i = 0; i <= seg; i++) { const [x, y] = P(i / seg * Math.PI * 2, z); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); }
      if (pulse > 0) { c.strokeStyle = `rgba(220,245,255,${pulse})`; c.lineWidth = 2; c.beginPath(); c.ellipse(cx, cy, 20 + (1 - pulse) * 150, (20 + (1 - pulse) * 150) * ct, ro, 0, 7); c.stroke(); }
      c.globalCompositeOperation = 'source-over'; c.fillStyle = 'rgba(0,0,0,.22)';
      for (let y = 0; y < H; y += 3) c.fillRect(0, y, W, 1);
    };
    const tick = (now) => {
      raf = 0; const dt = Math.min(.1, (now - last) / 1000); if (dt < 1 / 30) { raf = requestAnimationFrame(tick); return; } last = now;
      t += dt; if (hov) yaw += dt * .35; pulse = Math.max(0, pulse - dt * .6); draw();
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
