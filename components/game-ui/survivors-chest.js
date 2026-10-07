export default {
  id: 'gm-survivors-chest',
  credit: 'poncle Vampire Survivors — the game\'s treasure chest sprite: click to open, it hops, light beams out and the Whip rises with a gold payout; click again to close',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; background: radial-gradient(circle at 50% 70%, #3a2a4a, #15101f 70%); padding: 26px 36px 18px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 10px; overflow: hidden; }
    .beam { position: absolute; left: 50%; bottom: 52px; width: 0; height: 0; border-left: 60px solid transparent; border-right: 60px solid transparent; border-bottom: 150px solid rgba(255,230,120,.22); transform: translateX(-50%) rotate(180deg); transform-origin: 50% 0; opacity: 0; transition: opacity .3s; pointer-events: none; }
    .open .beam { opacity: 1; animation: sway 1.6s ease-in-out infinite alternate; }
    @keyframes sway { from { transform: translateX(-50%) rotate(176deg) scaleX(.9); } to { transform: translateX(-50%) rotate(184deg) scaleX(1.1); } }
    .chest { position: relative; width: 80px; height: 75px; border: none; padding: 0; background: none; cursor: pointer; }
    .chest img { display: block; width: 80px; height: 75px; image-rendering: pixelated; pointer-events: none; -webkit-user-drag: none; }
    .open .chest { animation: hop .45s cubic-bezier(.3,1.6,.5,1); }
    @keyframes hop { 30% { transform: translateY(-10px) scale(1.06, .94); } 60% { transform: translateY(0) scale(.96, 1.04); } }
    .chest:focus-visible { outline: 3px solid #ffe678; outline-offset: 4px; }
        .stage:not(.open) .chest:hover { animation: wig .4s ease-in-out infinite; }
    @keyframes wig { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
    .item { position: absolute; left: 50%; top: 30px; z-index: 2; transform: translate(-50%, 10px) scale(0); width: 32px; height: 32px; opacity: 0; transition: transform .4s cubic-bezier(.3,1.6,.5,1), opacity .2s; pointer-events: none; }
    .open .item { transform: translate(-50%, -24px) scale(1); opacity: 1; }
    .item img { display: block; width: 32px; height: 32px; image-rendering: pixelated; filter: drop-shadow(0 0 6px #ffe678); }
    .gold { display: flex; align-items: center; gap: 6px; color: #ffe678; font: 700 12px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 1px; text-shadow: 2px 2px 0 #000; }
    .gold img { width: 16px; height: 16px; image-rendering: pixelated; }
    .cnt { color: #fff; }
  `,
  html: `
    <div class="stage">
      <div class="beam"></div>
      <div class="item"><img src="assets/real/gm-vs-whip.png" width="32" height="32" alt=""></div>
      <button class="chest" type="button" aria-pressed="false" aria-label="Treasure chest"><img src="assets/real/gm-vs-treasure-chest.png" width="80" height="75" alt=""></button>
      <div class="gold"><img src="assets/real/gm-vs-gold-coin.png" width="16" height="16" alt="">GOLD <span class="cnt">0</span></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), chest = root.querySelector('.chest'), cnt = root.querySelector('.cnt'); let gold = 0;
    chest.addEventListener('click', () => { const open = stage.classList.toggle('open'); chest.setAttribute('aria-pressed', String(open)); if (open) { gold += 25 + Math.floor(Math.random() * 50); cnt.textContent = gold; } });
  },
};
