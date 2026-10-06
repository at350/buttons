const L = (inner) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
let n = 0;
const it = (icon, label, sc = '', dis = false) => `<div class="it" id="cp-${n++}" role="option" aria-selected="false"${dis ? ' aria-disabled="true"' : ''}>${L(icon)}<span>${label}</span>${sc ? `<span class="sc">${sc}</span>` : ''}</div>`;

export default {
  id: 'mn-command-palette',
  credit: 'shadcn/ui Command (cmdk) — ⌘K palette: fuzzy filter, grouped results, shortcuts, arrow-key selection',
  size: 'wide',
  css: `
    :host { display: block; }
    .sizer { width: 450px; max-width: 100%; height: 0; }
    .cmd { width: 100%; max-width: 640px; margin: 0 auto; display: flex; flex-direction: column; overflow: hidden; background: #fff; color: #09090b; border: 1px solid #e4e4e7; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1); font: 400 14px/20px Inter, Geist, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
    .in { display: flex; align-items: center; gap: 8px; height: 36px; padding: 0 12px; border-bottom: 1px solid #e4e4e7; flex: none; }
    .in svg { flex: none; opacity: .5; }
    input { flex: 1; min-width: 0; height: 40px; padding: 12px 0; border: 0; background: transparent; color: #09090b; font: inherit; outline: none; }
    input::placeholder { color: #71717a; }
    .list { position: relative; height: 265px; overflow-x: hidden; overflow-y: auto; scroll-padding: 4px 0; overscroll-behavior: contain; }
    .grp { padding: 4px; color: #09090b; }
    .hd { padding: 6px 8px; font-size: 12px; line-height: 16px; font-weight: 500; color: #71717a; }
    .sep { height: 1px; margin: 0 -1px; background: #e4e4e7; }
    .it { position: relative; display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 4px; cursor: default; user-select: none; white-space: nowrap; }
    .it svg { flex: none; color: #71717a; }
    .it[aria-selected="true"] { background: #f4f4f5; color: #18181b; }
    .it[aria-disabled="true"] { opacity: .5; pointer-events: none; }
    .sc { margin-left: auto; font-size: 12px; line-height: 16px; letter-spacing: .1em; color: #71717a; }
    [hidden] { display: none !important; }
    .empty { padding: 24px 0; text-align: center; }
  `,
  html: `
    <div class="sizer"></div>
    <div class="cmd">
      <div class="in">${L('<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>')}<input type="text" placeholder="Type a command or search..." aria-label="Type a command or search" role="combobox" aria-expanded="true" aria-controls="cp-list" aria-autocomplete="list" autocomplete="off" autocorrect="off" spellcheck="false"></div>
      <div class="list" id="cp-list" role="listbox" aria-label="Suggestions">
        <div class="empty" role="presentation" hidden>No results found.</div>
        <div class="grp" role="group" aria-labelledby="cp-h1">
          <div class="hd" id="cp-h1">Suggestions</div>
          ${it('<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>', 'Calendar')}
          ${it('<path d="M15 10V9"/><path d="M16.472 15a6 6 0 01-8.943 0"/><path d="M9 10V9"/><circle cx="12" cy="12" r="10"/>', 'Search Emoji')}
          ${it('<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>', 'Calculator', '', true)}
        </div>
        <div class="sep" role="separator"></div>
        <div class="grp" role="group" aria-labelledby="cp-h2">
          <div class="hd" id="cp-h2">Settings</div>
          ${it('<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>', 'Profile', '⌘P')}
          ${it('<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/><path d="M6 14h2"/>', 'Billing', '⌘B')}
          ${it('<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>', 'Settings', '⌘S')}
        </div>
      </div>
    </div>`,
  init(root) {
    const input = root.querySelector('input'), list = root.querySelector('.list'), empty = root.querySelector('.empty'), sep = root.querySelector('.sep');
    const grps = [...root.querySelectorAll('.grp')], items = [...root.querySelectorAll('.it')];
    let hl = 0;
    const live = () => items.filter((x) => !x.hidden && x.getAttribute('aria-disabled') !== 'true');
    const paint = (scroll) => {
      const v = live(); hl = Math.max(0, Math.min(hl, v.length - 1));
      items.forEach((x) => x.setAttribute('aria-selected', 'false'));
      const t = v[hl];
      if (t) {
        t.setAttribute('aria-selected', 'true'); input.setAttribute('aria-activedescendant', t.id);
        if (scroll) { const top = t.offsetTop, bot = top + t.offsetHeight; if (top < list.scrollTop + 4) list.scrollTop = top - 4; else if (bot > list.scrollTop + list.clientHeight - 4) list.scrollTop = bot - list.clientHeight + 4; }
      } else input.removeAttribute('aria-activedescendant');
    };
    // cmdk-style fuzzy filter: query chars in order; groups with no matches disappear.
    const match = (text, q) => { let j = 0; for (const c of text) if (c === q[j]) j++; return j === q.length; };
    const filter = () => {
      const q = input.value.trim().toLowerCase();
      items.forEach((x) => { x.hidden = !!q && !match(x.querySelector('span').textContent.toLowerCase(), q); });
      grps.forEach((g) => { g.hidden = !g.querySelector('.it:not([hidden])'); });
      sep.hidden = grps.some((g) => g.hidden);
      empty.hidden = items.some((x) => !x.hidden);
      hl = 0; list.scrollTop = 0; paint();
    };
    input.addEventListener('input', filter);
    input.addEventListener('keydown', (e) => {
      const v = live(); if (!v.length && e.key !== 'Escape') return;
      if (e.key === 'ArrowDown' || (e.ctrlKey && e.key === 'n')) { e.preventDefault(); hl = Math.min(v.length - 1, hl + 1); paint(true); }
      else if (e.key === 'ArrowUp' || (e.ctrlKey && e.key === 'p')) { e.preventDefault(); hl = Math.max(0, hl - 1); paint(true); }
      else if (e.key === 'Home') { e.preventDefault(); hl = 0; paint(true); }
      else if (e.key === 'End') { e.preventDefault(); hl = v.length - 1; paint(true); }
      else if (e.key === 'Enter') e.preventDefault();
      else if (e.key === 'Escape') { if (input.value) { input.value = ''; filter(); } else input.blur(); }
    });
    items.forEach((x) => {
      x.addEventListener('pointermove', () => { const i = live().indexOf(x); if (i >= 0 && i !== hl) { hl = i; paint(); } });
      x.addEventListener('click', () => input.focus({ preventScroll: true }));
    });
    list.addEventListener('pointerdown', (e) => e.preventDefault());
    paint();
  },
};
