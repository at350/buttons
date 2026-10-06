export default {
  id: 'dp-carousel-ring',
  credit: '3D carousel ring — six cards around the Y axis on a translateZ radius, shaded by how far they face away; arrows, dots or ←/→ rotate it one card at a time',
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
    .c svg { width: 30px; height: 30px; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, .25)); }
    .c:nth-child(1) { transform: rotateY(0deg) translateZ(74px); background: linear-gradient(160deg, #fb7185, #e11d48); }
    .c:nth-child(2) { transform: rotateY(60deg) translateZ(74px); background: linear-gradient(160deg, #fbbf24, #ea580c); }
    .c:nth-child(3) { transform: rotateY(120deg) translateZ(74px); background: linear-gradient(160deg, #34d399, #059669); }
    .c:nth-child(4) { transform: rotateY(180deg) translateZ(74px); background: linear-gradient(160deg, #22d3ee, #0369a1); }
    .c:nth-child(5) { transform: rotateY(240deg) translateZ(74px); background: linear-gradient(160deg, #818cf8, #4338ca); }
    .c:nth-child(6) { transform: rotateY(300deg) translateZ(74px); background: linear-gradient(160deg, #e879f9, #a21caf); }
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
          <div class="c"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></div>
          <div class="c"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></div>
          <div class="c"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg></div>
          <div class="c"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg></div>
          <div class="c"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg></div>
          <div class="c"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg></div>
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
