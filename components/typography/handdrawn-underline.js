export default {
  id: 'ty-handdrawn-underline',
  credit: 'Hand-drawn underline — a wobbly marker stroke (inline SVG, stroke-dashoffset) scribbles itself under the link on hover and stays when clicked (Notion / Basecamp marketing links)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .lnk {
      display: inline-block;
      position: relative;
      padding: 6px 8px 14px;
      cursor: pointer;
      text-decoration: none;
      color: #1a1a1a;
      font: 400 30px/1.1 'Instrument Serif', 'Playfair Display', Georgia, serif;
      letter-spacing: -.01em;
      transition: color .3s;
    }
    .lnk:hover, .lnk.on { color: #0f172a; }
    .lnk:focus-visible {
      outline: 2px solid #f59e0b;
      outline-offset: 4px;
      border-radius: 4px;
    }
    .scrib {
      position: absolute;
      left: 4px;
      bottom: 0;
      height: 16px;
      width: calc(100% - 8px);
      overflow: visible;
      pointer-events: none;
    }
    .scrib path {
      fill: none;
      stroke: #f59e0b;
      stroke-width: 3.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      opacity: 0;
      transition: stroke-dashoffset .55s cubic-bezier(.4, 0, .2, 1), stroke .3s, opacity 0s linear .55s;
    }
    .scrib path.second {
      stroke-width: 2.5;
    }
    .lnk:hover .scrib path, .lnk:focus-visible .scrib path, .lnk.on .scrib path { stroke-dashoffset: 0; opacity: .9; transition: stroke-dashoffset .55s cubic-bezier(.4, 0, .2, 1), stroke .3s, opacity 0s; }
    .lnk:hover .scrib path.second, .lnk:focus-visible .scrib path.second, .lnk.on .scrib path.second { transition: stroke-dashoffset .45s cubic-bezier(.4, 0, .2, 1) .3s, stroke .3s, opacity 0s .3s; }
    .lnk.on .scrib path { stroke: #16a34a; }
    .lnk .ital { font-style: italic; }
    .lnk:active .scrib { transform: scaleY(.7); transform-origin: 50% 40%; }
    .scrib { transition: transform .15s; }
  `,
  html: `<a class="lnk" href="#">Mark <span class="ital">this</span> up<svg class="scrib" viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M3 9 C 30 4, 60 12, 95 7 S 160 3, 197 9"/><path class="second" pathLength="1" d="M8 13 C 50 9, 90 14, 130 10 S 175 8, 192 12"/></svg></a>`,
  init(root) {
    const a = root.querySelector('.lnk');
    a.addEventListener('click', (e) => { e.preventDefault(); a.classList.toggle('on'); });
  },
};
