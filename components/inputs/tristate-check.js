// Gmail (GM3) toolbar "Select" control: a 20px Material Symbols check_box_outline_blank / check_box /
// indeterminate_check_box in on-surface-variant #444746 inside a 40px circular state layer (8% hover, 12% press),
// plus the arrow_drop_down that opens the All / None / Read / Unread / Starred / Unstarred menu.
// Checkbox click toggles all ↔ none; a partial pick (Read, Starred…) gives the indeterminate dash.
const BOX = 'M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Z';
const CHK = 'm419-321 289-290-43-43-246 247-119-119-43 43 162 162ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Z';
const MIX = 'M250-452h461v-60H250v60Zm-70 332q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Z';
export default {
  id: 'in-tristate-check',
  credit: 'Gmail "Select" checkbox — Material Symbols box / check / indeterminate in #444746, with the All / None / Read / Unread dropdown',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { position: relative; display: inline-flex; align-items: center; padding: 4px; font: 400 14px/20px "Google Sans", "Roboto Flex", Roboto, system-ui, sans-serif; }
    .cb, .dd {
      position: relative; border: 0; padding: 0; background: none; cursor: pointer; color: #444746; display: grid; place-items: center;
      -webkit-tap-highlight-color: transparent; outline: 0;
    }
    .cb { width: 40px; height: 40px; border-radius: 50%; }
    .dd { width: 20px; height: 40px; border-radius: 4px; margin-left: -6px; }
    .cb::before, .dd::before { content: ''; position: absolute; inset: 0; border-radius: inherit; background: #444746; opacity: 0; transition: opacity .15s linear; }
    .cb:hover::before, .dd:hover::before, .dd[aria-expanded="true"]::before { opacity: .08; }
    .cb:active::before, .dd:active::before { opacity: .12; }
    .cb:focus-visible, .dd:focus-visible { box-shadow: 0 0 0 2px #0b57d0; }
    .cb svg { position: absolute; width: 20px; height: 20px; fill: currentColor; transition: opacity .1s linear, transform .2s cubic-bezier(.2,0,0,1); }
    .cb[aria-checked="true"], .cb[aria-checked="mixed"] { color: #1f1f1f; }
    .cb .i-chk, .cb .i-mix { opacity: 0; transform: scale(.6); }
    .cb[aria-checked="true"] .i-box, .cb[aria-checked="mixed"] .i-box { opacity: 0; }
    .cb[aria-checked="true"] .i-chk, .cb[aria-checked="mixed"] .i-mix { opacity: 1; transform: none; }
    .dd svg { width: 20px; height: 20px; fill: currentColor; }
    .menu {
      position: absolute; top: 40px; left: 8px; z-index: 5; min-width: 112px; padding: 8px 0; margin: 0; list-style: none; border-radius: 4px; background: #fff;
      box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15); transform-origin: top;
      /* closed = display:none so the hidden panel never widens the page; enter/exit still animate */
      display: none; opacity: 0; transform: scaleY(.8);
      transition: opacity .12s linear, transform .2s cubic-bezier(.2,0,0,1), display .2s allow-discrete;
    }
    .menu.open { display: block; opacity: 1; transform: none; @starting-style { opacity: 0; transform: scaleY(.8); } }
    .mi { display: block; width: 100%; height: 32px; padding: 0 16px; border: 0; background: none; text-align: left; font: inherit; color: #1f1f1f; cursor: pointer; white-space: nowrap; }
    .mi:hover, .mi:focus-visible { background: rgba(31,31,31,.08); outline: 0; }
  `,
  html: `<div class="wrap">
    <button class="cb" type="button" role="checkbox" aria-checked="false" aria-label="Select">
      <svg class="i-box" viewBox="0 -960 960 960"><path d="${BOX}"/></svg>
      <svg class="i-chk" viewBox="0 -960 960 960"><path d="${CHK}"/></svg>
      <svg class="i-mix" viewBox="0 -960 960 960"><path d="${MIX}"/></svg>
    </button>
    <button class="dd" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="Select options"><svg viewBox="0 -960 960 960"><path d="M480-360 280-559h400L480-360Z"/></svg></button>
    <div class="menu" role="menu">
      <button class="mi" type="button" role="menuitem" data-s="true">All</button>
      <button class="mi" type="button" role="menuitem" data-s="false">None</button>
      <button class="mi" type="button" role="menuitem" data-s="mixed">Read</button>
      <button class="mi" type="button" role="menuitem" data-s="mixed">Unread</button>
      <button class="mi" type="button" role="menuitem" data-s="mixed">Starred</button>
      <button class="mi" type="button" role="menuitem" data-s="mixed">Unstarred</button>
    </div>
  </div>`,
  init(root, host) {
    const cb = root.querySelector('.cb'), dd = root.querySelector('.dd'), menu = root.querySelector('.menu'), wrap = root.querySelector('.wrap');
    const setOpen = (o) => {
      menu.classList.toggle('open', o); dd.setAttribute('aria-expanded', o);
      if (host) host.toggleAttribute('data-open', o);
    };
    cb.addEventListener('click', () => cb.setAttribute('aria-checked', cb.getAttribute('aria-checked') === 'false' ? 'true' : 'false'));
    dd.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    menu.addEventListener('click', (e) => {
      const mi = e.target.closest('.mi'); if (!mi) return;
      cb.setAttribute('aria-checked', mi.dataset.s); setOpen(false); dd.focus({ preventScroll: true });
    });
    const outside = (e) => { if (menu.classList.contains('open') && !e.composedPath().includes(wrap)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) { setOpen(false); dd.focus({ preventScroll: true }); } };
    document.addEventListener('pointerdown', outside, true);
    root.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', outside, true); if (host) host.removeAttribute('data-open'); };
  },
};
