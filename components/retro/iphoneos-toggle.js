export default {
  id: 'rt-iphoneos-toggle',
  credit: 'iOS 5 / 6 Settings — grouped table cell on the pinstripe background with the glossy blue ON / OFF switch',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 16px 12px; border-radius: 12px; display: inline-block;
      background: repeating-linear-gradient(90deg, #c5ccd4 0 4px, #cbd2d8 4px 7px); }
    .row { width: 276px; height: 45px; background: #fff; border: 1px solid #abaaa9; border-radius: 10px; padding: 0 9px 0 9px; display: flex; align-items: center; gap: 10px;
      box-shadow: 0 1px 0 rgba(255,255,255,.8); font: bold 17px "Helvetica Neue", Helvetica, Arial, sans-serif; color: #000; }
    .ico { width: 29px; height: 29px; border-radius: 6px; flex: none; display: grid; place-items: center;
      background: linear-gradient(#ffb04c, #f7931e 50%, #ef7f09 51%, #f58f1c); box-shadow: inset 0 0 0 1px rgba(0,0,0,.18); }
    .ico svg { width: 21px; height: 21px; fill: #fff; transform: rotate(90deg); filter: drop-shadow(0 -1px 0 rgba(0,0,0,.25)); }
    .lbl { flex: 1; white-space: nowrap; }
    .sw { position: relative; width: 79px; height: 27px; flex: none; border-radius: 14px; border: none; padding: 0; overflow: hidden; cursor: pointer; outline: none;
      background: #eee; box-shadow: inset 0 0 0 1px rgba(0,0,0,.28); }
    .track { position: absolute; top: 0; left: -50px; width: 129px; height: 27px; display: flex; transition: left .22s cubic-bezier(.32,.72,0,1); }
    .on, .off { width: 64.5px; height: 27px; flex: none; text-align: center; font: bold 16px/28px "Helvetica Neue", Helvetica, Arial, sans-serif; }
    .on { background: linear-gradient(#0060d1, #007fea 55%, #2b98f5); color: #fff; text-shadow: 0 -1px 0 rgba(0,0,0,.45); padding-right: 14.5px; box-shadow: inset 0 2px 3px rgba(0,0,0,.45); }
    .off { background: linear-gradient(#cbcbcb, #f0f0f0 55%, #fdfdfd); color: #808080; text-shadow: 0 1px 0 #fff; padding-left: 14.5px; box-shadow: inset 0 2px 3px rgba(0,0,0,.28); }
    .knob { position: absolute; top: -1px; left: 0; width: 29px; height: 29px; border-radius: 50%; transition: left .22s cubic-bezier(.32,.72,0,1);
      background: linear-gradient(#cecece, #fbfbfb); box-shadow: 0 0 0 1px rgba(0,0,0,.3), 0 1px 2px rgba(0,0,0,.35); }
    .knob::after { content: ""; position: absolute; inset: 1px; border-radius: 50%; background: linear-gradient(#ffffff, #e9e9e9 60%, #dcdcdc); }
    .sw:active .knob::after { background: linear-gradient(#ececec, #d6d6d6 60%, #cacaca); }
    .sw[aria-checked="true"] .track { left: 0; }
    .sw[aria-checked="true"] .knob { left: 50px; }
    .sw:focus-visible { box-shadow: inset 0 0 0 1px rgba(0,0,0,.28), 0 0 0 3px rgba(0,127,234,.45); }
  `,
  html: `
    <div class="stage">
      <div class="row">
        <span class="ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg></span>
        <span class="lbl">Airplane Mode</span>
        <button class="sw" type="button" role="switch" aria-checked="false" aria-label="Airplane Mode">
          <span class="track"><span class="on">ON</span><span class="off">OFF</span></span>
          <span class="knob"></span>
        </button>
      </div>
    </div>`,
  init(root) {
    const sw = root.querySelector('.sw');
    sw.addEventListener('click', () => sw.setAttribute('aria-checked', sw.getAttribute('aria-checked') === 'true' ? 'false' : 'true'));
  },
};
