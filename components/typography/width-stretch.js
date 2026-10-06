export default {
  id: 'ty-width-stretch',
  credit: 'Roboto Flex width axis — label stretches wdth 25→151 while pressed, snaps back on release (v-fonts.com demo style)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .btn {
      cursor: pointer;
      background: #1d4ed8;
      color: #fff;
      border: 0;
      border-radius: 8px;
      padding: 14px 22px;
      font: 700 26px/1 'Roboto Flex', Inter, system-ui, sans-serif; text-transform: uppercase;
      display: inline-grid;
      place-items: center;
      user-select: none;
      transition: background .2s;
    }
    .btn > span { grid-area: 1 / 1; white-space: nowrap; }
    .g { visibility: hidden; font-variation-settings: 'wdth' 151, 'wght' 900; }
    .v {
      font-variation-settings: 'wdth' 25, 'wght' 700;
      transition: font-variation-settings .55s cubic-bezier(.34, 1.4, .64, 1);
    }
    .btn:hover .v { font-variation-settings: 'wdth' 90, 'wght' 700; }
    .btn:active .v, .btn.on .v { font-variation-settings: 'wdth' 151, 'wght' 900; transition-duration: .25s; }
    .btn:hover { background: #1e40af; }
    .btn.on { background: #0f172a; }
    .btn:focus-visible { outline: 2px solid #1d4ed8; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false"><span class="g" aria-hidden="true">Stretch</span><span class="v">Stretch</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
