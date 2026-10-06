// Minority Report (2002) — Anderton's gestural precog-vision scrubber (John Underkoffler / g-speak): drag across the glass to scrub, fling to coast.
export default {
  id: 'sf-minority-scrub',
  credit: 'Minority Report (2002) — the precrime gestural interface (John Underkoffler, later Oblong g-speak): drag the precog vision (real footage stills) to scrub through it, let go mid-swipe and it coasts; the red ball rolls',
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
    const W = 276, H = 152, VH = 118; c.scale(2, 2);
    let t = 0.2, v = 0, raf = 0, drag = false, lx = 0, lt = 0;
    // the precog vision: three shots (photos from the asset pack), each pushed in and panned as the clip plays,
    // pre-toned once to the glass's cold cyan; the precrime ball rolls through them
    const SHOTS = ['assets/wide/24.webp', 'assets/wide/30.webp', 'assets/wide/02.webp'];
    const tone = SHOTS.map(() => null);
    SHOTS.forEach((src, k) => {
      const im = new Image();
      im.onload = () => {
        const o = document.createElement('canvas'); o.width = im.naturalWidth; o.height = im.naturalHeight;
        const x = o.getContext('2d', { willReadFrequently: true }); x.drawImage(im, 0, 0);
        const px = x.getImageData(0, 0, o.width, o.height), d = px.data;
        for (let i = 0; i < d.length; i += 4) { const l = .3 * d[i] + .59 * d[i + 1] + .11 * d[i + 2]; d[i] = l * .55 + 4; d[i + 1] = l * .8 + 14; d[i + 2] = l * .98 + 30; }
        x.putImageData(px, 0, 0); tone[k] = o; draw();
      };
      im.src = src;
    });
    const shot = (u, a) => {
      const k = Math.min(2, Math.floor(u * 3)), l = u * 3 - k, o = tone[k];
      if (!o) return;
      const z = 1.06 + l * .22, sw = o.width / z, sh = sw * VH / W;
      const sx = (o.width - sw) * (k % 2 ? 1 - l : l), sy = (o.height - sh) * .5;
      c.globalAlpha = a; c.drawImage(o, sx, sy, sw, sh, 0, 0, W, VH); c.globalAlpha = 1;
    };
    const ball = (u, a) => {
      const bx = 18 + ((u * 3) % 1) * 250, by = VH - 10 - Math.abs(Math.sin(u * 9.4)) * 30;
      c.globalAlpha = a; c.fillStyle = '#ff3b2f'; c.shadowColor = '#ff3b2f'; c.shadowBlur = 8; c.beginPath(); c.arc(bx, by, 6, 0, 7); c.fill(); c.shadowBlur = 0; c.globalAlpha = 1;
    };
    const draw = () => {
      const bg = c.createLinearGradient(0, 0, 0, VH); bg.addColorStop(0, '#16314a'); bg.addColorStop(1, '#06111c');
      c.fillStyle = bg; c.fillRect(0, 0, W, H);
      shot(t, 1); shot(Math.max(0, t - .012), .22);
      ball(Math.max(0, t - .06), .18); ball(Math.max(0, t - .03), .32); ball(t, 1);
      const vg = c.createRadialGradient(W / 2, VH / 2, 40, W / 2, VH / 2, 170); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,4,10,.85)');
      c.fillStyle = vg; c.fillRect(0, 0, W, VH);
      c.fillStyle = 'rgba(2,8,14,.9)'; c.fillRect(0, VH, W, H - VH);
      c.strokeStyle = 'rgba(190,230,255,.6)'; c.beginPath();
      for (let i = -2; i < 40; i++) { const x = i * 8 - ((t * 800) % 8); const tall = (Math.floor(t * 100) + i) % 5 === 0; c.moveTo(x, VH + 6); c.lineTo(x, VH + (tall ? 16 : 11)); }
      c.stroke();
      c.strokeStyle = '#ffffff'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(W / 2, VH + 2); c.lineTo(W / 2, H - 2); c.stroke(); c.lineWidth = 1;
      const f = Math.round(t * 3000), tc = `00:${String(Math.floor(f / 600)).padStart(2, '0')}:${String(Math.floor(f / 24) % 25).padStart(2, '0')}:${String(f % 24).padStart(2, '0')}`;
      c.fillStyle = '#d9f1ff'; c.font = '500 9px "JetBrains Mono", ui-monospace, monospace'; c.textAlign = 'right'; c.fillText(tc, W - 6, VH + 28);
      c.textAlign = 'left'; c.fillStyle = '#ff3b2f'; c.fillText('●', 6, VH + 28); c.fillStyle = '#9cc8e8'; c.fillText('PRECOG 2', 16, VH + 28);
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
