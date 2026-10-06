export default {
  id: 'dp-globe-button',
  credit: 'Globe button — radial-gradient sphere with scrolling meridian lines (spins only while hovered), lights up when selected',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      padding: 26px 40px 30px;
      perspective: 600px;
      background: #020617;
      border-radius: 12px;
    }
    .wrap { position: relative; width: 96px; }
    .globe {
      position: relative;
      width: 96px;
      height: 96px;
      border: 0;
      padding: 0;
      border-radius: 50%;
      cursor: pointer;
      overflow: hidden;
      background: radial-gradient(circle at 36% 32%, #60a5fa, #1d4ed8 45%, #0f1e5a 80%, #020617 100%);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, .1), 0 18px 34px rgba(0, 0, 0, .6), inset -14px -10px 30px rgba(0, 0, 0, .55);
      transform: translateZ(0) rotateX(0);
      transition: transform .4s cubic-bezier(.3, 1.3, .4, 1), box-shadow .4s;
    }
    .globe:hover { transform: translateZ(18px) rotateX(-8deg); }
    .globe:active { transform: translateZ(4px) scale(.96); transition-duration: .1s; }
    .merid {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: repeating-linear-gradient(90deg, transparent 0 15px, rgba(255, 255, 255, .45) 15px 16.5px);
      background-size: 48px 100%;
      -webkit-mask: radial-gradient(circle at 50% 50%, #000 0 60%, rgba(0, 0, 0, .5) 90%, transparent 100%);
      mask: radial-gradient(circle at 50% 50%, #000 0 60%, rgba(0, 0, 0, .5) 90%, transparent 100%);
      animation: spin 2.4s linear infinite;
      animation-play-state: paused;
    }
    .globe:hover .merid, .globe[aria-pressed="true"] .merid { animation-play-state: running; }
    .lat {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: repeating-linear-gradient(180deg, transparent 0 17px, rgba(255, 255, 255, .25) 17px 18.5px);
    }
    .gloss {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(circle at 36% 28%, rgba(255, 255, 255, .55), transparent 40%);
    }
    .globe[aria-pressed="true"] { box-shadow: 0 0 0 3px #fde68a, 0 0 40px rgba(253, 230, 138, .55), 0 18px 34px rgba(0, 0, 0, .6), inset -14px -10px 30px rgba(0, 0, 0, .55); }
    @keyframes spin { to { background-position: 48px 0; } }
    .sh {
      position: absolute;
      left: 50%;
      bottom: -14px;
      width: 80px;
      height: 14px;
      border-radius: 50%;
      background: rgba(0, 0, 0, .6);
      filter: blur(5px);
      transform: translateX(-50%);
      transition: transform .4s;
    }
    .globe:hover + .sh { transform: translateX(-50%) scale(.82); }
    .globe:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
  `,
  html: `
    <div class="stage"><div class="wrap">
      <button class="globe" type="button" aria-pressed="false" aria-label="World">
        <span class="merid"></span><span class="lat"></span><span class="gloss"></span>
      </button><span class="sh"></span>
    </div></div>`,
  init(root) {
    const g = root.querySelector('.globe');
    g.addEventListener('click', () => g.setAttribute('aria-pressed', String(g.getAttribute('aria-pressed') !== 'true')));
  },
};
