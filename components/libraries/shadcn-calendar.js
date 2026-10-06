export default {
  id: 'lb-shadcn-calendar',
  credit: 'shadcn/ui — Calendar (react-day-picker) range mode: click a start and an end day, the span fills zinc-100 and the ends go zinc-900',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .cal { width: 284px; padding: 12px; border: 1px solid #e4e4e7; border-radius: 8px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.05); font: 14px/1 Inter, -apple-system, system-ui, sans-serif; color: #09090b; user-select: none; }
    .hd { display: flex; align-items: center; justify-content: space-between; height: 28px; margin-bottom: 10px; }
    .hd b { font-weight: 500; }
    .nav { width: 28px; height: 28px; border: 1px solid #e4e4e7; border-radius: 6px; background: #fff; color: #09090b; cursor: pointer; display: grid; place-items: center; opacity: .6; transition: opacity .15s, background .15s; }
    .nav:hover { opacity: 1; background: #f4f4f5; }
    .nav:focus-visible { outline: 0; opacity: 1; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #18181b; }
    .nav svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; }
    .grid { display: grid; grid-template-columns: repeat(7, 36px); gap: 2px 0; }
    .wd { height: 20px; display: grid; place-items: center; font-size: 12.8px; color: #71717a; font-weight: 400; }
    .d { height: 36px; border: 0; background: none; color: #09090b; font: inherit; cursor: pointer; display: grid; place-items: center; padding: 0; border-radius: 6px; position: relative; -webkit-tap-highlight-color: transparent; }
    .d:hover { background: #f4f4f5; }
    .d:focus-visible { outline: 0; box-shadow: inset 0 0 0 2px #18181b; z-index: 1; }
    .d.out { color: #a1a1aa; }
    .d.today { background: #f4f4f5; font-weight: 500; }
    .d.mid { background: #f4f4f5; border-radius: 0; }
    .d.start, .d.end { background: #18181b; color: #fafafa; }
    .d.start { border-radius: 6px 0 0 6px; }
    .d.end { border-radius: 0 6px 6px 0; }
    .d.start.end { border-radius: 6px; }
    .d.start:hover, .d.end:hover { background: #18181b; }
  `,
  html: `
    <div class="cal">
      <div class="hd">
        <button class="nav" type="button" aria-label="Previous month"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button>
        <b></b>
        <button class="nav" type="button" aria-label="Next month"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button>
      </div>
      <div class="grid" role="grid"></div>
    </div>`,
  init(root) {
    const grid = root.querySelector('.grid'), title = root.querySelector('.hd b');
    const [prev, next] = root.querySelectorAll('.nav');
    const today = new Date(); today.setHours(0, 0, 0, 0);
    let y = today.getFullYear(), m = today.getMonth();
    let a = new Date(y, m, 5).getTime(), b = new Date(y, m, 11).getTime(), pick = 0;
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const render = () => {
      title.textContent = `${months[m]} ${y}`;
      const first = new Date(y, m, 1), off = (first.getDay() + 6) % 7, dim = new Date(y, m + 1, 0).getDate();
      let h = ['Mo','Tu','We','Th','Fr','Sa','Su'].map((w) => `<div class="wd">${w}</div>`).join('');
      for (let i = 0; i < 42; i++) {
        const d = new Date(y, m, i - off + 1), t = d.getTime(), lo = Math.min(a, b), hi = Math.max(a, b);
        const cls = ['d', d.getMonth() !== m && 'out', t === today.getTime() && 'today', t === lo && 'start', t === hi && 'end', t > lo && t < hi && 'mid'].filter(Boolean).join(' ');
        h += `<button class="${cls}" type="button" data-t="${t}" aria-pressed="${t >= lo && t <= hi}">${d.getDate()}</button>`;
      }
      grid.innerHTML = h;
    };
    grid.addEventListener('click', (e) => {
      const d = e.target.closest('.d'); if (!d) return;
      const t = +d.dataset.t;
      if (pick === 0) { a = b = t; pick = 1; } else { b = t; pick = 0; }
      render();
    });
    prev.addEventListener('click', () => { if (--m < 0) { m = 11; y--; } render(); });
    next.addEventListener('click', () => { if (++m > 11) { m = 0; y++; } render(); });
    render();
  },
};
