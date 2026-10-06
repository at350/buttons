export default {
  id: 'bt-google-sign-in',
  credit: 'Google Identity — "Sign in with Google" button with the four-color G',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .gsi {
      position: relative; display: inline-flex; align-items: center; gap: 10px; height: 40px; min-width: 190px; padding: 0 12px;
      border: 1px solid #747775; border-radius: 4px; background: #fff; color: #1f1f1f;
      font: 500 14px/20px Roboto, "Segoe UI", system-ui, -apple-system, sans-serif; letter-spacing: .25px;
      cursor: pointer; overflow: hidden; -webkit-tap-highlight-color: transparent; transition: box-shadow .15s;
    }
    /* Material-style state layer: hover 8%, pressed 12%. */
    .gsi::after { content: ""; position: absolute; inset: 0; background: #303030; opacity: 0; transition: opacity .15s; pointer-events: none; }
    .gsi:hover::after { opacity: .08; }
    .gsi:active::after { opacity: .12; }
    .gsi:hover { box-shadow: 0 1px 2px rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15); }
    .gsi:focus-visible { outline: 2px solid #1a73e8; outline-offset: 2px; }
    .gsi:focus-visible::after { opacity: .12; }
    .ico { position: relative; width: 20px; height: 20px; flex: none; }
    .ico > svg { position: absolute; inset: 0; width: 20px; height: 20px; }
    .spin, .done { display: none; }
    .spin circle { fill: none; stroke: #4285f4; stroke-width: 3; stroke-linecap: round; stroke-dasharray: 36 20; transform-origin: 50% 50%; }
    .lbl { white-space: nowrap; }
    .gsi[data-state="loading"] .g, .gsi[data-state="done"] .g { display: none; }
    .gsi[data-state="loading"] .spin { display: block; }
    .gsi[data-state="loading"] .spin circle { animation: rot .7s linear 2; }
    .gsi[data-state="done"] .done { display: block; }
    .gsi[data-state="done"] { border-color: #1e8e3e; color: #1e8e3e; }
    .gsi[data-state="done"] .done path { stroke-dasharray: 24; animation: draw .3s ease-out forwards; }
    @keyframes rot { to { transform: rotate(720deg); } }
    @keyframes draw { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
  `,
  html: `
    <button class="gsi" type="button" data-state="idle" aria-busy="false" aria-pressed="false">
      <span class="ico" aria-hidden="true">
        <svg class="g" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        <svg class="spin" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8"/></svg>
        <svg class="done" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#1e8e3e"/><path d="M5.5 10.5l3 3 6-6.5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <span class="lbl">Sign in with Google</span>
    </button>`,
  init(root) {
    const btn = root.querySelector('.gsi');
    const lbl = root.querySelector('.lbl');
    const spin = root.querySelector('.spin circle');
    const TEXT = { idle: 'Sign in with Google', loading: 'Signing in…', done: 'Signed in' };
    const setState = (s) => {
      btn.dataset.state = s;
      lbl.textContent = TEXT[s];
      btn.setAttribute('aria-busy', String(s === 'loading'));
      btn.setAttribute('aria-pressed', String(s === 'done'));
    };
    // idle -> loading (spinner, two turns) -> done (green check, persistent); any click while loading or done returns to idle.
    btn.addEventListener('click', () => setState(btn.dataset.state === 'idle' ? 'loading' : 'idle'));
    spin.addEventListener('animationend', () => { if (btn.dataset.state === 'loading') setState('done'); });
  },
};
