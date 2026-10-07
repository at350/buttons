// Pokémon Red / Blue on the original Game Boy (DMG): four-shade green screen (#9bbc0f #8bac0f #306230 #0f380f)
// in the grey-blue bezel, Gen 1 text box with its thick outer / thin inner double rule and rounded corners,
// two-line text, the ▶ menu cursor and the blinking ▼ "more" arrow; DMG d-pad and magenta A / B buttons.
export default {
  id: 'gm-pokemon-textbox',
  credit: 'Game Freak Pokémon Red / Blue (Game Boy) — Prof. Oak\'s starter question in the Gen 1 double-ruled text box with the YES / NO menu; ▲▼ move, A picks, B says no',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #c9c8c1; border-radius: 12px 12px 36px 12px; padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 12px; box-shadow: inset 0 0 0 1px #b3b2ab; }
    .bezel { background: #5f6175; border-radius: 6px 6px 22px 6px; padding: 12px 14px 14px; }
    .scr { position: relative; width: 248px; height: 154px; background: #9bbc0f; color: #0f380f; font: 500 13px/20px 'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace; text-transform: uppercase; letter-spacing: .3px;
      -webkit-font-smoothing: none; image-rendering: pixelated; box-shadow: inset 0 0 0 1px rgba(15,56,15,.2); }
    .frame { position: absolute; background: #9bbc0f; border-radius: 5px;
      box-shadow: inset 0 0 0 4px #0f380f, inset 0 0 0 6px #9bbc0f, inset 0 0 0 8px #306230; }
    .msg { left: 0; right: 0; bottom: 0; height: 64px; padding: 11px 14px 0 16px; white-space: pre; }
    .menu { right: 0; bottom: 60px; width: 76px; height: 64px; padding: 10px 8px 0 26px; visibility: hidden; }
    .menu.open { visibility: visible; }
    .mi { position: relative; display: block; width: 100%; height: 22px; border: none; background: none; text-align: left; padding: 0; cursor: pointer; color: inherit; font: inherit; text-transform: inherit; white-space: nowrap; }
    .mi.sel::before { content: "▶"; position: absolute; left: -15px; top: 0; font-size: 11px; }
    .menu.blink .mi.sel::before { animation: bl 400ms steps(2) infinite; }
    @keyframes bl { to { opacity: 0; } }
    .mi:focus-visible { outline: 2px solid #306230; outline-offset: 0; }
    .arrow { position: absolute; right: 16px; bottom: 9px; font-size: 10px; line-height: 10px; animation: bob 600ms steps(2) infinite; }
    @keyframes bob { 50% { opacity: 0; } }
    .pad { display: flex; align-items: center; justify-content: space-between; padding: 0 4px; }
    .dpad { position: relative; width: 66px; height: 66px; }
    .dpad::before, .dpad::after { content: ""; position: absolute; background: #2c2c30; border-radius: 3px; box-shadow: 0 2px 0 #18181b; }
    .dpad::before { left: 22px; top: 0; width: 22px; height: 66px; }
    .dpad::after { left: 0; top: 22px; width: 66px; height: 22px; }
    .dp { position: absolute; left: 22px; width: 22px; height: 24px; z-index: 1; border: none; background: none; cursor: pointer; padding: 0; color: #55555c; font-size: 9px; }
    .dp.u { top: 0; } .dp.d { bottom: 0; }
    .dp:active { color: #9a9aa2; transform: translateY(1px); }
    .dp:focus-visible { outline: 2px solid #9a2257; outline-offset: -2px; }
    .ab { display: flex; gap: 12px; transform: rotate(-25deg); margin-right: 4px; }
    .k { width: 34px; height: 34px; border-radius: 50%; border: none; cursor: pointer; background: #9a2257; color: #e8c9d8; font: 700 12px 'JetBrains Mono', ui-monospace, monospace; box-shadow: 0 3px 0 #5e1435, inset 0 2px 2px rgba(255,255,255,.2); }
    .k.a { transform: translateY(-10px); }
    .k:active { box-shadow: 0 0 0 #5e1435, inset 0 2px 3px rgba(0,0,0,.3); translate: 0 3px; }
    .k:focus-visible { outline: 2px solid #0f380f; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="bezel"><div class="scr">
        <div class="frame menu open" role="menu"><button class="mi sel" type="button" role="menuitem">Yes</button><button class="mi" type="button" role="menuitem">No</button></div>
        <div class="frame msg" aria-live="polite"><span class="t">So! You want the
plant POKéMON?</span><span class="arrow">▼</span></div>
      </div></div>
      <div class="pad">
        <div class="dpad"><button class="dp u" type="button" data-k="up" aria-label="Up">▲</button><button class="dp d" type="button" data-k="down" aria-label="Down">▼</button></div>
        <div class="ab"><button class="k b" type="button" data-k="b" aria-label="B">B</button><button class="k a" type="button" data-k="a" aria-label="A">A</button></div>
      </div>
    </div>`,
  init(root) {
    const t = root.querySelector('.t'), menu = root.querySelector('.menu'), items = [...root.querySelectorAll('.mi')];
    const mons = [['plant', 'BULBASAUR'], ['fiery', 'CHARMANDER'], ['water', 'SQUIRTLE']]; let m = 0, i = 0, step = 0;
    const ask = () => 'So! You want the\n' + mons[m][0] + ' POKéMON?';
    const show = (s, open) => { t.textContent = s; menu.classList.toggle('open', open); menu.classList.remove('blink'); };
    const sel = (n) => { i = (n + items.length) % items.length; items.forEach((it, j) => it.classList.toggle('sel', i === j)); };
    const act = (k) => {
      const open = menu.classList.contains('open');
      if ((k === 'up' || k === 'down') && open) { sel(i + 1); return; }
      if (k === 'a' && open && i === 0) { step = 1; show('This POKéMON is\nreally energetic!', false); return; }
      if (k === 'a' && !open && step === 1) { step = 2; show('RED received\na ' + mons[m][1] + '!', false); return; }
      if ((k === 'a' && open && i === 1) || (k === 'b' && open)) { m = (m + 1) % mons.length; }
      else if (!open && step === 2) { m = (m + 1) % mons.length; }
      step = 0; sel(0); show(ask(), true);
    };
    root.querySelectorAll('.pad button').forEach((b) => b.addEventListener('click', () => act(b.dataset.k)));
    items.forEach((m, j) => { m.addEventListener('click', () => { sel(j); act('a'); }); m.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); sel(i + 1); items[i].focus(); } if (e.key === 'ArrowUp') { e.preventDefault(); sel(i - 1); items[i].focus(); } }); });
  },
};
