const LANE = 'M64 22 H146 A44 44 0 0 1 146 110 H64 A44 44 0 0 1 64 22 Z';
const LEN = 2 * 82 + 2 * Math.PI * 44;

export default {
  id: 'ty2-slot-car',
  credit: 'Scalextric-style slot car set — press and hold the hand controller\'s plunger to squeeze the throttle (drag toward the grip for fine control); take the bends too hot and it deslots',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 300px; height: 150px; border-radius: 12px; overflow: hidden; background: radial-gradient(circle at 30% 40%, #4f9a45, #2f6b2a 80%); }
    svg.track { position: absolute; left: 6px; top: 8px; width: 210px; height: 132px; }
    .car { position: absolute; left: 6px; top: 8px; width: 26px; height: 13px; offset-path: path('${LANE}'); offset-distance: 0; offset-rotate: auto; pointer-events: none; }
    .car::before { content: ''; position: absolute; inset: 0; border-radius: 6px 4px 4px 6px; background: linear-gradient(#ff6159, #e3262d 60%, #a5141a); box-shadow: 0 2px 2px rgba(0,0,0,.5); }
    .car::after { content: ''; position: absolute; left: 9px; top: 3px; width: 8px; height: 7px; border-radius: 2px; background: #1b1b1b; box-shadow: 9px 2px 0 -2px #f7c600; }
    .ctl { position: absolute; right: 12px; top: 14px; width: 66px; height: 124px; }
    .ctl svg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }
    /* the plunger: its right third sits inside the grip; squeezing pushes it further in */
    .trig { position: absolute; left: 2px; top: 30px; width: 32px; height: 40px; z-index: 0; border-radius: 9px 3px 3px 9px; cursor: pointer; touch-action: none;
      background: linear-gradient(90deg, #a5141a, #e3262d 45%, #ff6159 70%, #c2181e); box-shadow: 0 3px 4px rgba(0,0,0,.4); transition: transform .25s cubic-bezier(.3,1.6,.5,1); }
    .trig::after { content: ''; position: absolute; left: 6px; top: 6px; width: 3px; height: 28px; border-radius: 2px; background: rgba(255,255,255,.35); }
    .trig.drag { transition: none; }
    .led { position: absolute; left: 38px; top: 8px; width: 8px; height: 8px; border-radius: 50%; background: #3a1a00; box-shadow: inset 0 1px 1px rgba(0,0,0,.6); }
  `,
  html: `
    <div class="stage">
      <svg class="track" viewBox="0 0 210 132" aria-hidden="true">
        <path d="${LANE}" fill="none" stroke="#2a2a2e" stroke-width="30"/>
        <path d="${LANE}" fill="none" stroke="#fff" stroke-width="32" stroke-dasharray="6 6" opacity=".9" style="mix-blend-mode:normal" transform="translate(0 0)" class="kerb"/>
        <path d="${LANE}" fill="none" stroke="#38383d" stroke-width="26"/>
        <path d="${LANE}" fill="none" stroke="#111" stroke-width="2"/>
        <path d="M100 8 V36" stroke="#fff" stroke-width="3" stroke-dasharray="3 3"/>
      </svg>
      <div class="car"></div>
      <div class="ctl">
        <svg viewBox="0 0 66 124" aria-hidden="true">
          <path d="M22 10 H56 a8 8 0 0 1 8 8 V30 L48 116 a8 8 0 0 1 -8 6 H28 a6 6 0 0 1 -6 -7 L32 34 H22 Z" fill="#2a2d35"/>
          <path d="M26 14 H54 V26 H26 Z" fill="#3c414d"/><path d="M22 28 h12 v44 h-12 z" fill="#101217"/><path d="M38 40 L30 112" stroke="#14161b" stroke-width="2"/>
          <path d="M62 118 q10 4 4 -6" fill="none" stroke="#14161b" stroke-width="3"/>
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
