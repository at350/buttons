// Discord server invite embed as it renders in chat: "You've been invited to join a server", the server icon (rounded
// square), name, live online / member counts, and the green "Join" button that
// becomes the grey "Joined". Join / Joined share one grid cell so the embed never changes size.
export default {
  id: 'bt-discord-server',
  credit: 'Discord — server invite embed (invite header, server icon, online / member counts) with the green "Join" button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 432px; max-width: 100%; padding: 16px; border-radius: 8px; background: #2b2d31; font-family: "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif; color: #f2f3f5; -webkit-font-smoothing: antialiased; }
    .hd { margin: 0 0 12px; font-size: 12px; line-height: 16px; font-weight: 700; letter-spacing: .02em; text-transform: uppercase; color: #b5bac1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .row { display: flex; align-items: center; gap: 16px; }
    .ic { position: relative; flex: none; width: 50px; height: 50px; border-radius: 16px; overflow: hidden; background: #5865f2; }
    .ic img { display: block; width: 100%; height: 100%; object-fit: cover; }
    .meta { flex: 1; min-width: 0; display: grid; gap: 2px; }
    .nm { display: flex; align-items: center; gap: 6px; font-size: 16px; line-height: 20px; font-weight: 600; color: #f2f3f5; white-space: nowrap; overflow: hidden; }
    .nm span { overflow: hidden; text-overflow: ellipsis; }
    .nm svg { width: 16px; height: 16px; flex: none; }
    .ct { display: flex; align-items: center; gap: 12px; font-size: 14px; line-height: 16px; color: #b5bac1; white-space: nowrap; }
    .ct span { display: inline-flex; align-items: center; gap: 4px; }
    .ct i { width: 8px; height: 8px; border-radius: 50%; background: #23a55a; }
    .ct span + span i { background: #80848e; }
    .join {
      flex: none; height: 40px; min-width: 96px; padding: 2px 16px; border: 0; border-radius: 8px; background: #248046; color: #fff; cursor: pointer;
      font-family: inherit; font-size: 14px; font-weight: 500; line-height: 16px; display: inline-grid; place-items: center;
      transition: background-color .17s ease; -webkit-tap-highlight-color: transparent;
    }
    .join:hover { background: #1a6334; }
    .join:active { background: #15562b; }
    .join:focus-visible { outline: none; box-shadow: 0 0 0 2px #2b2d31, 0 0 0 4px #00a8fc; }
    .join > span { grid-area: 1 / 1; }
    .join .b { visibility: hidden; }
    .join[aria-pressed="true"] { background: #4e5058; cursor: default; }
    .join[aria-pressed="true"]:hover { background: #6d6f78; }
    .join[aria-pressed="true"] .a { visibility: hidden; }
    .join[aria-pressed="true"] .b { visibility: visible; }
    @media (max-width: 400px) { .ct span + span { display: none; } }
  `,
  html: `
    <div class="stage">
      <p class="hd">You've been invited to join a server</p>
      <div class="row">
        <span class="ic"><img src="assets/square/32.webp" alt="" width="50" height="50" draggable="false"></span>
        <div class="meta">
          <span class="nm"><span>Design Systems</span></span>
          <span class="ct"><span><i></i>1,284 Online</span><span><i></i>18,502 Members</span></span>
        </div>
        <button class="join" type="button" aria-pressed="false"><span class="a">Join</span><span class="b">Joined</span></button>
      </div>
    </div>`,
  init(root) {
    const join = root.querySelector('.join');
    const ct = root.querySelector('.ct span + span');
    join.addEventListener('click', () => {
      const on = join.getAttribute('aria-pressed') !== 'true';
      join.setAttribute('aria-pressed', String(on));
      ct.lastChild.textContent = on ? '18,503 Members' : '18,502 Members';
    });
  },
};
