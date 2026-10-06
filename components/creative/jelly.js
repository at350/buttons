export default {
  id: 'cr-jelly',
  credit: 'Squishy jelly button — overshooting scaleX/scaleY bounce keyframes (animate.css "jello" lineage)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      cursor: pointer; border: 0; border-radius: 999px; padding: 18px 40px;
      background: linear-gradient(145deg, #ff7eb3, #ff3d81); color: #fff;
      font: 800 17px/1 system-ui, sans-serif; letter-spacing: .03em;
      box-shadow: 0 10px 24px rgba(255, 61, 129, .4), inset 0 -4px 0 rgba(0, 0, 0, .15), inset 0 2px 0 rgba(255, 255, 255, .35);
      transition: transform .25s cubic-bezier(.34, 1.56, .64, 1), box-shadow .25s; transform-origin: 50% 100%;
    }
    .btn:hover { transform: scale(1.06, .96); }
    .btn:active { transform: scale(1.12, .82); }
    .btn.wobble { animation: jelly .8s linear both; }
    .btn:focus-visible { outline: 3px solid #ff3d81; outline-offset: 4px; }
    @keyframes jelly {
      0% { transform: scale(1, 1); }
      15% { transform: scale(1.3, .7); }
      30% { transform: scale(.78, 1.22); }
      45% { transform: scale(1.14, .88); }
      60% { transform: scale(.94, 1.06); }
      75% { transform: scale(1.04, .97); }
      100% { transform: scale(1, 1); }
    }
  `,
  html: `<button class="btn" type="button">Boing</button>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => { b.classList.remove('wobble'); void b.offsetWidth; b.classList.add('wobble'); });
    b.addEventListener('animationend', () => b.classList.remove('wobble'));
  },
};
