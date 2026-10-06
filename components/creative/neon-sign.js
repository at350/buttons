export default {
  id: 'cr-neon-sign',
  credit: 'Neon sign button — flickering tube text-shadow glow, CodePen "Neon Lights"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #0a0a12; padding: 30px 40px; border-radius: 12px; }
    .btn {
      --c: #ff2bd6; cursor: pointer; background: transparent;
      font: italic 700 28px/1 Georgia, 'Times New Roman', serif; letter-spacing: .06em;
      color: rgba(255, 43, 214, .55); border: 3px solid rgba(255, 43, 214, .5); border-radius: 12px;
      padding: 12px 30px; transition: color .25s, border-color .25s, box-shadow .25s, text-shadow .25s;
    }
    .btn:hover, .btn[aria-pressed="true"] {
      color: #fff; border-color: var(--c);
      text-shadow: 0 0 6px #fff, 0 0 14px var(--c), 0 0 32px var(--c), 0 0 60px var(--c);
      box-shadow: 0 0 10px var(--c), 0 0 30px rgba(255, 43, 214, .6), inset 0 0 14px rgba(255, 43, 214, .5);
    }
    .btn:hover:not([aria-pressed="true"]) { animation: flicker 1.6s linear infinite; }
    .btn:active { transform: scale(.98); }
    .btn:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
    @keyframes flicker {
      0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
      20%, 24%, 55% { opacity: .35; text-shadow: none; box-shadow: none; }
    }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false">Open</button></div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
