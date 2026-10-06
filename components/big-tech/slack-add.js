// Slack's official "Add to Slack" button (the markup api.slack.com generates): 48px tall, 236px wide, Lato 16/600,
// 20px four-colour logo. After install it shows Slack's "Added" confirmation; the width is fixed so nothing reflows.
export default {
  id: 'bt-slack-add',
  credit: 'Slack — official "Add to Slack" button with the four-colour logo',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sl {
      width: 236px; max-width: 100%; height: 48px; padding: 0; border-radius: 4px; border: 1px solid #ddd; background: #fff; color: #000; cursor: pointer;
      font: 600 16px/20px Lato, "Slack-Lato", "Helvetica Neue", Helvetica, Arial, sans-serif; white-space: nowrap;
      display: inline-flex; align-items: center; justify-content: center; transition: background .15s, box-shadow .15s, color .15s, border-color .15s;
      -webkit-tap-highlight-color: transparent;
    }
    .sl:hover { box-shadow: 0 1px 3px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08); }
    .sl:active { background: #f8f8f8; }
    .sl:focus-visible { outline: none; box-shadow: 0 0 0 1px #1264a3, 0 0 0 5px rgba(29,155,209,.3); }
    .ic { display: grid; margin-right: 12px; }
    .ic svg { grid-area: 1 / 1; width: 20px; height: 20px; display: block; }
    .ic .ok { visibility: hidden; }
    .lbl { display: grid; text-align: left; }
    .lbl span { grid-area: 1 / 1; }
    .lbl .b { visibility: hidden; }
    .sl[aria-pressed="true"] { background: #007a5a; border-color: #007a5a; color: #fff; }
    .sl[aria-pressed="true"]:hover { background: #148567; }
    .sl[aria-pressed="true"] .a, .sl[aria-pressed="true"] .logo { visibility: hidden; }
    .sl[aria-pressed="true"] .b, .sl[aria-pressed="true"] .ok { visibility: visible; }
  `,
  html: `
    <button class="sl" type="button" aria-pressed="false">
      <span class="ic" aria-hidden="true">
        <svg class="logo" viewBox="0 0 122.8 122.8">
          <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"/>
          <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"/>
          <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"/>
          <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"/>
        </svg>
        <svg class="ok" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      </span>
      <span class="lbl"><span class="a">Add to Slack</span><span class="b">Added to Slack</span></span>
    </button>`,
  init(root) {
    const b = root.querySelector('.sl');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
