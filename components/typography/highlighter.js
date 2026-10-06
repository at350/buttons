export default {
  id: 'ty-highlighter',
  credit: 'Marker highlight — a chunky, slightly skewed yellow highlighter stroke sweeps behind Instrument Serif text on hover, the Lucide highlighter riding its leading edge; click swaps the ink to pink (Medium / Notion highlight link)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .lnk {
      --ink: #fde047;
      display: inline-block;
      position: relative;
      padding: 6px 34px 6px 8px;
      cursor: pointer;
      text-decoration: none;
      color: #1c1917;
      isolation: isolate;
      font: 400 30px/1.15 'Instrument Serif', 'Playfair Display', Georgia, serif;
      letter-spacing: -.005em;
      white-space: nowrap;
    }
    .lnk.on { --ink: #f9a8d4; }
    .t { position: relative; z-index: 1; }
    .t em { font-style: italic; }
    .mk {
      position: absolute;
      left: 4px;
      right: 28px;
      top: 26%;
      height: 62%;
      z-index: 0;
      border-radius: 3px 10px 4px 9px / 10px 3px 9px 4px;
      background: var(--ink);
      transform: scaleX(0) skewX(-8deg);
      transform-origin: left center;
      transition: transform .5s cubic-bezier(.76, 0, .24, 1), background-color .3s;
    }
    .lnk:hover .mk, .lnk:focus-visible .mk, .lnk.on .mk { transform: scaleX(1) skewX(-8deg); }
    .lnk:active .mk { transform: scaleX(1) skewX(-8deg) scaleY(.82); transition-duration: .15s; }
    /* zero-height track the width of the text; the pen sits on its right end and the track slides with the stroke */
    .trk {
      position: absolute;
      left: 6px;
      right: 34px;
      top: 50%;
      height: 0;
      z-index: 2;
      transform: translateX(-100%);
      transition: transform .5s cubic-bezier(.76, 0, .24, 1);
      pointer-events: none;
    }
    .pen {
      position: absolute;
      left: 100%;
      top: -20px;
      width: 24px;
      height: 24px;
      fill: none;
      stroke: #1c1917;
      stroke-width: 1.75;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: 0;
      transform: rotate(8deg);
      transition: opacity .2s;
    }
    .pen .tip { fill: var(--ink); transition: fill .3s; }
    .lnk:hover .trk, .lnk:focus-visible .trk { transform: translateX(0); }
    .lnk:hover .pen, .lnk:focus-visible .pen { opacity: 1; }
    .lnk:focus-visible { outline: 2px solid #1c1917; outline-offset: 2px; border-radius: 4px; }
    @media (prefers-reduced-motion: reduce) { .mk, .trk { transition-duration: .01s; } }
  `,
  html: `<a class="lnk" href="#"><i class="mk" aria-hidden="true"></i><span class="t">Highlight <em>this line</em></span><span class="trk" aria-hidden="true"><svg class="pen" viewBox="0 0 24 24"><path class="tip" d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg></span></a>`,
  init(root) {
    const a = root.querySelector('.lnk');
    a.addEventListener('click', (e) => { e.preventDefault(); a.classList.toggle('on'); });
  },
};
