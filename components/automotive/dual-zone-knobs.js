const N = 17;
const SEGS = Array.from({ length: N }, (_, i) => {
  const a = (-135 + i * 270 / (N - 1)) * Math.PI / 180, s = Math.sin(a), c = Math.cos(a);
  return `<line x1="${(50 + 40 * s).toFixed(1)}" y1="${(50 - 40 * c).toFixed(1)}" x2="${(50 + 46 * s).toFixed(1)}" y2="${(50 - 46 * c).toFixed(1)}"/>`;
}).join('');
const KNOB = (side) => `
  <div class="z ${side}">
    <svg class="leds" viewBox="0 0 100 100" aria-hidden="true">${SEGS}</svg>
    <div class="knob" tabindex="0" role="slider" aria-label="${side === 'l' ? 'Driver' : 'Passenger'} temperature" aria-valuemin="16" aria-valuemax="28" aria-valuenow="21"><span class="grip"></span><span class="lcd">21.0</span></div>
  </div>`;

export default {
  id: 'au-dual-zone-knobs',
  credit: 'Dual-zone climate knobs — knurled rotaries with an LED ring that fills from blue to red, a temperature readout in the cap, and SYNC / A/C keys between them (Volvo / Audi style)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: center; justify-content: space-between; width: 320px; max-width: 100%; padding: 14px; border-radius: 12px; background: linear-gradient(#2a2b2e, #141517); user-select: none; }
    .z { position: relative; width: 112px; height: 112px; flex: none; }
    .leds { position: absolute; inset: 0; width: 100%; height: 100%; }
    .leds line { stroke: #26282c; stroke-width: 3.2; stroke-linecap: round; transition: stroke .15s; }
    .knob { position: absolute; left: 50%; top: 50%; width: 74px; height: 74px; margin: -37px; border-radius: 50%; cursor: grab; touch-action: none; background: radial-gradient(circle, #1b1c1f 58%, transparent 59%), repeating-conic-gradient(#9da2a9 0 3deg, #5d6168 3deg 6deg); box-shadow: 0 6px 10px rgba(0,0,0,.7), 0 0 0 2px #0c0c0d; display: grid; place-items: center; }
    .knob:focus-visible, .k:focus-visible { outline: 2px solid #4da3ff; outline-offset: 4px; }
    .grip { position: absolute; inset: 0; border-radius: 50%; }
    .grip::after { content: ''; position: absolute; left: 50%; top: 3px; width: 3px; height: 7px; margin-left: -1.5px; border-radius: 2px; background: #fff; }
    .lcd { position: relative; font: 300 18px/1 Inter, system-ui, sans-serif; letter-spacing: -.02em; color: #e9f2ff; font-variant-numeric: tabular-nums; text-shadow: 0 0 6px rgba(160,200,255,.5); }
    .mid { display: grid; gap: 8px; }
    .k { width: 54px; height: 30px; border: 0; border-radius: 6px; background: linear-gradient(#3a3b3f, #1d1e21); box-shadow: 0 2px 0 #050505, inset 0 1px 0 rgba(255,255,255,.12); color: #d6d9de; font: 700 10px/1 Inter, system-ui, sans-serif; letter-spacing: .08em; cursor: pointer; position: relative; }
    .k::after { content: ''; position: absolute; left: 50%; bottom: 4px; width: 12px; height: 2px; margin-left: -6px; border-radius: 1px; background: #333; transition: background .2s, box-shadow .2s; }
    .k[aria-pressed="true"]::after { background: #ffb000; box-shadow: 0 0 5px #ffb000; }
    .k:active { transform: translateY(2px); box-shadow: 0 0 0 #050505; }
  `,
  html: `
    <div class="stage">
      ${KNOB('l')}
      <div class="mid"><button class="k sync" type="button" aria-pressed="false">SYNC</button><button class="k ac" type="button" aria-pressed="true">A/C</button></div>
      ${KNOB('r')}
    </div>`,
  init(root) {
    const zs = [...root.querySelectorAll('.z')], sync = root.querySelector('.sync'), ac = root.querySelector('.ac');
    const t = [21, 21];
    const col = (f) => `hsl(${Math.round(215 - f * 215)} 100% ${55 + f * 5}%)`;
    const paint = (i) => {
      const z = zs[i], f = (t[i] - 16) / 12, lit = Math.round(f * (N - 1));
      z.querySelectorAll('.leds line').forEach((l, j) => { l.style.stroke = j <= lit ? col(j / (N - 1)) : ''; l.style.filter = j <= lit ? `drop-shadow(0 0 2px ${col(j / (N - 1))})` : ''; });
      z.querySelector('.grip').style.transform = `rotate(${-135 + f * 270}deg)`;
      z.querySelector('.lcd').textContent = t[i] <= 16 ? 'LO' : t[i] >= 28 ? 'HI' : t[i].toFixed(1);
      z.querySelector('.knob').setAttribute('aria-valuenow', t[i]);
    };
    const set = (i, v) => {
      t[i] = Math.max(16, Math.min(28, Math.round(v * 2) / 2)); paint(i);
      if (sync.getAttribute('aria-pressed') === 'true') { if (i === 0) { t[1] = t[0]; paint(1); } else sync.setAttribute('aria-pressed', 'false'); }
    };
    zs.forEach((z, i) => {
      const k = z.querySelector('.knob');
      let last = 0, acc = 0, on = false;
      const ang = (e) => { const r = k.getBoundingClientRect(); return Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2) * 180 / Math.PI; };
      k.addEventListener('pointerdown', (e) => { on = true; last = ang(e); acc = 0; k.setPointerCapture(e.pointerId); });
      k.addEventListener('pointermove', (e) => { if (!on) return; const a = ang(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a; acc += d; while (Math.abs(acc) >= 11) { set(i, t[i] + Math.sign(acc) * .5); acc -= Math.sign(acc) * 11; } });
      k.addEventListener('pointerup', () => { on = false; });
      k.addEventListener('keydown', (e) => { const d = e.key === 'ArrowUp' || e.key === 'ArrowRight' ? .5 : e.key === 'ArrowDown' || e.key === 'ArrowLeft' ? -.5 : 0; if (d) { e.preventDefault(); set(i, t[i] + d); } });
      paint(i);
    });
    sync.addEventListener('click', () => { const on = sync.getAttribute('aria-pressed') !== 'true'; sync.setAttribute('aria-pressed', String(on)); if (on) { t[1] = t[0]; paint(1); } });
    ac.addEventListener('click', () => ac.setAttribute('aria-pressed', String(ac.getAttribute('aria-pressed') !== 'true')));
  },
};
