const ICON = (d) => `<svg width="24" height="24" viewBox="0 -960 960 960" aria-hidden="true"><path d="${d}"/></svg>`;
const tab = (d, label, sel) => `<button class="tab" type="button" role="tab" aria-selected="${sel}" tabindex="${sel ? 0 : -1}"><span class="sl"></span><span class="ct">${ICON(d)}<span class="lb">${label}</span></span></button>`;

export default {
  id: 'mn-material-tabs',
  credit: 'Google Material 3 — primary tabs with icons (content-width active indicator, emphasized slide)',
  size: 'full',
  css: `
    :host { display: block; }
    .card { background: #fef7ff; border-radius: 12px; overflow: hidden; }
    .tabs { position: relative; display: flex; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; overscroll-behavior-x: contain; font: 500 14px/20px 'Roboto Flex', Roboto, system-ui, sans-serif; letter-spacing: .1px; -webkit-tap-highlight-color: transparent; }
    .tabs::-webkit-scrollbar { display: none; }
    .tabs::after { content: ""; position: absolute; left: 0; bottom: 0; height: 1px; width: var(--sw, 100%); background: #cac4d0; pointer-events: none; }
    .tab { position: relative; flex: 1 0 auto; min-width: 90px; height: 64px; padding: 0 16px; border: 0; background: none; color: #49454f; font: inherit; letter-spacing: inherit; cursor: pointer; outline: none; display: grid; place-items: center; white-space: nowrap; }
    .tab[aria-selected="true"] { color: #6750a4; }
    .ct { position: relative; display: flex; flex-direction: column; align-items: center; gap: 2px; padding-bottom: 2px; }
    .ct svg { fill: currentColor; }
    .sl { position: absolute; inset: 0; overflow: hidden; pointer-events: none; color: #1d1b20; }
    .tab[aria-selected="true"] .sl { color: #6750a4; }
    .sl::before { content: ""; position: absolute; inset: 0; background: currentColor; opacity: 0; transition: opacity 15ms linear; }
    .tab:hover .sl::before { opacity: .08; }
    .tab:focus-visible .sl::before { opacity: .12; }
    .tab:focus-visible::after { content: ""; position: absolute; inset: 4px; border-radius: 8px; outline: 3px solid #625b71; outline-offset: -3px; pointer-events: none; }
    .rp { position: absolute; border-radius: 50%; background: currentColor; opacity: .12; transform: scale(0); animation: rp 450ms cubic-bezier(.2,0,0,1) forwards; transition: opacity 375ms linear; pointer-events: none; }
    @keyframes rp { to { transform: scale(1); } }
    .ind { position: absolute; left: 0; bottom: 0; z-index: 1; width: 24px; height: 3px; border-radius: 3px 3px 0 0; background: #6750a4; pointer-events: none; transition: transform 250ms cubic-bezier(.2,0,0,1), width 250ms cubic-bezier(.2,0,0,1); }
  `,
  html: `
    <div class="card">
      <div class="tabs" role="tablist" aria-label="Travel">
        ${tab('M285-80v-83l124-86v-172L80-288v-102l329-231v-188q0-29 21-50t50-21q29 0 50 21t21 50v188l329 231v102L551-421v172l123 86v83l-194-59-195 59Z', 'Flights', true)}
        ${tab('M260-120q-24.75 0-42.37-17.63Q200-155.25 200-180v-480q0-24.75 17.63-42.38Q235.25-720 260-720h105v-100q0-24.75 17.63-42.38Q400.25-880 425-880h110q24.75 0 42.38 17.62Q595-844.75 595-820v100h105q24.75 0 42.38 17.62Q760-684.75 760-660v480q0 24.75-17.62 42.37Q724.75-120 700-120q0 17-11.5 28.5T660-80q-17 0-28.5-11.5T620-120H340q0 17-11.5 28.5T300-80q-17 0-28.5-11.5T260-120Zm0-60h440v-480H260v480Zm105-60h60v-360h-60v360Zm170 0h60v-360h-60v360ZM425-720h110v-100H425v100Zm55 300Z', 'Trips', false)}
        ${tab('m303-303 270-83 83-270-270 83-83 270Zm176.76-137q-16.76 0-28.26-11.74-11.5-11.73-11.5-28.5 0-16.76 11.74-28.26 11.73-11.5 28.5-11.5 16.76 0 28.26 11.74 11.5 11.73 11.5 28.5 0 16.76-11.74 28.26-11.73 11.5-28.5 11.5Zm.51 360q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.22-60Q622-140 721-239.49q99-99.48 99-241Q820-622 721-721t-240.51-99q-141.52 0-241 99Q140-622 140-480.49q0 141.52 99.49 241 99.48 99.49 241 99.49ZM480-480Z', 'Explore', false)}
        ${tab('M40-200v-585h60v394h353v-309h322q59.81 0 102.41 42.59Q920-614.81 920-555v355h-60v-131H100v131H40Zm154.5-279.5Q164-510 164-555t30.5-75.5Q225-661 270-661t75.5 30.5Q376-600 376-555t-30.5 75.5Q315-449 270-449t-75.5-30.5ZM513-391h347v-164q0-35.06-24.97-60.03T775-640H513v249ZM302.5-522.5Q316-536 316-555t-13.5-32.5Q289-601 270-601t-32.5 13.5Q224-574 224-555t13.5 32.5Q251-509 270-509t32.5-13.5ZM270-555Zm243-85v249-249Z', 'Hotels', false)}
        <span class="ind" aria-hidden="true"></span>
      </div>
    </div>`,
  init(root) {
    const bar = root.querySelector('.tabs');
    const tabs = [...root.querySelectorAll('.tab')];
    const ind = root.querySelector('.ind');
    const timers = new Set();
    let cur = tabs[0];
    const place = (anim) => {
      const ct = cur.querySelector('.ct');
      // primary tabs: indicator spans the content (icon + label), min 24dp
      const w = Math.max(24, ct.offsetWidth), x = cur.offsetLeft + ct.offsetLeft + (ct.offsetWidth - w) / 2;
      if (!anim) ind.style.transition = 'none';
      ind.style.transform = `translateX(${x}px)`; ind.style.width = w + 'px';
      bar.style.setProperty('--sw', bar.scrollWidth + 'px');
      if (!anim) { void ind.offsetWidth; ind.style.transition = ''; }
    };
    const select = (t, focus) => {
      cur = t;
      tabs.forEach((x) => { x.setAttribute('aria-selected', x === t); x.tabIndex = x === t ? 0 : -1; });
      place(true);
      if (focus) t.focus({ preventScroll: true });
      const l = t.offsetLeft, r = l + t.offsetWidth;
      if (l < bar.scrollLeft) bar.scrollTo({ left: l, behavior: 'smooth' });
      else if (r > bar.scrollLeft + bar.clientWidth) bar.scrollTo({ left: r - bar.clientWidth, behavior: 'smooth' });
    };
    tabs.forEach((t, i) => {
      const layer = t.querySelector('.sl');
      t.addEventListener('pointerdown', (e) => {
        const r = layer.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top;
        const d = 2 * Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
        const s = document.createElement('span'); s.className = 'rp';
        s.style.cssText = `width:${d}px;height:${d}px;left:${x - d / 2}px;top:${y - d / 2}px`;
        layer.append(s);
        const up = () => { ['pointerup', 'pointerleave', 'pointercancel'].forEach((k) => t.removeEventListener(k, up)); s.style.opacity = '0'; const tm = setTimeout(() => { s.remove(); timers.delete(tm); }, 400); timers.add(tm); };
        ['pointerup', 'pointerleave', 'pointercancel'].forEach((k) => t.addEventListener(k, up));
      });
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        let n = null;
        if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') n = tabs[0];
        else if (e.key === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    place(false);
    const ro = new ResizeObserver(() => place(false));
    ro.observe(bar);
    return () => { ro.disconnect(); timers.forEach(clearTimeout); };
  },
};
