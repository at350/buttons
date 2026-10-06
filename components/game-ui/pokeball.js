export default {
  id: 'gm-pokeball',
  credit: 'Niantic Pokémon GO — hold the Poké Ball to charge the shrinking catch ring, release to throw; it flies, wobbles, and clicks shut (or breaks free)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 200px; height: 190px; border-radius: 12px; overflow: hidden; background: linear-gradient(180deg, #8fd3f4 0%, #c9efd5 55%, #6cbf5a 55%, #4e9f44 100%); user-select: none; -webkit-user-select: none; }
    .target { position: absolute; left: 50%; top: 56px; width: 44px; height: 44px; transform: translate(-50%, -50%); border-radius: 50%; background: radial-gradient(circle at 40% 35%, #ffe680, #f0a500 70%); box-shadow: 0 4px 8px rgba(0,0,0,.2); transition: transform .3s, opacity .3s; }
    .target::before, .target::after { content: ""; position: absolute; top: 15px; width: 6px; height: 8px; border-radius: 50%; background: #222; }
    .target::before { left: 13px; } .target::after { right: 13px; }
    .ring { position: absolute; left: 50%; top: 56px; width: 70px; height: 70px; margin: -35px 0 0 -35px; border-radius: 50%; border: 3px solid rgba(255,255,255,.9); opacity: 0; transform: scale(1); box-shadow: 0 0 0 2px rgba(60,180,90,.7), inset 0 0 0 2px rgba(60,180,90,.7); }
    .hold .ring { opacity: 1; animation: shrink 1.4s linear infinite; }
    @keyframes shrink { from { transform: scale(1); } to { transform: scale(.2); } }
    .ball { position: absolute; left: 50%; bottom: 14px; width: 54px; height: 54px; margin-left: -27px; border: none; padding: 0; border-radius: 50%; cursor: grab; touch-action: none;
      background: linear-gradient(180deg, #ee1c25 0 46%, #111 46% 54%, #f4f4f4 54%); box-shadow: 0 4px 8px rgba(0,0,0,.3), inset -4px -4px 8px rgba(0,0,0,.2); transition: transform .08s; }
    .ball::after { content: ""; position: absolute; left: 50%; top: 50%; width: 16px; height: 16px; margin: -8px 0 0 -8px; border-radius: 50%; background: #fff; border: 3px solid #111; box-shadow: inset 0 0 0 2px #ddd; transition: background .2s, box-shadow .2s; }
    .hold .ball { transform: scale(.92); cursor: grabbing; }
    .ball:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
    .throw .ball { animation: fly .9s cubic-bezier(.3,.6,.4,1) forwards; }
    @keyframes fly { 0% { transform: translateY(0) scale(1) rotate(0); } 60% { transform: translateY(-120px) scale(.55) rotate(540deg); } 70% { transform: translateY(-104px) scale(.55) rotate(560deg); } 100% { transform: translateY(-104px) scale(.55) rotate(560deg); } }
    .throw .target { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    .wob .ball { animation: wobble .5s ease-in-out 3; transform: translateY(-104px) scale(.55); }
    @keyframes wobble { 0%, 100% { transform: translateY(-104px) scale(.55) rotate(-16deg); } 50% { transform: translateY(-104px) scale(.55) rotate(16deg); } }
    .wob .target, .caught .target { opacity: 0; transform: translate(-50%, -50%) scale(0); }
    .caught .ball { transform: translateY(-104px) scale(.55); } .caught .ball::after { background: #ff4a4a; box-shadow: 0 0 10px #ff4a4a; }
    .msg { position: absolute; left: 0; right: 0; top: 10px; text-align: center; color: #fff; font: 800 14px 'Unbounded', 'Syne', system-ui, sans-serif; text-shadow: 0 2px 4px rgba(0,0,0,.4); opacity: 0; transition: opacity .3s; }
    .caught .msg, .fled .msg { opacity: 1; }
    .fled .ball { transform: translateY(-104px) scale(.55); opacity: .4; }
  `,
  html: `
    <div class="stage">
      <div class="msg">Gotcha!</div>
      <div class="ring"></div>
      <div class="target"></div>
      <button class="ball" type="button" aria-label="Hold and release to throw"></button>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), ball = root.querySelector('.ball'), msg = root.querySelector('.msg');
    let down = 0; const timers = [];
    const reset = () => { stage.className = 'stage'; };
    const begin = () => { if (stage.classList.contains('caught') || stage.classList.contains('fled')) { reset(); return; } if (stage.classList.contains('throw') || stage.classList.contains('wob')) return; down = Date.now(); stage.classList.add('hold'); };
    const release = () => {
      if (!down) return; const held = Date.now() - down; down = 0; stage.classList.remove('hold');
      if (held < 120) return; stage.classList.add('throw');
      timers.push(setTimeout(() => { stage.classList.remove('throw'); stage.classList.add('wob'); }, 900));
      timers.push(setTimeout(() => { stage.classList.remove('wob'); const ok = Math.random() < .7; msg.textContent = ok ? 'Gotcha!' : 'Oh no!'; stage.classList.add(ok ? 'caught' : 'fled'); }, 2400));
    };
    ball.addEventListener('pointerdown', (e) => { e.preventDefault(); begin(); });
    ball.addEventListener('pointerup', release); ball.addEventListener('pointercancel', release); ball.addEventListener('pointerleave', release);
    ball.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !down) { e.preventDefault(); begin(); } });
    ball.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (down) down -= 200; release(); } });
    return () => timers.forEach(clearTimeout);
  },
};
