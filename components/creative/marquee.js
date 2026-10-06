export default {
  id: 'cr-marquee',
  credit: 'Marquee ticker button — endlessly scrolling label that pauses and inverts on hover (fashion e-com CTAs)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      position: relative; overflow: hidden; cursor: pointer; width: 240px; height: 52px; max-width: 100%;
      border: 2px solid #111; border-radius: 0; background: #111; color: #fff; padding: 0;
      font: 800 15px/48px system-ui, sans-serif; letter-spacing: .22em; text-transform: uppercase;
      transition: background .25s, color .25s;
    }
    .track { display: flex; width: max-content; animation: tick 7s linear infinite; }
    .track span { padding: 0 14px; white-space: nowrap; }
    .btn:hover { background: #fff; color: #111; }
    .btn:hover .track, .btn:focus-visible .track { animation-play-state: paused; }
    .btn[aria-pressed="true"] { background: #ff3b00; border-color: #ff3b00; color: #fff; }
    .btn[aria-pressed="true"] .track { animation-duration: 2.2s; animation-play-state: running; }
    .btn:active { transform: scale(.98); }
    .btn:focus-visible { outline: 2px solid #ff3b00; outline-offset: 3px; }
    @keyframes tick { to { transform: translateX(-50%); } }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="Buy now"><span class="track" aria-hidden="true"><span>Buy now ✦</span><span>Buy now ✦</span><span>Buy now ✦</span><span>Buy now ✦</span><span>Buy now ✦</span><span>Buy now ✦</span></span></button>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
