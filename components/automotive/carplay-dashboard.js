const TRACKS = [['Espresso', 'Sabrina Carpenter', '#6b5a2e', 'track-espresso-sabrina-carpenter.jpg'], ['Flowers', 'Miley Cyrus', '#8a4a5c', 'track-flowers-miley-cyrus.jpg'], ['As It Was', 'Harry Styles', '#8a5a26', 'track-as-it-was-harry-styles.jpg']];
const APP = (cls, bg, ic, label) => `<button class="app ${cls}" type="button" aria-label="${label}" style="background:${bg}"><svg viewBox="0 0 24 24">${ic}</svg></button>`;

export default {
  id: 'au-carplay-dashboard',
  credit: 'Apple CarPlay — Dashboard: status sidebar with recent apps, Maps card, Now Playing widget and Up Next; tap Music for the full Now Playing screen',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; gap: 6px; width: 340px; max-width: 100%; height: 196px; padding: 6px; border-radius: 12px; background: #000; color: #fff; font: 500 11px/1.2 system-ui, -apple-system, 'SF Pro Text', sans-serif; user-select: none; }
    .side { flex: none; width: 48px; display: flex; flex-direction: column; align-items: center; gap: 7px; padding: 8px 0 6px; border-radius: 10px; background: #1c1c1e; }
    .time { font-weight: 600; font-size: 12px; font-variant-numeric: tabular-nums; }
    .sig { display: flex; align-items: flex-end; gap: 1.5px; height: 8px; }
    .sig i { width: 2.5px; background: #fff; border-radius: 1px; }
    .app { width: 34px; height: 34px; border: 0; border-radius: 8px; display: grid; place-items: center; cursor: pointer; transition: transform .2s cubic-bezier(.32,.72,0,1), filter .15s; }
    .app svg, .dash svg, .ctl svg { width: 18px; height: 18px; fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .app:hover { filter: brightness(1.15); }
    .app:active, .dash:active, .ctl:active { transform: scale(.88); }
    .dash { margin-top: auto; width: 30px; height: 30px; border: 0; border-radius: 8px; background: #2c2c2e; display: grid; place-items: center; cursor: pointer; }
    .dash svg { width: 15px; height: 15px; }
    button:focus-visible { outline: 2px solid #0a84ff; outline-offset: 2px; }
    .main { position: relative; flex: 1; min-width: 0; }
    .v { position: absolute; inset: 0; display: flex; gap: 6px; transition: opacity .3s, transform .35s cubic-bezier(.32,.72,0,1); }
    .np-full { opacity: 0; transform: scale(.96); pointer-events: none; flex-direction: column; align-items: center; justify-content: center; border-radius: 10px; background: linear-gradient(160deg, var(--a), #111 80%); }
    .full .np-full { opacity: 1; transform: none; pointer-events: auto; }
    .full .dashv { opacity: 0; transform: scale(1.03); pointer-events: none; }
    .map { position: relative; flex: 1.15; border-radius: 10px; overflow: hidden; background: #1f1f21; }
    .map img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 70%; }
    .eta { position: absolute; left: 6px; bottom: 6px; right: 6px; padding: 5px 7px; border-radius: 7px; background: rgba(28,28,30,.92); }
    .eta b { color: #30d158; font-size: 12px; }
    .col { flex: 1; display: flex; flex-direction: column; gap: 6px; min-width: 0; }
    .np, .cal { border-radius: 10px; background: #1c1c1e; padding: 7px; min-width: 0; }
    .np { flex: 1.5; display: flex; flex-direction: column; justify-content: space-between; }
    .row { display: flex; gap: 6px; align-items: center; min-width: 0; }
    .art { flex: none; display: block; width: 34px; height: 34px; border-radius: 5px; object-fit: cover; background: #2c2c2e; }
    .t { min-width: 0; }
    .t b, .t span { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .t span { color: #8e8e93; }
    .ctls { display: flex; justify-content: space-around; }
    .ctl { width: 28px; height: 28px; border: 0; border-radius: 50%; background: transparent; display: grid; place-items: center; cursor: pointer; }
    .ctl svg { fill: #fff; stroke: none; }
    .ctl:hover { background: #2c2c2e; }
    .pp .pa, .playing .pp .pl { display: none; }
    .playing .pp .pa { display: block; }
    .cal { flex: 1; border-left: 3px solid #ff9f0a; }
    .cal b, .cal span { display: block; white-space: nowrap; }
    .cal span { color: #8e8e93; }
    .big { display: block; width: 64px; height: 64px; border-radius: 8px; object-fit: cover; background: #2c2c2e; box-shadow: 0 8px 18px rgba(0,0,0,.5); margin-bottom: 8px; }
    .np-full .t { text-align: center; margin-bottom: 6px; }
    .np-full .ctls { width: 140px; }
    .bar { width: 160px; height: 3px; border-radius: 2px; background: rgba(255,255,255,.25); margin-bottom: 6px; overflow: hidden; }
    .bar i { display: block; width: 34%; height: 100%; background: #fff; }
  `,
  html: `
    <div class="stage">
      <div class="side">
        <span class="time">9:41</span><span class="sig"><i style="height:3px"></i><i style="height:5px"></i><i style="height:7px"></i><i style="height:8px"></i></span>
        ${APP('maps', 'linear-gradient(#5fd068,#2fa44f)', '<polygon points="3 11 22 2 13 21 11 13 3 11"/>', 'Maps')}${APP('music', 'linear-gradient(#fd5b74,#f6264a)', '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>', 'Music')}${APP('phone', 'linear-gradient(#5be26b,#2fc24a)', '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>', 'Phone')}
        <button class="dash" type="button" aria-label="Dashboard"><svg viewBox="0 0 24 24"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg></button>
      </div>
      <div class="main">
        <div class="v dashv">
          <div class="map"><img src="assets/real/map-carplay-sf.svg" alt="" width="210" height="290"><div class="eta"><b>9:58</b> · 17 min</div></div>
          <div class="col">
            <div class="np"><div class="row"><img class="art" src="assets/real/track-espresso-sabrina-carpenter.jpg" alt="" width="34" height="34"><span class="t"><b class="tt"></b><span class="ta"></span></span></div><div class="ctls">CTL</div></div>
            <div class="cal"><b>Design Review</b><span>10:30 AM</span></div>
          </div>
        </div>
        <div class="v np-full"><img class="big" src="assets/real/track-espresso-sabrina-carpenter.jpg" alt="" width="64" height="64"><span class="t"><b class="tt"></b><span class="ta"></span></span><span class="bar"><i></i></span><div class="ctls">CTL</div></div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), main = root.querySelector('.main');
    const CTL = `<button class="ctl prev" type="button" aria-label="Previous"><svg viewBox="0 0 24 24"><path d="M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"/><path d="M3 20V4"/></svg></button><button class="ctl pp" type="button" aria-label="Play / pause"><svg class="pl" viewBox="0 0 24 24"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg><svg class="pa" viewBox="0 0 24 24"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg></button><button class="ctl next" type="button" aria-label="Next"><svg viewBox="0 0 24 24"><path d="M21 4v16"/><path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/></svg></button>`;
    root.querySelectorAll('.ctls').forEach((c) => (c.innerHTML = CTL));
    let i = 0;
    const paint = () => {
      const [t, a, c1, img] = TRACKS[i];
      root.querySelectorAll('.tt').forEach((e) => (e.textContent = t));
      root.querySelectorAll('.ta').forEach((e) => (e.textContent = a));
      root.querySelectorAll('.art, .big').forEach((e) => (e.src = 'assets/real/' + img));
      stage.style.setProperty('--a', c1);
    };
    root.querySelectorAll('.pp').forEach((b) => b.addEventListener('click', () => { const on = stage.classList.toggle('playing'); root.querySelectorAll('.pp').forEach((p) => p.setAttribute('aria-pressed', String(on))); }));
    root.querySelectorAll('.next').forEach((b) => b.addEventListener('click', () => { i = (i + 1) % TRACKS.length; paint(); }));
    root.querySelectorAll('.prev').forEach((b) => b.addEventListener('click', () => { i = (i + TRACKS.length - 1) % TRACKS.length; paint(); }));
    root.querySelector('.music').addEventListener('click', () => main.classList.add('full'));
    root.querySelector('.dash').addEventListener('click', () => main.classList.remove('full'));
    root.querySelector('.maps').addEventListener('click', () => main.classList.remove('full'));
    root.querySelector('.phone').addEventListener('click', () => main.classList.remove('full'));
    paint();
  },
};
