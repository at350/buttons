function drag(el, onPos) {
  el.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    el.setPointerCapture(e.pointerId); el.classList.add('active'); onPos(e, true); e.preventDefault();
    const mv = (ev) => onPos(ev, false);
    const up = () => { el.classList.remove('active'); el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  });
}

export default {
  id: 'in-dual-range',
  credit: 'Dual-handle range — two thumbs with the selected span filled between them (Airbnb price filter)',
  size: 'wide',
  css: `
    :host { display: block; }
    .sl { position: relative; height: 44px; padding: 0 12px; touch-action: none; user-select: none; }
    .track { position: absolute; left: 12px; right: 12px; top: 20px; height: 4px; border-radius: 2px; background: #dddddd; }
    .fill { position: absolute; top: 0; bottom: 0; left: var(--a); right: calc(100% - var(--b)); background: #222; }
    .thumb {
      position: absolute; top: 10px; width: 24px; height: 24px; margin-left: -12px; border-radius: 50%; background: #fff; border: 1px solid #b0b0b0; padding: 0;
      box-shadow: 0 2px 4px rgba(0,0,0,.18); cursor: grab; transition: transform .15s, box-shadow .15s;
    }
    .thumb:hover { box-shadow: 0 2px 6px rgba(0,0,0,.3); }
    .thumb.on, .thumb:focus-visible { transform: scale(1.12); outline: 0; box-shadow: 0 0 0 4px rgba(0,0,0,.12), 0 2px 6px rgba(0,0,0,.3); }
    .lo { left: calc(12px + (100% - 24px) * var(--fa)); } .hi { left: calc(12px + (100% - 24px) * var(--fb)); }
  `,
  html: `<div class="sl" style="--fa:.2;--fb:.7;--a:20%;--b:70%">
    <div class="track"><div class="fill"></div></div>
    <button class="thumb lo" type="button" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20" aria-label="Minimum"></button>
    <button class="thumb hi" type="button" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70" aria-label="Maximum"></button>
  </div>`,
  init(root) {
    const sl = root.querySelector('.sl'), lo = root.querySelector('.lo'), hi = root.querySelector('.hi');
    let a = 20, b = 70, which = null;
    const paint = () => {
      sl.style.setProperty('--fa', a / 100); sl.style.setProperty('--fb', b / 100);
      sl.style.setProperty('--a', a + '%'); sl.style.setProperty('--b', b + '%');
      lo.setAttribute('aria-valuenow', a); hi.setAttribute('aria-valuenow', b);
    };
    const setA = (n) => { a = Math.max(0, Math.min(b, Math.round(n))); paint(); };
    const setB = (n) => { b = Math.min(100, Math.max(a, Math.round(n))); paint(); };
    drag(sl, (e, start) => {
      const r = sl.getBoundingClientRect();
      const v = ((e.clientX - r.left - 12) / (r.width - 24)) * 100;
      if (start) { which = Math.abs(v - a) <= Math.abs(v - b) ? 'a' : 'b'; (which === 'a' ? lo : hi).classList.add('on'); }
      if (which === 'a') setA(v); else setB(v);
    });
    sl.addEventListener('pointerup', () => { lo.classList.remove('on'); hi.classList.remove('on'); });
    const keys = (th, get, set) => th.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
      if (d) { e.preventDefault(); set(get() + d); }
    });
    keys(lo, () => a, setA); keys(hi, () => b, setB);
  },
};
