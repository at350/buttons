// NYT Wordle, light theme: 62px-style tiles (scaled to 52), #d3d6da empty border, #878a8c filled border,
// reveal colors #6aaa64 / #c9b458 / #787c7e, 100ms pop on type, 500ms rotateX flip staggered 250ms per tile,
// keyboard keys #d3d6da that take the reveal color, shake on a short guess.
export default {
  id: 'gm-wordle',
  credit: 'NYT Wordle — the six-row board and QWERTY keyboard in the light theme: after SLATE, type a guess and Enter flips the tiles one by one to green / yellow / gray (answer: CRANE)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #fff; padding: 14px 12px 12px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 12px;
      font-family: 'Helvetica Neue', Arial, system-ui, sans-serif; box-shadow: inset 0 0 0 1px #e3e3e1; }
    .board { display: grid; gap: 5px; }
    .row { display: grid; grid-template-columns: repeat(5, 40px); gap: 5px; outline: none; border-radius: 2px; }
    .row.cur { cursor: text; }
    .row:focus-visible { box-shadow: 0 0 0 2px #fff, 0 0 0 4px #6aaa64; }
    .t { width: 40px; height: 40px; border: 2px solid #d3d6da; display: grid; place-items: center; color: #000; background: #fff;
      font: 700 22px/1 'Helvetica Neue', Arial, system-ui, sans-serif; text-transform: uppercase; }
    .t.has { border-color: #878a8c; animation: pop 100ms ease-in-out; }
    @keyframes pop { 0% { transform: scale(.8); opacity: 0; } 40% { transform: scale(1.1); opacity: 1; } }
    .t.flip { animation: flip 500ms ease-in forwards; animation-delay: var(--d); }
    @keyframes flip { 0% { transform: rotateX(0); } 50% { transform: rotateX(-90deg); } 100% { transform: rotateX(0); } }
    .t.g { background: #6aaa64; border-color: #6aaa64; color: #fff; }
    .t.y { background: #c9b458; border-color: #c9b458; color: #fff; }
    .t.x { background: #787c7e; border-color: #787c7e; color: #fff; }
    .row.shake { animation: shake 600ms; }
    @keyframes shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-4px); } 40%, 60% { transform: translateX(4px); } }
    .row.win .t { animation: bounce 1000ms ease; animation-delay: var(--d); }
    @keyframes bounce { 0%, 20% { transform: translateY(0); } 40% { transform: translateY(-14px); } 50% { transform: translateY(2px); } 60% { transform: translateY(-6px); } 80% { transform: translateY(1px); } 100% { transform: translateY(0); } }
    .keys { display: flex; flex-direction: column; gap: 6px; align-items: center; }
    .kr { display: flex; gap: 4px; }
    .k { height: 40px; width: 26px; padding: 0; border: none; border-radius: 4px; background: #d3d6da; color: #1a1a1b; cursor: pointer;
      font: 700 13px 'Helvetica Neue', Arial, system-ui, sans-serif; text-transform: uppercase; display: grid; place-items: center; transition: background-color .1s; }
    .k:hover { background: #c4c7cb; }
    .k:active { background: #b8bbbf; }
    .k:focus-visible { outline: 2px solid #1a1a1b; outline-offset: 1px; }
    .k.wide { width: 41px; font-size: 10px; }
    .k svg { width: 20px; height: 20px; fill: #1a1a1b; }
    .k.g { background: #6aaa64; color: #fff; } .k.y { background: #c9b458; color: #fff; } .k.x { background: #787c7e; color: #fff; }
  `,
  html: `
    <div class="stage">
      <div class="board">
        <div class="row"><div class="t x">s</div><div class="t x">l</div><div class="t g">a</div><div class="t x">t</div><div class="t g">e</div></div>
        <div class="row cur" tabindex="0" role="textbox" aria-label="Guess, five letters">
          <div class="t" style="--d:0ms"></div><div class="t" style="--d:250ms"></div><div class="t" style="--d:500ms"></div><div class="t" style="--d:750ms"></div><div class="t" style="--d:1000ms"></div>
        </div>
        <div class="row"><div class="t"></div><div class="t"></div><div class="t"></div><div class="t"></div><div class="t"></div></div><div class="row"><div class="t"></div><div class="t"></div><div class="t"></div><div class="t"></div><div class="t"></div></div><div class="row"><div class="t"></div><div class="t"></div><div class="t"></div><div class="t"></div><div class="t"></div></div><div class="row"><div class="t"></div><div class="t"></div><div class="t"></div><div class="t"></div><div class="t"></div></div>
      </div>
      <div class="keys">
        <div class="kr"><button class="k" type="button" data-k="q">q</button><button class="k" type="button" data-k="w">w</button><button class="k" type="button" data-k="e">e</button><button class="k" type="button" data-k="r">r</button><button class="k" type="button" data-k="t">t</button><button class="k" type="button" data-k="y">y</button><button class="k" type="button" data-k="u">u</button><button class="k" type="button" data-k="i">i</button><button class="k" type="button" data-k="o">o</button><button class="k" type="button" data-k="p">p</button></div>
        <div class="kr"><button class="k" type="button" data-k="a">a</button><button class="k" type="button" data-k="s">s</button><button class="k" type="button" data-k="d">d</button><button class="k" type="button" data-k="f">f</button><button class="k" type="button" data-k="g">g</button><button class="k" type="button" data-k="h">h</button><button class="k" type="button" data-k="j">j</button><button class="k" type="button" data-k="k">k</button><button class="k" type="button" data-k="l">l</button></div>
        <div class="kr"><button class="k wide" type="button" data-k="Enter">Enter</button><button class="k" type="button" data-k="z">z</button><button class="k" type="button" data-k="x">x</button><button class="k" type="button" data-k="c">c</button><button class="k" type="button" data-k="v">v</button><button class="k" type="button" data-k="b">b</button><button class="k" type="button" data-k="n">n</button><button class="k" type="button" data-k="m">m</button><button class="k wide" type="button" data-k="Backspace" aria-label="Backspace"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"/></svg></button></div>
      </div>
    </div>`,
  init(root) {
    const ANSWER = 'crane'; const row = root.querySelector('.row.cur'); const tiles = [...row.querySelectorAll('.t')];
    const keyEls = [...root.querySelectorAll('.k')];
    const base = { s: 'x', l: 'x', a: 'g', t: 'x', e: 'g' };
    const paintBase = () => keyEls.forEach((b) => { b.classList.remove('g', 'y', 'x'); if (base[b.dataset.k]) b.classList.add(base[b.dataset.k]); });
    paintBase();
    let guess = '', locked = false; const timers = [];
    const render = () => tiles.forEach((t, i) => { const c = guess[i] || ''; if (t.textContent !== c) { t.textContent = c; t.classList.toggle('has', !!c); } });
    const key = (k) => {
      if (locked) { if (k === 'Enter' || k === 'Backspace') { locked = false; guess = ''; tiles.forEach((t) => { t.className = 't'; t.textContent = ''; }); row.classList.remove('win'); paintBase(); } return; }
      if (k === 'Backspace') { guess = guess.slice(0, -1); render(); return; }
      if (k === 'Enter') {
        if (guess.length < 5) { row.classList.remove('shake'); void row.offsetWidth; row.classList.add('shake'); return; }
        locked = true; const pool = [...ANSWER];
        const res = [...guess].map((c, i) => { if (c === ANSWER[i]) { pool[i] = null; return 'g'; } return null; });
        res.forEach((r, i) => { if (r) return; const j = pool.indexOf(guess[i]); if (j > -1) { pool[j] = null; res[i] = 'y'; } else res[i] = 'x'; });
        tiles.forEach((t, i) => { t.classList.add('flip'); timers.push(setTimeout(() => t.classList.add(res[i]), i * 250 + 250)); });
        timers.push(setTimeout(() => {
          const rank = { g: 3, y: 2, x: 1 };
          [...guess].forEach((c, i) => { const b = keyEls.find((x) => x.dataset.k === c); if (!b) return; const cur = ['g', 'y', 'x'].find((x) => b.classList.contains(x)); if (!cur || rank[res[i]] > rank[cur]) { b.classList.remove('g', 'y', 'x'); b.classList.add(res[i]); } });
          if (res.every((r) => r === 'g')) row.classList.add('win');
        }, 4 * 250 + 520));
        return;
      }
      if (/^[a-z]$/i.test(k) && guess.length < 5) { guess += k.toLowerCase(); render(); }
    };
    row.addEventListener('keydown', (e) => { if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace') { e.preventDefault(); key(e.key); } });
    keyEls.forEach((b) => b.addEventListener('click', () => key(b.dataset.k)));
    return () => timers.forEach(clearTimeout);
  },
};
