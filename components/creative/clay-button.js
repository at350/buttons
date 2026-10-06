export default {
  id: 'cr-clay-button',
  credit: 'Claymorphism — puffy pastel 3D, Michal Malewicz (Hype4) 2022',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #fdf0f6; padding: 30px 40px; border-radius: 12px; }
    .btn {
      font: 800 16px/1 system-ui, sans-serif; color: #4b2fa0; cursor: pointer;
      background: #c7b9ff; border: 0; border-radius: 28px; padding: 20px 38px;
      box-shadow:
        0 16px 30px rgba(75, 47, 160, .22),
        inset -10px -10px 20px rgba(75, 47, 160, .28),
        inset 10px 10px 20px rgba(255, 255, 255, .8);
      transition: transform .22s cubic-bezier(.34, 1.56, .64, 1), box-shadow .22s, background .3s, color .3s;
    }
    .btn:hover { transform: translateY(-4px) scale(1.03); }
    .btn:active {
      transform: translateY(2px) scale(.96);
      box-shadow:
        0 4px 10px rgba(75, 47, 160, .2),
        inset -6px -6px 14px rgba(75, 47, 160, .3),
        inset 6px 6px 14px rgba(255, 255, 255, .7);
    }
    .btn[aria-pressed="true"] { background: #b5f0d5; color: #14633f;
      box-shadow: 0 16px 30px rgba(20, 99, 63, .2), inset -10px -10px 20px rgba(20, 99, 63, .25), inset 10px 10px 20px rgba(255, 255, 255, .85); }
    .btn:focus-visible { outline: 3px solid #4b2fa0; outline-offset: 4px; }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false">Squish</button></div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
