export default {
  id: 'ph-crosswalk',
  credit: 'US pedestrian "push to cross" button — silver dome on a yellow Polara-style housing',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 18px 22px; border-radius: 12px; background: linear-gradient(#5f6a73, #434c54); }
    .box {
      position: relative; width: 92px; height: 124px; border-radius: 8px;
      background: linear-gradient(160deg, #ffd21f, #f0b400 60%, #d79d00);
      box-shadow: 0 2px 3px rgba(0,0,0,.4), 0 10px 20px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.5), inset 0 -2px 0 rgba(0,0,0,.2);
    }
    .arrow { position: absolute; left: 50%; top: 10px; width: 38px; height: 16px; margin-left: -19px; fill: #111; }
    .led {
      position: absolute; left: 50%; top: 34px; width: 10px; height: 10px; margin-left: -5px; border-radius: 50%;
      background: #5a3200; box-shadow: inset 0 1px 2px rgba(0,0,0,.6); transition: background .1s, box-shadow .1s;
    }
    .led.on { background: #ff6b1a; box-shadow: 0 0 8px 2px rgba(255,120,30,.9); animation: fade 1.4s .3s forwards; }
    @keyframes fade { to { background: #5a3200; box-shadow: inset 0 1px 2px rgba(0,0,0,.6); } }
    .collar {
      position: absolute; left: 50%; top: 52px; width: 64px; height: 64px; margin-left: -32px; border-radius: 50%;
      background: radial-gradient(circle at 50% 50%, #0f0f0f 0 44%, #8a8d92 47%, #d9dcdf 52%, #74777c 60%);
      box-shadow: inset 0 2px 4px rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.4);
    }
    .dome {
      position: absolute; left: 7px; top: 7px; width: 50px; height: 50px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: radial-gradient(circle at 38% 30%, #ffffff 0, #e4e7ea 22%, #b3b7bc 55%, #6f7378 85%, #4a4d51 100%);
      box-shadow: 0 4px 5px rgba(0,0,0,.6), inset 0 -2px 3px rgba(0,0,0,.25), inset 0 2px 2px rgba(255,255,255,.7);
      transition: transform .07s, box-shadow .07s; -webkit-tap-highlight-color: transparent;
    }
    .dome:hover { background: radial-gradient(circle at 38% 30%, #ffffff 0, #eef0f2 22%, #bec2c7 55%, #74787d 85%, #4a4d51 100%); }
    .dome:active { transform: translateY(3px) scale(.98); box-shadow: 0 1px 1px rgba(0,0,0,.6), inset 0 -2px 3px rgba(0,0,0,.25); }
    .dome:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
  `,
  html: `
    <div class="stage">
      <div class="box">
        <svg class="arrow" viewBox="0 0 38 16" aria-hidden="true"><path d="M0 8h26V2l12 6-12 6V10H0z"/></svg>
        <span class="led"></span>
        <div class="collar"><button class="dome" type="button" aria-label="push to cross"></button></div>
      </div>
    </div>`,
  init(root) {
    const led = root.querySelector('.led');
    root.querySelector('.dome').addEventListener('click', () => { led.classList.remove('on'); void led.offsetWidth; led.classList.add('on'); });
    led.addEventListener('animationend', () => led.classList.remove('on'));
  },
};
