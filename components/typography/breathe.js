export default {
  id: 'ty-breathe',
  credit: 'Breathing tracking — while hovered the letter-spacing and weight inhale and exhale in a slow loop inside a fixed-width box (meditation-app "breathe" CTAs like Calm / Headspace)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .stage {
      background: radial-gradient(circle at 50% 50%, #312e81, #0f0c29 70%);
      border-radius: 12px;
      padding: 24px 30px;
    }
    .btn {
      cursor: pointer;
      background: transparent;
      border: 1px solid rgba(255,255,255,.35);
      border-radius: 999px;
      padding: 16px 30px;
      color: #e0e7ff;
      font: 400 20px/1 'DM Sans', Inter, system-ui, sans-serif;
      text-transform: lowercase;
      display: inline-grid;
      place-items: center;
      position: relative;
      transition: border-color .4s, box-shadow .6s;
    }
    .btn:hover, .btn.on { border-color: rgba(255,255,255,.8); box-shadow: 0 0 0 10px rgba(129, 140, 248, .12), 0 0 40px rgba(129, 140, 248, .35); }
    .btn:focus-visible { outline: 2px solid #c7d2fe; outline-offset: 4px; }
    .btn > span { grid-area: 1 / 1; white-space: nowrap; }
    .g {
      visibility: hidden;
      letter-spacing: .5em;
      padding-left: .5em;
      font-variation-settings: 'wght' 700;
    }
    .v {
      letter-spacing: .12em;
      padding-left: .12em;
      font-variation-settings: 'wght' 300;
      animation: breathe 5s ease-in-out infinite;
      animation-play-state: paused;
    }
    .btn:hover .v, .btn:focus-visible .v, .btn.on .v { animation-play-state: running; }
    .btn:active .v { animation-play-state: paused; }
    .halo {
      position: absolute;
      inset: -1px;
      border-radius: 999px;
      border: 1px solid rgba(165, 180, 252, .7);
      transform: scale(.96);
      opacity: 0;
      animation: halo 5s ease-in-out infinite;
      animation-play-state: paused;
      pointer-events: none;
    }
    .btn:hover .halo, .btn.on .halo { animation-play-state: running; }
    @keyframes breathe {
      0%, 100% {
        letter-spacing: .12em;
        padding-left: .12em;
        font-variation-settings: 'wght' 300;
      }
      45%, 55% {
        letter-spacing: .5em;
        padding-left: .5em;
        font-variation-settings: 'wght' 700;
      }
    }
    @keyframes halo { 0%, 100% { transform: scale(.96); opacity: 0; } 45%, 55% { transform: scale(1.14, 1.4); opacity: .9; } }
    @media (prefers-reduced-motion: reduce) { .v, .halo { animation: none; } }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false"><i class="halo" aria-hidden="true" data-overhang></i><span class="g" aria-hidden="true">breathe</span><span class="v">breathe</span></button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
