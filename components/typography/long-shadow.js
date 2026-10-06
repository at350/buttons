export default {
  id: 'ty-long-shadow',
  credit: 'Isometric long-shadow type — a 45° extruded shadow built from stacked text-shadows that shortens as you press the word into the surface (2013 "long shadow" flat-design trend)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      background: #2dd4bf;
      border-radius: 12px;
      padding: 18px 26px 30px;
      overflow: hidden;
    }
    .btn {
      cursor: pointer;
      background: transparent;
      border: 0;
      padding: 0;
      color: #fff;
      display: inline-block;
      font: 800 50px/1 'Space Grotesk', Inter, system-ui, sans-serif;
      letter-spacing: .01em;
      text-transform: uppercase;
      --d: #0f766e; --l: 14;
      text-shadow:
        1px 1px var(--d), 2px 2px var(--d), 3px 3px var(--d), 4px 4px var(--d), 5px 5px var(--d), 6px 6px var(--d), 7px 7px var(--d),
        8px 8px var(--d), 9px 9px var(--d), 10px 10px var(--d), 11px 11px var(--d), 12px 12px var(--d), 13px 13px var(--d), 14px 14px var(--d),
        15px 15px var(--d), 16px 16px var(--d), 17px 17px var(--d), 18px 18px var(--d), 19px 19px var(--d), 20px 20px var(--d);
      transform: translate(0, 0); transition: transform .2s cubic-bezier(.34, 1.56, .64, 1), text-shadow .2s cubic-bezier(.34, 1.56, .64, 1);
    }
    .btn:hover { transform: translate(-3px, -3px);
      text-shadow:
        1px 1px var(--d), 2px 2px var(--d), 3px 3px var(--d), 4px 4px var(--d), 5px 5px var(--d), 6px 6px var(--d), 7px 7px var(--d),
        8px 8px var(--d), 9px 9px var(--d), 10px 10px var(--d), 11px 11px var(--d), 12px 12px var(--d), 13px 13px var(--d), 14px 14px var(--d),
        15px 15px var(--d), 16px 16px var(--d), 17px 17px var(--d), 18px 18px var(--d), 19px 19px var(--d), 20px 20px var(--d), 21px 21px var(--d), 22px 22px var(--d), 23px 23px var(--d); }
    .btn:active, .btn.on { transform: translate(14px, 14px);
      text-shadow:
        1px 1px var(--d), 2px 2px var(--d), 3px 3px var(--d), 4px 4px var(--d), 5px 5px var(--d), 6px 6px var(--d), 6px 6px var(--d),
        6px 6px var(--d), 6px 6px var(--d), 6px 6px var(--d), 6px 6px var(--d), 6px 6px var(--d), 6px 6px var(--d), 6px 6px var(--d),
        6px 6px var(--d), 6px 6px var(--d), 6px 6px var(--d), 6px 6px var(--d), 6px 6px var(--d), 6px 6px var(--d); }
    .btn.on { color: #134e4a; --d: #99f6e4; }
    .btn:focus-visible {
      outline: 3px solid #134e4a;
      outline-offset: 8px;
      border-radius: 4px;
    }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false">Deep</button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
