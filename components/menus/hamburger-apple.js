export default {
  id: 'mn-hamburger-apple',
  credit: 'Apple.com mobile nav — two hairlines that slide together and cross',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: rgba(0,0,0,.88); border-radius: 12px; padding: 6px; display: inline-block; }
    .hb {
      width: 48px; height: 48px; border: 0; background: transparent; cursor: pointer;
      display: grid; place-items: center; padding: 0; color: #f5f5f7; border-radius: 8px;
    }
    .hb:focus-visible { outline: 2px solid #2997ff; outline-offset: -2px; }
    .box { position: relative; width: 18px; height: 12px; display: block; }
    .box span {
      position: absolute; left: 0; width: 18px; height: 1px; background: currentColor; border-radius: .5px;
      transition: transform .1806s cubic-bezier(.04,.04,.12,.96) .1008s, top .1806s cubic-bezier(.04,.04,.12,.96) .1008s;
    }
    .box span:nth-child(1) { top: 2px; }
    .box span:nth-child(2) { top: 9px; }
    .hb[aria-expanded="true"] span { transition: top .1806s cubic-bezier(.04,.04,.12,.96), transform .3192s cubic-bezier(.04,.04,.12,.96) .1008s; }
    .hb[aria-expanded="true"] span:nth-child(1) { top: 5.5px; transform: rotate(45deg); }
    .hb[aria-expanded="true"] span:nth-child(2) { top: 5.5px; transform: rotate(-45deg); }
  `,
  html: `<div class="stage"><button class="hb" type="button" aria-expanded="false" aria-label="Menu"><span class="box"><span></span><span></span></span></button></div>`,
  init(root) {
    const b = root.querySelector('.hb');
    b.addEventListener('click', () => b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') !== 'true'));
  },
};
