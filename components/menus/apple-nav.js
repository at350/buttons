// Data from apple.com's own global-header flyout feed (en_US). Last group of each is the "elevated"
// group (large 24px links, shown first, header hidden), exactly like the live site.
const FLY = [
  ['store', 'Store', [
    ['Quick Links', ['Find a Store', 'Order Status', 'Apple Upgrade', 'Apple Trade In', 'Financing', 'Personal Setup']],
    ['Shop Special Stores', ['Certified Refurbished', 'Education', 'Business', 'Veterans and Military', 'Government']],
    ['Shop', ['Shop the Latest', 'Mac', 'iPad', 'iPhone', 'Apple Watch', 'Apple Vision Pro', 'AirPods', 'Accessories']]]],
  ['mac', 'Mac', [
    ['Shop Mac', ['Shop Mac', 'Help Me Choose', 'Mac Accessories', 'Apple Upgrade', 'Apple Trade In', 'Financing', 'Personal Setup']],
    ['More from Mac', ['Mac Support', 'AppleCare', 'macOS 27', 'Apple Intelligence and Siri', 'Apps by Apple', 'Better with iPhone', 'iCloud+', 'Mac for Business', 'Education']],
    ['Explore Mac', ['Explore All Mac', 'MacBook Air', 'MacBook Pro', 'iMac', 'Mac mini', 'Mac Studio', 'Displays', '~Compare Mac', '~Switch from PC to Mac']]]],
  ['ipad', 'iPad', [
    ['Shop iPad', ['Shop iPad', 'iPad Accessories', 'Apple Upgrade', 'Apple Trade In', 'Financing', 'Personal Setup']],
    ['More from iPad', ['iPad Support', 'AppleCare', 'iPadOS 27', 'Apple Intelligence and Siri', 'Apps by Apple', 'iCloud+', 'Education']],
    ['Explore iPad', ['Explore All iPad', 'iPad Pro', 'iPad Air', 'iPad', 'iPad mini', 'Apple Pencil', 'Keyboards', '~Compare iPad']]]],
  ['iphone', 'iPhone', [
    ['Shop iPhone', ['Shop iPhone', 'iPhone Accessories', 'Apple Upgrade', 'Apple Trade In', 'Carrier Deals at Apple', 'Financing', 'Personal Setup']],
    ['More from iPhone', ['iPhone Support', 'AppleCare', 'iOS 27', 'Apple Intelligence and Siri', 'Apps by Apple', 'iPhone Privacy', 'Better with Mac', 'iCloud+', 'Wallet, Pay, Card']],
    ['Explore iPhone', ['Explore All iPhone', 'iPhone 18 Pro', 'iPhone Air', 'iPhone 17', 'iPhone 17e', 'iPhone 16', '~Compare iPhone', '~Switch from Android']]]],
  ['watch', 'Watch', [
    ['Shop Watch', ['Shop Apple Watch', 'Apple Watch Bands', 'Apple Watch Accessories', 'Apple Upgrade', 'Apple Trade In', 'Financing', 'Personal Setup']],
    ['More from Watch', ['Apple Watch Support', 'AppleCare', 'watchOS 27', 'Apple Watch For Your Kids', 'Apps by Apple', 'Apple Fitness+', 'Education']],
    ['Explore Watch', ['Explore All Apple Watch', 'Apple Watch Series 12', 'Apple Watch Ultra 4', 'Apple Watch SE 3', 'Apple Watch Nike', 'Apple Watch Hermès', '~Compare Watch', '~Why Apple Watch']]]],
  ['vision', 'Vision', [
    ['Shop Vision', ['Shop Apple Vision Pro', 'Apple Vision Pro Accessories', 'Book a Demo', 'Financing', 'Personal Setup']],
    ['More from Vision', ['Apple Vision Pro Support', 'AppleCare', 'visionOS 27', 'Apple Vision Pro for Enterprise']],
    ['Explore Vision', ['Explore Apple Vision Pro', '~Tech Specs']]]],
  ['airpods', 'AirPods', [
    ['Shop AirPods', ['Shop AirPods 5', 'Shop AirPods Pro 3', 'Shop AirPods Max 2', 'AirPods Accessories']],
    ['More from AirPods', ['AirPods Support', 'AppleCare', 'Hearing Health', 'Apple Music', 'Apple Fitness+']],
    ['Explore AirPods', ['Explore All AirPods', 'AirPods 5', 'AirPods Pro 3', 'AirPods Max 2', '~Compare AirPods']]]],
  ['tv', 'TV &amp; Home', [
    ['Shop TV &amp; Home', ['Shop Apple TV 4K', 'Shop HomePod', 'Shop HomePod mini', 'Shop Siri Remote', 'TV &amp; Home Accessories']],
    ['More from TV &amp; Home', ['Apple TV Support', 'HomePod Support', 'AppleCare', 'Apple TV app', 'Home app', 'Apple Music', 'AirPlay']],
    ['Explore TV &amp; Home', ['Explore TV &amp; Home', 'Apple TV 4K', 'HomePod', 'HomePod mini']]]],
  ['ent', 'Entertainment', [
    ['Support', ['Apple TV Support', 'Apple Music Support']],
    ['Explore Entertainment', ['Explore Entertainment', 'Apple One', 'Apple TV', 'Apple Music', 'Apple Arcade', 'Apple Fitness+', 'Apple News+', 'Apple Podcasts', 'Apple Books', 'App Store']]]],
  ['acc', 'Accessories', [
    ['Shop by Category', ['Headphones &amp; Speakers', 'Chargers &amp; Adapters', 'Smart Home Essentials', 'Cases &amp; Protection', 'Mice &amp; Keyboards', 'Health &amp; Fitness']],
    ['More to Explore', ['New Arrivals', 'Made by Apple', 'Accessibility']],
    ['Shop by Product', ['Shop All Accessories', 'iPhone', 'iPad', 'Mac', 'Apple Watch', 'AirPods', 'TV &amp; Home']]]],
  ['support', 'Support', [
    ['Get Help', ['Community', 'Check Coverage', 'Genius Bar', 'Repair']],
    ['Helpful Topics', ['Get AppleCare', 'Apple Account and Password', 'Billing &amp; Subscriptions', 'Accessibility']],
    ['Explore Support', ['Explore Support', 'iPhone', 'Mac', 'iPad', 'Watch', 'AirPods', 'Music', 'TV']]]],
];

