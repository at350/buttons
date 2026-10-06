export default {
  id: 'dp-iso-room-switch',
  credit: 'Isometric room light switch — floor and two walls in preserve-3d; flipping the wall switch lights the room from the ceiling lamp',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 40px 54px 36px;
      perspective: 1200px;
      background: #0b0b12;
      border-radius: 12px;
    }
    .room {
      position: relative;
      width: 120px;
      height: 120px;
      transform-style: preserve-3d;
      transform: rotateX(60deg) rotateZ(-45deg);
    }
    .floor {
      position: absolute;
      inset: 0;
      background: #2a2620;
      transition: background .6s;
    }
    .wall { position: absolute; transition: background .6s; }
    .wl {
      left: 0;
      top: 0;
      width: 120px;
      height: 90px;
      transform-origin: top;
      transform: rotateX(-90deg) translateY(-90px);
      background: #3b3540;
    }
    .wr {
      right: 0;
      top: 0;
      width: 90px;
      height: 120px;
      transform-origin: right;
      transform: rotateY(-90deg) translateX(90px);
      background: #332e38;
    }
    .room.lit .floor { background: #b78b55; }
    .room.lit .wl { background: #d6c3a0; }
    .room.lit .wr { background: #c2ad88; }
    .glow {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 110px;
      height: 110px;
      margin: -55px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 220, 150, .7), transparent 70%);
      opacity: 0;
      transition: opacity .6s;
      transform: translateZ(1px);
    }
    .room.lit .glow { opacity: 1; }
    .lamp {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 18px;
      height: 18px;
      margin: -9px;
      border-radius: 50%;
      background: #3a3444;
      transform: translateZ(80px);
      transition: background .4s, box-shadow .4s;
    }
    .room.lit .lamp { background: #fff1b8; box-shadow: 0 0 20px 8px rgba(255, 230, 160, .9); }
    .sw {
      position: absolute;
      left: 70px;
      top: 0;
      width: 22px;
      height: 30px;
      border: 0;
      padding: 0;
      cursor: pointer;
      border-radius: 3px;
      background: #f3f0ea;
      transform-origin: top;
      transform: rotateX(-90deg) translateY(-70px) translateZ(1px);
      transform-style: preserve-3d;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .15);
    }
    .sw i {
      position: absolute;
      left: 7px;
      top: 6px;
      width: 8px;
      height: 14px;
      border-radius: 2px;
      background: #cfc9bd;
      transform: translateZ(3px) rotateX(18deg);
      transform-origin: top;
      transition: transform .2s, background .2s;
    }
    .sw[aria-checked="true"] i { transform: translateZ(3px) rotateX(-18deg); background: #e9c46a; }
    .sw:hover { background: #fff; }
    .sw:focus-visible { outline: 2px solid #e9c46a; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="room">
        <span class="floor"></span><span class="glow"></span><span class="wall wl"></span><span class="wall wr"></span><span class="lamp"></span>
        <button class="sw" type="button" role="switch" aria-checked="false" aria-label="Lights"><i></i></button>
      </div>
    </div>`,
  init(root) {
    const room = root.querySelector('.room'), sw = root.querySelector('.sw');
    sw.addEventListener('click', () => {
      const on = sw.getAttribute('aria-checked') !== 'true';
      sw.setAttribute('aria-checked', String(on)); room.classList.toggle('lit', on);
    });
  },
};
