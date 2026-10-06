// Eurorack LFO module, 8HP: black anodised panel with white silkscreen, rail screws, a Dailywell
// 2MS mini toggle (ON-OFF-ON: FAST / OFF / SLOW), a bicolour LED and Thonkiconn 3.5 mm jacks. Click
// a jack to patch / unpatch a cable; the LED swings green/red at the LFO rate while the output is
// patched and the toggle is on.
const jack = (k, lbl) => `<div class="jk"><button class="j" type="button" data-k="${k}" aria-pressed="false" aria-label="${lbl} jack"><span class="plug"></span></button><span class="l">${lbl}</span></div>`;
export default {
  id: 'nd-eurorack-lfo',
  credit: 'Eurorack 8HP module — Dailywell 2MS mini toggle (FAST / OFF / SLOW), bicolour LED, Thonkiconn jacks you patch with a cable',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 0 22px; border-radius: 12px; overflow: hidden; background: linear-gradient(90deg, #8d9397, #c9cdd0 12%, #8d9397 24%, #2a2d30 24%, #2a2d30 76%, #8d9397 76%, #c9cdd0 88%, #8d9397); }
    .panel { position: relative; width: 82px; height: 220px; display: flex; flex-direction: column; align-items: center; padding-top: 22px;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.03) 0 .5px, transparent 1px) 0 0 / 2px 2px, linear-gradient(90deg, #141516, #1f2123 50%, #141516); box-shadow: 0 0 0 1px #000; }
    .panel > s { position: absolute; left: 8px; width: 8px; height: 8px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #f2f4f5, #8a9096); }
    .panel > s::after { content: ''; position: absolute; left: 1px; top: 3.5px; width: 6px; height: 1px; background: #3a3e42; }
    .panel > s:first-child { top: 5px; } .panel > s:nth-child(2) { bottom: 5px; }
    .t { font: 800 11px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: 1.5px; color: #f2f2ee; }
    .row { display: flex; align-items: center; gap: 10px; margin-top: 18px; }
    .tg { position: relative; width: 26px; height: 46px; border: 0; padding: 0; background: transparent; cursor: pointer; }
    .tg::before { content: ''; position: absolute; left: 4px; top: 14px; width: 18px; height: 18px; border-radius: 50%; background: radial-gradient(circle, #1a1b1c 0 30%, #c9cdd0 34%, #eef0f1 55%, #8d9397); }
    .bat { position: absolute; left: 10px; top: 22px; width: 6px; height: 20px; margin-top: 0; border-radius: 3px; transform-origin: 50% 1px; transition: transform .08s cubic-bezier(.6,0,.3,1.5);
      background: linear-gradient(90deg, #7d8287, #fbfbfb 40%, #b9bdc2 70%, #6b7075); box-shadow: 0 2px 2px rgba(0,0,0,.6); }
    .tg[data-p="0"] .bat { transform: scaleY(-1); } .tg[data-p="1"] .bat { transform: scaleY(.25); }
    .tg:focus-visible, .j:focus-visible { outline: 2px solid #4cc3ff; outline-offset: 2px; border-radius: 4px; }
    .tl { display: flex; flex-direction: column; justify-content: space-between; height: 46px; font: 700 6.5px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .6px; color: #f2f2ee; }
    .led { width: 9px; height: 9px; border-radius: 50%; background: #2a1c12; box-shadow: inset 0 0 0 1px #000; margin-top: 18px; }
    .panel.run .led { animation: lfo var(--r, 1s) ease-in-out infinite alternate; }
    @keyframes lfo { from { background: #ff2a1a; box-shadow: 0 0 6px #ff2a1a; } 50% { background: #2a1c12; box-shadow: none; } to { background: #3dff6e; box-shadow: 0 0 6px #3dff6e; } }
    .jacks { display: flex; gap: 12px; margin-top: auto; margin-bottom: 26px; }
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
      <div class="row"><button class="tg" type="button" data-p="1" role="slider" aria-label="Rate range" aria-valuemin="0" aria-valuemax="2" aria-valuenow="1" aria-valuetext="OFF"><span class="bat"></span></button>
        <div class="tl"><span>FAST</span><span>OFF</span><span>SLOW</span></div></div>
      <span class="led"></span>
      <div class="jacks">${jack('in', 'FM')}${jack('out', 'OUT')}</div>
    </div></div>`,
  init(root) {
    const panel = root.querySelector('.panel'), tg = root.querySelector('.tg'), out = root.querySelector('.j[data-k="out"]');
    const NAMES = ['FAST', 'OFF', 'SLOW'], RATE = ['.18s', '0s', '1.6s'];
    let p = 1;
    const sync = () => {
      tg.dataset.p = p; tg.setAttribute('aria-valuenow', p); tg.setAttribute('aria-valuetext', NAMES[p]);
      panel.style.setProperty('--r', RATE[p]); panel.classList.toggle('run', p !== 1 && out.getAttribute('aria-pressed') === 'true');
    };
    tg.addEventListener('click', (e) => {
      if (e.detail === 0) p = p === 0 ? 2 : p - 1;
      else { const r = tg.getBoundingClientRect(); p = Math.max(0, Math.min(2, p + (e.clientY < r.top + r.height / 2 ? -1 : 1))); }
      sync();
    });
    tg.addEventListener('keydown', (e) => { const d = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0; if (d) { e.preventDefault(); p = Math.max(0, Math.min(2, p + d)); sync(); } });
    for (const j of root.querySelectorAll('.j')) j.addEventListener('click', () => { j.setAttribute('aria-pressed', j.getAttribute('aria-pressed') !== 'true'); sync(); });
    sync();
  },
};
