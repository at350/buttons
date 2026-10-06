export default {
  id: 'cr-neumorphic-toggle',
  credit: 'Neumorphic switch — Soft UI toggle, Dribbble 2020 trend',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #e0e5ec; padding: 28px 40px; border-radius: 12px; }
    .sw {
      position: relative; width: 84px; height: 40px; border-radius: 20px; border: 0; cursor: pointer;
      background: #e0e5ec; padding: 0;
      box-shadow: inset 6px 6px 12px #b8bec7, inset -6px -6px 12px #ffffff;
    }
    .knob {
      position: absolute; top: 5px; left: 5px; width: 30px; height: 30px; border-radius: 50%;
      background: #e0e5ec; box-shadow: 4px 4px 8px #b8bec7, -4px -4px 8px #ffffff;
      transition: transform .4s cubic-bezier(.34, 1.56, .64, 1);
    }
    .knob::after {
      content: ''; position: absolute; inset: 11px; border-radius: 50%; background: #b8bec7;
      transition: background .3s, box-shadow .3s;
    }
    .sw:hover .knob { box-shadow: 6px 6px 12px #b8bec7, -6px -6px 12px #ffffff; }
    .sw[aria-checked="true"] .knob { transform: translateX(44px); }
    .sw[aria-checked="true"] .knob::after { background: #3b7ddd; box-shadow: 0 0 10px #3b7ddd; }
    .sw:focus-visible { outline: 2px solid #3b7ddd; outline-offset: 4px; }
  `,
  html: `<div class="stage"><button class="sw" type="button" role="switch" aria-checked="false" aria-label="toggle"><span class="knob"></span></button></div>`,
  init(root) {
    const s = root.querySelector('.sw');
    s.addEventListener('click', () => s.setAttribute('aria-checked', String(s.getAttribute('aria-checked') !== 'true')));
  },
};
