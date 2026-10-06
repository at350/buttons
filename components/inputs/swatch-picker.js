export default {
  id: 'in-swatch-picker',
  credit: 'Color swatch picker — row of circles, the chosen one lifts and gets a ring in its own color (Apple Notes / Figma)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; gap: 10px; padding: 6px; }
    .sw {
      width: 28px; height: 28px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; background: var(--c);
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.08); transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s; -webkit-tap-highlight-color: transparent;
    }
    .sw:hover { transform: scale(1.12); }
    .sw:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #111; }
    .sw[aria-checked="true"] { transform: scale(1.15); box-shadow: 0 0 0 3px #fff, 0 0 0 5px var(--c); }
  `,
  html: `<div class="row" role="radiogroup" aria-label="Color">
    <button class="sw" type="button" role="radio" aria-checked="false" aria-label="Red" style="--c:#ff3b30"></button>
    <button class="sw" type="button" role="radio" aria-checked="false" aria-label="Orange" style="--c:#ff9500"></button>
    <button class="sw" type="button" role="radio" aria-checked="false" aria-label="Yellow" style="--c:#ffcc00"></button>
    <button class="sw" type="button" role="radio" aria-checked="true" aria-label="Green" style="--c:#34c759"></button>
    <button class="sw" type="button" role="radio" aria-checked="false" aria-label="Blue" style="--c:#007aff"></button>
    <button class="sw" type="button" role="radio" aria-checked="false" aria-label="Purple" style="--c:#af52de"></button>
    <button class="sw" type="button" role="radio" aria-checked="false" aria-label="Gray" style="--c:#8e8e93"></button>
  </div>`,
  init(root) {
    const row = root.querySelector('.row'), sws = [...root.querySelectorAll('.sw')];
    let idx = 3;
    const set = (i, focus) => { idx = (i + sws.length) % sws.length; sws.forEach((s, j) => s.setAttribute('aria-checked', j === idx)); if (focus) sws[idx].focus({ preventScroll: true }); };
    sws.forEach((s, i) => s.addEventListener('click', () => set(i)));
    row.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); set(idx + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); set(idx - 1, true); }
    });
  },
};
