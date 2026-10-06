export default {
  id: 'cr-blob-morph',
  credit: 'Morphing blob — 8-value organic border-radius keyframes (the "fancy border radius" trick, 9elements), breathing only while hovered',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { position: relative; display: grid; place-items: center; width: 200px; height: 120px; }
    .blob {
      position: absolute; inset: 6px 14px; pointer-events: none;
      background: linear-gradient(135deg, #67e8f9, #a78bfa 55%, #f0abfc);
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      animation: morph 7s ease-in-out infinite; animation-play-state: paused;
      transition: transform .4s cubic-bezier(.34, 1.56, .64, 1), filter .4s;
    }
    .wrap:hover .blob, .wrap:has(.btn:focus-visible) .blob { animation-play-state: running; transform: scale(1.08); filter: saturate(1.3); }
    .btn {
      position: relative; cursor: pointer; border: 0; background: rgba(255, 255, 255, .85); color: #1e1b4b; border-radius: 999px;
      display: inline-flex; align-items: center; gap: 6px; padding: 14px 22px 14px 26px; font: 700 15px/1 'DM Sans', system-ui, sans-serif; letter-spacing: -.005em; white-space: nowrap;
      box-shadow: 0 6px 20px rgba(30, 27, 75, .15); transition: transform .2s, background .2s, color .2s;
    }
    .btn:hover { transform: translateY(-2px); }
    .btn:active { transform: scale(.96); }
    .btn[aria-pressed="true"] { background: #1e1b4b; color: #fff; }
    .btn:focus-visible { outline: 2px solid #1e1b4b; outline-offset: 3px; }
    @keyframes morph {
      0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      50% { border-radius: 50% 60% 30% 60% / 30% 70% 50% 50%; }
      75% { border-radius: 40% 30% 60% 50% / 70% 40% 60% 30%; }
    }
  `,
  html: `<div class="wrap"><span class="blob"></span><button class="btn" type="button" aria-pressed="false">Explore<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></button></div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
