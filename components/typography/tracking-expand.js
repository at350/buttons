export default {
  id: 'ty-tracking-expand',
  credit: 'Uppercase tracking expand — letter-spacing .1em→.45em on hover inside a reserved box (fashion e-commerce CTA, e.g. Aesop / COS)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .btn {
      cursor: pointer;
      background: transparent;
      color: #141414;
      border: 1px solid #141414;
      border-radius: 0;
      padding: 16px 8px;
      font: 500 13px/1 Inter, system-ui, sans-serif;
      text-transform: uppercase;
      font-feature-settings: 'case', 'cpsp';
      word-spacing: -.1em;
      display: inline-grid;
      place-items: center;
      transition: background .35s, color .35s;
    }
    .btn > span { grid-area: 1 / 1; white-space: nowrap; }
    .g {
      visibility: hidden;
      letter-spacing: .45em;
      padding-left: .45em;
    }
    .v {
      letter-spacing: .1em;
      padding-left: .1em;
      transition: letter-spacing .5s cubic-bezier(.2, .8, .2, 1), padding .5s cubic-bezier(.2, .8, .2, 1);
    }
    .btn:hover .v, .btn:focus-visible .v, .btn.on .v { letter-spacing: .45em; padding-left: .45em; }
    .btn:hover, .btn.on { background: #141414; color: #fff; }
    .btn:active .v { letter-spacing: .3em; transition-duration: .15s; }
    .btn:focus-visible { outline: 1px solid #141414; outline-offset: 4px; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false"><span class="g" aria-hidden="true">Add to bag</span><span class="v">Add to bag</span></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
