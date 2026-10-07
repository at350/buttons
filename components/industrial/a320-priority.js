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
    .tk { position: absolute; left: 58px; top: 11px; width: 24px; height: 15px; border: 0; padding: 0; border-radius: 50% / 60%; cursor: pointer;
      background: radial-gradient(circle at 45% 35%, #ff6656, #d4140f 55%, #7d0606); box-shadow: 0 3px 0 #4a0303, 0 4px 4px rgba(0,0,0,.5), inset 0 1px 1px rgba(255,255,255,.45);
      transform: rotate(-12deg); transition: transform .05s, box-shadow .05s; -webkit-tap-highlight-color: transparent; }
    .tk.down { transform: rotate(-12deg) translateY(2px); box-shadow: 0 1px 0 #4a0303, 0 1px 2px rgba(0,0,0,.5), inset 0 1px 1px rgba(255,255,255,.3); }
    .tk:focus-visible { outline: 2px solid #9fd0ff; outline-offset: 3px; }
    .latch { position: absolute; left: 92px; top: 16px; width: 6px; height: 6px; border-radius: 50%; background: #20271f; transition: background .1s; }
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
          <defs>
            <linearGradient id="grip" x1="0" x2="1"><stop offset="0" stop-color="#4a5056"/><stop offset=".22" stop-color="#2c3034"/><stop offset=".7" stop-color="#1b1d20"/><stop offset="1" stop-color="#0f1012"/></linearGradient>
            <linearGradient id="head" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#53595f"/><stop offset="1" stop-color="#25282b"/></linearGradient>
            <radialGradient id="boot" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#2a2d30"/><stop offset="1" stop-color="#0c0d0e"/></radialGradient>
          </defs>
          <!-- console cutout and rubber gaiter -->
          <rect x="30" y="86" width="96" height="26" rx="5" fill="#3b4650"/><rect x="33" y="89" width="90" height="24" rx="4" fill="#1a1d20"/>
          <ellipse cx="78" cy="102" rx="40" ry="11" fill="url(#boot)"/>
          <ellipse cx="78" cy="99" rx="31" ry="8" fill="none" stroke="#33373b" stroke-width="1.4"/>
          <ellipse cx="78" cy="96.5" rx="23" ry="6" fill="none" stroke="#35393d" stroke-width="1.4"/>
          <ellipse cx="78" cy="94.5" rx="17" ry="4.5" fill="#141618" stroke="#383c40" stroke-width="1.2"/>
          <!-- grip: leans aft, palm swell on the left, finger grooves on the front -->
          <path d="M66 96C65 84 62 72 59 60C55 46 52 32 55 22C58 12 70 6 84 8C97 10 104 19 103 31C102 41 98 48 97 56C96 66 95 76 93 86L92 96Z" fill="url(#grip)"/>
          <path d="M86 58q7 3 11-1M86 67q7 3 10.5-1M85 76q7 3 9.5-1" fill="none" stroke="#3c4146" stroke-width="1.3" stroke-linecap="round"/><path d="M86 59.5q7 3 11-1M86 68.5q7 3 10.5-1M85 77.5q7 3 9.5-1" fill="none" stroke="#060708" stroke-width="1" stroke-linecap="round"/>
          <path d="M60 60C56 46 53 32 56 22" fill="none" stroke="#6a7177" stroke-width="1.3" stroke-linecap="round" opacity=".7"/>
          <!-- head with hand rest -->
          <path d="M55 24C56 14 68 7 84 8C98 9 104 18 103 28C96 22 86 20 76 20C66 20 59 22 55 24Z" fill="url(#head)"/>
          <!-- radio PTT trigger on the front -->
          <path d="M101 32c7 0 11 6 9 12c-1 3-4 4-7 3l-4-2z" fill="#121315" stroke="#2f3337" stroke-width="1"/>
          <!-- seam -->
          <path d="M62 70c10 3 24 3 34 0" fill="none" stroke="#3a3e42" stroke-width="1"/>
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
