export default {
  id: 'bt-ios-toggle',
  credit: 'Apple iOS 17 — UISwitch (green, springy knob stretch)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sw {
      position: relative; width: 51px; height: 31px; border-radius: 16px; border: 0; padding: 0;
      background: #e9e9ea; cursor: pointer; -webkit-tap-highlight-color: transparent;
      transition: background .25s cubic-bezier(.4,0,.2,1);
    }
    .sw:focus-visible { outline: 3px solid #007aff; outline-offset: 3px; }
    .knob {
      position: absolute; top: 2px; left: 2px; width: 27px; height: 27px; border-radius: 14px;
      background: #fff; box-shadow: 0 3px 8px rgba(0,0,0,.15), 0 3px 1px rgba(0,0,0,.06);
      transition: transform .3s cubic-bezier(.34,1.56,.64,1), width .2s cubic-bezier(.4,0,.2,1);
    }
    .sw:active .knob { width: 34px; }
    .sw[aria-checked="true"] { background: #34c759; }
    .sw[aria-checked="true"] .knob { transform: translateX(20px); }
    .sw[aria-checked="true"]:active .knob { transform: translateX(13px); }
  `,
  html: `<button class="sw" type="button" role="switch" aria-checked="false" aria-label="iOS toggle"><span class="knob"></span></button>`,
  init(root) {
    const b = root.querySelector('.sw');
    b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true'));
  },
};
