export default {
  id: 'lb-m3-expressive-split',
  credit: 'Material 3 Expressive (2025) — Split button: filled leading action squares off while pressed, the trailing chevron morphs to a rounded square and flips open a menu',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap { position: relative; display: inline-flex; gap: 2px; font: 500 14px/20px "Roboto Flex", Roboto, Inter, system-ui, sans-serif; letter-spacing: .1px; }
    .sb { height: 40px; border: 0; cursor: pointer; font: inherit; letter-spacing: inherit; background: #6750a4; color: #fff; display: inline-flex; align-items: center; gap: 8px; transition: border-radius .35s cubic-bezier(.2,0,0,1), background .2s, transform .15s; -webkit-tap-highlight-color: transparent; }
    .sb:hover { background: #5f4a9c; }
    .sb:focus-visible { outline: 3px solid #6750a4; outline-offset: 2px; }
    .lead { padding: 0 16px 0 20px; border-radius: 20px 8px 8px 20px; }
    .lead:active { border-radius: 12px 6px 6px 12px; transform: scale(.98); }
    .lead[aria-pressed="true"] { background: #21005d; border-radius: 12px 6px 6px 12px; }
    .trail { width: 44px; justify-content: center; border-radius: 8px 20px 20px 8px; }
    .trail svg { width: 20px; height: 20px; fill: currentColor; transition: transform .35s cubic-bezier(.2,0,0,1); }
    .trail[aria-expanded="true"] { border-radius: 12px; background: #21005d; }
    .trail[aria-expanded="true"] svg { transform: rotate(180deg); }
    .sb svg.i { width: 18px; height: 18px; fill: currentColor; }
    .menu { position: absolute; top: 46px; right: 0; min-width: 160px; padding: 8px 0; background: #f3edf7; border-radius: 8px; box-shadow: 0 2px 6px 2px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.3); display: none; transform-origin: top right; }
    .menu.open { display: block; animation: in .2s cubic-bezier(.2,0,0,1); }
    @keyframes in { from { opacity: 0; transform: scaleY(.8); } }
    .it { display: flex; align-items: center; gap: 12px; width: 100%; height: 44px; padding: 0 12px; border: 0; background: none; font: 400 14px/20px "Roboto Flex", Roboto, Inter, system-ui, sans-serif; color: #1d1b20; cursor: pointer; text-align: left; }
    .it:hover, .it:focus-visible { background: rgba(29,27,32,.08); outline: 0; }
    .it svg { width: 20px; height: 20px; fill: #49454f; }
  `,
  html: `
    <div class="wrap">
      <button class="sb lead" type="button" aria-pressed="false"><svg class="i" viewBox="0 0 24 24"><path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4zm2 16H5V5h11.2L19 7.8V19zm-7-7a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6 6h9v4H6z"/></svg><span class="l">Save</span></button>
      <button class="sb trail" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="More save options"><svg viewBox="0 0 24 24"><path d="M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z"/></svg></button>
      <div class="menu" role="menu">
        <button class="it" type="button" role="menuitem"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>Save as…</button>
        <button class="it" type="button" role="menuitem"><svg viewBox="0 0 24 24"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"/></svg>Save a copy</button>
        <button class="it" type="button" role="menuitem"><svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>Download</button>
      </div>
    </div>`,
  init(root, host) {
    const lead = root.querySelector('.lead'), l = lead.querySelector('.l'), trail = root.querySelector('.trail'), menu = root.querySelector('.menu');
    const onDoc = (e) => { if (!host.contains(e.target)) set(false); };
    const set = (v) => { trail.setAttribute('aria-expanded', v); menu.classList.toggle('open', v); host.toggleAttribute('data-open', v); document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true); };
    trail.addEventListener('click', () => set(trail.getAttribute('aria-expanded') !== 'true'));
    lead.addEventListener('click', () => { const on = lead.getAttribute('aria-pressed') !== 'true'; lead.setAttribute('aria-pressed', on); l.textContent = on ? 'Saved' : 'Save'; });
    menu.querySelectorAll('.it').forEach((it) => it.addEventListener('click', () => { set(false); trail.focus({ preventScroll: true }); }));
    menu.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); trail.focus({ preventScroll: true }); } });
    return () => set(false);
  },
};
