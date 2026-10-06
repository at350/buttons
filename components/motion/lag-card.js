const SPRING = 'linear(0, 0.143, 0.453, 0.779, 1.028, 1.168, 1.205, 1.173, 1.109, 1.043, 0.992, 0.965, 0.958, 0.965, 0.978, 0.992, 1.002, 1.007, 1.009, 1.007, 1.004, 1.002, 1)';

export default {
  id: 'mo-lag-card',
  credit: 'Lerp-follow card — chases the cursor with lag and tilts into its own velocity, then springs home on leave (Awwwards cursor-follow cards)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; height: 180px; max-width: 100%; border-radius: 12px; background: #f1f1ee; border: 1px solid #e3e3df; overflow: hidden; cursor: none; font-family: Inter, system-ui, sans-serif; }
    .card {
      position: absolute; left: 50%; top: 50%; width: 130px; height: 84px; margin: -42px 0 0 -65px; border-radius: 14px; background: #fff; box-shadow: 0 10px 30px -10px rgba(0,0,0,.25);
      padding: 12px; display: flex; flex-direction: column; justify-content: space-between; transform: translate(0, 0) rotate(0); will-change: transform;
      transition: transform .8s ${SPRING}, box-shadow .3s;
    }
    .stage:hover .card { transition: box-shadow .3s; box-shadow: 0 18px 40px -12px rgba(0,0,0,.35); }
    .card .th { height: 40px; margin: -4px -4px 0; border-radius: 9px; background: radial-gradient(80% 120% at 20% 0%, #a5b4fc, transparent 60%), radial-gradient(90% 120% at 100% 100%, #f9a8d4, transparent 60%), #c7d2fe; }
    .card b { white-space: nowrap; display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 600; color: #111; letter-spacing: -.01em; }
    .card b span { font-weight: 500; color: #8a8a8a; }
    .dot { position: absolute; width: 10px; height: 10px; margin: -5px 0 0 -5px; border-radius: 50%; background: #111; left: var(--px, 50%); top: var(--py, 50%); opacity: 0; transition: opacity .2s; pointer-events: none; }
    .stage:hover .dot { opacity: 1; }
    .stage:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
  `,
  html: `<div class="stage" tabindex="0" role="img" aria-label="Project card that follows the cursor"><div class="card" aria-hidden="true"><span class="th"></span><b>Aurora<span>2024</span></b></div><span class="dot"></span></div>`,
  init(root) {
    const stage = root.querySelector('.stage'), card = root.querySelector('.card'), dot = root.querySelector('.dot');
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0, vx = 0, hovering = false;
    const tick = () => {
      const px = x; x += (tx - x) * .12; y += (ty - y) * .12; vx = x - px;
      card.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${(vx * 1.2).toFixed(2)}deg)`;
      if (hovering || Math.abs(tx - x) > .3 || Math.abs(ty - y) > .3) raf = requestAnimationFrame(tick); else raf = 0;
    };
    stage.addEventListener('pointerenter', () => { hovering = true; if (!raf) raf = requestAnimationFrame(tick); });
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const cx = e.clientX - r.left, cy = e.clientY - r.top;
      dot.style.setProperty('--px', cx + 'px'); dot.style.setProperty('--py', cy + 'px');
      tx = Math.max(-70, Math.min(70, cx - r.width / 2)); ty = Math.max(-45, Math.min(45, cy - r.height / 2));
    });
    stage.addEventListener('pointerleave', () => {
      hovering = false; cancelAnimationFrame(raf); raf = 0; tx = ty = x = y = 0;
      card.style.transform = 'translate(0, 0) rotate(0)';
    });
    return () => cancelAnimationFrame(raf);
  },
};
