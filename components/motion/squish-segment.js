export default {
  id: 'mo-squish-segment',
  credit: 'Jakub Krehel-style segmented control — the pill stretches across the gap, then squishes into the new tab',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .seg { position: relative; display: inline-flex; padding: 4px; border-radius: 999px; background: #ededea; font-family: Inter, system-ui, sans-serif; }
    .pill { position: absolute; top: 4px; bottom: 4px; left: var(--l, 4px); width: var(--w, 0px); border-radius: 999px; background: #111; box-shadow: 0 2px 6px rgba(0,0,0,.2); transition: left .36s cubic-bezier(.3, .8, .3, 1), width .36s cubic-bezier(.3, .8, .3, 1); }
    .seg.stretch .pill { transition: left .22s cubic-bezier(.4, 0, .2, 1), width .22s cubic-bezier(.4, 0, .2, 1); }
    .seg.squish .pill { transition: left .32s cubic-bezier(.34, 1.4, .64, 1), width .32s cubic-bezier(.34, 1.4, .64, 1); }
    .seg button { position: relative; z-index: 1; height: 34px; padding: 0 18px; border: 0; background: transparent; border-radius: 999px; color: #555; font: 500 13.5px Inter, system-ui, sans-serif; cursor: pointer; transition: color .25s, transform .2s; }
    .seg button:hover { color: #111; }
    .seg button[aria-selected="true"] { color: #fff; }
    .seg button:active { transform: scale(.94); }
    .seg button:focus-visible { outline: 2px solid #111; outline-offset: -2px; }
  `,
  html: `
    <div class="seg" role="tablist">
      <span class="pill"></span>
      <button type="button" role="tab" aria-selected="true">Day</button>
      <button type="button" role="tab" aria-selected="false">Week</button>
      <button type="button" role="tab" aria-selected="false">Month</button>
      <button type="button" role="tab" aria-selected="false">Year</button>
    </div>`,
  init(root) {
    const seg = root.querySelector('.seg'), pill = root.querySelector('.pill'), tabs = [...root.querySelectorAll('[role="tab"]')];
    let cur = 0, t1 = 0, t2 = 0;
    const box = (b) => ({ l: b.offsetLeft, w: b.offsetWidth });
    const place = (l, w) => { pill.style.setProperty('--l', l + 'px'); pill.style.setProperty('--w', w + 'px'); };
    // place the pill without animating: reading offsetWidth has already resolved style with --w: 0
    pill.style.transition = 'none'; const first = box(tabs[0]); place(first.l, first.w); void pill.offsetWidth; pill.style.transition = '';
    const go = (i) => {
      if (i === cur) return;
      const a = box(tabs[cur]), b = box(tabs[i]);
      tabs[cur].setAttribute('aria-selected', 'false'); tabs[i].setAttribute('aria-selected', 'true'); cur = i;
      clearTimeout(t1); clearTimeout(t2);
      seg.classList.remove('squish'); seg.classList.add('stretch');
      place(Math.min(a.l, b.l), Math.max(a.l + a.w, b.l + b.w) - Math.min(a.l, b.l));
      t1 = setTimeout(() => { seg.classList.remove('stretch'); seg.classList.add('squish'); place(b.l, b.w); }, 200);
      t2 = setTimeout(() => seg.classList.remove('squish'), 560);
    };
    tabs.forEach((b, i) => b.addEventListener('click', () => go(i)));
    seg.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault(); const n = (cur + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length; go(n); tabs[n].focus();
    });
    return () => { clearTimeout(t1); clearTimeout(t2); };
  },
};
