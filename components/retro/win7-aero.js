export default {
  id: 'rt-win7-aero',
  credit: 'Windows 7 (Aero) — glass command button with pale-blue hover and pulsing default glow',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 16px; border-radius: 12px; display: inline-flex; gap: 8px;
      background: linear-gradient(135deg, #8fb7df, #5a8dc2 45%, #3c6fa6); position: relative; overflow: hidden; }
    .stage::before { content: ""; position: absolute; inset: 0; background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,.35) 50%, transparent 65%); pointer-events: none; }
    .glass { background: rgba(240,240,240,.92); padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,.7); display: flex; gap: 8px; position: relative; box-shadow: 0 4px 14px rgba(0,0,0,.3); }
    .btn { min-width: 75px; height: 23px; padding: 0 12px; border: 1px solid #707070; border-radius: 3px; color: #000;
      font: 12px "Segoe UI", Tahoma, Arial, sans-serif; cursor: default; position: relative;
      background: linear-gradient(#f2f2f2 0%, #ebebeb 50%, #dddddd 50%, #cfcfcf 100%);
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.8); transition: background .18s, box-shadow .18s; }
    .btn.default { border-color: #3c7fb1; animation: pulse 1.4s ease-in-out infinite alternate; }
    .btn:hover { background: linear-gradient(#eaf6fd 0%, #d9f0fc 50%, #bee6fd 50%, #a7d9f5 100%); border-color: #3c7fb1; animation: none; }
    .btn:active, .btn.down { background: linear-gradient(#e5f4fc 0%, #c4e5f6 50%, #98d1ef 50%, #68b3db 100%); border-color: #2c628b;
      box-shadow: inset 0 1px 3px rgba(0,0,0,.35); animation: none; }
    .btn:focus-visible { outline: 1px dotted #000; outline-offset: -3px; }
    @keyframes pulse { from { box-shadow: inset 0 0 0 1px #c6e4f8, 0 0 1px rgba(60,127,177,.2); } to { box-shadow: inset 0 0 0 1px #c6e4f8, 0 0 6px 1px rgba(60,127,177,.9); } }
  `,
  html: `
    <div class="stage"><div class="glass">
      <button class="btn default" type="button" aria-pressed="false">OK</button>
      <button class="btn" type="button" aria-pressed="false">Cancel</button>
    </div></div>`,
  init(root) {
    root.querySelectorAll('.btn').forEach((b) => b.addEventListener('click', () => {
      const on = !b.classList.contains('down');
      root.querySelectorAll('.btn').forEach((o) => { o.classList.remove('down'); o.setAttribute('aria-pressed', 'false'); });
      b.classList.toggle('down', on); b.setAttribute('aria-pressed', String(on));
    }));
  },
};
