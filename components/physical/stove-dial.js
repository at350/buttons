// Gas range burner valve knob on a brushed-stainless control panel. OFF at 12 o'clock; turn counter-
// clockwise past LITE to HI, then down the flame wedge to LO (with Lucide flame marks at HI and LO).
// Click-detents along the way; the red "burner on" lamp lights whenever the valve is open.
const C = 75;
const at = (deg, r) => [C + r * Math.sin(deg * Math.PI / 180), C - r * Math.cos(deg * Math.PI / 180)];
const STOPS = [0, -55, -90, -112.5, -135, -157.5, -180, -202.5, -225, -247.5, -270];
const NAMES = ['Off', 'Lite', 'Hi', '', '', '', 'Med', '', '', '', 'Lo'];
const wedge = (() => { // thick at HI (-90) tapering to LO (-270)
  const pts = [], inner = [];
  for (let a = -90; a >= -270; a -= 6) { const w = 1 + 6 * ((a + 270) / 180); pts.push(at(a, 46 + w)); inner.push(at(a, 46)); }
  return 'M' + pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join('L') + 'L' + inner.reverse().map((p) => p.map((v) => v.toFixed(1)).join(',')).join('L') + 'Z';
})();
const label = (txt, deg, r = 64) => { const [x, y] = at(deg, r); return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}">${txt}</text>`; };
const flame = (deg, s) => { const [x, y] = at(deg, 63); return `<g class="fl" transform="translate(${(x - 12 * s).toFixed(1)} ${(y - 12 * s).toFixed(1)}) scale(${s})"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/></g>`; };
const ticks = STOPS.map((a) => { const [x1, y1] = at(a, 40.5), [x2, y2] = at(a, 44); return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`; }).join('');

export default {
  id: 'ph-stove-dial',
  credit: 'Gas range burner knob on brushed stainless — OFF, push-turn past LITE to HI, flame wedge down to LO, click detents',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; display: inline-block; padding: 10px; border-radius: 12px;
      background: repeating-linear-gradient(90deg, rgba(255,255,255,.18) 0 1px, rgba(0,0,0,.035) 1px 2px, transparent 2px 3px), linear-gradient(90deg, #a9adb1, #dadddf 35%, #b9bdc1 60%, #d3d6d9 85%, #a3a7ab);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.7), inset 0 -1px 0 rgba(0,0,0,.2); }
    .wrap { position: relative; width: 150px; height: 150px; }
    svg { position: absolute; inset: 0; width: 150px; height: 150px; }
    svg text { font: 800 8.5px Inter, Arial, sans-serif; letter-spacing: .6px; fill: #232427; text-anchor: middle; dominant-baseline: central; }
    svg line { stroke: #232427; stroke-width: 1.6; }
    .wedge { fill: #232427; }
    .fl path { fill: none; stroke: #232427; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
    .lamp { position: absolute; right: 14px; top: 14px; width: 9px; height: 9px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #6a2018, #3a0d08); box-shadow: 0 0 0 1.5px #7d8186, inset 0 1px 1px rgba(0,0,0,.6); transition: background .12s, box-shadow .12s; }
    .lamp.on { background: radial-gradient(circle at 40% 35%, #ffd0c4, #ff3b1f 55%, #c41a05); box-shadow: 0 0 0 1.5px #7d8186, 0 0 8px 2px rgba(255,70,30,.75); }
    .knob {
      position: absolute; left: ${C - 31}px; top: ${C - 31}px; width: 62px; height: 62px; border-radius: 50%; cursor: grab; touch-action: none; outline: none;
      background: radial-gradient(circle at 42% 32%, #3c3d41, #18191b 62%, #0c0c0d);
      box-shadow: 0 1px 1px rgba(0,0,0,.5), 0 5px 6px rgba(0,0,0,.4), 0 12px 14px -4px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.18), inset 0 0 0 2px #2a2b2e;
      transition: transform .1s cubic-bezier(.3,1.7,.5,1);
    }
    .knob.drag { cursor: grabbing; transform: scale(.98); }
    .knob:focus-visible { box-shadow: 0 0 0 3px #1d4ed8, 0 5px 6px rgba(0,0,0,.4); }
    .rot { position: absolute; inset: 0; border-radius: 50%; transform: rotate(0deg); transition: transform .12s cubic-bezier(.3,1.6,.5,1); }
    .knob.drag .rot { transition: none; }
    .fin { position: absolute; left: 50%; top: 5px; width: 20px; height: 52px; margin-left: -10px; border-radius: 10px;
      background: linear-gradient(90deg, #0b0b0c, #45474c 35%, #2a2b2f 60%, #0e0e10); box-shadow: 0 2px 3px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.2); }
    .fin::after { content: ''; position: absolute; left: 50%; top: 3px; width: 3px; height: 12px; margin-left: -1.5px; border-radius: 1.5px; background: #f2f2f0; }
  `,
  html: `
    <div class="stage">
      <span class="lamp"></span>
      <div class="wrap">
        <svg viewBox="0 0 150 150" aria-hidden="true">
          ${ticks}<path class="wedge" d="${wedge}"/>
          ${label('OFF', 0)}${label('LITE', -55)}${label('HI', -90, 59)}${label('MED', -180)}${label('LO', -270, 59)}
          ${flame(-108, 0.62)}${flame(-252, 0.42)}
        </svg>
        <div class="knob" role="slider" tabindex="0" aria-label="Burner" aria-valuemin="0" aria-valuemax="10" aria-valuenow="0" aria-valuetext="Off">
          <div class="rot"><div class="fin"></div></div>
        </div>
      </div>
    </div>`,
  init(root) {
    const knob = root.querySelector('.knob'), rot = root.querySelector('.rot'), lamp = root.querySelector('.lamp');
    let i = 0, raw = 0, last = 0, dragging = false, raf = 0;
    const nearest = (a) => STOPS.reduce((b, s, k) => (Math.abs(s - a) < Math.abs(STOPS[b] - a) ? k : b), 0);
    const render = (live) => {
      if (!live) i = nearest(raw);
      rot.style.transform = `rotate(${live ? raw : STOPS[i]}deg)`;
      const k = live ? nearest(raw) : i;
      knob.setAttribute('aria-valuenow', k); knob.setAttribute('aria-valuetext', NAMES[k] || NAMES.slice(0, k + 1).filter(Boolean).pop());
      lamp.classList.toggle('on', k > 0);
    };
    const angleAt = (e) => { const r = knob.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    knob.addEventListener('pointerdown', (e) => { dragging = true; raw = STOPS[i]; last = angleAt(e); knob.setPointerCapture(e.pointerId); knob.classList.add('drag'); });
    knob.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      raw = Math.max(-270, Math.min(0, raw + d));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(true); });
    });
    const end = () => { if (!dragging) return; dragging = false; knob.classList.remove('drag'); if (raf) cancelAnimationFrame(raf); raf = 0; render(false); };
    knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
    knob.addEventListener('keydown', (e) => {
      const s = e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowRight' || e.key === 'ArrowDown' ? -1 : 0;
      if (!s) return; e.preventDefault(); i = Math.max(0, Math.min(STOPS.length - 1, i + s)); raw = STOPS[i]; render(false);
    });
    return () => { if (raf) cancelAnimationFrame(raf); };
  },
};
