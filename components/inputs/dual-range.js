function drag(el, onPos) {
  el.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    el.setPointerCapture(e.pointerId); el.classList.add('active'); onPos(e, true); e.preventDefault();
    const mv = (ev) => onPos(ev, false);
    const up = () => { el.classList.remove('active'); onPos(null, false, true); el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  });
}

// Deterministic price histogram (right-skewed like nightly prices).
const BARS = 46;
const HEIGHTS = Array.from({ length: BARS }, (_, i) => {
  const x = (i + 0.5) / BARS;
  const base = Math.exp(-Math.pow(Math.log(x * 6 + 0.35) - 0.9, 2) / 0.55);
  const jitter = 0.72 + 0.28 * Math.abs(Math.sin(i * 12.9898) * 43758.5453 % 1);
  return Math.max(0.05, Math.min(1, base * jitter * 1.08));
});
const MIN = 10, MAX = 500;

// Airbnb "Price range" filter: histogram whose in-range bars are Rausch #ff385c and out-of-range #dddddd,
// two 32px white handles (1px #b0b0b0 border, soft shadow) sitting on the histogram baseline, and the
// "Minimum / Maximum" pill boxes underneath that follow the handles. Text #222222 / #6a6a6a.
export default {
  id: 'in-dual-range',
  credit: 'Airbnb price-range filter — histogram turns Rausch pink inside the range, 32px handles on the baseline, Minimum / Maximum pills',
  size: 'wide',
  css: `
    :host { display: block; }
    .w { width: 340px; max-width: 100%; margin: 0 auto; padding: 4px 0 2px; font-family: "Airbnb Cereal VF", Circular, system-ui, -apple-system, "Helvetica Neue", sans-serif; color: #222; }
    .sl { position: relative; height: 80px; padding: 0 16px; touch-action: none; user-select: none; cursor: pointer; }
    .hist { position: absolute; left: 16px; right: 16px; bottom: 16px; height: 60px; display: flex; align-items: flex-end; gap: 2px; }
    .bar { flex: 1 1 0; min-width: 0; border-radius: 1px 1px 0 0; background: #ddd; transition: background-color .15s; }
    .bar.in { background: #ff385c; }
    .base { position: absolute; left: 16px; right: 16px; bottom: 15px; height: 2px; background: #ddd; }
    .thumb {
      position: absolute; bottom: 0; width: 32px; height: 32px; margin-left: -16px; border-radius: 50%; background: #fff; border: 1px solid #b0b0b0; padding: 0;
      box-shadow: 0 2px 4px rgba(0,0,0,.18); cursor: grab; transition: transform .15s, box-shadow .15s; outline: 0; -webkit-tap-highlight-color: transparent;
    }
    .thumb:hover { box-shadow: 0 2px 8px rgba(0,0,0,.28); transform: scale(1.06); }
    .thumb.on { cursor: grabbing; transform: scale(1.1); box-shadow: 0 4px 12px rgba(0,0,0,.28); }
    .thumb:focus-visible { box-shadow: 0 0 0 2px #fff, 0 0 0 4px #222; }
    .lo { left: calc(16px + (100% - 32px) * var(--fa)); } .hi { left: calc(16px + (100% - 32px) * var(--fb)); }
    .boxes { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 20px; padding: 0 2px; }
    .box { width: 116px; padding: 8px 18px; border-radius: 9999px; border: 1px solid #b0b0b0; text-align: center; white-space: nowrap; }
    .box small { display: block; font-size: 12px; line-height: 16px; color: #6a6a6a; }
    .box b { display: block; font-size: 16px; line-height: 20px; font-weight: 500; font-variant-numeric: tabular-nums; }
  `,
  html: `<div class="w">
    <div class="sl" style="--fa:.1;--fb:.62">
      <div class="hist">${HEIGHTS.map((h) => '<span class="bar" style="height:' + (h * 100).toFixed(1) + '%"></span>').join('')}</div>
      <div class="base"></div>
      <button class="thumb lo" type="button" role="slider" aria-valuemin="${MIN}" aria-valuemax="${MAX}" aria-valuenow="59" aria-label="Minimum price"></button>
      <button class="thumb hi" type="button" role="slider" aria-valuemin="${MIN}" aria-valuemax="${MAX}" aria-valuenow="314" aria-label="Maximum price"></button>
    </div>
    <div class="boxes"><div class="box"><small>Minimum</small><b class="vmin">$59</b></div><div class="box"><small>Maximum</small><b class="vmax">$314</b></div></div>
  </div>`,
  init(root) {
    const sl = root.querySelector('.sl'), lo = root.querySelector('.lo'), hi = root.querySelector('.hi');
    const bars = [...root.querySelectorAll('.bar')], vmin = root.querySelector('.vmin'), vmax = root.querySelector('.vmax');
    let a = 10, b = 62, which = null;
    const price = (f) => Math.round(MIN + (MAX - MIN) * f / 100);
    const paint = () => {
      sl.style.setProperty('--fa', a / 100); sl.style.setProperty('--fb', b / 100);
      bars.forEach((el, i) => { const c = ((i + 0.5) / BARS) * 100; el.classList.toggle('in', c >= a && c <= b); });
      lo.setAttribute('aria-valuenow', price(a)); hi.setAttribute('aria-valuenow', price(b));
      vmin.textContent = '$' + price(a); vmax.textContent = '$' + price(b) + (b >= 100 ? '+' : '');
    };
    const setA = (n) => { a = Math.max(0, Math.min(b - 4, n)); paint(); };
    const setB = (n) => { b = Math.min(100, Math.max(a + 4, n)); paint(); };
    drag(sl, (e, start, end) => {
      if (end) { lo.classList.remove('on'); hi.classList.remove('on'); return; }
      const r = sl.getBoundingClientRect();
      const v = ((e.clientX - r.left - 16) / (r.width - 32)) * 100;
      if (start) { which = Math.abs(v - a) <= Math.abs(v - b) ? 'a' : 'b'; (which === 'a' ? lo : hi).classList.add('on'); }
      if (which === 'a') setA(v); else setB(v);
    });
    const keys = (th, get, set) => th.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 10, PageDown: -10 }[e.key];
      if (d) { e.preventDefault(); set(get() + d); }
    });
    keys(lo, () => a, setA); keys(hi, () => b, setB);
    paint();
  },
};
