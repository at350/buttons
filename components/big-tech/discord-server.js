export default {
  id: 'bt-discord-server',
  credit: 'Discord — server icon that morphs circle→rounded-square on hover, plus blurple "Join" button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: center; gap: 16px; padding: 12px 16px; border-radius: 12px; background: #1e1f22; }
    .srv { position: relative; width: 48px; height: 48px; padding: 0; border: 0; cursor: pointer; background: none; -webkit-tap-highlight-color: transparent; }
    .ic {
      width: 48px; height: 48px; border-radius: 50%; background: #313338; color: #dbdee1; display: flex; align-items: center; justify-content: center;
      font: 500 14px Whitney, "gg sans", -apple-system, "Segoe UI", system-ui, sans-serif;
      transition: border-radius .15s ease-out, background .15s ease-out, color .15s;
    }
    .srv:hover .ic, .srv:focus-visible .ic, .srv[aria-pressed="true"] .ic { border-radius: 16px; background: #5865f2; color: #fff; }
    .srv:focus-visible { outline: none; }
    .srv:focus-visible .ic { box-shadow: 0 0 0 2px #1e1f22, 0 0 0 4px #00a8fc; }
    .pill { position: absolute; left: -12px; top: 50%; width: 4px; height: 8px; border-radius: 0 4px 4px 0; background: #f2f3f5; transform: translateY(-50%); transition: height .15s ease-out; }
    .srv:hover .pill { height: 20px; }
    .srv[aria-pressed="true"] .pill { height: 40px; }
    .join {
      height: 38px; padding: 0 16px; border: 0; border-radius: 3px; background: #5865f2; color: #fff; cursor: pointer;
      font: 500 14px/38px "gg sans", -apple-system, "Segoe UI", system-ui, sans-serif; transition: background .17s ease; min-width: 96px;
      -webkit-tap-highlight-color: transparent;
    }
    .join:hover { background: #4752c4; }
    .join:active { background: #3c45a5; }
    .join:focus-visible { outline: none; box-shadow: 0 0 0 2px #1e1f22, 0 0 0 4px #00a8fc; }
    .join[aria-pressed="true"] { background: #248046; }
    .join .lbl::after { content: 'Join'; }
    .join[aria-pressed="true"] .lbl::after { content: 'Joined'; }
  `,
  html: `
    <div class="stage">
      <button class="srv" type="button" aria-pressed="false" aria-label="Server"><span class="pill"></span><span class="ic">DS</span></button>
      <button class="join" type="button" aria-pressed="false"><span class="lbl"></span></button>
    </div>`,
  init(root) {
    const srv = root.querySelector('.srv');
    const join = root.querySelector('.join');
    srv.addEventListener('click', () => srv.setAttribute('aria-pressed', srv.getAttribute('aria-pressed') !== 'true'));
    join.addEventListener('click', () => {
      const on = join.getAttribute('aria-pressed') !== 'true';
      join.setAttribute('aria-pressed', on);
      srv.setAttribute('aria-pressed', on);
    });
  },
};
