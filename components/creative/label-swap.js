export default {
  id: 'cr-label-swap',
  credit: 'Label slides out, a new one slides in — Stripe / Linear marketing CTA hover',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      position: relative; overflow: hidden; cursor: pointer; border: 0; border-radius: 10px;
      background: #635bff; color: #fff; padding: 0 26px; height: 50px;
      font: 600 15px/50px system-ui, sans-serif; letter-spacing: .01em;
      box-shadow: 0 1px 2px rgba(0, 0, 0, .15), inset 0 1px 0 rgba(255, 255, 255, .2);
      transition: background .25s, transform .15s;
    }
    .btn:hover { background: #0a2540; }
    .btn:active { transform: scale(.98); }
    .btn:focus-visible { outline: 2px solid #635bff; outline-offset: 3px; }
    .a, .b { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; transition: transform .45s cubic-bezier(.76, 0, .24, 1), opacity .3s; }
    .b { position: absolute; left: 26px; top: 0; transform: translateY(100%); opacity: 0; }
    .btn:hover .a, .btn:focus-visible .a { transform: translateY(-100%); opacity: 0; }
    .btn:hover .b, .btn:focus-visible .b { transform: translateY(0); opacity: 1; }
    .b svg { width: 14px; height: 14px; }
  `,
  html: `<button class="btn" type="button"><span class="a">Start now</span><span class="b">Let’s go<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></button>`,
};
