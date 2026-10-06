export default {
  id: 'cr-aurora-gradient',
  credit: 'Animated aurora gradient button — flowing background-position gradient ring + blurred under-glow (CodePen classic)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; overflow: hidden; isolation: isolate; padding: 30px 34px; border-radius: 12px; background: #070816; }
    .glow, .btn::before {
      background: linear-gradient(100deg, #3bf7c1, #2fb3ff 25%, #a855f7 50%, #f472b6 75%, #3bf7c1);
      background-size: 200% 100%;
      animation: flow 4s linear infinite; animation-play-state: paused;
    }
    .glow {
      position: absolute; left: 44px; right: 44px; top: 40px; bottom: 30px; z-index: -1; border-radius: 999px;
      filter: blur(18px); opacity: .35; transition: opacity .4s ease, transform .5s cubic-bezier(.2, .8, .2, 1);
    }
    .stage:hover .glow, .stage:has(.btn:focus-visible) .glow { opacity: .8; transform: scale(1.06, 1.25); }
    .stage:hover .glow, .stage:hover .btn::before, .stage:has(.btn:focus-visible) .glow, .stage:has(.btn:focus-visible) .btn::before { animation-play-state: running; }
    .btn {
      position: relative; display: grid; cursor: pointer; border: 0; border-radius: 999px; padding: 0; background: transparent; color: #fff;
      font: 600 15px/1 Inter, system-ui, sans-serif; letter-spacing: -.005em;
      transition: transform .2s cubic-bezier(.2, .8, .2, 1);
    }
    .btn::before { content: ''; position: absolute; inset: 0; border-radius: inherit; }
    .in {
      position: relative; grid-area: 1 / 1; display: grid; place-items: center; margin: 1.5px; height: 47px; padding: 0 26px;
      border-radius: 999px; background: #0c0e22; transition: background .3s ease;
    }
    .in > span { grid-area: 1 / 1; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; transition: opacity .25s ease, transform .35s cubic-bezier(.2, .8, .2, 1); }
    .in svg { width: 16px; height: 16px; }
    .b { opacity: 0; transform: translateY(6px); }
    .btn:hover .in { background: #12152e; }
    .btn:active { transform: scale(.97); }
    .btn[aria-pressed="true"] .in { background: rgba(12, 14, 34, .25); }
    .btn[aria-pressed="true"] .a { opacity: 0; transform: translateY(-6px); }
    .btn[aria-pressed="true"] .b { opacity: 1; transform: none; }
    .btn:focus-visible { outline: 2px solid #3bf7c1; outline-offset: 4px; }
    @keyframes flow { from { background-position: 0% 50%; } to { background-position: 200% 50%; } }
  `,
  html: `<div class="stage"><span class="glow" aria-hidden="true"></span><button class="btn" type="button" aria-pressed="false"><span class="in"><span class="a">Get early access</span><span class="b" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>You’re on the list</span></span></button></div>`,
  init(root) {
    const b = root.querySelector('.btn'), a = root.querySelector('.a'), c = root.querySelector('.b');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      a.toggleAttribute('aria-hidden', on); c.toggleAttribute('aria-hidden', !on);
    });
  },
};
