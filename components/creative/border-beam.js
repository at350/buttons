export default {
  id: 'cr-border-beam',
  credit: 'Border Beam — Magic UI: a gradient square riding offset-path: rect() inside a border-only mask (#ffaa40 → #9c40ff)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #09090b; padding: 28px 34px; border-radius: 12px; }
    .btn {
      position: relative; display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
      height: 44px; padding: 0 22px; border: 1px solid #27272a; border-radius: 12px; background: #09090b; color: #fafafa;
      font: 500 14px/1 Inter, system-ui, sans-serif; letter-spacing: -.005em; white-space: nowrap;
      transition: background .15s ease, border-color .15s ease, transform .15s ease;
    }
    .btn svg { width: 16px; height: 16px; flex: none; }
    .btn:hover { background: #18181b; }
    .btn:active { transform: scale(.98); }
    .btn:focus-visible { outline: 2px solid #9c40ff; outline-offset: 3px; }
    .beam {
      position: absolute; inset: -1px; border-radius: inherit; padding: 1.5px; overflow: hidden; pointer-events: none;
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
      mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
    }
    .beam::after {
      content: ''; position: absolute; width: 64px; aspect-ratio: 1;
      background: linear-gradient(to left, #ffaa40, #9c40ff, transparent);
      offset-path: rect(0 auto auto 0 round 64px); offset-distance: 8%;
      animation: beam 6s linear infinite; animation-play-state: paused;
    }
    .btn:hover .beam::after, .btn:focus-visible .beam::after { animation-play-state: running; }
    .btn[aria-pressed="true"] { border-color: #3f3f46; background: #18181b; }
    .btn[aria-pressed="true"] .beam::after { background: linear-gradient(to left, #ffaa40, #ff7a59, transparent); }
    @keyframes beam { from { offset-distance: 8%; } to { offset-distance: 108%; } }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false"><span class="beam" aria-hidden="true"></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"/><path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"/></svg>Deploy</button></div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
