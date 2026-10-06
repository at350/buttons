export default {
  id: 'mb-threads-actions',
  credit: 'Threads (Meta) — like / reply / repost / share action row; the heart pops red, repost pops filled, counts tick',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 14px 16px; border-radius: 12px; background: #fff; border: 1px solid #e5e5e5; display: flex; gap: 4px; font: 500 13px/1 Inter, -apple-system, system-ui, sans-serif; }
    .a { height: 36px; min-width: 36px; padding: 0 10px; border-radius: 18px; border: 0; background: transparent; color: #000; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;
      transition: background .15s, transform .15s cubic-bezier(.2,.8,.2,1); -webkit-tap-highlight-color: transparent; }
    .a:hover { background: #f0f0f0; }
    .a:active { transform: scale(.9); }
    .a:focus-visible { outline: 2px solid #000; outline-offset: 1px; }
    .a svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
      transition: transform .4s linear(0, 0.5 10%, 1.25 30%, 0.9 50%, 1.05 70%, 1), fill .2s, stroke .2s; }
    .a .n { font-variant-numeric: tabular-nums; min-width: 1ch; color: #000; transition: color .2s; }
    .a .n:empty { display: none; }
    .like[aria-pressed="true"] { color: #ff3040; }
    .like[aria-pressed="true"] svg { fill: #ff3040; stroke: #ff3040; transform: scale(1.1); }
    .like[aria-pressed="true"] .n { color: #ff3040; }
    .like.burst svg { animation: burst .5s linear(0, 0.3 20%, 1.35 45%, 0.9 70%, 1); }
    @keyframes burst { 0% { transform: scale(0); } }
    .rp[aria-pressed="true"] svg { stroke-width: 2.4; transform: rotate(180deg) scale(1.05); }
    .rp[aria-pressed="true"] .n { font-weight: 700; }
  `,
  html: `
    <div class="stage">
      <button class="a like" type="button" aria-pressed="false" aria-label="Like"><svg viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.7a4.3 4.3 0 0 1 7.5 2.8c0 5.4-7.5 10-7.5 10z"/></svg><span class="n">1,284</span></button>
      <button class="a" type="button" aria-label="Reply"><svg viewBox="0 0 24 24"><path d="M12 3.5c-5 0-8.5 3.3-8.5 7.5 0 2 .9 3.9 2.4 5.2L5 20.5l4.3-1.6c.9.2 1.8.3 2.7.3 5 0 8.5-3.3 8.5-7.7s-3.5-8-8.5-8z"/></svg><span class="n">96</span></button>
      <button class="a rp" type="button" aria-pressed="false" aria-label="Repost"><svg viewBox="0 0 24 24"><path d="M17 3.5 20.5 7 17 10.5M20.5 7H9a4 4 0 0 0-4 4v1"/><path d="M7 20.5 3.5 17 7 13.5M3.5 17H15a4 4 0 0 0 4-4v-1"/></svg><span class="n">311</span></button>
      <button class="a" type="button" aria-label="Share"><svg viewBox="0 0 24 24"><path d="M21 3 10.5 13.5M21 3l-7 18-3.5-7.5L3 10z"/></svg><span class="n"></span></button>
    </div>`,
  init(root) {
    const bump = (el, d) => { const n = el.querySelector('.n'); const v = parseInt(n.textContent.replace(/,/g, ''), 10); n.textContent = (v + d).toLocaleString('en-US'); };
    const like = root.querySelector('.like'), rp = root.querySelector('.rp');
    like.addEventListener('click', () => {
      const on = like.getAttribute('aria-pressed') !== 'true';
      like.setAttribute('aria-pressed', String(on)); bump(like, on ? 1 : -1);
      like.classList.remove('burst'); if (on) { void like.offsetWidth; like.classList.add('burst'); }
    });
    rp.addEventListener('click', () => { const on = rp.getAttribute('aria-pressed') !== 'true'; rp.setAttribute('aria-pressed', String(on)); bump(rp, on ? 1 : -1); });
  },
};
