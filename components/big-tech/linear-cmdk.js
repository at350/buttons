export default {
  id: 'bt-linear-cmdk',
  credit: 'Linear — dark command-menu trigger with ⌘K keycap and indigo focus glow',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 20px 24px; border-radius: 12px; background: #0f1011; }
    .ck {
      height: 36px; padding: 0 10px 0 12px; border-radius: 8px; cursor: pointer;
      background: #191a1c; color: #8a8f98; border: 1px solid #2b2d31;
      font: 500 13px/1 Inter, -apple-system, system-ui, sans-serif;
      display: inline-flex; align-items: center; gap: 24px; transition: border-color .15s, color .15s, background .15s, box-shadow .15s;
      -webkit-tap-highlight-color: transparent;
    }
    .ck:hover { border-color: #3a3c42; color: #d0d2d8; background: #1e1f22; }
    .ck:active { background: #161718; }
    .ck:focus-visible { outline: none; border-color: #5e6ad2; box-shadow: 0 0 0 3px rgba(94,106,210,.35); }
    .ck[aria-expanded="true"] { border-color: #5e6ad2; color: #f7f8f8; box-shadow: 0 0 0 3px rgba(94,106,210,.25), 0 0 24px rgba(94,106,210,.25); }
    .ck svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; }
    .l { display: inline-flex; align-items: center; gap: 8px; }
    kbd {
      display: inline-flex; align-items: center; gap: 2px; height: 20px; padding: 0 5px; border-radius: 4px;
      background: #27282c; color: #8a8f98; border: 1px solid #3a3c42; border-bottom-width: 2px;
      font: 500 11px/1 Inter, -apple-system, system-ui, sans-serif; transition: transform .1s, border-bottom-width .1s;
    }
    .ck:active kbd, .ck[aria-expanded="true"] kbd { transform: translateY(1px); border-bottom-width: 1px; }
    .ck[aria-expanded="true"] kbd { color: #f7f8f8; }
  `,
  html: `
    <div class="stage">
      <button class="ck" type="button" aria-expanded="false">
        <span class="l"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>Search</span>
        <kbd><span>⌘</span><span>K</span></kbd>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.ck');
    b.addEventListener('click', () => b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') !== 'true'));
    b.addEventListener('keydown', (e) => { if (e.key === 'Escape') b.setAttribute('aria-expanded', 'false'); });
  },
};
