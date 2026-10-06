export default {
  id: 'dp-dice-button',
  credit: 'Tumbling die — a lit six-sided cube (opposite faces sum to 7, rounded edges, inset pips); each click rolls whole turns and lands on a random face',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 34px 50px 40px; perspective: 600px; background: radial-gradient(120% 100% at 50% 0%, #2d3a4f, #182130); border-radius: 12px; }
    .wrap { position: relative; width: 64px; height: 64px; transform-style: preserve-3d; }
    .die {
      --rx: 0deg; --ry: 0deg; display: block; width: 64px; height: 64px; position: relative; border: 0; padding: 0; background: transparent; cursor: pointer;
      transform-style: preserve-3d; transform: translateZ(0) rotateX(-22deg) rotateY(32deg) rotateX(var(--rx)) rotateY(var(--ry));
      transition: transform .35s cubic-bezier(.3, 1.3, .4, 1);
    }
    .die:hover { transform: translateZ(10px) rotateX(-22deg) rotateY(32deg) rotateX(var(--rx)) rotateY(var(--ry)); }
    .die:active { transform: translateZ(2px) rotateX(-22deg) rotateY(32deg) rotateX(var(--rx)) rotateY(var(--ry)); }
    .die.rolling { transition: transform 1.3s cubic-bezier(.2, .8, .25, 1.03); }
    .f, .core {
      position: absolute; inset: 0; -webkit-backface-visibility: hidden; backface-visibility: hidden;
    }
    .core { background: #d9d5cf; }
    .f {
      border-radius: 11px; display: grid; grid-template: repeat(3, 1fr) / repeat(3, 1fr); padding: 9px; gap: 1px;
      background: radial-gradient(circle at 50% 45%, #fffdf8, #f2efe9 75%, #e4e0d9);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .05), inset 0 0 6px rgba(0, 0, 0, .06);
      filter: brightness(var(--lit, 1)); transition: filter .35s;
    }
    .die.rolling .f { transition: filter 1.3s cubic-bezier(.2, .8, .25, 1.03); }
    .f i { width: 11px; height: 11px; border-radius: 50%; place-self: center; visibility: hidden;
      background: radial-gradient(circle at 50% 35%, #0b0f19, #1f2937 70%, #374151); box-shadow: inset 0 1.5px 1.5px rgba(0, 0, 0, .6), 0 .5px 0 rgba(255, 255, 255, .7); }
    .f.one i { width: 14px; height: 14px; background: radial-gradient(circle at 50% 35%, #7f1d1d, #b91c1c 70%, #dc2626); }
    .f i.on { visibility: visible; }
    .f1, .c1 { transform: translateZ(32px); }
    .f6, .c6 { transform: rotateY(180deg) translateZ(32px); }
    .f3, .c3 { transform: rotateY(90deg) translateZ(32px); }
    .f4, .c4 { transform: rotateY(-90deg) translateZ(32px); }
    .f2, .c2 { transform: rotateX(90deg) translateZ(32px); }
    .f5, .c5 { transform: rotateX(-90deg) translateZ(32px); }
    .core { transform-origin: 50% 50%; }
    .c1 { transform: translateZ(31px); } .c6 { transform: rotateY(180deg) translateZ(31px); }
    .c3 { transform: rotateY(90deg) translateZ(31px); } .c4 { transform: rotateY(-90deg) translateZ(31px); }
    .c2 { transform: rotateX(90deg) translateZ(31px); } .c5 { transform: rotateX(-90deg) translateZ(31px); }
    .sh {
      position: absolute; left: 50%; top: 100%; width: 80px; height: 18px; margin: 10px 0 0 -40px; border-radius: 50%;
      background: radial-gradient(closest-side, rgba(0, 0, 0, .55), transparent); transition: transform .35s, opacity .35s; pointer-events: none;
    }
    .die:hover + .sh { transform: scale(.85); opacity: .75; }
    .die:focus-visible { outline: 0; }
    .die:focus-visible .f { box-shadow: inset 0 0 0 2px #60a5fa; }
  `,
  html: `
    <div class="stage"><div class="wrap">
      <button class="die" type="button" aria-label="Roll die, showing 1">
        <span class="core c1"></span><span class="core c2"></span><span class="core c3"></span><span class="core c4"></span><span class="core c5"></span><span class="core c6"></span>
        <span class="f f1 one" data-n="1"></span><span class="f f2" data-n="2"></span><span class="f f3" data-n="3"></span>
        <span class="f f4" data-n="4"></span><span class="f f5" data-n="5"></span><span class="f f6" data-n="6"></span>
      </button><span class="sh"></span>
    </div></div>`,
  init(root) {
    // pip cells in a 3×3 grid (0 = top-left … 8 = bottom-right)
    const PIPS = { 1: [4], 2: [2, 6], 3: [2, 4, 6], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
    const faces = [...root.querySelectorAll('.f')];
    faces.forEach((f) => {
      const on = PIPS[f.dataset.n];
      f.innerHTML = Array.from({ length: 9 }, (_, i) => `<i${on.includes(i) ? ' class="on"' : ''}></i>`).join('');
    });
    // face normals in die space (CSS axes: +y is down, +z toward the viewer)
    const N = { 1: [0, 0, 1], 6: [0, 0, -1], 3: [1, 0, 0], 4: [-1, 0, 0], 2: [0, -1, 0], 5: [0, 1, 0] };
    // (rotateX, rotateY) that brings each face to the front
    const ORIENT = { 1: [0, 0], 6: [0, 180], 3: [0, -90], 4: [0, 90], 2: [-90, 0], 5: [90, 0] };
    const rad = Math.PI / 180;
    const rx = (v, a) => { const c = Math.cos(a * rad), s = Math.sin(a * rad); return [v[0], v[1] * c - v[2] * s, v[1] * s + v[2] * c]; };
    const ry = (v, a) => { const c = Math.cos(a * rad), s = Math.sin(a * rad); return [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]; };
    const Lraw = [-0.35, -0.85, 0.45], Ll = Math.hypot(...Lraw), L = Lraw.map((x) => x / Ll);
    const die = root.querySelector('.die');
    let X = 0, Y = 0;
    const light = () => {
      faces.forEach((f) => {
        const n = rx(ry(rx(ry(N[f.dataset.n], Y), X), 32), -22);
        const d = Math.max(0, n[0] * L[0] + n[1] * L[1] + n[2] * L[2]);
        f.style.setProperty('--lit', (0.88 + 0.2 * d).toFixed(3));
      });
    };
    let turnsX = 0, turnsY = 0;
    die.addEventListener('click', () => {
      const n = 1 + Math.floor(Math.random() * 6);
      const [ox, oy] = ORIENT[n];
      turnsX += 1 + Math.floor(Math.random() * 2); turnsY += 1 + Math.floor(Math.random() * 2);
      X = turnsX * 360 + ox; Y = turnsY * 360 + oy;
      die.classList.add('rolling');
      die.style.setProperty('--rx', X + 'deg'); die.style.setProperty('--ry', Y + 'deg');
      die.setAttribute('aria-label', 'Roll die, showing ' + n);
      light();
    });
    die.addEventListener('transitionend', (e) => { if (e.target === die && e.propertyName === 'transform') die.classList.remove('rolling'); });
    light();
  },
};
