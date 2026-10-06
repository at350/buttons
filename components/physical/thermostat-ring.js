export default {
  id: 'ph-thermostat-ring',
  credit: 'Nest Learning Thermostat — drag around the steel ring; the glass warms or cools with the setpoint',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 16px; border-radius: 12px; background: linear-gradient(#f0eee8, #dcd9d0); }
    .ring {
      position: relative; width: 156px; height: 156px; border-radius: 50%; cursor: grab; touch-action: none;
      background: conic-gradient(from 90deg, #cfd2d6, #8e9196 12%, #e4e6e9 25%, #9a9da2 40%, #d9dbde 55%, #86898e 70%, #e0e2e5 85%, #cfd2d6);
      box-shadow: 0 8px 16px rgba(0,0,0,.35), 0 2px 3px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.7);
    }
    .ring.drag { cursor: grabbing; }
    .ring:focus-visible { outline: 2px solid #1a73e8; outline-offset: 4px; }
    .glass {
      position: absolute; inset: 12px; border-radius: 50%; background: radial-gradient(circle at 50% 38%, #2a2a2e, #0b0b0d 75%);
      box-shadow: inset 0 3px 8px rgba(0,0,0,.9), inset 0 -1px 0 rgba(255,255,255,.08); transition: background .35s;
      display: flex; align-items: center; justify-content: center; pointer-events: none;
    }
    .glass.heat { background: radial-gradient(circle at 50% 38%, #ff8b3d, #d94a0a 75%); }
    .glass.cool { background: radial-gradient(circle at 50% 38%, #3a8fe8, #1456b0 75%); }
    .glass svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .ticks { fill: none; stroke: rgba(255,255,255,.28); stroke-width: 7; stroke-dasharray: 1 3.4; }
    .mark { stroke: #fff; stroke-width: 2.5; stroke-linecap: round; transform-box: view-box; transform-origin: 50% 50%; }
    .num { position: relative; color: #fff; font: 300 46px/1 system-ui, -apple-system, "Helvetica Neue", sans-serif; letter-spacing: -1px; text-shadow: 0 1px 2px rgba(0,0,0,.4); }
    .num::after { content: '°'; font-size: 22px; vertical-align: top; margin-left: 1px; }
  `,
  html: `
    <div class="stage">
      <div class="ring" role="slider" tabindex="0" aria-label="thermostat" aria-valuemin="50" aria-valuemax="90" aria-valuenow="70">
        <div class="glass">
          <svg viewBox="0 0 132 132" aria-hidden="true">
            <circle class="ticks" cx="66" cy="66" r="56"/>
            <line class="mark" x1="66" y1="6" x2="66" y2="18"/>
          </svg>
          <span class="num">70</span>
        </div>
      </div>
    </div>`,
  init(root) {
    const ring = root.querySelector('.ring'), glass = root.querySelector('.glass'), mark = root.querySelector('.mark'), num = root.querySelector('.num');
    const MIN = 50, MAX = 90;
    let temp = 70, last = 0, dragging = false, raf = 0, acc = 0;
    const angleAt = (e) => { const r = ring.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    const render = () => {
      const t = Math.round(temp);
      num.textContent = t; ring.setAttribute('aria-valuenow', t);
      mark.style.transform = `rotate(${-135 + (temp - MIN) / (MAX - MIN) * 270}deg)`;
      glass.classList.toggle('heat', t >= 73); glass.classList.toggle('cool', t <= 67);
    };
    ring.addEventListener('pointerdown', (e) => { dragging = true; last = angleAt(e); acc = 0; ring.setPointerCapture(e.pointerId); ring.classList.add('drag'); });
    ring.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      temp = Math.max(MIN, Math.min(MAX, temp + d / 6.75));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    const end = () => { dragging = false; ring.classList.remove('drag'); temp = Math.round(temp); render(); };
    ring.addEventListener('pointerup', end); ring.addEventListener('pointercancel', end);
    ring.addEventListener('keydown', (e) => {
      const s = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0;
      if (!s) return; e.preventDefault(); temp = Math.max(MIN, Math.min(MAX, temp + s)); render();
    });
    render();
  },
};
