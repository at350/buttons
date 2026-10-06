export default {
  id: 'dp-number-drum',
  credit: 'Mechanical odometer drums — ten-faced cylinders behind a bezel window, shaded like real rollers (dark top and bottom, a soft highlight band); the count rolls with a spring',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: center; gap: 14px; padding: 24px 24px; background: radial-gradient(120% 120% at 50% 0%, #2a2f38, #15181e); border-radius: 12px; }
    .bezel {
      padding: 5px; border-radius: 10px;
      background: linear-gradient(180deg, #d9dde3, #8b929c 48%, #5c636d 52%, #b7bec8);
      box-shadow: 0 1px 0 rgba(255, 255, 255, .15), 0 6px 14px rgba(0, 0, 0, .5);
    }
    .win {
      position: relative; display: flex; gap: 2px; padding: 0 3px; border-radius: 6px; background: #050608; overflow: hidden;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, .9);
    }
    /* cylinder shading is fixed to the window, so every face picks it up as it rolls through */
    .win::after {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background: linear-gradient(180deg, rgba(0, 0, 0, .88) 0%, rgba(0, 0, 0, .45) 14%, rgba(0, 0, 0, .06) 32%, rgba(255, 255, 255, .1) 42%, rgba(255, 255, 255, .02) 52%, rgba(0, 0, 0, .08) 64%, rgba(0, 0, 0, .5) 86%, rgba(0, 0, 0, .9) 100%);
    }
    .scene { position: relative; width: 30px; height: 56px; perspective: 220px; }
    .drum { --a: 0deg; position: absolute; left: 0; top: 13px; width: 30px; height: 30px; transform-style: preserve-3d; transform: rotateX(var(--a)); transition: transform .8s cubic-bezier(.3, 1.35, .45, 1); }
    .f {
      position: absolute; inset: 0; display: grid; place-items: center; color: #f4f4f0;
      font: 600 24px/1 'JetBrains Mono', ui-monospace, monospace; background: #24272d;
      box-shadow: inset 1px 0 0 rgba(255, 255, 255, .07), inset -1px 0 0 rgba(0, 0, 0, .6), inset 0 1px 0 rgba(0, 0, 0, .55);
      -webkit-backface-visibility: hidden; backface-visibility: hidden;
    }
    .ones .f { background: #282b32; }
    .k {
      width: 38px; height: 38px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; color: #e5e7eb; display: grid; place-items: center;
      background: linear-gradient(180deg, #3a404a, #262a31); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .14), 0 3px 0 #0c0e12, 0 4px 8px rgba(0, 0, 0, .45);
      transition: transform .08s, box-shadow .08s, background .2s;
    }
    .k:hover { background: linear-gradient(180deg, #464c57, #2d323a); }
    .k:active { transform: translateY(3px); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 0 0 #0c0e12, 0 1px 2px rgba(0, 0, 0, .45); }
    .k:disabled { opacity: .45; cursor: default; }
    .k svg { width: 16px; height: 16px; }
    .k:focus-visible { outline: 2px solid #93c5fd; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <button class="k dec" type="button" aria-label="Decrease" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/></svg></button>
      <div class="bezel"><div class="win" role="status" aria-live="polite" aria-label="0">
        <div class="scene"><div class="drum tens"></div></div>
        <div class="scene"><div class="drum ones"></div></div>
      </div></div>
      <button class="k inc" type="button" aria-label="Increase"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
    </div>`,
  init(root) {
    const R = 46.2; // 15px / tan(18deg): ten 30px faces close the cylinder
    root.querySelectorAll('.drum').forEach((d) => {
      d.innerHTML = Array.from({ length: 10 }, (_, i) => `<span class="f" style="transform:rotateX(${-i * 36}deg) translateZ(${R}px)">${i}</span>`).join('');
    });
    const tens = root.querySelector('.tens'), ones = root.querySelector('.ones'), win = root.querySelector('.win');
    const inc = root.querySelector('.inc'), dec = root.querySelector('.dec');
    let n = 0;
    const draw = () => {
      ones.style.setProperty('--a', (n * 36) + 'deg');
      tens.style.setProperty('--a', (Math.floor(n / 10) * 36) + 'deg');
      win.setAttribute('aria-label', String(n));
      dec.disabled = n === 0; inc.disabled = n === 99;
    };
    inc.addEventListener('click', () => { if (n < 99) { n++; draw(); } });
    dec.addEventListener('click', () => { if (n > 0) { n--; draw(); } });
    draw();
  },
};
