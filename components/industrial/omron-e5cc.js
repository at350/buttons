// Omron E5CC 48×48 PID temperature controller: white PV over green SV, orange operation indicators,
// and the four rubber keys (Level, Mode, ▼, ▲). ▲▼ change the set value (hold to repeat); the
// process value climbs or cools toward it with OUT1 lit while heating. Mode toggles RUN/STOP
// (STOP lamp, PV cools to ambient); hold Level to show the manipulated variable (MV %) in the SV row.
const SEG = { 0: 'abcdef', 1: 'bc', 2: 'abdeg', 3: 'abcdg', 4: 'bcfg', 5: 'acdfg', 6: 'acdefg', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg', '-': 'g', ' ': '' };
const hs = (y) => `1,${y} 2.2,${y - 1.2} 9.8,${y - 1.2} 11,${y} 9.8,${y + 1.2} 2.2,${y + 1.2}`;
const vs = (x, a, b) => `${x},${a + 1} ${x + 1.2},${a + 2.2} ${x + 1.2},${b - 2.2} ${x},${b - 1} ${x - 1.2},${b - 2.2} ${x - 1.2},${a + 2.2}`;
const POLY = [hs(1.2), vs(10.8, 0, 11), vs(10.8, 11, 22), hs(20.8), vs(1.2, 11, 22), vs(1.2, 0, 11), hs(11)];
const digits = (n) => Array.from({ length: n }, (_, i) => `<g class="dg" transform="translate(${i * 15 + 2} 0) skewX(-6)">${POLY.map((p) => `<polygon points="${p}"/>`).join('')}<circle cx="13.2" cy="21" r="1.2"/></g>`).join('');
const paint = (svg, s) => {
  const cs = []; for (const c of s) { if (c === '.' && cs.length) cs[cs.length - 1].dp = 1; else cs.push({ c, dp: 0 }); }
  const gs = svg.querySelectorAll('.dg'); while (cs.length < gs.length) cs.unshift({ c: ' ', dp: 0 });
  gs.forEach((g, i) => { const on = SEG[cs[i].c] || ''; [...g.children].forEach((p, k) => p.classList.toggle('on', k < 7 ? on.includes('abcdefg'[k]) : !!cs[i].dp)); });
};
const ICON = {
  lvl: '<rect x="2" y="2" width="10" height="10" rx="1" fill="none" stroke-width="1.4"/><path d="M5 7h4" stroke-width="1.4"/>',
  mode: '<path d="M11.5 7A4.5 4.5 0 1 1 9.8 3.5" fill="none" stroke-width="1.4"/><path d="M8.6 1.6l2.4 1.9-2.4 1.9" fill="none" stroke-width="1.3"/>',
  dn: '<path d="M2 4h10L7 11Z" stroke="none"/>', up: '<path d="M2 10h10L7 3Z" stroke="none"/>',
};
const key = (k, lbl) => `<button class="k" type="button" data-k="${k}" aria-label="${lbl}"><svg viewBox="0 0 14 14" aria-hidden="true">${ICON[k]}</svg></button>`;
export default {
  id: 'nd-omron-e5cc',
  credit: 'Omron E5CC PID temperature controller — white PV / green SV, OUT1 · STOP · MANU indicators, Level / Mode / ▼ / ▲ keys',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 1px 1px, rgba(0,0,0,.05) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #d8dcd8, #c3c8c4); }
    .unit { width: 164px; padding: 8px 8px 6px; border-radius: 5px; background: linear-gradient(#2a2c2f, #141517); box-shadow: 0 2px 5px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.12); }
    .win { display: grid; grid-template-columns: 26px 1fr; gap: 2px 6px; padding: 7px 7px 6px 5px; border-radius: 3px; background: #08090a; box-shadow: inset 0 1px 3px #000, 0 0 0 1px #393b3e; }
    .ind { display: flex; flex-direction: column; gap: 2.5px; font: 700 5.5px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .2px; }
    .ind b { color: #3b2307; } .ind b.on { color: #ffa21a; text-shadow: 0 0 4px rgba(255,160,20,.7); }
    .pv { width: 112px; height: 40px; justify-self: end; filter: drop-shadow(0 0 3px rgba(255,255,255,.35)); }
    .pv .dg > * { fill: #1b1c1d; } .pv .dg > .on { fill: #f4f6f8; }
    .sv { grid-column: 2; width: 68px; height: 24px; justify-self: end; filter: drop-shadow(0 0 2px rgba(70,255,110,.45)); }
    .sv .dg > * { fill: #0a1f0f; } .sv .dg > .on { fill: #3ff06c; }
    .keys { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-top: 8px; }
    .k { height: 22px; border: 0; padding: 0; border-radius: 4px; cursor: pointer; display: grid; place-items: center;
      background: linear-gradient(#5d6165, #3d4044); box-shadow: 0 2px 0 #18191b, inset 0 1px 0 rgba(255,255,255,.22); -webkit-tap-highlight-color: transparent; }
    .k svg { width: 12px; height: 12px; fill: #eceeef; stroke: #eceeef; }
    .k:hover { filter: brightness(1.12); }
    .k:active, .k.down { transform: translateY(2px); box-shadow: 0 0 0 #18191b, inset 0 1px 2px rgba(0,0,0,.45); }
    .k:focus-visible { outline: 2px solid #5aa9ff; outline-offset: 2px; }
    .foot { display: flex; justify-content: space-between; margin-top: 6px; font: 800 7px/1 Inter, Arial, sans-serif; letter-spacing: 1.2px; color: #c9ccce; }
    .foot i { font-style: normal; font-weight: 600; color: #8d9297; letter-spacing: .6px; }
  `,
  html: `
    <div class="stage"><div class="unit">
      <div class="win">
        <div class="ind"><b class="out1">OUT1</b><b>OUT2</b><b class="stop">STOP</b><b>CMW</b><b class="manu">MANU</b></div>
        <svg class="pv" viewBox="0 0 62 22" aria-label="Process value">${digits(4)}</svg>
        <svg class="sv" viewBox="0 0 62 22" aria-label="Set value">${digits(4)}</svg>
      </div>
      <div class="keys">${key('lvl', 'Level')}${key('mode', 'Mode')}${key('dn', 'Down')}${key('up', 'Up')}</div>
      <div class="foot">OMRON<i>E5CC</i></div>
    </div></div>`,
  init(root) {
    const pvS = root.querySelector('.pv'), svS = root.querySelector('.sv');
    const out1 = root.querySelector('.out1'), stopI = root.querySelector('.stop'), manu = root.querySelector('.manu');
    let pv = 150, sv = 150, run = true, showMV = false, loop = 0, rep = 0, repT = 0;
    const fmt = (v) => (v >= 999.95 ? String(Math.round(v)) : v.toFixed(1));
    const target = () => (run ? sv : 25);
    const mv = () => (run ? Math.max(0, Math.min(100, (sv - pv) * 8 + 18)) : 0);
    const draw = () => {
      paint(pvS, fmt(pv)); paint(svS, showMV ? mv().toFixed(1) : fmt(sv));
      out1.classList.toggle('on', run && pv < sv - 0.05); stopI.classList.toggle('on', !run); manu.classList.toggle('on', showMV);
    };
    const step = () => {
      const t = target(), d = t - pv, rate = d > 0 ? 2.4 : 1.2;
      pv = Math.abs(d) < 0.15 ? t : pv + Math.sign(d) * Math.min(Math.abs(d), Math.max(0.1, Math.abs(d) * 0.08) * rate);
      draw(); if (pv === t) { clearInterval(loop); loop = 0; }
    };
    const kick = () => { draw(); if (!loop && pv !== target()) loop = setInterval(step, 100); };
    const bump = (d) => { sv = Math.max(0, Math.min(999.9, Math.round((sv + d) * 10) / 10)); kick(); };
    const stopRep = () => { clearTimeout(repT); clearInterval(rep); };
    for (const b of root.querySelectorAll('.k')) {
      const k = b.dataset.k;
      b.addEventListener('pointerdown', () => {
        if (k === 'up' || k === 'dn') { const d = k === 'up' ? 1 : -1; bump(d); repT = setTimeout(() => { rep = setInterval(() => bump(d), 70); }, 400); }
        if (k === 'lvl') { showMV = true; draw(); }
      });
      const up = () => { stopRep(); if (k === 'lvl' && showMV) { showMV = false; draw(); } };
      b.addEventListener('pointerup', up); b.addEventListener('pointerleave', up); b.addEventListener('pointercancel', up);
      b.addEventListener('click', (e) => {
        if (k === 'mode') { run = !run; kick(); }
        else if (e.detail === 0 && (k === 'up' || k === 'dn')) bump(k === 'up' ? 1 : -1);
      });
      b.addEventListener('keydown', (e) => { if (k === 'lvl' && (e.key === ' ' || e.key === 'Enter')) { showMV = true; draw(); } });
      b.addEventListener('keyup', () => { if (k === 'lvl') { showMV = false; draw(); } });
    }
    draw();
    return () => { clearInterval(loop); stopRep(); };
  },
};
