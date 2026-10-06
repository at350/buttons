export default {
  id: 'rt-win95-ok',
  credit: 'Windows 95 — standard push buttons (OK / Cancel); the black default frame follows focus',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #c0c0c0; padding: 14px; border-radius: 12px; display: inline-flex; gap: 6px; }
    .btn {
      font: 11px/1 "MS Sans Serif", "Microsoft Sans Serif", Tahoma, Arial, sans-serif; -webkit-font-smoothing: none;
      color: #000; background: #c0c0c0; width: 75px; height: 23px; padding: 0; margin: 0;
      border: none; border-radius: 0; position: relative; cursor: default; outline: none;
      box-shadow: inset -1px -1px #000, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
    }
    .btn span { position: relative; display: inline-block; padding: 1px 3px; }
    /* default / focused button: 1px black frame drawn inside the button, bevel moves in by one pixel */
    .btn.def { box-shadow: inset 0 0 0 1px #000, inset -2px -2px #000, inset 2px 2px #fff, inset -3px -3px #808080, inset 3px 3px #dfdfdf; }
    .btn:active { box-shadow: inset 0 0 0 1px #000, inset 0 0 0 2px #808080; }
    .btn:active span { transform: translate(1px, 1px); }
    /* focus rectangle: 1px dotted around the caption */
    .btn.def:focus-visible span, .btn.def.focus span { outline: 1px dotted #000; outline-offset: 0; }
  `,
  html: `
    <div class="stage">
      <button class="btn def" type="button"><span>OK</span></button>
      <button class="btn" type="button"><span>Cancel</span></button>
    </div>`,
  init(root) {
    const bs = [...root.querySelectorAll('.btn')];
    const take = (b) => bs.forEach((o) => { o.classList.toggle('def', o === b); o.classList.toggle('focus', o === b); });
    bs.forEach((b) => {
      b.addEventListener('pointerdown', () => take(b));
      b.addEventListener('focus', () => take(b));
    });
  },
};
