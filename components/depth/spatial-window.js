export default {
  id: 'dp-spatial-window',
  credit: 'Apple visionOS spatial window — glass pane that tilts with the pointer, a toolbar ornament floating in front of it on its own Z plane',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative; padding: 30px 40px 30px; border-radius: 12px; overflow: hidden; perspective: 900px;
      background: radial-gradient(circle at 20% 20%, #fda4af, transparent 50%), radial-gradient(circle at 80% 70%, #93c5fd, transparent 50%), #312e81;
    }
    .win {
      --rx: 0deg; --ry: 0deg; position: relative; width: 240px; height: 120px; max-width: 100%; transform-style: preserve-3d;
      transform: rotateX(var(--rx)) rotateY(var(--ry)); margin-bottom: 26px;
    }
    .pane {
      position: absolute; inset: 0; border-radius: 22px; background: rgba(255, 255, 255, .22);
      -webkit-backdrop-filter: blur(20px) saturate(1.4); backdrop-filter: blur(20px) saturate(1.4);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .6), inset 0 0 0 1px rgba(255, 255, 255, .2), 0 30px 60px rgba(0, 0, 0, .35);
    }
    .row { position: absolute; left: 20px; height: 10px; border-radius: 5px; background: rgba(255, 255, 255, .7); transform: translateZ(6px); }
    .r1 { top: 22px; width: 110px; height: 14px; } .r2 { top: 48px; width: 170px; opacity: .6; } .r3 { top: 66px; width: 140px; opacity: .6; } .r4 { top: 84px; width: 90px; opacity: .6; }
    .orn {
      position: absolute; left: 50%; bottom: -26px; display: flex; gap: 6px; padding: 6px; border-radius: 999px; transform: translateX(-50%) translateZ(44px);
      background: rgba(255, 255, 255, .3); -webkit-backdrop-filter: blur(16px); backdrop-filter: blur(16px);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .6), 0 16px 30px rgba(0, 0, 0, .3); transform-style: preserve-3d;
    }
    .ob { width: 36px; height: 36px; border-radius: 50%; border: 0; cursor: pointer; color: #fff; background: rgba(255, 255, 255, .08); display: grid; place-items: center; transition: transform .2s cubic-bezier(.3, 1.4, .4, 1), background .2s; }
    .ob:hover { background: rgba(255, 255, 255, .3); transform: translateZ(10px) scale(1.08); }
    .ob:active { transform: translateZ(-8px) scale(.92); transition-duration: .08s; }
    .ob[aria-pressed="true"] { background: #fff; color: #312e81; }
    .ob svg { width: 18px; height: 18px; }
    .grab { position: absolute; left: 50%; bottom: -8px; width: 90px; height: 5px; border-radius: 3px; background: rgba(255, 255, 255, .8); transform: translateX(-50%) translateZ(20px); }
    .ob:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="win">
        <span class="pane"></span><span class="row r1"></span><span class="row r2"></span><span class="row r3"></span><span class="row r4"></span>
        <span class="grab"></span>
        <div class="orn" role="toolbar">
          <button class="ob" type="button" aria-pressed="false" aria-label="Back"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></button>
          <button class="ob" type="button" aria-pressed="false" aria-label="Favorite"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg></button>
          <button class="ob" type="button" aria-pressed="false" aria-label="Zoom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/></svg></button>
        </div>
      </div>
    </div>`,
  init(root) {
    const w = root.querySelector('.win');
    let raf = 0, hover = false, tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * .12; cy += (ty - cy) * .12;
      w.style.setProperty('--ry', cx.toFixed(2) + 'deg'); w.style.setProperty('--rx', cy.toFixed(2) + 'deg');
      raf = (hover || Math.abs(tx - cx) + Math.abs(ty - cy) > .05) ? requestAnimationFrame(tick) : 0;
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(tick); };
    w.addEventListener('pointerenter', () => { hover = true; start(); });
    w.addEventListener('pointermove', (e) => {
      const r = w.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - .5) * 16; ty = (.5 - (e.clientY - r.top) / r.height) * 12;
    });
    w.addEventListener('pointerleave', () => { hover = false; tx = 0; ty = 0; start(); });
    root.querySelectorAll('.ob').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'))));
    return () => cancelAnimationFrame(raf);
  },
};
