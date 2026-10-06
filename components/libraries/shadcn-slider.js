export default {
  id: 'lb-shadcn-slider',
  credit: 'shadcn/ui (new-york v4) — Slider (Radix): h-1.5 bg-muted track, bg-primary range, size-4 white thumb with border-primary and shadow-sm, ring-4 ring/50 on hover and focus; defaultValue 50',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { width: 240px; max-width: 100%; padding: 16px 12px; }
    .sl { position: relative; display: flex; width: 100%; align-items: center; height: 16px; touch-action: none; user-select: none; cursor: pointer; }
    .track { position: relative; flex: 1; height: 6px; border-radius: 9999px; background: #f5f5f5; overflow: hidden; }
    .range { position: absolute; left: 0; top: 0; bottom: 0; width: calc(var(--v) * 1%); background: #171717; }
    .th { position: absolute; top: 0; left: calc((100% - 16px) * var(--v) / 100); display: block; width: 16px; height: 16px; border-radius: 9999px; border: 1px solid #171717; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.1), 0 1px 2px -1px rgba(0,0,0,.1); transition: color .15s, box-shadow .15s; }
    .th:hover, .sl.drag .th, .th:focus-visible { outline: 0; box-shadow: 0 0 0 4px rgba(161,161,161,.5), 0 1px 3px rgba(0,0,0,.1); }
  `,
  html: `
    <div class="wrap">
      <div class="sl" style="--v:50">
        <div class="track"><div class="range"></div></div>
        <div class="th" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-orientation="horizontal" aria-label="Volume"></div>
      </div>
    </div>`,
  init(root) {
    const sl = root.querySelector('.sl'), th = root.querySelector('.th');
    let v = 50;
    const set = (n) => { v = Math.max(0, Math.min(100, Math.round(n))); sl.style.setProperty('--v', v); th.setAttribute('aria-valuenow', v); };
    const fromX = (x) => { const r = sl.getBoundingClientRect(); return ((x - r.left - 8) / (r.width - 16)) * 100; };
    const move = (e) => set(fromX(e.clientX));
    const up = () => { sl.classList.remove('drag'); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    sl.addEventListener('pointerdown', (e) => { e.preventDefault(); sl.classList.add('drag'); set(fromX(e.clientX)); th.focus({ preventScroll: true }); window.addEventListener('pointermove', move); window.addEventListener('pointerup', up); });
    th.addEventListener('keydown', (e) => {
      const k = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 10, PageDown: -10 }[e.key];
      if (k !== undefined) { e.preventDefault(); set(v + k); }
      else if (e.key === 'Home') { e.preventDefault(); set(0); }
      else if (e.key === 'End') { e.preventDefault(); set(100); }
    });
    return up;
  },
};
