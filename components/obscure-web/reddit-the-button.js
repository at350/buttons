// Reddit r/thebutton (April 2015), as in the event's own capture: a wide blue button sunk in a light-grey tray, locked
// under a dark smoked cover with a white padlock. Clicking the lock lifts the cover (shackle springs open), the blue
// button can be pressed once — it sinks into an empty pale slot — and your flair colour is set by the time left.
const LOCK = '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path class="sh" d="M7 11V7a5 5 0 0 1 10 0v4"/>';
const OPEN = '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path class="sh" d="M7 11V7a5 5 0 0 1 9.9-1"/>';
export default {
  id: 'ob-reddit-the-button',
  credit: 'Reddit r/thebutton (April 2015) — unlock the padlocked cover, then press the blue button once before the 60-second timer runs out; your flair colour depends on how low you let it get',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 272px; max-width: 100%; padding: 16px 18px 14px; border-radius: 12px; background: #fff; box-shadow: inset 0 0 0 1px #e5e5e5; display: grid; justify-items: center; gap: 12px; font: 12px/1.2 Verdana, Arial, sans-serif; color: #222; }
    .timer { display: flex; align-items: baseline; gap: 3px; font: 700 34px/1 "Helvetica Neue", Arial, sans-serif; font-variant-numeric: tabular-nums; color: #333; }
    .timer b { display: inline-block; min-width: 26px; padding: 4px 2px; text-align: center; border-radius: 4px; background: #f3f3f3; box-shadow: inset 0 -2px 0 #e2e2e2; }
    .timer i { font-style: normal; color: #999; }
    .timer small { margin-left: 3px; font: 400 14px Verdana, Arial, sans-serif; color: #888; }
    .tray { position: relative; width: 236px; height: 66px; padding: 10px; border-radius: 6px; background: #ececec; box-shadow: inset 0 0 0 1px #dcdcdc; overflow: hidden; }
    .btn { display: block; width: 100%; height: 100%; border: 0; border-radius: 4px; cursor: pointer; background: linear-gradient(#45b4f1, #2b9de3); box-shadow: inset 0 -5px 0 #1b7fc0, inset 0 1px 0 rgba(255,255,255,.35); transition: transform .08s, box-shadow .08s, background .2s; }
    .btn:hover { background: linear-gradient(#55bdf4, #33a6ea); }
    .btn:active { transform: translateY(3px); box-shadow: inset 0 -2px 0 #1b7fc0; }
    .btn:focus-visible { outline: 3px solid #0079d3; outline-offset: 3px; }
    .btn.done { cursor: default; background: #dfe8ee; box-shadow: inset 0 0 0 1px #c9d3da; transform: none; }
    .cover { position: absolute; inset: 0; z-index: 1; border: 0; padding: 10px; cursor: pointer; border-radius: 6px; background: rgba(66,66,66,.93); transition: transform .45s cubic-bezier(.3,.7,.2,1); }
    .cover span { display: grid; place-items: center; height: 100%; border-radius: 4px; background: rgba(70,96,112,.75); }
    .cover svg { width: 30px; height: 30px; fill: #fff; stroke: #fff; stroke-width: 2.6; stroke-linecap: round; }
    .cover .sh { fill: none; }
    .cover .o { display: none; }
    .stage.open .cover { transform: translateY(-100%); pointer-events: none; }
    .stage.open .cover .o { display: block; } .stage.open .cover .c { display: none; }
    .cover:hover span { background: rgba(80,108,126,.8); }
    .cover:focus-visible { outline: 3px solid #0079d3; outline-offset: 3px; }
    .flair { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; color: #555; min-height: 16px; white-space: nowrap; }
    .flair i { width: 12px; height: 12px; border-radius: 50%; background: #ddd; border: 1px solid #bbb; }
    .flair i.on { border-color: transparent; }
  `,
  html: `
    <div class="stage">
      <div class="timer" aria-hidden="true"><b class="d0">6</b><b class="d1">0</b><i>.</i><b class="d2">0</b><b class="d3">0</b><small>s</small></div>
      <div class="tray">
        <button class="btn" type="button" aria-label="The button" tabindex="-1"></button>
        <button class="cover" type="button" aria-label="Unlock the button"><span><svg class="c" viewBox="0 0 24 24" aria-hidden="true">${LOCK}</svg><svg class="o" viewBox="0 0 24 24" aria-hidden="true">${OPEN}</svg></span></button>
      </div>
      <span class="flair"><i aria-hidden="true"></i><span class="ft">non presser</span></span>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), btn = root.querySelector('.btn'), cover = root.querySelector('.cover'), dot = root.querySelector('.flair i'), ft = root.querySelector('.ft');
    const d = [0, 1, 2, 3].map((i) => root.querySelector('.d' + i));
    const tiers = [[52, '#820080', 'purple'], [42, '#0083c7', 'blue'], [32, '#02be01', 'green'], [22, '#e5d900', 'yellow'], [12, '#e59500', 'orange'], [0, '#e50000', 'red']];
    let t = 60, iv = 0;
    const stop = () => { clearInterval(iv); iv = 0; };
    const paint = () => { const s = t.toFixed(2).padStart(5, '0'); d[0].textContent = s[0]; d[1].textContent = s[1]; d[2].textContent = s[3]; d[3].textContent = s[4]; };
    const run = () => { stop(); iv = setInterval(() => { t = Math.max(0, t - .05); paint(); if (t <= 0) stop(); }, 50); };
    cover.addEventListener('click', () => { stage.classList.add('open'); btn.tabIndex = 0; btn.focus({ preventScroll: true }); t = 60; paint(); run(); });
    btn.addEventListener('click', () => {
      if (btn.classList.contains('done')) { stop(); t = 60; paint(); stage.classList.remove('open'); btn.classList.remove('done'); btn.setAttribute('aria-label', 'The button'); btn.tabIndex = -1; dot.className = ''; dot.style.background = ''; ft.textContent = 'non presser'; cover.focus({ preventScroll: true }); return; }
      stop(); const [, c, name] = tiers.find(([min]) => t >= min);
      btn.classList.add('done'); btn.setAttribute('aria-label', 'Pressed — click to start over'); dot.classList.add('on'); dot.style.background = c; ft.textContent = `${name} flair · pressed at ${Math.floor(t)}s`;
      t = 60; paint();
    });
    paint();
    return stop;
  },
};
