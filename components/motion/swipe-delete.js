const SPRING = 'linear(0, 0.144, 0.433, 0.717, 0.926, 1.046, 1.091, 1.09, 1.066, 1.038, 1.014, 1, 0.992, 0.991, 0.993, 0.995, 0.998, 1, 1.001)';

export default {
  id: 'mo-swipe-delete',
  credit: 'iOS Mail swipe-to-delete — drag the row left to reveal the red action, snap open or spring shut, tap to collapse it away',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .list { width: 300px; max-width: 100%; border-radius: 14px; background: #fff; border: 1px solid #e5e5e0; overflow: hidden; font-family: Inter, system-ui, sans-serif; }
    .item { position: relative; height: 64px; overflow: hidden; touch-action: pan-y; transition: height .45s ${SPRING}, opacity .3s; }
    .item.gone { height: 0; opacity: 0; }
    .act { position: absolute; top: 0; bottom: 0; right: 0; width: 84px; border: 0; background: #ef4444; color: #fff; font: 600 13px Inter, system-ui, sans-serif; cursor: pointer; display: grid; place-items: center; transform: translateX(var(--a, 84px)); transition: transform .45s ${SPRING}, background .2s; }
    .act:hover { background: #dc2626; } .act:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }
    .act svg { width: 20px; height: 20px; fill: none; stroke: #fff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .3s ${SPRING}; }
    .item.open .act svg { transform: scale(1.1); }
    .row { position: absolute; inset: 0; display: flex; align-items: center; gap: 12px; padding: 0 16px; background: #fff; transform: translateX(var(--x, 0px)); transition: transform .45s ${SPRING}; cursor: grab; user-select: none; -webkit-user-select: none; }
    .item.drag .row, .item.drag .act { transition: none; }
    .row:active { cursor: grabbing; }
    .row:focus-visible { outline: 2px solid #111; outline-offset: -3px; border-radius: 10px; }
    .av { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #ef4444); flex: none; }
    .txt { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
    .txt b { font-size: 13.5px; font-weight: 600; color: #111; } .txt span { font-size: 12px; color: #777; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .hint { height: 44px; display: grid; place-items: center; font: 500 12px Inter, system-ui, sans-serif; color: #999; border-top: 1px solid #f0f0ec; }
    .hint button { border: 0; background: transparent; color: #2563eb; font: inherit; font-weight: 600; cursor: pointer; opacity: 0; transition: opacity .3s; pointer-events: none; }
    .list.empty .hint button { opacity: 1; pointer-events: auto; }
    .hint button:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; border-radius: 4px; }
  `,
  html: `
    <div class="list">
      <div class="item">
        <button class="act" type="button" aria-label="Delete"><svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg></button>
        <div class="row" tabindex="0"><span class="av"></span><span class="txt"><b>Alex Chen</b><span>Are we still on for Thursday?</span></span></div>
      </div>
      <div class="hint"><button type="button">Restore</button></div>
    </div>`,
  init(root) {
    const list = root.querySelector('.list'), item = root.querySelector('.item'), row = root.querySelector('.row');
    const W = 84; let x = 0, sx = 0, base = 0, t = 0;
    const setX = (v) => { x = v; item.style.setProperty('--x', v + 'px'); item.style.setProperty('--a', Math.max(0, W + v) + 'px'); };
    const snap = (open) => { item.classList.remove('drag'); item.classList.toggle('open', open); setX(open ? -W : 0); };
    row.addEventListener('pointerdown', (e) => { if (item.classList.contains('gone')) return; row.setPointerCapture(e.pointerId); sx = e.clientX; base = x; item.classList.add('drag'); });
    row.addEventListener('pointermove', (e) => {
      if (!row.hasPointerCapture(e.pointerId)) return;
      let v = base + e.clientX - sx; if (v > 0) v = Math.pow(v, .5); if (v < -W) v = -W - Math.pow(-W - v, .6);
      setX(v);
    });
    const end = () => { if (!item.classList.contains('drag')) return; snap(x < -W / 2); };
    row.addEventListener('pointerup', end); row.addEventListener('pointercancel', end);
    row.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') snap(true); if (e.key === 'ArrowRight' || e.key === 'Escape') snap(false); });
    root.querySelector('.act').addEventListener('click', () => { item.classList.add('gone'); list.classList.add('empty'); });
    root.querySelector('.hint button').addEventListener('click', () => { list.classList.remove('empty'); snap(false); clearTimeout(t); t = setTimeout(() => item.classList.remove('gone'), 50); });
    return () => clearTimeout(t);
  },
};
