// Jakub Krehel-style segmented control — the selected pill's two edges ride separate springs: the leading edge
// (stiffness 420, damping 32) races to the new tab while the trailing edge (stiffness 170, damping 21) catches up,
// so the pill stretches across the gap and settles into the new tab. Labels cross-fade, pressed tab squishes.
const LEAD = 'linear(0, 0.043, 0.142, 0.267, 0.408, 0.534, 0.646, 0.742, 0.82, 0.882, 0.928, 0.962, 0.987, 1.003, 1.012, 1.016, 1.018, 1.018, 1.016, 1.014, 1.011, 1.009, 1.007, 1.005, 1.004, 1.002, 1.002, 1.001, 1, 1, 1)';
const TRAIL = 'linear(0, 0.04, 0.129, 0.247, 0.368, 0.49, 0.598, 0.695, 0.774, 0.84, 0.891, 0.931, 0.959, 0.981, 0.995, 1.004, 1.01, 1.012, 1.013, 1.013, 1.012, 1.01, 1.008, 1.007, 1.005, 1.004, 1.003, 1.002, 1.001, 1.001, 1)';

export default {
  id: 'mo-squish-segment',
  credit: 'Jakub Krehel-style segmented control — the pill’s leading edge springs ahead and the trailing edge follows on a softer spring, so it stretches across and squishes into the new tab',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .seg { position: relative; display: inline-flex; padding: 3px; border-radius: 12px; background: #ececec; box-shadow: inset 0 0 0 1px rgba(0,0,0,.03); font-family: Inter, system-ui, sans-serif; }
    .pill {
      position: absolute; top: 3px; bottom: 3px; left: var(--l, 3px); right: var(--r, 3px); border-radius: 9px; background: #fff;
      box-shadow: 0 1px 2px rgba(0,0,0,.06), 0 2px 6px -1px rgba(0,0,0,.08), 0 0 0 .5px rgba(0,0,0,.06);
    }
    .seg.fwd .pill { transition: left .68s ${TRAIL}, right .45s ${LEAD}; }
    .seg.back .pill { transition: left .45s ${LEAD}, right .68s ${TRAIL}; }
    .seg button {
      position: relative; z-index: 1; height: 32px; padding: 0 16px; border: 0; background: transparent; border-radius: 9px; color: #737373; cursor: pointer;
      font: 500 13.5px Inter, system-ui, sans-serif; letter-spacing: -.005em; transition: color .2s, transform .3s ${LEAD};
    }
    .seg button:hover { color: #404040; }
    .seg button[aria-selected="true"] { color: #0a0a0a; }
    .seg button:active { transform: scale(.95); }
    .seg button:focus-visible { outline: 2px solid #0a0a0a; outline-offset: -2px; }
  `,
  html: `
    <div class="seg" role="tablist" aria-label="Range">
      <span class="pill" aria-hidden="true"></span>
      <button type="button" role="tab" aria-selected="true" tabindex="0">Day</button>
      <button type="button" role="tab" aria-selected="false" tabindex="-1">Week</button>
      <button type="button" role="tab" aria-selected="false" tabindex="-1">Month</button>
      <button type="button" role="tab" aria-selected="false" tabindex="-1">Year</button>
    </div>`,
  init(root) {
    const seg = root.querySelector('.seg'), pill = root.querySelector('.pill'), tabs = [...root.querySelectorAll('[role="tab"]')];
    let cur = 0;
    const place = (b) => { pill.style.setProperty('--l', b.offsetLeft + 'px'); pill.style.setProperty('--r', (seg.clientWidth - b.offsetLeft - b.offsetWidth) + 'px'); };
    // the host is measured after init, so place the pill once layout exists (and again if fonts change widths)
    const ro = new ResizeObserver(() => { seg.classList.remove('fwd', 'back'); place(tabs[cur]); });
    ro.observe(seg);
    const go = (i, focus) => {
      if (i === cur) return;
      seg.classList.toggle('fwd', i > cur); seg.classList.toggle('back', i < cur);
      tabs[cur].setAttribute('aria-selected', 'false'); tabs[cur].tabIndex = -1;
      tabs[i].setAttribute('aria-selected', 'true'); tabs[i].tabIndex = 0; cur = i;
      place(tabs[i]); if (focus) tabs[i].focus();
    };
    tabs.forEach((b, i) => b.addEventListener('click', () => go(i)));
    seg.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault(); go((cur + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length, true);
    });
    return () => ro.disconnect();
  },
};
