// Minecraft hotbar: 182x22-texel bar drawn at 2px per texel, real 16x16 item sprites (pixel maps below),
// the 24x24 white selection frame, stack counts in the white pixel font with a #3F3F3F drop shadow.
const px = (rows, pal) => {
  const d = {};
  rows.forEach((r, y) => { let x = 0; while (x < r.length) { const c = r[x]; let n = 1; while (r[x + n] === c) n++; if (pal[c]) (d[c] = d[c] || []).push(`M${x} ${y}h${n}v1h-${n}z`); x += n; } });
  return Object.entries(d).map(([c, p]) => `<path fill="${pal[c]}" d="${p.join('')}"/>`).join('');
};
const rng = (s) => () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
const field = (w, h, chars, seed) => { const r = rng(seed); return Array.from({ length: h }, () => Array.from({ length: w }, () => chars[Math.floor(r() * chars.length)]).join('')); };

const GRASS = px([
  'gGgGGgGGgGGgGgGG', 'GGgGGGgGGGgGGGgG', 'GgGGgGGGgGGGGgGG', 'GGDGGdGGGDGGdGGG', 'DGDdGDGDGDdGDGdD', 'DdDDlDDdDDDlDDdD',
  'DDlDDDdDDlDDDDDl', 'dDDDdDDDlDDdDDDD', 'DDlDDDDdDDDDlDdD', 'DdDDlDDDDdDlDDDD', 'DDDdDDlDDDDDDdDD', 'lDDDDDDdDDlDDDDl',
  'DDdDlDDDDDDDdDDD', 'DDDDDdDDlDDDDDlD', 'DlDDDDDDDDdDDDDD', 'DDDdDDlDDDDDlDDd',
], { G: '#5d9b38', g: '#7cbd4f', D: '#866043', d: '#6b4a30', l: '#9b7653' });
const SWORD = px([
  '................', '.............KKK', '............KLLK', '...........KLCK.', '..........KLCK..', '.........KLCK...',
  '........KLCK....', '...KK..KLCK.....', '...KTKKLCK......', '....KTLCK.......', '....KHTK........', '...KHKKTK.......',
  '.KKHK..KK.......', 'KHHK............', 'KHK.............', '.K..............',
], { K: '#0c2f2a', L: '#a1fbe8', C: '#2bc7ac', T: '#1a6b60', H: '#6b4a24' });
const APPLE = px([
  '................', '.......BB.......', '........B.LL....', '....RRR.BLLL....', '...RRRRRRRRR....', '..RRWRRRRRRRR...',
  '..RWWRRRRRRRR...', '..RWRRRRRRRRD...', '..RRRRRRRRRRD...', '..RRRRRRRRRDD...', '...RRRRRRRRDD...', '...RRRRRRRDDD...',
  '....RRRDDDDD....', '.....DDD.DDD....', '................', '................',
], { B: '#5a3a17', L: '#3f9c2e', R: '#dd2a2a', W: '#ff9b9b', D: '#9c1515' });
const TORCH = px([
  '................', '................', '................', '.......Y........', '......YWY.......', '......YWWY......',
  '.......OO.......', '.......BB.......', '.......BB.......', '.......bB.......', '.......BB.......', '.......bB.......',
  '.......BB.......', '.......bB.......', '................', '................',
], { W: '#fffbc2', Y: '#ffd83a', O: '#e98a1e', B: '#8a6435', b: '#5c4120' });
const COBBLE = px(field(16, 16, 'aabbbccd', 11), { a: '#7d7d7d', b: '#6b6b6b', c: '#9a9a9a', d: '#4f4f4f' });
const PLANKS = px(Array.from({ length: 16 }, (_, y) => (y % 4 === 3 ? 'ssssssssssssssss' : field(16, 1, 'ppppqr', 20 + y)[0].replace(/^(.{7})./, y % 8 < 4 ? '$1s' : '$1p'))), { p: '#a2834f', q: '#b8945f', r: '#8f7445', s: '#6b5634' });
const BREAD = px([
  '................', '................', '................', '................', '.....kkkkk......', '...kkTTTTTkk....',
  '..kTTtTTtTTTk...', '.kTTTTtTTtTTk...', '.kTtTTTTTTTTTk..', '.kTTTTTTTTTTTTk.', '.kTTTTTTTTTTTTk.', '..kBBBBBBBBBBBk.',
  '...kkkkkkkkkkk..', '................', '................', '................',
], { k: '#5a3613', T: '#c78a3c', t: '#e3ad5f', B: '#9a6327' });
const ITEMS = [[GRASS, 64, 'Grass Block'], [SWORD, 1, 'Diamond Sword'], [COBBLE, 32, 'Cobblestone'], [TORCH, 16, 'Torch'], [APPLE, 7, 'Apple'], [PLANKS, 48, 'Oak Planks'], [BREAD, 12, 'Bread'], null, null];
const SKY = px(field(32, 4, 'gggGG', 5).map((r, y) => (y === 0 ? r : r.replace(/G/g, 'g'))).concat(field(32, 4, 'DDDdl', 9)), { G: '#5d9b38', g: '#7cbd4f', D: '#866043', d: '#6b4a30', l: '#9b7653' });

