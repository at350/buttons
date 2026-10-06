export default {
  id: 'dp-finder-folder',
  credit: 'macOS Finder folder in 3D — the front flap hinges open on rotateX and a document slides up out of the back',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 44px 44px 30px;
      perspective: 700px;
      background: #f5f5f7;
      border-radius: 12px;
    }
    .folder {
      position: relative;
      width: 112px;
      height: 84px;
      border: 0;
      padding: 0;
      background: transparent;
      cursor: pointer;
      transform-style: preserve-3d;
      transform: rotateX(8deg);
      transition: transform .4s;
    }
    .folder:hover { transform: rotateX(14deg) translateZ(8px); }
    .back {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-radius: 6px 8px 8px 8px;
      background: linear-gradient(180deg, #4fa8ff, #2f8cf0);
      transform: translateZ(-6px);
    }
    .back::before {
      content: '';
      position: absolute;
      left: 0;
      top: -9px;
      width: 44px;
      height: 14px;
      border-radius: 6px 10px 0 0;
      background: #4fa8ff;
    }
    .doc {
      position: absolute;
      left: 14px;
      right: 14px;
      top: 10px;
      bottom: 8px;
      border-radius: 3px;
      background: #fff;
      transform: translateZ(-3px) translateY(0);
      box-shadow: 0 0 0 1px rgba(0, 0, 0, .06);
      transition: transform .5s cubic-bezier(.3, 1.3, .4, 1) .05s;
      background-image: repeating-linear-gradient(180deg, transparent 0 10px, #d4d4d8 10px 12px);
      background-size: 60% 100%;
      background-position: 50% 16px;
      background-repeat: no-repeat;
    }
    .folder[aria-expanded="true"] .doc { transform: translateZ(-3px) translateY(-42px) rotateX(-6deg); }
    .front {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 64px;
      border-radius: 6px 6px 8px 8px;
      transform-origin: bottom;
      background: linear-gradient(180deg, #7cc4ff, #49a3f7);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .5), 0 -2px 6px rgba(0, 0, 0, .12);
      transform: rotateX(0deg);
      transition: transform .5s cubic-bezier(.3, 1.2, .4, 1);
    }
    .folder[aria-expanded="true"] .front { transform: rotateX(-34deg); }
    .folder:hover .front { box-shadow: inset 0 1px 0 rgba(255, 255, 255, .5), 0 -2px 6px rgba(0, 0, 0, .12), 0 0 0 2px rgba(0, 0, 0, 0); }
    .sh {
      position: absolute;
      left: 10px;
      right: 10px;
      bottom: -14px;
      height: 10px;
      border-radius: 50%;
      background: rgba(0, 0, 0, .25);
      filter: blur(5px);
      transform: translateZ(-20px);
    }
    .folder:focus-visible { outline: 0; }
    .folder:focus-visible .front { outline: 2px solid #1d4ed8; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <button class="folder" type="button" aria-expanded="false" aria-label="Open folder">
        <span class="sh"></span><span class="back"></span><span class="doc"></span><span class="front"></span>
      </button>
    </div>`,
  init(root) {
    const f = root.querySelector('.folder');
    f.addEventListener('click', () => f.setAttribute('aria-expanded', String(f.getAttribute('aria-expanded') !== 'true')));
  },
};
