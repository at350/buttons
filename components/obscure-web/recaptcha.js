export default {
  id: 'ob-recaptcha',
  credit: 'Google reCAPTCHA v2 — "I\'m not a robot" checkbox: click, spinner, green check, tiny logo corner',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .box {
      display: flex; align-items: center; width: 302px; max-width: 100%; height: 76px; padding: 0 12px; gap: 12px;
      background: #f9f9f9; border: 1px solid #d3d3d3; border-radius: 3px; box-shadow: 0 0 4px 1px rgba(0,0,0,.08);
      font: 14px/1 Roboto, Arial, Helvetica, sans-serif; color: #000;
    }
    .cb {
      position: relative; width: 28px; height: 28px; flex: none; background: #fcfcfc; border: 2px solid #c1c1c1; border-radius: 2px;
      cursor: pointer; padding: 0; transition: border-color .15s, transform .25s, border-radius .25s, background .2s;
    }
    .cb:hover { border-color: #b2b2b2; }
    .cb:focus-visible { outline: 2px solid #4a90e2; outline-offset: 2px; }
    .cb.spin { border-color: transparent; background: transparent; }
    .cb.ok { border-color: transparent; background: transparent; }
    .spinner { position: absolute; inset: -4px; border-radius: 50%; border: 3px solid #e0e0e0; border-top-color: #4a90e2; opacity: 0; }
    .cb.spin .spinner { opacity: 1; animation: rot .8s linear infinite; }
    @keyframes rot { to { transform: rotate(360deg); } }
    .check { position: absolute; left: -6px; top: -8px; width: 36px; height: 36px; fill: none; stroke: #009e55; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 40; stroke-dashoffset: 40; }
    .cb.ok .check { animation: draw .35s ease-out forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    .lbl { flex: 1; user-select: none; -webkit-user-select: none; }
    .logo { display: flex; flex-direction: column; align-items: center; gap: 3px; width: 54px; flex: none; }
    .logo svg { width: 32px; height: 32px; }
    .logo b { font: 500 9px/1 Roboto, Arial, sans-serif; color: #555; }
    .logo small { font: 8px/1 Roboto, Arial, sans-serif; color: #555; }
    .logo small span { text-decoration: underline; }
  `,
  html: `
    <div class="box">
      <button class="cb" type="button" role="checkbox" aria-checked="false" aria-label="I'm not a robot">
        <span class="spinner" aria-hidden="true"></span>
        <svg class="check" viewBox="0 0 36 36" aria-hidden="true"><path d="M8 19l7 7 13-15"/></svg>
      </button>
      <span class="lbl">I'm not a robot</span>
      <div class="logo" aria-hidden="true">
        <svg viewBox="0 0 32 32"><path d="M16 4a12 12 0 0 1 11.4 8.2L23 13.5A7.5 7.5 0 0 0 16 8.5V4z" fill="#1c3aa9"/><path d="M27.5 14l-.1 2.2 2.6 2.6V9.4L27.4 12z" fill="#1c3aa9"/><path d="M4.6 12.2A12 12 0 0 1 16 4v4.5a7.5 7.5 0 0 0-7 5z" fill="#4285f4"/><path d="M2 9.4v9.4l2.6-2.6-.1-2.2z" fill="#4285f4"/><path d="M8.5 16A7.5 7.5 0 0 0 16 23.5V28A12 12 0 0 1 4.6 19.8z" fill="#ababab"/><path d="M16 23.5a7.5 7.5 0 0 0 7-5l4.4 1.3A12 12 0 0 1 16 28z" fill="#ababab"/></svg>
        <b>reCAPTCHA</b>
        <small><span>Privacy</span> - <span>Terms</span></small>
      </div>
    </div>`,
  init(root) {
    const cb = root.querySelector('.cb');
    let t = 0, state = 'idle';
    cb.addEventListener('click', () => {
      clearTimeout(t);
      if (state !== 'idle') { state = 'idle'; cb.className = 'cb'; cb.setAttribute('aria-checked', 'false'); return; }
      state = 'spin'; cb.classList.add('spin');
      t = setTimeout(() => { state = 'ok'; cb.classList.remove('spin'); cb.classList.add('ok'); cb.setAttribute('aria-checked', 'true'); }, 900 + Math.random() * 700);
    });
    return () => clearTimeout(t);
  },
};
