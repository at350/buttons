// Hot Wheels track launcher: the red launcher block on its black base clamped to a length of orange
// track (light running surface, darker face, blue joiner), the track sweeps up a jump ramp on a blue
// riser. The car is a die-cast muscle car in Spectraflame blue with flames, chrome 5-spoke mags and
// red-line tyres. Hold the launch pedal to wind the spring (the power strip fills), let go and the car
// rips down the track and off the ramp.
export default {
  id: 'ty2-hot-wheels-launcher',
  credit: 'Hot Wheels orange track launcher — hold the launch pedal to wind the spring, let go and the car rips down the track off the jump ramp',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 300px; height: 150px; border-radius: 12px; overflow: hidden;
      background: linear-gradient(#e9f1f6 0 58%, #b88a5c 58%, #a87a4e 100%); }
    .stage::before { content: ''; position: absolute; left: 0; right: 0; top: 58%; bottom: 0; background: repeating-linear-gradient(90deg, transparent 0 58px, rgba(60,30,10,.25) 58px 59px); }
    .scene { position: absolute; inset: 0; width: 300px; height: 150px; }
    .box { position: absolute; left: 8px; top: 74px; width: 68px; height: 50px; border-radius: 8px 14px 4px 4px;
      background: linear-gradient(#ff5a4f, #e3262d 45%, #9e1218); box-shadow: 0 4px 6px rgba(0,0,0,.4), inset 0 2px 0 rgba(255,255,255,.35), inset -3px 0 0 rgba(0,0,0,.2); }
    .box::before { content: ''; position: absolute; left: -2px; right: -6px; bottom: -10px; height: 12px; border-radius: 3px; background: linear-gradient(#2b2b30, #0f0f12); }
    .box::after { content: ''; position: absolute; left: 8px; top: 30px; width: 34px; height: 12px;
      background: linear-gradient(90deg, #ffd23a, #ff8a00); clip-path: polygon(0 50%, 22% 0, 30% 40%, 50% 5%, 58% 45%, 80% 10%, 100% 55%, 70% 100%, 0 100%); opacity: .95; }
    .meter { position: absolute; left: 8px; top: 20px; width: 52px; height: 6px; border-radius: 3px; background: #2a0a0c; box-shadow: inset 0 1px 2px rgba(0,0,0,.7); overflow: hidden; }
    .meter i { display: block; height: 100%; width: 100%; transform-origin: 0 50%; transform: scaleX(0); background: linear-gradient(90deg, #f7c600, #fff36a); }
    .pedal { position: absolute; left: 14px; top: 62px; width: 44px; height: 16px; border: 0; padding: 0; border-radius: 6px 6px 3px 3px; cursor: pointer;
      background: linear-gradient(#4a4a52, #1d1d22); box-shadow: 0 5px 0 #0a0a0c, 0 6px 6px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.25);
      transform: translateY(-4px); transition: transform .08s, box-shadow .08s; touch-action: none; }
    .pedal::after { content: ''; position: absolute; left: 6px; right: 6px; top: 4px; height: 3px; border-radius: 2px; background: repeating-linear-gradient(90deg, #6a6a72 0 3px, transparent 3px 6px); }
    .pedal.down { transform: translateY(2px); box-shadow: 0 0 0 #0a0a0c, 0 1px 2px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.15); }
    .pedal:focus-visible { outline: 3px solid #1a5fb4; outline-offset: 2px; }
    .car { position: absolute; left: 66px; top: 81px; width: 64px; height: 24px; pointer-events: none; }
  `,
  html: `
    <div class="stage">
      <svg class="scene" viewBox="0 0 300 150" aria-hidden="true">
        <defs>
          <linearGradient id="hwf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8c2a"/><stop offset="1" stop-color="#c75400"/></linearGradient>
        </defs>
        <ellipse cx="160" cy="122" rx="110" ry="4" fill="#3a1d08" opacity=".25"/>
        <!-- straight: running surface with the centre guide, then the face -->
        <rect x="70" y="104" width="172" height="5" fill="#ffb35c"/><path d="M70 106.5h172" stroke="#e8761a" stroke-width="1"/>
        <rect x="70" y="109" width="172" height="9" fill="url(#hwf)"/><path d="M70 109h172" stroke="#ffd09a" stroke-width=".8"/>
        <!-- jump ramp -->
        <path d="M240 109C262 109 278 100 298 84" fill="none" stroke="url(#hwf)" stroke-width="10"/>
        <path d="M240 105C262 105 276 96 296 80" fill="none" stroke="#ffb35c" stroke-width="4"/>
        <!-- blue joiner and riser -->
        <rect x="234" y="106" width="12" height="13" rx="1.5" fill="#1e63c9"/><path d="M236 108h8M236 117h8" stroke="#6aa3f0" stroke-width="1"/>
        <rect x="280" y="92" width="9" height="46" rx="1.5" fill="#1e63c9"/><rect x="274" y="136" width="21" height="5" rx="2" fill="#174f9f"/><rect x="278" y="88" width="13" height="8" rx="2" fill="#2a74dc"/>
      </svg>
      <div class="box"><span class="meter"><i></i></span></div>
      <svg class="car" viewBox="0 0 64 24" aria-hidden="true">
        <defs>
          <linearGradient id="hwb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb8ff"/><stop offset=".35" stop-color="#1f6fe0"/><stop offset="1" stop-color="#0b3a8a"/></linearGradient>
          <radialGradient id="hwm" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#b9c0c8"/><stop offset="1" stop-color="#6c747d"/></radialGradient>
        </defs>
        <g transform="translate(64 0) scale(-1 1)">
        <path d="M2 16.5L3 12c.4-1.6 2-2.4 5-2.8L22 8c4-4.2 8-5 12-5h7c4 .2 7 2 10 5.3l7 1.2c2.6.5 4 1.6 4 3.6v3.6c0 .8-.6 1.3-1.4 1.3H56a6 6 0 0 0-12 0H20a6 6 0 0 0-12 0H3.3c-.8 0-1.3-.6-1.3-1.5z" fill="url(#hwb)"/>
        <path d="M24.5 8.2c3.4-3.4 6.4-4 9.6-4h7c3.2.2 5.4 1.5 7.6 4z" fill="#1b2a3c"/><path d="M38 4.3v3.9" stroke="#0b3a8a" stroke-width="1.4"/>
        <path d="M27 7.6c2-2 3.6-2.4 5.4-2.4" stroke="#9fc4ff" stroke-width="1" fill="none" opacity=".7" stroke-linecap="round"/>
        <path d="M3.5 13.5c5-1.8 9-1 13.5-.4-2.5.6-3.2 1.4-1.8 1.8 3-.8 6-.6 9 .2-2.4.4-3 1-1.6 1.4 2.6-.4 5-.2 7 .4H8.6A6 6 0 0 0 3.6 16z" fill="#ff8a00"/>
        <path d="M4.5 13.7c4-1.2 7-.8 10-.3" stroke="#ffd23a" stroke-width="1" fill="none"/>
        <path d="M5 10.4h4" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/><rect x="60" y="10" width="2.4" height="2.2" rx=".6" fill="#ff3030"/>
        <path d="M56 8.6l6-1.4v1.6l-5 1.2z" fill="#0b3a8a"/>
        <g><circle cx="14" cy="18" r="5.4" fill="#111"/><circle cx="14" cy="18" r="4.3" fill="none" stroke="#d81e1e" stroke-width=".6"/><circle cx="14" cy="18" r="3.3" fill="url(#hwm)"/>
          <path d="M14 15.2v5.6M11.3 17.1l5.4 1.8M11.3 18.9l5.4-1.8" stroke="#7a828b" stroke-width=".7"/><circle cx="14" cy="18" r=".9" fill="#5a6168"/></g>
        <g><circle cx="50" cy="18" r="5.6" fill="#111"/><circle cx="50" cy="18" r="4.5" fill="none" stroke="#d81e1e" stroke-width=".6"/><circle cx="50" cy="18" r="3.4" fill="url(#hwm)"/>
          <path d="M50 15.1v5.8M47.2 17.1l5.6 1.8M47.2 18.9l5.6-1.8" stroke="#7a828b" stroke-width=".7"/><circle cx="50" cy="18" r=".9" fill="#5a6168"/></g>
        </g>
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
      const p = Math.max(0.25, power), h = 24 + 50 * p, d = 900 - 450 * p;
      bar.style.transform = 'scaleX(0)'; car.style.transform = '';
      anim = car.animate([
        { transform: 'translate(0,0)', offset: 0 },
        { transform: 'translate(112px,0)', offset: 0.5 },
        { transform: 'translate(150px,-5px) rotate(-12deg)', offset: 0.62 },
        { transform: 'translate(176px,-18px) rotate(-28deg)', offset: 0.72 },
        { transform: `translate(232px,${-h}px) rotate(-14deg)`, opacity: 1, offset: 0.88 },
        { transform: `translate(290px,${-h + 22}px) rotate(10deg)`, opacity: 0 },
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
