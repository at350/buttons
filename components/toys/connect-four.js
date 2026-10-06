const COLS = 7, ROWS = 6, S = 26;
const HOLES = Array.from({ length: COLS * ROWS }, () => '<i></i>').join('');
const COLBTN = Array.from({ length: COLS }, (_, c) => `<button class="col" type="button" data-c="${c}" aria-label="drop in column ${c + 1}" style="left:${8 + c * S}px"></button>`).join('');

export default {
  id: 'ty2-connect-four',
  credit: 'Milton Bradley Connect 4 (1974) — click a column, the checker drops and bounces; four in a row glows, then pull the slider to let them all fall',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 226px; height: 238px; border-radius: 12px; overflow: hidden; background: linear-gradient(#e8f1ff, #c9dcf7); }
    .board { position: absolute; left: 14px; top: 34px; width: ${COLS * S + 16}px; height: ${ROWS * S + 16}px; }
    .discs { position: absolute; left: 8px; top: 8px; width: ${COLS * S}px; height: ${ROWS * S}px; }
    .d { position: absolute; width: 22px; height: 22px; margin: 2px; border-radius: 50%;
      background: radial-gradient(circle, transparent 0 46%, rgba(0,0,0,.18) 48% 52%, transparent 54%), radial-gradient(circle at 38% 32%, var(--h), var(--c) 60%, var(--k)); }
    .d.red { --h: #ff7a70; --c: #e3262d; --k: #a5141a; } .d.yel { --h: #fff6a0; --c: #f7c600; --k: #b98f00; }
    .d.win { box-shadow: 0 0 0 2px #fff, 0 0 10px 3px rgba(255,255,255,.9); }
    .frame { position: absolute; inset: 0; border-radius: 10px; pointer-events: none; border: 8px solid #1d55c4;
      background: radial-gradient(circle at ${S / 2}px ${S / 2}px, transparent 10.5px, #1d55c4 11.5px) 0 0 / ${S}px ${S}px;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.15), 0 6px 0 #123a8a, 0 10px 12px rgba(0,0,0,.25); }
    .col { position: absolute; top: -26px; width: ${S}px; height: ${ROWS * S + 34}px; border: 0; padding: 0; background: none; cursor: pointer; border-radius: 13px; }
    .col::before { content: ''; position: absolute; left: 2px; top: 2px; width: 22px; height: 22px; border-radius: 50%; opacity: 0; transition: opacity .12s;
      background: radial-gradient(circle at 38% 32%, var(--h), var(--c) 60%, var(--k)); }
    .col:hover::before, .col:focus-visible::before { opacity: 1; }
    .col:focus-visible { outline: 2px solid #1d55c4; outline-offset: -2px; }
    .board.red .col { --h: #ff7a70; --c: #e3262d; --k: #a5141a; } .board.yel .col { --h: #fff6a0; --c: #f7c600; --k: #b98f00; }
    .slide { position: absolute; left: 50%; top: 214px; width: 80px; height: 16px; margin-left: -40px; border: 0; padding: 0; border-radius: 8px; cursor: pointer;
      background: linear-gradient(#5b8ff0, #1d55c4 60%, #123a8a); box-shadow: 0 3px 0 #0b2457; transition: transform .2s cubic-bezier(.3,1.6,.5,1); }
    .slide:hover { transform: translateX(4px); }
    .slide:active { transform: translateX(18px); }
    .slide:focus-visible { outline: 2px solid #f7c600; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="board red"><div class="discs"></div><div class="frame"></div><div class="cols" style="position:absolute;left:0;top:0">${COLBTN}</div></div>
      <button class="slide" type="button" aria-label="release checkers"></button>
    </div>`,
  init(root) {
    const board = root.querySelector('.board'), discs = root.querySelector('.discs');
    let grid = Array.from({ length: COLS }, () => []), turn = 'red', over = false; const anims = new Set();
    const win = (c, r) => {
      for (const [dx, dy] of [[1, 0], [0, 1], [1, 1], [1, -1]]) {
        const line = [[c, r]];
        for (const s of [1, -1]) for (let k = 1; k < 4; k++) { const x = c + dx * k * s, y = r + dy * k * s; if (grid[x] && grid[x][y] && grid[x][y].p === turn) line.push([x, y]); else break; }
        if (line.length >= 4) return line;
      }
      return null;
    };
    root.querySelectorAll('.col').forEach((b) => b.addEventListener('click', () => {
      const c = +b.dataset.c; if (over || grid[c].length >= ROWS) return;
      const r = grid[c].length, d = document.createElement('span'); d.className = 'd ' + (turn === 'red' ? 'red' : 'yel');
      d.style.left = c * S + 'px'; d.style.top = (ROWS - 1 - r) * S + 'px'; discs.appendChild(d);
      grid[c].push({ p: turn, el: d });
      const fall = (ROWS - r) * S + 10;
      const a = d.animate([{ transform: `translateY(${-fall}px)`, easing: 'cubic-bezier(.5,0,1,1)' }, { transform: 'translateY(0)', offset: .7, easing: 'ease-out' }, { transform: 'translateY(-7px)', offset: .85, easing: 'ease-in' }, { transform: 'translateY(0)' }], { duration: 260 + fall * 1.4 });
      anims.add(a); a.onfinish = () => anims.delete(a);
      const line = win(c, r);
      if (line) { over = true; line.forEach(([x, y]) => grid[x][y].el.classList.add('win')); }
      turn = turn === 'red' ? 'yel' : 'red'; board.className = 'board ' + turn;
    }));
    root.querySelector('.slide').addEventListener('click', () => {
      [...discs.children].forEach((d, i) => { const a = d.animate([{ transform: 'none', opacity: 1 }, { transform: 'translateY(190px)', opacity: 0 }], { duration: 500 + (i % 7) * 30, easing: 'cubic-bezier(.5,0,1,1)', fill: 'forwards' }); anims.add(a); a.onfinish = () => { anims.delete(a); d.remove(); }; });
      grid = Array.from({ length: COLS }, () => []); over = false; turn = 'red'; board.className = 'board red';
    });
    return () => anims.forEach((a) => a.cancel());
  },
};
