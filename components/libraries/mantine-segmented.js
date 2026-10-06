export default {
  id: 'lb-mantine-segmented',
  credit: 'Mantine v7 — SegmentedControl: gray.1 track, white indicator with a soft shadow that slides between React / Angular / Vue / Svelte',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sc { position: relative; display: inline-grid; grid-auto-flow: column; grid-auto-columns: 1fr; padding: 4px; border-radius: 4px; background: #f1f3f5; font: 500 14px/1 Inter, -apple-system, "Segoe UI", system-ui, sans-serif; }
    .ind { position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc((100% - 8px) / 4); transform: translateX(calc(var(--i, 0) * 100%)); border-radius: 4px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.05), 0 1px 2px rgba(0,0,0,.1); transition: transform .2s ease, width .2s ease; z-index: 0; }
    .it { position: relative; z-index: 1; height: 32px; padding: 0 16px; border: 0; background: transparent; color: #495057; font: inherit; cursor: pointer; border-radius: 4px; white-space: nowrap; transition: color .2s; -webkit-tap-highlight-color: transparent; }
    .it:hover { color: #000; }
    .it[aria-checked="true"] { color: #000; cursor: default; }
    .it:focus-visible { outline: 2px solid #228be6; outline-offset: -2px; }
  `,
  html: `
    <div class="sc" role="radiogroup" aria-label="Framework">
      <span class="ind"></span>
      <button class="it" type="button" role="radio" aria-checked="true">React</button>
      <button class="it" type="button" role="radio" aria-checked="false">Angular</button>
      <button class="it" type="button" role="radio" aria-checked="false">Vue</button>
      <button class="it" type="button" role="radio" aria-checked="false">Svelte</button>
    </div>`,
  init(root) {
    const sc = root.querySelector('.sc'), items = [...root.querySelectorAll('.it')];
    const pick = (b) => { items.forEach((x) => x.setAttribute('aria-checked', x === b)); sc.style.setProperty('--i', items.indexOf(b)); };
    items.forEach((b, i) => {
      b.addEventListener('click', () => pick(b));
      b.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (d) { e.preventDefault(); const n = items[(i + d + items.length) % items.length]; pick(n); n.focus({ preventScroll: true }); }
      });
    });
  },
};
