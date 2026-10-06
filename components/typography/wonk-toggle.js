export default {
  id: 'ty-wonk-toggle',
  credit: 'Fraunces WONK + SOFT axes — click toggles the word from crisp to wonky-soft (Undercase Type specimen demo)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      background: #f4ecd8;
      border-radius: 12px;
      padding: 18px 24px;
    }
    .btn {
      cursor: pointer;
      background: transparent;
      border: 0;
      padding: 4px 8px;
      color: #2b1d0e;
      font: 600 44px/1 Fraunces, 'Playfair Display', Georgia, serif; display: inline-grid;
      font-variation-settings: 'opsz' 144, 'SOFT' 0, 'WONK' 0; transition: font-variation-settings .6s cubic-bezier(.34, 1.3, .64, 1), color .4s;
    }
    .btn > span { grid-area: 1 / 1; white-space: nowrap; }
    .btn .g { visibility: hidden; font-variation-settings: 'opsz' 144, 'SOFT' 100, 'WONK' 1, 'wght' 900; }
    .btn:hover { font-variation-settings: 'opsz' 144, 'SOFT' 50, 'WONK' 0; }
    .btn.on {
      font-variation-settings: 'opsz' 144, 'SOFT' 100, 'WONK' 1;
      color: #9a3412;
      font-style: italic;
    }
    .btn:active .v { transform: scale(.97); }
    .btn .v { display: inline-block; transition: transform .15s; }
    .btn:focus-visible {
      outline: 2px dashed #9a3412;
      outline-offset: 4px;
      border-radius: 6px;
    }
    .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #2b1d0e;
      margin-left: 10px;
      vertical-align: middle;
      transition: background .3s, transform .3s;
    }
    .btn.on .dot {
      background: #9a3412;
      transform: scale(1.5) rotate(20deg);
      border-radius: 30% 70% 60% 40%;
    }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false"><span class="g" aria-hidden="true">Wonky<i class="dot"></i></span><span class="v">Wonky<i class="dot" aria-hidden="true"></i></span></button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
