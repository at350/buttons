export default {
  id: 'bt-reddit-vote',
  credit: 'Reddit — upvote / downvote pill with count (orange up, periwinkle down)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .pill {
      display: inline-flex; align-items: center; height: 32px; border-radius: 16px; background: #e5ebee; color: #0f1a1c;
      font: 600 13px/1 -apple-system, "Segoe UI", system-ui, sans-serif; transition: background .15s, color .15s;
    }
    .pill.up { background: #d93a00; color: #fff; }
    .pill.down { background: #6a5cff; color: #fff; }
    .vb {
      width: 32px; height: 32px; border: 0; background: transparent; color: inherit; cursor: pointer; padding: 0; border-radius: 50%;
      display: inline-flex; align-items: center; justify-content: center; transition: background .1s; -webkit-tap-highlight-color: transparent;
    }
    .vb:hover { background: rgba(0,0,0,.1); }
    .pill.up .vb:hover, .pill.down .vb:hover { background: rgba(255,255,255,.2); }
    .vb:focus-visible { outline: 2px solid #0079d3; outline-offset: -2px; }
    .vb svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linejoin: round; transition: transform .15s; }
    .pill:not(.up) .u:hover svg { stroke: #d93a00; }
    .pill:not(.down) .d:hover svg { stroke: #6a5cff; }
    .pill.up .u svg { fill: currentColor; animation: nudge .25s; }
    .pill.down .d svg { fill: currentColor; animation: nudged .25s; }
    @keyframes nudge { 50% { transform: translateY(-4px); } }
    @keyframes nudged { 50% { transform: translateY(4px); } }
    .n { min-width: 28px; text-align: center; font-variant-numeric: tabular-nums; }
  `,
  html: `
    <div class="pill">
      <button class="vb u" type="button" aria-pressed="false" aria-label="Upvote"><svg viewBox="0 0 20 20"><path d="M10 2.5 2.5 10h4.5v7h6v-7h4.5z"/></svg></button>
      <span class="n">1.2k</span>
      <button class="vb d" type="button" aria-pressed="false" aria-label="Downvote"><svg viewBox="0 0 20 20"><path d="M10 17.5 17.5 10H13V3H7v7H2.5z"/></svg></button>
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
      up.setAttribute('aria-pressed', state === 1);
      dn.setAttribute('aria-pressed', state === -1);
      const v = base + state;
      n.textContent = (v / 1000).toFixed(1) + 'k';
    };
    up.addEventListener('click', () => { state = state === 1 ? 0 : 1; render(); });
    dn.addEventListener('click', () => { state = state === -1 ? 0 : -1; render(); });
  },
};
