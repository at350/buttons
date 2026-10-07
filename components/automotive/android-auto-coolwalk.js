const APPS = [['Maps', '#1a73e8', '<polygon points="3 11 22 2 13 21 11 13 3 11"/>'], ['Spotify', '#1db954', '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'], ['Phone', '#34a853', '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>'], ['Messages', '#4285f4', '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>'], ['Calendar', '#fbbc04', '<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>'], ['Podcasts', '#7b61ff', '<path d="M12 17v4"/><path d="M18 11a6 6 0 00-3-5.197"/><path d="M2 11a10 10 0 015-8.662"/><path d="M22 11a10 10 0 00-5-8.662"/><path d="M6 11a6 6 0 013-5.197"/><path d="M9 21h6"/><rect x="10" y="9" width="4" height="8" rx="2"/>'], ['Radio', '#ea4335', '<path d="M16.247 7.761a6 6 0 0 1 0 8.478"/><path d="M19.075 4.933a10 10 0 0 1 0 14.134"/><path d="M4.925 19.067a10 10 0 0 1 0-14.134"/><path d="M7.753 16.239a6 6 0 0 1 0-8.478"/><circle cx="12" cy="12" r="2"/>'], ['Settings', '#5f6368', '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>']];
const ic = (d) => `<svg viewBox="0 0 24 24">${d}</svg>`;

