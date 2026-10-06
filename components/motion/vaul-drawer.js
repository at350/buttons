const SPRING = 'linear(0, 0.144, 0.433, 0.717, 0.926, 1.046, 1.091, 1.09, 1.066, 1.038, 1.014, 1, 0.992, 0.991, 0.993, 0.995, 0.998, 1, 1.001)';

export default {
  id: 'mo-vaul-drawer',
  credit: 'Vaul (Emil Kowalski) — drag the handle; the drawer follows your finger and springs to a snap point while the page scales back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 240px; height: 300px; max-width: 100%; border-radius: 12px; background: #000; overflow: hidden; font-family: Inter, system-ui, sans-serif; touch-action: none; }
    .page { position: absolute; inset: 0; background: #fff; border-radius: 12px; transform-origin: 50% 0; transition: transform .5s ${SPRING}, border-radius .5s; padding: 18px; }
    .page i { display: block; height: 10px; border-radius: 5px; background: #e5e5e5; margin-bottom: 10px; }
    .page i:nth-child(1) { width: 60%; height: 18px; } .page i:nth-child(3) { width: 80%; } .page i:nth-child(5) { width: 40%; }
    .stage.open .page { transform: translateY(14px) scale(.93); border-radius: 14px; }
    .dim { position: absolute; inset: 0; background: rgba(0,0,0,.4); opacity: 0; transition: opacity .4s; pointer-events: none; }
    .stage.open .dim { opacity: 1; pointer-events: auto; }
    .drawer {
      position: absolute; left: 0; right: 0; bottom: 0; height: 260px; background: #fff; border-radius: 14px 14px 0 0;
      transform: translateY(var(--y, 200px)); transition: transform .5s ${SPRING}; box-shadow: 0 -8px 30px rgba(0,0,0,.2);
    }
    .drawer.drag { transition: none; }
    .handle { width: 100%; height: 34px; border: 0; background: transparent; cursor: grab; display: grid; place-items: center; }
    .handle:active { cursor: grabbing; } .handle:focus-visible { outline: 2px solid #171717; outline-offset: -4px; border-radius: 10px; }
    .handle i { width: 36px; height: 5px; border-radius: 3px; background: #d4d4d4; transition: transform .2s, background .2s; }
    .handle:hover i { background: #a3a3a3; } .drawer.drag .handle i { transform: scaleX(1.25); }
    .body { padding: 0 18px; }
    .body b { display: block; font-size: 15px; font-weight: 600; color: #171717; margin-bottom: 10px; }
    .body p { margin: 0 0 12px; font-size: 12.5px; line-height: 1.5; color: #737373; }
    .body button { width: 100%; height: 40px; border: 0; border-radius: 10px; background: #171717; color: #fff; font: 600 13px Inter, system-ui, sans-serif; cursor: pointer; }
    .body button:hover { background: #333; } .body button:focus-visible { outline: 2px solid #171717; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="page"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="dim"></div>
      <div class="drawer">
        <button class="handle" type="button" aria-expanded="false" aria-label="Toggle drawer"><i></i></button>
        <div class="body"><b>Notifications</b><p>Stay in the loop with real-time alerts for comments, mentions and approvals.</p><button type="button">Enable</button></div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), drawer = root.querySelector('.drawer'), handle = root.querySelector('.handle');
    const CLOSED = 200, OPEN = 0;
    let open = false, startY = 0, base = CLOSED, cur = CLOSED, moved = false;
    const snap = (o) => { open = o; cur = o ? OPEN : CLOSED; drawer.style.setProperty('--y', cur + 'px'); stage.classList.toggle('open', o); handle.setAttribute('aria-expanded', String(o)); };
    handle.addEventListener('pointerdown', (e) => { handle.setPointerCapture(e.pointerId); startY = e.clientY; base = cur; moved = false; drawer.classList.add('drag'); });
    handle.addEventListener('pointermove', (e) => {
      if (!handle.hasPointerCapture(e.pointerId)) return;
      const dy = e.clientY - startY; if (Math.abs(dy) > 3) moved = true;
      let y = base + dy; if (y < 0) y = -Math.pow(-y, .6); if (y > CLOSED) y = CLOSED + Math.pow(y - CLOSED, .6);
      drawer.style.setProperty('--y', y + 'px');
    });
    const end = (e) => {
      if (!drawer.classList.contains('drag')) return;
      drawer.classList.remove('drag');
      const y = base + (e.clientY - startY);
      if (!moved) snap(!open); else snap(y < CLOSED / 2);
    };
    handle.addEventListener('pointerup', end); handle.addEventListener('pointercancel', end);
    handle.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); snap(!open); } });
    root.querySelector('.dim').addEventListener('click', () => snap(false));
    root.querySelector('.body button').addEventListener('click', () => snap(false));
  },
};
