export default {
  id: 'mn-pagination',
  credit: 'Numbered pagination with ‹ › and ellipsis (Bootstrap / Ant Design flavour)',
  size: 'auto',
  css: `
    :host { display: inline-block; max-width: 100%; }
    .pg { display: flex; gap: 4px; align-items: center; font: 14px/1 -apple-system, system-ui, sans-serif; flex-wrap: wrap; }
    .p { min-width: 36px; height: 36px; padding: 0 8px; border: 1px solid #d9d9d9; border-radius: 6px; background: #fff; color: #333; font: inherit; cursor: pointer; display: grid; place-items: center; transition: border-color .15s, color .15s, background .15s; }
    .p:hover { border-color: #1677ff; color: #1677ff; }
    .p:focus-visible { outline: 2px solid #1677ff; outline-offset: 1px; }
    .p[aria-current="page"] { border-color: #1677ff; color: #1677ff; font-weight: 600; background: #e6f4ff; }
    .p:disabled { color: #bbb; border-color: #e5e5e5; background: #fafafa; cursor: not-allowed; }
    .gap { min-width: 36px; height: 36px; display: grid; place-items: center; color: #999; letter-spacing: 2px; }
    .gap:hover { color: #1677ff; }
    svg { display: block; }
  `,
  html: `<nav class="pg" aria-label="Pagination"></nav>`,
  init(root) {
    const nav = root.querySelector('.pg');
    const total = 12;
    let cur = 1;
    const btn = (label, page, extra = '') => `<button class="p ${extra}" type="button" data-p="${page}"${page === cur ? ' aria-current="page"' : ''}${page < 1 || page > total ? ' disabled' : ''}>${label}</button>`;
    const render = () => {
      const pages = new Set([1, total, cur - 1, cur, cur + 1].filter((p) => p >= 1 && p <= total));
      if (cur <= 3) [2, 3, 4].forEach((p) => pages.add(p));
      if (cur >= total - 2) [total - 1, total - 2, total - 3].forEach((p) => pages.add(p));
      const sorted = [...pages].sort((a, b) => a - b);
      let html = btn('<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 2L4 7l5 5"/></svg>', cur - 1);
      let prev = 0;
      for (const p of sorted) {
        if (p - prev === 2) html += btn(prev + 1, prev + 1);
        else if (p - prev > 2) html += `<button class="gap" type="button" data-p="${p > cur ? Math.min(cur + 5, total) : Math.max(cur - 5, 1)}" aria-label="Jump">•••</button>`;
        html += btn(p, p); prev = p;
      }
      html += btn('<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 2l5 5-5 5"/></svg>', cur + 1);
      nav.innerHTML = html;
    };
    nav.addEventListener('click', (e) => {
      const b = e.target.closest('[data-p]');
      if (!b || b.disabled) return;
      cur = +b.dataset.p; render();
      const f = nav.querySelector('[aria-current]'); if (f) f.focus({ preventScroll: true });
    });
    render();
  },
};
