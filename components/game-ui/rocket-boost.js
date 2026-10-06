export default {
  id: 'gm-rocket-boost',
  credit: 'Psyonix Rocket League — the HUD boost gauge: hold the button to burn boost (arc drains, flame glows), release and drive over the pad to refill',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: radial-gradient(ellipse at 50% 100%, #1e2a44, #0a0f1d 70%); padding: 18px 26px 16px; border-radius: 12px; display: flex; gap: 18px; align-items: center; font-family: 'Unbounded', 'Syne', system-ui, sans-serif; user-select: none; -webkit-user-select: none; }
    .gauge { position: relative; width: 110px; height: 110px; }
    .gauge svg { width: 100%; height: 100%; }
    .trk { fill: none; stroke: rgba(255,255,255,.12); stroke-width: 10; stroke-linecap: round; }
    .arc { fill: none; stroke: #ff9a1f; stroke-width: 10; stroke-linecap: round; stroke-dasharray: 254 339; transition: stroke-dasharray .1s linear, stroke .2s, filter .2s; }
    .burn .arc { stroke: #ffd21f; filter: drop-shadow(0 0 6px #ffb21f); }
    .low .arc { stroke: #ff3b3b; }
    .num { position: absolute; inset: 0; display: grid; place-items: center; color: #fff; font: 800 26px 'Unbounded', 'Syne', system-ui, sans-serif; text-shadow: 0 0 10px rgba(255,160,30,.7); }
    .num small { font-size: 9px; letter-spacing: 3px; opacity: .7; margin-top: -4px; }
    .col { display: flex; flex-direction: column; gap: 10px; }
    .btn { width: 76px; height: 44px; border: none; cursor: pointer; border-radius: 6px; color: #fff; font: 700 11px 'Unbounded', 'Syne', system-ui, sans-serif; letter-spacing: 1px; position: relative; overflow: hidden; }
    .boost { background: linear-gradient(180deg, #ff8a1f, #d35400); box-shadow: 0 4px 0 #8a3a00, 0 6px 10px rgba(0,0,0,.5); transition: transform .06s, box-shadow .06s; }
    .boost:active, .boost.held { transform: translateY(4px); box-shadow: 0 0 0 #8a3a00, 0 2px 6px rgba(0,0,0,.5); }
    .boost::after { content: ""; position: absolute; left: -20%; top: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.4), transparent); transform: skewX(-20deg); opacity: 0; }
    .boost.held::after { animation: sweep .4s linear infinite; }
    @keyframes sweep { to { left: 110%; opacity: 1; } }
    .pad { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.2); }
    .pad:hover { background: rgba(255,255,255,.16); }
    .pad::before { content: ""; position: absolute; left: 50%; top: 50%; width: 0; height: 0; border-radius: 50%; background: rgba(255,160,30,.5); transform: translate(-50%, -50%); }
    .pad.fill::before { animation: rip .5s ease-out; }
    @keyframes rip { to { width: 140px; height: 140px; opacity: 0; } }
    .btn:focus-visible { outline: 2px solid #ffd21f; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="gauge"><svg viewBox="0 0 120 120"><circle class="trk" cx="60" cy="60" r="54" stroke-dasharray="254 339" transform="rotate(135 60 60)"/><circle class="arc" cx="60" cy="60" r="54" transform="rotate(135 60 60)"/></svg><div class="num"><div><span class="v">100</span><small style="display:block;text-align:center">BOOST</small></div></div></div>
      <div class="col">
        <button class="btn boost" type="button" aria-label="Hold to boost">BOOST</button>
        <button class="btn pad" type="button" aria-label="Boost pad">PAD</button>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), arc = root.querySelector('.arc'), v = root.querySelector('.v'), boost = root.querySelector('.boost'), pad = root.querySelector('.pad');
    let b = 100, timer = null;
    const draw = () => { arc.style.strokeDasharray = (254 * b / 100) + ' 339'; v.textContent = Math.round(b); stage.classList.toggle('low', b < 25); };
    const start = () => { if (timer) return; boost.classList.add('held'); stage.classList.add('burn'); timer = setInterval(() => { b = Math.max(0, b - 2); draw(); if (b === 0) stop(); }, 50); };
    const stop = () => { clearInterval(timer); timer = null; boost.classList.remove('held'); stage.classList.remove('burn'); };
    boost.addEventListener('pointerdown', (e) => { e.preventDefault(); start(); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => boost.addEventListener(ev, stop));
    boost.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); start(); } });
    boost.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') stop(); });
    pad.addEventListener('click', () => { b = Math.min(100, b + 12); draw(); pad.classList.remove('fill'); void pad.offsetWidth; pad.classList.add('fill'); });
    draw();
    return stop;
  },
};
