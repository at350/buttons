export default {
  id: 'ty2-hot-wheels-launcher',
  credit: 'Hot Wheels orange track launcher — hold the launch pedal to wind the spring, let go and the car rips down the track off the jump ramp',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 300px; height: 150px; border-radius: 12px; overflow: hidden;
      background: linear-gradient(#bfe6ff 0 62%, #d9c3a0 62%); }
    .track { position: absolute; left: 70px; top: 108px; width: 170px; height: 12px; background: linear-gradient(#ff9a3c, #f47a20 40%, #c75400);
      box-shadow: 0 3px 3px rgba(0,0,0,.25); border-radius: 2px; }
    .track::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 3px; background: #ffc07a; }
    .ramp { position: absolute; left: 236px; top: 96px; width: 60px; height: 12px; background: linear-gradient(#ff9a3c, #f47a20 40%, #c75400);
      transform: rotate(-20deg); transform-origin: 0 100%; border-radius: 2px; }
    .riser { position: absolute; left: 268px; top: 100px; width: 10px; height: 42px; background: linear-gradient(90deg, #1a5fb4, #3b82e0); border-radius: 2px; }
    .box { position: absolute; left: 10px; top: 78px; width: 66px; height: 54px; border-radius: 10px 10px 6px 6px;
      background: linear-gradient(#2b2b33, #121216); box-shadow: 0 4px 6px rgba(0,0,0,.4), inset 0 2px 0 rgba(255,255,255,.15); }
    .box::before { content: ''; position: absolute; left: 6px; top: 8px; width: 54px; height: 8px; border-radius: 4px; background: #e3262d; }
    .meter { position: absolute; left: 8px; top: 22px; width: 50px; height: 6px; border-radius: 3px; background: #333; overflow: hidden; }
    .meter i { display: block; height: 100%; width: 100%; transform-origin: 0 50%; transform: scaleX(0); background: linear-gradient(90deg, #f7c600, #e3262d); }
    .pedal { position: absolute; left: 16px; top: 112px; width: 54px; height: 26px; border: 0; padding: 0; border-radius: 8px; cursor: pointer;
      background: linear-gradient(#ff5a4f, #e3262d 50%, #a5141a); box-shadow: 0 5px 0 #6f0a0e, 0 6px 6px rgba(0,0,0,.4);
      transform: translateY(-4px); transition: transform .08s, box-shadow .08s; touch-action: none; }
    .pedal.down { transform: translateY(1px); box-shadow: 0 0 0 #6f0a0e, 0 1px 2px rgba(0,0,0,.4); }
    .pedal:focus-visible { outline: 3px solid #1a5fb4; outline-offset: 2px; }
    .car { position: absolute; left: 66px; top: 86px; width: 52px; height: 23.6px; pointer-events: none; }
  `,
  html: `
    <div class="stage">
      <div class="track"></div><div class="riser"></div><div class="ramp"></div>
      <div class="box"><span class="meter"><i></i></span></div>
      <svg class="car" viewBox="0 0 44 20" aria-hidden="true">
        <path d="M2 14 L4 9 L14 7 L20 2 L31 2 L36 7 L42 9 L43 14 Z" fill="#1a5fb4"/>
        <path d="M5 10 L14 8 L38 8 L41 10 Z" fill="#7fb2f0" opacity=".6"/>
        <path d="M21 3.5 L30 3.5 L33.5 7 L17 7 Z" fill="#cfe6ff"/>
        <path d="M6 12 L14 11 L10 13 Z M20 12 L28 11 L24 13 Z" fill="#f7c600"/>
        <circle cx="11" cy="15" r="4.2" fill="#111"/><circle cx="11" cy="15" r="2" fill="#c8c8c8"/>
        <circle cx="34" cy="15" r="4.2" fill="#111"/><circle cx="34" cy="15" r="2" fill="#c8c8c8"/>
      </svg>
      <button class="pedal" type="button" aria-label="launch"></button>
    </div>`,
  init(root) {
    const pedal = root.querySelector('.pedal'), car = root.querySelector('.car'), bar = root.querySelector('.meter i');
    let charging = false, power = 0, start = 0, raf = 0, anim = null, t = 0;
    const tick = () => { power = Math.min(1, (performance.now() - start) / 900); bar.style.transform = `scaleX(${power})`; car.style.transform = `translateX(${-4 * power}px)`; if (charging) raf = requestAnimationFrame(tick); };
    const press = () => { if (charging || anim) return; charging = true; start = performance.now(); pedal.classList.add('down'); raf = requestAnimationFrame(tick); };
    const launch = () => {
      if (!charging) return; charging = false; cancelAnimationFrame(raf); pedal.classList.remove('down');
      const p = Math.max(0.25, power), h = 20 + 60 * p, d = 900 - 450 * p;
      bar.style.transform = 'scaleX(0)'; car.style.transform = '';
      anim = car.animate([
        { transform: 'translate(0,0)', offset: 0 },
        { transform: 'translate(166px,0)', offset: 0.55 },
        { transform: 'translate(200px,-12px) rotate(-20deg)', offset: 0.7 },
        { transform: `translate(260px,${-h}px) rotate(-8deg)`, opacity: 1, offset: 0.88 },
        { transform: `translate(320px,${-h + 30}px) rotate(14deg)`, opacity: 0 },
      ], { duration: d, easing: 'cubic-bezier(.3,0,.6,1)', fill: 'forwards' });
      t = setTimeout(() => { anim.cancel(); anim = null; car.animate([{ opacity: 0, transform: 'translateX(-30px)' }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'ease-out' }); }, d + 350);
    };
    pedal.addEventListener('pointerdown', (e) => { pedal.setPointerCapture(e.pointerId); press(); });
    pedal.addEventListener('pointerup', launch); pedal.addEventListener('pointercancel', launch); pedal.addEventListener('lostpointercapture', launch);
    pedal.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); press(); } });
    pedal.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') launch(); });
    pedal.addEventListener('blur', launch);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); if (anim) anim.cancel(); };
  },
};
