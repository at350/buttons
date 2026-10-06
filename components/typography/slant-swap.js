export default {
  id: 'ty-slant-swap',
  credit: 'Slant-axis link — Roboto Flex slnt 0→-10 leans the whole word on hover, with the Lucide arrow sliding and leaning in step (Google Fonts "Knowledge" article style)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .lnk {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 8px 8px 4px;
      cursor: pointer;
      text-decoration: none;
      font: 500 24px/1.1 'Roboto Flex', Inter, system-ui, sans-serif; color: #111;
    }
    .lnk .t {
      display: inline-grid; font-variation-settings: 'slnt' 0, 'wght' 500;
      transition: font-variation-settings .4s cubic-bezier(.2, .8, .2, 1), color .3s;
    }
    .lnk .t > span { grid-area: 1 / 1; white-space: nowrap; }
    .lnk .t .g { visibility: hidden; font-variation-settings: 'slnt' -10, 'wght' 800; }
    .lnk:hover .t, .lnk:focus-visible .t { font-variation-settings: 'slnt' -10, 'wght' 800; color: #7c3aed; }
    .lnk .ar {
      flex: none;
      width: 22px;
      height: 22px;
      stroke: currentColor;
      transition: transform .4s cubic-bezier(.34, 1.56, .64, 1), stroke .3s;
    }
    .lnk:hover .ar, .lnk:focus-visible .ar, .lnk.on .ar { transform: translateX(4px) skewX(-10deg); stroke: #7c3aed; }
    .lnk.on .t { font-variation-settings: 'slnt' -10, 'wght' 800; color: #7c3aed; }
    .lnk.on .t .v {
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 5px;
    }
    .lnk:focus-visible {
      outline: 2px solid #7c3aed;
      outline-offset: 4px;
      border-radius: 4px;
    }
  `,
  html: `<a class="lnk" href="#"><span class="t"><span class="g" aria-hidden="true">Lean in</span><span class="v">Lean in</span></span><svg class="ar" viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a>`,
  init(root) {
    const a = root.querySelector('.lnk');
    a.addEventListener('click', (e) => { e.preventDefault(); a.classList.toggle('on'); });
  },
};
