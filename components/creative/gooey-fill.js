export default {
  id: 'cr-gooey-fill',
  credit: 'Gooey dripping button — SVG blur + alpha-contrast "goo" filter (Lucas Bebber, CSS-Tricks "The Gooey Effect")',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 240px; height: 150px; max-width: 100%; border-radius: 12px; background: #fff1f3; overflow: hidden; }
    svg { position: absolute; left: 0; top: 0; width: 240px; height: 150px; pointer-events: none; }
    .goo > * { fill: #ff3b6b; transform-box: fill-box; transform-origin: center; }
    .pill { transition: transform .5s cubic-bezier(.34, 1.56, .64, 1); transform-origin: 50% 0; }
    .d { transition: transform .9s cubic-bezier(.34, 1.4, .64, 1); }
    .d1 { transition-delay: .06s; } .d2 { transition-delay: 0s; } .d3 { transition-delay: .14s; } .d4 { transition-delay: .2s; }
    .b { transition: transform .7s cubic-bezier(.34, 1.5, .64, 1) .05s; }
    .stage:hover .d1, .stage:has(.btn:focus-visible) .d1 { transform: translateY(34px) scale(1.05); }
    .stage:hover .d2, .stage:has(.btn:focus-visible) .d2 { transform: translateY(44px) scale(.95, 1.1); }
    .stage:hover .d3, .stage:has(.btn:focus-visible) .d3 { transform: translateY(28px) scale(.9); }
    .stage:hover .d4, .stage:has(.btn:focus-visible) .d4 { transform: translateY(44px) scale(.55); }
    .stage:hover .b, .stage:has(.btn:focus-visible) .b { transform: translateY(-26px) scale(.7); }
    .stage:hover .pill, .stage:has(.btn:focus-visible) .pill { transform: scale(1.03, 1.06); }
    .stage.squish .pill { transform: scale(1.08, .86); transition-duration: .12s; }
    .btn {
      position: absolute; left: 40px; top: 42px; width: 160px; height: 52px;
      border: 0; border-radius: 26px; background: transparent; color: #fff; cursor: pointer;
      font: 700 16px/1 'DM Sans', system-ui, sans-serif; letter-spacing: .01em;
      transition: transform .15s ease;
    }
    .btn:active { transform: scale(.97); }
    .btn:focus-visible { outline: 2px solid #b0103a; outline-offset: 4px; }
  `,
  html: `
    <div class="stage">
      <svg viewBox="0 0 240 150" aria-hidden="true">
        <defs>
          <filter id="goo" filterUnits="userSpaceOnUse" x="0" y="0" width="240" height="150" color-interpolation-filters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 32 -14"/>
          </filter>
        </defs>
        <g class="goo" filter="url(#goo)">
          <rect class="pill" x="40" y="42" width="160" height="52" rx="26"/>
          <circle class="d d1" cx="78" cy="72" r="13"/>
          <circle class="d d2" cx="122" cy="72" r="15"/>
          <circle class="d d3" cx="162" cy="72" r="11"/>
          <circle class="d d4" cx="100" cy="72" r="8"/>
          <circle class="b" cx="150" cy="62" r="12"/>
        </g>
      </svg>
      <button class="btn" type="button">Order now</button>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), b = root.querySelector('.btn');
    let t = 0;
    b.addEventListener('click', () => {
      stage.classList.add('squish');
      clearTimeout(t); t = setTimeout(() => stage.classList.remove('squish'), 140);
    });
    return () => clearTimeout(t);
  },
};
