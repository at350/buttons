export default {
  id: 'bt-github-star',
  credit: 'GitHub — repo "Star" button with count badge (fills gold when starred)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .star {
      height: 32px; padding: 5px 12px; border: 1px solid rgba(31,35,40,.15); border-radius: 6px; cursor: pointer;
      background: #f6f8fa; color: #24292f; font: 500 14px/20px -apple-system, "Segoe UI", system-ui, sans-serif;
      display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 1px 0 rgba(31,35,40,.04);
      transition: background .08s; -webkit-tap-highlight-color: transparent;
    }
    .star:hover { background: #f3f4f6; }
    .star:active { background: #ebecf0; }
    .star:focus-visible { outline: 2px solid #0969da; outline-offset: -2px; }
    .star svg { width: 16px; height: 16px; fill: #656d76; transition: fill .15s, transform .3s cubic-bezier(.34,1.56,.64,1); }
    .star[aria-pressed="true"] svg { fill: #e3b341; transform: rotate(72deg) scale(1.1); }
    .star .lbl::after { content: 'Star'; }
    .star[aria-pressed="true"] .lbl::after { content: 'Starred'; }
    .cnt { padding: 0 6px; min-width: 20px; height: 20px; border-radius: 10px; background: rgba(175,184,193,.2); font: 500 12px/20px inherit; color: #24292f; }
    .ic { position: relative; display: inline-flex; }
    .spark { position: absolute; inset: -6px; pointer-events: none; }
    .spark i { position: absolute; left: 50%; top: 50%; width: 3px; height: 3px; border-radius: 50%; background: #e3b341; opacity: 0; }
    .star[aria-pressed="true"] .spark i { animation: pop .5s ease-out forwards; }
    @keyframes pop { 0% { opacity: 1; transform: rotate(var(--a)) translateY(0); } 100% { opacity: 0; transform: rotate(var(--a)) translateY(-16px); } }
  `,
  html: `
    <button class="star" type="button" aria-pressed="false">
      <span class="ic">
        <svg viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
        <span class="spark"><i style="--a:0deg"></i><i style="--a:60deg"></i><i style="--a:120deg"></i><i style="--a:180deg"></i><i style="--a:240deg"></i><i style="--a:300deg"></i></span>
      </span>
      <span class="lbl"></span>
      <span class="cnt">4.2k</span>
    </button>`,
  init(root) {
    const b = root.querySelector('.star');
    const c = root.querySelector('.cnt');
    let n = 4214;
    const fmt = (v) => (v >= 1000 ? (v / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(v));
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', on);
      n += on ? 1 : -1;
      c.textContent = fmt(n);
    });
  },
};
