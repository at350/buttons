export default {
  id: 'gm-fortnite-play',
  credit: 'Epic Games Fortnite — lobby "PLAY!" button: yellow slanted slab, Burbank-style italic caps, shifts to white and grows on hover; "READY" state for the party',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: radial-gradient(ellipse at 50% 100%, #3b1e8a, #140a3a 70%);
      padding: 24px 32px;
      border-radius: 12px;
      display: flex;
      gap: 14px;
      align-items: center; }
    .play { position: relative;
      border: none;
      background: none;
      cursor: pointer;
      padding: 0;
      width: 180px;
      height: 58px;
      transform: skewX(-10deg);
      transition: transform .12s; }
    .play .bg { position: absolute;
      inset: 0;
      background: linear-gradient(180deg, #ffe64d, #f9c800 60%, #e8a800);
      box-shadow: 0 5px 0 #a87400, 0 10px 18px rgba(0,0,0,.45);
      transition: background .12s, box-shadow .12s; }
    .play .lbl { position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      transform: skewX(10deg);
      color: #1a1340;
      font: 800 italic 36px/1 'Bricolage Grotesque', 'Inter', system-ui, sans-serif;
      font-variation-settings: 'wdth' 75;
      letter-spacing: .5px;
      white-space: nowrap;
      transition: color .12s; }
    .play:hover { transform: skewX(-10deg) scale(1.06); }
    .play:hover .bg { background: #fff; box-shadow: 0 5px 0 #b8b8c8, 0 12px 22px rgba(255,255,255,.25); }
    .play:active { transform: skewX(-10deg) scale(1.02) translateY(4px); }
    .play:active .bg { box-shadow: 0 1px 0 #a87400, 0 4px 10px rgba(0,0,0,.45); }
    .play.ready .bg { background: linear-gradient(180deg, #67f3ff, #1ab8f6 60%, #0f8ad1);
      box-shadow: 0 5px 0 #0b5c92, 0 10px 18px rgba(0,0,0,.45); }
    .play.ready .lbl { color: #fff; text-shadow: 0 2px 0 rgba(0,0,0,.25); }
    .play:focus-visible { outline: 3px solid #fff; outline-offset: 4px; }
    .mode { border: none;
      cursor: pointer;
      width: 110px;
      height: 58px;
      transform: skewX(-10deg);
      background: rgba(255,255,255,.1);
      color: #fff;
      font: 800 italic 17px/1.05 'Bricolage Grotesque', 'Inter', system-ui, sans-serif;
      font-variation-settings: 'wdth' 75;
      text-transform: uppercase;
      white-space: nowrap;
      text-align: left;
      padding: 0 14px;
      line-height: 1.25;
      border-left: 4px solid #ffe64d; }
    .mode span { display: block; transform: skewX(10deg); }
    .mode small { display: block; font-weight: 600; opacity: .75; font-size: 11px; letter-spacing: .5px; text-transform: uppercase; }
    .mode:hover { background: rgba(255,255,255,.2); }
    .mode:focus-visible { outline: 2px solid #ffe64d; }
  `,
  html: `
    <div class="stage">
      <button class="mode" type="button"><span><small>Battle Royale</small>Squads</span></button>
      <button class="play" type="button" aria-pressed="false"><span class="bg"></span><span class="lbl">PLAY!</span></button>
    </div>`,
  init(root) {
    const p = root.querySelector('.play'), lbl = p.querySelector('.lbl'), mode = root.querySelector('.mode span');
    p.addEventListener('click', () => { const on = p.classList.toggle('ready'); p.setAttribute('aria-pressed', String(on)); lbl.textContent = on ? 'READY' : 'PLAY!'; });
    const modes = ['Squads', 'Duos', 'Solo', 'Zero Build']; let i = 0;
    root.querySelector('.mode').addEventListener('click', () => { i = (i + 1) % modes.length; mode.innerHTML = '<small>Battle Royale</small>' + modes[i]; });
  },
};
