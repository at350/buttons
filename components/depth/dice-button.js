export default {
  id: 'dp-dice-button',
  credit: 'Tumbling die — a real six-faced cube with pips, each click adds whole turns and lands on a random face',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 36px 52px 42px; perspective: 600px; background: #1f2937; border-radius: 12px; }
    .die {
      --rx: 0deg; --ry: 0deg; width: 64px; height: 64px; position: relative; border: 0; padding: 0; background: transparent; cursor: pointer;
      transform-style: preserve-3d; transform: rotateX(-20deg) rotateY(30deg) rotateX(var(--rx)) rotateY(var(--ry));
      transition: transform 1.3s cubic-bezier(.25, .9, .3, 1.02);
    }
    .die:hover { transform: translateZ(12px) rotateX(-20deg) rotateY(30deg) rotateX(var(--rx)) rotateY(var(--ry)); transition-duration: .3s; }
    .die.rolling { transition-duration: 1.3s; }
    .f {
      position: absolute; inset: 0; border-radius: 10px; background: #fafaf9; display: grid; grid-template: repeat(3, 1fr) / repeat(3, 1fr); padding: 9px; gap: 2px;
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .08), inset 0 0 18px rgba(0, 0, 0, .08);
    }
    .f i { width: 11px; height: 11px; border-radius: 50%; background: #111827; place-self: center; opacity: 0; }
    .f i.on { opacity: 1; }
    .f1 { transform: translateZ(32px); } .f6 { transform: rotateY(180deg) translateZ(32px); }
    .f3 { transform: rotateY(90deg) translateZ(32px); } .f4 { transform: rotateY(-90deg) translateZ(32px); }
    .f5 { transform: rotateX(90deg) translateZ(32px); } .f2 { transform: rotateX(-90deg) translateZ(32px); }
    .sh { position: absolute; left: 50%; bottom: -24px; width: 76px; height: 16px; border-radius: 50%; background: rgba(0, 0, 0, .5); filter: blur(5px); transform: translateX(-50%); transition: transform .3s; }
    .die:hover + .sh { transform: translateX(-50%) scale(.8); }
    .wrap { position: relative; width: 64px; }
    .die:focus-visible { outline: 0; } .die:focus-visible .f { box-shadow: inset 0 0 0 2px #60a5fa; }
  `,
  html: `
    <div class="stage"><div class="wrap">
      <button class="die" type="button" aria-label="Roll die" aria-live="polite">
        <span class="f f1" data-n="1"></span><span class="f f2" data-n="2"></span><span class="f f3" data-n="3"></span>
        <span class="f f4" data-n="4"></span><span class="f f5" data-n="5"></span><span class="f f6" data-n="6"></span>
      </button><span class="sh"></span>
    </div></div>`,
  init(root) {
    const PIPS = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
    root.querySelectorAll('.f').forEach((f) => {
      const on = PIPS[f.dataset.n];
      f.innerHTML = Array.from({ length: 9 }, (_, i) => `<i${on.includes(i) ? ' class="on"' : ''}></i>`).join('');
    });
    // face -> (rotateX, rotateY) that brings it to the front
    const ORIENT = { 1: [0, 0], 6: [0, 180], 3: [0, -90], 4: [0, 90], 5: [-90, 0], 2: [90, 0] };
    const die = root.querySelector('.die');
    let tx = 0, ty = 0;
    die.addEventListener('click', () => {
      const n = 1 + Math.floor(Math.random() * 6);
      const [ox, oy] = ORIENT[n];
      tx += 1 + Math.floor(Math.random() * 2); ty += 1 + Math.floor(Math.random() * 2);
      die.classList.add('rolling');
      die.style.setProperty('--rx', (tx * 360 + ox) + 'deg');
      die.style.setProperty('--ry', (ty * 360 + oy) + 'deg');
      die.setAttribute('aria-label', 'Rolled ' + n);
    });
    die.addEventListener('transitionend', () => die.classList.remove('rolling'));
  },
};
