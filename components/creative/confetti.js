export default {
  id: 'cr-confetti',
  credit: 'Confetti burst on click — canvas-confetti physics (decay .9, gravity, tilt flutter, default palette) recreated with WAAPI DOM particles',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; height: 160px; max-width: 100%; overflow: hidden; border-radius: 12px; background: #fffaf2; display: grid; place-items: end center; padding-bottom: 30px; }
    .btn {
      position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; border: 0; border-radius: 12px; padding: 14px 24px;
      background: #f97316; color: #fff; font: 700 16px/1 'DM Sans', system-ui, sans-serif; letter-spacing: -.005em;
      box-shadow: 0 5px 0 #c2410c; transition: transform .1s ease, box-shadow .1s ease, background-color .2s ease;
    }
    .btn svg { width: 18px; height: 18px; }
    .btn:hover { background: #fb7f24; }
    .btn:active { transform: translateY(4px); box-shadow: 0 1px 0 #c2410c; }
    .btn:focus-visible { outline: 3px solid #c2410c; outline-offset: 3px; }
    .p { position: absolute; left: 0; top: 0; width: 9px; height: 6px; pointer-events: none; background: var(--c); border-radius: 1px; will-change: transform, opacity; }
    .p.o { width: 7px; height: 7px; border-radius: 50%; }
  `,
  html: `<div class="stage"><button class="btn" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"/><path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"/></svg>Celebrate</button></div>`,
  init(root) {
    const stage = root.querySelector('.stage'), btn = root.querySelector('.btn');
    const colors = ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'];
    const live = new Set();
    btn.addEventListener('click', () => {
      const sr = stage.getBoundingClientRect(), br = btn.getBoundingClientRect();
      const ox = br.left - sr.left + br.width / 2, oy = br.top - sr.top + 4;
      for (let i = 0; i < 46; i++) {
        // canvas-confetti fetti: angle 90° ± spread/2, velocity decays ×0.9 per tick, constant gravity, wobble + tilt flutter
        const ang = (-90 + (Math.random() - .5) * 80) * Math.PI / 180;
        let v = 7 + Math.random() * 7, x = ox, y = oy, wob = Math.random() * 10, tilt = Math.random() * Math.PI, rot = Math.random() * 360;
        const ws = .05 + Math.random() * .06, spin = (Math.random() - .5) * 24, grav = 1.15, frames = [];
        for (let t = 0; t <= 56; t++) {
          x += Math.cos(ang) * v + Math.cos(wob) * .9; y += Math.sin(ang) * v + grav * Math.min(1, t / 6); v *= .9;
          wob += ws * 10; tilt += .25; rot += spin;
          if (t % 4 === 0) frames.push({ transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rot.toFixed(0)}deg) scaleY(${Math.cos(tilt).toFixed(2)})`, opacity: t > 36 ? (1 - (t - 36) / 20).toFixed(2) : 1 });
        }
        const p = document.createElement('span');
        p.className = 'p' + (i % 4 === 0 ? ' o' : '');
        p.style.setProperty('--c', colors[i % colors.length]);
        stage.appendChild(p); live.add(p);
        const a = p.animate(frames, { duration: 950, easing: 'linear', fill: 'forwards' });
        a.onfinish = () => { p.remove(); live.delete(p); };
      }
    });
    return () => { for (const p of live) p.remove(); live.clear(); };
  },
};
