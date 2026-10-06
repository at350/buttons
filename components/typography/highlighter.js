export default {
  id: 'ty-highlighter',
  credit: 'Marker highlight — a chunky, slightly skewed yellow highlighter stroke sweeps behind Instrument Serif text on hover; click swaps the ink to pink (Medium / Notion highlight link)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .lnk {
      display: inline-block;
      position: relative;
      padding: 4px 6px;
      cursor: pointer;
      text-decoration: none;
      color: #1c1917;
      isolation: isolate;
      font: 400 30px/1.15 'Instrument Serif', 'Playfair Display', Georgia, serif; letter-spacing: -.005em;
    }
    .lnk .t { position: relative; z-index: 1; }
    .lnk .t em { font-style: italic; }
    .mk {
      position: absolute;
      left: 0;
      right: 0;
      top: 18%;
      height: 72%;
      z-index: 0;
      border-radius: 3px 10px 4px 9px / 10px 3px 9px 4px;
      background: var(--ink, #fde047);
      transform: scaleX(0) skewX(-8deg);
      transform-origin: left center;
      opacity: .95;
      transition: transform .45s cubic-bezier(.76, 0, .24, 1), background .3s;
    }
    .lnk:hover .mk, .lnk:focus-visible .mk, .lnk.on .mk { transform: scaleX(1) skewX(-8deg); }
    .lnk.on { --ink: #f9a8d4; }
    .lnk:active .mk { transform: scaleX(1) skewX(-8deg) scaleY(.8); }
    .lnk:focus-visible {
      outline: 2px solid #1c1917;
      outline-offset: 4px;
      border-radius: 4px;
    }
    .tip {
      position: absolute;
      right: -14px;
      top: 50%;
      width: 10px;
      height: 20px;
      background: var(--ink, #fde047);
      border: 1.5px solid #1c1917;
      border-radius: 2px 2px 5px 5px;
      transform: translate(-200px, -50%) rotate(-25deg);
      opacity: 0;
      transition: transform .45s cubic-bezier(.76, 0, .24, 1), opacity .2s;
      z-index: 2;
    }
    .lnk:hover .tip, .lnk:focus-visible .tip { transform: translate(0, -50%) rotate(-25deg); opacity: 1; }
  `,
  html: `<a class="lnk" href="#"><i class="mk" aria-hidden="true"></i><span class="t">Highlight <em>this line</em></span><i class="tip" aria-hidden="true"></i></a>`,
  init(root) {
    const a = root.querySelector('.lnk');
    a.addEventListener('click', (e) => { e.preventDefault(); a.classList.toggle('on'); });
  },
};
