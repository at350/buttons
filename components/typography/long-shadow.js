// A true flat-design long shadow: N one-pixel steps at 45° in a single shade, running off the tile and clipped by it.
// Every state uses the same number of layers so text-shadow interpolates smoothly.
const N = 48;
const sh = (len) => Array.from({ length: N }, (_, i) => { const k = Math.min(i + 1, len); return `${k}px ${k}px 0 var(--sh)`; }).join(', ');

export default {
  id: 'ty-long-shadow',
  credit: 'Long-shadow type — a 45° single-shade shadow that runs off the edge of the tile, built from stacked text-shadows; pressing shortens it as the word sinks in (2013 flat-design "long shadow" trend)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .stage {
      --bg: #2dd4bf; --sh: #20b3a1; --fg: #fff;
      background: var(--bg);
      border-radius: 12px;
      padding: 22px 30px 26px;
      overflow: hidden;
      transition: background-color .3s;
    }
    .stage.on { --bg: #0f766e; --sh: #0b5d56; --fg: #ccfbf1; }
    .btn {
      cursor: pointer;
      background: transparent;
      border: 0;
      padding: 0;
      color: var(--fg);
      display: block;
      font: 700 52px/1 'Space Grotesk', Inter, system-ui, sans-serif;
      letter-spacing: 0;
      text-transform: uppercase;
      text-shadow: ${sh(N)};
      transition: transform .25s cubic-bezier(.34, 1.56, .64, 1), text-shadow .35s cubic-bezier(.2, .8, .2, 1), color .3s;
    }
    .btn:hover { transform: translate(-2px, -2px); }
    .btn:active { transform: translate(3px, 3px); text-shadow: ${sh(3)}; transition-duration: .12s; }
    .btn:focus-visible { outline: 2px solid var(--fg); outline-offset: 6px; border-radius: 4px; }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false">Deep</button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    const stage = root.querySelector('.stage');
    btn.addEventListener('click', () => {
      const on = stage.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
