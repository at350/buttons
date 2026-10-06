export default {
  id: 'cr-conic-border',
  credit: 'Rotating conic-gradient glow border — the "glowing gradient border" CodePen effect (spins only while hovered)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; overflow: hidden; background: #0b0f1a; padding: 30px 36px; border-radius: 12px; isolation: isolate; }
    .halo { position: relative; display: block; border-radius: 14px; }
    .halo::before {
      content: ''; position: absolute; inset: 6px; border-radius: 16px; z-index: -1;
      background: conic-gradient(from 0deg, #00e5ff, #7c3aed, #ff00c8, #ffb800, #00e5ff);
      filter: blur(16px); opacity: .25; transition: opacity .35s ease;
    }
    .halo:hover::before, .halo:has(.btn:focus-visible)::before { opacity: .7; }
    .ring { position: relative; display: block; overflow: hidden; padding: 1.5px; border-radius: 14px; }
    .ring::before {
      content: ''; position: absolute; left: 50%; top: 50%; width: 260px; height: 260px; margin: -130px 0 0 -130px;
      background: conic-gradient(from 0deg, transparent 0 50%, #00e5ff 66%, #7c3aed 78%, #ff00c8 88%, #ffb800 95%, transparent 100%);
      animation: spin 3.2s linear infinite; animation-play-state: paused;
    }
    .halo:hover .ring::before, .halo:has(.btn:focus-visible) .ring::before { animation-play-state: running; }
    .btn {
      position: relative; display: inline-flex; align-items: center; gap: 8px; cursor: pointer; white-space: nowrap;
      font: 600 15px/1 Inter, system-ui, sans-serif; color: #e5e7eb; letter-spacing: -.005em;
      height: 48px; padding: 0 24px; border: 0; border-radius: 12.5px; background: #0b0f1a;
      transition: color .2s ease, background .2s ease;
    }
    .btn svg { width: 16px; height: 16px; color: #ffb800; }
    .btn:hover { color: #fff; background: #0f1524; }
    .btn:active { background: #151d31; }
    .btn:focus-visible { outline: 2px solid #00e5ff; outline-offset: 5px; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `,
  html: `<div class="stage"><span class="halo"><span class="ring"><button class="btn" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>Upgrade to Pro</button></span></span></div>`,
};
