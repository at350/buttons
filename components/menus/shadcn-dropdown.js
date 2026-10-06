const L = (inner, cls = '') => `<svg class="${cls}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const it = (icon, label, sc = '', extra = '') => `<div class="it" role="menuitem" tabindex="-1"${extra}>${L(icon)}<span>${label}</span>${sc ? `<span class="sc">${sc}</span>` : ''}</div>`;
const SEP = '<div class="sep" role="separator"></div>';

export default {
  id: 'mn-shadcn-dropdown',
  credit: 'shadcn/ui — DropdownMenu (Radix): outline trigger, label, groups, shortcuts, sub-menu, disabled item',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    :host([data-open]) { z-index: 30; }
    .wrap { position: relative; font: 400 14px/20px Inter, Geist, system-ui, sans-serif; color: #09090b; -webkit-font-smoothing: antialiased; }
    .trig { display: inline-flex; align-items: center; justify-content: center; height: 36px; padding: 8px 16px; border: 1px solid #e4e4e7; border-radius: 6px; background: #fff; color: #09090b; font: 500 14px/20px Inter, Geist, system-ui, sans-serif; white-space: nowrap; cursor: pointer; outline: none; box-shadow: 0 1px 2px 0 rgba(0,0,0,.05); transition: color 150ms cubic-bezier(.4,0,.2,1), background-color 150ms cubic-bezier(.4,0,.2,1), border-color 150ms cubic-bezier(.4,0,.2,1), box-shadow 150ms cubic-bezier(.4,0,.2,1); }
    .trig:hover, .trig[aria-expanded="true"] { background: #f4f4f5; color: #18181b; }
    .trig:focus-visible { border-color: #a1a1aa; box-shadow: 0 0 0 3px rgba(161,161,170,.5); }
    .menu, .sub { position: absolute; display: none; min-width: 128px; padding: 4px; background: #fff; color: #09090b; border: 1px solid #e4e4e7; border-radius: 6px; outline: none; }
    .menu { top: 40px; left: 0; width: 224px; box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1); transform-origin: 0 0; }
    .menu.end { left: auto; right: 0; transform-origin: 100% 0; }
    .sub { top: -5px; left: calc(100% + 4px); white-space: nowrap; box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); transform-origin: 0 0; }
    .sub.flip { left: auto; right: calc(100% + 4px); transform-origin: 100% 0; }
    .open { display: block; animation: enter 150ms ease; }
    .closing { display: block; animation: exit 150ms ease forwards; pointer-events: none; }
    .menu.open { animation-name: enter-top; }
    @keyframes enter-top { from { opacity: 0; transform: translateY(-8px) scale(.95); } }
    @keyframes enter { from { opacity: 0; transform: translateX(-8px) scale(.95); } }
    @keyframes exit { to { opacity: 0; transform: scale(.95); } }
    .lb { padding: 6px 8px; font-weight: 600; }
    .sep { height: 1px; margin: 4px -4px; background: #e4e4e7; }
    .it { position: relative; display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 4px; cursor: default; user-select: none; outline: none; white-space: nowrap; }
    .it svg { flex: none; color: #71717a; }
    .it:focus, .it.on { background: #f4f4f5; color: #18181b; }
    .it[aria-disabled="true"] { opacity: .5; pointer-events: none; }
    .sc { margin-left: auto; padding-left: 16px; font-size: 12px; line-height: 16px; letter-spacing: .1em; opacity: .6; }
    .it .chev { margin-left: auto; }
    .has { position: relative; }
  `,
  html: `
    <div class="wrap">
      <button class="trig" type="button" aria-haspopup="menu" aria-expanded="false">Open</button>
      <div class="menu" role="menu" aria-label="My Account">
        <div class="lb">My Account</div>
        ${SEP}
        <div role="group">
          ${it('<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>', 'Profile', '⇧⌘P')}
          ${it('<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/><path d="M6 14h2"/>', 'Billing', '⌘B')}
          ${it('<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>', 'Settings', '⌘S')}
          ${it('<path d="M10 8h.01"/><path d="M12 12h.01"/><path d="M14 8h.01"/><path d="M16 12h.01"/><path d="M18 8h.01"/><path d="M6 8h.01"/><path d="M7 16h10"/><path d="M8 12h.01"/><rect width="20" height="16" x="2" y="4" rx="2"/>', 'Keyboard shortcuts', '⌘K')}
        </div>
        ${SEP}
        <div role="group">
          ${it('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>', 'Team')}
          <div class="has">
            <div class="it st" role="menuitem" tabindex="-1" aria-haspopup="menu" aria-expanded="false">${L('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>')}<span>Invite users</span>${L('<path d="m9 18 6-6-6-6"/>', 'chev')}</div>
            <div class="sub" role="menu" aria-label="Invite users">
              ${it('<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>', 'Email')}
              ${it('<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>', 'Message')}
              ${SEP}
              ${it('<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>', 'More...')}
            </div>
          </div>
          ${it('<path d="M5 12h14"/><path d="M12 5v14"/>', 'New Team', '⌘+T')}
        </div>
        ${SEP}
        ${it('<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>', 'GitHub')}
        ${it('<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>', 'Support')}
        ${it('<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>', 'API', '', ' aria-disabled="true"')}
        ${SEP}
        ${it('<path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>', 'Log out', '⇧⌘Q')}
      </div>
    </div>`,
  init(root, host) {
    const trig = root.querySelector('.trig'), menu = root.querySelector('.menu'), sub = root.querySelector('.sub'), st = root.querySelector('.st');
    const mainItems = [...menu.querySelectorAll('.it')].filter((x) => !sub.contains(x) && x.getAttribute('aria-disabled') !== 'true');
    const subItems = [...sub.querySelectorAll('.it')];
    const timers = new Set();
    let open = false, subOpen = false, subT = 0;
    const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); return t; };
    const show = (el, v) => {
      if (v) { el.classList.remove('closing'); el.classList.add('open'); }
      else if (el.classList.contains('open')) { el.classList.remove('open'); el.classList.add('closing'); later(() => el.classList.remove('closing'), 150); }
    };
    const setSub = (v, focus) => {
      clearTimeout(subT);
      if (v === subOpen) { if (v && focus) subItems[0].focus({ preventScroll: true }); return; }
      subOpen = v;
      if (v) { const r = st.getBoundingClientRect(); sub.classList.toggle('flip', r.right + 140 > document.documentElement.clientWidth); }
      st.setAttribute('aria-expanded', v); st.classList.toggle('on', v); show(sub, v);
      if (v && focus) subItems[0].focus({ preventScroll: true });
    };
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(false); };
    const set = (v, focus) => {
      if (v === open) return; open = v;
      trig.setAttribute('aria-expanded', v);
      document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true);
      if (v) {
        const r = host.getBoundingClientRect(); menu.classList.toggle('end', r.left + 232 > document.documentElement.clientWidth);
        host.toggleAttribute('data-open', true); show(menu, true);
        (focus ? mainItems[0] : menu).focus({ preventScroll: true });
      } else {
        setSub(false); show(menu, false);
        later(() => { if (!open) host.toggleAttribute('data-open', false); }, 150);
        if (focus !== false) trig.focus({ preventScroll: true });
      }
    };
    menu.tabIndex = -1;
    trig.addEventListener('pointerdown', (e) => { if (e.button === 0) { e.preventDefault(); set(!open, false); } });
    trig.addEventListener('keydown', (e) => { if (['Enter', ' ', 'ArrowDown'].includes(e.key)) { e.preventDefault(); set(true, true); } });
    // Radix: pointer moves focus to the item; leaving an item returns focus to the content.
    [...mainItems, ...subItems].forEach((x) => {
      x.addEventListener('pointermove', () => { if (root.activeElement !== x) x.focus({ preventScroll: true }); if (mainItems.includes(x) && x !== st && subOpen) subT = later(() => setSub(false), 100); });
      x.addEventListener('pointerleave', () => { if (root.activeElement === x && x !== st) (sub.contains(x) ? sub : menu).focus({ preventScroll: true }); });
      if (x !== st) x.addEventListener('click', () => set(false));
    });
    sub.tabIndex = -1;
    sub.addEventListener('pointerenter', () => clearTimeout(subT));
    st.addEventListener('pointerenter', () => { clearTimeout(subT); subT = later(() => setSub(true), 100); });
    st.addEventListener('click', () => setSub(true, true));
    const nav = (list, e) => {
      const i = list.indexOf(root.activeElement);
      const go = (n) => { e.preventDefault(); list[Math.max(0, Math.min(list.length - 1, n))].focus({ preventScroll: true }); };
      if (e.key === 'ArrowDown') go(i < 0 ? 0 : i + 1);
      else if (e.key === 'ArrowUp') go(i < 0 ? list.length - 1 : i - 1);
      else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(list.length - 1);
      else if (e.key.length === 1 && /\S/.test(e.key)) {
        const k = e.key.toLowerCase(), f = (x) => x.textContent.trim().toLowerCase().startsWith(k);
        const m = list.slice(i + 1).find(f) || list.find(f); if (m) m.focus({ preventScroll: true });
      } else return false;
      return true;
    };
    menu.addEventListener('keydown', (e) => {
      const inSub = sub.contains(root.activeElement);
      if (e.key === 'Escape') { e.preventDefault(); set(false, true); return; }
      if (e.key === 'Tab') { e.preventDefault(); set(false, true); return; }
      if (inSub) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); setSub(false); st.focus({ preventScroll: true }); return; }
        if ((e.key === 'Enter' || e.key === ' ') && root.activeElement !== sub) { e.preventDefault(); set(false, true); return; }
        nav(subItems, e); return;
      }
      if (root.activeElement === st && (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setSub(true, true); return; }
      if ((e.key === 'Enter' || e.key === ' ') && mainItems.includes(root.activeElement)) { e.preventDefault(); set(false, true); return; }
      if (nav(mainItems, e) && subOpen && root.activeElement !== st) setSub(false);
    });
    return () => { set(false, false); timers.forEach(clearTimeout); host.toggleAttribute('data-open', false); };
  },
};
