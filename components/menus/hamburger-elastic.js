export default {
  id: 'mn-hamburger-elastic',
  credit: 'Hamburgers by Jonathan Suh — "elastic" (back-easing 135° spin into an X)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    /* Hamburgers by Jonathan Suh — default settings: 40px wide, 4px layers, 6px spacing, 15px padding, hover opacity .7 */
    .hamburger { padding: 15px; display: inline-block; cursor: pointer; transition-property: opacity, filter; transition-duration: .15s; transition-timing-function: linear; font: inherit; color: inherit; text-transform: none; background-color: transparent; border: 0; margin: 0; overflow: visible; border-radius: 4px; line-height: 0; }
    .hamburger:hover, .hamburger.is-active:hover { opacity: .7; }
    .hamburger:focus-visible { outline: 2px solid #000; outline-offset: 2px; }
    .hamburger-box { width: 40px; height: 24px; display: inline-block; position: relative; }
    .hamburger-inner { display: block; top: 50%; margin-top: -2px; }
    .hamburger-inner, .hamburger-inner::before, .hamburger-inner::after { width: 40px; height: 4px; background-color: #000; border-radius: 4px; position: absolute; transition-property: transform; transition-duration: .15s; transition-timing-function: ease; }
    .hamburger-inner::before, .hamburger-inner::after { content: ""; display: block; }
    .hamburger-inner::before { top: -10px; }
    .hamburger-inner::after { bottom: -10px; }

    .hamburger--elastic .hamburger-inner { top: 2px; transition-duration: .275s; transition-timing-function: cubic-bezier(.68,-.55,.265,1.55); }
    .hamburger--elastic .hamburger-inner::before { top: 10px; transition: opacity .125s .275s ease; }
    .hamburger--elastic .hamburger-inner::after { top: 20px; bottom: auto; transition: transform .275s cubic-bezier(.68,-.55,.265,1.55); }
    .hamburger--elastic.is-active .hamburger-inner { transform: translate3d(0, 10px, 0) rotate(135deg); transition-delay: .075s; }
    .hamburger--elastic.is-active .hamburger-inner::before { transition-delay: 0s; opacity: 0; }
    .hamburger--elastic.is-active .hamburger-inner::after { transform: translate3d(0, -20px, 0) rotate(-270deg); transition-delay: .075s; }
  `,
  html: `<button class="hamburger hamburger--elastic" type="button" aria-label="Menu" aria-expanded="false"><span class="hamburger-box"><span class="hamburger-inner"></span></span></button>`,
  init(root) {
    const b = root.querySelector('.hamburger');
    b.addEventListener('click', () => { const on = b.classList.toggle('is-active'); b.setAttribute('aria-expanded', String(on)); });
  },
};
