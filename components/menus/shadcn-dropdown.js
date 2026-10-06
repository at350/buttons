export default {
  id: 'mn-shadcn-dropdown',
  credit: 'shadcn/ui (Radix) DropdownMenu — outline trigger, zinc menu, full arrow-key / typeahead navigation',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap { position: relative; font: 14px/20px -apple-system, "Inter", system-ui, sans-serif; color: #09090b; }
    .trig { height: 40px; padding: 0 16px; border: 1px solid #e4e4e7; border-radius: 6px; background: #fff; color: inherit; font: inherit; font-weight: 500; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,.05); transition: background .15s; }
    .trig:hover { background: #f4f4f5; }
    .trig:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #18181b; }
    .menu { position: absolute; top: 46px; left: 0; width: 224px; padding: 4px; background: #fff; border: 1px solid #e4e4e7; border-radius: 6px; box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1); display: none; transform-origin: top left; }
    .menu.r { left: auto; right: 0; transform-origin: top right; }
    .menu.open { display: block; animation: in .15s cubic-bezier(.16,1,.3,1); }
    @keyframes in { from { opacity: 0; transform: scale(.95) translateY(-4px); } }
    .lb { padding: 6px 8px; font-weight: 600; }
    .it { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; border: 0; border-radius: 4px; background: none; font: inherit; color: inherit; cursor: default; text-align: left; }
    .it:hover, .it:focus-visible, .it[data-hl] { background: #f4f4f5; outline: 0; }
    .it svg { color: #71717a; flex: none; }
    .it .sc { margin-left: auto; font-size: 12px; letter-spacing: .1em; color: #71717a; }
    .it .sub { margin-left: auto; }
    .it:disabled { opacity: .5; }
    hr { border: 0; border-top: 1px solid #f4f4f5; margin: 4px -4px; }
  `,
  html: `
    <div class="wrap">
      <button class="trig" type="button" aria-haspopup="menu" aria-expanded="false">Open</button>
      <div class="menu" role="menu">
        <div class="lb">My Account</div>
        <hr>
        <button class="it" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></svg>Profile<span class="sc">⇧⌘P</span></button>
        <button class="it" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>Billing<span class="sc">⌘B</span></button>
        <button class="it" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>Settings<span class="sc">⌘S</span></button>
        <hr>
        <button class="it" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="4"/><path d="M1 21a8 8 0 0116 0M17 11a4 4 0 010-8M23 21a8 8 0 00-6-7.7"/></svg>Team</button>
        <button class="it" type="button" role="menuitem" aria-haspopup="menu"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="4"/><path d="M1 21a8 8 0 0116 0M19 8v6M22 11h-6"/></svg>Invite users<svg class="sub" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
        <hr>
        <button class="it" type="button" role="menuitem" disabled><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>API</button>
        <hr>
        <button class="it" type="button" role="menuitem"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>Log out<span class="sc">⇧⌘Q</span></button>
      </div>
    </div>`,
  init(root, host) {
    const trig = root.querySelector('.trig'), menu = root.querySelector('.menu');
    const items = [...menu.querySelectorAll('.it:not(:disabled)')];
    const onDoc = (e) => { if (!host.contains(e.target)) set(false); };
    const set = (v, focusFirst) => { if (v) menu.classList.toggle('r', host.getBoundingClientRect().left + 232 > document.documentElement.clientWidth); trig.setAttribute('aria-expanded', v); menu.classList.toggle('open', v); host.toggleAttribute('data-open', v); document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true); if (v && focusFirst) items[0].focus({ preventScroll: true }); };
    trig.addEventListener('click', () => set(trig.getAttribute('aria-expanded') !== 'true'));
    trig.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set(true, true); } });
    items.forEach((it) => it.addEventListener('click', () => { if (!it.hasAttribute('aria-haspopup')) { set(false); trig.focus({ preventScroll: true }); } }));
    menu.addEventListener('keydown', (e) => {
      const i = items.indexOf(root.activeElement);
      const go = (n) => { e.preventDefault(); items[(n + items.length) % items.length].focus({ preventScroll: true }); };
      if (e.key === 'ArrowDown') go(i + 1);
      else if (e.key === 'ArrowUp') go(i - 1);
      else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(items.length - 1);
      else if (e.key === 'Escape' || e.key === 'Tab') { e.preventDefault(); set(false); trig.focus({ preventScroll: true }); }
      else if (e.key.length === 1 && /\S/.test(e.key)) { const m = items.find((x, j) => j > i && x.textContent.trim().toLowerCase().startsWith(e.key.toLowerCase())) || items.find((x) => x.textContent.trim().toLowerCase().startsWith(e.key.toLowerCase())); if (m) m.focus({ preventScroll: true }); }
    });
    return () => set(false);
  },
};
