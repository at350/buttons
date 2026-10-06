export default {
  id: 'cr-draw-underline',
  credit: 'Self-drawing underline link — enters from left, exits to the right (background-size trick)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .lnk {
      display: inline-flex; align-items: center; gap: 8px; padding: 6px 2px; cursor: pointer;
      font: 600 20px/1.2 Georgia, 'Times New Roman', serif; color: #111; text-decoration: none;
    }
    .lnk .t {
      background: linear-gradient(currentColor, currentColor) no-repeat right bottom / 0 2px;
      transition: background-size .4s cubic-bezier(.4, 0, .2, 1); padding-bottom: 2px;
    }
    .lnk:hover .t, .lnk:focus-visible .t { background-size: 100% 2px; background-position-x: left; }
    .lnk svg { width: 20px; height: 20px; transition: transform .4s cubic-bezier(.34, 1.56, .64, 1); }
    .lnk:hover svg, .lnk:focus-visible svg { transform: translateX(6px); }
    .lnk:active svg { transform: translateX(10px); }
    .lnk:focus-visible { outline: 2px solid #111; outline-offset: 4px; border-radius: 2px; }
    .lnk.on { color: #b91c1c; }
  `,
  html: `<a class="lnk" href="#"><span class="t">Read the story</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>`,
  init(root) {
    const a = root.querySelector('.lnk');
    a.addEventListener('click', (e) => { e.preventDefault(); a.classList.toggle('on'); });
  },
};
