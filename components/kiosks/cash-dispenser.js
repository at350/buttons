export default {
  id: 'ks-cash-dispenser',
  credit: 'ATM cash dispenser — the shutter rolls up behind flashing guide lights and presents a fan of $20s; take the cash and it shuts',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 8px; padding: 14px 22px 16px; border-radius: 12px; background: linear-gradient(#c9c6bd, #a29e94); box-shadow: inset 0 1px 0 rgba(255,255,255,.6); }
    .lbl { display: flex; align-items: center; gap: 6px; font: 700 10px/1 Inter, system-ui, sans-serif; letter-spacing: .1em; color: #2d2d2d; }
    .lbl svg { width: 20px; height: 20px; }
    .disp { position: relative; display: block; width: 230px; height: 118px; border: 0; padding: 0; background: none; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .disp:focus-visible { outline: 2px solid #1d4fb8; outline-offset: 3px; border-radius: 10px; }
    .out { position: absolute; left: 0; right: 0; top: 0; height: 76px; overflow: hidden; }
    .bill { position: absolute; left: 50%; bottom: -70px; width: 150px; height: 66px; margin-left: -75px; border-radius: 2px;
      background: linear-gradient(90deg, #c9d6c0, #e9eedf 30%, #dfe7d4 70%, #b9c9ae); box-shadow: 0 0 0 1px #8ea385 inset, 0 -1px 3px rgba(0,0,0,.25);
      transition: transform .55s cubic-bezier(.2,.8,.2,1); }
    .bill::before { content: '20'; position: absolute; left: 8px; top: 5px; font: 800 13px/1 Georgia, serif; color: #3f5a3a; }
    .bill::after { content: ''; position: absolute; left: 58px; top: 10px; width: 34px; height: 44px; border-radius: 50%; background: radial-gradient(#9fb394, #c4d1b9 70%); box-shadow: 0 0 0 1px #8ea385; }
    .bill:nth-child(2) { transition-delay: .06s; } .bill:nth-child(3) { transition-delay: .12s; }
    .fascia { position: absolute; left: 0; right: 0; bottom: 4px; height: 48px; border-radius: 10px; background: linear-gradient(#5b5d61, #2a2b2e 60%, #1a1b1d); box-shadow: 0 4px 0 #6f6c64, 0 6px 8px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.25); }
    .mouth { position: absolute; left: 22px; right: 22px; top: 8px; height: 20px; border-radius: 4px; overflow: hidden; background: #040404; box-shadow: inset 0 3px 5px #000; }
    .shutter { position: absolute; inset: 0; background: repeating-linear-gradient(#77797e 0 3px, #5b5d61 3px 5px); transition: transform .4s ease; }
    .guide { position: absolute; left: 14px; right: 14px; bottom: 8px; height: 6px; border-radius: 3px; background: #1c4a22; }
    .stage.open .shutter { transform: translateY(-100%); }
    .stage.open .guide { animation: blink .5s steps(1) infinite; }
    @keyframes blink { 0%, 49% { background: #3cff6a; box-shadow: 0 0 10px 2px rgba(60,255,106,.7); } 50% { background: #1c4a22; box-shadow: none; } }
    .stage.open.cash .bill:nth-child(1) { transform: translateY(-64px) rotate(-5deg); }
    .stage.open.cash .bill:nth-child(2) { transform: translateY(-68px); }
    .stage.open.cash .bill:nth-child(3) { transform: translateY(-64px) rotate(5deg); }
    .disp:hover .fascia { filter: brightness(1.12); }
  `,
  html: `
    <div class="stage">
      <div class="lbl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>CASH</div>
      <button class="disp" type="button" aria-label="Dispense cash" aria-pressed="false">
        <span class="out"><span class="bill"></span><span class="bill"></span><span class="bill"></span></span>
        <span class="fascia"><span class="mouth"><span class="shutter"></span></span><span class="guide"></span></span>
      </button>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), b = root.querySelector('.disp');
    let t;
    b.addEventListener('click', () => {
      clearTimeout(t);
      if (!st.classList.contains('open')) {
        st.classList.add('open'); b.setAttribute('aria-pressed', 'true'); b.setAttribute('aria-label', 'Take cash');
        t = setTimeout(() => st.classList.add('cash'), 380);
      } else {
        st.classList.remove('cash'); b.setAttribute('aria-pressed', 'false'); b.setAttribute('aria-label', 'Dispense cash');
        t = setTimeout(() => st.classList.remove('open'), 450);
      }
    });
    return () => clearTimeout(t);
  },
};
