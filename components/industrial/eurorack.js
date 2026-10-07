// Eurorack LFO module, 8HP: black anodised panel with white silkscreen, rail screws, a Davies 1900H-style
// RATE knob (drag, wheel or arrow keys) with its scale, a Dailywell
// 2MS mini toggle (ON-OFF-ON: FAST / OFF / SLOW), a bicolour LED and Thonkiconn 3.5 mm jacks. Click
// a jack to patch / unpatch a cable; the LED swings green/red at the LFO rate while the output is
// patched and the toggle is on.
const jack = (k, lbl) => `<div class="jk"><button class="j" type="button" data-k="${k}" aria-pressed="false" aria-label="${lbl} jack"><span class="plug"></span></button><span class="l">${lbl}</span></div>`;
export default {
  id: 'nd-eurorack-lfo',
  credit: 'Eurorack 8HP module — Davies-style RATE knob, Dailywell 2MS mini toggle (FAST / OFF / SLOW), bicolour LED, Thonkiconn jacks you patch with a cable',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 0 22px; border-radius: 12px; overflow: hidden; background: linear-gradient(90deg, #8d9397, #c9cdd0 12%, #8d9397 24%, #2a2d30 24%, #2a2d30 76%, #8d9397 76%, #c9cdd0 88%, #8d9397); }
    .panel { position: relative; width: 82px; height: 262px; display: flex; flex-direction: column; align-items: center; padding-top: 22px;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.03) 0 .5px, transparent 1px) 0 0 / 2px 2px, linear-gradient(90deg, #141516, #1f2123 50%, #141516); box-shadow: 0 0 0 1px #000; }
    .panel > s { position: absolute; left: 8px; width: 8px; height: 8px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #f2f4f5, #8a9096); }
    .panel > s::after { content: ''; position: absolute; left: 1px; top: 3.5px; width: 6px; height: 1px; background: #3a3e42; }
    .panel > s:first-child { top: 5px; } .panel > s:nth-child(2) { bottom: 5px; }
    .t { font: 800 11px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: 1.5px; color: #f2f2ee; }
    .row { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
    .kw { position: relative; width: 62px; height: 58px; margin-top: 8px; }
    .kw svg { position: absolute; inset: 0; width: 62px; height: 58px; }
    .kw .tk { stroke: #f2f2ee; stroke-width: 1; } .kw text { font: 700 5.5px "DM Sans", Inter, Arial, sans-serif; fill: #f2f2ee; text-anchor: middle; letter-spacing: .5px; }
    .knob { position: absolute; left: 15px; top: 9px; width: 32px; height: 32px; border-radius: 50%; border: 0; padding: 0; cursor: grab; touch-action: none;
      background: conic-gradient(from 0deg, #1b1c1d, #2e3032, #1b1c1d, #2e3032, #1b1c1d, #2e3032, #1b1c1d, #2e3032, #1b1c1d, #2e3032, #1b1c1d, #2e3032, #1b1c1d);
      box-shadow: 0 2px 3px rgba(0,0,0,.8), 0 0 0 1px #000; }
    .knob::before { content: ''; position: absolute; inset: 6px; border-radius: 50%; background: radial-gradient(circle at 45% 35%, #3b3e41, #1a1b1c 75%); box-shadow: 0 0 0 1px #0b0b0c, inset 0 1px 0 rgba(255,255,255,.12); }
    .knob .ptr { position: absolute; inset: 0; border-radius: 50%; transform: rotate(var(--a, 0deg)); }
    .knob .ptr::after { content: ''; position: absolute; left: 50%; top: 2px; width: 2px; height: 12px; margin-left: -1px; border-radius: 1px; background: #f2f2ee; }
    .knob:focus-visible { outline: 2px solid #4cc3ff; outline-offset: 2px; }
    .tg { position: relative; width: 26px; height: 46px; border: 0; padding: 0; background: transparent; cursor: pointer; }
    .tg::before { content: ''; position: absolute; left: 4px; top: 14px; width: 18px; height: 18px; border-radius: 50%; background: radial-gradient(circle, #1a1b1c 0 30%, #c9cdd0 34%, #eef0f1 55%, #8d9397); }
    .bat { position: absolute; left: 10px; top: 22px; width: 6px; height: 20px; margin-top: 0; border-radius: 3px; transform-origin: 50% 1px; transition: transform .08s cubic-bezier(.6,0,.3,1.5);
      background: linear-gradient(90deg, #7d8287, #fbfbfb 40%, #b9bdc2 70%, #6b7075); box-shadow: 0 2px 2px rgba(0,0,0,.6); }
    .tg[data-p="0"] .bat { transform: scaleY(-1); } .tg[data-p="1"] .bat { transform: scaleY(.25); }
    .tg:focus-visible, .j:focus-visible { outline: 2px solid #4cc3ff; outline-offset: 2px; border-radius: 4px; }
    .tl { display: flex; flex-direction: column; justify-content: space-between; height: 46px; font: 700 6.5px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .6px; color: #f2f2ee; }
    .led { width: 9px; height: 9px; border-radius: 50%; background: #2a1c12; box-shadow: inset 0 0 0 1px #000; margin-top: 12px; }
    .panel.run .led { animation: lfo var(--r, 1s) ease-in-out infinite alternate; }
    @keyframes lfo { from { background: #ff2a1a; box-shadow: 0 0 6px #ff2a1a; } 50% { background: #2a1c12; box-shadow: none; } to { background: #3dff6e; box-shadow: 0 0 6px #3dff6e; } }
    .jacks { display: flex; gap: 12px; margin-top: auto; margin-bottom: 22px; }
    .jk { display: flex; flex-direction: column-reverse; align-items: center; gap: 5px; }
    .l { font: 700 6.5px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .6px; color: #f2f2ee; }
    .jk:last-child .l { padding: 1px 3px; background: #f2f2ee; color: #141516; border-radius: 1px; }
    .j { position: relative; width: 22px; height: 22px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: radial-gradient(circle, #050505 0 26%, #3c4044 28%, #c9cdd0 34%, #f3f4f5 46%, #9aa0a6 60%, #4a4e52 64%, #1b1d1f 100%); }
    .plug { position: absolute; left: 1px; top: 1px; width: 20px; height: 20px; border-radius: 50%; opacity: 0; transform: scale(.6); transition: transform .12s cubic-bezier(.3,1.6,.5,1), opacity .1s;
      background: radial-gradient(circle at 45% 35%, var(--pc2), var(--pc) 70%); box-shadow: 0 2px 3px rgba(0,0,0,.6); }
    .plug::after { content: ''; position: absolute; left: 6px; top: 16px; width: 8px; height: 70px; border-radius: 4px; background: linear-gradient(90deg, var(--pc), var(--pc2) 50%, var(--pc)); }
    .j[data-k="in"] { --pc: #1b6fd1; --pc2: #63a8ff; } .j[data-k="out"] { --pc: #e0218a; --pc2: #ff7cc3; }
    .j[aria-pressed="true"] .plug { opacity: 1; transform: none; }
  `,
  html: `
    <div class="stage"><div class="panel"><s></s><s></s>
      <span class="t">LFO</span>
      <div class="kw"><svg viewBox="0 0 62 58" aria-hidden="true"><line class="tk" x1="16.9" y1="39.1" x2="14.7" y2="41.3"/><line class="tk" x1="12.0" y1="31.2" x2="9.1" y2="32.1"/><line class="tk" x1="11.2" y1="21.9" x2="8.3" y2="21.4"/><line class="tk" x1="14.8" y1="13.2" x2="12.4" y2="11.5"/><line class="tk" x1="21.9" y1="7.2" x2="20.6" y2="4.5"/><line class="tk" x1="31.0" y1="5.0" x2="31.0" y2="2.0"/><line class="tk" x1="40.1" y1="7.2" x2="41.4" y2="4.5"/><line class="tk" x1="47.2" y1="13.2" x2="49.6" y2="11.5"/><line class="tk" x1="50.8" y1="21.9" x2="53.7" y2="21.4"/><line class="tk" x1="50.0" y1="31.2" x2="52.9" y2="32.1"/><line class="tk" x1="45.1" y1="39.1" x2="47.3" y2="41.3"/><text x="31" y="56">RATE</text></svg>
        <button class="knob" type="button" role="slider" aria-label="Rate" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"><span class="ptr"></span></button></div>
      <div class="row"><button class="tg" type="button" data-p="2" role="slider" aria-label="Rate range" aria-valuemin="0" aria-valuemax="2" aria-valuenow="2" aria-valuetext="SLOW"><span class="bat"></span></button>
        <div class="tl"><span>FAST</span><span>OFF</span><span>SLOW</span></div></div>
      <span class="led"></span>
      <div class="jacks">${jack('in', 'FM')}${jack('out', 'OUT')}</div>
    </div></div>`,
  init(root) {
    const panel = root.querySelector('.panel'), tg = root.querySelector('.tg'), out = root.querySelector('.j[data-k="out"]');
    const NAMES = ['FAST', 'OFF', 'SLOW'], BASE = [0.18, 0, 1.6];
    const knob = root.querySelector('.knob');
    let p = 2, v = 50, drag = null;
    out.setAttribute('aria-pressed', 'true'); // patched and running slow at rest
    const setV = (n) => { v = Math.max(0, Math.min(100, Math.round(n))); knob.style.setProperty('--a', (-135 + v * 2.7) + 'deg'); knob.setAttribute('aria-valuenow', v); sync(); };
    const sync = () => {
      tg.dataset.p = p; tg.setAttribute('aria-valuenow', p); tg.setAttribute('aria-valuetext', NAMES[p]);
      panel.style.setProperty('--r', (BASE[p] * Math.pow(4, (50 - v) / 50)).toFixed(3) + 's'); panel.classList.toggle('run', p !== 1 && out.getAttribute('aria-pressed') === 'true');
    };
    tg.addEventListener('click', (e) => {
      if (e.detail === 0) p = p === 0 ? 2 : p - 1;
      else { const r = tg.getBoundingClientRect(); p = Math.max(0, Math.min(2, p + (e.clientY < r.top + r.height / 2 ? -1 : 1))); }
      sync();
    });
    tg.addEventListener('keydown', (e) => { const d = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0; if (d) { e.preventDefault(); p = Math.max(0, Math.min(2, p + d)); sync(); } });
    for (const j of root.querySelectorAll('.j')) j.addEventListener('click', () => { j.setAttribute('aria-pressed', j.getAttribute('aria-pressed') !== 'true'); sync(); });
    knob.addEventListener('pointerdown', (e) => { drag = { y: e.clientY, v }; knob.setPointerCapture(e.pointerId); });
    knob.addEventListener('pointermove', (e) => { if (drag) setV(drag.v + (drag.y - e.clientY) * 1.2); });
    const end = () => { drag = null; }; knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
    knob.addEventListener('wheel', (e) => { e.preventDefault(); setV(v - Math.sign(e.deltaY) * 5); }, { passive: false });
    knob.addEventListener('keydown', (e) => { const d = { ArrowUp: 5, ArrowRight: 5, ArrowDown: -5, ArrowLeft: -5 }[e.key]; if (d) { e.preventDefault(); setV(v + d); } });
    setV(50);
  },
};
