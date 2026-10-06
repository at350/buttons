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
  id: 'in-ios-brightness',
  credit: 'Apple iOS Control Center brightness slider — fat frosted rounded bar with sun icon, grows while you drag',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 18px 26px; border-radius: 18px; background: linear-gradient(135deg, #ff9a9e 0%, #a18cd1 50%, #5ee7df 100%); }
    .sl {
      position: relative; width: 76px; height: 190px; border-radius: 24px; background: rgba(40,40,60,.38); overflow: hidden; cursor: pointer;
      touch-action: none; user-select: none; outline: 0; transition: transform .2s cubic-bezier(.34,1.3,.64,1); box-shadow: inset 0 0 0 1px rgba(255,255,255,.12);
    }
    .sl:focus-visible { box-shadow: 0 0 0 3px #fff; }
    .sl.active { transform: scale(1.06); }
    .fill { position: absolute; left: 0; right: 0; bottom: 0; height: var(--p, 60%); background: #fff; transition: height .08s linear; }
    .sl.active .fill { transition: none; }
    .ic { position: absolute; left: 0; right: 0; bottom: 18px; display: grid; place-items: center; color: #9a9aa6; }
    .ic svg { width: 26px; height: 26px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; }
    .ic circle { fill: currentColor; stroke: none; }
  `,
  html: `<div class="stage">
    <div class="sl" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="60" aria-orientation="vertical" aria-label="Brightness" style="--p:60%">
      <div class="fill"></div>
      <span class="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/></svg></span>
    </div>
  </div>`,
  init(root) {
    const sl = root.querySelector('.sl');
    let v = 60;
    const set = (n) => { v = Math.max(0, Math.min(100, Math.round(n))); sl.style.setProperty('--p', v + '%'); sl.setAttribute('aria-valuenow', v); };
    drag(sl, (e) => { const r = sl.getBoundingClientRect(); set((1 - (e.clientY - r.top) / r.height) * 100); });
    sl.addEventListener('keydown', (e) => {
      const d = { ArrowUp: 5, ArrowRight: 5, ArrowDown: -5, ArrowLeft: -5 }[e.key];
      if (d) { e.preventDefault(); set(v + d); }
    });
  },
};
