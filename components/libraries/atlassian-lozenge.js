export default {
  id: 'lb-atlassian-lozenge',
  credit: 'Atlassian Design System / Jira — blue Primary + Subtle buttons and the issue status Lozenge dropdown (TO DO → IN PROGRESS → DONE)',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .row { display: inline-flex; align-items: center; gap: 8px; font: 500 14px/1 -apple-system, BlinkMacSystemFont, Inter, "Segoe UI", system-ui, sans-serif; color: #172b4d; }
    .ak { height: 32px; padding: 0 12px; border-radius: 3px; border: 0; cursor: pointer; font: inherit; display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; transition: background .1s ease-out; -webkit-tap-highlight-color: transparent; }
    .ak:focus-visible { outline: 2px solid #388bff; outline-offset: 2px; }
    .pri { background: #0c66e4; color: #fff; }
    .pri:hover { background: #0055cc; }
    .pri:active, .pri[aria-pressed="true"] { background: #09326c; }
    .sub { background: transparent; color: #172b4d; }
    .sub:hover { background: rgba(9,30,66,.06); }
    .sub:active, .sub[aria-pressed="true"] { background: rgba(9,30,66,.14); }
    .wrap { position: relative; margin-left: 8px; }
    .trig { height: 32px; padding: 0 8px; border-radius: 3px; border: 0; background: rgba(9,30,66,.06); cursor: pointer; display: inline-flex; align-items: center; gap: 4px; -webkit-tap-highlight-color: transparent; }
    .trig:hover { background: rgba(9,30,66,.14); }
    .trig:focus-visible { outline: 2px solid #388bff; outline-offset: 2px; }
    .trig svg { width: 16px; height: 16px; fill: #44546f; transition: transform .15s; }
    .trig[aria-expanded="true"] svg { transform: rotate(180deg); }
    .lz { display: inline-flex; align-items: center; height: 16px; padding: 0 4px; border-radius: 3px; font: 700 11px/1 -apple-system, BlinkMacSystemFont, Inter, "Segoe UI", system-ui, sans-serif; letter-spacing: .3px; text-transform: uppercase; white-space: nowrap; }
    .lz[data-s="todo"] { background: #dcdfe4; color: #172b4d; }
    .lz[data-s="prog"] { background: #e9f2ff; color: #0055cc; }
    .lz[data-s="done"] { background: #dcfff1; color: #216e4e; }
    .menu { position: absolute; top: 36px; left: 0; min-width: 180px; padding: 4px 0; background: #fff; border-radius: 3px; box-shadow: 0 4px 8px -2px rgba(9,30,66,.25), 0 0 1px rgba(9,30,66,.31); display: none; }
    .menu.r { left: auto; right: 0; }
    .menu.open { display: block; animation: in .12s ease-out; }
    @keyframes in { from { opacity: 0; transform: translateY(-4px); } }
    .it { display: flex; align-items: center; justify-content: space-between; width: 100%; height: 36px; padding: 0 12px; border: 0; background: none; cursor: pointer; font: inherit; color: #172b4d; }
    .it:hover, .it:focus-visible { background: #f7f8f9; outline: 0; }
    .it[aria-checked="true"] { background: #e9f2ff; }
    .it svg { width: 16px; height: 16px; fill: #0c66e4; opacity: 0; }
    .it[aria-checked="true"] svg { opacity: 1; }
  `,
  html: `
    <div class="row">
      <button class="ak pri" type="button" aria-pressed="false">Create</button>
      <button class="ak sub" type="button" aria-pressed="false">Cancel</button>
      <div class="wrap">
        <button class="trig" type="button" aria-haspopup="listbox" aria-expanded="false"><span class="lz" data-s="todo">To Do</span><svg viewBox="0 0 24 24"><path d="M8.3 10.3a1 1 0 0 1 1.4 0L12 12.6l2.3-2.3a1 1 0 1 1 1.4 1.4l-3 3a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 0-1.4z"/></svg></button>
        <div class="menu" role="listbox">
          <button class="it" type="button" role="option" aria-checked="true" data-s="todo"><span class="lz" data-s="todo">To Do</span><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></button>
          <button class="it" type="button" role="option" aria-checked="false" data-s="prog"><span class="lz" data-s="prog">In Progress</span><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></button>
          <button class="it" type="button" role="option" aria-checked="false" data-s="done"><span class="lz" data-s="done">Done</span><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></button>
        </div>
      </div>
    </div>`,
  init(root, host) {
    const trig = root.querySelector('.trig'), menu = root.querySelector('.menu'), cur = trig.querySelector('.lz');
    const items = [...menu.querySelectorAll('.it')];
    const onDoc = (e) => { if (!host.contains(e.target)) set(false); };
    const set = (v) => { if (v) menu.classList.toggle('r', trig.getBoundingClientRect().left + 190 > document.documentElement.clientWidth); trig.setAttribute('aria-expanded', v); menu.classList.toggle('open', v); host.toggleAttribute('data-open', v); document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true); };
    trig.addEventListener('click', () => set(trig.getAttribute('aria-expanded') !== 'true'));
    items.forEach((it) => it.addEventListener('click', () => { items.forEach((x) => x.setAttribute('aria-checked', x === it)); cur.dataset.s = it.dataset.s; cur.textContent = it.querySelector('.lz').textContent; set(false); trig.focus({ preventScroll: true }); }));
    menu.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); trig.focus({ preventScroll: true }); } });
    root.querySelectorAll('.ak').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
    return () => set(false);
  },
};
