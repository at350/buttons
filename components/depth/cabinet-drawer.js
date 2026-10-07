export default {
  id: 'dp-cabinet-drawer',
  credit: '3D filing cabinet — click the handle and the drawer slides out along Z, its side walls appearing as it comes',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 30px 60px 34px 44px;
      perspective: 800px;
      background: #e7e5e4;
      border-radius: 12px;
    }
    .cab {
      position: relative;
      width: 150px;
      height: 110px;
      transform-style: preserve-3d;
      transform: rotateX(-10deg) rotateY(-22deg);
    }
    .wall { position: absolute; background: #334155; }
    .w-back {
      inset: 0;
      transform: translateZ(-70px);
      background: #1e293b;
    }
    .w-left {
      top: 0;
      bottom: 0;
      left: 0;
      width: 70px;
      transform-origin: left;
      transform: rotateY(90deg);
      background: #475569;
    }
    .w-right {
      top: 0;
      bottom: 0;
      right: 0;
      width: 70px;
      transform-origin: right;
      transform: rotateY(-90deg);
      background: #293548;
    }
    .w-top {
      left: 0;
      right: 0;
      top: 0;
      height: 70px;
      transform-origin: top;
      transform: rotateX(-90deg);
      background: #64748b;
    }
    .w-bot {
      left: 0;
      right: 0;
      bottom: 0;
      height: 70px;
      transform-origin: bottom;
      transform: rotateX(90deg);
      background: #0f172a;
    }
    .w-front {
      inset: 0; background: transparent; border: 8px solid #475569; border-radius: 3px;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .35), 0 0 0 .5px rgba(255, 255, 255, .08);
    }
    .w-front::after { content: ''; position: absolute; inset: -8px; border-radius: 3px; pointer-events: none;
      background: linear-gradient(180deg, rgba(255, 255, 255, .12), transparent 30%); -webkit-mask: linear-gradient(#000 0 0); }
    .drawer {
      position: absolute;
      inset: 8px;
      border: 0;
      padding: 0;
      background: transparent;
      cursor: pointer;
      transform-style: preserve-3d;
      transform: translateZ(0);
      transition: transform .7s cubic-bezier(.3, 1.1, .4, 1);
    }
    .drawer:hover { transform: translateZ(10px); }
    .drawer[aria-expanded="true"] { transform: translateZ(72px); }
    .drawer[aria-expanded="true"]:hover { transform: translateZ(64px); }
    .d { position: absolute; }
    .d-front {
      inset: 0;
      border-radius: 4px;
      background: linear-gradient(180deg, #94a3b8, #64748b);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .45), inset 0 -2px 0 rgba(0, 0, 0, .25);
      display: grid;
      place-items: center;
    }
    .d-left {
      top: 2px;
      bottom: 2px;
      left: 0;
      width: 70px;
      transform-origin: left;
      transform: rotateY(90deg) translateZ(0);
      background: #cbd5e1;
    }
    .d-right {
      top: 2px;
      bottom: 2px;
      right: 0;
      width: 70px;
      transform-origin: right;
      transform: rotateY(-90deg);
      background: #94a3b8;
    }
    .d-bot {
      left: 2px;
      right: 2px;
      bottom: 0;
      height: 70px;
      transform-origin: bottom;
      transform: rotateX(90deg);
      background: #e2e8f0;
    }
    .d-back {
      inset: 2px;
      transform: translateZ(-70px);
      background: #94a3b8;
    }
    /* recessed bin pull: chrome lip over a dark finger cup */
    .handle {
      position: relative;
      width: 54px;
      height: 17px;
      margin-top: 14px;
      border-radius: 3px 3px 27px 27px / 3px 3px 16px 16px;
      background: linear-gradient(180deg, #f8fafc 0, #e2e8f0 22%, #94a3b8 60%, #cbd5e1 100%);
      box-shadow: 0 3px 4px rgba(15, 23, 42, .45), inset 0 1px 0 #fff;
    }
    .handle::after {
      content: ''; position: absolute; left: 5px; right: 5px; top: 5px; bottom: 3px;
      border-radius: 1px 1px 22px 22px / 1px 1px 11px 11px;
      background: linear-gradient(180deg, #0f172a, #334155);
      box-shadow: inset 0 2px 3px rgba(0, 0, 0, .7);
    }
    /* stamped label holder with a typed index card */
    .tag {
      position: absolute;
      top: 12px;
      left: 50%;
      width: 46px;
      height: 20px;
      transform: translateX(-50%);
      padding: 2px;
      border-radius: 2px;
      background: linear-gradient(180deg, #e2e8f0, #94a3b8);
      box-shadow: 0 1px 1px rgba(15, 23, 42, .4), inset 0 1px 0 rgba(255, 255, 255, .8);
    }
    .tag b {
      display: grid; place-items: center; height: 100%;
      background: #fdf6e3; box-shadow: inset 0 1px 2px rgba(0, 0, 0, .25);
      font: 700 9px/1 'IBM Plex Mono', ui-monospace, monospace; letter-spacing: .06em; color: #1e3a8a;
    }
    /* hanging file folders inside the drawer; their tabs stand just proud of the drawer sides */
    .fo {
      position: absolute; left: 7px; right: 7px; bottom: 3px; height: 82px;
      background: linear-gradient(180deg, #f1d38b, #d9b45f);
      border-top: 1px solid #f8e3ad;
    }
    .fo::before {
      content: ''; position: absolute; top: -9px; left: var(--tx); width: 30px; height: 9px;
      border-radius: 3px 3px 0 0; background: inherit; border: 1px solid #f8e3ad; border-bottom: 0;
    }
    .fo.g { background: linear-gradient(180deg, #86efac, #4ade80); border-color: #bbf7d0; }
    .fo.g::before { border-color: #bbf7d0; }
    .fo.b { background: linear-gradient(180deg, #93c5fd, #60a5fa); border-color: #bfdbfe; }
    .fo.b::before { border-color: #bfdbfe; }
    .drawer:focus-visible { outline: 0; }
    .drawer:focus-visible .d-front { box-shadow: inset 0 0 0 2px #2563eb; }
  `,
  html: `
    <div class="stage">
      <div class="cab">
        <span class="wall w-back"></span><span class="wall w-left"></span><span class="wall w-right"></span><span class="wall w-top"></span><span class="wall w-bot"></span><span class="wall w-front"></span>
        <button class="drawer" type="button" aria-expanded="false" aria-label="Open drawer">
          <span class="d d-back"></span><span class="d d-left"></span><span class="d d-right"></span><span class="d d-bot"></span>
          <span class="d fo" style="--tx: 8px; transform: translateZ(-14px)"></span><span class="d fo b" style="--tx: 48px; transform: translateZ(-30px)"></span><span class="d fo g" style="--tx: 88px; transform: translateZ(-46px)"></span><span class="d fo" style="--tx: 30px; transform: translateZ(-60px)"></span>
          <span class="d d-front"><span class="tag"><b>A – F</b></span><span class="handle"></span></span>
        </button>
      </div>
    </div>`,
  init(root) {
    const d = root.querySelector('.drawer');
    d.addEventListener('click', () => d.setAttribute('aria-expanded', String(d.getAttribute('aria-expanded') !== 'true')));
  },
};
