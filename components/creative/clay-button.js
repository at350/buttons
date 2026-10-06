export default {
  id: 'cr-clay-button',
  credit: 'Claymorphism — puffy pastel 3D (outer drop + two inner shadows), Michal Malewicz / Hype4, 2021',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #fdf0f6; padding: 28px 40px 36px; border-radius: 12px; }
    .btn {
      display: grid; cursor: pointer; color: #4b2fa0; border: 0; border-radius: 28px; padding: 18px 34px 18px 28px;
      font: 800 17px/1 'DM Sans', system-ui, sans-serif; letter-spacing: -.01em;
      background: #c7b9ff;
      box-shadow: 0 14px 26px rgba(75, 47, 160, .24), inset -8px -8px 16px rgba(75, 47, 160, .28), inset 8px 8px 16px rgba(255, 255, 255, .75);
      transition: transform .35s cubic-bezier(.34, 1.56, .64, 1), box-shadow .35s cubic-bezier(.34, 1.56, .64, 1), background .3s ease, color .3s ease;
    }
    .btn > span { grid-area: 1 / 1; display: inline-flex; align-items: center; gap: 10px; white-space: nowrap; transition: opacity .2s ease, transform .3s cubic-bezier(.34, 1.56, .64, 1); }
    .btn svg { width: 20px; height: 20px; fill: currentColor; }
    .btn .b { opacity: 0; transform: scale(.6); }
    .btn:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 18px 30px rgba(75, 47, 160, .26), inset -8px -8px 16px rgba(75, 47, 160, .28), inset 8px 8px 16px rgba(255, 255, 255, .8); }
    .btn:active {
      transform: translateY(2px) scale(.95, .92); transition-duration: .12s;
      box-shadow: 0 4px 10px rgba(75, 47, 160, .2), inset -5px -5px 12px rgba(75, 47, 160, .32), inset 5px 5px 12px rgba(255, 255, 255, .7);
    }
    .btn[aria-pressed="true"] { background: #b5f0d5; color: #14633f; }
    .btn[aria-pressed="true"] .a { opacity: 0; transform: scale(.6); }
    .btn[aria-pressed="true"] .b { opacity: 1; transform: none; }
    .btn:focus-visible { outline: 3px solid #4b2fa0; outline-offset: 4px; }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false"><span class="a"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>Play</span><span class="b" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="3" width="5" height="18" rx="1.5"/><rect x="14" y="3" width="5" height="18" rx="1.5"/></svg>Pause</span></button></div>`,
  init(root) {
    const b = root.querySelector('.btn'), a = root.querySelector('.a'), c = root.querySelector('.b');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      a.toggleAttribute('aria-hidden', on); c.toggleAttribute('aria-hidden', !on);
    });
  },
};
