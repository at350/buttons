export default {
  id: 'gm-stardew-button',
  credit: 'ConcernedApe Stardew Valley — the wooden plank menu buttons with the pixel rope border; hover brightens, the selected one sinks and shows the pixel cursor',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #4a8a3a;
      background-image: radial-gradient(#55984a 2px, transparent 2px), radial-gradient(#3f7a33 2px, transparent 2px);
      background-size: 18px 18px, 18px 18px;
      background-position: 0 0, 9px 9px;
      padding: 18px 26px 18px 44px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      image-rendering: pixelated; }
    .sd { position: relative; width: 190px; height: 46px; border: none; cursor: pointer; padding: 0; color: #4d2400; font: 700 15px 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace; letter-spacing: .5px;
      background: #e3a85c; background-image: repeating-linear-gradient(0deg, #e3a85c 0 4px, #d99a4e 4px 8px, #e8b06a 8px 12px);
      box-shadow: 0 0 0 3px #8a4b1d, 0 0 0 5px #5c2f0e, inset 0 -4px 0 #b8762f, inset 0 3px 0 #f3c98a; transition: transform .05s, box-shadow .05s, filter .1s; }
    .sd::before, .sd::after { content: "";
      position: absolute;
      top: -5px;
      bottom: -5px;
      width: 5px;
      background: repeating-linear-gradient(180deg, #5c2f0e 0 4px, #8a4b1d 4px 8px); }
    .sd::before { left: -5px; }
    .sd::after { right: -5px; }
    .sd:hover { filter: brightness(1.08); }
    .sd:active, .sd.sel { transform: translateY(3px);
      box-shadow: 0 0 0 3px #8a4b1d, 0 0 0 5px #5c2f0e, inset 0 -1px 0 #b8762f, inset 0 3px 0 #c98c45; }
    .sd:focus-visible { outline: 3px solid #fff; outline-offset: 7px; }
    .cur { position: absolute; left: -34px; top: 50%; width: 18px; height: 18px; margin-top: -9px; opacity: 0; transition: opacity .1s; }
    .sd.sel .cur { opacity: 1; animation: bob .6s steps(2) infinite; }
    @keyframes bob { to { transform: translateX(3px); } }
    .cur svg { width: 100%; height: 100%; shape-rendering: crispEdges; }
  `,
  html: `
    <div class="stage">
      <button class="sd sel" type="button" aria-pressed="true"><span class="cur" data-overhang><svg viewBox="0 0 9 9"><path fill="#3b1408" d="M1 0h2v1h1v1h1v1h1v1h1v1H6v1H5v1H4v1H3v1H1z"/><path fill="#e4472a" d="M2 1h1v1h1v1h1v1h1v1H5v1H4v1H3v1H2z"/><path fill="#ffb08a" d="M2 1h1v1h1v1H3v1H2z"/></svg></span>New</button>
      <button class="sd" type="button" aria-pressed="false"><span class="cur" data-overhang><svg viewBox="0 0 9 9"><path fill="#3b1408" d="M1 0h2v1h1v1h1v1h1v1h1v1H6v1H5v1H4v1H3v1H1z"/><path fill="#e4472a" d="M2 1h1v1h1v1h1v1h1v1H5v1H4v1H3v1H2z"/><path fill="#ffb08a" d="M2 1h1v1h1v1H3v1H2z"/></svg></span>Load</button>
      <button class="sd" type="button" aria-pressed="false"><span class="cur" data-overhang><svg viewBox="0 0 9 9"><path fill="#3b1408" d="M1 0h2v1h1v1h1v1h1v1h1v1H6v1H5v1H4v1H3v1H1z"/><path fill="#e4472a" d="M2 1h1v1h1v1h1v1h1v1H5v1H4v1H3v1H2z"/><path fill="#ffb08a" d="M2 1h1v1h1v1H3v1H2z"/></svg></span>Co-op</button>
      <button class="sd" type="button" aria-pressed="false"><span class="cur" data-overhang><svg viewBox="0 0 9 9"><path fill="#3b1408" d="M1 0h2v1h1v1h1v1h1v1h1v1H6v1H5v1H4v1H3v1H1z"/><path fill="#e4472a" d="M2 1h1v1h1v1h1v1h1v1H5v1H4v1H3v1H2z"/><path fill="#ffb08a" d="M2 1h1v1h1v1H3v1H2z"/></svg></span>Exit</button>
    </div>`,
  init(root) {
    const b = [...root.querySelectorAll('.sd')];
    b.forEach((x) => x.addEventListener('click', () => b.forEach((o) => { o.classList.toggle('sel', o === x); o.setAttribute('aria-pressed', String(o === x)); })));
  },
};
