const MODES = [
  ['All-Purpose', 10.9, '<svg viewBox="0 0 24 24"><path d="M4 19l4 -14"/><path d="M16 5l4 14"/><path d="M12 8v-2"/><path d="M12 13v-2"/><path d="M12 18v-2"/></svg>'],
  ['Conserve', 9.9, '<svg viewBox="0 0 24 24"><path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"/><path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"/></svg>'],
  ['Sport', 7.9, '<svg viewBox="0 0 24 24"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>'],
  ['All-Terrain', 14.9, '<svg viewBox="0 0 24 24"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>'],
  ['Snow', 10.9, '<svg viewBox="0 0 24 24"><path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="m14 20 1.25-2.5L18 18"/><path d="m14 4 1.25 2.5L18 6"/><path d="m17 21-3-6h-4"/><path d="m17 3-3 6 1.5 3"/><path d="M2 12h6.5L10 9"/><path d="m20 10-1.5 2 1.5 2"/><path d="M22 12h-6.5L14 15"/><path d="m4 10 1.5 2L4 14"/><path d="m7 21 3-6-1.5-3"/><path d="m7 3 3 6h4"/></svg>'],
  ['Towing', 10.9, '<svg class="f" viewBox="0 -960 960 960"><path d="M40-298v-60q0-13 8.5-21.5T70-388h410L100-682v117q0 13-8.5 21.5T70-535q-13 0-21.5-8.5T40-565v-166q0-17 14.5-26t29.5-1l470 259v-271q0-13 8.5-21.5T584-800h108q14 0 26 5.5t20 16.5l168 201q7 8 10.5 18t3.5 21v240q0 13-8.5 21.5T890-268h-67q0 45-31.5 76.5T715-160q-45 0-76.5-31.5T607-268H349q0 45-31.5 76.5T241-160q-45 0-76.5-31.5T133-268H70q-13 0-21.5-8.5T40-298Zm247 76q19-19 19-46t-19-46q-19-19-46-19t-46 19q-19 19-19 46t19 46q19 19 46 19t46-19Zm474 0q19-19 19-46t-19-46q-19-19-46-19t-46 19q-19 19-19 46t19 46q19 19 46 19t46-19ZM614-560h228L692-740h-78v180Z"/></svg>'],
];

export default {
  id: 'au-rivian-drive-modes',
  credit: 'Rivian R1T / R1S — drive mode selector on the charcoal-and-amber UI; the truck rises and drops to each mode\'s ride height',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; gap: 12px; width: 340px; max-width: 100%; padding: 12px; border-radius: 12px; background: #1d1f1b; color: #e9e6dc; font: 500 13px/1 'DM Sans', system-ui, sans-serif; }
    .list { display: grid; gap: 3px; flex: none; width: 132px; }
    .m { position: relative; display: flex; align-items: center; gap: 9px; height: 30px; padding: 0 10px; border: 0; border-radius: 6px; background: transparent; color: #a3a99a; font: inherit; text-align: left; cursor: pointer; white-space: nowrap; transition: background .2s, color .2s; }
    .m::before { content: ''; position: absolute; left: 0; top: 7px; bottom: 7px; width: 3px; border-radius: 2px; background: #ffad00; transform: scaleY(0); transition: transform .25s cubic-bezier(.2,0,0,1); }
    .m:hover { background: #262923; color: #e9e6dc; }
    .m[aria-checked="true"] { background: #2b2e27; color: #ffad00; }
    .m[aria-checked="true"]::before { transform: none; }
    .m:focus-visible { outline: 2px solid #ffad00; outline-offset: -2px; }
    .m svg { width: 16px; height: 16px; flex: none; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .m svg.f { fill: currentColor; stroke: none; }
    .view { position: relative; flex: 1; min-width: 0; border-radius: 8px; background: linear-gradient(#24271f, #1a1c18); overflow: hidden; }
    .name { position: absolute; left: 12px; top: 12px; font: 600 15px/1 'DM Sans', system-ui, sans-serif; color: #f4f1e8; }
    .ht { position: absolute; left: 12px; top: 34px; color: #8d9584; font-size: 12px; font-variant-numeric: tabular-nums; }
    .ht b { color: #ffad00; font-weight: 600; font-size: 20px; margin-right: 3px; }
    .truck { position: absolute; left: 4px; right: 4px; bottom: 6px; width: calc(100% - 8px); height: 88px; }
    .body { transition: transform .9s cubic-bezier(.34,1.3,.5,1); }
    .body path { fill: #3a3f35; stroke: #6e7765; stroke-width: 1; }
    .body .win { fill: #1a1c18; stroke: none; }
    .body .lb { fill: #fff6d8; stroke: none; filter: drop-shadow(0 0 3px #fff3c4); }
    .wh { fill: #111; stroke: #4c5245; stroke-width: 3; }
    .hub { fill: #6e7765; }
    .gnd { stroke: #4c5245; stroke-width: 1.5; stroke-dasharray: 4 4; }
    .arrow { stroke: #ffad00; stroke-width: 1.5; fill: none; transition: transform .9s cubic-bezier(.34,1.3,.5,1); }
  `,
  html: `
    <div class="stage">
      <div class="list" role="radiogroup" aria-label="Drive mode">${MODES.map(([n, , ic], i) => `<button class="m" type="button" role="radio" aria-checked="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${ic}${n}</button>`).join('')}</div>
      <div class="view">
        <div class="name">All-Purpose</div>
        <div class="ht"><b>10.9</b>in</div>
        <svg class="truck" viewBox="0 0 170 88" aria-hidden="true">
          <line class="gnd" x1="0" y1="84" x2="170" y2="84"/>
          <g class="body">
            <path d="M8 33h50V22q0-4 4-4h30q3 0 6 2l17 17 26 3q8 1 8 8v12q0 4-4 4H12q-4 0-4-4z"/><path d="M12 38h42" fill="none"/>
            <path class="win" d="M63 23h23v13H63zM90 23h9q2 0 4 2l11 11H90z"/>
            <rect class="lb" x="160" y="44" width="4" height="7" rx="2"/>
          </g>
          <circle class="wh" cx="38" cy="70" r="12"/><circle class="hub" cx="38" cy="70" r="4"/>
          <circle class="wh" cx="134" cy="70" r="12"/><circle class="hub" cx="134" cy="70" r="4"/>
        </svg>
      </div>
    </div>`,
  init(root) {
    const btns = [...root.querySelectorAll('.m')], body = root.querySelector('.body'), name = root.querySelector('.name'), ht = root.querySelector('.ht b');
    const pick = (i) => {
      btns.forEach((b, j) => { b.setAttribute('aria-checked', String(i === j)); b.tabIndex = i === j ? 0 : -1; });
      const [n, h] = MODES[i];
      name.textContent = n; ht.textContent = h.toFixed(1);
      body.style.transform = `translateY(${((10.9 - h) * 2.2).toFixed(1)}px)`;
    };
    btns.forEach((b, i) => {
      b.addEventListener('click', () => pick(i));
      b.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
        if (d) { e.preventDefault(); const n = (i + d + btns.length) % btns.length; pick(n); btns[n].focus(); }
      });
    });
  },
};
