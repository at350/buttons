export default {
  id: 'cr-holo-card',
  credit: 'Holographic trading card — Simey’s "pokemon-cards-css": sun-pillar foil + scanlines (color-dodge), pointer glare, spring tilt; click flips',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #14121f; padding: 22px 34px; border-radius: 12px; perspective: 600px; }
    .card {
      --mx: 50%; --my: 50%; --bx: 50%; --by: 50%; --o: 0;
      --s1: hsl(2, 100%, 73%); --s2: hsl(53, 100%, 69%); --s3: hsl(93, 100%, 69%); --s4: hsl(176, 100%, 76%); --s5: hsl(228, 100%, 74%); --s6: hsl(283, 100%, 73%);
      position: relative; display: block; width: 136px; height: 190px; border: 0; padding: 0; cursor: pointer; background: none;
      border-radius: 7px; transform-style: preserve-3d; will-change: transform;
    }
    .face { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; backface-visibility: hidden; }
    .front {
      padding: 7px; background: linear-gradient(160deg, #fbe38a, #e8b93a 45%, #f5d76e);
      box-shadow: 0 0 0 1px rgba(0, 0, 0, .25), 0 12px 28px rgba(0, 0, 0, .5);
      transition: box-shadow .3s ease;
    }
    .card:hover .front { box-shadow: 0 0 0 1px rgba(0, 0, 0, .25), 0 0 14px 2px hsl(54, 87%, 63%), 0 18px 34px rgba(0, 0, 0, .55); }
    .in { position: relative; height: 100%; border-radius: 3px; background: linear-gradient(#fdf6d3, #f1e2a3); display: flex; flex-direction: column; gap: 4px; padding: 5px 6px; }
    .top { display: flex; justify-content: space-between; align-items: baseline; font: 800 10px/1 'DM Sans', system-ui, sans-serif; color: #1c1c1c; }
    .top i { font-style: normal; font-weight: 700; font-size: 8px; color: #c0392b; }
    .art {
      position: relative; height: 82px; border: 2px solid #c9a227; border-radius: 1px; overflow: hidden;
      background:
        radial-gradient(circle at 50% 58%, #fff59d 0 9px, #ffd54f 10px 15px, transparent 16px),
        conic-gradient(from 0deg at 50% 58%, #4a2a8a, #2b5fb8 12%, #4a2a8a 25%, #2b5fb8 37%, #4a2a8a 50%, #2b5fb8 62%, #4a2a8a 75%, #2b5fb8 87%, #4a2a8a);
    }
    .bar { height: 5px; border-radius: 3px; background: rgba(28, 28, 28, .18); }
    .bar.s { width: 62%; }
    .bar.m { width: 84%; margin-top: 4px; }
    .shine, .glare { position: absolute; inset: 0; pointer-events: none; opacity: var(--o); transition: opacity .3s ease; }
    .shine {
      background-image:
        repeating-linear-gradient(110deg, var(--s6), var(--s5), var(--s4), var(--s3), var(--s2), var(--s1), var(--s6), var(--s5), var(--s4), var(--s3), var(--s2), var(--s1)),
        repeating-linear-gradient(90deg, #000 0 1px, #666 1px 2px);
      background-size: 400% 400%, cover;
      background-position: var(--bx) var(--by), center;
      background-blend-mode: overlay;
      mix-blend-mode: color-dodge; filter: brightness(1.1) contrast(1.1) saturate(1.2);
    }
    .glare { background: radial-gradient(farthest-corner circle at var(--mx) var(--my), rgba(255, 255, 255, .7) 6%, rgba(255, 255, 255, .25) 24%, rgba(0, 0, 0, .35) 95%); mix-blend-mode: overlay; }
    .back {
      transform: rotateY(180deg); border: 7px solid #1d4ea8;
      background: radial-gradient(circle at 50% 50%, #ffcf3a 0 14px, #1d4ea8 15px 19px, #2f6fd6 20px 40px, #1d4ea8 41px 44px, #3a80ec 45px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, .5);
    }
    .card:focus-visible { outline: 2px solid #ffe066; outline-offset: 5px; }
  `,
  html: `
    <div class="stage">
      <button class="card" type="button" aria-pressed="false" aria-label="Rare holo card, flip">
        <span class="face front" aria-hidden="true">
          <span class="in"><span class="top">Voltix <i>HP 120</i></span><span class="art"><span class="shine"></span></span><span class="bar s"></span><span class="bar"></span><span class="bar m"></span><span class="bar s"></span></span>
          <span class="glare"></span>
        </span>
        <span class="face back" aria-hidden="true"></span>
      </button>
    </div>`,
  init(root) {
    const c = root.querySelector('.card');
    // svelte-spring-like motion (Simey uses stiffness .066, damping .25)
    const S = { rx: 0, ry: 0, vx: 0, vy: 0, tx: 0, ty: 0 };
    let raf = 0, over = false, flip = 0, mx = 50, my = 50;
    const step = () => {
      S.vx += (S.tx - S.rx) * .066; S.vx *= .75; S.rx += S.vx;
      S.vy += (S.ty - S.ry) * .066; S.vy *= .75; S.ry += S.vy;
      c.style.transform = `rotateX(${S.rx.toFixed(2)}deg) rotateY(${(S.ry + flip).toFixed(2)}deg)`;
      if (over || Math.abs(S.vx) + Math.abs(S.vy) + Math.abs(S.tx - S.rx) + Math.abs(S.ty - S.ry) > .02) raf = requestAnimationFrame(step);
      else raf = 0;
    };
    const run = () => { if (!raf) raf = requestAnimationFrame(step); };
    c.addEventListener('pointermove', (e) => {
      const r = c.getBoundingClientRect();
      mx = Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100));
      my = Math.max(0, Math.min(100, (e.clientY - r.top) / r.height * 100));
      over = true;
      S.ty = (mx - 50) / 3.5 * (flip ? -1 : 1); S.tx = -(my - 50) / 3.5;
      c.style.setProperty('--mx', mx.toFixed(1) + '%'); c.style.setProperty('--my', my.toFixed(1) + '%');
      c.style.setProperty('--bx', (37 + mx * .26).toFixed(1) + '%'); c.style.setProperty('--by', (33 + my * .34).toFixed(1) + '%');
      c.style.setProperty('--o', '1');
      run();
    });
    c.addEventListener('pointerleave', () => { over = false; S.tx = 0; S.ty = 0; c.style.setProperty('--o', '0'); run(); });
    c.addEventListener('click', () => {
      const on = c.getAttribute('aria-pressed') !== 'true';
      c.setAttribute('aria-pressed', String(on));
      // spin the card over on the same spring (the offset is folded into rotation and decays to the new face)
      S.ry -= on ? 180 : -180; flip = on ? 180 : 0; S.ty = -S.ty;
      run();
    });
    return () => cancelAnimationFrame(raf);
  },
};
