// Canvas 2D ASCII "shader": every frame a brightness field (two drifting blobs + a pointer blob + a press
// ripple) and the label's coverage — rasterised at full size and averaged per cell — are mapped through the
// ramp ' .:-=+*#%@' into a 70×17 grid of JetBrains Mono cells. Click toggles the inverted (paper) mode.
const W = 280, H = 119, CW = 4, CH = 7, COLS = 70, ROWS = 17;
const RAMP = ' .:-=+*#%@';

export default {
  id: 'sh-ascii-field',
  credit: 'ASCII shader button — a 70×17 character grid re-rendered from a brightness field (drifting blobs, pointer blob, press ripple) with the label drawn in the densest glyphs; click inverts to paper',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: block; width: 280px; height: 119px; max-width: 100%; padding: 0; border: 0; border-radius: 10px; overflow: hidden; background: #0b0f0c; cursor: pointer; isolation: isolate; box-shadow: inset 0 0 0 1px rgba(155,229,138,.18), 0 1px 2px rgba(0,0,0,.25); transition: background .2s, box-shadow .2s; }
    .btn[aria-pressed="true"] { background: #ecebe4; box-shadow: inset 0 0 0 1px rgba(0,0,0,.18), 0 1px 2px rgba(0,0,0,.15); }
    .btn:active { transform: scale(.99); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .btn:focus-visible { outline: 2px solid #6fdc5c; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="Enter"><canvas class="cv"></canvas></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    ctx.scale(dpr, dpr);
    // label coverage per cell
    const cover = new Float32Array(COLS * ROWS);
    {
      const off = document.createElement('canvas'); off.width = W; off.height = H;
      const oc = off.getContext('2d', { willReadFrequently: true });
      if (oc) {
        oc.fillStyle = '#fff'; oc.textAlign = 'center'; oc.textBaseline = 'middle';
        oc.font = '800 62px Inter, system-ui, sans-serif'; try { oc.letterSpacing = '5px'; } catch (e) {} oc.fillText('ENTER', W / 2 + 2, H / 2 + 5);
        const a = oc.getImageData(0, 0, W, H).data;
        for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
          let s = 0;
          for (let y = 0; y < CH; y++) for (let x = 0; x < CW; x++) s += a[((r * CH + y) * W + c * CW + x) * 4 + 3];
          cover[r * COLS + c] = s / (CW * CH * 255);
        }
      }
    }
    let raf = 0, t = 0, last = 0, hover = 0, hoverT = 0, press = 0, inv = false, mx = .5, my = .5, px = .5, py = .5, vis = false, lastDraw = 0, dead = false;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.font = `600 ${CH}px "JetBrains Mono", ui-monospace, monospace`; ctx.textBaseline = 'top';
      const ax = W / H;
      const b1x = .5 + .38 * Math.sin(t * .5), b1y = .5 + .32 * Math.cos(t * .37), b2x = .5 + .34 * Math.cos(t * .29 + 2), b2y = .5 + .36 * Math.sin(t * .61 + 1);
      const rr = (1 - press) * 1.3;
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
        const x = (c + .5) / COLS, y = (r + .5) / ROWS;
        let v = .5 * Math.exp(-(((x - b1x) * ax) ** 2 + (y - b1y) ** 2) * 3.2) + .4 * Math.exp(-(((x - b2x) * ax) ** 2 + (y - b2y) ** 2) * 4.5);
        v += .06 * Math.sin(c * .5 + t * 1.3) * Math.sin(r * .7 - t);
        v += hover * .45 * Math.exp(-(((x - mx) * ax) ** 2 + (y - my) ** 2) * 9);
        if (press > 0) v += press * .55 * Math.exp(-((Math.hypot((x - px) * ax, y - py) - rr) ** 2) * 60);
        v = Math.min(.62, Math.max(0, v));
        const lab = cover[r * COLS + c];
        const isLab = lab > .28;
        if (isLab) v = .72 + .28 * Math.min(1, lab * 1.2);
        const ch = RAMP[Math.max(0, Math.min(RAMP.length - 1, Math.floor(v * RAMP.length)))];
        if (ch === ' ') continue;
        if (inv) ctx.fillStyle = isLab ? '#141412' : `rgba(20,20,18,${(.25 + v * .9).toFixed(3)})`;
        else ctx.fillStyle = isLab ? '#c8ffb8' : `rgba(111,220,92,${(.22 + v * 1.1).toFixed(3)})`;
        ctx.fillText(ch, c * CW + .1, r * CH);
      }
    };
    const tick = (now) => {
      raf = 0; if (dead) return;
      const dt = Math.min(.1, (now - last) / 1000 || .016); last = now;
      if (!hoverT && press <= 0 && now - lastDraw < 1000 / 20) { raf = requestAnimationFrame(tick); return; }
      lastDraw = now; t += dt;
      hover += (hoverT - hover) * Math.min(1, dt * 8); press = Math.max(0, press - dt * 1.4);
      draw();
      if (hoverT || hover > .01 || press > 0 || vis) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf && !dead) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const pos = (e) => { const r = cv.getBoundingClientRect(); if (r.width) { mx = (e.clientX - r.left) / r.width; my = (e.clientY - r.top) / r.height; } };
    btn.addEventListener('pointerenter', (e) => { pos(e); hoverT = 1; kick(); });
    btn.addEventListener('pointermove', pos);
    btn.addEventListener('pointerleave', () => { hoverT = 0; kick(); });
    btn.addEventListener('pointerdown', (e) => { pos(e); px = mx; py = my; press = 1; kick(); });
    btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { px = .5; py = .5; press = 1; kick(); } });
    btn.addEventListener('focus', () => { if (btn.matches(':focus-visible')) { hoverT = 1; kick(); } });
    btn.addEventListener('blur', () => { if (!btn.matches(':hover')) { hoverT = 0; kick(); } });
    btn.addEventListener('click', () => { inv = !inv; btn.setAttribute('aria-pressed', String(inv)); draw(); kick(); });
    let io = null;
    if (typeof IntersectionObserver === 'function') { io = new IntersectionObserver((en) => { vis = en.some((x) => x.isIntersecting); if (vis) kick(); }); io.observe(cv); }
    draw();
    // fonts may arrive after init: redraw once they are ready
    if (globalThis.document && document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (!dead) draw(); });
    return () => { dead = true; cancelAnimationFrame(raf); io && io.disconnect(); };
  },
};
