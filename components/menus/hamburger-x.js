export default {
  id: 'mn-hamburger-x',
  credit: 'The classic three-line hamburger that morphs into an X',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .hb {
      width: 48px; height: 48px; border: 0; background: transparent; border-radius: 10px;
      cursor: pointer; display: grid; place-items: center; padding: 0; color: #111;
    }
    .hb:hover { background: rgba(0,0,0,.06); }
    .hb:active { background: rgba(0,0,0,.1); }
    .hb:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .box { position: relative; width: 26px; height: 20px; display: block; }
    .box span {
      position: absolute; left: 0; width: 100%; height: 3px; border-radius: 2px; background: currentColor;
      transition: top .25s cubic-bezier(.4,0,.2,1) .25s, transform .25s cubic-bezier(.4,0,.2,1), opacity .2s;
    }
    .box span:nth-child(1) { top: 0; }
    .box span:nth-child(2) { top: 8.5px; }
    .box span:nth-child(3) { top: 17px; }
    .hb[aria-expanded="true"] span { transition: top .25s cubic-bezier(.4,0,.2,1), transform .25s cubic-bezier(.4,0,.2,1) .25s, opacity .2s; }
    .hb[aria-expanded="true"] span:nth-child(1) { top: 8.5px; transform: rotate(45deg); }
    .hb[aria-expanded="true"] span:nth-child(2) { opacity: 0; transform: scaleX(.2); }
    .hb[aria-expanded="true"] span:nth-child(3) { top: 8.5px; transform: rotate(-45deg); }
  `,
  html: `<button class="hb" type="button" aria-expanded="false" aria-label="Menu"><span class="box"><span></span><span></span><span></span></span></button>`,
  init(root) {
    const b = root.querySelector('.hb');
    b.addEventListener('click', () => b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') !== 'true'));
  },
};
