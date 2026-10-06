export default {
  id: 'rt-win7-aero',
  credit: 'Windows 7 (Aero) — Notepad "save changes" task dialog: glass frame, red close button, glowing default command button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 14px; border-radius: 12px; display: block; width: 352px;
      background: radial-gradient(ellipse at 30% 110%, #3fa9f5 0%, transparent 55%), linear-gradient(160deg, #0f4c8e, #1a6dbd 50%, #0b3d73); }
    .glass { position: relative; border-radius: 7px 7px 5px 5px; padding: 0 7px 7px; border: 1px solid rgba(0,0,0,.55);
      background: linear-gradient(180deg, rgba(255,255,255,.55), rgba(178,207,235,.65) 22px, rgba(150,186,222,.7) 60%, rgba(135,176,216,.75));
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.6), 0 6px 18px rgba(0,0,0,.45); overflow: hidden; }
    .glass::before { content: ""; position: absolute; inset: 0; pointer-events: none; opacity: .5;
      background: linear-gradient(115deg, transparent 18%, rgba(255,255,255,.55) 20%, transparent 26%, transparent 52%, rgba(255,255,255,.4) 54%, transparent 60%); }
    .bar { height: 28px; display: flex; align-items: flex-start; position: relative; }
    .ttl { padding: 6px 0 0 2px; font: 12px "Segoe UI", Tahoma, sans-serif; color: #000; text-shadow: 0 0 8px #fff, 0 0 4px #fff, 0 0 2px #fff; }
    .caps { margin-left: auto; display: flex; border: 1px solid rgba(0,0,0,.45); border-top: none; border-radius: 0 0 5px 5px; overflow: hidden; margin-top: -1px;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.5); }
    .caps button { height: 19px; border: none; padding: 0; margin: 0; display: grid; place-items: center; cursor: default; outline: none;
      background: linear-gradient(rgba(255,255,255,.55), rgba(255,255,255,.2) 50%, rgba(160,190,220,.3) 50%, rgba(255,255,255,.45)); border-right: 1px solid rgba(0,0,0,.3); }
    .caps .mn { width: 26px; } .caps .mx { width: 25px; }
    .caps .cl { width: 43px; border-right: none; background: linear-gradient(#e8a493, #d37760 45%, #c14b33 50%, #d06a4f 80%, #e4987f); }
    .caps button:hover { background: linear-gradient(#bde6fd, #5cb1ef 50%, #1d7de0 50%, #47bbff); }
    .caps .cl:hover { background: linear-gradient(#f9b5a6, #ec7056 45%, #d43511 50%, #e2633f 80%, #ffb08f); }
    .caps button:active { filter: brightness(.82); }
    .caps svg { display: block; filter: drop-shadow(0 0 1px rgba(0,0,0,.8)); }
    .caps button:focus-visible { box-shadow: inset 0 0 0 1px #fff; }
    .dlg { background: #fff; border: 1px solid rgba(0,0,0,.45); font: 12px "Segoe UI", Tahoma, sans-serif; color: #000; }
    .main { padding: 14px 12px 18px; font-size: 14px; color: #003399; white-space: nowrap; }
    .cmd { display: flex; justify-content: flex-end; gap: 8px; padding: 10px 10px; background: #f0f0f0; border-top: 1px solid #dfdfdf; }
    .btn { min-width: 75px; height: 23px; padding: 0 10px; border: 1px solid #707070; border-radius: 3px; color: #000; position: relative; outline: none; cursor: default; white-space: nowrap;
      font: 12px "Segoe UI", Tahoma, sans-serif; background: linear-gradient(180deg, #f2f2f2 45%, #ebebeb 45%, #cfcfcf); box-shadow: inset 0 0 0 1px rgba(255,255,255,.8);
      transition: border-color .25s; }
    .btn::before { content: ""; position: absolute; inset: 0; border-radius: 2px; opacity: 0; transition: opacity .25s; pointer-events: none;
      background: linear-gradient(180deg, #eaf6fd 45%, #bee6fd 45%, #a7d9f5); box-shadow: inset 0 0 0 1px rgba(255,255,255,.8); }
    .btn span { position: relative; }
    .btn.def { border-color: #3c7fb1; box-shadow: inset 0 0 0 1px #48d4f8; }
    .btn.def::before { animation: pulse 1.25s ease-in-out infinite alternate; }
    .btn:hover { border-color: #3c7fb1; }
    .btn:hover::before { opacity: 1; animation: none; }
    .btn:active { border-color: #2c628b; }
    .btn:active::before { opacity: 1; animation: none; transition: none; background: linear-gradient(180deg, #e5f4fc, #c4e5f6 45%, #98d1ef 45%, #68b3db); box-shadow: inset 1px 1px 1px rgba(0,0,0,.25); }
    .btn.def:focus-visible span { outline: 1px dotted #000; outline-offset: 1px; }
    @keyframes pulse { from { opacity: 0; } to { opacity: .85; } }
  `,
  html: `
    <div class="stage"><div class="glass">
      <div class="bar"><span class="ttl">Notepad</span>
        <div class="caps">
          <button class="mn" type="button" aria-label="Minimize"><svg width="10" height="4" viewBox="0 0 10 4"><rect x=".5" y=".5" width="9" height="3" fill="#fff" stroke="#333" stroke-width="1"/></svg></button>
          <button class="mx" type="button" aria-label="Maximize"><svg width="10" height="9" viewBox="0 0 10 9"><path d="M.5.5h9v8h-9z" fill="none" stroke="#333"/><path d="M1.5 1.5h7v6h-7z" fill="none" stroke="#fff" stroke-width="1"/><path d="M2.5 3.5h5v3h-5z" fill="none" stroke="#333"/></svg></button>
          <button class="cl" type="button" aria-label="Close"><svg width="11" height="10" viewBox="0 0 11 10"><path d="M1.5 1l8 8M9.5 1l-8 8" stroke="#3a1a10" stroke-width="3.2"/><path d="M1.5 1l8 8M9.5 1l-8 8" stroke="#fff" stroke-width="1.8"/></svg></button>
        </div>
      </div>
      <div class="dlg">
        <div class="main">Do you want to save changes to Untitled?</div>
        <div class="cmd">
          <button class="btn def" type="button"><span>Save</span></button>
          <button class="btn" type="button"><span>Don't Save</span></button>
          <button class="btn" type="button"><span>Cancel</span></button>
        </div>
      </div>
    </div></div>`,
  init(root) {
    const bs = [...root.querySelectorAll('.btn')];
    const take = (b) => bs.forEach((o) => o.classList.toggle('def', o === b));
    bs.forEach((b) => { b.addEventListener('pointerdown', () => take(b)); b.addEventListener('focus', () => take(b)); });
  },
};