const groupHTML = (title, links, g, elevated) => {
  let i = 0;
  const li = (t) => {
    const small = t.startsWith('~');
    return `<li class="${elevated && !small ? 'el' : 'it'}" style="--i:${i++}"><a class="sl" href="#">${small ? t.slice(1) : t}</a></li>`;
  };
  return `<div class="grp${elevated ? ' grp-el' : ''}" style="--g:${g}">${elevated ? '' : `<h2 class="gh">${title}</h2>`}<ul>${links.map(li).join('')}</ul></div>`;
};
const subHTML = ([key, , groups]) => {
  const ordered = [groups[groups.length - 1], ...groups.slice(0, -1)];
  return `<div class="sub" data-k="${key}"><div class="sc">${ordered.map(([t, l], g) => groupHTML(t, l, g, g === 0)).join('')}</div></div>`;
};

// Real apple.com globalnav glyphs (Apple logo, search, bag), served inline on apple.com.
const LOGO = '<svg width="14" height="44" viewBox="0 0 14 44" aria-hidden="true"><path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"/></svg>';
const SEARCH = '<svg width="15" height="44" viewBox="0 0 15 44" aria-hidden="true"><path d="M14.298,27.202l-3.87-3.87c0.701-0.929,1.122-2.081,1.122-3.332c0-3.06-2.489-5.55-5.55-5.55c-3.06,0-5.55,2.49-5.55,5.55 c0,3.061,2.49,5.55,5.55,5.55c1.251,0,2.403-0.421,3.332-1.122l3.87,3.87c0.151,0.151,0.35,0.228,0.548,0.228 s0.396-0.076,0.548-0.228C14.601,27.995,14.601,27.505,14.298,27.202z M1.55,20c0-2.454,1.997-4.45,4.45-4.45 c2.454,0,4.45,1.997,4.45,4.45S8.454,24.45,6,24.45C3.546,24.45,1.55,22.454,1.55,20z"/></svg>';
const SEARCH_BIG = '<svg width="24" height="26" viewBox="0 0 30 32" aria-hidden="true"><path d="m23.3291 23.3066-4.35-4.35c-.0105-.0105-.0247-.0136-.0355-.0235a6.8714 6.8714 0 1 0 -1.5736 1.4969c.0214.0256.03.0575.0542.0815l4.35 4.35a1.1 1.1 0 1 0 1.5557-1.5547zm-15.4507-8.582a5.6031 5.6031 0 1 1 5.603 5.61 5.613 5.613 0 0 1 -5.603-5.61z"/></svg>';
const BAG = '<svg width="14" height="44" viewBox="0 0 14 44" aria-hidden="true"><path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"/></svg>';

