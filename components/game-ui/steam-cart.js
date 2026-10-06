export default {
  id: 'gm-steam-cart',
  credit: 'Valve Steam store — purchase box with discount badge and the green-to-blue gradient "Add to Cart" that becomes "In Cart"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: linear-gradient(180deg, #1b2838, #171d25); border-radius: 12px; padding: 16px 18px; font-family: 'Inter', system-ui, sans-serif; }
    .box { background: #000; border-radius: 3px; padding: 10px 10px 10px 14px; display: flex; align-items: center; gap: 10px; }
    .pct { background: #4c6b22; color: #beee11; font: 700 15px 'Inter', system-ui, sans-serif; padding: 5px 6px; border-radius: 2px; }
    .price { display: flex; flex-direction: column; align-items: flex-end; line-height: 1.1; padding-right: 6px; }
    .was { color: #738895; font-size: 11px; text-decoration: line-through; }
    .now { color: #beee11; font-size: 14px; font-weight: 500; }
    .cart { border: none; cursor: pointer; border-radius: 2px; padding: 0 14px; height: 32px; color: #d2efa9; font: 500 14px 'Inter', system-ui, sans-serif; white-space: nowrap;
      background: linear-gradient(90deg, #75b022 5%, #588a1b 95%); text-shadow: 1px 1px 0 rgba(0,0,0,.3); transition: background .2s, color .2s; position: relative; }
    .cart:hover { background: linear-gradient(90deg, #8ed629 5%, #6aa621 95%); color: #fff; }
    .cart.in { background: linear-gradient(90deg, #47bfff 5%, #1a44c2 95%); color: #fff; }
    .cart:focus-visible { outline: 2px solid #66c0f4; outline-offset: 2px; }
    .cart:active { filter: brightness(.9); }
    .wish { margin-top: 10px; border: none; cursor: pointer; border-radius: 2px; height: 28px; padding: 0 12px; color: #c6d4df; font: 500 12px 'Inter', system-ui, sans-serif; white-space: nowrap;
      background: linear-gradient(90deg, #3d4450, #2a3140); display: inline-flex; align-items: center; gap: 6px; }
    .wish:hover { background: linear-gradient(90deg, #4f5a6b, #3a4458); color: #fff; }
    .wish svg { width: 12px; height: 12px; fill: currentColor; }
    .wish.on { color: #66c0f4; }
    .wish:focus-visible { outline: 2px solid #66c0f4; }
  `,
  html: `
    <div class="stage">
      <div class="box">
        <span class="pct">-75%</span>
        <span class="price"><span class="was">$39.99</span><span class="now">$9.99</span></span>
        <button class="cart" type="button" aria-pressed="false">Add to Cart</button>
      </div>
      <button class="wish" type="button" aria-pressed="false"><svg viewBox="0 0 16 16"><path class="plus" d="M7 2h2v5h5v2H9v5H7V9H2V7h5z"/></svg><span class="wl">Add to your wishlist</span></button>
    </div>`,
  init(root) {
    const cart = root.querySelector('.cart');
    cart.addEventListener('click', () => { const on = cart.classList.toggle('in'); cart.setAttribute('aria-pressed', String(on)); cart.textContent = on ? 'In Cart' : 'Add to Cart'; });
    const wish = root.querySelector('.wish'), wl = root.querySelector('.wl'), plus = root.querySelector('.plus');
    wish.addEventListener('click', () => {
      const on = wish.classList.toggle('on'); wish.setAttribute('aria-pressed', String(on));
      wl.textContent = on ? 'On Wishlist' : 'Add to your wishlist';
      plus.setAttribute('d', on ? 'M3 8.5 6.5 12 13 4.5 11.5 3 6.5 9 4.5 7z' : 'M7 2h2v5h5v2H9v5H7V9H2V7h5z');
    });
  },
};
