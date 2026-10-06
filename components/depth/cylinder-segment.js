export default {
  id: 'dp-cylinder-segment',
  credit: '3D segmented control — a three-faced drum slides along the trough and rolls on X to present the chosen label',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 26px 30px; perspective: 700px; background: #f5f5f4; border-radius: 12px; }
    .seg {
      --i: 0; position: relative; display: grid; grid-template-columns: repeat(3, 84px); height: 44px; border-radius: 12px; padding: 4px;
      background: linear-gradient(180deg, #d6d3d1, #e7e5e4); box-shadow: inset 0 2px 6px rgba(0, 0, 0, .25), inset 0 -1px 0 rgba(255, 255, 255, .7);
      transform-style: preserve-3d;
    }
    .opt {
      position: relative; z-index: 1; border: 0; background: transparent; cursor: pointer; color: #57534e;
      font: 600 13px/1 'Inter', system-ui, sans-serif; letter-spacing: .02em; border-radius: 9px; transition: color .2s;
    }
    .opt:hover { color: #1c1917; }
    .opt[aria-checked="true"] { color: transparent; }
    .opt:focus-visible { outline: 2px solid #ea580c; outline-offset: -2px; }
    .drum {
      position: absolute; left: 4px; top: 4px; width: 84px; height: 36px; pointer-events: none;
      transform-style: preserve-3d; transform: translateX(calc(var(--i) * 84px)) rotateX(calc(var(--i) * -120deg));
      transition: transform .6s cubic-bezier(.3, 1.3, .4, 1);
    }
    .face {
      position: absolute; inset: 0; border-radius: 9px; display: grid; place-items: center; color: #fff;
      font: 700 13px/1 'Inter', system-ui, sans-serif; letter-spacing: .02em;
      background: linear-gradient(180deg, #fb923c, #ea580c 55%, #c2410c); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .45), 0 4px 10px rgba(0, 0, 0, .25);
      -webkit-backface-visibility: hidden; backface-visibility: hidden;
    }
    .face:nth-child(1) { transform: rotateX(0deg) translateZ(10.4px); }
    .face:nth-child(2) { transform: rotateX(120deg) translateZ(10.4px); }
    .face:nth-child(3) { transform: rotateX(240deg) translateZ(10.4px); }
  `,
  html: `
    <div class="stage">
      <div class="seg" role="radiogroup">
        <div class="drum" aria-hidden="true"><span class="face">Day</span><span class="face">Week</span><span class="face">Month</span></div>
        <button class="opt" type="button" role="radio" aria-checked="true">Day</button>
        <button class="opt" type="button" role="radio" aria-checked="false">Week</button>
        <button class="opt" type="button" role="radio" aria-checked="false">Month</button>
      </div>
    </div>`,
  init(root) {
    const seg = root.querySelector('.seg'), opts = [...root.querySelectorAll('.opt')];
    const pick = (i) => {
      seg.style.setProperty('--i', i);
      opts.forEach((o, k) => o.setAttribute('aria-checked', String(k === i)));
    };
    opts.forEach((o, i) => {
      o.addEventListener('click', () => pick(i));
      o.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const n = (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3; pick(n); opts[n].focus();
        }
      });
    });
  },
};
