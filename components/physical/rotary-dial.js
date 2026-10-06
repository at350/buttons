// Western Electric 500-style rotary dial: clear finger wheel over the satin dial plate, digits and
// letters on the white number ring outside the holes (as on the 500), chrome finger stop.
// Put a finger in a hole and drag clockwise to the stop; let go and the governor returns it at a
// constant speed. Keyboard: type a digit to dial it.
const C = 90;
const at = (deg, r) => [C + r * Math.sin(deg * Math.PI / 180), C - r * Math.cos(deg * Math.PI / 180)];
const STOP = 112;
const DIGITS = [[1, 60, ''], [2, 30, 'ABC'], [3, 0, 'DEF'], [4, 330, 'GHI'], [5, 300, 'JKL'], [6, 270, 'MNO'], [7, 240, 'PRS'], [8, 210, 'TUV'], [9, 180, 'WXY'], [0, 150, 'OPER']];
const HOLE_R = 52, HOLE = 10.5;
const circ = (x, y, r) => `M${(x - r).toFixed(2)},${y.toFixed(2)}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;
const wheelPath = circ(C, C, 66) + DIGITS.map(([, a]) => { const [x, y] = at(a, HOLE_R); return circ(x, y, HOLE); }).join('');
const holeRims = DIGITS.map(([, a]) => { const [x, y] = at(a, HOLE_R); return `<circle class="hrim" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${HOLE}"/>`; }).join('');
const ring = DIGITS.map(([d, a, l]) => {
  const [x, y] = at(a, 77.5);
  return l ? `<text class="lt" x="${x.toFixed(1)}" y="${(y - 4.6).toFixed(1)}">${l}</text><text class="dg" x="${x.toFixed(1)}" y="${(y + 3).toFixed(1)}">${d}</text>`
    : `<text class="dg" x="${x.toFixed(1)}" y="${y.toFixed(1)}">${d}</text>`;
}).join('');
const [s1x, s1y] = at(STOP, 58), [s2x, s2y] = at(STOP, 70);
// how far each digit's hole travels to the finger stop (clockwise)
const TRAVEL = Object.fromEntries(DIGITS.map(([d, a]) => [d, ((STOP - a - 14 + 360) % 360) || 360]));

