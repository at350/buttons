export default {
  id: 'cr-iso-cube',
  credit: '3D isometric cube button — preserve-3d faces that tilt on hover and sink on press',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 30px 44px 36px; perspective: 700px; }
    .cube {
      --w: 150px; --h: 54px; --d: 26px;
      position: relative; width: var(--w); height: var(--h); border: 0; background: transparent; padding: 0; cursor: pointer;
      transform-style: preserve-3d; transform: rotateX(-22deg) rotateY(28deg);
      transition: transform .5s cubic-bezier(.34, 1.4, .64, 1);
    }
    .cube:hover { transform: rotateX(-8deg) rotateY(8deg); }
    .cube:active { transform: rotateX(-8deg) rotateY(8deg) translateZ(-14px); }
    .cube[aria-pressed="true"] { transform: rotateX(-22deg) rotateY(-28deg); }
    .cube[aria-pressed="true"]:hover { transform: rotateX(-8deg) rotateY(-8deg); }
    .f { position: absolute; inset: 0; display: grid; place-items: center; font: 800 16px/1 system-ui, sans-serif; letter-spacing: .08em; text-transform: uppercase; }
    .front { background: #6366f1; color: #fff; transform: translateZ(calc(var(--d) / 2)); }
    .back { background: #3730a3; transform: rotateY(180deg) translateZ(calc(var(--d) / 2)); }
    .top { background: #a5b4fc; height: var(--d); top: auto; bottom: 100%; transform-origin: bottom; transform: rotateX(90deg); }
    .bottom { background: #312e81; height: var(--d); top: 100%; transform-origin: top; transform: rotateX(-90deg); }
    .right { background: #4338ca; width: var(--d); left: 100%; transform-origin: left; transform: rotateY(90deg); }
    .left { background: #818cf8; width: var(--d); left: auto; right: 100%; transform-origin: right; transform: rotateY(-90deg); }
    .cube:focus-visible { outline: 0; }
    .cube:focus-visible .front { outline: 3px solid #312e81; outline-offset: -6px; }
  `,
  html: `
    <div class="stage">
      <button class="cube" type="button" aria-pressed="false">
        <span class="f front">Rotate</span><span class="f back"></span>
        <span class="f top"></span><span class="f bottom"></span>
        <span class="f right"></span><span class="f left"></span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.cube');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
