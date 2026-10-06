export default {
  id: 'mb-nothing-dots',
  credit: 'Nothing OS — dot-matrix button: the LED grid fills in dot by dot to spell the label, Nothing red on black',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 20px 22px; border-radius: 12px; background: #000; }
    .nd { position: relative; border: 1px solid #2a2a2a; border-radius: 999px; padding: 14px 22px; background: #0a0a0a; cursor: pointer; display: block; -webkit-tap-highlight-color: transparent;
      transition: border-color .25s, background .25s, transform .15s cubic-bezier(.2,.8,.2,1); }
    .nd:hover { border-color: #444; background: #101010; }
    .nd:active { transform: scale(.97); }
    .nd:focus-visible { outline: 2px solid #d71921; outline-offset: 3px; }
    .grid { display: grid; grid-template-columns: repeat(23, 5px); grid-auto-rows: 5px; gap: 3px; }
    .grid i { width: 5px; height: 5px; border-radius: 50%; background: #1e1e1e; transition: background .18s var(--d, 0s), transform .25s var(--d, 0s), box-shadow .25s var(--d, 0s); }
    .grid i.on { background: #e8e8e8; }
    .nd[aria-pressed="true"] { border-color: #d71921; }
    .nd[aria-pressed="true"] .grid i.on { background: #d71921; box-shadow: 0 0 6px rgba(215,25,33,.6); transform: scale(1.15); }
    .nd .grid i.on { transform: scale(1); }
    .nd.flip .grid i.on { animation: pop .3s var(--d, 0s) linear(0, 0.3 20%, 1.3 50%, 1); }
    @keyframes pop { 0% { transform: scale(0); } }
  `,
  html: `
    <div class="stage">
      <button class="nd" type="button" aria-pressed="false" aria-label="Play"><span class="grid" aria-hidden="true"></span></button>
    </div>`,
  init(root) {
    const F = { // 5x5 glyphs, rows top→bottom
      P: ['11110', '10001', '11110', '10000', '10000'], L: ['10000', '10000', '10000', '10000', '11111'],
      A: ['01110', '10001', '11111', '10001', '10001'], Y: ['10001', '01010', '00100', '00100', '00100'],
      S: ['01111', '10000', '01110', '00001', '11110'], T: ['11111', '00100', '00100', '00100', '00100'],
      O: ['01110', '10001', '10001', '10001', '01110'], ' ': ['00000', '00000', '00000', '00000', '00000'],
    };
    const COLS = 23, ROWS = 5;
    const btn = root.querySelector('.nd'), grid = root.querySelector('.grid');
    const dots = [];
    for (let i = 0; i < COLS * ROWS; i++) { const d = document.createElement('i'); grid.appendChild(d); dots.push(d); }
    const show = (word) => {
      const w = word.length * 6 - 1, x0 = Math.floor((COLS - w) / 2);
      dots.forEach((d) => d.classList.remove('on'));
      [...word].forEach((ch, k) => F[ch].forEach((row, r) => [...row].forEach((bit, c) => {
        if (bit === '1') { const d = dots[r * COLS + x0 + k * 6 + c]; d.classList.add('on'); d.style.setProperty('--d', ((k * 6 + c) * 14) + 'ms'); }
      })));
      btn.classList.remove('flip'); void btn.offsetWidth; btn.classList.add('flip');
    };
    show('PLAY');
    btn.addEventListener('click', () => { const on = btn.getAttribute('aria-pressed') !== 'true'; btn.setAttribute('aria-pressed', String(on)); btn.setAttribute('aria-label', on ? 'Stop' : 'Play'); show(on ? 'STOP' : 'PLAY'); });
  },
};
