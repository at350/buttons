export default {
  id: 'cr-pow-starburst',
  credit: 'Comic-book "POW!" starburst — Roy Lichtenstein / Ben-Day dot balloon: inked SVG burst, hard offset shadow, punch on click',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 10px 14px 12px; }
    .btn {
      position: relative; display: block; width: 196px; height: 136px; border: 0; padding: 0; cursor: pointer; background: transparent;
      transition: transform .3s cubic-bezier(.34, 1.56, .64, 1);
    }
    svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
    .sh { fill: #111; transform: translate(6px, 6px); }
    .burst { stroke: #111; stroke-width: 4; stroke-linejoin: miter; stroke-miterlimit: 8; }
    .fill-y { fill: #ffd500; transition: fill .2s ease; }
    .dots { transition: opacity .2s ease; }
    .t {
      position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%) rotate(-8deg) skewX(-8deg);
      font: 800 40px/1 'Bricolage Grotesque', Impact, 'Arial Black', sans-serif; font-variation-settings: 'wdth' 75, 'opsz' 96;
      letter-spacing: .01em; color: #e3262f; -webkit-text-stroke: 2px #111; paint-order: stroke fill;
      text-shadow: 3px 3px 0 #111;
    }
    .btn:hover { transform: rotate(-4deg) scale(1.05); }
    .btn:active { transform: rotate(3deg) scale(.94); transition-duration: .08s; }
    .btn.bang { animation: bang .45s cubic-bezier(.34, 1.56, .64, 1); }
    .btn[aria-pressed="true"] .fill-y { fill: #29b6f6; }
    .btn[aria-pressed="true"] .t { color: #fff; }
    .btn:focus-visible { outline: 0; }
    .btn:focus-visible .burst { stroke: #2563eb; }
    @keyframes bang { 0% { transform: scale(.82) rotate(-10deg); } 55% { transform: scale(1.08) rotate(3deg); } 100% { transform: scale(1) rotate(0); } }
  `,
  html: `
    <div class="stage">
      <button class="btn" type="button" aria-pressed="false">
        <svg viewBox="0 0 196 136" aria-hidden="true">
          <defs>
            <pattern id="bd" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="3.5" cy="3.5" r="1.6" fill="#e3262f" fill-opacity=".55"/></pattern>
          </defs>
          <g transform="translate(3 3)">
            <polygon class="sh" points="95.0,8.2 107.4,28.0 132.1,12.5 129.3,35.6 161.2,29.0 146.5,48.1 174.3,52.7 153.1,65.0 174.2,77.3 146.9,82.0 158.7,99.6 129.4,94.4 131.4,116.6 108.4,105.1 95.0,120.8 82.5,102.3 58.0,117.4 56.8,97.6 28.5,101.1 43.3,82.0 9.4,78.3 40.1,65.0 10.2,51.8 44.0,48.3 30.9,30.2 60.5,35.5 58.9,13.9 81.6,24.9"/>
            <polygon class="burst fill-y" points="95.0,8.2 107.4,28.0 132.1,12.5 129.3,35.6 161.2,29.0 146.5,48.1 174.3,52.7 153.1,65.0 174.2,77.3 146.9,82.0 158.7,99.6 129.4,94.4 131.4,116.6 108.4,105.1 95.0,120.8 82.5,102.3 58.0,117.4 56.8,97.6 28.5,101.1 43.3,82.0 9.4,78.3 40.1,65.0 10.2,51.8 44.0,48.3 30.9,30.2 60.5,35.5 58.9,13.9 81.6,24.9"/>
            <polygon class="dots" fill="url(#bd)" points="95.0,8.2 107.4,28.0 132.1,12.5 129.3,35.6 161.2,29.0 146.5,48.1 174.3,52.7 153.1,65.0 174.2,77.3 146.9,82.0 158.7,99.6 129.4,94.4 131.4,116.6 108.4,105.1 95.0,120.8 82.5,102.3 58.0,117.4 56.8,97.6 28.5,101.1 43.3,82.0 9.4,78.3 40.1,65.0 10.2,51.8 44.0,48.3 30.9,30.2 60.5,35.5 58.9,13.9 81.6,24.9"/>
          </g>
        </svg>
        <span class="t">POW!</span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => {
      b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
      b.classList.remove('bang'); void b.offsetWidth; b.classList.add('bang');
    });
    b.addEventListener('animationend', () => b.classList.remove('bang'));
  },
};
