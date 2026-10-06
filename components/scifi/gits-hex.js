// Ghost in the Shell (1995) — the cyberbrain net-dive: a green hex lattice that wakes under your cursor; click a cell to dive and the net ripples out.
const COLS = 11, ROWS = 7, S = 13, HW = S * Math.sqrt(3);
const CELLS = [];
for (let r = 0; r < ROWS; r++) for (let q = 0; q < COLS; q++) CELLS.push({ x: 16 + q * HW + (r % 2 ? HW / 2 : 0), y: 16 + r * S * 1.5, r, q });
const hex = (x, y) => Array.from({ length: 6 }, (_, i) => { const a = (Math.PI / 3) * i - Math.PI / 6; return `${(x + (S - 1) * Math.cos(a)).toFixed(1)},${(y + (S - 1) * Math.sin(a)).toFixed(1)}`; }).join(' ');
export default {
  id: 'sf-gits-hex',
  credit: 'Ghost in the Shell (1995, Production I.G) — the cyberbrain net-dive hex lattice in phosphor green: cells wake under the cursor; click one to dive and the net ripples outward from it, the address readout follows',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 300px; height: 196px; max-width: 100%; border-radius: 12px; overflow: hidden; background: radial-gradient(ellipse at 50% 50%, #04221a, #010806 70%);
      font-family: 'JetBrains Mono', ui-monospace, monospace; color: #46ff9b; }
    .net { position: absolute; left: 10px; top: 8px; width: 280px; height: 150px; outline: none; cursor: crosshair; }
    .net:focus-visible { outline: 1px dashed #46ff9b; outline-offset: 2px; }
    polygon { fill: rgba(70,255,155,calc(.03 + var(--k, 0) * .35)); stroke: rgba(70,255,155,calc(.28 + var(--k, 0) * .7)); stroke-width: 1; transition: fill .25s, stroke .25s; }
    polygon.dv { animation: dv .9s ease-out both; animation-delay: calc(var(--d) * 70ms); }
    @keyframes dv { 0% { fill: rgba(70,255,155,.05); } 25% { fill: rgba(200,255,220,.9); stroke: #eafff3; } 100% { fill: rgba(70,255,155,.04); } }
    polygon.core { fill: rgba(70,255,155,.55); stroke: #eafff3; }
    text { fill: rgba(70,255,155,.75); font: 500 6px 'JetBrains Mono', monospace; text-anchor: middle; pointer-events: none; transition: opacity .3s; }
    text.fade { opacity: 0; }
    polygon.cur { stroke: #eafff3; stroke-width: 1.6; }
    .rd { position: absolute; left: 14px; right: 14px; bottom: 10px; display: flex; justify-content: space-between; font-size: 9px; letter-spacing: .14em; text-shadow: 0 0 6px rgba(70,255,155,.6); white-space: nowrap; }
    .stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, rgba(0,0,0,.25) 0 1px, transparent 1px 3px); }
  `,
  html: `<div class="stage"><svg class="net" viewBox="0 0 280 150" tabindex="0" role="button" aria-label="Dive">${CELLS.map((c, i) => `<polygon points="${hex(c.x, c.y)}" data-i="${i}"/>`).join('')}${[5, 19, 30, 46, 58, 71].map((i) => `<text x="${CELLS[i].x.toFixed(1)}" y="${(CELLS[i].y + 2).toFixed(1)}" data-c="${i}">00</text>`).join('')}</svg>
    <div class="rd"><span>電脳 NET</span><span class="ad">ADDR 00:00</span><span class="dp">DEPTH 0</span></div></div>`,
  init(root) {
    const net = root.querySelector('.net'), ps = [...net.querySelectorAll('polygon')], ad = root.querySelector('.ad'), dp = root.querySelector('.dp');
    let depth = 0, tms = [], cur = Math.floor(CELLS.length / 2);
    const tx = [...net.querySelectorAll('text')];
    const relabel = () => tx.forEach((t) => { t.classList.add('fade'); tms.push(setTimeout(() => { t.textContent = Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0'); t.classList.remove('fade'); }, 400 + Math.random() * 500)); });
    const toLocal = (e) => { const r = net.getBoundingClientRect(); return [((e.clientX - r.left) / r.width) * 280, ((e.clientY - r.top) / r.height) * 150]; };
    net.addEventListener('pointermove', (e) => {
      const [x, y] = toLocal(e);
      ps.forEach((p, i) => { const d = Math.hypot(CELLS[i].x - x, CELLS[i].y - y); p.style.setProperty('--k', Math.max(0, 1 - d / 50).toFixed(2)); });
    });
    net.addEventListener('pointerleave', () => ps.forEach((p) => p.style.removeProperty('--k')));
    const dive = (i) => {
      tms.forEach(clearTimeout); tms = []; const c0 = CELLS[i]; depth++;
      ps.forEach((p, j) => { const d = Math.round(Math.hypot(CELLS[j].x - c0.x, CELLS[j].y - c0.y) / (S * 1.6)); p.classList.remove('dv', 'core'); void p.getBBox; p.style.setProperty('--d', d); });
      void net.getBoundingClientRect();
      ps.forEach((p, j) => p.classList.add(j === i ? 'core' : 'dv'));
      ad.textContent = `ADDR ${String(c0.q).padStart(2, '0')}:${String(c0.r).padStart(2, '0')}`; dp.textContent = `DEPTH ${depth}`;
      tms.push(setTimeout(() => ps.forEach((p) => p.classList.remove('dv')), 1800)); relabel();
    };
    net.addEventListener('click', (e) => { const p = e.target.closest('polygon'); if (p) dive(+p.dataset.i); else { const [x, y] = toLocal(e); let b = 0, bd = 1e9; CELLS.forEach((c, j) => { const d = Math.hypot(c.x - x, c.y - y); if (d < bd) { bd = d; b = j; } }); dive(b); } });
    const mark = () => ps.forEach((p, j) => p.classList.toggle('cur', j === cur));
    net.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dive(cur); return; }
      const d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: COLS, ArrowUp: -COLS }[e.key];
      if (d && CELLS[cur + d]) { e.preventDefault(); cur += d; mark(); }
    });
    net.addEventListener('focus', mark); net.addEventListener('blur', () => ps.forEach((p) => p.classList.remove('cur')));
    relabel();
    return () => tms.forEach(clearTimeout);
  },
};
