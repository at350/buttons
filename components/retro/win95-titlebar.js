export default {
  id: 'rt-win95-titlebar',
  credit: 'Windows 98 — window title bar with minimize / maximize / close caption buttons',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { background: #008080; padding: 16px; border-radius: 12px; }
    .win { background: #c0c0c0; padding: 3px; max-width: 100%;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #fff; }
    .win.inactive .title { background: #808080; }
    .title { display: flex; align-items: center; height: 18px; padding: 0 2px 0 3px; gap: 2px;
      background: linear-gradient(90deg, #000080, #1084d0); color: #fff;
      font: bold 11px "MS Sans Serif", Tahoma, Arial, sans-serif; user-select: none; }
    .title .icon { width: 14px; height: 14px; flex: none; margin-right: 3px; }
    .title .text { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; letter-spacing: .2px; }
    .cb { width: 16px; height: 14px; background: #c0c0c0; border: none; padding: 0; display: grid; place-items: center;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; }
    .cb:active { box-shadow: inset 1px 1px #0a0a0a, inset -1px -1px #fff, inset 2px 2px #808080, inset -2px -2px #dfdfdf; }
    .cb:active svg { transform: translate(1px, 1px); }
    .cb:focus-visible { outline: 1px dotted #000; outline-offset: -3px; }
    .cb.close { margin-left: 2px; }
    .body { height: 70px; background: #fff; margin-top: 3px;
      box-shadow: inset 1px 1px #808080, inset -1px -1px #fff, inset 2px 2px #0a0a0a, inset -2px -2px #dfdfdf; transition: height .15s; }
    .win.min .body { height: 0; margin: 0; }
    .win.max .body { height: 120px; }
    .win.closed { visibility: hidden; }
    .restore { display: none; }
    .win.max .maxi { display: none; } .win.max .restore { display: block; }
  `,
  html: `
    <div class="stage">
      <div class="win">
        <div class="title">
          <svg class="icon" viewBox="0 0 14 14"><rect x="1" y="2" width="12" height="10" fill="#fff" stroke="#000"/><rect x="1" y="2" width="12" height="3" fill="#000080"/></svg>
          <span class="text">Untitled - Notepad</span>
          <button class="cb mini" type="button" aria-label="Minimize"><svg width="8" height="8" viewBox="0 0 8 8"><rect x="1" y="6" width="6" height="2" fill="#000"/></svg></button>
          <button class="cb maxi" type="button" aria-label="Maximize"><svg width="9" height="9" viewBox="0 0 9 9"><path d="M0 0h9v9H0z M1 2v6h7V2z" fill="#000" fill-rule="evenodd"/></svg></button>
          <button class="cb restore" type="button" aria-label="Restore"><svg width="9" height="9" viewBox="0 0 9 9"><path d="M2 0h7v6H7V8H0V2h2zM3 1v1h4v3h1V1zM1 3v4h5V3z" fill="#000" fill-rule="evenodd"/></svg></button>
          <button class="cb close" type="button" aria-label="Close"><svg width="8" height="7" viewBox="0 0 8 7"><path d="M0 0h2l2 2 2-2h2L5 3.5 8 7H6L4 5 2 7H0l3-3.5z" fill="#000"/></svg></button>
        </div>
        <div class="body"></div>
      </div>
    </div>`,
  init(root) {
    const win = root.querySelector('.win');
    root.querySelector('.mini').addEventListener('click', () => { win.classList.remove('max'); win.classList.toggle('min'); });
    const max = () => { win.classList.remove('min'); win.classList.toggle('max'); };
    root.querySelector('.maxi').addEventListener('click', max);
    root.querySelector('.restore').addEventListener('click', max);
    root.querySelector('.close').addEventListener('click', () => {
      win.classList.add('closed');
      setTimeout(() => win.classList.remove('closed', 'min', 'max'), 900);
    });
  },
};
