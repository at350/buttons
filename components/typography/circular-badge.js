export default {
  id: 'ty-circular-badge',
  credit: 'Spinning text ring — "OPEN • OPEN •" on an SVG textPath that rotates slowly, speeds up on hover and reverses when toggled (portfolio "hire me" badge)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      cursor: pointer;
      width: 132px;
      height: 132px;
      border-radius: 50%;
      border: 0;
      background: #111;
      color: #fff;
      padding: 0;
      display: grid;
      place-items: center;
      position: relative;
      transition: background .3s, transform .3s cubic-bezier(.34, 1.56, .64, 1);
    }
    .btn:hover { transform: scale(1.04); }
    .btn:active { transform: scale(.96); }
    .btn.on { background: #ff3b1f; }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 4px; }
    .ring {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      animation: spin 14s linear infinite;
    }
    .btn:hover .ring { animation-duration: 4s; }
    .btn.on .ring { animation-direction: reverse; animation-duration: 6s; }
    .ring text {
      font: 700 14.5px 'Space Grotesk', Inter, system-ui, sans-serif;
      letter-spacing: .26em;
      fill: currentColor;
      text-transform: uppercase;
    }
    .ar {
      width: 34px;
      height: 34px;
      stroke: currentColor;
      transition: transform .45s cubic-bezier(.34, 1.56, .64, 1);
    }
    .btn:hover .ar { transform: rotate(-45deg) translate(2px, -2px); }
    .btn.on .ar { transform: rotate(90deg); }
    @keyframes spin { to { transform: rotate(360deg); } }
    @media (prefers-reduced-motion: reduce) { .ring { animation-duration: 60s !important; } }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="Open"><svg class="ring" viewBox="0 0 132 132" aria-hidden="true"><defs><path id="ty-cb-p" d="M66 66 m-48 0 a48 48 0 1 1 96 0 a48 48 0 1 1 -96 0"/></defs><text textLength="301" lengthAdjust="spacing"><textPath href="#ty-cb-p" startOffset="0">OPEN • OPEN • OPEN • OPEN •</textPath></text></svg><svg class="ar" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
