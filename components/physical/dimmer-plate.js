export default {
  id: 'ph-dimmer-plate',
  credit: 'Rotary wall dimmer on a white plate — drag the knob, the wall glows warmer',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 24px 30px; border-radius: 12px; background: #e2dfd6; position: relative; overflow: hidden; }
    .glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(255,200,120,.95), rgba(255,180,90,.25) 50%, transparent 72%); opacity: 0; pointer-events: none; }
    .plate {
      position: relative; width: 70px; height: 114px; border-radius: 4px;
      background: linear-gradient(150deg, #ffffff, #eeefeb);
      box-shadow: 0 1px 2px rgba(0,0,0,.2), 0 8px 18px rgba(0,0,0,.14);
    }
    .screw { position: absolute; left: 50%; width: 8px; height: 8px; margin-left: -4px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff, #d4d4d0 60%, #a4a49e); box-shadow: inset 0 1px 1px rgba(0,0,0,.3); }
    .screw::after { content: ''; position: absolute; left: 1px; right: 1px; top: 50%; height: 1px; background: #777; transform: rotate(10deg); }
    .screw.t { top: 8px; } .screw.b { bottom: 8px; }
    .knob {
      position: absolute; left: 50%; top: 50%; width: 42px; height: 42px; margin: -21px; border-radius: 50%; cursor: grab; touch-action: none;
      background: radial-gradient(circle at 40% 35%, #ffffff, #eceeea 55%, #c9ccc6);
      box-shadow: 0 4px 6px rgba(0,0,0,.3), 0 1px 0 rgba(0,0,0,.15), inset 0 1px 0 #fff;
      transform: rotate(-140deg);
    }
    .knob::after { content: ''; position: absolute; left: 50%; top: 4px; width: 3px; height: 12px; margin-left: -1.5px; border-radius: 2px; background: #4a4a46; }
    .knob:active, .knob.drag { cursor: grabbing; }
    .knob:focus-visible { outline: 2px solid #3b82f6; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="glow"></div>
      <div class="plate">
        <span class="screw t"></span>
        <div class="knob" role="slider" tabindex="0" aria-label="dimmer" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div>
        <span class="screw b"></span>
      </div>
    </div>`,
  init(root) {
    const knob = root.querySelector('.knob');
    const glow = root.querySelector('.glow');
    const MIN = -140, MAX = 140;
    let ang = MIN, last = 0, dragging = false, raf = 0;
    const angleAt = (e) => { const r = knob.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    const render = () => {
      knob.style.transform = `rotate(${ang}deg)`;
      const v = (ang - MIN) / (MAX - MIN);
      glow.style.opacity = v.toFixed(3);
      knob.setAttribute('aria-valuenow', Math.round(v * 100));
    };
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
      const step = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 14 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -14 : 0;
      if (!step) return; e.preventDefault(); ang = Math.max(MIN, Math.min(MAX, ang + step)); render();
    });
  },
};
