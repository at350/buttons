// Family wallet dynamic trays (Benji Taylor, "Family Values"): a floating tray rises over the screen, every step
// has a different height so the change reads, the tray springs between heights while content blur-crossfades,
// and the shared letters stay put as "Continue" morphs into "Confirm".
// Spring: stiffness 158, damping 19 (ζ .76, ~2.5% overshoot) → linear(); tray slide uses ζ .86.
const TRAY = 'linear(0, 0.038, 0.127, 0.249, 0.376, 0.499, 0.613, 0.712, 0.799, 0.865, 0.918, 0.957, 0.985, 1.004, 1.016, 1.023, 1.025, 1.025, 1.023, 1.021, 1.018, 1.014, 1.011, 1.008, 1.006, 1.004, 1.003, 1.002, 1.001, 1, 1)';
const SLIDE = 'linear(0, 0.037, 0.123, 0.233, 0.344, 0.458, 0.562, 0.655, 0.733, 0.798, 0.851, 0.893, 0.924, 0.949, 0.967, 0.981, 0.99, 0.996, 1, 1.003, 1.004, 1.005, 1.005, 1.004, 1.004, 1.003, 1.003, 1.002, 1.002, 1.001, 1)';

export default {
  id: 'mo-wallet-sheet',
  credit: 'Family wallet (Benji Taylor) dynamic trays — the tray springs between step heights, content blur-crossfades and "Continue" morphs into "Confirm" keeping the shared "Con"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; height: 340px; max-width: 100%; border-radius: 12px; background: #f2f2f2; overflow: hidden; font-family: system-ui, -apple-system, 'SF Pro Text', Inter, sans-serif; color: #111; }
    .home { position: absolute; inset: 0; padding: 26px 14px; display: flex; flex-direction: column; align-items: center; transition: transform .5s ${SLIDE}, filter .4s; }
    .stage.open .home { transform: scale(.96); filter: blur(1px); }
    .home small { font-size: 13px; font-weight: 500; color: #8a8a8a; }
    .bal { margin-top: 4px; font-size: 38px; font-weight: 700; letter-spacing: -.035em; font-variant-numeric: tabular-nums; }
    .acts { display: flex; gap: 10px; margin-top: 22px; }
    .acts button { display: inline-flex; align-items: center; gap: 6px; height: 40px; padding: 0 18px; border: 0; border-radius: 999px; font: 600 14px system-ui, -apple-system, Inter, sans-serif; cursor: pointer; transition: transform .2s ${SLIDE}, background .2s; }
    .acts button:active { transform: scale(.95); }
    .acts svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
    .send { background: #111; color: #fff; } .send:hover { background: #2a2a2a; }
    .recv { background: #e4e4e4; color: #111; } .recv:hover { background: #dadada; }
    .acts button:focus-visible, .x:focus-visible, .cta:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .feed { align-self: stretch; margin-top: 26px; padding: 6px 14px; border-radius: 20px; background: #fff; }
    .feed div { display: flex; align-items: center; gap: 10px; height: 52px; } .feed div + div { border-top: 1px solid #f2f2f2; }
    .feed .av { width: 32px; height: 32px; }
    .feed span { display: flex; flex-direction: column; flex: 1; font-size: 14px; font-weight: 600; } .feed small { font-size: 12px; font-weight: 500; color: #8a8a8a; }
    .feed b { font-size: 14px; font-weight: 600; font-variant-numeric: tabular-nums; } .feed b.in { color: #1fa855; }
    .dim { position: absolute; inset: 0; background: rgba(0,0,0,.18); opacity: 0; transition: opacity .35s; pointer-events: none; }
    .stage.open .dim { opacity: 1; pointer-events: auto; }
    .tray {
      position: absolute; left: 8px; right: 8px; bottom: 8px; height: var(--h, 220px); border-radius: 30px; background: #fff; overflow: hidden;
      box-shadow: 0 1px 2px rgba(0,0,0,.04), 0 12px 32px -12px rgba(0,0,0,.25);
      transform: translateY(calc(100% + 16px)); transition: transform .55s ${SLIDE}, height .7s ${TRAY};
    }
    .stage.open .tray { transform: none; }
    .step { position: absolute; left: 0; right: 0; top: 0; padding: 20px 20px 0; opacity: 0; filter: blur(4px); transform: scale(.97); transition: opacity .18s, filter .18s, transform .3s ${SLIDE}; pointer-events: none; }
    .step.on { opacity: 1; filter: none; transform: none; transition: opacity .3s .12s, filter .3s .12s, transform .45s .08s ${SLIDE}; pointer-events: auto; }
    .hd { display: flex; align-items: center; gap: 10px; height: 32px; margin-bottom: 18px; }
    .hd .ic { border: 0; padding: 0; width: 32px; height: 32px; border-radius: 50%; background: #f2f2f2; display: grid; place-items: center; flex: none; }
    .hd .ic svg { width: 16px; height: 16px; fill: none; stroke: #111; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
    .hd b { font-size: 17px; font-weight: 600; letter-spacing: -.01em; flex: 1; }
    .x { width: 30px; height: 30px; border-radius: 50%; border: 0; background: #f2f2f2; color: #8a8a8a; cursor: pointer; display: grid; place-items: center; transition: background .2s, color .2s, transform .2s; }
    .back { cursor: pointer; transition: background .2s, transform .2s; } .back:hover { background: #e8e8e8; } .back:active { transform: scale(.9); } .back:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .x:hover { background: #e8e8e8; color: #111; } .x:active { transform: scale(.9); }
    .x svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; }
    .who { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 18px; background: #f7f7f7; }
    .av { display: block; width: 36px; height: 36px; border-radius: 50%; object-fit: cover; background: #e4e4e4; flex: none; }
    .who span { display: flex; flex-direction: column; font-size: 15px; font-weight: 600; } .who small { font-size: 13px; font-weight: 500; color: #8a8a8a; }
    .amt { margin: 16px 0 0; text-align: center; font-size: 40px; font-weight: 700; letter-spacing: -.035em; font-variant-numeric: tabular-nums; }
    .rows { display: flex; flex-direction: column; gap: 12px; padding: 4px 2px; }
    .rows div { display: flex; justify-content: space-between; font-size: 15px; font-weight: 500; color: #8a8a8a; } .rows b { color: #111; font-weight: 600; }
    .rows hr { margin: 2px 0; border: 0; border-top: 1px solid #efefef; }
    .done { display: flex; flex-direction: column; align-items: center; text-align: center; padding-top: 8px; }
    .ok { width: 56px; height: 56px; border-radius: 50%; background: #23c45e; display: grid; place-items: center; transform: scale(.4); transition: transform .6s ${TRAY}; }
    .step.on .ok { transform: scale(1); transition-delay: .12s; }
    .ok svg { width: 28px; height: 28px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .ok path { stroke-dasharray: 24; stroke-dashoffset: 24; transition: stroke-dashoffset .35s .3s ease-out; } .step.on .ok path { stroke-dashoffset: 0; }
    .done b { margin-top: 14px; font-size: 19px; font-weight: 700; letter-spacing: -.02em; } .done span { margin-top: 2px; font-size: 14px; font-weight: 500; color: #8a8a8a; }
    .cta {
      position: absolute; left: 20px; right: 20px; bottom: 20px; height: 50px; border: 0; border-radius: 999px; background: #111; color: #fff; cursor: pointer;
      font: 600 16px system-ui, -apple-system, Inter, sans-serif; letter-spacing: -.01em; display: flex; align-items: center; justify-content: center;
      transition: transform .2s ${SLIDE}, opacity .25s, background .2s, filter .25s;
    }
    .cta:hover { background: #262626; } .cta:active { transform: scale(.97); }
    .tray.fin .cta { opacity: 0; transform: scale(.94); filter: blur(4px); pointer-events: none; }
    .word { display: inline-flex; white-space: pre; }
    .suf { position: relative; display: inline-block; height: 1.25em; width: var(--sw, 40px); transition: width .45s ${TRAY}; }
    .suf i { position: absolute; left: 0; top: 0; font-style: normal; line-height: 1.25; transition: opacity .2s, filter .2s, transform .35s ${SLIDE}; }
    .suf .b { opacity: 0; filter: blur(3px); transform: translateY(5px); }
    .cta.c2 .suf .a { opacity: 0; filter: blur(3px); transform: translateY(-5px); }
    .cta.c2 .suf .b { opacity: 1; filter: none; transform: none; }
  `,
  html: `
    <div class="stage">
      <div class="home">
        <small>Balance</small>
        <div class="bal">$1,240.50</div>
        <div class="acts">
          <button class="send" type="button" aria-haspopup="dialog" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>Send</button>
          <button class="recv" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>Receive</button>
        </div>
        <div class="feed">
          <div><img class="av" src="assets/portraits/women-33.jpg" alt="" width="32" height="32"><span>Lena Fischer<small>Yesterday</small></span><b>−$12.00</b></div>
          <div><img class="av" src="assets/portraits/men-26.jpg" alt="" width="32" height="32"><span>Ravi Kumar<small>Mon</small></span><b class="in">+$250.00</b></div>
        </div>
      </div>
      <div class="dim"></div>
      <div class="tray" role="dialog" aria-label="Send" aria-hidden="true">
        <div class="step s1">
          <div class="hd"><span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></span><b>Send</b><button class="x" type="button" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>
          <div class="who"><img class="av" src="assets/portraits/men-04.jpg" alt="" width="36" height="36"><span>Alex Chen<small>alex.eth</small></span></div>
          <div class="amt">$40.00</div>
          <div style="height:86px"></div>
        </div>
        <div class="step s2">
          <div class="hd"><button class="ic back" type="button" aria-label="Back"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button><b>Review</b><button class="x" type="button" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>
          <div class="rows"><div>To<b>Alex Chen</b></div><div>Amount<b>$40.00</b></div><div>Network fee<b>$0.12</b></div><hr><div>Total<b>$40.12</b></div></div>
          <div style="height:86px"></div>
        </div>
        <div class="step s3" role="status">
          <div class="done"><span class="ok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span><b>Sent</b><span>$40.00 to Alex Chen</span></div>
          <div style="height:24px"></div>
        </div>
        <button class="cta" type="button"><span class="word">Con<span class="suf"><i class="a">tinue</i><i class="b">firm</i></span></span></button>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), tray = root.querySelector('.tray'), cta = root.querySelector('.cta'), send = root.querySelector('.send');
    const steps = [...root.querySelectorAll('.step')], bal = root.querySelector('.bal');
    const sa = root.querySelector('.suf .a'), sb = root.querySelector('.suf .b'), suf = root.querySelector('.suf');
    let step = 0, open = false, balance = 1240.5;
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const go = (i) => {
      step = i;
      steps.forEach((s, k) => s.classList.toggle('on', k === i));
      tray.style.setProperty('--h', steps[i].offsetHeight + 'px');
      tray.classList.toggle('fin', i === 2);
      cta.classList.toggle('c2', i === 1);
      suf.style.setProperty('--sw', (i === 1 ? sb : sa).offsetWidth + 'px');
      steps.forEach((st, k) => st.querySelectorAll('button').forEach((b) => (b.tabIndex = k === i ? 0 : -1)));
    };
    const set = (o) => {
      open = o; stage.classList.toggle('open', o);
      tray.setAttribute('aria-hidden', String(!o)); send.setAttribute('aria-expanded', String(o));
      if (o) { go(0); later(() => open && cta.focus({ preventScroll: true }), 80); }
      else send.focus({ preventScroll: true });
    };
    suf.style.setProperty('--sw', sa.offsetWidth + 'px');
    tray.style.setProperty('--h', steps[0].offsetHeight + 'px');
    send.addEventListener('click', () => set(true));
    root.querySelector('.dim').addEventListener('click', () => set(false));
    root.querySelectorAll('.step .x').forEach((x) => x.addEventListener('click', () => set(false)));
    root.querySelector('.back').addEventListener('click', () => go(0));
    cta.addEventListener('click', () => {
      if (step === 0) go(1);
      else if (step === 1) {
        go(2);
        later(() => set(false), 1500);
        later(() => { balance -= 40.12; bal.textContent = '$' + balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }, 1800);
      }
    });
    stage.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) set(false); });
    return () => timers.forEach(clearTimeout);
  },
};
