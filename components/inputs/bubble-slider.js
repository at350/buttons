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
  id: 'in-bubble-slider',
  credit: 'Range slider with a value bubble that rides on the thumb (Ant Design / Dribbble tooltip slider)',
  size: 'wide',
  css: `
    :host { display: block; }
    .sl { position: relative; height: 56px; padding: 0 11px; touch-action: none; user-select: none; cursor: pointer; }
    .track { position: absolute; left: 0; right: 0; top: 34px; height: 6px; border-radius: 3px; background: #e5e7eb; }
    .fill { position: absolute; left: 0; top: 0; bottom: 0; width: var(--p); border-radius: 3px; background: #6366f1; }
    .thumb {
      position: absolute; top: 26px; left: calc(11px + (100% - 22px) * var(--f)); width: 22px; height: 22px; border-radius: 50%; background: #fff; border: 2px solid #6366f1; padding: 0;
      box-shadow: 0 1px 4px rgba(0,0,0,.2); cursor: grab; transition: box-shadow .15s, transform .15s;
    }
    .sl.active .thumb, .thumb:focus-visible { box-shadow: 0 0 0 6px rgba(99,102,241,.2); outline: 0; transform: scale(1.1); cursor: grabbing; }
    .bubble {
      position: absolute; bottom: 30px; left: 50%; min-width: 34px; padding: 4px 7px; border-radius: 6px; background: #111827; color: #fff; text-align: center;
      font: 600 12px/1 system-ui, sans-serif; transform: translate(-50%, 6px) scale(.7); opacity: 0; transition: transform .15s, opacity .15s; pointer-events: none;
    }
    .bubble::after { content: ''; position: absolute; left: 50%; bottom: -4px; width: 8px; height: 8px; background: #111827; transform: translateX(-50%) rotate(45deg); border-radius: 1px; }
    .sl:hover .bubble, .sl.active .bubble, .thumb:focus-visible .bubble { opacity: 1; transform: translate(-50%, 0) scale(1); }
  `,
  html: `<div class="sl" style="--f:.4;--p:40%">
    <div class="track"><div class="fill"></div></div>
    <button class="thumb" type="button" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40" aria-label="Value"><span class="bubble">40</span></button>
  </div>`,
  init(root) {
    const sl = root.querySelector('.sl'), th = root.querySelector('.thumb'), bub = root.querySelector('.bubble');
    let v = 40;
    const set = (n) => {
      v = Math.max(0, Math.min(100, Math.round(n)));
      sl.style.setProperty('--f', v / 100); sl.style.setProperty('--p', v + '%');
      th.setAttribute('aria-valuenow', v); bub.textContent = v;
    };
    drag(sl, (e) => {
      const r = sl.getBoundingClientRect();
      set(((e.clientX - r.left - 11) / (r.width - 22)) * 100);
    });
    th.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 10, PageDown: -10 }[e.key];
      if (d) { e.preventDefault(); set(v + d); }
      if (e.key === 'Home') { e.preventDefault(); set(0); } if (e.key === 'End') { e.preventDefault(); set(100); }
    });
  },
};
