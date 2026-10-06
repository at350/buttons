export default {
  id: 'mn-kebab-menu',
  credit: 'The "⋯" overflow / kebab menu found on every card (Notion, Google Drive, Trello)',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap { position: relative; font: 14px/20px -apple-system, system-ui, sans-serif; color: #37352f; }
    .k { width: 32px; height: 32px; border-radius: 6px; border: 0; background: none; color: #787774; cursor: pointer; display: grid; place-items: center; padding: 0; transition: background .12s, color .12s; }
    .k:hover, .k[aria-expanded="true"] { background: rgba(55,53,47,.08); color: #37352f; }
    .k:focus-visible { outline: 2px solid #2383e2; outline-offset: 1px; }
    .menu { position: absolute; top: 36px; right: 0; width: 200px; padding: 4px; background: #fff; border-radius: 8px; box-shadow: 0 0 0 1px rgba(15,15,15,.05), 0 3px 6px rgba(15,15,15,.1), 0 9px 24px rgba(15,15,15,.2); display: none; transform-origin: top right; }
    .menu.l { right: auto; left: 0; transform-origin: top left; }
    .menu.open { display: block; animation: in .12s cubic-bezier(.16,1,.3,1); }
    @keyframes in { from { opacity: 0; transform: scale(.96) translateY(-4px); } }
    .r { display: flex; align-items: center; gap: 10px; width: 100%; height: 30px; padding: 0 10px; border: 0; border-radius: 4px; background: none; color: inherit; font: inherit; cursor: pointer; text-align: left; }
    .r:hover, .r:focus-visible { background: rgba(55,53,47,.08); outline: 0; }
    .r svg { color: #787774; flex: none; }
    .r .sc { margin-left: auto; color: #9b9a97; font-size: 12px; }
    .r.danger, .r.danger svg { color: #eb5757; }
    hr { border: 0; border-top: 1px solid rgba(55,53,47,.09); margin: 4px 0; }
  `,
  html: `
    <div class="wrap">
      <button class="k" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="More"><svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><circle cx="4" cy="9" r="1.7"/><circle cx="9" cy="9" r="1.7"/><circle cx="14" cy="9" r="1.7"/></svg></button>
      <div class="menu" role="menu">
        <button class="r" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>Rename<span class="sc">⌘⇧R</span></button>
        <button class="r" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>Duplicate<span class="sc">⌘D</span></button>
        <button class="r" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v13"/></svg>Share</button>
        <button class="r" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.5 1.5M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7L12 19"/></svg>Copy link</button>
        <hr>
        <button class="r danger" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/></svg>Delete<span class="sc">Del</span></button>
      </div>
    </div>`,
  init(root, host) {
    const k = root.querySelector('.k'), menu = root.querySelector('.menu');
    const items = [...menu.querySelectorAll('.r')];
    const onDoc = (e) => { if (!host.contains(e.target)) set(false); };
    const set = (v) => { if (v) menu.classList.toggle('l', host.getBoundingClientRect().right - 200 < 8); k.setAttribute('aria-expanded', v); menu.classList.toggle('open', v); host.toggleAttribute('data-open', v); document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true); };
    k.addEventListener('click', () => set(k.getAttribute('aria-expanded') !== 'true'));
    items.forEach((r) => r.addEventListener('click', () => { set(false); k.focus({ preventScroll: true }); }));
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { set(false); k.focus({ preventScroll: true }); return; }
      if (!menu.classList.contains('open') || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
      e.preventDefault();
      const i = items.indexOf(root.activeElement);
      items[i < 0 ? 0 : (i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus({ preventScroll: true });
    });
    return () => set(false);
  },
};
