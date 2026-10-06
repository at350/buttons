// The Expanse — a transparent hand terminal: glass slab, thin white UI, tile grid; tap a tile to open it, chevron to go back.
const TILES = [
  ['COMMS', '<path d="M16.247 7.761a6 6 0 0 1 0 8.478"/><path d="M19.075 4.933a10 10 0 0 1 0 14.134"/><path d="M4.925 19.067a10 10 0 0 1 0-14.134"/><path d="M7.753 16.239a6 6 0 0 1 0-8.478"/><circle cx="12" cy="12" r="2"/>'],
  ['NAV', '<path d="M20.341 6.484A10 10 0 0 1 10.266 21.85"/><path d="M3.659 17.516A10 10 0 0 1 13.74 2.152"/><circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/>'],
  ['MEDICAL', '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>'],
  ['AIRLOCK', '<circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/>'],
  ['CARGO', '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/>'],
  ['REACTOR', '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>'],
];
export default {
  id: 'sf-expanse-terminal',
  credit: 'The Expanse — transparent hand terminal (Rocinante crew): glass slab with hairline white UI and a tile grid; tap a tile to open its panel, chevron back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 220px; height: 290px; max-width: 100%; border-radius: 12px; overflow: hidden; display: grid; place-items: center;
      background: radial-gradient(circle at 30% 20%, #3a2a1e, #120d0a 60%), #120d0a; font-family: 'Space Grotesk', system-ui, sans-serif; color: #eaf6ff; }
    .ht { position: relative; width: 168px; height: 262px; border-radius: 14px; padding: 12px 10px; overflow: hidden;
      background: linear-gradient(160deg, rgba(200,230,255,.16), rgba(120,170,220,.05) 60%, rgba(200,230,255,.1)); border: 1px solid rgba(220,240,255,.45);
      box-shadow: inset 0 0 0 3px rgba(255,255,255,.04), 0 10px 30px rgba(0,0,0,.6); backdrop-filter: blur(1px); }
    .ht::before { content: ''; position: absolute; inset: 0; background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,.1) 42%, transparent 50%); pointer-events: none; }
    .sb { display: flex; justify-content: space-between; font: 500 9px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .1em; opacity: .75; }
    .hd { margin: 10px 0 10px; font-size: 11px; font-weight: 600; letter-spacing: .3em; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; transition: opacity .2s, transform .25s cubic-bezier(.2,.8,.2,1); }
    .t { height: 60px; border: 1px solid rgba(220,240,255,.35); border-radius: 4px; background: rgba(160,210,255,.07); color: inherit; cursor: pointer; padding: 6px;
      display: grid; align-content: space-between; justify-items: start; font: 600 8px 'Space Grotesk', system-ui, sans-serif; letter-spacing: .16em; transition: background .15s, border-color .15s; }
    .t svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
    .t:hover { background: rgba(160,210,255,.18); border-color: #fff; }
    .t:nth-child(4) { color: #ffb36b; border-color: rgba(255,179,107,.5); }
    .t:focus-visible, .bk:focus-visible { outline: 2px solid #8fd3ff; outline-offset: 1px; }
    .pane { position: absolute; left: 10px; right: 10px; top: 52px; bottom: 12px; opacity: 0; transform: translateX(20px); pointer-events: none; transition: opacity .2s, transform .25s cubic-bezier(.2,.8,.2,1); }
    .open .grid { opacity: 0; transform: translateX(-20px); pointer-events: none; }
    .open .pane { opacity: 1; transform: none; pointer-events: auto; }
    .bk { display: flex; align-items: center; gap: 4px; border: 0; background: none; color: inherit; cursor: pointer; padding: 2px 0; font: 600 10px 'Space Grotesk', system-ui, sans-serif; letter-spacing: .24em; }
    .bk svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; }
    .viz { margin-top: 10px; height: 110px; border: 1px solid rgba(220,240,255,.25); border-radius: 4px; position: relative; overflow: hidden; }
    .viz svg { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; stroke: #bfe6ff; stroke-width: 1; }
    .ecg { stroke-dasharray: 300; animation: ecg 1.8s linear infinite; }
    @keyframes ecg { from { stroke-dashoffset: 300; } to { stroke-dashoffset: 0; } }
    .orb { transform-origin: 74px 55px; animation: orb 6s linear infinite; }
    @keyframes orb { to { transform: rotate(360deg); } }
    .rows { margin-top: 8px; font: 500 9px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .06em; display: grid; gap: 4px; opacity: .85; }
    .rows span { display: flex; justify-content: space-between; border-bottom: 1px solid rgba(220,240,255,.15); padding-bottom: 3px; }
  `,
  html: `<div class="stage"><div class="ht"><div class="sb"><span>14:22 MCRT</span><span>▮▮▮▯</span></div><div class="hd">ROCINANTE</div>
    <div class="grid">${TILES.map(([l, d], i) => `<button class="t" type="button" data-i="${i}"><svg viewBox="0 0 24 24">${d}</svg>${l}</button>`).join('')}</div>
    <div class="pane"><button class="bk" type="button"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg><span class="pl">COMMS</span></button>
      <div class="viz"><svg viewBox="0 0 148 110"><path class="ecg" d="M0 60h40l6-14 8 34 8-46 6 26h80"/><g class="orb"><ellipse cx="74" cy="55" rx="40" ry="18" opacity=".4" transform="rotate(-20 74 55)"/><circle cx="114" cy="55" r="3" fill="#ffb36b" stroke="none"/></g></svg></div>
      <div class="rows"><span><b class="k1">SIGNAL</b><b class="v1">-62 dB</b></span><span><b class="k2">LATENCY</b><b class="v2">4.2 s</b></span></div></div>
  </div></div>`,
  init(root) {
    const ht = root.querySelector('.ht'), pl = root.querySelector('.pl'), ecg = root.querySelector('.ecg'), orb = root.querySelector('.orb');
    const DATA = [['SIGNAL', '-62 dB', 'LATENCY', '4.2 s'], ['Δv', '812 m/s', 'BURN', '00:14:30'], ['PULSE', '72 bpm', 'O2 SAT', '98%'], ['PRESSURE', '101 kPa', 'SEAL', 'LOCKED'], ['MASS', '42.6 t', 'MANIFEST', '17'], ['CORE', '84%', 'TEMP', '612 K']];
    const q = (s) => root.querySelector(s);
    const grid = q('.grid'), pane = q('.pane'); pane.inert = true;
    const open = (o) => { ht.classList.toggle('open', o); pane.inert = !o; grid.inert = o; };
    root.querySelectorAll('.t').forEach((b) => b.addEventListener('click', () => {
      const i = +b.dataset.i, d = DATA[i];
      pl.textContent = TILES[i][0]; [q('.k1').textContent, q('.v1').textContent, q('.k2').textContent, q('.v2').textContent] = d;
      ecg.style.display = i === 1 || i === 4 ? 'none' : ''; orb.style.display = i === 1 || i === 4 ? '' : 'none';
      open(true); q('.bk').focus({ preventScroll: true });
    }));
    q('.bk').addEventListener('click', () => { open(false); root.querySelector('.t').focus({ preventScroll: true }); });
  },
};
