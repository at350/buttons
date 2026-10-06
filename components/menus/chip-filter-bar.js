const CHECK = '<svg width="18" height="18" viewBox="0 -960 960 960" aria-hidden="true"><path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/></svg>';
const LABELS = ['Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Nut-free', 'Halal', 'Kosher', 'Low carb', 'Spicy', 'Organic'];
const chip = (l, on) => `<button class="chip" type="button" aria-pressed="${on}"><span class="sl"></span><span class="ck">${CHECK}</span><span class="lb">${l}</span></button>`;

export default {
  id: 'mn-chip-filter-bar',
  credit: 'Google Material 3 — filter chips (check icon slides in on selection, secondary-container fill)',
  size: 'full',
  css: `
    :host { display: block; }
    .wrap { background: #fef7ff; border-radius: 12px; padding: 16px 0; overflow: hidden; }
    .row { display: flex; gap: 8px; padding: 0 16px; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; overscroll-behavior-x: contain; -webkit-tap-highlight-color: transparent; }
    .row::-webkit-scrollbar { display: none; }
    .chip { position: relative; flex: none; display: flex; align-items: center; justify-content: flex-start; height: 32px; padding: 0; border: 1px solid #79747e; border-radius: 8px; background: transparent; color: #49454f; font: 500 14px/20px 'Roboto Flex', Roboto, system-ui, sans-serif; letter-spacing: .1px; white-space: nowrap; cursor: pointer; outline: none;
      transition: background-color 150ms cubic-bezier(.2,0,0,1), border-color 150ms cubic-bezier(.2,0,0,1), box-shadow 150ms linear; }
    .chip[aria-pressed="true"] { background: #e8def8; border-color: transparent; color: #1d192b; }
    .chip[aria-pressed="true"]:hover { box-shadow: 0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15); }
    .chip:focus-visible { outline: 3px solid #625b71; outline-offset: 2px; }
    .sl { position: absolute; inset: -1px; border-radius: inherit; overflow: hidden; pointer-events: none; }
    .sl::before { content: ""; position: absolute; inset: 0; background: currentColor; opacity: 0; transition: opacity 15ms linear; }
    .chip:hover .sl::before { opacity: .08; }
    .chip:focus-visible .sl::before { opacity: .12; }
    .rp { position: absolute; border-radius: 50%; background: currentColor; opacity: .12; transform: scale(0); animation: rp 450ms cubic-bezier(.2,0,0,1) forwards; transition: opacity 375ms linear; pointer-events: none; }
    @keyframes rp { to { transform: scale(1); } }
    .ck { position: relative; display: grid; place-items: center start; width: 0; height: 18px; margin: 0 0 0 25px; overflow: hidden; flex: none; transition: width 200ms cubic-bezier(.2,0,0,1), margin 200ms cubic-bezier(.2,0,0,1); }
    .ck svg { fill: currentColor; flex: none; transform: scale(0); transition: transform 200ms cubic-bezier(.2,0,0,1); }
    .chip[aria-pressed="true"] .ck { width: 18px; margin: 0 8px; }
    .chip[aria-pressed="true"] .ck svg { transform: none; }
    .lb { position: relative; }
  `,
  html: `
    <div class="wrap">
      <div class="row" role="group" aria-label="Dietary filters">
        ${LABELS.map((l, i) => chip(l, i === 1 || i === 4)).join('')}
      </div>
    </div>`,
  init(root) {
    const chips = [...root.querySelectorAll('.chip')];
    const timers = new Set();
    // Reserve each chip's selected width (1 + 8 + 18 icon + 8 gap + label + 16 + 1) so toggling never shifts the row.
    let alive = true;
    const fit = () => { if (alive) chips.forEach((c) => { const lw = c.querySelector('.lb').getBoundingClientRect().width; c.style.minWidth = Math.ceil(lw) + 52 + 'px'; }); };
    fit(); document.fonts?.ready.then(fit);
    chips.forEach((c) => {
      const layer = c.querySelector('.sl');
      c.addEventListener('pointerdown', (e) => {
        const r = layer.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top;
        const d = 2 * Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
        const s = document.createElement('span'); s.className = 'rp';
        s.style.cssText = `width:${d}px;height:${d}px;left:${x - d / 2}px;top:${y - d / 2}px`;
        layer.append(s);
        const up = () => { ['pointerup', 'pointerleave', 'pointercancel'].forEach((k) => c.removeEventListener(k, up)); s.style.opacity = '0'; const tm = setTimeout(() => { s.remove(); timers.delete(tm); }, 400); timers.add(tm); };
        ['pointerup', 'pointerleave', 'pointercancel'].forEach((k) => c.addEventListener(k, up));
      });
      c.addEventListener('click', () => c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true'));
    });
    return () => { alive = false; timers.forEach(clearTimeout); };
  },
};
