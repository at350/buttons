export default {
  id: 'dp-tvos-tile',
  credit: 'Apple tvOS — focused parallax tile: layered artwork shifts at different rates, the tile lifts and casts a long shadow',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #101318; padding: 34px 44px 44px; border-radius: 12px; perspective: 900px; }
    .tile {
      --px: 0; --py: 0; --rx: 0deg; --ry: 0deg;
      position: relative; width: 220px; height: 124px; max-width: 100%; border: 0; padding: 0; cursor: pointer;
      border-radius: 14px; overflow: hidden; background: #0b1220;
      transform: rotateX(var(--rx)) rotateY(var(--ry)) scale(1);
      box-shadow: 0 6px 14px rgba(0, 0, 0, .5);
      transition: transform .35s cubic-bezier(.2, .8, .2, 1), box-shadow .35s;
    }
    .tile:hover { transform: rotateX(var(--rx)) rotateY(var(--ry)) scale(1.1) translateZ(20px); box-shadow: 0 34px 50px rgba(0, 0, 0, .7), 0 0 0 3px rgba(255, 255, 255, .9); }
    .tile:active { transform: rotateX(var(--rx)) rotateY(var(--ry)) scale(1.04); transition-duration: .1s; }
    .l { position: absolute; inset: -12%; pointer-events: none; }
    .sky { background: linear-gradient(180deg, #1e3a8a, #7c3aed 55%, #f97316); transform: translate(calc(var(--px) * 4px), calc(var(--py) * 4px)); }
    .sun { transform: translate(calc(var(--px) * 9px), calc(var(--py) * 9px)); }
    .far { transform: translate(calc(var(--px) * 14px), calc(var(--py) * 10px)); }
    .near { transform: translate(calc(var(--px) * 22px), calc(var(--py) * 14px)); }
    .ttl {
      position: absolute; left: 16px; bottom: 12px; color: #fff; font: 800 20px/1 'Syne', system-ui, sans-serif; letter-spacing: .02em;
      text-shadow: 0 4px 14px rgba(0, 0, 0, .7); pointer-events: none;
      transform: translate(calc(var(--px) * 30px), calc(var(--py) * 18px));
    }
    .tile:focus-visible { outline: 0; box-shadow: 0 34px 50px rgba(0, 0, 0, .7), 0 0 0 3px #fff; }
  `,
  html: `
    <div class="stage">
      <button class="tile" type="button" aria-label="Open">
        <span class="l sky"></span>
        <svg class="l sun" viewBox="0 0 220 124" preserveAspectRatio="none" aria-hidden="true"><circle cx="150" cy="56" r="26" fill="#fde68a"/></svg>
        <svg class="l far" viewBox="0 0 220 124" preserveAspectRatio="none" aria-hidden="true"><path fill="#4c1d95" d="M0 124V84l30-26 28 20 26-34 36 30 30-22 34 28 36-18v62z"/></svg>
        <svg class="l near" viewBox="0 0 220 124" preserveAspectRatio="none" aria-hidden="true"><path fill="#1e1b4b" d="M0 124V104l40-22 30 18 36-28 34 26 40-16 40 20v22z"/></svg>
        <span class="ttl">Horizon</span>
      </button>
    </div>`,
  init(root) {
    const t = root.querySelector('.tile');
    let raf = 0, hover = false, tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * .18; cy += (ty - cy) * .18;
      t.style.setProperty('--px', cx.toFixed(3)); t.style.setProperty('--py', cy.toFixed(3));
      t.style.setProperty('--ry', (cx * 10).toFixed(2) + 'deg'); t.style.setProperty('--rx', (-cy * 8).toFixed(2) + 'deg');
      raf = (hover || Math.abs(tx - cx) + Math.abs(ty - cy) > .002) ? requestAnimationFrame(tick) : 0;
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(tick); };
    t.addEventListener('pointerenter', () => { hover = true; start(); });
    t.addEventListener('pointermove', (e) => {
      const r = t.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - .5; ty = (e.clientY - r.top) / r.height - .5;
    });
    t.addEventListener('pointerleave', () => { hover = false; tx = 0; ty = 0; start(); });
    return () => cancelAnimationFrame(raf);
  },
};
