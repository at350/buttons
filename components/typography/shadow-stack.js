export default {
  id: 'ty-shadow-stack',
  credit: 'Stacked-shadow 3D type — eight layered text-shadows give the word depth; pressing collapses the stack so the letters sink into the page (Codrops "3D text" CSS)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      background: #ffe4e6;
      border-radius: 12px;
      padding: 20px 28px 26px;
    }
    .btn {
      cursor: pointer;
      background: transparent;
      border: 0;
      padding: 0;
      color: #fff1f2;
      font: 900 54px/1 Inter, system-ui, sans-serif; letter-spacing: -.04em;
      transform: translate(0, 0); transition: transform .15s cubic-bezier(.34, 1.56, .64, 1), text-shadow .15s cubic-bezier(.34, 1.56, .64, 1), color .2s;
      text-shadow: 1px 1px 0 #be123c, 2px 2px 0 #be123c, 3px 3px 0 #be123c, 4px 4px 0 #be123c, 5px 5px 0 #be123c, 6px 6px 0 #be123c, 7px 7px 0 #be123c, 8px 8px 0 #9f1239;
    }
    .btn:hover {
      transform: translate(-2px, -2px);
      text-shadow: 1px 1px 0 #be123c, 2px 2px 0 #be123c, 3px 3px 0 #be123c, 4px 4px 0 #be123c, 5px 5px 0 #be123c, 6px 6px 0 #be123c, 7px 7px 0 #be123c, 8px 8px 0 #be123c, 9px 9px 0 #be123c, 10px 10px 0 #9f1239;
    }
    .btn:active, .btn.on {
      transform: translate(6px, 6px); color: #fff;
      text-shadow: 1px 1px 0 #be123c, 1px 1px 0 #be123c, 1px 1px 0 #be123c, 1px 1px 0 #be123c, 1px 1px 0 #be123c, 1px 1px 0 #be123c, 1px 1px 0 #be123c, 2px 2px 0 #9f1239;
    }
    .btn.on { color: #be123c; text-shadow: 1px 1px 0 #fff, 1px 1px 0 #fff, 1px 1px 0 #fff, 1px 1px 0 #fff, 1px 1px 0 #fff, 1px 1px 0 #fff, 1px 1px 0 #fff, 2px 2px 0 #fecdd3; }
    .btn:focus-visible {
      outline: 2px solid #9f1239;
      outline-offset: 8px;
      border-radius: 4px;
    }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false">PUSH</button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
