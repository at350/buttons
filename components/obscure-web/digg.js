export default {
  id: 'ob-digg',
  credit: 'Digg (2006) — the stacked yellow "digg it" box: count on top, click and it turns green "dugg!"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: flex-start; gap: 12px; background: #fff; padding: 10px 14px; border-radius: 12px; border: 1px solid #e5e5e5; width: 300px; max-width: 100%; font: 12px/1.4 Arial, Helvetica, sans-serif; color: #333; }
    .dg { width: 52px; flex: none; border: 1px solid #c9c9c9; border-radius: 3px; background: #fff; padding: 0; cursor: pointer; overflow: hidden; font: 700 11px Arial, Helvetica, sans-serif; color: #333; text-align: center; transition: transform .1s; }
    .dg:active { transform: scale(.96); }
    .dg:focus-visible { outline: 2px solid #1b5ea9; outline-offset: 2px; }
    .dg .n { display: block; padding: 6px 0 2px; font: 700 20px/1 Arial, Helvetica, sans-serif; color: #333; background: #fff; }
    .dg .sub { display: block; font: 10px Arial, sans-serif; color: #666; padding-bottom: 4px; }
    .dg .it { display: block; padding: 4px 0; background: #ffe135; color: #000; border-top: 1px solid #c9c9c9; }
    .dg:hover .it { background: #ffd700; }
    .dg.on .it { background: #8bc53f; color: #fff; }
    .dg.on .n { color: #5a9a1a; }
    .txt { flex: 1; min-width: 0; }
    .ttl { color: #1b5ea9; font: 700 15px/1.2 Arial, sans-serif; text-decoration: none; cursor: pointer; }
    .ttl:hover { text-decoration: underline; }
    .meta { color: #999; font-size: 11px; margin-top: 4px; }
    .meta a { color: #1b5ea9; text-decoration: none; cursor: pointer; }
    .meta a:hover { text-decoration: underline; }
    .meta .bury.on { color: #c00; }
  `,
  html: `
    <div class="row">
      <button class="dg" type="button" aria-pressed="false"><span class="n">1337</span><span class="sub">diggs</span><span class="it">digg it</span></button>
      <div class="txt">
        <a class="ttl" href="#">An endless page of buttons</a>
        <div class="meta">submitted 3 hrs ago by <a href="#">kevinrose</a> · <a class="bury" href="#" role="button">bury</a></div>
      </div>
    </div>`,
  init(root) {
    const dg = root.querySelector('.dg'), n = root.querySelector('.n'), it = root.querySelector('.it'), bury = root.querySelector('.bury');
    let c = 1337;
    dg.addEventListener('click', () => { const on = dg.classList.toggle('on'); dg.setAttribute('aria-pressed', String(on)); c += on ? 1 : -1; n.textContent = String(c); it.textContent = on ? 'dugg!' : 'digg it'; });
    bury.addEventListener('click', (e) => { e.preventDefault(); const on = bury.classList.toggle('on'); bury.textContent = on ? 'buried' : 'bury'; });
    root.querySelectorAll('a:not(.bury)').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
  },
};
