export default {
  id: 'mn-accordion-sidebar',
  credit: 'Admin dashboard sidebar with expanding groups (CoreUI / AdminLTE style, dark)',
  size: 'wide',
  css: `
    :host { display: block; }
    .sb { max-width: 260px; background: #1e2a3a; color: #c7d0dc; border-radius: 12px; padding: 10px 8px; font: 14px/20px -apple-system, system-ui, "Segoe UI", sans-serif; }
    .it, .g { display: flex; align-items: center; gap: 10px; width: 100%; padding: 9px 12px; border: 0; border-radius: 8px; background: none; color: inherit; font: inherit; cursor: pointer; text-align: left; transition: background .15s, color .15s; }
    .it:hover, .g:hover { background: rgba(255,255,255,.06); color: #fff; }
    .it:focus-visible, .g:focus-visible { outline: 2px solid #5aa2ff; outline-offset: -2px; }
    .it[aria-current="page"] { background: #3178e6; color: #fff; }
    .it svg, .g svg.i { color: #8b98a9; flex: none; }
    .it[aria-current="page"] svg { color: #fff; }
    .g .ch { margin-left: auto; transition: transform .25s; color: #8b98a9; }
    .g[aria-expanded="true"] .ch { transform: rotate(90deg); }
    .sub { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s cubic-bezier(.2,.8,.2,1); }
    .sub > div { overflow: hidden; min-height: 0; }
    .sub.open { grid-template-rows: 1fr; }
    .sub .it { padding-left: 42px; font-size: 13px; }
    .sub .it::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; opacity: .5; margin-left: -16px; margin-right: 10px; flex: none; }
    .sub .it[aria-current="page"] { background: rgba(49,120,230,.25); color: #fff; }
    .bdg { margin-left: auto; font-size: 11px; background: #e5484d; color: #fff; padding: 1px 6px; border-radius: 10px; font-weight: 600; }
  `,
  html: `
    <nav class="sb">
      <button class="it" type="button" aria-current="page"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>Dashboard</button>
      <button class="g" type="button" aria-expanded="false"><svg class="i" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>Projects<span class="bdg">3</span><svg class="ch" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3.5L10.5 8 6 12.5"/></svg></button>
      <div class="sub"><div><button class="it" type="button">Active</button><button class="it" type="button">Archived</button><button class="it" type="button">Templates</button></div></div>
      <button class="g" type="button" aria-expanded="false"><svg class="i" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0114 0M17 11a3 3 0 100-6M22 20a6 6 0 00-5-5.9"/></svg>Team<svg class="ch" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3.5L10.5 8 6 12.5"/></svg></button>
      <div class="sub"><div><button class="it" type="button">Members</button><button class="it" type="button">Roles</button></div></div>
      <button class="g" type="button" aria-expanded="false"><svg class="i" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V5M4 19h16M8 15V9M12 15v-4M16 15V7"/></svg>Reports<svg class="ch" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3.5L10.5 8 6 12.5"/></svg></button>
      <div class="sub"><div><button class="it" type="button">Weekly</button><button class="it" type="button">Monthly</button><button class="it" type="button">Custom</button></div></div>
      <button class="it" type="button"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>Settings</button>
    </nav>`,
  init(root) {
    root.querySelectorAll('.g').forEach((g) => g.addEventListener('click', () => {
      const v = g.getAttribute('aria-expanded') !== 'true';
      g.setAttribute('aria-expanded', v); g.nextElementSibling.classList.toggle('open', v);
    }));
    const items = [...root.querySelectorAll('.it')];
    items.forEach((it) => it.addEventListener('click', () => items.forEach((x) => (x === it ? x.setAttribute('aria-current', 'page') : x.removeAttribute('aria-current')))));
  },
};
