export default {
  id: 'ty2-buzz-wrist',
  credit: 'Toy Story Buzz Lightyear wrist communicator (Thinkway) — press the red laser button: the emitter blinks and fires a beam; the green button flips the comms lid',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 280px; height: 150px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 80% 20%, #fff 0 1px, transparent 2px) 0 0 / 40px 36px, radial-gradient(ellipse at 30% 30%, #2c2a6b, #0d0b2a 70%); }
    .arm { position: absolute; left: -20px; top: 44px; width: 210px; height: 70px; border-radius: 30px;
      background: linear-gradient(#f9f9f4, #dedfd6 60%, #b9bab0); box-shadow: inset 0 -6px 10px rgba(0,0,0,.15), 0 8px 12px rgba(0,0,0,.5); }
    .band { position: absolute; top: 0; bottom: 0; width: 12px; background: linear-gradient(90deg, #4d2585, #6d3cb3, #4d2585); }
    .b1 { left: 38px; } .b2 { left: 168px; }
    .pad { position: absolute; left: 62px; top: 22px; width: 116px; height: 106px; border-radius: 22px 30px 30px 22px;
      background: linear-gradient(150deg, #ffffff, #e9eae2 50%, #c8c9bf); box-shadow: 0 6px 0 #9fa096, 0 10px 14px rgba(0,0,0,.45), inset 0 2px 0 #fff; }
    .trim { position: absolute; inset: 7px; border-radius: 16px 24px 24px 16px; border: 4px solid #67b346; box-shadow: inset 0 0 0 3px #4d2585; }
    .laser { position: absolute; left: 22px; top: 56px; width: 36px; height: 36px; border: 0; padding: 0; border-radius: 50%; cursor: pointer;
      background: radial-gradient(circle at 38% 30%, #ff9a8f, #e3262d 50%, #8f0f14); box-shadow: 0 5px 0 #5c070a, 0 0 0 4px #4d2585, 0 6px 6px rgba(0,0,0,.4);
      transition: transform .05s, box-shadow .05s; }
    .laser:active, .laser.down { transform: translateY(4px); box-shadow: 0 1px 0 #5c070a, 0 0 0 4px #4d2585; }
    .com { position: absolute; left: 64px; top: 20px; width: 34px; height: 22px; border: 0; padding: 0; border-radius: 8px; cursor: pointer;
      background: linear-gradient(#9be36f, #67b346 60%, #3f7f26); box-shadow: 0 4px 0 #2b5a19; transition: transform .05s, box-shadow .05s; }
    .com:active { transform: translateY(3px); box-shadow: 0 1px 0 #2b5a19; }
    .grill { position: absolute; left: 64px; top: 52px; width: 34px; height: 40px; border-radius: 6px; background: repeating-linear-gradient(#3a3d45 0 3px, #9da0a8 3px 6px);
      transform-origin: 50% 0; transition: transform .35s cubic-bezier(.3,1.5,.5,1); }
    .open .grill { transform: perspective(200px) rotateX(-70deg); }
    .screen { position: absolute; left: 66px; top: 54px; width: 30px; height: 36px; border-radius: 4px; background: linear-gradient(#0e2a14, #155c22); z-index: -0; }
    .screen::after { content: ''; position: absolute; left: 4px; right: 4px; top: 16px; height: 4px; background: #7dff8a; box-shadow: 0 0 6px #7dff8a; animation: scan 1s linear infinite; opacity: 0; }
    .open .screen::after { opacity: 1; }
    @keyframes scan { 50% { transform: scaleX(.3); } }
    .emit { position: absolute; left: 182px; top: 66px; width: 22px; height: 26px; border-radius: 6px 12px 12px 6px; background: linear-gradient(#e3e4dc, #9fa096); box-shadow: 0 3px 4px rgba(0,0,0,.4); }
    .emit i { position: absolute; right: 3px; top: 7px; width: 12px; height: 12px; border-radius: 50%; background: #5b0d12; transition: background .05s, box-shadow .05s; }
    .fire .emit i { background: #ff3a3a; box-shadow: 0 0 10px 4px rgba(255,40,40,.9); }
    .beam { position: absolute; left: 202px; top: 77px; width: 80px; height: 4px; border-radius: 2px; transform-origin: 0 50%; transform: scaleX(0); opacity: 0;
      background: linear-gradient(90deg, #fff, #ff3a3a 30%, rgba(255,58,58,.2)); box-shadow: 0 0 8px 2px rgba(255,40,40,.8); }
    .fire .beam { animation: beam .5s ease-out; }
    @keyframes beam { 0% { opacity: 1; transform: scaleX(0); } 40% { opacity: 1; transform: scaleX(1); } 100% { opacity: 0; transform: scaleX(1); } }
    button:focus-visible { outline: 2px solid #67b346; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="arm"><span class="band b1"></span><span class="band b2"></span></div>
      <div class="pad"><span class="trim"></span>
        <button class="laser" type="button" aria-label="laser"></button>
        <span class="screen"></span><span class="grill"></span>
        <button class="com" type="button" aria-pressed="false" aria-label="communicator"></button>
      </div>
      <div class="emit"><i></i></div>
      <span class="beam"></span>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), pad = root.querySelector('.pad'), com = root.querySelector('.com');
    let t = 0;
    root.querySelector('.laser').addEventListener('click', () => {
      st.classList.remove('fire'); void st.offsetWidth; st.classList.add('fire');
      clearTimeout(t); t = setTimeout(() => st.classList.remove('fire'), 520);
    });
    com.addEventListener('click', () => { const o = com.getAttribute('aria-pressed') !== 'true'; com.setAttribute('aria-pressed', String(o)); pad.classList.toggle('open', o); });
    return () => clearTimeout(t);
  },
};
