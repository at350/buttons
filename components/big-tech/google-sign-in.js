// "Sign in with Google" (GSI, light theme, rectangular). After sign-in it becomes the GSI personalized button
// ("Continue as …" with avatar and account email). All states share one grid cell, so the box never changes.
export default {
  id: 'bt-google-sign-in',
  credit: 'Google Identity Services — "Sign in with Google" button, then the personalized "Continue as" button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .gsi {
      position: relative; display: inline-grid; align-items: center; height: 40px; min-width: 200px; padding: 0 12px;
      border: 1px solid #747775; border-radius: 4px; background: #fff; color: #1f1f1f;
      font: 500 14px/20px "Roboto Flex", Roboto, Arial, sans-serif; letter-spacing: .25px; white-space: nowrap;
      cursor: pointer; overflow: hidden; -webkit-tap-highlight-color: transparent;
      transition: background-color .218s, border-color .218s, box-shadow .218s;
    }
    .gsi::after { content: ""; position: absolute; inset: 0; background: #303030; opacity: 0; transition: opacity .218s; pointer-events: none; }
    .gsi:hover { box-shadow: 0 1px 2px 0 rgba(60,64,67,.30), 0 1px 3px 1px rgba(60,64,67,.15); }
    .gsi:hover::after { opacity: .08; }
    .gsi:active::after, .gsi:focus-visible::after { opacity: .12; }
    .gsi:focus-visible { outline: none; }
    .st { grid-area: 1 / 1; display: flex; align-items: center; gap: 10px; visibility: hidden; }
    .gsi[data-s="idle"] .in, .gsi[data-s="loading"] .in, .gsi[data-s="done"] .me { visibility: visible; }
    .ico { position: relative; width: 20px; height: 20px; flex: none; }
    .ico svg { position: absolute; inset: 0; width: 20px; height: 20px; }
    .spin { visibility: hidden; }
    .gsi[data-s="loading"] .g { visibility: hidden; }
    .gsi[data-s="loading"] .spin { visibility: visible; }
    .gsi[data-s="loading"] .spin circle { animation: rot .8s linear infinite; }
    .spin circle { fill: none; stroke: #1a73e8; stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 30 50; transform-origin: 50% 50%; }
    @keyframes rot { to { transform: rotate(360deg); } }
    .me { gap: 8px; }
    .av { display: block; width: 20px; height: 20px; border-radius: 50%; object-fit: cover; background: #e8eaed; flex: none; }
    .tx { display: flex; flex-direction: column; text-align: left; min-width: 0; flex: 1; }
    .tx b { font-weight: 500; font-size: 14px; line-height: 16px; }
    .tx small { font: 400 12px/14px "Roboto Flex", Roboto, sans-serif; color: #5e5e5e; letter-spacing: .2px; }
    .me .g2 { width: 18px; height: 18px; flex: none; margin-left: 4px; }
  `,
  html: `
    <button class="gsi" type="button" data-s="idle" aria-busy="false">
      <span class="st in">
        <span class="ico" aria-hidden="true">
          <svg class="g" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          <svg class="spin" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>
        </span>
        <span>Sign in with Google</span>
      </span>
      <span class="st me" aria-hidden="true">
        <img class="av" src="assets/portraits/men-24.jpg" alt="" width="20" height="20">
        <span class="tx"><b>Continue as Alex</b><small>alex@example.com</small></span>
        <svg class="g2" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
      </span>
    </button>`,
  init(root) {
    const btn = root.querySelector('.gsi');
    let t;
    const set = (s) => {
      btn.dataset.s = s; btn.setAttribute('aria-busy', String(s === 'loading'));
      btn.setAttribute('aria-label', s === 'done' ? 'Continue as Alex, alex@example.com' : 'Sign in with Google');
    };
    btn.addEventListener('click', () => {
      clearTimeout(t);
      if (btn.dataset.s !== 'idle') { set('idle'); return; }
      set('loading'); t = setTimeout(() => set('done'), 1200);
    });
    return () => clearTimeout(t);
  },
};
