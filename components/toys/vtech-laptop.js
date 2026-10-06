const ROWS = [['QWERTYUIOP', '#ff8a00'], ['ASDFGHJKL', '#3cb44a'], ['ZXCVBNM', '#2b8be8']];
const KEYS = ROWS.map(([r, c]) => `<div class="row">${[...r].map((k) => `<button class="key" type="button" style="--k:${c}" data-k="${k}">${k}</button>`).join('')}</div>`).join('');
const WORDS = { A: 'APPLE', B: 'BALL', C: 'CAT', D: 'DOG', E: 'EGG', F: 'FISH', G: 'GOAT', H: 'HAT', I: 'IGLOO', J: 'JAM', K: 'KITE', L: 'LION', M: 'MOON',
  N: 'NEST', O: 'OWL', P: 'PIG', Q: 'QUEEN', R: 'RAIN', S: 'SUN', T: 'TRAIN', U: 'UMBRELLA', V: 'VAN', W: 'WHALE', X: 'XYLOPHONE', Y: 'YO-YO', Z: 'ZEBRA' };

export default {
  id: 'ty2-vtech-laptop',
  credit: 'VTech kids\' learning laptop — chunky colour-coded keys, a red ON/OFF key and a dot-matrix LCD that shows the letter and its word',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 12px; border-radius: 12px; overflow: hidden; background: linear-gradient(#e0f2ff, #bfe0f7); }
    .lid { width: 260px; height: 96px; padding: 10px 26px 8px; border-radius: 16px 16px 4px 4px; background: linear-gradient(#3f8ff0, #1f6fd6 60%, #1658ad);
      box-shadow: inset 0 2px 0 rgba(255,255,255,.4); }
    .lcd { height: 78px; border-radius: 6px; padding: 8px 10px; display: grid; grid-template-columns: 54px 1fr; align-items: center; gap: 8px;
      background: radial-gradient(circle, rgba(0,0,0,.06) 1px, transparent 1.4px) 0 0 / 3px 3px, linear-gradient(#a6b994, #8fa47c);
      box-shadow: inset 0 0 0 3px #13304f, inset 0 3px 6px rgba(0,0,0,.35); color: #1d2a14; overflow: hidden; }
    .big { font: 800 46px/1 'Unbounded', system-ui, sans-serif; text-align: center; opacity: .85; }
    .word { font: 700 13px/1.1 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .06em; white-space: nowrap; overflow: hidden; }
    .on .big, .on .word { animation: pop .25s steps(2); }
    @keyframes pop { 0% { opacity: 0; } }
    .off .big, .off .word { visibility: hidden; }
    .deck { width: 260px; padding: 10px 10px 12px; border-radius: 4px 4px 18px 18px; background: linear-gradient(#f7f7f2, #dcdcd2);
      box-shadow: 0 6px 0 #a9a99c, 0 10px 14px rgba(20,60,100,.3), inset 0 2px 0 #fff; }
    .row { display: flex; gap: 3px; justify-content: center; margin-bottom: 4px; }
    .key { width: 21px; height: 21px; border: 0; padding: 0; border-radius: 6px; cursor: pointer; font: 800 10px/1 'DM Sans', system-ui, sans-serif; color: #fff;
      text-shadow: 0 1px 0 rgba(0,0,0,.3); background: linear-gradient(180deg, rgba(255,255,255,.35), transparent 50%), var(--k);
      box-shadow: 0 3px 0 color-mix(in srgb, var(--k) 60%, #000); transform: translateY(-2px); transition: transform .05s, box-shadow .05s; }
    .key:active, .key.down { transform: translateY(1px); box-shadow: 0 0 0 transparent; }
    .bar { display: flex; gap: 6px; justify-content: center; margin-top: 6px; }
    .pw, .sp { height: 20px; border: 0; padding: 0; border-radius: 10px; cursor: pointer; font: 800 8px/1 'DM Sans', system-ui, sans-serif; letter-spacing: .08em;
      transform: translateY(-2px); transition: transform .05s, box-shadow .05s; }
    .pw { width: 50px; color: #fff; background: linear-gradient(#ff6159, #e3262d); box-shadow: 0 3px 0 #8f1218; }
    .sp { width: 110px; background: linear-gradient(#fff2a0, #f7c600); box-shadow: 0 3px 0 #a58300; }
    .pw:active, .sp:active { transform: translateY(1px); box-shadow: none; }
    button:focus-visible { outline: 2px solid #1f6fd6; outline-offset: 1px; }
  `,
  html: `
    <div class="stage">
      <div class="lid"><div class="lcd" aria-live="polite"><span class="big">A</span><span class="word">APPLE</span></div></div>
      <div class="deck" tabindex="-1">${KEYS}
        <div class="bar"><button class="pw" type="button" aria-pressed="true">ON/OFF</button><button class="sp" type="button" aria-label="space"></button></div>
      </div>
    </div>`,
  init(root) {
    const lcd = root.querySelector('.lcd'), big = root.querySelector('.big'), word = root.querySelector('.word'), pw = root.querySelector('.pw');
    const show = (k) => { if (lcd.classList.contains('off')) return; big.textContent = k; word.textContent = WORDS[k] || ''; lcd.classList.remove('on'); void lcd.offsetWidth; lcd.classList.add('on'); };
    root.querySelector('.deck').addEventListener('click', (e) => {
      const b = e.target.closest('.key'); if (b) show(b.dataset.k);
      if (e.target.closest('.sp')) { big.textContent = ''; word.textContent = ''; }
    });
    pw.addEventListener('click', () => {
      const on = pw.getAttribute('aria-pressed') !== 'true';
      pw.setAttribute('aria-pressed', String(on)); lcd.classList.toggle('off', !on);
      if (on) { big.textContent = 'A'; word.textContent = 'APPLE'; }
    });
    root.querySelector('.deck').addEventListener('keydown', (e) => { const k = e.key.toUpperCase(); if (/^[A-Z]$/.test(k)) { e.preventDefault(); show(k); } });
  },
};
