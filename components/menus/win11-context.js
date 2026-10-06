export default {
  id: 'mn-win11-context',
  credit: 'Windows 11 desktop context menu — right-click inside the wallpaper (rounded, Mica, icon row)',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { position: relative; height: 280px; border-radius: 12px; overflow: hidden; background: radial-gradient(120% 80% at 70% 20%, #7fc7ff 0, #2b7de9 45%, #0b2f7a 100%); cursor: default; user-select: none; }
    .stage:focus-visible { outline: 2px solid #fff; outline-offset: -3px; }
    .bloom { position: absolute; left: 30%; top: 30%; width: 44%; height: 44%; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,.55), transparent 70%); filter: blur(10px); }
    .cm { position: absolute; width: 230px; padding: 4px; border-radius: 8px; background: rgba(243,243,243,.9); backdrop-filter: blur(30px) saturate(1.5); -webkit-backdrop-filter: blur(30px) saturate(1.5); box-shadow: 0 8px 24px rgba(0,0,0,.25), 0 0 0 1px rgba(0,0,0,.08); font: 14px/1 "Segoe UI Variable", "Segoe UI", system-ui, sans-serif; color: #1b1b1b; display: none; transform-origin: top left; }
    .cm.open { display: block; animation: in .14s cubic-bezier(.1,.9,.2,1); }
    @keyframes in { from { opacity: 0; transform: scale(.92) translateY(-4px); } }
    .icons { display: flex; justify-content: space-around; padding: 4px 2px 6px; border-bottom: 1px solid rgba(0,0,0,.08); margin-bottom: 4px; }
    .ib { width: 36px; height: 32px; border: 0; background: none; border-radius: 5px; color: #1b1b1b; display: grid; place-items: center; cursor: default; padding: 0; }
    .ib:hover, .ib:focus-visible { background: rgba(0,0,0,.06); outline: 0; }
    .r { display: flex; align-items: center; gap: 10px; width: 100%; height: 32px; padding: 0 10px; border: 0; border-radius: 5px; background: none; font: inherit; color: inherit; cursor: default; text-align: left; }
    .r:hover, .r:focus-visible { background: rgba(0,0,0,.06); outline: 0; }
    .r svg { flex: none; color: #0067c0; }
    .r .ar { margin-left: auto; color: #555; }
    hr { border: 0; border-top: 1px solid rgba(0,0,0,.08); margin: 4px 0; }
    .r .k { margin-left: auto; color: #666; font-size: 12px; }
    .r .ar + .k { display: none; }
  `,
  html: `
    <div class="stage" tabindex="0" role="application" aria-label="Desktop">
      <span class="bloom"></span>
      <div class="cm" role="menu">
        <div class="icons">
          <button class="ib" type="button" aria-label="Cut"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="5" cy="13" r="2.5"/><circle cx="13" cy="13" r="2.5"/><path d="M6.5 11L14 2M11.5 11L4 2"/></svg></button>
          <button class="ib" type="button" aria-label="Copy"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="6" y="6" width="9" height="10" rx="1.5"/><path d="M12 6V3.5A1.5 1.5 0 0010.5 2h-6A1.5 1.5 0 003 3.5v8A1.5 1.5 0 004.5 13H6"/></svg></button>
          <button class="ib" type="button" aria-label="Paste"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3.5" y="4" width="11" height="12" rx="1.5"/><rect x="6.5" y="2" width="5" height="3.5" rx="1"/></svg></button>
          <button class="ib" type="button" aria-label="Rename"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M9 3v12M7 3h4M7 15h4M3 6h4M3 12h4M11 6h4M11 12h4"/></svg></button>
          <button class="ib" type="button" aria-label="Share"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="13" cy="4" r="2"/><circle cx="5" cy="9" r="2"/><circle cx="13" cy="14" r="2"/><path d="M7 8l4-3M7 10l4 3"/></svg></button>
          <button class="ib" type="button" aria-label="Delete"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 5h12M6 5V3.5h6V5M4.5 5l1 10h7l1-10M7.5 8v4M10.5 8v4"/></svg></button>
        </div>
        <button class="r" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 8h6M8 5v6"/></svg>View<svg class="ar" width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2 2l4 4-4 4"/></svg></button>
        <button class="r" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M3 4h10M3 8h10M3 12h6"/></svg>Sort by<svg class="ar" width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2 2l4 4-4 4"/></svg></button>
        <button class="r" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M13 8A5 5 0 113.6 5.5M13 3v3h-3"/></svg>Refresh<span class="k">F5</span></button>
        <hr>
        <button class="r" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M8 2v12M2 8h12"/></svg>New<svg class="ar" width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2 2l4 4-4 4"/></svg></button>
        <hr>
        <button class="r" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2 3h12v10H2zM2 7h12"/></svg>Personalize</button>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), cm = root.querySelector('.cm');
    const openAt = (x, y) => {
      const r = stage.getBoundingClientRect();
      cm.classList.add('open');
      const w = 230, h = cm.offsetHeight || 240;
      cm.style.left = Math.max(4, Math.min(x, r.width - w - 4)) + 'px';
      cm.style.top = Math.max(4, Math.min(y, Math.max(4, r.height - h - 4))) + 'px';
      cm.style.transformOrigin = y > r.height - h ? 'bottom left' : 'top left';
      cm.querySelector('.r').focus({ preventScroll: true });
    };
    const close = () => cm.classList.remove('open');
    stage.addEventListener('contextmenu', (e) => { e.preventDefault(); const r = stage.getBoundingClientRect(); openAt(e.clientX - r.left, e.clientY - r.top); });
    stage.addEventListener('pointerdown', (e) => { if (!cm.contains(e.target) && e.button === 0) close(); });
    stage.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { close(); stage.focus({ preventScroll: true }); }
      if ((e.key === 'Enter' || e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) && e.target === stage) { e.preventDefault(); openAt(60, 30); }
      if (cm.classList.contains('open') && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        const items = [...cm.querySelectorAll('.r')], i = items.indexOf(root.activeElement);
        items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus({ preventScroll: true });
      }
    });
    cm.addEventListener('click', (e) => { if (e.target.closest('button') && !e.target.closest('button').querySelector('.ar')) close(); });
  },
};
