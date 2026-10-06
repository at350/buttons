export default {
  id: 'bt-github-reactions',
  credit: 'GitHub — issue comment reaction pills (toggle blue when you react)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 6px; flex-wrap: wrap; font: 400 12px/1 -apple-system, "Segoe UI", system-ui, sans-serif; }
    .re {
      height: 26px; padding: 0 8px; border-radius: 100px; border: 1px solid #d0d7de; background: #fff; color: #656d76;
      display: inline-flex; align-items: center; gap: 4px; cursor: pointer; font: inherit;
      transition: background .1s, border-color .1s, color .1s; -webkit-tap-highlight-color: transparent;
    }
    .re:hover { background: #f3f4f6; }
    .re:focus-visible { outline: 2px solid #0969da; outline-offset: -2px; }
    .re[aria-pressed="true"] { background: #ddf4ff; border-color: #0969da; color: #0969da; }
    .re .e { font-size: 14px; line-height: 1; display: inline-block; }
    .re:active .e { transform: scale(1.3); }
    .re[aria-pressed="true"] .e { animation: bounce .4s cubic-bezier(.34,1.56,.64,1); }
    @keyframes bounce { 0% { transform: scale(.6); } 60% { transform: scale(1.3); } 100% { transform: scale(1); } }
    .add { width: 26px; justify-content: center; padding: 0; }
    .add svg { width: 16px; height: 16px; fill: #656d76; }
  `,
  html: `
    <div class="row">
      <button class="re" type="button" aria-pressed="false"><span class="e">👍</span><span class="n">12</span></button>
      <button class="re" type="button" aria-pressed="true"><span class="e">🎉</span><span class="n">4</span></button>
      <button class="re" type="button" aria-pressed="false"><span class="e">❤️</span><span class="n">3</span></button>
      <button class="re" type="button" aria-pressed="false"><span class="e">🚀</span><span class="n">1</span></button>
      <button class="re" type="button" aria-pressed="false"><span class="e">👀</span><span class="n">2</span></button>
      <button class="re add" type="button" aria-label="Add reaction"><svg viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm3.82 1.636a.75.75 0 0 1 1.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 0 1 1.222.87c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 0 1-.715-.657.75.75 0 0 1 .183-1.044ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.re:not(.add)').forEach((b) => {
      const n = b.querySelector('.n');
      b.addEventListener('click', () => {
        const on = b.getAttribute('aria-pressed') !== 'true';
        b.setAttribute('aria-pressed', on);
        n.textContent = String(+n.textContent + (on ? 1 : -1));
      });
    });
    root.querySelector('.add').addEventListener('click', () => {
      const first = root.querySelector('.re[aria-pressed="false"]');
      if (first) first.click();
    });
  },
};
