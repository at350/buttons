export default {
  id: 'bt-airbnb-search',
  credit: 'Airbnb — coral gradient "Search" button with magnifier that expands to show its label',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; align-items: center; gap: 8px; padding: 8px 8px 8px 24px; border-radius: 40px; background: #fff; border: 1px solid #ddd; box-shadow: 0 1px 2px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.05); }
    .where { font: 600 14px/1 "Airbnb Cereal", -apple-system, "Segoe UI", system-ui, sans-serif; color: #222; min-width: 90px; }
    .sb {
      height: 48px; min-width: 48px; padding: 0 16px 0 14px; border: 0; border-radius: 24px; color: #fff; cursor: pointer;
      background: linear-gradient(90deg, #e61e4d 0%, #e31c5f 50%, #d70466 100%);
      font: 600 16px/48px "Airbnb Cereal", -apple-system, "Segoe UI", system-ui, sans-serif;
      display: inline-flex; align-items: center; gap: 0; transition: gap .25s, padding .25s, transform .1s; -webkit-tap-highlight-color: transparent;
    }
    .sb:hover, .sb:focus-visible, .sb[aria-pressed="true"] { gap: 8px; padding: 0 20px 0 16px; }
    .sb:hover { background: linear-gradient(90deg, #d8183f 0%, #d1134d 50%, #c20358 100%); }
    .sb:active { transform: scale(.96); }
    .sb:focus-visible { outline: 2px solid #222; outline-offset: 2px; }
    .sb svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 5.33; flex: none; }
    .lbl { max-width: 0; overflow: hidden; white-space: nowrap; transition: max-width .25s; }
    .sb:hover .lbl, .sb:focus-visible .lbl, .sb[aria-pressed="true"] .lbl { max-width: 80px; }
    .sb[aria-pressed="true"] { background: #222; }
  `,
  html: `
    <div class="stage">
      <span class="where">Anywhere</span>
      <button class="sb" type="button" aria-pressed="false" aria-label="Search">
        <svg viewBox="0 0 32 32"><path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"/></svg>
        <span class="lbl">Search</span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.sb');
    const w = root.querySelector('.where');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on);
      w.textContent = on ? 'Searching…' : 'Anywhere';
    });
  },
};
