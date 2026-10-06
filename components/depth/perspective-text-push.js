export default {
  id: 'dp-perspective-text-push',
  credit: 'Extruded perspective text button — stacked text-shadow gives the label real thickness, pressing flattens it into the plate',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 30px 36px 34px;
      perspective: 500px;
      background: #fde047;
      border-radius: 12px;
    }
    .plate {
      position: relative;
      border: 0;
      cursor: pointer;
      padding: 18px 30px 14px;
      border-radius: 14px;
      background: #111;
      color: #fde047;
      transform-style: preserve-3d;
      transform: rotateX(24deg);
      box-shadow: 0 18px 0 -6px #000, 0 26px 30px rgba(0, 0, 0, .35);
      transition: transform .25s cubic-bezier(.3, 1.3, .4, 1), box-shadow .25s;
    }
    .plate:hover { transform: rotateX(18deg) translateZ(8px); }
    .plate:active { transform: rotateX(26deg) translateZ(-8px); box-shadow: 0 8px 0 -6px #000, 0 10px 14px rgba(0, 0, 0, .3); }
    .t {
      display: block;
      font: 900 40px/1 'Unbounded', system-ui, sans-serif;
      letter-spacing: .02em;
      transform: translateZ(28px);
      text-shadow: 0 1px 0 #ca8a04, 0 2px 0 #b45309, 0 3px 0 #a16207, 0 4px 0 #92400e, 0 5px 0 #78350f, 0 6px 0 #713f12, 0 7px 0 #451a03, 0 10px 14px rgba(0, 0, 0, .6);
      transition: transform .25s cubic-bezier(.3, 1.3, .4, 1), text-shadow .25s;
    }
    .plate:hover .t { transform: translateZ(40px); }
    .plate:active .t { transform: translateZ(0); text-shadow: 0 1px 0 #ca8a04, 0 2px 4px rgba(0, 0, 0, .5); }
    .plate[aria-pressed="true"] {
      background: #fde047;
      color: #111;
      box-shadow: inset 0 0 0 3px #111, 0 18px 0 -6px #000, 0 26px 30px rgba(0, 0, 0, .35);
    }
    .plate[aria-pressed="true"] .t { text-shadow: 0 1px 0 #444, 0 2px 0 #333, 0 3px 0 #222, 0 4px 0 #111, 0 8px 12px rgba(0, 0, 0, .45); }
    .plate:focus-visible { outline: 3px solid #111; outline-offset: 4px; }
  `,
  html: `<div class="stage"><button class="plate" type="button" aria-pressed="false"><span class="t">PUSH</span></button></div>`,
  init(root) {
    const b = root.querySelector('.plate');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
