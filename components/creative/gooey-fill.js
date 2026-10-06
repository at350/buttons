export default {
  id: 'cr-gooey-fill',
  credit: 'Gooey dripping button — blur + contrast "goo" filter trick (Lucas Bebber, CSS-Tricks)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 240px; height: 140px; max-width: 100%; background: #fff; border-radius: 12px; isolation: isolate; }
    .goo {
      position: absolute; inset: 0; border-radius: 12px; overflow: hidden; pointer-events: none;
      background: #fff; filter: blur(9px) contrast(30);
    }
    .pill {
      position: absolute; left: 50%; top: 26px; width: 160px; height: 52px; margin-left: -80px;
      border-radius: 26px; background: #ff4d6d; transition: transform .4s cubic-bezier(.34, 1.56, .64, 1);
    }
    .drop {
      position: absolute; left: 50%; top: 26px; width: 30px; height: 30px; border-radius: 50%; background: #ff4d6d;
      transform: translate(-50%, 11px) scale(.4);
      transition: transform .7s cubic-bezier(.34, 1.3, .64, 1);
    }
    .d1 { margin-left: -46px; } .d2 { margin-left: 0; } .d3 { margin-left: 46px; }
    .stage:hover .d1, .stage:focus-within .d1 { transform: translate(-50%, 70px) scale(1); transition-delay: .05s; }
    .stage:hover .d2, .stage:focus-within .d2 { transform: translate(-50%, 86px) scale(.9); transition-delay: 0s; }
    .stage:hover .d3, .stage:focus-within .d3 { transform: translate(-50%, 64px) scale(.8); transition-delay: .12s; }
    .stage:hover .pill { transform: scaleY(1.08); }
    .btn {
      position: absolute; left: 50%; top: 26px; width: 160px; height: 52px; margin-left: -80px;
      border: 0; border-radius: 26px; background: transparent; color: #fff; cursor: pointer;
      font: 800 16px/1 system-ui, sans-serif; letter-spacing: .04em;
    }
    .btn:active { transform: scale(.96); }
    .btn:focus-visible { outline: 2px solid #ff4d6d; outline-offset: 4px; }
  `,
  html: `
    <div class="stage">
      <div class="goo"><span class="pill"></span><span class="drop d1"></span><span class="drop d2"></span><span class="drop d3"></span></div>
      <button class="btn" type="button">Melt</button>
    </div>`,
};
