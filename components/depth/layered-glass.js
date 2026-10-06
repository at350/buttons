export default {
  id: 'dp-layered-glass',
  credit: 'Layered glass button — three translucent plates separate along Z on hover and slam back together on press',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative;
      padding: 36px 56px;
      border-radius: 12px;
      overflow: hidden;
      perspective: 800px;
      background: linear-gradient(135deg, #0ea5e9, #8b5cf6 50%, #f43f5e);
    }
    .stage::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(90deg, transparent 0 14px, rgba(255, 255, 255, .12) 14px 16px);
    }
    .btn {
      position: relative;
      width: 170px;
      height: 54px;
      border: 0;
      padding: 0;
      background: transparent;
      cursor: pointer;
      transform-style: preserve-3d;
      transform: rotateX(0) rotateY(0);
      transition: transform .5s cubic-bezier(.3, 1.2, .4, 1);
    }
    .btn:hover { transform: rotateX(-14deg) rotateY(16deg); }
    .btn:active { transform: rotateX(-4deg) rotateY(4deg) translateZ(-10px); transition-duration: .1s; }
    .plate {
      position: absolute;
      inset: 0;
      border-radius: 14px;
      background: rgba(255, 255, 255, .16);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, .6), inset 0 0 0 1px rgba(255, 255, 255, .25), 0 10px 24px rgba(0, 0, 0, .18);
      transform: translateZ(0);
      transition: transform .5s cubic-bezier(.3, 1.2, .4, 1), background .3s;
    }
    .btn:hover .p1 { transform: translateZ(0); }
    .btn:hover .p2 { transform: translateZ(18px); }
    .btn:hover .p3 { transform: translateZ(36px); }
    .btn:active .plate { transform: translateZ(0); transition-duration: .1s; }
    .p3 {
      display: grid;
      place-items: center;
      color: #fff;
      font: 700 16px/1 'Space Grotesk', system-ui, sans-serif;
      letter-spacing: .06em;
      text-transform: uppercase;
      text-shadow: 0 2px 8px rgba(0, 0, 0, .25);
    }
    .btn[aria-pressed="true"] .plate { background: rgba(255, 255, 255, .5); }
    .btn[aria-pressed="true"] .p3 { color: #312e81; text-shadow: none; }
    .btn:focus-visible { outline: 0; }
    .btn:focus-visible .p3 { box-shadow: inset 0 0 0 2px #fff, 0 10px 24px rgba(0, 0, 0, .18); }
  `,
  html: `
    <div class="stage">
      <button class="btn" type="button" aria-pressed="false">
        <span class="plate p1"></span><span class="plate p2"></span><span class="plate p3">Layers</span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