const SEARCH_SUB = `<div class="sub" data-k="search"><div class="sc sc-search">
  <label class="sfield">${SEARCH_BIG}<input type="text" placeholder="Search apple.com" aria-label="Search apple.com" autocomplete="off"></label>
  <div class="grp grp-q" style="--g:1"><h2 class="gh">Quick Links</h2><ul>${['Find a Store', 'Apple Vision Pro', 'AirPods', 'Apple Intelligence', 'Apple Trade In'].map((t, i) => `<li class="it" style="--i:${i}"><a class="sl" href="#">${t}</a></li>`).join('')}</ul></div>
</div></div>`;
const BAG_SUB = `<div class="sub" data-k="bag"><div class="sc sc-bag">
  <div class="grp grp-bag" style="--g:0"><ul><li class="it" style="--i:0"><span class="bh">Your Bag is empty.</span></li><li class="it" style="--i:1"><span class="bp"><a class="lk" href="#">Sign in</a> to see if you have any saved items</span></li></ul></div>
  <div class="grp" style="--g:1"><h2 class="gh">My Profile</h2><ul>${['Orders', 'Your Saves', 'Account', 'Sign in'].map((t, i) => `<li class="it" style="--i:${i}"><a class="sl" href="#">${t}</a></li>`).join('')}</ul></div>
</div></div>`;
const MENU_SUB = `<div class="sub" data-k="menu"><div class="sc sc-menu"><ul>${FLY.map(([k, label], i) => `<li class="mi" style="--i:${i}"><a class="ml" href="#">${label}</a></li>`).join('')}</ul></div></div>`;

