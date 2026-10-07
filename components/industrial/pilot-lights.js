// Schneider Harmony XB4 22 mm push-to-test pilot lights (chrome bezel, ribbed LED lens) under ZBY
// legend plates. HIGH TEMP is flashing (unacknowledged alarm): ACK makes it steady, a second ACK
// clears it. Hold any lens to test that lamp; hold LAMP TEST to light the whole cluster.
const lamp = (k, lbl, on) => `<div class="col"><span class="plate">${lbl}</span><button class="pl ${k}${on}" type="button" aria-label="${lbl} lamp test"><span class="lens"></span></button></div>`;
export default {
  id: 'nd-pilot-lights',
  credit: 'Schneider Harmony XB4 push-to-test pilot light cluster — POWER / RUN / HIGH TEMP / FAULT with LAMP TEST and alarm ACK',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-grid; grid-template-columns: repeat(4, 58px); gap: 12px 10px; padding: 14px 16px 16px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 1px 1px, rgba(0,0,0,.05) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #d8dcd8, #c3c8c4);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.7); }
    .col { display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .plate { width: 58px; height: 14px; border-radius: 2px; background: linear-gradient(#2b2d2f, #161718); color: #f3f3f0; white-space: nowrap;
      font: 700 7px/14px "DM Sans", Inter, Arial, sans-serif; letter-spacing: .9px; text-align: center; box-shadow: 0 1px 0 rgba(255,255,255,.6); }
    .pl, .pb { position: relative; width: 40px; height: 40px; border: 0; padding: 0; border-radius: 50%; cursor: pointer; -webkit-tap-highlight-color: transparent;
      background: conic-gradient(from 30deg, #8d9296, #f4f6f7 12%, #a5aaae 26%, #e7eaec 42%, #7d8287 58%, #f0f2f3 72%, #9a9fa3 86%, #8d9296);
      box-shadow: 0 2px 2px rgba(0,0,0,.35), 0 0 0 1px rgba(0,0,0,.25), inset 0 0 0 1px rgba(255,255,255,.5); }
    .pl:focus-visible, .pb:focus-visible { outline: 2px solid #0b63ce; outline-offset: 3px; }
    .lens { position: absolute; inset: 5px; border-radius: 50%; transition: background .08s, box-shadow .08s;
      background: repeating-radial-gradient(circle, rgba(255,255,255,.14) 0 1.2px, rgba(0,0,0,.1) 1.2px 2.4px), radial-gradient(circle at 50% 38%, var(--c2), var(--c1) 62%, var(--c0));
      box-shadow: inset 0 2px 2px rgba(255,255,255,.3), inset 0 -3px 4px rgba(0,0,0,.35), 0 0 0 1px #222; }
    /* a pilot lamp's dark and lit lens are two layers (::before / ::after) and on / test / flash only change their opacity,
       so exactly one look is painted at a time and the flash runs on the compositor (no per-frame style recalc) */
    .pl .lens { background: none; box-shadow: none; }
    .pl .lens::before, .pl .lens::after { content: ''; position: absolute; inset: 0; border-radius: 50%; }
    .pl .lens::before {
      background: repeating-radial-gradient(circle, rgba(255,255,255,.14) 0 1.2px, rgba(0,0,0,.1) 1.2px 2.4px), radial-gradient(circle at 50% 38%, var(--c2), var(--c1) 62%, var(--c0));
      box-shadow: inset 0 2px 2px rgba(255,255,255,.3), inset 0 -3px 4px rgba(0,0,0,.35), 0 0 0 1px #222; }
    .pl .lens::after { opacity: 0; transition: opacity .08s;
      background: repeating-radial-gradient(circle, rgba(255,255,255,.28) 0 1.2px, rgba(255,255,255,0) 1.2px 2.4px), radial-gradient(circle at 50% 46%, #fff 0 10%, var(--l1) 40%, var(--l0) 95%);
      box-shadow: 0 0 0 1px #222, 0 0 12px 3px var(--glow), inset 0 0 6px rgba(255,255,255,.6); }
    .on .lens::after, .pl.test .lens::after, .stage.test .pl .lens::after { opacity: 1; }
    .on .lens::before, .pl.test .lens::before, .stage.test .pl .lens::before { opacity: 0; transition: opacity 0s .08s; }
    .stage.test .pb .lens {
      background: repeating-radial-gradient(circle, rgba(255,255,255,.28) 0 1.2px, rgba(255,255,255,0) 1.2px 2.4px), radial-gradient(circle at 50% 46%, #fff 0 10%, var(--l1) 40%, var(--l0) 95%);
      box-shadow: 0 0 0 1px #222, 0 0 12px 3px var(--glow), inset 0 0 6px rgba(255,255,255,.6); }
    .flash .lens::after { animation: flash .8s steps(2, jump-none) infinite; }
    .flash .lens::before { animation: flash-dark .8s steps(2, jump-none) infinite; }
    .stage.test .flash .lens::after, .pl.flash.test .lens::after, .stage.test .flash .lens::before, .pl.flash.test .lens::before { animation: none; }
    @keyframes flash { 50% { opacity: 0; } }
    @keyframes flash-dark { 50% { opacity: 1; } }
    .w { --c0: #8d8f88; --c1: #c9cbc3; --c2: #eceee6; --l0: #f3ecd0; --l1: #fffdf2; --glow: rgba(255,250,225,.75); }
    .g { --c0: #0a4320; --c1: #177b3a; --c2: #36ad5f; --l0: #10b143; --l1: #6dff96; --glow: rgba(70,255,120,.6); }
    .a { --c0: #6b3a00; --c1: #c27406; --c2: #f0a43a; --l0: #ff9800; --l1: #ffd27a; --glow: rgba(255,170,30,.7); }
    .r { --c0: #560b0b; --c1: #b0171a; --c2: #db4646; --l0: #f2271d; --l1: #ff8a7f; --glow: rgba(255,60,40,.6); }
    .row2 { grid-column: 1 / -1; display: flex; justify-content: flex-end; gap: 34px; padding-right: 9px; }
    .pb .lens { background: radial-gradient(circle at 50% 35%, #4a4c4f, #1a1b1d 65%, #0b0b0c); }
    .pb:active .lens, .pb.down .lens { transform: scale(.93); }
    .pb:hover .lens { filter: brightness(1.2); }
  `,
  html: `
    <div class="stage">
      ${lamp('w', 'POWER', ' on')}${lamp('g', 'RUN', ' on')}${lamp('a', 'HIGH TEMP', ' on flash')}${lamp('r', 'FAULT', '')}
      <div class="row2">
        <div class="col"><span class="plate">LAMP TEST</span><button class="pb test" type="button" aria-label="Lamp test"><span class="lens"></span></button></div>
        <div class="col"><span class="plate">ACK</span><button class="pb ack" type="button" aria-label="Acknowledge"><span class="lens"></span></button></div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), amber = root.querySelector('.pl.a'), ack = root.querySelector('.ack');
    const hold = (el, target) => {
      const on = () => target.classList.add('test'), off = () => target.classList.remove('test');
      el.addEventListener('pointerdown', on); el.addEventListener('pointerup', off); el.addEventListener('pointerleave', off); el.addEventListener('pointercancel', off);
      el.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); on(); } });
      el.addEventListener('keyup', off); el.addEventListener('blur', off);
    };
    for (const pl of root.querySelectorAll('.pl')) hold(pl, pl);
    hold(root.querySelector('.pb.test'), stage);
    const ackIt = () => {
      if (amber.classList.contains('flash')) amber.classList.remove('flash');
      else amber.classList.remove('on');
    };
    ack.addEventListener('click', ackIt);
  },
};
