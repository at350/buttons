const SPRING = 'linear(0, 0.143, 0.453, 0.779, 1.028, 1.168, 1.205, 1.173, 1.109, 1.043, 0.992, 0.965, 0.958, 0.965, 0.978, 0.992, 1.002, 1.007, 1.009, 1.007, 1.004, 1.002, 1)';

export default {
  id: 'mo-shockwave-buy',
  credit: 'Buy button with a 3-2-1 digit roll, then a shockwave — concentric rings blast out while the button punches in and flips to "Ordered"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { position: relative; padding: 30px 40px; }
    .btn {
      position: relative; height: 48px; width: 150px; border: 0; border-radius: 14px; background: #111; color: #fff; cursor: pointer; overflow: hidden;
      font: 600 15px Inter, system-ui, sans-serif; letter-spacing: -.01em; transition: transform .5s ${SPRING}, background .3s; z-index: 1;
    }
    .btn:hover { transform: scale(1.03); background: #222; } .btn:active { transform: scale(.96); }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
    .btn.count { background: #1f2937; } .btn.boom { background: #16a34a; animation: punch .6s ${SPRING}; }
    @keyframes punch { 0% { transform: scale(.85); } 100% { transform: scale(1); } }
    .lbl { display: grid; height: 20px; overflow: hidden; }
    .lbl span { grid-area: 1 / 1; line-height: 20px; transform: translateY(120%); opacity: 0; transition: transform .35s cubic-bezier(.34, 1.3, .64, 1), opacity .2s; font-variant-numeric: tabular-nums; }
    .lbl span.cur { transform: none; opacity: 1; } .lbl span.old { transform: translateY(-120%); opacity: 0; }
    .lbl .ok { display: inline-flex; align-items: center; justify-content: center; gap: 6px; } .lbl .ok svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
    .ring { position: absolute; left: 50%; top: 50%; width: 150px; height: 48px; margin: -24px 0 0 -75px; border-radius: 14px; border: 2px solid #16a34a; opacity: 0; pointer-events: none; }
    .wrap.boom .ring { animation: wave .9s cubic-bezier(.2, .7, .3, 1) forwards; }
    .wrap.boom .ring:nth-child(2) { animation-delay: .12s; } .wrap.boom .ring:nth-child(3) { animation-delay: .24s; border-color: #4ade80; }
    @keyframes wave { 0% { opacity: .9; transform: scale(1); } 100% { opacity: 0; transform: scale(1.45, 2.1); border-width: 1px; } }
    .flash { position: absolute; inset: 0; border-radius: 14px; background: #fff; opacity: 0; pointer-events: none; }
    .btn.boom .flash { animation: flash .4s ease-out; }
    @keyframes flash { 0% { opacity: .6; } 100% { opacity: 0; } }
  `,
  html: `
    <div class="wrap">
      <span class="ring"></span><span class="ring"></span><span class="ring"></span>
      <button class="btn" type="button" aria-live="polite">
        <span class="flash"></span>
        <span class="lbl"><span class="cur">Buy now · $29</span><span>3</span><span>2</span><span>1</span><span class="ok">Ordered<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg></span></span>
      </button>
    </div>`,
  init(root) {
    const wrap = root.querySelector('.wrap'), btn = root.querySelector('.btn'), spans = [...root.querySelectorAll('.lbl span')];
    let timers = [], busy = false;
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const show = (i) => spans.forEach((s, k) => { s.classList.toggle('cur', k === i); s.classList.toggle('old', k === i - 1 || (i === 0 && k === 4)); });
    btn.addEventListener('click', () => {
      if (busy) return; busy = true;
      btn.classList.add('count'); show(1);
      later(() => show(2), 600); later(() => show(3), 1200);
      later(() => { btn.classList.remove('count'); btn.classList.add('boom'); wrap.classList.add('boom'); show(4); }, 1800);
      later(() => { btn.classList.remove('boom'); wrap.classList.remove('boom'); show(0); busy = false; }, 3600);
    });
    return () => timers.forEach(clearTimeout);
  },
};
