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
  id: 'in-hue-slider',
  credit: 'Hue slider — rainbow track, the thumb takes on the picked color (Figma / Chrome color picker)',
  size: 'wide',
  css: `
    :host { display: block; }
    .sl { position: relative; height: 36px; padding: 0 12px; touch-action: none; user-select: none; cursor: pointer; }
    .track {
      position: absolute; left: 0; right: 0; top: 12px; height: 12px; border-radius: 6px;
      background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.08);
    }
    .thumb {
      position: absolute; top: 6px; left: calc(12px + (100% - 24px) * var(--f)); width: 24px; height: 24px; margin-left: -12px; border-radius: 50%; padding: 0;
      background: hsl(var(--h), 100%, 50%); border: 3px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,.35); cursor: grab; transition: transform .12s;
    }
    .sl.active .thumb { transform: scale(1.15); cursor: grabbing; }
    .thumb:focus-visible { outline: 0; box-shadow: 0 0 0 3px rgba(0,0,0,.3), 0 1px 4px rgba(0,0,0,.35); }
  `,
  html: `<div class="sl" style="--f:.55;--h:198">
    <div class="track"></div>
    <button class="thumb" type="button" role="slider" aria-valuemin="0" aria-valuemax="360" aria-valuenow="198" aria-label="Hue"></button>
  </div>`,
  init(root) {
    const sl = root.querySelector('.sl'), th = root.querySelector('.thumb');
    let h = 198;
    const set = (n) => { h = Math.max(0, Math.min(360, Math.round(n))); sl.style.setProperty('--f', h / 360); sl.style.setProperty('--h', h); th.setAttribute('aria-valuenow', h); };
    drag(sl, (e) => { const r = sl.getBoundingClientRect(); set(((e.clientX - r.left - 12) / (r.width - 24)) * 360); });
    th.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 3, ArrowUp: 3, ArrowLeft: -3, ArrowDown: -3 }[e.key];
      if (d) { e.preventDefault(); set(h + d); }
    });
  },
};
