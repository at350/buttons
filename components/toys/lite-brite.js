const COLS = 11, ROWS = 7;
const PEGS = ['#ff2a2a', '#ff8c1a', '#ffe81a', '#3dff5a', '#2aa8ff', '#b55cff', '#ff5cc8', '#ffffff'];
const HOLES = Array.from({ length: COLS * ROWS }, (_, i) => `<button class="h" type="button" aria-pressed="false" aria-label="peg hole ${i + 1}"></button>`).join('');
const TRAY = PEGS.map((c, i) => `<button class="peg" type="button" role="radio" aria-checked="${i === 0}" aria-label="peg colour ${i + 1}" style="--p:${c}"></button>`).join('');

export default {
  id: 'ty2-lite-brite',
  credit: 'Hasbro Lite-Brite (1967) — pick a peg colour, punch it through the black sheet and it glows; click a lit peg to pull it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 14px; border-radius: 12px; overflow: hidden; background: linear-gradient(#2a2f6b, #121535); }
    .box { padding: 12px; border-radius: 16px; background: linear-gradient(160deg, #3b6fe0, #1a5fb4 50%, #0f3f7f);
      box-shadow: 0 6px 0 #0b2e5c, 0 10px 14px rgba(0,0,0,.5), inset 0 2px 0 rgba(255,255,255,.35); }
    .screen { position: relative; padding: 8px 18px 8px 10px; border-radius: 8px; background: #050506; box-shadow: inset 0 0 0 3px #111, inset 0 4px 10px #000; }
    .grid { display: grid; grid-template-columns: repeat(${COLS}, 16px); gap: 3px; }
    .h { width: 16px; height: 16px; border: 0; padding: 0; border-radius: 50%; cursor: pointer; position: relative;
      background: radial-gradient(circle, #000 0 30%, #19191c 34%, #0b0b0d 70%); transition: background .12s, box-shadow .12s, transform .12s; }
    .h.odd { margin-left: 9px; margin-right: -9px; }
    .h:hover { background: radial-gradient(circle, #333 0 30%, #26262b 34%, #111 70%); }
    .h[aria-pressed="true"] { transform: scale(1.08);
      background: radial-gradient(circle at 40% 35%, #fff 0 12%, var(--p) 34%, color-mix(in srgb, var(--p) 55%, #000) 90%);
      box-shadow: 0 0 6px 2px color-mix(in srgb, var(--p) 75%, transparent), 0 0 14px 4px color-mix(in srgb, var(--p) 35%, transparent); }
    .h:focus-visible, .peg:focus-visible { outline: 2px solid #fff; outline-offset: 1px; }
    .tray { display: flex; gap: 6px; justify-content: center; margin-top: 10px; padding: 6px 8px; border-radius: 10px; background: #0b2e5c; box-shadow: inset 0 2px 4px rgba(0,0,0,.5); }
    .peg { width: 18px; height: 22px; border: 0; padding: 0; cursor: pointer; border-radius: 9px 9px 4px 4px;
      background: linear-gradient(90deg, color-mix(in srgb, var(--p) 70%, #000), var(--p) 45%, color-mix(in srgb, var(--p) 60%, #fff) 60%, var(--p));
      box-shadow: 0 2px 0 rgba(0,0,0,.4); transition: transform .15s cubic-bezier(.3,1.6,.5,1); }
    .peg:hover { transform: translateY(-2px); }
    .peg[aria-checked="true"] { transform: translateY(-4px); box-shadow: 0 0 0 2px #fff, 0 0 10px var(--p); }
  `,
  html: `
    <div class="stage"><div class="box">
      <div class="screen"><div class="grid">${HOLES}</div></div>
      <div class="tray" role="radiogroup" aria-label="peg colours">${TRAY}</div>
    </div></div>`,
  init(root) {
    const holes = [...root.querySelectorAll('.h')], pegs = [...root.querySelectorAll('.peg')];
    let colour = 0;
    holes.forEach((h, i) => h.classList.toggle('odd', Math.floor(i / COLS) % 2 === 1));
    // a little starter heart so the sheet is never blank
    [[1, 3], [1, 4], [1, 6], [1, 7], [2, 2], [2, 5], [2, 8], [3, 3], [3, 7], [4, 3], [4, 6], [5, 5]].forEach(([r, c]) => {
      const h = holes[r * COLS + c]; h.style.setProperty('--p', PEGS[0]); h.setAttribute('aria-pressed', 'true');
    });
    root.querySelector('.grid').addEventListener('click', (e) => {
      const h = e.target.closest('.h'); if (!h) return;
      const on = h.getAttribute('aria-pressed') === 'true' && h.style.getPropertyValue('--p') === PEGS[colour];
      h.style.setProperty('--p', PEGS[colour]); h.setAttribute('aria-pressed', String(!on));
      h.animate([{ transform: 'scale(.6)' }, { transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 220, easing: 'ease-out' });
    });
    pegs.forEach((p, i) => p.addEventListener('click', () => { colour = i; pegs.forEach((q, j) => q.setAttribute('aria-checked', String(i === j))); }));
  },
};
