// Eppendorf Research plus 10–100 µL single-channel pipette (yellow-coded operating button).
// Twist the operating button — drag it sideways, or arrow keys — and the 4-drum counter rolls
// (tenths in red). Click the button to aspirate, again to dispense with blow-out; the grey tab
// ejects the tip and a fresh one is fitted.
const COL = Array.from({ length: 10 }, (_, d) => `<b>${d}</b>`).join('');
export default {
  id: 'nd-eppendorf-pipette',
  credit: 'Eppendorf Research plus 10–100 µL pipette — twist the yellow operating button to roll the volume counter, press to aspirate / dispense, eject the tip',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 12px 34px 4px; border-radius: 12px; overflow: hidden; background: linear-gradient(170deg, #e6ecef, #cdd6db); box-shadow: inset 0 1px 0 #fff; }
    .pip { position: relative; width: 76px; height: 230px; }
    .op { position: absolute; left: 22px; top: 0; width: 32px; height: 18px; border: 0; padding: 0; border-radius: 7px 7px 4px 4px; cursor: ew-resize; touch-action: none; z-index: 2;
      background: repeating-linear-gradient(90deg, rgba(0,0,0,.14) 0 1.5px, transparent 1.5px 4px) var(--gx, 0) 0 / auto 100%, linear-gradient(90deg, #b48900, #ffd400 35%, #f2c200 65%, #a37b00);
      box-shadow: 0 2px 2px rgba(0,0,0,.35), inset 0 2px 0 rgba(255,255,255,.45); transition: transform .12s ease-out; }
    .op:focus-visible, .ej:focus-visible { outline: 2px solid #0a5aa8; outline-offset: 2px; }
    .op.p1 { transform: translateY(7px); } .op.p2 { transform: translateY(11px); }
    .stem { position: absolute; left: 31px; top: 14px; width: 14px; height: 20px; background: linear-gradient(90deg, #7b858d, #d5dbe0 45%, #8b959d); }
    .hd { position: absolute; left: 14px; top: 30px; width: 48px; height: 104px; border-radius: 16px 16px 12px 12px;
      background: linear-gradient(90deg, #a9b4bd, #f5f7f8 30%, #e2e7eb 60%, #9aa6b0); box-shadow: inset 0 0 0 1px rgba(40,60,80,.25), 0 2px 4px rgba(0,0,0,.2); }
    .hook { position: absolute; left: 58px; top: 38px; width: 16px; height: 22px; border-radius: 0 10px 12px 0; background: linear-gradient(90deg, #c9d1d7, #8f9ba5); }
    .ej { position: absolute; left: 4px; top: 36px; width: 14px; height: 26px; border: 0; padding: 0; border-radius: 6px 2px 2px 6px; cursor: pointer;
      background: linear-gradient(90deg, #5f6b74, #9aa5ae); box-shadow: 0 1px 2px rgba(0,0,0,.3); transition: transform .08s; }
    .ej:active { transform: translateX(2px) translateY(2px); }
    .win { position: absolute; left: 21px; top: 56px; display: flex; gap: 1px; padding: 2px 3px; border-radius: 3px; background: #26303a; box-shadow: inset 0 1px 2px #000, 0 0 0 1px rgba(255,255,255,.6); }
    .dr { width: 7.5px; height: 13px; overflow: hidden; background: linear-gradient(#cfd3d6, #fff 40%, #fff 60%, #c3c8cc); }
    .col { display: flex; flex-direction: column; transition: transform .16s cubic-bezier(.3,1.3,.5,1); }
    .col b { height: 13px; font: 600 10px/13px "IBM Plex Mono", ui-monospace, monospace; color: #111; text-align: center; }
    .dr.red b { color: #d0161b; }
    .ul { position: absolute; left: 25px; top: 76px; font: 700 7px/1 "DM Sans", Inter, Arial, sans-serif; color: #2c3a46; letter-spacing: .3px; }
    .logo { position: absolute; left: 22px; top: 96px; width: 32px; height: 3px; border-radius: 2px; background: #1d5aa6; }
    .shaft { position: absolute; left: 25px; top: 132px; width: 26px; height: 46px; background: linear-gradient(90deg, #8b969f, #e8ecef 40%, #b5bec5 70%, #7f8a93);
      clip-path: polygon(0 0, 100% 0, 72% 100%, 28% 100%); }
    .tip { position: absolute; left: 31px; top: 172px; width: 14px; height: 56px; transition: transform .45s cubic-bezier(.5,0,.8,.4), opacity .45s;
      clip-path: polygon(0 0, 100% 0, 58% 100%, 42% 100%); background: linear-gradient(90deg, rgba(200,214,224,.55), rgba(255,255,255,.85) 40%, rgba(190,205,215,.5)); }
    .tip.gone { transform: translateY(40px); opacity: 0; transition: transform .45s cubic-bezier(.5,0,.8,.4), opacity .3s .15s; }
    .tip.new { transition: none; transform: translateY(14px); opacity: 0; }
    .liq { position: absolute; left: 0; right: 0; bottom: 0; height: 0; background: linear-gradient(90deg, #2b7fd0, #6fb6f5 45%, #2c7ccc); transition: height .5s ease-in-out; }
  `,
  html: `
    <div class="stage"><div class="pip">
      <div class="stem"></div><div class="hook"></div><div class="hd"></div>
      <button class="op" type="button" role="slider" aria-label="Volume, µL" aria-valuemin="10" aria-valuemax="100" aria-valuenow="50"></button>
      <button class="ej" type="button" aria-label="Eject tip"></button>
      <div class="win">${[0, 1, 2, 3].map((i) => `<span class="dr${i === 3 ? ' red' : ''}"><span class="col">${COL}</span></span>`).join('')}</div>
      <span class="ul">µL</span><span class="logo"></span>
      <div class="shaft"></div><div class="tip"><span class="liq"></span></div>
    </div></div>`,
  init(root) {
    const op = root.querySelector('.op'), ej = root.querySelector('.ej'), tip = root.querySelector('.tip'), liq = root.querySelector('.liq');
    const cols = root.querySelectorAll('.col');
    let vol = 500, full = false, drag = null, timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const draw = () => {
      String(vol).padStart(4, '0').split('').forEach((d, i) => { cols[i].style.transform = `translateY(${-13 * +d}px)`; });
      op.setAttribute('aria-valuenow', (vol / 10).toFixed(1)); op.style.setProperty('--gx', vol * 0.6 + 'px');
    };
    const setVol = (v) => { vol = Math.max(100, Math.min(1000, Math.round(v))); draw(); };
    const stroke = () => {
      if (tip.classList.contains('gone')) return;
      if (!full) { op.classList.add('p1'); later(() => { op.classList.remove('p1'); full = true; liq.style.height = (vol / 1000 * 36 + 4).toFixed(1) + '%'; }, 220); }
      else { op.classList.add('p2'); liq.style.height = '0'; full = false; later(() => op.classList.remove('p2'), 520); }
    };
    op.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, v: vol, moved: false }; op.setPointerCapture(e.pointerId); });
    op.addEventListener('pointermove', (e) => { if (!drag) return; const dx = e.clientX - drag.x; if (Math.abs(dx) > 3) drag.moved = true; if (drag.moved) setVol(drag.v + dx * 5); });
    op.addEventListener('pointerup', () => { if (drag && !drag.moved) stroke(); drag = null; });
    op.addEventListener('pointercancel', () => { drag = null; });
    op.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowUp' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowDown' || e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { e.preventDefault(); setVol(vol + d * (e.shiftKey ? 10 : 1)); } else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stroke(); }
    });
    ej.addEventListener('click', () => {
      if (tip.classList.contains('gone')) return;
      full = false; tip.classList.add('gone');
      later(() => { tip.classList.remove('gone'); tip.classList.add('new'); liq.style.transition = 'none'; liq.style.height = '0'; void tip.offsetWidth;
        tip.classList.remove('new'); liq.style.transition = ''; }, 900);
    });
    draw();
    return () => timers.forEach(clearTimeout);
  },
};
