// Apple Reminders "List Info" color picker (iOS): the big list badge (white list glyph on the chosen color) above
// a grouped white card holding two rows of iOS system-color dots (light-mode values: red #ff3b30, orange #ff9500,
// yellow #ffcc00, green #34c759, mint #00c7be, teal #30b0c7, cyan #32ade6, blue #007aff, indigo #5856d6,
// purple #af52de, pink #ff2d55, brown #a2845e). The chosen dot gets the gray systemGray3 halo ring.
const COLORS = [['Red', '#ff3b30'], ['Orange', '#ff9500'], ['Yellow', '#ffcc00'], ['Green', '#34c759'], ['Mint', '#00c7be'], ['Teal', '#30b0c7'],
  ['Cyan', '#32ade6'], ['Blue', '#007aff'], ['Indigo', '#5856d6'], ['Purple', '#af52de'], ['Pink', '#ff2d55'], ['Brown', '#a2845e']];
export default {
  id: 'in-swatch-picker',
  credit: 'Apple Reminders list color picker (iOS) — system-color dots, gray halo on the chosen one, the list badge recolors',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .w { display: inline-flex; flex-direction: column; align-items: center; gap: 14px; padding: 16px; border-radius: 12px; background: #f2f2f7; }
    .badge {
      width: 64px; height: 64px; border-radius: 50%; display: grid; place-items: center; background: var(--c); color: #fff;
      box-shadow: 0 2px 8px color-mix(in srgb, var(--c) 45%, transparent); transition: background-color .25s ease, box-shadow .25s ease;
    }
    .badge svg { width: 30px; height: 30px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
    .grid { display: grid; grid-template-columns: repeat(6, 30px); gap: 14px 16px; padding: 14px 16px; border-radius: 10px; background: #fff; }
    .sw {
      width: 30px; height: 30px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; background: var(--c);
      box-shadow: 0 0 0 0 #fff, 0 0 0 0 #c7c7cc; transition: box-shadow .2s ease, transform .15s ease; -webkit-tap-highlight-color: transparent; outline: 0;
    }
    .sw:hover { transform: scale(1.06); }
    .sw:active { transform: scale(.92); }
    .sw[aria-checked="true"] { box-shadow: 0 0 0 3px #fff, 0 0 0 6px #c7c7cc; }
    .sw:focus-visible { box-shadow: 0 0 0 3px #fff, 0 0 0 6px #007aff; }
  `,
  html: `<div class="w" style="--c:#007aff">
    <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 5h.01"/><path d="M3 12h.01"/><path d="M3 19h.01"/><path d="M8 5h13"/><path d="M8 12h13"/><path d="M8 19h13"/></svg></span>
    <div class="grid" role="radiogroup" aria-label="List color">${COLORS.map(([n, c]) => `<button class="sw" type="button" role="radio" aria-checked="${n === 'Blue'}" aria-label="${n}" style="--c:${c}"></button>`).join('')}</div>
  </div>`,
  init(root) {
    const w = root.querySelector('.w'), grid = root.querySelector('.grid'), sws = [...root.querySelectorAll('.sw')];
    let idx = 7;
    const set = (i, focus) => {
      idx = (i + sws.length) % sws.length;
      sws.forEach((s, j) => s.setAttribute('aria-checked', j === idx));
      w.style.setProperty('--c', COLORS[idx][1]);
      if (focus) sws[idx].focus({ preventScroll: true });
    };
    sws.forEach((s, i) => s.addEventListener('click', () => set(i)));
    grid.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 6, ArrowUp: -6 }[e.key];
      if (d) { e.preventDefault(); set(idx + d, true); }
    });
  },
};
