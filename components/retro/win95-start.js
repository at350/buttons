export default {
  id: 'rt-win95-start',
  credit: 'Windows 95 — taskbar Start button with the four-color flag',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #c0c0c0; padding: 2px 4px 2px 2px; border-radius: 12px; position: relative; display: inline-block;
      border-top: 1px solid #fff; }
    .start { display: inline-flex; align-items: center; gap: 3px; height: 22px; padding: 0 6px 0 3px; background: #c0c0c0; border: none;
      font: bold 11px "MS Sans Serif", Tahoma, Arial, sans-serif; color: #000; position: relative;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; }
    .start:active, .start[aria-expanded="true"] {
      box-shadow: inset 1px 1px #0a0a0a, inset -1px -1px #fff, inset 2px 2px #808080, inset -2px -2px #dfdfdf;
      background-image: repeating-conic-gradient(#fff 0 25%, #c0c0c0 0 50%); background-size: 2px 2px; }
    .start:focus-visible::after { content: ""; position: absolute; inset: 3px; border: 1px dotted #000; }
    .menu { position: absolute; left: 2px; bottom: calc(100% - 1px); display: none; background: #c0c0c0; padding: 3px; z-index: 5;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #fff; }
    .menu.open { display: flex; }
    .side { width: 21px; background: #808080; writing-mode: vertical-rl; transform: rotate(180deg); color: #c0c0c0; font: bold 14px Arial, sans-serif;
      display: flex; align-items: center; justify-content: flex-start; padding: 4px 0; letter-spacing: 1px; }
    .side b { color: #fff; }
    .items { font: 11px "MS Sans Serif", Tahoma, Arial, sans-serif; white-space: nowrap; }
    .items div { padding: 5px 28px 5px 10px; display: flex; align-items: center; gap: 8px; cursor: default; }
    .items div:focus { outline: none; }
    .items [role=menuitem]:hover, .items [role=menuitem]:focus-visible { background: #000080; color: #fff; }
    .items svg { width: 16px; height: 16px; }
    .sep { height: 2px; margin: 2px 0; border-top: 1px solid #808080; border-bottom: 1px solid #fff; padding: 0 !important; }
  `,
  html: `
    <div class="stage">
      <div class="menu" role="menu">
        <div class="side"><span>Windows<b>95</b></span></div>
        <div class="items">
          <div role="menuitem" tabindex="-1"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="4" width="14" height="10" fill="#fcfc54" stroke="#000"/><rect x="1" y="2" width="6" height="3" fill="#fcfc54" stroke="#000"/></svg>Programs</div>
          <div role="menuitem" tabindex="-1"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="1" width="12" height="14" fill="#fff" stroke="#000"/><path d="M4 5h8M4 8h8M4 11h5" stroke="#000"/></svg>Documents</div>
          <div role="menuitem" tabindex="-1"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="3" width="14" height="10" fill="#c0c0c0" stroke="#000"/><circle cx="8" cy="8" r="2" fill="#000"/></svg>Settings</div>
          <div role="menuitem" tabindex="-1"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="4" fill="none" stroke="#000" stroke-width="2"/><path d="M10 10l4 4" stroke="#000" stroke-width="2"/></svg>Find</div>
          <div role="menuitem" tabindex="-1"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="1" width="12" height="14" fill="#fff" stroke="#000"/><text x="5" y="12" font-size="10" font-weight="bold">?</text></svg>Help</div>
          <div role="menuitem" tabindex="-1"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="3" width="14" height="10" fill="#fff" stroke="#000"/><rect x="1" y="3" width="14" height="2" fill="#000080"/></svg>Run...</div>
          <div class="sep" role="separator"></div>
          <div role="menuitem" tabindex="-1"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="2" width="12" height="9" fill="#000080" stroke="#000"/><rect x="5" y="11" width="6" height="3" fill="#808080"/></svg>Shut Down...</div>
        </div>
      </div>
      <button class="start" type="button" aria-expanded="false" aria-haspopup="menu">
        <svg width="18" height="16" viewBox="0 0 18 16" aria-hidden="true">
          <path d="M1 5l6-1v5l-6 .5zM8 4l8-1.5v6.5H8zM1 10.5l6 .5v5l-6-1zM8 11h8v6.5L8 15.5z" fill="#000" transform="translate(.6 .6)"/>
          <path d="M1 5l6-1v5l-6 .5z" fill="#ff0000"/><path d="M8 4l8-1.5v6.5H8z" fill="#00a000"/>
          <path d="M1 10.5l6 .5v5l-6-1z" fill="#0000ff"/><path d="M8 11h8v6.5L8 15.5z" fill="#ffff00"/>
        </svg>Start
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.start');
    const m = root.querySelector('.menu');
    const items = [...root.querySelectorAll('[role=menuitem]')];
    const isOpen = () => m.classList.contains('open');
    const set = (o) => { m.classList.toggle('open', o); b.setAttribute('aria-expanded', String(o)); };
    const close = () => { set(false); b.focus({ preventScroll: true }); };
    const focusItem = (i) => items[(i + items.length) % items.length].focus({ preventScroll: true });
    // Keyboard "clicks" (Enter/Space) report detail === 0: open the menu and move focus into it.
    b.addEventListener('click', (e) => {
      const o = !isOpen();
      set(o);
      if (o && e.detail === 0) focusItem(0);
    });
    b.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); set(true); focusItem(e.key === 'ArrowUp' ? items.length - 1 : 0); }
      else if (e.key === 'Escape' && isOpen()) { e.preventDefault(); set(false); }
    });
    items.forEach((it, i) => {
      it.addEventListener('click', close);
      it.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); focusItem(i + 1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); focusItem(i - 1); }
        else if (e.key === 'Home') { e.preventDefault(); focusItem(0); }
        else if (e.key === 'End') { e.preventDefault(); focusItem(items.length - 1); }
        else if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') { e.preventDefault(); close(); }
      });
    });
    root.addEventListener('focusout', (e) => { if (!root.contains(e.relatedTarget)) set(false); });
  },
};
