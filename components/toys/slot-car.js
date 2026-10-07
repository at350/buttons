const LANE = 'M64 22 H146 A44 44 0 0 1 146 110 H64 A44 44 0 0 1 64 22 Z';
const LEN = 2 * 82 + 2 * Math.PI * 44;
const ring = (r) => `M64 ${66 - r} H146 A${r} ${r} 0 0 1 146 ${66 + r} H64 A${r} ${r} 0 0 1 64 ${66 - r} Z`;

export default {
  id: 'ty2-slot-car',
  credit: 'Scalextric-style slot car set — press and hold the hand controller\'s plunger to squeeze the throttle (drag toward the grip for fine control); take the bends too hot and it deslots',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 300px; height: 150px; border-radius: 12px; overflow: hidden; background: radial-gradient(circle at 30% 40%, #4f9a45, #2f6b2a 80%); }
    svg.track { position: absolute; left: 6px; top: 8px; width: 210px; height: 132px; }
    .car { position: absolute; left: 6px; top: 8px; width: 26px; height: 13px; offset-path: path('${LANE}'); offset-distance: 0; offset-rotate: auto; pointer-events: none; }
    .car svg { display: block; width: 26px; height: 13px; filter: drop-shadow(0 1.5px 1px rgba(0,0,0,.55)); }
    .ctl { position: absolute; right: 12px; top: 14px; width: 66px; height: 124px; }
    .ctl svg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
    /* the plunger: its right third sits inside the grip; squeezing pushes it further in */
    .trig { position: absolute; left: 2px; top: 30px; width: 32px; height: 40px; z-index: 0; border-radius: 9px 3px 3px 9px; cursor: pointer; touch-action: none;
      background: linear-gradient(90deg, #a5141a, #e3262d 45%, #ff6159 70%, #c2181e); box-shadow: 0 3px 4px rgba(0,0,0,.4); transition: transform .25s cubic-bezier(.3,1.6,.5,1); }
    .trig::after { content: ''; position: absolute; left: 6px; top: 6px; width: 3px; height: 28px; border-radius: 2px; background: rgba(255,255,255,.35); }
    .trig.drag { transition: none; }
    .led { position: absolute; left: 44px; top: 16px; z-index: 2; width: 8px; height: 8px; border-radius: 50%; background: #3a1a00; box-shadow: inset 0 1px 1px rgba(0,0,0,.6); }
  `,
  html: `
    <div class="stage">
      <svg class="track" viewBox="0 0 210 132" aria-hidden="true">
        <!-- two-lane plastic track: kerbs, tarmac, white edge lines, slots with steel braids -->
        <path d="${ring(54)}" fill="none" stroke="#e3262d" stroke-width="5"/>
        <path d="${ring(54)}" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="5 5"/>
        <path d="${ring(37)}" fill="none" stroke="#3a3b40" stroke-width="32"/>
        <path d="${ring(51.5)}" fill="none" stroke="#e8e8e8" stroke-width=".9"/><path d="${ring(22.5)}" fill="none" stroke="#e8e8e8" stroke-width=".9"/>
        <path d="${ring(37)}" fill="none" stroke="#2c2d31" stroke-width=".6" stroke-dasharray="1 12"/>
        <path d="${LANE}" fill="none" stroke="#b9bec4" stroke-width="5"/><path d="${LANE}" fill="none" stroke="#0b0b0c" stroke-width="1.8"/>
        <path d="${ring(30)}" fill="none" stroke="#b9bec4" stroke-width="5"/><path d="${ring(30)}" fill="none" stroke="#0b0b0c" stroke-width="1.8"/>
        <!-- start/finish -->
        <path d="M100 13v14M100 35v14" stroke="#fff" stroke-width="4" stroke-dasharray="2 2"/><path d="M102 13v14M102 35v14" stroke="#111" stroke-width="2" stroke-dasharray="2 2" stroke-dashoffset="2"/>
      </svg>
      <div class="car"><svg viewBox="0 0 26 13" aria-hidden="true">
        <defs><linearGradient id="scb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a62"/><stop offset=".5" stop-color="#e3262d"/><stop offset="1" stop-color="#9e1218"/></linearGradient></defs>
        <rect x="4" y=".2" width="5" height="2.4" rx=".8" fill="#141414"/><rect x="4" y="10.4" width="5" height="2.4" rx=".8" fill="#141414"/>
        <rect x="17.5" y=".4" width="4.6" height="2.2" rx=".8" fill="#141414"/><rect x="17.5" y="10.4" width="4.6" height="2.2" rx=".8" fill="#141414"/>
        <path d="M2 3.6Q2 2 4 2h15c3 .3 5.2 1.6 6.4 3.6v1.8C24.2 9.4 22 10.7 19 11H4c-1.4 0-2-.7-2-1.6z" fill="url(#scb)"/>
        <rect x=".6" y="1.6" width="2" height="9.8" rx=".6" fill="#1b1b1b"/>
        <path d="M19 5.9h6.2M2.6 5.9h6M19 7.1h6.2M2.6 7.1h6" stroke="#fff" stroke-width=".7"/>
        <path d="M10.2 3.4h5.6c2 0 3 1.3 3.2 3.1-.2 1.8-1.2 3.1-3.2 3.1h-5.6c-.7 0-1.1-.4-1.1-1.1V4.5c0-.7.4-1.1 1.1-1.1z" fill="#18202c"/>
        <path d="M15.8 4.2c1.3.2 2 .9 2.3 1.6" stroke="#8fb4dc" stroke-width=".6" fill="none" stroke-linecap="round"/>
        <circle cx="22" cy="6.5" r="0" fill="#fff"/>
      </svg></div>
      <div class="ctl">
        <svg viewBox="0 0 66 124" aria-hidden="true">
          <defs><linearGradient id="scg" x1="0" x2="1"><stop offset="0" stop-color="#3a3e48"/><stop offset=".45" stop-color="#262930"/><stop offset="1" stop-color="#121418"/></linearGradient></defs>
          <path d="M44 122c0 6 6 10 14 8" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round"/>
          <path d="M30 22c0-7 6-12 14-12h9c7 0 11 5 11 12v38c0 9-3 18-5 30l-4 24c-1 5-5 8-10 8h-3c-5 0-8-4-7-9l4-33c1-6-2-8-9-8z" fill="url(#scg)"/>
          <path d="M34 20c0-4 4-6 9-6h8" fill="none" stroke="#5a606c" stroke-width="1.5" stroke-linecap="round"/>
          <rect x="27" y="28" width="6" height="44" rx="2" fill="#0a0b0d"/>
          <path d="M41 84h14M40.5 90h13.5M40 96h13M39.5 102h12.5M39 108h12" stroke="#0e1013" stroke-width="2" stroke-linecap="round"/>
          <path d="M60 24v34" stroke="#4a4f5a" stroke-width="1.2" stroke-linecap="round"/>
        </svg>
        <span class="led"></span>
        <div class="trig" role="slider" tabindex="0" aria-label="throttle trigger" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div>
      </div>
    </div>`,
  init(root) {
    const car = root.querySelector('.car'), trig = root.querySelector('.trig'), led = root.querySelector('.led');
    let thr = 0, v = 0, pos = 0, raf = 0, sx = 0, drag = false, off = false, t = 0, key = false;
    const setT = (x) => { thr = Math.max(0, Math.min(1, x)); trig.style.transform = `translateX(${thr * 20}px)`; trig.setAttribute('aria-valuenow', Math.round(thr * 100));
      led.style.background = thr ? `rgb(${120 + thr * 135},${40 + thr * 60},0)` : ''; led.style.boxShadow = thr ? `0 0 ${thr * 8}px rgba(255,140,0,.9)` : ''; kick(); };
    const onCurve = (p) => (p > 82 && p < 82 + Math.PI * 44) || p > 164 + Math.PI * 44;
    const loop = () => {
      raf = 0; if (off) return;
      v += (thr * 4.2 - v) * (thr ? 0.05 : 0.08); if (v < 0.02 && !thr) v = 0;
      pos = (pos + v) % LEN; car.style.offsetDistance = pos + 'px';
      if (onCurve(pos) && v > 3.1) return deslot();
      if (v || thr) raf = requestAnimationFrame(loop);
    };
    const kick = () => { if (!raf && !off) raf = requestAnimationFrame(loop); };
    const deslot = () => {
      off = true; v = 0;
      car.animate([{ transform: 'none', opacity: 1 }, { transform: 'translate(10px,-22px) rotate(220deg)', opacity: 1, offset: .6 }, { transform: 'translate(14px,-28px) rotate(260deg)', opacity: 0 }], { duration: 700, easing: 'ease-out', fill: 'forwards' });
      t = setTimeout(() => { car.getAnimations().forEach((a) => a.cancel()); pos = 0; car.style.offsetDistance = '0px'; off = false; kick(); }, 1000);
    };
    // Squeeze: holding ramps the throttle in like a real plunger; dragging toward the grip adds fine control.
    const TRAVEL = 20, RAMP = 650, HOLD_MAX = 0.7; // a plain squeeze cruises safely; push harder (drag toward the grip) to risk the bends
    let t0 = 0, dragThr = 0, holdRaf = 0;
    const squeeze = () => { holdRaf = 0; if (!drag) return; const hold = Math.min(HOLD_MAX, (performance.now() - t0) / RAMP); setT(Math.max(hold, dragThr)); if (hold < HOLD_MAX) holdRaf = requestAnimationFrame(squeeze); };
    trig.addEventListener('pointerdown', (e) => { drag = true; dragThr = 0; sx = e.clientX; t0 = performance.now(); trig.setPointerCapture(e.pointerId); trig.classList.add('drag'); if (!holdRaf) holdRaf = requestAnimationFrame(squeeze); });
    trig.addEventListener('pointermove', (e) => { if (!drag) return; dragThr = Math.max(0, Math.min(1, (e.clientX - sx) / TRAVEL)); const hold = Math.min(HOLD_MAX, (performance.now() - t0) / RAMP); setT(Math.max(hold, dragThr)); });
    const up = () => { if (!drag) return; drag = false; cancelAnimationFrame(holdRaf); holdRaf = 0; trig.classList.remove('drag'); setT(0); };
    trig.addEventListener('pointerup', up); trig.addEventListener('pointercancel', up); trig.addEventListener('lostpointercapture', up);
    trig.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); key = true; setT(Math.min(1, thr + 0.15)); } });
    trig.addEventListener('keyup', () => { if (key) { key = false; setT(0); } });
    trig.addEventListener('blur', () => setT(0));
    return () => { cancelAnimationFrame(raf); cancelAnimationFrame(holdRaf); clearTimeout(t); };
  },
};
