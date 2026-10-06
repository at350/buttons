export default {
  id: 'cr-conic-border',
  credit: 'Rotating conic-gradient glow border — the "glowing border" CodePen effect',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #0b0f1a; padding: 28px 36px; border-radius: 12px; }
    .halo { position: relative; display: inline-block; }
    .halo::before {
      content: ''; position: absolute; inset: 4px; border-radius: 16px;
      background: conic-gradient(from 0deg, #00e5ff, #7c3aed, #ff00c8, #ffb800, #00e5ff);
      filter: blur(18px); opacity: .35; transition: opacity .3s;
    }
    .halo:hover::before { opacity: .8; }
    .wrap { position: relative; overflow: hidden; padding: 2px; border-radius: 14px; isolation: isolate; display: block; }
    .wrap::before {
      content: ''; position: absolute; left: 50%; top: 50%; width: 300%; aspect-ratio: 1;
      transform: translate(-50%, -50%) rotate(0deg);
      background: conic-gradient(from 0deg, transparent 0 55%, #00e5ff 70%, #ff00c8 85%, #ffb800 93%, transparent 100%);
      animation: orbit 3s linear infinite;
    }
    .halo:hover .wrap::before { animation-duration: 1.2s; }
    .btn {
      position: relative; z-index: 1; cursor: pointer; display: block;
      font: 600 15px/1 system-ui, sans-serif; color: #e5e7eb; letter-spacing: .05em;
      padding: 16px 36px; border: 0; border-radius: 12px; background: #0b0f1a;
      transition: color .2s, background .2s;
    }
    .btn:hover { color: #fff; background: #111827; }
    .btn:active { background: #1f2937; }
    .btn:focus-visible { outline: 2px solid #00e5ff; outline-offset: -6px; }
    @keyframes orbit { to { transform: translate(-50%, -50%) rotate(360deg); } }
  `,
  html: `<div class="stage"><span class="halo"><span class="wrap"><button class="btn" type="button">Glow</button></span></span></div>`,
};
