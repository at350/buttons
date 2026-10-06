export default {
  id: 'gm-flappy-start',
  credit: '.GEARS Flappy Bird — pixel "Start" button on the title screen; tap the sky to make the bird flap (it falls back), score ticks per flap',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sky { position: relative; width: 200px; height: 170px; border-radius: 12px; overflow: hidden; cursor: pointer; border: none; padding: 0; text-align: left;
      background: linear-gradient(180deg, #4ec0ca 0%, #4ec0ca 70%, #ded895 70%, #ded895 78%, #5ee270 78%, #5ee270 82%, #d7b36b 82%); image-rendering: pixelated; }
    .sky:focus-visible { outline: 3px solid #fff; outline-offset: -3px; }
    .cloud { position: absolute; bottom: 52px; left: 0; right: 0; height: 18px; background: repeating-linear-gradient(90deg, #fff 0 20px, transparent 20px 34px); opacity: .9; }
    .cloud::before { content: ""; position: absolute; left: 6px; right: 0; top: -8px; height: 8px; background: repeating-linear-gradient(90deg, transparent 0 4px, #fff 4px 16px, transparent 16px 34px); }
    .bird { position: absolute; left: 36px; top: 60px; width: 34px; height: 24px; transition: transform .22s cubic-bezier(.2,.8,.3,1.2); }
    .bird svg { width: 100%; height: 100%; shape-rendering: crispEdges; }
    .bird.flap { animation: flap .5s ease-in forwards; }
    @keyframes flap { 0% { transform: translateY(0) rotate(0); } 25% { transform: translateY(-22px) rotate(-20deg); } 100% { transform: translateY(0) rotate(0); } }
    .wing { transform-origin: 14px 13px; } .bird.flap .wing { animation: wing .18s steps(2) 2; }
    @keyframes wing { 50% { transform: translateY(-3px); } }
    .score { position: absolute; top: 10px; left: 0; right: 0; text-align: center; color: #fff; font: 700 22px 'JetBrains Mono', ui-monospace, monospace; text-shadow: 2px 2px 0 #543847, -1px -1px 0 #543847, 1px -1px 0 #543847, -1px 1px 0 #543847; }
    .start { position: absolute; left: 50%; bottom: 44px; transform: translateX(-50%); border: none; cursor: pointer; padding: 0 12px; height: 26px; background: #e7e0a2; color: #e36d00; font: 700 13px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 1px;
      box-shadow: 0 0 0 2px #543847, inset 0 -3px 0 #c79e42, 0 3px 0 2px #543847; }
    .start:active, .start.go { box-shadow: 0 0 0 2px #543847, inset 0 -1px 0 #c79e42; transform: translateX(-50%) translateY(3px); }
    .start.go { background: #5ee270; color: #1a4a1f; }
    .start:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .ground { position: absolute; left: 0; right: 0; bottom: 0; height: 30px; background: repeating-linear-gradient(90deg, #d7b36b 0 10px, #e7c982 10px 20px); background-position: 0 0; }
    .sky:hover .ground { animation: roll .4s linear infinite; }
    @keyframes roll { to { background-position: -20px 0; } }
  `,
  html: `
    <div class="sky" tabindex="0" role="button" aria-label="Flap">
      <div class="cloud"></div>
      <div class="score">0</div>
      <div class="bird"><svg viewBox="0 0 17 12"><path fill="#f7d33b" d="M3 3h8v1h2v1h1v1h2v2h-1v1h-1v1h-1v1h-2v1H5v-1H3v-1H2V7H1V5h1V4h1z"/><path fill="#fff" d="M10 3h3v1h1v2h-1v1h-3V6H9V4h1z"/><path fill="#000" d="M12 4h1v2h-1z"/><path fill="#e8792a" d="M12 7h4v1h-1v1h-4V8h1z"/><rect class="wing" fill="#f3a52d" x="2" y="6" width="6" height="3"/><rect fill="#f3a52d" x="3" y="5" width="4" height="1"/></svg></div>
      <button class="start" type="button" aria-pressed="false">START</button>
      <div class="ground"></div>
    </div>`,
  init(root) {
    const sky = root.querySelector('.sky'), bird = root.querySelector('.bird'), score = root.querySelector('.score'), start = root.querySelector('.start');
    let n = 0, t;
    const flap = () => { if (!start.classList.contains('go')) return; n++; score.textContent = n; bird.classList.remove('flap'); void bird.offsetWidth; bird.classList.add('flap'); clearTimeout(t); t = setTimeout(() => bird.classList.remove('flap'), 520); };
    sky.addEventListener('click', (e) => { if (e.target.closest('.start')) return; flap(); });
    sky.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'ArrowUp') { e.preventDefault(); flap(); } });
    start.addEventListener('click', () => { const go = start.classList.toggle('go'); start.setAttribute('aria-pressed', String(go)); start.textContent = go ? 'TAP!' : 'START'; if (!go) { n = 0; score.textContent = '0'; } });
    return () => clearTimeout(t);
  },
};
