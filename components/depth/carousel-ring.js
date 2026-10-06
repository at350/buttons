export default {
  id: 'dp-carousel-ring',
  credit: '3D carousel ring — six cards arranged around the Y axis with translateZ radius, arrows rotate the ring one card at a time',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: center; gap: 10px; padding: 34px 20px 38px; background: #0b0f1a; border-radius: 12px; overflow: hidden; }
    .scene { width: 96px; height: 120px; perspective: 600px; }
    .ring { --a: 0deg; position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transform: translateZ(-84px) rotateY(var(--a)); transition: transform .8s cubic-bezier(.3, 1.1, .4, 1); }
    .c {
      position: absolute; inset: 0; border-radius: 12px; display: grid; place-items: center; color: #fff;
      font: 800 34px/1 'Unbounded', system-ui, sans-serif; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .2), 0 10px 24px rgba(0, 0, 0, .4);
      -webkit-backface-visibility: hidden; backface-visibility: hidden;
    }
    .c:nth-child(1) { transform: rotateY(0deg) translateZ(84px); background: linear-gradient(160deg, #f43f5e, #be123c); }
    .c:nth-child(2) { transform: rotateY(60deg) translateZ(84px); background: linear-gradient(160deg, #f59e0b, #b45309); }
    .c:nth-child(3) { transform: rotateY(120deg) translateZ(84px); background: linear-gradient(160deg, #10b981, #047857); }
    .c:nth-child(4) { transform: rotateY(180deg) translateZ(84px); background: linear-gradient(160deg, #06b6d4, #0e7490); }
    .c:nth-child(5) { transform: rotateY(240deg) translateZ(84px); background: linear-gradient(160deg, #6366f1, #4338ca); }
    .c:nth-child(6) { transform: rotateY(300deg) translateZ(84px); background: linear-gradient(160deg, #d946ef, #a21caf); }
    .arr {
      width: 34px; height: 34px; border-radius: 50%; border: 1px solid rgba(255, 255, 255, .2); background: rgba(255, 255, 255, .08); color: #fff; cursor: pointer;
      display: grid; place-items: center; transition: background .2s, transform .2s; flex: none;
    }
    .arr:hover { background: rgba(255, 255, 255, .22); transform: scale(1.08); }
    .arr:active { transform: scale(.9); }
    .arr:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .arr svg { width: 16px; height: 16px; }
    .dots { position: absolute; left: 0; right: 0; bottom: 12px; display: flex; justify-content: center; gap: 5px; }
    .dots i { width: 5px; height: 5px; border-radius: 50%; background: rgba(255, 255, 255, .25); transition: background .3s, transform .3s; }
    .dots i.on { background: #fff; transform: scale(1.3); }
    .stage { position: relative; }
  `,
  html: `
    <div class="stage">
      <button class="arr prev" type="button" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></button>
      <div class="scene"><div class="ring"><div class="c">1</div><div class="c">2</div><div class="c">3</div><div class="c">4</div><div class="c">5</div><div class="c">6</div></div></div>
      <button class="arr next" type="button" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>
      <div class="dots"><i class="on"></i><i></i><i></i><i></i><i></i><i></i></div>
    </div>`,
  init(root) {
    const ring = root.querySelector('.ring'), dots = root.querySelectorAll('.dots i');
    let i = 0;
    const go = (d) => {
      i += d;
      ring.style.setProperty('--a', (-i * 60) + 'deg');
      dots.forEach((x, k) => x.classList.toggle('on', k === ((i % 6) + 6) % 6));
    };
    root.querySelector('.prev').addEventListener('click', () => go(-1));
    root.querySelector('.next').addEventListener('click', () => go(1));
  },
};
