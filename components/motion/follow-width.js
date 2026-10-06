const SPRING = 'linear(0, 0.143, 0.453, 0.779, 1.028, 1.168, 1.205, 1.173, 1.109, 1.043, 0.992, 0.965, 0.958, 0.965, 0.978, 0.992, 1.002, 1.007, 1.009, 1.007, 1.004, 1.002, 1)';

export default {
  id: 'mo-follow-width',
  credit: 'Follow → Following — the pill animates its measured width with a spring while the labels crossfade and a check pops in (Threads / Family style)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .box { position: relative; width: 150px; height: 44px; display: flex; align-items: center; }
    .btn {
      position: relative; height: 40px; width: var(--w, 96px); border-radius: 999px; border: 1.5px solid #111; background: #111; color: #fff;
      font: 600 14px Inter, system-ui, sans-serif; cursor: pointer; overflow: hidden; white-space: nowrap;
      transition: width .6s ${SPRING}, background .3s, color .3s, border-color .3s, transform .2s cubic-bezier(.34, 1.56, .64, 1);
    }
    .btn:hover { transform: scale(1.03); } .btn:active { transform: scale(.96); }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
    .btn[aria-pressed="true"] { background: #fff; color: #111; border-color: #d4d4d0; }
    .btn[aria-pressed="true"]:hover { border-color: #ef4444; color: #ef4444; }
    .l { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 6px; transition: opacity .25s, transform .5s ${SPRING}, filter .25s; }
    .l2 { opacity: 0; transform: translateY(10px); filter: blur(3px); }
    .btn[aria-pressed="true"] .l1 { opacity: 0; transform: translateY(-10px); filter: blur(3px); }
    .btn[aria-pressed="true"] .l2 { opacity: 1; transform: none; filter: none; }
    .l2 svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; transform: scale(0); transition: transform .5s .15s ${SPRING}; }
    .btn[aria-pressed="true"] .l2 svg { transform: scale(1); }
    .m { position: absolute; left: 0; top: 0; visibility: hidden; white-space: nowrap; font: 600 14px Inter, system-ui, sans-serif; padding: 0 18px; }
    .l1 svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; transition: transform .4s ${SPRING}; }
    .btn:hover .l1 svg { transform: rotate(90deg); }
  `,
  html: `
    <div class="box">
      <button class="btn" type="button" aria-pressed="false">
        <span class="l l1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>Follow</span>
        <span class="l l2"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Following</span>
      </button>
      <span class="m m1">+ Follow</span><span class="m m2">✓ Following</span>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn');
    const w1 = root.querySelector('.m1').offsetWidth + 4, w2 = root.querySelector('.m2').offsetWidth + 4;
    b.style.setProperty('--w', w1 + 'px');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      b.style.setProperty('--w', (on ? w2 : w1) + 'px');
    });
  },
};
