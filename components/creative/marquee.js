export default {
  id: 'cr-marquee',
  credit: 'Marquee ticker button — label starts scrolling and inverts on hover (fashion e-com CTAs, e.g. SSENSE / Off-White drops)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      position: relative; overflow: hidden; cursor: pointer; width: 232px; height: 52px; max-width: 100%;
      border: 1.5px solid #111; border-radius: 0; background: #fff; color: #111; padding: 0;
      font: 700 13px/49px 'Space Grotesk', system-ui, sans-serif; letter-spacing: .2em; text-transform: uppercase;
      transition: background .3s cubic-bezier(.2, .8, .2, 1), color .3s cubic-bezier(.2, .8, .2, 1);
    }
    .track { display: flex; width: max-content; animation: tick 6s linear infinite; animation-play-state: paused; }
    .track span { display: inline-flex; align-items: center; gap: 14px; padding-left: 18px; white-space: nowrap; }
    .track svg { width: 12px; height: 12px; fill: currentColor; }
    .btn:hover, .btn:focus-visible { background: #111; color: #fff; }
    .btn:hover .track, .btn:focus-visible .track { animation-play-state: running; }
    .btn[aria-pressed="true"] { background: #ff3b00; border-color: #ff3b00; color: #fff; }
    .btn:active { transform: scale(.98); }
    .btn:focus-visible { outline: 2px solid #ff3b00; outline-offset: 3px; }
    @keyframes tick { to { transform: translateX(-50%); } }
  `,
  html: `<button class="btn" type="button" aria-pressed="false" aria-label="Add to bag"><span class="track" aria-hidden="true"></span></button>`,
  init(root) {
    const b = root.querySelector('.btn'), t = root.querySelector('.track');
    const star = '<svg viewBox="0 0 24 24"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/></svg>';
    t.innerHTML = Array.from({ length: 6 }, () => '<span>Add to bag' + star + '</span>').join('');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
