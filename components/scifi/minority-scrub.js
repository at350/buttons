// Minority Report (2002) — Anderton's gestural precog-vision scrubber (John Underkoffler / g-speak): drag across the glass to scrub, fling to coast.
export default {
  id: 'sf-minority-scrub',
  credit: 'Minority Report (2002) — the precrime gestural interface (John Underkoffler, later Oblong g-speak): drag across the glass to scrub the three precogs\' visions together (main feed plus the two side feeds), fling and it coasts; the red ball marks a crime of passion',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 300px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 12px; background: radial-gradient(120% 100% at 50% 0%, #0c1c2b, #02060a 70%); }
    .glass { position: relative; border-radius: 4px; outline: none; cursor: grab; touch-action: none;
      border: 1px solid rgba(190,230,255,.55); box-shadow: 0 0 14px rgba(120,190,255,.35), inset 0 0 20px rgba(120,190,255,.15); background: rgba(80,150,220,.06); }
    .glass.drag { cursor: grabbing; }
    .glass:focus-visible { border-color: #fff; }
    canvas { display: block; width: 276px; height: 152px; max-width: 100%; }
    .tip { position: absolute; width: 10px; height: 10px; margin: -5px; border-radius: 50%; background: #eaf7ff; box-shadow: 0 0 8px 3px rgba(150,210,255,.8); opacity: 0; transition: opacity .2s; pointer-events: none; }
    .drag .tip { opacity: 1; }
  `,
  html: `<div class="stage"><div class="glass" role="slider" tabindex="0" aria-label="Precog vision" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20"><canvas width="552" height="304"></canvas><i class="tip"></i></div></div>`,
  init(root) {
    const g = root.querySelector('.glass'), cv = root.querySelector('canvas'), c = cv.getContext('2d'), tip = root.querySelector('.tip');
    const W = 276, H = 152, VH = 112; c.scale(2, 2);
    let t = 0.2, v = 0, raf = 0, drag = false, lx = 0, lt = 0;
    // the precog vision: anonymous scene fragments (a street house with a bicycle, a fogged avenue, an empty
    // boardwalk) pre-toned once to the film's washed, cold milky look; the main pane is Agatha's feed and the
    // two side panes are the twins' feeds, all scrubbed together
    const SHOTS = ['assets/square/68.webp', 'assets/square/63.webp', 'assets/wide/04.webp'];
    const tone = SHOTS.map(() => null);
    SHOTS.forEach((src, k) => {
      const im = new Image();
      im.onload = () => {
        const o = document.createElement('canvas'); o.width = im.naturalWidth; o.height = im.naturalHeight;
        const x = o.getContext('2d', { willReadFrequently: true }); x.drawImage(im, 0, 0);
        const px = x.getImageData(0, 0, o.width, o.height), d = px.data;
        for (let i = 0; i < d.length; i += 4) { const l = .3 * d[i] + .59 * d[i + 1] + .11 * d[i + 2], m = 40 + l * .78; d[i] = m * .86 + d[i] * .1; d[i + 1] = m * .95 + d[i + 1] * .06; d[i + 2] = m * 1.02 + 10; }
        x.putImageData(px, 0, 0); tone[k] = o; draw();
      };
      im.src = src;
    });
    const shot = (u, a, X, Y, w, h, off = 0) => {
      u = ((u + off) % 1 + 1) % 1;
      const k = Math.min(2, Math.floor(u * 3)), l = u * 3 - k, o = tone[k];
      if (!o) return;
      const z = 1.0 + l * .16, sw = o.width / z, sh = Math.min(o.height, sw * h / w);
      const sx = (o.width - sw) * (k % 2 ? 1 - l : l), sy = (o.height - sh) * .5 + Math.sin(l * 6) * 2;
      c.save(); c.beginPath(); c.rect(X, Y, w, h); c.clip();
      c.globalAlpha = a; c.drawImage(o, sx, sy, sw, sh, X, Y, w, h);
      // precog footage: a rippling double exposure and a milky edge falloff
      c.globalAlpha = a * .28; c.drawImage(o, sx + 6 + Math.sin(t * 40) * 3, sy, sw, sh, X, Y, w, h);
      c.globalAlpha = 1; const vg = c.createRadialGradient(X + w / 2, Y + h / 2, Math.min(w, h) * .3, X + w / 2, Y + h / 2, Math.max(w, h) * .62);
      vg.addColorStop(0, 'rgba(210,235,255,0)'); vg.addColorStop(1, 'rgba(190,225,250,.55)'); c.fillStyle = vg; c.fillRect(X, Y, w, h);
      c.restore();
      c.strokeStyle = 'rgba(235,248,255,.85)'; c.lineWidth = 1; c.strokeRect(X + .5, Y + .5, w - 1, h - 1);
    };
    const draw = () => {
      c.clearRect(0, 0, W, H);
      const bg = c.createLinearGradient(0, 0, W, H); bg.addColorStop(0, 'rgba(60,120,170,.18)'); bg.addColorStop(1, 'rgba(10,30,50,.1)');
      c.fillStyle = bg; c.fillRect(0, 0, W, H);
      shot(t, .95, 0, 0, 184, VH);
      shot(t, .8, 192, 0, 84, 52, .37); shot(t, .8, 192, 60, 84, 52, .71);
      c.font = '500 6.5px "Space Grotesk", system-ui, sans-serif'; c.fillStyle = 'rgba(10,30,45,.75)';
      [['AGATHA', 4, 9], ['ARTHUR', 196, 9], ['DASHIELL', 196, 69]].forEach(([s, x, y]) => { c.fillStyle = 'rgba(8,22,34,.6)'; c.fillRect(x - 2, y - 7, c.measureText(s).width + 4, 9); c.fillStyle = '#eaf7ff'; c.fillText(s, x, y); });
      // timeline: frame ruler, playhead, timecode, and the red ball
      const ty = VH + 6;
      c.strokeStyle = 'rgba(200,235,255,.55)'; c.beginPath();
      for (let i = -2; i < 34; i++) { const x = 22 + i * 8 - ((t * 800) % 8); if (x < 22 || x > 196) continue; const tall = (Math.floor(t * 100) + i) % 5 === 0; c.moveTo(x, ty + 2); c.lineTo(x, ty + (tall ? 14 : 9)); }
      c.stroke();
      c.strokeStyle = '#ffffff'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(109, ty); c.lineTo(109, H - 2); c.stroke(); c.lineWidth = 1;
      const rb = c.createRadialGradient(8, ty + 10, 1, 10, ty + 12, 9); rb.addColorStop(0, '#ff9b8a'); rb.addColorStop(.45, '#d6201a'); rb.addColorStop(1, '#5a0705');
      c.fillStyle = rb; c.beginPath(); c.arc(10, ty + 12, 8, 0, 7); c.fill();
      const f = Math.round(t * 3000), tc = `${String(Math.floor(f / 600)).padStart(2, '0')}:${String(Math.floor(f / 24) % 25).padStart(2, '0')}:${String(f % 24).padStart(2, '0')}`;
      c.fillStyle = '#e4f4ff'; c.font = '500 9px "JetBrains Mono", ui-monospace, monospace'; c.textAlign = 'right'; c.fillText(tc, W - 2, ty + 15); c.textAlign = 'left';
      g.setAttribute('aria-valuenow', String(Math.round(t * 100)));
    };
    const set = (n) => { t = Math.max(0, Math.min(1, n)); };
    const tick = () => {
      raf = 0; if (drag) return;
      set(t + v); v *= 0.92; draw();
      if (Math.abs(v) > 0.0004 && t > 0 && t < 1) raf = requestAnimationFrame(tick);
    };
    const pos = (e) => { const r = g.getBoundingClientRect(); tip.style.left = `${e.clientX - r.left}px`; tip.style.top = `${e.clientY - r.top}px`; };
    g.addEventListener('pointerdown', (e) => { drag = true; g.classList.add('drag'); lx = e.clientX; lt = performance.now(); v = 0; pos(e); g.setPointerCapture && g.setPointerCapture(e.pointerId); });
    g.addEventListener('pointermove', (e) => {
      if (!drag) return; pos(e);
      const now = performance.now(), dx = (e.clientX - lx) / 600; set(t + dx); v = dx / Math.max(1, (now - lt) / 16); lx = e.clientX; lt = now; draw();
    });
    const up = () => { if (!drag) return; drag = false; g.classList.remove('drag'); if (!raf) raf = requestAnimationFrame(tick); };
    g.addEventListener('pointerup', up); g.addEventListener('pointercancel', up);
    g.addEventListener('keydown', (e) => {
      const d = { ArrowRight: .02, ArrowLeft: -.02, Home: -1, End: 1 }[e.key];
      if (d !== undefined) { e.preventDefault(); set(t + d); draw(); }
    });
    draw();
    return () => cancelAnimationFrame(raf);
  },
};
