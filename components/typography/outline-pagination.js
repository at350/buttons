export default {
  id: 'ty-outline-pagination',
  credit: 'Outlined numeral pagination — big Playfair Display figures drawn in hairline text-stroke; the current page fills solid and the fill slides between numbers (editorial magazine pagers)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .pg { display: inline-flex; align-items: flex-end; gap: 6px; padding: 6px 4px; }
    .n {
      cursor: pointer; background: transparent; border: 0; padding: 4px 8px 0; min-width: 44px; color: transparent;
      font: 700 40px/1 'Playfair Display', Georgia, serif; -webkit-text-stroke: 1.2px #111; font-variant-numeric: lining-nums;
      display: inline-grid; position: relative; transition: transform .3s cubic-bezier(.34, 1.56, .64, 1);
    }
    .n > span { grid-area: 1 / 1; }
    .n .f { color: #111; -webkit-text-stroke: 0; clip-path: inset(100% 0 0 0); transition: clip-path .4s cubic-bezier(.76, 0, .24, 1); }
    .n:hover { transform: translateY(-4px); }
    .n:hover .f { clip-path: inset(55% 0 0 0); }
    .n[aria-current=page] .f { clip-path: inset(0 0 0 0); }
    .n[aria-current=page] { transform: translateY(-6px); }
    .n::after { content: ''; position: absolute; left: 8px; right: 8px; bottom: -8px; height: 2px; background: #111; transform: scaleX(0); transition: transform .3s; }
    .n[aria-current=page]::after { transform: scaleX(1); }
    .n:active { transform: translateY(0) scale(.95); }
    .n:focus-visible { outline: 2px solid #111; outline-offset: 4px; border-radius: 4px; }
    .dots { font: 700 40px/1 'Playfair Display', Georgia, serif; color: #111; padding: 0 2px 4px; letter-spacing: .1em; align-self: center; }
  `,
  html: `<nav class="pg" aria-label="Pages">
    <button class="n" type="button" aria-current="page"><span class="o" aria-hidden="true">1</span><span class="f">1</span></button>
    <button class="n" type="button"><span class="o" aria-hidden="true">2</span><span class="f">2</span></button>
    <button class="n" type="button"><span class="o" aria-hidden="true">3</span><span class="f">3</span></button>
    <span class="dots" aria-hidden="true">…</span>
    <button class="n" type="button"><span class="o" aria-hidden="true">12</span><span class="f">12</span></button>
  </nav>`,
  init(root) {
    const ns = [...root.querySelectorAll('.n')];
    for (const n of ns) {
      n.addEventListener('click', () => {
        for (const o of ns) o.removeAttribute('aria-current');
        n.setAttribute('aria-current', 'page');
      });
    }
  },
};
