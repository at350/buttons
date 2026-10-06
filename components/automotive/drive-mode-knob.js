const M = [['ECO', '#2ec27e', -54], ['COMFORT', '#3a86ff', -18], ['SPORT', '#ff3b30', 18], ['TRACK', '#ffb000', 54]];

export default {
  id: 'au-drive-mode-knob',
  credit: 'Drive mode selector knob (BMW / Hyundai N style) — twist through ECO, COMFORT, SPORT, TRACK and the whole cluster re-themes: green, blue, red, amber',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { --c: #3a86ff; display: flex; align-items: center; gap: 14px; width: 310px; max-width: 100%; padding: 14px; border-radius: 12px; background: radial-gradient(circle at 25% 50%, color-mix(in srgb, var(--c) 16%, #0a0b0d), #050506 70%); transition: background .5s; user-select: none; font: 600 10px/1 Inter, system-ui, sans-serif; color: #fff; }
    .cl { position: relative; flex: none; width: 128px; height: 128px; }
    .cl svg { width: 100%; height: 100%; }
    .trk { fill: none; stroke: #1d2026; stroke-width: 7; stroke-linecap: round; }
    .val { fill: none; stroke: var(--c); stroke-width: 7; stroke-linecap: round; stroke-dasharray: var(--d, 110) 400; transition: stroke .5s, stroke-dasharray .7s cubic-bezier(.2,0,0,1); filter: drop-shadow(0 0 5px var(--c)); }
    .mn { position: absolute; left: 0; right: 0; top: 50px; text-align: center; font: 700 15px/1 Inter, system-ui, sans-serif; letter-spacing: .12em; color: var(--c); transition: color .5s; text-shadow: 0 0 10px color-mix(in srgb, var(--c) 60%, transparent); }
    .sub { position: absolute; left: 0; right: 0; top: 72px; text-align: center; color: #7d838d; font-weight: 500; letter-spacing: .1em; }
    .sel { position: relative; flex: 1; height: 128px; }
    .lab { position: absolute; transform: translate(-50%, -50%); padding: 3px 4px; border: 0; background: transparent; color: #5d636c; font: inherit; letter-spacing: .08em; cursor: pointer; transition: color .3s, text-shadow .3s; }
    .lab[aria-checked="true"] { color: var(--c); text-shadow: 0 0 8px var(--c); }
    .lab:hover { color: #c9cdd3; }
    .knob { position: absolute; left: 50%; top: 74px; width: 70px; height: 70px; margin: -35px; border-radius: 50%; overflow: hidden; cursor: grab; touch-action: none; background: radial-gradient(circle at 40% 30%, #3b3e44, #121316 70%); box-shadow: 0 0 0 3px #1a1c20, 0 0 0 4px color-mix(in srgb, var(--c) 70%, #000), 0 0 14px color-mix(in srgb, var(--c) 45%, transparent), 0 6px 10px rgba(0,0,0,.7); transition: box-shadow .5s; }
    .knob i { position: absolute; inset: 0; border-radius: 50%; transition: transform .3s cubic-bezier(.3,1.5,.5,1); }
    .drag .knob i { transition: none; }
    .knob i::after { content: ''; position: absolute; left: 50%; top: 6px; width: 4px; height: 12px; margin-left: -2px; border-radius: 2px; background: var(--c); box-shadow: 0 0 6px var(--c); transition: background .5s; }
    .knob:focus-visible, .lab:focus-visible { outline: 2px solid var(--c); outline-offset: 4px; }
  `,
  html: `
    <div class="stage">
      <div class="cl"><svg viewBox="0 0 128 128" aria-hidden="true"><path class="trk" d="M24 100A54 54 0 1 1 104 100"/><path class="val" d="M24 100A54 54 0 1 1 104 100"/></svg><div class="mn">COMFORT</div><div class="sub">DRIVE MODE</div></div>
      <div class="sel">
        ${M.map(([n], i) => `<button class="lab" type="button" role="radio" aria-checked="${i === 1}" style="left:${[12, 29, 71, 89][i]}%;top:${[54, 16, 16, 54][i]}px">${n}</button>`).join('')}
        <div class="knob" tabindex="0" role="slider" aria-label="Drive mode" aria-valuemin="0" aria-valuemax="3" aria-valuenow="1" aria-valuetext="COMFORT"><i></i></div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), knob = root.querySelector('.knob'), ind = knob.querySelector('i'), mn = root.querySelector('.mn'), labs = [...root.querySelectorAll('.lab')];
    const DASH = [70, 140, 210, 262];
    let m = 1, drag = false, last = 0, acc = 0, moved = 0;
    const set = (i) => {
      m = Math.max(0, Math.min(3, i)); const [n, c, a] = M[m];
      stage.style.setProperty('--c', c); stage.style.setProperty('--d', DASH[m]);
      ind.style.transform = `rotate(${a}deg)`; mn.textContent = n;
      labs.forEach((l, j) => l.setAttribute('aria-checked', String(j === m)));
      knob.setAttribute('aria-valuenow', m); knob.setAttribute('aria-valuetext', n);
    };
    labs.forEach((l, i) => l.addEventListener('click', () => set(i)));
    const ang = (e) => { const r = knob.getBoundingClientRect(); return Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2) * 180 / Math.PI; };
    knob.addEventListener('pointerdown', (e) => { drag = true; last = ang(e); acc = 0; moved = 0; knob.setPointerCapture(e.pointerId); stage.classList.add('drag'); });
    knob.addEventListener('pointermove', (e) => {
      if (!drag) return; const a = ang(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a; acc += d; moved += Math.abs(d);
      ind.style.transform = `rotate(${M[m][2] + Math.max(-14, Math.min(14, acc))}deg)`;
      if (acc > 22 && m < 3) { acc = 0; set(m + 1); } else if (acc < -22 && m > 0) { acc = 0; set(m - 1); }
    });
    const end = () => { if (!drag) return; drag = false; stage.classList.remove('drag'); set(m); };
    knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
    knob.addEventListener('click', () => { if (moved < 4) set((m + 1) % 4); });
    knob.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); set(m + 1); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); set(m - 1); }
    });
    set(1);
  },
};
