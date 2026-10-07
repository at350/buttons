// Framer Motion <Reorder.Group>: the dragged item tracks the pointer 1:1 and gets the docs' useRaisedShadow
// (0 0 0 → -1px 1px 10px rgba(0,0,0,.3)); siblings re-layout on a snappy spring (stiffness 600, damping 35 → linear()).
const SPRING = 'linear(0, 0.025, 0.092, 0.175, 0.27, 0.37, 0.469, 0.573, 0.659, 0.736, 0.803, 0.865, 0.911, 0.948, 0.977, 1.002, 1.017, 1.028, 1.034, 1.038, 1.038, 1.037, 1.034, 1.031, 1.027, 1.023, 1.02, 1.016, 1.012, 1.01, 1.007, 1.005, 1.003, 1.002, 1.001, 1, 0.999, 0.999, 0.999, 0.999, 1)';

export default {
  id: 'mo-drag-reorder',
  credit: 'Framer Motion Reorder — drag a row: it follows the pointer with the raised-shadow hook from the docs while the others spring out of its way; arrow keys reorder too',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .list { position: relative; width: 260px; max-width: 100%; height: 182px; padding: 10px; border-radius: 16px; background: #f4f4f1; border: 1px solid #e3e3df; font-family: Inter, system-ui, sans-serif; touch-action: none; }
    .row {
      position: absolute; left: 10px; right: 10px; top: 10px; height: 50px; display: flex; align-items: center; gap: 12px; padding: 0 12px 0 14px;
      border-radius: 10px; background: #fff; box-shadow: 0 0 0 rgba(0,0,0,.8), 0 0 0 1px rgba(0,0,0,.04); cursor: grab; user-select: none; -webkit-user-select: none;
      transform: translateY(var(--y, 0px)); transition: transform .45s ${SPRING}, box-shadow .3s;
    }
    .row.lift { transition: box-shadow .3s; box-shadow: -1px 1px 10px rgba(0,0,0,.3), 0 0 0 1px rgba(0,0,0,.04); cursor: grabbing; z-index: 2; will-change: transform; } /* own layer only while held (it tracks the pointer with no transition); settling rows composite via their transition */
    .row:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .grip { width: 16px; height: 16px; flex: none; fill: none; stroke: #111; stroke-width: 2; stroke-linecap: round; opacity: .35; transition: opacity .2s; }
    .row:hover .grip, .row.lift .grip { opacity: .8; }
    .dot { width: 10px; height: 10px; border-radius: 50%; }
    .row span { font-size: 13.5px; font-weight: 500; color: #111; }
  `,
  html: `
    <div class="list" role="listbox" aria-label="Priorities">
      <div class="row" tabindex="0" role="option" aria-roledescription="sortable"><svg class="grip" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg><span class="dot" style="background:#f97316"></span><span>Design review</span></div>
      <div class="row" tabindex="0" role="option" aria-roledescription="sortable"><svg class="grip" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg><span class="dot" style="background:#3b82f6"></span><span>Ship v2.4</span></div>
      <div class="row" tabindex="0" role="option" aria-roledescription="sortable"><svg class="grip" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg><span class="dot" style="background:#10b981"></span><span>Write changelog</span></div>
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
