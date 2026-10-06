// apple.com compact global nav. The menu trigger is Apple's own markup: two 1.2px polylines whose points
// are animated with SMIL (0.24s, keySplines .42,0,1,1 / 0,0,.58,1): flatten to the middle, then cross.
// Logo / search / bag glyphs are apple.com's compact (17×48) nav SVGs.
const POLY = (id, pts, open, close) => `<polyline class="bread" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="${pts}">`
  + `<animate class="a-open" attributeName="points" keyTimes="0;0.5;1" dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values="${open}"/>`
  + `<animate class="a-close" attributeName="points" keyTimes="0;0.5;1" dur="0.24s" begin="indefinite" fill="freeze" calcMode="spline" keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" values="${close}"/></polyline>`;
const LINKS = ['Store', 'Mac', 'iPad', 'iPhone', 'Watch', 'Vision', 'AirPods', 'TV & Home', 'Entertainment', 'Accessories', 'Support'];

export default {
  id: 'mn-hamburger-apple',
  credit: 'apple.com compact global nav — the two-line menu trigger that folds into an ×, with the flyout list',
  size: 'auto',
  css: `
    :host { display: inline-block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .gn { position: relative; width: 320px; max-width: 100%; height: 48px; display: flex; align-items: center; padding: 0 0 0 6px; border-radius: 12px;
      background: rgba(250,250,252,.8); -webkit-backdrop-filter: saturate(180%) blur(20px); backdrop-filter: saturate(180%) blur(20px); transition: background .24s cubic-bezier(.4,0,.6,1), border-radius .24s;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
    .gn.open { background: #fafafc; border-radius: 12px 12px 0 0; }
    .lk { width: 48px; height: 48px; display: grid; place-items: center; border: 0; padding: 0; background: none; color: #000; opacity: .8; cursor: pointer; outline-offset: -7px;
      transition: opacity .32s cubic-bezier(.4,0,.6,1), visibility 0s; }
    .lk:hover { opacity: 1; }
    .lk:focus-visible { outline: 2px solid #0071e3; }
    .sp { flex: 1; }
    .gn.open .fade { opacity: 0; visibility: hidden; transition: opacity .24s cubic-bezier(.4,0,.6,1), visibility 0s .24s; }
    .mt { width: 48px; height: 48px; display: flex; justify-content: center; align-items: center; border: 0; padding: 0; background: none; color: #000; opacity: .8; cursor: pointer; outline-offset: -7px; transition: opacity .32s cubic-bezier(.4,0,.6,1); -webkit-tap-highlight-color: transparent; }
    .mt:hover { opacity: 1; }
    .mt:focus-visible { outline: 2px solid #0071e3; }
    .fly { position: absolute; left: 0; right: 0; top: 48px; padding: 6px 0 36px; border-radius: 0 0 12px 12px; background: #fafafc; box-shadow: 0 24px 40px -12px rgba(0,0,0,.18);
      visibility: hidden; clip-path: inset(0 0 100% 0); transition: clip-path .24s cubic-bezier(.4,0,.6,1), visibility 0s .24s; }
    .gn.open .fly { visibility: visible; clip-path: inset(0 0 -60px 0); transition: clip-path .32s cubic-bezier(.4,0,.6,1); }
    .fly a { display: block; padding: 4px 48px 4px 48px; font-size: 28px; line-height: 1.1428; font-weight: 600; letter-spacing: .007em; color: #333336; text-decoration: none;
      opacity: 0; transform: translateY(-4px); transition: opacity .2s, transform .2s; outline-offset: -2px; white-space: nowrap; }
    .fly a:hover { color: #000; }
    .fly a:focus-visible { outline: 2px solid #0071e3; }
    .gn.open .fly a { opacity: 1; transform: none; transition: opacity .5s cubic-bezier(.4,0,.6,1), transform .5s cubic-bezier(.4,0,.6,1); transition-delay: calc(var(--d) * 20ms + 80ms); }
  `,
  html: `
    <nav class="gn" aria-label="Global">
      <a class="lk fade" href="#" aria-label="Apple"><svg height="48" viewBox="0 0 17 48" width="17" fill="currentColor" aria-hidden="true"><path d="m15.5752 19.0792a4.2055 4.2055 0 0 0 -2.01 3.5376 4.0931 4.0931 0 0 0 2.4908 3.7542 9.7779 9.7779 0 0 1 -1.2755 2.6351c-.7941 1.1431-1.6244 2.2862-2.8878 2.2862s-1.5883-.734-3.0443-.734c-1.42 0-1.9252.7581-3.08.7581s-1.9611-1.0589-2.8876-2.3584a11.3987 11.3987 0 0 1 -1.9373-6.1487c0-3.61 2.3464-5.523 4.6566-5.523 1.2274 0 2.25.8062 3.02.8062.734 0 1.8771-.8543 3.2729-.8543a4.3778 4.3778 0 0 1 3.6822 1.841zm-6.8586-2.0456a1.3865 1.3865 0 0 1 -.2527-.024 1.6557 1.6557 0 0 1 -.0361-.337 4.0341 4.0341 0 0 1 1.0228-2.5148 4.1571 4.1571 0 0 1 2.7314-1.4078 1.7815 1.7815 0 0 1 .0361.373 4.1487 4.1487 0 0 1 -.9867 2.587 3.6039 3.6039 0 0 1 -2.5148 1.3236z"/></svg></a>
      <span class="sp"></span>
      <a class="lk fade" href="#" aria-label="Search apple.com"><svg height="48" viewBox="0 0 17 48" width="17" fill="currentColor" aria-hidden="true"><path d="m16.2294 29.9556-4.1755-4.0821a6.4711 6.4711 0 1 0 -1.2839 1.2625l4.2005 4.1066a.9.9 0 1 0 1.2588-1.287zm-14.5294-8.0017a5.2455 5.2455 0 1 1 5.2455 5.2527 5.2549 5.2549 0 0 1 -5.2455-5.2527z"/></svg></a>
      <a class="lk fade" href="#" aria-label="Shopping Bag"><svg height="48" viewBox="0 0 17 48" width="17" fill="currentColor" aria-hidden="true"><path d="m13.4575 16.9268h-1.1353a3.8394 3.8394 0 0 0 -7.6444 0h-1.1353a2.6032 2.6032 0 0 0 -2.6 2.6v8.9232a2.6032 2.6032 0 0 0 2.6 2.6h9.915a2.6032 2.6032 0 0 0 2.6-2.6v-8.9231a2.6032 2.6032 0 0 0 -2.6-2.6001zm-4.9575-2.2768a2.658 2.658 0 0 1 2.6221 2.2764h-5.2442a2.658 2.658 0 0 1 2.6221-2.2764zm6.3574 13.8a1.4014 1.4014 0 0 1 -1.4 1.4h-9.9149a1.4014 1.4014 0 0 1 -1.4-1.4v-8.9231a1.4014 1.4014 0 0 1 1.4-1.4h9.915a1.4014 1.4014 0 0 1 1.4 1.4z"/></svg></a>
      <button class="mt" type="button" aria-expanded="false" aria-label="Menu"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">${POLY('b', '2 12, 16 12', ' 2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5', ' 3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12')}${POLY('t', '2 5, 16 5', ' 2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15', ' 3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5')}</svg></button>
      <div class="fly" role="list">${LINKS.map((l, i) => `<a href="#" role="listitem" tabindex="-1" style="--d:${i}">${l}</a>`).join('')}</div>
    </nav>`,
  init(root, host) {
    const gn = root.querySelector('.gn'), b = root.querySelector('.mt'), links = [...root.querySelectorAll('.fly a')];
    let open = false;
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(false); };
    const set = (v) => {
      if (v === open) return; open = v;
      b.setAttribute('aria-expanded', String(v)); b.setAttribute('aria-label', v ? 'Close' : 'Menu');
      root.querySelectorAll(v ? '.a-open' : '.a-close').forEach((a) => { try { a.beginElement(); } catch (err) { /* SMIL unsupported */ } });
      gn.classList.toggle('open', v); host.toggleAttribute('data-open', v);
      links.forEach((a) => { a.tabIndex = v ? 0 : -1; });
      document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true);
    };
    b.addEventListener('click', () => set(!open));
    root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); if (a.closest('.fly')) { set(false); b.focus({ preventScroll: true }); } }));
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) { set(false); b.focus({ preventScroll: true }); } });
    return () => set(false);
  },
};
