export default {
  id: 'ty-liquid-fill',
  credit: 'Liquid-fill lettering — a sloshing wave of color rises inside the glyphs on hover (background-clip: text with a tiled SVG wave)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #0f172a; border-radius: 12px; padding: 18px 26px; }
    .btn {
      cursor: pointer; background: transparent; border: 0; padding: 0; display: inline-grid;
      font: 900 48px/1 Unbounded, Syne, system-ui, sans-serif; letter-spacing: -.02em;
    }
    .btn > span { grid-area: 1 / 1; white-space: nowrap; }
    .o { color: transparent; -webkit-text-stroke: 1.5px #38bdf8; transition: -webkit-text-stroke-color .4s; }
    .f {
      color: transparent; -webkit-background-clip: text; background-clip: text;
      background-image:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 16'%3E%3Cpath fill='%2338bdf8' d='M0 8 Q20 0 40 8 T80 8 V16 H0Z'/%3E%3C/svg%3E"),
        linear-gradient(#38bdf8, #38bdf8);
      background-repeat: repeat-x, no-repeat; background-size: 80px 16px, 100% 200px;
      background-position: 0 60px, 0 75px;
      transition: background-position .9s cubic-bezier(.22, 1, .36, 1);
    }
    .btn:hover .f, .btn:focus-visible .f, .btn.on .f { background-position: 0 -2px, 0 13px; }
    .btn:active .f { background-position: 0 22px, 0 37px; transition-duration: .35s; }
    .f { animation: slosh 1.6s linear infinite; animation-play-state: paused; }
    .btn:hover .f, .btn.on .f { animation-play-state: running; }
    .btn.on .o { -webkit-text-stroke-color: #22d3ee; }
    .btn.on .f { filter: drop-shadow(0 0 10px rgba(56, 189, 248, .55)); }
    .btn:focus-visible { outline: 2px solid #38bdf8; outline-offset: 6px; border-radius: 4px; }
    @keyframes slosh { from { background-position-x: 0, 0; } to { background-position-x: 80px, 0; } }
    @media (prefers-reduced-motion: reduce) { .f { animation: none; } }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false" aria-label="Pour"><span class="o" aria-hidden="true">POUR</span><span class="f" aria-hidden="true">POUR</span></button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
