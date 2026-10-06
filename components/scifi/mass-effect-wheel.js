// Mass Effect — the dialogue wheel (BioWare): investigate on the left, Paragon top-right, Renegade bottom-right. Move around the hub to aim, click to say it.
const OPT = [
  ['We\'ll stop them.', -50, 'para'], ['Fine.', 0, ''], ['I should go.', 50, 'rene'],
  ['[Charm] Trust me.', 230, 'para'], ['Investigate', 180, ''], ['[Intimidate] Talk.', 130, 'rene'],
];
const CX = 150, CY = 92, RI = 22, RO = 54;
const arc = (a, b, r) => { const p = (x) => [(CX + r * Math.cos((x * Math.PI) / 180)).toFixed(1), (CY + r * Math.sin((x * Math.PI) / 180)).toFixed(1)]; return [p(a), p(b)]; };
const SEG = OPT.map(([, m]) => { const [o0, o1] = arc(m - 23, m + 23, RO), [i1, i0] = arc(m + 23, m - 23, RI); return `M${o0}A${RO} ${RO} 0 0 1 ${o1}L${i1}A${RI} ${RI} 0 0 0 ${i0}Z`; });
export default {
  id: 'sf-mass-effect-wheel',
  credit: 'BioWare Mass Effect — the dialogue wheel: Paragon (blue) top-right, Renegade (red) bottom-right, Investigate on the left; sweep the pointer around the hub to aim and click to commit the line',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 300px; height: 184px; max-width: 100%; border-radius: 12px; overflow: hidden; touch-action: none;
      background: radial-gradient(ellipse at 50% 50%, #1a2430, #05080c 70%); font-family: 'Space Grotesk', system-ui, sans-serif; }
    svg { position: absolute; left: 0; top: 0; width: 300px; height: 184px; }
    .seg { fill: rgba(170,190,210,.12); stroke: rgba(210,225,240,.45); stroke-width: 1; transition: fill .12s; }
    .seg.hot { fill: url(#hl) #6d9cc4; stroke: #e6f4ff; }
    .seg.said { fill: rgba(230,244,255,.85); }
    .hub { fill: #0b1118; stroke: rgba(210,225,240,.5); }
    .ptr { stroke: #e6f4ff; stroke-width: 2; stroke-linecap: round; transform-origin: ${CX}px ${CY}px; transition: transform .1s; }
    .o { position: absolute; width: 86px; border: 0; background: none; padding: 2px 0; cursor: pointer; color: #dfe8f0; font: 500 10px/1.2 'Space Grotesk', system-ui, sans-serif; white-space: nowrap; text-shadow: 0 1px 3px #000; }
    .o.para { color: #6fb6ff; } .o.rene { color: #ff5a4a; }
    .o.r { left: 208px; text-align: left; } .o.l { right: 208px; text-align: right; }
    .o.hot { color: #fff; } .o.para.hot { color: #b8dcff; } .o.rene.hot { color: #ffb0a8; }
    .o:focus-visible { outline: 1px solid #e6f4ff; outline-offset: 2px; }
    .o[aria-checked="true"] { text-decoration: underline; text-underline-offset: 3px; }
    .line { position: absolute; left: 0; right: 0; bottom: 10px; text-align: center; font: italic 400 12px 'Space Grotesk', sans-serif; color: #f2f7fb; opacity: 0; transition: opacity .25s; white-space: nowrap; }
    .line.on { opacity: .9; }
  `,
  html: `<div class="stage"><svg viewBox="0 0 300 184"><defs><radialGradient id="hl" cx="${CX}" cy="${CY}" r="${RO}" gradientUnits="userSpaceOnUse"><stop offset=".4" stop-color="#3a6f9a"/><stop offset="1" stop-color="#cfe9ff"/></radialGradient></defs>
    ${SEG.map((d) => `<path class="seg" d="${d}"/>`).join('')}<circle class="hub" cx="${CX}" cy="${CY}" r="${RI - 4}"/><line class="ptr" x1="${CX}" y1="${CY}" x2="${CX + RI - 7}" y2="${CY}"/></svg>
    ${OPT.map(([t, m, k], i) => { const y = CY + 62 * Math.sin((m * Math.PI) / 180) - 8; return `<button class="o ${i < 3 ? 'r' : 'l'} ${k}" type="button" role="radio" aria-checked="false" style="top:${y.toFixed(0)}px" data-i="${i}">${t}</button>`; }).join('')}
    <div class="line"></div></div>`,
  init(root) {
    const st = root.querySelector('.stage'), segs = [...root.querySelectorAll('.seg')], os = [...root.querySelectorAll('.o')], ptr = root.querySelector('.ptr'), line = root.querySelector('.line');
    let hot = 0, tm = 0;
    const aim = (i) => { hot = i; segs.forEach((s, j) => s.classList.toggle('hot', j === i)); os.forEach((o, j) => o.classList.toggle('hot', j === i)); ptr.style.transform = `rotate(${OPT[i][1]}deg)`; };
    const say = (i) => {
      aim(i); os.forEach((o, j) => o.setAttribute('aria-checked', String(j === i))); segs.forEach((s, j) => s.classList.toggle('said', j === i));
      line.textContent = `“${OPT[i][0].replace(/^\[[^\]]+\]\s*/, '')}”`; line.classList.add('on');
      clearTimeout(tm); tm = setTimeout(() => { line.classList.remove('on'); segs[i].classList.remove('said'); }, 1600);
    };
    st.addEventListener('pointermove', (e) => {
      const r = st.getBoundingClientRect(), x = e.clientX - r.left - CX * (r.width / 300), y = e.clientY - r.top - CY;
      if (Math.hypot(x, y) < 8) return;
      const a = (Math.atan2(y, x) * 180) / Math.PI;
      let best = 0, bd = 999; OPT.forEach(([, m], i) => { const d = Math.abs(((a - m + 540) % 360) - 180); if (d < bd) { bd = d; best = i; } });
      aim(best);
    });
    st.addEventListener('click', (e) => { if (!e.target.closest('.o')) say(hot); });
    os.forEach((o, i) => { o.addEventListener('click', () => say(i)); o.addEventListener('focus', () => aim(i)); o.addEventListener('pointerenter', () => aim(i)); });
    aim(0);
    return () => clearTimeout(tm);
  },
};
