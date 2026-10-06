const SPRING = 'linear(0, 0.144, 0.433, 0.717, 0.926, 1.046, 1.091, 1.09, 1.066, 1.038, 1.014, 1, 0.992, 0.991, 0.993, 0.995, 0.998, 1, 1.001)';

export default {
  id: 'mo-pull-refresh',
  credit: 'Pull-to-refresh — drag the list down with rubber-band resistance, the arrow fills and flips, release past the line to spin and re-stagger the rows (iOS / Twitter)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 250px; height: 240px; max-width: 100%; border-radius: 12px; background: #fff; border: 1px solid #e5e5e0; overflow: hidden; touch-action: none; font-family: Inter, system-ui, sans-serif; user-select: none; -webkit-user-select: none; }
    .ind { position: absolute; top: 14px; left: 50%; width: 30px; height: 30px; margin-left: -15px; border-radius: 50%; display: grid; place-items: center; color: #111; opacity: var(--p, 0); transform: scale(calc(.6 + var(--p, 0) * .4)); transition: opacity .2s, transform .3s; }
    .ind svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; transform: rotate(calc(var(--p, 0) * 180deg)); transition: transform .2s; }
    .ind .ring { position: absolute; inset: 0; border-radius: 50%; border: 2.5px solid #e5e5e0; border-top-color: #111; opacity: 0; }
    .stage.spin .ind { opacity: 1; transform: scale(1); } .stage.spin .ind svg { opacity: 0; }
    .stage.spin .ring { opacity: 1; animation: spin .7s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .list { position: absolute; inset: 0; padding: 10px; background: #fff; transform: translateY(var(--y, 0px)); transition: transform .5s ${SPRING}; cursor: grab; }
    .stage.drag .list { transition: none; cursor: grabbing; }
    .stage.spin .list { --y: 56px; }
    .row { display: flex; gap: 10px; align-items: center; height: 50px; padding: 0 8px; border-radius: 10px; transition: opacity .35s, transform .5s ${SPRING}; }
    .row:hover { background: #fafaf8; }
    .av { width: 32px; height: 32px; border-radius: 50%; flex: none; }
    .row > span:not(.av) { flex: 1; min-width: 0; }
    .row i { display: block; height: 7px; border-radius: 4px; background: #e8e8e4; width: 70%; } .row i + i { width: 45%; margin-top: 6px; }
    .row.fresh { opacity: 0; transform: translateY(-14px); }
    .list:focus-visible { outline: 2px solid #111; outline-offset: -3px; }
  `,
  html: `
    <div class="stage">
      <div class="ind" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 5v14M6 13l6 6 6-6"/></svg><span class="ring"></span></div>
      <div class="list" tabindex="0" role="button" aria-label="Pull to refresh">
        <div class="row"><span class="av" style="background:#fda4af"></span><span><i></i><i></i></span></div>
        <div class="row"><span class="av" style="background:#93c5fd"></span><span><i></i><i></i></span></div>
        <div class="row"><span class="av" style="background:#86efac"></span><span><i></i><i></i></span></div>
        <div class="row"><span class="av" style="background:#fcd34d"></span><span><i></i><i></i></span></div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), list = root.querySelector('.list'), rows = [...root.querySelectorAll('.row')];
    const T = 70; let sy = 0, y = 0, timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const set = (v) => { y = v; list.style.setProperty('--y', v + 'px'); stage.style.setProperty('--p', Math.min(1, v / T)); };
    const refresh = () => {
      stage.classList.add('spin'); list.style.removeProperty('--y');
      later(() => { stage.classList.remove('spin'); stage.style.setProperty('--p', 0); rows.forEach((r) => r.classList.add('fresh')); rows.forEach((r, i) => later(() => r.classList.remove('fresh'), 120 + i * 70)); }, 1200);
    };
    list.addEventListener('pointerdown', (e) => { if (stage.classList.contains('spin')) return; list.setPointerCapture(e.pointerId); sy = e.clientY; stage.classList.add('drag'); });
    list.addEventListener('pointermove', (e) => { if (!stage.classList.contains('drag')) return; const d = Math.max(0, e.clientY - sy); set(d > 0 ? 110 * (1 - Math.exp(-d / 110)) : 0); });
    const end = () => { if (!stage.classList.contains('drag')) return; stage.classList.remove('drag'); if (y >= T) refresh(); else set(0); };
    list.addEventListener('pointerup', end); list.addEventListener('pointercancel', end);
    list.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && !stage.classList.contains('spin')) { e.preventDefault(); refresh(); } });
    return () => timers.forEach(clearTimeout);
  },
};
