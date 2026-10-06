// The New York Times desktop header (2023 redesign): edition row, "T" masthead mark (Simple Icons, CC0),
// section bar with hover chevrons and the mega "Sections" dropdown.
const T_LOGO = 'M21.272,14.815h-0.098c-0.747,2.049-2.335,3.681-4.363,4.483v-4.483l2.444-2.182l-2.444-2.182V7.397 c2.138,0.006,3.885-1.703,3.927-3.84c0-2.629-2.509-3.556-3.927-3.556c-0.367-0.007-0.734,0.033-1.091,0.12v0.131h0.556 c0.801-0.141,1.565,0.394,1.706,1.195C17.99,1.491,17.996,1.537,18,1.583c-0.033,0.789-0.7,1.401-1.488,1.367 c-0.02-0.001-0.041-0.002-0.061-0.004c-2.444,0-5.323-1.985-8.454-1.985C5.547,0.83,3.448,2.692,3.284,5.139 C3.208,6.671,4.258,8.031,5.76,8.346v-0.12C5.301,7.931,5.041,7.407,5.084,6.862c0.074-1.015,0.957-1.779,1.973-1.705 C7.068,5.159,7.08,5.16,7.091,5.161c2.629,0,6.872,2.182,9.501,2.182h0.098v3.142l-2.444,2.182l2.444,2.182v4.549 c-0.978,0.322-2.003,0.481-3.033,0.469c-1.673,0.084-3.318-0.456-4.614-1.516l4.429-1.985V7.451l-6.196,2.727 c0.592-1.75,1.895-3.168,3.589-3.905V6.175c-4.516,1.004-8.138,4.243-8.138,8.705c0,5.193,4.025,9.12,9.818,9.12 c6.011,0,8.727-4.363,8.727-8.814V14.815z M8.858,18.186c-1.363-1.362-2.091-3.235-2.007-5.16c-0.016-0.88,0.109-1.756,0.371-2.596 l2.051-0.938v8.476L8.858,18.186z';
const SECTIONS = {
  'U.S.': ['U.S.', 'Politics', 'New York', 'California', 'Education', 'Health', 'Obituaries', 'Science', 'Climate', 'Weather', 'Sports', 'Business', 'Tech', 'The Upshot', 'The Magazine'],
  World: ['World', 'Africa', 'Americas', 'Asia', 'Australia', 'Canada', 'Europe', 'Middle East', 'Science', 'Climate', 'Weather', 'Health', 'Obituaries'],
  Business: ['Business', 'Tech', 'Economy', 'Media', 'Finance and Markets', 'DealBook', 'Personal Tech', 'Energy Transition', 'Your Money'],
  Arts: ['Today’s Arts', 'Book Review', 'Best Sellers', 'Dance', 'Movies', 'Music', 'Television', 'Theater', 'Pop Culture', 'T Magazine', 'Visual Arts'],
  Lifestyle: ['All Lifestyle', 'Well', 'Travel', 'Style', 'Real Estate', 'Food', 'Love', 'Your Money', 'Personal Tech', 'T Magazine'],
  Opinion: ['Opinion', 'Guest Essays', 'Editorials', 'Op-Docs', 'Videos', 'Letters'],
  Audio: ['The Headlines', 'The Daily', 'Hard Fork', 'The Ezra Klein Show', 'Interesting Times', 'The Opinions', 'Serial Productions'],
  Games: ['Spelling Bee', 'The Mini Crossword', 'Wordle', 'The Crossword', 'Pips', 'Strands', 'Connections', 'Sudoku', 'Letter Boxed', 'Tiles'],
  Cooking: ['Easy', 'Dinner', 'Quick', 'Healthy', 'Breakfast', 'Vegetarian', 'Vegan', 'Chicken', 'Pasta', 'Dessert'],
  Wirecutter: ['Kitchen', 'Tech', 'Sleep', 'Appliances', 'Home and Garden', 'Moving', 'Travel', 'Gifts', 'Deals', 'Baby and Kid', 'Health and Fitness'],
  'The Athletic': ['Live Scores', 'NFL', 'NBA', 'NHL', 'Premier League', 'MLB', 'College Football', 'Fantasy', 'Soccer', 'F1'],
};
const CHEV = '<svg class="cv" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
const names = Object.keys(SECTIONS);
export default {
  id: 'mn-newspaper-nav',
  credit: 'The New York Times desktop header — "T" mark, Franklin-style section bar with hover chevrons and the Sections mega dropdown',
  size: 'full',
  css: `
    :host { display: block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap { position: relative; container-type: inline-size; background: #fff; border-radius: 12px; padding: 0 20px; color: #121212; font: 500 14px/1 "nyt-franklin", "Helvetica Neue", Helvetica, Arial, sans-serif; }
    .top { display: grid; grid-template-columns: minmax(0,1fr) auto minmax(0,1fr); gap: 12px; align-items: center; height: 64px; }
    .date { font-size: 12px; font-weight: 700; line-height: 1.35; }
    .date span { display: block; font-weight: 500; }
    .logo { width: 40px; height: 40px; padding: 0; border: 0; background: none; color: #000; cursor: pointer; border-radius: 4px; }
    .logo svg { display: block; width: 40px; height: 40px; fill: currentColor; }
    .acts { justify-self: end; display: flex; gap: 8px; }
    .sub { height: 30px; padding: 0 12px; border: 1px solid #567b95; border-radius: 3px; background: #567b95; color: #fff; font: 700 11px/1 inherit; font-family: inherit; letter-spacing: .05em; text-transform: uppercase; cursor: pointer; white-space: nowrap; }
    .sub:hover { background: #46687f; border-color: #46687f; }
    .sub.ghost { background: #fff; color: #567b95; border-color: #567b95; }
    .sub.ghost:hover { background: #f7f7f7; }
    .nav { display: flex; justify-content: center; align-items: center; height: 38px; border-top: 1px solid #e2e2e2; border-bottom: 1px solid #121212; box-shadow: 0 2px 0 -1px #fff, 0 3px 0 -1px #121212; overflow-x: auto; scrollbar-width: none; }
    .nav::-webkit-scrollbar { display: none; }
    .it { flex: none; display: inline-flex; align-items: center; gap: 4px; height: 100%; padding: 0 9px; background: none; border: 0; color: #121212; font: inherit; cursor: pointer; white-space: nowrap; }
    .it .cv { opacity: 0; transition: opacity .15s, transform .2s; }
    .it:hover .cv, .it[aria-expanded="true"] .cv, .it:focus-visible .cv { opacity: 1; }
    .it[aria-expanded="true"] .cv { transform: rotate(180deg); }
    .it:hover span, .it[aria-expanded="true"] span { text-decoration: underline; text-underline-offset: 4px; }
    .it[aria-current="true"] span { font-weight: 700; }
    .it:focus-visible, .lk:focus-visible, .logo:focus-visible, .sub:focus-visible { outline: 2px solid #326891; outline-offset: -2px; }
    .div { flex: none; width: 1px; height: 16px; background: #c7c7c7; margin: 0 6px; }
    .panel { position: absolute; left: 20px; right: 20px; top: calc(100% - 3px); padding: 20px 24px 24px; background: #fff; border-bottom: 1px solid #121212; box-shadow: 0 6px 12px rgba(0,0,0,.12); display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0 24px; opacity: 0; visibility: hidden; transform: translateY(-4px); transition: opacity .15s ease, transform .15s ease, visibility 0s .15s; border-radius: 0 0 8px 8px; }
    .panel.open { opacity: 1; visibility: visible; transform: none; transition: opacity .15s ease, transform .15s ease; }
    .panel h6 { grid-column: 1 / -1; margin: 0 0 10px; font: 700 11px/1 inherit; font-family: inherit; letter-spacing: .06em; text-transform: uppercase; color: #5a5a5a; }
    .lk { display: block; text-align: left; padding: 6px 0; border: 0; background: none; font: 500 15px/1.2 inherit; font-family: inherit; color: #121212; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .lk:hover { text-decoration: underline; }
    @container (width < 900px) { .nav { justify-content: flex-start; } }
    @container (width < 560px) { .acts .ghost, .xtra { display: none; } .date { display: none; } .top { grid-template-columns: auto 1fr; } .sub { padding: 0 10px; } .panel { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  `,
  html: `
    <div class="wrap">
      <div class="top">
        <div class="date">Sunday, October 5, 2026<span>Today’s Paper</span></div>
        <button class="logo" type="button" aria-label="New York Times homepage"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${T_LOGO}"/></svg></button>
        <div class="acts"><button class="sub" type="button">Subscribe<span class="xtra"> for €1/week</span></button><button class="sub ghost" type="button">Log in</button></div>
      </div>
      <nav class="nav" aria-label="Sections">
        ${names.map((n, i) => `${i === 6 ? '<span class="div"></span>' : ''}<button class="it" type="button" aria-haspopup="true" aria-expanded="false" data-s="${n}"><span>${n}</span>${CHEV}</button>`).join('')}
      </nav>
      <div class="panel" role="menu"></div>
    </div>`,
  init(root, host) {
    const its = [...root.querySelectorAll('.it')], panel = root.querySelector('.panel'), wrap = root.querySelector('.wrap');
    let cur = null, tOpen = 0, tClose = 0, byHover = 0;
    const onDoc = (e) => { if (!host.contains(e.target)) close(); };
    const fill = (n) => { panel.innerHTML = `<h6>${n === 'Audio' ? 'Podcasts' : n === 'Games' ? 'Play' : n === 'Cooking' ? 'Recipes' : n === 'Wirecutter' ? 'Reviews' : n === 'The Athletic' ? 'Leagues' : 'Sections'}</h6>` + SECTIONS[n].map((s) => `<button class="lk" type="button" role="menuitem">${s}</button>`).join(''); };
    function open(b) {
      clearTimeout(tClose); clearTimeout(tOpen);
      if (cur === b) return;
      if (cur) cur.setAttribute('aria-expanded', 'false');
      cur = b; fill(b.dataset.s); b.setAttribute('aria-expanded', 'true');
      panel.classList.add('open'); host.setAttribute('data-open', '');
      document.addEventListener('pointerdown', onDoc, true);
    }
    function close() {
      clearTimeout(tClose); clearTimeout(tOpen);
      if (!cur) return;
      cur.setAttribute('aria-expanded', 'false'); cur = null;
      panel.classList.remove('open'); host.removeAttribute('data-open');
      document.removeEventListener('pointerdown', onDoc, true);
    }
    its.forEach((b) => {
      b.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'mouse') return; clearTimeout(tOpen); tOpen = setTimeout(() => { open(b); byHover = Date.now(); }, cur ? 0 : 180); });
      b.addEventListener('pointerleave', () => clearTimeout(tOpen));
      b.addEventListener('click', () => {
        if (cur === b && Date.now() - byHover > 600) { close(); return; }
        its.forEach((x) => x.removeAttribute('aria-current')); b.setAttribute('aria-current', 'true');
        open(b);
      });
    });
    wrap.addEventListener('pointerleave', () => { clearTimeout(tOpen); tClose = setTimeout(close, 200); });
    panel.addEventListener('pointerenter', () => clearTimeout(tClose));
    panel.addEventListener('click', (e) => { if (e.target.closest('.lk')) { const b = cur; close(); b && b.focus({ preventScroll: true }); } });
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && cur) { const b = cur; close(); b.focus({ preventScroll: true }); }
      if (cur && e.key === 'ArrowDown') { e.preventDefault(); const l = [...panel.querySelectorAll('.lk')]; const i = l.indexOf(root.activeElement); (l[i + 1] || l[0]).focus({ preventScroll: true }); }
      if (cur && e.key === 'ArrowUp') { e.preventDefault(); const l = [...panel.querySelectorAll('.lk')]; const i = l.indexOf(root.activeElement); (l[i - 1] || l[l.length - 1]).focus({ preventScroll: true }); }
    });
    return close;
  },
};
