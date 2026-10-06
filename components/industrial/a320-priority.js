// Airbus A320 sidestick priority: the red takeover pushbutton on the captain's sidestick and the
// glareshield SIDE STICK PRIORITY lights. Holding the button gives the captain priority: green CAPT
// lights in front of the captain (the F/O's stick is deflected) and the red arrow lights in front of
// the F/O, pointing at the pilot in command. Hold it 3 s (40 s on the aircraft) to latch; press again
// to release the latch.
export default {
  id: 'nd-a320-priority',
  credit: 'Airbus A320 sidestick takeover pushbutton with glareshield SIDE STICK PRIORITY lights — green CAPT, red arrow on the F/O side; hold to latch',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 10px; padding: 12px 14px 0; border-radius: 12px; overflow: hidden;
      background: linear-gradient(180deg, #2b2f33 0 54px, #56636f 54px); box-shadow: inset 0 1px 0 rgba(255,255,255,.1); }
    .gs { display: flex; gap: 42px; }
    .unit { display: flex; gap: 3px; padding: 4px; border-radius: 3px; background: #4d5a66; box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 1px 2px #000; }
    .lt { width: 34px; height: 30px; display: grid; place-items: center; border-radius: 2px; background: #111314; box-shadow: inset 0 0 0 2px #26292b; }
    .lt b { font: 700 9px/1 "Roboto Flex", "DM Sans", Arial, sans-serif; font-variation-settings: "wdth" 85; letter-spacing: .5px; color: #20271f; }
    .lt svg { width: 22px; height: 14px; fill: #2a1414; }
    .lt.on b { color: #38f05a; text-shadow: 0 0 5px rgba(56,240,90,.8); }
    .lt.on svg { fill: #ff2a1a; filter: drop-shadow(0 0 3px rgba(255,40,20,.8)); }
    .cap { font: 700 7px/1 "Roboto Flex", "DM Sans", Arial, sans-serif; letter-spacing: .8px; color: #dfe5ea; text-align: center; margin-top: 3px; }
    .stick { position: relative; width: 150px; height: 112px; }
    .stick svg { position: absolute; left: 0; top: 0; width: 150px; height: 112px; }
    .tk { position: absolute; left: 52px; top: 14px; width: 26px; height: 18px; border: 0; padding: 0; border-radius: 50% / 60%; cursor: pointer;
      background: radial-gradient(circle at 45% 35%, #ff6656, #d4140f 55%, #7d0606); box-shadow: 0 3px 0 #4a0303, 0 4px 4px rgba(0,0,0,.5), inset 0 1px 1px rgba(255,255,255,.45);
      transform: rotate(-12deg); transition: transform .05s, box-shadow .05s; -webkit-tap-highlight-color: transparent; }
    .tk.down { transform: rotate(-12deg) translateY(2px); box-shadow: 0 1px 0 #4a0303, 0 1px 2px rgba(0,0,0,.5), inset 0 1px 1px rgba(255,255,255,.3); }
    .tk:focus-visible { outline: 2px solid #9fd0ff; outline-offset: 3px; }
    .latch { position: absolute; left: 82px; top: 18px; width: 6px; height: 6px; border-radius: 50%; background: #20271f; transition: background .1s; }
    .stage.latched .latch { background: #38f05a; box-shadow: 0 0 4px #38f05a; }
  `,
  html: `
    <div class="stage">
      <div class="gs">
        <div><div class="unit"><span class="lt cg"><b>CAPT</b></span><span class="lt"><svg viewBox="0 0 22 14"><path d="M22 7 12 0v4H0v6h12v4z"/></svg></span></div><div class="cap">CAPT</div></div>
        <div><div class="unit"><span class="lt fa"><svg viewBox="0 0 22 14"><path d="M0 7l10-7v4h12v6H10v4z"/></svg></span><span class="lt"><b>F/O</b></span></div><div class="cap">F/O</div></div>
      </div>
      <div class="stick">
        <svg viewBox="0 0 150 112" aria-hidden="true">
          <ellipse cx="78" cy="104" rx="46" ry="10" fill="#2c3238"/><ellipse cx="78" cy="100" rx="30" ry="7" fill="#15181b"/>
          <path d="M60 104C58 80 52 62 50 44C48 26 54 12 70 10C88 8 98 18 100 30C102 44 96 54 94 70C92 84 94 96 96 104Z" fill="#26292c"/>
          <path d="M60 104C58 80 52 62 50 44C48 26 54 12 70 10" fill="none" stroke="#4a4f54" stroke-width="2"/>
          <path d="M98 40c8 2 10 10 6 16l-8-2z" fill="#1a1c1e"/>
          <path d="M56 58c10 4 26 4 36 0" fill="none" stroke="#3a3e42" stroke-width="1.4"/>
        </svg>
        <button class="tk" type="button" aria-pressed="false" aria-label="Sidestick takeover pushbutton"></button><span class="latch"></span>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), tk = root.querySelector('.tk'), cg = root.querySelector('.cg'), fa = root.querySelector('.fa');
    let held = false, latched = false, t = 0, wasLatched = false;
    const sync = () => {
      const pr = held || latched;
      cg.classList.toggle('on', pr); fa.classList.toggle('on', pr); tk.classList.toggle('down', held);
      tk.setAttribute('aria-pressed', pr); stage.classList.toggle('latched', latched);
    };
    const down = () => { if (held) return; held = true; wasLatched = latched; latched = false; clearTimeout(t); if (!wasLatched) t = setTimeout(() => { latched = true; sync(); }, 3000); sync(); };
    const up = () => { if (!held) return; held = false; clearTimeout(t); sync(); };
    tk.addEventListener('pointerdown', (e) => { tk.setPointerCapture(e.pointerId); down(); });
    tk.addEventListener('pointerup', up); tk.addEventListener('pointercancel', up); tk.addEventListener('lostpointercapture', up);
    tk.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); down(); } });
    tk.addEventListener('keyup', up); tk.addEventListener('blur', up);
    return () => clearTimeout(t);
  },
};
