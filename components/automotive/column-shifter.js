const G = ['P', 'R', 'N', 'D', '2', '1'];
const A = [-4, 4, 12, 20, 29, 38];

export default {
  id: 'au-column-shifter',
  credit: 'Column-mounted automatic shifter — drag the chrome lever down through P R N D 2 1; it clicks into each detent and the red needle tracks it in the amber PRND21 window',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 300px; max-width: 100%; height: 190px; border-radius: 12px; overflow: hidden; background: linear-gradient(#2a2420, #15110e); user-select: none; }
    .ind { position: absolute; left: 80px; top: 12px; width: 200px; height: 38px; border-radius: 6px; background: #050403; box-shadow: inset 0 2px 4px rgba(0,0,0,.9), 0 0 0 2px #4b4038, 0 0 0 3px #110d0a; overflow: hidden; }
    .ind .win { position: absolute; inset: 4px 4px 9px; border-radius: 3px; background: linear-gradient(#ffcc6b, #f29a1c); box-shadow: inset 0 0 8px rgba(120,60,0,.6); display: flex; justify-content: space-around; align-items: center; }
    .ind span { font: 800 15px/1 'Helvetica Neue', Arial, system-ui, sans-serif; color: #2a1300; transition: color .15s; }
    .ind span.on { color: #000; text-shadow: 0 0 1px #fff7; }
    .ndl { position: absolute; bottom: 3px; left: 0; width: 12px; height: 4px; margin-left: -6px; border-radius: 2px; background: #e0201a; box-shadow: 0 0 4px #ff4a3a; transition: transform .18s cubic-bezier(.3,1.4,.5,1); }
    .drag .ndl { transition: none; }
    .col { position: absolute; left: -30px; top: 47px; width: 86px; height: 46px; border-radius: 0 22px 22px 0; background: linear-gradient(#3b332d, #1c1714 60%, #0d0a08); box-shadow: 0 4px 10px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.1); }
    .lever { position: absolute; left: 44px; top: 63px; width: 150px; height: 14px; transform-origin: 6px 7px; transform: rotate(-4deg); transition: transform .2s cubic-bezier(.3,1.5,.5,1); cursor: grab; touch-action: none; }
    .drag .lever { transition: none; cursor: grabbing; }
    .rod { position: absolute; left: 0; top: 3px; width: 110px; height: 8px; border-radius: 4px; background: linear-gradient(#f4f4f4, #9aa0a6 45%, #e8e8e8 60%, #6c7177); clip-path: polygon(0 0, 100% 25%, 100% 75%, 0 100%); }
    .knob { position: absolute; left: 100px; top: -6px; width: 50px; height: 26px; border-radius: 6px 13px 13px 6px; background: linear-gradient(#3a3a3a, #0e0e0e 60%, #1f1f1f); box-shadow: 0 3px 6px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.15); }
    .knob::after { content: ''; position: absolute; right: 8px; top: 7px; width: 14px; height: 12px; border-radius: 3px; background: linear-gradient(#bdbdbd, #6b6b6b); }
    .pivot { position: absolute; left: 39px; top: 59px; width: 22px; height: 22px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #e9e9e9, #7a7f85 60%, #3b3f44); box-shadow: 0 2px 4px rgba(0,0,0,.7); pointer-events: none; }
    .lever:focus-visible { outline: 2px solid #ffcc6b; outline-offset: 4px; border-radius: 8px; }
  `,
  html: `
    <div class="stage">
      <div class="ind"><div class="win">${G.map((g, i) => `<span class="${i ? '' : 'on'}">${g}</span>`).join('')}</div><span class="ndl"></span></div>
      <div class="col"></div>
      <div class="lever" tabindex="0" role="slider" aria-label="Gear selector" aria-valuemin="0" aria-valuemax="5" aria-valuenow="0" aria-valuetext="P"><span class="rod"></span><span class="knob"></span></div>
      <span class="pivot"></span>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), lever = root.querySelector('.lever'), ndl = root.querySelector('.ndl'), letters = [...root.querySelectorAll('.win span')];
    let g = 0, drag = false, a0 = 0, p0 = 0, raw = A[0];
    const xs = () => letters.map((l) => l.offsetLeft + l.offsetWidth / 2 + 4);
    const nearest = (a) => A.reduce((b, v, i) => (Math.abs(v - a) < Math.abs(A[b] - a) ? i : b), 0);
    const render = (ang, idx) => {
      lever.style.transform = `rotate(${ang}deg)`;
      letters.forEach((l, i) => l.classList.toggle('on', i === idx));
      ndl.style.transform = `translateX(${xs()[idx]}px)`;
      lever.setAttribute('aria-valuenow', idx); lever.setAttribute('aria-valuetext', G[idx]);
    };
    const set = (i) => { g = Math.max(0, Math.min(5, i)); raw = A[g]; render(A[g], g); };
    const at = (e) => { const r = stage.getBoundingClientRect(); return Math.atan2(e.clientY - r.top - 70, e.clientX - r.left - 50) * 180 / Math.PI; };
    lever.addEventListener('pointerdown', (e) => { drag = true; a0 = at(e); p0 = A[g]; lever.setPointerCapture(e.pointerId); stage.classList.add('drag'); });
    lever.addEventListener('pointermove', (e) => {
      if (!drag) return;
      raw = Math.max(A[0] - 3, Math.min(A[5] + 3, p0 + at(e) - a0));
      const n = nearest(raw), notch = A[n] + (raw - A[n]) * .35;
      render(notch, n);
    });
    const end = (e) => {
      if (!drag) return; drag = false; stage.classList.remove('drag');
      const n = nearest(raw);
      set(Math.abs(raw - A[g]) < 1 && e.type === 'pointerup' ? (g + 1) % 6 : n);
    };
    lever.addEventListener('pointerup', end); lever.addEventListener('pointercancel', end);
    lever.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); set(g + 1); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); set(g - 1); }
    });
    requestAnimationFrame(() => set(0));
  },
};
