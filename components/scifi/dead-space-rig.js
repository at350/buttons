// Dead Space — Isaac Clarke's RIG: health lives on the spine, stasis on the shoulder, inventory is a hologram projected in front of him.
export default {
  id: 'sf-dead-space-rig',
  credit: 'EA Visceral Dead Space — Isaac\'s RIG diegetic HUD: segmented spine health (click it to take a hit), shoulder stasis arc, and the projected blue holographic inventory with med and stasis packs',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 310px; height: 210px; max-width: 100%; border-radius: 12px; overflow: hidden; background: radial-gradient(ellipse at 30% 60%, #1b1712, #060504 70%); font-family: 'Space Grotesk', system-ui, sans-serif; }
    .suit { position: absolute; left: 22px; top: 18px; width: 110px; height: 200px; border-radius: 46px 46px 10px 10px; background: linear-gradient(90deg, #2a241d, #4a4034 30%, #3b3329 70%, #231e18);
      box-shadow: inset 0 0 0 2px #15110d, inset 0 12px 20px rgba(0,0,0,.5); }
    .suit::before { content: ''; position: absolute; left: 30px; right: 30px; top: -14px; height: 40px; border-radius: 20px 20px 6px 6px; background: linear-gradient(#3b3329, #241f19); box-shadow: inset 0 0 0 2px #15110d; }
    .spine { position: absolute; left: 49px; top: 38px; width: 14px; height: 150px; border: 0; padding: 3px 2px; background: #0b0b0a; border-radius: 4px; cursor: pointer; display: flex; flex-direction: column-reverse; gap: 2px; box-shadow: 0 0 0 2px #15110d; }
    .spine i { flex: 1; border-radius: 1px; background: #11201c; transition: background .15s, box-shadow .15s; }
    .spine i.on { background: #39e6c4; box-shadow: 0 0 6px #39e6c4; }
    .low .spine i.on { background: #ff3b28; box-shadow: 0 0 7px #ff3b28; animation: bl .5s steps(1) infinite; }
    @keyframes bl { 50% { opacity: .35; } }
    .hit .suit { animation: sh .25s; } @keyframes sh { 30% { transform: translateX(-3px); } 60% { transform: translateX(3px); } }
    .spine:focus-visible, .it:focus-visible, .stz:focus-visible { outline: 2px solid #8fe0ff; outline-offset: 2px; }
    .stz { position: absolute; left: 76px; top: 40px; width: 36px; height: 36px; border: 0; padding: 0; background: none; cursor: pointer; border-radius: 50%; }
    .stz svg { width: 36px; height: 36px; transform: rotate(-90deg); }
    .stz circle { fill: none; stroke-width: 4; }
    .stz .tr { stroke: #0f1a24; } .stz .v { stroke: #3fa7ff; stroke-dasharray: 44 88; stroke-dashoffset: calc(44 - 44 * var(--s, 1)); transition: stroke-dashoffset .35s; filter: drop-shadow(0 0 3px #3fa7ff); }
    .holo { position: absolute; left: 146px; top: 22px; width: 148px; padding: 10px; transform: perspective(500px) rotateY(-14deg); transform-origin: 0 50%;
      border: 1px solid rgba(120,200,255,.6); background: linear-gradient(rgba(70,160,255,.18), rgba(70,160,255,.06)); box-shadow: 0 0 18px rgba(80,170,255,.25), inset 0 0 14px rgba(80,170,255,.15); color: #bfe6ff; }
    .holo::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg, rgba(150,220,255,.08) 0 1px, transparent 1px 3px); }
    .hd { font-size: 9px; letter-spacing: .28em; margin-bottom: 8px; color: #e6f6ff; }
    .it { display: flex; justify-content: space-between; align-items: center; width: 100%; height: 30px; margin-bottom: 5px; padding: 0 8px; border: 1px solid rgba(120,200,255,.35); background: rgba(80,170,255,.08);
      color: inherit; cursor: pointer; font: 500 10px 'Space Grotesk', system-ui, sans-serif; letter-spacing: .1em; text-align: left; white-space: nowrap; transition: background .12s; }
    .it:hover { background: rgba(80,170,255,.3); color: #fff; }
    .it:disabled { opacity: .35; cursor: default; background: none; }
    .it b { font-weight: 600; font-variant-numeric: tabular-nums; }
  `,
  html: `<div class="stage"><div class="suit"></div>
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
