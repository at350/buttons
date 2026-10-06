export default {
  id: 'cr-liquid-glass-pill',
  credit: 'Liquid Glass capsule — Apple WWDC25 (iOS 26): magnifying lens + bent rim refraction, specular edge light that follows the pointer, springy grow on press',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      --W: 280px; --H: 140px; --pw: 150px; --ph: 52px;
      --wall:
        repeating-linear-gradient(135deg, transparent 0 16px, rgba(255, 255, 255, .28) 16px 19px),
        radial-gradient(circle at 18% 30%, #ffd166 0 26px, transparent 27px),
        radial-gradient(circle at 84% 72%, #06d6a0 0 22px, transparent 23px),
        linear-gradient(90deg, #ff6a00, #ff2d95 40%, #7c3aed 72%, #00a8ff);
      position: relative; width: var(--W); height: var(--H); border-radius: 12px; overflow: hidden; display: grid; place-items: center;
      background: var(--wall); background-size: var(--W) var(--H);
    }
    .pill {
      --m: 1.2; --r: .82; --x: 30%; --y: 20%;
      position: relative; width: var(--pw); height: var(--ph); border: 0; border-radius: 999px; padding: 0; cursor: pointer; isolation: isolate;
      color: #fff; font: 600 17px/1 system-ui, -apple-system, 'SF Pro Text', sans-serif; letter-spacing: -.02em;
      text-shadow: 0 1px 6px rgba(0, 0, 0, .25);
      /* lens: the same wallpaper, magnified around the capsule's centre */
      background: var(--wall);
      background-size: calc(var(--W) * var(--m)) calc(var(--H) * var(--m));
      background-position:
        calc((var(--W) / 2) * (1 - var(--m)) - (var(--W) - var(--pw)) / 2)
        calc((var(--H) / 2) * (1 - var(--m)) - (var(--H) - var(--ph)) / 2);
      box-shadow: 0 8px 24px rgba(0, 0, 0, .22), 0 2px 6px rgba(0, 0, 0, .12);
      transition: transform .5s cubic-bezier(.32, .72, 0, 1), box-shadow .4s ease;
    }
    /* rim: minified copy masked to a thin band — the edge "bends" the scene like thick glass */
    .rim {
      position: absolute; inset: 0; border-radius: inherit; padding: 7px; pointer-events: none; z-index: -1;
      background: var(--wall);
      background-size: calc(var(--W) * var(--r)) calc(var(--H) * var(--r));
      background-position:
        calc((var(--W) / 2) * (1 - var(--r)) - (var(--W) - var(--pw)) / 2)
        calc((var(--H) / 2) * (1 - var(--r)) - (var(--H) - var(--ph)) / 2);
      filter: blur(1.2px) saturate(1.5) brightness(1.1);
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
      mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
    }
    .tint { position: absolute; inset: 0; border-radius: inherit; z-index: -1; pointer-events: none; background: rgba(255, 255, 255, .08); transition: background .3s ease; }
    /* specular: bright hairline rim + soft light pooling where the pointer is */
    .pill::after {
      content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
      box-shadow: inset 1.5px 1.5px 1px rgba(255, 255, 255, .85), inset -1px -1px 1px rgba(255, 255, 255, .45), inset 0 0 12px rgba(255, 255, 255, .25);
      background: radial-gradient(120px 60px at var(--x) var(--y), rgba(255, 255, 255, .38), transparent 70%);
      opacity: .75; transition: opacity .3s ease;
    }
    .lbl { position: relative; display: inline-flex; align-items: center; gap: 7px; }
    .lbl svg { width: 18px; height: 18px; }
    .pill:hover::after { opacity: 1; }
    .pill:hover .tint { background: rgba(255, 255, 255, .14); }
    .pill:active { transform: scale(1.12); box-shadow: 0 14px 34px rgba(0, 0, 0, .28), 0 2px 8px rgba(0, 0, 0, .14); transition-duration: .35s; }
    .pill:active .tint { background: rgba(255, 255, 255, .26); }
    .pill:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
  `,
  html: `<div class="stage"><button class="pill" type="button"><span class="rim" aria-hidden="true"></span><span class="tint" aria-hidden="true"></span><span class="lbl"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>Play</span></button></div>`,
  init(root) {
    const p = root.querySelector('.pill');
    p.addEventListener('pointermove', (e) => {
      const r = p.getBoundingClientRect();
      p.style.setProperty('--x', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      p.style.setProperty('--y', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
    p.addEventListener('pointerleave', () => { p.style.setProperty('--x', '30%'); p.style.setProperty('--y', '20%'); });
  },
};
