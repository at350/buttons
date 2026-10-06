const SPRING = 'linear(0, 0.144, 0.433, 0.717, 0.926, 1.046, 1.091, 1.09, 1.066, 1.038, 1.014, 1, 0.992, 0.991, 0.993, 0.995, 0.998, 1, 1.001)';

export default {
  id: 'mo-wallet-sheet',
  credit: 'Family (Benji Taylor) wallet — the "Send" button itself morphs into the confirmation sheet, then back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; height: 220px; max-width: 100%; border-radius: 12px; background: #0a0a0a; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
    .bal { position: absolute; top: 22px; left: 0; right: 0; text-align: center; color: #fff; font-weight: 600; font-size: 28px; letter-spacing: -.03em; transition: opacity .3s, transform .5s ${SPRING}; }
    .bal small { display: block; margin-top: 4px; font-size: 12px; font-weight: 500; color: #7a7a7a; letter-spacing: 0; }
    .stage.open .bal { opacity: 0; transform: translateY(-10px) scale(.96); }
    .card {
      position: absolute; left: 90px; right: 90px; bottom: 18px; height: 44px; border-radius: 22px; background: #fff; color: #0a0a0a;
      border: 0; padding: 0; cursor: pointer; overflow: hidden; text-align: left;
      transition: left .55s ${SPRING}, right .55s ${SPRING}, bottom .55s ${SPRING}, height .55s ${SPRING}, border-radius .55s ${SPRING}, background .3s;
    }
    .card:hover { background: #f2f2f2; }
    .card:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .stage.open .card { left: 10px; right: 10px; bottom: 10px; height: 160px; border-radius: 22px; background: #fff; cursor: default; }
    .lbl { position: absolute; inset: 0; display: grid; place-items: center; font-weight: 600; font-size: 14px; transition: opacity .2s, transform .4s ${SPRING}; }
    .stage.open .lbl { opacity: 0; transform: translateY(-14px); pointer-events: none; }
    .sheet { position: absolute; inset: 0; padding: 18px 18px 14px; display: flex; flex-direction: column; gap: 6px; opacity: 0; pointer-events: none; }
    .stage.open .sheet { opacity: 1; pointer-events: auto; }
    .row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #6b6b6b; font-weight: 500; opacity: 0; transform: translateY(10px); transition: opacity .3s, transform .5s ${SPRING}; }
    .row b { color: #0a0a0a; font-weight: 600; }
    .row .amt { font-size: 20px; letter-spacing: -.02em; }
    .stage.open .row { opacity: 1; transform: none; }
    .stage.open .row:nth-child(1) { transition-delay: .12s; } .stage.open .row:nth-child(2) { transition-delay: .18s; } .stage.open .acts { transition-delay: .24s; }
    .acts { margin-top: auto; display: flex; gap: 8px; opacity: 0; transform: translateY(12px); transition: opacity .3s, transform .5s ${SPRING}; }
    .stage.open .acts { opacity: 1; transform: none; }
    .acts button { flex: 1; height: 38px; border: 0; border-radius: 12px; cursor: pointer; font: 600 13px Inter, system-ui, sans-serif; transition: transform .15s, background .2s; }
    .acts button:active { transform: scale(.96); }
    .acts button:focus-visible { outline: 2px solid #0a0a0a; outline-offset: 2px; }
    .no { background: #f0f0f0; color: #0a0a0a; } .no:hover { background: #e4e4e4; }
    .ok { background: #0a0a0a; color: #fff; display: grid; place-items: center; } .ok:hover { background: #262626; }
    .ok svg { width: 18px; height: 18px; fill: none; stroke: #fff; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; position: absolute; }
    .ok path { stroke-dasharray: 26; stroke-dashoffset: 26; }
    .stage.sent .ok { background: #16a34a; } .stage.sent .ok span { opacity: 0; } .stage.sent .ok path { stroke-dashoffset: 0; transition: stroke-dashoffset .4s .1s; }
    .ok { position: relative; } .ok span { transition: opacity .15s; }
  `,
  html: `
    <div class="stage">
      <div class="bal">$1,240.50<small>Checking</small></div>
      <div class="card" role="button" tabindex="0" aria-expanded="false">
        <span class="lbl">Send $40</span>
        <div class="sheet">
          <div class="row"><span>To</span><b>Alex Chen</b></div>
          <div class="row"><span>Amount</span><b class="amt">$40.00</b></div>
          <div class="acts"><button class="no" type="button">Cancel</button><button class="ok" type="button"><span>Confirm</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></button></div>
        </div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), card = root.querySelector('.card'), bal = root.querySelector('.bal');
    let t = 0;
    const set = (open) => { stage.classList.toggle('open', open); card.setAttribute('aria-expanded', String(open)); };
    card.addEventListener('click', (e) => { if (!stage.classList.contains('open') && !e.target.closest('.acts')) set(true); });
    card.addEventListener('keydown', (e) => { if (e.target === card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); set(!stage.classList.contains('open')); } });
    root.querySelector('.no').addEventListener('click', (e) => { e.stopPropagation(); set(false); });
    root.querySelector('.ok').addEventListener('click', (e) => {
      e.stopPropagation();
      if (stage.classList.contains('sent')) return;
      stage.classList.add('sent');
      clearTimeout(t);
      t = setTimeout(() => { set(false); bal.firstChild.textContent = '$1,200.50'; setTimeout(() => stage.classList.remove('sent'), 500); }, 900);
    });
    return () => clearTimeout(t);
  },
};
