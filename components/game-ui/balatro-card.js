// Balatro: a 23x31-texel Joker card drawn at an integer 3x scale (crisp pixel edges), Balatro's hover tilt +
// foil sheen, select lifts the card; the HUD uses the game's Chips blue #009dff and Mult red #fe5f55 boxes and
// the blue "Play Hand" button; playing triggers the Joker's "+4 Mult" pop.
const px = (rows, pal, ox = 0, oy = 0) => {
  const d = {};
  rows.forEach((r, y) => { let x = 0; while (x < r.length) { const c = r[x]; let n = 1; while (r[x + n] === c) n++; if (pal[c]) (d[c] = d[c] || []).push(`M${x + ox} ${y + oy}h${n}v1h-${n}z`); x += n; } });
  return Object.entries(d).map(([c, p]) => `<path fill="${pal[c]}" d="${p.join('')}"/>`).join('');
};
const FRAME = px([
  '..OOOOOOOOOOOOOOOOOOO..', '.OCCCCCCCCCCCCCCCCCCCO.', ...Array.from({ length: 27 }, () => 'OCCCCCCCCCCCCCCCCCCCCCO'), '.OCCCCCCCCCCCCCCCCCCCO.', '..OOOOOOOOOOOOOOOOOOO..',
], { O: '#b9ad98', C: '#fbf5e9' });
const JOKER = px([
  '...................', '.YY.....YYY.....YY.', '.YYK...KYYYK...KYY.', '..KRK..KBBBK..KBK..', '..KRRK.KBBBK.KBBK..',
  '...KRRKKBBBKKBBK...', '...KRRRKBBBKBBBK...', '....KRRRBBBBBBK....', '...KKKKKKKKKKKKK...', '...KYYYYYYYYYYYK...',
  '...KKKKKKKKKKKKK...', '....KSSSSSSSSSK....', '...KSSSSSSSSSSSK...', '...KSSKKSSSKKSSK...', '...KSSKKSSSKKSSK...',
  '...KSSSSSSSSSSSK...', '...KSSSSSRRSSSSK...', '...KSSSSSRRSSSSK...', '...KSKSSSSSSSKSK...', '...KSSKKKKKKKSSK...',
  '....KSSSRRRSSSK....', '.....KSSSSSSSK.....', '......KKKKKKK......', '.....RRK...KBB.....', '....RRRRK.KBBBB....',
  '...RRRRRRKBBBBBB...', '...................',
], { Y: '#fda200', K: '#3a3046', R: '#fe5f55', B: '#009dff', S: '#ffffff' }, 2, 2);

