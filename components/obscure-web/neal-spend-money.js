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
    .pic { width: 92px; height: 78px; }
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
        <svg class="pic" viewBox="0 0 92 78" aria-hidden="true">
          <path d="M8 30c0-16 17-26 38-26s38 10 38 26z" fill="#d98a32"/><path d="M12 28c2-12 16-20 34-20s32 8 34 20" fill="none" stroke="#f0b35a" stroke-width="3" opacity=".6"/>
          <g fill="#fff6dc"><ellipse cx="30" cy="14" rx="2" ry="1.1"/><ellipse cx="44" cy="10" rx="2" ry="1.1"/><ellipse cx="58" cy="14" rx="2" ry="1.1"/><ellipse cx="38" cy="20" rx="2" ry="1.1"/><ellipse cx="52" cy="21" rx="2" ry="1.1"/><ellipse cx="66" cy="22" rx="2" ry="1.1"/><ellipse cx="24" cy="22" rx="2" ry="1.1"/></g>
          <path d="M5 33c10 4 20-3 30 1s20-3 30 1 18-2 22-1l-2 4H7z" fill="#7cc242"/>
          <rect x="7" y="36" width="78" height="9" rx="4" fill="#5a3218"/>
          <path d="M8 45h76l-6 6-8-4-10 5-10-5-10 5-10-5-8 4z" fill="#f7b928"/>
          <rect x="9" y="47" width="74" height="7" rx="3" fill="#d98a32"/>
          <path d="M6 55c10 3 22-2 32 1s22-2 32 1 12-1 16 0l-2 3H8z" fill="#7cc242"/>
          <rect x="7" y="58" width="78" height="9" rx="4" fill="#5a3218"/>
          <path d="M8 67h76c0 6-16 9-38 9S8 73 8 67z" fill="#c97a2a"/>
        </svg>
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
