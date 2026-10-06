const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default {
  id: 'in-mini-calendar',
  credit: 'Mini month date picker — arrows change month, tap a day to select it, today is ringed (Apple / Notion date popover)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .cal { width: 252px; padding: 12px; border-radius: 14px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.08), 0 6px 20px rgba(0,0,0,.08); font: 500 13px system-ui, sans-serif; color: #111; user-select: none; }
    .hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
    .nav { width: 28px; height: 28px; border: 0; border-radius: 8px; background: none; cursor: pointer; display: grid; place-items: center; color: #555; transition: background .15s; -webkit-tap-highlight-color: transparent; }
    .nav:hover { background: #f0f0f0; }
    .nav:focus-visible { outline: 2px solid #2563eb; }
    .nav svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
    .ttl { font-weight: 600; font-size: 14px; }
    .wk, .days { display: grid; grid-template-columns: repeat(7, 1fr); }
    .wk span { text-align: center; color: #999; font-size: 11px; font-weight: 600; padding: 4px 0; }
    .d { height: 32px; border: 0; border-radius: 50%; background: none; font: inherit; color: #111; cursor: pointer; transition: background .12s, color .12s, transform .12s; -webkit-tap-highlight-color: transparent; }
    .d:hover { background: #eef2ff; }
    .d:focus-visible { outline: 2px solid #2563eb; outline-offset: -2px; }
    .d.out { color: #c4c4c4; }
    .d.today { box-shadow: inset 0 0 0 1.5px #2563eb; }
    .d[aria-selected="true"] { background: #2563eb; color: #fff; font-weight: 600; animation: pop .2s cubic-bezier(.34,1.56,.64,1); }
    @keyframes pop { 0% { transform: scale(.8); } 100% { transform: scale(1); } }
  `,
  html: `<div class="cal">
    <div class="hd">
      <button class="nav prev" type="button" aria-label="Previous month"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>
      <span class="ttl" aria-live="polite"></span>
      <button class="nav next" type="button" aria-label="Next month"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>
    </div>
    <div class="wk"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div>
    <div class="days" role="grid"></div>
  </div>`,
  init(root) {
    const ttl = root.querySelector('.ttl'), days = root.querySelector('.days');
    const today = new Date();
    let y = today.getFullYear(), m = today.getMonth();
    let sel = new Date(y, m, today.getDate()).getTime();
    const render = () => {
      ttl.textContent = MONTHS[m] + ' ' + y;
      const first = new Date(y, m, 1).getDay();
      const start = new Date(y, m, 1 - first);
      let html = '';
      for (let i = 0; i < 42; i++) {
        const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
        const t = d.getTime();
        const cls = ['d', d.getMonth() !== m ? 'out' : '', d.toDateString() === today.toDateString() ? 'today' : ''].join(' ').trim();
        html += '<button class="' + cls + '" type="button" role="gridcell" data-t="' + t + '" aria-selected="' + (t === sel) + '">' + d.getDate() + '</button>';
      }
      days.innerHTML = html;
    };
    days.addEventListener('click', (e) => {
      const b = e.target.closest('.d'); if (!b) return;
      sel = +b.dataset.t; const d = new Date(sel);
      if (d.getMonth() !== m) { y = d.getFullYear(); m = d.getMonth(); }
      render();
    });
    root.querySelector('.prev').addEventListener('click', () => { m--; if (m < 0) { m = 11; y--; } render(); });
    root.querySelector('.next').addEventListener('click', () => { m++; if (m > 11) { m = 0; y++; } render(); });
    render();
  },
};
