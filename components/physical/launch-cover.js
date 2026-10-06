export default {
  id: 'ph-launch-cover',
  credit: 'Big red launch button under a hinged hazard safety cover — flip the cover, then fire',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 24px 24px 20px; border-radius: 12px; background: linear-gradient(#3a3f46, #22262b); }
    .panel {
      position: relative; width: 100px; height: 100px; border-radius: 8px;
      background: linear-gradient(160deg, #6a7078, #454a51); perspective: 320px;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.2), 0 2px 4px rgba(0,0,0,.5), 0 10px 20px rgba(0,0,0,.4);
    }
    .ring { position: absolute; left: 50%; top: 50%; width: 70px; height: 70px; margin: -35px; border-radius: 50%; background: radial-gradient(circle, #222 0 60%, #999 66%, #ddd 70%, #666 78%); box-shadow: inset 0 3px 6px rgba(0,0,0,.8); }
    .fire {
      position: absolute; left: 50%; top: 50%; width: 52px; height: 52px; margin: -29px 0 0 -26px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: radial-gradient(circle at 40% 32%, #ff8a80, #e82a22 40%, #a90d0a 85%);
      box-shadow: 0 6px 0 #7a0806, 0 8px 6px rgba(0,0,0,.5), inset 0 2px 3px rgba(255,255,255,.35);
      transition: margin .06s, box-shadow .06s, background .1s; -webkit-tap-highlight-color: transparent;
    }
    .fire:active { margin-top: -23px; box-shadow: 0 0 0 #7a0806, 0 1px 2px rgba(0,0,0,.5), inset 0 2px 3px rgba(255,255,255,.3); }
    .fire:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
    .fire.hot { animation: flash .5s; }
    @keyframes flash { 0%, 100% { background: radial-gradient(circle at 40% 32%, #ff8a80, #e82a22 40%, #a90d0a 85%); } 40% { background: radial-gradient(circle at 40% 32%, #fff, #ffb3ad 40%, #e82a22 85%); box-shadow: 0 0 0 #7a0806, 0 0 20px 6px rgba(255,80,60,.9); } }
    .hinge { position: absolute; left: 10px; right: 10px; top: 4px; height: 6px; border-radius: 3px; background: linear-gradient(#f2f2f2, #8c8c8c); box-shadow: 0 1px 2px rgba(0,0,0,.6); }
    .cover {
      position: absolute; left: 6px; right: 6px; top: 8px; bottom: 6px; border-radius: 6px; border: 0; padding: 0; cursor: pointer;
      background: repeating-linear-gradient(135deg, rgba(255,214,0,.85) 0 10px, rgba(20,20,20,.8) 10px 20px);
      box-shadow: inset 0 0 0 3px rgba(255,255,255,.35), 0 3px 6px rgba(0,0,0,.5);
      transform-origin: 50% 0; transform: rotateX(0deg); transition: transform .32s cubic-bezier(.3,1.2,.5,1), box-shadow .32s;
      -webkit-tap-highlight-color: transparent;
    }
    .cover::after { content: ''; position: absolute; left: 50%; bottom: 6px; width: 24px; height: 6px; margin-left: -12px; border-radius: 3px; background: linear-gradient(#f2f2f2, #8c8c8c); }
    .cover:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .cover[aria-expanded="true"] { transform: rotateX(-118deg); box-shadow: inset 0 0 0 3px rgba(255,255,255,.35), 0 -12px 12px rgba(0,0,0,.3); }
  `,
  html: `
    <div class="stage">
      <div class="panel">
        <div class="ring"></div>
        <button class="fire" type="button" aria-label="launch" tabindex="-1"></button>
        <div class="hinge"></div>
        <button class="cover" type="button" aria-expanded="false" aria-label="safety cover"></button>
      </div>
    </div>`,
  init(root) {
    const cover = root.querySelector('.cover');
    const fire = root.querySelector('.fire');
    cover.addEventListener('click', () => {
      const open = cover.getAttribute('aria-expanded') !== 'true';
      cover.setAttribute('aria-expanded', open);
      fire.tabIndex = open ? 0 : -1;
    });
    fire.addEventListener('click', () => { fire.classList.remove('hot'); void fire.offsetWidth; fire.classList.add('hot'); });
    fire.addEventListener('animationend', () => fire.classList.remove('hot'));
  },
};
