export default {
  id: 'bt-slack-add',
  credit: 'Slack — "Add to Slack" button with four-colour hash logo',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sl {
      height: 44px; padding: 0 16px 0 12px; border-radius: 4px; border: 1px solid #ddd; background: #fff; color: #000; cursor: pointer;
      font: 600 16px/44px Lato, -apple-system, "Segoe UI", system-ui, sans-serif;
      display: inline-flex; align-items: center; gap: 12px; transition: background .15s, box-shadow .15s, color .15s;
      -webkit-tap-highlight-color: transparent;
    }
    .sl:hover { background: #f8f8f8; box-shadow: 0 1px 4px rgba(0,0,0,.15); }
    .sl:active { background: #ececec; }
    .sl:focus-visible { outline: none; box-shadow: 0 0 0 1px #fff, 0 0 0 5px rgba(29,155,209,.6); }
    .sl svg { width: 20px; height: 20px; }
    .sl[aria-pressed="true"] { background: #4a154b; color: #fff; border-color: #4a154b; }
    .sl .lbl::after { content: 'Add to Slack'; }
    .sl[aria-pressed="true"] .lbl::after { content: 'Added to Slack'; }
  `,
  html: `
    <button class="sl" type="button" aria-pressed="false">
      <svg viewBox="0 0 122.8 122.8" aria-hidden="true">
        <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"/>
        <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"/>
        <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"/>
        <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"/>
      </svg>
      <span class="lbl"></span>
    </button>`,
  init(root) {
    const b = root.querySelector('.sl');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
