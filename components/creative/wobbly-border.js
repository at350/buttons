export default {
  id: 'cr-wobbly-border',
  credit: 'Hand-drawn wobbly button — asymmetric border-radius sketch look (Tiffany Rayside, CodePen)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      cursor: pointer; background: #fff; color: #41403e; padding: 16px 32px;
      font: 700 18px/1 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', cursive; letter-spacing: .02em;
      border: 3px solid #41403e;
      border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
      box-shadow: 20px 38px 34px -26px rgba(0, 0, 0, .2);
      transition: border-radius .35s cubic-bezier(.34, 1.4, .64, 1), transform .25s, box-shadow .25s, background .25s;
    }
    .btn:hover { border-radius: 15px 225px 15px 255px / 225px 15px 255px 15px; transform: rotate(-1.5deg); box-shadow: 2px 8px 8px -5px rgba(0, 0, 0, .3); }
    .btn:active { transform: rotate(1deg) scale(.97); }
    .btn[aria-pressed="true"] { background: #fde68a; border-style: dashed; }
    .btn:focus-visible { outline: 3px dotted #41403e; outline-offset: 5px; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false">Sketchy</button>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
