export default {
  id: 'dp-carousel-ring',
  credit: '3D carousel ring — six photo cards around the Y axis on a translateZ radius, shaded by how far they face away; arrows, dots or ←/→ rotate it one card at a time',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 24px 26px 20px; border-radius: 12px;
      background: radial-gradient(120% 90% at 50% 10%, #1a2133, #0b0f1a);
    }
    .scene { position: relative; width: 184px; height: 112px; perspective: 600px; }
    .ring {
      --a: 0deg; position: absolute; left: 50%; top: 2px; width: 84px; height: 108px; margin-left: -42px;
      transform-style: preserve-3d; transform: translateZ(-74px) rotateY(var(--a)); transition: transform .8s cubic-bezier(.3, 1.1, .4, 1);
    }
    .c {
      position: absolute; inset: 0; border-radius: 12px; display: grid; place-items: center; color: rgba(255, 255, 255, .95);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .18), inset 0 1px 0 rgba(255, 255, 255, .35);
      -webkit-backface-visibility: hidden; backface-visibility: hidden;
      filter: brightness(var(--lit, 1)); transition: filter .8s cubic-bezier(.3, 1.1, .4, 1);
    }
    .c { overflow: hidden; }
    .c img { width: 100%; height: 100%; object-fit: cover; display: block; border-radius: inherit; }
    .c::after { content: ''; position: absolute; inset: 0; border-radius: inherit; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .18), inset 0 1px 0 rgba(255, 255, 255, .35); pointer-events: none; }
    .c:nth-child(1) { transform: rotateY(0deg) translateZ(74px); background: #1a2133; }
    .c:nth-child(2) { transform: rotateY(60deg) translateZ(74px); background: #1a2133; }
    .c:nth-child(3) { transform: rotateY(120deg) translateZ(74px); background: #1a2133; }
    .c:nth-child(4) { transform: rotateY(180deg) translateZ(74px); background: #1a2133; }
    .c:nth-child(5) { transform: rotateY(240deg) translateZ(74px); background: #1a2133; }
    .c:nth-child(6) { transform: rotateY(300deg) translateZ(74px); background: #1a2133; }
    .floor { position: absolute; left: 50%; bottom: -6px; width: 150px; height: 14px; margin-left: -75px; border-radius: 50%; background: radial-gradient(closest-side, rgba(0, 0, 0, .55), transparent); }
    .ctl { display: flex; align-items: center; gap: 14px; }
    .arr {
      width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(255, 255, 255, .16); background: rgba(255, 255, 255, .06); color: #fff; cursor: pointer;
      display: grid; place-items: center; padding: 0; transition: background .2s, transform .15s; flex: none;
    }
    .arr:hover { background: rgba(255, 255, 255, .16); }
    .arr:active { transform: scale(.9); }
    .arr:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .arr svg { width: 16px; height: 16px; }
    .dots { display: flex; gap: 6px; }
    .dot { width: 6px; height: 6px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; background: rgba(255, 255, 255, .28); transition: background .3s, transform .3s; }
    .dot[aria-current="true"] { background: #fff; transform: scale(1.3); }
    .dot:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="scene">
        <span class="floor"></span>
        <div class="ring">
          <div class="c"><img src="assets/square/12.webp" alt="" width="84" height="108" draggable="false"></div>
          <div class="c"><img src="assets/square/26.webp" alt="" width="84" height="108" draggable="false"></div>
          <div class="c"><img src="assets/square/39.webp" alt="" width="84" height="108" draggable="false"></div>
          <div class="c"><img src="assets/square/49.webp" alt="" width="84" height="108" draggable="false"></div>
          <div class="c"><img src="assets/square/57.webp" alt="" width="84" height="108" draggable="false"></div>
          <div class="c"><img src="assets/square/64.webp" alt="" width="84" height="108" draggable="false"></div>
        </div>
      </div>
      <div class="ctl">
        <button class="arr prev" type="button" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
        <div class="dots"><button class="dot" type="button" aria-label="Card 1" aria-current="true"></button><button class="dot" type="button" aria-label="Card 2" aria-current="false"></button><button class="dot" type="button" aria-label="Card 3" aria-current="false"></button><button class="dot" type="button" aria-label="Card 4" aria-current="false"></button><button class="dot" type="button" aria-label="Card 5" aria-current="false"></button><button class="dot" type="button" aria-label="Card 6" aria-current="false"></button></div>
        <button class="arr next" type="button" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const ring = root.querySelector('.ring'), cards = [...root.querySelectorAll('.c')], dots = [...root.querySelectorAll('.dot')];
    let i = 0;
    const draw = () => {
      ring.style.setProperty('--a', (-i * 60) + 'deg');
      const cur = ((i % 6) + 6) % 6;
      dots.forEach((d, k) => d.setAttribute('aria-current', String(k === cur)));
      cards.forEach((c, k) => {
        const t = (k * 60 - i * 60) * Math.PI / 180;
        c.style.setProperty('--lit', (0.35 + 0.65 * Math.max(0, Math.cos(t))).toFixed(3));
      });
    };
    const go = (d) => { i += d; draw(); };
    root.querySelector('.prev').addEventListener('click', () => go(-1));
    root.querySelector('.next').addEventListener('click', () => go(1));
    dots.forEach((d, k) => d.addEventListener('click', () => {
      const cur = ((i % 6) + 6) % 6; let delta = k - cur;
      if (delta > 3) delta -= 6; if (delta < -3) delta += 6;
      go(delta);
    }));
    root.querySelector('.stage').addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') go(-1); else if (e.key === 'ArrowRight') go(1); });
    draw();
  },
};
