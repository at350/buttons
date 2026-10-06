export default {
  id: 'mn-material-tabs',
  credit: 'Google Material 3 — primary tabs with the sliding indicator',
  size: 'full',
  css: `
    :host { display: block; }
    .tabs { position: relative; display: flex; background: #fef7ff; border-radius: 12px 12px 0 0; border-bottom: 1px solid #cac4d0; font: 500 14px/1 Roboto, system-ui, sans-serif; overflow-x: auto; scrollbar-width: none; }
    .tabs::-webkit-scrollbar { display: none; }
    .tab { position: relative; flex: 1 0 auto; min-width: 90px; height: 48px; background: none; border: 0; color: #49454f; font: inherit; cursor: pointer; letter-spacing: .01em; overflow: hidden; white-space: nowrap; }
    .tab::before { content: ""; position: absolute; inset: 0; background: #1d1b20; opacity: 0; transition: opacity .15s; }
    .tab:hover::before { opacity: .08; }
    .tab:active::before { opacity: .12; }
    .tab[aria-selected="true"] { color: #6750a4; }
    .tab[aria-selected="true"]::before { background: #6750a4; }
    .tab:focus-visible { outline: 2px solid #6750a4; outline-offset: -3px; }
    .ind { position: absolute; bottom: 0; left: 0; width: 0; height: 3px; border-radius: 3px 3px 0 0; background: #6750a4; transition: left .25s cubic-bezier(.2,0,0,1), width .25s cubic-bezier(.2,0,0,1); }
  `,
  html: `
    <div class="tabs" role="tablist">
      <button class="tab" type="button" role="tab" aria-selected="true">Flights</button>
      <button class="tab" type="button" role="tab" aria-selected="false">Trips</button>
      <button class="tab" type="button" role="tab" aria-selected="false">Explore</button>
      <button class="tab" type="button" role="tab" aria-selected="false">Hotels</button>
      <span class="ind"></span>
    </div>`,
  init(root) {
    const tabs = [...root.querySelectorAll('.tab')];
    const ind = root.querySelector('.ind');
    const place = () => { const t = tabs.find((x) => x.getAttribute('aria-selected') === 'true'); ind.style.left = t.offsetLeft + 'px'; ind.style.width = t.offsetWidth + 'px'; };
    const select = (t) => { tabs.forEach((x) => { x.setAttribute('aria-selected', x === t); x.tabIndex = x === t ? 0 : -1; }); place(); };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
        select(n); n.focus({ preventScroll: true });
      });
    });
    select(tabs[0]);
    const ro = new ResizeObserver(place);
    ro.observe(root.querySelector('.tabs'));
    return () => ro.disconnect();
  },
};
