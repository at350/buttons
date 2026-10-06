export default {
  id: 'cr-jelly',
  credit: 'Squishy jelly button — animate.css "rubberBand" (scale3d 1.25/.75 → .75/1.25 → settle) on click, squash on press',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { padding: 14px 24px 16px; }
    .btn {
      display: block; cursor: pointer; border: 0; border-radius: 999px; padding: 18px 36px;
      background: linear-gradient(180deg, #ff86b8, #ff3d81); color: #fff;
      font: 800 17px/1 'DM Sans', system-ui, sans-serif; letter-spacing: .01em;
      box-shadow: 0 8px 18px rgba(255, 61, 129, .35), inset 0 -4px 0 rgba(0, 0, 0, .14), inset 0 2px 0 rgba(255, 255, 255, .4);
      transition: transform .4s cubic-bezier(.34, 1.56, .64, 1);
    }
    .btn:hover { transform: scale(1.04, .97); }
    .btn:active { transform: scale(1.1, .86); transition-duration: .12s; }
    .btn.wobble { animation: rubber .9s both; }
    .btn:focus-visible { outline: 3px solid #ff3d81; outline-offset: 4px; }
    @keyframes rubber {
      0% { transform: scale3d(1, 1, 1); }
      30% { transform: scale3d(1.25, .75, 1); }
      40% { transform: scale3d(.75, 1.25, 1); }
      50% { transform: scale3d(1.15, .85, 1); }
      65% { transform: scale3d(.95, 1.05, 1); }
      75% { transform: scale3d(1.05, .95, 1); }
      100% { transform: scale3d(1, 1, 1); }
    }
  `,
  html: `<div class="wrap"><button class="btn" type="button">Boing!</button></div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => { b.classList.remove('wobble'); void b.offsetWidth; b.classList.add('wobble'); });
    b.addEventListener('animationend', () => b.classList.remove('wobble'));
  },
};
