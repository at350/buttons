export default {
  id: 'bt-youtube-subscribe',
  credit: 'YouTube — black "Subscribe" pill that becomes gray "Subscribed" with a notification bell',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .yt {
      height: 36px; padding: 0 16px; border: 0; border-radius: 18px; background: #0f0f0f; color: #fff; cursor: pointer;
      font: 500 14px/36px Roboto, -apple-system, "Segoe UI", system-ui, sans-serif;
      display: inline-flex; align-items: center; gap: 6px; transition: background .2s, color .2s, padding .2s; -webkit-tap-highlight-color: transparent;
    }
    .yt:hover { background: #272727; }
    .yt:active { background: #3f3f3f; }
    .yt:focus-visible { outline: 2px solid #065fd4; outline-offset: 2px; }
    .yt svg { width: 24px; height: 24px; fill: currentColor; display: none; }
    .yt[aria-pressed="true"] { background: rgba(0,0,0,.05); color: #0f0f0f; padding: 0 16px 0 12px; }
    .yt[aria-pressed="true"]:hover { background: rgba(0,0,0,.1); }
    .yt[aria-pressed="true"] .bell { display: block; animation: ring .6s ease-in-out; transform-origin: 50% 0; }
    .yt[aria-pressed="true"] .chev { display: block; width: 20px; height: 20px; margin-left: -2px; }
    .lbl::after { content: 'Subscribe'; }
    .yt[aria-pressed="true"] .lbl::after { content: 'Subscribed'; }
    @keyframes ring { 0%,100% { transform: rotate(0); } 20% { transform: rotate(18deg); } 40% { transform: rotate(-14deg); } 60% { transform: rotate(10deg); } 80% { transform: rotate(-6deg); } }
  `,
  html: `
    <button class="yt" type="button" aria-pressed="false">
      <svg class="bell" viewBox="0 0 24 24"><path d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm10-2.65V19H4v-1.65l2-1.88v-5.15c0-2.92 1.56-5.22 4-5.98V3.96c0-1.42 1.49-2.5 2.99-1.76.65.32 1.01 1.03 1.01 1.76v.39c2.44.75 4 3.06 4 5.98v5.15l2 1.88z"/></svg>
      <span class="lbl"></span>
      <svg class="chev" viewBox="0 0 24 24"><path d="M12 15.7 5.3 9l1.4-1.4 5.3 5.3 5.3-5.3L18.7 9z"/></svg>
    </button>`,
  init(root) {
    const b = root.querySelector('.yt');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
