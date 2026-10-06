// Geometry, colours and logo taken from the live widget (google.com/recaptcha/api2/demo):
// 300×74 anchor + 1px #d3d3d3 border on #f9f9f9, 28px checkbox with a 2px #444746 border,
// 14px Roboto label, the tri-colour arrows logo over a 10px #555 "reCAPTCHA" wordmark.
export default {
  id: 'ob-recaptcha',
  credit: 'Google reCAPTCHA v2 — the "I\'m not a robot" anchor: checkbox morphs into the blue spinner, then the green tick',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .box {
      position: relative; display: flex; align-items: center; width: 302px; max-width: 100%; height: 76px; padding: 0 0 0 12px;
      background: #f9f9f9; border: 1px solid #d3d3d3; border-radius: 3px; box-shadow: 0 0 4px 1px rgba(0,0,0,.08);
      font: 400 14px/17px Roboto, "Roboto Flex", Helvetica, Arial, sans-serif; color: #000;
    }
    .cb {
      position: relative; width: 28px; height: 28px; flex: none; padding: 0; cursor: pointer;
      background: #fff; border: 2px solid #444746; border-radius: 2px;
      transition: border-color .2s, border-radius .4s cubic-bezier(.4,0,.2,1), background .2s;
    }
    .cb:hover { border-color: #1f1f1f; }
    .cb:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #4d90fe; }
    .cb.spin, .cb.ok { border-color: transparent; background: transparent; }
    .cb.spin { border-radius: 50%; }
    .spinner { position: absolute; inset: -2px; border-radius: 50%; border: 4px solid transparent; border-top-color: #1a73e8; border-left-color: #1a73e8; opacity: 0; transition: opacity .2s; }
    .cb.spin .spinner { opacity: 1; animation: rot .9s linear infinite; }
    @keyframes rot { to { transform: rotate(360deg); } }
    .check { position: absolute; left: -7px; top: -9px; width: 38px; height: 38px; fill: none; stroke: #009e55; stroke-width: 4.5; stroke-linecap: square; stroke-dasharray: 34; stroke-dashoffset: 34; }
    .cb.ok .check { animation: draw .45s cubic-bezier(.4,0,.2,1) forwards; }
    @keyframes draw { to { stroke-dashoffset: 0; } }
    .lbl { margin-left: 12px; flex: 1; white-space: nowrap; user-select: none; -webkit-user-select: none; cursor: default; }
    .logo { position: absolute; right: 11px; top: 10px; width: 58px; display: flex; flex-direction: column; align-items: center; }
    .logo svg { width: 32px; height: 32px; }
    .logo b { margin-top: 5px; font: 400 10px/10px Roboto, "Roboto Flex", Helvetica, Arial, sans-serif; color: #555; }
  `,
  html: `
    <div class="box">
      <button class="cb" type="button" role="checkbox" aria-checked="false" aria-label="I'm not a robot">
        <span class="spinner" aria-hidden="true"></span>
        <svg class="check" viewBox="0 0 38 38" aria-hidden="true"><path d="M8 20l8 8 15-17"/></svg>
      </button>
      <span class="lbl">I'm not a robot</span>
      <div class="logo" aria-hidden="true">
        <svg viewBox="33 20 84 84"><path fill="#1c3aa9" d="m117 62.063c-.002-.60232-.0159-1.2014-.0429-1.7976v-33.991l-9.3971 9.3971c-7.691-9.4141-19.391-15.427-32.496-15.427-13.638 0-25.754 6.5097-33.413 16.591l15.403 15.565c1.5095-2.7917 3.6539-5.1895 6.2395-7.0005 2.6891-2.0985 6.4993-3.8143 11.77-3.8143.63674 0 1.1282.0744 1.4893.21458 6.5304.51543 12.191 4.1194 15.524 9.3503l-10.903 10.903c13.81-.0542 29.411-.086 35.825.007"/><path fill="#4285f4" d="m74.819 20.246c-.60232.002-1.2014.0159-1.7976.0429h-33.991l9.3971 9.3971c-9.4141 7.691-15.427 19.391-15.427 32.496 0 13.638 6.5098 25.754 16.591 33.413l15.565-15.403c-2.7917-1.5095-5.1895-3.6539-7.0005-6.2395-2.0984-2.6891-3.8143-6.4993-3.8143-11.77 0-.63674.0744-1.1282.21458-1.4893.51543-6.5304 4.1194-12.191 9.3503-15.524l10.903 10.903c-.0542-13.81-.0861-29.411.007-35.825"/><path fill="#ababab" d="m33.002 62.181c.002.60232.0159 1.2014.0429 1.7976v33.991l9.3971-9.3971c7.691 9.4141 19.391 15.427 32.496 15.427 13.638 0 25.754-6.5097 33.413-16.591l-15.403-15.565c-1.5095 2.7917-3.6539 5.1895-6.2395 7.0005-2.6891 2.0985-6.4993 3.8143-11.77 3.8143-.63674 0-1.1282-.0744-1.4893-.21458-6.5304-.51543-12.191-4.1194-15.524-9.3503l10.903-10.903c-13.81.0542-29.411.086-35.825-.007"/></svg>
        <b>reCAPTCHA</b>
      </div>
    </div>`,
  init(root) {
    const cb = root.querySelector('.cb');
    let t = 0, state = 'idle';
    cb.addEventListener('click', () => {
      clearTimeout(t);
      if (state !== 'idle') { state = 'idle'; cb.className = 'cb'; cb.setAttribute('aria-checked', 'false'); return; }
      state = 'spin'; cb.classList.add('spin');
      t = setTimeout(() => { state = 'ok'; cb.classList.remove('spin'); cb.classList.add('ok'); cb.setAttribute('aria-checked', 'true'); }, 900 + Math.random() * 600);
    });
    return () => clearTimeout(t);
  },
};
