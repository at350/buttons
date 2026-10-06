// Portal (2007) — the Enrichment Center test chamber sign: big chamber number, x/19 progress, hazard pictograms lit or greyed. Click to advance.
const IC = [
  'M6 3h8v8H6zM10 13v8M7 18l3 3 3-3', 'M4 3h7v7H4zM15 9a2 2 0 1 0 0-.1M15 11v6M12 14h6M15 17l-3 4M15 17l3 4M7 12l2 3',
  'M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18', 'M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
  'M12 4a2 2 0 1 0 0 .1M12 6v6M9 9h6M3 16q2-2 4.5 0t4.5 0 4.5 0 4.5 0M3 20q2-2 4.5 0t4.5 0 4.5 0 4.5 0', 'M6 18a2 2 0 1 0 0 .1M8 16l6-6M11 10h3v3M14 10l6-6',
  'M12 3c3 0 4 3 4 7s-1 6-4 6-4-2-4-6 1-7 4-7M11 9h2M9 16l-4 5M15 16l4 5M12 16v5', 'M5 5h14v14H5zM9 9l6 6M15 9l-6 6',
];
const SETS = Array.from({ length: 20 }, (_, n) => IC.map((_, i) => ((n * 7 + i * 3 + (n >> 2) * i) % 5) < 2 || (n === 0 && i < 2)));
export default {
  id: 'sf-aperture-sign',
  credit: 'Valve Portal (2007) — Aperture Science Enrichment Center test-chamber sign: big chamber number, nn/19 progress bar and the hazard pictograms lit or greyed; click to flicker to the next chamber',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 190px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 14px; background: linear-gradient(#3b3f42, #222527); }
    .sign { display: block; width: 162px; border: 0; padding: 12px 12px 10px; border-radius: 3px; cursor: pointer; text-align: left; color: #1d1e1f;
      background: linear-gradient(#f4f4ef, #dcdcd6); box-shadow: 0 0 0 3px #9da2a5, 0 6px 14px rgba(0,0,0,.6); }
    .sign:focus-visible { outline: 2px solid #ff9a00; outline-offset: 5px; }
    .sign:hover .num { color: #000; }
    .sign.fl { animation: fl .45s steps(1); }
    @keyframes fl { 0% { filter: brightness(.3); } 20% { filter: brightness(1.1); } 40% { filter: brightness(.45); } 60% { filter: none; } }
    .top { display: flex; align-items: flex-end; justify-content: space-between; }
    .num { font: 200 72px/0.82 'Bricolage Grotesque', 'Arial Narrow', sans-serif; font-stretch: 75%; font-variation-settings: 'wdth' 75, 'opsz' 96; letter-spacing: -.02em; color: #2b2c2d; }
    .of { font: 300 15px/1 'Bricolage Grotesque', sans-serif; font-stretch: 75%; font-variation-settings: 'wdth' 75; color: #2b2c2d; padding-bottom: 2px; }
    .bar { display: flex; gap: 1px; margin: 9px 0 10px; height: 6px; }
    .bar i { flex: 1; background: #c6c6c0; } .bar i.on { background: #2b2c2d; }
    .rule { height: 1px; background: #2b2c2d; margin-bottom: 8px; }
    .ic { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; }
    .ic span { aspect-ratio: 1; border-radius: 2px; display: grid; place-items: center; background: #c9c9c3; transition: background .1s; }
    .ic span.on { background: #1d1e1f; }
    .ic svg { width: 76%; height: 76%; fill: none; stroke: #ecece6; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .ic span:not(.on) svg { stroke: #e3e3dd; }
    .ft { margin-top: 8px; display: flex; align-items: center; gap: 5px; font: 500 7px 'Space Grotesk', sans-serif; letter-spacing: .08em; color: #55585a; }
    .ft svg { width: 11px; height: 11px; }
  `,
  html: `<div class="stage"><button class="sign" type="button" aria-label="Next test chamber"><div class="top"><span class="num">00</span><span class="of">00/19</span></div>
    <div class="bar">${'<i></i>'.repeat(19)}</div><div class="rule"></div>
    <div class="ic">${IC.map((d) => `<span><svg viewBox="0 0 24 24"><path d="${d}"/></svg></span>`).join('')}</div>
    <div class="ft"><svg viewBox="-12 -12 24 24">${Array.from({ length: 8 }, (_, i) => `<path d="M2.5 -10.5 L8.2 -6.2 L3.3 -3.1 Z" fill="#55585a" transform="rotate(${i * 45})"/>`).join('')}</svg>APERTURE SCIENCE</div></button></div>`,
  init(root) {
    const s = root.querySelector('.sign'), num = root.querySelector('.num'), of = root.querySelector('.of'), bars = [...root.querySelectorAll('.bar i')], ics = [...root.querySelectorAll('.ic span')];
    let n = 0;
    const show = () => {
      const t = String(n).padStart(2, '0'); num.textContent = t; of.textContent = `${t}/19`;
      bars.forEach((b, i) => b.classList.toggle('on', i < n)); ics.forEach((x, i) => x.classList.toggle('on', SETS[n][i]));
    };
    s.addEventListener('click', () => { n = (n + 1) % 20; s.classList.remove('fl'); void s.offsetWidth; s.classList.add('fl'); show(); });
    show();
  },
};
