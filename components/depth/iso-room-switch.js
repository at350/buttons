export default {
  id: 'dp-iso-room-switch',
  credit: 'Isometric room light switch — floor and two walls in preserve-3d, furnished with a rug, a framed print and a night window; flipping the wall switch lights the room from the pendant lamp',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 40px 54px 22px;
      perspective: 1200px;
      background: #0b0b12;
      border-radius: 12px;
    }
    .room {
      position: relative;
      width: 120px;
      height: 120px;
      transform-style: preserve-3d;
      transform: translateY(26px) rotateX(60deg) rotateZ(-45deg);
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
    /* furnishings: a rug on the floor, a framed print and a window on the walls, a pendant lamp on a cord */
    .rug {
      position: absolute; left: 22px; top: 34px; width: 74px; height: 58px; border-radius: 3px; transform: translateZ(.5px);
      background: repeating-linear-gradient(90deg, #5b3a2e 0 6px, #6e4636 6px 12px), #5b3a2e;
      box-shadow: inset 0 0 0 3px #7c5a45, inset 0 0 0 5px #4a2f25; transition: filter .6s; filter: brightness(.55);
    }
    .room.lit .rug { filter: brightness(1.05); }
    .art {
      position: absolute; left: 16px; top: 18px; width: 38px; height: 28px; border: 3px solid #1f1a17; outline: 1px solid rgba(255, 255, 255, .25);
      background: #444 url(assets/wide/24.webp) center / cover no-repeat; transition: filter .6s; filter: brightness(.45);
    }
    .win {
      position: absolute; left: 26px; top: 16px; width: 38px; height: 40px; border: 3px solid #e8e2d6; border-radius: 2px;
      background: linear-gradient(90deg, transparent 15.5px, #e8e2d6 15.5px 18.5px, transparent 18.5px),
        radial-gradient(circle at 70% 30%, #fef9c3 0 3px, transparent 4px),
        linear-gradient(180deg, #0b1d4a, #1e3a8a);
      box-shadow: inset 0 0 6px rgba(0, 0, 0, .5); filter: brightness(.7); transition: filter .6s;
    }
    .room.lit .art, .room.lit .win { filter: none; }
    .cord { position: absolute; left: 59.5px; top: 60px; width: 1px; height: 26px; background: #111; transform-origin: top; transform: translateZ(98px) rotateX(-90deg); }
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
      width: 24px;
      height: 24px;
      margin: -12px;
      border-radius: 50%;
      background: radial-gradient(circle at 40% 35%, #57505f, #2a2530 70%);
      box-shadow: 0 0 0 1px rgba(0, 0, 0, .4);
      transform: translateZ(72px);
      transition: background .4s, box-shadow .4s;
    }
    .room.lit .lamp { background: radial-gradient(circle at 50% 50%, #fffbe6 0 5px, #e9c46a 6px, #b88a2e 70%); box-shadow: 0 0 22px 8px rgba(255, 220, 140, .75); }
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
        <span class="floor"></span><span class="rug"></span><span class="glow"></span><span class="wall wl"><span class="art"></span></span><span class="wall wr"><span class="win"></span></span><span class="cord"></span><span class="lamp"></span>
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
