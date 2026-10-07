// Dead Space — Isaac Clarke's RIG: health lives on the spine, stasis on the shoulder, inventory is a hologram projected in front of him.
export default {
  id: 'sf-dead-space-rig',
  credit: 'EA Visceral Dead Space — Isaac\'s RIG diegetic HUD: segmented spine health (click it to take a hit), shoulder stasis arc, and the projected blue holographic inventory with med and stasis packs',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 310px; height: 210px; max-width: 100%; border-radius: 12px; overflow: hidden; background: radial-gradient(ellipse at 30% 60%, #1b1712, #060504 70%); font-family: 'Space Grotesk', system-ui, sans-serif; }
    .suit { position: absolute; left: 4px; top: 4px; width: 150px; height: 229px; }
    .suit .m { fill: url(#mt); stroke: #120e0b; stroke-width: 1.2; } .suit .d { fill: url(#dk); stroke: #120e0b; stroke-width: 1.2; }
    .suit .s { fill: none; stroke: #1a1410; stroke-width: 1; } .suit .h { fill: none; stroke: #9a8670; stroke-width: .8; opacity: .55; }
    .suit .c { fill: #0c0a08; stroke: #3a3026; }
    .spine { position: absolute; left: 75px; top: 80px; width: 14px; height: 124px; border: 0; padding: 3px 2px; background: #0b0b0a; border-radius: 4px; cursor: pointer; display: flex; flex-direction: column-reverse; gap: 2px; box-shadow: 0 0 0 2px #15110d; }
    .spine i { flex: 1; border-radius: 1px; background: #11201c; transition: background .15s, box-shadow .15s; }
    .spine i.on { background: #39e6c4; box-shadow: 0 0 6px #39e6c4; }
    .low .spine i.on { background: #ff3b28; box-shadow: 0 0 7px #ff3b28; animation: bl .5s steps(1) infinite; }
    @keyframes bl { 50% { opacity: .35; } }
    .hit .suit { animation: sh .25s; } @keyframes sh { 30% { transform: translateX(-3px); } 60% { transform: translateX(3px); } }
    .spine:focus-visible, .it:focus-visible, .stz:focus-visible { outline: 2px solid #8fe0ff; outline-offset: 2px; }
    .stz { position: absolute; left: 95px; top: 78px; width: 36px; height: 36px; border: 0; padding: 0; background: none; cursor: pointer; border-radius: 50%; }
    .stz svg { width: 36px; height: 36px; transform: rotate(-90deg); }
    .stz circle { fill: none; stroke-width: 4; }
    .stz .tr { stroke: #0f1a24; } .stz .v { stroke: #3fa7ff; stroke-dasharray: 44 88; stroke-dashoffset: calc(44 - 44 * var(--s, 1)); transition: stroke-dashoffset .35s; filter: drop-shadow(0 0 3px #3fa7ff); }
    .holo { position: absolute; left: 152px; top: 22px; width: 144px; padding: 10px; transform: perspective(500px) rotateY(-14deg); transform-origin: 0 50%;
      border: 1px solid rgba(120,200,255,.6); background: linear-gradient(rgba(70,160,255,.18), rgba(70,160,255,.06)); box-shadow: 0 0 18px rgba(80,170,255,.25), inset 0 0 14px rgba(80,170,255,.15); color: #bfe6ff; }
    .holo::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, rgba(150,220,255,.08) 0 1px, transparent 1px 3px); }
    .hd { font-size: 9px; letter-spacing: .28em; margin-bottom: 8px; color: #e6f6ff; }
    .it { display: flex; justify-content: space-between; align-items: center; width: 100%; height: 30px; margin-bottom: 5px; padding: 0 8px; border: 1px solid rgba(120,200,255,.35); background: rgba(80,170,255,.08);
      color: inherit; cursor: pointer; font: 500 10px 'Space Grotesk', system-ui, sans-serif; letter-spacing: .1em; text-align: left; white-space: nowrap; transition: background .12s; }
    .it:hover { background: rgba(80,170,255,.3); color: #fff; }
    .it:disabled { opacity: .35; cursor: default; background: none; }
    .it b { font-weight: 600; font-variant-numeric: tabular-nums; }
  `,
  html: `<div class="stage"><svg class="suit" viewBox="0 0 150 229" aria-hidden="true"><defs>
      <linearGradient id="mt" x1="0" x2="1"><stop offset="0" stop-color="#2a221b"/><stop offset=".35" stop-color="#6a5845"/><stop offset=".55" stop-color="#57483a"/><stop offset="1" stop-color="#1e1915"/></linearGradient>
      <linearGradient id="dk" x1="0" x2="1"><stop offset="0" stop-color="#1c1712"/><stop offset=".4" stop-color="#3e3328"/><stop offset="1" stop-color="#16120e"/></linearGradient></defs>
      <path class="d" d="M30 84Q82 70 134 84L140 229H24Z"/>
      <path class="m" d="M34 96Q82 86 130 96L126 150Q82 140 38 150Z"/><path class="m" d="M38 156Q82 146 126 156L128 229H36Z"/>
      <path class="s" d="M40 120Q82 112 124 120M42 186Q82 178 122 186M44 206Q82 198 120 206"/>
      <path class="m" d="M44 72C20 70 4 86 2 112V146L30 142C30 112 38 94 56 82Z"/><path class="s" d="M8 104Q22 92 40 86M4 124Q18 112 32 106"/>
      <path class="m" d="M120 72C144 70 150 86 150 112V146L134 142C134 112 126 94 108 82Z"/><path class="s" d="M146 104Q138 92 124 86M150 124Q144 112 132 106"/>
      <path class="d" d="M50 70Q82 60 114 70L116 82Q82 74 48 82Z"/>
      <path class="m" d="M58 66C52 38 62 10 82 8C102 10 112 38 106 66Q82 72 58 66Z"/>
      <path class="s" d="M60 24Q82 18 104 24M57 38Q82 32 107 38M57 52Q82 46 107 52M82 9V68"/><path class="h" d="M70 14Q76 10 82 10M62 30Q64 22 70 16"/>
      <rect class="c" x="70" y="74" width="24" height="134" rx="6"/>
      <path class="s" d="M66 90h6M66 112h6M66 134h6M66 156h6M66 178h6M92 90h6M92 112h6M92 134h6M92 156h6M92 178h6" stroke="#0c0a08" stroke-width="2"/></svg>
    <button class="spine" type="button" aria-label="RIG health">${'<i class="on"></i>'.repeat(10)}</button>
    <button class="stz" type="button" aria-label="Stasis"><svg viewBox="0 0 36 36"><circle class="tr" cx="18" cy="18" r="14" stroke-dasharray="44 88"/><circle class="v" cx="18" cy="18" r="14"/></svg></button>
    <div class="holo"><div class="hd">INVENTORY</div>
      <button class="it" type="button" data-h="3">MED PACK S <b>×2</b></button><button class="it" type="button" data-h="6">MED PACK M <b>×1</b></button><button class="it" type="button" data-s="1">STASIS PACK <b>×1</b></button></div></div>`,
  init(root) {
    const st = root.querySelector('.stage'), segs = [...root.querySelectorAll('.spine i')], stz = root.querySelector('.stz'), its = [...root.querySelectorAll('.it')];
    let hp = 10, sz = 1, tms = [];
    const cnt = its.map((b) => +b.querySelector('b').textContent.slice(1)), base = [...cnt];
    const render = () => {
      segs.forEach((s, i) => s.classList.toggle('on', i < hp)); st.classList.toggle('low', hp > 0 && hp <= 3);
      stz.style.setProperty('--s', sz); its.forEach((b, i) => { b.querySelector('b').textContent = `×${cnt[i]}`; b.disabled = !cnt[i]; });
    };
    root.querySelector('.spine').addEventListener('click', () => {
      hp = Math.max(0, hp - 2); st.classList.remove('hit'); void st.offsetWidth; st.classList.add('hit'); render();
      if (!hp) tms.push(setTimeout(() => { hp = 10; sz = 1; base.forEach((v, i) => { cnt[i] = v; }); render(); }, 1400));
    });
    stz.addEventListener('click', () => { sz = Math.max(0, +(sz - .25).toFixed(2)); render(); });
    its.forEach((b, i) => b.addEventListener('click', () => {
      if (!cnt[i]) return; cnt[i]--;
      if (b.dataset.h) hp = Math.min(10, hp + +b.dataset.h); else sz = 1;
      render();
    }));
    render();
    return () => tms.forEach(clearTimeout);
  },
};
