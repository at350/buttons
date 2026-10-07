export default {
  id: 'cr-holo-card',
  credit: 'Charizard 4/102, Pokémon Base Set (1st Edition) — holographic card effect after Simey’s "pokemon-cards-css": sun-pillar foil + scanlines (color-dodge), pointer glare, spring tilt; click flips',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #14121f; padding: 44px 52px; border-radius: 12px; perspective: 700px; }
    .card {
      --mx: 50%; --my: 50%; --bx: 50%; --by: 50%; --o: 0;
      --s1: hsl(2, 100%, 73%); --s2: hsl(53, 100%, 69%); --s3: hsl(93, 100%, 69%); --s4: hsl(176, 100%, 76%); --s5: hsl(228, 100%, 74%); --s6: hsl(283, 100%, 73%);
      position: relative; display: block; width: 220px; height: 307px; border: 0; padding: 0; cursor: pointer; background: none;
      border-radius: 12px; transform-style: preserve-3d; will-change: transform;
    }
    .face { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; backface-visibility: hidden; }
    .front { box-shadow: 0 0 0 1px rgba(0, 0, 0, .25), 0 14px 30px rgba(0, 0, 0, .55); background: #f4d03f; transition: box-shadow .3s ease; }
    .card:hover .front { box-shadow: 0 0 0 1px rgba(0, 0, 0, .25), 0 0 16px 3px hsl(54, 87%, 63%), 0 20px 38px rgba(0, 0, 0, .6); }
    .front img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; user-select: none; -webkit-user-drag: none; }
    .shine, .glare { position: absolute; inset: 0; pointer-events: none; opacity: var(--o); transition: opacity .3s ease; border-radius: inherit; }
    .shine {
      background-image:
        repeating-linear-gradient(110deg, var(--s6), var(--s5), var(--s4), var(--s3), var(--s2), var(--s1), var(--s6), var(--s5), var(--s4), var(--s3), var(--s2), var(--s1)),
        repeating-linear-gradient(90deg, #000 0 1px, #8a8a8a 1px 3px);
      background-size: 400% 400%, cover;
      background-position: var(--bx) var(--by), center;
      background-blend-mode: overlay;
      mix-blend-mode: color-dodge; filter: brightness(1.1) contrast(1.1) saturate(1.2); opacity: calc(var(--o) * .3);
    }
    .glare { background: radial-gradient(farthest-corner circle at var(--mx) var(--my), rgba(255, 255, 255, .7) 6%, rgba(255, 255, 255, .25) 24%, rgba(0, 0, 0, .35) 95%); mix-blend-mode: overlay; }
    .back {
      transform: rotateY(180deg); background: #1b3f86 url(assets/real/card-pokemon-back.jpg) center / cover no-repeat;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, .25), 0 14px 30px rgba(0, 0, 0, .55);
    }
    .card:focus-visible { outline: 2px solid #ffe066; outline-offset: 5px; }
  `,
  html: `
    <div class="stage">
      <button class="card" type="button" aria-pressed="false" aria-label="Charizard, Base Set holographic card, flip">
        <span class="face front" aria-hidden="true">
          <img src="assets/real/card-charizard-base-set.jpg" alt="" draggable="false">
          <span class="shine"></span>
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
