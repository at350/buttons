// Linear issue status picker. The menu is a data-open popover; the trigger label slot is sized for the widest status.
const ICON = {
  backlog: '<circle cx="7" cy="7" r="6" fill="none" stroke="#bec2c8" stroke-width="1.5" stroke-dasharray="1.4 1.74" stroke-dashoffset=".65"/>',
  todo: '<circle cx="7" cy="7" r="6" fill="none" stroke="#e2e2e2" stroke-width="1.5"/>',
  progress: '<circle cx="7" cy="7" r="6" fill="none" stroke="#f2c94c" stroke-width="1.5"/><circle cx="7" cy="7" r="2" fill="none" stroke="#f2c94c" stroke-width="4" stroke-dasharray="6.28 100" transform="rotate(-90 7 7)"/>',
  review: '<circle cx="7" cy="7" r="6" fill="none" stroke="#0f783c" stroke-width="1.5"/><circle cx="7" cy="7" r="2" fill="none" stroke="#0f783c" stroke-width="4" stroke-dasharray="9.42 100" transform="rotate(-90 7 7)"/>',
  done: '<circle cx="7" cy="7" r="7" fill="#5e6ad2"/><path d="M4.3 7.2 6.1 9l3.6-3.8" fill="none" stroke="var(--cut)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  canceled: '<circle cx="7" cy="7" r="7" fill="#95a2b3"/><path d="m4.9 4.9 4.2 4.2m0-4.2L4.9 9.1" fill="none" stroke="var(--cut)" stroke-width="1.5" stroke-linecap="round"/>',
};
const OPTS = [['backlog', 'Backlog'], ['todo', 'Todo'], ['progress', 'In Progress'], ['review', 'In Review'], ['done', 'Done'], ['canceled', 'Canceled']];
const svg = (k) => `<svg class="ic" viewBox="0 0 14 14" aria-hidden="true">${ICON[k]}</svg>`;
export default {
  id: 'bt-linear-status',
  credit: 'Linear — issue status picker (Backlog / Todo / In Progress / In Review / Done / Canceled)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 16px 20px; border-radius: 12px; background: #08090a; }
    .wrap { position: relative; display: inline-block; font: 500 13px/1 "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-feature-settings: "cv11", "ss01"; }
    .pill {
      --cut: #1c1c1f; height: 28px; padding: 0 10px 0 8px; border-radius: 6px; border: 1px solid #23252a; background: #1c1c1f; color: #d0d6e0;
      display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font: inherit; white-space: nowrap;
      transition: background .15s, border-color .15s, color .15s; -webkit-tap-highlight-color: transparent;
    }
    .pill:hover, .pill[aria-expanded="true"] { --cut: #232326; background: #232326; border-color: #2e3035; color: #f7f8f8; }
    .pill:focus-visible { outline: none; border-color: #5e6ad2; box-shadow: 0 0 0 2px rgba(94,106,210,.4); }
    .ic { width: 14px; height: 14px; flex: none; display: block; }
    .slot { display: grid; text-align: left; }
    .slot > span { grid-area: 1 / 1; visibility: hidden; }
    .slot > span.on { visibility: visible; }
    .slot .icw { display: grid; }
    .menu {
      position: absolute; top: calc(100% + 4px); left: 0; z-index: 10; width: 220px; display: none; overflow: hidden;
      background: #1c1c1f; border: 1px solid #2e3035; border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,.4), 0 0 0 .5px rgba(0,0,0,.6);
      color: #d0d6e0; animation: pop .12s cubic-bezier(.16,1,.3,1);
    }
    @keyframes pop { from { opacity: 0; transform: translateY(-4px) scale(.98); } }
    .pill[aria-expanded="true"] + .menu { display: block; }
    .q { display: flex; align-items: center; height: 36px; padding: 0 12px; border-bottom: 1px solid #23252a; }
    .q input { flex: 1; min-width: 0; border: 0; background: none; color: #f7f8f8; font: 400 13px Inter, sans-serif; outline: none; }
    .q input::placeholder { color: #62666d; }
    .q kbd { font: 500 11px Inter, sans-serif; color: #8a8f98; background: #232326; border: 1px solid #2e3035; border-radius: 4px; padding: 2px 5px; }
    .list { padding: 4px; }
    .opt {
      --cut: #1c1c1f; display: flex; align-items: center; gap: 10px; width: 100%; height: 32px; padding: 0 8px; border: 0; border-radius: 4px;
      background: none; color: inherit; font: 400 13px Inter, sans-serif; cursor: pointer; text-align: left;
    }
    .opt:hover, .opt:focus-visible { --cut: #27282c; background: #27282c; color: #f7f8f8; outline: none; }
    .opt[hidden] { display: none; }
    .ck { margin-left: auto; width: 14px; height: 14px; visibility: hidden; fill: none; stroke: #d0d6e0; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
    .opt[aria-checked="true"] .ck { visibility: visible; }
    .k { width: 12px; color: #62666d; font-size: 12px; text-align: right; }
  `,
  html: `
    <div class="stage">
      <div class="wrap">
        <button class="pill" type="button" aria-expanded="false" aria-haspopup="listbox" aria-label="Change status">
          <span class="slot icw">${OPTS.map(([k], i) => `<span data-k="${k}"${i === 1 ? ' class="on"' : ''}>${svg(k)}</span>`).join('')}</span>
          <span class="slot txt">${OPTS.map(([k, l], i) => `<span data-k="${k}"${i === 1 ? ' class="on"' : ''}>${l}</span>`).join('')}</span>
        </button>
        <div class="menu" role="listbox">
          <div class="q"><input type="text" placeholder="Change status…" aria-label="Filter statuses"><kbd>S</kbd></div>
          <div class="list">
            ${OPTS.map(([k, l], i) => `<button class="opt" type="button" role="option" aria-checked="${i === 1}" data-k="${k}">${svg(k)}<span>${l}</span><svg class="ck" viewBox="0 0 14 14" aria-hidden="true"><path d="m3 7.2 2.6 2.6L11 4.3"/></svg><span class="k">${i + 1}</span></button>`).join('')}
          </div>
        </div>
      </div>
    </div>`,
  init(root, host) {
    const wrap = root.querySelector('.wrap');
    const pill = root.querySelector('.pill');
    const input = root.querySelector('input');
    const opts = [...root.querySelectorAll('.opt')];
    const setOpen = (open) => {
      pill.setAttribute('aria-expanded', String(open)); host?.toggleAttribute('data-open', open);
      if (open) { input.value = ''; opts.forEach((o) => (o.hidden = false)); input.focus({ preventScroll: true }); }
    };
    const pick = (o) => {
      opts.forEach((x) => x.setAttribute('aria-checked', String(x === o)));
      pill.querySelectorAll('.slot > span').forEach((s) => s.classList.toggle('on', s.dataset.k === o.dataset.k));
      setOpen(false); pill.focus({ preventScroll: true });
    };
    pill.addEventListener('click', () => setOpen(pill.getAttribute('aria-expanded') !== 'true'));
    opts.forEach((o) => o.addEventListener('click', () => pick(o)));
    input.addEventListener('input', () => { const q = input.value.toLowerCase(); opts.forEach((o) => (o.hidden = !o.textContent.toLowerCase().includes(q))); });
    root.addEventListener('keydown', (e) => {
      if (pill.getAttribute('aria-expanded') !== 'true') return;
      if (e.key === 'Escape') { setOpen(false); pill.focus({ preventScroll: true }); }
      else if (/^[1-6]$/.test(e.key) && e.target !== input) pick(opts[+e.key - 1]);
      else if (e.key === 'Enter' && e.target === input) { const o = opts.find((x) => !x.hidden); if (o) pick(o); }
    });
    const onDoc = (e) => { if (!e.composedPath().includes(wrap)) setOpen(false); };
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  },
};
