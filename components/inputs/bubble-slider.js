function drag(el, onPos) {
  el.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    el.setPointerCapture(e.pointerId); el.classList.add('active'); onPos(e); e.preventDefault();
    const mv = (ev) => onPos(ev);
    const up = () => { el.classList.remove('active'); el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  });
}

// Ant Design v5 Slider with its Tooltip, from the antd token defaults:
// rail 4px rgba(0,0,0,.04) (hover .06), track colorPrimaryBorder #91caff (hover #69b1ff), handle 10px white with a 2px
// #91caff ring that grows to 12px / 2.5px #1677ff on hover-focus-drag (.2s); tooltip colorBgSpotlight rgba(0,0,0,.85),
// 6px radius, 6px 8px padding, 14px/22px, 16×8 arrow, zoom-in .1s cubic-bezier(.08,.82,.17,1).
// The tooltip lives inside the element: the stage reserves its height above the rail.
export default {
  id: 'in-bubble-slider',
  credit: 'Ant Design v5 Slider with tooltip — #91caff track, ringed handle that grows to #1677ff, dark value tooltip on hover / drag',
  size: 'wide',
  css: `
    :host { display: block; }
    .w { width: 300px; max-width: 100%; margin: 0 auto; padding: 46px 24px 4px; }
    .sl { position: relative; height: 12px; padding: 4px 0; touch-action: none; user-select: none; cursor: pointer; }
    .rail { position: absolute; left: 0; right: 0; top: 4px; height: 4px; border-radius: 2px; background: rgba(0,0,0,.04); transition: background-color .2s; }
    .track { position: absolute; left: 0; top: 4px; height: 4px; width: var(--p); border-radius: 2px; background: #91caff; transition: background-color .2s; }
    .sl:hover .rail { background: rgba(0,0,0,.06); }
    .sl:hover .track { background: #69b1ff; }
    .h {
      position: absolute; top: 1px; left: var(--p); width: 10px; height: 10px; margin-left: -5px; border: 0; padding: 0; background: none; cursor: pointer; outline: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .h::after {
      content: ''; position: absolute; inset: 0; border-radius: 50%; background: #fff; box-shadow: 0 0 0 2px #91caff;
      transition: inset .2s, box-shadow .2s;
    }
    .h:hover::after, .h:focus-visible::after, .sl.active .h::after { inset: -1px; box-shadow: 0 0 0 2.5px #1677ff; }
    .h:focus-visible::after { box-shadow: 0 0 0 2.5px #1677ff, 0 0 0 6.5px rgba(22,119,255,.2); }
    .tip {
      position: absolute; bottom: 18px; left: 50%; min-width: 32px; min-height: 32px; padding: 6px 8px; border-radius: 6px; background: rgba(0,0,0,.85); color: #fff; text-align: center;
      font: 400 14px/22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; white-space: nowrap; pointer-events: none;
      box-shadow: 0 6px 16px 0 rgba(0,0,0,.08), 0 3px 6px -4px rgba(0,0,0,.12), 0 9px 28px 8px rgba(0,0,0,.05);
      transform: translateX(-50%) scale(.8); transform-origin: 50% 100%; opacity: 0; transition: transform .1s cubic-bezier(.78,.14,.15,.86), opacity .1s;
    }
    .tip::after { content: ''; position: absolute; left: 50%; bottom: -8px; margin-left: -8px; border: 8px solid transparent; border-bottom: 0; border-top-color: rgba(0,0,0,.85); }
    .h:hover .tip, .h:focus-visible .tip, .sl.active .tip { transform: translateX(-50%); opacity: 1; transition: transform .1s cubic-bezier(.08,.82,.17,1), opacity .1s; }
  `,
  html: `<div class="w"><div class="sl" style="--p:30%">
    <div class="rail"></div><div class="track"></div>
    <button class="h" type="button" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="30" aria-label="Volume"><span class="tip">30</span></button>
  </div></div>`,
  init(root) {
    const sl = root.querySelector('.sl'), h = root.querySelector('.h'), tip = root.querySelector('.tip');
    let v = 30;
    const set = (n) => {
      v = Math.max(0, Math.min(100, Math.round(n)));
      sl.style.setProperty('--p', v + '%'); h.setAttribute('aria-valuenow', v); tip.textContent = v;
    };
    drag(sl, (e) => { const r = sl.getBoundingClientRect(); set(((e.clientX - r.left) / r.width) * 100); });
    h.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 10, PageDown: -10 }[e.key];
      if (d) { e.preventDefault(); set(v + d); }
      if (e.key === 'Home') { e.preventDefault(); set(0); } if (e.key === 'End') { e.preventDefault(); set(100); }
    });
  },
};
