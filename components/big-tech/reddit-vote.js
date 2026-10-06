export default {
  id: 'bt-reddit-vote',
  credit: 'Reddit — upvote / downvote pill with count (orange up, periwinkle down)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .pill {
      display: inline-flex; align-items: center; height: 32px; border-radius: 16px; background: #e5ebee; color: #0f1a1c;
      font: 600 12px/16px "Reddit Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; transition: background .15s, color .15s;
    }
    .pill.up { background: #d93900; color: #fff; }
    .pill.down { background: #6a5cff; color: #fff; }
    .vb {
      width: 32px; height: 32px; border: 0; background: transparent; color: inherit; cursor: pointer; padding: 0; border-radius: 50%;
      display: inline-flex; align-items: center; justify-content: center; transition: background .1s; -webkit-tap-highlight-color: transparent;
    }
    .vb:hover { background: rgba(0,0,0,.1); }
    .pill.up .vb:hover, .pill.down .vb:hover { background: rgba(255,255,255,.2); }
    .vb:focus-visible { outline: 2px solid #0a449b; outline-offset: -2px; }
    .vb svg { width: 16px; height: 16px; fill: currentColor; display: block; }
    .vb .f { display: none; }
    .vb span { display: block; transition: transform .15s; }
    .pill:not(.up) .u:hover { color: #d93900; }
    .pill:not(.down) .d:hover { color: #6a5cff; }
    .pill.up .u .o, .pill.down .d .o { display: none; }
    .pill.up .u .f, .pill.down .d .f { display: block; }
    .pill.up .u svg { animation: nudge .25s; }
    .pill.down .d svg { animation: nudged .25s; }
    @keyframes nudge { 50% { transform: translateY(-4px); } }
    @keyframes nudged { 50% { transform: rotate(180deg) translateY(-4px); } }
    .n { min-width: 28px; text-align: center; font-variant-numeric: tabular-nums; }
  `,
  html: `
    <div class="pill">
      <button class="vb u" type="button" aria-pressed="false" aria-label="Upvote"><svg viewBox="0 0 20 20" aria-hidden="true"><path class="o" d="M12.877 19H7.123A1.125 1.125 0 0 1 6 17.877V11H2.126a1.114 1.114 0 0 1-1.007-.7 1.249 1.249 0 0 1 .171-1.343L9.166.368a1.128 1.128 0 0 1 1.668.004l7.872 8.581a1.25 1.25 0 0 1 .176 1.348 1.113 1.113 0 0 1-1.005.7H14v6.877A1.125 1.125 0 0 1 12.877 19ZM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8Z"/><path class="f" d="M18.706 8.953 10.834.372A1.123 1.123 0 0 0 10 0a1.128 1.128 0 0 0-.833.368L1.29 8.957a1.249 1.249 0 0 0-.171 1.343 1.114 1.114 0 0 0 1.007.7H6v6.877A1.125 1.125 0 0 0 7.123 19h5.754A1.125 1.125 0 0 0 14 17.877V11h3.877a1.114 1.114 0 0 0 1.005-.7 1.251 1.251 0 0 0-.176-1.347Z"/></svg></button>
      <span class="n">1.2K</span>
      <button class="vb d" type="button" aria-pressed="false" aria-label="Downvote"><svg viewBox="0 0 20 20" aria-hidden="true" style="transform:rotate(180deg)"><path class="o" d="M12.877 19H7.123A1.125 1.125 0 0 1 6 17.877V11H2.126a1.114 1.114 0 0 1-1.007-.7 1.249 1.249 0 0 1 .171-1.343L9.166.368a1.128 1.128 0 0 1 1.668.004l7.872 8.581a1.25 1.25 0 0 1 .176 1.348 1.113 1.113 0 0 1-1.005.7H14v6.877A1.125 1.125 0 0 1 12.877 19ZM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8Z"/><path class="f" d="M18.706 8.953 10.834.372A1.123 1.123 0 0 0 10 0a1.128 1.128 0 0 0-.833.368L1.29 8.957a1.249 1.249 0 0 0-.171 1.343 1.114 1.114 0 0 0 1.007.7H6v6.877A1.125 1.125 0 0 0 7.123 19h5.754A1.125 1.125 0 0 0 14 17.877V11h3.877a1.114 1.114 0 0 0 1.005-.7 1.251 1.251 0 0 0-.176-1.347Z"/></svg></button>
    </div>`,
  init(root) {
    const pill = root.querySelector('.pill');
    const up = root.querySelector('.u');
    const dn = root.querySelector('.d');
    const n = root.querySelector('.n');
    const base = 1243;
    let state = 0;
    const render = () => {
      pill.classList.toggle('up', state === 1);
      pill.classList.toggle('down', state === -1);
      up.setAttribute('aria-pressed', String(state === 1));
      dn.setAttribute('aria-pressed', String(state === -1));
      const v = base + state;
      n.textContent = (v / 1000).toFixed(1) + 'K';
    };
    up.addEventListener('click', () => { state = state === 1 ? 0 : 1; render(); });
    dn.addEventListener('click', () => { state = state === -1 ? 0 : -1; render(); });
  },
};
