// Flappy Bird (.GEARS): #4ec0ca sky, pale skyline and bushes, the striped #73bf2e / #9ce659 ground band over
// #ded895 dirt with the #543847 outline, the cream Play button with the green ▶; while playing the pipes scroll
// and every tap flaps the bird (it rises, tilts up, then drops back). Everything stays clipped inside the sky.
const px = (rows, pal) => {
  const d = {};
  rows.forEach((r, y) => { let x = 0; while (x < r.length) { const c = r[x]; let n = 1; while (r[x + n] === c) n++; if (pal[c]) (d[c] = d[c] || []).push(`M${x} ${y}h${n}v1h-${n}z`); x += n; } });
  return Object.entries(d).map(([c, p]) => `<path fill="${pal[c]}" d="${p.join('')}"/>`).join('');
};
const BIRD = px([
  '......KKKKKK.....', '....KKYYYKWWK....', '...KYYYYKWWWWK...', '..KYYYYYKWWWKWK..', '.KKKKYYYKWWWKWK..', 'KWWWWKYYYKWWWWK..',
  'KWWWWWKYYYKKKKKK.', 'KYWWWYKYYKRRRRRRK', '.KYYYKYYKRKKKKKK.', '..KKKOOOOKRRRRRK.', '..KOOOOOOOKKKKK..', '...KKOOOOOOK.....', '.....KKKKKK......',
], { K: '#543847', Y: '#f8c630', W: '#ffffff', R: '#e8661c', O: '#f6a12c' });
const CITY = px([
  '......................cc........................cc..........',
  '..........cccc........cc...........cccc.........cc......cc..',
  '...cc.....cccc..cccc..cccc...cc....cccc...cccc..cccc....cc..',
  '...cccc...cccccccccc..cccc..cccc...cccccccccccc.cccc..cccccc',
  'cccccccc.cccccccccccccccccccccccc.ccccccccccccccccccccccccccc',
  'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
  'bbbccbbbbbcccbbbbbbccbbbbbcccbbbbbbccbbbbcccbbbbbbbccbbbbbbb',
  'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
], { c: '#d4f1c6', b: '#5ee270' });

