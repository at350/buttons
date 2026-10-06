export default {
  id: 'ob-reddit-the-button',
  credit: 'Reddit r/thebutton (April 2015) — a 60-second timer anyone can reset by pressing once; the colour of your flair depends on how low you let it get',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 260px; max-width: 100%; padding: 18px; border-radius: 12px; background: #f6f7f8; display: grid; justify-items: center; gap: 12px; font: 13px/1 Verdana, Arial, sans-serif; color: #222; }
    .timer { font: 700 46px/1 "Roboto Flex", Inter, system-ui, sans-serif; font-variant-numeric: tabular-nums; letter-spacing: -1px; transition: color .3s; }
    .btn { position: relative; width: 120px; height: 120px; border-radius: 50%; border: 6px solid #c7c7c7; background: radial-gradient(circle at 50% 40%, #ffffff, #e4e4e4); cursor: pointer; box-shadow: 0 6px 0 #9a9a9a, 0 10px 18px rgba(0,0,0,.25), inset 0 2px 0 #fff; transition: transform .08s, box-shadow .08s; }
    .btn:hover { background: radial-gradient(circle at 50% 40%, #ffffff, #ececec); }
    .btn:active { transform: translateY(5px); box-shadow: 0 1px 0 #9a9a9a, 0 4px 8px rgba(0,0,0,.25), inset 0 2px 0 #fff; }
    .btn:focus-visible { outline: 3px solid #0079d3; outline-offset: 4px; }
    .btn.live { border-color: var(--c, #820080); }
    .btn.pressed { cursor: default; background: radial-gradient(circle at 50% 40%, #f0f0f0, #d0d0d0); }
    .btn.pressed::after { content: "✓"; position: absolute; inset: 0; display: grid; place-items: center; font: 700 42px/1 Inter, system-ui, sans-serif; color: var(--c, #820080); }
    .flair { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; color: #555; min-height: 16px; }
    .flair i { width: 12px; height: 12px; border-radius: 50%; background: #ddd; border: 1px solid #bbb; }
    .flair i.on { border-color: transparent; }
  `,
  html: `
    <div class="stage">
      <div class="timer" aria-live="off">60.00</div>
      <button class="btn" type="button" aria-label="The button"></button>
      <span class="flair"><i aria-hidden="true"></i><span class="ft">not pressed</span></span>
    </div>`,
  init(root) {
    const timer = root.querySelector('.timer'), btn = root.querySelector('.btn'), dot = root.querySelector('.flair i'), ft = root.querySelector('.ft');
    const tiers = [[52, '#820080', 'purple'], [42, '#0083c7', 'blue'], [32, '#02be01', 'green'], [22, '#e5d900', 'yellow'], [12, '#e59500', 'orange'], [0, '#e50000', 'red']];
    let t = 60, iv = 0, pressed = false;
    const tier = (s) => tiers.find(([min]) => s >= min);
    const stop = () => { clearInterval(iv); iv = 0; };
    const paint = () => { const [, c] = tier(t); timer.textContent = t.toFixed(2); timer.style.color = c; btn.style.setProperty('--c', c); };
    const run = () => { stop(); btn.classList.add('live'); iv = setInterval(() => { t = Math.max(0, t - .05); paint(); if (t <= 0) { stop(); timer.textContent = '0.00'; ft.textContent = pressed ? ft.textContent : 'the button has ended'; } }, 50); };
    btn.addEventListener('click', () => {
      if (pressed) { pressed = false; btn.classList.remove('pressed', 'live'); dot.className = ''; dot.style.background = ''; ft.textContent = 'not pressed'; stop(); t = 60; paint(); return; }
      if (!iv && t >= 60) { run(); return; }
      pressed = true; const [, c, name] = tier(t); btn.classList.add('pressed'); dot.classList.add('on'); dot.style.background = c; ft.textContent = `${name} flair · ${t.toFixed(0)}s`; t = 60; paint(); run();
    });
    paint();
    return stop;
  },
};
