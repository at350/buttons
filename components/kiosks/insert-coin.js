export default {
  id: 'ks-insert-coin',
  credit: 'Arcade cabinet coin door (Happ) — blinking "INSERT COIN" attract text, two lit 25¢ coin mechs, credit counter and a 1P START button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 12px; padding: 14px 18px 16px; border-radius: 12px; background: #0b0b10; font-family: Unbounded, Inter, sans-serif; }
    .crt { position: relative; width: 220px; height: 74px; border-radius: 10px / 14px; overflow: hidden; background: radial-gradient(ellipse, #12122a, #050510 80%); box-shadow: 0 0 0 4px #222, inset 0 0 18px rgba(0,0,0,.9); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }
    .crt::after { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(0,0,0,.35) 0 1px, transparent 1px 3px); pointer-events: none; }
    .msg { font-size: 15px; font-weight: 800; letter-spacing: .08em; color: #ffde00; text-shadow: 0 0 8px rgba(255,222,0,.7), 2px 2px 0 #c2185b; animation: bl 1s steps(1) infinite; white-space: nowrap; }
    .msg.p2 { color: #3cf2ff; text-shadow: 0 0 8px rgba(60,242,255,.7), 2px 2px 0 #3949ab; }
    .msg.go { animation: none; color: #7dff6b; text-shadow: 0 0 8px rgba(125,255,107,.7), 2px 2px 0 #1b5e20; }
    @keyframes bl { 50% { opacity: 0; } }
    .cr { font-size: 9px; font-weight: 600; letter-spacing: .14em; color: #fff; }
    .door { display: flex; gap: 14px; padding: 12px 16px; border-radius: 6px; background: linear-gradient(#2c2d31, #17181b); box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 3px 6px rgba(0,0,0,.6); }
    .mech { position: relative; display: flex; flex-direction: column; align-items: center; gap: 6px; width: 54px; height: 92px; border: 0; padding: 8px 0 0; border-radius: 4px; cursor: pointer; background: linear-gradient(#3c3e43, #24262a); box-shadow: inset 0 0 0 1px #4b4e54; -webkit-tap-highlight-color: transparent; }
    .mech:focus-visible { outline: 2px solid #ffde00; outline-offset: 2px; }
    .lens { width: 38px; height: 38px; border-radius: 4px; display: grid; place-items: center; font: 800 12px/1 Unbounded, sans-serif; color: #fff; background: radial-gradient(circle at 50% 40%, #ff5a4a, #c9160c 70%); box-shadow: 0 0 10px rgba(255,60,40,.6), inset 0 0 0 2px rgba(0,0,0,.35); transition: filter .1s; }
    .mech:hover .lens { filter: brightness(1.2); }
    .mech:active .lens { filter: brightness(.8); }
    .slot { position: relative; width: 6px; height: 26px; border-radius: 3px; background: #000; box-shadow: inset 0 0 2px #000, 0 0 0 2px #55585e; }
    .well { position: absolute; left: 0; right: 0; top: 50px; height: 34px; overflow: hidden; }
    .coin { position: absolute; left: 50%; top: -30px; width: 22px; height: 22px; margin-left: -11px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff, #c9ccd2 45%, #8a8e96); box-shadow: inset 0 0 0 2px #9da1a8; opacity: 0; }
    .mech.drop .coin { animation: coin .45s ease-in; }
    @keyframes coin { 0% { opacity: 1; transform: translateY(0) scaleX(1); } 60% { opacity: 1; transform: translateY(30px) scaleX(.3); } 100% { opacity: 0; transform: translateY(46px) scaleX(.25); } }
    .start { height: 44px; padding: 0 16px; border: 0; border-radius: 22px; cursor: pointer; font: 800 11px/1 Unbounded, sans-serif; letter-spacing: .06em; color: #fff; background: radial-gradient(circle at 50% 35%, #4d8bff, #1f5fe0 60%, #10398f); box-shadow: 0 0 0 3px #0e0e10, 0 0 0 5px #333, 0 4px 0 5px #222; align-self: center; transition: transform .05s, filter .2s; }
    .start:active { transform: translateY(3px); }
    .start:disabled { filter: grayscale(1) brightness(.5); cursor: default; }
    .start:focus-visible { outline: 2px solid #fff; outline-offset: 7px; }
  `,
  html: `
    <div class="stage">
      <div class="crt" aria-live="polite"><div class="msg">INSERT COIN</div><div class="cr">CREDIT <span class="n">0</span></div></div>
      <div class="door">
        <button class="mech" type="button" aria-label="Insert coin, left"><span class="lens">25¢</span><span class="slot"></span><span class="well"><span class="coin"></span></span></button>
        <button class="mech" type="button" aria-label="Insert coin, right"><span class="lens">25¢</span><span class="slot"></span><span class="well"><span class="coin"></span></span></button>
        <button class="start" type="button" disabled>1P START</button>
      </div>
    </div>`,
  init(root) {
    const msg = root.querySelector('.msg'), n = root.querySelector('.n'), start = root.querySelector('.start');
    let c = 0, t;
    const render = (state) => {
      n.textContent = c; start.disabled = c === 0;
      msg.className = 'msg' + (state === 'go' ? ' go' : c ? ' p2' : '');
      msg.textContent = state === 'go' ? 'PLAYER 1 READY' : c ? 'PRESS START' : 'INSERT COIN';
    };
    root.querySelectorAll('.mech').forEach((m) => m.addEventListener('click', () => {
      m.classList.remove('drop'); void m.offsetWidth; m.classList.add('drop');
      clearTimeout(t); t = setTimeout(() => { c = Math.min(99, c + 1); render(); }, 380);
    }));
    start.addEventListener('click', () => { if (!c) return; c--; render('go'); clearTimeout(t); t = setTimeout(() => render(), 1600); });
    return () => clearTimeout(t);
  },
};
