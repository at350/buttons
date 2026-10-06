export default {
  id: 'cr-runaway',
  credit: 'The uncatchable "No" button — the "Will you go out with me?" meme: No dodges the cursor, Yes is the only way out',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; height: 150px; max-width: 100%; border-radius: 12px; background: #fff0f3; overflow: hidden; }
    .b {
      position: absolute; top: 50%; cursor: pointer; white-space: nowrap; border: 0; border-radius: 999px; height: 44px; padding: 0 24px;
      font: 700 16px/1 'DM Sans', system-ui, sans-serif; letter-spacing: -.005em;
    }
    .yes {
      left: 46px; margin-top: -22px; display: inline-flex; align-items: center; gap: 8px; color: #fff; background: #e11d48;
      box-shadow: 0 6px 16px rgba(225, 29, 72, .3); transition: background-color .2s ease, transform .3s cubic-bezier(.34, 1.56, .64, 1);
    }
    .yes svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; transition: fill .2s ease; }
    .yes:hover { background: #be123c; transform: scale(1.05); }
    .yes:active { transform: scale(.95); }
    .yes[aria-pressed="true"] svg { fill: currentColor; animation: beat .6s cubic-bezier(.34, 1.56, .64, 1); }
    .no {
      left: 0; margin-top: -22px; color: #881337; background: #fff; box-shadow: 0 0 0 1.5px #fecdd3, 0 4px 10px rgba(136, 19, 55, .08);
      transform: translate(var(--x, 168px), var(--y, 0px)); transition: transform .32s cubic-bezier(.2, .8, .2, 1);
    }
    .no:hover { background: #fff1f2; }
    .b:focus-visible { outline: 2px solid #881337; outline-offset: 3px; }
    @keyframes beat { 0% { transform: scale(.4); } 60% { transform: scale(1.3); } 100% { transform: scale(1); } }
  `,
  html: `<div class="stage"><button class="b yes" type="button" aria-pressed="false"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>Yes</button><button class="b no" type="button">No</button></div>`,
  init(root) {
    const stage = root.querySelector('.stage'), yes = root.querySelector('.yes'), no = root.querySelector('.no');
    let x = 168, y = 0, last = 0;
    const place = (nx, ny) => { x = nx; y = ny; no.style.setProperty('--x', x.toFixed(0) + 'px'); no.style.setProperty('--y', y.toFixed(0) + 'px'); };
    const flee = (px, py) => {
      const s = stage.getBoundingClientRect(), w = no.offsetWidth, h = no.offsetHeight;
      const cx = x + w / 2, cy = s.height / 2 + y;
      let dx = cx - px, dy = cy - py; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
      let nx = x + dx * (70 + Math.random() * 40), ny = y + dy * (40 + Math.random() * 30);
      const minX = 8, maxX = s.width - w - 8, minY = -s.height / 2 + h / 2 + 8, maxY = s.height / 2 - h / 2 - 8;
      // cornered? jump to the far side instead of sticking to the wall
      if (nx < minX || nx > maxX) nx = px > s.width / 2 ? minX + Math.random() * 40 : maxX - Math.random() * 40;
      if (ny < minY || ny > maxY) ny = py > s.height / 2 ? minY + Math.random() * 20 : maxY - Math.random() * 20;
      nx = Math.max(minX, Math.min(maxX, nx)); ny = Math.max(minY, Math.min(maxY, ny));
      // never hide behind (or on top of) the Yes button: duck into the band above or below it
      const yl = yes.offsetLeft - 10, yr = yes.offsetLeft + yes.offsetWidth + 10;
      if (nx + w > yl && nx < yr && Math.abs(ny) < h + 6) ny = py > s.height / 2 ? minY : maxY;
      place(nx, ny);
    };
    stage.addEventListener('pointermove', (e) => {
      const now = performance.now(); if (now - last < 90) return;
      const s = stage.getBoundingClientRect(), px = e.clientX - s.left, py = e.clientY - s.top;
      const w = no.offsetWidth, h = no.offsetHeight;
      const gx = Math.max(x, Math.min(x + w, px)), gy = Math.max(s.height / 2 + y - h / 2, Math.min(s.height / 2 + y + h / 2, py));
      if (Math.hypot(px - gx, py - gy) > 26) return;
      last = now; flee(px, py);
    });
    // keyboard users can reach it, but it still won't take "No" for an answer
    no.addEventListener('click', () => { const s = stage.getBoundingClientRect(); flee(x + no.offsetWidth / 2 + (Math.random() - .5) * 10, s.height / 2 + y + (Math.random() - .5) * 10); });
    yes.addEventListener('click', () => {
      const on = yes.getAttribute('aria-pressed') !== 'true';
      yes.setAttribute('aria-pressed', String(on));
      if (!on) place(168, 0);
    });
  },
};
