export default {
  id: 'ph-us-toggle-switch',
  credit: 'American toggle light switch on a cream Leviton-style plate',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 18px 28px; border-radius: 12px; background: linear-gradient(#f4f1e7, #e4dfcf); }
    .plate {
      position: relative; width: 70px; height: 114px; border-radius: 4px;
      background: linear-gradient(150deg, #fcf9f0, #ece7d7);
      box-shadow: inset 0 1px 0 #fff, inset 0 -1px 0 rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.25), 0 10px 20px rgba(0,0,0,.14);
    }
    .screw {
      position: absolute; left: 50%; width: 9px; height: 9px; margin-left: -4.5px; border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #fffef6, #d3cebb 60%, #9f9981);
      box-shadow: inset 0 1px 1px rgba(0,0,0,.35), 0 1px 0 #fff;
    }
    .screw::after { content: ''; position: absolute; left: 1.5px; right: 1.5px; top: 50%; height: 1.5px; margin-top: -1px; background: #6e6952; transform: rotate(-22deg); }
    .screw.t { top: 8px; } .screw.b { bottom: 8px; }
    .well {
      position: absolute; left: 50%; top: 50%; width: 24px; height: 46px; margin: -23px 0 0 -12px;
      border: 0; padding: 0; border-radius: 2px; background: #4e4a3d; cursor: pointer;
      box-shadow: inset 0 2px 4px rgba(0,0,0,.7), inset 0 -1px 0 rgba(255,255,255,.08);
      perspective: 90px; -webkit-tap-highlight-color: transparent;
    }
    .well:focus-visible { outline: 2px solid #3b82f6; outline-offset: 3px; }
    .paddle {
      position: absolute; left: 1px; width: 22px; height: 32px; border-radius: 2px; top: 12px;
      background: linear-gradient(90deg, #d9d4c2, #fbf8ee 38%, #eee9d8);
      box-shadow: 0 3px 4px rgba(0,0,0,.5), inset 0 1px 0 #fff, inset 0 -2px 0 rgba(0,0,0,.08);
      transform: rotateX(32deg); transform-origin: 50% 0;
      transition: transform .09s cubic-bezier(.2,1.5,.6,1), top .09s cubic-bezier(.2,1.5,.6,1), box-shadow .09s;
    }
    .well[aria-pressed="true"] .paddle { top: 2px; transform: rotateX(-32deg); transform-origin: 50% 100%; box-shadow: 0 -3px 4px rgba(0,0,0,.4), inset 0 1px 0 #fff; }
    .well:active .paddle { transform: rotateX(0deg); top: 7px; }
  `,
  html: `
    <div class="stage">
      <div class="plate">
        <span class="screw t"></span>
        <button class="well" type="button" aria-pressed="false" aria-label="light switch"><span class="paddle"></span></button>
        <span class="screw b"></span>
      </div>
    </div>`,
  init(root) {
    const b = root.querySelector('.well');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
