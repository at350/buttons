// neal.fun/spend (sampled from a web.archive.org capture): #2ecc71 → #1abc9c money bar with white bold Roboto,
// #f1f2f6 page, white item card with bold #333 name and green price, and the Sell / quantity / Buy row —
// Sell sits disabled on #f1f2f6 until you own one, then turns red; Buy is the green gradient.
export default {
  id: 'ob-neal-spend-money',
  credit: 'Neal.fun "Spend Bill Gates\' Money" — the green money bar and a Big Mac card: Buy, Sell or type a quantity',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 320px; max-width: 100%; padding: 10px; background: #f1f2f6; border-radius: 12px; font: 400 16px/1.2 Roboto, "Roboto Flex", "Helvetica Neue", Arial, sans-serif; color: #333; }
    .money { background: linear-gradient(180deg, #2ecc71, #1abc9c); color: #fff; text-align: center; padding: 14px 8px; font: 700 26px/1 Roboto, "Roboto Flex", "Helvetica Neue", Arial, sans-serif; font-variant-numeric: tabular-nums; }
    .item { margin-top: 10px; background: #fff; padding: 14px 14px 16px; display: flex; flex-direction: column; align-items: center; }
    .pic { width: 104px; height: 90px; object-fit: contain; display: block; }
    .name { margin-top: 8px; font: 700 20px/1.2 Roboto, "Roboto Flex", "Helvetica Neue", Arial, sans-serif; color: #333; }
    .price { color: #24c486; font: 400 18px/1.3 Roboto, "Roboto Flex", "Helvetica Neue", Arial, sans-serif; }
    .ctl { width: 100%; margin-top: 14px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
    .ctl button { height: 38px; border: 0; border-radius: 0; font: 700 16px Roboto, "Roboto Flex", "Helvetica Neue", Arial, sans-serif; cursor: pointer; color: #fff; transition: filter .15s, transform .08s; }
    .ctl button:hover { filter: brightness(1.06); }
    .ctl button:active { transform: scale(.97); }
    .ctl button:focus-visible, .qty:focus-visible { outline: 2px solid #1abc9c; outline-offset: 2px; }
    .sell { background: linear-gradient(180deg, #e74c3c, #c0392b); }
    .sell:disabled { background: #f1f2f6; color: #333; cursor: not-allowed; filter: none; transform: none; }
    .buy { background: linear-gradient(180deg, #2ecc71, #1abc9c); }
    .buy:disabled { background: #f1f2f6; color: #333; cursor: not-allowed; }
    .qty { height: 38px; width: 100%; border: 1px solid #b2bec3; border-radius: 0; text-align: center; font: 400 16px Roboto, "Roboto Flex", "Helvetica Neue", Arial, sans-serif; color: #333; background: #fff; }
  `,
  html: `
    <div class="stage">
      <div class="money" aria-live="polite">$100,000,000,000</div>
      <div class="item">
        <img class="pic" src="assets/real/ob-neal-big-mac.jpg" alt="Big Mac" width="104" height="90">
        <div class="name">Big Mac</div>
        <div class="price">$2</div>
        <div class="ctl">
          <button class="sell" type="button" disabled>Sell</button>
          <input class="qty" type="text" inputmode="numeric" value="0" aria-label="Quantity">
          <button class="buy" type="button">Buy</button>
        </div>
      </div>
    </div>`,
  init(root) {
    const money = root.querySelector('.money'), sell = root.querySelector('.sell'), buy = root.querySelector('.buy'), qty = root.querySelector('.qty');
    const TOTAL = 100000000000, PRICE = 2;
    let n = 0;
    const render = () => {
      const left = TOTAL - n * PRICE;
      money.textContent = '$' + left.toLocaleString('en-US');
      qty.value = String(n);
      sell.disabled = n <= 0; buy.disabled = left < PRICE;
    };
    buy.addEventListener('click', () => { if (TOTAL - n * PRICE >= PRICE) { n++; render(); } });
    sell.addEventListener('click', () => { if (n > 0) { n--; render(); if (!n) buy.focus(); } });
    qty.addEventListener('change', () => { n = Math.max(0, Math.min(Math.floor(TOTAL / PRICE), parseInt(qty.value.replace(/\D/g, ''), 10) || 0)); render(); });
    qty.addEventListener('keydown', (e) => { if (e.key === 'Enter') qty.dispatchEvent(new Event('change')); });
    render();
  },
};
