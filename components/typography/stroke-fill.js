export default {
  id: 'ty-stroke-fill',
  credit: 'Outline-to-solid — hairline-outlined Bricolage Grotesque display word that fills in with a left-to-right wipe on hover, underline drawing in behind it (Awwwards-style hero CTAs)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .stage { background: #f5f3ee; border-radius: 12px; padding: 12px 20px 14px; }
    .btn {
      --ink: #111;
      cursor: pointer;
      background: transparent;
      border: 0;
      padding: 4px 2px 12px;
      display: inline-grid;
      position: relative;
      font: 700 52px/1 'Bricolage Grotesque', 'Space Grotesk', system-ui, sans-serif;
      font-variation-settings: 'opsz' 52, 'wdth' 100, 'wght' 700;
      letter-spacing: .03em;
    }
    .btn.on { --ink: #e11d48; }
    .btn > span { grid-area: 1 / 1; white-space: nowrap; }
    /* outline = double-width stroke under a knockout fill in the stage color: a plain text-stroke would
       draw the overlapping contours inside the variable glyphs */
    .o { color: var(--ink); -webkit-text-stroke: 2.4px var(--ink); transition: color .4s, -webkit-text-stroke-color .4s; }
    .k { color: #f5f3ee; }
    .f {
      color: var(--ink);
      clip-path: inset(-10% 100% -10% 0);
      transition: clip-path .6s cubic-bezier(.76, 0, .24, 1), color .4s;
    }
    .btn:hover .f, .btn:focus-visible .f, .btn.on .f { clip-path: inset(-10% 0 -10% 0); }
    .btn:active .f { clip-path: inset(-10% 0 -10% 40%); transition-duration: .2s; }
    .line {
      position: absolute;
      left: 2px;
      right: 2px;
      bottom: 2px;
      height: 3px;
      background: var(--ink);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .6s cubic-bezier(.76, 0, .24, 1) .1s, background-color .4s;
    }
    .btn:hover .line, .btn:focus-visible .line, .btn.on .line { transform: scaleX(1); }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 4px; border-radius: 4px; }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false" aria-label="Explore"><span class="o" aria-hidden="true">Explore</span><span class="k" aria-hidden="true">Explore</span><span class="f" aria-hidden="true">Explore</span><i class="line" aria-hidden="true"></i></button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
