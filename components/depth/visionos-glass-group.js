export default {
  id: 'dp-visionos-glass-group',
  credit: 'Apple visionOS — frosted glass button group; hover glow follows the pointer, press pushes the button into the glass',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative; padding: 34px 40px; border-radius: 12px; overflow: hidden; perspective: 900px;
      background: #1b1d2a;
    }
    .stage::before, .stage::after {
      content: ''; position: absolute; width: 180px; height: 180px; border-radius: 50%; filter: blur(30px); opacity: .9;
    }
    .stage::before { left: -40px; top: -60px; background: #7c5cff; }
    .stage::after { right: -30px; bottom: -70px; background: #ff7a59; }
    .bar { --x: 50%; --y: 50%; position: relative; display: flex; gap: 8px; padding: 8px; transform-style: preserve-3d; }
    .glass {
      position: absolute; inset: 0; border-radius: 999px; pointer-events: none; transform: translateZ(-1px);
      background: rgba(255, 255, 255, .14);
      -webkit-backdrop-filter: blur(18px) saturate(1.5); backdrop-filter: blur(18px) saturate(1.5);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .45), inset 0 -1px 0 rgba(255, 255, 255, .1), 0 18px 40px rgba(0, 0, 0, .35);
    }
    .glow {
      position: absolute; inset: 0; border-radius: 999px; pointer-events: none;
      background: radial-gradient(90px 60px at var(--x) var(--y), rgba(255, 255, 255, .35), transparent 70%);
      opacity: 0; transition: opacity .3s;
    }
    .bar:hover .glow { opacity: 1; }
    .b {
      position: relative; width: 48px; height: 48px; border-radius: 50%; border: 0; cursor: pointer; color: #fff;
      background: rgba(255, 255, 255, .06); display: grid; place-items: center;
      transition: transform .25s cubic-bezier(.2, .9, .3, 1.3), background .2s, box-shadow .25s;
      transform: translateZ(0);
    }
    .b:hover { background: rgba(255, 255, 255, .22); transform: translateZ(14px) scale(1.06); box-shadow: 0 10px 22px rgba(0, 0, 0, .3); }
    .b:active { transform: translateZ(-10px) scale(.92); background: rgba(255, 255, 255, .1); box-shadow: inset 0 2px 8px rgba(0, 0, 0, .35); transition-duration: .08s; }
    .b[aria-pressed="true"] { background: rgba(255, 255, 255, .92); color: #1b1d2a; }
    .b svg { width: 22px; height: 22px; }
    .b:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="bar" role="toolbar">
        <span class="glass"></span><span class="glow"></span>
        <button class="b" type="button" aria-pressed="false" aria-label="Microphone"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button>
        <button class="b" type="button" aria-pressed="false" aria-label="Camera"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg></button>
        <button class="b" type="button" aria-pressed="false" aria-label="Share"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"/></svg></button>
        <button class="b" type="button" aria-pressed="false" aria-label="More"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const bar = root.querySelector('.bar');
    let raf = 0, hover = false, tx = 50, ty = 50, cx = 50, cy = 50;
    const tick = () => {
      cx += (tx - cx) * .2; cy += (ty - cy) * .2;
      bar.style.setProperty('--x', cx.toFixed(1) + '%'); bar.style.setProperty('--y', cy.toFixed(1) + '%');
      raf = hover ? requestAnimationFrame(tick) : 0;
    };
    bar.addEventListener('pointerenter', () => { hover = true; if (!raf) raf = requestAnimationFrame(tick); });
    bar.addEventListener('pointermove', (e) => {
      const r = bar.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width * 100; ty = (e.clientY - r.top) / r.height * 100;
    });
    bar.addEventListener('pointerleave', () => { hover = false; });
    root.querySelectorAll('.b').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'))));
    return () => cancelAnimationFrame(raf);
  },
};
