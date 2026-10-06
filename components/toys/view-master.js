// one reel = seven stereo views (travel scenes from the asset pack); each view sits on the disc twice, left- and right-eye frames opposite each other
const SCENES = ['15', '27', '52', '42', '10', '69', '16'].map((n) => `assets/square/${n}.webp`);
const CHIPS = Array.from({ length: 14 }, (_, i) => `<i style="transform:rotate(${i * 360 / 14}deg) translateY(-48px);background-image:url(${SCENES[i % 7]})"></i>`).join('');

export default {
  id: 'ty2-view-master',
  credit: 'View-Master Model L (Sawyer\'s / GAF) — red stereo viewer: pull the lever, the reel clicks round to the next 3-D picture',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 12px 16px 16px; border-radius: 12px; overflow: hidden; background: linear-gradient(#fbe9c8, #f0cf98); }
    .viewer { position: relative; width: 240px; height: 176px; }
    .reel { position: absolute; left: 60px; top: 0; width: 120px; height: 120px; border-radius: 50%;
      background: radial-gradient(circle, #f5f5f0 0 10%, #c9c9c2 11% 13%, #fbfbf8 14%); box-shadow: 0 2px 4px rgba(0,0,0,.3);
      transition: transform .4s cubic-bezier(.3,1.4,.5,1); }
    .reel i { position: absolute; left: 54px; top: 53px; width: 12px; height: 14px; border-radius: 2px; background: #333 center / cover no-repeat; opacity: .9; box-shadow: 0 0 0 .5px rgba(0,0,0,.35); }
    .body { position: absolute; left: 0; top: 54px; width: 216px; height: 116px; border-radius: 30px 30px 44px 44px;
      background: radial-gradient(ellipse at 30% 10%, #ff6f6f, #d01818 40%, #8f0c0c);
      box-shadow: 0 6px 0 #6a0808, 0 10px 14px rgba(80,0,0,.35), inset 0 2px 0 rgba(255,255,255,.35); }
    .lens { position: absolute; top: 30px; width: 64px; height: 64px; border-radius: 50%; overflow: hidden;
      box-shadow: 0 0 0 6px #7a0a0a, 0 0 0 8px #b71515, inset 0 0 14px 6px rgba(0,0,0,.65); }
    .lens.l { left: 30px; } .lens.r { left: 122px; }
    .pic { position: absolute; inset: 0; background: #222 var(--s) 50% 50% / cover no-repeat; transition: opacity .12s; }
    .pic::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 35% 30%, rgba(255,255,255,.35), transparent 40%); }
    .lens.r .pic { background-position: calc(50% + 3px) 50%; }
    .dark .pic { opacity: 0; }
    .lever { position: absolute; left: 204px; top: 74px; width: 30px; height: 70px; border: 0; padding: 0; background: none; cursor: pointer; }
    .arm { position: absolute; left: 6px; top: 0; width: 16px; height: 62px; border-radius: 8px 8px 10px 10px;
      background: linear-gradient(90deg, #8f0c0c, #e02020 40%, #ff7070 55%, #b31010); box-shadow: 0 3px 4px rgba(0,0,0,.4);
      transform-origin: 8px 6px; transition: transform .25s cubic-bezier(.3,1.8,.5,1); }
    .lever:hover .arm { transform: rotate(-6deg); }
    .lever:active .arm, .lever.down .arm { transform: translateY(10px) rotate(-10deg); transition-duration: .08s; }
    .lever:focus-visible { outline: 2px solid #8f0c0c; outline-offset: 2px; border-radius: 8px; }
  `,
  html: `
    <div class="stage"><div class="viewer">
      <div class="reel">${CHIPS}</div>
      <div class="body"><span class="lens l"><span class="pic"></span></span><span class="lens r"><span class="pic"></span></span></div>
      <button class="lever" type="button" aria-label="advance reel"><span class="arm"></span></button>
    </div></div>`,
  init(root) {
    const reel = root.querySelector('.reel'), body = root.querySelector('.body'), lever = root.querySelector('.lever');
    let n = 0, k = 0, t = 0, t2 = 0;
    const show = () => body.style.setProperty('--s', `url(${SCENES[n]})`);
    lever.addEventListener('click', () => {
      n = (n + 1) % SCENES.length; k++;
      reel.style.transform = `rotate(${-k * 360 / 7}deg)`;
      lever.classList.add('down'); body.classList.add('dark');
      clearTimeout(t); clearTimeout(t2);
      t = setTimeout(() => { show(); body.classList.remove('dark'); }, 180);
      t2 = setTimeout(() => lever.classList.remove('down'), 160);
    });
    show();
    return () => { clearTimeout(t); clearTimeout(t2); };
  },
};