export default {
  id: 'gm-balatro-card',
  credit: 'LocalThunk Balatro — the pixel Joker card (tilts toward the cursor with a foil sheen, click to select) and the Chips × Mult HUD; "Play Hand" triggers +4 Mult',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; display: flex; align-items: flex-end; gap: 16px; padding: 30px 20px 16px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(ellipse at 30% 20%, #3f7d68, #2a5446 55%, #1d3b33); font-family: 'JetBrains Mono', ui-monospace, monospace; }
    .stage::before { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(0,0,0,.07) 0 1px, transparent 1px 3px); pointer-events: none; }
    .slot { perspective: 420px; }
    .card { position: relative; display: block; width: 69px; height: 93px; border: none; padding: 0; cursor: pointer; background: none; image-rendering: pixelated;
      transform-style: preserve-3d; transition: transform 140ms cubic-bezier(.3,1.6,.6,1), filter 140ms; filter: drop-shadow(3px 4px 0 rgba(0,0,0,.35)); }
    .card svg { display: block; width: 69px; height: 93px; }
    .card:hover { transform: scale(1.06) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); }
    .card.sel { transform: translateY(-18px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)); filter: drop-shadow(5px 10px 0 rgba(0,0,0,.3)); }
    .card.juice { animation: juice 260ms cubic-bezier(.3,1.8,.6,1); }
    @keyframes juice { 0% { scale: 1; rotate: 0deg; } 40% { scale: 1.14; rotate: -4deg; } 100% { scale: 1; rotate: 0deg; } }
    .sheen { position: absolute; inset: 3px; border-radius: 3px; pointer-events: none; opacity: 0; mix-blend-mode: screen; transition: opacity 150ms;
      background: linear-gradient(115deg, transparent 25%, rgba(255,120,200,.45) 40%, rgba(120,255,230,.45) 50%, rgba(255,240,120,.4) 60%, transparent 75%); background-size: 250% 250%; background-position: var(--sx, 50%) 50%; }
    .card:hover .sheen, .card.sel .sheen { opacity: 1; }
    .card:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
    .pop { position: absolute; left: 54px; top: 40px; z-index: 3; transform: translateX(-50%); padding: 2px 6px; border-radius: 4px; background: #fe5f55; color: #fff; font: 800 11px/14px 'JetBrains Mono', monospace; white-space: nowrap; pointer-events: none; opacity: 0; box-shadow: 0 2px 0 #a8352f; }
    .pop.go { animation: pop 900ms steps(9) forwards; }
    @keyframes pop { 0% { opacity: 0; transform: translateX(-50%) scale(.4); } 15% { opacity: 1; transform: translateX(-50%) scale(1.15); } 30%, 80% { opacity: 1; transform: translateX(-50%) scale(1); } 100% { opacity: 0; transform: translateX(-50%) scale(1); } }
    .hud { position: relative; display: flex; flex-direction: column; gap: 8px; width: 150px; }
    .score { background: #1e2b2d; border-radius: 6px; padding: 4px 8px; display: flex; justify-content: space-between; align-items: center; box-shadow: inset 0 0 0 2px #384f52; }
    .score small { color: #c9d6d4; font: 700 9px 'JetBrains Mono', monospace; letter-spacing: .5px; }
    .score b { color: #fff; font: 800 15px 'JetBrains Mono', monospace; text-shadow: 0 2px 0 rgba(0,0,0,.4); }
    .cm { display: flex; align-items: center; gap: 4px; }
    .box { flex: 1; height: 30px; border-radius: 6px; display: grid; place-items: center; color: #fff; font: 800 17px 'JetBrains Mono', monospace; text-shadow: 0 2px 0 rgba(0,0,0,.35); }
    .chips { background: #009dff; box-shadow: 0 3px 0 #0068a8; justify-content: end; padding-right: 8px; }
    .mult { background: #fe5f55; box-shadow: 0 3px 0 #a8352f; justify-content: start; padding-left: 8px; }
    .x { color: #fe5f55; font: 800 16px 'JetBrains Mono', monospace; text-shadow: 0 2px 0 rgba(0,0,0,.35); }
    .box.bump { animation: bump 220ms cubic-bezier(.3,1.8,.6,1); }
    @keyframes bump { 50% { transform: scale(1.18) rotate(-3deg); } }
    .play { height: 34px; border: none; border-radius: 6px; cursor: pointer; background: #009dff; color: #fff; font: 800 13px 'JetBrains Mono', monospace; text-shadow: 0 2px 0 rgba(0,0,0,.3); box-shadow: 0 3px 0 #0068a8; transition: transform 60ms; }
    .play:hover { background: #22acff; }
    .play:active { transform: translateY(3px); box-shadow: 0 0 0 #0068a8; }
    .play:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="slot">
        <button class="card" type="button" aria-pressed="false" aria-label="Joker card"><svg viewBox="0 0 23 31" shape-rendering="crispEdges" aria-hidden="true">${FRAME}${JOKER}</svg><span class="sheen"></span></button>
      </div>
      <span class="pop">+4 Mult</span>
      <div class="hud">
        <div class="score"><small>ROUND SCORE</small><b class="tot">0</b></div>
        <div class="cm"><span class="box chips">10</span><span class="x">X</span><span class="box mult">1</span></div>
        <button class="play" type="button">Play Hand</button>
      </div>
    </div>`,
  init(root) {
    const c = root.querySelector('.card'), sheen = root.querySelector('.sheen'), play = root.querySelector('.play'), pop = root.querySelector('.pop');
    const chips = root.querySelector('.chips'), mult = root.querySelector('.mult'), tot = root.querySelector('.tot');
    const timers = []; let total = 0;
    c.addEventListener('pointermove', (e) => { const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.setProperty('--ry', (x * 26).toFixed(1) + 'deg'); c.style.setProperty('--rx', (-y * 26).toFixed(1) + 'deg'); sheen.style.setProperty('--sx', (100 - (x + .5) * 100) + '%'); });
    c.addEventListener('pointerleave', () => { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
    const juice = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };
    c.addEventListener('click', () => { const on = c.classList.toggle('sel'); c.setAttribute('aria-pressed', String(on)); juice(c, 'juice'); });
    play.addEventListener('click', () => {
      timers.forEach(clearTimeout); timers.length = 0;
      chips.textContent = '10'; mult.textContent = '1'; juice(chips, 'bump');
      timers.push(setTimeout(() => { juice(c, 'juice'); juice(pop, 'go'); mult.textContent = '5'; juice(mult, 'bump'); }, 300));
      timers.push(setTimeout(() => { total += 50; tot.textContent = total.toLocaleString(); }, 700));
    });
    return () => timers.forEach(clearTimeout);
  },
};
