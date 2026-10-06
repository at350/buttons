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
    .handle {
      width: 46px;
      height: 12px;
      border-radius: 6px;
      background: linear-gradient(180deg, #f8fafc, #cbd5e1);
      box-shadow: 0 2px 4px rgba(0, 0, 0, .35);
    }
    .tag {
      position: absolute;
      top: 10px;
      left: 50%;
      width: 36px;
      height: 16px;
      transform: translateX(-50%);
      background: #fef3c7;
      border-radius: 2px;
    }
    .drawer:focus-visible { outline: 0; }
    .drawer:focus-visible .d-front { box-shadow: inset 0 0 0 2px #2563eb; }
  `,
  html: `
    <div class="stage">
      <div class="cab">
        <span class="wall w-back"></span><span class="wall w-left"></span><span class="wall w-right"></span><span class="wall w-top"></span><span class="wall w-bot"></span>
        <button class="drawer" type="button" aria-expanded="false" aria-label="Open drawer">
          <span class="d d-back"></span><span class="d d-left"></span><span class="d d-right"></span><span class="d d-bot"></span>
          <span class="d d-front"><span class="tag"></span><span class="handle"></span></span>
        </button>
      </div>
    </div>`,
  init(root) {
    const d = root.querySelector('.drawer');
    d.addEventListener('click', () => d.setAttribute('aria-expanded', String(d.getAttribute('aria-expanded') !== 'true')));
  },
};
