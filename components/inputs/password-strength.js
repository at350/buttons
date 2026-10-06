export default {
  id: 'in-password-strength',
  credit: 'Password field with show / hide eye and a four-bar strength meter that colors up as you type (1Password / GitHub signup)',
  size: 'wide',
  css: `
    :host { display: block; }
    .w { max-width: 300px; margin: 0 auto; font: 14px system-ui, sans-serif; }
    .f { position: relative; display: flex; align-items: center; border: 1.5px solid #d0d5dd; border-radius: 10px; background: #fff; transition: border-color .15s, box-shadow .15s; }
    .f:focus-within { border-color: #7f56d9; box-shadow: 0 0 0 4px rgba(127,86,217,.15); }
    input { flex: 1; min-width: 0; height: 42px; border: 0; background: none; padding: 0 12px; font: 500 15px ui-monospace, Menlo, monospace; color: #101828; outline: 0; letter-spacing: .04em; }
    input::placeholder { font-family: system-ui, sans-serif; letter-spacing: 0; color: #98a2b3; font-weight: 400; }
    .eye { width: 40px; height: 40px; border: 0; background: none; padding: 0; cursor: pointer; color: #667085; display: grid; place-items: center; border-radius: 8px; -webkit-tap-highlight-color: transparent; }
    .eye:hover { color: #101828; }
    .eye:focus-visible { outline: 2px solid #7f56d9; outline-offset: -4px; }
    .eye svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; position: absolute; transition: opacity .15s, transform .2s; }
    .eye .off { opacity: 0; transform: scale(.7); }
    .eye[aria-pressed="true"] .on { opacity: 0; transform: scale(.7); } .eye[aria-pressed="true"] .off { opacity: 1; transform: none; }
    .bars { display: flex; gap: 6px; margin-top: 8px; padding: 0 2px; }
    .bar { flex: 1; height: 4px; border-radius: 2px; background: #eaecf0; transition: background .25s; }
    .w[data-s="1"] .bar:nth-child(-n+1) { background: #f04438; }
    .w[data-s="2"] .bar:nth-child(-n+2) { background: #f79009; }
    .w[data-s="3"] .bar:nth-child(-n+3) { background: #fdb022; }
    .w[data-s="4"] .bar:nth-child(-n+4) { background: #12b76a; }
  `,
  html: `<div class="w" data-s="0">
    <div class="f">
      <input type="password" placeholder="Password" autocomplete="new-password" aria-label="Password" spellcheck="false">
      <button class="eye" type="button" aria-pressed="false" aria-label="Show password">
        <svg class="on" viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
        <svg class="off" viewBox="0 0 24 24"><path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.6 3.5M6.4 6.4C3.6 8.4 2 12 2 12s3.5 7 10 7a9.8 9.8 0 0 0 4.2-.9"/></svg>
      </button>
    </div>
    <div class="bars" aria-hidden="true"><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span></div>
  </div>`,
  init(root) {
    const w = root.querySelector('.w'), inp = root.querySelector('input'), eye = root.querySelector('.eye');
    inp.addEventListener('input', () => {
      const v = inp.value;
      let s = 0;
      if (v.length >= 8) s++; if (/[0-9]/.test(v)) s++; if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++; if (/[^A-Za-z0-9]/.test(v)) s++;
      if (v.length && v.length < 4) s = Math.min(s, 1);
      w.dataset.s = v ? Math.max(1, s) : 0;
    });
    eye.addEventListener('click', () => {
      const show = eye.getAttribute('aria-pressed') !== 'true';
      eye.setAttribute('aria-pressed', show); inp.type = show ? 'text' : 'password';
    });
  },
};
