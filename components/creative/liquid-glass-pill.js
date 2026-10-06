export default {
  id: 'cr-liquid-glass-pill',
  credit: 'Liquid Glass pill — Apple WWDC25 lens look: backdrop refraction rim + cursor-tracked specular highlight',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative; width: 280px; height: 130px; max-width: 100%; border-radius: 12px; overflow: hidden; display: grid; place-items: center;
      background:
        repeating-linear-gradient(135deg, transparent 0 18px, rgba(255, 255, 255, .22) 18px 22px),
        linear-gradient(90deg, #ff6a00, #ff2d95 40%, #7c3aed 75%, #00c2ff);
    }
    .pill {
      --x: 30%; --y: 30%;
      position: relative; overflow: hidden; cursor: pointer; border: 0; border-radius: 999px; padding: 16px 34px;
      color: #fff; font: 700 16px/1 system-ui, sans-serif; letter-spacing: .02em;
      background: rgba(255, 255, 255, .12);
      -webkit-backdrop-filter: blur(6px) saturate(1.6) brightness(1.08); backdrop-filter: blur(6px) saturate(1.6) brightness(1.08);
      box-shadow:
        inset 1.5px 1.5px 0 rgba(255, 255, 255, .75), inset -1.5px -1.5px 0 rgba(255, 255, 255, .25),
        inset 0 0 18px 6px rgba(255, 255, 255, .18), 0 10px 30px rgba(0, 0, 0, .25);
      text-shadow: 0 1px 2px rgba(0, 0, 0, .3);
      transition: transform .3s cubic-bezier(.34, 1.56, .64, 1), background .25s;
    }
    .pill::before {
      content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .9;
      background: radial-gradient(60px 36px at var(--x) var(--y), rgba(255, 255, 255, .7), rgba(255, 255, 255, .05) 60%, transparent 70%);
    }
    .pill:hover { transform: scale(1.05); background: rgba(255, 255, 255, .2); }
    .pill:active { transform: scale(.97); }
    .pill[aria-pressed="true"] { background: rgba(255, 255, 255, .55); color: #1a1a2e; text-shadow: none; }
    .pill:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
  `,
  html: `<div class="stage"><button class="pill" type="button" aria-pressed="false">Refract</button></div>`,
  init(root) {
    const p = root.querySelector('.pill');
    p.addEventListener('mousemove', (e) => {
      const r = p.getBoundingClientRect();
      p.style.setProperty('--x', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      p.style.setProperty('--y', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
    p.addEventListener('mouseleave', () => { p.style.setProperty('--x', '30%'); p.style.setProperty('--y', '30%'); });
    p.addEventListener('click', () => p.setAttribute('aria-pressed', String(p.getAttribute('aria-pressed') !== 'true')));
  },
};
