export default {
  id: 'rt-win95-checkbox',
  credit: 'Windows 95 — sunken checkbox and radio button controls',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #c0c0c0; padding: 12px 16px; border-radius: 12px; display: grid; gap: 8px;
      font: 11px "MS Sans Serif", Tahoma, Arial, sans-serif; color: #000; }
    label { display: flex; align-items: center; gap: 6px; cursor: default; position: relative; }
    input { position: absolute; opacity: 0; width: 1px; height: 1px; margin: 0; }
    .box, .dot { width: 13px; height: 13px; background: #fff; flex: none; position: relative; }
    .box { box-shadow: inset 1px 1px #808080, inset -1px -1px #fff, inset 2px 2px #0a0a0a, inset -2px -2px #dfdfdf; }
    input:active + .box, input:active + .dot { background: #c0c0c0; }
    input:checked + .box::after {
      content: ""; position: absolute; left: 4px; top: 1px; width: 3px; height: 7px;
      border: solid #000; border-width: 0 2px 2px 0; transform: rotate(45deg);
    }
    .dot { border-radius: 50%;
      box-shadow: inset 1px 1px #808080, inset -1px -1px #fff, inset 2px 2px #0a0a0a, inset -2px -2px #dfdfdf; }
    input:checked + .dot::after { content: ""; position: absolute; inset: 4px; border-radius: 50%; background: #000; }
    input:focus-visible ~ .txt { outline: 1px dotted #000; outline-offset: 0; }
    .txt { padding: 0 1px; }
    input:disabled ~ .txt { color: #808080; text-shadow: 1px 1px #fff; }
  `,
  html: `
    <div class="stage">
      <label><input type="checkbox" checked><span class="box"></span><span class="txt">Show file extensions</span></label>
      <label><input type="checkbox"><span class="box"></span><span class="txt">Hide system files</span></label>
      <label><input type="radio" name="v" checked><span class="dot"></span><span class="txt">Large icons</span></label>
      <label><input type="radio" name="v"><span class="dot"></span><span class="txt">Details</span></label>
    </div>`,
};
