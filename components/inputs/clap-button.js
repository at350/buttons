export default {
  id: 'in-clap-button',
  credit: 'Medium clap button — hold to keep clapping, a counter bubble floats up and the hands pulse',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .w { position: relative; display: inline-flex; align-items: center; gap: 10px; padding: 14px 8px 4px; }
    .c {
      position: relative; width: 56px; height: 56px; border-radius: 50%; border: 1px solid #1a8917; background: #fff; color: #1a8917; cursor: pointer; padding: 0;
      display: grid; place-items: center; transition: transform .12s, box-shadow .2s, background .2s; -webkit-tap-highlight-color: transparent; user-select: none; touch-action: none;
    }
    .c:hover { box-shadow: 0 0 0 6px rgba(26,137,23,.12); }
    .c:focus-visible { outline: 3px solid #1a8917; outline-offset: 2px; }
    .c.hot { background: #1a8917; color: #fff; }
    .c.pulse { animation: pulse .25s ease-out; }
    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.14); } 100% { transform: scale(1); } }
    .c svg { width: 28px; height: 28px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .c.hot svg { fill: rgba(255,255,255,.15); }
    .n { min-width: 2ch; font: 500 15px system-ui, sans-serif; color: #6b6b6b; font-variant-numeric: tabular-nums; }
    .bub {
      position: absolute; left: 36px; top: -4px; transform: translate(-50%, 10px) scale(.6); width: 36px; height: 36px; border-radius: 50%; background: #1a8917; color: #fff;
      font: 600 13px system-ui, sans-serif; display: grid; place-items: center; opacity: 0; transition: transform .2s cubic-bezier(.34,1.3,.64,1), opacity .2s; pointer-events: none;
    }
    .w.show .bub { opacity: 1; transform: translate(-50%, 0) scale(1); }
  `,
  html: `<div class="w">
    <span class="bub">+0</span>
    <button class="c" type="button" aria-label="Clap">
      <svg viewBox="0 0 24 24"><path d="M11 5.5l1.3 1.3M14.5 3.5l.7 2M8 7l-1.5-1.5"/><path d="M8.5 9.5l-3.2 3.2a2 2 0 0 0 0 2.8l3.9 3.9a4.5 4.5 0 0 0 6.4 0l4.6-4.6a1.6 1.6 0 0 0-2.3-2.3l-2.1 2.1 4.1-4.1a1.6 1.6 0 1 0-2.3-2.3l-4.1 4.1 3.3-3.3a1.6 1.6 0 0 0-2.3-2.3l-3.3 3.3 1.8-1.8a1.6 1.6 0 1 0-2.3-2.3L7.6 9.4"/></svg>
    </button>
    <span class="n">0</span>
  </div>`,
  init(root) {
    const w = root.querySelector('.w'), c = root.querySelector('.c'), n = root.querySelector('.n'), bub = root.querySelector('.bub');
    let total = 0, burst = 0, timer = 0, hide = 0;
    const clap = () => {
      total++; burst++; n.textContent = total; bub.textContent = '+' + burst; w.classList.add('show'); c.classList.add('hot');
      c.classList.remove('pulse'); void c.offsetWidth; c.classList.add('pulse');
      clearTimeout(hide); hide = setTimeout(() => { w.classList.remove('show'); burst = 0; }, 900);
    };
    const start = (e) => { if (e.button !== 0) return; e.preventDefault(); c.setPointerCapture(e.pointerId); clap(); clearInterval(timer); timer = setInterval(clap, 140); };
    const stop = () => { clearInterval(timer); timer = 0; };
    c.addEventListener('pointerdown', start);
    c.addEventListener('pointerup', stop); c.addEventListener('pointercancel', stop); c.addEventListener('lostpointercapture', stop);
    c.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) { e.preventDefault(); clap(); } });
    return () => { stop(); clearTimeout(hide); };
  },
};
