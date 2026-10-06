export default {
  id: 'mb-threads-actions',
  credit: 'Threads (Meta) — post action row: like (pops red #FF3040), comment, repost and share; counts tick, reposting turns the icon and count bold',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 12px 14px; border-radius: 12px; background: #fff; border: 1px solid #e5e5e5; display: flex; align-items: center; gap: 2px;
      font: 400 13px/1 -apple-system, BlinkMacSystemFont, "Helvetica Neue", Inter, system-ui, sans-serif; color: #000; -webkit-font-smoothing: antialiased; }
    .logo { width: 22px; height: 22px; fill: #000; margin-right: 10px; flex: none; }
    .a { height: 36px; min-width: 36px; padding: 0 10px; border-radius: 18px; border: 0; background: transparent; color: #424242; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font: inherit;
      transition: background .2s, transform .2s cubic-bezier(.2,.8,.2,1); -webkit-tap-highlight-color: transparent; }
    .a:hover { background: rgba(0,0,0,.05); }
    .a:active { transform: scale(.9); }
    .a:focus-visible { outline: 2px solid #000; outline-offset: 1px; }
    .a svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: fill .15s, stroke .15s, stroke-width .15s; }
    .n { display: inline-block; min-width: 4.2ch; text-align: left; font-variant-numeric: tabular-nums; color: #424242; transition: color .15s; }
    .n.sm { min-width: 2.4ch; }
    .like[aria-pressed="true"] { color: #ff3040; }
    .like[aria-pressed="true"] svg { fill: #ff3040; stroke: #ff3040; }
    .like[aria-pressed="true"] .n { color: #ff3040; }
    .like.burst svg { animation: burst .45s cubic-bezier(.2,1.6,.4,1); }
    @keyframes burst { 0% { transform: scale(.5); } 100% { transform: scale(1); } }
    .rp[aria-pressed="true"], .rp[aria-pressed="true"] .n { color: #000; font-weight: 600; }
    .rp[aria-pressed="true"] svg { stroke-width: 2.8; }
    .rp.burst svg { animation: spinr .45s cubic-bezier(.2,.8,.2,1); }
    @keyframes spinr { from { transform: rotate(-120deg) scale(.7); } }
  `,
  html: `
    <div class="stage">
      <svg class="logo" viewBox="0 0 24 24" role="img" aria-label="Threads"><path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z"/></svg>
      <button class="a like" type="button" aria-pressed="false" aria-label="Like"><svg viewBox="0 0 24 24"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg><span class="n">1,284</span></button>
      <button class="a" type="button" aria-label="Reply"><svg viewBox="0 0 24 24"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg><span class="n sm">96</span></button>
      <button class="a rp" type="button" aria-pressed="false" aria-label="Repost"><svg viewBox="0 0 24 24"><path d="m2 9 3-3 3 3"/><path d="M13 18H7a2 2 0 0 1-2-2V6"/><path d="m22 15-3 3-3-3"/><path d="M11 6h6a2 2 0 0 1 2 2v10"/></svg><span class="n">311</span></button>
      <button class="a" type="button" aria-label="Share"><svg viewBox="0 0 24 24"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg></button>
    </div>`,
  init(root) {
    const bump = (el, d) => { const n = el.querySelector('.n'); n.textContent = (parseInt(n.textContent.replace(/,/g, ''), 10) + d).toLocaleString('en-US'); };
    root.querySelectorAll('.like, .rp').forEach((b) => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on)); bump(b, on ? 1 : -1);
      b.classList.remove('burst'); if (on) { void b.offsetWidth; b.classList.add('burst'); }
    }));
  },
};
