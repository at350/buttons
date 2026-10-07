// PlayStation 5 home screen: deep-blue backdrop, Games / Media switcher, the tile row (PS Store first,
// Game Library last), the focused game's key art fills the backdrop, the focused tile scales up with its title beside it, white "Play" bar + "…" below.
const PS = 'M8.984 2.596v17.547l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.18.76.814.76 1.505v5.875c2.441 1.193 4.362-.002 4.362-3.152 0-3.237-1.126-4.675-4.438-5.827-1.307-.448-3.728-1.186-5.39-1.502zm4.656 16.241l6.296-2.275c.715-.258.826-.625.246-.818-.586-.192-1.637-.139-2.357.123l-4.205 1.5V14.98l.24-.085s1.201-.42 2.913-.615c1.696-.18 3.785.03 5.437.661 1.848.601 2.04 1.472 1.576 2.072-.465.6-1.622 1.036-1.622 1.036l-8.544 3.107V18.86zM1.807 18.6c-1.9-.545-2.214-1.668-1.352-2.32.801-.586 2.16-1.052 2.16-1.052l5.615-2.013v2.313L4.205 17c-.705.271-.825.632-.239.826.586.195 1.637.15 2.343-.12L8.247 17v2.074c-.12.03-.256.044-.39.073-1.939.331-3.996.196-6.038-.479z';
const TILES = [
  ['PlayStation Store', 'store', `<svg viewBox="0 0 24 24"><path fill="#fff" d="${PS}"/></svg>`],
  ['Astro Bot', 'a', ''], ["Marvel's Spider-Man 2", 'b', ''], ['Gran Turismo 7', 'c', ''], ['Ghost of Tsushima', 'd', ''], ['Returnal', 'e', ''],
  ['Game Library', 'lib', '<svg viewBox="0 0 24 24"><path fill="#fff" d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>'],
];

