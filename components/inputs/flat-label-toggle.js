export default {
  id: 'in-flat-label-toggle',
  credit: 'Flat UI toggle — square knob with ON / OFF label sliding inside the track',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .t {
      position: relative; width: 84px; height: 34px; border-radius: 6px; border: 0; padding: 0; cursor: pointer; overflow: hidden;
      background: #e74c3c; transition: background .25s; font: 700 12px/1 system-ui, sans-serif; letter-spacing: .1em; color: #fff;
      -webkit-tap-highlight-color: transparent;
    }
    .t:hover { filter: brightness(1.06); }
    .t:focus-visible { outline: 3px solid #2d3436; outline-offset: 2px; }
    .t[aria-checked="true"] { background: #2ecc71; }
    .lbl { position: absolute; top: 0; height: 100%; width: 50px; display: flex; align-items: center; justify-content: center; transition: transform .25s cubic-bezier(.4,0,.2,1), opacity .2s; }
    .off { right: 0; }
    .on { left: 0; transform: translateX(-20px); opacity: 0; }
    .t[aria-checked="true"] .off { transform: translateX(20px); opacity: 0; }
    .t[aria-checked="true"] .on { transform: none; opacity: 1; }
    .knob {
      position: absolute; top: 4px; left: 4px; width: 26px; height: 26px; border-radius: 4px; background: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,.3); transition: transform .25s cubic-bezier(.4,0,.2,1);
    }
    .t:active .knob { transform: scaleX(1.15); transform-origin: left; }
    .t[aria-checked="true"] .knob { transform: translateX(50px); }
    .t[aria-checked="true"]:active .knob { transform: translateX(46px) scaleX(1.15); transform-origin: right; }
  `,
  html: `<button class="t" type="button" role="switch" aria-checked="false" aria-label="Flat toggle">
    <span class="lbl on">ON</span><span class="lbl off">OFF</span><span class="knob"></span>
  </button>`,
  init(root) {
    const b = root.querySelector('.t');
    b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true'));
  },
};
