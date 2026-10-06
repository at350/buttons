const PENS = ['#e3262d', '#1a5fb4', '#1f9d55', '#8e44c8'];

export default {
  id: 'ty2-spirograph',
  credit: 'Denys Fisher Spirograph (1965) — drag the toothed wheel round inside the ring and the pen draws a hypotrochoid; pick a pen, double-click for fresh paper',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-flex; gap: 10px; align-items: center; padding: 12px; border-radius: 12px; overflow: hidden; background: linear-gradient(#d9eefc, #b7d9f2); }
    .paper { position: relative; width: 176px; height: 176px; border-radius: 6px; background: #fffef8; box-shadow: 0 3px 8px rgba(0,40,80,.25); touch-action: none; cursor: grab; outline: none; }
    .paper.drag { cursor: grabbing; }
    .paper:focus-visible { box-shadow: 0 0 0 3px #1a5fb4, 0 3px 8px rgba(0,40,80,.25); }
    canvas { position: absolute; left: 8px; top: 8px; width: 160px; height: 160px; }
    svg { position: absolute; left: 8px; top: 8px; width: 160px; height: 160px; pointer-events: none; }
    .ring { fill: none; stroke: rgba(255,90,170,.45); stroke-width: 9; }
    .teeth { fill: none; stroke: rgba(200,40,120,.55); stroke-width: 3; stroke-dasharray: 2 2.4; }
    .wheel { fill: rgba(120,220,140,.45); stroke: rgba(30,140,70,.7); stroke-width: 1.5; stroke-dasharray: 2 2; }
    .pens { display: grid; gap: 8px; }
    .pen { width: 14px; height: 40px; border: 0; padding: 0; cursor: pointer; border-radius: 3px 3px 7px 7px;
      background: linear-gradient(90deg, rgba(0,0,0,.2), transparent 40%, rgba(255,255,255,.35) 55%, rgba(0,0,0,.15)), var(--p);
      clip-path: polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%); transition: transform .18s cubic-bezier(.3,1.6,.5,1); }
    .pen:hover { transform: translateY(-2px); }
    .pen[aria-checked="true"] { transform: translateX(-4px) rotate(-12deg); }
    .pen:focus-visible { outline: 2px solid #1a5fb4; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="paper" tabindex="0" role="application" aria-label="Spirograph paper">
        <canvas width="160" height="160"></canvas>
        <svg viewBox="0 0 160 160" aria-hidden="true">
          <circle class="ring" cx="80" cy="80" r="74.5"/><circle class="teeth" cx="80" cy="80" r="70.5"/>
          <g class="wg"><circle class="wheel" r="26"/><circle class="hole" r="2.6" fill="#fff" stroke="#1e8c46"/><circle r="3" cx="0" cy="0" fill="rgba(30,140,70,.6)"/></g>
        </svg>
      </div>
      <div class="pens" role="radiogroup" aria-label="pens">${PENS.map((p, i) => `<button class="pen" type="button" role="radio" aria-checked="${i === 0}" aria-label="pen ${i + 1}" style="--p:${p}"></button>`).join('')}</div>
    </div>`,
  init(root) {
    const paper = root.querySelector('.paper'), cv = root.querySelector('canvas'), wg = root.querySelector('.wg'), hole = root.querySelector('.hole');
    const dpr = Math.min(2, window.devicePixelRatio || 1); cv.width = 160 * dpr; cv.height = 160 * dpr;
    const g = cv.getContext('2d'); g.scale(dpr, dpr); g.lineWidth = 1.1; g.lineCap = 'round';
    const R = 70, r = 26, D = 17;
    let th = 0, prevA = 0, drag = false, colour = PENS[0];
    const pen = (t) => { const cx = 80 + (R - r) * Math.cos(t), cy = 80 + (R - r) * Math.sin(t), ph = -t * (R - r) / r; return [cx, cy, cx + D * Math.cos(ph), cy + D * Math.sin(ph), ph]; };
    const show = () => { const [cx, cy, px, py] = pen(th); wg.setAttribute('transform', `translate(${cx} ${cy})`); hole.setAttribute('cx', px - cx); hole.setAttribute('cy', py - cy); };
    const advance = (d) => {
      const steps = Math.max(1, Math.ceil(Math.abs(d) / 0.03));
      g.strokeStyle = colour; g.beginPath(); let [, , x, y] = pen(th); g.moveTo(x, y);
      for (let i = 0; i < steps; i++) { th += d / steps; [, , x, y] = pen(th); g.lineTo(x, y); }
      g.stroke(); show();
    };
    const ang = (e) => { const b = cv.getBoundingClientRect(); return Math.atan2(e.clientY - b.top - 80, e.clientX - b.left - 80); };
    paper.addEventListener('pointerdown', (e) => { drag = true; prevA = ang(e); paper.setPointerCapture(e.pointerId); paper.classList.add('drag'); });
    paper.addEventListener('pointermove', (e) => { if (!drag) return; const a = ang(e); let d = a - prevA; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; prevA = a; advance(d); });
    const up = () => { drag = false; paper.classList.remove('drag'); };
    paper.addEventListener('pointerup', up); paper.addEventListener('pointercancel', up); paper.addEventListener('lostpointercapture', up);
    paper.addEventListener('keydown', (e) => { const d = { ArrowRight: 0.25, ArrowDown: 0.25, ArrowLeft: -0.25, ArrowUp: -0.25 }[e.key]; if (d) { e.preventDefault(); advance(d); } });
    paper.addEventListener('dblclick', () => g.clearRect(0, 0, 160, 160));
    root.querySelectorAll('.pen').forEach((b, i) => b.addEventListener('click', () => { colour = PENS[i]; root.querySelectorAll('.pen').forEach((q, j) => q.setAttribute('aria-checked', String(i === j))); }));
    advance(Math.PI * 2 * 3.2);
  },
};
