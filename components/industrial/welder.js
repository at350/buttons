// Miller Maxstar-style inverter welder front panel: Miller-blue fascia, red LED meter with A / V
// indicators, the big amperage control knob and process selection with LEDs (STICK / TIG). Drag the
// knob (or arrow keys) for 5–150 A; the meter shows the preset, or open-circuit volts when V is chosen.
const SEG = { 0: 'abcdef', 1: 'bc', 2: 'abdeg', 3: 'abcdg', 4: 'bcfg', 5: 'acdfg', 6: 'acdefg', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg', ' ': '' };
const hs = (y) => `1,${y} 2.2,${y - 1.2} 9.8,${y - 1.2} 11,${y} 9.8,${y + 1.2} 2.2,${y + 1.2}`;
const vs = (x, a, b) => `${x},${a + 1} ${x + 1.2},${a + 2.2} ${x + 1.2},${b - 2.2} ${x},${b - 1} ${x - 1.2},${b - 2.2} ${x - 1.2},${a + 2.2}`;
const POLY = [hs(1.2), vs(10.8, 0, 11), vs(10.8, 11, 22), hs(20.8), vs(1.2, 11, 22), vs(1.2, 0, 11), hs(11)];
const digits = (n) => Array.from({ length: n }, (_, i) => `<g class="dg" transform="translate(${i * 15 + 2} 0) skewX(-6)">${POLY.map((p) => `<polygon points="${p}"/>`).join('')}</g>`).join('');
const paint = (svg, s) => { const gs = svg.querySelectorAll('.dg'), cs = s.padStart(gs.length, ' ').split(''); gs.forEach((g, i) => { const on = SEG[cs[i]] || ''; [...g.children].forEach((p, k) => p.classList.toggle('on', on.includes('abcdefg'[k]))); }); };
const ARC = Array.from({ length: 21 }, (_, i) => { const a = (-135 + i * 13.5) * Math.PI / 180, r1 = 50, r2 = i % 5 ? 53 : 56; return `<line x1="${(60 + r1 * Math.sin(a)).toFixed(1)}" y1="${(60 - r1 * Math.cos(a)).toFixed(1)}" x2="${(60 + r2 * Math.sin(a)).toFixed(1)}" y2="${(60 - r2 * Math.cos(a)).toFixed(1)}"/>`; }).join('');
export default {
  id: 'nd-miller-welder',
  credit: 'Miller Maxstar-style inverter welder — blue fascia, red LED amperage meter with A/V, big amperage knob (5–150 A), STICK / TIG process LEDs',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px 14px 10px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.04) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #1765b8, #0a4a92); box-shadow: inset 0 1px 0 rgba(255,255,255,.25); }
    .top { display: flex; align-items: center; gap: 8px; }
    .win { padding: 6px 8px; border-radius: 3px; background: #0b0606; box-shadow: inset 0 2px 4px #000, 0 0 0 2px #06305e; }
    .win svg { width: 66px; height: 31px; filter: drop-shadow(0 0 3px rgba(255,50,30,.6)); }
    .dg > * { fill: #2a0806; } .dg > .on { fill: #ff2d1a; }
    .ind { display: flex; flex-direction: column; gap: 6px; }
    .ind span, .proc span { display: flex; align-items: center; gap: 5px; font: 800 9px/1 "DM Sans", Inter, Arial, sans-serif; color: #fff; letter-spacing: .5px; }
    .ind i, .proc i { width: 7px; height: 7px; border-radius: 50%; background: #3a0c08; box-shadow: inset 0 0 0 1px rgba(0,0,0,.4); }
    .on > i { background: #ff3a24; box-shadow: 0 0 5px #ff3a24; }
    .dial { position: relative; width: 120px; height: 112px; }
    .dial svg { position: absolute; inset: 0; width: 120px; height: 120px; }
    .dial line { stroke: #fff; stroke-width: 1.4; } .dial text { font: 800 7px "DM Sans", Inter, Arial, sans-serif; fill: #fff; letter-spacing: .5px; text-anchor: middle; }
    .knob { position: absolute; left: 24px; top: 24px; width: 72px; height: 72px; border-radius: 50%; cursor: grab; touch-action: none; outline: none;
      background: radial-gradient(circle at 45% 32%, #4a4e52, #17191b 62%, #050506); box-shadow: 0 5px 8px rgba(0,0,0,.55), inset 0 1px 1px rgba(255,255,255,.25); }
    .knob.drag { cursor: grabbing; }
    .knob:focus-visible { box-shadow: 0 5px 8px rgba(0,0,0,.55), 0 0 0 2px #fff, 0 0 0 4px #0a2c55; }
    .rot { position: absolute; inset: 0; border-radius: 50%; background: repeating-conic-gradient(rgba(255,255,255,.07) 0 4deg, transparent 4deg 15deg); }
    .rot::after { content: ''; position: absolute; left: 50%; top: 4px; width: 4px; height: 20px; margin-left: -2px; border-radius: 2px; background: #f2f2ee; }
    .row { display: flex; gap: 10px; align-items: center; }
    .pb { height: 26px; padding: 0 10px; border: 0; border-radius: 13px; cursor: pointer; font: 800 8px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .6px; color: #0a3a72;
      background: linear-gradient(#ffffff, #d8e0e8); box-shadow: 0 2px 0 #062c58, inset 0 1px 0 #fff; }
    .pb:active { transform: translateY(2px); box-shadow: 0 0 0 #062c58; }
    .pb:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .proc { display: flex; flex-direction: column; gap: 5px; }
  `,
  html: `
    <div class="stage">
      <div class="top"><div class="win"><svg viewBox="0 0 47 22" aria-label="Meter">${digits(3)}</svg></div><div class="ind"><span class="ia on"><i></i>A</span><span class="iv"><i></i>V</span></div></div>
      <div class="dial"><svg viewBox="0 0 120 120" aria-hidden="true">${ARC}<text x="24" y="112">MIN</text><text x="96" y="112">MAX</text></svg>
        <div class="knob" role="slider" tabindex="0" aria-label="Amperage" aria-valuemin="5" aria-valuemax="150" aria-valuenow="90"><div class="rot"></div></div></div>
      <div class="row"><button class="pb meter" type="button">A / V</button><div class="proc"><span class="ps on"><i></i>STICK</span><span class="pt"><i></i>TIG</span></div><button class="pb process" type="button">PROCESS</button></div>
    </div>`,
  init(root) {
    const $ = (s) => root.querySelector(s);
    const knob = $('.knob'), rot = $('.rot'), win = $('.win svg');
    let amps = 90, volts = false, tig = false, last = 0, drag = false, acc = 0;
    const angOf = (a) => -135 + (a - 5) / 145 * 270;
    const draw = () => {
      rot.style.transform = `rotate(${angOf(amps)}deg)`; knob.setAttribute('aria-valuenow', amps);
      paint(win, String(volts ? (tig ? 13 : 81) : amps));
      $('.ia').classList.toggle('on', !volts); $('.iv').classList.toggle('on', volts);
      $('.ps').classList.toggle('on', !tig); $('.pt').classList.toggle('on', tig);
    };
    const angleAt = (e) => { const r = knob.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    knob.addEventListener('pointerdown', (e) => { drag = true; last = angleAt(e); acc = angOf(amps); knob.setPointerCapture(e.pointerId); knob.classList.add('drag'); volts = false; draw(); });
    knob.addEventListener('pointermove', (e) => {
      if (!drag) return; const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      acc = Math.max(-135, Math.min(135, acc + d)); amps = Math.round(5 + (acc + 135) / 270 * 145); draw();
    });
    const end = () => { drag = false; knob.classList.remove('drag'); };
    knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
    knob.addEventListener('keydown', (e) => {
      const s = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0;
      if (s) { e.preventDefault(); volts = false; amps = Math.max(5, Math.min(150, amps + s * (e.shiftKey ? 10 : 1))); draw(); }
    });
    $('.meter').addEventListener('click', () => { volts = !volts; draw(); });
    $('.process').addEventListener('click', () => { tig = !tig; draw(); });
    draw();
  },
};
