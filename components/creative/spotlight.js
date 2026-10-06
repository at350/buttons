export default {
  id: 'cr-spotlight',
  credit: 'Spotlight / flashlight hover — radial gradient follows the cursor, lighting text via background-clip',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      --x: 50%; --y: 50%;
      position: relative; overflow: hidden; cursor: pointer; border: 1px solid #27272a; border-radius: 14px;
      width: 240px; height: 72px; max-width: 100%; background: #0a0a0a; padding: 0;
      font: 800 22px/1 system-ui, sans-serif; letter-spacing: .22em; text-indent: .22em; text-transform: uppercase;
      transition: border-color .3s;
    }
    .btn::before {
      content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity .3s;
      background: radial-gradient(130px circle at var(--x) var(--y), rgba(255, 255, 255, .18), transparent 65%);
    }
    .btn:hover::before, .btn:focus-visible::before { opacity: 1; }
    .btn:hover { border-color: #52525b; }
    .t {
      position: relative; display: block; line-height: 70px; color: transparent;
      background: radial-gradient(90px circle at var(--x) var(--y), #fff 0%, #fde68a 35%, #3f3f46 70%);
      -webkit-background-clip: text; background-clip: text;
    }
    .btn[aria-pressed="true"] { background: #fde68a; }
    .btn[aria-pressed="true"] .t { background: #0a0a0a; -webkit-background-clip: text; background-clip: text; }
    .btn:active .t { transform: scale(.98); }
    .btn:focus-visible { outline: 2px solid #fde68a; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false"><span class="t">Explore</span></button>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('mousemove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--x', (e.clientX - r.left).toFixed(0) + 'px');
      b.style.setProperty('--y', (e.clientY - r.top).toFixed(0) + 'px');
    });
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
