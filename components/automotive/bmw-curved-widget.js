export default {
  id: 'au-bmw-curved-widget',
  credit: 'BMW Curved Display / iDrive 8 (Operating System 8) — glassy home-screen widgets; tap one to focus it and it widens with the blue OS 8 glow',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 340px; max-width: 100%; padding: 14px 10px; border-radius: 12px; background: radial-gradient(120% 120% at 20% 0%, #23262c, #0b0c0e 70%); perspective: 700px; font: 400 11px/1.2 Inter, system-ui, sans-serif; color: #e8edf5; }
    .disp { position: relative; height: 150px; padding: 8px; border-radius: 14px; background: linear-gradient(160deg, #15181e, #07080a); box-shadow: inset 0 0 0 1px rgba(255,255,255,.06), 0 10px 24px rgba(0,0,0,.6); transform: rotateY(-9deg) scale(.97); transform-origin: 0 50%; }
    .disp::after { content: ''; position: absolute; inset: 0; border-radius: 14px; background: linear-gradient(105deg, rgba(255,255,255,.07), transparent 40%); pointer-events: none; }
    .sb { display: flex; justify-content: space-between; height: 16px; padding: 0 4px; color: #9aa4b2; font-size: 10px; font-variant-numeric: tabular-nums; }
    .row { display: flex; gap: 6px; height: 118px; }
    .w { position: relative; flex: 1 1 0; min-width: 0; border: 0; padding: 10px; border-radius: 12px; background: linear-gradient(170deg, rgba(64,74,92,.55), rgba(26,30,38,.75)); color: inherit; font: inherit; text-align: left; cursor: pointer; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; transition: flex-grow .45s cubic-bezier(.2,0,0,1), box-shadow .3s; }
    .w:hover { background: linear-gradient(170deg, rgba(80,92,114,.6), rgba(30,35,45,.8)); }
    .w[aria-pressed="true"] { flex-grow: 2.2; box-shadow: inset 0 0 0 1.5px #3c8fff, 0 0 16px rgba(28,105,212,.55); }
    .w:focus-visible { outline: 2px solid #3c8fff; outline-offset: 1px; }
    .w svg.i { width: 18px; height: 18px; fill: none; stroke: #fff; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
    .w b { display: block; font-weight: 600; font-size: 12px; white-space: nowrap; }
    .w span { color: #9aa4b2; white-space: nowrap; }
    .map { position: absolute; inset: 0; opacity: .35; transition: opacity .4s; }
    .w[aria-pressed="true"] .map { opacity: .8; }
    .map path { fill: none; stroke: #5d6b80; stroke-width: 6; }
    .map .rt { stroke: #3c8fff; stroke-width: 3; }
    .w > * { position: relative; }
    .art { display: block; width: 34px; height: 34px; border-radius: 6px; object-fit: cover; background: #2f3846; box-shadow: 0 2px 6px rgba(0,0,0,.5); }
    .prog { height: 3px; border-radius: 2px; background: rgba(255,255,255,.18); overflow: hidden; }
    .prog i { display: block; width: 38%; height: 100%; background: #fff; }
    .av { display: flex; gap: 4px; }
    .av img { display: block; width: 22px; height: 22px; border-radius: 50%; object-fit: cover; background: #2f3846; box-shadow: 0 0 0 1.5px rgba(20,24,30,.9); }
  `,
  html: `
    <div class="stage">
      <div class="disp">
        <div class="sb"><span>12:45</span><span>21°C</span></div>
        <div class="row">
          <button class="w" type="button" aria-pressed="true">
            <svg class="map" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice"><path d="M-10 90 60 70 120 92 210 60M40 -10 70 130M150 -10 130 130"/><path class="rt" d="M66 120 60 70 126 88 140 20"/></svg>
            <svg class="i" viewBox="0 0 24 24"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
            <div><b>Navigation</b><span>12 min · 6.4 km</span></div>
          </button>
          <button class="w" type="button" aria-pressed="false">
            <img class="art" src="assets/real/track-bad-habits-ed-sheeran.jpg" alt="" width="34" height="34">
            <div><b>Bad Habits</b><span>Ed Sheeran</span><div class="prog"><i></i></div></div>
          </button>
          <button class="w" type="button" aria-pressed="false">
            <svg class="i" viewBox="0 0 24 24"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
            <div><div class="av"><img src="assets/portraits/men-22.jpg" alt="" width="22" height="22"><img src="assets/portraits/women-32.jpg" alt="" width="22" height="22"></div><b>Favourites</b></div>
          </button>
        </div>
      </div>
    </div>`,
  init(root) {
    const ws = [...root.querySelectorAll('.w')], sb = root.querySelector('.sb span');
    ws.forEach((w) => w.addEventListener('click', () => ws.forEach((o) => o.setAttribute('aria-pressed', String(o === w)))));
    root.querySelector('.row').addEventListener('keydown', (e) => {
      const i = ws.indexOf(root.activeElement), d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (i < 0 || !d) return;
      e.preventDefault(); const n = (i + d + ws.length) % ws.length; ws[n].focus(); ws[n].click();
    });
    sb.textContent = '12:45';
  },
};
