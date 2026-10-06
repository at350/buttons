export default {
  id: 'lb-antd-wave',
  credit: 'Ant Design v5 — Primary (#1677ff) with SearchOutlined, Default and Dashed buttons; every click fires the real wave: box-shadow 0 → 6px in .4s while opacity .2 → 0 over 2s on cubic-bezier(.08,.82,.17,1)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; font: 400 14px/1.5714 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; }
    .ad { position: relative; height: 32px; padding: 4px 15px; border-radius: 6px; border: 1px solid transparent; cursor: pointer; font: inherit; display: inline-flex; align-items: center; justify-content: center; gap: 8px; white-space: nowrap; user-select: none; touch-action: manipulation; transition: all .2s cubic-bezier(.645,.045,.355,1); -webkit-tap-highlight-color: transparent; }
    .ad:focus-visible { outline: 4px solid #91caff; outline-offset: 1px; transition: outline-offset 0s, outline 0s; }
    .pri { background: #1677ff; color: #fff; box-shadow: 0 2px 0 rgba(5,145,255,.1); }
    .pri:hover { background: #4096ff; }
    .pri:active { background: #0958d9; }
    .def { background: #fff; color: rgba(0,0,0,.88); border-color: #d9d9d9; box-shadow: 0 2px 0 rgba(0,0,0,.02); }
    .def:hover { color: #4096ff; border-color: #4096ff; }
    .def:active { color: #0958d9; border-color: #0958d9; }
    .dsh { border-style: dashed; }
    .ad svg { width: 14px; height: 14px; fill: currentColor; }
    .wave { position: absolute; inset: -1px; border-radius: inherit; pointer-events: none; color: #4096ff; box-shadow: 0 0 0 0 currentColor; opacity: .2; animation: wave-shadow .4s cubic-bezier(.08,.82,.17,1) forwards, wave-fade 2s cubic-bezier(.08,.82,.17,1) forwards; }
    @keyframes wave-shadow { to { box-shadow: 0 0 0 6px currentColor; } }
    @keyframes wave-fade { to { opacity: 0; } }
  `,
  html: `
    <div class="row">
      <button class="ad pri" type="button"><svg viewBox="64 64 896 896" aria-hidden="true"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"/></svg>Search</button>
      <button class="ad def" type="button">Default Button</button>
      <button class="ad def dsh" type="button">Dashed Button</button>
    </div>`,
  init(root) {
    const timers = new Set();
    root.querySelectorAll('.ad').forEach((b) => b.addEventListener('click', () => {
      b.querySelector('.wave')?.remove();
      const w = document.createElement('span'); w.className = 'wave';
      w.style.color = getComputedStyle(b).backgroundColor === 'rgb(255, 255, 255)' ? getComputedStyle(b).borderTopColor : getComputedStyle(b).backgroundColor;
      b.appendChild(w);
      const k = setTimeout(() => { w.remove(); timers.delete(k); }, 2000); timers.add(k);
    }));
    return () => timers.forEach(clearTimeout);
  },
};
