// Canvas 2D pixel sorting (Kim Asendorf's ASDFPixelSort, "brightness" mode): a procedural sunset photo
// is generated once; every column is split into intervals of pixels brighter than a threshold and each
// interval is sorted by brightness — the characteristic streaks. At rest the threshold is high (only the
// sun and its reflection sort); hover lowers it so the streaks spread; press drops it and adds row glitches.
const W = 240, H = 80;

export default {
  id: 'sh-pixel-sort',
  credit: 'Pixel-sort glitch button — Kim Asendorf-style brightness-interval sorting of a procedural sunset on a 2D canvas: each column\'s bright runs are sorted into streaks; hover lowers the threshold, press glitches it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 240px; height: 80px; max-width: 100%; padding: 0; border: 0; border-radius: 8px; overflow: hidden; background: #2a1440; cursor: pointer; isolation: isolate; box-shadow: 0 1px 2px rgba(0,0,0,.25), 0 8px 20px -12px rgba(60,20,90,.8); }
    .btn:active { transform: translateY(1px); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .l { position: relative; z-index: 1; color: #fff; font: 700 24px/1 'Space Grotesk', system-ui, sans-serif; letter-spacing: .3em; margin-right: -.3em; text-transform: uppercase; pointer-events: none; text-shadow: 0 1px 0 rgba(40,10,60,.6), 0 0 14px rgba(40,10,60,.55); }
    .btn:focus-visible { outline: 2px solid #ff8a3d; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button"><canvas class="cv"></canvas><span class="l">Sort</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
    const w = Math.round(W * dpr), h = Math.round(H * dpr);
    cv.width = w; cv.height = h;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    // --- procedural source photo: sunset sky, sun, ridge, water with a broken reflection ---
    const src = new Float32Array(w * h * 3), lum = new Float32Array(w * h);
    const hz = Math.round(h * .62), sx = w * .64, sy = h * .5, sr = h * .2;
    const n1 = (x, y) => { const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453; return s - Math.floor(s); };
    const mix = (a, b, t) => a + (b - a) * t;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let r, g, b; const i = y * w + x;
      if (y < hz) {
        const t = y / hz;
        r = mix(.16, 1, Math.pow(t, 1.4)); g = mix(.1, .45, Math.pow(t, 2.2)); b = mix(.38, .3, t);
        const d = Math.hypot(x - sx, y - sy);
        const glow = Math.exp(-d / (h * .35)); r += glow * .5; g += glow * .32; b += glow * .12;
        if (d < sr) { r = 1; g = .9 - (y - (sy - sr)) / (2 * sr) * .3; b = .55; }
        const ridge = hz - h * (.06 + .05 * Math.sin(x / w * 9 + 1) + .03 * Math.sin(x / w * 23));
        if (y > ridge) { r = .1; g = .05; b = .16; }
      } else {
        const t = (y - hz) / (h - hz);
        r = mix(.6, .14, t); g = mix(.25, .06, t); b = mix(.32, .2, t);
        const ref = Math.exp(-Math.pow((x - sx) / (sr * (.6 + t * .8)), 2)) * (n1(Math.floor(x / 3), y) > .35 ? 1 : .35);
        r += ref * .55; g += ref * .45; b += ref * .25;
      }
      const nz = (n1(x, y) - .5) * .06; r += nz; g += nz; b += nz;
      src[i * 3] = Math.min(1, r); src[i * 3 + 1] = Math.min(1, g); src[i * 3 + 2] = Math.min(1, b);
      lum[i] = .299 * src[i * 3] + .587 * src[i * 3 + 1] + .114 * src[i * 3 + 2];
    }
    const img = ctx.createImageData(w, h), d = img.data;
    const idx = new Int32Array(h);
    let thr = .6, thrT = .6, glitch = 0, raf = 0, last = 0, dead = false, seed = 1;
    const render = () => {
      for (let x = 0; x < w; x++) {
        // column x: gather intervals of lum > thr and sort each (descending brightness, bright on top)
        let y = 0;
        const gshift = glitch > 0 ? Math.round((n1(x >> 3, seed) - .5) * 40 * glitch) : 0;
        while (y < h) {
          const i0 = y * w + x;
          if (lum[i0] <= thr) { const o = i0 * 4; d[o] = src[i0 * 3] * 255; d[o + 1] = src[i0 * 3 + 1] * 255; d[o + 2] = src[i0 * 3 + 2] * 255; d[o + 3] = 255; y++; continue; }
          let y1 = y; while (y1 < h && lum[y1 * w + x] > thr) y1++;
          const n = y1 - y; for (let k = 0; k < n; k++) idx[k] = (y + k) * w + x;
          const sub = idx.subarray(0, n); sub.sort((a, b) => lum[b] - lum[a]);
          for (let k = 0; k < n; k++) {
            const yy = Math.min(h - 1, Math.max(0, y + k + (k > n * .5 ? gshift : 0)));
            const s = sub[k], o = (yy * w + x) * 4;
            d[o] = src[s * 3] * 255; d[o + 1] = src[s * 3 + 1] * 255; d[o + 2] = src[s * 3 + 2] * 255; d[o + 3] = 255;
          }
          y = y1;
        }
      }
      ctx.putImageData(img, 0, 0);
    };
    const tick = (now) => {
      raf = 0; if (dead) return;
      const dt = Math.min(.1, (now - last) / 1000 || .016); last = now;
      thr += (thrT - thr) * Math.min(1, dt * 5); glitch = Math.max(0, glitch - dt * 1.6);
      if (glitch > 0) seed = Math.floor(now / 70);
      render();
      if (Math.abs(thrT - thr) > .003 || glitch > 0) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf && !dead) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    render();
    btn.addEventListener('pointerenter', () => { thrT = .38; kick(); });
    btn.addEventListener('pointerleave', () => { thrT = .6; kick(); });
    btn.addEventListener('pointerdown', () => { thr = .16; glitch = 1; kick(); });
    btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { thr = .22; glitch = 1; kick(); } });
    btn.addEventListener('focus', () => { if (btn.matches(':focus-visible')) { thrT = .38; kick(); } });
    btn.addEventListener('blur', () => { if (!btn.matches(':hover')) { thrT = .6; kick(); } });
    return () => { dead = true; cancelAnimationFrame(raf); };
  },
};
