// Boeing 737 landing gear lever and gear position lights. Drag the wheel-shaped knob between UP,
// OFF and DN (or ↑/↓). Moving it UP or DN puts the red in-transit lights on for the travel time,
// then three greens (down and locked) or all lights out (up and locked). OFF leaves the gear as is.
const LBL = ['LEFT<br>GEAR', 'NOSE<br>GEAR', 'RIGHT<br>GEAR'];
const cells = (cls) => `<div class="row ${cls}">${LBL.map((l, i) => `<span class="lt${i === 1 ? ' nose' : ''}"><b>${l}</b></span>`).join('')}</div>`;
export default {
  id: 'nd-b737-gear',
  credit: 'Boeing 737 landing gear lever (wheel knob, UP / OFF / DN) with red in-transit and green down-and-locked gear lights',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; align-items: center; gap: 16px; padding: 12px 16px; border-radius: 12px; overflow: hidden; user-select: none; -webkit-user-select: none;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.035) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #6c7880, #58636b); box-shadow: inset 0 1px 0 rgba(255,255,255,.18);
      font-family: "Roboto Flex", "DM Sans", Arial, sans-serif; font-variation-settings: "wdth" 85; }
    .lights { display: flex; flex-direction: column; gap: 10px; }
    .row { display: flex; gap: 4px; align-items: flex-end; }
    .lt { width: 36px; height: 26px; display: grid; place-items: center; border-radius: 2px; background: #121314; box-shadow: inset 0 0 0 2px #2b2e30, 0 1px 0 rgba(255,255,255,.2); }
    .lt.nose { transform: translateY(-6px); }
    .lt b { font-weight: 700; font-size: 6.5px; line-height: 1.1; letter-spacing: .3px; color: #2a2b26; text-align: center; }
    .red.on .lt b { color: #ff3324; text-shadow: 0 0 4px rgba(255,50,30,.85); }
    .grn.on .lt b { color: #3df05a; text-shadow: 0 0 4px rgba(60,240,90,.85); }
    .lev { position: relative; width: 88px; height: 144px; }
    .slot { position: absolute; left: 24px; top: 10px; width: 10px; height: 122px; border-radius: 5px; background: #0d0e0f; box-shadow: inset 0 2px 3px #000, 0 1px 0 rgba(255,255,255,.2); }
    .mk { position: absolute; left: 64px; font-weight: 800; font-size: 9px; color: #f2f4f5; letter-spacing: .5px; }
    .mk.u { top: 12px; } .mk.o { top: 66px; } .mk.d { top: 120px; }
    .knob { position: absolute; left: 0; top: 0; width: 58px; height: 26px; border: 0; padding: 0; background: transparent; cursor: grab; touch-action: none;
      transform: translateY(var(--y, 108px)); transition: transform .18s cubic-bezier(.3,1.3,.5,1); }
    .knob.drag { transition: none; cursor: grabbing; }
    .knob::before { content: ''; position: absolute; left: 26px; top: 12px; width: 6px; height: 10px; background: linear-gradient(90deg, #6d7277, #e9ecee, #7d8287); }
    .knob i { position: absolute; left: 2px; top: 0; width: 54px; height: 22px; border-radius: 11px / 50%;
      background: repeating-linear-gradient(90deg, rgba(0,0,0,.14) 0 2px, transparent 2px 6px), linear-gradient(#ffffff, #dfe2e4 45%, #b9bec2);
      box-shadow: 0 4px 5px rgba(0,0,0,.5), inset 0 -3px 4px rgba(0,0,0,.18), inset 0 1px 0 #fff; }
    .knob:focus-visible i { outline: 2px solid #9fd0ff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="lights">${cells('red')}${cells('grn on')}</div>
      <div class="lev"><div class="slot"></div><span class="mk u">UP</span><span class="mk o">OFF</span><span class="mk d">DN</span>
        <button class="knob" type="button" role="slider" aria-label="Landing gear" aria-valuemin="0" aria-valuemax="2" aria-valuenow="2" aria-valuetext="DN"><i></i></button></div>
    </div>`,
  init(root) {
    const knob = root.querySelector('.knob'), red = root.querySelector('.red'), grn = root.querySelector('.grn');
    const Y = [2, 55, 108], NAMES = ['UP', 'OFF', 'DN'];
    let pos = 2, gear = 'down', t = 0, drag = null;
    const place = (y) => knob.style.setProperty('--y', y + 'px');
    const set = (p) => {
      p = Math.max(0, Math.min(2, p)); const changed = p !== pos; pos = p; place(Y[p]);
      knob.setAttribute('aria-valuenow', p); knob.setAttribute('aria-valuetext', NAMES[p]);
      if (!changed || p === 1) return;
      const want = p === 0 ? 'up' : 'down'; if (gear === want) return;
      clearTimeout(t); gear = 'transit'; red.classList.add('on'); grn.classList.remove('on');
      t = setTimeout(() => { gear = want; red.classList.remove('on'); grn.classList.toggle('on', want === 'down'); }, want === 'up' ? 2600 : 3200);
    };
    knob.addEventListener('pointerdown', (e) => { drag = { y0: e.clientY, k0: Y[pos], moved: false }; knob.setPointerCapture(e.pointerId); knob.classList.add('drag'); });
    knob.addEventListener('pointermove', (e) => {
      if (!drag) return; const dy = e.clientY - drag.y0; if (Math.abs(dy) > 3) drag.moved = true;
      place(Math.max(Y[0], Math.min(Y[2], drag.k0 + dy)));
    });
    const end = (e) => {
      if (!drag) return; knob.classList.remove('drag');
      const y = Math.max(Y[0], Math.min(Y[2], drag.k0 + (e.clientY - drag.y0)));
      const p = drag.moved ? Y.reduce((b, v, i) => (Math.abs(v - y) < Math.abs(Y[b] - y) ? i : b), 0) : (pos === 2 ? 0 : 2);
      drag = null; place(Y[pos]); set(p);
    };
    knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', () => { drag = null; knob.classList.remove('drag'); place(Y[pos]); });
    knob.addEventListener('click', (e) => { if (e.detail === 0) set(pos === 2 ? 0 : 2); });
    knob.addEventListener('keydown', (e) => { const d = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0; if (d) { e.preventDefault(); set(pos + d); } });
    return () => clearTimeout(t);
  },
};
