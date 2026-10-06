export default {
  id: 'bt-amazon-cart',
  credit: 'Amazon — yellow "Add to Cart" and orange "Buy Now" pill pair with cart badge',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .col { display: flex; flex-direction: column; gap: 8px; width: 220px; max-width: 100%; }
    .am {
      height: 31px; border-radius: 100px; border: 1px solid; cursor: pointer; font: 400 13px/29px "Amazon Ember", Arial, -apple-system, system-ui, sans-serif; color: #0f1111;
      display: flex; align-items: center; justify-content: center; gap: 6px; -webkit-tap-highlight-color: transparent;
    }
    .cart { background: #ffd814; border-color: #fcd200; }
    .cart:hover { background: #f7ca00; border-color: #f2c200; }
    .cart:active { background: #f0b800; }
    .buy { background: #ffa41c; border-color: #ff8f00; }
    .buy:hover { background: #fa8900; border-color: #e37c00; }
    .buy:active { background: #f08200; }
    .am:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #007185; }
    .am .lbl::after { content: 'Add to Cart'; }
    .am.added .lbl::after { content: 'Added to Cart'; }
    .am svg { width: 14px; height: 14px; stroke: #0f1111; fill: none; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; display: none; }
    .am.added svg { display: block; animation: tick .3s ease-out; }
    @keyframes tick { from { transform: scale(0); } to { transform: scale(1); } }
    .buy .lbl::after { content: 'Buy Now'; }
    .buy[aria-pressed="true"] .lbl::after { content: 'Place your order'; }
    .buy[aria-pressed="true"] { background: #ffd814; border-color: #fcd200; }
    .badge { align-self: flex-end; display: inline-flex; align-items: center; gap: 4px; font: 700 14px Arial, system-ui, sans-serif; color: #f08804; }
    .badge svg { width: 22px; height: 22px; fill: none; stroke: #0f1111; stroke-width: 1.6; stroke-linejoin: round; }
  `,
  html: `
    <div class="col">
      <span class="badge"><span class="cnt">0</span><svg viewBox="0 0 24 24"><path d="M2 3h2.5l2.3 11.2a1 1 0 0 0 1 .8h9.8a1 1 0 0 0 1-.8L20.5 7H6"/><circle cx="9" cy="19" r="1.5"/><circle cx="17" cy="19" r="1.5"/></svg></span>
      <button class="am cart" type="button"><svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6"/></svg><span class="lbl"></span></button>
      <button class="am buy" type="button" aria-pressed="false"><span class="lbl"></span></button>
    </div>`,
  init(root) {
    const cart = root.querySelector('.cart');
    const buy = root.querySelector('.buy');
    const cnt = root.querySelector('.cnt');
    let n = 0, t;
    cart.addEventListener('click', () => {
      n++; cnt.textContent = n; cart.classList.add('added');
      clearTimeout(t); t = setTimeout(() => cart.classList.remove('added'), 1200);
    });
    buy.addEventListener('click', () => buy.setAttribute('aria-pressed', buy.getAttribute('aria-pressed') !== 'true'));
    return () => clearTimeout(t);
  },
};
