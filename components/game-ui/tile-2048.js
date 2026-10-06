export default {
  id: 'gm-2048-tile',
  credit: 'Gabriele Cirulli 2048 — a tile on the beige board; click it to merge and double (pop animation, colour ramps up to 2048, then wraps)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .board { background: #bbada0; border-radius: 10px; padding: 10px; display: grid; grid-template-columns: repeat(3, 56px); gap: 10px; }
    .cell { width: 56px; height: 56px; border-radius: 3px; background: rgba(238,228,218,.35); }
    .tile { border: none; cursor: pointer; padding: 0; border-radius: 3px; width: 56px; height: 56px; font: 700 22px 'Inter', system-ui, sans-serif; color: #776e65; background: #eee4da; transition: background .15s, color .15s; }
    .tile.pop { animation: pop .2s ease-in-out; }
    @keyframes pop { 50% { transform: scale(1.2); } }
    .tile:focus-visible { outline: 3px solid #f65e3b; outline-offset: 2px; }
    .tile[data-v="4"] { background: #ede0c8; } .tile[data-v="8"] { background: #f2b179; color: #f9f6f2; } .tile[data-v="16"] { background: #f59563; color: #f9f6f2; }
    .tile[data-v="32"] { background: #f67c5f; color: #f9f6f2; } .tile[data-v="64"] { background: #f65e3b; color: #f9f6f2; }
    .tile[data-v="128"] { background: #edcf72; color: #f9f6f2; font-size: 18px; box-shadow: 0 0 20px 6px rgba(243,215,116,.3); }
    .tile[data-v="256"] { background: #edcc61; color: #f9f6f2; font-size: 18px; box-shadow: 0 0 20px 8px rgba(243,215,116,.4); }
    .tile[data-v="512"] { background: #edc850; color: #f9f6f2; font-size: 18px; box-shadow: 0 0 20px 10px rgba(243,215,116,.5); }
    .tile[data-v="1024"] { background: #edc53f; color: #f9f6f2; font-size: 15px; box-shadow: 0 0 20px 12px rgba(243,215,116,.6); }
    .tile[data-v="2048"] { background: #edc22e; color: #f9f6f2; font-size: 15px; box-shadow: 0 0 20px 14px rgba(243,215,116,.7); }
    .ghost { position: relative; }
    .ghost .tile { position: absolute; inset: 0; }
    .ghost .slide { position: absolute; inset: 0; border-radius: 3px; background: #eee4da; opacity: 0; pointer-events: none; }
    .ghost.merge .slide { animation: slide .15s ease-in; }
    @keyframes slide { 0% { opacity: 1; transform: translateX(-66px); } 100% { opacity: 1; transform: translateX(0); } }
  `,
  html: `
    <div class="board">
      <div class="cell"></div><div class="cell"></div><div class="cell"></div>
      <div class="cell"></div><div class="cell ghost"><span class="slide"></span><button class="tile" type="button" data-v="2" aria-label="Tile 2">2</button></div><div class="cell"></div>
      <div class="cell"></div><div class="cell"></div><div class="cell"></div>
    </div>`,
  init(root) {
    const t = root.querySelector('.tile'), g = root.querySelector('.ghost'), slide = root.querySelector('.slide');
    let v = 2, timer;
    t.addEventListener('click', () => {
      slide.style.background = t.style.background || getComputedStyle(t).backgroundColor;
      g.classList.remove('merge'); t.classList.remove('pop'); void t.offsetWidth; g.classList.add('merge');
      clearTimeout(timer); timer = setTimeout(() => { v = v >= 2048 ? 2 : v * 2; t.dataset.v = v; t.textContent = v; t.setAttribute('aria-label', 'Tile ' + v); t.classList.add('pop'); }, 140);
    });
    return () => clearTimeout(timer);
  },
};
