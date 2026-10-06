export default {
  id: 'mn-combobox',
  credit: 'Headless UI / Tailwind Listbox — select-style button with spinning chevron and checked option',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap { position: relative; width: 220px; max-width: 100%; font: 14px/20px -apple-system, "Inter", system-ui, sans-serif; color: #111827; }
    .btn { display: flex; align-items: center; justify-content: space-between; width: 100%; height: 40px; padding: 0 12px; border: 1px solid #d1d5db; border-radius: 8px; background: #fff; font: inherit; color: inherit; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,.05); text-align: left; }
    .btn:hover { border-color: #9ca3af; }
    .btn:focus-visible { outline: 0; border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79,70,229,.25); }
    .btn svg { color: #6b7280; transition: transform .25s cubic-bezier(.2,.8,.2,1); flex: none; }
    .btn[aria-expanded="true"] svg { transform: rotate(180deg); }
    .lst { position: absolute; top: 46px; left: 0; right: 0; padding: 4px; background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1); opacity: 0; visibility: hidden; transform: translateY(-4px); transition: opacity .12s, transform .12s, visibility 0s .12s; }
    .lst.open { opacity: 1; visibility: visible; transform: none; transition: opacity .12s, transform .12s, visibility 0s; }
    .o { display: flex; align-items: center; gap: 8px; width: 100%; padding: 8px 10px; border: 0; border-radius: 6px; background: none; font: inherit; color: inherit; cursor: pointer; text-align: left; }
    .o:hover, .o:focus-visible { background: #eef2ff; color: #4338ca; outline: 0; }
    .o svg { visibility: hidden; margin-left: auto; color: #4f46e5; flex: none; }
    .o[aria-selected="true"] { font-weight: 600; }
    .o[aria-selected="true"] svg { visibility: visible; }
    .dot { width: 8px; height: 8px; border-radius: 50%; flex: none; }
  `,
  html: `
    <div class="wrap">
      <button class="btn" type="button" aria-haspopup="listbox" aria-expanded="false"><span class="val">Select a status</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6l4 4 4-4"/></svg></button>
      <div class="lst" role="listbox">
        <button class="o" type="button" role="option" aria-selected="false"><span class="dot" style="background:#22c55e"></span>Active<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8.5l3 3 7-7"/></svg></button>
        <button class="o" type="button" role="option" aria-selected="false"><span class="dot" style="background:#f59e0b"></span>Paused<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8.5l3 3 7-7"/></svg></button>
        <button class="o" type="button" role="option" aria-selected="false"><span class="dot" style="background:#3b82f6"></span>In review<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8.5l3 3 7-7"/></svg></button>
        <button class="o" type="button" role="option" aria-selected="false"><span class="dot" style="background:#a855f7"></span>Scheduled<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8.5l3 3 7-7"/></svg></button>
        <button class="o" type="button" role="option" aria-selected="false"><span class="dot" style="background:#9ca3af"></span>Archived<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8.5l3 3 7-7"/></svg></button>
      </div>
    </div>`,
  init(root, host) {
    const btn = root.querySelector('.btn'), lst = root.querySelector('.lst'), val = root.querySelector('.val');
    const opts = [...root.querySelectorAll('.o')];
    const onDoc = (e) => { if (!host.contains(e.target)) set(false); };
    const set = (v) => { btn.setAttribute('aria-expanded', v); lst.classList.toggle('open', v); host.toggleAttribute('data-open', v); document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true); if (v) (opts.find((o) => o.getAttribute('aria-selected') === 'true') || opts[0]).focus({ preventScroll: true }); };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    btn.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); set(true); } });
    opts.forEach((o) => o.addEventListener('click', () => { opts.forEach((x) => x.setAttribute('aria-selected', x === o)); val.textContent = o.textContent; set(false); btn.focus({ preventScroll: true }); }));
    lst.addEventListener('keydown', (e) => {
      const i = opts.indexOf(root.activeElement);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); opts[(i + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length].focus({ preventScroll: true }); }
      else if (e.key === 'Escape' || e.key === 'Tab') { e.preventDefault(); set(false); btn.focus({ preventScroll: true }); }
    });
    return () => set(false);
  },
};
