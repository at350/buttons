export default {
  id: 'lb-shadcn-calendar',
  credit: 'shadcn/ui (new-york v4) — Calendar (react-day-picker v9) in range mode: 32px cells, ghost chevron nav, Sunday-first weekdays at 0.8rem, today on bg-accent; the picked span fills accent and both ends go bg-primary',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .cal { padding: 12px; border: 1px solid #e5e5e5; border-radius: 10px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.1), 0 1px 2px -1px rgba(0,0,0,.1); font: 400 14px/20px Inter, -apple-system, system-ui, sans-serif; color: #0a0a0a; user-select: none; }
    .hd { position: relative; display: flex; align-items: center; justify-content: center; height: 32px; padding: 0 32px; }
    .hd b { font-weight: 500; white-space: nowrap; }
    .nav { position: absolute; top: 0; width: 32px; height: 32px; padding: 0; border: 0; border-radius: 8px; background: transparent; color: #0a0a0a; cursor: pointer; display: grid; place-items: center; transition: all .15s; }
    .nav.p { left: 0; } .nav.n { right: 0; }
    .nav:hover { background: #f5f5f5; color: #171717; }
    .nav:focus-visible { outline: 0; box-shadow: 0 0 0 3px rgba(161,161,161,.5); }
    .nav svg, .d svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .grid { display: grid; grid-template-columns: repeat(7, 32px); row-gap: 8px; margin-top: 16px; }
    .wd { height: 20px; display: grid; place-items: center; font-size: 12.8px; color: #737373; }
    .cell { position: relative; height: 32px; }
    .cell.mid, .cell.rs:not(.re), .cell.re:not(.rs) { background: #f5f5f5; }
    .cell.rs { border-radius: 8px 0 0 8px; } .cell.re { border-radius: 0 8px 8px 0; } .cell.rs.re { border-radius: 8px; background: none; }
    .cell:nth-child(7n + 1).sel { border-top-left-radius: 8px; border-bottom-left-radius: 8px; }
    .cell:nth-child(7n).sel { border-top-right-radius: 8px; border-bottom-right-radius: 8px; }
    .d { width: 100%; height: 100%; padding: 0; border: 0; border-radius: 8px; background: none; color: inherit; font: inherit; cursor: pointer; display: grid; place-items: center; -webkit-tap-highlight-color: transparent; }
    .d:hover { background: #f5f5f5; color: #171717; }
    .d:focus-visible { outline: 0; box-shadow: 0 0 0 3px rgba(161,161,161,.5); position: relative; z-index: 1; }
    .cell.out .d { color: #737373; }
    .cell.today .d { background: #f5f5f5; color: #171717; }
    .cell.today.sel .d { border-radius: 0; }
    .cell.mid .d { background: #f5f5f5; color: #171717; border-radius: 0; }
    .cell.rs .d, .cell.re .d { background: #171717; color: #fafafa; }
  `,
  html: `
    <div class="cal">
      <div class="hd">
        <button class="nav p" type="button" aria-label="Go to the Previous Month"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button>
        <b aria-live="polite"></b>
        <button class="nav n" type="button" aria-label="Go to the Next Month"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button>
      </div>
      <div class="grid" role="grid"></div>
    </div>`,
  init(root) {
    const grid = root.querySelector('.grid'), title = root.querySelector('.hd b');
    const prev = root.querySelector('.nav.p'), next = root.querySelector('.nav.n');
    const today = new Date(); today.setHours(0, 0, 0, 0);
    let y = today.getFullYear(), m = today.getMonth();
    let a = new Date(y, m, 12).getTime(), b = new Date(y, m, 18).getTime(), pick = 0;
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const render = () => {
      title.textContent = `${months[m]} ${y}`;
      const off = new Date(y, m, 1).getDay(), lo = Math.min(a, b), hi = Math.max(a, b);
      let h = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((w) => `<div class="wd">${w}</div>`).join('');
      for (let i = 0; i < 42; i++) {
        const d = new Date(y, m, i - off + 1), t = d.getTime(), sel = t >= lo && t <= hi;
        const cls = ['cell', d.getMonth() !== m && 'out', t === today.getTime() && 'today', sel && 'sel', t === lo && 'rs', t === hi && 're', t > lo && t < hi && 'mid'].filter(Boolean).join(' ');
        h += `<div class="${cls}" role="gridcell"><button class="d" type="button" data-t="${t}" aria-pressed="${sel}">${d.getDate()}</button></div>`;
      }
      grid.innerHTML = h;
    };
    grid.addEventListener('click', (e) => {
      const d = e.target.closest('.d'); if (!d) return;
      const t = +d.dataset.t;
      if (pick === 0) { a = b = t; pick = 1; } else { b = t; pick = 0; }
      render();
      grid.querySelector(`[data-t="${t}"]`)?.focus({ preventScroll: true });
    });
    prev.addEventListener('click', () => { if (--m < 0) { m = 11; y--; } render(); });
    next.addEventListener('click', () => { if (++m > 11) { m = 0; y++; } render(); });
    render();
  },
};
