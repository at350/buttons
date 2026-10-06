export default {
  id: 'ty-grad-emboss',
  credit: 'GRAD-axis emboss — Roboto Flex grade -200→150 thickens strokes without changing width; light/shadow text-shadows make it pop (Material "grade" guidance)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      background: #d9d9d4;
      border-radius: 12px;
      padding: 18px 22px;
    }
    .btn {
      cursor: pointer;
      border: 0;
      border-radius: 10px;
      padding: 14px 26px;
      background: #d9d9d4;
      color: #6b6b66;
      font: 500 28px/1 'Roboto Flex', Inter, system-ui, sans-serif; letter-spacing: .02em;
      font-variation-settings: 'GRAD' -200, 'wght' 500;
      text-shadow: 1px 1px 0 rgba(255,255,255,.9), -1px -1px 0 rgba(0,0,0,.18);
      box-shadow: inset 2px 2px 5px rgba(0,0,0,.14), inset -2px -2px 5px rgba(255,255,255,.9);
      transition: font-variation-settings .4s, color .4s, text-shadow .4s, box-shadow .3s;
    }
    .btn:hover { font-variation-settings: 'GRAD' 0, 'wght' 500; color: #3f3f3b; }
    .btn:active, .btn.on {
      font-variation-settings: 'GRAD' 150, 'wght' 500; color: #1a1a18;
      text-shadow: -1px -1px 0 rgba(255,255,255,.95), 2px 2px 2px rgba(0,0,0,.28);
      box-shadow: 4px 4px 10px rgba(0,0,0,.18), -4px -4px 10px rgba(255,255,255,.95);
    }
    .btn:focus-visible { outline: 2px solid #1a1a18; outline-offset: 3px; }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false">Emboss</button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
