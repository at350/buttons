export default {
  id: 'rt-xp-start',
  credit: 'Windows XP (Luna) — the green "start" taskbar pill with Windows flag',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: linear-gradient(#245edb 0%, #3f8cf3 6%, #245edb 14%, #1941a5 100%); padding: 0 24px 0 0; border-radius: 12px; display: inline-flex; align-items: center; height: 38px; overflow: hidden; }
    .start { height: 30px; padding: 0 22px 0 10px; margin: 0 0 1px 0; border: none; border-radius: 0 12px 12px 0;
      background: linear-gradient(#3c9b3c 0%, #52b652 8%, #3b9a3b 20%, #2f8a2f 60%, #277c27 100%);
      box-shadow: inset 0 1px 0 #9fd89f, inset -2px 0 2px rgba(0,0,0,.25), 2px 0 3px rgba(0,0,0,.4);
      color: #fff; font: italic bold 18px "Trebuchet MS", "Franklin Gothic Medium", Tahoma, sans-serif; text-shadow: 1px 1px 2px rgba(0,0,0,.6);
      display: inline-flex; align-items: center; gap: 6px; cursor: pointer; position: relative; }
    .start:hover { background: linear-gradient(#4db24d 0%, #66cc66 8%, #4ab04a 20%, #3c9c3c 60%, #338a33 100%); }
    .start:active, .start[aria-expanded="true"] { background: linear-gradient(#256f25 0%, #2f862f 30%, #2a7b2a 100%);
      box-shadow: inset 0 2px 4px rgba(0,0,0,.5), inset -2px 0 2px rgba(0,0,0,.25); }
    .start:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }
    .start svg { filter: drop-shadow(1px 1px 1px rgba(0,0,0,.5)); }
    .start.on svg { animation: none; }
  `,
  html: `
    <div class="stage">
      <button class="start" type="button" aria-pressed="false">
        <svg width="24" height="22" viewBox="0 0 24 22" aria-hidden="true">
          <path d="M2 4.5l8-1.3v7.3H2z" fill="#f65314"/>
          <path d="M11.5 3l10.5-1.8v9.3H11.5z" fill="#7cbb00"/>
          <path d="M2 11.5h8v7.3L2 17.5z" fill="#00a1f1"/>
          <path d="M11.5 11.5H22v9.3L11.5 19z" fill="#ffbb00"/>
          <path d="M3 5.4l6-1v5.4H3zM12.5 4l8.5-1.4v6.9h-8.5zM3 12.5h6v5.4l-6-1zM12.5 12.5H21v6.9L12.5 18z" fill="rgba(255,255,255,.35)"/>
        </svg>start
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.start');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(on));
    });
  },
};
