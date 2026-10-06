export default {
  id: 'mb-nothing-dots',
  credit: 'Nothing OS — dot-matrix (NDot-style 5×7) pill on black: the LED grid lights dot by dot to spell PLAY, and flips to STOP in Nothing red #D71921',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 20px 22px; border-radius: 12px; background: #000; }
    .nd { position: relative; border: 0; border-radius: 999px; padding: 15px 26px; background: #1b1b1d; cursor: pointer; display: block; -webkit-tap-highlight-color: transparent;
      transition: background .25s, transform .2s cubic-bezier(.2,.8,.2,1); }
    .nd:hover { background: #242427; }
    .nd:active { transform: scale(.96); }
    .nd:focus-visible { outline: 2px solid #d71921; outline-offset: 3px; }
    .grid { display: grid; grid-template-columns: repeat(23, 4px); grid-auto-rows: 4px; gap: 2px; }
    .grid i { width: 4px; height: 4px; border-radius: 50%; background: #2c2c2f; transition: background .16s var(--d, 0s), box-shadow .2s var(--d, 0s); }
    .grid i.on { background: #fff; }
    .nd[aria-pressed="true"] { background: #1a0d0e; }
    .nd[aria-pressed="true"] .grid i.on { background: #d71921; box-shadow: 0 0 5px rgba(215,25,33,.7); }
    .nd.flip .grid i.on { animation: lit .26s var(--d, 0s) both cubic-bezier(.2,.8,.2,1); }
    @keyframes lit { 0% { transform: scale(.2); opacity: .2; } 100% { transform: scale(1); opacity: 1; } }
  `,
  html: `
    <div class="stage">
      <button class="nd" type="button" aria-pressed="false" aria-label="Play"><span class="grid" aria-hidden="true"></span></button>
    </div>`,
  init(root) {
    const F = { // 5x7 dot-matrix glyphs, rows top→bottom
      P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
      L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
      A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
      Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
      S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
      T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
      O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
    };
    const COLS = 23, ROWS = 7;
    const btn = root.querySelector('.nd'), grid = root.querySelector('.grid');
    const dots = [];
    for (let i = 0; i < COLS * ROWS; i++) { const d = document.createElement('i'); grid.appendChild(d); dots.push(d); }
    const show = (word) => {
      dots.forEach((d) => d.classList.remove('on'));
      [...word].forEach((ch, k) => F[ch].forEach((row, r) => [...row].forEach((bit, c) => {
        if (bit === '1') { const d = dots[r * COLS + k * 6 + c]; d.classList.add('on'); d.style.setProperty('--d', ((k * 6 + c) * 12 + r * 6) + 'ms'); }
      })));
      btn.classList.remove('flip'); void btn.offsetWidth; btn.classList.add('flip');
    };
    show('PLAY');
    btn.addEventListener('click', () => { const on = btn.getAttribute('aria-pressed') !== 'true'; btn.setAttribute('aria-pressed', String(on)); btn.setAttribute('aria-label', on ? 'Stop' : 'Play'); show(on ? 'STOP' : 'PLAY'); });
  },
};
