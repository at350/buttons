export default {
  id: 'in-rocker-toggle',
  credit: 'Physical rocker switch — I / O halves tilt in 3D, the live side glows (CodePen "rocker switch" pattern)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px; background: #2b2d31; border-radius: 12px; }
    .t {
      position: relative; width: 112px; height: 54px; border: 0; padding: 0; cursor: pointer; border-radius: 10px;
      background: #0d0e10; box-shadow: inset 0 0 0 4px #1e2024, 0 4px 10px rgba(0,0,0,.6); perspective: 240px;
      -webkit-tap-highlight-color: transparent;
    }
    .t:focus-visible { outline: 3px solid #ffd60a; outline-offset: 3px; }
    .lever {
      position: absolute; inset: 7px; display: flex; transform-style: preserve-3d;
      transform: rotateY(24deg); transition: transform .18s ease-in;
    }
    .t[aria-checked="true"] .lever { transform: rotateY(-24deg); }
    .half {
      flex: 1; display: flex; align-items: center; justify-content: center;
      font: 800 17px/1 system-ui, sans-serif; color: #4a4d55; transition: color .2s, text-shadow .2s, background .2s;
    }
    .i { border-radius: 5px 0 0 5px; background: linear-gradient(#45484f, #2a2c31); box-shadow: inset 2px 0 4px rgba(0,0,0,.5); }
    .o { border-radius: 0 5px 5px 0; background: linear-gradient(#3a3c42, #22242a); color: #ff5f56; text-shadow: 0 0 8px rgba(255,95,86,.7); }
    .t[aria-checked="true"] .i { color: #5dff8f; text-shadow: 0 0 10px rgba(93,255,143,.75); background: linear-gradient(#3a3c42, #22242a); box-shadow: none; }
    .t[aria-checked="true"] .o { color: #4a4d55; text-shadow: none; background: linear-gradient(#45484f, #2a2c31); box-shadow: inset -2px 0 4px rgba(0,0,0,.5); }
    .t:active .lever { transform: rotateY(0deg); }
  `,
  html: `<div class="stage"><button class="t" type="button" role="switch" aria-checked="false" aria-label="Rocker switch">
    <span class="lever"><span class="half i">I</span><span class="half o">O</span></span>
  </button></div>`,
  init(root) {
    const b = root.querySelector('.t');
    b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true'));
  },
};
