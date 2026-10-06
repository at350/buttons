export default {
  id: 'ph-guard-toggle',
  credit: 'Aircraft-style guarded toggle switch — lift the red guard, flip the bat; closing the guard forces it off',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 20px 28px; border-radius: 12px; background: linear-gradient(#3c3f45, #262a30); }
    .panel { position: relative; width: 70px; height: 112px; border-radius: 6px; background: linear-gradient(160deg, #5e636b, #40454c); box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 2px 4px rgba(0,0,0,.6); perspective: 260px; }
    .nut { position: absolute; left: 50%; top: 50%; width: 34px; height: 34px; margin: -17px; background: radial-gradient(circle, #1a1a1c 0 22%, #9aa0a6 25%, #e9ecef 32%, #7a8087 100%); clip-path: polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%); box-shadow: inset 0 2px 3px rgba(0,0,0,.6); }
    .sw { position: absolute; left: 50%; top: 50%; width: 30px; height: 70px; margin: -35px 0 0 -15px; border: 0; padding: 0; background: transparent; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .sw:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 2px; border-radius: 4px; }
    .bat {
      position: absolute; left: 50%; top: 35px; width: 12px; height: 34px; margin-left: -6px; border-radius: 6px 6px 7px 7px;
      background: linear-gradient(90deg, #5a5e64, #f0f2f4 40%, #b7bbc0 60%, #4e5258); box-shadow: 0 3px 4px rgba(0,0,0,.7);
      transform-origin: 50% 0; transform: rotateX(28deg); transition: transform .09s cubic-bezier(.3,1.5,.6,1), top .09s cubic-bezier(.3,1.5,.6,1);
    }
    .sw[aria-pressed="true"] .bat { top: 1px; transform-origin: 50% 100%; transform: rotateX(-28deg); }
    .hinge { position: absolute; left: 12px; right: 12px; bottom: 4px; height: 6px; border-radius: 3px; background: linear-gradient(#e6e6e6, #777); box-shadow: 0 1px 2px rgba(0,0,0,.6); }
    .guard {
      position: absolute; left: 10px; right: 10px; top: 6px; bottom: 8px; border: 0; padding: 0; border-radius: 6px 6px 3px 3px; cursor: pointer;
      background: linear-gradient(90deg, #8a0d10, #e4201c 40%, #c2161a 60%, #6f0a0c); box-shadow: 0 4px 6px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.3);
      transform-origin: 50% 100%; transition: transform .3s cubic-bezier(.3,1.2,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .guard::after { content: ''; position: absolute; left: 50%; top: 8px; width: 16px; height: 6px; margin-left: -8px; border-radius: 3px; background: rgba(0,0,0,.35); box-shadow: inset 0 1px 1px rgba(0,0,0,.6); }
    .guard[aria-expanded="true"] { transform: rotateX(115deg); box-shadow: 0 -4px 8px rgba(0,0,0,.3); }
    .guard:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="panel">
        <div class="nut"></div>
        <button class="sw" type="button" aria-pressed="false" aria-label="toggle switch" tabindex="-1"><span class="bat"></span></button>
        <button class="guard" type="button" aria-expanded="false" aria-label="switch guard"></button>
        <div class="hinge"></div>
      </div>
    </div>`,
  init(root) {
    const guard = root.querySelector('.guard'), sw = root.querySelector('.sw');
    guard.addEventListener('click', () => {
      const open = guard.getAttribute('aria-expanded') !== 'true';
      guard.setAttribute('aria-expanded', open); sw.tabIndex = open ? 0 : -1;
      if (!open) sw.setAttribute('aria-pressed', 'false');
    });
    sw.addEventListener('click', () => sw.setAttribute('aria-pressed', sw.getAttribute('aria-pressed') !== 'true'));
  },
};
