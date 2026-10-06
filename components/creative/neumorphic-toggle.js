export default {
  id: 'cr-neumorphic-toggle',
  credit: 'Neumorphic switch — Soft UI toggle (neumorphism.io #e0e0e0 palette: inset track, convex knob)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #e0e0e0; padding: 30px 40px; border-radius: 12px; }
    .sw {
      position: relative; display: block; width: 88px; height: 44px; border-radius: 22px; border: 0; cursor: pointer; padding: 0;
      background: #e0e0e0;
      box-shadow: inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff;
    }
    .knob {
      position: absolute; top: 6px; left: 6px; width: 32px; height: 32px; border-radius: 50%;
      background: linear-gradient(145deg, #f0f0f0, #cacaca);
      box-shadow: 4px 4px 8px #bebebe, -4px -4px 8px #ffffff;
      transition: transform .45s cubic-bezier(.34, 1.4, .64, 1), box-shadow .25s ease;
    }
    .knob::after {
      content: ''; position: absolute; inset: 12px; border-radius: 50%; background: #c4c4c4;
      box-shadow: inset 1px 1px 2px #a8a8a8; transition: background .3s ease, box-shadow .3s ease;
    }
    .sw:hover .knob { box-shadow: 5px 5px 10px #b4b4b4, -5px -5px 10px #ffffff; }
    .sw:active .knob { transform: scale(.94); }
    .sw[aria-checked="true"] .knob { transform: translateX(44px); }
    .sw[aria-checked="true"]:active .knob { transform: translateX(44px) scale(.94); }
    .sw[aria-checked="true"] .knob::after { background: #22c55e; box-shadow: 0 0 8px rgba(34, 197, 94, .8); }
    .sw:focus-visible { outline: 2px solid #22c55e; outline-offset: 5px; }
  `,
  html: `<div class="stage"><button class="sw" type="button" role="switch" aria-checked="false" aria-label="Notifications"><span class="knob"></span></button></div>`,
  init(root) {
    const s = root.querySelector('.sw');
    s.addEventListener('click', () => s.setAttribute('aria-checked', String(s.getAttribute('aria-checked') !== 'true')));
  },
};
