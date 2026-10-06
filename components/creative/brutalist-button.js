export default {
  id: 'cr-brutalist-button',
  credit: 'Neo-brutalism — Gumroad "I want this!" button: #ff90e8, 1px black border, lifts onto a hard 4px shadow on hover',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { padding: 8px 10px 4px 10px; }
    .btn {
      position: relative; display: grid; cursor: pointer; color: #000;
      font: 500 16px/1.5 'Mabry Pro', 'DM Sans', system-ui, sans-serif; letter-spacing: 0;
      background: #ff90e8; border: 1px solid #000; border-radius: 4px; padding: 12px 16px;
      transition: transform .14s ease, box-shadow .14s ease, background-color .14s ease;
    }
    .btn > span { grid-area: 1 / 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px; white-space: nowrap; transition: opacity .14s ease; }
    .btn svg { width: 18px; height: 18px; }
    .btn .b { opacity: 0; }
    .btn:hover, .btn:focus-visible { transform: translate(-4px, -4px); box-shadow: 4px 4px 0 #000; }
    .btn:active { transform: translate(0, 0); box-shadow: 0 0 0 #000; }
    .btn[aria-pressed="true"] { background: #23a094; }
    .btn[aria-pressed="true"] .a { opacity: 0; }
    .btn[aria-pressed="true"] .b { opacity: 1; }
    .btn:focus-visible { outline: 2px solid #000; outline-offset: 3px; }
  `,
  html: `<div class="wrap"><button class="btn" type="button" aria-pressed="false"><span class="a">I want this!</span><span class="b" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>In your cart</span></button></div>`,
  init(root) {
    const b = root.querySelector('.btn'), a = root.querySelector('.a'), c = root.querySelector('.b');
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      a.toggleAttribute('aria-hidden', on); c.toggleAttribute('aria-hidden', !on);
    });
  },
};
