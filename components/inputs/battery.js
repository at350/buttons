// iOS 16+ status-bar battery with "Battery Percentage" on (shown ~2.6× size): rounded body whose level fills in
// label black over a 35% gray body, the percentage knocked out in white inside it, a 40% cap nub; red #ff3b30 at
// 20% and below; plugging in turns the fill systemGreen #34c759, adds the bolt beside the cap and it charges up.
// Click to drain a step; from the lowest level a click plugs it in. The bolt slot is always reserved.
const BOLT = 'M360-360H217q-18 0-26.5-16t2.5-31l338-488q8-11 20-15t24 1q12 5 19 16t5 24l-39 309h176q19 0 27 17t-4 32L388-66q-8 10-20.5 13T344-55q-11-5-17.5-16T322-95l38-265Z';
const STEPS = [100, 74, 46, 20, 9];
export default {
  id: 'in-battery',
  credit: 'Apple iOS status-bar battery with percentage — black level, white % inside, red at 20%, green + bolt while charging',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .b { display: inline-flex; align-items: center; gap: 3px; border: 0; background: none; padding: 8px 10px; border-radius: 12px; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .b:hover { background: rgba(120,120,128,.12); }
    .b:active { background: rgba(120,120,128,.2); }
    .b:focus-visible { outline: 3px solid rgba(0,122,255,.5); outline-offset: 1px; }
    .body { position: relative; width: 66px; height: 32px; border-radius: 10px; overflow: hidden; background: rgba(0,0,0,.35); }
    .lvl { position: absolute; left: 0; top: 0; bottom: 0; width: var(--l, 100%); background: #000; transition: width .5s cubic-bezier(.32,.72,0,1), background-color .3s; }
    .b.low .lvl { background: #ff3b30; }
    .b.chg .lvl { background: #34c759; }
    .pc { position: absolute; inset: 0; display: grid; place-items: center; color: #fff; font: 700 21px/1 system-ui, -apple-system, "SF Pro Text", sans-serif; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
    .cap { width: 4px; height: 11px; border-radius: 0 3px 3px 0; background: rgba(0,0,0,.4); }
    .bolt { width: 18px; height: 22px; fill: #000; visibility: hidden; transform: scale(.4); opacity: 0; transition: transform .3s cubic-bezier(.34,1.56,.64,1), opacity .2s; }
    .b.chg .bolt { visibility: visible; transform: none; opacity: 1; }
  `,
  html: `<button class="b" type="button" role="meter" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" aria-label="Battery">
    <span class="body"><span class="lvl"></span><span class="pc">100</span></span><span class="cap"></span>
    <svg class="bolt" viewBox="0 -960 960 960"><path d="${BOLT}"/></svg>
  </button>`,
  init(root) {
    const b = root.querySelector('.b'), pc = root.querySelector('.pc');
    let i = 0, lvl = 100, tick = 0;
    const show = (v) => { lvl = v; b.style.setProperty('--l', v + '%'); pc.textContent = v; b.setAttribute('aria-valuenow', v); b.classList.toggle('low', v <= 20 && !b.classList.contains('chg')); };
    b.addEventListener('click', () => {
      clearInterval(tick);
      if (b.classList.contains('chg')) { b.classList.remove('chg'); i = 0; show(100); return; }
      if (i === STEPS.length - 1) {
        b.classList.add('chg'); b.classList.remove('low');
        tick = setInterval(() => { show(Math.min(100, lvl + 3)); if (lvl >= 100) clearInterval(tick); }, 40);
        return;
      }
      i++; show(STEPS[i]);
    });
    show(100);
    return () => clearInterval(tick);
  },
};
