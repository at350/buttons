// Oblivion (2013) — Vika's Tower 49 glass desk (GMUNK / Bradley Munkowitz, Joseph Kosinski): drone radar with orbiting units, the list on the right selects and tracks one.
const DRONES = [['166', 58, 22, 'OPERATIONAL'], ['172', 38, 14, 'OPERATIONAL'], ['190', 74, 30, 'REPAIR'], ['237', 50, 0, 'OFFLINE']];
export default {
  id: 'sf-oblivion-tower',
  credit: 'Oblivion (2013) — Tower 49 light-table UI by Bradley "GMUNK" Munkowitz: hairline radar with orbiting drones and Jack\'s Bubbleship; pick a drone on the right to lock and track it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 330px; max-width: 100%; height: 200px; border-radius: 12px; overflow: hidden; padding: 14px; background: radial-gradient(120% 120% at 30% 40%, #0d1a22, #020507 70%);
      display: grid; grid-template-columns: 172px 1fr; gap: 12px; font-family: 'Space Grotesk', system-ui, sans-serif; color: #e9f6ff; }
    .map { position: relative; width: 172px; height: 172px; border-radius: 50%; overflow: hidden; background: repeating-radial-gradient(circle, transparent 0 21px, rgba(200,235,255,.22) 21px 22px),
      conic-gradient(from 0deg, rgba(200,235,255,.06) 0 1deg, transparent 1deg 30deg); background-size: auto, auto; box-shadow: inset 0 0 0 1px rgba(200,235,255,.5); }
    .map::before, .map::after { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background: rgba(200,235,255,.25); }
    .map::after { transform: rotate(90deg); }
    .sweep { position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from 0deg, rgba(110,200,255,.28), transparent 60deg); animation: sp 4s linear infinite; }
    .o { position: absolute; left: 50%; top: 50%; width: 0; height: 0; animation: sp var(--s) linear infinite; animation-delay: calc(var(--d) * 1s); }
    .o i { position: absolute; left: var(--r); top: -3px; width: 6px; height: 6px; margin-left: -3px; border-radius: 50%; background: #e9f6ff; box-shadow: 0 0 6px #8fd3ff; }
    .o i::after { content: ''; position: absolute; inset: -6px; border-radius: 50%; border: 1px solid #fff; opacity: 0; transform: scale(.4); transition: opacity .2s, transform .3s cubic-bezier(.2,.9,.3,1.3); }
    .o.sel i::after { opacity: 1; transform: none; }
    .o.off i { background: #ff5a3c; box-shadow: 0 0 6px #ff5a3c; }
    .o.off { animation: none; }
    .ship { position: absolute; left: 50%; top: 50%; width: 10px; height: 10px; margin: -5px; clip-path: polygon(50% 0, 100% 100%, 50% 75%, 0 100%); background: #fff; transform: rotate(35deg) translate(0, -20px); }
    @keyframes sp { to { transform: rotate(360deg); } }
    .list { display: grid; align-content: start; gap: 5px; }
    .hd { font: 500 8px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .2em; opacity: .6; margin-bottom: 2px; white-space: nowrap; }
    .d { display: flex; justify-content: space-between; align-items: center; height: 24px; padding: 0 8px; border: 1px solid rgba(200,235,255,.25); border-radius: 2px; background: rgba(140,200,255,.04);
      color: inherit; cursor: pointer; font: 300 11px 'Space Grotesk', system-ui, sans-serif; letter-spacing: .12em; white-space: nowrap; transition: background .15s, border-color .15s; }
    .d:hover { background: rgba(140,200,255,.12); border-color: rgba(200,235,255,.6); }
    .d[aria-pressed="true"] { background: #e9f6ff; color: #04121b; border-color: #fff; font-weight: 500; }
    .d .dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
    .d.off .dot { background: #ff5a3c; }
    .d:focus-visible { outline: 1px solid #8fd3ff; outline-offset: 2px; }
    .st { margin-top: 4px; font: 500 8px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: .14em; white-space: nowrap; color: #8fd3ff; }
    .st.off { color: #ff5a3c; }
  `,
  html: `<div class="stage"><div class="map"><div class="sweep"></div>
    ${DRONES.map(([n, r, s], i) => `<div class="o${i === 3 ? ' off' : ''}" style="--r:${r}px;--s:${s}s;--d:${s ? (-(i * 97 + 40) / 360) * s : 0};transform:rotate(${i * 97 + 40}deg)" data-n="${n}"><i></i></div>`).join('')}<div class="ship"></div></div>
    <div class="list"><div class="hd">TOWER 49 · DRONES</div>
    ${DRONES.map(([n], i) => `<button class="d${i === 3 ? ' off' : ''}" type="button" aria-pressed="${i === 0}" data-n="${n}">DRONE ${n}<span class="dot"></span></button>`).join('')}
    <div class="st">166 · OPERATIONAL</div></div></div>`,
  init(root) {
    const bs = [...root.querySelectorAll('.d')], os = [...root.querySelectorAll('.o')], st = root.querySelector('.st');
    const pick = (i) => {
      bs.forEach((b, j) => b.setAttribute('aria-pressed', String(i === j)));
      os.forEach((o, j) => o.classList.toggle('sel', i === j));
      st.textContent = `${DRONES[i][0]} · ${DRONES[i][3]}`; st.classList.toggle('off', i === 3);
    };
    bs.forEach((b, i) => b.addEventListener('click', () => pick(i)));
    pick(0);
  },
};
