// Marlett caption glyphs, pixel for pixel
const G = {
  min: '<svg width="6" height="2" viewBox="0 0 6 2" shape-rendering="crispEdges"><path d="M0 0h6v2h-6z"/></svg>',
  max: '<svg width="9" height="9" viewBox="0 0 9 9" shape-rendering="crispEdges"><path d="M0 0h9v2h-9zM0 2h1v6h-1zM8 2h1v6h-1zM0 8h9v1h-9z"/></svg>',
  res: '<svg width="8" height="9" viewBox="0 0 8 9" shape-rendering="crispEdges"><path d="M2 0h6v2h-6zM7 2h1v4h-1zM6 5h1v1h-1zM2 2h1v1h-1zM0 3h6v2h-6zM0 5h1v3h-1zM5 5h1v3h-1zM0 8h6v1h-6z"/></svg>',
  close: '<svg width="8" height="7" viewBox="0 0 8 7" shape-rendering="crispEdges"><path d="M0 0h2v1h-2zM6 0h2v1h-2zM1 1h2v1h-2zM5 1h2v1h-2zM2 2h4v1h-4zM3 3h2v1h-2zM2 4h4v1h-4zM1 5h2v1h-2zM5 5h2v1h-2zM0 6h2v1h-2zM6 6h2v1h-2z"/></svg>',
};
const NOTEPAD = '<svg class="icon" width="16" height="16" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true"><path d="M3 1h9v1h1v13H3z" fill="#fff"/><path d="M2 1h1v15h11V2h-1v13H3V1z" fill="#000"/><path d="M3 0h9v1H3z" fill="#000"/><path d="M5 4h6v1H5zM5 6h6v1H5zM5 8h6v1H5zM5 10h4v1H5z" fill="#000080"/><path d="M4 1h1v2H4zM7 1h1v2H7zM10 1h1v2h-1z" fill="#808080"/></svg>';
const LOGO = `<path d="M14.3 6.9L18.1 6.9 16.1 11.8 12.9 11.6z" fill="#f00"/><path d="M18.4 7L22.3 9.3 20.2 14.3 16.8 12.6z" fill="#008000"/><path d="M12.6 12.4L15.6 12.4 13.9 17.3 10.9 17z" fill="#00f"/><path d="M16.9 12.2L20 14.2 17.8 19.4 14.6 17.6z" fill="#ff0"/><path d="M5.712 1.596l-.756.068-.238.55.734-.017zm1.39.927l-.978.137-.326.807.96-.12.345-.824zM4.89 3.535l-.72.05-.24.567.721-.017zm3.724.309l-1.287.068-.394.96 1.27-.052zm1.87.566l-1.579.069-.566 1.357 1.596-.088.548-1.338zm-4.188.037l-.977.153-.343.806.976-.12zm6.144.668l-1.87.135-.637 1.527 1.87-.154zm2.925.219c-.11 0-.222 0-.334.002l-.767 1.85c1.394-.03 2.52.089 3.373.38l-1.748 4.201c-.955-.304-2.082-.444-3.36-.394l-.54 1.305a8.762 8.762 0 0 1 3.365.396l-1.663 4.014c-1.257-.27-2.382-.395-3.387-.344l-.782 1.887c3.363-.446 6.348.822 9.009 3.773L24 9.23c-2.325-2.575-5.2-3.88-8.637-3.896zm-.644.002l-2.024.12-.687 1.68 2.025-.19zm-10.603.05l-.719.036-.224.566h.703l.24-.601zm3.69.397l-1.287.069-.395.959 1.27-.05zM5.54 6.3l-.994.154-.344.807.98-.121zm4.137.066l-1.58.069L7.53 7.77l1.596-.085.55-1.32zm1.955.688l-1.87.135-.636 1.527 1.887-.154zm2.282.19l-2.01.136-.7 1.682 2.04-.19.67-1.63zm-10.57.066l-.739.035-.238.564h.72l.257-.6zm3.705.293l-1.303.085-.394.96 1.287-.034zm11.839.255a6.718 6.718 0 0 1 2.777 1.717l-1.75 4.237c-.617-.584-1.15-.961-1.611-1.149l-1.201-.498zM4.733 8.22l-.976.154-.344.807.961-.12.36-.841zm4.186 0l-1.594.052-.549 1.354L8.37 9.54zm1.957.668L8.99 9.04l-.619 1.508 1.87-.135.636-1.527zm2.247.275l-2.007.12-.703 1.665 2.042-.156zM2.52 9.267l-.718.033-.24.549.718-.016zm3.725.273l-1.289.07-.41.96 1.287-.03.412-1zm1.87.6l-1.596.05-.55 1.356 1.598-.084.547-1.322zm-4.186.037l-.979.136-.324.805.96-.119zm6.14.633l-1.87.154-.653 1.527 1.906-.154zm2.267.275l-2.026.12-.686 1.663 2.025-.172zm-10.569.031l-.739.037-.238.565.72-.016zm3.673.362l-1.289.068-.41.978 1.305-.05zm-2.285.533l-.976.154-.326.805.96-.12.342-.84zm4.153.07l-1.596.066-.565 1.356 1.612-.084zm1.957.666l-1.889.154-.617 1.526 1.886-.15zm2.28.223l-2.025.12-.685 1.665 2.041-.172.67-1.613zm-10.584.05l-.738.053L0 13.64l.72-.02.24-.6zm3.705.31l-1.285.07-.395.976 1.287-.05.393-.997zm11.923.07c1.08.29 2.024.821 2.814 1.613l-1.715 4.183c-.892-.754-1.82-1.32-2.814-1.664l1.715-4.133zm-10.036.515L4.956 14l-.549 1.32 1.578-.066.567-1.338zm-4.184.014l-.996.156-.309.79.961-.106zm6.14.67l-1.904.154-.617 1.527 1.89-.154.632-1.527zm2.231.324l-2.025.123-.686 1.682 2.026-.174zm-6.863.328l-1.3.068-.397.98 1.285-.054zm1.871.584l-1.578.068-.566 1.334 1.595-.064zm1.953.701l-1.867.137-.635 1.51 1.87-.137zm2.23.31l-2.005.122-.703 1.68 2.04-.19.67-1.61z"/>`;
export default {
  id: 'rt-win95-titlebar',
  credit: 'Windows 98 — Notepad window on the teal desktop: navy-to-blue gradient caption, Marlett minimize / maximize / close buttons, and the taskbar button it minimizes to',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { background: #008080; border-radius: 12px; position: relative; height: 196px; min-width: 300px; overflow: hidden;
      font: 11px/13px "MS Sans Serif", "Microsoft Sans Serif", Tahoma, Arial, sans-serif; -webkit-font-smoothing: none; color: #000; }
    .win { position: absolute; left: 16px; top: 12px; right: 16px; bottom: 40px; background: #c0c0c0; padding: 3px; display: flex; flex-direction: column;
      box-shadow: inset -1px -1px #000, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #fff; }
    .win.max { left: 0; top: 0; right: 0; bottom: 28px; }
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
    .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 28px; background: #c0c0c0; display: flex; align-items: center; gap: 3px; padding: 2px 2px 0;
      box-shadow: inset 0 1px #dfdfdf, inset 0 2px #fff; }
    .st { display: inline-flex; align-items: center; gap: 2px; height: 22px; padding: 0 4px 0 3px; font-weight: bold; flex: none;
      box-shadow: inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; }
    .st svg { width: 18px; height: 16px; }
    .task { height: 22px; width: 150px; min-width: 0; display: flex; align-items: center; gap: 3px; padding: 0 4px; border: none; border-radius: 0; margin-left: 2px;
      background: #c0c0c0; font: inherit; color: #000; cursor: default; text-align: left; white-space: nowrap; outline: none;
      box-shadow: inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; }
    .task span { overflow: hidden; text-overflow: ellipsis; }
    .task.on { font-weight: bold; padding: 2px 3px 0 5px; box-shadow: inset 1px 1px #000, inset -1px -1px #fff, inset 2px 2px #808080, inset -2px -2px #dfdfdf;
      background: repeating-conic-gradient(#fff 0 25%, #c0c0c0 0 50%) 0 0 / 2px 2px; }
    .task:focus-visible span { outline: 1px dotted #000; }
    .tray { margin-left: auto; height: 22px; padding: 0 9px; display: flex; align-items: center; white-space: nowrap; flex: none;
      box-shadow: inset 1px 1px #808080, inset -1px -1px #fff; }
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
      <div class="bar"><span class="st" aria-hidden="true"><svg viewBox="0 1 24 22">${LOGO}</svg>Start</span><button class="task on" type="button" aria-pressed="true" aria-label="Untitled - Notepad">${NOTEPAD}<span>Untitled - Notepad</span></button><span class="tray">9:41 PM</span></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), win = root.querySelector('.win'), task = root.querySelector('.task');
    let t = 0;
    const activate = (on) => win.classList.toggle('inactive', !on);
    stage.addEventListener('pointerdown', (e) => activate(win.contains(e.target)));
    const sync = () => { const on = !win.classList.contains('min') && !win.classList.contains('closed'); task.classList.toggle('on', on); task.setAttribute('aria-pressed', String(on)); };
    const minimize = () => { win.classList.add('min'); stage.classList.add('minimized'); sync(); task.focus({ preventScroll: true }); };
    root.querySelector('.mini').addEventListener('click', minimize);
    task.addEventListener('click', () => { if (win.classList.contains('min')) { win.classList.remove('min'); stage.classList.remove('minimized'); activate(true); sync(); } else minimize(); });
    const toggleMax = () => { win.classList.toggle('max'); };
    root.querySelector('.maxi').addEventListener('click', toggleMax);
    root.querySelector('.res').addEventListener('click', toggleMax);
    root.querySelector('.title').addEventListener('dblclick', (e) => { if (!e.target.closest('.cb')) toggleMax(); });
    root.querySelector('.close').addEventListener('click', () => {
      win.classList.add('closed'); task.style.visibility = 'hidden'; clearTimeout(t);
      t = setTimeout(() => { win.classList.remove('closed', 'max'); task.style.visibility = ''; activate(true); sync(); }, 900);
    });
    return () => clearTimeout(t);
  },
};
