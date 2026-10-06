export default {
  id: 'ks-turnstile',
  credit: 'Tube ticket gate (TfL) — yellow card-reader disc, green arrow and opening paddles on a good tap, red "Seek assistance" when the balance runs out',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; gap: 14px; align-items: flex-end; padding: 14px 16px; border-radius: 12px; background: linear-gradient(#3c4149, #23272d); font-family: Inter, system-ui, sans-serif; }
    .gate { position: relative; width: 150px; height: 170px; }
    .cab { position: absolute; left: 0; top: 0; width: 70px; height: 170px; border-radius: 8px 8px 2px 2px; background: linear-gradient(90deg, #9aa0a8, #e3e6ea 45%, #a6acb4); box-shadow: inset 0 1px 0 #fff, 0 4px 8px rgba(0,0,0,.4); }
    .disp { position: absolute; left: 8px; top: 10px; width: 54px; height: 50px; border-radius: 4px; background: #08090b; display: grid; place-items: center; box-shadow: inset 0 0 0 2px #2a2d33; }
    .disp svg { grid-area: 1 / 1; width: 34px; height: 34px; transition: opacity .15s; }
    .disp .go { color: #2bd94b; filter: drop-shadow(0 0 4px rgba(43,217,75,.8)); opacity: 0; }
    .disp .no { color: #ff2a1f; filter: drop-shadow(0 0 4px rgba(255,42,31,.8)); opacity: 0; }
    .disp .idle { color: #2bd94b; opacity: .9; width: 22px; height: 22px; }
    .stage.go .disp .go, .stage.no .disp .no { opacity: 1; }
    .stage.go .disp .idle, .stage.no .disp .idle { opacity: 0; }
    .pad { position: absolute; left: 70px; top: 74px; width: 66px; height: 56px; transform-origin: 0 50%; border-radius: 0 28px 28px 0; background: linear-gradient(#e2231a, #b5170f); box-shadow: inset 0 0 0 2px rgba(255,255,255,.25); transition: transform .45s cubic-bezier(.3,1.3,.5,1); }
    .stage.go .pad { transform: perspective(200px) rotateY(-80deg); }
    .reader { position: absolute; left: 6px; top: 76px; width: 58px; height: 58px; border: 0; padding: 0; border-radius: 50%; cursor: pointer;
      background: radial-gradient(circle at 50% 40%, #ffe66b, #ffd200 55%, #d4a800); box-shadow: 0 0 0 3px #3a3d42, 0 3px 6px rgba(0,0,0,.5), inset 0 2px 2px rgba(255,255,255,.6);
      display: grid; place-items: center; color: #1a1a1a; transition: transform .08s; -webkit-tap-highlight-color: transparent; }
    .reader svg { width: 30px; height: 30px; }
    .reader:hover { filter: brightness(1.06); }
    .reader:active { transform: scale(.94); }
    .reader:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
    .info { width: 112px; height: 92px; border-radius: 4px; padding: 8px; background: #08090b; color: #ffb000; font: 600 10px/1.35 'IBM Plex Mono', ui-monospace, monospace; box-shadow: inset 0 0 0 2px #2a2d33; }
    .info b { display: block; font-size: 15px; font-variant-numeric: tabular-nums; }
    .stage.no .info { color: #ff4b3e; }
  `,
  html: `
    <div class="stage">
      <div class="gate">
        <div class="cab">
          <div class="disp" aria-hidden="true">
            <svg class="idle" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>
            <svg class="go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
            <svg class="no" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </div>
          <button class="reader" type="button" aria-label="Touch in"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8.32a7.43 7.43 0 0 1 0 7.36"/><path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58"/><path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8"/><path d="M16.37 2a20.16 20.16 0 0 1 0 20"/></svg></button>
        </div>
        <div class="pad"></div>
      </div>
      <div class="info" aria-live="polite"><span class="l1">Touch in</span><b class="l2">£8.70</b><span class="l3">Balance</span></div>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), l1 = root.querySelector('.l1'), l2 = root.querySelector('.l2'), l3 = root.querySelector('.l3');
    let bal = 8.7, t;
    root.querySelector('.reader').addEventListener('click', () => {
      clearTimeout(t); st.classList.remove('go', 'no');
      if (bal < 2.9) { st.classList.add('no'); l1.textContent = 'Seek'; l2.textContent = 'assistance'; l3.textContent = 'Top up: £' + bal.toFixed(2); bal += 20; return; }
      bal -= 2.9; st.classList.add('go'); l1.textContent = 'Fare £2.90'; l2.textContent = '£' + bal.toFixed(2); l3.textContent = 'Balance';
      t = setTimeout(() => st.classList.remove('go'), 2200);
    });
    return () => clearTimeout(t);
  },
};
