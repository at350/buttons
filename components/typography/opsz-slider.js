export default {
  id: 'ty-opsz-slider',
  credit: 'Optical-size slider — drag to sweep Fraunces opsz 9→144 live; the glyphs sharpen and contrast rises (Font Playground / v-fonts style)',
  size: 'wide',
  css: `
    :host { display: block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .stage {
      background: #111;
      color: #f5f1e8;
      border-radius: 12px;
      padding: 20px 22px 18px;
      display: grid;
      gap: 12px;
    }
    .word {
      font: 400 54px/1 Fraunces, Georgia, serif; font-variation-settings: 'opsz' var(--o, 9), 'wght' 400;
      display: inline-grid; justify-self: start;
    }
    .word > span { grid-area: 1 / 1; white-space: nowrap; }
    .word .g { visibility: hidden; font-variation-settings: 'opsz' 9, 'wght' 400; }
    .row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .num {
      font: 500 13px/1 'JetBrains Mono', ui-monospace, monospace;
      color: #a3a3a3;
      min-width: 4ch;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    input[type=range] {
      -webkit-appearance: none;
      appearance: none;
      flex: 1;
      height: 2px;
      background: linear-gradient(#f5f1e8, #f5f1e8) no-repeat 0 0 / var(--p, 0%) 100%, #3a3a3a;
      border-radius: 2px;
      cursor: pointer;
      margin: 0;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #f5f1e8;
      border: 0;
      box-shadow: 0 0 0 4px #111;
      transition: transform .15s;
    }
    input[type=range]::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #f5f1e8;
      border: 0;
      box-shadow: 0 0 0 4px #111;
    }
    input[type=range]:hover::-webkit-slider-thumb, input[type=range]:active::-webkit-slider-thumb { transform: scale(1.25); }
    input[type=range]:focus-visible {
      outline: 2px solid #f5f1e8;
      outline-offset: 6px;
      border-radius: 4px;
    }
  `,
  html: `<div class="stage"><div class="word" aria-hidden="true"><span class="g">Optical</span><span class="v">Optical</span></div><div class="row"><input type="range" min="9" max="144" value="9" step="1" aria-label="Optical size"><span class="num">9</span></div></div>`,
  init(root) {
    const stage = root.querySelector('.stage');
    const word = root.querySelector('.word');
    const num = root.querySelector('.num');
    const r = root.querySelector('input');
    const set = () => {
      const v = Number(r.value);
      word.style.setProperty('--o', String(v));
      r.style.setProperty('--p', ((v - 9) / 135 * 100).toFixed(1) + '%');
      num.textContent = String(v);
    };
    r.addEventListener('input', set);
    set();
  },
};
