export default {
  id: 'dp-key-stack',
  credit: 'Isometric Mac modifier keys — command, option and shift caps (Magic Keyboard legends: glyph top-right, word below) as preserve-3d boxes under a rotateX/rotateZ iso camera; each presses down independently',
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
      --h: 18px;
      position: relative;
      width: var(--w, 56px);
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
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      padding: 7px 7px 6px;
      background: #fcfcfa;
      color: #333;
      font: 500 9px/1 system-ui, -apple-system, 'Inter', sans-serif;
      letter-spacing: .01em;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .08), inset 0 -3px 0 rgba(0, 0, 0, .06);
    }
    .top svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .shift .top { align-items: flex-start; }
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
        <button class="key" type="button" aria-pressed="false" aria-label="Command" style="--w: 70px"><span class="base"></span><span class="face front"></span><span class="face side"></span><span class="face top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/></svg>command</span></button>
        <button class="key" type="button" aria-pressed="false" aria-label="Option" style="--w: 58px"><span class="base"></span><span class="face front"></span><span class="face side"></span><span class="face top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7"/><path d="M3 3h5.28a1 1 0 0 1 .948.684l5.544 16.632a1 1 0 0 0 .949.684H21"/></svg>option</span></button>
        <button class="key accent shift" type="button" aria-pressed="false" aria-label="Shift" style="--w: 84px"><span class="base"></span><span class="face front"></span><span class="face side"></span><span class="face top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z"/></svg>shift</span></button>
      </div>
    </div>`,
  init(root) {
    root.querySelectorAll('.key').forEach((k) => k.addEventListener('click', () => k.setAttribute('aria-pressed', String(k.getAttribute('aria-pressed') !== 'true'))));
  },
};
