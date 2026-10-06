// Lutron/Leviton-style push-on/off rotary dimmer on a white thermoset wall plate.
// Turn the knurled knob to set the level; push it to switch the light. The wall glows warm.
export default {
  id: 'ph-dimmer-plate',
  credit: 'Push-on/off rotary wall dimmer on a white plate (Lutron Rotary style) — turn to dim, push to switch; the wall glows',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; display: inline-block; padding: 22px 34px; border-radius: 12px; overflow: hidden;
      background: repeating-linear-gradient(45deg, rgba(0,0,0,.012) 0 2px, transparent 2px 4px), #e4e0d6; }
    .glow { position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .25s;
      background: radial-gradient(ellipse 80% 70% at 50% 0%, rgba(255,196,110,.95), rgba(255,170,80,.35) 55%, transparent 80%); }
    .plate {
      position: relative; width: 70px; height: 114px; border-radius: 4px;
      background: linear-gradient(150deg, #ffffff, #f2f2ee 60%, #e6e6e1);
      box-shadow: 0 1px 1px rgba(0,0,0,.18), 0 6px 14px -2px rgba(0,0,0,.2), inset 0 1px 0 #fff, inset 0 -1px 1px rgba(0,0,0,.08), inset 0 0 0 1px rgba(0,0,0,.04);
    }
    .screw { position: absolute; left: 50%; width: 8px; height: 8px; margin-left: -4px; border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #ffffff, #e2e2de 55%, #b3b3ad); box-shadow: inset 0 1px 1px rgba(0,0,0,.25), 0 1px 0 #fff; }
    .screw::after { content: ''; position: absolute; left: 1.5px; right: 1.5px; top: 50%; height: 1px; margin-top: -.5px; background: #8d8d88; transform: rotate(12deg); }
    .screw.t { top: 8px; } .screw.b { bottom: 8px; }
    .hole { position: absolute; left: 50%; top: 50%; width: 46px; height: 46px; margin: -23px; border-radius: 50%; background: radial-gradient(circle, #cfcfc9 60%, #f6f6f2 100%); box-shadow: inset 0 1px 2px rgba(0,0,0,.25); }
    .knob {
      position: absolute; left: 50%; top: 50%; width: 40px; height: 40px; margin: -20px; border-radius: 50%; cursor: grab; touch-action: none; outline: none;
      box-shadow: 0 1px 1px rgba(0,0,0,.25), 0 4px 6px rgba(0,0,0,.25), 0 9px 10px -4px rgba(0,0,0,.2);
      transition: transform .1s cubic-bezier(.3,1.7,.5,1), box-shadow .1s;
    }
    .knob.press { transform: scale(.965); box-shadow: 0 1px 1px rgba(0,0,0,.3), 0 2px 2px rgba(0,0,0,.2); transition-duration: .05s; }
    .knob.drag { cursor: grabbing; }
    .knob:focus-visible { box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2563eb; }
    .rot { position: absolute; inset: 0; border-radius: 50%; transform: rotate(-140deg);
      background: repeating-conic-gradient(#f4f4f0 0 3deg, #d9d9d3 3deg 6deg); }
    .rot::before { content: ''; position: absolute; inset: 4px; border-radius: 50%; background: #f1f1ec; }
    .rot::after { content: ''; position: absolute; left: 50%; top: 4px; width: 3px; height: 11px; margin-left: -1.5px; border-radius: 1.5px; background: #fff; box-shadow: 0 1px 1px rgba(0,0,0,.35), inset 0 -1px 0 rgba(0,0,0,.08); }
    .light { position: absolute; inset: 0; border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle at 40% 30%, rgba(255,255,255,.9), rgba(255,255,255,0) 45%), radial-gradient(circle, transparent 66%, rgba(0,0,0,.14) 100%); }
  `,
  html: `
    <div class="stage">
      <div class="glow"></div>
      <div class="plate">
        <span class="screw t"></span>
        <span class="hole"></span>
        <div class="knob" role="slider" tabindex="0" aria-label="Dimmer (Enter to switch)" aria-valuemin="0" aria-valuemax="100" aria-valuenow="60" aria-valuetext="off">
          <div class="rot"></div><div class="light"></div>
        </div>
        <span class="screw b"></span>
      </div>
    </div>`,
  init(root) {
    const knob = root.querySelector('.knob'), rot = root.querySelector('.rot'), glow = root.querySelector('.glow');
    const MIN = -140, MAX = 140;
    let ang = 28, on = false, last = 0, moved = 0, dragging = false, raf = 0;
    const angleAt = (e) => { const r = knob.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    const render = () => {
      rot.style.transform = `rotate(${ang}deg)`;
      const v = (ang - MIN) / (MAX - MIN);
      glow.style.opacity = on ? (0.15 + v * 0.85).toFixed(3) : '0';
      knob.setAttribute('aria-valuenow', Math.round(v * 100));
      knob.setAttribute('aria-valuetext', on ? `${Math.round(v * 100)}%` : 'off');
    };
    knob.addEventListener('pointerdown', (e) => { dragging = true; moved = 0; last = angleAt(e); knob.setPointerCapture(e.pointerId); knob.classList.add('drag', 'press'); });
    knob.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      moved += Math.abs(d); if (moved > 4) knob.classList.remove('press');
      ang = Math.max(MIN, Math.min(MAX, ang + d));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    const end = (e) => {
      if (!dragging) return; dragging = false; knob.classList.remove('drag', 'press');
      if (e.type === 'pointerup' && moved <= 4) on = !on; // a push without turning toggles the light
      render();
    };
    knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
    knob.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); on = !on; render(); return; }
      const step = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 14 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -14 : 0;
      if (!step) return; e.preventDefault(); ang = Math.max(MIN, Math.min(MAX, ang + step)); render();
    });
    render();
    return () => { if (raf) cancelAnimationFrame(raf); };
  },
};
