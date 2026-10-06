export default {
  id: 'mn-ios-segmented',
  credit: 'Apple iOS 13+ — UISegmentedControl with the sliding white pill',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .seg { position: relative; display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; background: rgba(118,118,128,.12); border-radius: 9px; padding: 2px; height: 32px; width: 300px; max-width: 100%; font: 500 13px/1 -apple-system, system-ui, sans-serif; color: #000; }
    .pill { position: absolute; top: 2px; bottom: 2px; left: 2px; width: calc((100% - 4px) / 3); border-radius: 7px; background: #fff; box-shadow: 0 3px 8px rgba(0,0,0,.12), 0 3px 1px rgba(0,0,0,.04); transition: transform .3s cubic-bezier(.2,.8,.2,1); }
    .seg:active .pill { transform: translateX(var(--x)) scale(.96); }
    .pill { transform: translateX(var(--x)); }
    .s { position: relative; z-index: 1; background: none; border: 0; font: inherit; color: inherit; cursor: pointer; border-radius: 7px; padding: 0; height: 28px; }
    .s:focus-visible { outline: 2px solid #007aff; outline-offset: 1px; }
    .s:not([aria-checked="true"]):active { opacity: .5; }
    .s[aria-checked="true"] { font-weight: 600; }
    .s::before { content: ""; position: absolute; left: -1px; top: 8px; bottom: 8px; width: 1px; background: rgba(60,60,67,.3); transition: opacity .2s; }
    .s:first-child::before, .s[aria-checked="true"]::before, .s[aria-checked="true"] + .s::before { opacity: 0; }
  `,
  html: `
    <div class="seg" role="radiogroup" style="--x:0">
      <span class="pill"></span>
      <button class="s" type="button" role="radio" aria-checked="true">Map</button>
      <button class="s" type="button" role="radio" aria-checked="false">Transit</button>
      <button class="s" type="button" role="radio" aria-checked="false">Satellite</button>
    </div>`,
  init(root) {
    const seg = root.querySelector('.seg');
    const segs = [...root.querySelectorAll('.s')];
    const select = (i) => { segs.forEach((s, j) => s.setAttribute('aria-checked', i === j)); seg.style.setProperty('--x', `${i * 100}%`); };
    segs.forEach((s, i) => {
      s.addEventListener('click', () => select(i));
      s.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + segs.length) % segs.length;
        select(n); segs[n].focus({ preventScroll: true });
      });
    });
  },
};
