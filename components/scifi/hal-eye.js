// 2001: A Space Odyssey — HAL 9000's lens. Hover and the eye follows you; click and Dave starts pulling memory modules.
export default {
  id: 'sf-hal-eye',
  credit: '2001: A Space Odyssey (1968) — HAL 9000 console: nameplate and the red fisheye lens that watches the pointer; click to disconnect him, click again to bring him back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 170px; height: 250px; max-width: 100%; border-radius: 12px; overflow: hidden; background: #0b0c0d; display: grid; place-items: center; padding: 14px; }
    .panel { width: 132px; height: 222px; border-radius: 3px; padding: 10px 12px; background: linear-gradient(90deg, #8d9296, #d9dde0 18%, #b5babd 50%, #e6e9eb 82%, #8d9296);
      display: grid; grid-template-rows: auto 1fr; justify-items: center; box-shadow: 0 6px 18px #000; }
    .plate { display: flex; height: 18px; font: 500 12px/18px Futura, 'Century Gothic', 'Space Grotesk', sans-serif; letter-spacing: .08em; color: #fff; box-shadow: 0 0 0 1px #000; }
    .plate b { font-weight: 500; background: #000; padding: 0 5px; } .plate span { background: #1f4fa6; padding: 0 5px; }
    .face { width: 108px; margin-top: 8px; border-radius: 2px; background: #050505; display: grid; place-items: center; box-shadow: inset 0 0 0 1px #000; }
    .eye { position: relative; width: 92px; height: 92px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: conic-gradient(from 30deg, #8a8f93, #f2f4f5, #7c8185, #e4e7e9, #6f7478, #f2f4f5, #8a8f93); box-shadow: 0 0 0 2px #000; }
    .lens { position: absolute; inset: 9px; border-radius: 50%; overflow: hidden; background: #000; box-shadow: inset 0 0 0 3px #111, inset 0 0 0 5px #2a2a2a; transition: filter 3.2s cubic-bezier(.6,0,.9,1); }
    .glow { position: absolute; inset: -14%; border-radius: 50%; transform: translate(var(--dx, 0px), var(--dy, 0px)); transition: transform .3s cubic-bezier(.2,.8,.3,1);
      background: radial-gradient(circle, #fffbe0 0 2.2%, #ffd84a 4.5%, #ff3a00 11%, #c00000 23%, #500000 38%, #1a0000 52%, #000 62%); }
    .lens::after { content: ''; position: absolute; left: 14%; top: 10%; width: 46%; height: 24%; border-radius: 50%; transform: rotate(-24deg);
      background: radial-gradient(ellipse, rgba(255,255,255,.28), rgba(255,255,255,0) 70%); }
    .lens::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle, transparent 60%, rgba(160,170,200,.12) 68%, transparent 72%); z-index: 1; }
    .rings { position: absolute; inset: 0; border-radius: 50%; z-index: 1; pointer-events: none;
      background: radial-gradient(circle, transparent 0 34%, rgba(255,255,255,.05) 35%, transparent 37% 52%, rgba(255,255,255,.06) 53%, transparent 55% 80%, rgba(255,255,255,.08) 82%, transparent 85%); }
    /* idle breathing: the same gradient pre-brightened x1.12 cross-fades in and out (opacity on the compositor) instead of animating filter: brightness(),
       which re-ran a filter pass every frame. Watching (hover / focus) keeps the original brightened, faster filter pulse. */
    .glow::after { content: ''; position: absolute; inset: 0; border-radius: 50%; opacity: 0; animation: br 4s ease-in-out infinite;
      background: radial-gradient(circle, #fffffb 0 2.2%, #ffff8b 3.73%, #fff253 4.5%, #ff4100 11%, #ff2500 16.2%, #d70000 23%, #5a0000 38%, #1d0000 52%, #000 62%); }
    @keyframes br { 50% { opacity: 1; } }
    @keyframes br-f { 50% { filter: brightness(1.12); } }
    .eye:hover .glow, .eye:focus-visible .glow { animation: br-f 1.6s ease-in-out infinite; filter: brightness(1.2) saturate(1.1); }
    .eye:hover .glow::after, .eye:focus-visible .glow::after { animation: none; opacity: 0; }
    .eye[aria-pressed="true"] .lens { filter: brightness(.2) saturate(.6); }
    .eye:focus-visible { outline: 2px solid #ff3a00; outline-offset: 3px; }
    .grille { position: relative; width: 108px; height: 54px; margin-top: 10px; border-radius: 2px; background: repeating-linear-gradient(90deg, #0a0a0a 0 2px, #333 2px 3px); box-shadow: inset 0 0 0 1px #000; }
    .grille::after { content: ''; position: absolute; inset: 0; background: linear-gradient(transparent 40%, rgba(255,40,0,0) 60%); transition: background .6s; }
    .talk .grille::after { background: radial-gradient(ellipse at 50% 50%, rgba(255,60,20,.22), transparent 70%); }
  `,
  html: `<div class="stage"><div class="panel"><div class="plate"><b>HAL</b><span>9000</span></div>
    <div><div class="face"><button class="eye" type="button" aria-pressed="false" aria-label="HAL 9000"><span class="lens"><span class="glow"></span><span class="rings"></span></span></button></div><div class="grille"></div></div></div></div>`,
  init(root) {
    const eye = root.querySelector('.eye'), stage = root.querySelector('.stage');
    const look = (e) => {
      const r = eye.getBoundingClientRect(); if (!r.width) return;
      let dx = (e.clientX - (r.left + r.width / 2)) / 120, dy = (e.clientY - (r.top + r.height / 2)) / 120;
      const m = Math.hypot(dx, dy); if (m > 1) { dx /= m; dy /= m; }
      eye.style.setProperty('--dx', `${(dx * 11).toFixed(1)}px`); eye.style.setProperty('--dy', `${(dy * 11).toFixed(1)}px`);
    };
    stage.addEventListener('pointermove', look);
    stage.addEventListener('pointerleave', () => { eye.style.setProperty('--dx', '0px'); eye.style.setProperty('--dy', '0px'); });
    const panel = root.querySelector('.panel');
    let to = 0;
    eye.addEventListener('click', () => {
      const off = eye.getAttribute('aria-pressed') !== 'true';
      eye.setAttribute('aria-pressed', String(off));
      clearTimeout(to); panel.classList.toggle('talk', !off);
      if (!off) to = setTimeout(() => panel.classList.remove('talk'), 1400);
    });
    eye.addEventListener('focus', () => { eye.style.setProperty('--dx', '0px'); eye.style.setProperty('--dy', '-4px'); });
    eye.addEventListener('keydown', (e) => {
      const m = { ArrowLeft: [-11, 0], ArrowRight: [11, 0], ArrowUp: [0, -11], ArrowDown: [0, 11] }[e.key];
      if (m) { e.preventDefault(); eye.style.setProperty('--dx', `${m[0]}px`); eye.style.setProperty('--dy', `${m[1]}px`); }
    });
    return () => clearTimeout(to);
  },
};
