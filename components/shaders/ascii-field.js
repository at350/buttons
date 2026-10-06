// Canvas 2D: an ASCII "shader" - a brightness field (drifting blobs + baked label) mapped to a character ramp each frame.
const W = 280, H = 120, CW = 7, CH = 11, COLS = 40, ROWS = 11;
const RAMP = ' .:-=+*#%@';

export default {
  id: 'sh-ascii-field',
  credit: 'ASCII shader button — a 40×11 character grid re-rendered from a brightness field every frame (drifting blobs + the label); hover adds a pointer blob, press inverts the ramp',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: block; width: 280px; height: 120px; max-width: 100%; padding: 0; border: 1px solid #2a2a2a; border-radius: 8px; overflow: hidden; background: #0c0c0c; cursor: pointer; isolation: isolate; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .btn:focus-visible { outline: 2px solid #9be58a; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="ASCII"><canvas class="cv"></canvas></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    ctx.scale(dpr, dpr);
    const off = document.createElement('canvas'); off.width = COLS; off.height = ROWS;
    const oc = off.getContext('2d'); oc.fillStyle = '#fff'; oc.textAlign = 'center'; oc.textBaseline = 'middle';
    oc.font = '900 11px Inter, system-ui, sans-serif'; oc.fillText('ASCII', COLS / 2, ROWS / 2 + .5);
    const mask = oc.getImageData(0, 0, COLS, ROWS).data;
    let raf = 0, t = 0, last = 0, hover = 0, hoverT = 0, press = 0, inv = false, mx = .5, my = .5, vis = false, lastDraw = 0;
    const draw = () => {
      ctx.fillStyle = inv ? '#e8e8e0' : '#0c0c0c'; ctx.fillRect(0, 0, W, H);
      ctx.font = `600 ${CH}px "JetBrains Mono", ui-monospace, monospace`; ctx.textBaseline = 'top';
      const b1x = .5 + .35 * Math.sin(t * .7), b1y = .5 + .3 * Math.cos(t * .5), b2x = .5 + .3 * Math.cos(t * .4 + 2), b2y = .5 + .35 * Math.sin(t * .9 + 1);
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        const x = (c + .5) / COLS, y = (r + .5) / ROWS, ax = (W / H);
        let v = Math.exp(-(((x - b1x) * ax) ** 2 + (y - b1y) ** 2) * 6) * .8 + Math.exp(-(((x - b2x) * ax) ** 2 + (y - b2y) ** 2) * 8) * .6;
        v += hover * Math.exp(-(((x - mx) * ax) ** 2 + (y - my) ** 2) * 10) * 1.2;
        v = Math.max(v, mask[(r * COLS + c) * 4 + 3] / 255 * .95);
        v = Math.min(1, v + press * .3 * (1 - Math.hypot((x - mx) * ax, y - my)));
        if (inv) v = 1 - v;
        const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))];
        if (ch === ' ') continue;
        const g = Math.round(120 + v * 135);
        ctx.fillStyle = inv ? `rgb(${255 - g},${255 - g},${255 - g})` : `rgb(${Math.round(g * .6)},${g},${Math.round(g * .55)})`;
        ctx.fillText(ch, c * CW, r * CH - 1);
      }
    };
    const tick = (now) => {
      raf = 0;
      const dt = Math.min(.1, (now - last) / 1000 || .016); last = now;
      if (!hoverT && now - lastDraw < 1000 / 20) { raf = requestAnimationFrame(tick); return; }
      lastDraw = now; t += dt;
      hover += (hoverT - hover) * Math.min(1, dt * 8); press = Math.max(0, press - dt * 2);
      draw();
      if (hoverT || hover > .01 || press > 0 || vis) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const pos = (e) => { const r = cv.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width; my = (e.clientY - r.top) / r.height; };
    btn.addEventListener('pointerenter', (e) => { pos(e); hoverT = 1; kick(); });
    btn.addEventListener('pointermove', pos);
    btn.addEventListener('pointerleave', () => { hoverT = 0; kick(); });
    btn.addEventListener('pointerdown', (e) => { pos(e); press = 1; kick(); });
    btn.addEventListener('focus', () => { if (btn.matches(':focus-visible')) { hoverT = 1; kick(); } });
    btn.addEventListener('blur', () => { if (!btn.matches(':hover')) { hoverT = 0; kick(); } });
    btn.addEventListener('click', () => { inv = !inv; btn.setAttribute('aria-pressed', String(inv)); kick(); });
    let io = null;
    if (typeof IntersectionObserver === 'function') { io = new IntersectionObserver((en) => { vis = en.some((x) => x.isIntersecting); if (vis) kick(); }); io.observe(cv); }
    draw();
    return () => { cancelAnimationFrame(raf); io && io.disconnect(); };
  },
};
