export default {
  id: 'gm-pacman-ready',
  credit: 'Namco Pac-Man (1980) — the maze "READY!" start: press 1P START, the text blinks out and Pac-Man chomps along the dotted corridor eating dots (runs while hovered)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #000; padding: 14px 16px 12px; border-radius: 12px; display: inline-flex; flex-direction: column; align-items: center; gap: 10px; image-rendering: pixelated; }
    .maze { position: relative; width: 220px; height: 64px; border: 3px double #2121de; border-radius: 6px; overflow: hidden; }
    .dots { position: absolute; left: 10px; right: 10px; top: 29px; height: 4px; background: repeating-linear-gradient(90deg, #ffb8ae 0 4px, transparent 4px 20px); transition: clip-path .1s linear; clip-path: inset(0 0 0 var(--eat, 0px)); }
    .ready { position: absolute; left: 0; right: 0; top: 24px; text-align: center; color: #ffff00; font: 700 13px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 2px; }
    .go .ready { animation: out .3s steps(2) 3 forwards; }
    @keyframes out { to { opacity: 0; } }
    .pac { position: absolute; left: var(--x, 6px); top: 21px; width: 20px; height: 20px; border-radius: 50%; background: #ffff00; opacity: 0; transition: left .1s linear; }
    .go .pac { opacity: 1; }
    .pac::before { content: ""; position: absolute; inset: 0; border-radius: 50%; background: #000; clip-path: polygon(50% 50%, 100% 15%, 100% 85%); animation: chomp .25s steps(1) infinite paused; }
    .run .pac::before { animation-play-state: running; }
    @keyframes chomp { 0% { clip-path: polygon(50% 50%, 100% 15%, 100% 85%); } 33% { clip-path: polygon(50% 50%, 100% 40%, 100% 60%); } 66% { clip-path: polygon(50% 50%, 100% 50%, 100% 50%); } }
    .pac::after { content: ""; position: absolute; left: 9px; top: 3px; width: 3px; height: 3px; background: #000; }
    .start { cursor: pointer; background: none; color: #00ffff; font: 700 13px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 2px; padding: 6px 10px; border: 2px solid transparent; }
    .start:hover, .start:focus-visible { border-color: #00ffff; outline: none; }
    .start.go { animation: blink .5s steps(2) infinite; color: #ffff00; }
    @keyframes blink { to { opacity: 0; } }
    .score { color: #fff; font: 700 11px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 1px; align-self: flex-start; }
  `,
  html: `
    <div class="stage">
      <div class="score">1UP <span class="n">00</span></div>
      <div class="maze"><div class="dots"></div><div class="ready">READY!</div><div class="pac"></div></div>
      <button class="start" type="button" aria-pressed="false">1P START</button>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), maze = root.querySelector('.maze'), start = root.querySelector('.start'), pac = root.querySelector('.pac'), dots = root.querySelector('.dots'), n = root.querySelector('.n');
    let x = 6, score = 0, timer = null, running = false;
    const step = () => { x += 4; if (x > 200) { x = -20; dots.style.setProperty('--eat', '0px'); } pac.style.setProperty('--x', x + 'px'); dots.style.setProperty('--eat', Math.max(0, x + 4) + 'px'); if (x > 0 && x % 20 === 10) { score += 10; n.textContent = String(score).padStart(2, '0'); } };
    const run = () => { if (!running || timer) return; stage.classList.add('run'); timer = setInterval(step, 100); };
    const stop = () => { stage.classList.remove('run'); clearInterval(timer); timer = null; };
    start.addEventListener('click', () => {
      running = !running; start.setAttribute('aria-pressed', String(running)); stage.classList.toggle('go', running); start.classList.toggle('go', running);
      if (running) run(); else { stop(); x = 6; score = 0; n.textContent = '00'; pac.style.setProperty('--x', '6px'); dots.style.setProperty('--eat', '0px'); }
    });
    stage.addEventListener('pointerenter', run); stage.addEventListener('pointerleave', stop);
    maze.addEventListener('click', () => { if (running) step(); });
    return stop;
  },
};
