export default {
  id: 'mn-github-select',
  credit: 'GitHub Primer SelectPanel — filterable list with check marks (issue sort / label picker)',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap { position: relative; font: 14px/20px -apple-system, system-ui, "Segoe UI", sans-serif; color: #1f2328; }
    .trig { display: inline-flex; align-items: center; gap: 6px; height: 32px; padding: 0 12px; border: 1px solid #d0d7de; border-radius: 6px; background: #f6f8fa; color: inherit; font: inherit; font-weight: 500; cursor: pointer; box-shadow: 0 1px 0 rgba(31,35,40,.04); }
    .trig:hover { background: #f3f4f6; border-color: #afb8c1; }
    .trig:focus-visible { outline: 2px solid #0969da; outline-offset: -1px; }
    .trig svg { color: #656d76; }
    .pnl { position: absolute; top: 38px; left: 0; width: 300px; background: #fff; border: 1px solid #d0d7de; border-radius: 12px; box-shadow: 0 8px 24px rgba(140,149,159,.2); display: none; overflow: hidden; }
    .pnl.r { left: auto; right: 0; }
    .pnl.open { display: block; }
    .hd { display: flex; align-items: center; gap: 8px; padding: 8px 8px 8px 12px; border-bottom: 1px solid #d8dee4; font-size: 12px; font-weight: 600; }
    .x { margin-left: auto; width: 24px; height: 24px; border: 0; background: none; border-radius: 6px; color: #656d76; cursor: pointer; display: grid; place-items: center; }
    .x:hover { background: #f3f4f6; color: #1f2328; }
    .srch { padding: 8px; border-bottom: 1px solid #d8dee4; }
    input { width: 100%; height: 32px; padding: 0 12px; border: 1px solid #d0d7de; border-radius: 6px; font: inherit; color: inherit; background: #fff; }
    input:focus { outline: 0; border-color: #0969da; box-shadow: 0 0 0 3px rgba(9,105,218,.3); }
    .list { padding: 4px; max-height: 220px; overflow: auto; }
    .o { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; border: 0; border-radius: 6px; background: none; font: inherit; color: inherit; cursor: pointer; text-align: left; }
    .o:hover, .o:focus-visible { background: #f6f8fa; outline: 0; }
    .o svg { visibility: hidden; color: #1f2328; flex: none; }
    .o[aria-selected="true"] svg { visibility: visible; }
    .o.hide { display: none; }
    .empty { padding: 12px; color: #656d76; text-align: center; display: none; }
    .list:not(:has(.o:not(.hide))) + .empty { display: block; }
  `,
  html: `
    <div class="wrap">
      <button class="trig" type="button" aria-haspopup="listbox" aria-expanded="false"><span class="lbl">Sort</span><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4.4 6h7.2L8 10.3z"/></svg></button>
      <div class="pnl" role="dialog">
        <div class="hd">Sort by<button class="x" type="button" aria-label="Close"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/></svg></button></div>
        <div class="srch"><input type="text" placeholder="Filter" aria-label="Filter"></div>
        <div class="list" role="listbox">
          <button class="o" type="button" role="option" aria-selected="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>Newest</button>
          <button class="o" type="button" role="option" aria-selected="false"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>Oldest</button>
          <button class="o" type="button" role="option" aria-selected="false"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>Most commented</button>
          <button class="o" type="button" role="option" aria-selected="false"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>Least commented</button>
          <button class="o" type="button" role="option" aria-selected="false"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>Recently updated</button>
          <button class="o" type="button" role="option" aria-selected="false"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>Best match</button>
        </div>
        <div class="empty">No matches</div>
      </div>
    </div>`,
  init(root, host) {
    const trig = root.querySelector('.trig'), pnl = root.querySelector('.pnl'), input = root.querySelector('input'), lbl = root.querySelector('.lbl');
    const opts = [...root.querySelectorAll('.o')];
    const onDoc = (e) => { if (!host.contains(e.target)) set(false); };
    const set = (v) => { if (v) pnl.classList.toggle('r', host.getBoundingClientRect().left + 308 > document.documentElement.clientWidth); trig.setAttribute('aria-expanded', v); pnl.classList.toggle('open', v); host.toggleAttribute('data-open', v); document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true); if (v) { input.value = ''; filter(); input.focus({ preventScroll: true }); } };
    const filter = () => { const q = input.value.trim().toLowerCase(); opts.forEach((o) => o.classList.toggle('hide', !o.textContent.toLowerCase().includes(q))); };
    trig.addEventListener('click', () => set(trig.getAttribute('aria-expanded') !== 'true'));
    root.querySelector('.x').addEventListener('click', () => { set(false); trig.focus({ preventScroll: true }); });
    input.addEventListener('input', filter);
    opts.forEach((o) => o.addEventListener('click', () => { opts.forEach((x) => x.setAttribute('aria-selected', x === o)); lbl.textContent = o.textContent; set(false); trig.focus({ preventScroll: true }); }));
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { set(false); trig.focus({ preventScroll: true }); return; }
      if (!pnl.classList.contains('open') || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return;
      e.preventDefault();
      const vis = opts.filter((o) => !o.classList.contains('hide')); if (!vis.length) return;
      const i = vis.indexOf(root.activeElement);
      vis[i < 0 ? (e.key === 'ArrowDown' ? 0 : vis.length - 1) : (i + (e.key === 'ArrowDown' ? 1 : -1) + vis.length) % vis.length].focus({ preventScroll: true });
    });
    return () => set(false);
  },
};
