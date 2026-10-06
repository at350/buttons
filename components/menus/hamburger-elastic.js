export default {
  id: 'mn-hamburger-elastic',
  credit: 'Jonsuh Hamburgers — "elastic" (overshooting spin into an X)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .hb {
      width: 52px; height: 52px; border: 2px solid #111; background: #ffe14d; border-radius: 12px;
      cursor: pointer; display: grid; place-items: center; padding: 0; color: #111;
      box-shadow: 3px 3px 0 #111; transition: transform .1s, box-shadow .1s;
    }
    .hb:hover { background: #ffd21f; }
    .hb:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0 #111; }
    .hb:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
    .box { position: relative; width: 28px; height: 20px; display: block; }
    .box span { position: absolute; left: 0; width: 28px; height: 3px; border-radius: 3px; background: currentColor; }
    .box span:nth-child(1) { top: 0; transition: transform .275s cubic-bezier(.68,-.55,.265,1.55); }
    .box span:nth-child(2) { top: 8.5px; transition: transform .275s cubic-bezier(.68,-.55,.265,1.55), opacity .125s .275s; }
    .box span:nth-child(3) { top: 17px; transition: transform .275s cubic-bezier(.68,-.55,.265,1.55); }
    .hb[aria-expanded="true"] span:nth-child(1) { transform: translateY(8.5px) rotate(135deg); transition-delay: .075s; }
    .hb[aria-expanded="true"] span:nth-child(2) { opacity: 0; transform: scaleX(0); transition: transform .275s cubic-bezier(.68,-.55,.265,1.55), opacity .125s; }
    .hb[aria-expanded="true"] span:nth-child(3) { transform: translateY(-8.5px) rotate(-270deg); transition-delay: .075s; }
  `,
  html: `<button class="hb" type="button" aria-expanded="false" aria-label="Menu"><span class="box"><span></span><span></span><span></span></span></button>`,
  init(root) {
    const b = root.querySelector('.hb');
    b.addEventListener('click', () => b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') !== 'true'));
  },
};
