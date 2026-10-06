// Geometry is computed as plain strings at import time (no DOM access).
const C = 90, R = 60;
const at = (deg, r) => [C + r * Math.sin(deg * Math.PI / 180), C - r * Math.cos(deg * Math.PI / 180)];
const DIGITS = [[1, 60], [2, 30], [3, 0], [4, 330], [5, 300], [6, 270], [7, 240], [8, 210], [9, 180], [0, 150]];
const circ = (x, y, r) => `M${(x - r).toFixed(2)},${y.toFixed(2)}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;
const wheelPath = circ(C, C, 78) + DIGITS.map(([, a]) => { const [x, y] = at(a, R); return circ(x, y, 10.5); }).join('');
const nums = DIGITS.map(([d, a]) => { const [x, y] = at(a, R); return `<text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}">${d}</text>`; }).join('');
const [sx1, sy1] = at(110, 50), [sx2, sy2] = at(110, 86);

export default {
  id: 'ph-rotary-dial',
  credit: 'Rotary telephone dial (Western Electric 500) — drag a hole clockwise to the finger stop, let go, it spins back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 16px; border-radius: 12px; background: radial-gradient(circle at 30% 20%, #3b3b40, #16161a 75%); }
    svg { display: block; width: 180px; height: 180px; max-width: 100%; touch-action: none; }
    .card { fill: #efe7d2; }
    .nums text { font: 700 13px system-ui, -apple-system, sans-serif; fill: #1d1d1f; text-anchor: middle; }
    .wheel { transform-box: fill-box; transform-origin: 50% 50%; cursor: grab; }
    .wheel.spring { transition: transform .9s cubic-bezier(.2,.8,.25,1); }
    .wheel.drag { cursor: grabbing; }
    .disc { fill: #141416; stroke: #3a3a3e; stroke-width: 1; }
    .rim { fill: none; stroke: #5a5a60; stroke-width: 1.2; }
    .cap { fill: #e9e9ea; stroke: #8d8d92; stroke-width: 1.5; }
    .cap2 { fill: #c6c6ca; }
    .stop { stroke: #d8d8dc; stroke-width: 7; stroke-linecap: round; }
    .stop2 { stroke: #6e6e74; stroke-width: 3; stroke-linecap: round; }
    svg:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 2px; border-radius: 50%; }
  `,
  html: `
    <div class="stage">
      <svg viewBox="0 0 180 180" role="slider" tabindex="0" aria-label="rotary dial" aria-valuemin="0" aria-valuemax="320" aria-valuenow="0">
        <circle cx="90" cy="90" r="88" fill="#1c1c1f"/>
        <circle cx="90" cy="90" r="88" fill="none" stroke="#3c3c42" stroke-width="2"/>
        <circle class="card" cx="90" cy="90" r="76"/>
        <g class="nums">${nums}</g>
        <g class="wheel">
          <path class="disc" d="${wheelPath}" fill-rule="evenodd"/>
          <circle class="rim" cx="90" cy="90" r="76"/>
          <circle class="cap" cx="90" cy="90" r="22"/>
          <circle class="cap2" cx="90" cy="90" r="9"/>
        </g>
        <line class="stop2" x1="${sx1.toFixed(1)}" y1="${sy1.toFixed(1)}" x2="${sx2.toFixed(1)}" y2="${sy2.toFixed(1)}"/>
        <line class="stop" x1="${sx1.toFixed(1)}" y1="${sy1.toFixed(1)}" x2="${(sx2 - 1).toFixed(1)}" y2="${(sy2 - 1).toFixed(1)}"/>
      </svg>
    </div>`,
  init(root) {
    const svg = root.querySelector('svg');
    const wheel = root.querySelector('.wheel');
    const MAX = 320;
    let ang = 0, last = 0, dragging = false, raf = 0;
    const angleAt = (e) => { const r = svg.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    const render = () => { wheel.style.transform = `rotate(${ang}deg)`; svg.setAttribute('aria-valuenow', Math.round(ang)); };
    svg.addEventListener('pointerdown', (e) => {
      dragging = true; last = angleAt(e); svg.setPointerCapture(e.pointerId);
      wheel.classList.remove('spring'); wheel.classList.add('drag');
    });
    svg.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      ang = Math.max(0, Math.min(MAX, ang + d));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    const release = () => { if (!dragging) return; dragging = false; wheel.classList.remove('drag'); wheel.classList.add('spring'); ang = 0; render(); };
    svg.addEventListener('pointerup', release); svg.addEventListener('pointercancel', release);
    svg.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); wheel.classList.remove('spring'); ang = Math.min(MAX, ang + 30); render(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); wheel.classList.remove('spring'); ang = Math.max(0, ang - 30); render(); }
      else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); wheel.classList.add('spring'); ang = 0; render(); }
    });
  },
};
