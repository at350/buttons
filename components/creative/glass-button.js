export default {
  id: 'cr-glass-button',
  credit: 'Glassmorphism — frosted backdrop-filter pane, hairline white border over drifting colour blobs (Michal Malewicz, 2020 / glassmorphism.com)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative; overflow: hidden; isolation: isolate;
      padding: 34px 44px; border-radius: 12px; background: #1f1147;
    }
    .blob {
      position: absolute; border-radius: 50%; filter: blur(22px); opacity: .9;
      animation: drift 6s ease-in-out infinite alternate; animation-play-state: paused;
    }
    .stage:hover .blob, .stage:has(.btn:focus-visible) .blob { animation-play-state: running; }
    .b1 { width: 130px; height: 130px; left: -30px; top: -40px; background: #ff5ea8; }
    .b2 { width: 150px; height: 150px; right: -40px; top: -20px; background: #4facfe; animation-delay: -2s; }
    .b3 { width: 110px; height: 110px; left: 40%; bottom: -60px; background: #f9f871; animation-delay: -4s; }
    @keyframes drift { to { transform: translate(36px, 24px) scale(1.2); } }
    .btn {
      position: relative; z-index: 1; cursor: pointer;
      display: grid; font: 600 15px/1 Inter, system-ui, sans-serif; letter-spacing: -.005em; color: #fff; padding: 16px 28px; border-radius: 14px;
      background: rgba(255, 255, 255, .14); border: 1px solid rgba(255, 255, 255, .38);
      -webkit-backdrop-filter: blur(14px) saturate(160%); backdrop-filter: blur(14px) saturate(160%);
      box-shadow: 0 8px 32px rgba(0, 0, 0, .3), inset 0 1px 0 rgba(255, 255, 255, .55);
      transition: background .25s, transform .2s, color .25s;
    }
    .btn:hover { background: rgba(255, 255, 255, .26); transform: translateY(-2px); }
    .btn:active { transform: translateY(0) scale(.97); }
    .btn[aria-pressed="true"] { background: rgba(255, 255, 255, .55); color: #1f1147; }
    .btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .btn > span { grid-area: 1 / 1; white-space: nowrap; text-align: center; transition: opacity .2s ease; }
    .btn .b, .btn[aria-pressed="true"] .a { opacity: 0; }
    .btn[aria-pressed="true"] .b { opacity: 1; }
  `,
  html: `
    <div class="stage">
      <span class="blob b1"></span><span class="blob b2"></span><span class="blob b3"></span>
      <button class="btn" type="button" aria-pressed="false"><span class="a">Subscribe</span><span class="b" aria-hidden="true">Subscribed</span></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn');
    const a = root.querySelector('.a'), c = root.querySelector('.b');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on)); a.toggleAttribute('aria-hidden', on); c.toggleAttribute('aria-hidden', !on);
    });
  },
};