export default {
  id: 'mn-apple-nav',
  credit: 'Apple.com global nav — light translucent bar, hover flyouts with apple.com\'s own content, glyphs and easing',
  size: 'full',
  css: `
    :host { display: block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .wrap {
      --ease: cubic-bezier(.4,0,.6,1);
      position: relative; container-type: inline-size;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .bar {
      position: relative; z-index: 2; height: 44px; border-radius: 12px;
      background: rgba(250,250,252,.8); -webkit-backdrop-filter: saturate(180%) blur(20px); backdrop-filter: saturate(180%) blur(20px);
      transition: background-color .24s var(--ease) 80ms, border-radius 0s .32s;
    }
    .wrap.open .bar { background: #fafafc; border-radius: 12px 12px 0 0; transition: background-color .24s var(--ease), border-radius 0s; }
    .in { max-width: 1024px; height: 44px; margin: 0 auto; padding: 0 22px; display: flex; align-items: center; justify-content: space-between; }
    .l {
      display: flex; align-items: center; justify-content: center; height: 44px; padding: 0 8px;
      background: none; border: 0; margin: 0; cursor: pointer; text-decoration: none; white-space: nowrap;
      font-family: inherit; font-size: 12px; line-height: 1; font-weight: 400; letter-spacing: -.01em; color: rgba(0,0,0,.8);
      transition: color .32s var(--ease);
    }
    .l:hover, .l[aria-expanded="true"] { color: #000; }
    .l:focus { outline: none; }
    .l:focus-visible { color: #000; outline: 2px solid #0071e3; outline-offset: -7px; border-radius: 9px; }
    .l svg { display: block; fill: currentColor; }
    .logo { padding: 0 8px 0 0; }
    .mt { display: none; width: 48px; }
    .mt svg { overflow: visible; }
    .mt polyline { transform-box: view-box; transform-origin: 9px 9px; }
    .wrap.menu .mt .bt { animation: bt-open .24s both; }
    .wrap.menu .mt .bb { animation: bb-open .24s both; }
    .wrap.menu-was .mt .bt { animation: bt-close .24s both; }
    .wrap.menu-was .mt .bb { animation: bb-close .24s both; }
    @keyframes bt-open { 0% { transform: none; animation-timing-function: cubic-bezier(.42,0,1,1); } 50% { transform: translateY(4px); animation-timing-function: cubic-bezier(0,0,.58,1); } 100% { transform: translateY(4px) rotate(45deg); } }
    @keyframes bb-open { 0% { transform: none; animation-timing-function: cubic-bezier(.42,0,1,1); } 50% { transform: translateY(-3px); animation-timing-function: cubic-bezier(0,0,.58,1); } 100% { transform: translateY(-3px) rotate(-45deg); } }
    @keyframes bt-close { 0% { transform: translateY(4px) rotate(45deg); animation-timing-function: cubic-bezier(.42,0,1,1); } 50% { transform: translateY(4px); animation-timing-function: cubic-bezier(0,0,.58,1); } 100% { transform: none; } }
    @keyframes bb-close { 0% { transform: translateY(-3px) rotate(-45deg); animation-timing-function: cubic-bezier(.42,0,1,1); } 50% { transform: translateY(-3px); animation-timing-function: cubic-bezier(0,0,.58,1); } 100% { transform: none; } }

    /* flyout */
    .fly {
      position: absolute; z-index: 1; left: 0; right: 0; top: 44px; height: 0; overflow: hidden;
      background: #fafafc; border-radius: 0 0 12px 12px; visibility: hidden;
      box-shadow: 0 24px 40px -12px rgba(0,0,0,.14);
      transition: height .32s var(--ease) 80ms, visibility 0s linear .4s;
    }
    .wrap.open .fly { visibility: visible; transition: height .32s var(--ease), visibility 0s; }
    .sub { position: absolute; top: 0; left: 0; right: 0; visibility: hidden; pointer-events: none; }
    .sub.on { visibility: visible; pointer-events: auto; }
    .wrap.swap .sub.on { animation: fade .12s var(--ease) both; }
    @keyframes fade { from { opacity: 0; } }
    .sc { max-width: 1024px; margin: 0 auto; padding: 40px 22px 64px; display: flex; }
    .grp { max-width: 25%; padding-inline-end: 44px; flex: none; }
    .grp-el { max-width: 50%; padding-inline-end: 88px; }
    .gh { margin: 0; font-size: 12px; line-height: 1.33337; font-weight: 400; letter-spacing: -.01em; color: #6e6e73; }
    .gh, .sub li { opacity: 0; transform: translateY(-4px); transition: opacity .24s var(--ease), transform .24s var(--ease); }
    .wrap.open .sub.on .gh { opacity: 1; transform: none; transition-duration: .32s; transition-delay: calc(var(--g) * 80ms + 80ms); }
    .wrap.open .sub.on li { opacity: 1; transform: none; transition-duration: .32s; transition-delay: calc(var(--g) * 80ms + var(--i) * 20ms + 80ms); }
    .wrap.swap .sub.on .gh, .wrap.swap .sub.on li { transition: none; }
    ul { list-style: none; margin: 0; padding: 0; }
    .it { margin: 0 -11px; font-size: 12px; line-height: 1.33337; font-weight: 600; letter-spacing: -.01em; }
    .it:first-child { margin-top: 10px; }
    .el { margin: 0 -11px; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: 24px; line-height: 1.16667; font-weight: 600; letter-spacing: .009em; }
    .el:first-child { margin-top: -3px; }
    .el + .it { margin-top: 14px; }
    .sl { display: inline-block; padding: 7px 11px; margin-bottom: -6px; color: #333336; text-decoration: none; white-space: nowrap; transition: color .32s var(--ease); }
    .el .sl { padding-top: 9px; color: #1d1d1f; }
    .sl:hover, .sl:focus-visible { color: #000; }
    .sl:focus { outline: none; }
    .sl:focus-visible { outline: 2px solid #0071e3; outline-offset: -7px; border-radius: 9px; }
    /* search flyout */
    .sc-search { display: block; padding-top: 32px; }
    .sfield { display: flex; align-items: center; gap: 12px; color: #6e6e73; margin-bottom: 26px; }
    .sfield svg { fill: currentColor; flex: none; }
    .sfield input { flex: 1; min-width: 0; border: 0; background: none; outline: none; padding: 0; color: #1d1d1f; font: 600 24px/1.16667 -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif; letter-spacing: .009em; }
    .sfield input::placeholder { color: #86868b; }
    .grp-q { max-width: none; }
    /* bag flyout */
    .grp-bag { max-width: none; flex: 1; }
    .bh { display: block; padding: 0 11px; font: 600 24px/1.16667 -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif; letter-spacing: .009em; color: #1d1d1f; }
    .bp { display: block; padding: 14px 11px 0; font-weight: 400; color: #333336; }
    .grp-bag .it:first-child { margin-top: 0; }
    .lk { color: #06c; text-decoration: none; }
    .lk:hover { text-decoration: underline; }
    /* compact menu */
    .sc-menu { display: block; padding: 18px 48px 48px; }
    .mi { opacity: 0; transform: translateY(-8px); transition: opacity .24s var(--ease), transform .24s var(--ease); }
    .wrap.open .sub.on .mi { opacity: 1; transform: none; transition-delay: calc(.2s + var(--i) * 20ms); }
    .ml { display: block; padding: 4px 0 4px; color: #333336; text-decoration: none; white-space: nowrap; font: 600 28px/1.14286 -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif; letter-spacing: .007em; transition: color .32s var(--ease); }
    .ml:hover, .ml:focus-visible { color: #000; outline: none; }

    @container (width < 834px) {
      .in { padding: 0 6px 0 16px; justify-content: flex-start; }
      .cat { display: none; }
      .logo { margin-right: auto; padding: 0 8px; }
      .l.ic { width: 48px; padding: 0; }
      .mt { display: flex; }
      .sc { flex-wrap: wrap; padding: 32px 48px 48px; }
      .grp, .grp-el { max-width: 100%; flex: 1 1 100%; padding: 0 0 28px; }
      .grp-el ~ .grp { flex-basis: 50%; max-width: 50%; }
    }
    @container (width < 520px) {
      .sc { padding: 28px 32px 40px; }
      .grp-el ~ .grp { flex-basis: 100%; max-width: 100%; }
      .grp-el ~ .grp:nth-child(n+3) { display: none; }
      .sc-menu { padding: 12px 32px 36px; }
    }
  `,
  html: `
    <div class="wrap">
      <nav class="bar" aria-label="Global">
        <div class="in">
          <a class="l logo" href="#" aria-label="Apple">${LOGO}</a>
          ${FLY.map(([k, label]) => `<button class="l cat" type="button" data-k="${k}" aria-expanded="false">${label}</button>`).join('')}
          <button class="l ic" type="button" data-k="search" aria-label="Search apple.com" aria-expanded="false">${SEARCH}</button>
          <button class="l ic" type="button" data-k="bag" aria-label="Shopping Bag" aria-expanded="false">${BAG}</button>
          <button class="l mt" type="button" data-k="menu" aria-label="Menu" aria-expanded="false"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><polyline class="bb" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="2 12, 16 12"/><polyline class="bt" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" points="2 5, 16 5"/></svg></button>
        </div>
      </nav>
      <div class="fly">${FLY.map(subHTML).join('')}${SEARCH_SUB}${BAG_SUB}${MENU_SUB}</div>
    </div>`,
  init(root, host) {
    const wrap = root.querySelector('.wrap'), fly = root.querySelector('.fly');
    const triggers = [...root.querySelectorAll('[data-k]')].filter((b) => b.tagName === 'BUTTON');
    const subs = Object.fromEntries([...root.querySelectorAll('.sub')].map((s) => [s.dataset.k, s]));
    let cur = null, openT = 0, closeT = 0, swapT = 0;
    const onDoc = (e) => { if (!e.composedPath().includes(host)) close(); };
    const onKey = (e) => { if (e.key === 'Escape') { const t = cur; close(); triggers.find((b) => b.dataset.k === t)?.focus({ preventScroll: true }); } };
    const open = (k) => {
      clearTimeout(closeT);
      if (cur === k) return;
      const was = cur;
      if (was) { subs[was].classList.remove('on'); wrap.classList.add('swap'); clearTimeout(swapT); swapT = setTimeout(() => wrap.classList.remove('swap'), 140); }
      cur = k;
      const s = subs[k]; s.classList.add('on');
      fly.style.height = s.offsetHeight + 'px';
      triggers.forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.k === k)));
      wrap.classList.toggle('menu', k === 'menu');
      wrap.classList.toggle('menu-was', false);
      if (!was) {
        void fly.offsetHeight;
        wrap.classList.add('open');
        host.toggleAttribute('data-open', true);
        document.addEventListener('pointerdown', onDoc, true);
        document.addEventListener('keydown', onKey);
      }
      if (k === 'search') setTimeout(() => cur === 'search' && s.querySelector('input').focus({ preventScroll: true }), 120);
    };
    const close = () => {
      clearTimeout(openT); clearTimeout(closeT);
      if (!cur) return;
      const s = subs[cur];
      if (cur === 'menu') wrap.classList.add('menu-was');
      wrap.classList.remove('open', 'swap', 'menu');
      fly.style.height = '0px';
      triggers.forEach((b) => b.setAttribute('aria-expanded', 'false'));
      const k = cur; cur = null;
      setTimeout(() => { if (cur !== k) s.classList.remove('on'); }, 400);
      host.toggleAttribute('data-open', false);
      document.removeEventListener('pointerdown', onDoc, true);
      document.removeEventListener('keydown', onKey);
    };
    const hoverable = (b) => b.classList.contains('cat');
    triggers.forEach((b) => {
      b.addEventListener('click', () => (cur === b.dataset.k ? close() : open(b.dataset.k)));
      if (hoverable(b)) {
        b.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'mouse') return; clearTimeout(openT); clearTimeout(closeT); openT = setTimeout(() => open(b.dataset.k), cur ? 0 : 60); });
      }
    });
    // Leaving the nav + flyout closes a hovered flyout (Apple's 120ms close delay); clicks on search/bag/menu stay open.
    const leave = () => { clearTimeout(openT); if (cur && cur !== 'search' && cur !== 'bag' && cur !== 'menu') closeT = setTimeout(close, 120); };
    wrap.addEventListener('pointerleave', leave);
    wrap.addEventListener('pointerenter', () => clearTimeout(closeT));
    root.querySelector('.logo').addEventListener('pointerenter', () => { clearTimeout(openT); if (cur && cur !== 'search' && cur !== 'bag' && cur !== 'menu') closeT = setTimeout(close, 120); });
    root.querySelectorAll('a[href="#"]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
    return () => { clearTimeout(openT); clearTimeout(closeT); clearTimeout(swapT); close(); };
  },
};
