// GitHub repo "Star" button. "Star" / "Starred" are stacked in one grid cell so the button keeps the wider width.
export default {
  id: 'bt-github-star',
  credit: 'GitHub — repo "Star" / "Starred" button with counter (Primer)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .star {
      height: 28px; padding: 0 8px; border: 1px solid #d1d9e0; border-radius: 6px; cursor: pointer;
      background: #f6f8fa; color: #25292e; font: 500 12px/20px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
      display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 1px 0 0 rgba(31,35,40,.04); white-space: nowrap;
      transition: background 80ms cubic-bezier(.65,0,.35,1), border-color 80ms; -webkit-tap-highlight-color: transparent;
    }
    .star:hover { background: #eff2f5; border-color: #d1d9e0; }
    .star:active { background: #e6eaef; }
    .star:focus-visible { outline: 2px solid #0969da; outline-offset: -2px; }
    .star svg { width: 16px; height: 16px; fill: #59636e; display: block; }
    .ic { display: grid; }
    .ic svg { grid-area: 1 / 1; }
    .ic .on { visibility: hidden; fill: #eac54f; }
    .star[aria-pressed="true"] .ic .off { visibility: hidden; }
    .star[aria-pressed="true"] .ic .on { visibility: visible; }
    .lbl { display: grid; }
    .lbl span { grid-area: 1 / 1; }
    .lbl .b { visibility: hidden; }
    .star[aria-pressed="true"] .lbl .a { visibility: hidden; }
    .star[aria-pressed="true"] .lbl .b { visibility: visible; }
    .cnt {
      display: inline-block; min-width: 20px; padding: 0 6px; border: 1px solid transparent; border-radius: 2em;
      background: rgba(129,139,152,.12); color: #1f2328; font-size: 12px; font-weight: 500; line-height: 18px; text-align: center;
    }
  `,
  html: `
    <button class="star" type="button" aria-pressed="false">
      <span class="ic" aria-hidden="true">
        <svg class="off" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"/></svg>
        <svg class="on" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
      </span>
      <span class="lbl"><span class="a">Star</span><span class="b" aria-hidden="true">Starred</span></span>
      <span class="cnt">4.2k</span>
    </button>`,
  init(root) {
    const b = root.querySelector('.star');
    const c = root.querySelector('.cnt');
    const n = 4214;
    const fmt = (v) => (v >= 1000 ? (v / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(v));
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      c.textContent = fmt(n + (on ? 1 : 0));
    });
  },
};
