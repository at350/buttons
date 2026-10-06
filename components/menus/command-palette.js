export default {
  id: 'mn-command-palette',
  credit: '⌘K command palette (Raycast / Linear / cmdk) — type to filter, arrows move the highlight',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { background: radial-gradient(120% 120% at 20% 0%, #3b2a66 0, #141221 60%); border-radius: 12px; padding: 22px 16px; }
    .pal { max-width: 560px; margin: 0 auto; background: rgba(28,27,36,.92); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,.1); border-radius: 12px; box-shadow: 0 24px 60px rgba(0,0,0,.5); overflow: hidden; font: 14px/20px -apple-system, "Inter", system-ui, sans-serif; color: #e9e8ee; }
    .in { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,.08); }
    .in svg { color: #8e8c9a; flex: none; }
    input { flex: 1; min-width: 0; background: none; border: 0; color: #fff; font: inherit; font-size: 16px; outline: 0; }
    input::placeholder { color: #6f6d7c; }
    kbd { font: 11px/1 ui-monospace, Menlo, monospace; padding: 4px 6px; border-radius: 5px; background: rgba(255,255,255,.08); color: #a6a4b2; }
    .list { position: relative; height: 236px; overflow: auto; padding: 6px; }
    .grp { font-size: 11px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; color: #6f6d7c; padding: 8px 10px 4px; }
    .c { display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px 10px; border: 0; border-radius: 8px; background: none; color: inherit; font: inherit; cursor: pointer; text-align: left; }
    .c svg { color: #a6a4b2; flex: none; }
    .c .k { margin-left: auto; display: flex; gap: 4px; }
    .c.hl { background: rgba(255,255,255,.1); }
    .c.hl svg { color: #fff; }
    .c.hide, .grp.hide { display: none; }
    .c:focus-visible { outline: 2px solid #7c6cf0; outline-offset: -2px; }
    .c.flash { animation: fl .4s; }
    @keyframes fl { 0%, 100% { background: rgba(255,255,255,.1); } 40% { background: #5b4fd6; } }
    .none { display: none; padding: 40px 0; text-align: center; color: #6f6d7c; }
    .list:not(:has(.c:not(.hide))) .none { display: block; }
    .in:has(input:focus-visible) { box-shadow: inset 0 0 0 2px #7c6cf0; }
  `,
  html: `
    <div class="stage"><div class="pal" role="dialog">
      <div class="in"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input type="text" placeholder="Search for apps and commands…" aria-label="Command" role="combobox" aria-expanded="true" autocomplete="off" spellcheck="false"><kbd>⌘K</kbd></div>
      <div class="list" role="listbox">
        <div class="grp">Suggestions</div>
        <button class="c" type="button" role="option"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>Calendar<span class="k"><kbd>⌘</kbd><kbd>C</kbd></span></button>
        <button class="c" type="button" role="option"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 017 7c0 3-2 4-2 6H7c0-2-2-3-2-6a7 7 0 017-7zM9 19h6M10 22h4"/></svg>Search Emoji<span class="k"><kbd>⌘</kbd><kbd>E</kbd></span></button>
        <button class="c" type="button" role="option"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>Calculator</button>
        <div class="grp">Settings</div>
        <button class="c" type="button" role="option"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></svg>Profile<span class="k"><kbd>⌘</kbd><kbd>P</kbd></span></button>
        <button class="c" type="button" role="option"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>Billing<span class="k"><kbd>⌘</kbd><kbd>B</kbd></span></button>
        <button class="c" type="button" role="option"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>Settings<span class="k"><kbd>⌘</kbd><kbd>S</kbd></span></button>
        <button class="c" type="button" role="option"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a9 9 0 109 9 7 7 0 01-9-9z"/></svg>Toggle Theme<span class="k"><kbd>⌘</kbd><kbd>T</kbd></span></button>
        <button class="c" type="button" role="option"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>Log Out</button>
        <div class="none">No results found.</div>
      </div>
    </div></div>`,
  init(root) {
    const input = root.querySelector('input'), list = root.querySelector('.list');
    const cmds = [...root.querySelectorAll('.c')], grps = [...root.querySelectorAll('.grp')];
    let hl = 0;
    cmds.forEach((c, i) => { c.id = 'opt-' + i; c.setAttribute('aria-selected', 'false'); });
    input.setAttribute('aria-controls', 'cmd-list'); list.id = 'cmd-list';
    const vis = () => cmds.filter((c) => !c.classList.contains('hide'));
    const paint = () => {
      const v = vis(); hl = Math.max(0, Math.min(hl, v.length - 1));
      cmds.forEach((c) => { c.classList.remove('hl'); c.setAttribute('aria-selected', 'false'); });
      const t = v[hl];
      if (t) {
        t.classList.add('hl'); t.setAttribute('aria-selected', 'true'); input.setAttribute('aria-activedescendant', t.id);
        if (t.offsetTop < list.scrollTop) list.scrollTop = t.offsetTop - 6; else if (t.offsetTop + t.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = t.offsetTop + t.offsetHeight - list.clientHeight + 6;
      } else input.removeAttribute('aria-activedescendant');
    };
    const filter = () => {
      const q = input.value.trim().toLowerCase();
      cmds.forEach((c) => c.classList.toggle('hide', !c.textContent.toLowerCase().includes(q)));
      grps.forEach((g) => { let n = g.nextElementSibling, any = false; while (n && n.classList.contains('c')) { if (!n.classList.contains('hide')) any = true; n = n.nextElementSibling; } g.classList.toggle('hide', !any); });
      hl = 0; paint();
    };
    const run = (c) => { if (!c) return; c.classList.remove('flash'); void c.offsetWidth; c.classList.add('flash'); };
    input.addEventListener('input', filter);
    input.addEventListener('keydown', (e) => {
      const v = vis();
      if (e.key === 'ArrowDown') { e.preventDefault(); hl = (hl + 1) % v.length; paint(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); hl = (hl - 1 + v.length) % v.length; paint(); }
      else if (e.key === 'Enter') { e.preventDefault(); run(v[hl]); }
      else if (e.key === 'Escape') { input.value = ''; filter(); input.blur(); }
    });
    cmds.forEach((c) => { c.addEventListener('pointermove', () => { const i = vis().indexOf(c); if (i !== hl) { hl = i; paint(); } }); c.addEventListener('click', () => { run(c); input.focus({ preventScroll: true }); }); });
    list.addEventListener('pointerdown', (e) => e.preventDefault());
    paint();
  },
};
