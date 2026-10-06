export default {
  id: 'rt-aqua-button',
  credit: 'Mac OS X 10.0–10.4 (Aqua) — clear and blue gel push buttons; the default one throbs, pressed turns deep blue',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 18px 18px; border-radius: 12px; display: inline-flex; gap: 12px; align-items: center;
      background: repeating-linear-gradient(180deg, #ededed 0 2px, #fafafa 2px 4px); }
    .btn { position: relative; width: 82px; height: 21px; padding: 0; border: none; border-radius: 11px; cursor: default; outline: none; isolation: isolate;
      font: 13px/21px "Lucida Grande", "Helvetica Neue", Helvetica, Arial, sans-serif; color: #000;
      background: linear-gradient(180deg, #f7f7f7 0%, #e5e5e5 45%, #d4d4d4 52%, #e8e8e8 75%, #ffffff 100%);
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.42), inset 0 -1px 2px rgba(255,255,255,.9), 0 1px 2px rgba(0,0,0,.28); }
    /* gel: glossy top lens and soft refracted glow along the bottom */
    .btn::before { content: ""; position: absolute; left: 5px; right: 5px; top: 1px; height: 10px; border-radius: 10px 10px 6px 6px; z-index: 2; pointer-events: none;
      background: linear-gradient(rgba(255,255,255,.98), rgba(255,255,255,.35)); }
    .btn::after { content: ""; position: absolute; left: 3px; right: 3px; bottom: 1px; height: 9px; border-radius: 0 0 9px 9px; z-index: 1; pointer-events: none;
      background: radial-gradient(ellipse at 50% 100%, rgba(255,255,255,.9), rgba(255,255,255,0) 70%); }
    .btn .t { position: relative; z-index: 3; }
    .btn .blue { position: absolute; inset: 0; border-radius: inherit; z-index: 0; opacity: 0; pointer-events: none;
      background: linear-gradient(180deg, #8cbcf8 0%, #4c8ff0 40%, #1b62e0 52%, #3d8cf4 78%, #8ed0ff 100%);
      box-shadow: inset 0 0 0 1px rgba(0,30,110,.6); }
    .btn.def .blue { opacity: 1; }
    .btn.def .blue::after { content: ""; position: absolute; inset: 0; border-radius: inherit;
      background: linear-gradient(180deg, #c4dcfb 0%, #9cc1f5 45%, #7ba9ef 52%, #a3caf8 78%, #d4ecff 100%); opacity: 0; animation: fade 1s ease-in-out infinite alternate; }
    .btn:active .blue { opacity: 1; animation: none; background: linear-gradient(180deg, #5a8fe0 0%, #2459c8 40%, #0b3fae 52%, #2a6fd8 78%, #6db1f0 100%); }
    .btn:active .blue::after { display: none; }
    .btn:focus-visible { box-shadow: inset 0 0 0 1px rgba(0,0,0,.42), 0 0 0 3px rgba(80,140,230,.65); }
    @keyframes fade { from { opacity: 0; } to { opacity: .75; } }
  `,
  html: `
    <div class="stage">
      <button class="btn" type="button"><span class="blue"></span><span class="t">Cancel</span></button>
      <button class="btn def" type="button"><span class="blue"></span><span class="t">OK</span></button>
    </div>`,
};
