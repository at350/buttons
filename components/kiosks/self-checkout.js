export default {
  id: 'ks-self-checkout',
  credit: 'Grocery self-checkout (NCR SelfServ) — scanned item list, the big green "Finish & Pay" bar and "Call attendant", which sets the lane light flashing',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; padding: 10px 14px 14px; border-radius: 12px; background: linear-gradient(#3a3d42, #22252a); }
    .pole { display: flex; flex-direction: column; align-items: center; margin-bottom: 6px; }
    .lamp { width: 34px; height: 22px; border-radius: 6px 6px 3px 3px; display: grid; place-items: center; font: 800 13px/1 Inter, sans-serif; color: #fff; background: #1d8f3c; box-shadow: 0 0 10px rgba(40,200,90,.5), inset 0 2px 0 rgba(255,255,255,.3); }
    .stick { width: 4px; height: 8px; background: #888; }
    .stage.help .lamp { animation: flash .6s steps(1) infinite; }
    @keyframes flash { 0%, 49% { background: #e02a20; box-shadow: 0 0 14px rgba(255,40,30,.8), inset 0 2px 0 rgba(255,255,255,.3); } 50% { background: #f2b400; box-shadow: 0 0 14px rgba(255,190,0,.8), inset 0 2px 0 rgba(255,255,255,.3); } }
    .scr { position: relative; width: 300px; height: 200px; border-radius: 6px; overflow: hidden; background: #f4f6f8; box-shadow: 0 0 0 5px #0d0e10; font-family: Inter, system-ui, sans-serif; color: #1a1a1a; display: flex; flex-direction: column; }
    .top { padding: 7px 10px; background: #0b4f9c; color: #fff; font-size: 12px; font-weight: 600; }
    ul { list-style: none; margin: 0; padding: 4px 10px; flex: 1; font-size: 11.5px; }
    li { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #e3e6ea; }
    li span:last-child { font-variant-numeric: tabular-nums; }
    .tot { display: flex; justify-content: space-between; padding: 0 10px 6px; font-weight: 700; font-size: 14px; }
    .bar { display: grid; grid-template-columns: 1fr 1.6fr; gap: 6px; padding: 0 8px 8px; }
    .b { height: 40px; border: 0; border-radius: 5px; cursor: pointer; font: 700 13px/1 Inter, system-ui, sans-serif; display: flex; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; transition: filter .1s, transform .06s; -webkit-tap-highlight-color: transparent; }
    .b svg { width: 16px; height: 16px; flex: none; }
    .b:hover { filter: brightness(1.08); } .b:active { transform: translateY(1px) scale(.98); }
    .b:focus-visible { outline: 2px solid #0b4f9c; outline-offset: 2px; }
    .help-b { background: #fff; color: #0b4f9c; box-shadow: inset 0 0 0 2px #0b4f9c; }
    .stage.help .help-b { background: #fff4d6; color: #8a5a00; box-shadow: inset 0 0 0 2px #e0a100; }
    .pay { background: linear-gradient(#3bb54a, #1f9137); color: #fff; font-size: 15px; box-shadow: 0 2px 0 #146b27; }
    .sheet { position: absolute; inset: 31px 0 0; background: #f4f6f8; padding: 12px; display: flex; flex-direction: column; gap: 8px; transform: translateY(100%); transition: transform .3s cubic-bezier(.2,.8,.2,1); visibility: hidden; }
    .stage.paying .sheet { transform: none; visibility: visible; }
    .sheet p { margin: 0 0 2px; font-size: 13px; font-weight: 600; }
    .opts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .opt { height: 74px; flex-direction: column; background: #fff; color: #1a1a1a; box-shadow: inset 0 0 0 1px #c9ced6; font-size: 12px; }
    .opt svg { width: 24px; height: 24px; color: #0b4f9c; }
    .opt[aria-pressed="true"] { box-shadow: inset 0 0 0 3px #1f9137; }
    .back { height: 30px; background: transparent; color: #0b4f9c; font-size: 12px; }
  `,
  html: `
    <div class="stage">
      <div class="pole"><div class="lamp">7</div><div class="stick"></div></div>
      <div class="scr">
        <div class="top">Scan your next item</div>
        <ul><li><span>Bananas 2.31 lb @ $0.59/lb</span><span>$1.36</span></li><li><span>Whole Milk 1 gal</span><span>$3.49</span></li><li><span>Sourdough Loaf</span><span>$4.99</span></li></ul>
        <div class="tot"><span>Total (3 items)</span><span>$9.84</span></div>
        <div class="bar">
          <button class="b help-b" type="button" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14"/><path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 13 6 6"/></svg><span class="hl">Call attendant</span></button>
          <button class="b pay" type="button">Finish &amp; Pay</button>
        </div>
        <div class="sheet">
          <p>How would you like to pay?</p>
          <div class="opts">
            <button class="b opt" type="button" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>Credit / Debit</button>
            <button class="b opt" type="button" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>Cash</button>
          </div>
          <button class="b back" type="button">Go back</button>
        </div>
      </div>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), help = root.querySelector('.help-b'), hl = root.querySelector('.hl');
    help.addEventListener('click', () => { const on = st.classList.toggle('help'); help.setAttribute('aria-pressed', String(on)); hl.textContent = on ? 'Help is coming' : 'Call attendant'; });
    root.querySelector('.pay').addEventListener('click', () => st.classList.add('paying'));
    root.querySelector('.back').addEventListener('click', () => st.classList.remove('paying'));
    const opts = root.querySelectorAll('.opt');
    opts.forEach((o) => o.addEventListener('click', () => opts.forEach((x) => x.setAttribute('aria-pressed', String(x === o)))));
  },
};
