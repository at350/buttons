export default {
  id: 'dp-cube-nav',
  credit: 'Cube navigation — four menu faces on a rotateY cube, arrow buttons spin it one face at a time',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 30px 26px;
      border-radius: 12px;
      background: #18181b;
      overflow: hidden;
    }
    .scene {
      width: 150px;
      height: 64px;
      perspective: 700px;
    }
    .cube {
      --a: 0deg;
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transform: translateZ(-75px) rotateY(var(--a));
      transition: transform .9s cubic-bezier(.3, 1.2, .4, 1);
    }
    .face {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      border-radius: 10px;
      font: 700 16px/1 'Inter', system-ui, sans-serif;
      letter-spacing: .04em;
      color: #fff;
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .15);
    }
    .f0 { background: #6366f1; transform: rotateY(0deg) translateZ(75px); }
    .f1 { background: #ec4899; transform: rotateY(90deg) translateZ(75px); }
    .f2 { background: #14b8a6; transform: rotateY(180deg) translateZ(75px); }
    .f3 { background: #f59e0b; transform: rotateY(270deg) translateZ(75px); }
    .arr {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, .2);
      background: #27272a;
      color: #fff;
      cursor: pointer;
      display: grid;
      place-items: center;
      transition: background .2s, transform .2s;
    }
    .arr:hover { background: #3f3f46; transform: scale(1.08); }
    .arr:active { transform: scale(.92); }
    .arr:focus-visible { outline: 2px solid #a5b4fc; outline-offset: 2px; }
    .arr svg { width: 16px; height: 16px; }
  `,
  html: `
    <div class="stage">
      <button class="arr prev" type="button" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></button>
      <div class="scene" aria-live="polite">
        <div class="cube">
          <div class="face f0">Home</div><div class="face f1">Shop</div><div class="face f2">Blog</div><div class="face f3">About</div>
        </div>
      </div>
      <button class="arr next" type="button" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>
    </div>`,
  init(root) {
    const cube = root.querySelector('.cube');
    let a = 0;
    const set = () => cube.style.setProperty('--a', a + 'deg');
    root.querySelector('.prev').addEventListener('click', () => { a += 90; set(); });
    root.querySelector('.next').addEventListener('click', () => { a -= 90; set(); });
  },
};
