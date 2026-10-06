const NUMS = Array.from({ length: 8 }, (_, i) => {
  const a = i * 45 * Math.PI / 180;
  return `<text x="${(60 + 40 * Math.sin(a)).toFixed(1)}" y="${(60 - 40 * Math.cos(a) + 3.5).toFixed(1)}" transform="rotate(${i * 45} ${(60 + 40 * Math.sin(a)).toFixed(1)} ${(60 - 40 * Math.cos(a)).toFixed(1)})">${i * 5}</text>`;
}).join('');

export default {
  id: 'ph-combo-lock',
  credit: 'Master Lock combination dial — 40 clicks, drag to spin, numbers under the fixed arrow',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 16px 20px; border-radius: 12px; background: linear-gradient(#d9d9d6, #bcbcb8); }
    .body { position: relative; width: 136px; height: 136px; border-radius: 50%; background: radial-gradient(circle at 40% 30%, #f2f2f2, #b9babd 60%, #7d7f83 100%); box-shadow: 0 6px 10px rgba(0,0,0,.4), inset 0 1px 0 #fff; }
    .arrow { position: absolute; left: 50%; top: 4px; width: 0; height: 0; margin-left: -6px; border: 6px solid transparent; border-top: 9px solid #e8141c; border-bottom: 0; z-index: 2; filter: drop-shadow(0 1px 1px rgba(0,0,0,.4)); }
    .dial {
      position: absolute; left: 50%; top: 50%; width: 120px; height: 120px; margin: -60px; border-radius: 50%; cursor: grab; touch-action: none;
      background: radial-gradient(circle at 50% 50%, #0e0e10 0 22%, #2a2a2d 23%, #0f0f11 26%, #17171a 100%);
      box-shadow: 0 4px 8px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.15); transform: rotate(0deg); transition: transform .05s linear;
    }
    .dial.drag { transition: none; cursor: grabbing; }
    .dial::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: repeating-conic-gradient(#f4f4f4 0 .8deg, transparent .8deg 9deg); -webkit-mask: radial-gradient(circle, transparent 0 44%, #000 45%, #000 50%, transparent 51%); mask: radial-gradient(circle, transparent 0 44%, #000 45%, #000 50%, transparent 51%); }
    .dial::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: repeating-conic-gradient(#f4f4f4 0 1.6deg, transparent 1.6deg 45deg); -webkit-mask: radial-gradient(circle, transparent 0 44%, #000 45%, #000 54%, transparent 55%); mask: radial-gradient(circle, transparent 0 44%, #000 45%, #000 54%, transparent 55%); }
    svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
    svg text { font: 700 11px system-ui, -apple-system, sans-serif; fill: #f4f4f4; text-anchor: middle; }
    .hub { position: absolute; left: 50%; top: 50%; width: 30px; height: 30px; margin: -15px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #dcdcdc, #8a8a8e 60%, #4a4a4e); box-shadow: 0 1px 2px rgba(0,0,0,.8), inset 0 1px 0 #fff; pointer-events: none; }
    .dial:focus-visible { outline: 2px solid #1a73e8; outline-offset: 4px; }
  `,
  html: `
    <div class="stage">
      <div class="body">
        <span class="arrow"></span>
        <div class="dial" role="slider" tabindex="0" aria-label="combination dial" aria-valuemin="0" aria-valuemax="39" aria-valuenow="0"><svg viewBox="0 0 120 120" aria-hidden="true">${NUMS}</svg></div>
        <span class="hub"></span>
      </div>
    </div>`,
  init(root) {
    const dial = root.querySelector('.dial');
    let ang = 0, raw = 0, last = 0, dragging = false, raf = 0;
    const angleAt = (e) => { const r = dial.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    const render = () => { ang = Math.round(raw / 9) * 9; dial.style.transform = `rotate(${ang}deg)`; dial.setAttribute('aria-valuenow', ((40 - Math.round(ang / 9) % 40) % 40 + 40) % 40); };
    dial.addEventListener('pointerdown', (e) => { dragging = true; last = angleAt(e); dial.setPointerCapture(e.pointerId); dial.classList.add('drag'); });
    dial.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a; raw += d;
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    const end = () => {
      if (!dragging) return;
      dragging = false; dial.classList.remove('drag');
      // render the latest raw angle synchronously (the pending frame would otherwise be lost), then snap to the detent
      if (raf) cancelAnimationFrame(raf); raf = 0;
      render(); raw = ang;
    };
    dial.addEventListener('pointerup', end); dial.addEventListener('pointercancel', end);
    dial.addEventListener('keydown', (e) => {
      const s = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 9 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -9 : 0;
      if (!s) return; e.preventDefault(); raw = ang + s; render();
    });
  },
};
