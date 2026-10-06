// Telemecanique XY2SB two-hand control station (signal-yellow enclosure, two black shrouded
// pushbuttons, red emergency stop). EN 574 type IIIC logic: both buttons must go down within 0.5 s
// of each other and stay held; releasing either drops the output, and a new cycle needs both
// released first. One mouse can only press one — hold one and press Space (or F + J, or two fingers).
export default {
  id: 'nd-two-hand',
  credit: 'Telemecanique XY2SB two-hand control station — EN 574 IIIC synchronous hold (0.5 s), stroke counter and latching E-stop',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; display: inline-flex; align-items: center; gap: 18px; padding: 16px 20px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(circle at 1px 1px, rgba(0,0,0,.06) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #ffc21a, #e9a200);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.55), inset 0 -3px 0 rgba(0,0,0,.12); user-select: none; -webkit-user-select: none; }
    .shroud { width: 66px; height: 66px; border-radius: 50%; display: grid; place-items: center;
      background: radial-gradient(circle, #0d0d0e 0 52%, #f2b300 54%, #ffd34d 64%, #c98d00 100%);
      box-shadow: 0 3px 5px rgba(90,60,0,.45), inset 0 1px 1px rgba(255,255,255,.5); }
    .hb { width: 44px; height: 44px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; touch-action: none;
      background: radial-gradient(circle at 48% 34%, #4b4d50, #1b1c1e 60%, #050506);
      box-shadow: 0 4px 0 #000, 0 5px 4px rgba(0,0,0,.5), inset 0 1px 1px rgba(255,255,255,.25);
      transform: translateY(-3px); transition: transform .05s, box-shadow .05s; -webkit-tap-highlight-color: transparent; }
    .hb:hover { background: radial-gradient(circle at 48% 34%, #57595c, #222325 60%, #050506); }
    .hb.down { transform: translateY(1px); box-shadow: 0 0 0 #000, 0 1px 2px rgba(0,0,0,.6), inset 0 2px 3px rgba(0,0,0,.6); }
    .hb:focus-visible { outline: 2px solid #0b2a6b; outline-offset: 5px; }
    .mid { display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .lamp { width: 20px; height: 20px; border-radius: 50%; background: radial-gradient(circle at 50% 38%, #3cad62, #145d2c 70%); box-shadow: 0 0 0 3px #c7cbce, 0 0 0 4px #6d7277; }
    .stage.out .lamp { background: radial-gradient(circle at 50% 45%, #fff 0 10%, #6dff96 40%, #10b143); box-shadow: 0 0 0 3px #c7cbce, 0 0 0 4px #6d7277, 0 0 12px 3px rgba(70,255,120,.7); }
    .cnt { display: flex; gap: 1px; padding: 2px; border-radius: 2px; background: #111; box-shadow: 0 0 0 2px #8f949a; }
    .cnt b { width: 9px; height: 14px; display: grid; place-items: center; background: linear-gradient(#e8e8e2, #fff 50%, #d2d2cb); color: #111; font: 600 10px/1 "IBM Plex Mono", ui-monospace, monospace; }
    .es { width: 40px; height: 40px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; transition: transform .08s;
      background: radial-gradient(circle at 45% 32%, #ff6a5a, #d7150f 50%, #870606);
      box-shadow: 0 4px 0 #6a0404, 0 6px 6px rgba(0,0,0,.4), inset 0 1px 2px rgba(255,255,255,.4); transform: translateY(-3px); }
    .es[aria-pressed="true"] { transform: translateY(1px); box-shadow: 0 0 0 #6a0404, 0 1px 2px rgba(0,0,0,.5), inset 0 1px 2px rgba(255,255,255,.3); }
    .es:focus-visible { outline: 2px solid #0b2a6b; outline-offset: 4px; }
  `,
  html: `
    <div class="stage">
      <div class="shroud"><button class="hb" type="button" data-s="L" aria-label="Left hand button"></button></div>
      <div class="mid">
        <span class="lamp"></span>
        <button class="es" type="button" aria-pressed="false" aria-label="Emergency stop"></button>
        <span class="cnt"><b>0</b><b>0</b><b>0</b><b>0</b></span>
      </div>
      <div class="shroud"><button class="hb" type="button" data-s="R" aria-label="Right hand button"></button></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), es = root.querySelector('.es'), digits = root.querySelectorAll('.cnt b');
    const btn = { L: root.querySelector('[data-s="L"]'), R: root.querySelector('[data-s="R"]') };
    const st = { L: { down: false, t: 0 }, R: { down: false, t: 0 } };
    let armed = true, out = false, timer = 0, count = 0, estop = false;
    const show = () => { String(count % 10000).padStart(4, '0').split('').forEach((c, i) => { digits[i].textContent = c; }); };
    const evaluate = () => {
      const both = st.L.down && st.R.down;
      if (both && armed && !estop) {
        armed = false;
        if (Math.abs(st.L.t - st.R.t) <= 500) { out = true; timer = setTimeout(() => { count++; show(); }, 900); }
      } else if (!both && out) { out = false; clearTimeout(timer); }
      if (estop && out) { out = false; clearTimeout(timer); }
      if (!st.L.down && !st.R.down) armed = true;
      stage.classList.toggle('out', out);
    };
    const press = (s) => { if (st[s].down) return; st[s].down = true; st[s].t = performance.now(); btn[s].classList.add('down'); evaluate(); };
    const release = (s) => { if (!st[s].down) return; st[s].down = false; btn[s].classList.remove('down'); evaluate(); };
    for (const s of ['L', 'R']) {
      const b = btn[s];
      b.addEventListener('pointerdown', (e) => { b.setPointerCapture(e.pointerId); press(s); });
      b.addEventListener('pointerup', () => release(s));
      b.addEventListener('pointercancel', () => release(s));
      b.addEventListener('lostpointercapture', () => release(s));
      b.addEventListener('blur', () => release(s));
    }
    const keyOf = (e) => {
      if (e.key === 'f' || e.key === 'F') return 'L';
      if (e.key === 'j' || e.key === 'J') return 'R';
      if (e.key === ' ' || e.key === 'Enter') {
        const f = root.activeElement && root.activeElement.dataset ? root.activeElement.dataset.s : null;
        if (!f) return null;
        const other = f === 'L' ? 'R' : 'L';
        return st[other].down && !st[f].down ? f : st[f].down ? f : f;
      }
      return null;
    };
    stage.addEventListener('keydown', (e) => { const s = keyOf(e); if (!s) return; e.preventDefault(); if (!e.repeat) press(s); });
    stage.addEventListener('keyup', (e) => { const s = keyOf(e); if (s) release(s); });
    es.addEventListener('click', () => { estop = !estop; es.setAttribute('aria-pressed', estop); evaluate(); });
    return () => clearTimeout(timer);
  },
};
