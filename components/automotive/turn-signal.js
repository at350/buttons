export default {
  id: 'au-turn-signal',
  credit: 'Turn-signal stalk — flick it up for right, down for left; a half-press gives three lane-change blinks, a full push latches; green tell-tales blink at ~85 per minute',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; max-width: 100%; height: 170px; border-radius: 12px; overflow: hidden; background: linear-gradient(#1d1e21, #0c0c0e); user-select: none; }
    .cl { position: absolute; left: 50%; top: 12px; width: 150px; height: 44px; margin-left: -75px; border-radius: 22px; background: #050608; box-shadow: inset 0 0 0 1px #24282e; display: flex; align-items: center; justify-content: space-between; padding: 0 14px; }
    .tt { width: 30px; height: 26px; fill: #12301c; transition: fill .05s; }
    .tt.r { transform: scaleX(-1); }
    .L .tt.l, .R .tt.r { animation: blink .7s steps(1) infinite; }
    @keyframes blink { 0% { fill: #2bff6a; filter: drop-shadow(0 0 5px rgba(43,255,106,.9)); } 50% { fill: #12301c; filter: none; } }
    .tick { width: 6px; height: 6px; border-radius: 50%; background: #1d2228; }
    .L .tick, .R .tick { animation: tk .35s steps(1) infinite; }
    @keyframes tk { 0% { background: #8a8f96; } 50% { background: #1d2228; } }
    .wheel { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
    .col { position: absolute; left: -24px; top: 92px; width: 70px; height: 56px; border-radius: 0 26px 26px 0; background: linear-gradient(#34353a, #17181b 60%, #0b0b0c); box-shadow: 0 4px 10px rgba(0,0,0,.6); }
    .stalk { position: absolute; left: 34px; top: 110px; width: 210px; height: 20px; transform-origin: 8px 10px; transition: transform .25s cubic-bezier(.3,1.6,.5,1); cursor: ns-resize; touch-action: none; }
    .drag .stalk { transition: none; }
    .rod { position: absolute; left: 0; top: 4px; width: 160px; height: 12px; border-radius: 6px; background: linear-gradient(#4a4b50, #1d1e21 55%, #2c2d31); clip-path: polygon(0 0, 100% 15%, 100% 85%, 0 100%); }
    .end { position: absolute; left: 150px; top: 0; width: 60px; height: 20px; border-radius: 6px 10px 10px 6px; background: linear-gradient(#3e3f44, #141517 60%, #222327); box-shadow: 0 3px 6px rgba(0,0,0,.6); }
    .end::before { content: ''; position: absolute; left: 6px; top: 0; bottom: 0; width: 26px; background: repeating-linear-gradient(90deg, #303136 0 1.5px, #141517 1.5px 3.5px); box-shadow: inset 0 1px 0 rgba(255,255,255,.12); }
    .stalk:focus-visible { outline: 2px solid #2bff6a; outline-offset: 4px; border-radius: 10px; }
    .ar { position: absolute; right: 14px; width: 14px; height: 14px; fill: none; stroke: #3a3d43; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
    .ar.u { top: 74px; } .ar.d { top: 140px; }
  `,
  html: `
    <div class="stage">
      <div class="cl"><svg class="tt l" viewBox="0 0 30 26"><path d="M0 13 13 0v7h17v12H13v7z"/></svg><span class="tick"></span><svg class="tt r" viewBox="0 0 30 26"><path d="M0 13 13 0v7h17v12H13v7z"/></svg></div>
      <svg class="ar u" viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"/></svg><svg class="ar d" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
      <svg class="wheel" viewBox="0 0 280 170" aria-hidden="true"><defs><linearGradient id="au-ts-rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3b40"/><stop offset=".4" stop-color="#1b1c1f"/><stop offset="1" stop-color="#08080a"/></linearGradient></defs>
        <path d="M-40 230C-10 132 70 118 140 118S290 132 320 230L282 230C258 160 204 150 140 150S22 160 -2 230Z" fill="url(#au-ts-rim)"/>
        <path d="M-22 228C4 146 76 133 140 133S276 146 302 228" fill="none" stroke="#55585f" stroke-width="1" stroke-dasharray="3 3" opacity=".6"/>
      </svg>
      <div class="col"></div>
      <div class="stalk" tabindex="0" role="slider" aria-label="Turn signal" aria-valuemin="-1" aria-valuemax="1" aria-valuenow="0" aria-valuetext="off"><span class="rod"></span><span class="end"></span></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), stalk = root.querySelector('.stalk');
    let state = 0, y0 = 0, dy = 0, drag = false, t = 0;
    const FULL = 13, HALF = 6;
    const show = (dir) => { stage.classList.toggle('L', dir < 0); stage.classList.toggle('R', dir > 0); stalk.setAttribute('aria-valuenow', dir); stalk.setAttribute('aria-valuetext', dir > 0 ? 'right' : dir < 0 ? 'left' : 'off'); };
    const rot = (deg) => { stalk.style.transform = `rotate(${deg}deg)`; };
    const latch = (dir) => { clearTimeout(t); state = dir; rot(-dir * FULL); show(dir); };
    const lane = (dir) => { clearTimeout(t); state = 0; rot(0); show(dir); t = setTimeout(() => show(0), 2100); };
    stalk.addEventListener('pointerdown', (e) => { drag = true; y0 = e.clientY; dy = 0; stalk.setPointerCapture(e.pointerId); stage.classList.add('drag'); });
    stalk.addEventListener('pointermove', (e) => {
      if (!drag) return; dy = e.clientY - y0;
      const base = -state * FULL, a = Math.max(-FULL, Math.min(FULL, base + dy * .5));
      rot(state && Math.abs(a - base) < 3 ? base : a);
    });
    const end = () => {
      if (!drag) return; drag = false; stage.classList.remove('drag');
      const a = -state * FULL + dy * .5;
      if (Math.abs(dy) < 3) { if (state) latch(0); else lane(1); return; }
      if (state && Math.sign(dy) === Math.sign(state)) { latch(0); return; }
      if (a <= -FULL + 2) latch(1); else if (a >= FULL - 2) latch(-1);
      else if (a <= -HALF + 2) lane(1); else if (a >= HALF - 2) lane(-1);
      else latch(state);
    };
    stalk.addEventListener('pointerup', end); stalk.addEventListener('pointercancel', end);
    stalk.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); latch(state === -1 ? 0 : 1); }
      if (e.key === 'ArrowDown') { e.preventDefault(); latch(state === 1 ? 0 : -1); }
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lane(1); }
    });
    return () => clearTimeout(t);
  },
};
