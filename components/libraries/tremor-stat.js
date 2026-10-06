export default {
  id: 'lb-tremor-stat',
  credit: 'Tremor — KPI Card with metric, BadgeDelta and a SparkAreaChart; the solid TabGroup swaps the 7d / 30d series',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .card { width: 280px; max-width: 100%; padding: 24px; border-radius: 8px; border: 1px solid #e5e7eb; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.1), 0 1px 2px -1px rgba(0,0,0,.1); font: 14px/20px Inter, -apple-system, system-ui, sans-serif; color: #111827; }
    .top { display: flex; justify-content: space-between; align-items: flex-start; }
    .lbl { color: #6b7280; }
    .num { font-size: 24px; line-height: 32px; font-weight: 600; font-variant-numeric: tabular-nums; margin-top: 2px; }
    .dl { display: inline-flex; align-items: center; gap: 4px; height: 24px; padding: 0 8px 0 6px; border-radius: 9999px; font: 500 12px/1 Inter, system-ui, sans-serif; font-variant-numeric: tabular-nums; transition: background .2s, color .2s; }
    .dl svg { width: 14px; height: 14px; fill: currentColor; transition: transform .2s; }
    .dl.up { background: #d1fae5; color: #047857; }
    .dl.dn { background: #fee2e2; color: #b91c1c; }
    .dl.dn svg { transform: rotate(180deg); }
    .tabs { display: inline-flex; gap: 2px; padding: 2px; border-radius: 8px; background: #f3f4f6; margin-top: 16px; }
    .tb { height: 28px; padding: 0 12px; border: 0; border-radius: 6px; background: transparent; color: #6b7280; font: 500 13px/1 Inter, system-ui, sans-serif; cursor: pointer; transition: background .15s, color .15s, box-shadow .15s; -webkit-tap-highlight-color: transparent; }
    .tb:hover { color: #111827; }
    .tb[aria-selected="true"] { background: #fff; color: #111827; box-shadow: 0 1px 2px rgba(0,0,0,.08); }
    .tb:focus-visible { outline: 2px solid #3b82f6; outline-offset: 1px; }
    svg.sp { display: block; width: 100%; height: 56px; margin-top: 12px; overflow: visible; }
    .sp path { transition: d .4s cubic-bezier(.4,0,.2,1); }
    .sp .ln { fill: none; stroke: #3b82f6; stroke-width: 2; stroke-linejoin: round; }
    .sp .ar { fill: url(#tg); }
  `,
  html: `
    <div class="card">
      <div class="top"><div><div class="lbl">Sales</div><div class="num">$ 34,743</div></div><span class="dl up"><svg viewBox="0 0 24 24"><path d="M12 5l7 8h-4v6H9v-6H5z"/></svg><span>12.3%</span></span></div>
      <svg class="sp" viewBox="0 0 232 56" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b82f6" stop-opacity=".25"/><stop offset="1" stop-color="#3b82f6" stop-opacity="0"/></linearGradient></defs>
        <path class="ar"/><path class="ln"/>
      </svg>
      <div class="tabs" role="tablist"><button class="tb" type="button" role="tab" aria-selected="true">7d</button><button class="tb" type="button" role="tab" aria-selected="false">30d</button><button class="tb" type="button" role="tab" aria-selected="false">90d</button></div>
    </div>`,
  init(root) {
    const sets = {
      '7d': { v: [30, 38, 34, 44, 40, 48, 46, 52], n: '$ 34,743', d: '12.3%', up: true },
      '30d': { v: [40, 36, 42, 30, 34, 28, 32, 26], n: '$ 128,910', d: '4.8%', up: false },
      '90d': { v: [20, 24, 22, 30, 36, 34, 42, 50], n: '$ 402,118', d: '21.6%', up: true },
    };
    const ln = root.querySelector('.ln'), ar = root.querySelector('.ar'), num = root.querySelector('.num'), dl = root.querySelector('.dl'), dt = dl.querySelector('span');
    const tabs = [...root.querySelectorAll('.tb')];
    const draw = (k) => {
      const { v, n, d, up } = sets[k];
      const pts = v.map((y, i) => [(i / (v.length - 1)) * 232, 56 - (y / 60) * 56]);
      const L = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
      ln.setAttribute('d', L); ar.setAttribute('d', L + ' L232 56 L0 56 Z');
      num.textContent = n; dt.textContent = d; dl.className = 'dl ' + (up ? 'up' : 'dn');
    };
    tabs.forEach((t) => t.addEventListener('click', () => { tabs.forEach((x) => x.setAttribute('aria-selected', x === t)); draw(t.textContent); }));
    draw('7d');
  },
};
