// Two-stage X-ray exposure handswitch (dead-man) with the generator console lamps. Press and hold
// the thumb button = stage 1 PREP (anode rotor spins up, READY after 1.4 s); push it further down
// (drag down, or Enter while holding Space) = stage 2 EXPOSE, only once READY. Letting go at any
// point aborts. The X-RAY lamp carries the ISO 361 trefoil.
const TRE = [0, 120, 240].map((r) => {
  const p = (a, rad) => { const t = (a - 90) * Math.PI / 180; return `${(rad * Math.cos(t)).toFixed(2)} ${(rad * Math.sin(t)).toFixed(2)}`; };
  return `<path transform="rotate(${r})" d="M${p(-30, 2.4)}L${p(-30, 8)}A8 8 0 0 1 ${p(30, 8)}L${p(30, 2.4)}A2.4 2.4 0 0 0 ${p(-30, 2.4)}Z"/>`;
}).join('') + '<circle r="1.6"/>';
export default {
  id: 'nd-xray-handswitch',
  credit: 'Two-stage X-ray exposure handswitch — hold for PREP (rotor up, READY), push through for EXPOSE; dead-man release aborts. ISO 361 trefoil lamp',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; align-items: center; gap: 18px; padding: 10px 18px 0; border-radius: 12px; overflow: hidden; user-select: none; -webkit-user-select: none;
      background: linear-gradient(170deg, #e9e8e3, #cfcdc6); box-shadow: inset 0 1px 0 #fff; }
    .hs { position: relative; width: 50px; height: 176px; }
    .hs > svg { position: absolute; left: 0; top: 0; width: 50px; height: 176px; overflow: visible; }
    .grip { position: absolute; left: 6px; top: 22px; width: 38px; height: 120px; border-radius: 16px 16px 12px 12px;
      background: linear-gradient(90deg, #a7aaa9, #f4f4f1 35%, #dcdcd7 65%, #9d9f9e); box-shadow: 0 3px 5px rgba(0,0,0,.3), inset 0 0 0 1px rgba(0,0,0,.12); }
    .grip::after { content: ''; position: absolute; left: 14px; bottom: -14px; width: 10px; height: 16px; border-radius: 0 0 4px 4px; background: linear-gradient(90deg, #444, #888, #444); }
    .well { position: absolute; left: 11px; top: 16px; width: 28px; height: 34px; border-radius: 12px 12px 6px 6px; background: #3b3d3e; box-shadow: inset 0 2px 4px #000; }
    .btn { position: absolute; left: 13px; top: 8px; width: 24px; height: 30px; border: 0; padding: 0; border-radius: 11px 11px 5px 5px; cursor: pointer; touch-action: none; outline: none;
      background: linear-gradient(90deg, #0d4d8a, #3f8fdc 40%, #2a72bd 65%, #0b3f74); box-shadow: 0 4px 0 #082d55, 0 5px 4px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.35);
      transform: translateY(calc(var(--t, 0) * 12px)); transition: transform .08s; }
    .btn:focus-visible { box-shadow: 0 4px 0 #082d55, 0 0 0 2px #fff, 0 0 0 4px #0b63ce; }
    .ticks { position: absolute; left: 44px; top: 10px; width: 6px; height: 32px; border-left: 1.5px solid #6c6f70; }
    .ticks i { position: absolute; left: 0; width: 5px; height: 1.5px; background: #6c6f70; } .ticks i:nth-child(1) { top: 0; } .ticks i:nth-child(2) { top: 14px; } .ticks i:nth-child(3) { top: 30px; }
    .con { display: flex; flex-direction: column; gap: 8px; padding: 10px; border-radius: 8px; background: linear-gradient(#3a3f43, #26292c); box-shadow: inset 0 1px 0 rgba(255,255,255,.12); }
    .rd { display: flex; gap: 8px; padding: 5px 7px; border-radius: 3px; background: #0b0d0e; font: 600 13px/1 "IBM Plex Mono", ui-monospace, monospace; color: #ff9a1f; text-shadow: 0 0 5px rgba(255,140,20,.6); }
    .rd small { font-size: 7px; color: #b07020; margin-left: 2px; }
    .lamps { display: flex; gap: 10px; }
    .lp { display: flex; flex-direction: column; align-items: center; gap: 4px; font: 700 6.5px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .6px; color: #c7cbce; }
    .lp span { width: 28px; height: 28px; border-radius: 5px; display: grid; place-items: center; background: #1b1d1f; box-shadow: inset 0 0 0 2px #4c5155, inset 0 2px 4px #000; transition: background .08s, box-shadow .08s; }
    .lp svg { width: 18px; height: 18px; fill: #4a4d4f; stroke: #4a4d4f; }
    .pr.on span { background: radial-gradient(circle, #ffd27a, #ff9800); box-shadow: inset 0 0 0 2px #4c5155, 0 0 10px rgba(255,160,30,.7); }
    .pr.on svg { fill: none; stroke: #3a2000; animation: rot .35s linear infinite; } @keyframes rot { to { transform: rotate(360deg); } }
    .pr svg { fill: none; }
    .ry.on span { background: radial-gradient(circle, #b6ffc8, #20c050); box-shadow: inset 0 0 0 2px #4c5155, 0 0 10px rgba(40,220,90,.7); }
    .ry.on svg { fill: #0a3a18; stroke: #0a3a18; }
    .xr.on span { background: radial-gradient(circle, #fff7b0, #ffd400); box-shadow: inset 0 0 0 2px #4c5155, 0 0 16px 4px rgba(255,220,0,.85); }
    .xr.on svg { fill: #1a1400; stroke: none; } .xr svg { stroke: none; }
  `,
  html: `
    <div class="stage">
      <div class="hs"><svg viewBox="0 0 50 176" aria-hidden="true"><defs><linearGradient id="hg" x1="0" x2="1"><stop offset="0" stop-color="#9d9f9e"/><stop offset=".3" stop-color="#f4f4f1"/><stop offset=".6" stop-color="#dcdcd7"/><stop offset="1" stop-color="#8f9190"/></linearGradient></defs>
          <path d="M18.0 150.0c0 2.6 14 2.6 14 0" fill="none" stroke="#2f3133" stroke-width="2.2"/><path d="M18.0 150.0c0-2.2 14-2.2 14 0" fill="none" stroke="#55585b" stroke-width="1.6"/><path d="M19.6 154.4c0 2.6 14 2.6 14 0" fill="none" stroke="#2f3133" stroke-width="2.2"/><path d="M19.6 154.4c0-2.2 14-2.2 14 0" fill="none" stroke="#55585b" stroke-width="1.6"/><path d="M21.2 158.8c0 2.6 14 2.6 14 0" fill="none" stroke="#2f3133" stroke-width="2.2"/><path d="M21.2 158.8c0-2.2 14-2.2 14 0" fill="none" stroke="#55585b" stroke-width="1.6"/><path d="M22.8 163.2c0 2.6 14 2.6 14 0" fill="none" stroke="#2f3133" stroke-width="2.2"/><path d="M22.8 163.2c0-2.2 14-2.2 14 0" fill="none" stroke="#55585b" stroke-width="1.6"/><path d="M24.4 167.6c0 2.6 14 2.6 14 0" fill="none" stroke="#2f3133" stroke-width="2.2"/><path d="M24.4 167.6c0-2.2 14-2.2 14 0" fill="none" stroke="#55585b" stroke-width="1.6"/><path d="M26.0 172.0c0 2.6 14 2.6 14 0" fill="none" stroke="#2f3133" stroke-width="2.2"/><path d="M26.0 172.0c0-2.2 14-2.2 14 0" fill="none" stroke="#55585b" stroke-width="1.6"/><path d="M27.6 176.4c0 2.6 14 2.6 14 0" fill="none" stroke="#2f3133" stroke-width="2.2"/><path d="M27.6 176.4c0-2.2 14-2.2 14 0" fill="none" stroke="#55585b" stroke-width="1.6"/>
          <rect x="19.5" y="136" width="11" height="16" rx="2" fill="#3a3c3e"/><path d="M19.5 140h11M19.5 144h11M19.5 148h11" stroke="#555" stroke-width="1"/>
          <path d="M7 40C7 28 13 21 25 21S43 28 43 40V56c-4 3-4 8 0 11-4 3-4 8 0 11-4 3-4 8 0 11-4 3-4 8 0 11L41 128c0 7-7 11-16 11S9 135 9 128Z" fill="url(#hg)" stroke="rgba(0,0,0,.18)"/>
          <path d="M11 44c0-10 5-16 12-17" fill="none" stroke="#fff" stroke-width="1.5" opacity=".8" stroke-linecap="round"/>
          <ellipse cx="25" cy="118" rx="9" ry="3.5" fill="none" stroke="#b8bab8" stroke-width="1"/>
        </svg><div class="well"></div><div class="ticks"><i></i><i></i><i></i></div>
        <button class="btn" type="button" aria-label="Exposure handswitch: hold for prep, push further to expose"></button></div>
      <div class="con">
        <div class="rd"><span>81<small>kV</small></span><span>16<small>mAs</small></span><span class="n">000<small>EXP</small></span></div>
        <div class="lamps">
          <div class="lp pr"><span><svg viewBox="-10 -10 20 20"><circle r="7" stroke-width="2"/><path d="M0-7v14M-7 0h14" stroke-width="1.6"/></svg></span>PREP</div>
          <div class="lp ry"><span><svg viewBox="-10 -10 20 20"><path d="M-6 0l4 4 8-9" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>READY</div>
          <div class="lp xr"><span><svg viewBox="-10 -10 20 20">${TRE}</svg></span>X-RAY</div>
        </div>
      </div>
    </div>`,
  init(root) {
    const btn = root.querySelector('.btn'), pr = root.querySelector('.pr'), ry = root.querySelector('.ry'), xr = root.querySelector('.xr'), n = root.querySelector('.n');
    let stage = 0, ready = false, done = false, y0 = 0, count = 0, tP = 0, tX = 0, held = false;
    const draw = (t) => { btn.style.setProperty('--t', t); pr.classList.toggle('on', stage >= 1 && !done); ry.classList.toggle('on', ready && !done); };
    const prep = () => { if (stage) return; stage = 1; ready = false; done = false; tP = setTimeout(() => { ready = true; draw(0.5); }, 1400); draw(0.5); };
    const expose = () => {
      if (stage !== 1 || !ready || done) return; stage = 2; xr.classList.add('on'); draw(1);
      tX = setTimeout(() => { xr.classList.remove('on'); done = true; count++; n.firstChild.textContent = String(count % 1000).padStart(3, '0'); draw(1); }, 380);
    };
    const abort = () => { clearTimeout(tP); clearTimeout(tX); stage = 0; ready = false; done = false; held = false; xr.classList.remove('on'); draw(0); };
    btn.addEventListener('pointerdown', (e) => { btn.setPointerCapture(e.pointerId); y0 = e.clientY; held = true; prep(); });
    btn.addEventListener('pointermove', (e) => { if (!held) return; const t = Math.max(0.5, Math.min(1, 0.5 + (e.clientY - y0) / 24)); if (stage === 1 && !done) btn.style.setProperty('--t', t); if (t >= 0.95) expose(); });
    btn.addEventListener('pointerup', abort); btn.addEventListener('pointercancel', abort); btn.addEventListener('lostpointercapture', () => { if (held) abort(); });
    btn.addEventListener('keydown', (e) => {
      if (e.key === ' ' && !e.repeat) { e.preventDefault(); held = true; prep(); }
      if (e.key === 'Enter') { e.preventDefault(); if (stage) expose(); }
    });
    btn.addEventListener('keyup', (e) => { if (e.key === ' ') abort(); });
    btn.addEventListener('blur', abort);
    return () => { clearTimeout(tP); clearTimeout(tX); };
  },
};
