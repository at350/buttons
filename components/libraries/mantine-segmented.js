export default {
  id: 'lb-mantine-segmented',
  credit: 'Mantine — SegmentedControl from the docs (React / Angular / Vue / Svelte): gray.1 root with 4px padding, white floating indicator gliding 200ms ease, gray.7 labels turning black when active',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sc { position: relative; display: inline-flex; padding: 4px; border-radius: 8px; background: #f1f3f5; overflow: hidden; font: 600 14px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    .ind { position: absolute; z-index: 1; top: 4px; bottom: 4px; left: 0; width: var(--w, 0); transform: translateX(var(--x, 0)); border-radius: 4px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.05), 0 1px 2px rgba(0,0,0,.1); transition: transform .2s ease, width .2s ease; }
    .it { position: relative; z-index: 2; flex: 1; padding: 3px 10px; border: 0; border-radius: 4px; background: transparent; color: #495057; font: inherit; cursor: pointer; white-space: nowrap; transition: color .2s ease; -webkit-tap-highlight-color: transparent; }
    .it:hover { color: #000; }
    .it[aria-checked="true"] { color: #000; }
    .it:focus-visible { outline: 2px solid #228be6; outline-offset: 0; }
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
    const sc = root.querySelector('.sc'), ind = root.querySelector('.ind'), items = [...root.querySelectorAll('.it')];
    const place = (b) => { ind.style.setProperty('--w', b.offsetWidth + 'px'); ind.style.setProperty('--x', b.offsetLeft + 'px'); };
    const pick = (b) => { items.forEach((x) => x.setAttribute('aria-checked', x === b)); place(b); };
    items.forEach((b, i) => {
      b.addEventListener('click', () => pick(b));
      b.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (d) { e.preventDefault(); const n = items[(i + d + items.length) % items.length]; pick(n); n.focus({ preventScroll: true }); }
      });
    });
    ind.style.transition = 'none'; place(items[0]); void ind.offsetWidth; ind.style.transition = '';
    const ro = new ResizeObserver(() => place(items.find((x) => x.getAttribute('aria-checked') === 'true')));
    ro.observe(sc);
    return () => ro.disconnect();
  },
};
