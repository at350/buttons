const G = ['P', 'R', 'N', 'D', 'S'];
const ANG = [-48, -24, 0, 24, 48];

export default {
  id: 'au-jaguar-rotary',
  credit: 'Jaguar Drive Selector — the "heartbeat" START/STOP pulses red; start it and the knurled aluminium dial rises out of the console, then twist through P R N D S',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: center; justify-content: space-around; width: 300px; max-width: 100%; height: 180px; padding: 0 10px; border-radius: 12px; background: repeating-linear-gradient(90deg, rgba(255,255,255,.015) 0 1px, transparent 1px 3px), linear-gradient(#1d1d1f, #0e0e10); user-select: none; }
    .ss { position: relative; width: 70px; height: 70px; border: 0; padding: 0; border-radius: 50%; cursor: pointer; background: radial-gradient(circle at 45% 35%, #3b3b3d, #141415 70%); box-shadow: 0 0 0 3px #77797d, 0 0 0 5px #19191a, 0 6px 10px rgba(0,0,0,.7); color: #e8e8e8; font: 700 9px/1.25 Inter, 'Helvetica Neue', system-ui, sans-serif; letter-spacing: .14em; transition: transform .08s; }
    .ss::after { content: ''; position: absolute; inset: -3px; border-radius: 50%; box-shadow: 0 0 0 3px #e2231a, 0 0 14px 2px rgba(226,35,26,.8); opacity: 0; }
    .stage:not(.on) .ss::after { animation: beat 1.3s ease-in-out infinite; }
    @keyframes beat { 0%, 60%, 100% { opacity: 0; } 15% { opacity: 1; } 30% { opacity: .2; } 42% { opacity: .9; } }
    .on .ss { color: #fff; text-shadow: 0 0 6px rgba(255,255,255,.6); }
    .ss:active { transform: scale(.95); }
    .ss:focus-visible, .dial:focus-visible { outline: 2px solid #4da3ff; outline-offset: 6px; }
    .sel { position: relative; width: 150px; height: 150px; display: grid; place-items: center; }
    .lt { position: absolute; inset: 0; }
    .lt text { font: 700 13px/1 Inter, system-ui, sans-serif; text-anchor: middle; fill: #3a3a3c; transition: fill .2s, filter .2s; }
    .on .lt text { fill: #d9d9d9; }
    .on .lt text.cur { fill: #ff3b2f; filter: drop-shadow(0 0 3px rgba(255,59,47,.9)); }
    .well { width: 104px; height: 104px; margin-top: 18px; border-radius: 50%; background: #070708; box-shadow: inset 0 3px 8px rgba(0,0,0,.95), 0 0 0 2px #2c2c2e; display: grid; place-items: center; }
    .dial { position: relative; width: 94px; height: 94px; border-radius: 50%; cursor: grab; touch-action: none; transform: scale(.94); box-shadow: 0 0 0 rgba(0,0,0,0); transition: transform .9s cubic-bezier(.3,1.3,.5,1), box-shadow .9s; }
    .on .dial { transform: scale(1.08) translateY(-3px); box-shadow: 0 10px 14px rgba(0,0,0,.75), 0 0 0 1px #000; }
    .dial.drag { cursor: grabbing; }
    .knurl { position: absolute; inset: 0; border-radius: 50%; background: repeating-conic-gradient(#d4d7db 0 2deg, #7b8087 2deg 4deg); transition: transform .2s cubic-bezier(.3,1.4,.5,1); }
    .drag .knurl { transition: none; }
    .cap { position: absolute; inset: 9px; border-radius: 50%; background: radial-gradient(circle at 40% 30%, #f0f1f2, #a8acb2 45%, #6d7279 80%); box-shadow: inset 0 1px 0 #fff, 0 0 0 1px rgba(0,0,0,.4); }
    .cap::after { content: ''; position: absolute; inset: 16px; border-radius: 50%; background: radial-gradient(circle at 50% 30%, #2a2b2d, #0c0c0d); box-shadow: inset 0 2px 3px rgba(0,0,0,.8); }
  `,
  html: `
    <div class="stage">
      <button class="ss" type="button" aria-pressed="false" aria-label="Start stop">START<br>STOP</button>
      <div class="sel">
        <svg class="lt" viewBox="0 0 150 150" aria-hidden="true">${G.map((g, i) => { const a = ANG[i] * Math.PI / 180; return `<text x="${(75 + 64 * Math.sin(a)).toFixed(1)}" y="${(89 - 64 * Math.cos(a)).toFixed(1)}" class="${i ? '' : 'cur'}">${g}</text>`; }).join('')}</svg>
        <div class="well"><div class="dial" tabindex="0" role="slider" aria-label="Drive selector" aria-valuemin="0" aria-valuemax="4" aria-valuenow="0" aria-valuetext="P"><span class="knurl"></span><span class="cap"></span></div></div>
      </div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), ss = root.querySelector('.ss'), dial = root.querySelector('.dial'), kn = root.querySelector('.knurl'), ts = [...root.querySelectorAll('.lt text')];
    let g = 0, drag = false, last = 0, acc = 0;
    const set = (i) => {
      g = Math.max(0, Math.min(4, i));
      kn.style.transform = `rotate(${ANG[g]}deg)`;
      ts.forEach((t, j) => t.classList.toggle('cur', j === g));
      dial.setAttribute('aria-valuenow', g); dial.setAttribute('aria-valuetext', G[g]);
    };
    const on = () => stage.classList.contains('on');
    ss.addEventListener('click', () => { const v = !on(); stage.classList.toggle('on', v); ss.setAttribute('aria-pressed', String(v)); if (!v) set(0); });
    const ang = (e) => { const r = dial.getBoundingClientRect(); return Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2) * 180 / Math.PI; };
    dial.addEventListener('pointerdown', (e) => { if (!on()) return; drag = true; last = ang(e); acc = 0; dial.setPointerCapture(e.pointerId); dial.classList.add('drag'); });
    dial.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const a = ang(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a; acc += d;
      kn.style.transform = `rotate(${ANG[g] + Math.max(-10, Math.min(10, acc * .5))}deg)`;
      if (acc > 20 && g < 4) { acc = 0; set(g + 1); } else if (acc < -20 && g > 0) { acc = 0; set(g - 1); }
    });
    const end = () => { if (!drag) return; drag = false; dial.classList.remove('drag'); set(g); };
    dial.addEventListener('pointerup', end); dial.addEventListener('pointercancel', end);
    dial.addEventListener('keydown', (e) => {
      if (!on()) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); set(g + 1); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); set(g - 1); }
    });
  },
};
