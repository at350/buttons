export default {
  id: 'ob-neal-spend-money',
  credit: 'Neal.fun "Spend Bill Gates\' Money" — green sticky total bar and a Sell / qty / Buy item row',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 300px; max-width: 100%; background: #fff; border-radius: 12px; overflow: hidden; font: 14px/1.2 "Helvetica Neue", Arial, sans-serif; box-shadow: 0 1px 4px rgba(0,0,0,.1); }
    .money { background: #2ecc71; color: #fff; text-align: center; padding: 14px 10px; font: 700 24px/1 "Helvetica Neue", Arial, sans-serif; letter-spacing: .5px; font-variant-numeric: tabular-nums; transition: background .3s; }
    .money.broke { background: #e74c3c; }
    .item { padding: 14px 16px; display: grid; grid-template-columns: 56px 1fr; gap: 12px; align-items: center; }
    .pic { width: 56px; height: 56px; }
    .name { font: 500 15px/1.2 "Helvetica Neue", Arial, sans-serif; color: #222; }
    .price { color: #2ecc71; font-weight: 700; margin-top: 3px; }
    .ctl { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 70px 1fr; gap: 10px; }
    .ctl button { height: 36px; border: 0; border-radius: 4px; font: 700 14px "Helvetica Neue", Arial, sans-serif; cursor: pointer; color: #fff; transition: background .15s, transform .08s; }
    .ctl button:active { transform: scale(.97); }
    .ctl button:focus-visible { outline: 2px solid #2ecc71; outline-offset: 2px; }
    .sell { background: #bdc3c7; }
    .sell.on { background: #2ecc71; }
    .sell.on:hover { background: #27ae60; }
    .buy { background: #2ecc71; }
    .buy:hover { background: #27ae60; }
    .buy.no { background: #bdc3c7; cursor: not-allowed; }
    .qty { height: 36px; width: 100%; border: 1px solid #ddd; border-radius: 4px; text-align: center; font: 600 15px "Helvetica Neue", Arial, sans-serif; color: #222; background: #fff; }
    .qty:focus-visible { outline: 2px solid #2ecc71; outline-offset: 1px; }
  `,
  html: `
    <div class="stage">
      <div class="money" aria-live="polite">$100,000,000,000</div>
      <div class="item">
        <svg class="pic" viewBox="0 0 56 56" aria-hidden="true"><ellipse cx="28" cy="14" rx="22" ry="9" fill="#e8b24a"/><rect x="6" y="20" width="44" height="6" fill="#7a4a1e"/><rect x="5" y="26" width="46" height="4" fill="#4caf50"/><rect x="6" y="30" width="44" height="6" fill="#f4c542"/><rect x="6" y="36" width="44" height="6" fill="#7a4a1e"/><ellipse cx="28" cy="46" rx="22" ry="6" fill="#e8b24a"/><circle cx="20" cy="11" r="1.2" fill="#fff6d6"/><circle cx="30" cy="8" r="1.2" fill="#fff6d6"/><circle cx="38" cy="13" r="1.2" fill="#fff6d6"/></svg>
        <div><div class="name">Big Mac</div><div class="price">$2</div></div>
        <div class="ctl">
          <button class="sell" type="button">Sell</button>
          <input class="qty" type="text" inputmode="numeric" value="0" aria-label="Quantity">
          <button class="buy" type="button">Buy</button>
        </div>
      </div>
    </div>`,
  init(root) {
    const money = root.querySelector('.money'), sell = root.querySelector('.sell'), buy = root.querySelector('.buy'), qty = root.querySelector('.qty');
    const TOTAL = 100000000000, PRICE = 2;
    let n = 0;
    const fmt = (v) => '$' + v.toLocaleString('en-US');
    const render = () => {
      const left = TOTAL - n * PRICE;
      money.textContent = fmt(left);
      money.classList.toggle('broke', left <= 0);
      qty.value = String(n);
      sell.classList.toggle('on', n > 0);
      buy.classList.toggle('no', left < PRICE);
    };
    buy.addEventListener('click', () => { if (TOTAL - n * PRICE >= PRICE) { n++; render(); } });
    sell.addEventListener('click', () => { if (n > 0) { n--; render(); } });
    qty.addEventListener('change', () => {
      const v = Math.max(0, Math.min(Math.floor(TOTAL / PRICE), parseInt(qty.value.replace(/\D/g, ''), 10) || 0));
      n = v; render();
    });
    render();
  },
};
