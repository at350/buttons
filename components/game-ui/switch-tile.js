// Nintendo Switch HOME Menu (Basic White): #EBEBEB canvas, square software tiles, the pulsing cyan selection
// frame with a gap, the title in #0AB9E6 above the selected tile, the round shortcut buttons (News in #E60012,
// Joy-Con in #E60012 / #0AB9E6) and the Ⓐ Start footer.
const GAMES = [
  ['Animal Crossing: New Horizons', 'game-acnh-cover.jpg'],
  ['Super Smash Bros. Ultimate', 'game-smash-ultimate-cover.jpg'],
  ['The Legend of Zelda: Tears of the Kingdom', 'game-zelda-totk-cover.jpg'],
  ['Splatoon 3', 'game-splatoon-3-cover.jpg'],
  ['Super Mario Odyssey', 'game-mario-odyssey-cover.jpg'],
];
const ICONS = [
  ['News', '#e60012', '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>'],
  ['Nintendo eShop', '#f6851f', '<path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/>'],
  ['Album', '#0ab9e6', '<path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>'],
  ['Controllers', '', '<rect x="5" y="4" width="6" height="16" rx="3" fill="#0ab9e6"/><rect x="13" y="4" width="6" height="16" rx="3" fill="#e60012"/>'],
  ['System Settings', '#6e6e6e', '<path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>'],
  ['Sleep Mode', '#6e6e6e', '<path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>'],
];
export default {
  id: 'gm-switch-tile',
  credit: 'Nintendo Switch HOME Menu (Basic White) — software tiles with the pulsing cyan selection frame and title above, the round shortcut icons and the Ⓐ Start footer',
  size: 'wide',
  css: `
    :host { display: block; max-width: 100%; }
    .stage { position: relative; background: #ebebeb; border-radius: 12px; padding: 10px 0 0; overflow: hidden; font-family: 'Inter', 'DM Sans', system-ui, sans-serif; color: #2d2d2d; }
    .top { display: flex; align-items: center; gap: 10px; padding: 0 16px; height: 22px; font: 500 12px 'Inter', system-ui, sans-serif; }
    .user { width: 20px; height: 20px; border-radius: 50%; object-fit: cover; display: block; background: #0ab9e6; box-shadow: 0 0 0 2px #fff; }
    .stat { margin-left: auto; display: flex; gap: 8px; align-items: center; }
    .stat svg { width: 15px; height: 15px; fill: #2d2d2d; }
    .title { position: relative; height: 18px; margin: 8px 0 4px; overflow: hidden; }
    .title span { position: absolute; left: var(--x, 16px); top: 0; max-width: calc(100% - var(--x, 16px) - 12px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      font: 600 13px/18px 'Inter', system-ui, sans-serif; color: #0ab9e6; }
    .row { display: flex; gap: 10px; padding: 6px 16px 8px; overflow: hidden; }
    .tile { position: relative; flex: none; width: 66px; height: 66px; border: none; padding: 0; cursor: pointer; border-radius: 2px; background: #d6d6d6 var(--art) center / cover; box-shadow: 0 1px 2px rgba(0,0,0,.25); }
    .tile::after { content: ""; position: absolute; inset: -6px; border: 3px solid #00c3e3; border-radius: 4px; opacity: 0; pointer-events: none; }
    .tile.sel::after { opacity: 1; animation: pulse 1.2s ease-in-out infinite alternate; }
    @keyframes pulse { from { border-color: #00b4e6; box-shadow: 0 0 0 0 rgba(0,195,227,0); } to { border-color: #7af2ff; box-shadow: 0 0 6px rgba(0,195,227,.55); } }
    .tile:focus-visible { outline: none; }
    .tile:focus-visible::after { opacity: 1; }
    .icons { display: flex; justify-content: center; gap: 12px; padding: 8px 0 10px; }
    .ic { width: 38px; height: 38px; border-radius: 50%; border: none; padding: 0; cursor: pointer; background: #fff; display: grid; place-items: center; box-shadow: 0 1px 2px rgba(0,0,0,.18); transition: transform 120ms; }
    .ic svg { width: 20px; height: 20px; }
    .ic:hover { transform: translateY(-1px); }
    .ic:focus-visible, .ic.sel { outline: 3px solid #00c3e3; outline-offset: 2px; }
    .foot { display: flex; justify-content: flex-end; align-items: center; gap: 16px; height: 36px; padding: 0 16px; border-top: 1px solid #cfcfcf; margin: 0 10px; font: 500 12px 'Inter', system-ui, sans-serif; }
    .fb { border: none; background: none; cursor: pointer; padding: 2px 4px; font: inherit; color: inherit; display: inline-flex; align-items: center; gap: 6px; border-radius: 4px; white-space: nowrap; }
    .key { width: 18px; height: 18px; border-radius: 50%; background: #2d2d2d; color: #ebebeb; display: grid; place-items: center; font: 700 10px 'Inter', system-ui, sans-serif; }
    .fb:hover { background: rgba(0,0,0,.06); }
    .fb:focus-visible { outline: 2px solid #00c3e3; }
    .fb.go .key { background: #0ab9e6; }
  `,
  html: `
    <div class="stage">
      <div class="top"><img class="user" src="assets/portraits/women-16.jpg" alt="" width="20" height="20"><span class="stat">12:34<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 0 0-6 0zm-4-4l2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" transform="rotate(90 12 12)"/></svg></span></div>
      <div class="title"><span>${GAMES[0][0]}</span></div>
      <div class="row" role="listbox" aria-label="Software">
        ${GAMES.map(([n, art], i) => `<button class="tile${i === 0 ? ' sel' : ''}" type="button" role="option" aria-selected="${i === 0}" aria-label="${n}" style="--art:url(assets/real/${art})"></button>`).join('')}
      </div>
      <div class="icons">${ICONS.map(([n, c, p]) => `<button class="ic" type="button" aria-label="${n}"><svg viewBox="0 0 24 24" fill="${c}" aria-hidden="true">${p}</svg></button>`).join('')}</div>
      <div class="foot"><button class="fb opt" type="button"><span class="key">+</span>Options</button><button class="fb start" type="button" aria-pressed="false"><span class="key">A</span>Start</button></div>
    </div>`,
  init(root) {
    const tiles = [...root.querySelectorAll('.tile')], title = root.querySelector('.title'), tspan = title.querySelector('span'), start = root.querySelector('.start');
    const pick = (t) => {
      tiles.forEach((o) => { const on = o === t; o.classList.toggle('sel', on); o.setAttribute('aria-selected', String(on)); });
      tspan.textContent = t.getAttribute('aria-label'); title.style.setProperty('--x', t.offsetLeft + 'px');
      start.classList.remove('go'); start.setAttribute('aria-pressed', 'false');
    };
    tiles.forEach((t, i) => {
      t.addEventListener('click', () => pick(t));
      t.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!d) return; e.preventDefault(); const n = tiles[(i + d + tiles.length) % tiles.length]; pick(n); n.focus(); });
    });
    const ics = [...root.querySelectorAll('.ic')];
    ics.forEach((b) => b.addEventListener('click', () => ics.forEach((o) => o.classList.toggle('sel', o === b && !o.classList.contains('sel')))));
    start.addEventListener('click', () => { const on = start.classList.toggle('go'); start.setAttribute('aria-pressed', String(on)); });
  },
};
