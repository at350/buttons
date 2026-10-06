export default {
  id: 'cr-brutalist-button',
  credit: 'Neo-brutalism — Gumroad "I want this!" hard-offset shadow button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      font: 700 16px/1 system-ui, sans-serif; color: #000; cursor: pointer;
      background: #ff90e8; border: 3px solid #000; border-radius: 6px; padding: 16px 28px;
      box-shadow: 6px 6px 0 #000;
      transition: transform .1s ease, box-shadow .1s ease, background .15s;
    }
    .btn:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 #000; background: #ffa6ee; }
    .btn:active { transform: translate(6px, 6px); box-shadow: 0 0 0 #000; }
    .btn[aria-pressed="true"] { background: #23a094; color: #fff; }
    .btn:focus-visible { outline: 3px dashed #000; outline-offset: 4px; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false">I want this!</button>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
