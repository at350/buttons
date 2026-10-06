export default {
  id: 'cr-leather-stitch',
  credit: 'Skeuomorphic stitched leather — iOS 6 Find My Friends era: tanned grain, dashed thread stitching, letterpress label',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { display: inline-block; padding: 4px 8px 16px; }
    .btn {
      position: relative; cursor: pointer;
      font: 700 14px/1 Georgia, 'Times New Roman', serif; letter-spacing: .12em; text-transform: uppercase;
      color: #f3e4c4; text-shadow: 0 -1px 0 rgba(0, 0, 0, .7);
      padding: 20px 36px; border-radius: 10px; border: 1px solid #2e1a0e;
      background:
        radial-gradient(ellipse at 30% 15%, rgba(255, 255, 255, .16), transparent 55%),
        repeating-radial-gradient(circle at 20% 30%, rgba(0, 0, 0, .09) 0 1px, transparent 1px 3px),
        repeating-radial-gradient(circle at 70% 80%, rgba(255, 255, 255, .05) 0 1px, transparent 1px 4px),
        linear-gradient(#8a4b2a, #5a2d16);
      box-shadow: 0 4px 0 #35190c, 0 9px 14px rgba(0, 0, 0, .4), inset 0 1px 0 rgba(255, 255, 255, .22);
      outline: 2px dashed rgba(243, 228, 196, .85); outline-offset: -8px;
      transition: transform .08s ease, box-shadow .08s ease, filter .15s;
    }
    .btn:hover { filter: brightness(1.1); }
    .btn:active {
      transform: translateY(4px);
      box-shadow: 0 0 0 #35190c, 0 2px 6px rgba(0, 0, 0, .35), inset 0 3px 8px rgba(0, 0, 0, .5);
    }
    .btn:focus-visible { box-shadow: 0 4px 0 #35190c, 0 0 0 3px #fff, 0 0 0 5px #8a4b2a; }
  `,
  html: `<span class="wrap"><button class="btn" type="button">Add Friend</button></span>`,
};
