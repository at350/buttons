export default {
  id: 'gm-wordle',
  credit: 'NYT Wordle — a row of five tiles: click and type letters, Enter flips them one by one to green / yellow / gray (answer: CRANE)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #121213; padding: 18px 20px 14px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .row { display: flex; gap: 5px; outline: none; cursor: text; border-radius: 4px; }
    .row:focus-visible { box-shadow: 0 0 0 2px #538d4e; }
    .t { width: 52px; height: 52px; border: 2px solid #3a3a3c; display: grid; place-items: center; color: #fff; font: 700 28px 'Inter', system-ui, sans-serif; text-transform: uppercase; transform-style: preserve-3d; transition: border-color .1s; }
    .t.has { border-color: #565758; animation: pop .1s ease-out; }
    @keyframes pop { 50% { transform: scale(1.1); } }
    .t.flip { animation: flip .5s ease-in-out forwards; }
    @keyframes flip { 0% { transform: rotateX(0); } 49% { transform: rotateX(90deg); } 51% { transform: rotateX(90deg); border-color: transparent; } 100% { transform: rotateX(0); border-color: transparent; } }
    .t.g { background: #538d4e; border-color: #538d4e; } .t.y { background: #b59f3b; border-color: #b59f3b; } .t.x { background: #3a3a3c; border-color: #3a3a3c; }
    .row.shake { animation: shake .5s; }
    @keyframes shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-4px); } 40%, 60% { transform: translateX(4px); } }
    .keys { display: flex; gap: 4px; }
    .k { height: 30px; min-width: 36px; padding: 0 8px; border: none; border-radius: 4px; background: #818384; color: #fff; font: 700 11px 'Inter', system-ui, sans-serif; cursor: pointer; text-transform: uppercase; }
    .k:hover { background: #9a9b9c; } .k:active { transform: translateY(1px); }
    .k:focus-visible { outline: 2px solid #538d4e; }
    .k.wide { min-width: 52px; }
  `,
  html: `
    <div class="stage">
      <div class="row" tabindex="0" role="textbox" aria-label="Guess, five letters">
        <div class="t"></div><div class="t"></div><div class="t"></div><div class="t"></div><div class="t"></div>
      </div>
      <div class="keys">
        <button class="k wide" type="button" data-k="Enter">Enter</button>
        <button class="k" type="button" data-k="c">c</button><button class="k" type="button" data-k="r">r</button><button class="k" type="button" data-k="a">a</button><button class="k" type="button" data-k="t">t</button><button class="k" type="button" data-k="e">e</button>
        <button class="k wide" type="button" data-k="Backspace" aria-label="Backspace">⌫</button>
      </div>
    </div>`,
  init(root) {
    const ANSWER = 'crane'; const row = root.querySelector('.row'); const tiles = [...root.querySelectorAll('.t')];
    let guess = '', locked = false; const timers = [];
    const render = () => tiles.forEach((t, i) => { t.textContent = guess[i] || ''; t.classList.toggle('has', !!guess[i]); });
    const key = (k) => {
      if (locked) { if (k === 'Enter' || k === 'Backspace') { locked = false; guess = ''; tiles.forEach((t) => { t.className = 't'; }); render(); } return; }
      if (k === 'Backspace') { guess = guess.slice(0, -1); render(); return; }
      if (k === 'Enter') {
        if (guess.length < 5) { row.classList.remove('shake'); void row.offsetWidth; row.classList.add('shake'); return; }
        locked = true; const pool = [...ANSWER]; const res = [...guess].map((c, i) => { if (c === ANSWER[i]) { pool[i] = null; return 'g'; } return null; });
        res.forEach((r, i) => { if (r) return; const j = pool.indexOf(guess[i]); if (j > -1) { pool[j] = null; res[i] = 'y'; } else res[i] = 'x'; });
        tiles.forEach((t, i) => { timers.push(setTimeout(() => t.classList.add('flip'), i * 300)); timers.push(setTimeout(() => t.classList.add(res[i]), i * 300 + 250)); });
        return;
      }
      if (/^[a-z]$/i.test(k) && guess.length < 5) { guess += k.toLowerCase(); render(); }
    };
    row.addEventListener('keydown', (e) => { if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace') { e.preventDefault(); key(e.key); } });
    root.querySelectorAll('.k').forEach((b) => b.addEventListener('click', () => { key(b.dataset.k); }));
    return () => timers.forEach(clearTimeout);
  },
};
