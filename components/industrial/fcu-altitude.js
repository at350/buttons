// Airbus A320 FCU altitude section: orange segment window with the managed-mode dot, the ALT knob
// and its concentric 100 / 1000 increment ring. Drag the inner knob (or ↑/↓) to dial altitude in the
// ring's increment; click the ring to switch 100 ↔ 1000; click the knob to push (managed, dot on)
// or pull (selected, dot off).
const SEG = { 0: 'abcdef', 1: 'bc', 2: 'abdeg', 3: 'abcdg', 4: 'bcfg', 5: 'acdfg', 6: 'acdefg', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg', ' ': '' };
const hs = (y) => `1,${y} 2.2,${y - 1.2} 9.8,${y - 1.2} 11,${y} 9.8,${y + 1.2} 2.2,${y + 1.2}`;
const vs = (x, a, b) => `${x},${a + 1} ${x + 1.2},${a + 2.2} ${x + 1.2},${b - 2.2} ${x},${b - 1} ${x - 1.2},${b - 2.2} ${x - 1.2},${a + 2.2}`;
const POLY = [hs(1.2), vs(10.8, 0, 11), vs(10.8, 11, 22), hs(20.8), vs(1.2, 11, 22), vs(1.2, 0, 11), hs(11)];
const digits = (n) => Array.from({ length: n }, (_, i) => `<g class="dg" transform="translate(${i * 15 + 2} 0) skewX(-4)">${POLY.map((p) => `<polygon points="${p}"/>`).join('')}</g>`).join('');
const paint = (svg, s) => { const gs = svg.querySelectorAll('.dg'), cs = s.padStart(gs.length, ' ').split(''); gs.forEach((g, i) => { const on = SEG[cs[i]] || ''; [...g.children].forEach((p, k) => p.classList.toggle('on', on.includes('abcdefg'[k]))); }); };
export default {
  id: 'nd-fcu-altitude',
  credit: 'Airbus A320 FCU — ALT window with managed dot, push/pull ALT knob with the concentric 100 / 1000 ft increment ring',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 18px 12px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.035) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #5f6d79, #4a5763); box-shadow: inset 0 1px 0 rgba(255,255,255,.18); }
    .lg { font: 700 9px/1 "Roboto Flex", "DM Sans", Arial, sans-serif; font-variation-settings: "wdth" 85; letter-spacing: 1px; color: #f1f4f6; }
    .win { position: relative; display: flex; align-items: center; gap: 5px; padding: 6px 8px; border-radius: 2px; background: #0b0c0d; box-shadow: inset 0 2px 4px #000, 0 0 0 2px #2c3237; }
    .win svg { width: 98px; height: 28px; filter: drop-shadow(0 0 2px rgba(255,140,0,.55)); }
    .dg > * { fill: #2a1a08; } .dg > .on { fill: #ff9c1a; }
    .dot { width: 9px; height: 9px; border-radius: 50%; background: #2a1a08; } .dot.on { background: #ff9c1a; box-shadow: 0 0 5px rgba(255,150,20,.8); }
    .ctl { position: relative; width: 112px; height: 112px; }
    .ring { position: absolute; inset: 14px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: repeating-conic-gradient(#1c1f22 0 5deg, #34393e 5deg 10deg); box-shadow: 0 3px 5px rgba(0,0,0,.5), inset 0 0 0 1px #000; transition: transform .14s cubic-bezier(.3,1.6,.5,1); transform: rotate(var(--rr, -25deg)); }
    .ring::after { content: ''; position: absolute; left: 50%; top: 2px; width: 3px; height: 10px; margin-left: -1.5px; background: #f1f4f6; border-radius: 1px; }
    .ring:focus-visible, .knob:focus-visible { outline: 2px solid #9fd0ff; outline-offset: 2px; }
    .mk { position: absolute; font: 700 8px/1 "Roboto Flex", "DM Sans", Arial, sans-serif; font-variation-settings: "wdth" 85; color: #f1f4f6; }
    .mk.a { left: 8px; top: 2px; } .mk.b { right: 2px; top: 2px; }
    .knob { position: absolute; left: 30px; top: 30px; width: 52px; height: 52px; border-radius: 50%; border: 0; padding: 0; cursor: grab; touch-action: none;
      background: radial-gradient(circle at 45% 35%, #4a5056, #1d2023 70%); box-shadow: 0 4px 6px rgba(0,0,0,.6), inset 0 1px 1px rgba(255,255,255,.2); transition: transform .1s; }
    .knob.pushed { transform: scale(.95); box-shadow: 0 1px 2px rgba(0,0,0,.6), inset 0 1px 1px rgba(255,255,255,.15); }
    .knob .rot { position: absolute; inset: 0; border-radius: 50%; background: repeating-conic-gradient(rgba(255,255,255,.08) 0 3deg, transparent 3deg 9deg); }
    .knob .rot::after { content: ''; position: absolute; left: 50%; top: 4px; width: 3px; height: 12px; margin-left: -1.5px; border-radius: 1px; background: #f1f4f6; }
  `,
  html: `
    <div class="stage">
      <span class="lg">ALT</span>
      <div class="win"><svg viewBox="0 0 77 22" aria-label="Selected altitude">${digits(5)}</svg><span class="dot"></span></div>
      <div class="ctl"><span class="mk a">100</span><span class="mk b">1000</span>
        <button class="ring" type="button" role="switch" aria-checked="false" aria-label="Increment 1000 feet"></button>
        <button class="knob" type="button" role="slider" aria-label="Altitude" aria-valuemin="100" aria-valuemax="49000" aria-valuenow="10000"><span class="rot"></span></button></div>
    </div>`,
  init(root) {
    const win = root.querySelector('.win svg'), dot = root.querySelector('.dot'), ring = root.querySelector('.ring'), knob = root.querySelector('.knob'), rot = knob.firstElementChild;
    let alt = 10000, big = false, managed = false, ang = 0, last = 0, acc = 0, drag = null;
    const draw = () => { paint(win, String(alt)); dot.classList.toggle('on', managed); knob.setAttribute('aria-valuenow', alt); knob.classList.toggle('pushed', managed); rot.style.transform = `rotate(${ang}deg)`; };
    const step = (d) => { const inc = big ? 1000 : 100; alt = Math.max(100, Math.min(49000, big ? Math.round((alt + d * inc) / 1000) * 1000 || 100 : alt + d * inc)); draw(); };
    ring.addEventListener('click', () => { big = !big; ring.style.setProperty('--rr', big ? '25deg' : '-25deg'); ring.setAttribute('aria-checked', big); });
    const angleAt = (e) => { const r = knob.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    knob.addEventListener('pointerdown', (e) => { drag = { moved: false }; last = angleAt(e); acc = 0; knob.setPointerCapture(e.pointerId); });
    knob.addEventListener('pointermove', (e) => {
      if (!drag) return; const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      if (Math.abs(d) > 0.5) drag.moved = true; ang += d; acc += d; draw();
      while (acc > 18) { acc -= 18; step(1); } while (acc < -18) { acc += 18; step(-1); }
    });
    knob.addEventListener('pointerup', () => { if (drag && !drag.moved) { managed = !managed; draw(); } drag = null; });
    knob.addEventListener('pointercancel', () => { drag = null; });
    knob.addEventListener('click', (e) => { if (e.detail === 0) { managed = !managed; draw(); } });
    knob.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowUp' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowDown' || e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { e.preventDefault(); ang += d * 18; step(d); }
    });
    draw();
  },
};
