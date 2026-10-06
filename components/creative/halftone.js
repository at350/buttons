export default {
  id: 'cr-halftone',
  credit: 'Halftone sweep — print-style dots that grow and merge into solid ink (Ana Tudor’s blend-multiply + contrast() halftone technique)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      position: relative; isolation: isolate; cursor: pointer; overflow: hidden; display: block;
      border: 2px solid #111; border-radius: 4px; background: #fff; padding: 0; width: 176px; height: 58px;
      font: 800 16px/1 'Space Grotesk', system-ui, sans-serif; letter-spacing: .16em; text-indent: .16em; text-transform: uppercase;
      transition: transform .12s ease;
    }
    .ht {
      position: absolute; inset: -2px; z-index: 0; pointer-events: none;
      background:
        radial-gradient(closest-side, #8c8c8c, #fff) 0 0 / 9px 9px,
        linear-gradient(105deg, #fff 0 34%, #000 66% 100%) 0 0 / 300% 100% no-repeat;
      background-blend-mode: multiply;
      filter: contrast(24);
      transition: background-position .9s cubic-bezier(.45, 0, .25, 1);
    }
    .btn:hover .ht, .btn:focus-visible .ht { background-position: 0 0, 62% 0; }
    .btn[aria-pressed="true"] .ht { background-position: 0 0, 100% 0; }
    .lbl { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 8px; color: #fff; mix-blend-mode: difference; }
    .lbl svg { width: 18px; height: 18px; }
    .btn:active { transform: translateY(1px); }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false"><span class="ht" aria-hidden="true"></span><span class="lbl"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>Print</span></button>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
