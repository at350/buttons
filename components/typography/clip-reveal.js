export default {
  id: 'ty-clip-reveal',
  credit: 'Masked text reveal — a diagonal clip-path wipe swaps the gray word for a solid one, with a thin sweeping edge (Locomotive / Awwwards hero reveals)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      cursor: pointer;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 14px;
      padding: 18px 28px;
      display: inline-grid;
      position: relative;
      overflow: hidden;
      font: 600 30px/1 'Space Grotesk', Inter, system-ui, sans-serif;
      letter-spacing: -.02em;
      color: #c4c4c4;
      transition: border-color .3s, box-shadow .3s;
    }
    .btn:hover { border-color: #111; box-shadow: 0 8px 24px -12px rgba(0,0,0,.35); }
    .btn > span { grid-area: 1 / 1; white-space: nowrap; }
    .b {
      color: #111;
      clip-path: polygon(0 0, 0 0, -30% 100%, -30% 100%);
      transition: clip-path .7s cubic-bezier(.76, 0, .24, 1);
    }
    .btn:hover .b, .btn:focus-visible .b { clip-path: polygon(0 0, 130% 0, 100% 100%, -30% 100%); }
    .btn.on .b { clip-path: polygon(0 0, 130% 0, 100% 100%, -30% 100%); color: #4f46e5; }
    .edge {
      position: absolute;
      top: -20%;
      bottom: -20%;
      left: 0;
      width: 2px;
      background: #111;
      transform: translateX(-10px) skewX(-18deg);
      transition: transform .7s cubic-bezier(.76, 0, .24, 1), opacity .2s .5s;
      opacity: 0;
    }
    .btn:hover .edge, .btn:focus-visible .edge {
      transform: translateX(260px) skewX(-18deg);
      opacity: 1;
      transition: transform .7s cubic-bezier(.76, 0, .24, 1), opacity 0s;
    }
    .btn.on .edge { background: #4f46e5; }
    .btn:active .b { clip-path: polygon(0 0, 70% 0, 40% 100%, -30% 100%); transition-duration: .25s; }
    .btn:focus-visible { outline: 2px solid #4f46e5; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false"><span class="a" aria-hidden="true">Discover</span><span class="b">Discover</span><i class="edge" aria-hidden="true"></i></button>`,
  init(root) {
    const btn = root.querySelector('.btn');
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
