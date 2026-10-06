export default {
  id: 'gm-survivors-chest',
  credit: 'poncle Vampire Survivors — the pixel treasure chest: click to open, the lid flips, light beams out and an item pops up; click again to close',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; background: radial-gradient(circle at 50% 70%, #3a2a4a, #15101f 70%); padding: 26px 36px 18px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 10px; overflow: hidden; }
    .beam { position: absolute; left: 50%; bottom: 52px; width: 0; height: 0; border-left: 60px solid transparent; border-right: 60px solid transparent; border-bottom: 150px solid rgba(255,230,120,.22); transform: translateX(-50%) rotate(180deg); transform-origin: 50% 0; opacity: 0; transition: opacity .3s; pointer-events: none; }
    .open .beam { opacity: 1; animation: sway 1.6s ease-in-out infinite alternate; }
    @keyframes sway { from { transform: translateX(-50%) rotate(176deg) scaleX(.9); } to { transform: translateX(-50%) rotate(184deg) scaleX(1.1); } }
    .chest { position: relative; width: 72px; height: 56px; border: none; padding: 0; background: none; cursor: pointer; image-rendering: pixelated; }
    .chest svg { width: 100%; height: 100%; shape-rendering: crispEdges; overflow: visible; }
    .chest:focus-visible { outline: 3px solid #ffe678; outline-offset: 4px; }
    .lid { transform-box: fill-box; transform-origin: 50% 0%; transition: transform .35s cubic-bezier(.3,1.4,.5,1); }
    .open .lid { transform: scaleY(-.6); }
    .stage:not(.open) .chest:hover { animation: wig .4s ease-in-out infinite; }
    @keyframes wig { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
    .item { position: absolute; left: 50%; top: 28px; transform: translate(-50%, 10px) scale(0); width: 28px; height: 28px; opacity: 0; transition: transform .4s cubic-bezier(.3,1.6,.5,1), opacity .2s; pointer-events: none; }
    .open .item { transform: translate(-50%, -24px) scale(1); opacity: 1; }
    .item svg { width: 100%; height: 100%; shape-rendering: crispEdges; filter: drop-shadow(0 0 6px #ffe678); }
    .gold { color: #ffe678; font: 700 12px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 1px; text-shadow: 2px 2px 0 #000; }
    .cnt { color: #fff; }
  `,
  html: `
    <div class="stage">
      <div class="beam"></div>
      <div class="item"><svg viewBox="0 0 14 14"><path fill="#f7f7f7" d="M6 1h2v2h2v2h2v2h-2v2h-2v2H6v-2H4V7H2V5h2V3h2z"/><path fill="#c9e3ff" d="M6 3h2v2h2v2H8v2H6V7H4V5h2z"/></svg></div>
      <button class="chest" type="button" aria-pressed="false" aria-label="Treasure chest">
        <svg viewBox="0 0 36 28">
          <g class="base"><rect x="2" y="12" width="32" height="14" fill="#8b4a1e"/><rect x="2" y="12" width="32" height="2" fill="#5a2d10"/><rect x="2" y="24" width="32" height="2" fill="#5a2d10"/><rect x="6" y="12" width="2" height="14" fill="#d6a53a"/><rect x="28" y="12" width="2" height="14" fill="#d6a53a"/><rect x="15" y="12" width="6" height="6" fill="#d6a53a"/><rect x="17" y="14" width="2" height="3" fill="#2b1a0a"/></g>
          <g class="lid"><rect x="2" y="4" width="32" height="8" fill="#a3581f"/><rect x="4" y="2" width="28" height="2" fill="#a3581f"/><rect x="2" y="4" width="32" height="2" fill="#c87a2e"/><rect x="6" y="2" width="2" height="10" fill="#d6a53a"/><rect x="28" y="2" width="2" height="10" fill="#d6a53a"/><rect x="15" y="8" width="6" height="4" fill="#d6a53a"/></g>
        </svg>
      </button>
      <div class="gold">GOLD <span class="cnt">0</span></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), chest = root.querySelector('.chest'), cnt = root.querySelector('.cnt'); let gold = 0;
    chest.addEventListener('click', () => { const open = stage.classList.toggle('open'); chest.setAttribute('aria-pressed', String(open)); if (open) { gold += 25 + Math.floor(Math.random() * 50); cnt.textContent = gold; } });
  },
};
