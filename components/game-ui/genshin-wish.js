export default {
  id: 'gm-genshin-wish',
  credit: 'miHoYo Genshin Impact — "Wish ×10" gold button with the Intertwined Fate cost; a light glint sweeps across on hover, pulling spins the fate',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: radial-gradient(ellipse at 50% 100%, #3b3f8a, #141632 60%, #0a0b1c); padding: 22px 26px; border-radius: 12px; display: flex; gap: 12px; align-items: center; }
    .wish { position: relative; height: 44px; padding: 0 22px 0 16px; border: none; border-radius: 22px; cursor: pointer; overflow: hidden; display: inline-flex; align-items: center; gap: 10px;
      background: linear-gradient(180deg, #fff6d8, #f0dba6 50%, #e3c07a); color: #4a3c22; font: 600 14px 'Inter', system-ui, sans-serif; letter-spacing: .3px;
      box-shadow: 0 0 0 2px #c9a656, 0 0 0 4px rgba(255,236,170,.25), 0 6px 14px rgba(0,0,0,.4); transition: transform .12s, box-shadow .2s; }
    .wish::after { content: ""; position: absolute; top: -20%; bottom: -20%; left: -40%; width: 30%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.95), transparent); transform: skewX(-20deg); opacity: 0; }
    .wish:hover::after { animation: glint .8s ease-out 1 forwards; }
    @keyframes glint { 0% { left: -40%; opacity: 1; } 100% { left: 120%; opacity: 1; } }
    .wish:hover { transform: translateY(-1px); box-shadow: 0 0 0 2px #e6c468, 0 0 0 4px rgba(255,236,170,.35), 0 0 20px rgba(255,220,130,.5), 0 8px 18px rgba(0,0,0,.45); }
    .wish:active { transform: translateY(1px); }
    .wish:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .fate { width: 22px; height: 22px; flex: none; transition: transform .6s cubic-bezier(.3,.8,.3,1); }
    .wish.pull .fate { transform: rotate(720deg) scale(1.2); }
    .cost { display: inline-flex; align-items: center; gap: 4px; margin-left: 4px; padding-left: 10px; border-left: 1px solid rgba(74,60,34,.3); font-weight: 700; font-size: 13px; }
    .cost svg { width: 14px; height: 14px; }
    .pity { color: #c9b98a; font: 500 10px 'Inter', system-ui, sans-serif; letter-spacing: 1px; text-transform: uppercase; text-align: center; line-height: 1.5; }
    .pity b { display: block; color: #fff; font: 700 18px 'Syne', 'Inter', system-ui, sans-serif; }
    .wish.five { background: linear-gradient(180deg, #ffe7a0, #f5b944 50%, #d98f1e); color: #3a2200; box-shadow: 0 0 0 2px #ffd36a, 0 0 28px rgba(255,180,60,.8), 0 8px 18px rgba(0,0,0,.45); }
  `,
  html: `
    <div class="stage">
      <button class="wish" type="button">
        <svg class="fate" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#9a7bd8" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="#c9b1ff"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4" stroke="#9a7bd8" stroke-width="2"/></svg>
        <span>Wish ×10</span>
        <span class="cost"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="#b89bf0" stroke="#6f4ec4" stroke-width="2"/></svg>10</span>
      </button>
      <div class="pity"><b class="n">0</b>pity</div>
    </div>`,
  init(root) {
    const w = root.querySelector('.wish'), n = root.querySelector('.n'); let pity = 0, t;
    w.addEventListener('click', () => {
      pity += 10; if (pity >= 90) { pity = 0; } n.textContent = pity;
      w.classList.toggle('five', pity === 0); w.classList.remove('pull'); void w.offsetWidth; w.classList.add('pull');
      clearTimeout(t); t = setTimeout(() => w.classList.remove('pull'), 650);
    });
    return () => clearTimeout(t);
  },
};
