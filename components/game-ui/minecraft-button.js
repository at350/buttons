// Minecraft (Java 1.20+) title-screen widgets: 1 texel = 2px, stone noise texture, black outline that turns
// white on hover/focus, bevel highlight top-left and shade bottom-right, #E0E0E0 label with a 1-texel #383838 shadow.
const rng = (s) => () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
const noise = (w, h, cols, seed) => {
  const r = rng(seed), by = {};
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const c = cols[Math.floor(r() * cols.length)]; (by[c] = by[c] || []).push(`M${x} ${y}h1v1h-1z`); }
  return Object.entries(by).map(([c, d]) => `<path fill="${c}" d="${d.join('')}"/>`).join('');
};
const STONE = noise(16, 16, ['#6f6f6f', '#6f6f6f', '#6f6f6f', '#747474', '#6a6a6a', '#787878', '#666666', '#717171'], 7);
const DIRT = noise(16, 16, ['#3b2a1f', '#3b2a1f', '#33241a', '#423024', '#2c1f16', '#3f2d21'], 3);
const TEX = '<svg class="tex" aria-hidden="true"><rect width="100%" height="100%" fill="url(#st)"/></svg>';

export default {
  id: 'gm-minecraft-button',
  credit: 'Mojang Minecraft (Java Edition) — title-screen stone buttons on the dirt background: 2px texels, black outline that turns white on hover, yellow label',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; padding: 18px 20px; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; gap: 8px; background: #3b2a1f; }
    .bg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .mc { position: relative; width: 240px; height: 40px; border: none; padding: 0; cursor: pointer; background: #000; border-radius: 0;
      color: #e0e0e0; font: 500 14px/1 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 0; text-shadow: 2px 2px 0 #383838;
      -webkit-font-smoothing: none; font-smooth: never; image-rendering: pixelated; }
    .mc .tex { position: absolute; left: 2px; top: 2px; width: calc(100% - 4px); height: calc(100% - 4px); }
    .mc::after { content: ""; position: absolute; inset: 2px; box-shadow: inset 2px 2px 0 rgba(255,255,255,.32), inset -2px -4px 0 rgba(0,0,0,.42); pointer-events: none; }
    .mc .l { position: relative; z-index: 1; display: block; padding-bottom: 2px; white-space: nowrap; }
    .mc:hover, .mc:focus-visible, .mc.on { background: #fff; color: #ffffa0; text-shadow: 2px 2px 0 #3f3f28; outline: none; }
    .mc.dis, .mc.dis:hover { cursor: default; background: #000; color: #a0a0a0; text-shadow: 2px 2px 0 #282828; }
    .mc.dis .tex { opacity: .3; }
    .mc.dis::after { box-shadow: none; }
    .pair { display: flex; gap: 8px; width: 240px; }
    .pair .mc { width: 116px; }
  `,
  html: `
    <div class="stage">
      <svg class="bg" aria-hidden="true"><defs>
        <pattern id="st" width="32" height="32" patternUnits="userSpaceOnUse"><g transform="scale(2)" shape-rendering="crispEdges">${STONE}</g></pattern>
        <pattern id="dt" width="64" height="64" patternUnits="userSpaceOnUse"><g transform="scale(4)" shape-rendering="crispEdges">${DIRT}</g></pattern>
      </defs><rect width="100%" height="100%" fill="url(#dt)"/></svg>
      <button class="mc" type="button" aria-pressed="false">${TEX}<span class="l">Singleplayer</span></button>
      <button class="mc" type="button" aria-pressed="false">${TEX}<span class="l">Multiplayer</span></button>
      <button class="mc dis" type="button" aria-disabled="true">${TEX}<span class="l">Minecraft Realms</span></button>
      <div class="pair">
        <button class="mc" type="button" aria-pressed="false">${TEX}<span class="l">Options...</span></button>
        <button class="mc" type="button" aria-pressed="false">${TEX}<span class="l">Quit Game</span></button>
      </div>
    </div>`,
  init(root) {
    const btns = [...root.querySelectorAll('.mc:not(.dis)')];
    btns.forEach((b) => b.addEventListener('click', () => btns.forEach((o) => { const on = o === b && !o.classList.contains('on'); o.classList.toggle('on', on); o.setAttribute('aria-pressed', String(on)); })));
  },
};
