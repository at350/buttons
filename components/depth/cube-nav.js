export default {
  id: 'dp-cube-nav',
  credit: 'Cube navigation — four menu faces on a rotateY cube, lit from the upper left so faces darken as they turn away; arrows (or ←/→) spin it one face at a time',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: center; gap: 24px; padding: 30px 24px; border-radius: 12px; background: radial-gradient(120% 120% at 50% 0%, #26262b, #141417); }
    .scene { width: 150px; height: 64px; perspective: 700px; }
    .cube {
      --a: 0deg; width: 100%; height: 100%; position: relative; transform-style: preserve-3d;
      transform: translateZ(-75px) rotateY(var(--a)); transition: transform .8s cubic-bezier(.3, 1.15, .4, 1);
    }
    .face {
      position: absolute; inset: 0; display: grid; place-items: center; border-radius: 3px;
      font: 650 16px/1 'Inter', system-ui, sans-serif; letter-spacing: .01em; color: #fff; white-space: nowrap;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .28), inset 0 -2px 0 rgba(0, 0, 0, .18);
      -webkit-backface-visibility: hidden; backface-visibility: hidden;
      filter: brightness(var(--lit, 1)); transition: filter .8s cubic-bezier(.3, 1.15, .4, 1);
    }
    .f0 { background: linear-gradient(180deg, #7c7ff7, #5b5ee8); transform: rotateY(0deg) translateZ(75px); }
    .f1 { background: linear-gradient(180deg, #f472b6, #db2777); transform: rotateY(90deg) translateZ(75px); }
    .f2 { background: linear-gradient(180deg, #2dd4bf, #0d9488); transform: rotateY(180deg) translateZ(75px); }
    .f3 { background: linear-gradient(180deg, #fbbf24, #d97706); transform: rotateY(270deg) translateZ(75px); }
    .arr {
      flex: none; width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(255, 255, 255, .14); background: #2a2a2f; color: #f4f4f5; cursor: pointer;
      display: grid; place-items: center; padding: 0; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 2px 6px rgba(0, 0, 0, .4); transition: background .2s, transform .15s;
    }
    .arr:hover { background: #3a3a40; }
    .arr:active { transform: scale(.92); }
    .arr:focus-visible { outline: 2px solid #a5b4fc; outline-offset: 2px; }
    .arr svg { width: 18px; height: 18px; }
  `,
  html: `
    <div class="stage">
      <button class="arr prev" type="button" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>
      <div class="scene" aria-live="polite">
        <div class="cube">
          <div class="face f0">Home</div><div class="face f1" aria-hidden="true">Shop</div><div class="face f2" aria-hidden="true">Blog</div><div class="face f3" aria-hidden="true">About</div>
        </div>
      </div>
      <button class="arr next" type="button" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>
    </div>`,
  init(root) {
    const cube = root.querySelector('.cube'), faces = [...root.querySelectorAll('.face')];
    // light from the upper-left front; each face is shaded by the angle its normal makes with it
    const L = [-0.45, 0, 0.89];
    let a = 0;
    const set = () => {
      cube.style.setProperty('--a', a + 'deg');
      faces.forEach((f, i) => {
        const t = (i * 90 + a) * Math.PI / 180;
        const d = Math.max(0, Math.sin(t) * L[0] + Math.cos(t) * L[2]);
        f.style.setProperty('--lit', (0.32 + 0.72 * d).toFixed(3));
        const front = Math.round((((-a / 90) % 4) + 4) % 4) === i;
        f.setAttribute('aria-hidden', String(!front));
      });
    };
    root.querySelector('.prev').addEventListener('click', () => { a += 90; set(); });
    root.querySelector('.next').addEventListener('click', () => { a -= 90; set(); });
    root.querySelector('.stage').addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { a += 90; set(); } else if (e.key === 'ArrowRight') { a -= 90; set(); }
    });
    set();
  },
};
