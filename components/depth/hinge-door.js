export default {
  id: 'dp-hinge-door',
  credit: 'Hinged door button — swings ajar on hover and fully open on click (rotateY on the hinge edge), revealing a lit room behind',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 26px 40px 26px 110px;
      perspective: 800px;
      background: #1f2933;
      border-radius: 12px;
    }
    .frame {
      position: relative;
      width: 90px;
      height: 150px;
      padding: 6px;
      background: #3b2f2f;
      border-radius: 4px 4px 0 0;
      box-shadow: inset 0 0 0 2px #2a2020, 0 20px 40px rgba(0, 0, 0, .5);
      transform-style: preserve-3d;
    }
    .room {
      position: absolute;
      inset: 6px;
      background: linear-gradient(180deg, #fff3c4, #ffd27d 70%, #b9792e);
      transform: translateZ(-40px) scale(1.15);
      opacity: .6;
      transition: opacity .5s;
    }
    .room::before {
      content: '';
      position: absolute;
      left: 20%;
      right: 20%;
      bottom: 0;
      height: 30%;
      background: rgba(255, 255, 255, .35);
      filter: blur(6px);
    }
    .frame.open .room, .frame:hover .room { opacity: 1; }
    .door {
      position: absolute;
      inset: 6px;
      border: 0;
      padding: 0;
      cursor: pointer;
      transform-origin: left;
      transform-style: preserve-3d;
      background: linear-gradient(90deg, #8b5a2b, #a86d35 50%, #8b5a2b);
      box-shadow: inset 0 0 0 2px #6b4420, inset 0 0 0 8px #a86d35, inset 0 0 0 10px #6b4420;
      transform: rotateY(0deg);
      transition: transform .8s cubic-bezier(.3, 1.1, .4, 1);
    }
    .door:hover { transform: rotateY(-28deg); }
    .door[aria-expanded="true"], .door[aria-expanded="true"]:hover { transform: rotateY(-108deg); }
    .door::before {
      content: '';
      position: absolute;
      left: 14px;
      right: 14px;
      top: 14px;
      height: 44px;
      background: rgba(0, 0, 0, .18);
      box-shadow: inset 0 0 0 2px #6b4420;
    }
    .door::after {
      content: '';
      position: absolute;
      left: 14px;
      right: 14px;
      bottom: 14px;
      height: 54px;
      background: rgba(0, 0, 0, .18);
      box-shadow: inset 0 0 0 2px #6b4420;
    }
    .knob {
      position: absolute;
      right: 10px;
      top: 50%;
      width: 9px;
      height: 9px;
      margin-top: -4px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #fde68a, #b45309);
      transform: translateZ(4px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, .5);
    }
    .edge {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 6px;
      background: #5a3a1c;
      transform-origin: right;
      transform: rotateY(90deg);
    }
    .door:focus-visible { outline: 2px solid #fde68a; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="frame">
        <span class="room"></span>
        <button class="door" type="button" aria-expanded="false" aria-label="Open door"><span class="edge"></span><span class="knob"></span></button>
      </div>
    </div>`,
  init(root) {
    const d = root.querySelector('.door'), f = root.querySelector('.frame');
    d.addEventListener('click', () => {
      const o = d.getAttribute('aria-expanded') !== 'true';
      d.setAttribute('aria-expanded', String(o)); f.classList.toggle('open', o);
    });
  },
};
