const CHECK = 'M6 0h1v1h-1zM5 1h2v1h-2zM0 2h1v1h-1zM4 2h3v1h-3zM0 3h2v1h-2zM3 3h3v1h-3zM0 4h5v1h-5zM1 5h3v1h-3zM2 6h1v1h-1z';
// 12x12 radio bitmap: shadow / dark arcs top-left, highlight / light arcs bottom-right, white well, 4x4 dot
const RADIO = `
  <path class="well" d="M4 2h4v1h-4zM3 3h6v1h-6zM2 4h8v1h-8zM2 5h8v1h-8zM2 6h8v1h-8zM2 7h8v1h-8zM3 8h6v1h-6zM4 9h4v1h-4z"/>
  <path fill="#808080" d="M4 0h4v1h-4zM2 1h2v1h-2zM8 1h2v1h-2zM1 2h1v1h-1zM1 3h1v1h-1zM0 4h1v4h-1zM1 8h1v2h-1z"/>
  <path fill="#000" d="M4 1h4v1h-4zM2 2h2v1h-2zM8 2h1v1h-1zM2 3h1v1h-1zM1 4h1v4h-1zM2 8h1v1h-1z"/>
  <path fill="#dfdfdf" d="M9 2h1v2h-1zM10 4h1v4h-1zM9 8h1v1h-1zM2 9h2v1h-2zM8 9h2v1h-2zM4 10h4v1h-4z"/>
  <path fill="#fff" d="M10 2h1v2h-1zM11 4h1v4h-1zM10 8h1v2h-1zM2 10h2v1h-2zM8 10h2v1h-2zM4 11h4v1h-4z"/>
  <path class="dot" d="M5 4h2v1h-2zM4 5h4v2h-4zM5 7h2v1h-2z"/>`;
export default {
  id: 'rt-win95-checkbox',
  credit: 'Windows 95 — sunken 13×13 check boxes and 12×12 option buttons, pixel-for-pixel bitmaps',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #c0c0c0; padding: 12px 16px; border-radius: 12px; display: grid; gap: 7px;
      font: 11px/13px "MS Sans Serif", "Microsoft Sans Serif", Tahoma, Arial, sans-serif; -webkit-font-smoothing: none; color: #000; }
    label { display: flex; align-items: center; gap: 5px; cursor: default; position: relative; white-space: nowrap; user-select: none; }
    input { position: absolute; opacity: 0; width: 1px; height: 1px; margin: 0; pointer-events: none; }
    .box { width: 13px; height: 13px; background: #fff; flex: none; position: relative;
      box-shadow: inset 1px 1px #808080, inset -1px -1px #fff, inset 2px 2px #000, inset -2px -2px #dfdfdf; }
    .box svg { position: absolute; left: 3px; top: 3px; visibility: hidden; }
    input:checked + .box svg { visibility: visible; }
    .rad { width: 12px; height: 12px; flex: none; display: block; margin-right: 1px; }
    .rad .well { fill: #fff; }
    .rad .dot { fill: #000; visibility: hidden; }
    input:checked + .rad .dot { visibility: visible; }
    /* while the mouse is held the well turns button-face gray, exactly like the real control */
    label:active .box { background: #c0c0c0; }
    label:active .rad .well { fill: #c0c0c0; }
    .txt { padding: 0 2px; outline: 1px dotted transparent; }
    input:focus-visible ~ .txt { outline-color: #000; }
  `,
  html: `
    <div class="stage">
      <label><input type="checkbox" checked><span class="box"><svg width="7" height="7" viewBox="0 0 7 7" shape-rendering="crispEdges" aria-hidden="true"><path d="${CHECK}"/></svg></span><span class="txt">Show file extensions</span></label>
      <label><input type="checkbox"><span class="box"><svg width="7" height="7" viewBox="0 0 7 7" shape-rendering="crispEdges" aria-hidden="true"><path d="${CHECK}"/></svg></span><span class="txt">Hide system files</span></label>
      <label><input type="radio" name="v" checked><svg class="rad" viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true">${RADIO}</svg><span class="txt">Large icons</span></label>
      <label><input type="radio" name="v"><svg class="rad" viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true">${RADIO}</svg><span class="txt">Details</span></label>
    </div>`,
};
