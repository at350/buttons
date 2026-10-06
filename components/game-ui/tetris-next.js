export default {
  id: 'gm-tetris-next',
  credit: 'Tetris (Guideline / Tetris Effect style) — HOLD and NEXT boxes; click NEXT to cycle the queue, click HOLD to swap the piece in, arrow-up rotates',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: radial-gradient(ellipse at 50% 0%, #1a1f3a, #07091a 70%); padding: 16px 18px; border-radius: 12px; display: flex; gap: 14px; font-family: 'Unbounded', 'Syne', system-ui, sans-serif; }
    .box { width: 96px; border: 2px solid rgba(255,255,255,.25); border-radius: 4px; background: rgba(0,0,0,.45); cursor: pointer; padding: 0; color: #fff; position: relative; display: flex; flex-direction: column; align-items: center; transition: border-color .15s, box-shadow .15s; }
    .box:hover, .box:focus-visible { border-color: rgba(255,255,255,.7); box-shadow: 0 0 14px rgba(120,160,255,.35); outline: none; }
    .box h5 { margin: 0; font: 700 10px 'Unbounded', 'Syne', system-ui, sans-serif; letter-spacing: 2px; padding: 6px 0 4px; color: rgba(255,255,255,.75); }
    .grid { display: grid; grid-template-columns: repeat(4, 14px); grid-template-rows: repeat(4, 14px); gap: 1px; margin: 4px 0 10px; }
    .grid i { display: block; width: 14px; height: 14px; border-radius: 1px; background: var(--c, transparent); }
    .grid i.f { box-shadow: inset 0 0 0 1px rgba(255,255,255,.35), inset 2px 2px 0 rgba(255,255,255,.35), inset -2px -2px 0 rgba(0,0,0,.35), 0 0 8px var(--c); }
    .q { display: grid; grid-template-columns: repeat(4, 7px); grid-template-rows: repeat(4, 7px); gap: 1px; margin-bottom: 8px; opacity: .55; }
    .q i { display: block; width: 7px; height: 7px; background: var(--c, transparent); }
    .hold.used { opacity: .5; }
    .grid.pop { animation: pop .18s ease-out; }
    @keyframes pop { 50% { transform: scale(1.12); } }
    .hint { position: absolute; right: 6px; top: 6px; width: 14px; height: 14px; border: 1px solid rgba(255,255,255,.4); border-radius: 3px; font: 700 8px/12px 'Inter', system-ui, sans-serif; text-align: center; color: rgba(255,255,255,.6); }
  `,
  html: `
    <div class="stage">
      <button class="box hold" type="button" aria-label="Hold"><h5>HOLD</h5><div class="grid g1"></div><span class="hint">C</span></button>
      <button class="box next" type="button" aria-label="Next piece"><h5>NEXT</h5><div class="grid g2"></div><div class="q q1"></div><div class="q q2"></div></button>
    </div>`,
  init(root) {
    const P = {
      I: ['#2fd5f1', [[0,1],[1,1],[2,1],[3,1]]], O: ['#f5d90a', [[1,1],[2,1],[1,2],[2,2]]], T: ['#b33dd3', [[1,1],[0,2],[1,2],[2,2]]], S: ['#52d35a', [[1,1],[2,1],[0,2],[1,2]]],
      Z: ['#f0392b', [[0,1],[1,1],[1,2],[2,2]]], J: ['#2f52f1', [[0,1],[0,2],[1,2],[2,2]]], L: ['#f29321', [[2,1],[0,2],[1,2],[2,2]]],
    };
    const keys = Object.keys(P); let queue = ['T', 'I', 'L'], hold = null, rot = 0;
    const rnd = () => keys[Math.floor(Math.random() * keys.length)];
    const cells = (el) => { if (!el.children.length) for (let i = 0; i < 16; i++) el.appendChild(document.createElement('i')); return [...el.children]; };
    const rotate = (pts, r) => { let p = pts; for (let k = 0; k < r; k++) p = p.map(([x, y]) => [3 - y, x]); const mx = Math.min(...p.map((a) => a[0])), my = Math.min(...p.map((a) => a[1])); return p.map(([x, y]) => [x - mx, y - my]); };
    const draw = (el, name, r = 0) => { const c = cells(el); c.forEach((i) => { i.style.setProperty('--c', 'transparent'); i.classList.remove('f'); }); if (!name) return; const [col, pts] = P[name]; rotate(pts, r).forEach(([x, y]) => { const i = c[Math.min(15, y * 4 + x)]; i.style.setProperty('--c', col); i.classList.add('f'); }); };
    const g1 = root.querySelector('.g1'), g2 = root.querySelector('.g2'), q1 = root.querySelector('.q1'), q2 = root.querySelector('.q2'), hb = root.querySelector('.hold'), nb = root.querySelector('.next');
    let t;
    const render = () => { draw(g1, hold); draw(g2, queue[0], rot); draw(q1, queue[1]); draw(q2, queue[2]); g2.classList.remove('pop'); void g2.offsetWidth; g2.classList.add('pop'); };
    nb.addEventListener('click', () => { queue.shift(); queue.push(rnd()); rot = 0; render(); });
    hb.addEventListener('click', () => { const cur = queue[0]; if (hold) queue[0] = hold; else { queue.shift(); queue.push(rnd()); } hold = cur; rot = 0; hb.classList.add('used'); render(); clearTimeout(t); t = setTimeout(() => hb.classList.remove('used'), 300); });
    root.querySelector('.stage').addEventListener('keydown', (e) => { if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); rot = (rot + 1) % 4; render(); } if (e.key.toLowerCase() === 'c') { e.preventDefault(); hb.click(); } });
    render();
    return () => clearTimeout(t);
  },
};
