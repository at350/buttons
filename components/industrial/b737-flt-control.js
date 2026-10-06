// Boeing 737NG overhead FLT CONTROL panel: two 3-position bat switches (STBY RUD / OFF / ON) under
// red spring-loaded guards that hold them in ON, amber Korry LOW PRESSURE annunciators above each
// and the STBY RUD ON light. Lift a guard, then click the upper/lower half of the bat (or ↑/↓);
// closing the guard snaps the switch back to ON. Hold a Korry to press-to-test it.
const POS = ['STBY RUD', 'OFF', 'ON'];
const col = (s) => `<div class="col" data-s="${s}">
  <button class="korry lp" type="button" aria-label="Low pressure ${s} press to test"><b>LOW<br>PRESSURE</b></button>
  <span class="ab">${s}</span>
  <div class="sw-area">
    <span class="mk m0">STBY<br>RUD</span><span class="mk m1">OFF</span><span class="mk m2">ON</span>
    <div class="nut"></div>
    <button class="sw" type="button" tabindex="-1" role="slider" aria-label="Flight control ${s}" aria-valuemin="0" aria-valuemax="2" aria-valuenow="2" aria-valuetext="ON"><span class="bat"></span></button>
    <button class="guard" type="button" aria-expanded="false" aria-label="Guard ${s}"></button><i class="hinge"></i>
  </div></div>`;
