// Electric forklift dash (Toyota / Linde style): F-N-R direction rocker and the horn button
// (ISO 7000-0244 horn symbol) beside the multifunction display. Press the top of the rocker for F,
// the bottom for R, the middle for N. In R the display flashes amber with the reversing beacon;
// holding the horn shows the sound waves.
const HORN = '<path d="M3 9.5h3.5l9-5.5v16l-9-5.5H3z"/><path d="M6.5 14.5l1.2 4.5h2.4l-1-4" />';
export default {
  id: 'nd-forklift-fnr',
  credit: 'Electric forklift dash — F / N / R direction rocker with display, reversing beacon, and hold-to-sound horn (ISO 7000-0244)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; align-items: center; gap: 14px; padding: 14px 16px; border-radius: 12px; overflow: hidden; user-select: none; -webkit-user-select: none;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.03) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #383c40, #1e2124); box-shadow: inset 0 1px 0 rgba(255,255,255,.12); }
    .disp { position: relative; width: 132px; height: 92px; border-radius: 8px; background: linear-gradient(#0f1a22, #070d12); box-shadow: inset 0 0 0 2px #2b3238, inset 0 2px 6px #000; font-family: "DM Sans", Inter, Arial, sans-serif; }
    .dirs { position: absolute; left: 8px; top: 8px; display: flex; gap: 4px; }
    .dirs b { width: 24px; height: 24px; display: grid; place-items: center; border-radius: 4px; font: 800 15px/1 "DM Sans", Inter, Arial, sans-serif; color: #2a3a44; background: #0c151b; }
    .dirs b.on { color: #061016; background: #39e06c; }
    .dirs b.r.on { background: #ffb21a; animation: rv .5s steps(2, jump-none) infinite; } @keyframes rv { 50% { background: #3a2a06; color: #ffb21a; } }
    .spd { position: absolute; left: 10px; bottom: 10px; font: 600 22px/1 "IBM Plex Mono", ui-monospace, monospace; color: #e6f2f7; }
    .spd small { font-size: 8px; color: #8aa0ad; margin-left: 2px; }
    .ic { position: absolute; right: 8px; bottom: 9px; width: 30px; height: 26px; }
    .ic svg { width: 30px; height: 26px; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .bea { opacity: 0; stroke: #ffb21a; } .stage.rev .bea { opacity: 1; animation: rv2 .5s steps(2, jump-none) infinite; } @keyframes rv2 { 50% { opacity: .2; } }
    .wav { position: absolute; right: 8px; top: 8px; width: 30px; height: 26px; opacity: 0; }
    .wav svg { width: 30px; height: 26px; fill: #e6f2f7; stroke: #e6f2f7; stroke-width: 1.6; stroke-linecap: round; }
    .stage.honk .wav { opacity: 1; } .stage.honk .wav .w { animation: wv .35s ease-out infinite; } @keyframes wv { from { opacity: 1; } to { opacity: .2; } }
    .rock { position: relative; width: 46px; height: 92px; border-radius: 9px; padding: 4px; background: #0d0e0f; box-shadow: inset 0 0 0 1px #000, 0 1px 0 rgba(255,255,255,.12); }
    .rk { display: block; position: relative; width: 38px; height: 84px; border: 0; padding: 0; border-radius: 6px; cursor: pointer; transform: perspective(160px) rotateX(var(--rx, 0deg)); transition: transform .1s;
      background: linear-gradient(var(--g1, #3e4246), #24272a 50%, var(--g2, #3e4246)); box-shadow: inset 0 1px 0 rgba(255,255,255,.18), inset 0 -1px 0 rgba(0,0,0,.6); }
    .rk svg { position: absolute; left: 9px; width: 20px; height: 20px; fill: #e9ecee; }
    .rk .a1 { top: 8px; } .rk .a2 { bottom: 8px; } .rk i { position: absolute; left: 13px; top: 39px; font: 800 9px/1 "DM Sans", Inter, Arial, sans-serif; font-style: normal; color: #8b9298; }
    .rk:focus-visible, .horn:focus-visible { outline: 2px solid #39e06c; outline-offset: 3px; }
    .horn { width: 56px; height: 56px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; display: grid; place-items: center;
      background: radial-gradient(circle at 48% 34%, #4b4f53, #1d2023 60%, #0b0c0d); box-shadow: 0 0 0 4px #121314, 0 0 0 5px #44494d, 0 4px 6px rgba(0,0,0,.6), inset 0 1px 1px rgba(255,255,255,.25); transition: transform .05s; }
    .horn svg { width: 26px; height: 26px; fill: #e9ecee; stroke: #e9ecee; stroke-width: 1; stroke-linejoin: round; }
    .horn.down { transform: scale(.94); box-shadow: 0 0 0 4px #121314, 0 0 0 5px #44494d, inset 0 2px 4px rgba(0,0,0,.6); }
  `,
  html: `
    <div class="stage">
      <div class="disp" aria-live="polite"><div class="dirs"><b class="f">F</b><b class="n on">N</b><b class="r">R</b></div>
        <span class="spd">0.0<small>km/h</small></span>
        <span class="ic"><svg viewBox="0 0 30 26" class="bea"><path d="M9 22h12M11 22v-8a4 4 0 0 1 8 0v8"/><path d="M15 4v3M6 8l2 2M24 8l-2 2M3 15h3M27 15h-3"/></svg></span>
        <span class="wav"><svg viewBox="0 0 30 26"><path d="M2 10h4l7-4.5v15L6 16H2z"/><path class="w" fill="none" d="M17 9a5 5 0 0 1 0 8M20.5 6a9 9 0 0 1 0 14M24 3a13 13 0 0 1 0 20"/></svg></span></div>
      <div class="rock"><button class="rk" type="button" role="slider" aria-label="Direction" aria-valuemin="-1" aria-valuemax="1" aria-valuenow="0" aria-valuetext="Neutral">
        <svg class="a1" viewBox="0 0 24 24"><path d="M12 3l8 10h-5v8H9v-8H4z"/></svg><i>N</i><svg class="a2" viewBox="0 0 24 24"><path d="M12 21l8-10h-5V3H9v8H4z"/></svg></button></div>
      <button class="horn" type="button" aria-label="Horn"><svg viewBox="0 0 24 24" aria-hidden="true">${HORN}</svg></button>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), rk = root.querySelector('.rk'), horn = root.querySelector('.horn'), spd = root.querySelector('.spd');
    const d = { f: root.querySelector('.dirs .f'), n: root.querySelector('.dirs .n'), r: root.querySelector('.dirs .r') };
    let dir = 0;
    const set = (v) => {
      dir = v; rk.style.setProperty('--rx', v === 1 ? '-14deg' : v === -1 ? '14deg' : '0deg');
      rk.style.setProperty('--g1', v === 1 ? '#2a2d30' : '#3e4246'); rk.style.setProperty('--g2', v === -1 ? '#2a2d30' : '#3e4246');
      d.f.classList.toggle('on', v === 1); d.n.classList.toggle('on', v === 0); d.r.classList.toggle('on', v === -1);
      stage.classList.toggle('rev', v === -1); rk.setAttribute('aria-valuenow', v); rk.setAttribute('aria-valuetext', ['Reverse', 'Neutral', 'Forward'][v + 1]);
      spd.firstChild.textContent = v ? (v > 0 ? '8.5' : '4.0') : '0.0';
    };
    rk.addEventListener('click', (e) => {
      if (e.detail === 0) return set(dir === 1 ? 0 : 1);
      const r = rk.getBoundingClientRect(), y = (e.clientY - r.top) / r.height; set(y < 0.38 ? 1 : y > 0.62 ? -1 : 0);
    });
    rk.addEventListener('keydown', (e) => { const v = e.key === 'ArrowUp' ? 1 : e.key === 'ArrowDown' ? -1 : null; if (v !== null) { e.preventDefault(); set(Math.max(-1, Math.min(1, dir + v))); } });
    const hon = () => { horn.classList.add('down'); stage.classList.add('honk'); }, hoff = () => { horn.classList.remove('down'); stage.classList.remove('honk'); };
    horn.addEventListener('pointerdown', (e) => { horn.setPointerCapture(e.pointerId); hon(); });
    horn.addEventListener('pointerup', hoff); horn.addEventListener('pointercancel', hoff); horn.addEventListener('lostpointercapture', hoff);
    horn.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); hon(); } });
    horn.addEventListener('keyup', hoff); horn.addEventListener('blur', hoff);
  },
};
