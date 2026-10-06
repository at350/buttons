export default {
  id: 'ty-font-switcher',
  credit: 'Typeface cycler — one label, three stacked faces (Inter / Fraunces / JetBrains Mono); each click crossfades to the next with a small-caps tag that re-labels itself (type foundry specimen switcher)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      cursor: pointer;
      background: #fff;
      border: 1.5px solid #111;
      border-radius: 10px;
      padding: 14px 20px 12px;
      color: #111;
      display: grid;
      grid-template-rows: auto auto;
      row-gap: 8px;
      justify-items: start;
      text-align: left;
      transition: box-shadow .2s, transform .15s;
      box-shadow: 4px 4px 0 #111;
    }
    .btn:hover { transform: translate(-1px, -1px); box-shadow: 5px 5px 0 #111; }
    .btn:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 #111; }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 4px; }
    .lab {
      display: inline-grid;
      font-size: 34px;
      line-height: 1;
    }
    .lab > span {
      grid-area: 1 / 1;
      white-space: nowrap;
      opacity: 0;
      transform: translateY(6px) scale(.98);
      transition: opacity .35s, transform .45s cubic-bezier(.2, .8, .2, 1);
    }
    .lab .f0 { font: 700 34px/1 Inter, system-ui, sans-serif; letter-spacing: -.03em; }
    .lab .f1 {
      font: 500 34px/1 Fraunces, Georgia, serif;
      font-variation-settings: 'opsz' 48, 'SOFT' 60, 'WONK' 1;
      font-style: italic;
      letter-spacing: -.01em;
    }
    .lab .f2 { font: 500 30px/1.13 'JetBrains Mono', ui-monospace, monospace; letter-spacing: -.04em; }
    .btn[data-f="0"] .f0, .btn[data-f="1"] .f1, .btn[data-f="2"] .f2 { opacity: 1; transform: none; }
    .tag {
      display: inline-grid;
      font: 600 10px/1 Inter, system-ui, sans-serif;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: #737373;
    }
    .tag > span {
      grid-area: 1 / 1;
      opacity: 0;
      transition: opacity .3s;
    }
    .btn[data-f="0"] .t0, .btn[data-f="1"] .t1, .btn[data-f="2"] .t2 { opacity: 1; }
    .btn:hover .tag { color: #111; }
  `,
  html: `<button class="btn" type="button" data-f="0"><span class="lab"><span class="f0">Typeface</span><span class="f1" aria-hidden="true">Typeface</span><span class="f2" aria-hidden="true">Typeface</span></span><span class="tag" aria-hidden="true"><span class="t0">Grotesk</span><span class="t1">Serif</span><span class="t2">Mono</span></span></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      btn.dataset.f = String((Number(btn.dataset.f) + 1) % 3);
    });
  },
};
