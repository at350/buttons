export default {
  id: 'rt-web20-beta',
  credit: 'Web 2.0 (c. 2006) — glossy gradient pill with "BETA" sticker and floor reflection',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { background: #fff; padding: 14px 20px 6px; border-radius: 12px; display: inline-block; }
    .wrap { position: relative; display: inline-block; padding-top: 6px; padding-right: 20px; }
    .btn { position: relative; height: 40px; padding: 0 26px; border: 1px solid #1a6bb3; border-radius: 20px; cursor: pointer;
      font: bold 17px "Lucida Grande", "Trebuchet MS", Verdana, sans-serif; color: #fff; text-shadow: 0 -1px 0 rgba(0,0,0,.35); letter-spacing: -.3px;
      background: linear-gradient(#8ec9f5 0%, #3f9ce8 50%, #1a7bd2 51%, #3da1f0 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,.7), 0 1px 2px rgba(0,0,0,.25); }
    .btn::before { content: ""; position: absolute; left: 4px; right: 4px; top: 1px; height: 48%; border-radius: 18px 18px 6px 6px; background: linear-gradient(rgba(255,255,255,.75), rgba(255,255,255,.15)); pointer-events: none; }
    .btn:hover { filter: brightness(1.08); }
    .btn:active, .btn.down { background: linear-gradient(#1a7bd2 0%, #3f9ce8 50%, #8ec9f5 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,.35); }
    .btn:focus-visible { outline: 3px solid #ffb400; outline-offset: 2px; }
    .beta { position: absolute; right: 0; top: 0; background: linear-gradient(#ffd45a, #f7a400); color: #7a3b00; font: bold 9px Verdana, Arial, sans-serif; letter-spacing: 1px;
      padding: 3px 7px; border-radius: 9px; transform: rotate(14deg); box-shadow: 0 1px 2px rgba(0,0,0,.3); border: 1px solid #fff; pointer-events: none; }
    .refl { height: 22px; margin: 2px 20px 0 0; border-radius: 0 0 20px 20px; opacity: .35;
      background: linear-gradient(#3da1f0 0%, #1a7bd2 49%, #3f9ce8 50%, #8ec9f5 100%);
      -webkit-mask-image: linear-gradient(#000, transparent 80%); mask-image: linear-gradient(#000, transparent 80%); pointer-events: none; }
  `,
  html: `
    <div class="stage">
      <div class="wrap">
        <button class="btn" type="button" aria-pressed="false">Try it now</button>
        <span class="beta">BETA</span>
      </div>
      <div class="refl"></div>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => { const on = b.classList.toggle('down'); b.setAttribute('aria-pressed', String(on)); });
  },
};
