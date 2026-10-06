// The live poolsuite.net player window (sampled): #f6d5d5 desktop, #f9f0e9 window with 1px black outlines,
// the white "Poolsuite: ON AIR •" (#f16060 dot) now-playing card, the transport strip where the active
// button turns #afe2e5, the pink #f6d5d5 add-to-mixtape key, and "Channel: … LIVE ▾" with its #cbc5bf tag.
export default {
  id: 'ob-poolsuite-radio',
  credit: 'Poolsuite FM — the retro Mac-style radio player: hit play, flip channels, and the transport key lights up pool-blue',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .desk { width: 340px; max-width: 100%; padding: 12px; border-radius: 12px; background: #f6d5d5; font: 11px/1.25 Chicago, ChiKareGo2, Geneva, "Helvetica Neue", Arial, sans-serif; color: #000; }
    .win { background: #f9f0e9; border: 1px solid #000; border-radius: 4px; padding: 0 6px 6px; box-shadow: 0 10px 24px rgba(120,60,60,.18); }
    .tb { display: flex; align-items: center; gap: 8px; height: 26px; }
    .tb .x { width: 12px; height: 12px; }
    .tb .logo { margin-left: auto; font: 900 15px/1 "Playfair Display", "Bodoni 72", Didot, Georgia, serif; letter-spacing: -.3px; transform: scaleX(.78); transform-origin: right center; }
    .card { background: #fff; border: 1px solid #000; border-radius: 3px; padding: 7px 8px 6px; }
    .st { font-weight: 700; font-size: 12px; display: flex; align-items: center; gap: 6px; }
    .st i { width: 4px; height: 4px; border-radius: 50%; background: #f16060; }
    .tr { margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .row { display: flex; gap: 4px; margin-top: 4px; align-items: stretch; }
    .stat { flex: 1; min-width: 0; background: #fff; border: 1px solid #000; border-radius: 3px; padding: 4px 8px; display: flex; flex-direction: column; justify-content: flex-end; }
    .stat b { font-size: 12px; white-space: nowrap; }
    .stat small { font-size: 9px; font-variant-numeric: tabular-nums; height: 11px; }
    .tp { display: flex; border: 1px solid #000; border-radius: 3px; overflow: hidden; flex: none; }
    .k { width: 34px; height: 30px; padding: 0; border: 0; border-left: 1px solid #000; background: #f9f0e9; cursor: pointer; display: grid; place-items: center; }
    .k:first-child { border-left: 0; }
    .k svg { width: 12px; height: 12px; fill: #000; }
    .k.sm { width: 26px; } .k.sm svg { fill: #8f8a86; width: 10px; }
    .k:hover { background: #fff; }
    .k[aria-pressed="true"] { background: #afe2e5; }
    .k:active { background: #8fd3d8; }
    .add { width: 36px; border: 1px solid #000; border-radius: 3px; background: #f6d5d5; display: grid; place-items: center; cursor: pointer; padding: 0; }
    .add:hover { background: #f9e2e2; }
    .add[aria-pressed="true"] { background: #f16060; }
    .add svg { width: 14px; height: 14px; }
    .ch { margin-top: 4px; width: 100%; height: 22px; display: flex; align-items: center; gap: 6px; padding: 0 6px; border: 1px solid #000; border-radius: 3px; background: #f9f0e9; font: inherit; color: #000; cursor: pointer; text-align: left; }
    .ch:hover { background: #fff; }
    .ch .n { flex: 1; white-space: nowrap; overflow: hidden; }
    .ch .live { padding: 1px 3px; background: #cbc5bf; color: #7a7673; font-size: 8px; border-radius: 2px; }
    .ch svg { width: 7px; height: 4px; }
    .k:focus-visible, .add:focus-visible, .ch:focus-visible { outline: 1px dotted #000; outline-offset: -3px; }
  `,
  html: `
    <div class="desk">
      <div class="win">
        <div class="tb"><svg class="x" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 3l6 6M9 3l-6 6" stroke="#000" stroke-width="1.2"/></svg><span class="logo" aria-hidden="true">POOLSUITE</span></div>
        <div class="card"><div class="st">Poolsuite: <span class="cn">ON AIR</span><i aria-hidden="true"></i></div><div class="tr">Tensnake – Holding Back (My Love)</div></div>
        <div class="row">
          <div class="stat" aria-live="polite"><small class="tm"></small><b class="s">Stopped</b></div>
          <div class="tp">
            <button class="k play" type="button" aria-pressed="false" aria-label="Play"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5v9l7-4.5z"/></svg></button>
            <button class="k stop" type="button" aria-pressed="true" aria-label="Stop"><svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2.5" y="2.5" width="7" height="7"/></svg></button>
            <button class="k sm prev" type="button" aria-label="Previous track"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1 2h1.6v8H1zM6.5 2v8L2.6 6zM11 2v8L7 6z"/></svg></button>
            <button class="k sm next" type="button" aria-label="Next track"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M11 2H9.4v8H11zM5.5 2v8L9.4 6zM1 2v8l4-4z"/></svg></button>
          </div>
          <button class="add" type="button" aria-pressed="false" aria-label="Add to mixtape"><svg viewBox="0 0 14 14" aria-hidden="true"><path d="M8 1v8.5a2 2 0 1 1-1.4-1.9V1h4v2.4H8" fill="#000"/><path d="M2.5 3v4M0.5 5h4" stroke="#000" stroke-width="1.3"/></svg></button>
        </div>
        <button class="ch" type="button"><span class="n">Channel: Poolsuite ON AIR</span><span class="live">LIVE</span><svg viewBox="0 0 7 4" aria-hidden="true"><path d="M0 0h7L3.5 4z"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const host = root.host, play = root.querySelector('.play'), stopB = root.querySelector('.stop'), s = root.querySelector('.s'), tm = root.querySelector('.tm');
    const tr = root.querySelector('.tr'), cn = root.querySelector('.cn'), chN = root.querySelector('.ch .n'), add = root.querySelector('.add');
    const chans = [['ON AIR', 'Poolsuite ON AIR', ['Tensnake – Holding Back (My Love)', 'Poolside – Harvest Moon', 'Yacht Rock Revue – Summer Breeze']], ['Indie Summer', 'Indie Summer', ['Phoenix – Lisztomania', 'Real Estate – Darling']], ['Hangover Club', 'Hangover Club', ['Air – La Femme d\'Argent', 'Khruangbin – Maria También']], ['Tokyo Disco', 'Tokyo Disco', ['Mariya Takeuchi – Plastic Love', 'Tatsuro Yamashita – Ride on Time']]];
    let playing = false, ci = 0, ti = 0, secs = 0, iv = 0;
    const fmt = () => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
    const tick = () => { secs++; tm.textContent = fmt(); };
    const run = () => { clearInterval(iv); iv = 0; if (playing && host.matches(':hover')) iv = setInterval(tick, 1000); };
    const render = () => {
      play.setAttribute('aria-pressed', String(playing)); stopB.setAttribute('aria-pressed', String(!playing));
      s.textContent = playing ? 'Playing' : 'Stopped'; tm.textContent = playing ? fmt() : '';
      cn.textContent = chans[ci][0]; chN.textContent = 'Channel: ' + chans[ci][1]; tr.textContent = chans[ci][2][ti % chans[ci][2].length];
      add.setAttribute('aria-pressed', 'false');
      run();
    };
    play.addEventListener('click', () => { playing = true; render(); });
    stopB.addEventListener('click', () => { playing = false; secs = 0; render(); });
    root.querySelector('.next').addEventListener('click', () => { ti++; secs = 0; render(); });
    root.querySelector('.prev').addEventListener('click', () => { ti = Math.max(0, ti - 1); secs = 0; render(); });
    root.querySelector('.ch').addEventListener('click', () => { ci = (ci + 1) % chans.length; ti = 0; secs = 0; render(); });
    add.addEventListener('click', () => add.setAttribute('aria-pressed', String(add.getAttribute('aria-pressed') !== 'true')));
    host.addEventListener('mouseenter', run);
    host.addEventListener('mouseleave', () => { clearInterval(iv); iv = 0; });
    render();
    return () => clearInterval(iv);
  },
};