export default {
  id: 'nd-b737-flt-control',
  credit: 'Boeing 737NG overhead FLT CONTROL panel — red-guarded 3-position A/B switches, amber Korry LOW PRESSURE and STBY RUD ON annunciators',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 10px; border-radius: 12px; overflow: hidden; background: #2a2f33; }
    .panel { position: relative; display: flex; gap: 6px; padding: 8px 12px 10px; border-radius: 3px; width: 246px;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.035) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #6c7880, #58636b);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.18), inset 0 -1px 0 rgba(0,0,0,.4); font-family: "Roboto Flex", "DM Sans", Arial, sans-serif; font-variation-settings: "wdth" 85; }
    .head { position: absolute; left: 0; right: 0; top: 6px; text-align: center; font-weight: 700; font-size: 8px; letter-spacing: 1.2px; color: #f2f4f5; }
    .head::before, .head::after { content: ''; display: inline-block; width: 52px; height: 1px; background: #f2f4f5; vertical-align: middle; margin: 0 6px; }
    .col { position: relative; width: 70px; padding-top: 16px; display: flex; flex-direction: column; align-items: center; }
    .mid { width: 58px; padding-top: 16px; display: flex; flex-direction: column; align-items: center; }
    .korry { width: 54px; height: 30px; border: 0; padding: 0; border-radius: 2px; cursor: pointer; background: #121314;
      box-shadow: inset 0 0 0 2px #2b2e30, inset 0 0 0 3px #090a0a, 0 1px 0 rgba(255,255,255,.2); }
    .korry b { display: block; font-weight: 700; font-size: 7.5px; line-height: 1.12; letter-spacing: .4px; color: #2c2a24; transition: color .05s, text-shadow .05s; }
    .korry.on b, .korry.test b { color: #ffb21e; text-shadow: 0 0 4px rgba(255,170,20,.8); }
    .korry:focus-visible, .guard:focus-visible, .sw:focus-visible { outline: 2px solid #9fd0ff; outline-offset: 2px; }
    .ab { margin-top: 5px; font-weight: 800; font-size: 11px; color: #f2f4f5; }
    .sw-area { position: relative; width: 70px; height: 92px; }
    .mk { position: absolute; left: 49px; font-weight: 700; font-size: 6.5px; line-height: 1.05; color: #f2f4f5; }
    .mk.m0 { top: 4px; } .mk.m1 { top: 40px; } .mk.m2 { top: 76px; }
    .nut { position: absolute; left: 13px; top: 33px; width: 26px; height: 26px; background: radial-gradient(circle, #121315 0 26%, #8f959b 29%, #eef0f2 40%, #9aa0a6 62%, #5f656b 100%);
      clip-path: polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%); }
    .sw { position: absolute; left: 12px; top: 6px; width: 28px; height: 80px; border: 0; padding: 0; background: transparent; cursor: pointer; }
    .bat { position: absolute; left: 50%; top: 40px; width: 9px; height: 30px; margin-left: -4.5px; border-radius: 4px 4px 3px 3px; transform-origin: 50% 0;
      background: linear-gradient(90deg, #6b7076, #f4f6f7 38%, #b9bdc2 62%, #5d6268); box-shadow: 0 3px 3px rgba(0,0,0,.6); transition: transform .1s cubic-bezier(.6,0,.3,1.5); }
    .bat::before { content: ''; position: absolute; left: -1px; right: -1px; bottom: -1px; height: 10px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #fff, #b7bcc1 55%, #60656b); }
    .sw[aria-valuenow="1"] .bat { transform: scaleY(.3); } .sw[aria-valuenow="0"] .bat { transform: scaleY(-1); }
    .hinge { position: absolute; left: 4px; top: 2px; width: 44px; height: 8px; border-radius: 4px; z-index: 3; background: linear-gradient(#f2f3f4, #9aa0a6 55%, #5e636a); box-shadow: 0 1px 2px rgba(0,0,0,.6); }
    .guard { position: absolute; left: 6px; top: 6px; width: 40px; height: 82px; border: 0; padding: 0; cursor: pointer; z-index: 2; border-radius: 4px 4px 8px 8px; transform-origin: 50% 0;
      background: linear-gradient(90deg, #7c0b0d, #d81e1b 18%, #f0352f 40%, #c51714 70%, #6d090b);
      box-shadow: 0 4px 6px rgba(0,0,0,.55), inset 0 -3px 0 rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.3); transition: transform .3s cubic-bezier(.3,1.25,.5,1); }
    .guard::after { content: ''; position: absolute; inset: 0; border-radius: inherit; opacity: 0; transition: opacity 0s .1s;
      background: linear-gradient(90deg, #4a0607, #8f100f 20%, #6d0b0b 80%, #3e0505); box-shadow: inset 0 0 0 3px #b51713, inset 0 6px 8px rgba(0,0,0,.6); }
    .guard[aria-expanded="true"] { transform: scaleY(-0.22); }
    .guard[aria-expanded="true"]::after { opacity: 1; }
    .sru { margin-top: 20px; } .sru b { font-size: 7px; }
  `,
  html: `
    <div class="stage"><div class="panel"><span class="head">FLT CONTROL</span>
      ${col('A')}
      <div class="mid"><button class="korry sru" type="button" aria-label="Standby rudder on press to test"><b>STBY<br>RUD ON</b></button></div>
      ${col('B')}
    </div></div>`,
  init(root) {
    const cols = [...root.querySelectorAll('.col')], sru = root.querySelector('.sru');
    const state = cols.map(() => 2);
    const sync = () => {
      cols.forEach((c, i) => {
        const sw = c.querySelector('.sw'); sw.setAttribute('aria-valuenow', state[i]); sw.setAttribute('aria-valuetext', POS[state[i]]);
        c.querySelector('.lp').classList.toggle('on', state[i] !== 2);
      });
      sru.classList.toggle('on', state.includes(0));
    };
    cols.forEach((c, i) => {
      const g = c.querySelector('.guard'), sw = c.querySelector('.sw');
      g.addEventListener('click', () => {
        const open = g.getAttribute('aria-expanded') !== 'true';
        g.setAttribute('aria-expanded', open); sw.tabIndex = open ? 0 : -1;
        if (!open) state[i] = 2; sync();
      });
      sw.addEventListener('click', (e) => {
        const r = sw.getBoundingClientRect(), up = e.detail === 0 ? state[i] === 2 : e.clientY < r.top + r.height / 2;
        state[i] = Math.max(0, Math.min(2, state[i] + (up ? -1 : 1))); sync();
      });
      sw.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0;
        if (d) { e.preventDefault(); state[i] = Math.max(0, Math.min(2, state[i] + d)); sync(); }
      });
    });
    for (const k of root.querySelectorAll('.korry')) {
      const on = () => k.classList.add('test'), off = () => k.classList.remove('test');
      k.addEventListener('pointerdown', on); k.addEventListener('pointerup', off); k.addEventListener('pointerleave', off); k.addEventListener('pointercancel', off);
      k.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') on(); }); k.addEventListener('keyup', off); k.addEventListener('blur', off);
    }
    sync();
  },
};
