// Syne ExtraBold (800) cap advance widths in em, measured from the loaded font. Used to lay the letters out
// with transforms only, so the box is reserved for both the stacked and the unstacked state.
const LABEL = 'MENU';
const ADV = { M: 1.58, E: 1.14, N: 1.3, U: 1.289 };
const GAP = 0.04; // em, optical tracking between caps in the row state
const STEP = 0.8; // em, vertical step of the stack (tight poster leading)
const ROW_W = [...LABEL].reduce((a, c) => a + ADV[c], 0) + GAP * (LABEL.length - 1);
const STACK_H = STEP * (LABEL.length - 1) + 0.8;
let x = 0;
const pos = [...LABEL].map((c, i) => {
  const p = { c, rx: x, sx: (ROW_W - ADV[c]) / 2, sy: i * STEP };
  x += ADV[c] + GAP;
  return p;
});
const rowY = (STACK_H - 0.8) / 2;

export default {
  id: 'ty-unstack',
  credit: 'Unstacking word — a tight poster stack of Syne ExtraBold caps fans out into a single line on hover, letter by letter, inside a box reserved for both states (Syne poster-type menus)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .btn {
      cursor: pointer; background: #fde047; color: #111; border: 0; border-radius: 12px; padding: 16px 18px;
      font: 800 22px/.8 Syne, 'Space Grotesk', system-ui, sans-serif;
      display: block; transition: background .3s, color .3s, border-radius .3s;
    }
    .btn:hover, .btn.on { background: #111; color: #fde047; border-radius: 4px; }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
    .w { display: block; position: relative; width: ${ROW_W.toFixed(3)}em; height: ${STACK_H.toFixed(3)}em; }
    .ch {
      position: absolute; left: 0; top: 0; line-height: .8; white-space: pre;
      transform: translate(var(--sx), var(--sy));
      transition: transform .5s cubic-bezier(.65, 0, .35, 1); transition-delay: calc((3 - var(--i)) * 35ms);
    }
    .btn:hover .ch, .btn:focus-visible .ch, .btn.on .ch {
      transform: translate(var(--rx), var(--ry)); transition-delay: calc(var(--i) * 35ms);
    }
    .btn:active .w { transform: scale(.94); }
    .w { transition: transform .15s; }
    @media (prefers-reduced-motion: reduce) { .ch { transition-duration: .01s; } }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="Menu"><span class="w" aria-hidden="true">${pos.map((p, i) => `<span class="ch" style="--i:${i};--sx:${p.sx.toFixed(3)}em;--sy:${p.sy.toFixed(3)}em;--rx:${p.rx.toFixed(3)}em;--ry:${rowY.toFixed(3)}em">${p.c}</span>`).join('')}</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
