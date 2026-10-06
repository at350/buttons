export default {
  id: 'dp-bar-slider',
  credit: '3D bar slider — a recessed rail seen in perspective with a cylindrical knob that rolls as it travels',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 30px 32px 26px;
      perspective: 600px;
      background: #1c1917;
      border-radius: 12px;
    }
    .scene {
      position: relative;
      width: 240px;
      height: 40px;
      transform-style: preserve-3d;
      transform: rotateX(38deg);
    }
    .rail {
      position: absolute;
      left: 0;
      right: 0;
      top: 12px;
      height: 16px;
      border-radius: 8px;
      background: #292524;
      box-shadow: inset 0 3px 6px rgba(0, 0, 0, .8), inset 0 -1px 0 rgba(255, 255, 255, .08);
    }
    .fill {
      position: absolute;
      left: 0;
      top: 14px;
      height: 12px;
      width: 50%;
      border-radius: 6px;
      background: linear-gradient(180deg, #fb923c, #ea580c);
      box-shadow: 0 0 14px rgba(251, 146, 60, .5);
      margin-left: 2px;
    }
    .knob {
      position: absolute;
      left: 50%;
      top: -8px;
      width: 40px;
      height: 40px;
      margin-left: -20px;
      border-radius: 50%;
      pointer-events: none;
      transform-style: preserve-3d;
      transform: translateZ(12px) rotate(var(--rot, 0deg));
      transition: transform .08s;
      background: radial-gradient(circle at 50% 50%, #44403c 0 30%, #a8a29e 31%, #e7e5e4 60%, #78716c 100%);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .3);
    }
    .knob::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: #57534e;
      transform: translateZ(-12px);
      box-shadow: 0 8px 14px rgba(0, 0, 0, .6);
    }
    .knob::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 4px;
      width: 3px;
      height: 8px;
      margin-left: -1.5px;
      border-radius: 2px;
      background: #ea580c;
    }
    .scene:hover .knob, .scene:focus-within .knob { transform: translateZ(18px) rotate(var(--rot, 0deg)); }
    input {
      position: absolute;
      left: -20px;
      right: -20px;
      top: 0;
      height: 40px;
      width: calc(100% + 40px);
      margin: 0;
      opacity: 0;
      cursor: ew-resize;
    }
    .ring {
      position: absolute;
      inset: -6px -8px;
      border-radius: 20px;
      pointer-events: none;
    }
    input:focus-visible + .ring { outline: 2px solid #fb923c; }
  `,
  html: `
    <div class="stage">
      <div class="scene">
        <span class="rail"></span><span class="fill"></span><span class="knob"></span>
        <input type="range" min="0" max="100" value="50" aria-label="Level"><span class="ring"></span>
      </div>
    </div>`,
  init(root) {
    const inp = root.querySelector('input'), fill = root.querySelector('.fill'), knob = root.querySelector('.knob');
    const draw = () => {
      const v = Number(inp.value);
      fill.style.width = `calc(${v}% - 2px)`;
      knob.style.left = v + '%';
      knob.style.setProperty('--rot', (v * 7.2) + 'deg');
    };
    inp.addEventListener('input', draw);
    draw();
  },
};
