export default {
  id: 'mn-radial-menu',
  credit: 'Radial / pie menu — centre button fans six actions out around itself (Path app, game HUDs)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { position: relative; width: 200px; height: 200px; display: grid; place-items: center; }
    .c { position: relative; z-index: 1; width: 56px; height: 56px; border-radius: 50%; border: 0; background: #ff3b30; color: #fff; cursor: pointer; display: grid; place-items: center; padding: 0; box-shadow: 0 6px 16px rgba(255,59,48,.4); transition: transform .3s cubic-bezier(.34,1.56,.64,1), background .2s; }
    .c:hover { transform: scale(1.06); }
    .c:focus-visible { outline: 2px solid #ff3b30; outline-offset: 3px; }
    .c svg { transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
    .c[aria-expanded="true"] { background: #1c1c1e; box-shadow: 0 6px 16px rgba(0,0,0,.3); }
    .c[aria-expanded="true"] svg { transform: rotate(45deg); }
    .s { position: absolute; left: 50%; top: 50%; width: 44px; height: 44px; margin: -22px; border-radius: 50%; border: 0; background: #fff; color: #1c1c1e; cursor: pointer; display: grid; place-items: center; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,.18); opacity: 0; transform: translate(0, 0) scale(.3); transition: transform .35s cubic-bezier(.34,1.56,.64,1), opacity .2s, background .15s; pointer-events: none; }
    .s:hover { background: #f2f2f7; }
    .s:focus-visible { outline: 2px solid #ff3b30; outline-offset: 2px; }
    .s.on { background: #ff3b30; color: #fff; }
    .open .s { opacity: 1; pointer-events: auto; transform: translate(calc(cos(var(--a)) * 72px), calc(sin(var(--a)) * 72px)) scale(1); }
    .open .s:nth-child(2) { transition-delay: 0s; } .open .s:nth-child(3) { transition-delay: .04s; } .open .s:nth-child(4) { transition-delay: .08s; } .open .s:nth-child(5) { transition-delay: .12s; } .open .s:nth-child(6) { transition-delay: .16s; } .open .s:nth-child(7) { transition-delay: .2s; }
    .ring { position: absolute; inset: 24px; border-radius: 50%; border: 1px dashed rgba(0,0,0,.12); opacity: 0; transform: scale(.6); transition: opacity .3s, transform .4s cubic-bezier(.2,.8,.2,1); pointer-events: none; }
    .open .ring { opacity: 1; transform: none; }
  `,
  html: `
    <div class="wrap">
      <button class="c" type="button" aria-expanded="false" aria-label="Actions"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>
      <button class="s" type="button" style="--a:-90deg" aria-label="Photo" aria-pressed="false"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3.5"/></svg></button>
      <button class="s" type="button" style="--a:-30deg" aria-label="Music" aria-pressed="false"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></button>
      <button class="s" type="button" style="--a:30deg" aria-label="Location" aria-pressed="false"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg></button>
      <button class="s" type="button" style="--a:90deg" aria-label="Note" aria-pressed="false"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg></button>
      <button class="s" type="button" style="--a:150deg" aria-label="Sleep" aria-pressed="false"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a9 9 0 109 9 7 7 0 01-9-9z"/></svg></button>
      <button class="s" type="button" style="--a:210deg" aria-label="Thought" aria-pressed="false"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a8 8 0 01-11.6 7.1L4 21l1.9-5.4A8 8 0 1121 12z"/></svg></button>
      <span class="ring"></span>
    </div>`,
  init(root, host) {
    const wrap = root.querySelector('.wrap'), c = root.querySelector('.c');
    const onDoc = (e) => { if (!host.contains(e.target)) set(false); };
    const set = (v) => { c.setAttribute('aria-expanded', v); wrap.classList.toggle('open', v); document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true); };
    c.addEventListener('click', () => set(c.getAttribute('aria-expanded') !== 'true'));
    root.querySelectorAll('.s').forEach((s) => s.addEventListener('click', () => { const v = !s.classList.contains('on'); s.classList.toggle('on', v); s.setAttribute('aria-pressed', v); }));
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); c.focus({ preventScroll: true }); } });
    return () => set(false);
  },
};
