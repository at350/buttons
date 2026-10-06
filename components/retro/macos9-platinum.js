export default {
  id: 'rt-macos9-platinum',
  credit: 'Mac OS 9 (Platinum) — push button with the pulsing black default ring',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 16px; border-radius: 12px; display: inline-flex; gap: 12px; align-items: center;
      background: repeating-linear-gradient(0deg, #e8e8e8 0 1px, #dddddd 1px 2px); }
    .wrap { padding: 3px; border-radius: 9px; }
    .wrap.default { border: 3px solid #000; padding: 0; background: #000; border-radius: 9px; }
    .btn { min-width: 69px; height: 20px; padding: 0 12px; border: 1px solid #000; border-radius: 6px; color: #000;
      font: 12px "Charcoal", "Chicago", "Helvetica Neue", Helvetica, Arial, sans-serif; cursor: default;
      background: linear-gradient(#fff, #ececec 50%, #d6d6d6); box-shadow: inset 1px 1px #fff, inset -1px -1px #999; }
    .default .btn { animation: pulse 1.2s ease-in-out infinite alternate; }
    .btn:active, .btn.down { background: linear-gradient(#5a5a5a, #7a7a7a); color: #fff; box-shadow: inset 1px 1px #333, inset -1px -1px #8a8a8a; animation: none; }
    .btn:focus-visible { outline: none; box-shadow: 0 0 0 2px #6b8fd6; }
    @keyframes pulse {
      from { background: linear-gradient(#fff, #ececec 50%, #d6d6d6); }
      to { background: linear-gradient(#cdd6ea, #9fb3d9 50%, #7f98cf); }
    }
  `,
  html: `
    <div class="stage">
      <div class="wrap"><button class="btn" type="button" aria-pressed="false">Cancel</button></div>
      <div class="wrap default"><button class="btn" type="button" aria-pressed="false">OK</button></div>
    </div>`,
  init(root) {
    root.querySelectorAll('.btn').forEach((b) => b.addEventListener('click', () => {
      const on = !b.classList.contains('down');
      root.querySelectorAll('.btn').forEach((o) => { o.classList.remove('down'); o.setAttribute('aria-pressed', 'false'); });
      b.classList.toggle('down', on); b.setAttribute('aria-pressed', String(on));
    }));
  },
};
