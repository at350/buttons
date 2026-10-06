export default {
  id: 'mn-macos-menu',
  credit: 'macOS Sonoma menu bar dropdown — translucent panel, blue highlight rows, ⌘ shortcuts, submenu arrow',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .mb { position: relative; display: flex; align-items: center; height: 28px; padding: 0 8px; border-radius: 8px; background: rgba(236,236,236,.92); font: 13px/1 -apple-system, "SF Pro Text", system-ui, sans-serif; color: #000; box-shadow: inset 0 0 0 .5px rgba(0,0,0,.1); }
    .mi { height: 22px; padding: 0 9px; border: 0; background: none; font: inherit; color: inherit; border-radius: 4px; cursor: default; }
    .mi.b { font-weight: 700; }
    .mi[aria-expanded="true"] { background: rgba(0,0,0,.1); }
    .mi:focus-visible { outline: 2px solid #0a60ff; outline-offset: -1px; }
    .menu { position: absolute; top: 30px; left: 0; min-width: 230px; padding: 5px; border-radius: 7px; background: rgba(246,246,246,.86); backdrop-filter: blur(30px) saturate(1.8); -webkit-backdrop-filter: blur(30px) saturate(1.8); box-shadow: 0 0 0 .5px rgba(0,0,0,.18), 0 10px 30px rgba(0,0,0,.22); display: none; }
    .menu.r { left: auto; right: 0; }
    .menu.open { display: block; }
    .r { display: flex; align-items: center; width: 100%; height: 22px; padding: 0 9px; border: 0; border-radius: 4px; background: none; font: inherit; color: inherit; cursor: default; text-align: left; }
    .r .k { margin-left: auto; color: rgba(0,0,0,.45); font-size: 12px; letter-spacing: .02em; }
    .r .sub { margin-left: auto; }
    .r:hover, .r:focus-visible { background: #0a60ff; color: #fff; outline: 0; }
    .r:hover .k, .r:focus-visible .k { color: rgba(255,255,255,.7); }
    .r:disabled { color: rgba(0,0,0,.3); }
    .r:disabled:hover { background: none; color: rgba(0,0,0,.3); }
    hr { border: 0; border-top: 1px solid rgba(0,0,0,.1); margin: 5px 9px; }
  `,
  html: `
    <div class="mb">
      <button class="mi b" type="button">Finder</button>
      <button class="mi trig" type="button" aria-haspopup="menu" aria-expanded="false">File</button>
      <button class="mi" type="button">Edit</button>
      <button class="mi" type="button">View</button>
      <button class="mi" type="button">Go</button>
      <div class="menu" role="menu">
        <button class="r" type="button" role="menuitem">New Finder Window<span class="k">⌘N</span></button>
        <button class="r" type="button" role="menuitem">New Folder<span class="k">⇧⌘N</span></button>
        <button class="r" type="button" role="menuitem">New Smart Folder</button>
        <button class="r" type="button" role="menuitem">New Tab<span class="k">⌘T</span></button>
        <hr>
        <button class="r" type="button" role="menuitem">Open<span class="k">⌘O</span></button>
        <button class="r" type="button" role="menuitem" aria-haspopup="menu">Open With<svg class="sub" width="8" height="10" viewBox="0 0 8 10" fill="currentColor"><path d="M1 0l6 5-6 5z"/></svg></button>
        <button class="r" type="button" role="menuitem">Close Window<span class="k">⌘W</span></button>
        <hr>
        <button class="r" type="button" role="menuitem" disabled>Get Info<span class="k">⌘I</span></button>
        <button class="r" type="button" role="menuitem">Move to Trash<span class="k">⌘⌫</span></button>
      </div>
    </div>`,
  init(root, host) {
    const trig = root.querySelector('.trig'), menu = root.querySelector('.menu');
    const items = [...menu.querySelectorAll('.r:not(:disabled)')];
    const onDoc = (e) => { if (!host.contains(e.target)) set(false); };
    const set = (v) => { if (v) { const hb = host.getBoundingClientRect(); const flip = hb.left + trig.offsetLeft + 238 > document.documentElement.clientWidth; menu.classList.toggle('r', flip); menu.style.left = flip ? '' : trig.offsetLeft + 'px'; } trig.setAttribute('aria-expanded', v); menu.classList.toggle('open', v); host.toggleAttribute('data-open', v); document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true); };
    trig.addEventListener('click', () => set(trig.getAttribute('aria-expanded') !== 'true'));
    items.forEach((r) => r.addEventListener('click', () => set(false)));
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { set(false); trig.focus({ preventScroll: true }); }
      if (!menu.classList.contains('open')) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const i = items.indexOf(root.activeElement);
        items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus({ preventScroll: true });
      }
    });
    return () => set(false);
  },
};
