export default {
  id: 'rt-iphoneos-toggle',
  credit: 'iPhone OS 1 – iOS 6 — skeuomorphic glossy ON / OFF switch in a grouped table cell',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 14px 18px; border-radius: 12px; display: inline-block;
      background: repeating-linear-gradient(90deg, #c5ccd3 0 2px, #cfd5dc 2px 4px, #d6dbe1 4px 6px); }
    .row { background: #fff; border: 1px solid #a9abae; border-radius: 10px; padding: 9px 10px; display: flex; align-items: center; gap: 14px;
      font: bold 17px "Helvetica Neue", Helvetica, Arial, sans-serif; color: #000; }
    .sw { position: relative; width: 94px; height: 27px; border-radius: 14px; border: none; padding: 0; overflow: hidden; cursor: pointer;
      box-shadow: inset 0 2px 3px rgba(0,0,0,.45), 0 1px 0 #fff; background: linear-gradient(#b9bcc1, #e8e9eb); }
    .track { position: absolute; top: 0; left: -67px; width: 161px; height: 27px; display: flex; transition: left .18s cubic-bezier(.3,.8,.4,1); }
    .on, .off { width: 80px; height: 27px; line-height: 27px; font: bold 15px/27px "Helvetica Neue", Helvetica, Arial, sans-serif; letter-spacing: .5px; text-align: center; }
    .on { background: linear-gradient(#1a5cd4, #2f81ec 60%, #4a9bf5); color: #fff; text-shadow: 0 -1px 0 rgba(0,0,0,.4); padding-right: 14px; box-shadow: inset 0 2px 3px rgba(0,0,0,.4); }
    .off { background: linear-gradient(#c2c5ca, #ebecee); color: #7a7f87; text-shadow: 0 1px 0 #fff; padding-left: 14px; box-shadow: inset 0 2px 3px rgba(0,0,0,.25); }
    .knob { position: absolute; top: 1px; left: 1px; width: 25px; height: 25px; border-radius: 50%; transition: left .18s cubic-bezier(.3,.8,.4,1);
      background: linear-gradient(#fbfbfb, #d6d6d6); box-shadow: 0 1px 1px rgba(0,0,0,.5), inset 0 1px 0 #fff, inset 0 -1px 0 #aaa; }
    .knob::after { content: ""; position: absolute; inset: 3px; border-radius: 50%; background: linear-gradient(#fff 0%, #e4e4e4 50%, #cfcfcf 100%); }
    .sw[aria-checked="true"] .track { left: 0; }
    .sw[aria-checked="true"] .knob { left: 68px; }
    .sw:focus-visible { outline: 2px solid #2f81ec; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="row">Airplane Mode
        <button class="sw" type="button" role="switch" aria-checked="false" aria-label="Airplane Mode">
          <div class="track"><div class="on">ON</div><div class="off">OFF</div></div>
          <div class="knob"></div>
        </button>
      </div>
    </div>`,
  init(root) {
    const sw = root.querySelector('.sw');
    sw.addEventListener('click', () => sw.setAttribute('aria-checked', sw.getAttribute('aria-checked') === 'true' ? 'false' : 'true'));
  },
};
