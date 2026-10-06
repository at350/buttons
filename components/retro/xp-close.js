const G = {
  min: '<svg width="21" height="21" viewBox="0 0 21 21" shape-rendering="crispEdges"><path d="M5 13h7v3H5z"/></svg>',
  max: '<svg width="21" height="21" viewBox="0 0 21 21" shape-rendering="crispEdges"><path d="M5 5h11v11H5zM6 8v7h9V8z" fill-rule="evenodd"/></svg>',
  res: '<svg width="21" height="21" viewBox="0 0 21 21" shape-rendering="crispEdges"><path d="M8 4h9v9h-3v-1h2V7H9v1H8z" fill-rule="evenodd"/><path d="M4 8h9v9H4zM5 11v5h7v-5z" fill-rule="evenodd"/></svg>',
  close: '<svg width="21" height="21" viewBox="0 0 21 21"><path d="M6 6l9 9M15 6l-9 9" stroke="#fff" stroke-width="2.2" stroke-linecap="square"/></svg>',
};
const ICON = '<svg class="ico" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 1.5h7l2 2v11h-9z" fill="#fff" stroke="#5a6f8f"/><path d="M5 5h6M5 7h6M5 9h6M5 11h4" stroke="#7fa0d0"/><path d="M3 1h1v2H3zM6 1h1v2H6zM9 1h1v2H9z" fill="#4a5a75"/></svg>';
export default {
  id: 'rt-xp-close',
  credit: 'Windows XP (Luna) — window caption with blue minimize / maximize and red-orange close buttons',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #3a6ea5 url(assets/square/49.webp) center 78% / cover; padding: 12px; border-radius: 12px; width: 288px; height: 112px; position: relative; overflow: hidden; }
    .win { position: absolute; left: 12px; top: 12px; right: 12px; bottom: 12px; display: flex; flex-direction: column; border-radius: 8px 8px 0 0;
      background: #0831d9; padding: 0 3px 3px; transition: opacity .15s; }
    .win.max { left: 0; top: 0; right: 0; bottom: 0; border-radius: 0; }
    .win.gone { opacity: 0; pointer-events: none; }
    .title { height: 30px; flex: none; display: flex; align-items: center; gap: 2px; padding: 0 2px 0 3px; margin: 0 -3px; border-radius: 8px 8px 0 0;
      background: linear-gradient(180deg, #0997ff, #0053ee 8%, #0050ee 40%, #06f 88%, #06f 93%, #005bff 95%, #003dd7 96%, #003dd7);
      font: 700 13px/1 "Trebuchet MS", Tahoma, sans-serif; color: #fff; text-shadow: 1px 1px #0f1089; user-select: none; }
    .win.max .title { border-radius: 0; }
    .win.inactive { background: #7a96df; }
    .win.inactive .title { background: linear-gradient(180deg, #a5c1f6, #7a96df 10%, #7b98e3 85%, #6a83cc); color: #d8e4f8; text-shadow: none; }
    .ico { flex: none; margin: 0 3px 0 2px; }
    .txt { flex: 1; white-space: nowrap; overflow: hidden; }
    .cap { width: 21px; height: 21px; flex: none; padding: 0; margin: 0; border: 1px solid #fff; border-radius: 3px; display: grid; place-items: center; cursor: default; outline: none; color: #fff;
      background: radial-gradient(circle at 90% 90%, #0054e9 0%, #2263d5 55%, #4479e4 70%, #a3bbec 90%, #fff 100%); }
    .cap svg { display: block; fill: #fff; margin: -1px; }
    .cap:hover { filter: brightness(1.15) saturate(1.1); }
    .cap:active { filter: brightness(.82); }
    .cap:active svg { transform: translate(1px, 1px); }
    .cap:focus-visible { box-shadow: 0 0 0 1px #003dd7, 0 0 0 2px #fff; }
    .cap.close { margin-left: 2px; background: radial-gradient(circle at 90% 90%, #cc4600 0%, #dc6527 55%, #cd7546 70%, #ffccb2 90%, #fff 100%); }
    .win.inactive .cap { opacity: .6; }
    .cap.res { display: none; } .win.max .maxi { display: none; } .win.max .res { display: grid; }
    .menu { display: flex; height: 20px; flex: none; align-items: center; background: #ece9d8; font: 11px Tahoma, sans-serif; color: #000; padding: 0 2px; }
    .menu span { padding: 0 6px; }
    .body { flex: 1; background: #fff; border: 1px solid #7f9db9; }
    .flash { position: absolute; inset: 0; pointer-events: none; }
  `,
  html: `
    <div class="stage">
      <div class="win">
        <div class="title">${ICON}<span class="txt">Untitled - Notepad</span>
          <button class="cap mini" type="button" aria-label="Minimize">${G.min}</button>
          <button class="cap maxi" type="button" aria-label="Maximize">${G.max}</button>
          <button class="cap res" type="button" aria-label="Restore Down">${G.res}</button>
          <button class="cap close" type="button" aria-label="Close">${G.close}</button>
        </div>
        <div class="menu"><span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span></div>
        <div class="body"></div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), win = root.querySelector('.win');
    let t = 0;
    const hideFor = (ms) => { win.classList.add('gone'); clearTimeout(t); t = setTimeout(() => win.classList.remove('gone'), ms); };
    stage.addEventListener('pointerdown', (e) => win.classList.toggle('inactive', !win.contains(e.target)));
    root.querySelector('.mini').addEventListener('click', () => hideFor(700));
    const max = () => win.classList.toggle('max');
    root.querySelector('.maxi').addEventListener('click', max);
    root.querySelector('.res').addEventListener('click', max);
    root.querySelector('.title').addEventListener('dblclick', (e) => { if (!e.target.closest('.cap')) max(); });
    root.querySelector('.close').addEventListener('click', () => { hideFor(900); setTimeout(() => win.classList.remove('max'), 200); });
    return () => clearTimeout(t);
  },
};
