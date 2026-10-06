export default {
  id: 'bt-youtube-like',
  credit: 'YouTube — like / dislike segmented pill with count (thumbs fill when selected)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .seg { display: inline-flex; height: 36px; border-radius: 18px; background: rgba(0,0,0,.05); font: 500 14px Roboto, -apple-system, "Segoe UI", system-ui, sans-serif; color: #0f0f0f; }
    .yt {
      height: 36px; border: 0; background: transparent; color: inherit; cursor: pointer; font: inherit;
      display: inline-flex; align-items: center; gap: 6px; transition: background .15s; -webkit-tap-highlight-color: transparent;
    }
    .like { padding: 0 12px 0 14px; border-radius: 18px 0 0 18px; position: relative; }
    .like::after { content: ''; position: absolute; right: 0; top: 6px; bottom: 6px; width: 1px; background: rgba(0,0,0,.1); }
    .dis { padding: 0 14px 0 12px; border-radius: 0 18px 18px 0; }
    .yt:hover { background: rgba(0,0,0,.1); }
    .yt:active { background: rgba(0,0,0,.15); }
    .yt:focus-visible { outline: 2px solid #065fd4; outline-offset: -2px; }
    .yt svg { width: 24px; height: 24px; }
    .yt .o { fill: currentColor; }
    .yt .f { display: none; fill: currentColor; }
    .yt[aria-pressed="true"] .o { display: none; }
    .yt[aria-pressed="true"] .f { display: block; animation: thumb .35s cubic-bezier(.34,1.56,.64,1); }
    @keyframes thumb { 0% { transform: scale(.6) rotate(-20deg); } 100% { transform: none; } }
    .dis svg { transform: scaleX(-1) scaleY(-1); }
  `,
  html: `
    <div class="seg">
      <button class="yt like" type="button" aria-pressed="false">
        <svg viewBox="0 0 24 24"><path class="o" d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h1h9.43c1.06 0 1.98-.67 2.19-1.61l1.34-6C21.23 12.15 20.18 11 18.77 11zM7 20H4v-8h3v8zm12.98-6.83-1.34 6c-.1.48-.61.83-1.21.83H8v-8.61l5.6-6.06c.19-.21.48-.33.78-.33.26 0 .5.11.63.3.07.1.15.26.09.47l-1.52 4.94L13.18 12h5.59c.41 0 .8.17 1.03.46.12.17.25.44.18.71z"/><path class="f" d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h1h9.43c1.06 0 1.98-.67 2.19-1.61l1.34-6C21.23 12.15 20.18 11 18.77 11zM7 20H4v-8h3v8z"/></svg>
        <span class="n">12K</span>
      </button>
      <button class="yt dis" type="button" aria-pressed="false" aria-label="Dislike">
        <svg viewBox="0 0 24 24"><path class="o" d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h1h9.43c1.06 0 1.98-.67 2.19-1.61l1.34-6C21.23 12.15 20.18 11 18.77 11zM7 20H4v-8h3v8zm12.98-6.83-1.34 6c-.1.48-.61.83-1.21.83H8v-8.61l5.6-6.06c.19-.21.48-.33.78-.33.26 0 .5.11.63.3.07.1.15.26.09.47l-1.52 4.94L13.18 12h5.59c.41 0 .8.17 1.03.46.12.17.25.44.18.71z"/><path class="f" d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h1h9.43c1.06 0 1.98-.67 2.19-1.61l1.34-6C21.23 12.15 20.18 11 18.77 11zM7 20H4v-8h3v8z"/></svg>
      </button>
    </div>`,
  init(root) {
    const like = root.querySelector('.like');
    const dis = root.querySelector('.dis');
    const n = root.querySelector('.n');
    let base = 12004;
    const render = () => { const v = base + (like.getAttribute('aria-pressed') === 'true' ? 1 : 0); n.textContent = (v / 1000).toFixed(v % 1000 >= 50 ? 1 : 0) + 'K'; };
    like.addEventListener('click', () => { const on = like.getAttribute('aria-pressed') !== 'true'; like.setAttribute('aria-pressed', on); if (on) dis.setAttribute('aria-pressed', 'false'); render(); });
    dis.addEventListener('click', () => { const on = dis.getAttribute('aria-pressed') !== 'true'; dis.setAttribute('aria-pressed', on); if (on) like.setAttribute('aria-pressed', 'false'); render(); });
  },
};
