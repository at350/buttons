export default {
  id: 'gm-gacha-summon',
  credit: 'Mobile gacha (Fate/GO, FEH, Arknights style) — ornate gold "Summon ×10" with gem cost; each pull spins the gem, flashes a rarity ribbon and drains the gem balance',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; background: radial-gradient(ellipse at 50% 0%, #4a1f6e, #1a0a2e 60%, #0a0414); padding: 22px 26px 16px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; gap: 10px; overflow: hidden; }
    .sum { position: relative; width: 210px; height: 56px; border: none; cursor: pointer; padding: 0; border-radius: 28px; color: #4a2a00; font: 800 16px 'Syne', 'Inter', system-ui, sans-serif; letter-spacing: .5px; display: inline-flex; align-items: center; justify-content: center; gap: 10px;
      background: linear-gradient(180deg, #fff1b8 0%, #f7c94c 45%, #d99a1a 55%, #f2c14e 100%); box-shadow: 0 0 0 2px #7a4a05, 0 0 0 4px #ffe79a, 0 0 0 5px #7a4a05, 0 6px 0 #6a3f00, 0 10px 18px rgba(0,0,0,.6), inset 0 2px 0 rgba(255,255,255,.7); transition: transform .08s, box-shadow .08s, filter .2s; }
    .sum::before, .sum::after { content: "◆"; position: absolute; top: 50%; transform: translateY(-50%); font-size: 10px; color: #7a4a05; }
    .sum::before { left: 14px; } .sum::after { right: 14px; }
    .sum:hover { filter: brightness(1.08) saturate(1.1); }
    .sum:active { transform: translateY(5px); box-shadow: 0 0 0 2px #7a4a05, 0 0 0 4px #ffe79a, 0 0 0 5px #7a4a05, 0 1px 0 #6a3f00, 0 4px 10px rgba(0,0,0,.6), inset 0 2px 0 rgba(255,255,255,.7); }
    .sum:focus-visible { outline: 2px solid #fff; outline-offset: 8px; }
    .gem { width: 18px; height: 18px; transition: transform .6s cubic-bezier(.3,.8,.3,1); }
    .sum.pull .gem { transform: rotateY(720deg) scale(1.3); }
    .cost { font-size: 13px; display: inline-flex; align-items: center; gap: 3px; padding-left: 8px; border-left: 1px solid rgba(74,42,0,.35); }
    .bal { color: #e9d8ff; font: 600 11px 'Inter', system-ui, sans-serif; display: inline-flex; align-items: center; gap: 5px; background: rgba(0,0,0,.35); padding: 3px 10px; border-radius: 10px; }
    .bal svg { width: 12px; height: 12px; }
    .sum.poor { filter: grayscale(.8) brightness(.7); cursor: not-allowed; }
    .rib { position: absolute; left: -10%; right: -10%; top: 50%; transform: translateY(-50%) scaleX(0); padding: 6px 0; text-align: center; color: #fff; font: 800 18px 'Unbounded', 'Syne', system-ui, sans-serif; letter-spacing: 3px; pointer-events: none; opacity: 0; }
    .rib.r3 { background: linear-gradient(90deg, transparent, #3b82f6, transparent); } .rib.r4 { background: linear-gradient(90deg, transparent, #a855f7, transparent); } .rib.r5 { background: linear-gradient(90deg, transparent, #f59e0b, transparent); text-shadow: 0 0 12px #ffd700; }
    .rib.show { animation: rib 1.4s ease-out forwards; }
    @keyframes rib { 0% { transform: translateY(-50%) scaleX(0); opacity: 0; } 15% { transform: translateY(-50%) scaleX(1); opacity: 1; } 80% { opacity: 1; } 100% { opacity: 0; transform: translateY(-50%) scaleX(1); } }
  `,
  html: `
    <div class="stage">
      <button class="sum" type="button"><svg class="gem" viewBox="0 0 24 24"><path d="M12 2 20 9l-8 13L4 9z" fill="#7dd3fc" stroke="#0369a1" stroke-width="1.5"/><path d="M4 9h16M12 2 9 9l3 13 3-13z" fill="none" stroke="#0369a1" stroke-width="1"/></svg><span>Summon ×10</span><span class="cost">◆ 1500</span></button>
      <span class="bal"><svg viewBox="0 0 24 24"><path d="M12 2 20 9l-8 13L4 9z" fill="#7dd3fc" stroke="#0369a1" stroke-width="1.5"/></svg><span class="n">9,000</span></span>
      <div class="rib">★★★★★</div>
    </div>`,
  init(root) {
    const s = root.querySelector('.sum'), n = root.querySelector('.n'), rib = root.querySelector('.rib'); let bal = 9000, t;
    s.addEventListener('click', () => {
      if (bal < 1500) { bal = 9000; n.textContent = bal.toLocaleString(); s.classList.remove('poor'); return; }
      bal -= 1500; n.textContent = bal.toLocaleString(); s.classList.toggle('poor', bal < 1500);
      const r = Math.random(); const k = r < .1 ? 5 : r < .4 ? 4 : 3; rib.className = 'rib r' + k; rib.textContent = '★'.repeat(k); void rib.offsetWidth; rib.classList.add('show');
      s.classList.remove('pull'); void s.offsetWidth; s.classList.add('pull'); clearTimeout(t); t = setTimeout(() => s.classList.remove('pull'), 650);
    });
    return () => clearTimeout(t);
  },
};
