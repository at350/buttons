// Discord guild bar (Home + a server) and the invite "Join" button. Guild icons morph circle → rounded square on
// hover with the white selection pill; Join / Joined share one grid cell so the button never changes width.
const CLYDE = 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z';
export default {
  id: 'bt-discord-server',
  credit: 'Discord — guild bar icons (circle → rounded square, selection pill) and the green invite "Join" button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: center; gap: 20px; padding: 12px 20px 12px 12px; border-radius: 12px; background: #1e1f22; overflow: hidden; font-family: "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; }
    .guilds { display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .sep { width: 32px; height: 2px; border-radius: 1px; background: #35363c; }
    .srv { position: relative; width: 48px; height: 48px; padding: 0; border: 0; font-family: inherit; cursor: pointer; background: none; -webkit-tap-highlight-color: transparent; }
    .ic {
      width: 48px; height: 48px; border-radius: 24px; background: #313338; color: #dbdee1; display: flex; align-items: center; justify-content: center;
      font-size: 16px; font-weight: 500; line-height: 1; overflow: hidden;
      transition: border-radius .15s ease-out, background-color .15s ease-out, color .15s ease-out;
    }
    .ic svg { width: 28px; height: 28px; fill: currentColor; }
    .ic img { display: block; width: 48px; height: 48px; object-fit: cover; }
    .srv:hover .ic, .srv:focus-visible .ic, .srv[aria-current="true"] .ic { border-radius: 16px; background: #5865f2; color: #fff; }
    .srv:active .ic { transform: translateY(1px); }
    .srv:focus-visible { outline: none; }
    .srv:focus-visible .ic { box-shadow: 0 0 0 2px #00a8fc; }
    .pill { position: absolute; left: -12px; top: 50%; width: 8px; height: 0; margin-left: -4px; border-radius: 0 4px 4px 0; background: #f2f3f5; transform: translateY(-50%); transition: height .15s ease-out; }
    .srv.unread .pill { height: 8px; }
    .srv:hover .pill { height: 20px; }
    .srv[aria-current="true"] .pill { height: 40px; }
    .join {
      height: 38px; min-width: 96px; padding: 2px 16px; border: 0; border-radius: 8px; background: #248046; color: #fff; cursor: pointer;
      font-family: inherit; font-size: 14px; font-weight: 500; line-height: 16px; display: inline-grid; place-items: center;
      transition: background-color .17s ease; -webkit-tap-highlight-color: transparent;
    }
    .join:hover { background: #1a6334; }
    .join:active { background: #15562b; }
    .join:focus-visible { outline: none; box-shadow: 0 0 0 2px #1e1f22, 0 0 0 4px #00a8fc; }
    .join > span { grid-area: 1 / 1; }
    .join .b { visibility: hidden; }
    .join[aria-pressed="true"] { background: #4e5058; }
    .join[aria-pressed="true"]:hover { background: #6d6f78; }
    .join[aria-pressed="true"] .a { visibility: hidden; }
    .join[aria-pressed="true"] .b { visibility: visible; }
  `,
  html: `
    <div class="stage">
      <div class="guilds">
        <button class="srv home" type="button" aria-current="true" aria-label="Direct Messages"><span class="pill"></span><span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${CLYDE}"/></svg></span></button>
        <span class="sep"></span>
        <button class="srv unread" type="button" aria-current="false" aria-label="Design Systems"><span class="pill"></span><span class="ic"><img src="assets/square/32.webp" alt="" width="48" height="48"></span></button>
      </div>
      <button class="join" type="button" aria-pressed="false"><span class="a">Join</span><span class="b">Joined</span></button>
    </div>`,
  init(root) {
    const srvs = [...root.querySelectorAll('.srv')];
    const ds = srvs[1];
    const join = root.querySelector('.join');
    const select = (s) => { srvs.forEach((x) => x.setAttribute('aria-current', String(x === s))); s.classList.remove('unread'); };
    srvs.forEach((s) => s.addEventListener('click', () => select(s)));
    join.addEventListener('click', () => {
      const on = join.getAttribute('aria-pressed') !== 'true';
      join.setAttribute('aria-pressed', String(on));
      if (on) select(ds); else { select(srvs[0]); ds.classList.add('unread'); }
    });
  },
};
