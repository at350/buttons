export default {
  id: 'ty-editorial-more',
  credit: 'Editorial "Read more" — Playfair Display roman that crossfades into its italic with an arrow that stretches (NYT Magazine / The Atlantic link treatment)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      background: #fbf8f1;
      border-radius: 12px;
      padding: 20px 26px;
      border-bottom: 3px double #1a1a1a;
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
    .ar {
      display: inline-flex;
      align-items: center;
      width: 44px;
      height: 14px;
      position: relative;
    }
    .ar .ln {
      position: absolute;
      left: 0;
      top: 6px;
      height: 1.5px;
      width: 20px;
      background: currentColor;
      transform-origin: left;
      transition: transform .45s cubic-bezier(.76, 0, .24, 1), background .35s;
    }
    .ar .hd {
      position: absolute;
      left: 14px;
      top: 1.5px;
      width: 11px;
      height: 11px;
      border-top: 1.5px solid currentColor;
      border-right: 1.5px solid currentColor;
      transform: rotate(45deg);
      transition: transform .45s cubic-bezier(.76, 0, .24, 1), border-color .35s;
    }
    .lnk:hover .ar .ln, .lnk:focus-visible .ar .ln, .lnk.on .ar .ln { transform: scaleX(2); background: #8b1d1d; }
    .lnk:hover .ar .hd, .lnk:focus-visible .ar .hd, .lnk.on .ar .hd { transform: translateX(20px) rotate(45deg); border-color: #8b1d1d; }
    .lnk:active .ar .hd { transform: translateX(24px) rotate(45deg); }
    .lnk:focus-visible { outline: 1.5px solid #1a1a1a; outline-offset: 6px; }
  `,
  html: `<div class="stage"><a class="lnk" href="#"><span class="t"><span class="r">Read more</span><span class="i" aria-hidden="true">Read more</span></span><span class="ar" aria-hidden="true"><i class="ln"></i><i class="hd"></i></span></a></div>`,
  init(root) {
    const a = root.querySelector('.lnk');
    a.addEventListener('click', (e) => { e.preventDefault(); a.classList.toggle('on'); });
  },
};
