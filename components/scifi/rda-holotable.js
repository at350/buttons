// Avatar (2009) — the RDA Ops Center holotable (Prime Focus / Weta): a cyan wireframe of Pandora's terrain with the floating Hallelujah Mountains.
const N = 16;
const hgt = (x, y) => 9 * Math.sin(x * .55) * Math.cos(y * .42) + 6 * Math.sin((x + y) * .9) * .5 + 4 * Math.cos(x * 1.3 - y * .7) * .5;
export default {
  id: 'sf-rda-holotable',
  credit: 'Avatar (2009) — RDA Ops Center holotable: cyan wireframe Pandora terrain with the floating Hallelujah Mountains; drag to orbit, toggle FLORA and TARGET overlays (Hometree lock)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 300px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 10px; background: radial-gradient(ellipse at 50% 60%, #0a2333, #01070c 70%); font-family: 'Space Grotesk', system-ui, sans-serif; }
    .pit { position: relative; cursor: grab; touch-action: none; outline: none; border-radius: 6px; }
    .pit:active { cursor: grabbing; }
    .pit:focus-visible { box-shadow: 0 0 0 1px #3de0ff; }
    canvas { display: block; width: 280px; height: 160px; max-width: 100%; }
    .row { display: flex; gap: 6px; margin-top: 8px; }
    .tg { flex: 1; height: 24px; border: 1px solid rgba(61,224,255,.45); background: rgba(61,224,255,.06); color: #8feaff; cursor: pointer; font: 600 9px 'Space Grotesk', sans-serif; letter-spacing: .2em; border-radius: 2px; transition: background .15s; }
    .tg:hover { background: rgba(61,224,255,.18); }
    .tg[aria-pressed="true"] { background: #3de0ff; color: #02121a; }
    .tg.t[aria-pressed="true"] { background: #ffb23d; border-color: #ffb23d; }
    .tg:focus-visible { outline: 1px solid #fff; outline-offset: 2px; }
  `,
  html: `<div class="stage"><div class="pit" tabindex="0" role="img" aria-label="Pandora terrain"><canvas width="560" height="320"></canvas></div>
    <div class="row"><button class="tg f" type="button" aria-pressed="false">FLORA</button><button class="tg t" type="button" aria-pressed="true">TARGET</button></div></div>`,
  init(root) {
    const pit = root.querySelector('.pit'), cv = root.querySelector('canvas'), c = cv.getContext('2d'), fb = root.querySelector('.f'), tb = root.querySelector('.t');
    const W = 280, H = 160; c.scale(2, 2);
    let yaw = .7, raf = 0, hov = false, drag = false, lx = 0, last = 0, t = 0;
    const MT = [[4, 5, 26, 7], [11, 4, 34, 9], [8, 11, 22, 6]];
    const pr = (x, y, z) => { const u = x - N / 2, v = y - N / 2, ca = Math.cos(yaw), sa = Math.sin(yaw), rx = u * ca - v * sa, ry = u * sa + v * ca; return [W / 2 + rx * 9.5, 112 + ry * 3.6 - z * 1.6]; };
    const nz = (i, s) => { const v = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453; return v - Math.floor(v); };
    const draw = () => {
      c.globalCompositeOperation = 'source-over'; c.clearRect(0, 0, W, H);
      // table glow under the projection
      const tg = c.createRadialGradient(W / 2, 118, 10, W / 2, 118, 130); tg.addColorStop(0, 'rgba(61,224,255,.16)'); tg.addColorStop(1, 'rgba(61,224,255,0)');
      c.fillStyle = tg; c.fillRect(0, 0, W, H);
      c.globalCompositeOperation = 'lighter';
      // terrain: height-shaded facets with the wire mesh over them
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const q = [[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]], hh = q.reduce((s, [u, v]) => s + hgt(u, v), 0) / 4;
        c.fillStyle = `rgba(${hh > 6 ? '120,240,255' : '40,170,230'},${(.07 + Math.max(0, hh + 10) / 24 * .16).toFixed(3)})`;
        c.beginPath(); q.forEach(([u, v], k) => { const [sx, sy] = pr(u, v, hgt(u, v)); k ? c.lineTo(sx, sy) : c.moveTo(sx, sy); }); c.closePath(); c.fill();
      }
      c.lineWidth = .6; c.strokeStyle = 'rgba(61,224,255,.5)';
      for (let y = 0; y <= N; y++) { c.beginPath(); for (let x = 0; x <= N; x++) { const [sx, sy] = pr(x, y, hgt(x, y)); x ? c.lineTo(sx, sy) : c.moveTo(sx, sy); } c.stroke(); }
      for (let x = 0; x <= N; x++) { c.beginPath(); for (let y = 0; y <= N; y++) { const [sx, sy] = pr(x, y, hgt(x, y)); y ? c.lineTo(sx, sy) : c.moveTo(sx, sy); } c.stroke(); }
      // the Hallelujah Mountains: floating rock islands, flat-topped and tapering to a point, trailing vines
      for (const [mx, my, z, r] of MT) {
        const bob = Math.sin(t * 1.3 + mx) * 1.5, rr = r * .3, n = 16, rim = [];
        for (let a = 0; a < n; a++) { const an = a / n * Math.PI * 2, k = rr * (.8 + nz(a + mx, 1) * .4); rim.push(pr(mx + Math.cos(an) * k, my + Math.sin(an) * k, z + bob + nz(a, mx) * 1.5)); }
        const tip = pr(mx + .4, my - .2, z + bob - r * 1.5);
        for (let a = 0; a < n; a++) { const p0 = rim[a], p1 = rim[(a + 1) % n]; c.fillStyle = `rgba(80,200,240,${(.05 + nz(a, mx + 3) * .1).toFixed(3)})`; c.beginPath(); c.moveTo(p0[0], p0[1]); c.lineTo(p1[0], p1[1]); c.lineTo(tip[0], tip[1]); c.closePath(); c.fill(); }
        c.fillStyle = 'rgba(140,240,255,.22)'; c.beginPath(); rim.forEach(([sx, sy], k) => (k ? c.lineTo(sx, sy) : c.moveTo(sx, sy))); c.closePath(); c.fill();
        c.strokeStyle = 'rgba(170,245,255,.85)'; c.lineWidth = .8; c.stroke();
        c.strokeStyle = 'rgba(120,230,255,.45)'; c.lineWidth = .5; c.beginPath();
        for (let a = 0; a < n; a += 3) { c.moveTo(rim[a][0], rim[a][1]); c.lineTo(tip[0], tip[1]); }
        for (let a = 1; a < n; a += 4) { const [sx, sy] = rim[a]; c.moveTo(sx, sy); c.lineTo(sx + Math.sin(t + a) * .6, sy + 6 + nz(a, mx) * 8); }
        c.stroke();
      }
      if (fb.getAttribute('aria-pressed') === 'true') { c.fillStyle = 'rgba(120,255,160,.85)'; for (let i = 0; i < 46; i++) { const x = (i * 37) % N, y = (i * 53 + 7) % N; const [sx, sy] = pr(x + .3, y + .6, hgt(x, y)); c.fillRect(sx - 1, sy - 1, 2, 2); } }
      if (tb.getAttribute('aria-pressed') === 'true') {
        // Hometree: trunk and crown in the target colour, bracketed, with the lock pulse
        const g0 = hgt(10, 10), [hx, hy] = pr(10, 10, g0), [, top] = pr(10, 10, g0 + 16), pu = (t * .8) % 1;
        c.strokeStyle = '#ffb23d'; c.fillStyle = 'rgba(255,178,61,.35)'; c.lineWidth = 1;
        c.beginPath(); c.moveTo(hx - 2, hy); c.lineTo(hx - 1, top + 6); c.lineTo(hx + 1, top + 6); c.lineTo(hx + 2, hy); c.closePath(); c.fill(); c.stroke();
        c.beginPath(); c.ellipse(hx, top + 6, 12, 4, 0, 0, 7); c.fill(); c.stroke(); c.beginPath(); c.ellipse(hx, top + 1, 8, 3, 0, 0, 7); c.fill(); c.stroke();
        c.beginPath(); c.moveTo(hx - 14, top - 6); c.lineTo(hx - 14, top - 10); c.lineTo(hx - 10, top - 10); c.moveTo(hx + 14, top - 6); c.lineTo(hx + 14, top - 10); c.lineTo(hx + 10, top - 10); c.moveTo(hx - 14, hy + 2); c.lineTo(hx - 14, hy + 6); c.lineTo(hx - 10, hy + 6); c.moveTo(hx + 14, hy + 2); c.lineTo(hx + 14, hy + 6); c.lineTo(hx + 10, hy + 6); c.stroke();
        c.strokeStyle = `rgba(255,178,61,${(1 - pu).toFixed(2)})`; c.beginPath(); c.ellipse(hx, hy, 4 + pu * 16, (4 + pu * 16) * .38, 0, 0, 7); c.stroke();
      }
      c.globalCompositeOperation = 'source-over';
    };
    const tick = (now) => {
      raf = 0; const dt = Math.min(.1, (now - last) / 1000); if (dt < 1 / 30) { raf = requestAnimationFrame(tick); return; } last = now;
      t += dt; if (hov && !drag) yaw += dt * .25; draw(); if (hov || drag) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) { last = performance.now() - 40; raf = requestAnimationFrame(tick); } };
    pit.addEventListener('pointerenter', () => { hov = true; kick(); }); pit.addEventListener('pointerleave', () => { hov = false; });
    pit.addEventListener('pointerdown', (e) => { drag = true; lx = e.clientX; pit.setPointerCapture && pit.setPointerCapture(e.pointerId); kick(); });
    pit.addEventListener('pointermove', (e) => { if (drag) { yaw += (e.clientX - lx) * .012; lx = e.clientX; } });
    pit.addEventListener('pointerup', () => { drag = false; }); pit.addEventListener('pointercancel', () => { drag = false; });
    pit.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); yaw += e.key === 'ArrowLeft' ? -.15 : .15; draw(); } });
    [fb, tb].forEach((b) => b.addEventListener('click', () => { b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')); draw(); }));
    draw();
    return () => { cancelAnimationFrame(raf); raf = 0; hov = drag = false; };
  },
};
