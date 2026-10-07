// Untitled UI input (md) with a password strength meter: 14px/500 #344054 label, 44px field with 1px #d0d5dd border,
// 8px radius, shadow-xs, 16px Inter #101828 / #667085 placeholder, focus border #d6bbfb + 4px #f4ebff ring;
// Lucide eye / eye-off toggle in #667085; four 4px bars filling in Untitled UI error #f04438 → warning #f79009 →
// #fdb022 → success #17b26a with the matching word at the right of the 14px #475467 hint row.
export default {
  id: 'in-password-strength',
  credit: 'Untitled UI password input — purple focus ring, eye / eye-off toggle, four-bar strength meter with Weak → Strong label',
  size: 'wide',
  css: `
    :host { display: block; }
    .w { width: 360px; max-width: 100%; margin: 0 auto; padding: 20px 20px 18px; border-radius: 12px; background: #fff; box-shadow: 0 1px 2px rgba(16,24,40,.06), 0 0 0 1px #eaecf0; font-family: Inter, system-ui, sans-serif; }
    .lbl { display: block; margin-bottom: 6px; font-size: 14px; line-height: 20px; font-weight: 500; color: #344054; }
    .f {
      position: relative; display: flex; align-items: center; height: 44px; border: 1px solid #d0d5dd; border-radius: 8px; background: #fff;
      box-shadow: 0 1px 2px rgba(16,24,40,.05); transition: border-color .1s, box-shadow .1s;
    }
    .f:hover { border-color: #b8bfca; }
    .f:focus-within { border-color: #d6bbfb; box-shadow: 0 1px 2px rgba(16,24,40,.05), 0 0 0 4px #f4ebff; }
    input { flex: 1; min-width: 0; height: 100%; border: 0; background: none; padding: 0 0 0 14px; font: 400 16px/24px Inter, system-ui, sans-serif; color: #101828; outline: 0; }
    input::placeholder { color: #667085; }
    .eye { width: 40px; height: 40px; margin-right: 2px; border: 0; background: none; padding: 0; cursor: pointer; color: #667085; display: grid; place-items: center; border-radius: 6px; -webkit-tap-highlight-color: transparent; }
    .eye:hover { color: #344054; }
    .eye:focus-visible { outline: 2px solid #9e77ed; outline-offset: -4px; }
    .eye svg { grid-area: 1 / 1; width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: opacity .15s, transform .2s; }
    .eye .off { opacity: 0; transform: scale(.7); }
    .eye[aria-pressed="true"] .on { opacity: 0; transform: scale(.7); } .eye[aria-pressed="true"] .off { opacity: 1; transform: none; }
    .bars { display: flex; gap: 8px; margin-top: 10px; }
    .bar { flex: 1; height: 4px; border-radius: 2px; background: #eaecf0; transition: background-color .25s; }
    .w[data-s="1"] .bar:nth-child(-n+1) { background: #f04438; }
    .w[data-s="2"] .bar:nth-child(-n+2) { background: #f79009; }
    .w[data-s="3"] .bar:nth-child(-n+3) { background: #fdb022; }
    .w[data-s="4"] .bar:nth-child(-n+4) { background: #17b26a; }
    .hint { display: flex; justify-content: space-between; gap: 8px; margin-top: 6px; font-size: 14px; line-height: 20px; color: #475467; white-space: nowrap; }
    .word { display: grid; text-align: right; font-weight: 500; }
    .word span { grid-area: 1 / 1; opacity: 0; transition: opacity .15s; }
    .w[data-s="1"] .s1, .w[data-s="2"] .s2, .w[data-s="3"] .s3, .w[data-s="4"] .s4 { opacity: 1; }
    .s1 { color: #d92d20; } .s2 { color: #dc6803; } .s3 { color: #b54708; } .s4 { color: #079455; }
  `,
  html: `<div class="w" data-s="2">
    <label class="lbl" for="pw">Password</label>
    <div class="f">
      <input id="pw" type="password" placeholder="Create a password" value="sunset2024" autocomplete="new-password" spellcheck="false">
      <button class="eye" type="button" aria-pressed="false" aria-label="Show password">
        <svg class="on" viewBox="0 0 24 24"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
        <svg class="off" viewBox="0 0 24 24"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
      </button>
    </div>
    <div class="bars" aria-hidden="true"><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="bar"></span></div>
    <div class="hint"><span>Must be at least 8 characters.</span><span class="word" aria-live="polite"><span class="s1">Weak</span><span class="s2">Fair</span><span class="s3">Good</span><span class="s4">Strong</span></span></div>
  </div>`,
  init(root) {
    const w = root.querySelector('.w'), inp = root.querySelector('input'), eye = root.querySelector('.eye');
    inp.addEventListener('input', () => {
      const v = inp.value;
      let s = 0;
      if (v.length >= 8) s++; if (/[0-9]/.test(v)) s++; if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++; if (/[^A-Za-z0-9]/.test(v)) s++;
      if (v.length < 8) s = Math.min(s, 1);
      w.dataset.s = v ? Math.max(1, s) : 0;
    });
    eye.addEventListener('click', () => {
      const show = eye.getAttribute('aria-pressed') !== 'true';
      eye.setAttribute('aria-pressed', show); eye.setAttribute('aria-label', show ? 'Hide password' : 'Show password'); inp.type = show ? 'text' : 'password';
    });
  },
};
