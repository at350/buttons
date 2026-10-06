const SPRING = 'linear(0, 0.144, 0.433, 0.717, 0.926, 1.046, 1.091, 1.09, 1.066, 1.038, 1.014, 1, 0.992, 0.991, 0.993, 0.995, 0.998, 1, 1.001)';

export default {
  id: 'mo-swipe-cards',
  credit: 'Tinder-style swipe stack — drag the top card, it tilts with your hand and flies off; the next card scales up into place',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 240px; height: 250px; max-width: 100%; border-radius: 12px; background: #111; overflow: hidden; touch-action: none; font-family: Inter, system-ui, sans-serif; }
    .card {
      position: absolute; left: 40px; top: 30px; width: 160px; height: 190px; border-radius: 18px; cursor: grab; user-select: none; -webkit-user-select: none;
      display: flex; align-items: flex-end; padding: 14px; color: #fff; font-weight: 600; font-size: 15px; letter-spacing: -.01em;
      transform: translate(var(--x, 0px), calc(var(--i) * 10px)) rotate(var(--r, 0deg)) scale(calc(1 - var(--i) * .06)); transform-origin: 50% 120%;
      transition: transform .55s ${SPRING}, opacity .3s; z-index: calc(10 - var(--i)); box-shadow: 0 12px 30px -10px rgba(0,0,0,.6);
    }
    .card.drag { transition: none; cursor: grabbing; }
    .card.out { transition: transform .5s cubic-bezier(.3, .6, .4, 1), opacity .4s .1s; opacity: 0; }
    .card.hide { opacity: 0; transform: translate(0, 40px) scale(.8); }
    .card .tag { position: absolute; top: 14px; padding: 4px 8px; border-radius: 6px; border: 2px solid; font-size: 12px; font-weight: 800; letter-spacing: .08em; opacity: 0; transform: rotate(-12deg); transition: opacity .15s; }
    .card .yes { left: 12px; color: #4ade80; border-color: #4ade80; } .card .no { right: 12px; color: #f87171; border-color: #f87171; transform: rotate(12deg); }
    .btns { position: absolute; left: 0; right: 0; bottom: 10px; display: flex; justify-content: center; gap: 14px; }
    .btns button { width: 36px; height: 36px; border-radius: 50%; border: 0; cursor: pointer; display: grid; place-items: center; background: #222; color: #fff; transition: transform .3s cubic-bezier(.34, 1.56, .64, 1), background .2s; }
    .btns button:hover { transform: scale(1.12); background: #333; } .btns button:active { transform: scale(.92); }
    .btns button:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .btns svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
    .btns .l svg { stroke: #f87171; } .btns .r svg { stroke: #4ade80; }
  `,
  html: `
    <div class="stage">
      <div class="card" style="background:linear-gradient(160deg,#f472b6,#7c3aed)"><span class="tag yes">LIKE</span><span class="tag no">NOPE</span>Aurora</div>
      <div class="card" style="background:linear-gradient(160deg,#fb923c,#dc2626)"><span class="tag yes">LIKE</span><span class="tag no">NOPE</span>Ember</div>
      <div class="card" style="background:linear-gradient(160deg,#22d3ee,#1d4ed8)"><span class="tag yes">LIKE</span><span class="tag no">NOPE</span>Tide</div>
      <div class="btns"><button class="l" type="button" aria-label="Nope"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button><button class="r" type="button" aria-label="Like"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></button></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), cards = [...root.querySelectorAll('.card')];
    let deck = cards.slice(), sx = 0, dragging = null, dx = 0, timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const layout = () => deck.forEach((c, i) => c.style.setProperty('--i', i));
    layout();
    const fling = (c, dir) => {
      c.classList.remove('drag'); c.classList.add('out');
      c.style.setProperty('--x', dir * 320 + 'px'); c.style.setProperty('--r', dir * 30 + 'deg');
      deck = deck.filter((x) => x !== c); layout();
      if (!deck.length) later(() => { deck = cards.slice(); cards.forEach((k, i) => { k.classList.remove('out'); k.classList.add('hide'); k.style.setProperty('--x', '0px'); k.style.setProperty('--r', '0deg'); k.style.setProperty('--i', i); later(() => k.classList.remove('hide'), 60 + i * 80); }); }, 500);
    };
    stage.addEventListener('pointerdown', (e) => {
      const c = e.target.closest('.card'); if (!c || c !== deck[0]) return;
      dragging = c; sx = e.clientX; dx = 0; stage.setPointerCapture(e.pointerId); c.classList.add('drag');
    });
    stage.addEventListener('pointermove', (e) => {
      if (!dragging) return; dx = e.clientX - sx;
      dragging.style.setProperty('--x', dx + 'px'); dragging.style.setProperty('--r', dx / 12 + 'deg');
      dragging.querySelector('.yes').style.opacity = Math.min(1, Math.max(0, dx / 60)); dragging.querySelector('.no').style.opacity = Math.min(1, Math.max(0, -dx / 60));
    });
    const end = () => {
      if (!dragging) return; const c = dragging; dragging = null;
      c.querySelectorAll('.tag').forEach((t) => (t.style.opacity = 0));
      if (Math.abs(dx) > 70) fling(c, Math.sign(dx)); else { c.classList.remove('drag'); c.style.setProperty('--x', '0px'); c.style.setProperty('--r', '0deg'); }
    };
    stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
    root.querySelector('.l').addEventListener('click', () => deck[0] && fling(deck[0], -1));
    root.querySelector('.r').addEventListener('click', () => deck[0] && fling(deck[0], 1));
    return () => timers.forEach(clearTimeout);
  },
};
