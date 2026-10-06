// Nest Learning Thermostat (3rd gen): polished stainless ring around a black glass lens with the round
// display — a 300° arc of fine ticks, the setpoint as a big light numeral, the room temperature as a small
// figure on its tick, and the whole disc turning orange (heating) or blue (cooling). Turn the ring to set.
const N = 121, A0 = -150, SPAN = 300, MIN = 50, MAX = 90, ROOM = 70;
const C = 60;
const TICKS = Array.from({ length: N }, (_, i) => {
  const a = (A0 + i * SPAN / (N - 1)) * Math.PI / 180;
  const x1 = C + 44 * Math.sin(a), y1 = C - 44 * Math.cos(a), x2 = C + 51 * Math.sin(a), y2 = C - 51 * Math.cos(a);
  return `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}"/>`;
}).join('');
const idx = (t) => Math.round((t - MIN) / (MAX - MIN) * (N - 1));

export default {
  id: 'ph-thermostat-ring',
  credit: 'Nest Learning Thermostat — turn the stainless ring; the display arcs from room temp to setpoint and glows orange or blue',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 18px; border-radius: 12px; background: linear-gradient(160deg, #f1efe9, #dedad1); }
    .ring {
      position: relative; width: 160px; height: 160px; border-radius: 50%; cursor: grab; touch-action: none; outline: none;
      background:
        repeating-conic-gradient(rgba(255,255,255,.06) 0 1deg, rgba(0,0,0,.03) 1deg 2deg),
        conic-gradient(from 0deg, #f4f5f6, #9aa0a6 9%, #e6e8ea 17%, #6f757b 27%, #d3d6d9 38%, #fdfdfd 47%, #8b9197 58%, #dfe2e4 68%, #61666c 78%, #c9cdd1 88%, #f4f5f6);
      box-shadow: 0 2px 2px rgba(0,0,0,.25), 0 14px 20px -6px rgba(0,0,0,.4), inset 0 0 0 1px rgba(0,0,0,.25), inset 0 1px 1px rgba(255,255,255,.9);
    }
    .ring.drag { cursor: grabbing; }
    .ring:focus-visible { box-shadow: 0 0 0 3px #f1efe9, 0 0 0 5px #1d4ed8, 0 14px 20px -6px rgba(0,0,0,.4); }
    .lens { position: absolute; inset: 11px; border-radius: 50%; overflow: hidden; pointer-events: none;
      background: #050506; box-shadow: inset 0 0 0 1px rgba(255,255,255,.12), inset 0 3px 6px rgba(0,0,0,.9); }
    .disp { position: absolute; inset: 9px; border-radius: 50%; background: #000; transition: background .5s;
      display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .disp.heat { background: radial-gradient(circle at 50% 40%, #ff8a2b, #f05a00 70%, #c74300); }
    .disp.cool { background: radial-gradient(circle at 50% 40%, #2ea0ff, #0a73e0 70%, #0656b3); }
    .disp svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .disp line { stroke: rgba(255,255,255,.32); stroke-width: 1; }
    .disp line.span { stroke: rgba(255,255,255,.85); }
    .disp line.set { stroke: #fff; stroke-width: 2.2; }
    .disp line.room { stroke: #fff; stroke-width: 1.6; }
    .mode { position: relative; height: 9px; font: 600 6.5px/9px "DM Sans", Inter, Arial, sans-serif; letter-spacing: 1.4px; color: rgba(255,255,255,.85); visibility: hidden; }
    .disp.heat .mode, .disp.cool .mode { visibility: visible; }
    .num { position: relative; font: 300 40px/1 "DM Sans", Inter, "Helvetica Neue", sans-serif; font-variation-settings: "opsz" 40; letter-spacing: -1.5px; color: #fff; font-variant-numeric: tabular-nums; }
    .roomt { position: absolute; font: 600 7px/1 "DM Sans", Inter, Arial, sans-serif; color: #fff; transform: translate(-50%, -50%); }
    .glare { position: absolute; inset: 0; border-radius: 50%; background: linear-gradient(160deg, rgba(255,255,255,.16), rgba(255,255,255,0) 40%); }
  `,
  html: `
    <div class="stage">
      <div class="ring" role="slider" tabindex="0" aria-label="Thermostat setpoint" aria-valuemin="${MIN}" aria-valuemax="${MAX}" aria-valuenow="${ROOM}">
        <div class="lens">
          <div class="disp">
            <svg viewBox="0 0 120 120" aria-hidden="true">${TICKS}</svg>
            <span class="mode" aria-hidden="true">HEATING</span>
            <span class="num">${ROOM}</span>
            <span class="roomt" aria-hidden="true">${ROOM}</span>
          </div>
          <span class="glare"></span>
        </div>
      </div>
    </div>`,
  init(root) {
    const ring = root.querySelector('.ring'), disp = root.querySelector('.disp'), num = root.querySelector('.num'), mode = root.querySelector('.mode'), roomt = root.querySelector('.roomt');
    const lines = [...root.querySelectorAll('.disp line')];
    let temp = ROOM, last = 0, dragging = false, raf = 0;
    const ri = idx(ROOM);
    lines[ri].classList.add('room');
    // put the small room-temperature figure just outside the arc, beside its tick
    const ra = (A0 + ri * SPAN / (N - 1) - 9) * Math.PI / 180;
    roomt.style.left = `${(50 + 33 * Math.sin(ra)).toFixed(1)}%`; roomt.style.top = `${(50 - 33 * Math.cos(ra)).toFixed(1)}%`;
    const angleAt = (e) => { const r = ring.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    const render = () => {
      const t = Math.round(temp), si = idx(t), lo = Math.min(si, ri), hi = Math.max(si, ri);
      lines.forEach((l, i) => { l.classList.toggle('span', i >= lo && i <= hi); l.classList.toggle('set', i === si); });
      num.textContent = t; ring.setAttribute('aria-valuenow', t);
      const m = t > ROOM ? 'heat' : t < ROOM ? 'cool' : '';
      disp.classList.toggle('heat', m === 'heat'); disp.classList.toggle('cool', m === 'cool');
      mode.textContent = m === 'cool' ? 'COOLING' : 'HEATING';
      ring.setAttribute('aria-valuetext', `${t}°${m ? `, ${m}ing` : ''}`);
      roomt.style.visibility = m ? 'visible' : 'hidden';
    };
    ring.addEventListener('pointerdown', (e) => { dragging = true; last = angleAt(e); ring.setPointerCapture(e.pointerId); ring.classList.add('drag'); });
    ring.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      temp = Math.max(MIN, Math.min(MAX, temp + d / 7.5));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    const end = () => { if (!dragging) return; dragging = false; ring.classList.remove('drag'); temp = Math.round(temp); render(); };
    ring.addEventListener('pointerup', end); ring.addEventListener('pointercancel', end);
    ring.addEventListener('keydown', (e) => {
      const s = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0;
      if (!s) return; e.preventDefault(); temp = Math.max(MIN, Math.min(MAX, Math.round(temp) + s)); render();
    });
    render();
    return () => { if (raf) cancelAnimationFrame(raf); };
  },
};
