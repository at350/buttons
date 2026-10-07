export default {
  id: 'dp-tvos-tile',
  credit: 'Apple tvOS — focused parallax poster: the key art and the game’s logo (Horizon Zero Dawn, Steam library art) shift at different rates, the tile scales up, tilts with the pointer, carries a moving specular glare and a deep soft shadow',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: radial-gradient(120% 90% at 50% 0%, #1f2530, #0c0f14); padding: 30px 40px 42px; border-radius: 12px; perspective: 800px; }
    .tile {
      --px: 0; --py: 0; --rx: 0deg; --ry: 0deg; --gx: 50%; --gy: 0%; --s: 1;
      position: relative; display: block; width: 220px; height: 124px; max-width: 100%; border: 0; padding: 0; cursor: pointer;
      border-radius: 12px; background: transparent;
      transform: scale(var(--s)) rotateX(var(--rx)) rotateY(var(--ry));
      transition: transform .5s cubic-bezier(.2, .9, .25, 1);
      -webkit-tap-highlight-color: transparent;
    }
    .tile:hover, .tile:focus-visible { --s: 1.1; }
    .tile:active { --s: 1.04; transition-duration: .12s; }
    /* soft shadow is a separate blurred plate so it can sink lower as the tile rises */
    .shadow {
      position: absolute; left: 8%; right: 8%; top: 12%; bottom: 0; border-radius: 14px; background: rgba(0, 0, 0, .7);
      filter: blur(8px); transform: translateY(4px); opacity: .55; transition: transform .5s cubic-bezier(.2, .9, .25, 1), opacity .5s, filter .5s;
    }
    .tile:hover .shadow, .tile:focus-visible .shadow { transform: translateY(16px) scale(.98); opacity: .85; filter: blur(12px); }
    .tile:active .shadow { transform: translateY(8px); opacity: .7; }
    .art { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; background: #0b1220; transform: translateZ(0); }
    .l { position: absolute; inset: -10%; width: 120%; height: 120%; pointer-events: none; }
    .photo { object-fit: cover; display: block; transform: translate(calc(var(--px) * -10px), calc(var(--py) * -6px)) scale(1.02); }
    .scrim { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(180deg, transparent 35%, rgba(0, 0, 0, .6)); }
    .ttl {
      position: absolute; left: 10px; bottom: 8px; width: 112px; height: auto; pointer-events: none;
      filter: drop-shadow(0 2px 6px rgba(0, 0, 0, .65));
      transform: translate(calc(var(--px) * 7px), calc(var(--py) * 5px));
    }
    .glare {
      position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .4s; mix-blend-mode: soft-light;
      background: radial-gradient(180px 140px at var(--gx) var(--gy), rgba(255, 255, 255, .95), rgba(255, 255, 255, .15) 55%, transparent 75%);
    }
    .sheen { position: absolute; inset: 0; border-radius: inherit; pointer-events: none; box-shadow: inset 0 1px 0 rgba(255, 255, 255, .22); }
    .tile:hover .glare, .tile:focus-visible .glare { opacity: 1; }
    .tile:focus-visible { outline: 0; }
  `,
  html: `
    <div class="stage">
      <button class="tile" type="button" aria-label="Horizon Zero Dawn">
        <span class="shadow"></span>
        <span class="art">
          <img class="l photo" src="assets/real/game-horizon-zero-dawn-hero.jpg" alt="" width="264" height="149" draggable="false">
          <span class="scrim"></span>
          <img class="ttl" src="assets/real/game-horizon-zero-dawn-logo.png" alt="" width="112" height="49" draggable="false">
          <span class="glare"></span>
          <span class="sheen"></span>
        </span>
      </button>
    </div>`,
  init(root) {
    const t = root.querySelector('.tile');
    let raf = 0, hover = false, tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * .16; cy += (ty - cy) * .16;
      t.style.setProperty('--px', cx.toFixed(3)); t.style.setProperty('--py', cy.toFixed(3));
      t.style.setProperty('--ry', (cx * 9).toFixed(2) + 'deg'); t.style.setProperty('--rx', (-cy * 7).toFixed(2) + 'deg');
      t.style.setProperty('--gx', (50 + cx * 110).toFixed(1) + '%'); t.style.setProperty('--gy', (cy * 120 - 10).toFixed(1) + '%');
      raf = (hover || Math.abs(tx - cx) + Math.abs(ty - cy) > .002) ? requestAnimationFrame(tick) : 0;
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(tick); };
    t.addEventListener('pointerenter', () => { hover = true; start(); });
    t.addEventListener('pointermove', (e) => {
      const r = t.getBoundingClientRect();
      tx = Math.max(-.5, Math.min(.5, (e.clientX - r.left) / r.width - .5)); ty = Math.max(-.5, Math.min(.5, (e.clientY - r.top) / r.height - .5));
    });
    t.addEventListener('pointerleave', () => { hover = false; tx = 0; ty = 0; start(); });
    return () => cancelAnimationFrame(raf);
  },
};
