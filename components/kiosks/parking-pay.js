export default {
  id: 'ks-parking-pay',
  credit: 'Parking garage pay station (Amano / Flowbird) — insert your ticket, the amount due comes up, hit the big green PAY and the ticket returns stamped paid',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; gap: 12px; align-items: center; padding: 16px; border-radius: 12px; background: linear-gradient(#41464d, #24282d); font-family: Inter, system-ui, sans-serif; }
    .col { display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .scr { width: 140px; height: 74px; padding: 8px; border-radius: 4px; background: linear-gradient(#0b1220, #050a14); box-shadow: 0 0 0 4px #0a0b0d, inset 0 0 0 1px #222; color: #e8f1ff; text-align: center; font-size: 11px; display: flex; flex-direction: column; justify-content: center; gap: 3px; }
    .scr b { font: 700 20px/1 'JetBrains Mono', ui-monospace, monospace; color: #7dff9a; font-variant-numeric: tabular-nums; }
    .scr small { font-size: 9.5px; color: #9fb0c8; }
    .pay { position: relative; width: 84px; height: 84px; border: 0; border-radius: 50%; cursor: pointer; font: 900 20px/1 Inter, sans-serif; letter-spacing: .04em; color: #fff;
      background: radial-gradient(circle at 50% 35%, #5be36f, #1fa83a 60%, #127526); box-shadow: 0 0 0 6px #b8bcc2, 0 0 0 8px #6b7077, 0 6px 0 8px #2b2e33; transition: transform .06s, box-shadow .06s, filter .2s; -webkit-tap-highlight-color: transparent; }
    .pay:active { transform: translateY(4px); box-shadow: 0 0 0 6px #b8bcc2, 0 0 0 8px #6b7077, 0 2px 0 8px #2b2e33; }
    .pay:focus-visible { outline: 2px solid #fff; outline-offset: 12px; }
    .pay:disabled { filter: grayscale(.85) brightness(.6); cursor: default; }
    .stage.due .pay { animation: glow 1s ease-in-out infinite; }
    @keyframes glow { 50% { box-shadow: 0 0 0 6px #b8bcc2, 0 0 0 8px #6b7077, 0 6px 0 8px #2b2e33, 0 0 22px 10px rgba(80,230,110,.55); } }
    .slotb { position: relative; width: 120px; height: 92px; border: 0; padding: 0; background: none; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .slotb:focus-visible { outline: 2px solid #fff; outline-offset: 2px; border-radius: 6px; }
    .feed { position: absolute; left: 0; right: 0; top: 0; height: 64px; overflow: hidden; }
    .tk { position: absolute; left: 22px; top: 6px; width: 76px; height: 64px; border-radius: 3px 3px 0 0; padding: 6px; background: #fdfcf6; text-align: left; font: 700 8px/1.3 'IBM Plex Mono', monospace; color: #333; transition: transform .7s cubic-bezier(.45,.05,.3,1); }
    .tk::after { content: ''; display: block; margin-top: 4px; height: 6px; background: #1a1a1a; }
    .tk .stamp { position: absolute; right: 4px; bottom: 6px; padding: 1px 4px; border: 1.5px solid #d0021b; color: #d0021b; font-size: 9px; transform: rotate(-12deg); opacity: 0; }
    .stage.in .tk { transform: translateY(66px); }
    .stage.paid .tk .stamp { opacity: 1; }
    .face { position: absolute; left: 0; right: 0; bottom: 0; height: 30px; border-radius: 6px; background: linear-gradient(#6a7078, #3c4148); box-shadow: inset 0 1px 0 rgba(255,255,255,.25); }
    .face::before { content: ''; position: absolute; left: 14px; right: 14px; top: 0; height: 6px; border-radius: 0 0 3px 3px; background: #050505; }
    .face::after { content: ''; position: absolute; left: 50%; bottom: 7px; width: 30px; height: 5px; margin-left: -15px; border-radius: 3px; background: #2bd94b; box-shadow: 0 0 6px #2bd94b; animation: bl 1s steps(1) infinite; }
    .stage.in:not(.paid) .face::after { animation: none; background: #1f3322; box-shadow: none; }
    @keyframes bl { 50% { background: #1f3322; box-shadow: none; } }
  `,
  html: `
    <div class="stage">
      <div class="col">
        <div class="scr" aria-live="polite"><span class="a">Insert ticket</span><b class="b">$0.00</b><small class="c">Card · Cash · Tap</small></div>
        <button class="slotb" type="button" aria-label="Insert ticket"><span class="feed"><span class="tk">P2 · 08:42<br>05 OCT 26<br>#0047193<span class="stamp">PAID</span></span></span><span class="face"></span></button>
      </div>
      <button class="pay" type="button" disabled>PAY</button>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), pay = root.querySelector('.pay'), slot = root.querySelector('.slotb');
    const [a, b, c] = ['.a', '.b', '.c'].map((s) => root.querySelector(s));
    let t;
    const show = (x, y, z) => { a.textContent = x; b.textContent = y; c.textContent = z; };
    slot.addEventListener('click', () => {
      clearTimeout(t);
      if (st.classList.contains('paid')) { st.classList.remove('paid', 'in', 'due'); pay.disabled = true; slot.setAttribute('aria-label', 'Insert ticket'); return show('Insert ticket', '$0.00', 'Card · Cash · Tap'); }
      if (st.classList.contains('in')) return;
      st.classList.add('in'); show('Reading…', '$0.00', '');
      t = setTimeout(() => { st.classList.add('due'); pay.disabled = false; show('Amount due', '$12.00', 'Parked 2 h 14 min'); }, 750);
    });
    pay.addEventListener('click', () => {
      st.classList.remove('due'); pay.disabled = true; show('Processing…', '$12.00', '');
      t = setTimeout(() => { st.classList.add('paid'); st.classList.remove('in'); slot.setAttribute('aria-label', 'Take ticket'); show('Paid · Thank you', '$0.00', 'Exit within 15 min'); }, 900);
    });
    return () => clearTimeout(t);
  },
};
