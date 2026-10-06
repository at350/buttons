export default {
  id: 'gm-roblox-play',
  credit: 'Roblox — the game-page green "Play" rounded square with the tilted-square logo and the like / favorite pills (count ticks, star fills)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #232527; padding: 16px 18px; border-radius: 12px; display: flex; flex-direction: column; gap: 10px; font-family: 'Inter', 'DM Sans', system-ui, sans-serif; }
    .play { width: 220px; height: 52px; border: none; border-radius: 8px; cursor: pointer; background: #00b06f; color: #fff; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font: 700 18px 'Inter', 'DM Sans', system-ui, sans-serif; transition: background .12s, transform .08s; }
    .play svg { width: 20px; height: 20px; }
    .play:hover { background: #00c87e; }
    .play:active { transform: scale(.98); background: #009c62; }
    .play.on { background: #393b3d; }
    .play.on:hover { background: #4a4c4e; }
    .play:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .row { display: flex; gap: 8px; }
    .pill { flex: 1; height: 32px; border: none; border-radius: 8px; cursor: pointer; background: #393b3d; color: #d8d8d8; display: inline-flex; align-items: center; justify-content: center; gap: 6px; font: 600 12px 'Inter', 'DM Sans', system-ui, sans-serif; transition: background .12s; }
    .pill svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linejoin: round; }
    .pill:hover { background: #4a4c4e; }
    .pill.on { color: #fff; }
    .pill.on svg { fill: #00b06f; stroke: #00b06f; }
    .fav.on svg { fill: #ffd84d; stroke: #ffd84d; }
    .pill:focus-visible { outline: 2px solid #fff; }
    .players { color: #8a8c8e; font: 500 11px 'Inter', system-ui, sans-serif; text-align: center; }
    .players b { color: #fff; }
  `,
  html: `
    <div class="stage">
      <button class="play" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#fff"/></svg><span class="pl">Play</span></button>
      <div class="row">
        <button class="pill like" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M7 10v11H4V10zM10 21h8l3-7v-3h-7l1-5-2-1-3 6z"/></svg><span class="n">1.2M</span></button>
        <button class="pill fav" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17.5 5.9 21l1.5-6.8L2.2 9.5l6.9-.7z"/></svg>Favorite</button>
      </div>
      <div class="players"><b class="act">184,219</b> active</div>
    </div>`,
  init(root) {
    const play = root.querySelector('.play'), pl = root.querySelector('.pl'), like = root.querySelector('.like'), fav = root.querySelector('.fav'), n = root.querySelector('.n'), act = root.querySelector('.act');
    let likes = 1200000, players = 184219;
    play.addEventListener('click', () => { const on = play.classList.toggle('on'); play.setAttribute('aria-pressed', String(on)); pl.textContent = on ? 'Playing' : 'Play'; players += on ? 1 : -1; act.textContent = players.toLocaleString(); });
    like.addEventListener('click', () => { const on = like.classList.toggle('on'); like.setAttribute('aria-pressed', String(on)); likes += on ? 1 : -1; n.textContent = (likes / 1e6).toFixed(likes % 1e6 ? 6 : 1).replace(/0+$/, '').replace(/\.$/, '') + 'M'; });
    fav.addEventListener('click', () => { const on = fav.classList.toggle('on'); fav.setAttribute('aria-pressed', String(on)); fav.lastChild.textContent = on ? 'Favorited' : 'Favorite'; });
  },
};
