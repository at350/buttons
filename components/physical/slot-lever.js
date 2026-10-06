export default {
  id: 'ph-slot-lever',
  credit: 'One-armed bandit — chrome slot-machine lever with a ball grip; pull down, it springs back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px 18px 12px; border-radius: 12px; background: linear-gradient(#7a1a1a, #4a0d0d); box-shadow: inset 0 1px 0 rgba(255,255,255,.15); }
    .wrap { position: relative; width: 110px; height: 150px; }
    .mount { position: absolute; left: 0; top: 96px; width: 44px; height: 54px; border-radius: 6px; background: linear-gradient(90deg, #6f7378, #d9dcdf 35%, #9a9ea3 60%, #5b5f64); box-shadow: 0 3px 5px rgba(0,0,0,.6), inset 0 1px 0 #fff; }
    .pivot { position: absolute; left: 10px; top: 110px; width: 24px; height: 24px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #fff, #a9acb0 55%, #4a4d51); box-shadow: 0 2px 3px rgba(0,0,0,.7); z-index: 3; }
    .arm {
      position: absolute; left: 18px; top: 12px; width: 8px; height: 110px; border-radius: 4px; cursor: grab; touch-action: none;
      background: linear-gradient(90deg, #4f5358, #e9ebed 40%, #b4b7bb 60%, #43474b); box-shadow: 2px 2px 4px rgba(0,0,0,.5);
      transform-origin: 4px 110px; transform: rotate(0deg); transition: transform .55s cubic-bezier(.2,1.6,.4,1); z-index: 2;
    }
    .arm.drag { transition: none; cursor: grabbing; }
    .arm::before { content: ''; position: absolute; left: 50%; top: -22px; width: 38px; height: 38px; margin-left: -19px; border-radius: 50%; background: radial-gradient(circle at 36% 30%, #ff9a95, #e4211c 40%, #7f0a07 90%); box-shadow: 0 4px 6px rgba(0,0,0,.6), inset 0 -3px 5px rgba(0,0,0,.3), inset 0 2px 2px rgba(255,255,255,.4); }
    .arm::after { content: ''; position: absolute; left: 50%; top: -12px; width: 10px; height: 6px; margin-left: -5px; border-radius: 50%; background: rgba(255,255,255,.55); filter: blur(1px); }
    .arm:focus-visible { outline: 2px solid #ffd27a; outline-offset: 4px; }
  `,
  html: `
    <div class="stage">
      <div class="wrap">
        <div class="mount"></div>
        <div class="arm" role="slider" tabindex="0" aria-label="slot lever" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div>
        <div class="pivot"></div>
      </div>
    </div>`,
  init(root) {
    const arm = root.querySelector('.arm');
    const MAX = 78;
    let ang = 0, startY = 0, startA = 0, dragging = false, raf = 0;
    const render = () => { arm.style.transform = `rotate(${ang}deg)`; arm.setAttribute('aria-valuenow', Math.round(ang / MAX * 100)); };
    arm.addEventListener('pointerdown', (e) => { dragging = true; startY = e.clientY; startA = ang; arm.setPointerCapture(e.pointerId); arm.classList.add('drag'); });
    arm.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      ang = Math.max(0, Math.min(MAX, startA + (e.clientY - startY) / 1.4));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    // springs the lever back and clears pointer + keyboard pull state
    const reset = () => { dragging = false; arm.classList.remove('drag'); if (raf) cancelAnimationFrame(raf); raf = 0; ang = 0; render(); };
    const release = () => { if (!dragging) return; reset(); };
    arm.addEventListener('pointerup', release); arm.addEventListener('pointercancel', release); arm.addEventListener('lostpointercapture', release);
    arm.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowDown') { e.preventDefault(); arm.classList.add('drag'); ang = MAX; render(); }
    });
    arm.addEventListener('keyup', reset);
    // focus leaving mid-pull (Tab, window blur) must not leave the lever stuck down
    arm.addEventListener('blur', reset);
  },
};
