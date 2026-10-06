export default {
  id: 'ty-handdrawn-underline',
  credit: 'Hand-drawn underline — a wobbly marker stroke (inline SVG, stroke-dashoffset) scribbles itself under the link on hover and stays when clicked (Notion / Basecamp marketing links)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .lnk {
      display: inline-block;
      position: relative;
      padding: 6px 2px 10px;
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
      left: -4px;
      right: -4px;
      bottom: -2px;
      height: 16px;
      width: calc(100% + 8px);
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
      opacity: .9;
      transition: stroke-dashoffset .55s cubic-bezier(.4, 0, .2, 1);
    }
    .scrib path.second {
      stroke-dashoffset: 1;
      transition-delay: 0s;
      stroke-width: 2.5;
    }
    .lnk:hover .scrib path, .lnk:focus-visible .scrib path, .lnk.on .scrib path { stroke-dashoffset: 0; }
    .lnk:hover .scrib path.second, .lnk:focus-visible .scrib path.second, .lnk.on .scrib path.second { transition-delay: .3s; }
    .lnk.on .scrib path { stroke: #16a34a; }
    .lnk .ital { font-style: italic; transition: letter-spacing .3s; }
    .lnk:active .scrib path { stroke-dashoffset: .5; }
  `,
  html: `<a class="lnk" href="#">Mark <span class="ital">this</span> up<svg class="scrib" viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M3 9 C 30 4, 60 12, 95 7 S 160 3, 197 9"/><path class="second" pathLength="1" d="M8 13 C 50 9, 90 14, 130 10 S 175 8, 192 12"/></svg></a>`,
  init(root) {
    const a = root.querySelector('.lnk');
    a.addEventListener('click', (e) => { e.preventDefault(); a.classList.toggle('on'); });
  },
};
