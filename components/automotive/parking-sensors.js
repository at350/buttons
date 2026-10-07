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
<defs><linearGradient id="ps3b" x1="0" x2="1"><stop offset="0" stop-color="#9ea4ac"/><stop offset=".22" stop-color="#dfe2e6"/><stop offset=".5" stop-color="#f2f3f5"/><stop offset=".78" stop-color="#dfe2e6"/><stop offset="1" stop-color="#9ea4ac"/></linearGradient><linearGradient id="ps3g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b434d"/><stop offset="1" stop-color="#1a1e24"/></linearGradient></defs><g transform="translate(47.5 -176.5) scale(1.5)"><rect x="28.5" y="53" width="6" height="17" rx="2.5" fill="#15171a"/><rect x="75.5" y="53" width="6" height="17" rx="2.5" fill="#15171a"/><rect x="28.5" y="112" width="6" height="17" rx="2.5" fill="#15171a"/><rect x="75.5" y="112" width="6" height="17" rx="2.5" fill="#15171a"/>
          <path d="M31.5 70.5 25 68.5Q23.6 68.4 23.8 70.3L24.4 73Q24.7 74.4 26.2 74.1L31.6 73.4Z" fill="#d7dade"/><path d="M78.5 70.5 85 68.5Q86.4 68.4 86.2 70.3L85.6 73Q85.3 74.4 83.8 74.1L78.4 73.4Z" fill="#d7dade"/>
          <path d="M55 39C67 39 75.5 42.5 77.4 50.5L79.3 66C80.4 82 80.4 110 79.4 126C78.6 134.5 72.5 141 55 141S31.4 134.5 30.6 126C29.6 110 29.6 82 30.7 66L32.6 50.5C34.5 42.5 43 39 55 39Z" fill="url(#ps3b)" stroke="#9aa0a8" stroke-width=".6"/>
          <path d="M36.5 44.5Q40 41.6 46 41.2L45 43.4Q40 44 37.6 46.6Z" fill="#fff"/><path d="M73.5 44.5Q70 41.6 64 41.2L65 43.4Q70 44 72.4 46.6Z" fill="#fff"/>
          <path d="M37.6 68.5C45 63.6 65 63.6 72.4 68.5L70.6 79.6C62.5 76.8 47.5 76.8 39.4 79.6Z" fill="url(#ps3g)"/>
          <path d="M39.6 81.6C47.5 79 62.5 79 70.4 81.6L71 112C62.5 114.5 47.5 114.5 39 112Z" fill="#20252c"/><path d="M42 84C48 82.4 55 82 60 82.2L44 110Z" fill="#fff" opacity=".07"/>
          <path d="M39.4 115.2C47.5 117.4 62.5 117.4 70.6 115.2L72 124.5C63.5 128.6 46.5 128.6 38 124.5Z" fill="url(#ps3g)"/>
          <path d="M33.4 134.6Q36 139 44 139.8L43 137.6Q37.4 137 35 133.2Z" fill="#e0262b"/><path d="M76.6 134.6Q74 139 66 139.8L67 137.6Q72.6 137 75 133.2Z" fill="#e0262b"/>
          </g>
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
