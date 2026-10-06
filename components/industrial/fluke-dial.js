// Fluke 87V true-RMS multimeter: yellow holster, charcoal case, segment LCD and the big rotary
// function switch with its detented positions (OFF, V~, V⎓, mV, Ω, diode, mA/A, µA). Drag the
// knob, click it to step, click a legend, or use the arrow keys; HOLD freezes the reading.
const SEG = { 0: 'abcdef', 1: 'bc', 2: 'abdeg', 3: 'abcdg', 4: 'bcfg', 5: 'acdfg', 6: 'acdefg', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg', '-': 'g', ' ': '', O: 'abcdef', L: 'def' };
const hs = (y) => `1,${y} 2.2,${y - 1.2} 9.8,${y - 1.2} 11,${y} 9.8,${y + 1.2} 2.2,${y + 1.2}`;
const vs = (x, a, b) => `${x},${a + 1} ${x + 1.2},${a + 2.2} ${x + 1.2},${b - 2.2} ${x},${b - 1} ${x - 1.2},${b - 2.2} ${x - 1.2},${a + 2.2}`;
const POLY = [hs(1.2), vs(10.8, 0, 11), vs(10.8, 11, 22), hs(20.8), vs(1.2, 11, 22), vs(1.2, 0, 11), hs(11)];
const digits = (n) => Array.from({ length: n }, (_, i) => `<g class="dg" transform="translate(${i * 15 + 2} 0) skewX(-6)">${POLY.map((p) => `<polygon points="${p}"/>`).join('')}<circle cx="13.2" cy="21" r="1.2"/></g>`).join('');
const paint = (svg, s) => {
  const cs = []; for (const c of s) { if (c === '.' && cs.length) cs[cs.length - 1].dp = 1; else cs.push({ c, dp: 0 }); }
  const gs = svg.querySelectorAll('.dg'); while (cs.length < gs.length) cs.unshift({ c: ' ', dp: 0 });
  gs.forEach((g, i) => { const on = SEG[cs[i].c] || ''; [...g.children].forEach((p, k) => p.classList.toggle('on', k < 7 ? on.includes('abcdefg'[k]) : !!cs[i].dp)); });
};
const DC = (x, y) => `<path d="M${x - 5} ${y}h10M${x - 5} ${y + 2.6}h2.6M${x - 1.3} ${y + 2.6}h2.6M${x + 2.4} ${y + 2.6}h2.6" class="sym"/>`;
const POS = [
  { a: -105, r: '', u: '', m: '', lg: '<text x="0" y="3">OFF</text>' },
  { a: -75, r: '230.4', u: 'V', m: 'AC', lg: '<text x="0" y="5">V</text><path class="sym" d="M-4 -4q2-3 4 0t4 0"/>' },
  { a: -45, r: '24.02', u: 'V', m: 'DC', lg: `<text x="0" y="5">V</text>${DC(0, -6)}` },
  { a: -15, r: '-12.3', u: 'mV', m: 'DC', lg: `<text x="0" y="5">mV</text>${DC(0, -6)}` },
  { a: 15, r: '1.205', u: 'kΩ', m: '', lg: '<text x="0" y="4">Ω</text>' },
  { a: 45, r: '0.618', u: 'V', m: '', lg: '<path class="dio" d="M-6 0h3M3 0h3M-3 -4v8l6-4z"/><path class="sym" d="M3 -4v8"/>' },
  { a: 75, r: '0.000', u: 'A', m: 'DC', lg: '<text x="0" y="0" style="font-size:7px">mA</text><text x="0" y="8" style="font-size:7px">A</text>' },
  { a: 105, r: '000.0', u: 'µA', m: 'DC', lg: '<text x="0" y="4">µA</text>' },
];
const CX = 80, CY = 70;
const LEG = POS.map((p, i) => { const t = p.a * Math.PI / 180; return `<g class="lg" data-i="${i}" transform="translate(${(CX + 57 * Math.sin(t)).toFixed(1)} ${(CY - 57 * Math.cos(t)).toFixed(1)})"><circle r="9" class="hit"/>${p.lg}</g>`; }).join('');
export default {
  id: 'nd-fluke-87v',
  credit: 'Fluke 87V multimeter — yellow holster, segment LCD and the detented rotary function switch (OFF · V~ · V⎓ · mV · Ω · diode · mA/A · µA) with HOLD',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 9px; border-radius: 18px; overflow: hidden; background: linear-gradient(160deg, #ffd23a, #f2b600 60%, #d99e00);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.6), inset 0 -2px 0 rgba(0,0,0,.15); }
    .body { width: 176px; padding: 10px 8px 6px; border-radius: 11px; background: linear-gradient(170deg, #4a4f53, #2f3336); box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 1px 3px rgba(0,0,0,.4); }
    .lcd { position: relative; height: 46px; border-radius: 4px; background: linear-gradient(#bfc6b0, #a9b29a); box-shadow: inset 0 2px 4px rgba(0,0,0,.45), 0 0 0 2px #1d1f21; }
    .lcd.off > * { visibility: hidden; }
    .rd { position: absolute; left: 22px; top: 9px; width: 104px; height: 30px; }
    .rd .dg > * { fill: rgba(30,34,24,.06); } .rd .dg > .on { fill: #1d2216; }
    .an { position: absolute; font: 700 7px/1 "DM Sans", Inter, Arial, sans-serif; color: #1d2216; letter-spacing: .4px; }
    .an.auto { left: 6px; top: 6px; } .an.h { left: 6px; bottom: 6px; } .an.m { right: 8px; top: 6px; }
    .an.u { right: 8px; bottom: 6px; font: 600 13px/1 "DM Sans", Inter, Arial, sans-serif; }
    .btns { display: flex; gap: 5px; margin: 8px 2px 0; }
    .b { flex: 1; height: 17px; border: 0; padding: 0; border-radius: 9px; cursor: pointer; font: 700 6.5px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .4px; color: #e9ebec;
      background: linear-gradient(#6f757a, #50555a); box-shadow: 0 2px 0 #1b1d1f, inset 0 1px 0 rgba(255,255,255,.2); }
    .b.y { background: linear-gradient(#ffd23a, #e3a900); color: #1d1f21; box-shadow: 0 2px 0 #7a5a00, inset 0 1px 0 rgba(255,255,255,.5); }
    .b:active, .b[aria-pressed="true"] { transform: translateY(1px); box-shadow: 0 1px 0 #1b1d1f, inset 0 1px 2px rgba(0,0,0,.35); }
    .b:focus-visible, .knob:focus-visible { outline: 2px solid #ffd23a; outline-offset: 2px; }
    .dial { position: relative; width: 160px; height: 136px; margin-top: 2px; }
    .dial svg { position: absolute; inset: 0; width: 160px; height: 136px; }
    .lg { cursor: pointer; } .lg text { font: 700 9px "DM Sans", Inter, Arial, sans-serif; fill: #f0f1f2; text-anchor: middle; }
    .lg .hit { fill: transparent; } .lg:hover text { fill: #ffd23a; } .lg:hover .sym { stroke: #ffd23a; }
    .sym { fill: none; stroke: #f0f1f2; stroke-width: 1.2; } .dio { fill: #f0f1f2; stroke: #f0f1f2; stroke-width: 1.2; }
    .lg.sel text { fill: #ffd23a; } .lg.sel .sym, .lg.sel .dio { stroke: #ffd23a; fill: #ffd23a; }
    .lg.sel .sym { fill: none; }
    .knob { position: absolute; left: 44px; top: 34px; width: 72px; height: 72px; border-radius: 50%; border: 0; padding: 0; cursor: grab; touch-action: none;
      background: radial-gradient(circle at 45% 35%, #5b6065, #2a2d30 70%); box-shadow: 0 4px 6px rgba(0,0,0,.55), inset 0 1px 1px rgba(255,255,255,.2), 0 0 0 3px #222527; }
    .rot { position: absolute; inset: 0; border-radius: 50%; transform: rotate(-105deg); transition: transform .14s cubic-bezier(.3,1.7,.5,1); }
    .rot::before { content: ''; position: absolute; left: 50%; top: 4px; bottom: 4px; width: 20px; margin-left: -10px; border-radius: 10px;
      background: linear-gradient(90deg, #1b1d1f, #4e5357 35%, #33373a 65%, #151719); box-shadow: 0 2px 4px rgba(0,0,0,.6); }
    .rot::after { content: ''; position: absolute; left: 50%; top: 6px; width: 4px; height: 14px; margin-left: -2px; border-radius: 2px; background: #ffd23a; }
    .ring { position: absolute; left: 34px; top: 24px; width: 92px; height: 92px; border-radius: 50%; background: radial-gradient(circle, #24272a 58%, #3d4246 60%, #2a2d30 100%); }
  `,
  html: `
    <div class="stage"><div class="body">
      <div class="lcd off" aria-live="polite"><span class="an auto">AUTO</span><span class="an h"></span><span class="an m"></span><span class="an u"></span>
        <svg class="rd" viewBox="0 0 77 22">${digits(5)}</svg></div>
      <div class="btns"><button class="b y" type="button" aria-label="Shift">&#8203;</button><button class="b" type="button">RANGE</button><button class="b hold" type="button" aria-pressed="false">HOLD</button></div>
      <div class="dial"><div class="ring"></div><svg viewBox="0 0 160 136">${LEG}</svg>
        <button class="knob" type="button" role="slider" aria-label="Function" aria-valuemin="0" aria-valuemax="7" aria-valuenow="0" aria-valuetext="OFF"><span class="rot"></span></button></div>
    </div></div>`,
  init(root) {
    const lcd = root.querySelector('.lcd'), rd = root.querySelector('.rd'), rot = root.querySelector('.rot'), knob = root.querySelector('.knob');
    const an = { h: root.querySelector('.an.h'), m: root.querySelector('.an.m'), u: root.querySelector('.an.u'), auto: root.querySelector('.an.auto') };
    const legs = [...root.querySelectorAll('.lg')], hold = root.querySelector('.hold'), range = root.querySelectorAll('.b')[1];
    const NAMES = ['OFF', 'V AC', 'V DC', 'mV DC', 'Ohms', 'Diode', 'mA/A', 'µA'];
    let i = 0, held = false, auto = true, drag = null;
    const set = (n) => {
      i = Math.max(0, Math.min(7, n)); const p = POS[i];
      rot.style.transform = `rotate(${p.a}deg)`; legs.forEach((l, k) => l.classList.toggle('sel', k === i));
      knob.setAttribute('aria-valuenow', i); knob.setAttribute('aria-valuetext', NAMES[i]);
      lcd.classList.toggle('off', i === 0); if (i === 0) { held = false; hold.setAttribute('aria-pressed', 'false'); }
      if (!held) { paint(rd, p.r); an.m.textContent = p.m; an.u.textContent = p.u; }
      an.h.textContent = held ? 'HOLD' : i === 5 ? '▶|' : ''; an.auto.textContent = auto ? 'AUTO' : 'MANUAL';
    };
    const ang = (e) => { const r = knob.getBoundingClientRect(); return Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI; };
    knob.addEventListener('pointerdown', (e) => { drag = { moved: false, x: e.clientX, y: e.clientY }; knob.setPointerCapture(e.pointerId); });
    knob.addEventListener('pointermove', (e) => {
      if (!drag) return; if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 5) drag.moved = true;
      if (drag.moved) { const a = ang(e); if (Math.abs(a) < 130) { const n = Math.round((a + 105) / 30); if (n !== i) set(n); } }
    });
    knob.addEventListener('pointerup', () => { if (drag && !drag.moved) set(i === 7 ? 0 : i + 1); drag = null; });
    knob.addEventListener('pointercancel', () => { drag = null; });
    knob.addEventListener('click', (e) => { if (e.detail === 0) set(i === 7 ? 0 : i + 1); });
    knob.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0;
      if (d) { e.preventDefault(); set(i + d); }
    });
    legs.forEach((l, k) => l.addEventListener('click', () => set(k)));
    hold.addEventListener('click', () => { if (!i) return; held = !held; hold.setAttribute('aria-pressed', held); set(i); });
    range.addEventListener('click', () => { if (!i) return; auto = !auto; set(i); });
    set(0);
  },
};
