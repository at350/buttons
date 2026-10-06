// Blade Runner (1982) — Deckard's Esper machine: grid + crosshair over a photograph, "Enhance 224 to 176", "Pull back".
export default {
  id: 'sf-esper-enhance',
  credit: 'Blade Runner (1982) — the Esper photo analyser: click the print to place the crosshair, ENHANCE steps the zoom in on it with the grid and coordinates ticking, PULL BACK steps out',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 300px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 12px; background: linear-gradient(#2b2420, #15110f); }
    .crt { position: relative; border-radius: 14px / 18px; overflow: hidden; background: #050b0d; box-shadow: inset 0 0 0 3px #0a0a0a, 0 0 0 2px #3a302a; cursor: crosshair; }
    canvas { display: block; width: 276px; height: 160px; max-width: 100%; }
    .crt::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, rgba(0,0,0,.28) 0 1px, transparent 1px 3px); box-shadow: inset 0 0 30px rgba(0,0,0,.9); }
    .bar { display: flex; gap: 8px; margin-top: 10px; align-items: center; font: 600 10px/1 'JetBrains Mono', ui-monospace, monospace; }
    .rd { flex: 1; color: #ff9f3a; letter-spacing: .1em; text-shadow: 0 0 6px rgba(255,140,40,.6); white-space: nowrap; }
    .b { font: inherit; letter-spacing: .12em; color: #d9cfc4; padding: 8px 10px; border-radius: 3px; border: 0; cursor: pointer;
      background: linear-gradient(#4a3f37, #2d2520); box-shadow: inset 0 1px 0 #6a5c51, 0 2px 0 #0a0807; }
    .b:hover { color: #fff; background: linear-gradient(#57493f, #352b25); }
    .b:active { transform: translateY(1px); box-shadow: inset 0 1px 0 #6a5c51; }
    .b:focus-visible, .crt:focus-visible { outline: 2px solid #ff9f3a; outline-offset: 2px; }
    .b.go { color: #1a0f05; background: linear-gradient(#ffb25a, #e37d1a); box-shadow: inset 0 1px 0 #ffd6a3, 0 2px 0 #4a2200; }
  `,
  html: `<div class="stage"><div class="crt" tabindex="-1"><canvas width="552" height="320"></canvas></div>
    <div class="bar"><span class="rd">ZM 1.0  000-000</span><button class="b go" type="button">ENHANCE</button><button class="b back" type="button">PULL BACK</button></div></div>`,
  init(root) {
    const cv = root.querySelector('canvas'), c = cv.getContext('2d'), rd = root.querySelector('.rd'), crt = root.querySelector('.crt');
    const W = 276, H = 160, P = document.createElement('canvas'); P.width = 828; P.height = 480;
    const p = P.getContext('2d'); p.scale(3, 3);
    const g = (x0, y0, x1, y1, a, b) => { const r = p.createLinearGradient(x0, y0, x1, y1); r.addColorStop(0, a); r.addColorStop(1, b); return r; };
    p.fillStyle = g(0, 0, 0, H, '#5f7d86', '#1c2a2e'); p.fillRect(0, 0, W, H);
    p.fillStyle = g(0, 110, 0, H, '#2c3b3f', '#0e1517'); p.fillRect(0, 108, W, 52);
    p.fillStyle = '#121c1f'; p.fillRect(28, 20, 54, 90); p.fillStyle = g(30, 22, 80, 108, '#9cb8bf', '#3d5359'); p.fillRect(31, 23, 48, 85);
    p.fillStyle = '#0f1719'; p.fillRect(150, 70, 110, 44); p.fillStyle = g(0, 70, 0, 100, '#b9cdd2', '#4f656b'); p.fillRect(154, 66, 102, 16);
    const rg = p.createRadialGradient(118, 46, 2, 122, 50, 26); rg.addColorStop(0, '#e8f6f9'); rg.addColorStop(.5, '#6f8d95'); rg.addColorStop(1, '#0c1214');
    p.fillStyle = '#0a0f10'; p.beginPath(); p.arc(122, 50, 28, 0, 7); p.fill(); p.fillStyle = rg; p.beginPath(); p.arc(122, 50, 25, 0, 7); p.fill();
    p.fillStyle = '#1b2427'; p.beginPath(); p.ellipse(126, 54, 5, 9, 0.2, 0, 7); p.fill(); p.fillRect(122, 60, 9, 10);
    p.fillStyle = 'rgba(255,255,255,.55)'; p.fillRect(200, 30, 3, 26); p.fillRect(213, 26, 2, 30);
    const im = p.getImageData(0, 0, 828, 480);
    for (let i = 0; i < im.data.length; i += 4) { const n = (Math.random() - .5) * 26; im.data[i] += n; im.data[i + 1] += n; im.data[i + 2] += n; }
    p.putImageData(im, 0, 0);
    let z = 1, zt = 1, cx = W / 2, cy = H / 2, tx = 126, ty = 54, raf = 0;
    const draw = () => {
      c.setTransform(2, 0, 0, 2, 0, 0);
      const sw = W / z, sh = H / z, sx = Math.max(0, Math.min(W - sw, cx - sw / 2)), sy = Math.max(0, Math.min(H - sh, cy - sh / 2));
      c.drawImage(P, sx * 3, sy * 3, sw * 3, sh * 3, 0, 0, W, H);
      c.strokeStyle = 'rgba(220,240,245,.35)'; c.lineWidth = .5; c.beginPath();
      const step = 34 * (z / Math.pow(2, Math.floor(Math.log2(z))));
      for (let x = ((-sx * z) % step + step) % step; x < W; x += step) { c.moveTo(x, 0); c.lineTo(x, H); }
      for (let y = ((-sy * z) % step + step) % step; y < H; y += step) { c.moveTo(0, y); c.lineTo(W, y); }
      c.stroke();
      const px = (tx - sx) * z, py = (ty - sy) * z;
      c.strokeStyle = '#f2fbff'; c.lineWidth = 1; c.beginPath(); c.moveTo(px, 0); c.lineTo(px, H); c.moveTo(0, py); c.lineTo(W, py); c.stroke();
      c.strokeRect(px - 12, py - 9, 24, 18);
      rd.textContent = `ZM ${z.toFixed(1)}  ${String(Math.round(tx * 2)).padStart(3, '0')}-${String(Math.round(ty * 2)).padStart(3, '0')}`;
    };
    const tick = () => {
      raf = 0; const k = .18;
      z += (zt - z) * k; if (zt > 1) { cx += (tx - cx) * k; cy += (ty - cy) * k; } else { cx += (W / 2 - cx) * k; cy += (H / 2 - cy) * k; }
      if (Math.abs(zt - z) < .01) z = zt;
      draw();
      if (z !== zt || Math.abs(cx - (zt > 1 ? tx : W / 2)) > .3) raf = requestAnimationFrame(tick);
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(tick); };
    crt.addEventListener('click', (e) => {
      const r = cv.getBoundingClientRect(); const sw = W / z, sh = H / z;
      const sx = Math.max(0, Math.min(W - sw, cx - sw / 2)), sy = Math.max(0, Math.min(H - sh, cy - sh / 2));
      tx = sx + ((e.clientX - r.left) / r.width) * W / z; ty = sy + ((e.clientY - r.top) / r.height) * H / z; draw();
    });
    root.querySelector('.go').addEventListener('click', () => { zt = Math.min(8, zt * 2); go(); });
    root.querySelector('.back').addEventListener('click', () => { zt = Math.max(1, zt / 2); go(); });
    draw();
    return () => cancelAnimationFrame(raf);
  },
};
