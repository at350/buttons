// District 9 (2009) — prawn bio-tech: glyph pods around Christopher's black fluid canister. Light three glyphs and the command module wakes.
const GLY = ['M5 18c2-9 5-13 8-7s3 9 6 3', 'M6 6c6 0 9 3 9 7s-5 5-7 2 2-7 8-7', 'M12 4v6c0 4-6 4-6 8M12 10c0 4 6 4 6 8', 'M4 12c3-5 6 5 9 0s4-6 7-2', 'M7 5l5 6-5 8M17 5l-5 6 5 8', 'M6 17c0-6 3-11 6-11s6 5 6 11M9 13h6'];
export default {
  id: 'sf-prawn-tech',
  credit: 'District 9 (2009, Weta / Image Engine) — "prawn" bio-tech console: organic glyph pods around Christopher Johnson\'s black fluid canister; light three glyphs and the module wakes, the fluid rises and the glyph ring turns',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 250px; height: 230px; max-width: 100%; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 50% 50%, #2a2618 0 30%, #17140d 60%, #0b0906), #0b0906; }
    .stage::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 20% 80%, rgba(120,70,30,.35), transparent 40%), radial-gradient(circle at 85% 15%, rgba(110,80,40,.3), transparent 40%); }
    .ring { position: absolute; left: 50%; top: 50%; width: 196px; height: 196px; margin: -98px; border-radius: 50%; border: 2px dashed rgba(170,190,90,.2); transition: border-color .4s; }
    .on .ring { border-color: rgba(190,255,120,.55); animation: sp 9s linear infinite; }
    @keyframes sp { to { transform: rotate(360deg); } }
    .g { position: absolute; left: calc(50% + var(--x)); top: calc(50% + var(--y)); width: 40px; height: 40px; margin: -20px; border: 0; padding: 0; cursor: pointer;
      border-radius: 48% 52% 44% 56% / 55% 45% 55% 45%; background: radial-gradient(circle at 40% 35%, #4b4630, #1c1a10 70%); box-shadow: inset 0 0 0 2px #0d0c07, inset 0 2px 4px rgba(255,255,200,.12), 0 3px 6px #000;
      color: #58613a; display: grid; place-items: center; transition: color .2s, box-shadow .2s; }
    .g svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .g:hover { color: #8e9a5a; }
    .g[aria-pressed="true"] { color: #d8ff7a; box-shadow: inset 0 0 0 2px #0d0c07, inset 0 0 14px rgba(190,255,90,.5), 0 0 14px rgba(190,255,90,.45); }
    .g[aria-pressed="true"] svg { filter: drop-shadow(0 0 3px #b8ff5a); }
    .g:focus-visible, .can:focus-visible { outline: 2px solid #d8ff7a; outline-offset: 2px; }
    /* the pulse dims the dot with opacity (on the near-black console that reads as brightness(.5), without a filter pass every frame);
       it runs on ::before so the node keeps its own .25 / 1 opacity */
    .node { position: absolute; width: 6px; height: 6px; opacity: .25; }
    .node::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: #9fd64a; box-shadow: 0 0 6px #9fd64a; animation: nd 2.6s ease-in-out infinite; animation-delay: calc(var(--d) * -1s); }
    .on .node { opacity: 1; }
    @keyframes nd { 50% { transform: scale(.5); opacity: .5; } }
    .vein { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; stroke: rgba(110,80,40,.5); stroke-width: 2; stroke-linecap: round; transition: stroke .5s; }
    .on .vein { stroke: rgba(160,220,90,.35); }
    .can.ej { animation: ej .9s cubic-bezier(.3,0,.2,1); }
    @keyframes ej { 40% { transform: translateY(-26px) scale(1.06); box-shadow: 0 18px 20px #000, 0 0 18px #5aa8ff; } }
    .can { position: absolute; left: 50%; top: 50%; width: 36px; height: 80px; margin: -40px -18px; border: 0; padding: 0; cursor: pointer; border-radius: 10px;
      background: linear-gradient(90deg, #3d4148, #a6acb4 30%, #e2e6ea 42%, #7a8088 60%, #2c2f34); box-shadow: 0 6px 12px #000; }
    .can::before, .can::after { content: ''; position: absolute; left: -3px; right: -3px; height: 9px; border-radius: 4px; background: linear-gradient(90deg, #2a2c30, #8c9198 40%, #2a2c30); }
    .can::before { top: -2px; } .can::after { bottom: -2px; }
    .win { position: absolute; left: 9px; right: 9px; top: 14px; bottom: 14px; border-radius: 6px; overflow: hidden; background: #050607; box-shadow: inset 0 0 0 1px #000; }
    .fl { position: absolute; left: 0; right: 0; bottom: 0; height: 18%; background: linear-gradient(#5aa8ff, #0a1a3a 30%, #000); transition: height 1.4s cubic-bezier(.3,0,.2,1), box-shadow .4s; }
    .on .fl { height: 92%; box-shadow: 0 0 10px #5aa8ff; }
    .fl::after { content: ''; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 30%, rgba(170,210,255,.35) 45%, transparent 55%); animation: sh 2.4s linear infinite; }
    @keyframes sh { from { transform: translateY(40%); } to { transform: translateY(-80%); } }
  `,
  html: `<div class="stage"><svg class="vein" viewBox="0 0 250 230"><path d="M0 40c40 10 60 40 90 50M250 190c-40-6-60-30-92-40M30 230c10-30 40-50 70-60M220 0c-10 30-30 50-62 62M0 150c30-4 50 6 72 0"/></svg><div class="ring"></div>
    ${[[24, 30, 0], [222, 60, .7], [40, 196, 1.3], [210, 200, 2], [128, 14, .4], [130, 216, 1.7]].map(([x, y, d]) => `<i class="node" style="left:${x}px;top:${y}px;--d:${d}"></i>`).join('')}
    ${GLY.map((d, i) => { const a = (i / 6) * Math.PI * 2 - Math.PI / 2; return `<button class="g" type="button" aria-pressed="false" aria-label="Glyph ${i + 1}" style="--x:${(Math.cos(a) * 80).toFixed(1)}px;--y:${(Math.sin(a) * 80).toFixed(1)}px"><svg viewBox="0 0 24 24"><path d="${d}"/></svg></button>`; }).join('')}
    <button class="can" type="button" aria-label="Fluid canister" aria-pressed="false"><span class="win"><span class="fl"></span></span></button></div>`,
  init(root) {
    const st = root.querySelector('.stage'), gs = [...root.querySelectorAll('.g')], can = root.querySelector('.can');
    const sync = () => { const on = gs.filter((g) => g.getAttribute('aria-pressed') === 'true').length >= 3; st.classList.toggle('on', on); can.setAttribute('aria-pressed', String(on)); };
    gs.forEach((g) => g.addEventListener('click', () => { g.setAttribute('aria-pressed', String(g.getAttribute('aria-pressed') !== 'true')); sync(); }));
    let to = 0;
    can.addEventListener('click', () => {
      clearTimeout(to);
      if (!st.classList.contains('on')) { can.classList.remove('ej'); void can.offsetWidth; can.classList.add('ej'); to = setTimeout(() => can.classList.remove('ej'), 900); return; }
      can.classList.remove('ej'); void can.offsetWidth; can.classList.add('ej');
      to = setTimeout(() => { can.classList.remove('ej'); gs.forEach((g) => g.setAttribute('aria-pressed', 'false')); sync(); }, 900);
    });
    gs.forEach((g, i) => g.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (d) { e.preventDefault(); gs[(i + d + gs.length) % gs.length].focus(); }
    }));
    return () => clearTimeout(to);
  },
};
