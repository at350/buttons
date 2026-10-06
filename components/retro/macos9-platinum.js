export default {
  id: 'rt-macos9-platinum',
  credit: 'Mac OS 8 / 9 (Platinum) — dialog with pinstriped title bar, close / zoom / collapse boxes and the heavy default-button ring',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 14px; border-radius: 12px; background: #6e6eae; display: inline-block; }
    .win { width: 236px; background: #dddddd; border: 1px solid #000; box-shadow: 1px 1px 0 #000, inset 1px 1px #fff, inset -1px -1px #999;
      font: 12px/14px Charcoal, Chicago, "Geneva", "Helvetica Neue", Helvetica, sans-serif; color: #000; -webkit-font-smoothing: none; }
    .tb { height: 19px; display: flex; align-items: center; gap: 4px; padding: 0 3px; border-bottom: 1px solid #000; position: relative;
      background: #dddddd; }
    .stripes { flex: 1; height: 11px; background: repeating-linear-gradient(180deg, #fff 0 1px, #999 1px 2px); box-shadow: inset 0 -1px #dddddd; }
    .win.off .stripes { visibility: hidden; }
    .ttl { padding: 0 6px; white-space: nowrap; }
    .box { width: 13px; height: 13px; flex: none; border: 1px solid #000; padding: 0; margin: 0; border-radius: 0; cursor: default; outline: none; position: relative;
      background: linear-gradient(135deg, #999 0%, #ddd 45%, #fff 100%); box-shadow: inset 1px 1px #666, inset -1px -1px #fff; }
    .box:active { background: linear-gradient(135deg, #444, #888); box-shadow: inset 1px 1px #222, inset -1px -1px #aaa; }
    .box:focus-visible { outline: 1px solid #6b8fd6; outline-offset: 1px; }
    .zoom::after { content: ""; position: absolute; left: 1px; top: 1px; width: 6px; height: 6px; border: 1px solid #000; border-width: 0 1px 1px 0; }
    .shade::after { content: ""; position: absolute; left: 1px; right: 1px; top: 4px; height: 3px; border-top: 1px solid #000; border-bottom: 1px solid #000; }
    .win.off .box { visibility: hidden; }
    .body { height: 74px; position: relative; overflow: hidden; transition: height .18s; }
    .win.shaded .body { height: 0; }
    .btns { position: absolute; right: 12px; bottom: 12px; display: flex; gap: 12px; align-items: center; }
    .ring { padding: 2px; border: 3px solid #000; border-radius: 9px; box-shadow: inset 0 0 0 1px #777; background: #ddd; }
    .btn { min-width: 64px; height: 20px; padding: 0 10px; margin: 0; border: 1px solid #000; border-radius: 4px; color: #000; cursor: default; outline: none;
      font: inherit; -webkit-font-smoothing: none; background: #dddddd;
      box-shadow: inset 1px 1px #fff, inset 2px 2px #eee, inset -1px -1px #888, inset -2px -2px #aaa; }
    .btn:active { background: #777; color: #fff; box-shadow: inset 1px 1px #444, inset 2px 2px #555, inset -1px -1px #999, inset -2px -2px #888; }
    .btn:focus-visible { outline: 2px solid #9fb2d9; outline-offset: 1px; }
  `,
  html: `
    <div class="stage">
      <div class="win">
        <div class="tb">
          <button class="box close" type="button" aria-label="Close box"></button>
          <span class="stripes"></span><span class="ttl">Save Changes</span><span class="stripes"></span>
          <button class="box zoom" type="button" aria-label="Zoom box"></button>
          <button class="box shade" type="button" aria-label="Collapse box" aria-pressed="false"></button>
        </div>
        <div class="body">
          <div class="btns">
            <button class="btn" type="button">Cancel</button>
            <span class="ring"><button class="btn" type="button">OK</button></span>
          </div>
        </div>
      </div>
    </div>`,
  init(root) {
    const win = root.querySelector('.win'), stage = root.querySelector('.stage'), shade = root.querySelector('.shade');
    shade.addEventListener('click', () => { const on = win.classList.toggle('shaded'); shade.setAttribute('aria-pressed', String(on)); });
    stage.addEventListener('pointerdown', (e) => win.classList.toggle('off', !win.contains(e.target)));
    let t = 0;
    root.querySelector('.close').addEventListener('click', () => { win.style.visibility = 'hidden'; clearTimeout(t); t = setTimeout(() => { win.style.visibility = ''; }, 700); });
    return () => clearTimeout(t);
  },
};
