// Fluke 87V true-RMS multimeter: yellow holster, charcoal case, segment LCD and the big rotary
// function switch with its detented positions (OFF, V~, V⎓, mV, Ω, diode, mA/A, µA). Drag the
// knob, click it to step, click a legend, or use the arrow keys; HOLD freezes the reading, RANGE leaves
// auto-ranging, the yellow shift key swaps DC/AC on the mV and current ranges, REL zeroes the reading,
// MIN MAX records the peak. Below the dial: the four fused input jacks (A · mA µA · COM · VΩ).
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
    .lcd { position: relative; height: 54px; border-radius: 4px; background: linear-gradient(#bfc6b0, #a9b29a); box-shadow: inset 0 2px 4px rgba(0,0,0,.45), 0 0 0 2px #1d1f21; }
    .lcd.off > * { visibility: hidden; }
    .rd { position: absolute; left: 22px; top: 7px; width: 100px; height: 29px; }
    .rd .dg > * { fill: rgba(30,34,24,.06); } .rd .dg > .on { fill: #1d2216; }
    .an { position: absolute; font: 700 7px/1 "DM Sans", Inter, Arial, sans-serif; color: #1d2216; letter-spacing: .4px; }
    .an.auto { left: 5px; top: 5px; font-size: 6px; } .an.h { left: 5px; top: 26px; font-size: 6px; } .an.sh { left: 5px; top: 15px; font-size: 6px; } .an.m { right: 8px; top: 6px; }
    .an.u { right: 8px; top: 20px; font: 600 12px/1 "DM Sans", Inter, Arial, sans-serif; }
    .an.h { color: #1d2216; }
    .bar { position: absolute; left: 22px; right: 10px; bottom: 5px; height: 5px; display: flex; gap: 1px; }
    .bar i { flex: 1; background: rgba(30,34,24,.07); } .bar i.on { background: #1d2216; }
    .model { display: flex; align-items: baseline; justify-content: space-between; margin: 0 3px 6px; font: 700 6px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .5px; color: #d3d6d8; }
    .model b { font: 800 11px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: -.2px; color: #fff; }
    .model b span { color: #ffd23a; font-size: 9px; margin-left: 1px; }
    .jacks { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin: 0 2px; padding: 6px 2px 4px; border-radius: 6px; background: #26292c; box-shadow: inset 0 1px 2px rgba(0,0,0,.6); }
    .jk { display: grid; justify-items: center; gap: 3px; font: 700 6.5px/1 "DM Sans", Inter, Arial, sans-serif; color: #f0f1f2; white-space: nowrap; }
    .jk i { width: 20px; height: 20px; border-radius: 50%; background: radial-gradient(circle, #050505 0 3.2px, #8d9297 3.6px 4.6px, #111 5px 6px, var(--c) 6.4px 9px, rgba(0,0,0,.6) 9.6px);
      box-shadow: 0 1px 0 rgba(255,255,255,.12); }
    .jk small { font-size: 5px; color: #9ea3a7; letter-spacing: .2px; }
    .cat { margin: 4px 0 0; text-align: center; font: 700 5px/1 "DM Sans", Inter, Arial, sans-serif; color: #9ea3a7; letter-spacing: .5px; }
    .btns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px 5px; margin: 8px 2px 0; }
    .b { height: 16px; border: 0; padding: 0; border-radius: 9px; cursor: pointer; font: 700 6.5px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .4px; color: #e9ebec;
      background: linear-gradient(#6f757a, #50555a); box-shadow: 0 2px 0 #1b1d1f, inset 0 1px 0 rgba(255,255,255,.2); }
    .b.y { background: linear-gradient(#ffd23a, #e3a900); color: #1d1f21; box-shadow: 0 2px 0 #7a5a00, inset 0 1px 0 rgba(255,255,255,.5); }
    .b:active, .b[aria-pressed="true"] { transform: translateY(1px); box-shadow: 0 1px 0 #1b1d1f, inset 0 1px 2px rgba(0,0,0,.35); }
    .b:focus-visible, .knob:focus-visible { outline: 2px solid #ffd23a; outline-offset: 2px; }
    .dial { position: relative; width: 160px; height: 132px; margin-top: 0; }
    .dial svg { position: absolute; inset: 0; width: 160px; height: 136px; }
    .lg { cursor: pointer; } .lg text { font: 700 9px "DM Sans", Inter, Arial, sans-serif; fill: #f0f1f2; text-anchor: middle; }
    .lg .hit { fill: transparent; } .lg:hover text { fill: #ffd23a; } .lg:hover .sym { stroke: #ffd23a; }
    .sym { fill: none; stroke: #f0f1f2; stroke-width: 1.2; } .dio { fill: #f0f1f2; stroke: #f0f1f2; stroke-width: 1.2; }
    .lg.sel text { fill: #ffd23a; } .lg.sel .sym, .lg.sel .dio { stroke: #ffd23a; fill: #ffd23a; }
    .lg.sel .sym { fill: none; }
    .knob { position: absolute; left: 44px; top: 34px; width: 72px; height: 72px; border-radius: 50%; border: 0; padding: 0; cursor: grab; touch-action: none;
      background: radial-gradient(circle at 45% 35%, #5b6065, #2a2d30 70%); box-shadow: 0 4px 6px rgba(0,0,0,.55), inset 0 1px 1px rgba(255,255,255,.2), 0 0 0 3px #222527; }
    .rot { position: absolute; inset: 0; border-radius: 50%; --a: -105deg; }
    .rot::before, .rot::after { transform: rotate(var(--a)); transition: transform .14s cubic-bezier(.3,1.7,.5,1); }
    .rot::before { content: ''; position: absolute; left: 50%; top: 4px; bottom: 4px; width: 20px; margin-left: -10px; border-radius: 10px;
      background: linear-gradient(90deg, #1b1d1f, #4e5357 35%, #33373a 65%, #151719); box-shadow: 0 2px 4px rgba(0,0,0,.6); }
    .rot::after { content: ''; position: absolute; left: 50%; top: 6px; width: 4px; height: 14px; margin-left: -2px; border-radius: 2px; background: #ffd23a; transform-origin: 2px 30px; }
    .ring { position: absolute; left: 34px; top: 24px; width: 92px; height: 92px; border-radius: 50%; background: radial-gradient(circle, #24272a 58%, #3d4246 60%, #2a2d30 100%); }
  `,
  html: `
    <div class="stage"><div class="body">
      <div class="model"><b>FLUKE<span>87 V</span></b><span>TRUE RMS MULTIMETER</span></div>
      <div class="lcd off" aria-live="polite"><span class="an auto">AUTO</span><span class="an sh"></span><span class="an h"></span><span class="an m"></span><span class="an u"></span>
        <svg class="rd" viewBox="0 0 77 22">${digits(5)}</svg><span class="bar">${'<i></i>'.repeat(30)}</span></div>
      <div class="btns"><button class="b mm" type="button" aria-pressed="false">MIN MAX</button><button class="b rg" type="button">RANGE</button><button class="b hold" type="button" aria-pressed="false">HOLD</button>
        <button class="b y" type="button" aria-label="Shift" aria-pressed="false"></button><button class="b rel" type="button" aria-pressed="false">REL &#916;</button><button class="b hz" type="button" aria-pressed="false">Hz %</button></div>
      <div class="dial"><div class="ring"></div><svg viewBox="0 0 160 136">${LEG}</svg>
        <button class="knob" type="button" role="slider" aria-label="Function" aria-valuemin="0" aria-valuemax="7" aria-valuenow="0" aria-valuetext="OFF"><span class="rot"></span></button></div>
      <div class="jacks" aria-hidden="true">
        <span class="jk" style="--c:#c8102e"><i></i>A<small>10A MAX</small></span><span class="jk" style="--c:#c8102e"><i></i>mA µA<small>400mA MAX</small></span>
        <span class="jk" style="--c:#1a1a1a"><i></i>COM<small>&#8203;</small></span><span class="jk" style="--c:#c8102e"><i></i>V &#937; &#9654;|<small>1000V MAX</small></span></div>
      <div class="cat">CAT III 1000V · CAT IV 600V</div>
    </div></div>`,
  init(root) {
    const lcd = root.querySelector('.lcd'), rd = root.querySelector('.rd'), rot = root.querySelector('.rot'), knob = root.querySelector('.knob');
    const an = { h: root.querySelector('.an.h'), m: root.querySelector('.an.m'), u: root.querySelector('.an.u'), auto: root.querySelector('.an.auto') };
    const legs = [...root.querySelectorAll('.lg')], hold = root.querySelector('.hold'), range = root.querySelector('.rg');
    const shiftB = root.querySelector('.y'), relB = root.querySelector('.rel'), mmB = root.querySelector('.mm'), hzB = root.querySelector('.hz');
    const bars = [...root.querySelectorAll('.bar i')]; an.sh = root.querySelector('.an.sh');
    const FULL = [0, 1000, 60, 600, 6, 3, 10, 6000];
    const NAMES = ['OFF', 'V AC', 'V DC', 'mV DC', 'Ohms', 'Diode', 'mA/A', 'µA'];
    let i = 0, held = false, auto = true, drag = null, shift = false, rel = false, mm = false, hz = false;
    const fmt = (v, like) => { const d = (like.split('.')[1] || '').length, w = like.replace('-', '').length; let s = Math.abs(v).toFixed(d); while (s.length < w) s = '0' + s; return (v < 0 ? '-' : '') + s; };
    const set = (n) => {
      const prev = i; i = Math.max(0, Math.min(7, n)); if (i !== prev) { shift = rel = mm = hz = false; }
      const base = POS[i], p = { ...base };
      if (shift && /^(3|6|7)$/.test(String(i))) p.m = 'AC';
      if (hz && (i === 1 || i === 2)) { p.r = '60.00'; p.u = 'Hz'; p.m = ''; }
      if (rel && i) { p.r = fmt(0, p.r); }
      if (mm && i && !rel) { const v = parseFloat(p.r) * 1.012; p.r = fmt(v, p.r); }
      rot.style.setProperty('--a', `${p.a}deg`); legs.forEach((l, k) => l.classList.toggle('sel', k === i));
      knob.setAttribute('aria-valuenow', i); knob.setAttribute('aria-valuetext', NAMES[i]);
      lcd.classList.toggle('off', i === 0); if (i === 0) { held = false; hold.setAttribute('aria-pressed', 'false'); }
      if (!held) {
        paint(rd, p.r); an.m.textContent = p.m; an.u.textContent = p.u;
        const f = FULL[i] ? Math.min(1, Math.abs(parseFloat(p.r)) / FULL[i]) : 0; bars.forEach((b, k) => b.classList.toggle('on', i > 0 && k < Math.round(f * bars.length)));
      }
      an.h.textContent = held ? 'HOLD' : mm ? 'MAX' : rel ? 'Δ' : ''; an.auto.textContent = auto ? 'AUTO' : 'MANUAL'; an.sh.textContent = i === 5 ? '▶|' : '';
      shiftB.setAttribute('aria-pressed', shift); relB.setAttribute('aria-pressed', rel); mmB.setAttribute('aria-pressed', mm); hzB.setAttribute('aria-pressed', hz);
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
    shiftB.addEventListener('click', () => { if (!i) return; shift = !shift; set(i); });
    relB.addEventListener('click', () => { if (!i) return; rel = !rel; set(i); });
    mmB.addEventListener('click', () => { if (!i) return; mm = !mm; set(i); });
    hzB.addEventListener('click', () => { if (!i) return; hz = !hz; set(i); });
    set(2); // on, reading DC volts
  },
};
