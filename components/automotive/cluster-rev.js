const R = 70, C = 90, A0 = -125, SWEEP = 250;
const pt = (deg, r) => { const a = (deg - 90) * Math.PI / 180; return [(C + r * Math.cos(a)).toFixed(1), (C + r * Math.sin(a)).toFixed(1)]; };
const arc = (r, from, to) => { const [x1, y1] = pt(from, r), [x2, y2] = pt(to, r); return `M${x1} ${y1}A${r} ${r} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`; };
const NUMS = Array.from({ length: 9 }, (_, i) => { const [x, y] = pt(A0 + i * SWEEP / 8, R - 18); const [a, b] = pt(A0 + i * SWEEP / 8, R + 7), [c, d] = pt(A0 + i * SWEEP / 8, R - 7); return `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}"/><text x="${x}" y="${(+y + 4).toFixed(1)}">${i}</text>`; }).join('');
const LEN = (Math.PI * R * SWEEP / 180).toFixed(1);

export default {
  id: 'au-cluster-rev',
  credit: 'Digital instrument cluster — press and hold to floor it: the tachometer arc sweeps, gears upshift at the redline and the speed climbs; let go and it coasts back to idle',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 220px; height: 200px; border-radius: 12px; background: radial-gradient(circle at 50% 45%, #10161f, #020304 72%); cursor: pointer; user-select: none; touch-action: none; -webkit-tap-highlight-color: transparent; }
    .stage:focus-visible { outline: 2px solid #4da3ff; outline-offset: -4px; }
    svg { position: absolute; left: 20px; top: 8px; width: 180px; height: 180px; }
    .trk { fill: none; stroke: #161d27; stroke-width: 10; stroke-linecap: round; }
    .red { fill: none; stroke: #5a1414; stroke-width: 10; }
    .val { fill: none; stroke-width: 10; stroke-linecap: round; stroke-dasharray: 0 ${LEN}; }
    line { stroke: #4a5566; stroke-width: 1.5; }
    text { fill: #8796ab; font: 500 11px/1 Inter, system-ui, sans-serif; text-anchor: middle; }
    .mid { position: absolute; left: 0; right: 0; top: 68px; text-align: center; color: #fff; }
    .spd { font: 200 46px/1 Inter, system-ui, sans-serif; letter-spacing: -.04em; font-variant-numeric: tabular-nums; }
    .u { margin-top: 2px; color: #6c7a8d; font: 500 10px/1 Inter, system-ui, sans-serif; letter-spacing: .12em; }
    .gear { position: absolute; left: 50%; bottom: 18px; width: 40px; margin-left: -20px; padding: 4px 0; border-radius: 6px; background: #0e141c; text-align: center; color: #cfe0ff; font: 600 13px/1 Inter, system-ui, sans-serif; }
    .rpm { position: absolute; left: 50%; bottom: 48px; transform: translateX(-50%); color: #6c7a8d; font: 500 9px/1 Inter, system-ui, sans-serif; letter-spacing: .1em; font-variant-numeric: tabular-nums; }
    .shift .gear { background: #ff3b30; color: #fff; }
  `,
  html: `
    <div class="stage" tabindex="0" role="button" aria-pressed="false" aria-label="Throttle (hold)">
      <svg viewBox="0 0 180 180" aria-hidden="true">
        <defs><linearGradient id="au-rev-g" x1="0" x2="1"><stop offset="0" stop-color="#2f7cff"/><stop offset=".7" stop-color="#54d1ff"/><stop offset="1" stop-color="#ff3b30"/></linearGradient></defs>
        <path class="trk" d="${arc(R, A0, A0 + SWEEP)}"/>
        <path class="red" d="${arc(R, A0 + SWEEP * 6.5 / 8, A0 + SWEEP)}"/>
        <path class="val" stroke="url(#au-rev-g)" d="${arc(R, A0, A0 + SWEEP)}"/>
        ${NUMS}
      </svg>
      <div class="mid"><div class="spd">0</div><div class="u">MPH</div></div>
      <div class="rpm">800 RPM</div>
      <div class="gear">D1</div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), val = root.querySelector('.val'), spdEl = root.querySelector('.spd'), gearEl = root.querySelector('.gear'), rpmEl = root.querySelector('.rpm');
    const RATIO = [0, 3.6, 2.2, 1.5, 1.15, .92, .76];
    let rpm = 800, mph = 0, gear = 1, gas = false, raf = 0, last = 0, flash = 0;
    const paint = () => {
      val.style.strokeDasharray = `${(rpm / 8000 * LEN).toFixed(1)} ${LEN}`;
      spdEl.textContent = Math.round(mph); gearEl.textContent = 'D' + gear; rpmEl.textContent = Math.round(rpm / 10) * 10 + ' RPM';
    };
    const loop = (t) => {
      const dt = Math.min(.05, (t - (last || t)) / 1000); last = t;
      if (gas) {
        rpm += (5200 / RATIO[gear] * .55 + 900) * dt;
        if (rpm > 6800 && gear < 6) { gear++; rpm *= RATIO[gear] / RATIO[gear - 1]; stage.classList.add('shift'); flash = .15; }
        rpm = Math.min(rpm, 7400);
      } else {
        rpm = Math.max(800, rpm - 2600 * dt);
        if (gear > 1 && rpm < 1900) { gear--; rpm *= RATIO[gear] / RATIO[gear + 1]; }
      }
      const target = gas || mph > 0 ? rpm / RATIO[gear] / 58 : 0;
      mph += (target - mph) * Math.min(1, dt * (gas ? 2.2 : 1.2));
      if (!gas) mph = Math.max(0, mph - 6 * dt);
      if (!gas && mph < .5) { mph = 0; }
      if (flash > 0 && (flash -= dt) <= 0) stage.classList.remove('shift');
      paint();
      if (gas || mph > 0 || rpm > 800) raf = requestAnimationFrame(loop); else { raf = 0; last = 0; gear = 1; paint(); }
    };
    const press = (on) => { gas = on; stage.setAttribute('aria-pressed', String(on)); if (!raf) { last = 0; raf = requestAnimationFrame(loop); } };
    stage.addEventListener('pointerdown', (e) => { stage.setPointerCapture(e.pointerId); press(true); });
    stage.addEventListener('pointerup', () => press(false));
    stage.addEventListener('pointercancel', () => press(false));
    stage.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !gas) { e.preventDefault(); press(true); } });
    stage.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') press(false); });
    paint();
    return () => cancelAnimationFrame(raf);
  },
};
