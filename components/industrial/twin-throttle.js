// Mercury DTS-style dual-lever binnacle (seen from above): port and starboard levers with a
// detented neutral (green N lights), forward = ahead, back = astern; tach readouts per engine. 1 LEVER
// lets the port handle drive both engines, DOCK halves the throttle authority, and the SYNC light
// comes on when both engines run within 3 %.
const lever = (s) => `<div class="eng" data-s="${s}"><span class="rpm">650</span><div class="track"><span class="f">F</span><span class="n">N</span><span class="r">R</span><i class="det"></i>
  <button class="h" type="button" role="slider" aria-label="${s === 'p' ? 'Port' : 'Starboard'} throttle" aria-valuemin="-100" aria-valuemax="100" aria-valuenow="0"><b></b></button></div><span class="nl"></span></div>`;
export default {
  id: 'nd-twin-throttle',
  credit: 'Mercury DTS dual-lever binnacle — detented neutral with green N lights, per-engine RPM, 1 LEVER, DOCK and SYNC',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 8px; padding: 12px 16px; border-radius: 12px; overflow: hidden; user-select: none; -webkit-user-select: none;
      background: radial-gradient(130% 100% at 50% 0%, #2f3337, #141618); box-shadow: inset 0 1px 0 rgba(255,255,255,.12); }
    .levers { display: flex; gap: 12px; }
    .eng { display: flex; flex-direction: column; align-items: center; gap: 6px; }
    .rpm { width: 54px; padding: 3px 0; border-radius: 3px; text-align: center; background: #07090a; color: #57e2ff; font: 600 11px/1 "IBM Plex Mono", ui-monospace, monospace; box-shadow: inset 0 1px 2px #000, 0 0 0 1px #3a3f44; }
    .track { position: relative; width: 70px; height: 128px; border-radius: 8px; background: linear-gradient(90deg, #1d2023, #2b2f33 50%, #1d2023); box-shadow: inset 0 0 0 1px #000, inset 0 2px 4px rgba(0,0,0,.6); }
    .track::before { content: ''; position: absolute; left: 31px; top: 8px; bottom: 8px; width: 8px; border-radius: 4px; background: #050606; box-shadow: inset 0 1px 2px #000; }
    .track span { position: absolute; left: 6px; font: 800 9px/1 "DM Sans", Inter, Arial, sans-serif; color: #cfd4d8; }
    .f { top: 10px; } .n { top: 59px; } .r { bottom: 10px; }
    .det { position: absolute; left: 44px; top: 63px; width: 18px; height: 2px; background: #cfd4d8; }
    .h { position: absolute; left: 13px; top: 0; width: 44px; height: 30px; border: 0; padding: 0; background: transparent; cursor: grab; touch-action: none; transform: translateY(var(--y, 49px)); transition: transform .12s ease-out; }
    .h.drag { transition: none; cursor: grabbing; }
    .h::before { content: ''; position: absolute; left: 18px; top: 4px; width: 8px; height: 22px; background: linear-gradient(90deg, #7a8086, #f2f4f5 45%, #8e949a); }
    .h b { position: absolute; left: 0; top: 7px; width: 44px; height: 16px; border-radius: 8px; background: linear-gradient(#3a3e42, #121416 70%); box-shadow: 0 4px 6px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.2); }
    .h:focus-visible b { outline: 2px solid #57e2ff; outline-offset: 2px; }
    .h:disabled { cursor: default; } .h:disabled b { background: linear-gradient(#2c3034, #0f1113 70%); }
    .nl { width: 14px; height: 8px; border-radius: 2px; background: #0f2a14; } .nl.on { background: #3df05a; box-shadow: 0 0 6px #3df05a; }
    .btns { display: flex; gap: 6px; }
    .b { display: flex; flex-direction: column; align-items: center; gap: 3px; width: 46px; height: 32px; padding: 4px 0 0; border: 0; border-radius: 4px; cursor: pointer;
      background: linear-gradient(#3b4045, #24282b); box-shadow: 0 2px 0 #08090a, inset 0 1px 0 rgba(255,255,255,.12); font: 700 7px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .4px; color: #d7dce0; }
    .b i, .sync i { width: 12px; height: 4px; border-radius: 2px; background: #2a2f22; }
    .b[aria-pressed="true"] i, .sync.on i { background: #ffc21a; box-shadow: 0 0 5px #ffc21a; }
    .b:active { transform: translateY(2px); box-shadow: 0 0 0 #08090a; }
    .b:focus-visible { outline: 2px solid #57e2ff; outline-offset: 2px; }
    .sync { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; width: 46px; height: 32px; font: 700 7px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .4px; color: #8f969c; }
  `,
  html: `
    <div class="stage">
      <div class="levers">${lever('p')}${lever('s')}</div>
      <div class="btns"><button class="b one" type="button" aria-pressed="false"><i></i>1 LEVER</button><span class="sync"><i></i>SYNC</span><button class="b dock" type="button" aria-pressed="false"><i></i>DOCK</button></div>
    </div>`,
  init(root) {
    const engs = [...root.querySelectorAll('.eng')], hs = engs.map((e) => e.querySelector('.h'));
    const one = root.querySelector('.one'), dock = root.querySelector('.dock'), sync = root.querySelector('.sync');
    const v = [0, 0]; let single = false, docking = false;
    const yOf = (x) => 49 - x * 47;
    const draw = () => {
      if (single) v[1] = v[0];
      engs.forEach((e, i) => {
        hs[i].style.setProperty('--y', yOf(v[i]) + 'px'); hs[i].setAttribute('aria-valuenow', Math.round(v[i] * 100));
        const thr = Math.max(0, Math.abs(v[i]) - 0.12) / 0.88 * (docking ? 0.5 : 1);
        e.querySelector('.rpm').textContent = Math.round(650 + thr * 5350); e.querySelector('.nl').classList.toggle('on', Math.abs(v[i]) < 0.12);
      });
      hs[1].disabled = single;
      sync.classList.toggle('on', Math.abs(v[0] - v[1]) < 0.03 && Math.abs(v[0]) >= 0.12);
    };
    const snap = (x) => (Math.abs(x) < 0.12 ? 0 : x);
    hs.forEach((h, i) => {
      let d = null;
      h.addEventListener('pointerdown', (e) => { d = { y: e.clientY, v: v[i] }; h.setPointerCapture(e.pointerId); h.classList.add('drag'); });
      h.addEventListener('pointermove', (e) => { if (!d) return; v[i] = Math.max(-1, Math.min(1, d.v - (e.clientY - d.y) / 47)); if (single && i === 0) v[1] = v[0]; draw(); });
      const end = () => { if (!d) return; d = null; h.classList.remove('drag'); v[i] = snap(v[i]); draw(); };
      h.addEventListener('pointerup', end); h.addEventListener('pointercancel', end);
      h.addEventListener('keydown', (e) => { const s = e.key === 'ArrowUp' ? 0.1 : e.key === 'ArrowDown' ? -0.1 : 0; if (s) { e.preventDefault(); v[i] = snap(Math.max(-1, Math.min(1, Math.round((v[i] + s) * 10) / 10))); draw(); } });
    });
    one.addEventListener('click', () => { single = !single; one.setAttribute('aria-pressed', single); draw(); });
    dock.addEventListener('click', () => { docking = !docking; dock.setAttribute('aria-pressed', docking); draw(); });
    draw();
  },
};
