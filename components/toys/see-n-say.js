const ANIMALS = ['🐄', '🐖', '🐕', '🐓', '🦆', '🐎', '🐑', '🐈', '🦃', '🐐', '🐝', '🦉'];
const RING = ANIMALS.map((a, i) => {
  const r = (i * 30) * Math.PI / 180;
  return `<span class="an" style="left:${(68 + 54 * Math.sin(r) - 12).toFixed(1)}px;top:${(68 - 54 * Math.cos(r) - 12).toFixed(1)}px">${a}</span>`;
}).join('');

export default {
  id: 'ty2-see-n-say',
  credit: "Mattel See 'n Say — The Farmer Says (1965): pull the lever down, let go, and the arrow spins to an animal",
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 14px; border-radius: 12px; overflow: hidden; background: linear-gradient(#fdf3d2, #f2dfa4); }
    .toy { position: relative; width: 214px; height: 184px; border-radius: 34px;
      background: radial-gradient(ellipse at 30% 15%, #ffe466, #f7c600 45%, #d39f00);
      box-shadow: 0 7px 0 #a37a00, 0 12px 16px rgba(80,50,0,.3), inset 0 2px 0 rgba(255,255,255,.5); }
    .face { position: absolute; left: 12px; top: 12px; width: 160px; height: 160px; border-radius: 50%;
      background: radial-gradient(circle closest-side, #fff 0 84%, #e3262d 85% 89%, #fff 90%); box-shadow: inset 0 0 0 6px #1a5fb4, 0 2px 0 rgba(0,0,0,.2); }
    .ring { position: absolute; left: 12px; top: 12px; width: 136px; height: 136px; }
    .an { position: absolute; width: 24px; height: 24px; font: 17px/24px system-ui, sans-serif; text-align: center; border-radius: 50%; transition: transform .2s, background .2s; }
    .an.hit { transform: scale(1.35); background: rgba(247,198,0,.5); }
    .ptr { position: absolute; left: 70px; top: 70px; width: 20px; height: 20px; margin: 0; transform-origin: 50% 50%;
      transition: transform 2.4s cubic-bezier(.12,.6,.18,1); }
    .ptr::before { content: ''; position: absolute; left: 6px; top: -38px; width: 8px; height: 46px; border-radius: 4px 4px 2px 2px;
      background: linear-gradient(90deg, #a5141a, #e3262d 50%, #a5141a); clip-path: polygon(50% 0, 100% 22%, 100% 100%, 0 100%, 0 22%); }
    .ptr::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #8cb6f2, #1a5fb4 60%, #0b2e5c); box-shadow: 0 2px 3px rgba(0,0,0,.4); }
    .slot { position: absolute; right: 14px; top: 24px; width: 14px; height: 136px; border-radius: 7px; background: #5c4200; box-shadow: inset 0 3px 5px rgba(0,0,0,.6); }
    .lever { position: absolute; right: 6px; top: 20px; width: 30px; height: 26px; border-radius: 9px; cursor: grab; touch-action: none;
      background: linear-gradient(90deg, #a5141a, #e3262d 40%, #ff6a5c 55%, #c21c22); box-shadow: 0 3px 0 #6f0a0e, 0 4px 6px rgba(0,0,0,.35);
      transition: transform .35s cubic-bezier(.3,1.5,.5,1); }
    .lever.drag { transition: none; cursor: grabbing; }
    .lever:focus-visible { outline: 3px solid #1a5fb4; outline-offset: 2px; }
  `,
  html: `
    <div class="stage"><div class="toy">
      <div class="face"><div class="ring">${RING}</div><div class="ptr"></div></div>
      <div class="slot"></div>
      <div class="lever" role="slider" tabindex="0" aria-label="lever" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div>
    </div></div>`,
  init(root) {
    const lever = root.querySelector('.lever'), ptr = root.querySelector('.ptr'), ans = [...root.querySelectorAll('.an')];
    const MAX = 110;
    let y = 0, sy = 0, drag = false, ang = 0, t = 0;
    const set = () => { lever.style.transform = `translateY(${y}px)`; lever.setAttribute('aria-valuenow', Math.round(y / MAX * 100)); };
    const spin = () => {
      const pick = Math.floor(Math.random() * 12);
      ans.forEach((a) => a.classList.remove('hit'));
      const cur = ((ang % 360) + 360) % 360;
      ang += 720 + ((pick * 30 - cur + 360) % 360);
      ptr.style.transform = `rotate(${ang}deg)`;
      clearTimeout(t); t = setTimeout(() => ans[pick].classList.add('hit'), 2300);
    };
    const release = () => {
      if (!drag) return; drag = false; lever.classList.remove('drag');
      if (y > MAX * 0.6) spin();
      y = 0; set();
    };
    lever.addEventListener('pointerdown', (e) => { drag = true; sy = e.clientY - y; lever.setPointerCapture(e.pointerId); lever.classList.add('drag'); });
    lever.addEventListener('pointermove', (e) => { if (!drag) return; y = Math.max(0, Math.min(MAX, e.clientY - sy)); set(); });
    lever.addEventListener('pointerup', release); lever.addEventListener('pointercancel', release); lever.addEventListener('lostpointercapture', release);
    lever.addEventListener('keydown', (e) => {
      if (!['Enter', ' ', 'ArrowDown'].includes(e.key) || drag) return;
      e.preventDefault(); drag = true; lever.classList.remove('drag'); y = MAX; set();
      setTimeout(release, 300);
    });
    return () => clearTimeout(t);
  },
};
