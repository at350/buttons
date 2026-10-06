// Canvas 2D: the PSX Doom fire (Fabien Sanglard's write-up) — the exact 37-entry palette and the
// spreadFire() rule: each cell copies the one below, shifted -1..+2 columns (wind), decaying by 0..1.
// The grid is drawn 1:1 into a 120×50 canvas and upscaled by CSS with nearest-neighbour.
const FW = 120, FH = 50;
const RGB = [
  0x07, 0x07, 0x07, 0x1f, 0x07, 0x07, 0x2f, 0x0f, 0x07, 0x47, 0x0f, 0x07, 0x57, 0x17, 0x07, 0x67, 0x1f, 0x07,
  0x77, 0x1f, 0x07, 0x8f, 0x27, 0x07, 0x9f, 0x2f, 0x07, 0xaf, 0x3f, 0x07, 0xbf, 0x47, 0x07, 0xc7, 0x47, 0x07,
  0xdf, 0x4f, 0x07, 0xdf, 0x57, 0x07, 0xdf, 0x57, 0x07, 0xd7, 0x5f, 0x07, 0xd7, 0x5f, 0x07, 0xd7, 0x67, 0x0f,
  0xcf, 0x6f, 0x0f, 0xcf, 0x77, 0x0f, 0xcf, 0x7f, 0x0f, 0xcf, 0x87, 0x17, 0xc7, 0x87, 0x17, 0xc7, 0x8f, 0x17,
  0xc7, 0x97, 0x1f, 0xbf, 0x9f, 0x1f, 0xbf, 0x9f, 0x1f, 0xbf, 0xa7, 0x27, 0xbf, 0xa7, 0x27, 0xbf, 0xaf, 0x2f,
  0xb7, 0xaf, 0x2f, 0xb7, 0xb7, 0x2f, 0xb7, 0xb7, 0x37, 0xcf, 0xcf, 0x6f, 0xdf, 0xdf, 0x9f, 0xef, 0xef, 0xc7,
  0xff, 0xff, 0xff,
]; // 37 colours, index 0 = background, 36 = white-hot source

export default {
  id: 'sh-doom-fire',
  credit: 'Doom fire button — the PlayStation Doom fire (Fabien Sanglard): the original 37-colour palette and spreadFire() decay on a 2D canvas; embers smoulder at rest, hover ignites it, press flares it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 240px; height: 100px; max-width: 100%; padding: 0; border: 0; border-radius: 10px; overflow: hidden; background: #070707; cursor: pointer; isolation: isolate; box-shadow: inset 0 0 0 1px rgba(255,255,255,.06), 0 1px 2px rgba(0,0,0,.3); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; image-rendering: pixelated; }
    .l { position: relative; z-index: 1; margin-top: -8px; color: #ffefc7; font: 800 30px/1 'Unbounded', 'Inter', system-ui, sans-serif; letter-spacing: .04em; pointer-events: none;
         text-shadow: 0 2px 0 #470f07, 0 0 18px rgba(223, 79, 7, .85); transition: transform .2s cubic-bezier(.2,.8,.2,1), color .2s; }
    .btn:hover .l { color: #fff; transform: translateY(-3px); }
    .btn:active .l { transform: translateY(0) scale(.97); }
    .btn:focus-visible { outline: 2px solid #df4f07; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button"><canvas class="cv" width="120" height="50"></canvas><span class="l">BURN</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const ctx = cv.getContext('2d'); if (!ctx) return;
    const img = ctx.createImageData(FW, FH), d = img.data;
    const fire = new Uint8Array(FW * FH);
    let raf = 0, lit = false, flare = 0, acc = 0, clock = 0, last = 0, vis = true, io = null, dead = false;
    // Source row: white-hot (36) when lit; a flickering low ember bed at rest so it never looks dead.
    const feed = () => {
      const base = (FH - 1) * FW;
      for (let x = 0; x < FW; x++) {
        if (lit || flare > 0) fire[base + x] = 36;
        else fire[base + x] = 10 + ((Math.random() * 7) | 0) + (Math.sin(x * .21 + clock * 1.7) > .55 ? 6 : 0);
      }
    };
    // Sanglard's spreadFire, with extra decay so a 50-row grid burns ~75% high (the PSX grid is 168 rows).
    const step = () => {
      clock += 1 / 30;
      feed();
      const extra = flare > 0 ? .08 : .4;
      for (let x = 0; x < FW; x++) for (let y = 1; y < FH; y++) {
        const src = y * FW + x, p = fire[src];
        if (p === 0) { fire[src - FW] = 0; continue; }
        const r = (Math.random() * 3.99) | 0;
        let dst = src - r + 1 - FW; const row = (y - 1) * FW;
        if (dst < row) dst += FW; else if (dst >= row + FW) dst -= FW;
        const v = p - (r & 1) - (Math.random() < extra ? 1 : 0);
        fire[dst] = v > 0 ? v : 0;
      }
    };
    const paint = () => {
      for (let i = 0; i < fire.length; i++) { const k = fire[i] * 3; d[i * 4] = RGB[k]; d[i * 4 + 1] = RGB[k + 1]; d[i * 4 + 2] = RGB[k + 2]; d[i * 4 + 3] = 255; }
      ctx.putImageData(img, 0, 0);
    };
    const tick = (now) => {
      raf = 0;
      const dt = Math.min(.1, (now - last) / 1000 || .016); last = now; acc += dt; flare = Math.max(0, flare - dt);
      let n = 0; while (acc > 1 / 30 && n < 3) { acc -= 1 / 30; step(); n++; }
      if (acc > 1 / 30) acc = 0;
      if (n) paint();
      if (!dead && vis) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf && !dead && vis) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    for (let i = 0; i < 70; i++) step(); // prewarm: the ember bed is at its final look immediately
    paint();
    btn.addEventListener('pointerenter', () => { lit = true; kick(); });
    btn.addEventListener('pointerleave', () => { lit = false; });
    btn.addEventListener('pointerdown', () => { flare = .6; kick(); });
    btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { flare = .6; kick(); } });
    btn.addEventListener('focus', () => { if (btn.matches(':focus-visible')) { lit = true; kick(); } });
    btn.addEventListener('blur', () => { if (!btn.matches(':hover')) lit = false; });
    if (typeof IntersectionObserver === 'function') {
      vis = false;
      io = new IntersectionObserver((en) => { vis = en.some((x) => x.isIntersecting); if (vis) kick(); else { cancelAnimationFrame(raf); raf = 0; } });
      io.observe(cv);
    } else kick();
    return () => { dead = true; cancelAnimationFrame(raf); raf = 0; io && io.disconnect(); };
  },
};
