export default {
  id: 'dp-key-stack',
  credit: 'Isometric keycap trio — ⌘ ⌥ ⇧ as preserve-3d boxes seen from a rotateX/rotateZ iso camera, each presses down independently',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 46px 48px 44px;
      perspective: 1200px;
      background: #f4f4f0;
      border-radius: 12px;
    }
    .iso {
      display: flex;
      gap: 16px;
      transform-style: preserve-3d;
      transform: rotateX(56deg) rotateZ(-42deg);
    }
    .key {
      --h: 20px;
      position: relative;
      width: 56px;
      height: 56px;
      border: 0;
      padding: 0;
      background: transparent;
      cursor: pointer;
      transform-style: preserve-3d;
      transform: translateZ(0);
      transition: transform .12s ease-out;
    }
    .key:hover { transform: translateZ(6px); }
    .key:active, .key[aria-pressed="true"] { transform: translateZ(-12px); }
    .face { position: absolute; }
    .top {
      inset: 0;
      border-radius: 8px;
      transform: translateZ(var(--h));
      display: grid;
      place-items: center;
      background: #fcfcfa;
      color: #333;
      font: 500 22px/1 'Inter', system-ui, sans-serif;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .08), inset 0 -3px 0 rgba(0, 0, 0, .06);
    }
    .accent .top { background: #ff6b4a; color: #fff; }
    .front {
      left: 0;
      right: 0;
      bottom: 0;
      height: var(--h);
      background: #cfcfc8;
      transform-origin: bottom;
      transform: rotateX(-90deg);
      border-radius: 0 0 4px 4px;
    }
    .side {
      top: 0;
      bottom: 0;
      left: 0;
      width: var(--h);
      background: #dedcd4;
      transform-origin: left;
      transform: rotateY(-90deg);
      border-radius: 4px 0 0 4px;
    }
    .accent .front { background: #b9472d; }
    .accent .side { background: #d8573a; }
    .base {
      position: absolute;
      inset: 0;
      border-radius: 8px;
      background: rgba(0, 0, 0, .14);
      transform: translateZ(-1px);
      filter: blur(1px);
    }
    .key:focus-visible { outline: 0; }
    .key:focus-visible .top { box-shadow: inset 0 0 0 2px #2563eb; }
  `,
  html: `
    <div class="stage">
      <div class="iso">
        <button class="key" type="button" aria-pressed="false" aria-label="Command"><span class="base"></span><span class="face front"></span><span class="face side"></span><span class="face top">⌘</span></button>
        <button class="key" type="button" aria-pressed="false" aria-label="Option"><span class="base"></span><span class="face front"></span><span class="face side"></span><span class="face top">⌥</span></button>
        <button class="key accent" type="button" aria-pressed="false" aria-label="Shift"><span class="base"></span><span class="face front"></span><span class="face side"></span><span class="face top">⇧</span></button>
      </div>
    </div>`,
  init(root) {
    root.querySelectorAll('.key').forEach((k) => k.addEventListener('click', () => k.setAttribute('aria-pressed', String(k.getAttribute('aria-pressed') !== 'true'))));
  },
};
