export default {
  id: 'rt-netscape-badge',
  credit: '88×31 web badges — "Netscape Now!" with the Navigator N-and-meteor tile (click to run the throbber) and "800×600"',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #c0c0c0; padding: 12px; border-radius: 12px; display: inline-flex; gap: 8px; }
    .b { width: 88px; height: 31px; padding: 0; margin: 0; border: none; cursor: pointer; position: relative; overflow: hidden; display: block; outline: none;
      font-family: Verdana, Geneva, Arial, sans-serif; text-align: left; }
    .b:focus-visible { outline: 1px dotted #000; outline-offset: 2px; }
    .b:active { filter: brightness(.85); }
    .ns { background: #000; box-shadow: inset 1px 1px #8c8cff, inset -1px -1px #00004a; }
    .tile { position: absolute; left: 2px; top: 2px; width: 27px; height: 27px; overflow: hidden; background: linear-gradient(#000022, #00105a 60%, #0a3a8a); }
    .tile svg { display: block; }
    .met { opacity: .25; }
    .ns[aria-pressed="true"] .met { opacity: 1; animation: streak .9s linear infinite; }
    .ns[aria-pressed="true"] .met:nth-of-type(2) { animation-delay: -.3s; } .ns[aria-pressed="true"] .met:nth-of-type(3) { animation-delay: -.6s; }
    .ns .w { position: absolute; left: 32px; top: 3px; font: bold 9px/10px Arial, Helvetica, sans-serif; color: #fff; letter-spacing: -.2px; }
    .ns .now { position: absolute; left: 32px; top: 12px; font: italic 900 15px/16px "Arial Black", Arial, sans-serif; color: #ffcc00; letter-spacing: -.5px; text-shadow: 1px 1px #c04000; }
    .res { background: #008080; box-shadow: inset 1px 1px #80ffff, inset -1px -1px #004040; color: #fff; }
    .res .t { position: absolute; left: 0; right: 0; top: 3px; text-align: center; font: 7px/8px Verdana, Arial, sans-serif; letter-spacing: .2px; }
    .res .r { position: absolute; left: 0; right: 0; top: 14px; text-align: center; font: bold 12px/14px Arial, sans-serif; color: #ffff00; text-shadow: 1px 1px #000; }
    .res .r span { grid-area: 1 / 1; } .res .r { display: grid; justify-items: center; }
    .res .r .alt { visibility: hidden; }
    .res[aria-pressed="true"] { background: #800080; box-shadow: inset 1px 1px #ff80ff, inset -1px -1px #400040; }
    .res[aria-pressed="true"] .r .alt { visibility: visible; } .res[aria-pressed="true"] .r .def { visibility: hidden; }
    @keyframes streak { from { transform: translate(-24px, 14px); } to { transform: translate(26px, -16px); } }
  `,
  html: `
    <div class="stage">
      <button class="b ns" type="button" aria-pressed="false" aria-label="Netscape Now!">
        <span class="tile"><svg width="27" height="27" viewBox="0 0 27 27" aria-hidden="true">
          <circle cx="4" cy="5" r=".5" fill="#fff"/><circle cx="21" cy="4" r=".5" fill="#fff"/><circle cx="9" cy="2.5" r=".4" fill="#9cf"/><circle cx="24" cy="12" r=".4" fill="#fff"/>
          <path d="M-4 27C2 17 14 14 31 15v12z" fill="#0c6e8c"/><path d="M-4 27C2 17 14 14 31 15" fill="none" stroke="#5fe0ff" stroke-width=".8"/>
          <path class="met" d="M2 22L16 9" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".9"/><path class="met" d="M8 24L20 13" stroke="#bfefff" stroke-width=".8" stroke-linecap="round"/><path class="met" d="M0 16L9 8" stroke="#bfefff" stroke-width=".7" stroke-linecap="round"/>
          <text x="13.5" y="21" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="bold" font-size="19" fill="#fff" stroke="#00105a" stroke-width=".5">N</text>
        </svg></span>
        <span class="w">Netscape</span><span class="now">Now!</span>
      </button>
      <button class="b res" type="button" aria-pressed="false" aria-label="Best viewed at 800 by 600"><span class="t">BEST VIEWED AT</span><span class="r"><span class="def">800 x 600</span><span class="alt">1024 x 768</span></span></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.b').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'))));
  },
};
