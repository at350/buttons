// Harmony XB5 22 mm potentiometer head on a brushed, engraved aluminium scale plate (0–10 over 270°),
// driving the conveyor below: rollers and belt run at the selected speed and stop at 0.
// Drag the knob round (pointer capture) or use the arrow keys.
const CX = 64, CY = 60;
const SCALE = Array.from({ length: 11 }, (_, i) => {
  const a = (-135 + i * 27) * Math.PI / 180, p = (r) => [CX + r * Math.sin(a), CY - r * Math.cos(a)];
  const [x1, y1] = p(37), [x2, y2] = p(i % 5 ? 42 : 44), [x, y] = p(51);
  return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/><text x="${x.toFixed(1)}" y="${(y + 3).toFixed(1)}">${i}</text>`;
}).join('') + Array.from({ length: 51 }, (_, i) => {
  const a = (-135 + i * 5.4) * Math.PI / 180;
  return i % 5 ? `<line class="mn" x1="${(CX + 37 * Math.sin(a)).toFixed(1)}" y1="${(CY - 37 * Math.cos(a)).toFixed(1)}" x2="${(CX + 39.5 * Math.sin(a)).toFixed(1)}" y2="${(CY - 39.5 * Math.cos(a)).toFixed(1)}"/>` : '';
}).join('');
export default {
  id: 'nd-speed-pot',
  credit: 'Schneider Harmony XB5 potentiometer head with an engraved 0–10 aluminium scale plate — conveyor speed, rollers turn at the set rate',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 10px; padding: 14px 16px 12px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 1px 1px, rgba(0,0,0,.05) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #d8dcd8, #c3c8c4);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.7); }
    .plate { position: relative; width: 128px; height: 132px; border-radius: 4px;
      background: repeating-linear-gradient(0deg, rgba(255,255,255,.18) 0 1px, rgba(0,0,0,.035) 1px 2px), linear-gradient(160deg, #e3e6e8, #b9bec2);
      box-shadow: 0 1px 2px rgba(0,0,0,.35), inset 0 0 0 1px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.8); }
    .plate::before, .plate::after { content: ''; position: absolute; top: 5px; width: 5px; height: 5px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff, #7f858a); }
    .plate::before { left: 5px; } .plate::after { right: 5px; }
    svg { position: absolute; inset: 0; width: 128px; height: 132px; }
    svg line { stroke: #1a1b1c; stroke-width: 1.4; }
    svg .mn { stroke-width: .7; }
    svg text { font: 600 8px "DM Sans", Inter, Arial, sans-serif; fill: #1a1b1c; text-anchor: middle; }
    svg .t { font: 700 7px "DM Sans", Inter, Arial, sans-serif; letter-spacing: 1.1px; }
    .knob { position: absolute; left: 38px; top: 34px; width: 52px; height: 52px; border-radius: 50%; cursor: grab; touch-action: none; outline: none;
      background: conic-gradient(from 30deg, #8d9296, #f4f6f7 12%, #a5aaae 26%, #e7eaec 42%, #7d8287 58%, #f0f2f3 72%, #9a9fa3 86%, #8d9296);
      box-shadow: 0 3px 4px rgba(0,0,0,.4); }
    .knob:focus-visible { box-shadow: 0 3px 4px rgba(0,0,0,.4), 0 0 0 2px #fff, 0 0 0 4px #0b63ce; }
    .knob.drag { cursor: grabbing; }
    .rot { position: absolute; inset: 5px; border-radius: 50%; transform: rotate(-135deg);
      background: radial-gradient(circle at 45% 32%, rgba(255,255,255,.18), transparent 45%), repeating-conic-gradient(#121314 0 6deg, #2a2c2e 6deg 9deg, #121314 9deg 12deg);
      box-shadow: inset 0 0 0 1px #000; }
    .rot::after { content: ''; position: absolute; left: 50%; top: 2px; width: 3px; height: 15px; margin-left: -1.5px; border-radius: 1.5px; background: #f2f2ee; }
    .conv { position: relative; width: 196px; height: 30px; }
    .belt { position: absolute; left: 8px; right: 8px; top: 0; height: 30px; border-radius: 15px; background: #1f2123; box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 2px 3px rgba(0,0,0,.3); }
    .tread { position: absolute; left: 14px; right: 14px; top: 2px; height: 3px; border-radius: 2px;
      background: repeating-linear-gradient(90deg, #4a4d50 0 6px, #1f2123 6px 10px); animation: tr var(--d, 1s) linear infinite; animation-play-state: var(--ps, paused); }
    @keyframes tr { to { background-position: 10px 0; } }
    .rollers { position: absolute; left: 14px; right: 14px; top: 7px; display: flex; justify-content: space-between; }
    .rl { width: 18px; height: 18px; border-radius: 50%; background: radial-gradient(circle, #3a3d40 0 18%, transparent 20%), repeating-conic-gradient(#c9cdd0 0 30deg, #8b9094 30deg 90deg);
      box-shadow: inset 0 0 0 2px #6d7277; animation: sp var(--d, 1s) linear infinite; animation-play-state: var(--ps, paused); }
    @keyframes sp { to { transform: rotate(360deg); } }
  `,
  html: `
    <div class="stage">
      <div class="plate">
        <svg viewBox="0 0 128 132" aria-hidden="true">${SCALE}<text class="t" x="64" y="124">CONVEYOR SPEED</text></svg>
        <div class="knob" role="slider" tabindex="0" aria-label="Conveyor speed" aria-valuemin="0" aria-valuemax="10" aria-valuenow="0"><div class="rot"></div></div>
      </div>
      <div class="conv" aria-hidden="true"><div class="belt"></div><div class="tread"></div>
        <div class="rollers"><i class="rl"></i><i class="rl"></i><i class="rl"></i><i class="rl"></i><i class="rl"></i><i class="rl"></i><i class="rl"></i></div></div>
    </div>`,
  init(root) {
    const knob = root.querySelector('.knob'), rot = root.querySelector('.rot'), conv = root.querySelector('.conv');
    let ang = -135, last = 0, drag = false;
    const angleAt = (e) => { const r = knob.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    const render = () => {
      const v = (ang + 135) / 27;
      rot.style.transform = `rotate(${ang}deg)`;
      knob.setAttribute('aria-valuenow', v.toFixed(1));
      conv.style.setProperty('--ps', v > 0.15 ? 'running' : 'paused');
      conv.style.setProperty('--d', (1.6 / Math.max(v, 0.15)).toFixed(2) + 's');
    };
    knob.addEventListener('pointerdown', (e) => { drag = true; last = angleAt(e); knob.setPointerCapture(e.pointerId); knob.classList.add('drag'); });
    knob.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      ang = Math.max(-135, Math.min(135, ang + d)); render();
    });
    const end = () => { drag = false; knob.classList.remove('drag'); };
    knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
    knob.addEventListener('keydown', (e) => {
      const s = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 13.5 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -13.5 : e.key === 'End' ? 300 : e.key === 'Home' ? -300 : 0;
      if (!s) return; e.preventDefault(); ang = Math.max(-135, Math.min(135, ang + s)); render();
    });
  },
};
