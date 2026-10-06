export default {
  id: 'cr-border-beam',
  credit: 'Border beam — a comet orbiting the button outline (Magic UI "Border Beam", mask-composite)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #09090b; padding: 28px 36px; border-radius: 12px; }
    .btn {
      position: relative; cursor: pointer; border: 1px solid #27272a; border-radius: 12px; background: #09090b; color: #fafafa;
      padding: 16px 36px; font: 600 15px/1 system-ui, sans-serif; letter-spacing: .02em; transition: background .2s, border-color .2s;
    }
    .btn:hover { background: #111113; }
    .btn:active { background: #18181b; }
    .btn:focus-visible { outline: 2px solid #a78bfa; outline-offset: 3px; }
    .beam {
      position: absolute; inset: -1px; border-radius: 12px; padding: 2px; overflow: hidden; pointer-events: none;
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor; mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude;
    }
    .beam::before {
      content: ''; position: absolute; left: 50%; top: 50%; width: 300%; aspect-ratio: 1;
      transform: translate(-50%, -50%) rotate(0deg);
      background: conic-gradient(from 0deg, transparent 0 78%, #7c3aed 88%, #c4b5fd 96%, #fff 100%);
      animation: orbit 2.4s linear infinite; animation-play-state: paused; opacity: .35; transition: opacity .3s;
    }
    .btn:hover .beam::before, .btn:focus-visible .beam::before, .btn[aria-pressed="true"] .beam::before { animation-play-state: running; opacity: 1; }
    @keyframes orbit { to { transform: translate(-50%, -50%) rotate(360deg); } }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false"><span class="beam"></span>Deploy</button></div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
