export default {
  id: 'cr-neumorphic-button',
  credit: 'Neumorphism / Soft UI — Alexander Plyuto, neumorphism.io',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #e0e5ec; padding: 28px 36px; border-radius: 12px; }
    .btn {
      font: 600 15px/1 system-ui, sans-serif; color: #5b6478; letter-spacing: .03em;
      background: #e0e5ec; border: 0; border-radius: 16px; padding: 18px 36px; cursor: pointer;
      box-shadow: 9px 9px 18px #b8bec7, -9px -9px 18px #ffffff;
      transition: box-shadow .2s ease, transform .2s ease, color .2s;
    }
    .btn:hover { box-shadow: 12px 12px 24px #b8bec7, -12px -12px 24px #ffffff; transform: translateY(-1px); }
    .btn:active, .btn[aria-pressed="true"] {
      transform: translateY(0);
      box-shadow: inset 6px 6px 12px #b8bec7, inset -6px -6px 12px #ffffff;
      color: #3b7ddd;
    }
    .btn:focus-visible { outline: 2px solid #3b7ddd; outline-offset: 4px; }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false">Soft</button></div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
