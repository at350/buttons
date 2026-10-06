// Westworld (HBO) — Delos host-attribute tablet: the attribute matrix radar. "Analysis." freezes the host; then tap an attribute to raise it.
const ATTR = [['APPERCEPTION', 14], ['CANDOR', 15], ['VIVACITY', 14], ['COORDINATION', 15], ['MEEKNESS', 3], ['HUMILITY', 3], ['CRUELTY', 4], ['CURIOSITY', 17]];
const pt = (i, v) => { const a = (i / 8) * Math.PI * 2 - Math.PI / 2, r = (v / 20) * 56; return [(70 + r * Math.cos(a)).toFixed(1), (70 + r * Math.sin(a)).toFixed(1)]; };
export default {
  id: 'sf-westworld-analysis',
  credit: 'Westworld (HBO, 2016) — Delos host tablet with the host\'s profile photo and attribute matrix (Maeve\'s Bulk Apperception et al.): toggle ANALYSIS to freeze the host, then tap an attribute to push it up the 20-point scale',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 310px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 14px; background: linear-gradient(#2a2724, #161412); }
    .tab { border-radius: 14px; padding: 12px 14px; background: #efe8da; box-shadow: inset 0 0 0 1px #fff8ea, 0 0 0 5px #1a1816, 0 0 0 6px #3a3632, 0 8px 22px #000; color: #23201c; }
    .hd { display: flex; align-items: center; justify-content: space-between; gap: 8px; border-bottom: 1px solid #cfc5b2; padding-bottom: 6px; }
    .who { display: flex; align-items: center; gap: 9px; min-width: 0; }
    .ph { display: block; width: 30px; height: 30px; flex: none; border-radius: 4px; object-fit: cover; box-shadow: 0 0 0 1px #cfc5b2; filter: sepia(.25) saturate(.8); transition: filter .3s; }
    .frozen .ph { filter: grayscale(1) contrast(1.15); }
    .nm { font: italic 400 19px/1 'Instrument Serif', 'Playfair Display', Georgia, serif; white-space: nowrap; }
    .an { font: 600 9px 'Space Grotesk', system-ui, sans-serif; letter-spacing: .24em; color: #23201c; background: transparent; border: 1px solid #23201c; border-radius: 999px; padding: 5px 10px; cursor: pointer; transition: background .2s, color .2s; }
    .an:hover { background: #e2d8c4; }
    .an[aria-pressed="true"] { background: #23201c; color: #efe8da; }
    .an:focus-visible, .ax:focus-visible { outline: 2px solid #9a3b22; outline-offset: 2px; }
    .bd { display: grid; grid-template-columns: 140px 1fr; gap: 10px; margin-top: 8px; }
    svg { width: 140px; height: 140px; overflow: visible; }
    .web { fill: none; stroke: #cfc5b2; stroke-width: .6; }
    .poly { fill: rgba(154,59,34,.1); stroke: #9a3b22; stroke-width: 1.2; stroke-linejoin: round; transform-origin: 70px 70px; animation: br 3.2s ease-in-out infinite; transition: d .4s cubic-bezier(.2,.8,.2,1); }
    .frozen .poly { animation: none; }
    @keyframes br { 50% { transform: scale(1.025) rotate(.6deg); } }
    .list { display: grid; gap: 1px; align-content: start; }
    .ax { display: flex; justify-content: space-between; align-items: baseline; border: 0; border-bottom: 1px solid #e0d7c5; background: none; padding: 2px 0; cursor: default; color: inherit;
      font: 500 7.5px 'Space Grotesk', system-ui, sans-serif; letter-spacing: .14em; text-align: left; white-space: nowrap; }
    .ax b { font: 400 13px/1 'Instrument Serif', Georgia, serif; letter-spacing: 0; min-width: 16px; text-align: right; }
    .frozen .ax { cursor: pointer; } .frozen .ax:hover { color: #9a3b22; }
    .ax.up b { color: #9a3b22; }
    .vx { fill: #9a3b22; opacity: 0; transition: opacity .3s; }
    .frozen .vx { opacity: 1; }
    .vx.hot { fill: #23201c; r: 3.5; }
    .web.hot { stroke: #9a3b22; stroke-width: 1; }
    .frozen .tab, .tab.frozen { box-shadow: inset 0 0 0 1px #fff8ea, 0 0 0 5px #1a1816, 0 0 0 6px #9a3b22, 0 8px 22px #000; }
  `,
  html: `<div class="stage"><div class="tab"><div class="hd"><span class="who"><img class="ph" src="assets/portraits/women-30.jpg" alt="" width="30" height="30" draggable="false"><span class="nm">Maeve Millay</span></span><button class="an" type="button" aria-pressed="false">ANALYSIS</button></div>
    <div class="bd"><svg viewBox="0 0 140 140">${[20, 15, 10, 5].map((v) => `<polygon class="web" points="${ATTR.map((_, i) => pt(i, v).join(',')).join(' ')}"/>`).join('')}
      ${ATTR.map((_, i) => `<line class="web" x1="70" y1="70" x2="${pt(i, 20)[0]}" y2="${pt(i, 20)[1]}"/>`).join('')}<path class="poly"/>${ATTR.map((a, i) => `<circle class="vx" r="2.2" cx="${pt(i, a[1])[0]}" cy="${pt(i, a[1])[1]}"/>`).join('')}</svg>
    <div class="list">${ATTR.map(([n, v], i) => `<button class="ax" type="button" data-i="${i}" aria-disabled="true">${n}<b>${v}</b></button>`).join('')}</div></div></div></div>`,
  init(root) {
    const st = root.querySelector('.tab'), an = root.querySelector('.an'), poly = root.querySelector('.poly'), axs = [...root.querySelectorAll('.ax')];
    const val = ATTR.map((a) => a[1]), vxs = [...root.querySelectorAll('.vx')], spokes = [...root.querySelectorAll('line.web')];
    const hot = (i) => { vxs.forEach((v, j) => v.classList.toggle('hot', i === j)); spokes.forEach((l, j) => l.classList.toggle('hot', i === j)); };
    const render = () => { const d = `M${val.map((v, i) => pt(i, v).join(' ')).join('L')}Z`; poly.setAttribute('d', d); poly.style.d = `path("${d}")`; axs.forEach((a, i) => { a.querySelector('b').textContent = val[i]; const [x, y] = pt(i, val[i]); vxs[i].setAttribute('cx', x); vxs[i].setAttribute('cy', y); }); };
    an.addEventListener('click', () => {
      const on = an.getAttribute('aria-pressed') !== 'true';
      an.setAttribute('aria-pressed', String(on)); st.classList.toggle('frozen', on); axs.forEach((a) => a.setAttribute('aria-disabled', String(!on)));
    });
    axs.forEach((a, i) => a.addEventListener('click', () => {
      if (!st.classList.contains('frozen')) return;
      val[i] = val[i] >= 20 ? 1 : val[i] + 1; a.classList.toggle('up', val[i] > ATTR[i][1]); render();
    }));
    axs.forEach((a, i) => {
      a.addEventListener('pointerenter', () => hot(i)); a.addEventListener('focus', () => hot(i));
      a.addEventListener('pointerleave', () => hot(-1)); a.addEventListener('blur', () => hot(-1));
      a.addEventListener('keydown', (e) => {
        const nav = { ArrowDown: 1, ArrowUp: -1 }[e.key];
        if (nav && axs[i + nav]) { e.preventDefault(); axs[i + nav].focus(); }
        const adj = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (adj && st.classList.contains('frozen')) { e.preventDefault(); val[i] = Math.max(1, Math.min(20, val[i] + adj)); a.classList.toggle('up', val[i] > ATTR[i][1]); render(); }
      });
    });
    render();
  },
};