export default {
  id: 'gm-ps5-tiles',
  credit: 'Sony PlayStation 5 — home-screen tile row: PS Store first, focused tile grows with its name beside it, white "Play" bar beneath; ← → to move',
  size: 'wide',
  css: `
    :host { display: block; max-width: 100%; }
    .stage { position: relative; border-radius: 12px; padding: 14px 0 16px 18px; overflow: hidden; color: #fff; font-family: 'Inter', 'SST', system-ui, sans-serif;
      background: radial-gradient(ellipse 80% 70% at 85% 0%, rgba(40,90,190,.55), transparent 70%), linear-gradient(180deg, #0b2150 0%, #06143a 55%, #020a20 100%); }
    .bg { position: absolute; inset: 0; pointer-events: none; }
    .bg i { position: absolute; top: 0; right: 0; bottom: 0; left: 30%; -webkit-mask-image: linear-gradient(90deg, transparent, #000 35%); mask-image: linear-gradient(90deg, transparent, #000 35%); overflow: hidden; opacity: 0; transition: opacity 400ms ease; }
    .bg i::before { content: ""; position: absolute; background: inherit; background-repeat: no-repeat; }
    .bg i::before { inset: -30px; background-size: cover; background-position: center 30%; filter: blur(14px) saturate(1.2) brightness(.9); }
    .bg i.on { opacity: 1; }
    .bg::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(2,10,32,.6) 0%, rgba(2,10,32,.35) 55%, rgba(2,10,32,.1) 100%), linear-gradient(180deg, transparent 45%, rgba(2,10,32,.75)); }
    .top, .row, .acts { position: relative; }
    .top { display: flex; align-items: center; gap: 16px; padding-right: 18px; font: 500 13px 'Inter', system-ui, sans-serif; white-space: nowrap; }
    .seg { border: none; background: none; padding: 0; cursor: pointer; color: rgba(255,255,255,.55); font: inherit; }
    .seg.on { color: #fff; font-weight: 600; }
    .seg:focus-visible { outline: 2px solid #fff; outline-offset: 3px; border-radius: 2px; }
    .clock { margin-left: auto; display: flex; gap: 12px; align-items: center; color: rgba(255,255,255,.85); font-size: 12px; }
    .clock svg { width: 15px; height: 15px; fill: rgba(255,255,255,.85); }
    .av { width: 18px; height: 18px; border-radius: 50%; object-fit: cover; display: block; background: #24324f; }
    .row { display: flex; align-items: center; gap: 10px; height: 92px; margin-top: 12px; white-space: nowrap; }
    .tile { position: relative; flex: none; width: 54px; height: 54px; border-radius: 9px; border: none; padding: 0; cursor: pointer; overflow: hidden;
      transition: width 260ms cubic-bezier(.2,.8,.2,1), height 260ms cubic-bezier(.2,.8,.2,1), box-shadow 260ms; box-shadow: 0 4px 10px rgba(0,0,0,.45); }
    .tile svg { position: absolute; left: 50%; top: 50%; width: 46%; height: 46%; transform: translate(-50%, -50%); }
    .tile.sel { width: 84px; height: 84px; border-radius: 12px; box-shadow: 0 0 0 2px #fff, 0 8px 20px rgba(0,0,0,.6); }
    .tile:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #0070cc; }
    .tile:hover:not(.sel) { filter: brightness(1.15); }
    .nm { flex: none; font: 500 14px 'Inter', system-ui, sans-serif; margin: 0 6px 0 2px; color: #fff; }
    .store { background: linear-gradient(160deg, #1a8cff, #0070cc 55%, #00439c); }
    .lib { background: #24324f; }
    .a { background: #10203c url(assets/real/game-astro-bot-cover.jpg) center / cover; }
    .b { background: #10203c url(assets/real/game-spider-man-2-cover.jpg) center / cover; }
    .c { background: #10203c url(assets/real/game-gran-turismo-7-cover.jpg) center / cover; }
    .d { background: #10203c url(assets/real/game-ghost-of-tsushima-cover.jpg) center / cover; }
    .e { background: #10203c url(assets/real/game-returnal-cover.jpg) center / cover; }
    .acts { display: flex; gap: 10px; margin-top: 6px; }
    .play { width: 132px; height: 34px; border: none; border-radius: 6px; background: #fff; color: #000; cursor: pointer; font: 600 13px 'Inter', system-ui, sans-serif; transition: transform 150ms, background 150ms; }
    .play:hover { background: #e9eef8; }
    .play:active { transform: scale(.96); }
    .play.go { animation: go 600ms ease-out; }
    @keyframes go { 0% { box-shadow: 0 0 0 0 rgba(255,255,255,.6); } 100% { box-shadow: 0 0 0 10px rgba(255,255,255,0); } }
    .more { width: 34px; height: 34px; border: none; border-radius: 50%; background: rgba(255,255,255,.16); cursor: pointer; display: grid; place-items: center; }
    .more svg { width: 18px; height: 18px; fill: #fff; }
    .more:hover { background: rgba(255,255,255,.28); }
    .play:focus-visible, .more:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="bg" aria-hidden="true"><i data-k="a" style="background-image:url(assets/real/game-astro-bot-cover.jpg)" class="on"></i><i data-k="b" style="background-image:url(assets/real/game-spider-man-2-cover.jpg)"></i><i data-k="c" style="background-image:url(assets/real/game-gran-turismo-7-cover.jpg)"></i><i data-k="d" style="background-image:url(assets/real/game-ghost-of-tsushima-cover.jpg)"></i><i data-k="e" style="background-image:url(assets/real/game-returnal-cover.jpg)"></i></div>
      <div class="top">
        <button class="seg on" type="button" aria-pressed="true">Games</button><button class="seg" type="button" aria-pressed="false">Media</button>
        <span class="clock"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg><img class="av" src="assets/portraits/men-37.jpg" alt="" width="18" height="18">10:42</span>
      </div>
      <div class="row" role="listbox" aria-label="Games">
        ${TILES.map(([n, c, ic], i) => `<button class="tile ${c}${i === 1 ? ' sel' : ''}" type="button" role="option" aria-selected="${i === 1}" aria-label="${n}">${ic}</button>${i === 1 ? `<span class="nm">${n}</span>` : ''}`).join('')}
      </div>
      <div class="acts"><button class="play" type="button">Play</button><button class="more" type="button" aria-label="More"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg></button></div>
    </div>`,
  init(root) {
    const bgs = [...root.querySelectorAll('.bg i')];
    const tiles = [...root.querySelectorAll('.tile')], nm = root.querySelector('.nm'), play = root.querySelector('.play');
    const pick = (t) => {
      tiles.forEach((o) => { const on = o === t; o.classList.toggle('sel', on); o.setAttribute('aria-selected', String(on)); });
      t.after(nm); nm.textContent = t.getAttribute('aria-label');
      bgs.forEach((b) => b.classList.toggle('on', t.classList.contains(b.dataset.k)));
      play.textContent = t.classList.contains('store') ? 'Open' : t.classList.contains('lib') ? 'Open' : 'Play';
    };
    tiles.forEach((t, i) => {
      t.addEventListener('click', () => pick(t));
      t.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!d) return; e.preventDefault(); const n = tiles[(i + d + tiles.length) % tiles.length]; pick(n); n.focus(); });
    });
    const segs = [...root.querySelectorAll('.seg')];
    segs.forEach((s) => s.addEventListener('click', () => segs.forEach((o) => { o.classList.toggle('on', o === s); o.setAttribute('aria-pressed', String(o === s)); })));
    play.addEventListener('click', () => { play.classList.remove('go'); void play.offsetWidth; play.classList.add('go'); });
  },
};
