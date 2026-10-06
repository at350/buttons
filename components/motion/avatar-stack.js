const SPRING = 'linear(0, 0.144, 0.433, 0.717, 0.926, 1.046, 1.091, 1.09, 1.066, 1.038, 1.014, 1, 0.992, 0.991, 0.993, 0.995, 0.998, 1, 1.001)';

export default {
  id: 'mo-avatar-stack',
  credit: 'Avatar stack — overlapping faces fan apart with a staggered spring on hover, name tags float up (Aceternity "Animated Tooltip")',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { position: relative; width: 240px; height: 86px; padding-top: 34px; font-family: Inter, system-ui, sans-serif; }
    .stack { position: relative; height: 44px; width: 100%; cursor: default; }
    .stack:focus-visible { outline: 2px solid #111; outline-offset: 4px; border-radius: 999px; }
    .av {
      position: absolute; top: 0; left: 0; width: 44px; height: 44px; border-radius: 50%; border: 2.5px solid #ecece8; display: grid; place-items: center;
      color: #fff; font-weight: 600; font-size: 14px; transform: translateX(calc(var(--i) * 30px)); z-index: calc(10 - var(--i));
      transition: transform .55s ${SPRING}; transition-delay: calc(var(--i) * 40ms); box-shadow: 0 2px 6px rgba(0,0,0,.12);
    }
    .stack:hover .av, .stack.open .av { transform: translateX(calc(var(--i) * 50px)) scale(1.08); }
    .av:hover { z-index: 20; }
    .tag {
      position: absolute; left: 50%; top: -32px; transform: translate(-50%, 8px) scale(.8); opacity: 0; padding: 4px 8px; border-radius: 6px; background: #111; color: #fff;
      font-size: 11px; font-weight: 600; white-space: nowrap; pointer-events: none; transition: transform .4s ${SPRING}, opacity .2s; transition-delay: calc(var(--i) * 40ms + 120ms);
    }
    .tag::after { content: ''; position: absolute; left: 50%; bottom: -4px; width: 8px; height: 8px; background: #111; transform: translateX(-50%) rotate(45deg); border-radius: 1px; }
    .stack:hover .tag, .stack.open .tag { transform: translate(-50%, 0) scale(1); opacity: 1; }
    .av.more { background: #fff; color: #555; font-size: 12px; }
  `,
  html: `
    <div class="wrap">
      <div class="stack" tabindex="0" role="group" aria-label="Collaborators">
        <span class="av" style="--i:0;background:linear-gradient(135deg,#f97316,#ef4444)">AC<span class="tag">Alex Chen</span></span>
        <span class="av" style="--i:1;background:linear-gradient(135deg,#8b5cf6,#ec4899)">MJ<span class="tag">Mia Jones</span></span>
        <span class="av" style="--i:2;background:linear-gradient(135deg,#06b6d4,#3b82f6)">RK<span class="tag">Ravi Kumar</span></span>
        <span class="av" style="--i:3;background:linear-gradient(135deg,#22c55e,#14b8a6)">SL<span class="tag">Sara Lee</span></span>
        <span class="av more" style="--i:4">+3<span class="tag">3 more</span></span>
      </div>
    </div>`,
  init(root) {
    const s = root.querySelector('.stack');
    s.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); s.classList.toggle('open'); } });
    s.addEventListener('blur', () => s.classList.remove('open'));
  },
};
