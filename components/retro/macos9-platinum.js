// Mac OS 9 (Platinum) "Save changes" alert as Navigation Services drew it: a movable-modal window whose title bar is
// pinstripes only (dialogs have no close / zoom / collapse boxes), the yellow caution icon, the Charcoal message and
// the three buttons — "Don't Save" alone on the left, Cancel, and the default Save inside the heavy black ring.
const CAUTION = '<svg class="ic" width="32" height="32" viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true"><path d="M16 2 30 29H2z" fill="#000"/><path d="M16 6 27 27H5z" fill="#fc0"/><path d="M16 7 25.5 25H17z" fill="#ffe680" opacity=".6"/><path d="M14 11h4v9h-4zM14 22h4v3h-4z" fill="#000"/></svg>';
export default {
  id: 'rt-macos9-platinum',
  credit: 'Mac OS 9 (Platinum) — the "Save changes" alert: pinstriped movable-modal title bar, caution icon, Don\'t Save / Cancel / Save with the heavy default-button ring',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; max-width: 100%; padding: 14px; border-radius: 12px; background: #6666cc; display: inline-block; }
    .win { width: 336px; max-width: 100%; background: #dddddd; border: 1px solid #000; box-shadow: 1px 1px 0 #000, inset 1px 1px #fff, inset -1px -1px #999;
      font: 12px/15px Charcoal, Chicago, "Helvetica Neue", Helvetica, Arial, sans-serif; color: #000; transition: opacity .12s; }
    .win.gone { opacity: 0; pointer-events: none; }
    .tb { height: 15px; display: flex; align-items: center; padding: 0 3px; border-bottom: 1px solid #000; background: #dddddd; }
    .stripes { flex: 1; height: 9px; background: repeating-linear-gradient(180deg, #fff 0 1px, #999 1px 2px); box-shadow: inset 0 -1px #dddddd; }
    .body { display: flex; gap: 14px; padding: 12px 14px 0; }
    .ic { flex: none; }
    .msg { margin: 0; padding-top: 2px; }
    .btns { display: flex; align-items: center; gap: 10px; padding: 16px 12px 12px 52px; }
    .sp { flex: 1; }
    .ring, .btn { flex: none; }
    .ring { padding: 2px; border: 3px solid #000; border-radius: 9px; box-shadow: inset 0 0 0 1px #777; background: #ddd; }
    .btn { min-width: 68px; height: 20px; padding: 0 10px; margin: 0; border: 1px solid #000; border-radius: 4px; color: #000; cursor: default; outline: none; white-space: nowrap;
      font: inherit; background: #dddddd;
      box-shadow: inset 1px 1px #fff, inset 2px 2px #eee, inset -1px -1px #888, inset -2px -2px #aaa; }
    .btn:active { background: #777; color: #fff; box-shadow: inset 1px 1px #444, inset 2px 2px #555, inset -1px -1px #999, inset -2px -2px #888; }
    .btn:focus-visible { outline: 2px solid #9fb2d9; outline-offset: 1px; }
  `,
  html: `
    <div class="stage">
      <div class="win" role="alertdialog" aria-label="Save changes">
        <div class="tb"><span class="stripes"></span></div>
        <div class="body">${CAUTION}<p class="msg">Save changes to the document “Untitled 1” before closing?</p></div>
        <div class="btns">
          <button class="btn" type="button">Don’t Save</button>
          <span class="sp"></span>
          <button class="btn" type="button">Cancel</button>
          <span class="ring"><button class="btn" type="button">Save</button></span>
        </div>
      </div>
    </div>`,
  init(root) {
    const win = root.querySelector('.win'); let t = 0;
    root.querySelectorAll('.btn').forEach((b) => b.addEventListener('click', () => {
      win.classList.add('gone'); clearTimeout(t); t = setTimeout(() => win.classList.remove('gone'), 800);
    }));
    return () => clearTimeout(t);
  },
};
