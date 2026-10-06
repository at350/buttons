// Chadburn-style ship's engine order telegraph: polished brass case, enamel dial split into AHEAD
// (white) and ASTERN (red) sectors around STOP, plus STAND BY and FINISHED WITH ENGINES. Drag the
// handle (or click an order, or ←/→); the engine room's reply pointer answers after a moment and
// the gong rings as the dial flashes.
const ORD = [
  ['FINISHED WITH ENGINES', -118], ['FULL', -88], ['HALF', -66], ['SLOW', -44], ['DEAD SLOW', -22], ['STOP', 0],
  ['DEAD SLOW', 22], ['SLOW', 44], ['HALF', 66], ['FULL', 88], ['STAND BY', 118],
];
const R = 100, C = 100;
const pt = (a, r) => { const t = (a - 90) * Math.PI / 180; return [(C + r * Math.cos(t)).toFixed(1), (C + r * Math.sin(t)).toFixed(1)]; };
const sector = (a0, a1, r0, r1) => { const [x0, y0] = pt(a0, r1), [x1, y1] = pt(a1, r1), [x2, y2] = pt(a1, r0), [x3, y3] = pt(a0, r0); return `M${x0} ${y0}A${r1} ${r1} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${r0} ${r0} 0 0 0 ${x3} ${y3}Z`; };
const LINES = { 'FINISHED WITH ENGINES': ['FINISHED', 'WITH', 'ENGINES'], 'DEAD SLOW': ['DEAD', 'SLOW'], 'STAND BY': ['STAND', 'BY'] };
const DIAL = ORD.map(([t, a], i) => {
  const cls = a < 0 && a > -100 ? 'ast' : a === 0 ? 'stp' : Math.abs(a) > 100 ? 'aux' : 'ahd';
  const ls = LINES[t] || [t], gap = ls.length > 2 ? 6.4 : 7.6, sz = ls.length > 2 ? 'sm' : ls.length > 1 ? 'md' : '';
  const flip = a < 0 ? 90 : -90;
  const txt = ls.map((l, k) => `<text x="${C}" y="${(39.5 + (k - (ls.length - 1) / 2) * gap).toFixed(1)}" class="${sz}">${l}</text>`).join('');
  return `<path class="sec ${cls}" d="${sector(a - 11, a + 11, 44, 82)}"/><g class="lab" data-i="${i}" transform="rotate(${a} ${C} ${C})"><g transform="rotate(${flip} ${C} 37)">${txt}</g></g>`;
}).join('');
export default {
  id: 'nd-engine-telegraph',
  credit: 'Chadburn-style ship\'s engine order telegraph — brass case, AHEAD / ASTERN enamel dial, handle with engine-room reply pointer',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 10px; border-radius: 12px; overflow: hidden; background: radial-gradient(circle at 30% 20%, #2f3a44, #151b21); box-shadow: inset 0 1px 0 rgba(255,255,255,.08); }
    svg { display: block; width: 200px; height: 200px; touch-action: none; user-select: none; -webkit-user-select: none; }
    .rim { fill: url(#brass); stroke: #6b4a12; stroke-width: 1.5; }
    .face { fill: #f3ecd8; }
    .sec { stroke: #1d1a14; stroke-width: .6; } .sec.ahd, .sec.stp { fill: #f7f1e1; } .sec.ast { fill: #c92a1f; } .sec.aux { fill: #f7f1e1; }
    .stage.ring .face, .stage.ring .sec.ahd, .stage.ring .sec.stp, .stage.ring .sec.aux { fill: #fffbe8; }
    .lab { cursor: pointer; } .lab text { font: 800 7.5px "DM Sans", Inter, Arial, sans-serif; letter-spacing: .4px; fill: #1d1a14; text-anchor: middle; }
    .lab text.sm { font-size: 5.4px; } .lab text.md { font-size: 6.4px; }
    .lab:hover text { fill: #8a5a00; }
    .big { font: 800 7px "DM Sans", Inter, Arial, sans-serif; letter-spacing: 1px; text-anchor: middle; }
    .hub { fill: url(#brass); stroke: #6b4a12; }
    .hand { cursor: grab; outline: none; transition: transform .2s cubic-bezier(.3,1.3,.5,1); }
    .hand.drag { transition: none; cursor: grabbing; }
    .hand:focus-visible .grip { stroke: #2b8cff; stroke-width: 2; }
    .ans { transition: transform .6s cubic-bezier(.4,0,.2,1); }
    .stage.ring .glass { animation: gong .18s steps(2, jump-none) 4; } @keyframes gong { 50% { opacity: .45; } }
    .glass { fill: url(#gl); opacity: .3; pointer-events: none; }
  `,
  html: `
    <div class="stage"><svg viewBox="0 0 200 200">
      <defs>
        <radialGradient id="brass" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#fff0b8"/><stop offset=".35" stop-color="#d9a640"/><stop offset=".7" stop-color="#a8761c"/><stop offset="1" stop-color="#6b4a12"/></radialGradient>
        <linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
      </defs>
      <circle class="rim" cx="100" cy="100" r="98"/><circle class="face" cx="100" cy="100" r="84"/>
      ${DIAL}
      <text class="big" x="122" y="124" fill="#1d1a14">AHEAD</text>
      <text class="big" x="78" y="124" fill="#c92a1f">ASTERN</text>
      <g class="hand" role="slider" tabindex="0" aria-label="Engine order" aria-valuemin="0" aria-valuemax="10" aria-valuenow="5" aria-valuetext="STOP">
        <path class="grip" d="M96 100V18h8v82Z" fill="url(#brass)" stroke="#6b4a12"/><circle cx="100" cy="14" r="8" fill="url(#brass)" stroke="#6b4a12"/>
      </g>
      <g class="ans"><path d="M100 100L98.4 62L100 50L101.6 62Z" fill="#1d1a14" stroke="#f3ecd8" stroke-width=".6"/></g>
      <circle class="hub" cx="100" cy="100" r="10"/>
      <circle class="glass" cx="100" cy="100" r="84"/>
    </svg></div>`,
  init(root) {
    const stage = root.querySelector('.stage'), svg = root.querySelector('svg'), hand = root.querySelector('.hand'), ans = root.querySelector('.ans');
    let i = 5, drag = false, t = 0, t2 = 0;
    const rot = (el, a) => { el.style.transformOrigin = '100px 100px'; el.style.transform = `rotate(${a}deg)`; };
    const set = (n) => {
      i = Math.max(0, Math.min(10, n)); rot(hand, ORD[i][1]);
      hand.setAttribute('aria-valuenow', i); hand.setAttribute('aria-valuetext', (ORD[i][1] < 0 && ORD[i][1] > -100 ? 'ASTERN ' : ORD[i][1] > 0 && ORD[i][1] < 100 ? 'AHEAD ' : '') + ORD[i][0]);
      clearTimeout(t); clearTimeout(t2);
      t = setTimeout(() => { rot(ans, ORD[i][1]); stage.classList.remove('ring'); void stage.offsetWidth; stage.classList.add('ring'); t2 = setTimeout(() => stage.classList.remove('ring'), 800); }, 700);
    };
    const angAt = (e) => { const r = svg.getBoundingClientRect(); return Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI; };
    const nearest = (a) => ORD.reduce((b, o, k) => (Math.abs(o[1] - a) < Math.abs(ORD[b][1] - a) ? k : b), 0);
    hand.addEventListener('pointerdown', (e) => { drag = true; hand.setPointerCapture(e.pointerId); hand.classList.add('drag'); });
    hand.addEventListener('pointermove', (e) => { if (!drag) return; const a = Math.max(-118, Math.min(118, angAt(e))); rot(hand, a); });
    const end = (e) => { if (!drag) return; drag = false; hand.classList.remove('drag'); set(nearest(Math.max(-118, Math.min(118, angAt(e))))); };
    hand.addEventListener('pointerup', end); hand.addEventListener('pointercancel', () => { drag = false; hand.classList.remove('drag'); rot(hand, ORD[i][1]); });
    hand.addEventListener('keydown', (e) => { const d = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0; if (d) { e.preventDefault(); set(i + d); } });
    for (const l of root.querySelectorAll('.lab')) l.addEventListener('click', () => set(+l.dataset.i));
    rot(hand, 0); rot(ans, 0);
    return () => { clearTimeout(t); clearTimeout(t2); };
  },
};
