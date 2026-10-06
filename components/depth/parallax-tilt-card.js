export default {
  id: 'dp-parallax-tilt-card',
  credit: 'Parallax tilt card — pointer-tracked rotateX/Y with content layers at different translateZ (Atropos / vanilla-tilt lineage)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #0f1020; padding: 34px 46px; border-radius: 12px; perspective: 800px; }
    .card {
      --rx: 0deg; --ry: 0deg; --mx: 50%; --my: 50%;
      position: relative; width: 230px; height: 140px; max-width: 100%; border: 0; padding: 0; cursor: pointer;
      border-radius: 18px; background: linear-gradient(135deg, #1e1b4b, #312e81 55%, #4c1d95);
      transform-style: preserve-3d; transform: rotateX(var(--rx)) rotateY(var(--ry));
      box-shadow: 0 20px 50px rgba(0, 0, 0, .55), inset 0 0 0 1px rgba(255, 255, 255, .08);
      transition: box-shadow .3s;
    }
    .card:hover { box-shadow: 0 34px 70px rgba(0, 0, 0, .65), inset 0 0 0 1px rgba(255, 255, 255, .16); }
    .shine {
      position: absolute; inset: 0; border-radius: 18px; pointer-events: none;
      background: radial-gradient(260px 160px at var(--mx) var(--my), rgba(255, 255, 255, .22), transparent 60%);
      opacity: 0; transition: opacity .3s;
    }
    .card:hover .shine { opacity: 1; }
    .layer { position: absolute; pointer-events: none; }
    .blob { left: 14px; top: 10px; width: 120px; height: 120px; transform: translateZ(28px); opacity: .9; }
    .lbl {
      left: 22px; bottom: 20px; color: #fff; font: 700 22px/1 'Space Grotesk', system-ui, sans-serif; letter-spacing: -.02em;
      transform: translateZ(56px); text-shadow: 0 6px 18px rgba(0, 0, 0, .6);
    }
    .badge {
      right: 18px; top: 16px; width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center;
      background: #f472b6; color: #1e1b4b; transform: translateZ(80px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, .5); transition: background .25s, transform .3s cubic-bezier(.34, 1.56, .64, 1);
    }
    .card[aria-pressed="true"] .badge { background: #a7f3d0; transform: translateZ(96px) rotate(360deg); }
    .card:active { transition: transform .08s; }
    .card:focus-visible { outline: 2px solid #c4b5fd; outline-offset: 4px; }
  `,
  html: `
    <div class="stage">
      <button class="card" type="button" aria-pressed="false">
        <span class="shine"></span>
        <svg class="layer blob" viewBox="0 0 120 120" aria-hidden="true">
          <defs><linearGradient id="dpptc" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#f472b6"/><stop offset="1" stop-color="#60a5fa"/></linearGradient></defs>
          <path fill="url(#dpptc)" d="M60 8c26 0 52 20 52 48s-18 56-50 56S6 92 6 60 34 8 60 8z"/>
        </svg>
        <span class="layer lbl">Parallax</span>
        <span class="layer badge"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg></span>
      </button>
    </div>`,
  init(root) {
    const c = root.querySelector('.card');
    let raf = 0, hover = false, tx = 0, ty = 0, cx = 0, cy = 0, mx = 50, my = 50;
    const tick = () => {
      cx += (tx - cx) * .16; cy += (ty - cy) * .16;
      c.style.setProperty('--rx', cy.toFixed(2) + 'deg');
      c.style.setProperty('--ry', cx.toFixed(2) + 'deg');
      c.style.setProperty('--mx', mx.toFixed(1) + '%');
      c.style.setProperty('--my', my.toFixed(1) + '%');
      raf = (hover || Math.abs(tx - cx) + Math.abs(ty - cy) > .05) ? requestAnimationFrame(tick) : 0;
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(tick); };
    c.addEventListener('pointerenter', () => { hover = true; start(); });
    c.addEventListener('pointermove', (e) => {
      const r = c.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      tx = (px - .5) * 28; ty = (.5 - py) * 24; mx = px * 100; my = py * 100;
    });
    c.addEventListener('pointerleave', () => { hover = false; tx = 0; ty = 0; start(); });
    c.addEventListener('click', () => c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true')));
    return () => cancelAnimationFrame(raf);
  },
};
