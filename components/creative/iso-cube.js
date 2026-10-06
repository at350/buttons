export default {
  id: 'cr-iso-cube',
  credit: 'Isometric 3D key — a true rotateX(55°) rotateZ(-45°) slab with extruded side faces that lifts on hover and sinks on press',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      position: relative; display: block; width: 196px; height: 132px; border: 0; padding: 0; background: transparent; cursor: pointer;
    }
    .btn:focus-visible { outline: 2px solid #3730a3; outline-offset: 2px; border-radius: 12px; }
    .iso {
      position: absolute; left: 50%; top: 50%; width: 150px; height: 56px; margin: -34px 0 0 -75px;
      transform-style: preserve-3d; transform: rotateX(55deg) rotateZ(-45deg);
    }
    .floor { position: absolute; inset: 4px; border-radius: 6px; background: rgba(30, 27, 75, .28); filter: blur(6px); transform: translate(6px, 6px); transition: transform .3s cubic-bezier(.2, .8, .2, 1), opacity .3s ease; }
    .top, .s { position: absolute; transition: transform .3s cubic-bezier(.34, 1.4, .64, 1), background-color .3s ease; }
    .top {
      inset: 0; display: grid; place-items: center; border-radius: 3px; transform: translateZ(16px);
      background: #818cf8; color: #fff; box-shadow: inset 0 0 0 1.5px rgba(255, 255, 255, .35);
      font: 800 20px/1 'Space Grotesk', system-ui, sans-serif; letter-spacing: .06em; text-transform: uppercase;
    }
    .s { transform-origin: 0 0; }
    .s.b { left: 0; top: 100%; width: 100%; height: 22px; background: #4f46e5; transform: rotateX(90deg) scaleY(.727); }
    .s.r { left: 100%; top: 0; width: 22px; height: 100%; background: #3730a3; transform: rotateY(-90deg) scaleX(.727); }
    .s.t { left: 0; top: 0; width: 100%; height: 22px; background: #312e81; transform: rotateX(90deg) scaleY(.727); }
    .s.l { left: 0; top: 0; width: 22px; height: 100%; background: #312e81; transform: rotateY(-90deg) scaleX(.727); }
    .btn:hover .top, .btn:focus-visible .top { transform: translateZ(22px); }
    .btn:hover .s.b, .btn:hover .s.t, .btn:focus-visible .s.b, .btn:focus-visible .s.t { transform: rotateX(90deg) scaleY(1); }
    .btn:hover .s.r, .btn:hover .s.l, .btn:focus-visible .s.r, .btn:focus-visible .s.l { transform: rotateY(-90deg) scaleX(1); }
    .btn:hover .floor { transform: translate(10px, 10px); opacity: .8; }
    .btn:active .top { transform: translateZ(4px); transition-duration: .08s; }
    .btn:active .s.b, .btn:active .s.t { transform: rotateX(90deg) scaleY(.18); transition-duration: .08s; }
    .btn:active .s.r, .btn:active .s.l { transform: rotateY(-90deg) scaleX(.18); transition-duration: .08s; }
    .btn:active .floor { transform: translate(2px, 2px); transition-duration: .08s; }
    .btn[aria-pressed="true"] .top { background: #34d399; }
    .btn[aria-pressed="true"] .s.b { background: #059669; }
    .btn[aria-pressed="true"] .s.r { background: #047857; }
  `,
  html: `
    <button class="btn" type="button" aria-pressed="false">
      <span class="iso" aria-hidden="true"><span class="floor"></span><span class="s t"></span><span class="s l"></span><span class="s b"></span><span class="s r"></span><span class="top">Build</span></span>
      <span style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)">Build</span>
    </button>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
