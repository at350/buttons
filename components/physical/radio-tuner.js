export default {
  id: 'ph-radio-tuner',
  credit: 'Vintage FM tuning dial — amber backlit glass, red needle you drag across the band',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { padding: 16px 18px; border-radius: 12px; background: linear-gradient(#4a3426, #2b1c13); box-shadow: inset 0 1px 0 rgba(255,255,255,.1); }
    .glass {
      position: relative; height: 76px; border-radius: 6px; overflow: hidden; cursor: ew-resize; touch-action: none;
      background: radial-gradient(ellipse at 50% 120%, #ffb347, #c66a12 55%, #6b350a 100%);
      box-shadow: inset 0 3px 8px rgba(0,0,0,.7), inset 0 0 0 1px rgba(0,0,0,.6), 0 0 18px rgba(255,160,60,.25), 0 1px 0 rgba(255,255,255,.15);
    }
    .glass::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,0) 45%); pointer-events: none; }
    .ticks { position: absolute; left: 6%; right: 6%; top: 44px; height: 10px; background: repeating-linear-gradient(90deg, #2a1200 0 1px, transparent 1px 9.09%); }
    .ticks::after { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 5px; background: repeating-linear-gradient(90deg, #2a1200 0 1px, transparent 1px 2.27%); }
    .nums { position: absolute; left: 6%; right: 6%; top: 18px; display: flex; justify-content: space-between; font: 600 12px/1 Georgia, "Times New Roman", serif; color: #2a1200; letter-spacing: .5px; }
    .nums span { width: 0; display: flex; justify-content: center; }
    .needle { position: absolute; top: 6px; bottom: 6px; width: 2px; margin-left: -1px; background: #e8141c; box-shadow: 0 0 3px rgba(0,0,0,.5), 0 0 4px rgba(255,60,60,.6); left: 40%; pointer-events: none; }
    .needle::before { content: ''; position: absolute; left: -2px; top: -2px; width: 6px; height: 6px; border-radius: 50%; background: #8a0a0c; }
    .glass:focus-visible { outline: 2px solid #ffd27a; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="glass" role="slider" tabindex="0" aria-label="tuning" aria-valuemin="88" aria-valuemax="108" aria-valuenow="96">
        <div class="nums"><span>88</span><span>90</span><span>92</span><span>94</span><span>96</span><span>98</span><span>100</span><span>102</span><span>104</span><span>106</span><span>108</span></div>
        <div class="ticks"></div>
        <div class="needle"></div>
      </div>
    </div>`,
  init(root) {
    const glass = root.querySelector('.glass'), needle = root.querySelector('.needle');
    let v = 0.4, dragging = false, raf = 0;
    const render = () => { needle.style.left = `${6 + v * 88}%`; glass.setAttribute('aria-valuenow', (88 + v * 20).toFixed(1)); };
    const setFrom = (e) => { const r = glass.getBoundingClientRect(); v = Math.max(0, Math.min(1, ((e.clientX - r.left) / r.width - 0.06) / 0.88)); };
    glass.addEventListener('pointerdown', (e) => { dragging = true; glass.setPointerCapture(e.pointerId); setFrom(e); render(); });
    glass.addEventListener('pointermove', (e) => { if (!dragging) return; setFrom(e); if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); }); });
    const end = () => { dragging = false; };
    glass.addEventListener('pointerup', end); glass.addEventListener('pointercancel', end);
    glass.addEventListener('keydown', (e) => {
      const s = e.key === 'ArrowRight' ? .01 : e.key === 'ArrowLeft' ? -.01 : 0;
      if (!s) return; e.preventDefault(); v = Math.max(0, Math.min(1, v + s)); render();
    });
  },
};
