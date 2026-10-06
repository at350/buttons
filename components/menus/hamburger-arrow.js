export default {
  id: 'mn-hamburger-arrow',
  credit: 'Jonsuh Hamburgers — "arrow" (three lines fold into a back arrow)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .hb {
      width: 52px; height: 52px; border: 0; background: #fff; border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,.15); cursor: pointer; display: grid; place-items: center; padding: 0; color: #222;
      transition: box-shadow .2s, transform .15s;
    }
    .hb:hover { box-shadow: 0 3px 10px rgba(0,0,0,.18); }
    .hb:active { transform: scale(.95); }
    .hb:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
    .box { position: relative; width: 26px; height: 18px; display: block; }
    .box span {
      position: absolute; left: 0; width: 26px; height: 3px; border-radius: 3px; background: currentColor;
      transition: transform .3s cubic-bezier(.4,0,.2,1), width .3s cubic-bezier(.4,0,.2,1);
    }
    .box span:nth-child(1) { top: 0; }
    .box span:nth-child(2) { top: 7.5px; }
    .box span:nth-child(3) { top: 15px; }
    .hb[aria-expanded="true"] span:nth-child(1) { width: 15px; transform: translate(-5px, 1.5px) rotate(-45deg); }
    .hb[aria-expanded="true"] span:nth-child(3) { width: 15px; transform: translate(-5px, -1.5px) rotate(45deg); }
  `,
  html: `<button class="hb" type="button" aria-expanded="false" aria-label="Menu"><span class="box"><span></span><span></span><span></span></span></button>`,
  init(root) {
    const b = root.querySelector('.hb');
    b.addEventListener('click', () => b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') !== 'true'));
  },
};
