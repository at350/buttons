// macOS Sonoma menu bar (Finder). Menus are data; html is built at import time (strings only, no DOM).
const CHEV = '<svg class="chev" width="9" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
const CHECK = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
const APPLE = '<svg width="14" height="16" viewBox="0 13.2 17 18.6" fill="currentColor" aria-hidden="true"><path d="m15.5752 19.0792a4.2055 4.2055 0 0 0 -2.01 3.5376 4.0931 4.0931 0 0 0 2.4908 3.7542 9.7779 9.7779 0 0 1 -1.2755 2.6351c-.7941 1.1431-1.6244 2.2862-2.8878 2.2862s-1.5883-.734-3.0443-.734c-1.42 0-1.9252.7581-3.08.7581s-1.9611-1.0589-2.8876-2.3584a11.3987 11.3987 0 0 1 -1.9373-6.1487c0-3.61 2.3464-5.523 4.6566-5.523 1.2274 0 2.25.8062 3.02.8062.734 0 1.8771-.8543 3.2729-.8543a4.3778 4.3778 0 0 1 3.6822 1.841zm-6.8586-2.0456a1.3865 1.3865 0 0 1 -.2527-.024 1.6557 1.6557 0 0 1 -.0361-.337 4.0341 4.0341 0 0 1 1.0228-2.5148 4.1571 4.1571 0 0 1 2.7314-1.4078 1.7815 1.7815 0 0 1 .0361.373 4.1487 4.1487 0 0 1 -.9867 2.587 3.6039 3.6039 0 0 1 -2.5148 1.3236z"/></svg>';

