export default {
  id: 'ty-swiss-grid',
  credit: 'Swiss / International Style button — tight-tracked Inter on a hairline grid with a single red dot that travels across on hover (Müller-Brockmann poster grammar)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      cursor: pointer;
      width: 220px;
      height: 110px;
      background: #f7f7f2;
      border: 1px solid #111;
      border-radius: 0;
      padding: 0;
      position: relative;
      overflow: hidden;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(2, 1fr);
      text-align: left;
      color: #111;
      background-image: linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px);
      background-size: 100% 55px, 55px 100%;
      background-position: 0 -1px, -1px 0;
      background-repeat: repeat;
      transition: background-color .3s, color .3s;
    }
    .btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: #f7f7f2;
      opacity: .88;
      transition: opacity .3s;
    }
    .btn:hover::before { opacity: .96; }
    .btn.on { background-color: #111; color: #f7f7f2; }
    .btn.on::before { background: #111; }
    .t {
      position: absolute;
      left: 12px;
      top: 10px;
      font: 700 34px/.95 Inter, Helvetica, Arial, sans-serif;
      letter-spacing: -.06em;
    }
    .s {
      position: absolute;
      left: 12px;
      bottom: 10px;
      font: 500 11px/1 Inter, Helvetica, Arial, sans-serif;
      letter-spacing: .02em;
      text-transform: uppercase;
      display: inline-grid;
    }
    .s > span {
      grid-area: 1 / 1;
      white-space: nowrap;
      transition: opacity .25s, transform .3s;
    }
    .s .b { opacity: 0; transform: translateY(6px); }
    .btn:hover .s .a, .btn.on .s .a { opacity: 0; transform: translateY(-6px); }
    .btn:hover .s .b, .btn.on .s .b { opacity: 1; transform: translateY(0); }
    .dot {
      position: absolute;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #e3241b;
      right: 14px;
      top: 14px;
      transition: transform .5s cubic-bezier(.76, 0, .24, 1), width .3s, height .3s;
    }
    .btn:hover .dot { transform: translate(-110px, 56px); }
    .btn.on .dot { transform: translate(-110px, 56px) scale(1.4); }
    .btn:active .dot { transform: translate(-110px, 56px) scale(.6); }
    .btn:focus-visible { outline: 2px solid #e3241b; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false"><span class="t">Grid<br>System</span><span class="s"><span class="a">Zürich 1961</span><span class="b" aria-hidden="true">Basel 1963</span></span><i class="dot" aria-hidden="true"></i></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
