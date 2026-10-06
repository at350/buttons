export default {
  id: 'ty2-etch-a-sketch',
  credit: 'Ohio Art Etch A Sketch (1960) — twist the left knob for across, the right knob for up/down; double-click to shake it clean',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 14px; border-radius: 12px; overflow: hidden; background: linear-gradient(#f3efe6, #ddd6c6); }
    .frame { position: relative; width: 252px; padding: 26px 18px 52px; border-radius: 22px;
      background: radial-gradient(ellipse at 30% 10%, #ff6b5e, #e1251b 35%, #a3140e);
      box-shadow: 0 7px 0 #7a0e09, 0 12px 16px rgba(60,10,0,.35), inset 0 2px 0 rgba(255,255,255,.4), inset 0 -4px 8px rgba(0,0,0,.2); }
    .frame.shake { animation: shake .5s cubic-bezier(.36,.07,.19,.97); }
    @keyframes shake { 15% { transform: translate(-5px, 2px) rotate(-2deg); } 30% { transform: translate(5px, -2px) rotate(2deg); }
      45% { transform: translate(-4px, 1px) rotate(-1.5deg); } 60% { transform: translate(4px, -1px) rotate(1.5deg); } 80% { transform: translate(-2px, 0) rotate(-.5deg); } }
    .logo { position: absolute; left: 0; right: 0; top: 6px; text-align: center; font: italic 800 13px/1 'Bricolage Grotesque', Georgia, serif;
      color: #f4c430; text-shadow: 0 1px 0 #7a5a00, 0 0 1px #fff3b0; letter-spacing: .01em; }
    .screen { display: block; width: 216px; height: 136px; border-radius: 6px;
      background: radial-gradient(ellipse at 40% 30%, #d9d9d2, #bdbdb4 80%); box-shadow: inset 0 0 0 3px #8a8a84, inset 0 4px 10px rgba(0,0,0,.35); }
    .knob { position: absolute; bottom: 9px; width: 36px; height: 36px; border-radius: 50%; cursor: grab; touch-action: none;
      background: radial-gradient(circle at 40% 35%, #fff 0 38%, #e8e8e8 48%, transparent 50%),
        repeating-conic-gradient(#f4f4f4 0 6deg, #cfcfcf 6deg 12deg);
      box-shadow: 0 4px 0 #b3b3b3, 0 6px 6px rgba(0,0,0,.35); }
    .knob::after { content: ''; position: absolute; left: 50%; top: 4px; width: 4px; height: 8px; margin-left: -2px; border-radius: 2px; background: #d6d6d6; }
    .kl { left: 10px; } .kr { right: 10px; }
    .knob.drag { cursor: grabbing; }
    .knob:focus-visible { outline: 3px solid #f4c430; outline-offset: 2px; }
  `,
  html: `
    <div class="stage"><div class="frame">
      <span class="logo">Etch A Sketch</span>
      <canvas class="screen" width="216" height="136"></canvas>
      <div class="knob kl" role="slider" tabindex="0" aria-label="horizontal knob" aria-valuemin="0" aria-valuemax="216"></div>
      <div class="knob kr" role="slider" tabindex="0" aria-label="vertical knob" aria-valuemin="0" aria-valuemax="136"></div>
    </div></div>`,
  init(root) {
    const cv = root.querySelector('canvas'), frame = root.querySelector('.frame');
    const W = 216, H = 136, dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr;
    const g = cv.getContext('2d'); g.scale(dpr, dpr);
    let x = 40, y = 96, t = 0;
    const pen = () => { g.strokeStyle = '#3c3c3c'; g.lineWidth = 1.4; g.lineCap = 'round'; };
    const line = (nx, ny) => {
      nx = Math.max(2, Math.min(W - 2, nx)); ny = Math.max(2, Math.min(H - 2, ny));
      pen(); g.beginPath(); g.moveTo(x, y); g.lineTo(nx, ny); g.stroke(); x = nx; y = ny;
    };
    // a few starting strokes: a little house
    [[40, 56], [80, 30], [120, 56], [120, 96], [40, 96], [40, 56], [120, 56]].forEach(([a, b]) => line(a, b));
    const knobs = [...root.querySelectorAll('.knob')];
    knobs.forEach((k, idx) => {
      let on = false, prev = 0, rot = 0;
      const ang = (e) => { const r = k.getBoundingClientRect(); return Math.atan2(e.clientX - r.left - r.width / 2, -(e.clientY - r.top - r.height / 2)) * 180 / Math.PI; };
      const turn = (d) => {
        rot += d; k.style.transform = `rotate(${rot}deg)`;
        const px = d * 0.35; if (idx === 0) line(x + px, y); else line(x, y - px);
        k.setAttribute('aria-valuenow', Math.round(idx ? y : x));
      };
      k.addEventListener('pointerdown', (e) => { on = true; prev = ang(e); k.setPointerCapture(e.pointerId); k.classList.add('drag'); });
      k.addEventListener('pointermove', (e) => { if (!on) return; const a = ang(e); let d = a - prev; if (d > 180) d -= 360; if (d < -180) d += 360; prev = a; turn(d); });
      const up = () => { on = false; k.classList.remove('drag'); };
      k.addEventListener('pointerup', up); k.addEventListener('pointercancel', up); k.addEventListener('lostpointercapture', up);
      k.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 20, ArrowUp: 20, ArrowLeft: -20, ArrowDown: -20 }[e.key];
        if (d) { e.preventDefault(); turn(d); }
      });
    });
    frame.addEventListener('dblclick', (e) => {
      if (e.target.closest('.knob')) return;
      frame.classList.remove('shake'); void frame.offsetWidth; frame.classList.add('shake');
      let a = 1; clearInterval(t);
      t = setInterval(() => { a -= 0.2; g.fillStyle = 'rgba(205,205,197,.55)'; g.fillRect(0, 0, W, H); if (a <= 0) { clearInterval(t); g.clearRect(0, 0, W, H); } }, 80);
    });
    return () => clearInterval(t);
  },
};
