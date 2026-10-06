// Vaul (Emil Kowalski) — constants from vaul/dist: transition .5s cubic-bezier(.32,.72,0,1), background wrapper
// scale((W - 26) / W) translateY(14px) radius 8px over black, overlay black/40, close past 25% drag or > .4px/ms,
// upward over-drag dampened with 8 * (ln(v + 1) - 2). Demo copy from vaul.emilkowal.ski.
const EASE = 'cubic-bezier(.32, .72, 0, 1)';

export default {
  id: 'mo-vaul-drawer',
  credit: 'Vaul by Emil Kowalski — the drawer follows your finger, the page behind scales to (W−26)/W and sinks 14px, release past 25% or flick to dismiss (cubic-bezier(.32,.72,0,1), 500ms)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 260px; height: 320px; max-width: 100%; border-radius: 12px; background: #000; overflow: hidden; font-family: Inter, ui-sans-serif, system-ui, sans-serif; touch-action: none; }
    .page {
      position: absolute; inset: 0; background: #fff; border-radius: 12px; overflow: hidden; transform-origin: 50% 0;
      transform: translateY(calc(var(--p, 0) * 14px)) scale(calc(1 - var(--p, 0) * 26 / 260)); transition: transform .5s ${EASE}, border-radius .5s ${EASE};
      display: grid; place-items: center;
    }
    .stage.drag .page, .stage.drag .ov { transition: none; }
    .stage.open .page { border-radius: 8px; }
    .open-btn {
      height: 40px; padding: 0 16px; border-radius: 999px; border: 1px solid #e4e4e7; background: #fff; color: #09090b; font: 500 14px Inter, ui-sans-serif, system-ui, sans-serif;
      cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,.05); transition: background .15s, transform .15s;
    }
    .open-btn:hover { background: #f4f4f5; } .open-btn:active { transform: scale(.97); }
    .open-btn:focus-visible { outline: 2px solid #09090b; outline-offset: 2px; }
    .ov { position: absolute; inset: 0; background: rgba(0,0,0,.4); opacity: var(--p, 0); transition: opacity .5s ${EASE}; pointer-events: none; }
    .stage.open .ov { pointer-events: auto; }
    .drawer {
      position: absolute; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; border-radius: 10px 10px 0 0; background: #f3f4f6; outline: none;
      transform: translateY(var(--y, 100%)); transition: transform .5s ${EASE}; will-change: transform; cursor: grab; user-select: none; -webkit-user-select: none;
    }
    .stage.drag .drawer { transition: none; cursor: grabbing; }
    .top { padding: 16px; background: #fff; border-radius: 10px 10px 0 0; }
    .handle { display: block; margin: 0 auto 26px; width: 48px; height: 6px; border-radius: 999px; background: #d1d5db; border: 0; padding: 0; cursor: grab; }
    .handle:focus-visible { outline: 2px solid #09090b; outline-offset: 4px; }
    .top b { display: block; margin-bottom: 12px; font-size: 15px; font-weight: 500; color: #111827; }
    .top p { margin: 0 0 8px; font-size: 13px; line-height: 1.45; color: #4b5563; }
    .foot { display: flex; justify-content: flex-end; gap: 18px; padding: 12px 16px; border-top: 1px solid #e5e7eb; }
    .foot button { display: inline-flex; align-items: center; gap: 2px; padding: 0; border: 0; background: none; color: #111827; font: 400 12px Inter, ui-sans-serif, system-ui, sans-serif; cursor: pointer; }
    .foot button:hover { text-decoration: underline; } .foot button:focus-visible { outline: 2px solid #09090b; outline-offset: 2px; border-radius: 2px; }
    .foot svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="stage">
      <div class="page"><button class="open-btn" type="button" aria-haspopup="dialog" aria-expanded="false">Open Drawer</button></div>
      <div class="ov"></div>
      <div class="drawer" role="dialog" aria-label="Drawer" aria-hidden="true">
        <div class="top">
          <button class="handle" type="button" aria-label="Close drawer" tabindex="-1"></button>
          <b>Unstyled drawer for React.</b>
          <p>This component can be used as a replacement for a Dialog on mobile and tablet devices.</p>
        </div>
        <div class="foot">
          <button type="button" tabindex="-1">GitHub<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></button>
          <button type="button" tabindex="-1">Twitter<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></button>
        </div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), drawer = root.querySelector('.drawer'), openBtn = root.querySelector('.open-btn'), handle = root.querySelector('.handle');
    const inner = [...drawer.querySelectorAll('button')];
    let open = false, sy = 0, st = 0, dy = 0, dragging = false;
    const H = () => drawer.offsetHeight;
    const setP = (p) => stage.style.setProperty('--p', p);
    const set = (o) => {
      open = o; stage.classList.toggle('open', o);
      drawer.style.setProperty('--y', o ? '0px' : '100%'); setP(o ? 1 : 0);
      drawer.setAttribute('aria-hidden', String(!o)); openBtn.setAttribute('aria-expanded', String(o));
      inner.forEach((b) => (b.tabIndex = o ? 0 : -1));
      if (o) setTimeout(() => open && handle.focus({ preventScroll: true }), 60); else openBtn.focus({ preventScroll: true });
    };
    openBtn.addEventListener('click', () => set(true));
    root.querySelector('.ov').addEventListener('click', () => set(false));
    handle.addEventListener('click', () => { if (!dy) set(false); });
    drawer.addEventListener('pointerdown', (e) => {
      if (!open || (e.target.closest('button') && e.target !== handle)) return;
      drawer.setPointerCapture(e.pointerId); sy = e.clientY; st = performance.now(); dy = 0; dragging = true; stage.classList.add('drag');
    });
    drawer.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      dy = e.clientY - sy;
      const y = dy >= 0 ? dy : -Math.max(0, 8 * (Math.log(-dy + 1) - 2));
      drawer.style.setProperty('--y', y + 'px');
      setP(Math.max(0, Math.min(1, 1 - y / H())));
    });
    const end = () => {
      if (!dragging) return;
      dragging = false; stage.classList.remove('drag');
      const v = dy / Math.max(1, performance.now() - st);
      if (dy > H() * .25 || (v > .4 && dy > 0)) set(false); else { drawer.style.setProperty('--y', '0px'); setP(1); }
      setTimeout(() => (dy = 0), 0);
    };
    drawer.addEventListener('pointerup', end); drawer.addEventListener('pointercancel', end);
    stage.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) set(false); });
  },
};
