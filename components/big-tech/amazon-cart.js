// Amazon buy box: yellow "Add to cart" and orange "Buy Now" pills, plus the nav-bar cart whose orange count ticks up.
export default {
  id: 'bt-amazon-cart',
  credit: 'Amazon — buy box "Add to cart" / "Buy Now" pills and the nav cart counter',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .col { display: flex; flex-direction: column; gap: 8px; width: 240px; max-width: 100%; font-family: "Amazon Ember", Arial, sans-serif; }
    .nav { align-self: flex-end; display: inline-flex; align-items: flex-end; gap: 2px; height: 40px; padding: 0 10px 6px 8px; border-radius: 4px; background: #131921; color: #fff; border: 1px solid transparent; }
    .nav:hover { border-color: #fff; }
    .cw { position: relative; width: 38px; height: 28px; }
    .cw svg { position: absolute; left: 2px; bottom: 0; width: 30px; height: 26px; fill: none; stroke: #fff; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .cnt { position: absolute; left: 14px; top: -3px; width: 18px; text-align: center; font: 700 16px/16px Arial, sans-serif; color: #f08804; }
    .cnt.bump { animation: bump .3s cubic-bezier(.2,0,0,1); }
    @keyframes bump { 40% { transform: translateY(-4px) scale(1.15); } }
    .nav b { font: 700 14px/15px Arial, sans-serif; }
    .am {
      height: 32px; border-radius: 100px; border: 1px solid; cursor: pointer; font: 400 13px/29px "Amazon Ember", Arial, sans-serif; color: #0f1111;
      display: grid; place-items: center; box-shadow: 0 2px 5px 0 rgba(213,217,217,.5); -webkit-tap-highlight-color: transparent;
    }
    .am > span { grid-area: 1 / 1; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
    .cart { background: #ffd814; border-color: #fcd200; }
    .cart:hover { background: #f7ca00; border-color: #f2c200; }
    .buy { background: #ffa41c; border-color: #ff8f00; }
    .buy:hover { background: #fa8900; border-color: #e3931e; }
    .am:active { box-shadow: 0 0 0 1px rgba(0,0,0,.1) inset; filter: brightness(.96); }
    .am:focus-visible { outline: none; border-color: #007185; box-shadow: 0 0 0 3px #c8f3fa, 0 1px 2px rgba(15,17,17,.15) inset; }
    .am .b { visibility: hidden; }
    .am.on .a { visibility: hidden; }
    .am.on .b { visibility: visible; }
    .cart .b { color: #067d62; font-weight: 700; }
    .cart .b svg { width: 16px; height: 16px; fill: none; stroke: #067d62; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .cart.on { background: #fff; border-color: #d5d9d9; }
  `,
  html: `
    <div class="col">
      <span class="nav" aria-live="polite"><span class="cw"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"/><path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"/><circle cx="18" cy="20" r="2"/><circle cx="8" cy="20" r="2"/></svg><span class="cnt">0</span></span><b>Cart</b></span>
      <button class="am cart" type="button"><span class="a">Add to cart</span><span class="b" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Added to cart</span></button>
      <button class="am buy" type="button" aria-pressed="false"><span class="a">Buy Now</span><span class="b" aria-hidden="true">Place your order</span></button>
    </div>`,
  init(root) {
    const cart = root.querySelector('.cart');
    const buy = root.querySelector('.buy');
    const cnt = root.querySelector('.cnt');
    let n = 0, t;
    cart.addEventListener('click', () => {
      n = n >= 99 ? 99 : n + 1; cnt.textContent = n;
      cnt.classList.remove('bump'); void cnt.offsetWidth; cnt.classList.add('bump');
      cart.classList.add('on');
      clearTimeout(t); t = setTimeout(() => cart.classList.remove('on'), 1400);
    });
    buy.addEventListener('click', () => { const on = buy.classList.toggle('on'); buy.setAttribute('aria-pressed', String(on)); });
    return () => clearTimeout(t);
  },
};
