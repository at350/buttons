export default {
  id: 'mn-fab-speed-dial',
  credit: 'Material Design FAB speed dial — the "+" rotates to "×" and mini FABs fan out above',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { position: relative; width: 72px; height: 236px; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; }
    .fab { width: 56px; height: 56px; border-radius: 16px; border: 0; background: #6750a4; color: #fff; cursor: pointer; display: grid; place-items: center; box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px rgba(0,0,0,.14), 0 1px 18px rgba(0,0,0,.12); transition: box-shadow .2s, background .2s; padding: 0; position: relative; z-index: 1; }
    .fab:hover { box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12); }
    .fab:focus-visible { outline: 2px solid #6750a4; outline-offset: 3px; }
    .fab svg { transition: transform .25s cubic-bezier(.4,0,.2,1); }
    .fab[aria-expanded="true"] svg { transform: rotate(135deg); }
    .fab[aria-expanded="true"] { background: #4f378b; }
    .mini { position: absolute; left: 16px; width: 40px; height: 40px; border-radius: 12px; border: 0; background: #e8def8; color: #1d192b; cursor: pointer; display: grid; place-items: center; padding: 0; box-shadow: 0 2px 4px rgba(0,0,0,.2); opacity: 0; transform: scale(.4) translateY(20px); transition: transform .25s cubic-bezier(.34,1.56,.64,1), opacity .2s; pointer-events: none; }
    .mini:hover { background: #d9cff0; }
    .mini:focus-visible { outline: 2px solid #6750a4; outline-offset: 2px; }
    .mini.on { background: #6750a4; color: #fff; }
    .mini:nth-of-type(1) { bottom: 72px; } .mini:nth-of-type(2) { bottom: 124px; } .mini:nth-of-type(3) { bottom: 176px; }
    .open .mini { opacity: 1; transform: none; pointer-events: auto; }
    .open .mini:nth-of-type(1) { transition-delay: 0s; } .open .mini:nth-of-type(2) { transition-delay: .05s; } .open .mini:nth-of-type(3) { transition-delay: .1s; }
  `,
  html: `
    <div class="wrap">
      <button class="mini" type="button" aria-label="Edit" aria-pressed="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg></button>
      <button class="mini" type="button" aria-label="Camera" aria-pressed="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg></button>
      <button class="mini" type="button" aria-label="Share" aria-pressed="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg></button>
      <button class="fab" type="button" aria-expanded="false" aria-label="Actions"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>
    </div>`,
  init(root, host) {
    const wrap = root.querySelector('.wrap'), fab = root.querySelector('.fab');
    const onDoc = (e) => { if (!host.contains(e.target)) set(false); };
    const set = (v) => { fab.setAttribute('aria-expanded', v); wrap.classList.toggle('open', v); document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true); };
    fab.addEventListener('click', () => set(fab.getAttribute('aria-expanded') !== 'true'));
    root.querySelectorAll('.mini').forEach((m) => m.addEventListener('click', () => { const v = !m.classList.contains('on'); m.classList.toggle('on', v); m.setAttribute('aria-pressed', v); }));
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); fab.focus({ preventScroll: true }); } });
    return () => set(false);
  },
};
