// Linear sidebar search trigger with its ⌘K hint. Clicking (or ⌘K / Ctrl+K while focused) opens Linear's command
// menu as a data-open popover; arrow keys move the highlight, Enter or click runs a command, Escape closes.
const CMDS = [
  ['Create new issue…', 'C', '<path d="M5 12h14"/><path d="M12 5v14"/>'],
  ['Assign to…', 'A', '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>'],
  ['Change status…', 'S', '<circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/>'],
  ['Set priority…', 'P', '<path d="M5 21v-6"/><path d="M12 21V9"/><path d="M19 21V3"/>'],
  ['Add label…', 'L', '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>'],
];
export default {
  id: 'bt-linear-cmdk',
  credit: 'Linear — search trigger with ⌘K that opens the command menu (dark theme, Inter)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 16px; border-radius: 12px; background: #08090a; }
    .wrap { position: relative; font: 500 13px/1 Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-feature-settings: "cv11", "ss01"; }
    .ck {
      width: 220px; height: 30px; padding: 0 6px 0 10px; border-radius: 6px; cursor: pointer;
      background: #1c1c1f; color: #8a8f98; border: 1px solid #23252a; font: inherit;
      display: flex; align-items: center; gap: 8px; transition: border-color .15s, color .15s, background-color .15s;
      -webkit-tap-highlight-color: transparent;
    }
    .ck:hover { background: #232326; color: #d0d6e0; }
    .ck:focus-visible { outline: none; border-color: #5e6ad2; box-shadow: 0 0 0 2px rgba(94,106,210,.4); }
    .ck[aria-expanded="true"] { border-color: #2e3035; background: #232326; color: #f7f8f8; }
    svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex: none; }
    .ck .t { flex: 1; text-align: left; font-weight: 400; }
    kbd { display: inline-flex; gap: 2px; }
    kbd span { min-width: 18px; height: 18px; padding: 0 4px; border-radius: 4px; background: #28282c; color: #8a8f98; font: 500 11px/18px Inter, sans-serif; text-align: center; }
    .menu {
      position: absolute; top: calc(100% + 6px); left: 0; z-index: 10; width: 300px; display: none; overflow: hidden;
      background: #1c1c1f; border: 1px solid #2e3035; border-radius: 12px; isolation: isolate;
      box-shadow: 0 16px 48px rgba(0,0,0,.5), 0 0 0 .5px rgba(0,0,0,.6); color: #d0d6e0;
      transform-origin: top left; animation: pop .14s cubic-bezier(.16,1,.3,1);
    }
    @keyframes pop { from { opacity: 0; transform: scale(.97); } }
    .ck[aria-expanded="true"] + .menu { display: block; }
    .q { display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 14px; border-bottom: 1px solid #23252a; }
    .q input { flex: 1; min-width: 0; border: 0; background: none; color: #f7f8f8; font: 400 14px Inter, sans-serif; outline: none; }
    .q input::placeholder { color: #62666d; }
    .list { padding: 6px; }
    .it { display: flex; align-items: center; gap: 10px; width: 100%; height: 34px; padding: 0 10px; border: 0; border-radius: 6px; background: none; color: inherit; font: 400 13px Inter, sans-serif; cursor: pointer; text-align: left; }
    .it svg { color: #8a8f98; }
    .it.hi { background: #28282c; color: #f7f8f8; }
    .it.hi svg { color: #d0d6e0; }
    .it[hidden] { display: none; }
    .it .t { flex: 1; }
    .it kbd span { background: transparent; border: 1px solid #2e3035; color: #8a8f98; }
  `,
  html: `
    <div class="stage">
      <div class="wrap">
        <button class="ck" type="button" aria-expanded="false" aria-haspopup="dialog" aria-keyshortcuts="Meta+K">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
          <span class="t">Search</span>
          <kbd aria-hidden="true"><span>⌘</span><span>K</span></kbd>
        </button>
        <div class="menu" role="dialog" aria-label="Command menu">
          <div class="q"><input type="text" placeholder="Type a command or search…" aria-label="Command"></div>
          <div class="list" role="listbox">
            ${CMDS.map(([l, k, p], i) => `<button class="it${i === 0 ? ' hi' : ''}" type="button" role="option"><svg viewBox="0 0 24 24" aria-hidden="true">${p}</svg><span class="t">${l}</span><kbd><span>${k}</span></kbd></button>`).join('')}
          </div>
        </div>
      </div>
    </div>`,
  init(root, host) {
    const wrap = root.querySelector('.wrap');
    const b = root.querySelector('.ck');
    const input = root.querySelector('input');
    const items = [...root.querySelectorAll('.it')];
    let hi = 0;
    const vis = () => items.filter((x) => !x.hidden);
    const paint = () => { const v = vis(); items.forEach((x) => x.classList.toggle('hi', x === v[hi])); };
    const setOpen = (open) => {
      b.setAttribute('aria-expanded', String(open)); host?.toggleAttribute('data-open', open);
      if (open) { input.value = ''; items.forEach((x) => (x.hidden = false)); hi = 0; paint(); input.focus({ preventScroll: true }); }
    };
    b.addEventListener('click', () => setOpen(b.getAttribute('aria-expanded') !== 'true'));
    input.addEventListener('input', () => { const q = input.value.toLowerCase(); items.forEach((x) => (x.hidden = !x.textContent.toLowerCase().includes(q))); hi = 0; paint(); });
    items.forEach((x) => {
      x.addEventListener('pointermove', () => { hi = vis().indexOf(x); paint(); });
      x.addEventListener('click', () => { setOpen(false); b.focus({ preventScroll: true }); });
    });
    root.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(b.getAttribute('aria-expanded') !== 'true'); return; }
      if (b.getAttribute('aria-expanded') !== 'true') return;
      const v = vis();
      if (e.key === 'Escape') { setOpen(false); b.focus({ preventScroll: true }); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); hi = Math.min(v.length - 1, hi + 1); paint(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); hi = Math.max(0, hi - 1); paint(); }
      else if (e.key === 'Enter' && e.target === input && v[hi]) { e.preventDefault(); v[hi].click(); }
    });
    const onDoc = (e) => { if (!e.composedPath().includes(wrap)) setOpen(false); };
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  },
};
