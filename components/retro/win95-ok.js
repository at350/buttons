export default {
  id: 'rt-win95-ok',
  credit: 'Windows 95 — standard push button (OK / Cancel)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #c0c0c0; padding: 14px; border-radius: 12px; display: inline-flex; gap: 6px; }
    .btn {
      font: 11px "MS Sans Serif", Tahoma, Arial, sans-serif;
      color: #000; background: #c0c0c0; min-width: 75px; height: 23px; padding: 0 12px;
      border: none; position: relative; cursor: default; outline: none;
      box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf;
    }
    .btn.default { box-shadow: 0 0 0 1px #000, inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf; }
    .btn:active, .btn.down {
      box-shadow: inset 1px 1px #0a0a0a, inset -1px -1px #fff, inset 2px 2px #808080, inset -2px -2px #dfdfdf;
      padding: 1px 11px 0 13px;
    }
    .btn:focus-visible::after, .btn.down::after {
      content: ""; position: absolute; inset: 4px; border: 1px dotted #000;
    }
    .btn:active::after { inset: 4px; }
  `,
  html: `
    <div class="stage">
      <button class="btn default" type="button" aria-pressed="false">OK</button>
      <button class="btn" type="button" aria-pressed="false">Cancel</button>
    </div>`,
  init(root) {
    root.querySelectorAll('.btn').forEach((b) => {
      b.addEventListener('click', () => {
        root.querySelectorAll('.btn').forEach((o) => { o.classList.remove('down'); o.setAttribute('aria-pressed', 'false'); });
        b.classList.add('down');
        b.setAttribute('aria-pressed', 'true');
      });
    });
  },
};
