// Ant Design v5 Pagination. Icons: @ant-design/icons-svg (MIT) LeftOutlined / RightOutlined / DoubleLeftOutlined / DoubleRightOutlined.
const A = (d) => `<svg viewBox="64 64 896 896" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;
const LEFT = A('M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z');
const RIGHT = A('M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z');
const DLEFT = A('M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z');
const DRIGHT = A('M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z');
export default {
  id: 'mn-pagination',
  credit: 'Ant Design v5 — Pagination (50 pages, jump "•••" that turns into a « » arrow on hover)',
  size: 'auto',
  css: `
    :host { display: inline-block; max-width: 100%; }
    .card { background: #fff; border-radius: 12px; padding: 12px 16px; max-width: 100%; overflow-x: auto; scrollbar-width: none; }
    .card::-webkit-scrollbar { display: none; }
    ul { display: flex; align-items: center; width: 432px; margin: 0; padding: 0; list-style: none; font: 14px/30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; color: rgba(0,0,0,.88); }
    li { flex: none; margin-inline-end: 8px; }
    li:last-child { margin-inline-end: 0; }
    .it { min-width: 32px; height: 32px; padding: 0 6px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid transparent; border-radius: 6px; background: transparent; color: rgba(0,0,0,.88); font: inherit; cursor: pointer; transition: all .2s; user-select: none; }
    .it:hover { background: rgba(0,0,0,.06); }
    .it:active { background: rgba(0,0,0,.15); }
    .it[aria-current="page"] { font-weight: 600; background: #fff; border-color: #1677ff; color: #1677ff; }
    .it[aria-current="page"]:hover { border-color: #4096ff; color: #4096ff; }
    .it:disabled { color: rgba(0,0,0,.25); cursor: not-allowed; background: transparent; }
    .it:focus-visible { outline: 4px solid #91caff; outline-offset: 1px; transition: outline-offset 0s, outline 0s; }
    .jump { position: relative; min-width: 32px; height: 32px; padding: 0; border: 0; background: none; cursor: pointer; border-radius: 6px; display: grid; place-items: center; }
    .jump > * { grid-area: 1 / 1; transition: all .2s; }
    .jump .dots { color: rgba(0,0,0,.25); letter-spacing: 2px; text-indent: .13em; font-family: Arial, sans-serif; }
    .jump svg { color: #1677ff; opacity: 0; }
    .jump:hover .dots, .jump:focus-visible .dots { opacity: 0; }
    .jump:hover svg, .jump:focus-visible svg { opacity: 1; }
    .jump:focus-visible { outline: 4px solid #91caff; outline-offset: 1px; }
  `,
  html: `<nav class="card" aria-label="Pagination"><ul></ul></nav>`,
  init(root) {
    const ul = root.querySelector('ul');
    const total = 50;
    let cur = 1;
    const li = (h) => `<li>${h}</li>`;
    const item = (p) => li(`<button class="it" type="button" data-p="${p}" title="${p}"${p === cur ? ' aria-current="page"' : ''}>${p}</button>`);
    const render = () => {
      // Ant Design's algorithm (pageBufferSize 2, showLessItems false)
      let left = Math.max(1, cur - 2), right = Math.min(total, cur + 2);
      if (cur - 1 <= 2) right = 1 + 4;
      if (total - cur <= 2) left = total - 4;
      let h = li(`<button class="it" type="button" data-p="${cur - 1}" title="Previous Page" aria-label="Previous Page"${cur === 1 ? ' disabled' : ''}>${LEFT}</button>`);
      if (left > 1) h += item(1);
      if (left > 2) h += li(`<button class="jump" type="button" data-p="${Math.max(1, cur - 5)}" title="Previous 5 Pages" aria-label="Previous 5 Pages"><span class="dots">•••</span>${DLEFT}</button>`);
      for (let p = left; p <= right; p++) h += item(p);
      if (right < total - 1) h += li(`<button class="jump" type="button" data-p="${Math.min(total, cur + 5)}" title="Next 5 Pages" aria-label="Next 5 Pages"><span class="dots">•••</span>${DRIGHT}</button>`);
      if (right < total) h += item(total);
      h += li(`<button class="it" type="button" data-p="${cur + 1}" title="Next Page" aria-label="Next Page"${cur === total ? ' disabled' : ''}>${RIGHT}</button>`);
      ul.innerHTML = h;
    };
    ul.addEventListener('click', (e) => {
      const b = e.target.closest('[data-p]');
      if (!b || b.disabled) return;
      const wasJump = b.classList.contains('jump'), label = b.getAttribute('aria-label');
      cur = +b.dataset.p; render();
      const f = (wasJump || label) ? ul.querySelector(`[aria-label="${label}"]`) || ul.querySelector('[aria-current]') : ul.querySelector('[aria-current]');
      if (f && !f.disabled) f.focus({ preventScroll: true });
    });
    render();
  },
};