export default {
  id: 'ph-rotary-dial',
  credit: 'Western Electric 500-style rotary dial — drag a hole clockwise to the finger stop, let go, the governor spins it back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px; border-radius: 12px; background: radial-gradient(circle at 30% 20%, #2f2f33, #111113 75%); }
    svg { display: block; width: 184px; height: 184px; max-width: 100%; touch-action: none; outline: none; }
    svg:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 3px; border-radius: 50%; }
    .body { fill: url(#rd-bak); }
    .numring { fill: #f3efe4; stroke: #c9c3b3; stroke-width: .8; }
    .plate { fill: url(#rd-plate); }
    .dg { font: 700 9.5px Inter, Arial, sans-serif; fill: #161616; text-anchor: middle; dominant-baseline: central; }
    .lt { font: 600 5.2px Inter, Arial, sans-serif; letter-spacing: .3px; fill: #161616; text-anchor: middle; dominant-baseline: central; }
    .wheel { transform-box: view-box; transform-origin: ${C}px ${C}px; cursor: grab; }
    .wheel.drag { cursor: grabbing; }
    .glass { fill: rgba(205,215,225,.16); stroke: rgba(255,255,255,.55); stroke-width: 1; }
    .hrim { fill: rgba(0,0,0,.08); stroke: rgba(255,255,255,.7); stroke-width: 1.1; }
    .card { fill: #fbf8f0; stroke: #b8b2a2; stroke-width: 1; }
    .cardrule { stroke: #c43a2f; stroke-width: .8; }
    .stop { stroke: url(#rd-chrome); stroke-width: 6; stroke-linecap: round; filter: drop-shadow(1px 1.5px 1px rgba(0,0,0,.5)); }
  `,
  html: `
    <div class="stage">
      <svg viewBox="0 0 180 180" role="slider" tabindex="0" aria-label="Rotary dial — type a digit to dial it" aria-valuemin="0" aria-valuemax="9" aria-valuenow="0">
        <defs>
          <radialGradient id="rd-bak" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#3a3a3e"/><stop offset=".6" stop-color="#141416"/><stop offset="1" stop-color="#050506"/></radialGradient>
          <radialGradient id="rd-plate" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#e9ebec"/><stop offset=".7" stop-color="#b6babd"/><stop offset="1" stop-color="#8d9295"/></radialGradient>
          <linearGradient id="rd-chrome" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#9aa0a6"/><stop offset="1" stop-color="#e5e8ea"/></linearGradient>
          <radialGradient id="rd-gloss" cx=".35" cy=".25" r=".6"><stop offset="0" stop-color="rgba(255,255,255,.35)"/><stop offset="1" stop-color="rgba(255,255,255,0)"/></radialGradient>
        </defs>
        <circle class="body" cx="90" cy="90" r="90"/>
        <circle class="numring" cx="90" cy="90" r="88"/>
        <g>${ring}</g>
        <circle class="plate" cx="90" cy="90" r="67"/>
        <g class="wheel">
          <path class="glass" d="${wheelPath}" fill-rule="evenodd"/>
          ${holeRims}
          <circle class="card" cx="90" cy="90" r="27"/>
          <line class="cardrule" x1="72" y1="86" x2="108" y2="86"/><line class="cardrule" x1="72" y1="95" x2="108" y2="95"/>
        </g>
        <circle cx="90" cy="90" r="66" fill="url(#rd-gloss)" pointer-events="none"/>
        <line class="stop" x1="${s1x.toFixed(1)}" y1="${s1y.toFixed(1)}" x2="${s2x.toFixed(1)}" y2="${s2y.toFixed(1)}"/>
      </svg>
    </div>`,
  init(root) {
    const svg = root.querySelector('svg'), wheel = root.querySelector('.wheel');
    let ang = 0, max = 0, last = 0, dragging = false, raf = 0, t = 0, digit = 0;
    const geo = (e) => { const r = svg.getBoundingClientRect(), s = r.width / 180; const dx = (e.clientX - r.left) / s - C, dy = (e.clientY - r.top) / s - C; return { a: Math.atan2(dy, dx) * 180 / Math.PI, d: Math.hypot(dx, dy), b: (Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360 }; };
    const render = () => { wheel.style.transform = `rotate(${ang}deg)`; };
    const spring = () => { // governor: constant angular speed back to rest
      const dur = Math.max(0.15, ang / 330); wheel.style.transition = `transform ${dur.toFixed(2)}s linear`;
      svg.setAttribute('aria-valuenow', digit); ang = 0; render();
    };
    svg.addEventListener('pointerdown', (e) => {
      const g = geo(e); if (Math.abs(g.d - HOLE_R) > HOLE + 2) return; // only a finger in a hole turns it
      const hit = DIGITS.find(([, a]) => Math.abs(((g.b - a + 540) % 360) - 180) < 14); if (!hit) return;
      digit = hit[0]; max = TRAVEL[digit]; dragging = true; last = g.a; svg.setPointerCapture(e.pointerId);
      clearTimeout(t); wheel.style.transition = 'none'; ang = 0; render(); wheel.classList.add('drag');
    });
    svg.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const a = geo(e).a; let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      ang = Math.max(0, Math.min(max, ang + d));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    const release = () => { if (!dragging) return; dragging = false; wheel.classList.remove('drag'); if (raf) cancelAnimationFrame(raf); raf = 0; spring(); };
    svg.addEventListener('pointerup', release); svg.addEventListener('pointercancel', release);
    svg.addEventListener('keydown', (e) => {
      if (!/^[0-9]$/.test(e.key) || dragging) return; e.preventDefault();
      digit = +e.key; clearTimeout(t);
      wheel.style.transition = 'transform .45s cubic-bezier(.3,.7,.4,1)'; ang = TRAVEL[digit]; render();
      t = setTimeout(spring, 520);
    });
    return () => { clearTimeout(t); if (raf) cancelAnimationFrame(raf); };
  },
};
