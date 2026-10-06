export default {
  id: 'ob-op1-knob',
  credit: 'Teenage Engineering OP-1 — colour-coded encoder knob (drag to turn) beside a grey key with its LED',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .body { display: inline-flex; align-items: center; gap: 22px; padding: 18px 24px; background: #d9d9d6; border-radius: 10px; box-shadow: inset 0 1px 0 #fff, 0 2px 0 #b5b5b2, 0 6px 14px rgba(0,0,0,.18); }
    .knob { position: relative; width: 44px; height: 44px; border-radius: 50%; padding: 0; border: 0; cursor: grab; touch-action: none;
      background: radial-gradient(circle at 50% 42%, #ff8a3d, #e8611c 70%, #c8480a); box-shadow: 0 3px 0 #a53b05, 0 6px 10px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.4); }
    .knob:active { cursor: grabbing; }
    .knob:focus-visible { outline: 2px solid #1e5bff; outline-offset: 4px; }
    .knob .ind { position: absolute; left: 50%; top: 4px; width: 3px; height: 13px; margin-left: -1.5px; background: #fff; border-radius: 2px; transform-origin: 50% 18px; }
    .knob.g { background: radial-gradient(circle at 50% 42%, #9ee8a4, #3fbf63 70%, #2a9448); box-shadow: 0 3px 0 #1d6e34, 0 6px 10px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.4); }
    .knob.b { background: radial-gradient(circle at 50% 42%, #7fb6ff, #2f7cff 70%, #1a5bd8); box-shadow: 0 3px 0 #0f3f9e, 0 6px 10px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.4); }
    .knob.w { background: radial-gradient(circle at 50% 42%, #fff, #e4e4e0 70%, #c9c9c4); box-shadow: 0 3px 0 #9d9d98, 0 6px 10px rgba(0,0,0,.3), inset 0 1px 0 #fff; }
    .knob.w .ind { background: #333; }
    .val { position: absolute; left: 50%; top: 100%; transform: translateX(-50%); margin-top: 8px; font: 700 10px/1 "JetBrains Mono", ui-monospace, monospace; color: #333; letter-spacing: 1px; }
    .wrap { position: relative; padding-bottom: 14px; }
    .key { position: relative; width: 44px; height: 44px; border-radius: 8px; border: 0; cursor: pointer; padding: 0;
      background: linear-gradient(#f3f3f0, #d8d8d4); box-shadow: 0 4px 0 #a9a9a5, 0 6px 10px rgba(0,0,0,.25), inset 0 1px 0 #fff; transition: transform .06s, box-shadow .06s; }
    .key:active, .key.on { transform: translateY(3px); box-shadow: 0 1px 0 #a9a9a5, 0 3px 6px rgba(0,0,0,.25), inset 0 1px 0 #fff; }
    .key:focus-visible { outline: 2px solid #1e5bff; outline-offset: 4px; }
    .key svg { width: 20px; height: 20px; fill: #3a3a3a; }
    .led { position: absolute; right: 7px; top: 6px; width: 6px; height: 6px; border-radius: 50%; background: #5a2a00; box-shadow: inset 0 0 1px #000; transition: background .1s, box-shadow .1s; }
    .key.on .led { background: #ff5a00; box-shadow: 0 0 6px 2px rgba(255,90,0,.7); }
  `,
  html: `
    <div class="body">
      <div class="wrap">
        <button class="knob" type="button" role="slider" aria-label="Encoder" aria-valuemin="0" aria-valuemax="100" aria-valuenow="42"><span class="ind" aria-hidden="true"></span></button>
        <span class="val" aria-hidden="true">42</span>
      </div>
      <div class="wrap">
        <button class="key" type="button" aria-pressed="false"><span class="led" aria-hidden="true"></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5v14l11-7z"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const knob = root.querySelector('.knob'), ind = root.querySelector('.ind'), val = root.querySelector('.val'), key = root.querySelector('.key');
    const colors = ['', 'g', 'b', 'w'];
    let v = 42, ci = 0, drag = null;
    const render = () => { ind.style.transform = `rotate(${(v / 100) * 300 - 150}deg)`; val.textContent = String(v).padStart(2, '0'); knob.setAttribute('aria-valuenow', String(v)); };
    const set = (n) => { v = Math.max(0, Math.min(100, Math.round(n))); render(); };
    knob.addEventListener('pointerdown', (e) => { drag = { y: e.clientY, v }; knob.setPointerCapture(e.pointerId); e.preventDefault(); });
    knob.addEventListener('pointermove', (e) => { if (drag) set(drag.v + (drag.y - e.clientY) / 1.6); });
    const end = () => { drag = null; };
    knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
    knob.addEventListener('wheel', (e) => { e.preventDefault(); set(v - Math.sign(e.deltaY) * 2); }, { passive: false });
    knob.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight') { e.preventDefault(); set(v + 2); }
      if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') { e.preventDefault(); set(v - 2); }
    });
    knob.addEventListener('dblclick', () => { ci = (ci + 1) % colors.length; knob.className = 'knob ' + colors[ci]; });
    key.addEventListener('click', () => { const on = key.classList.toggle('on'); key.setAttribute('aria-pressed', String(on)); });
    render();
  },
};
