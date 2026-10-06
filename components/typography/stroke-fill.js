export default {
  id: 'ty-stroke-fill',
  credit: 'Outline-to-solid — hairline text-stroke display type that fills in with a left-to-right wipe on hover (Awwwards-style hero CTAs)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      cursor: pointer;
      background: transparent;
      border: 0;
      padding: 8px 4px;
      display: inline-grid;
      position: relative;
      font: 800 52px/1 'Bricolage Grotesque', 'Space Grotesk', system-ui, sans-serif; letter-spacing: -.03em;
      font-variation-settings: 'opsz' 96, 'wdth' 100;
    }
    .btn > span { grid-area: 1 / 1; white-space: nowrap; }
    .o {
      color: transparent;
      -webkit-text-stroke: 1.5px #111;
      transition: -webkit-text-stroke-color .4s;
    }
    .f {
      color: #111;
      clip-path: inset(0 100% 0 0);
      transition: clip-path .6s cubic-bezier(.76, 0, .24, 1);
    }
    .btn:hover .f, .btn:focus-visible .f { clip-path: inset(0 0 0 0); }
    .btn.on .f { clip-path: inset(0 0 0 0); color: #e11d48; }
    .btn.on .o { -webkit-text-stroke-color: #e11d48; }
    .btn:active .f { clip-path: inset(0 0 0 40%); transition-duration: .2s; }
    .line {
      position: absolute;
      left: 4px;
      right: 4px;
      bottom: 2px;
      height: 3px;
      background: #111;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform .6s cubic-bezier(.76, 0, .24, 1) .1s;
    }
    .btn:hover .line, .btn:focus-visible .line, .btn.on .line { transform: scaleX(1); }
    .btn.on .line { background: #e11d48; }
    .btn:focus-visible {
      outline: 2px solid #111;
      outline-offset: 4px;
      border-radius: 4px;
    }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="Explore"><span class="o" aria-hidden="true">Explore</span><span class="f" aria-hidden="true">Explore</span><i class="line" aria-hidden="true"></i></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
