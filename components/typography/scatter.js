export default {
  id: 'ty-scatter',
  credit: 'Scatter and reassemble — click and the letters fly apart in random directions and spins (kept inside the card), then spring back into the word (GSAP SplitText "explode" demos, CSS transitions)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .stage { background: #fff; border-radius: 12px; padding: 34px 40px; border: 1px solid #e5e5e5; }
    .btn {
      cursor: pointer; background: transparent; border: 0; padding: 0; color: #111; display: inline-flex;
      font: 700 40px/1 'Space Grotesk', Inter, system-ui, sans-serif; letter-spacing: -.03em;
    }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 10px; border-radius: 4px; }
    .ch {
      display: inline-block; transition: transform .55s cubic-bezier(.34, 1.56, .64, 1), opacity .4s, color .3s;
      transition-delay: calc(var(--i) * 25ms);
    }
    .btn:hover .ch { color: #f43f5e; transform: translateY(calc(var(--i) * -1px + 3px)); }
    .btn.out .ch { transform: translate(var(--x), var(--y)) rotate(var(--r)) scale(var(--s)); opacity: .9; transition-timing-function: cubic-bezier(.2, .8, .3, 1); }
    .btn.out .ch { color: #f43f5e; }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-label="Scatter"><span class="w" data-label="Scatter" aria-hidden="true" style="display:contents"></span></button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    const w = root.querySelector('.w');
    const chars = [];
    let i = 0;
    for (const c of w.dataset.label) {
      const ch = document.createElement('span');
      ch.className = 'ch';
      ch.style.setProperty('--i', String(i++));
      ch.textContent = c;
      w.appendChild(ch);
      chars.push(ch);
    }
    let t = 0, busy = false;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const stage = root.querySelector('.stage');
    btn.addEventListener('click', () => {
      if (busy) return;
      busy = true;
      const sr = stage.getBoundingClientRect();
      for (const ch of chars) {
        const cr = ch.getBoundingClientRect();
        // room left inside the card, minus the extra footprint of a rotated / scaled glyph
        const m = Math.max(cr.width, cr.height) * 0.45 + 6;
        const x0 = sr.left + m - cr.left, x1 = sr.right - m - cr.right;
        const y0 = sr.top + m - cr.top, y1 = sr.bottom - m - cr.bottom;
        ch.style.setProperty('--x', rnd(Math.min(x0, 0), Math.max(x1, 0)).toFixed(0) + 'px');
        ch.style.setProperty('--y', rnd(Math.min(y0, 0), Math.max(y1, 0)).toFixed(0) + 'px');
        ch.style.setProperty('--r', rnd(-160, 160).toFixed(0) + 'deg');
        ch.style.setProperty('--s', rnd(.75, 1.1).toFixed(2));
      }
      btn.classList.add('out');
      t = setTimeout(() => { btn.classList.remove('out'); busy = false; }, 700);
    });
    return () => clearTimeout(t);
  },
};
