// Broadcast studio ON AIR: the red lightbox sign over a latching, illuminated MIC LIVE key and a
// momentary COUGH key. Latch MIC LIVE and the sign strikes up (with the little gas-tube flicker);
// hold COUGH to kill the mic feed — the key's tally drops but the sign stays lit.
export default {
  id: 'nd-on-air',
  credit: 'Broadcast studio ON AIR sign driven by a latching illuminated MIC LIVE key, with a momentary COUGH key',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 14px; padding: 16px 18px; border-radius: 12px; overflow: hidden; user-select: none; -webkit-user-select: none;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.03) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #2a2c30, #16171a); }
    .sign { width: 196px; height: 58px; padding: 5px; border-radius: 6px; background: linear-gradient(#55585c, #2c2e31); box-shadow: 0 4px 8px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.2); }
    .face { height: 100%; border-radius: 3px; display: grid; place-items: center; background: linear-gradient(#3a0d0b, #240706); box-shadow: inset 0 2px 6px rgba(0,0,0,.7);
      font: 900 26px/1 "Inter", Arial, sans-serif; letter-spacing: 4px; color: #5c1b16; transition: background .2s, color .2s; }
    .stage.live .face { background: radial-gradient(120% 140% at 50% 50%, #ff3b2b, #d6140b 60%, #a30a05); color: #fff7f0; text-shadow: 0 0 8px rgba(255,220,200,.9), 0 0 2px #fff;
      box-shadow: inset 0 0 14px rgba(255,180,160,.35), 0 0 24px 4px rgba(255,40,20,.45); animation: strike .5s steps(1, end); }
    @keyframes strike { 0% { filter: brightness(.3); } 15% { filter: brightness(1); } 25% { filter: brightness(.45); } 40% { filter: brightness(1.05); } 55% { filter: brightness(.7); } 70%, 100% { filter: none; } }
    .keys { display: flex; gap: 14px; align-items: flex-end; }
    .k { display: flex; flex-direction: column; align-items: center; gap: 6px; }
    .k span { font: 700 7px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: 1px; color: #c9ccd0; }
    .mic, .cough { position: relative; width: 58px; height: 46px; border: 0; padding: 0; border-radius: 5px; cursor: pointer; -webkit-tap-highlight-color: transparent;
      font: 800 9px/1.1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .8px; transition: transform .06s, box-shadow .06s, background .1s; }
    .mic { color: #6e1a14; background: linear-gradient(#5b1712, #3e0e0b); box-shadow: 0 4px 0 #1a0504, 0 5px 6px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.12); }
    .mic[aria-pressed="true"] { transform: translateY(3px); color: #fff; background: radial-gradient(circle at 50% 40%, #ff8a7a, #ff2a1a 55%, #c4120a);
      box-shadow: 0 1px 0 #1a0504, 0 0 16px 3px rgba(255,50,30,.55), inset 0 1px 0 rgba(255,255,255,.4); text-shadow: 0 0 4px rgba(255,255,255,.7); }
    .stage.cough .mic[aria-pressed="true"] { background: linear-gradient(#7a201a, #5a130f); box-shadow: 0 1px 0 #1a0504, inset 0 1px 0 rgba(255,255,255,.12); color: #ff9a8a; text-shadow: none; }
    .cough { width: 46px; color: #d9dcdf; background: linear-gradient(#5d6166, #3c4044); box-shadow: 0 4px 0 #17191b, 0 5px 6px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.2); }
    .cough.down { transform: translateY(3px); box-shadow: 0 1px 0 #17191b, inset 0 1px 0 rgba(255,255,255,.15); }
    .mic:focus-visible, .cough:focus-visible { outline: 2px solid #9fd0ff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="sign" aria-hidden="true"><div class="face">ON AIR</div></div>
      <div class="keys">
        <div class="k"><button class="mic" type="button" aria-pressed="false">MIC<br>LIVE</button><span>MIC 1</span></div>
        <div class="k"><button class="cough" type="button" aria-label="Cough, hold to mute">COUGH</button><span>MIC 1</span></div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), mic = root.querySelector('.mic'), cough = root.querySelector('.cough');
    mic.addEventListener('click', () => {
      const on = mic.getAttribute('aria-pressed') !== 'true';
      mic.setAttribute('aria-pressed', on);
      stage.classList.toggle('live', on);
    });
    const dn = () => { cough.classList.add('down'); stage.classList.add('cough'); }, up = () => { cough.classList.remove('down'); stage.classList.remove('cough'); };
    cough.addEventListener('pointerdown', (e) => { cough.setPointerCapture(e.pointerId); dn(); });
    cough.addEventListener('pointerup', up); cough.addEventListener('pointercancel', up); cough.addEventListener('lostpointercapture', up);
    cough.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); dn(); } });
    cough.addEventListener('keyup', up); cough.addEventListener('blur', up);
  },
};
