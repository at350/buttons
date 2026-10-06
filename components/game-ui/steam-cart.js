// Steam store purchase block, matching store.steampowered.com: game_area_purchase_game gradient panel, "Buy …"
// title, #000 action box with the #4c6b22 / #beee11 discount pill, btn_green_steamui (#75b022 → #588a1b,
// #d2efa9 label, 2px radius) and the btn_darkblue_white_innerfade wishlist button (#67c1f5 on 20% blue).
export default {
  id: 'gm-steam-cart',
  credit: 'Valve Steam store — the purchase box: -75% discount pill, green "Add to Cart" gradient that becomes "In Cart", and the blue "Add to your wishlist" button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #1b2838; border-radius: 12px; padding: 16px 18px 32px; font-family: 'Motiva Sans', 'DM Sans', Arial, sans-serif; }
    .wl { border: none; cursor: pointer; border-radius: 2px; height: 30px; padding: 0 12px; display: inline-flex; align-items: center; gap: 7px; margin-bottom: 14px;
      background: rgba(103,193,245,.2); color: #67c1f5; font: 400 13px/30px 'Motiva Sans', 'DM Sans', Arial, sans-serif; white-space: nowrap; }
    .wl:hover { background: linear-gradient(-60deg, #417a9b 5%, #67c1f5 95%); color: #fff; }
    .wl svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
    .wl .st { display: grid; } .wl .st > span { grid-area: 1 / 1; } .wl .st > span[hidden] { display: block; visibility: hidden; }
    .wl:focus-visible { outline: 1px solid #fff; outline-offset: 1px; }
    .buy { position: relative; width: 330px; padding: 14px 16px 62px; border-radius: 4px; background: linear-gradient(-60deg, rgba(226,244,255,.3) 5%, rgba(84,107,115,.3) 95%); }
    .buy h3 { margin: 0; color: #fff; font: 400 18px 'Motiva Sans', 'DM Sans', Arial, sans-serif; white-space: nowrap; }
    .sale { display: inline-block; margin-top: 6px; background: #4c6b22; color: #beee11; font: 400 10px/16px 'Motiva Sans', 'DM Sans', Arial, sans-serif; text-transform: uppercase; padding: 0 6px; border-radius: 2px; }
    .act { position: absolute; right: 16px; bottom: 14px; display: flex; align-items: stretch; background: #000; padding: 2px 2px 2px 0; border-radius: 2px; }
    .pct { background: #4c6b22; color: #beee11; font: 500 25px/34px 'Motiva Sans', 'DM Sans', Arial, sans-serif; padding: 0 6px; letter-spacing: -.5px; }
    .price { display: flex; flex-direction: column; justify-content: center; align-items: flex-end; padding: 0 8px 0 10px; background: #344654; line-height: 1.1; }
    .was { color: #738895; font-size: 11px; text-decoration: line-through; }
    .now { color: #beee11; font-size: 15px; }
    .cart { border: none; cursor: pointer; border-radius: 2px; margin-left: 2px; padding: 0 15px; display: grid; align-items: center;
      background: linear-gradient(to right, #75b022 5%, #588a1b 95%); color: #d2efa9; font: 400 15px/30px 'Motiva Sans', 'DM Sans', Arial, sans-serif; white-space: nowrap; }
    .cart > span { grid-area: 1 / 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
    .cart > span[hidden] { display: inline-flex; visibility: hidden; }
    .cart svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
    .cart:hover { background: linear-gradient(to right, #8ed629 5%, #6aa621 95%); color: #fff; }
    .cart:active { background: linear-gradient(to right, #6a9e1f 5%, #4e7b18 95%); }
    .cart:focus-visible { outline: 1px solid #fff; outline-offset: 1px; }
  `,
  html: `
    <div class="stage">
      <button class="wl" type="button" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="ic" d="M5 12h14M12 5v14"/></svg><span class="st"><span class="a">Add to your wishlist</span><span class="b" hidden>On Wishlist</span></span></button>
      <div class="buy">
        <h3>Buy Hades</h3>
        <span class="sale">Weeklong Deal!</span>
        <div class="act">
          <span class="pct">-75%</span>
          <span class="price"><span class="was">$24.99</span><span class="now">$6.24</span></span>
          <button class="cart" type="button" aria-pressed="false"><span class="a">Add to Cart</span><span class="b" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>In Cart</span></button>
        </div>
      </div>
    </div>`,
  init(root) {
    const swap = (btn, on) => { btn.querySelector('.a').hidden = on; btn.querySelector('.b').hidden = !on; btn.setAttribute('aria-pressed', String(on)); };
    const cart = root.querySelector('.cart'); let inCart = false;
    cart.addEventListener('click', () => { inCart = !inCart; swap(cart, inCart); });
    const wl = root.querySelector('.wl'), ic = root.querySelector('.ic'); let onWl = false;
    wl.addEventListener('click', () => { onWl = !onWl; swap(wl, onWl); ic.setAttribute('d', onWl ? 'M20 6 9 17l-5-5' : 'M5 12h14M12 5v14'); });
  },
};
