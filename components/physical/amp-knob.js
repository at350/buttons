const TICKS = Array.from({ length: 12 }, (_, i) => {
  const a = (-150 + i * (300 / 11)) * Math.PI / 180;
  const x = 70 + 56 * Math.sin(a), y = 70 - 56 * Math.cos(a);
  const tx = 70 + 46 * Math.sin(a), ty = 70 - 46 * Math.cos(a);
  return `<text x="${x.toFixed(1)}" y="${(y + 3.5).toFixed(1)}">${i}</text><circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="1.4"/>`;
}).join('');

export default {
  id: 'ph-amp-knob',
  credit: 'Guitar amp knob that goes to 11 (Marshall gold-panel style) — drag to turn',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px; border-radius: 12px; background: repeating-linear-gradient(45deg, #1b1b1b 0 2px, #262626 2px 4px), #202020; }
    .panel { position: relative; width: 140px; height: 140px; border-radius: 6px; background: linear-gradient(160deg, #e9c97a, #b8903a 50%, #d9b45c); box-shadow: inset 0 1px 0 rgba(255,255,255,.6), inset 0 -1px 0 rgba(0,0,0,.4), 0 2px 4px rgba(0,0,0,.6); }
    svg { position: absolute; inset: 0; width: 140px; height: 140px; }
    svg text { font: 700 10px system-ui, sans-serif; fill: #2b1d05; text-anchor: middle; }
    svg circle { fill: #2b1d05; }
    .knob {
      position: absolute; left: 50%; top: 50%; width: 66px; height: 66px; margin: -33px; border-radius: 50%; cursor: grab; touch-action: none;
      background: radial-gradient(circle at 50% 50%, #0f0f0f 0 46%, #d4b25a 48%, #f3dc8e 52%, #8a6a22 56%, #141414 58%, #2b2b2b 80%, #0a0a0a 100%);
      box-shadow: 0 6px 8px rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.15) inset; transform: rotate(-150deg);
    }
    .knob::before { content: ''; position: absolute; inset: 6px; border-radius: 50%; background: repeating-conic-gradient(#1a1a1a 0 6deg, #2e2e2e 6deg 12deg); opacity: .6; -webkit-mask: radial-gradient(circle, transparent 0 64%, #000 66%); mask: radial-gradient(circle, transparent 0 64%, #000 66%); }
    .knob::after { content: ''; position: absolute; left: 50%; top: 5px; width: 3px; height: 14px; margin-left: -1.5px; border-radius: 2px; background: #fff; box-shadow: 0 0 2px rgba(0,0,0,.8); }
    .knob:active, .knob.drag { cursor: grabbing; }
    .knob:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="panel">
        <svg viewBox="0 0 140 140" aria-hidden="true">${TICKS}</svg>
        <div class="knob" role="slider" tabindex="0" aria-label="volume" aria-valuemin="0" aria-valuemax="11" aria-valuenow="0"></div>
      </div>
    </div>`,
  init(root) {
    const knob = root.querySelector('.knob');
    const MIN = -150, MAX = 150;
    let ang = MIN, last = 0, dragging = false, raf = 0;
    const angleAt = (e) => { const r = knob.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    const render = () => { knob.style.transform = `rotate(${ang}deg)`; knob.setAttribute('aria-valuenow', ((ang - MIN) / (MAX - MIN) * 11).toFixed(1)); };
    knob.addEventListener('pointerdown', (e) => { dragging = true; last = angleAt(e); knob.setPointerCapture(e.pointerId); knob.classList.add('drag'); });
    knob.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      ang = Math.max(MIN, Math.min(MAX, ang + d));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    const end = () => { dragging = false; knob.classList.remove('drag'); };
    knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
    knob.addEventListener('keydown', (e) => {
      const step = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 300 / 11 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -300 / 11 : 0;
      if (!step) return; e.preventDefault(); ang = Math.max(MIN, Math.min(MAX, ang + step)); render();
    });
  },
};
