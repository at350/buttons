export default {
  id: 'dp-floating-pill',
  credit: 'Floating pill — bobs above its own soft shadow, tilts toward the pointer while hovered and settles on release',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 30px 40px 26px; perspective: 700px; }
    .wrap { position: relative; width: 170px; height: 70px; display: grid; place-items: start center; }
    .pill {
      --rx: 0deg; --ry: 0deg; position: relative; height: 48px; padding: 0 26px; border: 0; border-radius: 999px; cursor: pointer;
      background: linear-gradient(180deg, #4f46e5, #4338ca); color: #fff; font: 700 15px/1 'DM Sans', system-ui, sans-serif; letter-spacing: .02em;
      display: flex; align-items: center; gap: 8px;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), inset 0 -2px 0 rgba(0, 0, 0, .2);
      animation: bob 2.6s ease-in-out infinite;
      transform: translateY(0) rotateX(var(--rx)) rotateY(var(--ry));
      transition: background .25s;
    }
    .pill:hover { animation-play-state: paused; }
    .pill:active { background: #3730a3; }
    .pill[aria-pressed="true"] { background: linear-gradient(180deg, #10b981, #059669); }
    .pill svg { width: 18px; height: 18px; }
    .sh { position: absolute; left: 50%; bottom: 0; width: 120px; height: 14px; border-radius: 50%; background: rgba(0, 0, 0, .35); filter: blur(6px); transform: translateX(-50%); animation: shbob 2.6s ease-in-out infinite; }
    .pill:hover + .sh { animation-play-state: paused; }
    @keyframes bob { 0%, 100% { transform: translateY(0) rotateX(var(--rx)) rotateY(var(--ry)); } 50% { transform: translateY(-10px) rotateX(var(--rx)) rotateY(var(--ry)); } }
    @keyframes shbob { 0%, 100% { transform: translateX(-50%) scale(1); opacity: .9; } 50% { transform: translateX(-50%) scale(.78); opacity: .55; } }
    .pill:focus-visible { outline: 2px solid #312e81; outline-offset: 3px; }
  `,
  html: `
    <div class="stage"><div class="wrap">
      <button class="pill" type="button" aria-pressed="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>Float</button>
      <span class="sh"></span>
    </div></div>`,
  init(root) {
    const p = root.querySelector('.pill');
    let raf = 0, hover = false, tx = 0, ty = 0, cx = 0, cy = 0;
    const tick = () => {
      cx += (tx - cx) * .15; cy += (ty - cy) * .15;
      p.style.setProperty('--ry', cx.toFixed(2) + 'deg'); p.style.setProperty('--rx', cy.toFixed(2) + 'deg');
      raf = (hover || Math.abs(tx - cx) + Math.abs(ty - cy) > .05) ? requestAnimationFrame(tick) : 0;
    };
    const start = () => { if (!raf) raf = requestAnimationFrame(tick); };
    p.addEventListener('pointerenter', () => { hover = true; start(); });
    p.addEventListener('pointermove', (e) => {
      const r = p.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - .5) * 30; ty = (.5 - (e.clientY - r.top) / r.height) * 30;
    });
    p.addEventListener('pointerleave', () => { hover = false; tx = 0; ty = 0; start(); });
    p.addEventListener('click', () => p.setAttribute('aria-pressed', String(p.getAttribute('aria-pressed') !== 'true')));
    return () => cancelAnimationFrame(raf);
  },
};
