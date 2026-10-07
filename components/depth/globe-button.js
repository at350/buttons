export default {
  id: 'dp-globe-button',
  credit: 'Spinning globe button — NASA Blue Marble land/ocean map orthographically projected onto a lit sphere with a faint graticule, turning on its 23.4° axis while hovered; click selects it with a halo',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 24px 40px 30px; perspective: 600px; background: radial-gradient(120% 100% at 50% 0%, #0f1b3d, #020617 70%); border-radius: 12px; }
    .wrap { position: relative; width: 96px; height: 96px; }
    .globe {
      position: relative; display: block; width: 96px; height: 96px; border: 0; padding: 0; border-radius: 50%; cursor: pointer; background: none;
      transform: translateZ(0); transition: transform .45s cubic-bezier(.3, 1.3, .4, 1), filter .3s;
      -webkit-tap-highlight-color: transparent;
    }
    .globe:hover { transform: translateZ(14px); }
    .globe:active { transform: translateZ(2px) scale(.97); transition-duration: .1s; }
    .globe svg { display: block; width: 96px; height: 96px; overflow: visible; }
    .globe canvas { position: absolute; inset: 0; width: 96px; height: 96px; border-radius: 50%; transform: rotate(-23.4deg); }
    .globe svg { position: relative; }
    .halo { position: absolute; inset: -1px; border-radius: 50%; pointer-events: none; opacity: 0; transition: opacity .35s;
      box-shadow: 0 0 0 2px rgba(253, 230, 138, .95), 0 0 14px 2px rgba(253, 230, 138, .4); }
    .globe[aria-pressed="true"] .halo { opacity: 1; }
    .sh { position: absolute; left: 50%; top: 100%; width: 76px; height: 14px; margin: 6px 0 0 -38px; border-radius: 50%;
      background: radial-gradient(closest-side, rgba(0, 0, 0, .7), transparent); transition: transform .45s, opacity .45s; pointer-events: none; }
    .globe:hover + .sh { transform: scale(.82); opacity: .7; }
    .globe:focus-visible { outline: 2px solid #fff; outline-offset: 8px; }
  `,
  html: `
    <div class="stage"><div class="wrap">
      <button class="globe" type="button" aria-pressed="false" aria-label="World">
        <canvas width="192" height="192"></canvas>
        <svg viewBox="-50 -50 100 100" aria-hidden="true">
          <defs>
            <radialGradient id="dpgbshade" cx="35%" cy="30%" r="80%">
              <stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#020617" stop-opacity=".55"/>
            </radialGradient>
            <radialGradient id="dpgbspec" cx="33%" cy="27%" r="28%">
              <stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="dpgbatmo" r="50%">
              <stop offset=".9" stop-color="#7dd3fc" stop-opacity="0"/><stop offset=".98" stop-color="#7dd3fc" stop-opacity=".45"/><stop offset="1" stop-color="#7dd3fc" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <circle r="46" fill="url(#dpgbshade)"/>
          <circle r="46" fill="url(#dpgbspec)"/>
          <circle r="48" fill="url(#dpgbatmo)"/>
        </svg>
        <span class="halo"></span>
      </button><span class="sh"></span>
    </div></div>`,
  init(root) {
    const g = root.querySelector('.globe'), cv = root.querySelector('canvas'), ctx = cv.getContext('2d');
    const N = 192, TW = 512, TH = 256, R = 46 * .96 * 2; // sphere radius in canvas px: 46 of the svg's 50 view units, 96px box at 2x
    const img = ctx.createImageData(N, N), out = img.data;
    // per-pixel orthographic lookup (latitude row, base longitude, lambert shade, rim alpha), computed once
    const row = new Int32Array(N * N).fill(-1), lon0 = new Float32Array(N * N), shade = new Float32Array(N * N), rim = new Float32Array(N * N), latD = new Float32Array(N * N);
    const L = [-0.42, -0.52, 0.74];
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const x = (i + .5 - N / 2) / R, y = (j + .5 - N / 2) / R, rr = x * x + y * y;
      if (rr > 1.02) continue;
      const k = j * N + i, z = Math.sqrt(Math.max(0, 1 - rr));
      const lat = Math.asin(Math.max(-1, Math.min(1, -y)));
      row[k] = Math.min(TH - 1, Math.max(0, Math.round((.5 - lat / Math.PI) * (TH - 1))));
      latD[k] = lat * 180 / Math.PI;
      lon0[k] = Math.atan2(x, z);
      shade[k] = .32 + .9 * Math.max(0, x * L[0] + y * L[1] + z * L[2]);
      rim[k] = Math.max(0, Math.min(1, (1.02 - Math.sqrt(rr)) * R / 1.6));
    }
    let tex = null, phase = Math.PI + .25, raf = 0, last = 0, hover = false;
    const draw = () => {
      if (!tex) return;
      for (let k = 0; k < N * N; k++) {
        const o = k * 4;
        if (row[k] < 0) { out[o + 3] = 0; continue; }
        let lon = lon0[k] + phase; lon -= Math.floor(lon / (2 * Math.PI)) * 2 * Math.PI;
        const lonD = lon * 180 / Math.PI;
        const t = (row[k] * TW + Math.min(TW - 1, (lon / (2 * Math.PI) * TW) | 0)) * 4, sh = shade[k];
        let r = tex[t] * sh, gg = tex[t + 1] * sh, b = tex[t + 2] * sh;
        // faint graticule every 30°
        const gl = Math.abs(((latD[k] + 15) % 30 + 30) % 30 - 15) > 14.2 || Math.abs(((lonD + 15) % 30 + 30) % 30 - 15) > 14.1;
        if (gl) { r += (219 - r) * .22; gg += (234 - gg) * .22; b += (254 - b) * .22; }
        out[o] = r; out[o + 1] = gg; out[o + 2] = b; out[o + 3] = 255 * rim[k];
      }
      ctx.putImageData(img, 0, 0);
    };
    const pic = new Image();
    pic.onload = () => {
      const c = document.createElement('canvas'); c.width = TW; c.height = TH;
      const x = c.getContext('2d'); x.drawImage(pic, 0, 0, TW, TH);
      tex = x.getImageData(0, 0, TW, TH).data;
      // the NASA plate's oceans are near-black navy: relight them to a sunlit ocean blue
      for (let i = 0; i < tex.length; i += 4) {
        const r = tex[i], gg = tex[i + 1], b = tex[i + 2];
        if (b > r + 18 && b > gg + 12 && r < 70) { const v = (b - 40) / 40; tex[i] = 22 + 10 * v; tex[i + 1] = 86 + 22 * v; tex[i + 2] = 178 + 25 * v; }
      }
      draw();
    };
    pic.src = 'assets/real/earth-equirect.jpg';
    const tick = (t) => {
      if (t - last >= 33) { phase += (t - last > 100 ? 33 : t - last) * 0.0006; last = t; draw(); }
      raf = hover ? requestAnimationFrame(tick) : 0;
    };
    g.addEventListener('pointerenter', () => { hover = true; if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } });
    g.addEventListener('pointerleave', () => { hover = false; });
    g.addEventListener('click', () => g.setAttribute('aria-pressed', String(g.getAttribute('aria-pressed') !== 'true')));
    return () => { cancelAnimationFrame(raf); pic.onload = null; };
  },
};
