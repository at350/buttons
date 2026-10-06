export default {
  id: 'mn-hamburger-squeeze',
  credit: 'Jonsuh Hamburgers — "squeeze" (outer lines squeeze in, then rotate)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #0f172a; border-radius: 12px; padding: 8px; display: inline-block; }
    .hb {
      width: 48px; height: 48px; border: 0; background: transparent; border-radius: 8px;
      cursor: pointer; display: grid; place-items: center; padding: 0; color: #f8fafc;
    }
    .hb:hover { color: #fff; background: rgba(255,255,255,.08); }
    .hb:focus-visible { outline: 2px solid #38bdf8; outline-offset: 2px; }
    .box { position: relative; width: 30px; height: 20px; display: block; }
    .box span { position: absolute; left: 0; width: 30px; height: 3px; border-radius: 3px; background: currentColor; }
    .box span:nth-child(1) { top: 0; transition: top .1s .14s ease, transform .1s cubic-bezier(.55,.055,.675,.19); }
    .box span:nth-child(2) { top: 8.5px; transition: opacity .1s .14s ease; }
    .box span:nth-child(3) { top: 17px; transition: top .1s .14s ease, transform .1s cubic-bezier(.55,.055,.675,.19); }
    .hb[aria-expanded="true"] span:nth-child(1) { top: 8.5px; transform: rotate(45deg); transition: top .1s ease, transform .1s .14s cubic-bezier(.215,.61,.355,1); }
    .hb[aria-expanded="true"] span:nth-child(2) { opacity: 0; transition: opacity .1s ease; }
    .hb[aria-expanded="true"] span:nth-child(3) { top: 8.5px; transform: rotate(-45deg); transition: top .1s ease, transform .1s .14s cubic-bezier(.215,.61,.355,1); }
  `,
  html: `<div class="stage"><button class="hb" type="button" aria-expanded="false" aria-label="Menu"><span class="box"><span></span><span></span><span></span></span></button></div>`,
  init(root) {
    const b = root.querySelector('.hb');
    b.addEventListener('click', () => b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') !== 'true'));
  },
};
