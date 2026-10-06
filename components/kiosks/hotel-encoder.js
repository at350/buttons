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
    .card { position: absolute; left: 32px; top: 6px; width: 106px; height: 130px; border-radius: 6px; background: linear-gradient(150deg, #fdfcf8, #ece6d6); box-shadow: 0 0 0 1px #d6ceb8;
      display: flex; flex-direction: column; align-items: center; padding-top: 12px; transition: transform .45s cubic-bezier(.45,.05,.3,1); }
    .card svg { width: 26px; height: 26px; color: #9a7b3c; }
    .card b { margin-top: 5px; font: 600 11px/1 'Playfair Display', Georgia, serif; letter-spacing: .14em; color: #6b5427; }
    .card i { margin-top: 3px; font: 500 7px/1 Inter, sans-serif; letter-spacing: .2em; color: #a89466; font-style: normal; }
    .stage.in .card { transform: translateY(48px); }
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
        <span class="well"><span class="card"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/></svg><b>THE ASTOR</b><i>KEY CARD</i></span></span>
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
