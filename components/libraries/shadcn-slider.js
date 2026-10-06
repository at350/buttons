export default {
  id: 'lb-shadcn-slider',
  credit: 'shadcn/ui — Slider (Radix): 6px zinc track, zinc-900 range, 16px white thumb with primary border and ring on focus',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { width: 280px; max-width: 100%; padding: 12px 8px; font: 500 14px Inter, -apple-system, system-ui, sans-serif; color: #09090b; }
    .sl { position: relative; height: 16px; display: flex; align-items: center; touch-action: none; user-select: none; cursor: pointer; }
    .track { position: relative; width: 100%; height: 6px; border-radius: 9999px; background: #f4f4f5; overflow: hidden; }
    .range { position: absolute; left: 0; top: 0; bottom: 0; width: var(--p); background: #18181b; }
    .th { position: absolute; top: 0; left: var(--p); width: 16px; height: 16px; margin-left: -8px; border-radius: 50%; background: #fff; border: 1px solid #18181b; box-shadow: 0 1px 2px rgba(0,0,0,.08); transition: box-shadow .15s, transform .1s; }
    .sl:hover .th { box-shadow: 0 0 0 4px rgba(24,24,27,.3); }
    .sl.drag .th { transform: scale(1.08); box-shadow: 0 0 0 4px rgba(24,24,27,.3); }
    .th:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #18181b; }
    .val { margin-top: 10px; font-variant-numeric: tabular-nums; color: #71717a; font-weight: 400; font-size: 13px; }
    .val b { color: #09090b; font-weight: 500; }
  `,
  html: `
    <div class="wrap">
      <div class="sl" style="--p:33%">
        <div class="track"><div class="range"></div></div>
        <div class="th" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="33" aria-label="Volume"></div>
      </div>
      <div class="val"><b>33</b> / 100</div>
    </div>`,
  init(root) {
    const sl = root.querySelector('.sl'), th = root.querySelector('.th'), val = root.querySelector('.val b');
    let v = 33;
    const set = (n) => { v = Math.max(0, Math.min(100, Math.round(n))); sl.style.setProperty('--p', v + '%'); th.setAttribute('aria-valuenow', v); val.textContent = v; };
    const fromX = (x) => { const r = sl.getBoundingClientRect(); return ((x - r.left) / r.width) * 100; };
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
