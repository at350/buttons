// CNC manual pulse generator pendant (Fanuc-style MPG): 100-detent handwheel with engraved dial and
// crank, axis selector (OFF X Y Z 4) and increment selector (×1 ×10 ×100 = 0.001 / 0.01 / 0.1 mm per
// pulse). Turn the wheel (drag it round, or ←/→) and the DRO counts pulses; each detent flashes the
// pulse LED. With the axis at OFF the wheel spins free.
const TICKS = Array.from({ length: 100 }, (_, i) => { const a = i * 3.6 * Math.PI / 180, r2 = i % 10 ? 47 : 44; return `<line x1="${(55 + 50 * Math.sin(a)).toFixed(2)}" y1="${(55 - 50 * Math.cos(a)).toFixed(2)}" x2="${(55 + r2 * Math.sin(a)).toFixed(2)}" y2="${(55 - r2 * Math.cos(a)).toFixed(2)}"/>`; }).join('')
  + Array.from({ length: 10 }, (_, i) => { const a = i * 36 * Math.PI / 180; return `<text x="${(55 + 38 * Math.sin(a)).toFixed(1)}" y="${(57.5 - 38 * Math.cos(a)).toFixed(1)}">${i * 10}</text>`; }).join('');
const sel = (cls, opts, step) => {
  const a0 = -step * (opts.length - 1) / 2;
  return `<div class="sel ${cls}">${opts.map((o, i) => { const a = (a0 + i * step) * Math.PI / 180; return `<span style="left:${(30 + 25 * Math.sin(a)).toFixed(1)}px;top:${(33 - 25 * Math.cos(a)).toFixed(1)}px">${o}</span>`; }).join('')}
    <button class="sk" type="button" role="slider" aria-valuemin="0" aria-valuemax="${opts.length - 1}"><i style="transform:rotate(${a0}deg)"></i></button></div>`;
};
export default {
  id: 'nd-cnc-mpg',
  credit: 'Fanuc-style CNC MPG handwheel pendant — 100-detent dial with crank, axis (OFF X Y Z 4) and ×1 / ×10 / ×100 selectors; the DRO counts pulses',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; align-items: center; gap: 12px; padding: 12px; border-radius: 12px; overflow: hidden; user-select: none; -webkit-user-select: none;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.035) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #34383c, #1b1d20); box-shadow: inset 0 1px 0 rgba(255,255,255,.12); }
    .wheel { position: relative; width: 120px; height: 120px; border-radius: 50%; background: radial-gradient(circle, #1a1c1e 60%, #3c4044 64%, #0d0e0f 100%); }
    .wheel svg { position: absolute; left: 5px; top: 5px; width: 110px; height: 110px; cursor: grab; touch-action: none; outline: none; }
    .wheel svg.drag { cursor: grabbing; }
    .wheel svg:focus-visible { outline: 2px solid #ffd21a; outline-offset: 2px; border-radius: 50%; }
    .dial line { stroke: #111; stroke-width: .9; } .dial text { font: 700 6.5px "DM Sans", Inter, Arial, sans-serif; fill: #111; text-anchor: middle; }
    .idx { position: absolute; left: 55px; top: 0; width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 8px solid #e8261c; z-index: 1; }
    .dro { width: 124px; padding: 6px 8px; border-radius: 4px; background: #0a1a12; box-shadow: inset 0 1px 3px #000, 0 0 0 1px #3a3f44; font: 600 15px/1 "IBM Plex Mono", ui-monospace, monospace; color: #6cff9a; text-shadow: 0 0 5px rgba(100,255,150,.45); display: flex; justify-content: space-between; align-items: center; }
    .dro b { font-weight: 600; } .dro i { width: 7px; height: 7px; border-radius: 50%; background: #123a20; transition: background .04s; } .dro i.on { background: #6cff9a; box-shadow: 0 0 5px #6cff9a; transition: none; }
    .sels { display: flex; gap: 6px; margin-top: 8px; }
    .sel { position: relative; width: 60px; height: 62px; }
    .sel span { position: absolute; transform: translate(-50%, -50%); font: 800 7px/1 "DM Sans", Inter, Arial, sans-serif; color: #f2f2ee; white-space: nowrap; }
    .sk { position: absolute; left: 16px; top: 19px; width: 28px; height: 28px; border-radius: 50%; border: 0; padding: 0; cursor: pointer;
      background: radial-gradient(circle at 45% 35%, #50555a, #17191b 70%); box-shadow: 0 3px 4px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.2); }
    .sk i { position: absolute; inset: 0; transition: transform .12s cubic-bezier(.3,1.6,.5,1); }
    .sk i::after { content: ''; position: absolute; left: 12px; top: 2px; width: 4px; height: 12px; border-radius: 2px; background: #f2f2ee; }
    .sk:focus-visible { outline: 2px solid #ffd21a; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="wheel"><span class="idx"></span>
        <svg viewBox="0 0 110 110" role="slider" tabindex="0" aria-label="Handwheel" aria-valuetext="0 pulses">
          <defs><radialGradient id="mpgd" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#d4d8db"/><stop offset="1" stop-color="#9ba1a6"/></radialGradient></defs>
          <g class="rot"><circle cx="55" cy="55" r="51" fill="url(#mpgd)"/><g class="dial">${TICKS}</g>
            <circle cx="55" cy="55" r="27" fill="#24272a"/><circle cx="55" cy="55" r="27" fill="none" stroke="#5a5f64"/>
            <circle cx="55" cy="38" r="8" fill="#0f1012" stroke="#46494d"/><circle cx="53" cy="36" r="3" fill="#3b3f43"/></g>
        </svg></div>
      <div><div class="dro"><b class="ax">X</b><b class="pos">+000.000</b><i class="led"></i></div>
        <div class="sels">${sel('axis', ['OFF', 'X', 'Y', 'Z', '4'], 30)}${sel('inc', ['×1', '×10', '×100'], 40)}</div></div>
    </div>`,
  init(root) {
    const svg = root.querySelector('.wheel svg'), rot = root.querySelector('.rot'), posEl = root.querySelector('.pos'), axEl = root.querySelector('.ax'), led = root.querySelector('.led');
    const AX = ['OFF', 'X', 'Y', 'Z', '4'], INC = [1, 10, 100];
    const S = { axis: 1, inc: 0 }, pos = { X: 0, Y: 0, Z: 0, 4: 0 };
    let ang = 0, last = 0, acc = 0, drag = false, pulses = 0, lt = 0;
    const draw = () => {
      rot.style.transformOrigin = '55px 55px'; rot.style.transform = `rotate(${ang}deg)`;
      const a = AX[S.axis]; axEl.textContent = a === 'OFF' ? '-' : a;
      const v = a === 'OFF' ? 0 : pos[a] / 1000; posEl.textContent = (v < 0 ? '-' : '+') + Math.abs(v).toFixed(3).padStart(7, '0');
      svg.setAttribute('aria-valuetext', `${pulses} pulses`);
    };
    const pulse = (d) => {
      pulses += d; const a = AX[S.axis]; if (a !== 'OFF') pos[a] = Math.max(-999999, Math.min(999999, pos[a] + d * INC[S.inc]));
      led.classList.add('on'); clearTimeout(lt); lt = setTimeout(() => led.classList.remove('on'), 40); draw();
    };
    const angleAt = (e) => { const r = svg.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    svg.addEventListener('pointerdown', (e) => { drag = true; last = angleAt(e); svg.setPointerCapture(e.pointerId); svg.classList.add('drag'); });
    svg.addEventListener('pointermove', (e) => {
      if (!drag) return; const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      ang += d; acc += d; while (acc >= 3.6) { acc -= 3.6; pulse(1); } while (acc <= -3.6) { acc += 3.6; pulse(-1); } draw();
    });
    const end = () => { drag = false; svg.classList.remove('drag'); ang -= acc; acc = 0; draw(); };
    svg.addEventListener('pointerup', end); svg.addEventListener('pointercancel', end);
    svg.addEventListener('keydown', (e) => { const d = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0; if (d) { e.preventDefault(); ang += d * 3.6; pulse(d); } });
    for (const [k, n, step] of [['axis', 5, 30], ['inc', 3, 40]]) {
      const b = root.querySelector(`.${k} .sk`), i = b.firstElementChild, a0 = -step * (n - 1) / 2;
      b.setAttribute('aria-label', k === 'axis' ? 'Axis select' : 'Increment');
      const set = (v) => { S[k] = (v + n) % n; i.style.transform = `rotate(${a0 + S[k] * step}deg)`; b.setAttribute('aria-valuenow', S[k]); draw(); };
      b.addEventListener('click', () => set(S[k] + 1));
      b.addEventListener('keydown', (e) => { const d = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0; if (d) { e.preventDefault(); set(Math.max(0, Math.min(n - 1, S[k] + d))); } });
      set(S[k]);
    }
    return () => clearTimeout(lt);
  },
};
