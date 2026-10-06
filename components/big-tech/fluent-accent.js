// Fluent 2 (Fluent UI React v9) primary and secondary buttons, web light theme tokens. "Save" / "Saved" share one
// grid cell so the primary keeps its width.
export default {
  id: 'bt-fluent-accent',
  credit: 'Microsoft Fluent 2 — primary and secondary Button (Fluent UI React v9 tokens)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 8px; white-space: nowrap; }
    .fl {
      height: 32px; min-width: 96px; padding: 5px 12px; border-radius: 4px; display: inline-grid; place-items: center;
      font: 600 14px/20px "Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif; cursor: pointer;
      transition: background-color .1s cubic-bezier(.33,0,.67,1), border-color .1s cubic-bezier(.33,0,.67,1), color .1s cubic-bezier(.33,0,.67,1);
      -webkit-tap-highlight-color: transparent; outline: none;
    }
    .fl > span { grid-area: 1 / 1; }
    .primary { background: #0f6cbd; color: #fff; border: 1px solid transparent; }
    .primary:hover { background: #115ea3; }
    .primary:active { background: #0c3b5e; }
    .primary[aria-pressed="true"] { background: #0f548c; }
    .secondary { background: #fff; color: #242424; border: 1px solid #d1d1d1; }
    .secondary:hover { background: #f5f5f5; border-color: #c7c7c7; }
    .secondary:active { background: #e0e0e0; border-color: #b3b3b3; }
    .fl:focus-visible { border-color: transparent; box-shadow: inset 0 0 0 1px #fff, 0 0 0 2px #000; }
    .primary .b { visibility: hidden; }
    .primary[aria-pressed="true"] .a { visibility: hidden; }
    .primary[aria-pressed="true"] .b { visibility: visible; }
  `,
  html: `
    <div class="row">
      <button class="fl primary" type="button" aria-pressed="false"><span class="a">Save</span><span class="b">Saved</span></button>
      <button class="fl secondary" type="button">Cancel</button>
    </div>`,
  init(root) {
    const p = root.querySelector('.primary');
    const s = root.querySelector('.secondary');
    p.addEventListener('click', () => p.setAttribute('aria-pressed', 'true'));
    s.addEventListener('click', () => p.setAttribute('aria-pressed', 'false'));
  },
};
