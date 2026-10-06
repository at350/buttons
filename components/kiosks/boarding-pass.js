export default {
  id: 'ks-boarding-pass',
  credit: 'Airport common-use check-in kiosk (SITA CUSS) — "Print boarding pass"; the thermal pass feeds up out of the printer slot, tap it to take it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; padding: 12px 14px 0; border-radius: 12px; overflow: hidden; background: linear-gradient(#e9ecef, #c3c8ce); font-family: Inter, system-ui, sans-serif; }
    .scr { width: 270px; padding: 14px; border-radius: 6px; background: linear-gradient(#0a3d91, #062a66); box-shadow: 0 0 0 6px #1b1d21; color: #fff; text-align: center; }
    .scr .top { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 11px; color: #aac4ef; }
    .scr .top svg { width: 14px; height: 14px; }
    .scr h3 { margin: 6px 0 2px; font-size: 16px; font-weight: 700; }
    .scr p { margin: 0 0 12px; font-size: 11px; color: #c8d7f2; }
    .pr { width: 100%; height: 44px; border: 0; border-radius: 22px; background: #fff; color: #0a3d91; font: 700 14px/1 Inter, sans-serif; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: background .12s, transform .06s; }
    .pr svg { width: 18px; height: 18px; }
    .pr:hover { background: #e6eeff; } .pr:active { transform: scale(.98); }
    .pr:focus-visible { outline: 3px solid #ffc400; outline-offset: 2px; }
    .pr:disabled { cursor: default; opacity: .75; }
    .slotw { position: relative; width: 240px; height: 122px; margin-top: 12px; padding: 0 10px; border-radius: 10px 10px 0 0; background: linear-gradient(#b3b9c1, #d3d8de); box-shadow: inset 0 2px 4px rgba(0,0,0,.18); }
    .slotw::before { content: 'BOARDING PASS'; position: absolute; left: 0; right: 0; top: 104px; text-align: center; font: 700 7px/1 Inter, sans-serif; letter-spacing: .2em; color: #6b737d; }
    .feed { position: absolute; left: 10px; right: 10px; top: 0; height: 95px; overflow: hidden; }
    .pass { position: absolute; left: 25px; top: 96px; width: 170px; height: 112px; padding: 8px 10px; background: #fbfaf6; box-shadow: 0 0 0 1px #ddd; font: 600 8.5px/1.3 'IBM Plex Mono', ui-monospace, monospace; color: #222; text-align: left; transition: transform 1.4s steps(14); cursor: pointer; border: 0; }
    .pass:focus-visible { outline: 2px solid #0a3d91; outline-offset: -2px; }
    .pass .rt { display: flex; justify-content: space-between; font: 800 15px/1 Inter, sans-serif; margin: 2px 0 4px; }
    .pass .g { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px 6px; }
    .pass .g i { font-style: normal; color: #777; font-size: 7px; display: block; }
    .bar { height: 16px; margin-top: 6px; background: repeating-linear-gradient(90deg, #111 0 1px, transparent 1px 3px, #111 3px 5px, transparent 5px 6px, #111 6px 7px, transparent 7px 9px); }
    .stage.out .pass { transform: translateY(-90px); }
    .stage.taken .pass { transition: transform .35s ease-in, opacity .35s; transform: translateY(-140px); opacity: 0; }
    .mouth { position: absolute; left: 20px; right: 20px; top: 92px; height: 10px; border-radius: 5px; background: #111; box-shadow: inset 0 3px 3px #000, 0 1px 0 #fff; }
    .led { position: absolute; left: 50%; top: 113px; width: 26px; height: 4px; margin-left: -13px; border-radius: 2px; background: #3c4a3e; }
    .stage.out .led { background: #3cff6a; box-shadow: 0 0 8px rgba(60,255,106,.8); animation: blink .6s steps(1) infinite; }
    @keyframes blink { 50% { background: #3c4a3e; box-shadow: none; } }
  `,
  html: `
    <div class="stage">
      <div class="scr">
        <div class="top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>ORD → SFO · Seat 23C</div>
        <h3>You're checked in</h3>
        <p>1 passenger · 0 bags</p>
        <button class="pr" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg><span>Print boarding pass</span></button>
      </div>
      <div class="slotw">
        <div class="feed"><button class="pass" type="button" aria-label="Take boarding pass" tabindex="-1">
          BOARDING PASS · ZONE 3<div class="rt"><span>ORD</span><span>SFO</span></div>
          <div class="g"><span><i>FLIGHT</i>1542</span><span><i>GATE</i>B12</span><span><i>SEAT</i>23C</span><span><i>BOARDS</i>7:45A</span><span><i>DATE</i>05OCT</span><span><i>SEQ</i>087</span></div>
          <div class="bar"></div>
        </button></div>
        <div class="mouth"></div><div class="led"></div>
      </div>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), pr = root.querySelector('.pr'), lab = pr.querySelector('span'), pass = root.querySelector('.pass');
    let t;
    pr.addEventListener('click', () => {
      st.classList.remove('taken'); st.classList.add('out'); pr.disabled = true; lab.textContent = 'Printing…'; pass.tabIndex = 0;
      t = setTimeout(() => { lab.textContent = 'Take your boarding pass'; }, 1400);
    });
    pass.addEventListener('click', () => {
      if (!st.classList.contains('out')) return;
      clearTimeout(t); st.classList.add('taken'); pass.tabIndex = -1;
      t = setTimeout(() => { pass.style.transition = 'none'; st.classList.remove('out', 'taken'); void pass.offsetWidth; pass.style.transition = ''; pr.disabled = false; lab.textContent = 'Print again'; }, 400);
    });
    return () => clearTimeout(t);
  },
};
