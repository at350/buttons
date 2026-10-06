const CX = 130, CY = 30, ROWS = ['#ff3030', '#ff8a00', '#ffd400', '#35d05b'], SECT = [[118, 152], [64, 116], [28, 62]];
const seg = (r1, r2, a1, a2) => {
  const p = (r, a) => `${(CX + r * Math.cos(a * Math.PI / 180)).toFixed(1)} ${(CY + r * Math.sin(a * Math.PI / 180)).toFixed(1)}`;
  return `M${p(r1, a1)}L${p(r2, a1)}A${r2} ${r2} 0 0 1 ${p(r2, a2)}L${p(r1, a2)}A${r1} ${r1} 0 0 0 ${p(r1, a1)}Z`;
};
const ARCS = SECT.map(([a, b], z) => ROWS.map((_, k) => `<path class="sg" data-z="${z}" data-k="${k}" d="${seg(52 + k * 15, 63 + k * 15, b, a)}"/>`).join('')).join('');

export default {
  id: 'au-parking-sensors',
  credit: 'Rear parking sensors (Park Distance Control) — drag the bollard toward the bumper: the arcs fill green → yellow → orange → red per zone, with the distance readout down to STOP',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 260px; height: 210px; border-radius: 12px; overflow: hidden; background: radial-gradient(circle at 50% 0%, #1b2027, #07090c 75%); font: 600 12px/1 Inter, system-ui, sans-serif; color: #fff; user-select: none; touch-action: none; }
    svg.v { position: absolute; inset: 0; width: 100%; height: 100%; }
    .body { fill: #c9ced6; }
    .glass { fill: #2b3440; }
    .sg { fill: #1a1f26; stroke: #07090c; stroke-width: 1; transition: fill .12s, filter .12s; }
    .lot { stroke: #2a313b; stroke-width: 2; stroke-dasharray: 6 6; }
    .ob { position: absolute; left: 0; top: 0; width: 34px; height: 34px; margin: -17px; border-radius: 50%; cursor: grab; touch-action: none; background: radial-gradient(circle at 40% 35%, #ffd84a, #e0a800 60%, #6b5000); box-shadow: 0 4px 8px rgba(0,0,0,.6), inset 0 0 0 4px rgba(0,0,0,.18); }
    .ob::after { content: ''; position: absolute; inset: 11px; border-radius: 50%; background: #2a2a2a; }
    .ob.drag { cursor: grabbing; }
    .ob:focus-visible { outline: 2px solid #4da3ff; outline-offset: 3px; }
    .rd { position: absolute; right: 10px; bottom: 10px; min-width: 56px; padding: 5px 8px; border-radius: 6px; background: rgba(20,24,30,.85); text-align: center; font-variant-numeric: tabular-nums; }
    .rd.stop { background: #ff3030; animation: st .4s steps(1) infinite; }
    @keyframes st { 50% { background: #8a1010; } }
  `,
  html: `
    <div class="stage">
      <svg class="v" viewBox="0 0 260 210" aria-hidden="true">
        <line class="lot" x1="20" y1="206" x2="240" y2="206"/>
        <rect class="body" x="92" y="-40" width="76" height="76" rx="18"/>
        <rect class="glass" x="102" y="-6" width="56" height="20" rx="6"/>
        ${ARCS}
      </svg>
      <div class="ob" tabindex="0" role="slider" aria-label="Obstacle distance" aria-valuemin="0" aria-valuemax="150" aria-valuenow="150"></div>
      <div class="rd">--</div>
    </div>`,
  init(root) {
    const ob = root.querySelector('.ob'), rd = root.querySelector('.rd'), sgs = [...root.querySelectorAll('.sg')];
    let x = 130, y = 182, drag = false, ox = 0, oy = 0;
    const paint = () => {
      ob.style.transform = `translate(${x}px, ${y}px)`;
      const dx = x - CX, dy = y - CY, a = Math.atan2(dy, dx) * 180 / Math.PI;
      const dist = Math.max(0, Math.hypot(dx, dy) - 52 - 17);
      const zone = SECT.findIndex(([lo, hi]) => a >= lo - 8 && a <= hi + 8);
      const lit = dist < 12 ? 4 : dist < 30 ? 3 : dist < 48 ? 2 : dist < 72 ? 1 : 0;
      sgs.forEach((s) => {
        const z = +s.dataset.z, k = +s.dataset.k, on = (z === zone || (lit === 4 && Math.abs(z - zone) === 1 && k === 0)) && k >= 4 - lit;
        s.style.fill = on ? ROWS[k] : ''; s.style.filter = on ? `drop-shadow(0 0 4px ${ROWS[k]})` : '';
      });
      const cm = Math.round(dist * 2.2);
      rd.textContent = zone < 0 || lit === 0 ? '--' : lit === 4 ? 'STOP' : (cm / 100).toFixed(1) + ' m';
      rd.classList.toggle('stop', lit === 4 && zone >= 0);
      ob.setAttribute('aria-valuenow', Math.min(150, cm));
    };
    ob.addEventListener('pointerdown', (e) => { drag = true; ox = e.clientX - x; oy = e.clientY - y; ob.setPointerCapture(e.pointerId); ob.classList.add('drag'); });
    ob.addEventListener('pointermove', (e) => { if (!drag) return; x = Math.max(18, Math.min(242, e.clientX - ox)); y = Math.max(80, Math.min(192, e.clientY - oy)); paint(); });
    const end = () => { drag = false; ob.classList.remove('drag'); };
    ob.addEventListener('pointerup', end); ob.addEventListener('pointercancel', end);
    ob.addEventListener('click', () => { if (Math.abs(x - 130) < 1 && y > 180) { y = 120; paint(); } });
    ob.addEventListener('keydown', (e) => {
      const m = { ArrowUp: [0, -6], ArrowDown: [0, 6], ArrowLeft: [-6, 0], ArrowRight: [6, 0] }[e.key];
      if (m) { e.preventDefault(); x = Math.max(18, Math.min(242, x + m[0])); y = Math.max(80, Math.min(192, y + m[1])); paint(); }
    });
    paint();
  },
};
