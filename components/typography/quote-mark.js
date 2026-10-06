export default {
  id: 'ty-quote-mark',
  credit: 'Oversized quotation-mark toggle — an Instrument Serif “ fills the button; click and it swings round into a closing ” (editorial pull-quote UI)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .btn {
      cursor: pointer;
      width: 96px;
      height: 96px;
      border-radius: 50%;
      border: 1.5px solid #1c1917;
      background: #fff;
      color: #1c1917;
      display: grid;
      place-items: center;
      position: relative;
      overflow: hidden;
      padding: 0;
      transition: background .35s, color .35s, transform .2s cubic-bezier(.34, 1.56, .64, 1);
    }
    .btn:hover { transform: scale(1.05); }
    .btn:active { transform: scale(.95); }
    .btn:hover, .btn.on { background: #1c1917; color: #fff; }
    .btn:focus-visible { outline: 2px solid #1c1917; outline-offset: 4px; }
    .q {
      grid-area: 1 / 1;
      font: 400 140px/1 'Instrument Serif', 'Playfair Display', Georgia, serif;
      font-style: italic;
      height: 1em;
      display: block;
      transform: translateY(.1em);
      transition: transform .55s cubic-bezier(.34, 1.3, .64, 1), opacity .3s;
    }
    .q.c { opacity: 0; transform: translateY(.1em) rotate(180deg) translateY(.42em); }
    .btn.on .q.o { opacity: 0; transform: translateY(.1em) rotate(-180deg) translateY(.42em); }
    .btn.on .q.c { opacity: 1; transform: translateY(.1em) rotate(0) translateY(0); }
    .ring {
      position: absolute;
      inset: 4px;
      border-radius: 50%;
      border: 1px dashed currentColor;
      opacity: 0;
      transform: rotate(0);
      transition: opacity .3s, transform .6s;
    }
    .btn:hover .ring { opacity: .6; transform: rotate(45deg); }
    .btn.on .ring { opacity: .6; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="Quote"><span class="q o" aria-hidden="true">“</span><span class="q c" aria-hidden="true">”</span><i class="ring" aria-hidden="true"></i></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
