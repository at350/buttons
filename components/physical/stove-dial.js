const MARKS = Array.from({ length: 9 }, (_, i) => {
  const a = (-135 + i * 33.75) * Math.PI / 180;
  const x1 = 64 + 50 * Math.sin(a), y1 = 64 - 50 * Math.cos(a), x2 = 64 + (i ? 56 : 59) * Math.sin(a), y2 = 64 - (i ? 56 : 59) * Math.cos(a);
  return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
}).join('');

export default {
  id: 'ph-stove-dial',
  credit: 'Gas range burner knob on brushed stainless — click-detents, pilot lamp lights when on',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 16px; border-radius: 12px; background: repeating-linear-gradient(90deg, rgba(255,255,255,.05) 0 1px, transparent 1px 2px), linear-gradient(#c9cbcd, #a4a7aa); box-shadow: inset 0 1px 0 rgba(255,255,255,.6); }
    .wrap { position: relative; width: 128px; height: 128px; }
    svg { position: absolute; inset: 0; width: 128px; height: 128px; }
    svg line { stroke: #2a2b2d; stroke-width: 2.5; stroke-linecap: round; }
    .lamp { position: absolute; left: 50%; top: 2px; width: 9px; height: 9px; margin-left: -4.5px; border-radius: 50%; background: #4a1a10; box-shadow: inset 0 1px 1px rgba(0,0,0,.6); transition: background .12s, box-shadow .12s; }
    .lamp.on { background: #ff3b1f; box-shadow: 0 0 8px 2px rgba(255,70,30,.8), inset 0 1px 1px rgba(255,255,255,.4); }
    .knob {
      position: absolute; left: 50%; top: 50%; width: 76px; height: 76px; margin: -38px; border-radius: 50%; cursor: grab; touch-action: none;
      background: radial-gradient(circle at 50% 50%, #1d1d1f 0 60%, #e9eaeb 63%, #8c8f93 68%, #d5d7d9 72%, #5d6064 76%, #1a1a1c 78%);
      box-shadow: 0 6px 8px rgba(0,0,0,.5), 0 1px 0 rgba(255,255,255,.4) inset; transform: rotate(-135deg); transition: transform .08s cubic-bezier(.4,0,.2,1.4);
    }
    .knob.drag { transition: none; cursor: grabbing; }
    .knob::before { content: ''; position: absolute; left: 50%; top: 50%; width: 22px; height: 60px; margin: -30px 0 0 -11px; border-radius: 11px; background: linear-gradient(90deg, #0f0f10, #3a3a3d 40%, #1c1c1e); box-shadow: 0 2px 3px rgba(0,0,0,.6); }
    .knob::after { content: ''; position: absolute; left: 50%; top: 4px; width: 3px; height: 10px; margin-left: -1.5px; border-radius: 1px; background: #f5f5f5; }
    .knob:focus-visible { outline: 2px solid #1a73e8; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="wrap">
        <svg viewBox="0 0 128 128" aria-hidden="true">${MARKS}</svg>
        <span class="lamp"></span>
        <div class="knob" role="slider" tabindex="0" aria-label="burner" aria-valuemin="0" aria-valuemax="8" aria-valuenow="0"></div>
      </div>
    </div>`,
  init(root) {
    const knob = root.querySelector('.knob'), lamp = root.querySelector('.lamp');
    const MIN = -135, MAX = 135, STEP = 33.75;
    let ang = MIN, raw = MIN, last = 0, dragging = false, raf = 0;
    const angleAt = (e) => { const r = knob.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    const render = () => {
      ang = MIN + Math.round((raw - MIN) / STEP) * STEP;
      knob.style.transform = `rotate(${ang}deg)`;
      const v = Math.round((ang - MIN) / STEP);
      knob.setAttribute('aria-valuenow', v); lamp.classList.toggle('on', v > 0);
    };
    knob.addEventListener('pointerdown', (e) => { dragging = true; last = angleAt(e); knob.setPointerCapture(e.pointerId); knob.classList.add('drag'); });
    knob.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      raw = Math.max(MIN, Math.min(MAX, raw + d));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    const end = () => {
      if (!dragging) return;
      dragging = false; knob.classList.remove('drag');
      // render the latest raw angle synchronously (the pending frame would otherwise be lost), then snap to the detent
      if (raf) cancelAnimationFrame(raf); raf = 0;
      render(); raw = ang;
    };
    knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
    knob.addEventListener('keydown', (e) => {
      const s = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? STEP : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -STEP : 0;
      if (!s) return; e.preventDefault(); raw = Math.max(MIN, Math.min(MAX, ang + s)); render();
    });
  },
};
