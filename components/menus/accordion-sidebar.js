const I = (p) => `<svg class="ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const CHEV = I('<path d="m9 18 6-6-6-6"/>').replace('class="ic"', 'class="ch"');
const UPDOWN = I('<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>').replace('class="ic"', 'class="ud"');
const groups = [
  ['Playground', '<path d="m7 11 2-2-2-2"/><path d="M11 13h4"/><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>', ['History', 'Starred', 'Settings'], true],
  ['Models', '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>', ['Genesis', 'Explorer', 'Quantum']],
  ['Documentation', '<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0 0 22 17V5a2 2 0 0 0-1.999-2L16 3.002A5 5 0 0 0 12 5a5 5 0 0 0-4-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 1.999 2H8a5 5 0 0 1 4 2 5 5 0 0 1 4-2z"/>', ['Introduction', 'Get Started', 'Tutorials', 'Changelog']],
  ['Settings', '<path d="M14 17H5"/><path d="M19 7h-9"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>', ['General', 'Team', 'Billing', 'Limits']],
];
export default {
  id: 'mn-accordion-sidebar',
  credit: 'shadcn/ui Sidebar (sidebar-07, floating) — team switcher, collapsible "Platform" groups with Lucide icons, user footer',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { width: 256px; height: 404px; padding: 8px; background: #ecece8; border-radius: 12px; }
    .sb { height: 100%; display: flex; flex-direction: column; background: #fafafa; color: #0a0a0a; border: 1px solid #e5e5e5; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,.05); font: 14px/20px Inter, "Geist", system-ui, sans-serif; -webkit-font-smoothing: antialiased; overflow: hidden; }
    .hd, .ft { padding: 8px; flex: none; }
    .ct { flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; padding: 0 8px; scrollbar-width: none; }
    .ct::-webkit-scrollbar { display: none; }
    .lbl { height: 32px; display: flex; align-items: center; padding: 0 8px; font-size: 12px; font-weight: 500; color: rgba(10,10,10,.7); }
    button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; text-align: left; }
    .mb { display: flex; align-items: center; gap: 8px; width: 100%; height: 32px; padding: 8px; border-radius: 6px; outline: 0; white-space: nowrap; transition: background-color .15s cubic-bezier(.4,0,.2,1), color .15s; }
    .mb:hover { background: #f5f5f5; color: #171717; }
    .mb:active { background: #f5f5f5; }
    .mb:focus-visible, .sbn:focus-visible { box-shadow: 0 0 0 2px #a1a1a1; }
    .mb .t { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
    .ic { flex: none; }
    .ch { flex: none; margin-left: auto; transition: transform .2s cubic-bezier(.4,0,.2,1); }
    .mb[aria-expanded="true"] .ch { transform: rotate(90deg); }
    .lg { height: 48px; padding: 8px; }
    .lg[aria-expanded="true"], .lg:hover { background: #f5f5f5; }
    .logo { width: 32px; height: 32px; flex: none; border-radius: 8px; background: #171717; color: #fafafa; display: grid; place-items: center; }
    .av { width: 32px; height: 32px; flex: none; border-radius: 8px; background: #f5f5f5; color: #0a0a0a; display: grid; place-items: center; font-size: 12px; font-weight: 500; border: 1px solid #e5e5e5; }
    .two { flex: 1; min-width: 0; display: grid; line-height: 1.25; }
    .two b { font-weight: 600; overflow: hidden; text-overflow: ellipsis; }
    .two span { font-size: 12px; overflow: hidden; text-overflow: ellipsis; }
    .ud { flex: none; margin-left: auto; }
    ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
    .col { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .2s cubic-bezier(.4,0,.2,1); }
    .col.open { grid-template-rows: 1fr; }
    .col > div { min-height: 0; overflow: hidden; }
    .sub { margin: 0 14px; border-left: 1px solid #e5e5e5; padding: 2px 10px; transform: translateX(1px); gap: 4px; }
    .sbn { display: flex; align-items: center; width: 100%; height: 28px; padding: 0 8px; border-radius: 6px; color: #0a0a0a; outline: 0; white-space: nowrap; transition: background-color .15s; }
    .sbn:hover { background: #f5f5f5; color: #171717; }
    .sbn[aria-current="page"] { background: #f5f5f5; color: #171717; font-weight: 500; }
  `,
  html: `
    <div class="wrap">
      <nav class="sb" aria-label="Sidebar">
        <div class="hd"><button class="mb lg" type="button" aria-haspopup="menu" aria-expanded="false"><span class="logo"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2h10"/><path d="M5 6h14"/><rect width="18" height="12" x="3" y="10" rx="2"/></svg></span><span class="two"><b>Acme Inc</b><span>Enterprise</span></span>${UPDOWN}</button></div>
        <div class="ct">
          <div class="lbl">Platform</div>
          <ul>
            ${groups.map(([name, icon, subs, open], gi) => `<li>
              <button class="mb grp" type="button" aria-expanded="${open ? 'true' : 'false'}">${I(icon)}<span class="t">${name}</span>${CHEV}</button>
              <div class="col${open ? ' open' : ''}"><div><ul class="sub">${subs.map((s, si) => `<li><button class="sbn" type="button"${gi === 0 && si === 0 ? ' aria-current="page"' : ''}${open ? '' : ' tabindex="-1"'}>${s}</button></li>`).join('')}</ul></div></div>
            </li>`).join('')}
          </ul>
        </div>
        <div class="ft"><button class="mb lg" type="button" aria-haspopup="menu" aria-expanded="false"><span class="av">CN</span><span class="two"><b>shadcn</b><span>m@example.com</span></span>${UPDOWN}</button></div>
      </nav>
    </div>`,
  init(root) {
    root.querySelectorAll('.grp').forEach((g) => g.addEventListener('click', () => {
      const v = g.getAttribute('aria-expanded') !== 'true';
      g.setAttribute('aria-expanded', String(v));
      const col = g.nextElementSibling;
      col.classList.toggle('open', v);
      col.querySelectorAll('.sbn').forEach((b) => (b.tabIndex = v ? 0 : -1));
    }));
    const subs = [...root.querySelectorAll('.sbn')];
    subs.forEach((s) => s.addEventListener('click', () => subs.forEach((x) => (x === s ? x.setAttribute('aria-current', 'page') : x.removeAttribute('aria-current')))));
    root.querySelectorAll('.lg').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-expanded', String(b.getAttribute('aria-expanded') !== 'true'))));
  },
};
