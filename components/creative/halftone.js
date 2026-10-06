export default {
  id: 'cr-halftone',
  credit: 'Halftone dot-grid fill on hover — radial-gradient dots revealed by an expanding clip-path circle',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      position: relative; isolation: isolate; cursor: pointer; overflow: hidden;
      border: 2px solid #111; border-radius: 4px; background: #fff; padding: 18px 36px;
      font: 800 16px/1 system-ui, sans-serif; letter-spacing: .14em; text-transform: uppercase;
    }
    .btn::before {
      content: ''; position: absolute; inset: -4px; z-index: 0;
      background:
        radial-gradient(circle, #111 2.6px, transparent 2.9px) 0 0 / 9px 9px,
        radial-gradient(circle, #111 1.6px, transparent 1.9px) 4.5px 4.5px / 9px 9px;
      clip-path: circle(0 at 0% 100%);
      transition: clip-path .6s cubic-bezier(.4, 0, .2, 1);
    }
    .btn:hover::before, .btn:focus-visible::before, .btn[aria-pressed="true"]::before { clip-path: circle(150% at 0% 100%); }
    .btn span { position: relative; z-index: 1; color: #111; transition: color .3s, text-shadow .3s; }
    .btn:hover span, .btn:focus-visible span, .btn[aria-pressed="true"] span { color: #fff; -webkit-text-stroke: .6px #111; text-shadow: 0 0 2px #111, 0 0 6px #111; }
    .btn:active { transform: translateY(1px); }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false"><span>Print</span></button>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
