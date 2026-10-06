export default {
  id: 'in-circular-dial',
  credit: 'Circular progress dial with a draggable handle — drag around the ring, value shown in the center (Nest / fitness ring)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .d { position: relative; width: 128px; height: 128px; touch-action: none; user-select: none; outline: 0; border-radius: 50%; cursor: pointer; }
    .d:focus-visible { box-shadow: 0 0 0 3px #f97316; }
    svg { width: 100%; height: 100%; transform: rotate(-90deg); overflow: visible; }
    .bg { fill: none; stroke: #ece9e4; stroke-width: 10; }
    .pr { fill: none; stroke: #f97316; stroke-width: 10; stroke-linecap: round; stroke-dasharray: 314.16; stroke-dashoffset: calc(314.16 * (1 - var(--f, .62))); transition: stroke-dashoffset .1s linear; }
    .d.active .pr { transition: none; }
    .h { fill: #fff; stroke: #f97316; stroke-width: 4; r: 9; cx: 64; cy: 14; transform-origin: 64px 64px; transform: rotate(calc(var(--f, .62) * 360deg)); filter: drop-shadow(0 1px 2px rgba(0,0,0,.3)); transition: transform .1s linear, r .15s; }
    .d:hover .h, .d.active .h { r: 11; }
    .d.active .h { transition: r .15s; }
    .val { position: absolute; inset: 0; display: grid; place-items: center; font: 700 26px system-ui, sans-serif; color: #1f2937; letter-spacing: -.02em; pointer-events: none; }
    .val small { font-size: 14px; font-weight: 600; color: #9ca3af; margin-left: 1px; }
  `,
  html: `<div class="d" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="62" aria-label="Dial" style="--f:.62">
    <svg viewBox="0 0 128 128"><circle class="bg" cx="64" cy="64" r="50"/><circle class="pr" cx="64" cy="64" r="50"/><circle class="h"/></svg>
    <div class="val"><span><b class="n">62</b><small>%</small></span></div>
  </div>`,
  init(root) {
    const d = root.querySelector('.d'), n = root.querySelector('.n');
    let v = 62;
    const set = (x) => { v = Math.max(0, Math.min(100, Math.round(x))); d.style.setProperty('--f', v / 100); d.setAttribute('aria-valuenow', v); n.textContent = v; };
    const fromEvent = (e) => {
      const r = d.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      let a = Math.atan2(dx, -dy) * 180 / Math.PI; if (a < 0) a += 360;
      const nv = (a / 360) * 100;
      if (v > 85 && nv < 15) set(100); else if (v < 15 && nv > 85) set(0); else set(nv);
    };
    d.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      d.setPointerCapture(e.pointerId); d.classList.add('active'); fromEvent(e); e.preventDefault();
      const mv = (ev) => fromEvent(ev);
      const up = () => { d.classList.remove('active'); d.removeEventListener('pointermove', mv); d.removeEventListener('pointerup', up); d.removeEventListener('pointercancel', up); };
      d.addEventListener('pointermove', mv); d.addEventListener('pointerup', up); d.addEventListener('pointercancel', up);
    });
    d.addEventListener('keydown', (e) => {
      const k = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 }[e.key];
      if (k) { e.preventDefault(); set(v + k); }
    });
  },
};
