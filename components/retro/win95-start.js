// Windows 95 logo outline (Simple Icons "windows95", CC0) with the four panes filled in behind it.
const LOGO = `<path d="M14.3 6.9L18.1 6.9 16.1 11.8 12.9 11.6z" fill="#f00"/><path d="M18.4 7L22.3 9.3 20.2 14.3 16.8 12.6z" fill="#008000"/><path d="M12.6 12.4L15.6 12.4 13.9 17.3 10.9 17z" fill="#00f"/><path d="M16.9 12.2L20 14.2 17.8 19.4 14.6 17.6z" fill="#ff0"/><path d="M5.712 1.596l-.756.068-.238.55.734-.017zm1.39.927l-.978.137-.326.807.96-.12.345-.824zM4.89 3.535l-.72.05-.24.567.721-.017zm3.724.309l-1.287.068-.394.96 1.27-.052zm1.87.566l-1.579.069-.566 1.357 1.596-.088.548-1.338zm-4.188.037l-.977.153-.343.806.976-.12zm6.144.668l-1.87.135-.637 1.527 1.87-.154zm2.925.219c-.11 0-.222 0-.334.002l-.767 1.85c1.394-.03 2.52.089 3.373.38l-1.748 4.201c-.955-.304-2.082-.444-3.36-.394l-.54 1.305a8.762 8.762 0 0 1 3.365.396l-1.663 4.014c-1.257-.27-2.382-.395-3.387-.344l-.782 1.887c3.363-.446 6.348.822 9.009 3.773L24 9.23c-2.325-2.575-5.2-3.88-8.637-3.896zm-.644.002l-2.024.12-.687 1.68 2.025-.19zm-10.603.05l-.719.036-.224.566h.703l.24-.601zm3.69.397l-1.287.069-.395.959 1.27-.05zM5.54 6.3l-.994.154-.344.807.98-.121zm4.137.066l-1.58.069L7.53 7.77l1.596-.085.55-1.32zm1.955.688l-1.87.135-.636 1.527 1.887-.154zm2.282.19l-2.01.136-.7 1.682 2.04-.19.67-1.63zm-10.57.066l-.739.035-.238.564h.72l.257-.6zm3.705.293l-1.303.085-.394.96 1.287-.034zm11.839.255a6.718 6.718 0 0 1 2.777 1.717l-1.75 4.237c-.617-.584-1.15-.961-1.611-1.149l-1.201-.498zM4.733 8.22l-.976.154-.344.807.961-.12.36-.841zm4.186 0l-1.594.052-.549 1.354L8.37 9.54zm1.957.668L8.99 9.04l-.619 1.508 1.87-.135.636-1.527zm2.247.275l-2.007.12-.703 1.665 2.042-.156zM2.52 9.267l-.718.033-.24.549.718-.016zm3.725.273l-1.289.07-.41.96 1.287-.03.412-1zm1.87.6l-1.596.05-.55 1.356 1.598-.084.547-1.322zm-4.186.037l-.979.136-.324.805.96-.119zm6.14.633l-1.87.154-.653 1.527 1.906-.154zm2.267.275l-2.026.12-.686 1.663 2.025-.172zm-10.569.031l-.739.037-.238.565.72-.016zm3.673.362l-1.289.068-.41.978 1.305-.05zm-2.285.533l-.976.154-.326.805.96-.12.342-.84zm4.153.07l-1.596.066-.565 1.356 1.612-.084zm1.957.666l-1.889.154-.617 1.526 1.886-.15zm2.28.223l-2.025.12-.685 1.665 2.041-.172.67-1.613zm-10.584.05l-.738.053L0 13.64l.72-.02.24-.6zm3.705.31l-1.285.07-.395.976 1.287-.05.393-.997zm11.923.07c1.08.29 2.024.821 2.814 1.613l-1.715 4.183c-.892-.754-1.82-1.32-2.814-1.664l1.715-4.133zm-10.036.515L4.956 14l-.549 1.32 1.578-.066.567-1.338zm-4.184.014l-.996.156-.309.79.961-.106zm6.14.67l-1.904.154-.617 1.527 1.89-.154.632-1.527zm2.231.324l-2.025.123-.686 1.682 2.026-.174zm-6.863.328l-1.3.068-.397.98 1.285-.054zm1.871.584l-1.578.068-.566 1.334 1.595-.064zm1.953.701l-1.867.137-.635 1.51 1.87-.137zm2.23.31l-2.005.122-.703 1.68 2.04-.19.67-1.61z"/>`;
const ARROW = '<svg class="sub" width="4" height="7" viewBox="0 0 4 7" shape-rendering="crispEdges" aria-hidden="true"><path d="M0 0h1v7h-1zM1 1h1v5h-1zM2 2h1v3h-1zM3 3h1v1h-1z"/></svg>';
const ICONS = {
  programs: '<path d="M2 9h11l2 2h15v18H2z" fill="#ffff80" stroke="#000"/><path d="M2.5 13.5h27" stroke="#808000"/><rect x="9.5" y="15.5" width="14" height="10" fill="#fff" stroke="#000"/><rect x="10" y="16" width="13" height="2" fill="#000080"/><rect x="12" y="20" width="9" height="1" fill="#808080"/><rect x="12" y="22" width="6" height="1" fill="#808080"/>',
  documents: '<path d="M2 9h11l2 2h15v18H2z" fill="#ffff80" stroke="#000"/><path d="M8.5 4.5h11l4 4v16h-15z" fill="#fff" stroke="#000"/><path d="M19.5 4.5v4h4" fill="#c0c0c0" stroke="#000"/><path d="M11 12h10M11 15h10M11 18h7" stroke="#000080"/><path d="M2 16h28v13H2z" fill="#ffff80" stroke="#000"/>',
  settings: '<path d="M2 9h11l2 2h15v18H2z" fill="#ffff80" stroke="#000"/><rect x="8.5" y="13.5" width="16" height="12" fill="#c0c0c0" stroke="#000"/><rect x="10" y="15" width="6" height="4" fill="#008080"/><circle cx="20.5" cy="17" r="2" fill="#fff" stroke="#000"/><path d="M10 22h12" stroke="#808080" stroke-width="2"/><rect x="13" y="21" width="2" height="3" fill="#000"/>',
  find: '<path d="M5.5 3.5h13l4 4v21h-17z" fill="#fff" stroke="#000"/><path d="M8 9h10M8 12h10M8 15h7" stroke="#808080"/><circle cx="17" cy="19" r="5.5" fill="#bfefff" fill-opacity=".8" stroke="#000" stroke-width="2"/><path d="M21 23l6 6" stroke="#000" stroke-width="3.5" stroke-linecap="square"/><path d="M21.5 23.5l5 5" stroke="#808080" stroke-width="1"/>',
  help: '<path d="M5 6.5l11-3v24l-11 3z" fill="#000080" stroke="#000"/><path d="M16 3.5l11 3v24l-11-3z" fill="#0000c0" stroke="#000"/><path d="M8 26l8-2 8 2" stroke="#fff" fill="none"/><path d="M14 10c0-2 4-2 4 0 0 2-2 2-2 4v1" stroke="#ff0" stroke-width="2" fill="none"/><rect x="15" y="17" width="2" height="2" fill="#ff0"/>',
  run: '<rect x="2.5" y="6.5" width="27" height="20" fill="#c0c0c0" stroke="#000"/><rect x="3" y="7" width="26" height="4" fill="#000080"/><rect x="6.5" y="15.5" width="19" height="5" fill="#fff" stroke="#808080"/><path d="M21 13l6 3-6 3z" fill="#000"/>',
  shutdown: '<rect x="4.5" y="4.5" width="23" height="17" fill="#c0c0c0" stroke="#000"/><rect x="7.5" y="7.5" width="17" height="11" fill="#000080" stroke="#808080"/><path d="M10 10h6" stroke="#fff"/><rect x="8.5" y="23.5" width="15" height="4" fill="#c0c0c0" stroke="#000"/><path d="M3.5 29.5h25" stroke="#000"/>',
};
const item = (key, label, mn, sub) => {
  const i = label.indexOf(mn);
  return `<div class="it" role="menuitem" tabindex="-1"${sub ? ' aria-haspopup="true"' : ''}><svg class="ico" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">${ICONS[key]}</svg><span class="lb">${label.slice(0, i)}<u>${mn}</u>${label.slice(i + 1)}</span>${sub ? ARROW : ''}</div>`;
};
export default {
  id: 'rt-win95-start',
  credit: 'Windows 95 — taskbar Start button and Start menu with the gray "Windows95" banner',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #c0c0c0; border-radius: 12px; padding: 4px 4px 4px 4px; display: flex; align-items: center; gap: 4px; position: relative; width: 230px;
      box-shadow: inset 0 1px #dfdfdf, inset 0 2px #fff; font: 11px/13px "MS Sans Serif", "Microsoft Sans Serif", Tahoma, Arial, sans-serif; -webkit-font-smoothing: none; color: #000; }
    .start { display: inline-flex; align-items: center; gap: 2px; height: 22px; width: 54px; padding: 0 0 0 3px; background: #c0c0c0; border: none; border-radius: 0; margin-top: 1px;
      font: bold 11px/1 "MS Sans Serif", "Microsoft Sans Serif", Tahoma, Arial, sans-serif; -webkit-font-smoothing: none; color: #000; position: relative; cursor: default; outline: none;
      box-shadow: inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; }
    .start svg { width: 18px; height: 16px; flex: none; }
    .start:active, .start[aria-expanded="true"] { box-shadow: inset 1px 1px #000, inset -1px -1px #fff, inset 2px 2px #808080, inset -2px -2px #dfdfdf; padding: 2px 0 0 4px; }
    .start[aria-expanded="true"] .cap, .start:focus-visible .cap { outline: 1px dotted #000; outline-offset: 1px; }
    .tray { margin-left: auto; height: 22px; margin-top: 1px; padding: 0 9px; display: flex; align-items: center; gap: 6px; white-space: nowrap;
      box-shadow: inset 1px 1px #808080, inset -1px -1px #fff; }
    .menu { position: absolute; left: 2px; bottom: 26px; display: none; background: #c0c0c0; padding: 3px; z-index: 5; white-space: nowrap;
      box-shadow: inset -1px -1px #000, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #fff; }
    .menu.open { display: flex; }
    .side { width: 21px; background: #808080; display: flex; align-items: flex-end; justify-content: center; overflow: hidden; }
    .side span { writing-mode: vertical-rl; transform: rotate(180deg); padding: 6px 0 4px; font: 900 18px/21px "Arial Black", "Arial", sans-serif; letter-spacing: -.5px; color: #c0c0c0; }
    .side b { color: #fff; font: 400 18px/21px "Arial", sans-serif; }
    .items { min-width: 148px; }
    .it { display: flex; align-items: center; height: 32px; padding: 0 6px 0 6px; gap: 10px; cursor: default; outline: none; }
    .it .ico { flex: none; }
    .it .lb { flex: 1; padding-right: 14px; }
    .it u { text-decoration: underline; text-underline-offset: 1px; }
    .it .sub { flex: none; }
    .it.hot { background: #000080; color: #fff; }
    .it.hot .sub { fill: #fff; }
    .sep { height: 2px; margin: 3px 1px; border-top: 1px solid #808080; border-bottom: 1px solid #fff; }
  `,
  html: `
    <div class="stage">
      <button class="start" type="button" aria-expanded="false" aria-haspopup="menu"><svg viewBox="0 1 24 22" aria-hidden="true">${LOGO}</svg><span class="cap">Start</span></button>
      <div class="tray"><svg width="16" height="16" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true"><path d="M2 6h3l4-4v12l-4-4H2z" fill="#c0c0c0" stroke="#000"/><path d="M11 5c1.5 1.5 1.5 4.5 0 6M12.5 3.5c2.5 2.5 2.5 6.5 0 9" stroke="#000" fill="none"/></svg><span class="clock">9:41 PM</span></div>
      <div class="menu" role="menu" aria-label="Start">
        <div class="side"><span>Windows<b>95</b></span></div>
        <div class="items">
          ${item('programs', 'Programs', 'P', true)}
          ${item('documents', 'Documents', 'D', true)}
          ${item('settings', 'Settings', 'S', true)}
          ${item('find', 'Find', 'F', true)}
          ${item('help', 'Help', 'H')}
          ${item('run', 'Run...', 'R')}
          <div class="sep" role="separator"></div>
          ${item('shutdown', 'Shut Down...', 'u')}
        </div>
      </div>
    </div>`,
  init(root, host) {
    const b = root.querySelector('.start');
    const m = root.querySelector('.menu');
    const items = [...root.querySelectorAll('[role=menuitem]')];
    let hot = -1;
    const isOpen = () => m.classList.contains('open');
    const paint = () => items.forEach((it, i) => it.classList.toggle('hot', i === hot));
    const set = (o) => {
      m.classList.toggle('open', o);
      b.setAttribute('aria-expanded', String(o));
      host && host.toggleAttribute('data-open', o);
      if (!o) { hot = -1; paint(); }
    };
    const focusItem = (i) => { hot = (i + items.length) % items.length; paint(); items[hot].focus({ preventScroll: true }); };
    b.addEventListener('mousedown', (e) => e.preventDefault());
    b.addEventListener('click', (e) => { const o = !isOpen(); set(o); if (o && e.detail === 0) focusItem(0); b.focus({ preventScroll: true }); });
    b.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); set(true); focusItem(e.key === 'ArrowUp' ? items.length - 1 : 0); }
      else if (e.key === 'Escape' && isOpen()) { e.preventDefault(); set(false); }
    });
    m.addEventListener('mousedown', (e) => e.preventDefault());
    items.forEach((it, i) => {
      it.addEventListener('pointerenter', () => { hot = i; paint(); });
      it.addEventListener('click', () => { set(false); b.focus({ preventScroll: true }); });
      it.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); focusItem(hot + 1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); focusItem(hot - 1); }
        else if (e.key === 'Home') { e.preventDefault(); focusItem(0); }
        else if (e.key === 'End') { e.preventDefault(); focusItem(items.length - 1); }
        else if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') { e.preventDefault(); set(false); b.focus({ preventScroll: true }); }
      });
    });
    const outside = (e) => { if (isOpen() && !e.composedPath().includes(root.querySelector('.stage'))) set(false); };
    const esc = (e) => { if (e.key === 'Escape' && isOpen()) set(false); };
    document.addEventListener('pointerdown', outside, true);
    document.addEventListener('keydown', esc);
    root.addEventListener('focusout', (e) => { if (e.relatedTarget && !root.contains(e.relatedTarget)) set(false); });
    return () => { document.removeEventListener('pointerdown', outside, true); document.removeEventListener('keydown', esc); host && host.removeAttribute('data-open'); };
  },
};
