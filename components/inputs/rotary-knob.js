function ticks() {
  let s = '';
  for (let i = 0; i <= 26; i++) {
    const a = (-135 + (270 * i) / 26) * Math.PI / 180;
    const big = i % 13 === 0;
    const r1 = 46, r2 = big ? 40 : 42;
    s += '<line class="' + (big ? 'tk big' : 'tk') + '" data-i="' + i + '" x1="' + (50 + r1 * Math.sin(a)).toFixed(2) + '" y1="' + (50 - r1 * Math.cos(a)).toFixed(2) + '" x2="' + (50 + r2 * Math.sin(a)).toFixed(2) + '" y2="' + (50 - r2 * Math.cos(a)).toFixed(2) + '"/>';
  }
  return s;
}

export default {
  id: 'in-rotary-knob',
  credit: 'Rotary knob — drag to turn (pointer angle to value), 270° sweep with tick marks that light up (synth / amp knob)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px; border-radius: 16px; background: #1b1d22; }
    .wrap { position: relative; width: 104px; height: 104px; touch-action: none; user-select: none; }
    svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .tk { stroke: #3a3d46; stroke-width: 1.5; stroke-linecap: round; transition: stroke .1s; }
    .tk.big { stroke-width: 2.5; }
    .tk.on { stroke: #ff9f43; }
    .knob {
      position: absolute; inset: 20px; border-radius: 50%; border: 0; padding: 0; cursor: grab;
      background: radial-gradient(circle at 50% 35%, #5a5e6b, #2b2e36 70%); box-shadow: 0 4px 10px rgba(0,0,0,.6), inset 0 1px 1px rgba(255,255,255,.25), inset 0 -2px 4px rgba(0,0,0,.6);
      transform: rotate(var(--a, 0deg)); -webkit-tap-highlight-color: transparent;
    }
    .wrap.active .knob { cursor: grabbing; }
    .knob:focus-visible { outline: 2px solid #ff9f43; outline-offset: 3px; }
    .knob::after { content: ''; position: absolute; left: 50%; top: 6px; width: 4px; height: 16px; margin-left: -2px; border-radius: 2px; background: #ff9f43; box-shadow: 0 0 6px rgba(255,159,67,.8); }
  `,
  html: `<div class="stage"><div class="wrap">
    <svg viewBox="0 0 100 100">${ticks()}</svg>
    <button class="knob" type="button" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="35" aria-label="Knob"></button>
  </div></div>`,
  init(root) {
    const wrap = root.querySelector('.wrap'), knob = root.querySelector('.knob'), tks = [...root.querySelectorAll('.tk')];
    let v = 35, raf = 0, pending = null;
    const paint = () => {
      knob.style.setProperty('--a', (-135 + v * 2.7) + 'deg'); knob.setAttribute('aria-valuenow', v);
      const lit = Math.round((v / 100) * 26);
      tks.forEach((t, i) => t.classList.toggle('on', i <= lit));
    };
    const set = (n) => { v = Math.max(0, Math.min(100, Math.round(n))); paint(); };
    const fromEvent = (e) => {
      const r = wrap.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      let a = Math.atan2(dx, -dy) * 180 / Math.PI;
      a = Math.max(-135, Math.min(135, a));
      set(((a + 135) / 270) * 100);
    };
    knob.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      knob.setPointerCapture(e.pointerId); wrap.classList.add('active'); fromEvent(e); e.preventDefault();
      const mv = (ev) => { pending = ev; if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (pending) fromEvent(pending); pending = null; }); };
      const up = () => {
        wrap.classList.remove('active');
        if (raf) cancelAnimationFrame(raf); raf = 0;
        // flush the last queued sample synchronously so a release before the next frame isn't lost
        if (pending) fromEvent(pending); pending = null;
        knob.removeEventListener('pointermove', mv); knob.removeEventListener('pointerup', up); knob.removeEventListener('pointercancel', up);
      };
      knob.addEventListener('pointermove', mv); knob.addEventListener('pointerup', up); knob.addEventListener('pointercancel', up);
    });
    knob.addEventListener('keydown', (e) => {
      const d = { ArrowUp: 2, ArrowRight: 2, ArrowDown: -2, ArrowLeft: -2 }[e.key];
      if (d) { e.preventDefault(); set(v + d); }
    });
    paint();
  },
};
