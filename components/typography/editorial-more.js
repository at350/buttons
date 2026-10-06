export default {
  id: 'ty-editorial-more',
  credit: 'Editorial "Read more" — Playfair Display roman that crossfades into its italic with a Lucide move-right arrow whose shaft stretches (NYT Magazine / The Atlantic link treatment)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .stage {
      background: #fbf8f1;
      border-radius: 12px;
      padding: 20px 26px;
    }
    .lnk {
      display: inline-flex;
      align-items: baseline;
      gap: 14px;
      cursor: pointer;
      text-decoration: none;
      color: #1a1a1a;
      font: 500 28px/1.1 'Playfair Display', Georgia, serif; letter-spacing: -.01em;
    }
    .t { display: inline-grid; }
    .t > span {
      grid-area: 1 / 1;
      white-space: nowrap;
      transition: opacity .35s, transform .35s cubic-bezier(.2, .8, .2, 1);
    }
    .t .r { font-style: normal; }
    .t .i {
      font-style: italic;
      font-weight: 600;
      color: #8b1d1d;
      opacity: 0;
      transform: translateY(.25em);
    }
    .lnk:hover .t .r, .lnk:focus-visible .t .r, .lnk.on .t .r { opacity: 0; transform: translateY(-.25em); }
    .lnk:hover .t .i, .lnk:focus-visible .t .i, .lnk.on .t .i { opacity: 1; transform: translateY(0); }
    .ar { width: 50px; height: 24px; overflow: visible; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; transform: translateY(.17em); transition: color .35s; }
    .ar path { vector-effect: non-scaling-stroke; transition: transform .45s cubic-bezier(.76, 0, .24, 1); }
    .ar .sh { transform-box: fill-box; transform-origin: left center; }
    .lnk:hover .ar, .lnk:focus-visible .ar, .lnk.on .ar { color: #8b1d1d; }
    .lnk:hover .ar .sh, .lnk:focus-visible .ar .sh, .lnk.on .ar .sh { transform: scaleX(2.1); }
    .lnk:hover .ar .hd, .lnk:focus-visible .ar .hd, .lnk.on .ar .hd { transform: translateX(22px); }
    .lnk:active .ar .hd { transform: translateX(25px); }
    .lnk:active .ar .sh { transform: scaleX(2.25); }
    .lnk:focus-visible { outline: 1.5px solid #1a1a1a; outline-offset: 6px; }
  `,
  html: `<div class="stage"><a class="lnk" href="#"><span class="t"><span class="r">Read more</span><span class="i" aria-hidden="true">Read more</span></span><svg class="ar" viewBox="0 0 50 24" aria-hidden="true"><path class="sh" d="M2 12H22"/><path class="hd" d="M18 8L22 12L18 16"/></svg></a></div>`,
  init(root) {
    const a = root.querySelector('.lnk');
    a.addEventListener('click', (e) => { e.preventDefault(); a.classList.toggle('on'); });
  },
};
