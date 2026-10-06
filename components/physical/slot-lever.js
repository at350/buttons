// One-armed bandit lever seen from the side of the cabinet: chrome rod on a chromed pivot boss,
// red ball grip. Pull it down (drag, click, or Space) — it swings forward to the stop and the return
// spring throws it back past upright before settling. The whole swing (−15° … 80°) is reserved
// inside the stage, so the ball never leaves it.
const PX = 50, PY = 128, LEN = 104; // pivot and rod length (px)

export default {
  id: 'ph-slot-lever',
  credit: 'One-armed bandit — chrome slot-machine lever with a red ball grip; pull it down, it springs back past upright',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 12px 14px 12px 0; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 70% 20%, #4a1418, #23070a 80%); }
    .wrap { position: relative; width: 186px; height: 156px; }
    .cab { position: absolute; left: 0; top: -12px; bottom: -12px; width: 26px;
      background: linear-gradient(90deg, #7c0d12, #c81d24 55%, #9b1218); box-shadow: inset -3px 0 0 #e9ecef, inset -5px 0 0 #8c9298, 3px 0 6px rgba(0,0,0,.5); }
    .boss { position: absolute; left: ${PX - 30}px; top: ${PY - 22}px; width: 44px; height: 44px; border-radius: 6px 50% 50% 6px;
      background: linear-gradient(180deg, #f2f4f6, #9aa0a6 45%, #d9dcdf 60%, #6c7177); box-shadow: 2px 3px 5px rgba(0,0,0,.6); }
    .arm {
      position: absolute; left: ${PX - 5}px; top: ${PY - LEN}px; width: 10px; height: ${LEN}px; border-radius: 5px; cursor: grab; touch-action: none; outline: none;
      background: linear-gradient(90deg, #5a5f65, #f4f6f7 35%, #c3c7cb 55%, #4c5056); box-shadow: 2px 2px 3px rgba(0,0,0,.45);
      transform-origin: 5px ${LEN}px; transform: rotate(0deg); transition: transform .7s cubic-bezier(.25,1.9,.45,1);
    }
    .arm.drag { transition: none; cursor: grabbing; }
    .arm.pull { transition: transform .22s cubic-bezier(.5,0,.8,.6); }
    .ball { position: absolute; left: 50%; top: -17px; width: 38px; height: 38px; margin-left: -19px; border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle at 36% 30%, #ffd0cc 0, #ff6a5e 14%, #e01d16 42%, #9d0b07 78%, #5c0503 100%);
      box-shadow: 2px 5px 6px rgba(0,0,0,.55), inset -2px -3px 5px rgba(60,0,0,.4); }
    .arm:focus-visible .ball { box-shadow: 0 0 0 3px #ffd27a, 2px 5px 6px rgba(0,0,0,.55); }
    .hub { position: absolute; left: ${PX - 11}px; top: ${PY - 11}px; width: 22px; height: 22px; border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle at 38% 32%, #ffffff, #b4b9be 50%, #565b61); box-shadow: 0 2px 3px rgba(0,0,0,.7); }
  `,
  html: `
    <div class="stage">
      <div class="wrap">
        <div class="cab"></div>
        <div class="boss"></div>
        <div class="arm" role="slider" tabindex="0" aria-label="Slot machine lever" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="ball"></span></div>
        <div class="hub"></div>
      </div>
    </div>`,
  init(root) {
    const arm = root.querySelector('.arm');
    const MAX = 80;
    let ang = 0, startY = 0, startA = 0, dragging = false, moved = 0, raf = 0, t = 0;
    const render = () => { arm.style.transform = `rotate(${ang}deg)`; arm.setAttribute('aria-valuenow', Math.round(ang / MAX * 100)); };
    const springBack = () => { arm.classList.remove('drag', 'pull'); if (raf) cancelAnimationFrame(raf); raf = 0; ang = 0; render(); };
    const fullPull = () => { clearTimeout(t); arm.classList.remove('drag'); arm.classList.add('pull'); ang = MAX; render(); t = setTimeout(springBack, 260); };
    arm.addEventListener('pointerdown', (e) => { clearTimeout(t); dragging = true; moved = 0; startY = e.clientY; startA = ang; arm.setPointerCapture(e.pointerId); arm.classList.add('drag'); });
    arm.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      moved = Math.max(moved, Math.abs(e.clientY - startY));
      ang = Math.max(0, Math.min(MAX, startA + (e.clientY - startY) / 1.3));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    const release = (e) => { if (!dragging) return; dragging = false; if (e.type === 'pointerup' && moved < 4) fullPull(); else springBack(); };
    arm.addEventListener('pointerup', release); arm.addEventListener('pointercancel', release);
    arm.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowDown') { e.preventDefault(); if (!e.repeat) fullPull(); } });
    return () => { clearTimeout(t); if (raf) cancelAnimationFrame(raf); };
  },
};
