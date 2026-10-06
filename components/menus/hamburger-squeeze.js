export default {
  id: 'mn-hamburger-squeeze',
  credit: 'Hamburgers by Jonathan Suh — "squeeze" (outer layers squeeze to the middle, then rotate to an X)',
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

    .hamburger--squeeze .hamburger-inner { transition-duration: .075s; transition-timing-function: cubic-bezier(.55,.055,.675,.19); }
    .hamburger--squeeze .hamburger-inner::before { transition: top .075s .12s ease, opacity .075s ease; }
    .hamburger--squeeze .hamburger-inner::after { transition: bottom .075s .12s ease, transform .075s cubic-bezier(.55,.055,.675,.19); }
    .hamburger--squeeze.is-active .hamburger-inner { transform: rotate(45deg); transition-delay: .12s; transition-timing-function: cubic-bezier(.215,.61,.355,1); }
    .hamburger--squeeze.is-active .hamburger-inner::before { top: 0; opacity: 0; transition: top .075s ease, opacity .075s .12s ease; }
    .hamburger--squeeze.is-active .hamburger-inner::after { bottom: 0; transform: rotate(-90deg); transition: bottom .075s ease, transform .075s .12s cubic-bezier(.215,.61,.355,1); }
  `,
  html: `<button class="hamburger hamburger--squeeze" type="button" aria-label="Menu" aria-expanded="false"><span class="hamburger-box"><span class="hamburger-inner"></span></span></button>`,
  init(root) {
    const b = root.querySelector('.hamburger');
    b.addEventListener('click', () => { const on = b.classList.toggle('is-active'); b.setAttribute('aria-expanded', String(on)); });
  },
};
