// Severance (Apple TV+) — Lumon Macrodata Refinement: numbers swell under the cursor, the scary ones twitch; click them to bin them.
const COLS = 14, ROWS = 6, FILES = ['Cold Harbor', 'Siena', 'Tumwater', 'Dranesville', 'Allentown'];
export default {
  id: 'sf-lumon-mdr',
  credit: 'Severance (Apple TV+) — Lumon Macrodata Refinement terminal: digits swell under the cursor, the scary cluster wiggles; click it and the numbers fly into a bin, the bin lid flaps and the file creeps toward 100%',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 320px; height: 236px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 10px 12px; background: radial-gradient(ellipse at 50% 40%, #0b1f33, #020914 75%);
      color: #a8e5ff; font-family: 'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace; text-shadow: 0 0 5px rgba(120,210,255,.55); }
    .stage::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, rgba(0,0,0,.18) 0 1px, transparent 1px 3px); box-shadow: inset 0 0 40px rgba(0,0,0,.8); }
    .hd { display: flex; align-items: center; justify-content: space-between; height: 24px; padding: 0 8px; border: 1px solid #a8e5ff; font-size: 11px; }
    .hd svg { width: 34px; height: 18px; fill: none; stroke: #a8e5ff; stroke-width: 1.2; }
    .pc { font-variant-numeric: tabular-nums; }
    .grid { position: relative; height: 128px; margin: 6px 0; border-top: 1px solid rgba(168,229,255,.5); border-bottom: 1px solid rgba(168,229,255,.5); outline: none;
      display: grid; grid-template-columns: repeat(${COLS}, 1fr); grid-template-rows: repeat(${ROWS}, 1fr); align-items: center; justify-items: center; cursor: default; }
    .grid:focus-visible { background: rgba(168,229,255,.06); }
    .grid span { font-size: 12px; line-height: 1; transform: scale(1); transition: transform .12s ease-out, opacity .5s; } /* identity, not none: hover scaling stays a transform-only change (no relayout) with no permanent layer */
    .grid span.bad { animation: wig .5s ease-in-out infinite alternate; cursor: pointer; }
    .grid span.bad:nth-child(odd) { animation-duration: .37s; }
    @keyframes wig { from { translate: -.6px -.4px; } to { translate: .7px .5px; } }
    .grid span.fly { transition: transform .7s cubic-bezier(.5,0,.75,0), opacity .7s ease-in; opacity: 0; animation: none; }
    .bins { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
    .bin { position: relative; text-align: center; font-size: 10px; }
    .bin b { display: block; position: relative; border: 1px solid #a8e5ff; height: 16px; line-height: 15px; font-weight: 400; }
    .bin b::before { content: ''; position: absolute; left: -1px; right: -1px; top: -1px; height: 4px; border: 1px solid #a8e5ff; background: #061424; transform-origin: 0 0; transition: transform .25s; }
    .bin.open b::before { transform: rotate(-35deg); }
    .bin i { display: block; height: 5px; margin-top: 3px; border: 1px solid rgba(168,229,255,.7); }
    .bin i::after { content: ''; display: block; height: 100%; width: var(--p, 0%); background: #a8e5ff; transition: width .4s; }
    .ft { margin-top: 5px; font-size: 8px; letter-spacing: .1em; text-align: center; opacity: .7; }
  `,
  html: `<div class="stage"><div class="hd"><span class="fn">Cold Harbor</span><span class="pc">0% Complete</span><svg viewBox="0 0 34 18"><ellipse cx="17" cy="9" rx="15" ry="7.5"/><ellipse cx="17" cy="9" rx="7" ry="7.5"/><path d="M2 9h30M17 1.5v15"/></svg></div>
    <div class="grid" tabindex="0" role="button" aria-label="Refine">${'<span></span>'.repeat(COLS * ROWS)}</div>
    <div class="bins">${[1, 2, 3, 4, 5].map((n) => `<div class="bin"><b>0${n}</b><i></i></div>`).join('')}</div><div class="ft">0x15E4A2 : 0x6B0B47</div></div>`,
  init(root) {
    const g = root.querySelector('.grid'), cells = [...g.children], bins = [...root.querySelectorAll('.bin')], pc = root.querySelector('.pc'), fn = root.querySelector('.fn');
    const fill = [0, 0, 0, 0, 0]; let done = 0, file = 0, busy = false, tms = [];
    const roll = () => {
      cells.forEach((c) => { c.textContent = Math.floor(Math.random() * 10); c.className = ''; c.style.transform = ''; });
      const r0 = Math.floor(Math.random() * (ROWS - 1)), c0 = Math.floor(Math.random() * (COLS - 2));
      for (const [dr, dc] of [[0, 0], [0, 1], [1, 0], [1, 1], [0, 2], [1, 2]]) if (Math.random() > .2 || !dr) cells[(r0 + dr) * COLS + c0 + dc].classList.add('bad');
    };
    const mag = (x, y) => {
      for (const c of cells) {
        if (c.classList.contains('fly')) continue;
        const r = c.getBoundingClientRect(), d = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y), k = Math.max(0, 1 - d / 46);
        c.style.transform = k ? `scale(${(1 + k * k * 1.3).toFixed(2)})` : '';
      }
    };
    g.addEventListener('pointermove', (e) => mag(e.clientX, e.clientY));
    g.addEventListener('pointerleave', () => cells.forEach((c) => { if (!c.classList.contains('fly')) c.style.transform = ''; }));
    const refine = () => {
      if (busy) return; busy = true;
      const bad = cells.filter((c) => c.classList.contains('bad')), bi = fill.indexOf(Math.min(...fill)), bin = bins[bi], br = bin.getBoundingClientRect();
      bin.classList.add('open');
      bad.forEach((c) => { const r = c.getBoundingClientRect(); c.classList.add('fly'); c.style.transform = `translate(${br.left + br.width / 2 - r.left - r.width / 2}px, ${br.top - r.top}px) scale(.5)`; });
      tms.push(setTimeout(() => {
        fill[bi] = Math.min(100, fill[bi] + 20); bin.querySelector('i').style.setProperty('--p', `${fill[bi]}%`); bin.classList.remove('open');
        file = Math.round(fill.reduce((a, b) => a + b, 0) / 5); pc.textContent = `${file}% Complete`;
        if (file >= 100) { done = (done + 1) % FILES.length; fill.fill(0); bins.forEach((b) => b.querySelector('i').style.setProperty('--p', '0%')); fn.textContent = FILES[done]; pc.textContent = '0% Complete'; }
        roll(); busy = false;
      }, 760));
    };
    g.addEventListener('click', (e) => { if (e.target.classList && e.target.classList.contains('bad')) refine(); });
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); refine(); } });
    roll();
    return () => tms.forEach(clearTimeout);
  },
};
