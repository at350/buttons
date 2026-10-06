const SPRING = 'linear(0, 0.144, 0.433, 0.717, 0.926, 1.046, 1.091, 1.09, 1.066, 1.038, 1.014, 1, 0.992, 0.991, 0.993, 0.995, 0.998, 1, 1.001)';

export default {
  id: 'mo-drag-reorder',
  credit: 'Drag-to-reorder list — grab a row, it lifts and follows the pointer, the others slide out of the way and everything springs into place (Framer Motion Reorder)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .list { position: relative; width: 260px; max-width: 100%; height: 182px; padding: 10px; border-radius: 16px; background: #f4f4f1; border: 1px solid #e3e3df; font-family: Inter, system-ui, sans-serif; touch-action: none; }
    .row {
      position: absolute; left: 10px; right: 10px; top: 10px; height: 50px; display: flex; align-items: center; gap: 12px; padding: 0 12px 0 14px;
      border-radius: 12px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.06); cursor: grab; user-select: none; -webkit-user-select: none;
      transform: translateY(var(--y, 0px)) scale(var(--s, 1)); transition: transform .5s ${SPRING}, box-shadow .3s; will-change: transform;
    }
    .row.lift { transition: box-shadow .3s; --s: 1.03; box-shadow: 0 12px 24px -8px rgba(0,0,0,.25); cursor: grabbing; z-index: 2; }
    .row:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .grip { width: 14px; height: 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 3px; opacity: .35; transition: opacity .2s; }
    .row:hover .grip, .row.lift .grip { opacity: .8; }
    .grip i { width: 3px; height: 3px; border-radius: 50%; background: #111; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .row span { font-size: 13.5px; font-weight: 500; color: #111; }
  `,
  html: `
    <div class="list">
      <div class="row" tabindex="0"><span class="grip"><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="dot" style="background:#f97316"></span><span>Design review</span></div>
      <div class="row" tabindex="0"><span class="grip"><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="dot" style="background:#3b82f6"></span><span>Ship v2.4</span></div>
      <div class="row" tabindex="0"><span class="grip"><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="dot" style="background:#10b981"></span><span>Write changelog</span></div>
    </div>`,
  init(root) {
    const rows = [...root.querySelectorAll('.row')], STEP = 56;
    let order = rows.slice(), drag = null, startY = 0, startIdx = 0;
    const layout = () => order.forEach((r, i) => { if (r !== drag) r.style.setProperty('--y', i * STEP + 'px'); });
    layout();
    rows.forEach((r) => {
      r.addEventListener('pointerdown', (e) => { drag = r; startIdx = order.indexOf(r); startY = e.clientY; r.setPointerCapture(e.pointerId); r.classList.add('lift'); });
      r.addEventListener('pointermove', (e) => {
        if (drag !== r) return;
        const dy = e.clientY - startY;
        r.style.setProperty('--y', Math.max(-8, Math.min((rows.length - 1) * STEP + 8, startIdx * STEP + dy)) + 'px');
        const target = Math.max(0, Math.min(rows.length - 1, Math.round((startIdx * STEP + dy) / STEP)));
        if (order.indexOf(r) !== target) { order.splice(order.indexOf(r), 1); order.splice(target, 0, r); layout(); }
      });
      const drop = () => { if (drag !== r) return; drag = null; r.classList.remove('lift'); layout(); };
      r.addEventListener('pointerup', drop); r.addEventListener('pointercancel', drop);
      r.addEventListener('keydown', (e) => {
        const i = order.indexOf(r), d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
        if (!d || i + d < 0 || i + d >= rows.length) return;
        e.preventDefault(); order.splice(i, 1); order.splice(i + d, 0, r); layout();
      });
    });
  },
};
