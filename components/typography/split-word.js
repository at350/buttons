export default {
  id: 'ty-split-word',
  credit: 'Sliced word — the label is cut horizontally by two clip-paths; on hover the top half slides left and the bottom half right, like a misregistered print (Codrops "sliced text" hover)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      cursor: pointer;
      background: #111;
      color: #fafafa;
      border: 0;
      border-radius: 6px;
      padding: 18px 34px;
      display: inline-grid;
      overflow: hidden;
      font: 800 40px/1 'Bricolage Grotesque', 'Space Grotesk', system-ui, sans-serif;
      letter-spacing: -.02em;
      font-variation-settings: 'opsz' 96, 'wdth' 90;
      transition: background .3s;
    }
    .btn:hover { background: #1e1e1e; }
    .btn.on { background: #f43f5e; }
    .btn:focus-visible { outline: 2px solid #f43f5e; outline-offset: 3px; }
    .btn > span {
      grid-area: 1 / 1;
      white-space: nowrap;
      display: inline-block;
      transition: transform .45s cubic-bezier(.76, 0, .24, 1), color .3s;
    }
    .top { clip-path: inset(0 0 50% 0); }
    .bot { clip-path: inset(50% 0 0 0); }
    .btn:hover .top, .btn:focus-visible .top { transform: translateX(-8px); }
    .btn:hover .bot, .btn:focus-visible .bot { transform: translateX(8px); }
    .btn.on .top { transform: translateX(-8px) translateY(-2px); color: #111; }
    .btn.on .bot { transform: translateX(8px) translateY(2px); }
    .btn:active .top { transform: translateX(-16px); }
    .btn:active .bot { transform: translateX(16px); }
    .btn .cut {
      grid-area: 1 / 1;
      align-self: center;
      height: 1px;
      width: 100%;
      background: currentColor;
      opacity: 0;
      transform: scaleX(0);
      transition: opacity .2s, transform .45s cubic-bezier(.76, 0, .24, 1);
    }
    .btn:hover .cut, .btn.on .cut { opacity: .6; transform: scaleX(1.3); }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="Slice"><span class="top" aria-hidden="true">Slice</span><span class="bot" aria-hidden="true">Slice</span><i class="cut" aria-hidden="true"></i></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
