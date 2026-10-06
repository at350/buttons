export default {
  id: 'ks-mcd-kiosk',
  credit: 'McDonald’s self-order kiosk — menu tile grid, golden "Add to Order" button and the red count badge on the My Order bag',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 12px; border-radius: 12px; background: linear-gradient(#e9e9e9, #c9c9c9); }
    .scr { width: 284px; border-radius: 8px; overflow: hidden; background: #fff; box-shadow: 0 0 0 6px #1b1b1b; font-family: 'DM Sans', Inter, system-ui, sans-serif; color: #292929; }
    .hd { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #da291c; color: #fff; font-weight: 800; font-size: 14px; }
    .hd svg { width: 26px; height: 26px; fill: #ffc72c; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 10px; background: #f6f6f6; }
    .t { height: 96px; min-width: 0; border: 0; border-radius: 8px; background: #fff; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; padding: 6px;
      box-shadow: 0 1px 3px rgba(0,0,0,.14); font: inherit; color: inherit; transition: box-shadow .12s, transform .08s; -webkit-tap-highlight-color: transparent; }
    .t img { display: block; width: 100%; height: 50px; border-radius: 5px; object-fit: cover; background: #eee; }
    .t b { font-size: 12.5px; font-weight: 700; white-space: nowrap; max-width: 100%; overflow: hidden; text-overflow: ellipsis; }
    .t span { font-size: 11px; color: #6f6f6f; }
    .t:hover { box-shadow: 0 2px 8px rgba(0,0,0,.18); }
    .t:active { transform: scale(.97); }
    .t:focus-visible { outline: 2px solid #da291c; outline-offset: 2px; }
    .t[aria-pressed="true"] { box-shadow: inset 0 0 0 3px #ffbc0d, 0 2px 8px rgba(0,0,0,.18); }
    .ft { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-top: 1px solid #eee; }
    .bag { position: relative; width: 38px; height: 38px; flex: none; display: grid; place-items: center; color: #292929; }
    .bag svg { width: 28px; height: 28px; }
    .badge { position: absolute; right: -2px; top: -2px; min-width: 19px; height: 19px; padding: 0 5px; border-radius: 10px; background: #da291c; color: #fff; font-size: 11px; font-weight: 700; display: grid; place-items: center; transform: scale(0); transition: transform .2s cubic-bezier(.3,1.6,.5,1); }
    .badge.on { transform: scale(1); } .badge.pop { animation: pop .3s; }
    @keyframes pop { 50% { transform: scale(1.35); } }
    .sum { flex: 1; font-size: 11px; color: #6f6f6f; } .sum b { display: block; font-size: 15px; color: #292929; font-variant-numeric: tabular-nums; }
    .add { height: 42px; padding: 0 16px; border: 0; border-radius: 6px; background: #ffbc0d; color: #292929; font: 700 14px/1 'DM Sans', Inter, sans-serif; cursor: pointer; white-space: nowrap; transition: filter .1s, transform .06s, opacity .15s; }
    .add:hover { filter: brightness(1.05); } .add:active { transform: scale(.97); }
    .add:disabled { opacity: .45; cursor: default; }
    .add:focus-visible { outline: 2px solid #da291c; outline-offset: 2px; }
  `,
  html: `
    <div class="stage"><div class="scr">
      <div class="hd"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.243 3.006c2.066 0 3.742 8.714 3.742 19.478H24c0-11.588-3.042-20.968-6.766-20.968-2.127 0-4.007 2.81-5.248 7.227-1.241-4.416-3.121-7.227-5.231-7.227C3.031 1.516 0 10.888 0 22.476h3.014c0-10.763 1.658-19.470 3.724-19.470 2.066 0 3.741 8.050 3.741 17.980h2.997c0-9.930 1.684-17.980 3.750-17.980Z"/></svg>McCafé®</div>
      <div class="grid">
        <button class="t" type="button" aria-pressed="false" data-p="1.79"><img src="assets/square/57.webp" alt="" width="122" height="50" style="object-position:50% 45%"><b>Premium Roast</b><span>$1.79 · 0 Cal.</span></button>
        <button class="t" type="button" aria-pressed="false" data-p="3.29"><img src="assets/square/38.webp" alt="" width="122" height="50" style="object-position:68% 64%"><b>Cappuccino</b><span>$3.29 · 120 Cal.</span></button>
        <button class="t" type="button" aria-pressed="false" data-p="2.89"><img src="assets/square/28.webp" alt="" width="122" height="50" style="object-position:40% 50%"><b>Hot Chocolate</b><span>$2.89 · 370 Cal.</span></button>
        <button class="t" type="button" aria-pressed="false" data-p="3.49"><img src="assets/wide/16.webp" alt="" width="122" height="50" style="object-position:50% 58%"><b>Berry Smoothie</b><span>$3.49 · 190 Cal.</span></button>
      </div>
      <div class="ft">
        <div class="bag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg><span class="badge">0</span></div>
        <div class="sum">My Order<b>$0.00</b></div>
        <button class="add" type="button" disabled>Add to Order</button>
      </div>
    </div></div>`,
  init(root) {
    const tiles = [...root.querySelectorAll('.t')], add = root.querySelector('.add'), badge = root.querySelector('.badge'), sum = root.querySelector('.sum b');
    let sel = null, n = 0, total = 0;
    tiles.forEach((t) => t.addEventListener('click', () => { sel = sel === t ? null : t; tiles.forEach((x) => x.setAttribute('aria-pressed', String(x === sel))); add.disabled = !sel; }));
    add.addEventListener('click', () => {
      if (!sel) return;
      n++; total += +sel.dataset.p; badge.textContent = n; sum.textContent = '$' + total.toFixed(2);
      badge.classList.add('on'); badge.classList.remove('pop'); void badge.offsetWidth; badge.classList.add('pop');
      sel.setAttribute('aria-pressed', 'false'); sel = null; add.disabled = true;
    });
  },
};
