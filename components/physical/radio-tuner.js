// Valve-radio FM tuning scale: amber-backlit printed glass, 88–108 MHz with a tick every 0.5 MHz
// and a long tick at every labelled 2 MHz step (ticks and figures share one coordinate system,
// so they line up), a red cursor riding on its dial cord. Drag along the glass or use the arrow keys.
const L = 8, R = 92; // scale span, % of glass width
const X = (mhz) => L + (mhz - 88) / 20 * (R - L);
const TICKS = Array.from({ length: 41 }, (_, i) => {
  const f = 88 + i * 0.5, major = i % 4 === 0, mid = i % 2 === 0;
  return `<i class="${major ? 'M' : mid ? 'm' : ''}" style="left:${X(f).toFixed(3)}%"></i>`;
}).join('');
const NUMS = Array.from({ length: 11 }, (_, i) => `<span style="left:${X(88 + i * 2).toFixed(3)}%">${88 + i * 2}</span>`).join('');

export default {
  id: 'ph-radio-tuner',
  credit: 'Vintage valve-radio FM tuning scale — amber backlit glass, 88–108 MHz, red cursor you drag across the band',
  size: 'wide',
  css: `
    :host { display: block; }
    .stage { padding: 14px 16px; border-radius: 12px;
      background: linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,0) 40%), repeating-linear-gradient(95deg, rgba(0,0,0,.08) 0 2px, transparent 2px 8px), linear-gradient(160deg, #5e341c, #3d1f0f);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.18); }
    .bezel { padding: 3px; border-radius: 7px; background: linear-gradient(#f5f6f7, #9aa0a6 50%, #e8eaec); box-shadow: 0 1px 2px rgba(0,0,0,.6); }
    .glass {
      position: relative; height: 78px; border-radius: 5px; overflow: hidden; cursor: ew-resize; touch-action: none; outline: none;
      background: radial-gradient(ellipse 70% 120% at 50% 110%, #ffcf73, #f0a43a 45%, #b8661a 80%, #7a3c0c 100%);
      box-shadow: inset 0 3px 8px rgba(60,20,0,.6), inset 0 0 0 1px rgba(60,25,0,.5);
    }
    .glass::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(170deg, rgba(255,255,255,.32), rgba(255,255,255,0) 38%, rgba(255,255,255,0) 80%, rgba(255,255,255,.08)); }
    .glass:focus-visible { box-shadow: inset 0 3px 8px rgba(60,20,0,.6), inset 0 0 0 1px rgba(60,25,0,.5), 0 0 0 3px #ffd27a; }
    .band { position: absolute; left: 6px; top: 30px; font: 700 10px/1 Georgia, "Times New Roman", serif; color: #2a1200; letter-spacing: .5px; }
    .unit { position: absolute; right: 6px; top: 31px; font: italic 600 8.5px/1 Georgia, "Times New Roman", serif; color: #2a1200; }
    .nums { position: absolute; left: 0; right: 0; top: 16px; height: 14px; font: 700 11.5px/1 Georgia, "Times New Roman", serif; color: #2a1200; }
    .nums span { position: absolute; transform: translateX(-50%); }
    .ticks { position: absolute; left: 0; right: 0; top: 34px; height: 14px; }
    .ticks i { position: absolute; top: 4px; width: 1px; height: 5px; margin-left: -.5px; background: #2a1200; }
    .ticks i.m { top: 2px; height: 8px; }
    .ticks i.M { top: 0; height: 12px; width: 1.5px; margin-left: -.75px; }
    .rail { position: absolute; left: ${L}%; right: ${100 - R}%; top: 50px; height: 1px; background: rgba(42,18,0,.75); }
    .cord { position: absolute; left: 0; right: 0; bottom: 9px; height: 1px; background: rgba(40,15,0,.35); }
    .needle { position: absolute; top: 5px; bottom: 6px; width: 2px; margin-left: -1px; left: 50%; pointer-events: none;
      background: linear-gradient(#ff5145, #d0120c); box-shadow: 0 0 3px rgba(255,40,30,.6), 1px 0 1px rgba(0,0,0,.35); }
    .needle::after { content: ''; position: absolute; left: -3px; bottom: -2px; width: 8px; height: 5px; border-radius: 1px; background: linear-gradient(#e8e8e8, #8a8a8a); box-shadow: 0 1px 1px rgba(0,0,0,.5); }
  `,
  html: `
    <div class="stage">
      <div class="bezel">
        <div class="glass" role="slider" tabindex="0" aria-label="Tuning" aria-valuemin="88" aria-valuemax="108" aria-valuenow="96" aria-valuetext="96.0 MHz">
          <span class="band" aria-hidden="true">FM</span><span class="unit" aria-hidden="true">MHz</span>
          <div class="nums" aria-hidden="true">${NUMS}</div>
          <div class="ticks" aria-hidden="true">${TICKS}</div>
          <div class="rail"></div><div class="cord"></div>
          <div class="needle"></div>
        </div>
      </div>
    </div>`,
  init(root) {
    const glass = root.querySelector('.glass'), needle = root.querySelector('.needle');
    let mhz = 96, dragging = false, raf = 0;
    const render = () => { needle.style.left = `${X(mhz).toFixed(3)}%`; glass.setAttribute('aria-valuenow', mhz.toFixed(1)); glass.setAttribute('aria-valuetext', `${mhz.toFixed(1)} MHz`); };
    const setFrom = (e) => { const r = glass.getBoundingClientRect(); const p = ((e.clientX - r.left) / r.width * 100 - L) / (R - L); mhz = Math.round((88 + Math.max(0, Math.min(1, p)) * 20) * 10) / 10; };
    glass.addEventListener('pointerdown', (e) => { dragging = true; glass.setPointerCapture(e.pointerId); setFrom(e); render(); });
    glass.addEventListener('pointermove', (e) => { if (!dragging) return; setFrom(e); if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); }); });
    const end = () => { dragging = false; };
    glass.addEventListener('pointerup', end); glass.addEventListener('pointercancel', end);
    glass.addEventListener('keydown', (e) => {
      const s = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 0.1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -0.1 : e.key === 'PageUp' ? 1 : e.key === 'PageDown' ? -1 : 0;
      if (!s) return; e.preventDefault(); mhz = Math.round(Math.max(88, Math.min(108, mhz + s)) * 10) / 10; render();
    });
    render();
    return () => { if (raf) cancelAnimationFrame(raf); };
  },
};
