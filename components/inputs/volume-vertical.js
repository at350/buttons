function drag(el, onPos) {
  el.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    el.setPointerCapture(e.pointerId); el.classList.add('active'); onPos(e); e.preventDefault();
    const mv = (ev) => onPos(ev);
    const up = () => { el.classList.remove('active'); el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  });
}

export default {
  id: 'in-volume-vertical',
  credit: 'Vertical volume slider — fat frosted pill filling from the bottom, speaker icon gains waves (macOS / iOS volume HUD)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 16px 22px; border-radius: 16px; background: linear-gradient(160deg, #2a2f45, #0f1222); }
    .sl {
      position: relative; width: 44px; height: 150px; border-radius: 14px; background: rgba(255,255,255,.18); overflow: hidden; cursor: pointer;
      touch-action: none; user-select: none; outline: 0; transition: transform .15s;
    }
    .sl:focus-visible { box-shadow: 0 0 0 3px #fff; }
    .sl.active { transform: scaleX(1.06); }
    .fill { position: absolute; left: 0; right: 0; bottom: 0; height: var(--p, 50%); background: #fff; }
    .sl.active .fill { transition: none; }
    .ic { position: absolute; left: 0; right: 0; bottom: 12px; display: grid; place-items: center; mix-blend-mode: difference; color: #fff; }
    .ic svg { width: 18px; height: 18px; fill: currentColor; stroke: currentColor; stroke-width: 2; stroke-linecap: round; fill-rule: evenodd; }
    .w1, .w2 { fill: none; opacity: 0; transition: opacity .15s; }
    .sl.l1 .w1, .sl.l2 .w1, .sl.l2 .w2 { opacity: 1; }
  `,
  html: `<div class="stage">
    <div class="sl" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-orientation="vertical" aria-label="Volume" style="--p:50%">
      <div class="fill"></div>
      <span class="ic"><svg viewBox="0 0 24 24"><path d="M4 9h3l4-3.5v13L7 15H4z"/><path class="w1" d="M14.5 9.5a3.5 3.5 0 0 1 0 5"/><path class="w2" d="M17.5 7a7 7 0 0 1 0 10"/></svg></span>
    </div>
  </div>`,
  init(root) {
    const sl = root.querySelector('.sl');
    let v = 50;
    const set = (n) => {
      v = Math.max(0, Math.min(100, Math.round(n)));
      sl.style.setProperty('--p', v + '%'); sl.setAttribute('aria-valuenow', v);
      sl.classList.toggle('l1', v > 25); sl.classList.toggle('l2', v > 65);
    };
    set(50);
    drag(sl, (e) => { const r = sl.getBoundingClientRect(); set((1 - (e.clientY - r.top) / r.height) * 100); });
    sl.addEventListener('keydown', (e) => {
      const d = { ArrowUp: 5, ArrowRight: 5, ArrowDown: -5, ArrowLeft: -5 }[e.key];
      if (d) { e.preventDefault(); set(v + d); }
    });
  },
};
