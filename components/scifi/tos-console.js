// Star Trek (1966) — bridge station: translucent "jewel" buttons lit from behind, chasing blinkenlights and black rocker switches.
const JEWELS = ['#ff2d1f', '#ffb000', '#18d35a', '#2b8cff', '#ff2d1f', '#f4f1e6', '#ffb000', '#18d35a', '#2b8cff', '#ffb000', '#ff2d1f', '#18d35a'];
export default {
  id: 'sf-tos-console',
  credit: 'Star Trek: The Original Series — bridge console with back-lit translucent jewel buttons, chasing indicator lamps and rocker switches (Matt Jefferies)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 300px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 14px 16px 16px;
      background: linear-gradient(#5d6f78, #47575f); box-shadow: inset 0 2px 0 #7f939c, inset 0 -3px 0 #2c363b; }
    .deck { background: linear-gradient(170deg, #121416, #050607 70%); border-radius: 6px 6px 18px 18px; padding: 12px 14px 14px; box-shadow: inset 0 0 0 2px #22282b, inset 0 8px 18px #000; }
    .chase { display: flex; gap: 6px; justify-content: center; margin-bottom: 12px; }
    .chase i { --on: #ff2d1f; width: 10px; height: 6px; border-radius: 1px; background: #3a1010; animation: ch 1.6s steps(1) infinite; animation-delay: calc(var(--i) * -0.2s); }
    .chase i:nth-child(3n+2) { --on: #ffb000; background: #3a2a05; } .chase i:nth-child(3n) { --on: #18d35a; background: #0a2a13; }
    @keyframes ch { 0%, 60% { background-color: var(--on); box-shadow: 0 0 6px var(--on); } }
    .grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 7px 8px; }
    .jw { --c: #ff2d1f; position: relative; height: 26px; border: 0; border-radius: 3px; cursor: pointer; padding: 0;
      background: linear-gradient(160deg, color-mix(in srgb, var(--c) 38%, #000), color-mix(in srgb, var(--c) 16%, #000));
      box-shadow: inset 0 1px 0 rgba(255,255,255,.18), inset 0 -2px 3px rgba(0,0,0,.6), 0 2px 0 #000; transition: filter .08s; }
    .jw::before { content: ''; position: absolute; inset: 3px 4px 50%; border-radius: 2px; background: linear-gradient(rgba(255,255,255,.28), rgba(255,255,255,0)); }
    .jw::after { content: ''; position: absolute; inset: 0; border-radius: 3px; background: repeating-linear-gradient(90deg, rgba(255,255,255,.07) 0 2px, transparent 2px 5px); }
    .jw:hover { filter: brightness(1.6); }
    .jw[aria-pressed="true"] { background: radial-gradient(ellipse at 50% 60%, #fff 0%, var(--c) 45%, color-mix(in srgb, var(--c) 60%, #000) 100%);
      box-shadow: 0 0 10px var(--c), 0 0 22px color-mix(in srgb, var(--c) 50%, transparent), inset 0 -2px 3px rgba(0,0,0,.3), 0 2px 0 #000; }
    .jw:active { transform: translateY(1px); box-shadow: 0 1px 0 #000; }
    .jw:focus-visible, .rk:focus-visible { outline: 2px solid #9fe7ff; outline-offset: 2px; }
    .alert .chase i { --on: #ff2d1f; background: #3a1010; animation-duration: .5s; animation-delay: calc(var(--i) * -.04s); }
    .alert .jw { animation: ra 1s steps(1) infinite; }
    @keyframes ra { 50% { filter: brightness(1.8) saturate(1.4); } }
    .slide { position: relative; height: 10px; margin: 12px 6px 0; border-radius: 5px; background: #000; box-shadow: inset 0 0 0 1px #2a2f33; cursor: ew-resize; }
    .slide input { position: absolute; inset: -6px 0; width: 100%; margin: 0; opacity: 0; cursor: ew-resize; }
    .slide b { position: absolute; top: -4px; left: calc(var(--v, 40) * 1% - 7px); width: 14px; height: 18px; border-radius: 3px; background: linear-gradient(#f4f1e6, #9c9a92); box-shadow: 0 2px 0 #000; pointer-events: none; }
    .slide i { position: absolute; left: 2px; top: 3px; height: 4px; width: calc(var(--v, 40) * 1% - 4px); border-radius: 2px; background: #ffb000; box-shadow: 0 0 6px #ffb000; }
    .slide:focus-within b { outline: 2px solid #9fe7ff; outline-offset: 1px; }
    .rocks { display: flex; gap: 12px; justify-content: center; margin-top: 14px; }
    .rk { width: 28px; height: 40px; border: 0; padding: 0; cursor: pointer; border-radius: 4px; background: #0c0d0e; box-shadow: inset 0 0 0 2px #2a2f33; perspective: 80px; }
    .rk span { display: block; margin: 4px; height: 32px; border-radius: 3px; transform: rotateX(16deg);
      background: linear-gradient(#3b3f43, #141617 50%, #070808); box-shadow: inset 0 1px 0 #555; transition: transform .12s cubic-bezier(.3,1.6,.6,1); }
    .rk span::after { content: ''; display: block; width: 6px; height: 6px; margin: 4px auto; border-radius: 50%; background: #3a1010; }
    .rk[aria-pressed="true"] span { transform: rotateX(-16deg); background: linear-gradient(#070808, #141617 50%, #3b3f43); }
    .rk[aria-pressed="true"] span::after { background: #ff2d1f; box-shadow: 0 0 6px #ff2d1f; }
  `,
  html: `<div class="stage"><div class="deck">
    <div class="chase">${Array.from({ length: 12 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>
    <div class="grid">${JEWELS.map((c, i) => `<button class="jw" type="button" aria-label="Station ${i + 1}" aria-pressed="${i === 3 || i === 8}" style="--c:${c}"></button>`).join('')}</div>
    <div class="slide" style="--v:40"><i></i><b></b><input type="range" min="0" max="100" value="40" aria-label="Helm thrust"></div>
    <div class="rocks">${[0, 1, 2, 3, 4].map((i) => `<button class="rk" type="button" aria-label="Rocker ${i + 1}" aria-pressed="${i === 1}"><span></span></button>`).join('')}</div>
  </div></div>`,
  init(root) {
    const deck = root.querySelector('.deck'), rks = [...root.querySelectorAll('.rk')], jws = [...root.querySelectorAll('.jw')];
    const flip = (b) => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
    jws.forEach((b) => b.addEventListener('click', () => flip(b)));
    rks.forEach((b, i) => b.addEventListener('click', () => { flip(b); if (i === rks.length - 1) deck.classList.toggle('alert', b.getAttribute('aria-pressed') === 'true'); }));
    rks[rks.length - 1].setAttribute('aria-label', 'Red alert');
    jws.forEach((b, i) => b.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 6, ArrowUp: -6 }[e.key];
      if (d && jws[i + d]) { e.preventDefault(); jws[i + d].focus(); }
    }));
    const sl = root.querySelector('.slide'), inp = sl.querySelector('input');
    inp.addEventListener('input', () => sl.style.setProperty('--v', inp.value));
  },
};
