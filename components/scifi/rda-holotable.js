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
    const W = 280, H = 160, dpr = Math.min(2, devicePixelRatio || 1); cv.width = W * dpr; cv.height = H * dpr; c.scale(dpr, dpr);
    let yaw = .7, raf = 0, hov = false, drag = false, lx = 0, last = 0, t = 0;
    const MT = [[4, 5, 26, 7], [11, 4, 34, 9], [8, 11, 22, 6]];
    const pr = (x, y, z) => { const u = x - N / 2, v = y - N / 2, ca = Math.cos(yaw), sa = Math.sin(yaw), rx = u * ca - v * sa, ry = u * sa + v * ca; return [W / 2 + rx * 9.5, 112 + ry * 3.6 - z * 1.6]; };
    const draw = () => {
      c.clearRect(0, 0, W, H); c.lineWidth = .7; c.strokeStyle = 'rgba(61,224,255,.55)';
      for (let y = 0; y <= N; y++) { c.beginPath(); for (let x = 0; x <= N; x++) { const [sx, sy] = pr(x, y, hgt(x, y)); x ? c.lineTo(sx, sy) : c.moveTo(sx, sy); } c.stroke(); }
      for (let x = 0; x <= N; x++) { c.beginPath(); for (let y = 0; y <= N; y++) { const [sx, sy] = pr(x, y, hgt(x, y)); y ? c.lineTo(sx, sy) : c.moveTo(sx, sy); } c.stroke(); }
      c.strokeStyle = 'rgba(160,240,255,.85)';
      for (const [mx, my, z, r] of MT) {
        const bob = Math.sin(t * 1.3 + mx) * 1.5;
        for (let k = 0; k < 4; k++) { c.beginPath(); for (let a = 0; a <= 16; a++) { const an = a / 16 * Math.PI * 2, rr = r * (1 - k * .22) * .14; const [sx, sy] = pr(mx + Math.cos(an) * rr, my + Math.sin(an) * rr, z + bob - k * 3 + (k === 0 ? 2 : 0)); a ? c.lineTo(sx, sy) : c.moveTo(sx, sy); } c.stroke(); }
        const [ax, ay] = pr(mx, my, z + bob - 12); const [bx, by] = pr(mx, my, z + bob + 3); c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.stroke();
      }
      if (fb.getAttribute('aria-pressed') === 'true') { c.fillStyle = 'rgba(120,255,160,.85)'; for (let i = 0; i < 46; i++) { const x = (i * 37) % N, y = (i * 53 + 7) % N; const [sx, sy] = pr(x + .3, y + .6, hgt(x, y)); c.fillRect(sx - 1, sy - 1, 2, 2); } }
      if (tb.getAttribute('aria-pressed') === 'true') {
        const [hx, hy] = pr(10, 10, hgt(10, 10)); const pu = (t * .8) % 1;
        c.strokeStyle = '#ffb23d'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(hx, hy - 4); c.lineTo(hx - 4, hy - 12); c.lineTo(hx + 4, hy - 12); c.closePath(); c.stroke();
        c.strokeStyle = `rgba(255,178,61,${(1 - pu).toFixed(2)})`; c.beginPath(); c.ellipse(hx, hy, 4 + pu * 16, (4 + pu * 16) * .38, 0, 0, 7); c.stroke();
      }
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
