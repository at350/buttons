// Canvas 2D: the classic Doom (PSX) fire propagation algorithm, upscaled with nearest-neighbour.
const FW = 96, FH = 40, CW = 240, CH = 100;
const PAL = Array.from({ length: 37 }, (_, i) => {
  const t = i / 36;
  return [Math.min(255, Math.round(t * 3 * 255)), Math.max(0, Math.min(255, Math.round((t - .3) * 1.6 * 255))), Math.max(0, Math.min(255, Math.round((t - .78) * 5 * 255)))];
});

export default {
  id: 'sh-doom-fire',
  credit: 'Doom fire button — the PlayStation Doom fire algorithm (36-colour palette, random upward decay) on a 2D canvas; hover ignites it, press flares it, leave and it burns out',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: end center; width: 240px; height: 100px; max-width: 100%; padding: 0 0 10px; border: 0; border-radius: 10px; overflow: hidden; background: #070707; cursor: pointer; isolation: isolate; box-shadow: 0 0 0 2px #1a1a1a; }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; image-rendering: pixelated; }
    .l { position: relative; z-index: 1; color: #fff1d6; font: 900 30px/1 'Unbounded', 'Inter', system-ui, sans-serif; letter-spacing: .06em; text-shadow: 0 0 14px #ff6a00, 0 2px 0 #4a1000; pointer-events: none; transition: transform .2s; }
    .btn:hover .l { transform: translateY(-6px); }
    .btn:active .l { transform: translateY(-2px) scale(.97); }
    .btn:focus-visible { outline: 2px solid #ff8c1a; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button"><canvas class="cv"></canvas><span class="l">BURN</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    cv.width = CW; cv.height = CH; // low-res by design; nearest-neighbour upscaled by CSS
    const ctx = cv.getContext('2d'); if (!ctx) return;
    ctx.imageSmoothingEnabled = false;
    const off = document.createElement('canvas'); off.width = FW; off.height = FH;
    const octx = off.getContext('2d'); const img = octx.createImageData(FW, FH);
    const fire = new Uint8Array(FW * FH);
    let raf = 0, lit = false, flare = 0, acc = 0, last = 0;
    const paint = () => {
      const d = img.data;
      for (let i = 0; i < fire.length; i++) { const c = PAL[fire[i]]; d[i * 4] = c[0]; d[i * 4 + 1] = c[1]; d[i * 4 + 2] = c[2]; d[i * 4 + 3] = fire[i] ? 255 : 0; }
      octx.putImageData(img, 0, 0);
      ctx.clearRect(0, 0, CW, CH); ctx.drawImage(off, 0, 0, FW, FH, 0, 0, CW, CH);
    };
    const step = () => {
      for (let x = 0; x < FW; x++) fire[(FH - 1) * FW + x] = lit ? 36 : 0;
      if (flare > 0) for (let k = 0; k < 40; k++) fire[(FH - 1 - (Math.random() * 10 | 0)) * FW + (Math.random() * FW | 0)] = 36;
      let any = false;
      for (let x = 0; x < FW; x++) for (let y = 1; y < FH; y++) {
        const src = y * FW + x, p = fire[src];
        if (p === 0) { fire[src - FW] = 0; continue; }
        any = true;
        const rnd = Math.random() * 3 | 0, dst = src - rnd + 1;
        if (dst - FW >= 0 && dst - FW < fire.length) fire[dst - FW] = Math.max(0, p - (rnd & 1) - (flare > 0 ? 0 : 0));
      }
      return any;
    };
    const tick = (now) => {
      raf = 0;
      const dt = Math.min(.1, (now - last) / 1000 || .016); last = now; acc += dt; flare = Math.max(0, flare - dt);
      let any = lit;
      while (acc > 1 / 30) { acc -= 1 / 30; any = step() || any; }
      paint();
      if (any || lit) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    btn.addEventListener('pointerenter', () => { lit = true; kick(); });
    btn.addEventListener('pointerleave', () => { lit = false; kick(); });
    btn.addEventListener('pointerdown', () => { flare = .5; kick(); });
    btn.addEventListener('focus', () => { if (btn.matches(':focus-visible')) { lit = true; kick(); } });
    btn.addEventListener('blur', () => { if (!btn.matches(':hover')) { lit = false; kick(); } });
    btn.addEventListener('click', (e) => { if (!e.detail) { flare = .5; kick(); } });
    paint();
    return () => cancelAnimationFrame(raf);
  },
};
