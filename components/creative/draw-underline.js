export default {
  id: 'cr-draw-underline',
  credit: 'Self-drawing editorial underline — draws in from the left, leaves to the right (background-size trick, NYT / Medium story links)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { display: inline-block; padding: 4px 14px 4px 4px; }
    .lnk {
      display: inline-flex; align-items: center; gap: 8px; padding: 6px 2px; cursor: pointer;
      font: 600 20px/1.2 'Fraunces', Georgia, serif; font-variation-settings: 'opsz' 48, 'SOFT' 50; color: #111; text-decoration: none;
    }
    .lnk .t {
      background: linear-gradient(currentColor, currentColor) no-repeat right bottom / 0 2px;
      transition: background-size .45s cubic-bezier(.65, 0, .35, 1); padding-bottom: 3px;
    }
    .lnk:hover .t, .lnk:focus-visible .t { background-size: 100% 2px; background-position-x: left; }
    .lnk svg { width: 20px; height: 20px; flex: none; transition: transform .4s cubic-bezier(.34, 1.56, .64, 1); }
    .lnk:hover svg, .lnk:focus-visible svg { transform: translateX(6px); }
    .lnk:active svg { transform: translateX(10px); }
    .lnk:focus-visible { outline: 2px solid #111; outline-offset: 4px; border-radius: 2px; }
    .lnk.on { color: #b91c1c; }
  `,
  html: `<span class="wrap"><a class="lnk" href="#"><span class="t">Read the story</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></a></span>`,
  init(root) {
    const a = root.querySelector('.lnk');
    a.addEventListener('click', (e) => { e.preventDefault(); a.classList.toggle('on'); });
  },
};