export default {
  id: 'gm-flappy-start',
  credit: '.GEARS Flappy Bird — the title scene with the cream Play button; press it, then tap the sky to flap while the pipes scroll (score ticks per flap)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sky { position: relative; display: block; width: 210px; height: 190px; border-radius: 12px; overflow: hidden; cursor: pointer; border: none; padding: 0; background: #4ec0ca; image-rendering: pixelated; }
    .sky:focus-visible { outline: 3px solid #fff; outline-offset: -3px; }
    .city { position: absolute; left: 0; bottom: 38px; width: 240px; height: 32px; }
    .pipes { position: absolute; left: 0; top: 0; bottom: 38px; width: 100%; pointer-events: none; }
    .pipe { position: absolute; left: 220px; width: 30px; background: linear-gradient(90deg, #73bf2e 0 16%, #9ce659 16% 34%, #73bf2e 34% 78%, #558022 78%); border: 2px solid #543847; }
    .pipe::after { content: ""; position: absolute; left: -5px; right: -5px; height: 14px; border: 2px solid #543847; background: inherit; }
    .pipe.t { top: -2px; height: 56px; } .pipe.t::after { bottom: -2px; }
    .pipe.b { bottom: -2px; height: 40px; } .pipe.b::after { top: -2px; }
    .go .pipe { animation: scroll 2.6s linear infinite; }
    @keyframes scroll { to { left: -60px; } }
    .ground { position: absolute; left: 0; right: 0; bottom: 0; height: 38px; background: #ded895; border-top: 2px solid #543847; }
    .ground::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 10px; border-bottom: 2px solid #558022;
      background: repeating-linear-gradient(135deg, #9ce659 0 6px, #73bf2e 6px 12px); background-size: 17px 10px; }
    .go .ground::before { animation: roll .45s linear infinite; }
    @keyframes roll { to { background-position: -17px 0; } }
    .ground::after { content: ""; position: absolute; left: 0; right: 0; top: 12px; height: 3px; background: #e8e1a4; }
    .bird { position: absolute; left: 40px; top: 74px; width: 34px; height: 26px; z-index: 2; }
    .bird svg { width: 100%; height: 100%; display: block; }
    .bird.idle { animation: hover 1s ease-in-out infinite; }
    @keyframes hover { 50% { transform: translateY(-5px); } }
    .bird.flap { animation: flap .55s ease-in forwards; }
    @keyframes flap { 0% { transform: translateY(0) rotate(0); } 30% { transform: translateY(-24px) rotate(-22deg); } 100% { transform: translateY(0) rotate(12deg); } }
    .score { position: absolute; top: 10px; left: 0; right: 0; z-index: 3; text-align: center; color: #fff; font: 800 26px/1 'JetBrains Mono', ui-monospace, monospace;
      text-shadow: 2px 0 0 #543847, -2px 0 0 #543847, 0 2px 0 #543847, 0 -2px 0 #543847, 2px 2px 0 #543847, -2px 2px 0 #543847, 2px -2px 0 #543847, -2px -2px 0 #543847, 0 4px 0 #543847; }
    .start { position: absolute; left: 50%; bottom: 52px; z-index: 3; width: 58px; height: 32px; margin-left: -29px; border: 2px solid #543847; border-radius: 4px; cursor: pointer; padding: 0;
      background: #fcfbe9; box-shadow: inset 0 -3px 0 #e1dcb1, inset 0 0 0 2px #fff, 0 3px 0 #543847; display: grid; place-items: center; }
    .start svg { width: 18px; height: 18px; }
    .start:hover { background: #fffff6; }
    .start:active { transform: translateY(2px); box-shadow: inset 0 -1px 0 #e1dcb1, inset 0 0 0 2px #fff, 0 1px 0 #543847; }
    .start:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .go .start { left: 20px; bottom: auto; top: 10px; width: 26px; height: 26px; margin-left: 0; }
    .go .start svg { width: 12px; height: 12px; }
    .pause { display: none; } .go .pause { display: block; } .go .play { display: none; }
  `,
  html: `
    <div class="sky" tabindex="0" role="button" aria-label="Tap to flap">
      <svg class="city" viewBox="0 0 60 8" shape-rendering="crispEdges" preserveAspectRatio="none" aria-hidden="true">${CITY}</svg>
      <div class="pipes" aria-hidden="true"><span class="pipe t"></span><span class="pipe b"></span></div>
      <div class="score">0</div>
      <div class="bird idle"><svg viewBox="0 0 17 13" shape-rendering="crispEdges" aria-hidden="true">${BIRD}</svg></div>
      <button class="start" type="button" aria-pressed="false" aria-label="Play">
        <svg class="play" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true"><path fill="#543847" d="M3 1h3v1h2v1h2v1h2v1h2v1h1v4h-1v1h-2v1h-2v1H8v1H6v1H3z"/><path fill="#5ee270" d="M4 2h2v1h2v1h2v1h2v1h2v4h-2v1h-2v1H8v1H6v1H4z"/><path fill="#2f9a3a" d="M4 11h2v-1h2V9h2V8h2V7h2v3h-2v1h-2v1H8v1H6v1H4z"/></svg>
        <svg class="pause" viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true"><path fill="#e8661c" d="M1 1h2v6H1zM5 1h2v6H5z"/></svg>
      </button>
      <div class="ground"></div>
    </div>`,
  init(root) {
    const sky = root.querySelector('.sky'), bird = root.querySelector('.bird'), score = root.querySelector('.score'), start = root.querySelector('.start');
    let n = 0, t;
    const flap = () => { if (!sky.classList.contains('go')) return; n++; score.textContent = n; bird.classList.remove('flap', 'idle'); void bird.offsetWidth; bird.classList.add('flap'); clearTimeout(t); t = setTimeout(() => bird.classList.remove('flap'), 560); };
    sky.addEventListener('click', (e) => { if (e.target.closest('.start')) return; flap(); });
    sky.addEventListener('keydown', (e) => { if (e.target !== sky) return; if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'Enter') { e.preventDefault(); flap(); } });
    start.addEventListener('click', () => {
      const go = sky.classList.toggle('go'); start.setAttribute('aria-pressed', String(go)); start.setAttribute('aria-label', go ? 'Pause' : 'Play');
      bird.classList.toggle('idle', !go); if (!go) { n = 0; score.textContent = '0'; }
    });
    return () => clearTimeout(t);
  },
};