const slots = ITEMS.map((it, i) => `<button class="slot" type="button" role="radio" aria-checked="${i === 0}" aria-label="${it ? it[2] : 'Empty slot ' + (i + 1)}">${it ? `<svg class="it" viewBox="0 0 16 16" shape-rendering="crispEdges">${it[0]}</svg>${it[1] > 1 ? `<span class="cnt">${it[1]}</span>` : ''}` : ''}</button>`).join('');

export default {
  id: 'gm-minecraft-slot',
  credit: 'Mojang Minecraft — the 9-slot hotbar with real item sprites; click (or press 1–9) to move the white selection frame, the item name pops above',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; padding: 34px 14px 30px; border-radius: 12px; overflow: hidden; background: linear-gradient(#78a7ff, #a9c6ff); image-rendering: pixelated; }
    .ground { position: absolute; left: 0; bottom: 0; width: 100%; height: 16px; }
    .name { position: absolute; left: 0; right: 0; top: 9px; text-align: center; color: #fff; font: 500 13px/16px 'JetBrains Mono', ui-monospace, monospace; text-shadow: 2px 2px 0 #3f3f3f; -webkit-font-smoothing: none; white-space: nowrap; pointer-events: none; }
    .name.fade { animation: nm 1.6s steps(8) forwards; }
    @keyframes nm { 0%, 60% { opacity: 1; } 100% { opacity: 0; } }
    .bar { position: relative; display: flex; padding: 2px; background: #000; box-shadow: 0 0 0 0 transparent; }
    .slot { position: relative; width: 40px; height: 40px; border: none; padding: 0; margin: 0; cursor: pointer; border-radius: 0;
      background: rgba(48,48,48,.78); box-shadow: inset 2px 2px 0 #8b8b8b, inset -2px -2px 0 #565656; }
    .it { position: absolute; left: 4px; top: 4px; width: 32px; height: 32px; }
    .slot:hover::before { content: ""; position: absolute; left: 4px; top: 4px; width: 32px; height: 32px; background: rgba(255,255,255,.5); z-index: 2; }
    .slot:focus-visible { outline: none; }
    .slot:focus-visible::before { content: ""; position: absolute; left: 4px; top: 4px; width: 32px; height: 32px; background: rgba(255,255,160,.35); z-index: 2; }
    .cnt { position: absolute; right: 2px; bottom: 0; z-index: 3; color: #fff; font: 600 13px/14px 'JetBrains Mono', ui-monospace, monospace; text-shadow: 2px 2px 0 #3f3f3f; -webkit-font-smoothing: none; }
    .sel { position: absolute; left: -2px; top: -2px; width: 48px; height: 48px; pointer-events: none; z-index: 4;
      box-shadow: inset 0 0 0 2px #000, inset 0 0 0 4px #fff, inset 0 0 0 6px #a0a0a0; transform: translateX(calc(var(--i, 0) * 40px)); }
  `,
  html: `
    <div class="stage">
      <svg class="ground" viewBox="0 0 32 8" preserveAspectRatio="none" shape-rendering="crispEdges" aria-hidden="true">${SKY}</svg>
      <div class="name">Grass Block</div>
      <div class="bar" role="radiogroup" aria-label="Hotbar">${slots}<span class="sel"></span></div>
    </div>`,
  init(root) {
    const bar = root.querySelector('.bar'), selEl = root.querySelector('.sel'), name = root.querySelector('.name');
    const slotEls = [...bar.querySelectorAll('.slot')];
    const sel = (i) => {
      slotEls.forEach((s, j) => s.setAttribute('aria-checked', String(i === j)));
      selEl.style.setProperty('--i', i);
      const it = ITEMS[i]; name.textContent = it ? it[2] : ''; name.classList.remove('fade'); void name.offsetWidth; if (it) name.classList.add('fade');
    };
    slotEls.forEach((s, i) => s.addEventListener('click', () => sel(i)));
    bar.addEventListener('keydown', (e) => { const n = Number(e.key); if (n >= 1 && n <= 9) { e.preventDefault(); sel(n - 1); slotEls[n - 1].focus(); } });
  },
};
