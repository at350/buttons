export default {
  id: 'rt-xp-button',
  credit: 'Windows XP (Luna) — glossy push button with orange hover glow and blue default ring',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #ece9d8; padding: 14px; border-radius: 12px; display: inline-flex; gap: 8px; }
    .btn { min-width: 75px; height: 23px; padding: 0 12px; border: 1px solid #003c74; border-radius: 3px;
      background: linear-gradient(#fff 0%, #ecebe5 86%, #d8d0c4 100%); color: #000;
      font: 11px Tahoma, "Segoe UI", Arial, sans-serif; cursor: default; position: relative;
      box-shadow: inset 1px 1px #fff, inset -1px -1px #dcd6c6; }
    .btn.default { box-shadow: inset 0 0 0 1px #90b4e6, inset 0 0 0 2px #c3d9f9, inset 1px 1px #fff; }
    .btn:hover { box-shadow: inset 0 0 0 1px #ffd59d, inset 0 0 0 2px #fcc47f, inset 0 -2px 0 1px #f5a44a; }
    .btn:active { background: linear-gradient(#cdcac3 0%, #e3e1da 20%, #e3e1da 100%); box-shadow: inset 1px 1px 2px rgba(0,0,0,.2); }
    .btn:focus-visible { outline: 1px dotted #000; outline-offset: -4px; }
    .btn.down { background: linear-gradient(#e3e1da 0%, #cdcac3 100%); box-shadow: inset 0 0 0 1px #90b4e6, inset 1px 1px 2px rgba(0,0,0,.25); }
  `,
  html: `
    <div class="stage">
      <button class="btn default" type="button" aria-pressed="false">OK</button>
      <button class="btn" type="button" aria-pressed="false">Cancel</button>
      <button class="btn" type="button" aria-pressed="false">Apply</button>
    </div>`,
  init(root) {
    root.querySelectorAll('.btn').forEach((b) => b.addEventListener('click', () => {
      const on = !b.classList.contains('down');
      root.querySelectorAll('.btn').forEach((o) => { o.classList.remove('down'); o.setAttribute('aria-pressed', 'false'); });
      b.classList.toggle('down', on); b.setAttribute('aria-pressed', String(on));
    }));
  },
};
