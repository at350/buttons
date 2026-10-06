export default {
  id: 'dp-fold-menu',
  credit: 'Folding paper menu — panels unfold top-down on rotateX hinges like a road map, each panel shaded until it lies flat (Codrops “3D folding” lineage); closes on outside click or Esc',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .menu { position: relative; width: 168px; }
    .trigger {
      width: 168px; height: 40px; border: 0; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; padding: 0 12px 0 14px;
      position: relative; z-index: 3; background: #0f172a; color: #fff; font: 600 14px/1 'Inter', system-ui, sans-serif; box-shadow: 0 1px 2px rgba(15, 23, 42, .3), 0 4px 10px rgba(15, 23, 42, .18);
      transition: background .15s, border-radius .2s;
    }
    .trigger:hover { background: #1e293b; }
    .trigger[aria-expanded="true"] { border-radius: 10px 10px 0 0; }
    .trigger svg { width: 16px; height: 16px; transition: transform .35s cubic-bezier(.3, 1, .4, 1); }
    .trigger[aria-expanded="true"] svg { transform: rotate(180deg); }
    .trigger:focus-visible { outline: 2px solid #4f46e5; outline-offset: 2px; }
    .drop { position: absolute; left: 0; top: 100%; width: 168px; perspective: 800px; z-index: 2; pointer-events: none; visibility: hidden; transition: visibility 0s linear .5s; }
    .open .drop { pointer-events: auto; visibility: visible; transition: none; }
    /* every panel is absolutely placed under the one above it, so the open menu is a stack of popover layers */
    .fold {
      position: absolute; left: 0; top: 0; width: 168px; height: 40px; transform-style: preserve-3d; transform-origin: top; transform: rotateX(-90deg); visibility: hidden;
      transition: transform .3s cubic-bezier(.4, 0, .6, 1) .18s, visibility 0s linear .48s;
    }
    .open .fold { transform: rotateX(0deg); visibility: visible; transition: transform .45s cubic-bezier(.3, 1.1, .4, 1), visibility 0s; }
    .fold .fold { transition-delay: .12s, .42s; } .fold .fold .fold { transition-delay: .06s, .36s; } .fold .fold .fold .fold { transition-delay: 0s, .3s; }
    .open .fold .fold { transition-delay: .1s, 0s; } .open .fold .fold .fold { transition-delay: .2s, 0s; } .open .fold .fold .fold .fold { transition-delay: .3s, 0s; }
    .fold .fold { top: 40px; }
    .item {
      position: absolute; left: 0; top: 0; display: flex; align-items: center; gap: 10px; width: 168px; height: 40px; border: 0; cursor: pointer; padding: 0 14px; text-align: left;
      background: #f8fafc; color: #0f172a; font: 500 14px/1 'Inter', system-ui, sans-serif; white-space: nowrap;
      box-shadow: inset 0 -1px 0 #e2e8f0; transition: background .15s;
    }
    .item svg { width: 16px; height: 16px; color: #64748b; flex: none; }
    /* paper shading: dark while the panel is folded away, gone once it lies flat */
    .item::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, rgba(15, 23, 42, .05), rgba(15, 23, 42, .55)); opacity: 1; transition: opacity .3s; }
    .open .item::after { opacity: 0; transition: opacity .45s; }
    .open .fold .fold .item::after { transition-delay: .1s; } .open .fold .fold .fold .item::after { transition-delay: .2s; } .open .fold .fold .fold .fold .item::after { transition-delay: .3s; }
    .item:hover { background: #eef2ff; }
    .item[aria-current="true"] { background: #4f46e5; color: #fff; }
    .item[aria-current="true"] svg { color: #c7d2fe; }
    .item:focus-visible { outline: 2px solid #4f46e5; outline-offset: -2px; }
    .fold .fold .fold .fold .item { border-radius: 0 0 10px 10px; box-shadow: 0 10px 18px rgba(15, 23, 42, .18); }
  `,
  html: `
    <div class="menu">
      <button class="trigger" type="button" aria-expanded="false" aria-haspopup="menu"><span>Menu</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>
      <div class="drop" role="menu">
        <div class="fold"><button class="item" type="button" role="menuitem" aria-current="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>Dashboard</button>
          <div class="fold"><button class="item" type="button" role="menuitem" aria-current="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>Projects</button>
            <div class="fold"><button class="item" type="button" role="menuitem" aria-current="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>Calendar</button>
              <div class="fold"><button class="item" type="button" role="menuitem" aria-current="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>Settings</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  init(root, host) {
    const menu = root.querySelector('.menu'), t = root.querySelector('.trigger');
    const items = [...root.querySelectorAll('.item')];
    items.forEach((it) => { it.tabIndex = -1; });
    let tm = 0;
    const set = (o) => {
      menu.classList.toggle('open', o); t.setAttribute('aria-expanded', String(o));
      // keep the host raised until the panels have finished folding away
      clearTimeout(tm);
      if (host) { if (o) host.setAttribute('data-open', ''); else tm = setTimeout(() => host.removeAttribute('data-open'), 600); }
      items.forEach((it) => { it.tabIndex = o ? 0 : -1; });
    };
    t.addEventListener('click', () => set(!menu.classList.contains('open')));
    items.forEach((it) => it.addEventListener('click', () => {
      items.forEach((x) => x.setAttribute('aria-current', 'false'));
      it.setAttribute('aria-current', 'true');
      set(false); t.focus();
    }));
    const outside = (e) => { if (menu.classList.contains('open') && !e.composedPath().includes(menu)) set(false); };
    const esc = (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) { set(false); t.focus(); } };
    document.addEventListener('pointerdown', outside);
    root.addEventListener('keydown', esc);
    return () => { clearTimeout(tm); document.removeEventListener('pointerdown', outside); if (host) host.removeAttribute('data-open'); };
  },
};