// item: '-' separator | [label, shortcut, flags] ; flags: d = disabled, c = checked ; submenu: [label, [items]]
const MENUS = [
  ['apple', [['About This Mac'], '-', ['System Settings…'], ['App Store…'], '-', ['Recent Items', [['Safari'], ['Notes'], ['Preview'], '-', ['Clear Menu']]], '-', ['Force Quit Finder', '⌥⇧⌘⎋'], '-', ['Sleep'], ['Restart…'], ['Shut Down…'], '-', ['Lock Screen', '⌃⌘Q'], ['Log Out…', '⇧⌘Q']]],
  ['Finder', [['About Finder'], '-', ['Settings…', '⌘,'], '-', ['Empty Trash…', '⇧⌘⌫'], '-', ['Services', [['No Services Apply', '', 'd'], ['Services Settings…']]], '-', ['Hide Finder', '⌘H'], ['Hide Others', '⌥⌘H'], ['Show All', '', 'd']]],
  ['File', [['New Finder Window', '⌘N'], ['New Folder', '⇧⌘N'], ['New Folder with Selection', '⌃⌘N', 'd'], ['New Smart Folder', '⌥⌘N'], ['New Tab', '⌘T'], ['Open', '⌘O'], ['Open With', [['TextEdit (default)'], '-', ['Preview'], ['Safari'], ['Xcode'], '-', ['App Store…'], ['Other…']]], ['Close Window', '⌘W'], '-', ['Get Info', '⌘I'], ['Rename'], ['Compress'], '-', ['Duplicate', '⌘D'], ['Make Alias', '⌃⌘A'], ['Quick Look', '⌘Y'], '-', ['Move to Trash', '⌘⌫']]],
  ['Edit', [['Undo', '⌘Z'], ['Redo', '⇧⌘Z', 'd'], '-', ['Cut', '⌘X', 'd'], ['Copy', '⌘C'], ['Paste', '⌘V', 'd'], ['Select All', '⌘A'], '-', ['Show Clipboard'], '-', ['AutoFill', [['Contact…'], ['Passwords…']]], ['Start Dictation…'], ['Emoji & Symbols']]],
  ['View', [['as Icons', '⌘1', 'c'], ['as List', '⌘2'], ['as Columns', '⌘3'], ['as Gallery', '⌘4'], '-', ['Use Stacks', '⌃⌘0'], ['Sort By', [['None', '⌃⌥⌘0', 'c'], '-', ['Name', '⌃⌥⌘1'], ['Kind', '⌃⌥⌘2'], ['Date Last Opened', '⌃⌥⌘3'], ['Date Added', '⌃⌥⌘4'], ['Date Modified', '⌃⌥⌘5'], ['Size', '⌃⌥⌘7'], ['Tags', '⌃⌥⌘8']]], ['Clean Up'], '-', ['Hide Sidebar', '⌃⌘S'], ['Show Preview', '⇧⌘P'], '-', ['Hide Toolbar', '⌥⌘T'], ['Show All Tabs', '⇧⌘\\'], ['Show Tab Bar', '⇧⌘T'], ['Show Path Bar', '⌥⌘P'], ['Show Status Bar', '⌘/'], '-', ['Customize Toolbar…'], '-', ['Show View Options', '⌘J'], '-', ['Enter Full Screen', '⌃⌘F']]],
  ['Go', [['Back', '⌘['], ['Forward', '⌘]', 'd'], ['Enclosing Folder', '⌘↑'], '-', ['Recents', '⇧⌘F'], ['Documents', '⇧⌘O'], ['Desktop', '⇧⌘D'], ['Downloads', '⌥⌘L'], ['Home', '⇧⌘H'], ['Computer', '⇧⌘C'], ['AirDrop', '⇧⌘R'], ['Network', '⇧⌘K'], ['iCloud Drive', '⇧⌘I'], ['Applications', '⇧⌘A'], ['Utilities', '⇧⌘U'], '-', ['Recent Folders', [['Desktop'], ['Downloads'], ['Documents'], '-', ['Clear Menu']]], '-', ['Go to Folder…', '⇧⌘G'], ['Connect to Server…', '⌘K']]],
  ['Window', [['Minimize', '⌘M'], ['Zoom'], ['Fill'], ['Center'], '-', ['Cycle Through Windows', '⌘`'], '-', ['Show Previous Tab', '⌃⇧⇥'], ['Show Next Tab', '⌃⇥'], ['Move Tab to New Window'], ['Merge All Windows'], '-', ['Bring All to Front']]],
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const panel = (items, cls) => {
  const hasCk = items.some((it) => Array.isArray(it) && (it[2] || '').includes('c'));
  return `<div class="menu ${cls}${hasCk ? ' ck' : ''}" role="menu">${items.map((it) => {
    if (it === '-') return '<div class="sep" role="separator"></div>';
    const [label, sc, flags = ''] = it;
    if (Array.isArray(sc)) {
      return `<div class="sw"><button class="r" type="button" role="menuitem" aria-haspopup="menu" aria-expanded="false" tabindex="-1"><span class="c"></span><span class="l">${esc(label)}</span><span class="m"></span><span class="k">${CHEV}</span></button>${panel(sc, 'sub')}</div>`;
    }
    const mods = (sc || '').slice(0, -1), key = (sc || '').slice(-1);
    const dis = flags.includes('d') ? ' aria-disabled="true"' : '';
    return `<button class="r" type="button" role="menuitem" tabindex="-1"${dis}><span class="c">${flags.includes('c') ? CHECK : ''}</span><span class="l">${esc(label)}</span><span class="m">${mods}</span><span class="k">${esc(key)}</span></button>`;
  }).join('')}</div>`;
};

export default {
  id: 'mn-macos-menu',
  credit: 'macOS Sonoma menu bar (Finder) — vibrancy menus, aligned ⌘ shortcut columns, submenus, hover-to-switch',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .mb { position: relative; display: flex; align-items: center; height: 24px; padding: 0 6px; border-radius: 7px; white-space: nowrap;
      isolation: isolate; background: #9fb6c4 url(assets/wide/23.webp) center 38% / cover;
      box-shadow: inset 0 -.5px 0 rgba(0,0,0,.12); font: 400 13px/16px -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif; color: rgba(0,0,0,.88); -webkit-font-smoothing: antialiased; user-select: none; }
    .mb::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: rgba(246,246,246,.58); -webkit-backdrop-filter: blur(24px) saturate(1.4); backdrop-filter: blur(24px) saturate(1.4); pointer-events: none; }
    .t { position: relative; height: 22px; padding: 0 9px; border: 0; border-radius: 4px; background: none; font: inherit; color: inherit; cursor: default; display: flex; align-items: center; }
    .t.app { font-weight: 700; }
    .t.ap { padding: 0 11px 0 10px; }
    .t[aria-expanded="true"] { background: rgba(0,0,0,.1); }
    .t:focus-visible { outline: 2px solid rgba(10,96,255,.7); outline-offset: -2px; }
    .menu { position: absolute; top: 24px; left: 0; z-index: 2; min-width: 170px; padding: 5px; border-radius: 6px; display: none; opacity: 0; transition: opacity .2s ease, display .2s allow-discrete;
      background: rgba(238,238,238,.8); -webkit-backdrop-filter: blur(40px) saturate(1.9); backdrop-filter: blur(40px) saturate(1.9);
      box-shadow: 0 0 0 .5px rgba(0,0,0,.22), inset 0 0 0 .5px rgba(255,255,255,.45), 0 10px 32px rgba(0,0,0,.22), 0 2px 6px rgba(0,0,0,.08); }
    .menu.open { display: block; opacity: 1; transition: none; }
    .menu.now { transition: none; }
    .menu.flip { left: auto; right: 0; }
    .sw { position: relative; }
    .sub { top: -5px; left: calc(100% + 1px); }
    .sub.flipx { left: auto; right: calc(100% + 1px); }
    .r { display: grid; grid-template-columns: 0 1fr 52px 18px; align-items: center; width: 100%; height: 22px; padding: 0 9px; border: 0; border-radius: 4px; background: none; font: inherit; color: inherit; cursor: default; text-align: left; outline: 0; }
    .ck .r { grid-template-columns: 15px 1fr 52px 18px; padding-left: 6px; }
    .r .l { padding-right: 26px; }
    .r .m { text-align: right; color: rgba(0,0,0,.42); letter-spacing: .5px; }
    .r .k { text-align: left; color: rgba(0,0,0,.42); padding-left: 1px; display: flex; align-items: center; }
    .r .k .chev { margin-left: 4px; color: rgba(0,0,0,.6); }
    .r .c { display: flex; align-items: center; }
    .r.hl { background: #0a60ff; color: #fff; }
    .r.hl .m, .r.hl .k, .r.hl .k .chev { color: #fff; }
    .r[aria-disabled="true"] { color: rgba(0,0,0,.26); }
    .r[aria-disabled="true"] .m, .r[aria-disabled="true"] .k { color: rgba(0,0,0,.2); }
    .sep { height: 1px; margin: 5px 9px; background: rgba(0,0,0,.1); }
  `,
  html: `<div class="mb" role="menubar">${MENUS.map(([name, items], i) =>
    `<div class="tw" style="display:contents"><button class="t${i === 0 ? ' ap' : i === 1 ? ' app' : ''}" type="button" role="menuitem" aria-haspopup="menu" aria-expanded="false"${i === 0 ? ' aria-label="Apple"' : ''}>${i === 0 ? APPLE : name}</button>${panel(items, 'top')}</div>`).join('')}</div>`,
  init(root, host) {
    const titles = [...root.querySelectorAll('.t')];
    const menus = titles.map((t) => t.nextElementSibling);
    let cur = -1; let subTimer = 0;
    const rowsOf = (m) => [...m.children].map((c) => (c.classList.contains('sw') ? c.firstElementChild : c)).filter((r) => r.classList && r.classList.contains('r') && r.getAttribute('aria-disabled') !== 'true');
    const closeSubs = (m) => m.querySelectorAll('.sub.open').forEach((s) => { s.classList.remove('open'); s.previousElementSibling.setAttribute('aria-expanded', 'false'); s.previousElementSibling.classList.remove('hl'); });
    const hl = (m, r, focus = true) => {
      m.querySelectorAll(':scope > .r.hl, :scope > .sw > .r.hl').forEach((x) => x !== r && x.classList.remove('hl'));
      if (r) { r.classList.add('hl'); if (focus) r.focus({ preventScroll: true }); }
    };
    const openSub = (r) => {
      const s = r.nextElementSibling; if (!s || s.classList.contains('open')) return;
      closeSubs(r.closest('.menu'));
      s.classList.add('open', 'now'); r.setAttribute('aria-expanded', 'true'); r.classList.add('hl');
      s.classList.remove('flipx');
      const b = s.getBoundingClientRect();
      if (b.right > document.documentElement.clientWidth - 4) s.classList.add('flipx');
    };
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(-1); };
    const set = (i, instant) => {
      if (i === cur) return;
      if (cur >= 0) {
        const m = menus[cur]; closeSubs(m); hl(m, null);
        m.classList.toggle('now', !!instant || i >= 0); m.classList.remove('open');
        titles[cur].setAttribute('aria-expanded', 'false');
      }
      cur = i;
      if (i >= 0) {
        const m = menus[i], t = titles[i];
        m.classList.remove('flip'); m.style.left = t.offsetLeft + 'px';
        m.classList.add('open', 'now'); t.setAttribute('aria-expanded', 'true');
        const b = m.getBoundingClientRect();
        if (b.right > document.documentElement.clientWidth - 4) { m.style.left = ''; m.classList.add('flip'); }
      }
      host.toggleAttribute('data-open', i >= 0);
      document[i >= 0 ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true);
    };
    const activate = (r) => {
      if (r.getAttribute('aria-disabled') === 'true') return;
      if (r.getAttribute('aria-haspopup')) { openSub(r); const s = r.nextElementSibling; const f = rowsOf(s)[0]; if (f) hl(s, f); return; }
      // macOS confirms the choice with a quick blink of the highlight before the menu fades out
      const t = cur; r.classList.remove('hl');
      setTimeout(() => r.classList.add('hl'), 70);
      setTimeout(() => { if (cur === t) { set(-1); titles[t].focus({ preventScroll: true }); } }, 160);
    };
    titles.forEach((t, i) => {
      t.addEventListener('pointerdown', (e) => { if (e.button !== 0) return; e.preventDefault(); set(cur === i ? -1 : i); t.focus({ preventScroll: true }); });
      t.addEventListener('click', (e) => { if (e.detail === 0) { set(cur === i ? -1 : i); const f = cur >= 0 && rowsOf(menus[i])[0]; if (f) hl(menus[i], f); } });
      t.addEventListener('pointerenter', () => { if (cur >= 0 && cur !== i) { set(i, true); t.focus({ preventScroll: true }); } });
    });
    root.querySelectorAll('.r').forEach((r) => {
      const m = r.closest('.menu');
      r.addEventListener('pointerenter', () => {
        if (r.getAttribute('aria-disabled') === 'true') { hl(m, null, false); closeSubs(m); return; }
        hl(m, r);
        clearTimeout(subTimer);
        if (r.getAttribute('aria-haspopup')) subTimer = setTimeout(() => openSub(r), 60);
        else subTimer = setTimeout(() => closeSubs(m), 120);
      });
      r.addEventListener('click', (e) => { e.stopPropagation(); activate(r); });
    });
    menus.forEach((m) => m.addEventListener('pointerleave', (e) => { if (!m.querySelector('.sub.open') && !(e.relatedTarget && m.contains(e.relatedTarget))) hl(m, null, false); }));
    root.addEventListener('keydown', (e) => {
      if (cur < 0) { if ((e.key === 'ArrowDown') && titles.includes(root.activeElement)) { e.preventDefault(); set(titles.indexOf(root.activeElement)); const m = menus[cur]; hl(m, rowsOf(m)[0]); } return; }
      const active = root.activeElement; const inMenu = active && active.classList.contains('r') ? active.closest('.menu') : menus[cur];
      if (e.key === 'Escape') {
        e.preventDefault();
        if (inMenu.classList.contains('sub')) { const p = inMenu.previousElementSibling; closeSubs(p.closest('.menu')); hl(p.closest('.menu'), p); }
        else { const t = cur; set(-1); titles[t].focus({ preventScroll: true }); }
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const rows = rowsOf(inMenu), i = rows.indexOf(active), d = e.key === 'ArrowDown' ? 1 : -1;
        hl(inMenu, rows[i < 0 ? (d > 0 ? 0 : rows.length - 1) : (i + d + rows.length) % rows.length]);
      } else if (e.key === 'ArrowRight' && active && active.getAttribute('aria-haspopup') && active.classList.contains('r')) {
        e.preventDefault(); activate(active);
      } else if (e.key === 'ArrowLeft' && inMenu.classList.contains('sub')) {
        e.preventDefault(); const p = inMenu.previousElementSibling; closeSubs(p.closest('.menu')); hl(p.closest('.menu'), p);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault(); const n = (cur + (e.key === 'ArrowRight' ? 1 : -1) + titles.length) % titles.length;
        set(n, true); hl(menus[n], rowsOf(menus[n])[0]);
      } else if ((e.key === 'Enter' || e.key === ' ') && active && active.classList.contains('r')) {
        e.preventDefault(); activate(active);
      }
    });
    return () => { clearTimeout(subTimer); set(-1); };
  },
};