export default {
  id: 'au-android-auto-coolwalk',
  credit: 'Google Android Auto "Coolwalk" — split-screen with the taskbar rail, Maps card, media card and suggestion card; the launcher grid opens the app drawer',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; gap: 6px; width: 340px; max-width: 100%; height: 196px; padding: 6px; border-radius: 12px; background: #000; color: #e3e3e3; font: 400 11px/1.25 'Roboto Flex', Roboto, system-ui, sans-serif; user-select: none; }
    .rail { flex: none; width: 40px; display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 6px 0; }
    .time { font: 500 12px/1 'Roboto Flex', Roboto, system-ui, sans-serif; margin-bottom: 2px; }
    .r { width: 32px; height: 32px; border: 0; border-radius: 16px; background: transparent; color: #e3e3e3; display: grid; place-items: center; cursor: pointer; transition: background .2s cubic-bezier(.2,0,0,1), border-radius .3s cubic-bezier(.2,0,0,1); }
    .r:hover { background: rgba(227,227,227,.08); }
    .r:active { background: rgba(227,227,227,.12); }
    .r[aria-pressed="true"] { background: #004a77; color: #c2e7ff; border-radius: 12px; }
    .r .dot { width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; }
    .r svg, .ap svg, .m svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .r .dot svg, .ap .dot svg { stroke: #fff; }
    .mic { margin-top: auto; }
    button:focus-visible { outline: 2px solid #a8c7fa; outline-offset: 1px; }
    .main { position: relative; flex: 1; display: flex; gap: 6px; min-width: 0; }
    .map { position: relative; flex: 1.2; border-radius: 16px; overflow: hidden; background: #2a2d31; }
    .map > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 80%; }
    .turn { position: absolute; left: 6px; top: 6px; right: 6px; display: flex; gap: 6px; align-items: center; padding: 6px 8px; border-radius: 12px; background: #0b8043; color: #fff; font-weight: 500; }
    .turn svg { width: 16px; height: 16px; flex: none; fill: none; stroke: #fff; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; transform: rotate(90deg); }
    .turn span { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.15; }
    .turn b { display: block; font-size: 13px; font-weight: 600; }
    .col { flex: 1; display: flex; flex-direction: column; gap: 6px; min-width: 0; }
    .card { border-radius: 16px; background: #1e1f22; padding: 8px; min-width: 0; }
    .media { flex: 1.5; display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(160deg, #3d3524, #1e1f22 70%); }
    .mh { display: flex; gap: 8px; align-items: center; min-width: 0; }
    .mh > div { min-width: 0; }
    .art { flex: none; display: block; width: 36px; height: 36px; border-radius: 8px; object-fit: cover; background: #2a2d31; }
    .media b, .media span, .sug b, .sug span { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .media span, .sug span { color: #a8abaf; }
    .ctl { display: flex; justify-content: space-between; align-items: center; }
    .m { width: 28px; height: 28px; border: 0; border-radius: 50%; background: transparent; color: #e3e3e3; display: grid; place-items: center; cursor: pointer; }
    .m svg { fill: currentColor; stroke: none; }
    .m.pp { width: 34px; height: 34px; border-radius: 12px; background: #c4eed0; color: #072711; transition: border-radius .3s cubic-bezier(.2,0,0,1); }
    .playing .m.pp { border-radius: 17px; }
    .pp .pa, .playing .pp .pl { display: none; }
    .playing .pp .pa { display: block; }
    .sug { flex: 1; display: flex; gap: 8px; align-items: center; }
    .sug .av { flex: none; display: block; width: 28px; height: 28px; border-radius: 50%; object-fit: cover; background: #2a2d31; }
    .drawer { position: absolute; inset: 0; z-index: 2; display: grid; grid-template-columns: repeat(4, 1fr); align-content: center; gap: 10px 4px; border-radius: 16px; background: #1e1f22; opacity: 0; transform: scale(.94); pointer-events: none; transition: opacity .25s, transform .35s cubic-bezier(.2,0,0,1); }
    .open .drawer { opacity: 1; transform: none; pointer-events: auto; }
    .ap { border: 0; background: transparent; color: #e3e3e3; font: inherit; font-size: 10px; display: grid; justify-items: center; gap: 4px; cursor: pointer; }
    .ap .dot { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; transition: transform .2s; }
    .ap:hover .dot { transform: scale(1.08); }
  `,
  html: `
    <div class="stage">
      <div class="rail">
        <span class="time">9:41</span>
        <button class="r grid" type="button" aria-pressed="false" aria-label="App launcher">${ic('<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>')}</button>
        <button class="r tab" type="button" aria-pressed="true" aria-label="Maps"><span class="dot" style="background:#1a73e8">${ic('<polygon points="3 11 22 2 13 21 11 13 3 11"/>')}</span></button>
        <button class="r tab" type="button" aria-pressed="false" aria-label="Spotify"><span class="dot" style="background:#1db954">${ic('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>')}</span></button>
        <button class="r mic" type="button" aria-pressed="false" aria-label="Google Assistant">${ic('<path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/>')}</button>
      </div>
      <div class="main">
        <div class="map"><img src="assets/real/map-android-auto-palo-alto.svg" alt="" width="210" height="280"><div class="turn">${ic('<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>')}<span><b>150 m</b>University Ave</span></div></div>
        <div class="col">
          <div class="card media"><div class="mh"><img class="art" src="assets/real/track-lose-control-teddy-swims.jpg" alt="" width="36" height="36"><div><b>Lose Control</b><span>Teddy Swims</span></div></div><div class="ctl">
            <button class="m" type="button" aria-label="Previous">${ic('<path d="M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"/><path d="M3 20V4"/>')}</button>
            <button class="m pp" type="button" aria-pressed="false" aria-label="Play / pause"><svg class="pl" viewBox="0 0 24 24"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg><svg class="pa" viewBox="0 0 24 24"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg></button>
            <button class="m" type="button" aria-label="Next">${ic('<path d="M21 4v16"/><path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/>')}</button></div></div>
          <div class="card sug"><img class="av" src="assets/portraits/women-14.jpg" alt="" width="28" height="28"><span style="min-width:0"><b>Mom</b><span>Missed call</span></span></div>
        </div>
        <div class="drawer">${APPS.map(([n, c, d]) => `<button class="ap" type="button"><span class="dot" style="background:${c}">${ic(d)}</span>${n}</button>`).join('')}</div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), main = root.querySelector('.main'), grid = root.querySelector('.grid'), pp = root.querySelector('.pp');
    const tabs = [...root.querySelectorAll('.tab')], mic = root.querySelector('.mic');
    const setDrawer = (on) => { main.classList.toggle('open', on); grid.setAttribute('aria-pressed', String(on)); };
    grid.addEventListener('click', () => setDrawer(!main.classList.contains('open')));
    root.querySelectorAll('.ap').forEach((a) => a.addEventListener('click', () => setDrawer(false)));
    tabs.forEach((t) => t.addEventListener('click', () => { tabs.forEach((o) => o.setAttribute('aria-pressed', String(o === t))); setDrawer(false); }));
    pp.addEventListener('click', () => { const on = stage.classList.toggle('playing'); pp.setAttribute('aria-pressed', String(on)); });
    mic.addEventListener('click', () => mic.setAttribute('aria-pressed', String(mic.getAttribute('aria-pressed') !== 'true')));
  },
};
