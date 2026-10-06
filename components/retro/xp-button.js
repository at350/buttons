export default {
  id: 'rt-xp-button',
  credit: 'Windows XP (Luna) — push buttons: orange hot-track glow on hover, blue ring on the default button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #ece9d8; padding: 14px; border-radius: 12px; display: inline-flex; gap: 6px; }
    .btn { width: 75px; height: 23px; padding: 0; margin: 0; border: 1px solid #003c74; border-radius: 3px; color: #000;
      font: 11px/1 Tahoma, "Segoe UI", Verdana, sans-serif; cursor: default; position: relative; outline: none;
      background: linear-gradient(180deg, #fff, #ecebe6 86%, #d6d0c5); }
    .btn span { display: inline-block; padding: 1px 2px; outline: 1px dotted transparent; }
    .btn.def { box-shadow: inset -1px 1px #cee7ff, inset 1px 2px #98b8ea, inset -2px 2px #bcd4f6, inset 1px -1px #89ade4, inset 2px -2px #89ade4; }
    .btn.def.focus span { outline-color: #000; }
    .btn:hover { box-shadow: inset -1px 1px #fff0cf, inset 1px 2px #fdd889, inset -2px 2px #fbc761, inset 2px -2px #e5a01a; }
    .btn:active { background: linear-gradient(180deg, #cdcac3, #e3e3db 8%, #e5e5de 94%, #f2f2f1); box-shadow: none; }
    .btn:active span { transform: translate(1px, 1px); }
  `,
  html: `
    <div class="stage">
      <button class="btn def" type="button"><span>OK</span></button>
      <button class="btn" type="button"><span>Cancel</span></button>
      <button class="btn" type="button"><span>Apply</span></button>
    </div>`,
  init(root) {
    const bs = [...root.querySelectorAll('.btn')];
    const take = (b, kb) => bs.forEach((o) => { o.classList.toggle('def', o === b); o.classList.toggle('focus', o === b && kb); });
    bs.forEach((b) => {
      b.addEventListener('pointerdown', () => take(b, false));
      b.addEventListener('keyup', (e) => { if (e.key === 'Tab') take(b, true); });
      b.addEventListener('focus', () => { if (b.matches(':focus-visible')) take(b, true); });
    });
    root.addEventListener('focusout', (e) => { if (!root.contains(e.relatedTarget)) take(bs[0], false); });
  },
};
