export default {
  id: 'gm-pokemon-textbox',
  credit: 'Game Freak Pokémon Red / Blue (Game Boy) — the double-bordered text box and ▶ cursor menu; arrows move, A picks, B backs out',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #9bbc0f; padding: 14px; border-radius: 12px; display: inline-flex; flex-direction: column; gap: 10px; image-rendering: pixelated; }
    .scr { width: 240px; background: #9bbc0f; position: relative; font: 400 13px/1.7 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace; color: #0f380f; text-transform: uppercase; letter-spacing: .5px; }
    .box { border: 3px double #0f380f; outline: 3px solid #9bbc0f; box-shadow: 0 0 0 5px #0f380f; margin: 5px; padding: 6px 10px; background: #9bbc0f; height: 80px; white-space: pre-wrap; }
    .menu { position: absolute; right: 5px; top: -4px; width: 104px; border: 3px double #0f380f; box-shadow: 0 0 0 5px #0f380f; background: #9bbc0f; padding: 4px 6px 4px 18px; margin: 5px; opacity: 0; pointer-events: none; }
    .menu.open { opacity: 1; pointer-events: auto; }
    .mi { display: block; width: 100%; border: none; background: none; text-align: left; padding: 0; cursor: pointer; color: inherit; font: inherit; text-transform: inherit; position: relative; }
    .mi.sel::before { content: "▶"; position: absolute; left: -14px; top: 0; font-size: 10px; }
    .menu.blink .mi.sel::before { animation: bl .4s steps(2) infinite; }
    @keyframes bl { to { opacity: 0; } }
    .mi:focus-visible { outline: 2px dotted #0f380f; outline-offset: 1px; }
    .arrow { position: absolute; right: 16px; bottom: 10px; font-size: 10px; animation: bob .6s steps(2) infinite; }
    @keyframes bob { to { transform: translateY(2px); } }
    .keys { display: flex; gap: 8px; justify-content: center; }
    .k { width: 32px; height: 32px; border-radius: 50%; border: none; cursor: pointer; background: #8b2252; color: #e8c9d8; font: 700 12px 'JetBrains Mono', ui-monospace, monospace; box-shadow: 0 3px 0 #5a1534; }
    .k:active { transform: translateY(3px); box-shadow: 0 0 0 #5a1534; }
    .k:focus-visible { outline: 2px solid #0f380f; outline-offset: 2px; }
    .dp { width: 32px; height: 32px; border: none; background: #0f380f; cursor: pointer; color: #9bbc0f; font-size: 12px; border-radius: 4px; }
    .dp:active { background: #306230; }
    .dp:focus-visible { outline: 2px solid #8b2252; }
  `,
  html: `
    <div class="stage">
      <div class="scr">
        <div class="box msg">PROF.OAK: Which
POKéMON will you
choose?<span class="arrow">▼</span></div>
        <div class="menu" role="menu"><button class="mi sel" type="button" role="menuitem">Bulbasaur</button><button class="mi" type="button" role="menuitem">Charmander</button><button class="mi" type="button" role="menuitem">Squirtle</button></div>
      </div>
      <div class="keys">
        <button class="dp" type="button" data-k="up" aria-label="Up">▲</button>
        <button class="dp" type="button" data-k="down" aria-label="Down">▼</button>
        <button class="k" type="button" data-k="b" aria-label="B">B</button>
        <button class="k" type="button" data-k="a" aria-label="A">A</button>
      </div>
    </div>`,
  init(root) {
    const msg = root.querySelector('.msg'), arrow = root.querySelector('.arrow'), menu = root.querySelector('.menu'), items = [...root.querySelectorAll('.mi')];
    const intro = 'PROF.OAK: Which\nPOKéMON will you\nchoose?'; let i = 0;
    const show = (t, open) => { msg.textContent = t; msg.appendChild(arrow); menu.classList.toggle('open', open); menu.classList.remove('blink'); };
    const sel = (n) => { i = (n + items.length) % items.length; items.forEach((m, j) => m.classList.toggle('sel', i === j)); };
    const act = (k) => {
      const open = menu.classList.contains('open');
      if (k === 'up' && open) sel(i - 1); else if (k === 'down' && open) sel(i + 1);
      else if (k === 'a') { if (open) { menu.classList.add('blink'); show('You chose\n' + items[i].textContent.toUpperCase() + '!', false); } else show(intro, true); }
      else if (k === 'b') show(intro, false);
    };
    root.querySelectorAll('.keys button').forEach((b) => b.addEventListener('click', () => act(b.dataset.k)));
    items.forEach((m, j) => { m.addEventListener('click', () => { sel(j); act('a'); }); m.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); sel(i + 1); items[i].focus(); } if (e.key === 'ArrowUp') { e.preventDefault(); sel(i - 1); items[i].focus(); } }); });
    show(intro, true);
  },
};
