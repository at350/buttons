export default {
  id: 'bt-fluent-accent',
  credit: 'Microsoft Fluent 2 — primary (accent) button and secondary button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 8px; flex-wrap: wrap; }
    .fl {
      height: 32px; min-width: 96px; padding: 0 12px; border-radius: 4px;
      font: 600 14px/20px "Segoe UI Variable", "Segoe UI", system-ui, sans-serif; cursor: pointer;
      transition: background .1s, border-color .1s, color .1s; -webkit-tap-highlight-color: transparent;
    }
    .primary { background: #0f6cbd; color: #fff; border: 1px solid transparent; }
    .primary:hover { background: #115ea3; }
    .primary:active { background: #0f548c; }
    .secondary { background: #fff; color: #242424; border: 1px solid #d1d1d1; }
    .secondary:hover { background: #f5f5f5; border-color: #c7c7c7; }
    .secondary:active { background: #e0e0e0; border-color: #b3b3b3; }
    .fl:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000; }
    .primary[aria-pressed="true"] { background: #0c3b5e; }
  `,
  html: `
    <div class="row">
      <button class="fl primary" type="button" aria-pressed="false">Save</button>
      <button class="fl secondary" type="button">Cancel</button>
    </div>`,
  init(root) {
    const p = root.querySelector('.primary');
    const s = root.querySelector('.secondary');
    p.addEventListener('click', () => { p.setAttribute('aria-pressed', 'true'); p.textContent = 'Saved'; });
    s.addEventListener('click', () => { p.setAttribute('aria-pressed', 'false'); p.textContent = 'Save'; });
  },
};
