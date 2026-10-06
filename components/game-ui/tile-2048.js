// 2048 (Gabriele Cirulli): #faf8ef page, #bbada0 board, rgba(238,228,218,.35) cells, exact tile ramp
// #eee4da … #edc22e, #776e65 / #f9f6f2 digits in Clear Sans bold, 100ms slide, 200ms pop, "+N" floating off the score box.
export default {
  id: 'gm-2048-tile',
  credit: 'Gabriele Cirulli 2048 — a tile on the board: click to slide-merge and double (pop, exact colour ramp to 2048), the score box floats "+N"; New Game resets',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { background: #faf8ef; border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px; font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif; overflow: hidden; }
    .top { display: flex; gap: 8px; align-items: stretch; justify-content: space-between; }
    .sc { position: relative; background: #bbada0; border-radius: 3px; min-width: 74px; padding: 4px 10px 3px; text-align: center; color: #fff; }
    .sc small { display: block; color: #eee4da; font: 700 11px/14px 'Clear Sans', 'Helvetica Neue', Arial, sans-serif; text-transform: uppercase; letter-spacing: .5px; }
    .sc b { display: block; font: 700 19px/22px 'Clear Sans', 'Helvetica Neue', Arial, sans-serif; }
    .add { position: absolute; right: 8px; bottom: 2px; color: rgba(119,110,101,.9); font: 700 16px 'Clear Sans', 'Helvetica Neue', Arial, sans-serif; opacity: 0; pointer-events: none; }
    .add.go { animation: add 600ms ease-in forwards; }
    @keyframes add { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-22px); opacity: 0; } }
    .new { border: none; cursor: pointer; background: #8f7a66; color: #f9f6f2; border-radius: 3px; padding: 0 12px; font: 700 13px 'Clear Sans', 'Helvetica Neue', Arial, sans-serif; white-space: nowrap; }
    .new:hover { background: #9f8b77; }
    .new:focus-visible { outline: 2px solid #776e65; outline-offset: 2px; }
    .board { background: #bbada0; border-radius: 6px; padding: 10px; display: grid; grid-template-columns: repeat(3, 56px); gap: 10px; }
    .cell { width: 56px; height: 56px; border-radius: 3px; background: rgba(238,228,218,.35); position: relative; }
    .tile { position: absolute; inset: 0; border: none; cursor: pointer; padding: 0; border-radius: 3px; z-index: 1;
      font: 700 28px/1 'Clear Sans', 'Helvetica Neue', Arial, sans-serif; color: #776e65; background: #eee4da; }
    .tile:focus-visible { outline: 3px solid #8f7a66; outline-offset: 2px; }
    .tile.pop { animation: pop 200ms ease 100ms backwards; }
    @keyframes pop { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
    .slide { position: absolute; inset: 0; border-radius: 3px; display: grid; place-items: center; font: 700 28px/1 'Clear Sans', 'Helvetica Neue', Arial, sans-serif; color: #776e65; opacity: 0; pointer-events: none; z-index: 2; }
    .slide.go { animation: slide 100ms ease-in-out; }
    @keyframes slide { 0% { opacity: 1; transform: translateX(-66px); } 100% { opacity: 1; transform: translateX(0); } }
    [data-v="2"] { background: #eee4da; } [data-v="4"] { background: #ede0c8; }
    [data-v="8"] { background: #f2b179; color: #f9f6f2; } [data-v="16"] { background: #f59563; color: #f9f6f2; }
    [data-v="32"] { background: #f67c5f; color: #f9f6f2; } [data-v="64"] { background: #f65e3b; color: #f9f6f2; }
    [data-v="128"] { background: #edcf72; color: #f9f6f2; font-size: 23px; box-shadow: 0 0 12px 4px rgba(243,215,116,.24), inset 0 0 0 1px rgba(255,255,255,.14); }
    [data-v="256"] { background: #edcc61; color: #f9f6f2; font-size: 23px; box-shadow: 0 0 12px 4px rgba(243,215,116,.32), inset 0 0 0 1px rgba(255,255,255,.19); }
    [data-v="512"] { background: #edc850; color: #f9f6f2; font-size: 23px; box-shadow: 0 0 12px 4px rgba(243,215,116,.4), inset 0 0 0 1px rgba(255,255,255,.24); }
    [data-v="1024"] { background: #edc53f; color: #f9f6f2; font-size: 18px; box-shadow: 0 0 12px 4px rgba(243,215,116,.48), inset 0 0 0 1px rgba(255,255,255,.29); }
    [data-v="2048"] { background: #edc22e; color: #f9f6f2; font-size: 18px; box-shadow: 0 0 12px 4px rgba(243,215,116,.56), inset 0 0 0 1px rgba(255,255,255,.33); }
  `,
  html: `
    <div class="wrap">
      <div class="top">
        <div class="sc"><small>Score</small><b class="n">0</b><span class="add"></span></div>
        <button class="new" type="button">New Game</button>
      </div>
      <div class="board">
        <div class="cell"></div><div class="cell"></div><div class="cell"></div>
        <div class="cell"></div><div class="cell c"><span class="slide" data-v="2">2</span><button class="tile" type="button" data-v="2" aria-label="Tile 2, merge">2</button></div><div class="cell"></div>
        <div class="cell"></div><div class="cell"></div><div class="cell"></div>
      </div>
    </div>`,
  init(root) {
    const t = root.querySelector('.tile'), slide = root.querySelector('.slide'), n = root.querySelector('.n'), add = root.querySelector('.add'), nw = root.querySelector('.new');
    let v = 2, score = 0, timer;
    const set = (x) => { v = x; t.dataset.v = x; t.textContent = x; t.setAttribute('aria-label', 'Tile ' + x + ', merge'); };
    t.addEventListener('click', () => {
      slide.dataset.v = v; slide.textContent = v;
      slide.classList.remove('go'); t.classList.remove('pop'); void slide.offsetWidth; slide.classList.add('go');
      clearTimeout(timer);
      timer = setTimeout(() => {
        const nv = v >= 2048 ? 2 : v * 2; set(nv); void t.offsetWidth; t.classList.add('pop'); slide.classList.remove('go');
        if (nv > 2) { score += nv; n.textContent = score; add.textContent = '+' + nv; add.classList.remove('go'); void add.offsetWidth; add.classList.add('go'); }
      }, 100);
    });
    nw.addEventListener('click', () => { clearTimeout(timer); score = 0; n.textContent = '0'; set(2); t.classList.remove('pop'); void t.offsetWidth; t.classList.add('pop'); });
    return () => clearTimeout(timer);
  },
};
