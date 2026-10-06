// Marlett caption glyphs, pixel for pixel
const G = {
  min: '<svg width="6" height="2" viewBox="0 0 6 2" shape-rendering="crispEdges"><path d="M0 0h6v2h-6z"/></svg>',
  max: '<svg width="9" height="9" viewBox="0 0 9 9" shape-rendering="crispEdges"><path d="M0 0h9v2h-9zM0 2h1v6h-1zM8 2h1v6h-1zM0 8h9v1h-9z"/></svg>',
  res: '<svg width="8" height="9" viewBox="0 0 8 9" shape-rendering="crispEdges"><path d="M2 0h6v2h-6zM7 2h1v4h-1zM6 5h1v1h-1zM2 2h1v1h-1zM0 3h6v2h-6zM0 5h1v3h-1zM5 5h1v3h-1zM0 8h6v1h-6z"/></svg>',
  close: '<svg width="8" height="7" viewBox="0 0 8 7" shape-rendering="crispEdges"><path d="M0 0h2v1h-2zM6 0h2v1h-2zM1 1h2v1h-2zM5 1h2v1h-2zM2 2h4v1h-4zM3 3h2v1h-2zM2 4h4v1h-4zM1 5h2v1h-2zM5 5h2v1h-2zM0 6h2v1h-2zM6 6h2v1h-2z"/></svg>',
};
const NOTEPAD = '<svg class="icon" width="16" height="16" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true"><path d="M3 1h9v1h1v13H3z" fill="#fff"/><path d="M2 1h1v15h11V2h-1v13H3V1z" fill="#000"/><path d="M3 0h9v1H3z" fill="#000"/><path d="M5 4h6v1H5zM5 6h6v1H5zM5 8h6v1H5zM5 10h4v1H5z" fill="#000080"/><path d="M4 1h1v2H4zM7 1h1v2H7zM10 1h1v2h-1z" fill="#808080"/></svg>';
export default {
  id: 'rt-win95-titlebar',
  credit: 'Windows 98 — Notepad window: navy-to-blue gradient caption, Marlett minimize / maximize / close buttons',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { background: #008080; border-radius: 12px; position: relative; height: 168px; min-width: 300px; overflow: hidden;
      font: 11px/13px "MS Sans Serif", "Microsoft Sans Serif", Tahoma, Arial, sans-serif; -webkit-font-smoothing: none; color: #000; }
    .win { position: absolute; left: 16px; top: 14px; right: 16px; bottom: 16px; background: #c0c0c0; padding: 3px; display: flex; flex-direction: column;
      box-shadow: inset -1px -1px #000, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #fff; }
    .win.max { left: 0; top: 0; right: 0; bottom: 0; }
    .win.min, .win.closed { visibility: hidden; }
    .title { display: flex; align-items: center; height: 18px; flex: none; padding: 0 2px 0 2px; gap: 0;
      background: linear-gradient(90deg, #000080, #1084d0); color: #fff; font-weight: bold; user-select: none; }
    .win.inactive .title { background: linear-gradient(90deg, #808080, #b5b5b5); color: #c0c0c0; }
    .title .icon { flex: none; margin-right: 3px; }
    .title .text { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .cb { width: 16px; height: 14px; flex: none; background: #c0c0c0; border: none; border-radius: 0; padding: 0; margin: 0; display: grid; place-items: center; cursor: default; outline: none; color: #000;
      box-shadow: inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; }
    .cb svg { display: block; fill: currentColor; }
    .cb.mini svg { margin-top: 6px; margin-right: 2px; }
    .cb:active { box-shadow: inset 1px 1px #000, inset -1px -1px #fff, inset 2px 2px #808080, inset -2px -2px #dfdfdf; }
    .cb:active svg { transform: translate(1px, 1px); }
    .cb:focus-visible svg { outline: 1px dotted #000; outline-offset: 1px; }
    .cb.close { margin-left: 2px; }
    .res { display: none; }
    .win.max .maxi { display: none; } .win.max .res { display: grid; }
    .menu { display: flex; height: 19px; flex: none; align-items: center; padding: 0 1px; }
    .menu span { padding: 3px 6px; }
    .menu u { text-decoration: underline; text-underline-offset: 1px; }
    .body { flex: 1; background: #fff; position: relative; padding: 4px; min-height: 0;
      box-shadow: inset 1px 1px #808080, inset -1px -1px #fff, inset 2px 2px #000, inset -2px -2px #dfdfdf; }
    .caret { display: block; width: 1px; height: 13px; background: #000; margin: 1px 0 0 1px; animation: blink 1.06s steps(1) infinite; }
    .win.inactive .caret { visibility: hidden; }
    .task { position: absolute; left: 6px; bottom: 6px; height: 22px; width: 150px; display: none; align-items: center; gap: 3px; padding: 0 4px; border: none; border-radius: 0;
      background: #c0c0c0; font: inherit; color: #000; cursor: default; text-align: left; white-space: nowrap; outline: none;
      box-shadow: inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; }
    .task:active { box-shadow: inset 1px 1px #000, inset -1px -1px #fff, inset 2px 2px #808080, inset -2px -2px #dfdfdf; }
    .task:focus-visible span { outline: 1px dotted #000; }
    .stage.minimized .task { display: flex; }
    @keyframes blink { 50% { visibility: hidden; } }
  `,
  html: `
    <div class="stage">
      <div class="win">
        <div class="title">
          ${NOTEPAD}
          <span class="text">Untitled - Notepad</span>
          <button class="cb mini" type="button" aria-label="Minimize">${G.min}</button>
          <button class="cb maxi" type="button" aria-label="Maximize">${G.max}</button>
          <button class="cb res" type="button" aria-label="Restore">${G.res}</button>
          <button class="cb close" type="button" aria-label="Close">${G.close}</button>
        </div>
        <div class="menu"><span><u>F</u>ile</span><span><u>E</u>dit</span><span><u>S</u>earch</span><span><u>H</u>elp</span></div>
        <div class="body"><i class="caret"></i></div>
      </div>
      <button class="task" type="button" aria-label="Restore Untitled - Notepad">${NOTEPAD}<span>Untitled - Notepad</span></button>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), win = root.querySelector('.win'), task = root.querySelector('.task');
    let t = 0;
    const activate = (on) => win.classList.toggle('inactive', !on);
    stage.addEventListener('pointerdown', (e) => activate(win.contains(e.target)));
    root.querySelector('.mini').addEventListener('click', () => { win.classList.add('min'); stage.classList.add('minimized'); task.focus({ preventScroll: true }); });
    task.addEventListener('click', () => { win.classList.remove('min'); stage.classList.remove('minimized'); activate(true); });
    const toggleMax = () => { win.classList.toggle('max'); };
    root.querySelector('.maxi').addEventListener('click', toggleMax);
    root.querySelector('.res').addEventListener('click', toggleMax);
    root.querySelector('.title').addEventListener('dblclick', (e) => { if (!e.target.closest('.cb')) toggleMax(); });
    root.querySelector('.close').addEventListener('click', () => {
      win.classList.add('closed'); clearTimeout(t);
      t = setTimeout(() => { win.classList.remove('closed', 'max'); activate(true); }, 900);
    });
    return () => clearTimeout(t);
  },
};
