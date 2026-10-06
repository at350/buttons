export default {
  id: 'rt-aqua-button',
  credit: 'Mac OS X 10.0–10.4 (Aqua) — pulsing blue gel default button on pinstripes',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 16px; border-radius: 12px; display: inline-flex; gap: 12px; align-items: center;
      background: repeating-linear-gradient(0deg, #e8e8e8 0 2px, #f4f4f4 2px 4px); }
    .btn { position: relative; min-width: 72px; height: 22px; padding: 0 16px; border: 1px solid #8e8e8e; border-radius: 11px; overflow: hidden;
      font: 13px "Lucida Grande", "Helvetica Neue", Helvetica, Arial, sans-serif; color: #000; cursor: default;
      background: linear-gradient(#fdfdfd, #e4e4e4 50%, #d0d0d0 51%, #f0f0f0); box-shadow: 0 1px 1px rgba(0,0,0,.25); }
    .btn::before { content: ""; position: absolute; left: 6%; right: 6%; top: 1px; height: 45%; border-radius: 50% 50% 50% 50% / 100% 100% 0 0;
      background: linear-gradient(rgba(255,255,255,.95), rgba(255,255,255,.25)); pointer-events: none; }
    .btn.blue { border-color: #2f5fb3;
      background: linear-gradient(#a4c2f5 0%, #5a93e8 45%, #2f6fdf 50%, #4d8ff0 75%, #8fc0f8 100%);
      animation: pulse 1.1s ease-in-out infinite alternate; }
    .btn:active, .btn.down { filter: brightness(.82); animation: none; }
    .btn:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(100,150,240,.7); }
    @keyframes pulse { from { filter: saturate(.75) brightness(1.05); } to { filter: saturate(1.4) brightness(1); } }
  `,
  html: `
    <div class="stage">
      <button class="btn" type="button" aria-pressed="false">Cancel</button>
      <button class="btn blue" type="button" aria-pressed="false">OK</button>
    </div>`,
  init(root) {
    root.querySelectorAll('.btn').forEach((b) => b.addEventListener('click', () => {
      const on = !b.classList.contains('down');
      root.querySelectorAll('.btn').forEach((o) => { o.classList.remove('down'); o.setAttribute('aria-pressed', 'false'); });
      b.classList.toggle('down', on); b.setAttribute('aria-pressed', String(on));
    }));
  },
};
