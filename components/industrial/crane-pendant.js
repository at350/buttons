// Overhead crane pendant (Telemecanique XAC-style yellow station): red latching emergency stop, green
// ON (main contactor), and black hold-to-run motion buttons with direction arrows — hoist ↑↓, trolley
// ←→. The hoist beside it moves only while a button is held and power is on. Hitting the E-stop
// drops the contactor; click it again to twist-release, then ON.
const ARR = { u: 'M12 4l6 8h-4v8h-4v-8H6z', d: 'M12 20l6-8h-4V4h-4v8H6z', l: 'M4 12l8-6v4h8v4h-8v4z', r: 'M20 12l-8-6v4H4v4h8v4z' };
const mb = (k, lbl) => `<button class="mb" type="button" data-k="${k}" aria-label="${lbl}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ARR[k]}"/></svg></button>`;
export default {
  id: 'nd-crane-pendant',
  credit: 'Telemecanique XAC-style crane pendant — latching E-stop, green ON, hold-to-run hoist ↑↓ and trolley ←→ driving the hook',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; gap: 14px; padding: 12px 14px; border-radius: 12px; overflow: hidden; user-select: none; -webkit-user-select: none;
      background: linear-gradient(170deg, #d9dcde, #b9bec2); box-shadow: inset 0 1px 0 #fff; }
    .pend { position: relative; width: 84px; padding: 10px 8px 14px; border-radius: 12px 12px 18px 18px; display: flex; flex-direction: column; align-items: center; gap: 9px;
      background: radial-gradient(circle at 1px 1px, rgba(0,0,0,.06) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(90deg, #d79a00, #ffc21a 30%, #f5b400 70%, #c88f00);
      box-shadow: 0 3px 6px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.5); }
    .pend::before { content: ''; position: absolute; left: 34px; top: -12px; width: 16px; height: 12px; border-radius: 3px 3px 0 0; background: linear-gradient(90deg, #111, #444, #111); }
    .es { width: 50px; height: 50px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; transition: transform .08s;
      background: radial-gradient(circle at 45% 32%, #ff6a5a, #d7150f 50%, #870606); box-shadow: 0 4px 0 #6a0404, 0 6px 6px rgba(0,0,0,.4), inset 0 1px 2px rgba(255,255,255,.4); transform: translateY(-3px); }
    .es[aria-pressed="true"] { transform: translateY(1px); box-shadow: 0 0 0 #6a0404, 0 1px 2px rgba(0,0,0,.5), inset 0 1px 2px rgba(255,255,255,.3); }
    .on { width: 34px; height: 26px; border-radius: 13px; border: 0; padding: 0; cursor: pointer; font: 800 12px/1 "DM Sans", Inter, Arial, sans-serif; color: #fff;
      background: linear-gradient(#2fa553, #1a7a37); box-shadow: 0 3px 0 #0e4a21, inset 0 1px 0 rgba(255,255,255,.3); }
    .stage.pw .on { background: radial-gradient(circle at 50% 40%, #b7ffc8, #34d562 60%, #1a9a40); box-shadow: 0 3px 0 #0e4a21, 0 0 10px 2px rgba(60,240,100,.6); color: #0b3a18; }
    .grid { display: grid; grid-template-columns: repeat(2, 30px); gap: 8px; }
    .mb { width: 30px; height: 30px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; display: grid; place-items: center; touch-action: none;
      background: radial-gradient(circle at 48% 34%, #4b4d50, #1b1c1e 60%, #050506); box-shadow: 0 3px 0 #000, 0 4px 3px rgba(0,0,0,.4), inset 0 1px 1px rgba(255,255,255,.25); transform: translateY(-2px); }
    .mb svg { width: 15px; height: 15px; fill: #f2f2ee; }
    .mb.down { transform: translateY(1px); box-shadow: 0 0 0 #000, inset 0 2px 3px rgba(0,0,0,.6); }
    .es:focus-visible, .on:focus-visible, .mb:focus-visible { outline: 2px solid #0b2a6b; outline-offset: 3px; }
    .bay { position: relative; width: 128px; height: 206px; border-radius: 6px; background: linear-gradient(#eef0f1, #cfd4d7); box-shadow: inset 0 0 0 1px rgba(0,0,0,.12); overflow: hidden; }
    .beam { position: absolute; left: 0; right: 0; top: 10px; height: 12px; background: repeating-linear-gradient(135deg, #f5b400 0 8px, #222 8px 16px); }
    .trol { position: absolute; top: 4px; left: 0; width: 34px; transform: translateX(var(--x, 47px)); }
    .trol::before { content: ''; position: absolute; left: 0; top: 0; width: 34px; height: 22px; border-radius: 3px; background: linear-gradient(#5b6268, #343a3f); box-shadow: 0 2px 3px rgba(0,0,0,.35); }
    .cab { position: absolute; left: 16px; top: 22px; width: 2px; height: var(--l, 70px); background: repeating-linear-gradient(#6b6f72 0 2px, #2f3336 2px 4px); }
    .hook { position: absolute; left: 7px; top: calc(22px + var(--l, 70px)); width: 20px; height: 28px; }
    .hook svg { width: 20px; height: 28px; fill: none; stroke: #2a2e31; stroke-width: 3; stroke-linecap: round; }
    .hook svg rect { fill: #f5b400; stroke: #2a2e31; stroke-width: 1.2; }
  `,
  html: `
    <div class="stage">
      <div class="pend">
        <button class="es" type="button" aria-pressed="false" aria-label="Emergency stop"></button>
        <button class="on" type="button" aria-label="On">I</button>
        <div class="grid">${mb('u', 'Hoist up')}${mb('d', 'Hoist down')}${mb('l', 'Trolley left')}${mb('r', 'Trolley right')}</div>
      </div>
      <div class="bay" aria-hidden="true"><div class="beam"></div>
        <div class="trol"><span class="cab"></span><span class="hook"><svg viewBox="0 0 20 28"><rect x="4" y="1" width="12" height="9" rx="2"/><path d="M10 10v6a5 5 0 1 1-5 5"/></svg></span></div></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), es = root.querySelector('.es'), on = root.querySelector('.on'), trol = root.querySelector('.trol');
    let power = false, estop = false, x = 47, l = 70, raf = 0, t0 = 0; const held = new Set();
    const draw = () => { trol.style.setProperty('--x', x.toFixed(1) + 'px'); trol.style.setProperty('--l', l.toFixed(1) + 'px'); stage.classList.toggle('pw', power); };
    const tick = (t) => {
      const dt = t0 ? Math.min(0.05, (t - t0) / 1000) : 0; t0 = t;
      if (power) {
        if (held.has('u')) l = Math.max(10, l - 45 * dt); if (held.has('d')) l = Math.min(146, l + 45 * dt);
        if (held.has('l')) x = Math.max(2, x - 40 * dt); if (held.has('r')) x = Math.min(92, x + 40 * dt);
      }
      draw(); if (held.size && power) raf = requestAnimationFrame(tick); else { raf = 0; t0 = 0; }
    };
    const kick = () => { if (!raf && held.size && power) raf = requestAnimationFrame(tick); };
    for (const b of root.querySelectorAll('.mb')) {
      const k = b.dataset.k;
      const down = () => { held.add(k); b.classList.add('down'); kick(); };
      const up = () => { held.delete(k); b.classList.remove('down'); };
      b.addEventListener('pointerdown', (e) => { b.setPointerCapture(e.pointerId); down(); });
      b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('lostpointercapture', up);
      b.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); down(); } });
      b.addEventListener('keyup', up); b.addEventListener('blur', up);
    }
    on.addEventListener('click', () => { if (!estop) { power = true; draw(); kick(); } });
    es.addEventListener('click', () => { estop = !estop; es.setAttribute('aria-pressed', estop); if (estop) power = false; draw(); });
    draw();
    return () => cancelAnimationFrame(raf);
  },
};
