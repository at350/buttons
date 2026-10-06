// Interstellar (2014) — TARS: four brushed-metal slabs with a little display. "Honesty, new setting: ninety-five percent."
const P0 = { HONESTY: 90, HUMOR: 75 };
export default {
  id: 'sf-tars-honesty',
  credit: 'Interstellar (2014) — TARS, the Endurance\'s monolith robot: brushed-metal slabs with the small display; switch between his HONESTY and HUMOR parameters and drag the setting (he shuffles when you change it)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 270px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 14px 16px; background: linear-gradient(#2a2c2d, #121314); font-family: 'Space Grotesk', system-ui, sans-serif; color: #d9dcdd; }
    .tars { display: flex; justify-content: center; gap: 2px; height: 140px; }
    .sl { position: relative; width: 30px; border-radius: 1px; background: repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 3px), linear-gradient(90deg, #7c8183, #b9bec0 30%, #9da2a4 60%, #6f7476);
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.35); transition: transform .3s cubic-bezier(.3,1.4,.5,1); }
    .sl::before, .sl::after { content: ''; position: absolute; left: 0; right: 0; height: 1px; background: rgba(0,0,0,.45); }
    .sl::before { top: 34%; } .sl::after { top: 72%; }
    .shuffle .sl:nth-child(1), .shuffle .sl:nth-child(4) { transform: translateY(-5px); }
    .shuffle .sl:nth-child(2), .shuffle .sl:nth-child(3) { transform: translateY(3px); }
    .scr { position: absolute; z-index: 1; left: 3px; top: 12px; width: 56px; height: 30px; padding: 3px 4px; background: #050607; box-shadow: inset 0 0 0 1px #000, 0 0 0 1px #5c6163;
      font: 500 7px/1.15 'JetBrains Mono', ui-monospace, monospace; color: #e8f2f6; letter-spacing: .06em; text-shadow: 0 0 3px rgba(200,230,255,.6); }
    .scr b { display: block; font-size: 13px; font-weight: 600; letter-spacing: 0; }
    .bars { display: flex; gap: 1px; height: 4px; margin-top: 2px; }
    .bars i { flex: 1; background: #2a2f31; } .bars i.on { background: #e8f2f6; }
    .cue { position: absolute; right: 6px; bottom: 10px; width: 4px; height: 4px; border-radius: 50%; background: #3a1210; }
    .shuffle .cue { background: #ff4a2a; box-shadow: 0 0 5px #ff4a2a; }
    .ctl { margin-top: 14px; }
    .tabs { display: flex; gap: 6px; margin-bottom: 8px; }
    .tb { flex: 1; height: 24px; border: 1px solid #4b4f51; border-radius: 2px; background: #1b1d1e; color: #9aa0a3; cursor: pointer; font: 600 9px 'Space Grotesk', system-ui, sans-serif; letter-spacing: .2em; }
    .tb:hover { color: #fff; }
    .tb[aria-selected="true"] { background: #d9dcdd; color: #121314; border-color: #d9dcdd; }
    .tb:focus-visible { outline: 2px solid #8fd3ff; outline-offset: 2px; }
    input { -webkit-appearance: none; appearance: none; width: 100%; height: 18px; margin: 0; background: transparent; cursor: pointer; }
    input::-webkit-slider-runnable-track { height: 3px; background: linear-gradient(90deg, #e8f2f6 var(--v), #3b3f41 var(--v)); }
    input::-moz-range-track { height: 3px; background: linear-gradient(90deg, #e8f2f6 var(--v), #3b3f41 var(--v)); }
    input::-webkit-slider-thumb { -webkit-appearance: none; width: 10px; height: 18px; margin-top: -7.5px; border-radius: 1px; background: linear-gradient(90deg, #9da2a4, #e1e4e5); box-shadow: 0 1px 3px #000; }
    input::-moz-range-thumb { width: 10px; height: 18px; border: 0; border-radius: 1px; background: #d9dcdd; }
    input:focus-visible { outline: 1px dashed #8fd3ff; outline-offset: 3px; }
    .ticks { display: flex; justify-content: space-between; font: 500 8px 'JetBrains Mono', monospace; color: #6f7476; margin-top: 2px; }
  `,
  html: `<div class="stage"><div class="tars"><div class="sl"><div class="scr"><span class="k">HONESTY</span><b class="v">90%</b><span class="bars">${'<i></i>'.repeat(10)}</span></div></div><div class="sl"></div><div class="sl"></div><div class="sl"><i class="cue"></i></div></div>
    <div class="ctl"><div class="tabs" role="tablist"><button class="tb" type="button" role="tab" aria-selected="true">HONESTY</button><button class="tb" type="button" role="tab" aria-selected="false">HUMOR</button></div>
    <input type="range" min="0" max="100" step="5" value="90" aria-label="Setting" style="--v:90%"><div class="ticks"><span>0</span><span>50</span><span>100</span></div></div></div>`,
  init(root) {
    const tars = root.querySelector('.tars'), k = root.querySelector('.k'), v = root.querySelector('.v'), inp = root.querySelector('input'), tbs = [...root.querySelectorAll('.tb')];
    let cur = 'HONESTY', to = 0; const P = { ...P0 };
    const bars = [...root.querySelectorAll('.bars i')];
    const show = () => { k.textContent = cur; v.textContent = `${P[cur]}%`; bars.forEach((b, i) => b.classList.toggle('on', i < Math.round(P[cur] / 10))); inp.value = P[cur]; inp.style.setProperty('--v', `${P[cur]}%`); };
    const shuffle = () => { tars.classList.add('shuffle'); clearTimeout(to); to = setTimeout(() => tars.classList.remove('shuffle'), 260); };
    tbs.forEach((b) => b.addEventListener('click', () => { cur = b.textContent; tbs.forEach((x) => x.setAttribute('aria-selected', String(x === b))); show(); shuffle(); }));
    tbs.forEach((b, i) => b.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); tbs[1 - i].focus(); tbs[1 - i].click(); } }));
    inp.addEventListener('input', () => { P[cur] = +inp.value; show(); shuffle(); });
    show();
    return () => clearTimeout(to);
  },
};
