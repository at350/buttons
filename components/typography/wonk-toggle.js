export default {
  id: 'ty-wonk-toggle',
  credit: 'Fraunces WONK + SOFT axes — hover softens the terminals (SOFT 0→50), click turns on the wonky leaning n/h/k forms and full SOFT 100 at a true 44pt optical size, no faux italic (Undercase Type Fraunces specimen)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .stage {
      background: #f4ecd8;
      border-radius: 12px;
      padding: 16px 22px;
    }
    .btn {
      cursor: pointer;
      background: transparent;
      border: 0;
      padding: 4px 8px 8px;
      color: #2b1d0e;
      font: 600 44px/1 Fraunces, 'Playfair Display', Georgia, serif;
      letter-spacing: -.01em;
      display: inline-grid;
      transition: color .4s;
    }
    .btn > span { grid-area: 1 / 1; white-space: nowrap; }
    .btn .g { visibility: hidden; font-variation-settings: 'opsz' 44, 'wght' 650, 'SOFT' 100, 'WONK' 1; }
    .btn .v {
      display: inline-block;
      font-variation-settings: 'opsz' 44, 'wght' 600, 'SOFT' 0, 'WONK' 0;
      transition: font-variation-settings .6s cubic-bezier(.34, 1.3, .64, 1), transform .15s;
    }
    .btn:hover .v, .btn:focus-visible .v { font-variation-settings: 'opsz' 44, 'wght' 600, 'SOFT' 50, 'WONK' 0; }
    .btn.on { color: #9a3412; }
    .btn.on .v, .btn.on:hover .v { font-variation-settings: 'opsz' 44, 'wght' 650, 'SOFT' 100, 'WONK' 1; }
    .btn:active .v { transform: scale(.97); }
    .btn:focus-visible { outline: 2px dashed #9a3412; outline-offset: 4px; border-radius: 6px; }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false"><span class="g" aria-hidden="true">Unhinged</span><span class="v">Unhinged</span></button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
