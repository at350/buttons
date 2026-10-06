const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// iOS UIDatePicker, .inline (calendar) style: "October 2026 ›" in 17pt semibold with the accent chevron, ‹ › month
// arrows in systemBlue #007aff, SUN–SAT in 13pt semibold tertiaryLabel, 20pt day numbers with no spill-over days;
// today is blue text, the selection is a 12% blue disc with semibold blue text (solid blue + white when it is today).
// Six week-rows are always reserved so changing month never resizes it; months page in sideways.
export default {
  id: 'in-mini-calendar',
  credit: 'Apple iOS inline date picker (UIDatePicker) — blue chevrons, SUN–SAT header, tinted selection disc, today in blue',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .cal { width: 300px; max-width: 100%; padding: 14px 14px 10px; border-radius: 13px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.08), 0 8px 24px rgba(0,0,0,.08); font-family: system-ui, -apple-system, "SF Pro Text", sans-serif; color: #000; user-select: none; overflow: hidden; }
    .hd { display: flex; align-items: center; justify-content: space-between; height: 32px; margin: 0 4px 6px 6px; }
    .ttl { display: inline-flex; align-items: center; gap: 4px; font-size: 17px; line-height: 22px; font-weight: 600; letter-spacing: -.4px; white-space: nowrap; }
    .ttl svg { width: 14px; height: 14px; fill: none; stroke: #007aff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
    .navs { display: flex; gap: 18px; }
    .nav { width: 28px; height: 28px; border: 0; border-radius: 8px; background: none; cursor: pointer; display: grid; place-items: center; color: #007aff; -webkit-tap-highlight-color: transparent; }
    .nav:hover { background: rgba(0,122,255,.08); }
    .nav:active { opacity: .4; }
    .nav:focus-visible { outline: 2px solid #007aff; }
    .nav svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
    .wk, .days { display: grid; grid-template-columns: repeat(7, 1fr); }
    .wk span { text-align: center; color: rgba(60,60,67,.3); font-size: 12px; line-height: 18px; font-weight: 600; }
    .days { grid-template-rows: repeat(6, 38px); margin-top: 2px; }
    .days.in-l { animation: inl .3s cubic-bezier(.32,.72,0,1); } .days.in-r { animation: inr .3s cubic-bezier(.32,.72,0,1); }
    @keyframes inl { from { transform: translateX(-28px); opacity: 0; } } @keyframes inr { from { transform: translateX(28px); opacity: 0; } }
    .d {
      justify-self: center; align-self: center; width: 36px; height: 36px; border: 0; border-radius: 50%; background: none; padding: 0; cursor: pointer;
      font: 400 19px/1 system-ui, -apple-system, "SF Pro Text", sans-serif; letter-spacing: -.4px; color: #000; font-variant-numeric: tabular-nums;
      transition: background-color .15s; -webkit-tap-highlight-color: transparent;
    }
    .d:hover { background: rgba(120,120,128,.12); }
    .d:focus-visible { outline: 2px solid #007aff; }
    .d.today { color: #007aff; }
    .d[aria-selected="true"] { background: rgba(0,122,255,.12); color: #007aff; font-weight: 600; font-size: 21px; }
    .d.today[aria-selected="true"] { background: #007aff; color: #fff; }
    .gap { visibility: hidden; }
  `,
  html: `<div class="cal">
    <div class="hd">
      <span class="ttl"><span class="tt" aria-live="polite"></span><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></span>
      <span class="navs">
        <button class="nav prev" type="button" aria-label="Previous month"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button>
        <button class="nav next" type="button" aria-label="Next month"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button>
      </span>
    </div>
    <div class="wk"><span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span></div>
    <div class="days" role="grid"></div>
  </div>`,
  init(root) {
    const tt = root.querySelector('.tt'), days = root.querySelector('.days');
    const today = new Date();
    const tKey = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    let y = today.getFullYear(), m = today.getMonth(), sel = tKey;
    const render = (dir) => {
      tt.textContent = MONTHS[m] + ' ' + y;
      const first = new Date(y, m, 1).getDay(), n = new Date(y, m + 1, 0).getDate();
      let html = '';
      for (let i = 0; i < first; i++) html += '<span class="gap"></span>';
      for (let d = 1; d <= n; d++) {
        const t = new Date(y, m, d).getTime();
        html += '<button class="d' + (t === tKey ? ' today' : '') + '" type="button" role="gridcell" data-t="' + t + '" aria-selected="' + (t === sel) + '" aria-label="' + MONTHS[m] + ' ' + d + '">' + d + '</button>';
      }
      days.innerHTML = html;
      days.classList.remove('in-l', 'in-r');
      if (dir) { void days.offsetWidth; days.classList.add(dir < 0 ? 'in-l' : 'in-r'); }
    };
    days.addEventListener('click', (e) => {
      const b = e.target.closest('.d'); if (!b) return;
      sel = +b.dataset.t;
      days.querySelectorAll('.d').forEach((x) => x.setAttribute('aria-selected', x === b));
    });
    root.querySelector('.prev').addEventListener('click', () => { m--; if (m < 0) { m = 11; y--; } render(-1); });
    root.querySelector('.next').addEventListener('click', () => { m++; if (m > 11) { m = 0; y++; } render(1); });
    render(0);
  },
};
