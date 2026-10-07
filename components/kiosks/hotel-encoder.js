export default {
  id: 'ks-hotel-encoder',
  credit: 'Hotel front-desk key-card encoder (VingCard / Onity) — drop the blank card in the slot, the amber light blinks while it writes, green when the key is ready',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 24px 16px; border-radius: 12px; background: linear-gradient(#6b4a33, #3e2a1d); box-shadow: inset 0 1px 0 rgba(255,255,255,.15); }
    .enc { position: relative; width: 170px; height: 178px; border: 0; padding: 0; background: none; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .enc:focus-visible { outline: 2px solid #ffcf6b; outline-offset: 3px; border-radius: 10px; }
    .well { position: absolute; left: 0; right: 0; top: 0; height: 92px; overflow: hidden; }
    .card { position: absolute; left: 53px; top: 4px; width: 64px; height: 101px; border-radius: 4px; overflow: hidden;
      background: radial-gradient(ellipse at 30% 0%, rgba(255,255,255,.14), transparent 60%), linear-gradient(160deg, #1f3157, #121d36); box-shadow: inset 0 0 0 1px rgba(255,255,255,.12), 0 1px 2px rgba(0,0,0,.4);
      display: flex; flex-direction: column; align-items: center; padding-top: 12px; transition: transform .45s cubic-bezier(.45,.05,.3,1); }
    .card svg { width: 30px; height: 30px; }
    .card b { margin-top: 6px; font: 600 8.5px/1.15 'Playfair Display', Georgia, serif; letter-spacing: .16em; color: #e2c784; text-align: center; }
    .card i { margin-top: 4px; width: 26px; height: 1px; background: #b8995a; }
    .card s { position: absolute; left: 0; right: 0; bottom: 14px; text-decoration: none; text-align: center; font: 600 4.5px/1 Inter, sans-serif; letter-spacing: .3em; color: #8d93a6; }
    .stage.in .card { transform: translateY(46px); }
    .box { position: absolute; left: 0; right: 0; bottom: 0; height: 92px; border-radius: 10px 10px 14px 14px; background: linear-gradient(#34373c, #18191c); box-shadow: 0 6px 12px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.18); }
    .box::before { content: ''; position: absolute; left: 24px; right: 24px; top: 0; height: 8px; border-radius: 0 0 4px 4px; background: #050505; box-shadow: inset 0 3px 3px #000; }
    .lcd { position: absolute; left: 16px; right: 16px; top: 22px; height: 34px; border-radius: 3px; padding: 4px 6px; background: linear-gradient(#a9c3d6, #8aa9c0); box-shadow: inset 0 2px 3px rgba(0,0,0,.4);
      font: 600 9.5px/1.35 'IBM Plex Mono', ui-monospace, monospace; color: #0f2433; text-align: left; white-space: nowrap; overflow: hidden; }
    .leds { position: absolute; left: 0; right: 0; bottom: 12px; display: flex; justify-content: center; gap: 14px; }
    .leds i { width: 9px; height: 9px; border-radius: 50%; background: #2a2d31; box-shadow: inset 0 1px 1px rgba(0,0,0,.6); }
    .stage.busy .leds .a { animation: am .25s steps(1) infinite; }
    @keyframes am { 50% { background: #ffae00; box-shadow: 0 0 8px #ffae00; } }
    .stage.ok .leds .g { background: #34e05a; box-shadow: 0 0 8px #34e05a; }
    .stage.idle .leds .r { background: #ff3b30; box-shadow: 0 0 6px rgba(255,59,48,.8); }
    .enc:hover .box { filter: brightness(1.15); }
    .stage.ok .lcd { animation: okf .5s ease-out; }
    @keyframes okf { 0% { background: #c9f2cf; } 100% { background: linear-gradient(#a9c3d6, #8aa9c0); } }
    .enc:active .box { transform: translateY(1px); }
  `,
  html: `
    <div class="stage idle">
      <button class="enc" type="button" aria-label="Encode key card">
        <span class="well"><span class="card"><svg viewBox="0 0 30 30" aria-hidden="true"><circle cx="15" cy="15" r="13.5" fill="none" stroke="#e2c784" stroke-width=".8"/><circle cx="15" cy="15" r="11.5" fill="none" stroke="#e2c784" stroke-width=".4"/><text x="15" y="20.2" text-anchor="middle" font-family="Playfair Display, Georgia, serif" font-size="15" font-weight="600" fill="#e2c784">A</text></svg><b>THE<br>ASTOR</b><i></i><s>NEW YORK</s></span></span>
        <span class="box"><span class="lcd"><span class="l1">RM 1214  NEW KEY</span><br><span class="l2">INSERT CARD</span></span><span class="leds"><i class="r"></i><i class="a"></i><i class="g"></i></span></span>
      </button>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), l1 = root.querySelector('.l1'), l2 = root.querySelector('.l2'), b = root.querySelector('.enc');
    let n = 0, t, room = 1214;
    b.addEventListener('click', () => {
      if (st.classList.contains('busy')) return;
      clearTimeout(t);
      if (st.classList.contains('in')) { st.className = 'stage idle'; if (n >= 2) { n = 0; room = 1100 + Math.floor(Math.random() * 900); } l1.textContent = `RM ${room}  ${n ? 'DUPLICATE' : 'NEW KEY'}`; l2.textContent = 'INSERT CARD'; return; }
      st.className = 'stage in busy'; l2.textContent = 'ENCODING...';
      t = setTimeout(() => { n++; st.className = 'stage in ok'; l2.textContent = `KEY ${n} OK · REMOVE`; }, 1100);
    });
    return () => clearTimeout(t);
  },
};
