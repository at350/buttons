export default {
  id: 'mn-chip-filter-bar',
  credit: 'YouTube topic chip bar — horizontally scrolling pills with edge fades and arrow buttons',
  size: 'full',
  css: `
    :host { display: block; }
    .wrap { position: relative; background: #fff; border-radius: 12px; padding: 10px 0; font: 500 14px/1 Roboto, -apple-system, system-ui, sans-serif; color: #0f0f0f; }
    .row { position: relative; display: flex; gap: 12px; padding: 0 12px; overflow-x: auto; scroll-behavior: smooth; scrollbar-width: none; }
    .row::-webkit-scrollbar { display: none; }
    .chip { flex: none; height: 32px; padding: 0 12px; border: 0; border-radius: 8px; background: rgba(0,0,0,.05); color: inherit; font: inherit; cursor: pointer; transition: background .15s, color .15s; white-space: nowrap; }
    .chip:hover { background: rgba(0,0,0,.1); }
    .chip:focus-visible { outline: 2px solid #065fd4; outline-offset: 1px; }
    .chip[aria-pressed="true"] { background: #0f0f0f; color: #fff; }
    .fade { position: absolute; top: 0; bottom: 0; width: 72px; display: flex; align-items: center; pointer-events: none; opacity: 0; transition: opacity .2s; }
    .fade.l { left: 0; background: linear-gradient(90deg, #fff 55%, rgba(255,255,255,0)); justify-content: flex-start; padding-left: 6px; border-radius: 12px 0 0 12px; }
    .fade.r { right: 0; background: linear-gradient(270deg, #fff 55%, rgba(255,255,255,0)); justify-content: flex-end; padding-right: 6px; border-radius: 0 12px 12px 0; }
    .fade.show { opacity: 1; pointer-events: auto; }
    .arr { width: 40px; height: 40px; border-radius: 50%; border: 0; background: none; color: #0f0f0f; cursor: pointer; display: grid; place-items: center; }
    .arr:hover { background: rgba(0,0,0,.05); }
    .arr:focus-visible { outline: 2px solid #065fd4; }
  `,
  html: `
    <div class="wrap">
      <div class="row" role="group" aria-label="Filters">
        <button class="chip" type="button" aria-pressed="true">All</button>
        <button class="chip" type="button" aria-pressed="false">Music</button>
        <button class="chip" type="button" aria-pressed="false">Gaming</button>
        <button class="chip" type="button" aria-pressed="false">Live</button>
        <button class="chip" type="button" aria-pressed="false">Mixes</button>
        <button class="chip" type="button" aria-pressed="false">Podcasts</button>
        <button class="chip" type="button" aria-pressed="false">Computer programming</button>
        <button class="chip" type="button" aria-pressed="false">Design</button>
        <button class="chip" type="button" aria-pressed="false">Typography</button>
        <button class="chip" type="button" aria-pressed="false">Cooking</button>
        <button class="chip" type="button" aria-pressed="false">Synthesizers</button>
        <button class="chip" type="button" aria-pressed="false">Architecture</button>
        <button class="chip" type="button" aria-pressed="false">Film</button>
        <button class="chip" type="button" aria-pressed="false">Recently uploaded</button>
        <button class="chip" type="button" aria-pressed="false">Watched</button>
        <button class="chip" type="button" aria-pressed="false">New to you</button>
      </div>
      <div class="fade l"><button class="arr" type="button" aria-label="Scroll left"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M14.96 18.96l-1.42 1.42L5.17 12l8.37-8.38 1.42 1.42L8.01 12z"/></svg></button></div>
      <div class="fade r"><button class="arr" type="button" aria-label="Scroll right"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M9.04 5.04l1.42-1.42L18.83 12l-8.37 8.38-1.42-1.42L15.99 12z"/></svg></button></div>
    </div>`,
  init(root) {
    const row = root.querySelector('.row'), l = root.querySelector('.fade.l'), r = root.querySelector('.fade.r');
    const chips = [...root.querySelectorAll('.chip')];
    const upd = () => { l.classList.toggle('show', row.scrollLeft > 4); r.classList.toggle('show', row.scrollLeft + row.clientWidth < row.scrollWidth - 4); };
    row.addEventListener('scroll', upd, { passive: true });
    l.querySelector('.arr').addEventListener('click', () => row.scrollBy({ left: -row.clientWidth * .7 }));
    r.querySelector('.arr').addEventListener('click', () => row.scrollBy({ left: row.clientWidth * .7 }));
    chips.forEach((c) => c.addEventListener('click', () => { chips.forEach((x) => x.setAttribute('aria-pressed', x === c)); row.scrollTo({ left: c.offsetLeft - (row.clientWidth - c.offsetWidth) / 2, behavior: 'smooth' }); }));
    const ro = new ResizeObserver(upd); ro.observe(row);
    return () => ro.disconnect();
  },
};
