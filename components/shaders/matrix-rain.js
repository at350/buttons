// Canvas 2D Matrix "digital rain": columns of mirrored half-width katakana, digits and symbols (the glyph
// set from the film's titles) fall at their own speed; each drop has a white-hot head and a #00ff41 trail
// that fades over 8–18 cells while glyphs randomly mutate. Hover doubles the speed; press flashes a white
// wave down the screen. Idle rain runs at ≤30fps only while visible.
const W = 240, H = 90, CW = 10, CH = 12, COLS = 24, ROWS = 8;
const GLYPHS = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ012345789Z:・."=*+-<>¦｜';

export default {
  id: 'sh-matrix-rain',
  credit: 'The Matrix digital rain inside a button — mirrored half-width katakana, digits and symbols fall in columns with white heads and fading #00ff41 trails, glyphs mutating; hover speeds the rain, press sends a white wave',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn { position: relative; display: grid; place-items: center; width: 240px; height: 90px; max-width: 100%; padding: 0; border: 0; border-radius: 6px; overflow: hidden; background: #000; cursor: pointer; isolation: isolate; box-shadow: inset 0 0 0 1px rgba(0,255,65,.35), 0 0 18px -8px rgba(0,255,65,.8); transition: box-shadow .2s; }
    .btn:hover { box-shadow: inset 0 0 0 1px rgba(0,255,65,.6), 0 0 22px -6px rgba(0,255,65,.9); }
    .cv { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .l { position: relative; z-index: 1; color: #d6ffe0; background: rgba(0,0,0,.78); padding: 7px 12px; border-radius: 3px; font: 500 15px/1 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .06em; white-space: nowrap; pointer-events: none; text-shadow: 0 0 6px rgba(0,255,65,.8); box-shadow: 0 0 0 1px rgba(0,255,65,.25); }
    .btn:active .l { background: rgba(0,0,0,.6); }
    .btn:focus-visible { outline: 2px solid #00ff41; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button"><canvas class="cv"></canvas><span class="l">&gt; wake up_</span></button>`,
  init(root, host) {
    const btn = root.querySelector('.btn'), cv = root.querySelector('.cv');
    const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    const pick = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];
    const cells = Array.from({ length: COLS * ROWS }, pick);
    const drops = Array.from({ length: COLS }, () => ({ y: Math.random() * (ROWS + 14) - 4, v: 5 + Math.random() * 7, len: 8 + Math.random() * 10 }));
    let raf = 0, last = 0, acc = 0, hover = 0, hoverT = 0, press = 0, vis = false, io = null, dead = false;
    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
      ctx.font = `500 ${CH - 1}px "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic", "MS Gothic", "Noto Sans JP", "JetBrains Mono", monospace`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const wave = (1 - press) * (ROWS + 6) - 3;
      for (let c = 0; c < COLS; c++) {
        const d = drops[c];
        for (let r = 0; r < ROWS; r++) {
          const k = d.y - r; // cells above the head (k>=0) are trail
          let a = 0, head = false;
          if (k >= 0 && k < d.len) { a = 1 - k / d.len; head = k < 1; }
          const w = press > 0 ? Math.max(0, 1 - Math.abs(r - wave) / 2.2) * press : 0;
          if (a <= .02 && w <= .02) continue;
          const g = cells[r * COLS + c];
          const x = c * CW + CW / 2, y = r * CH + CH / 2 - 1;
          ctx.save(); ctx.translate(x, y); ctx.scale(-1, 1);
          if (head || w > .3) { ctx.shadowColor = 'rgba(160,255,180,.9)'; ctx.shadowBlur = 6; ctx.fillStyle = `rgba(225,255,232,${Math.max(head ? 1 : 0, w).toFixed(3)})`; }
          else { ctx.shadowBlur = 0; ctx.fillStyle = `rgba(0,255,65,${(a * a * .9 + .1).toFixed(3)})`; if (w > 0) ctx.fillStyle = `rgba(${Math.round(200 * w)},255,${Math.round(65 + 160 * w)},${Math.max(a * a, w).toFixed(3)})`; }
          ctx.fillText(g, 0, 0); ctx.restore();
        }
      }
    };
    const step = (dt) => {
      const sp = 1 + 1.4 * hover;
      for (const d of drops) { d.y += d.v * sp * dt; if (d.y - d.len > ROWS) { d.y = -Math.random() * 6; d.v = 5 + Math.random() * 7; d.len = 8 + Math.random() * 10; } }
      for (let i = 0; i < cells.length; i++) if (Math.random() < dt * 1.8) cells[i] = pick();
    };
    const tick = (now) => {
      raf = 0; if (dead) return;
      const dt = Math.min(.1, (now - last) / 1000 || .016); last = now; acc += dt;
      if (acc >= 1 / 30) {
        const s = acc; acc = 0;
        hover += (hoverT - hover) * Math.min(1, s * 8); press = Math.max(0, press - s * 1.6);
        step(s); draw();
      }
      if (vis || hoverT || press > 0) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf && !dead) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    for (let i = 0; i < 20; i++) step(1 / 30);
    draw();
    btn.addEventListener('pointerenter', () => { hoverT = 1; kick(); });
    btn.addEventListener('pointerleave', () => { hoverT = 0; kick(); });
    btn.addEventListener('pointerdown', () => { press = 1; kick(); });
    btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { press = 1; kick(); } });
    btn.addEventListener('focus', () => { if (btn.matches(':focus-visible')) { hoverT = 1; kick(); } });
    btn.addEventListener('blur', () => { if (!btn.matches(':hover')) { hoverT = 0; kick(); } });
    if (typeof IntersectionObserver === 'function') { io = new IntersectionObserver((en) => { vis = en.some((x) => x.isIntersecting); if (vis) kick(); }); io.observe(cv); }
    return () => { dead = true; cancelAnimationFrame(raf); io && io.disconnect(); };
  },
};
