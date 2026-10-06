const ICON = (d, cls = '') => `<svg class="${cls}" width="24" height="24" viewBox="0 -960 960 960" aria-hidden="true"><path d="${d}"/></svg>`;
const item = (d, label, i) => `<button class="it" type="button" role="menuitem" tabindex="-1" style="--i:${i}"><span class="sl"></span>${ICON(d)}<span>${label}</span></button>`;

export default {
  id: 'mn-fab-speed-dial',
  credit: 'Google Material 3 Expressive — FAB menu (FAB morphs into a close button, pill items spring out)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    :host([data-open]) { z-index: 30; }
    .wrap { position: relative; width: 56px; height: 56px; margin: 4px; font-family: 'Roboto Flex', Roboto, system-ui, sans-serif; -webkit-tap-highlight-color: transparent; }
    .fab { position: absolute; inset: 0; width: 56px; height: 56px; padding: 0; border: 0; border-radius: 16px; background: #eaddff; color: #21005d; cursor: pointer; outline: none; display: grid; place-items: center;
      box-shadow: 0 1px 3px rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15);
      transition: border-radius 350ms cubic-bezier(.42,1.67,.21,.9), background-color 150ms cubic-bezier(.31,.94,.34,1), color 150ms cubic-bezier(.31,.94,.34,1), box-shadow 150ms linear; }
    .fab:hover { box-shadow: 0 2px 3px rgba(0,0,0,.3), 0 6px 10px 4px rgba(0,0,0,.15); }
    .fab[aria-expanded="true"] { border-radius: 28px; background: #6750a4; color: #fff; }
    .fab:focus-visible { outline: 3px solid #625b71; outline-offset: 2px; }
    .sl { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; pointer-events: none; }
    .sl::before { content: ""; position: absolute; inset: 0; background: currentColor; opacity: 0; transition: opacity 15ms linear; }
    .fab:hover .sl::before, .it:hover .sl::before { opacity: .08; }
    .fab:focus-visible .sl::before, .it:focus-visible .sl::before { opacity: .1; }
    .rp { position: absolute; border-radius: 50%; background: currentColor; opacity: .1; transform: scale(0); animation: rp 450ms cubic-bezier(.2,0,0,1) forwards; transition: opacity 375ms linear; pointer-events: none; }
    @keyframes rp { to { transform: scale(1); } }
    .ic { grid-area: 1 / 1; position: relative; fill: currentColor; transition: transform 350ms cubic-bezier(.42,1.67,.21,.9), opacity 150ms cubic-bezier(.31,.94,.34,1); }
    .fab .x { opacity: 0; transform: rotate(-90deg); }
    .fab[aria-expanded="true"] .add { opacity: 0; transform: rotate(90deg); }
    .fab[aria-expanded="true"] .x { opacity: 1; transform: none; }
    .menu { position: absolute; right: 0; bottom: 64px; display: none; flex-direction: column; align-items: flex-end; gap: 4px; pointer-events: none; transition: display 260ms allow-discrete; }
    .menu.l { right: auto; left: 0; align-items: flex-start; }
    .menu.down { bottom: auto; top: 64px; flex-direction: column-reverse; }
    .menu.down .it { transform-origin: 100% 0; transform: translateY(-24px) scale(.5); }
    .menu.down.l .it { transform-origin: 0 0; }
    .it { position: relative; display: flex; align-items: center; gap: 8px; height: 56px; padding: 0 24px 0 20px; border: 0; border-radius: 28px; background: #eaddff; color: #21005d; font: 500 16px/24px 'Roboto Flex', Roboto, system-ui, sans-serif; letter-spacing: .15px; white-space: nowrap; cursor: pointer; outline: none;
      box-shadow: 0 1px 3px rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15);
      opacity: 0; transform: translateY(24px) scale(.5); transform-origin: 100% 100%; visibility: hidden;
      transition: transform 200ms cubic-bezier(.3,0,.8,.15), opacity 150ms linear, visibility 0s 200ms; transition-delay: calc((3 - var(--i)) * 20ms); }
    .menu.l .it { transform-origin: 0 100%; }
    .it svg { position: relative; fill: currentColor; flex: none; }
    .it span:last-child { position: relative; }
    .it:focus-visible { outline: 3px solid #625b71; outline-offset: 2px; }
    .menu.open { display: flex; pointer-events: auto; transition: none; }
    @starting-style { .menu.open .it { opacity: 0; transform: translateY(24px) scale(.5); } .menu.open.down .it { transform: translateY(-24px) scale(.5); } }
    .menu.open .it { opacity: 1; transform: none; visibility: visible; transition: transform 500ms cubic-bezier(.38,1.21,.22,1), opacity 150ms cubic-bezier(.31,.94,.34,1), visibility 0s; transition-delay: calc(var(--i) * 30ms); }
  `,
  html: `
    <div class="wrap">
      <div class="menu" role="menu" aria-label="Create">
        ${item('M240-399h313v-60H240v60Zm0-130h480v-60H240v60Zm0-130h480v-60H240v60ZM80-80v-740q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H240L80-80Zm134-220h606v-520H140v600l74-80Zm-74 0v-520 520Z', 'Message', 3)}
        ${item('M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140-685v465h680v-465L480-462Zm0-60 336-218H145l335 218ZM140-685v-55 520-465Z', 'Email', 2)}
        ${item('M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm56-97h489L578-473 446-302l-93-127-117 152Zm-56 97v-600 600Z', 'Photo', 1)}
        ${item('M180-180h44l472-471-44-44-472 471v44Zm-60 60v-128l575-574q8-8 19-12.5t23-4.5q11 0 22 4.5t20 12.5l44 44q9 9 13 20t4 22q0 11-4.5 22.5T823-694L248-120H120Zm659-617-41-41 41 41Zm-105 64-22-22 44 44-22-22Z', 'Note', 0)}
      </div>
      <button class="fab" type="button" aria-label="Create" aria-haspopup="menu" aria-expanded="false"><span class="sl"></span>${ICON('M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z', 'ic add')}${ICON('m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z', 'ic x')}</button>
    </div>`,
  init(root, host) {
    const fab = root.querySelector('.fab'), menu = root.querySelector('.menu');
    const items = [...menu.querySelectorAll('.it')];
    const timers = new Set();
    let open = false;
    root.querySelectorAll('.fab, .it').forEach((el) => {
      const layer = el.querySelector('.sl');
      el.addEventListener('pointerdown', (e) => {
        const r = layer.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top;
        const d = 2 * Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
        const s = document.createElement('span'); s.className = 'rp';
        s.style.cssText = `width:${d}px;height:${d}px;left:${x - d / 2}px;top:${y - d / 2}px`;
        layer.append(s);
        const up = () => { ['pointerup', 'pointerleave', 'pointercancel'].forEach((k) => el.removeEventListener(k, up)); s.style.opacity = '0'; const tm = setTimeout(() => { s.remove(); timers.delete(tm); }, 400); timers.add(tm); };
        ['pointerup', 'pointerleave', 'pointercancel'].forEach((k) => el.addEventListener(k, up));
      });
    });
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(false); };
    const set = (v, focus) => {
      if (v === open) return; open = v;
      if (v) { const hr = host.getBoundingClientRect(); menu.classList.toggle('l', hr.right - 180 < 0); menu.classList.toggle('down', hr.top + window.scrollY < 260); }
      fab.setAttribute('aria-expanded', v); fab.setAttribute('aria-label', v ? 'Close' : 'Create');
      menu.classList.toggle('open', v); host.toggleAttribute('data-open', v);
      document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true);
      if (v && focus) items[items.length - 1].focus({ preventScroll: true });
      if (!v && focus) fab.focus({ preventScroll: true });
    };
    fab.addEventListener('click', (e) => set(!open, e.detail === 0));
    items.forEach((it) => it.addEventListener('click', () => { const tm = setTimeout(() => { set(false, true); timers.delete(tm); }, 120); timers.add(tm); }));
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && open) { e.preventDefault(); set(false, true); return; }
      const i = items.indexOf(root.activeElement);
      if (i < 0 && !(root.activeElement === fab && open)) return;
      const go = (n) => { e.preventDefault(); items[(n + items.length) % items.length].focus({ preventScroll: true }); };
      if (e.key === 'ArrowUp') go(i < 0 ? items.length - 1 : i - 1);
      else if (e.key === 'ArrowDown') { if (i === items.length - 1) { e.preventDefault(); fab.focus({ preventScroll: true }); } else if (i >= 0) go(i + 1); }
    });
    return () => { set(false); timers.forEach(clearTimeout); };
  },
};
