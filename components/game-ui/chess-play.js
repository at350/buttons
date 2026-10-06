export default {
  id: 'gm-chess-play',
  credit: 'Chess.com — green "Play" button with the 3D bottom edge beside the time-control picker and a two-sided clock (click a side to pass the move)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #312e2b; padding: 16px 18px; border-radius: 12px; display: flex; flex-direction: column; gap: 10px; font-family: 'Inter', 'DM Sans', system-ui, sans-serif; }
    .play { width: 230px; height: 50px; border: none; border-radius: 8px; cursor: pointer; background: #81b64c; color: #fff; font: 800 19px 'Inter', system-ui, sans-serif; letter-spacing: .3px; text-shadow: 0 1px 0 rgba(0,0,0,.25);
      box-shadow: 0 5px 0 #45753c; transition: transform .06s, box-shadow .06s, background .12s; }
    .play:hover { background: #95bb4a; } .play:active { transform: translateY(4px); box-shadow: 0 1px 0 #45753c; }
    .play.on { background: #4b4847; box-shadow: 0 5px 0 #2a2826; } .play.on:hover { background: #5a5755; }
    .play:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .tc { display: flex; gap: 6px; }
    .tc button { flex: 1; height: 30px; border: none; border-radius: 6px; cursor: pointer; background: #3c3936; color: #c3c2c1; font: 600 12px 'Inter', system-ui, sans-serif; display: inline-flex; align-items: center; justify-content: center; gap: 4px; }
    .tc button svg { width: 12px; height: 12px; fill: #e3aa24; }
    .tc button:hover { background: #4b4847; } .tc button.on { background: #81b64c; color: #fff; } .tc button.on svg { fill: #fff; }
    .tc button:focus-visible { outline: 2px solid #fff; }
    .clock { display: flex; gap: 4px; }
    .side { flex: 1; height: 38px; border: none; border-radius: 4px; cursor: pointer; font: 700 18px 'JetBrains Mono', ui-monospace, monospace; display: grid; place-items: center; transition: background .15s, color .15s; }
    .w { background: #e8e6e3; color: #312e2b; } .b { background: #262522; color: #8a8886; }
    .side.act { box-shadow: inset 0 0 0 2px #81b64c; } .b.act { color: #fff; }
    .side:focus-visible { outline: 2px solid #81b64c; }
  `,
  html: `
    <div class="stage">
      <div class="tc" role="radiogroup">
        <button type="button" role="radio" aria-checked="false"><svg viewBox="0 0 12 12"><path d="M6 0 2 7h3l-1 5 5-7H6z"/></svg>1 min</button>
        <button type="button" role="radio" aria-checked="true" class="on"><svg viewBox="0 0 12 12"><path d="M6 0 2 7h3l-1 5 5-7H6z"/></svg>3 min</button>
        <button type="button" role="radio" aria-checked="false"><svg viewBox="0 0 12 12"><circle cx="6" cy="6.5" r="5"/><path d="M6 3v4h3" stroke="#312e2b" stroke-width="1.4" fill="none"/></svg>10 min</button>
      </div>
      <button class="play" type="button" aria-pressed="false">Play</button>
      <div class="clock"><button class="side w act" type="button" aria-label="White clock">3:00</button><button class="side b" type="button" aria-label="Black clock">3:00</button></div>
    </div>`,
  init(root) {
    const play = root.querySelector('.play'), tc = [...root.querySelectorAll('.tc button')], w = root.querySelector('.w'), b = root.querySelector('.b');
    let mins = 3, tw = 180, tb = 180, turn = w, timer = null;
    const fmt = (s) => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    const draw = () => { w.textContent = fmt(tw); b.textContent = fmt(tb); };
    const reset = () => { tw = tb = mins * 60; draw(); };
    const stop = () => { clearInterval(timer); timer = null; };
    const run = () => { stop(); timer = setInterval(() => { if (turn === w) tw = Math.max(0, tw - 1); else tb = Math.max(0, tb - 1); draw(); if (!tw || !tb) { stop(); play.click(); } }, 1000); };
    tc.forEach((t, i) => t.addEventListener('click', () => { tc.forEach((o) => { o.classList.toggle('on', o === t); o.setAttribute('aria-checked', String(o === t)); }); mins = [1, 3, 10][i]; stop(); play.classList.remove('on'); play.textContent = 'Play'; play.setAttribute('aria-pressed', 'false'); reset(); }));
    play.addEventListener('click', () => { const on = play.classList.toggle('on'); play.setAttribute('aria-pressed', String(on)); play.textContent = on ? 'Resign' : 'Play'; if (on) { reset(); run(); } else stop(); });
    [w, b].forEach((s) => s.addEventListener('click', () => { turn = s === w ? b : w; w.classList.toggle('act', turn === w); b.classList.toggle('act', turn === b); }));
    return stop;
  },
};
