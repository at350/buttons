const TICKS = Array.from({ length: 9 }, (_, i) => {
  const a = (-135 + i * 33.75) * Math.PI / 180, s = Math.sin(a), c = Math.cos(a);
  return `<line x1="${(70 + 54 * s).toFixed(1)}" y1="${(70 - 54 * c).toFixed(1)}" x2="${(70 + 46 * s).toFixed(1)}" y2="${(70 - 46 * c).toFixed(1)}"/><text x="${(70 + 36 * s).toFixed(1)}" y="${(74 - 36 * c).toFixed(1)}">${i}</text>`;
}).join('');

export default {
  id: 'au-porsche-key-start',
  credit: 'Porsche 911 (992) / Taycan — the key-shaped ignition twist switch left of the wheel: turn it right to start and the centre tachometer needle sweeps then settles at idle',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: center; gap: 18px; width: 300px; max-width: 100%; padding: 16px; border-radius: 12px; background: radial-gradient(circle at 30% 40%, #232323, #0c0c0c 75%); user-select: none; }
    .tach { width: 140px; height: 140px; flex: none; border-radius: 50%; background: #0a0a0a; box-shadow: 0 0 0 3px #3a3a3a, 0 0 0 5px #111, 0 6px 16px rgba(0,0,0,.7); }
    .tach svg { width: 100%; height: 100%; }
    .tach line { stroke: #555; stroke-width: 2; transition: stroke .4s; }
    .tach text { fill: #555; font: 600 11px/1 Inter, 'Helvetica Neue', system-ui, sans-serif; text-anchor: middle; transition: fill .4s; }
    .tach .red { fill: none; stroke: #5a1010; stroke-width: 4; transition: stroke .4s; }
    .tach .lbl { font-size: 6px; letter-spacing: .1em; font-weight: 500; }
    .lit .tach line, .lit .tach text { stroke: #f2f2f2; fill: #f2f2f2; }
    .lit .tach .red { stroke: #e2231a; }
    .ndl { transform-origin: 70px 70px; transform: rotate(-135deg); transition: transform .5s cubic-bezier(.3,1.4,.5,1); }
    .ndl path { fill: #ff5a1f; }
    .run .ndl { animation: sweep 1.3s cubic-bezier(.4,0,.2,1) forwards; }
    @keyframes sweep { 0% { transform: rotate(-135deg); } 45% { transform: rotate(135deg); } 100% { transform: rotate(-104deg); } }
    .run.idle .ndl { animation: idle .35s ease-in-out infinite alternate; }
    @keyframes idle { from { transform: rotate(-105deg); } to { transform: rotate(-102deg); } }
    .hub { fill: #222; stroke: #444; }
    .sw { position: relative; width: 100px; height: 100px; flex: none; border-radius: 50%; background: radial-gradient(circle, #1b1b1b 56%, #3c3c3c 58%, #0f0f0f 62%, #222 100%); box-shadow: inset 0 2px 3px rgba(255,255,255,.08), 0 4px 10px rgba(0,0,0,.7); }
    .pos { position: absolute; inset: 0; }
    .pos text { fill: #8a8a8a; font: 600 6px/1 Inter, system-ui, sans-serif; text-anchor: middle; letter-spacing: .05em; }
    .pos .s { font-size: 5.2px; letter-spacing: 0; }
    .key { position: absolute; left: 50%; top: 50%; width: 58px; height: 58px; margin: -29px; border-radius: 50%; cursor: grab; touch-action: none; background: radial-gradient(circle at 40% 35%, #3a3a3a, #121212 70%); box-shadow: 0 3px 6px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.12); transition: transform .45s cubic-bezier(.3,1.5,.5,1); }
    .key.drag { transition: none; cursor: grabbing; }
    .key::before { content: ''; position: absolute; left: 50%; top: 4px; bottom: 4px; width: 16px; margin-left: -8px; border-radius: 8px; background: linear-gradient(90deg, #0d0d0d, #4a4a4a 45%, #2a2a2a 55%, #0d0d0d); box-shadow: 0 0 0 1px #000; }
    .key::after { content: ''; position: absolute; left: 50%; top: 8px; width: 3px; height: 8px; margin-left: -1.5px; border-radius: 2px; background: #9a9a9a; }
    .lit .key::after { background: #ff5a1f; box-shadow: 0 0 4px #ff5a1f; }
    .key:focus-visible { outline: 2px solid #ff5a1f; outline-offset: 4px; }
  `,
  html: `
    <div class="stage">
      <div class="tach"><svg viewBox="0 0 140 140" aria-hidden="true">${TICKS}
        <path class="red" d="M${(70 + 50 * Math.sin(1.7671)).toFixed(1)} ${(70 - 50 * Math.cos(1.7671)).toFixed(1)}A50 50 0 0 1 ${(70 + 50 * Math.sin(2.3562)).toFixed(1)} ${(70 - 50 * Math.cos(2.3562)).toFixed(1)}"/>
        <text class="lbl" x="70" y="119">1/min x1000</text>
        <g class="ndl"><path d="M68.6 72 70 18l1.4 54z"/></g><circle class="hub" cx="70" cy="70" r="7"/></svg></div>
      <div class="sw">
        <svg class="pos" viewBox="0 0 100 100" aria-hidden="true"><text x="50" y="13">OFF</text><text x="79.5" y="24">ON</text><text class="s" x="89.5" y="52">START</text></svg>
        <div class="key" tabindex="0" role="switch" aria-checked="false" aria-label="Ignition"></div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), key = root.querySelector('.key');
    let ang = 0, base = 0, start = 0, drag = false, moved = 0, running = false, t = 0;
    const at = (e) => { const r = key.getBoundingClientRect(); return Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2) * 180 / Math.PI; };
    const set = (a) => { ang = a; key.style.transform = `rotate(${a}deg)`; };
    const go = (run) => {
      running = run; clearTimeout(t);
      stage.classList.toggle('lit', run); stage.classList.remove('idle'); stage.classList.toggle('run', run);
      if (run) t = setTimeout(() => stage.classList.add('idle'), 1300);
      key.setAttribute('aria-checked', String(run));
      set(run ? 45 : 0);
    };
    key.addEventListener('pointerdown', (e) => { drag = true; moved = 0; base = ang; start = at(e); key.setPointerCapture(e.pointerId); key.classList.add('drag'); });
    key.addEventListener('pointermove', (e) => {
      if (!drag) return;
      let d = at(e) - start; if (d > 180) d -= 360; if (d < -180) d += 360;
      moved = Math.max(moved, Math.abs(d)); set(Math.max(0, Math.min(80, base + d)));
      stage.classList.toggle('lit', running || ang > 30);
    });
    const end = () => {
      if (!drag) return; drag = false; key.classList.remove('drag');
      if (moved < 4) go(!running);
      else if (ang >= 66) go(true);
      else if (ang < 20) go(false);
      else set(running ? 45 : 0), stage.classList.toggle('lit', running);
    };
    key.addEventListener('pointerup', end); key.addEventListener('pointercancel', end);
    key.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(!running); } });
    return () => clearTimeout(t);
  },
};
