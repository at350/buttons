export default {
  id: 'ty-blend-stripes',
  credit: 'Difference-blend type — white display word over diagonal stripes that start sliding on hover; the letters invert wherever a stripe passes (mix-blend-mode: difference)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .stage {
      background: #e5e5e5;
      border-radius: 12px;
      padding: 16px;
    }
    .btn {
      cursor: pointer;
      border: 0;
      padding: 0;
      position: relative;
      overflow: hidden;
      border-radius: 8px;
      isolation: isolate;
      width: 268px;
      height: 84px;
      background: #fff;
      display: grid;
      place-items: center;
    }
    .stripes {
      position: absolute;
      inset: -40px -200px;
      z-index: 0;
      background: repeating-linear-gradient(-30deg, #fff 0 24px, #000 24px 32px);
      transform: translateX(0);
      animation: slide 1.4s linear infinite;
      animation-play-state: paused;
    }
    .btn:hover .stripes, .btn:focus-visible .stripes, .btn.on .stripes { animation-play-state: running; }
    .btn.on .stripes { background: repeating-linear-gradient(-30deg, #fde047 0 24px, #000 24px 32px); animation-duration: .8s; }
    .t {
      position: relative;
      z-index: 1;
      color: #fff;
      mix-blend-mode: difference;
      font: 800 36px/1 Syne, 'Space Grotesk', system-ui, sans-serif;
      letter-spacing: .01em;
      padding-left: .01em;
      white-space: nowrap;
      text-transform: uppercase;
      transition: transform .3s cubic-bezier(.34, 1.56, .64, 1);
    }
    .btn:hover .t { transform: scale(1.04); }
    .btn:active .t { transform: scale(.96); }
    .btn:focus-visible { outline: 2px solid #000; outline-offset: 3px; }
    @keyframes slide { to { transform: translateX(36.95px); } }
    @media (prefers-reduced-motion: reduce) { .stripes { animation: none !important; } }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false"><i class="stripes" aria-hidden="true"></i><span class="t">Invert</span></button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
