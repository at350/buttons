const CL = [['AUTO', ''], ['', '<path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><path d="M12 12v.01"/>'], ['A/C', ''], ['', '<path d="M152-300q-12 2-22.5-5T117-324L42-739q-2-13 5-23.5T67-777q118-32 219.5-47.5T481-840q93 0 193.5 15.5T894-777q13 4 20 14.5t5 23.5l-75 416q-2 12-12 18.5t-22 4.5q-12-2-19-12t-5-22l69-392q-114-28-203.5-41T481-780q-81 0-171.5 13T106-726l70 392q2 12-5 22t-19 12Zm508 65q0-18-6.5-34.5T634-300q-21-23-32.5-50.5T590-409q0-22 6.5-43t19.5-39l8-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-8 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T720-233q0 22-6.5 43T694-151l-8 11q-7 11-19 13t-23-5q-11-7-13-18.5t5-22.5l8-11q8-11 12-24t4-27Zm-173 1q0-19-7-35.5T460-300q-21-23-32.5-50.5T416-409q0-22 6.5-43t19.5-39l8-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-7 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T547-233q0 22-6.5 43T521-151l-8 11q-7 11-19 13t-23-5q-11-7-13-18.5t5-22.5l8-11q8-11 12-23.5t4-26.5Zm-173 0q0-19-7-35.5T287-300q-21-23-33-50.5T242-409q0-22 6.5-43t20.5-39l9-12q7-11 19-13t23 5q11 7 12.5 19t-5.5 23l-8 11q-8 11-12 23.5t-4 26.5q0 19 7 35.5t20 30.5q21 23 32.5 50.5T374-233q0 22-6.5 43T348-151l-8 11q-7 11-19 13t-23-5q-11-7-13-18.5t5-22.5l8-11q8-11 12-23.5t4-26.5Z"/>', 'f']];
const IN = [['NAV', ''], ['MAP', ''], ['RADIO', ''], ['MEDIA', '']];
const keys = (set, cls) => `<div class="layer ${cls}">${set.map(([t, ic, f]) => `<button class="k" type="button" aria-pressed="false">${ic ? `<svg class="${f || ''}" viewBox="${f ? '0 -960 960 960' : '0 0 24 24'}">${ic}</svg>` : t}<i></i></button>`).join('')}</div>`;

export default {
  id: 'au-kia-switchable-bar',
  credit: 'Kia EV6 / Hyundai ccNC era — switchable touch bar: one glossy strip that flips between climate and infotainment keys, with the two knobs changing job (temp ↔ volume / tune)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 340px; max-width: 100%; padding: 10px; border-radius: 12px; background: linear-gradient(#2b2d31, #1a1b1e); font: 600 10px/1 Inter, system-ui, sans-serif; color: #fff; user-select: none; }
    .panel { position: relative; display: flex; align-items: center; gap: 6px; height: 86px; padding: 0 8px; border-radius: 8px; background: linear-gradient(170deg, #1a1b1f, #050506 55%); box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 2px 4px rgba(0,0,0,.6); }
    .panel::after { content: ''; position: absolute; inset: 0; border-radius: 8px; background: linear-gradient(115deg, rgba(255,255,255,.08), transparent 35%); pointer-events: none; }
    .kn { position: relative; flex: none; width: 44px; display: grid; justify-items: center; gap: 5px; }
    .val { height: 12px; font: 500 11px/12px Inter, system-ui, sans-serif; color: #e8f1ff; text-shadow: 0 0 6px rgba(150,190,255,.7); font-variant-numeric: tabular-nums; white-space: nowrap; }
    .knob { width: 40px; height: 40px; border-radius: 50%; cursor: grab; touch-action: none; background: repeating-conic-gradient(#8e9299 0 4deg, #5b5f66 4deg 8deg); box-shadow: 0 3px 5px rgba(0,0,0,.8), inset 0 0 0 1px rgba(0,0,0,.5); position: relative; }
    .knob::after { content: ''; position: absolute; inset: 5px; border-radius: 50%; background: radial-gradient(circle at 40% 30%, #3d4046, #121315); }
    .knob::before { content: ''; position: absolute; z-index: 1; left: 50%; top: 7px; width: 2px; height: 6px; margin-left: -1px; background: #fff; border-radius: 1px; }
    .knob:focus-visible, .k:focus-visible, .sw:focus-visible { outline: 2px solid #7fb2ff; outline-offset: 2px; }
    .mid { position: relative; flex: 1; height: 60px; min-width: 0; }
    .layer { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; transition: opacity .35s, transform .45s cubic-bezier(.2,0,0,1), filter .35s; }
    .info .layer.cl, .layer.in { opacity: 0; transform: translateY(6px); filter: blur(3px); pointer-events: none; }
    .info .layer.in { opacity: 1; transform: none; filter: none; pointer-events: auto; }
    .k { position: relative; border: 0; background: transparent; color: #dfe9ff; font: inherit; letter-spacing: .06em; cursor: pointer; display: grid; place-items: center; border-radius: 6px; text-shadow: 0 0 6px rgba(150,190,255,.6); transition: background .15s; }
    .k:hover { background: rgba(255,255,255,.05); }
    .k:active { background: rgba(255,255,255,.1); }
    .k svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 0 3px rgba(150,190,255,.6)); }
    .k svg.f { fill: currentColor; stroke: none; }
    .k i { position: absolute; bottom: 8px; left: 50%; width: 10px; height: 2px; margin-left: -5px; border-radius: 1px; background: #333; transition: background .2s, box-shadow .2s; }
    .k[aria-pressed="true"] i { background: #7fb2ff; box-shadow: 0 0 6px #7fb2ff; }
    .sw { position: absolute; left: 50%; bottom: -8px; z-index: 2; height: 16px; padding: 0 9px; margin-left: -22px; border: 0; border-radius: 8px; background: #23252a; color: #cfd6e3; cursor: pointer; display: flex; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.1); }
    .sw svg { width: 26px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
    .sw:hover { color: #fff; }
  `,
  html: `
    <div class="stage">
      <div class="panel">
        <div class="kn"><span class="val">22.0°</span><div class="knob" tabindex="0" role="slider" aria-label="Left knob"></div></div>
        <div class="mid">${keys(CL, 'cl')}${keys(IN, 'in')}</div>
        <div class="kn"><span class="val">22.0°</span><div class="knob" tabindex="0" role="slider" aria-label="Right knob"></div></div>
        <button class="sw" type="button" aria-pressed="false" aria-label="Switch climate / infotainment"><svg viewBox="0 0 24 24"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const panel = root.querySelector('.panel'), sw = root.querySelector('.sw'), knobs = [...root.querySelectorAll('.knob')], vals = [...root.querySelectorAll('.val')];
    const st = { temp: [22, 22], vol: 12, fm: 101.1, rot: [0, 0] };
    const info = () => panel.classList.contains('info');
    const paint = () => {
      vals[0].textContent = info() ? `VOL ${st.vol}` : st.temp[0].toFixed(1) + '°';
      vals[1].textContent = info() ? `FM ${st.fm.toFixed(1)}` : st.temp[1].toFixed(1) + '°';
    };
    const turn = (i, d) => {
      st.rot[i] += d * 18; knobs[i].style.transform = `rotate(${st.rot[i]}deg)`;
      if (info()) { if (i) st.fm = Math.max(87.5, Math.min(108, +(st.fm + d * .2).toFixed(1))); else st.vol = Math.max(0, Math.min(35, st.vol + d)); }
      else st.temp[i] = Math.max(16, Math.min(32, st.temp[i] + d * .5));
      paint();
    };
    knobs.forEach((k, i) => {
      let last = 0, acc = 0, on = false;
      const ang = (e) => { const r = k.getBoundingClientRect(); return Math.atan2(e.clientY - r.top - r.height / 2, e.clientX - r.left - r.width / 2) * 180 / Math.PI; };
      k.addEventListener('pointerdown', (e) => { on = true; last = ang(e); acc = 0; k.setPointerCapture(e.pointerId); });
      k.addEventListener('pointermove', (e) => { if (!on) return; const a = ang(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a; acc += d; while (acc > 18) { acc -= 18; turn(i, 1); } while (acc < -18) { acc += 18; turn(i, -1); } });
      k.addEventListener('pointerup', () => { on = false; });
      k.addEventListener('keydown', (e) => { const d = e.key === 'ArrowUp' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowDown' || e.key === 'ArrowLeft' ? -1 : 0; if (d) { e.preventDefault(); turn(i, d); } });
    });
    root.querySelectorAll('.k').forEach((k) => k.addEventListener('click', () => {
      const layer = k.parentElement, radio = layer.classList.contains('in');
      if (radio) layer.querySelectorAll('.k').forEach((o) => o.setAttribute('aria-pressed', String(o === k)));
      else k.setAttribute('aria-pressed', String(k.getAttribute('aria-pressed') !== 'true'));
    }));
    sw.addEventListener('click', () => { const on = !info(); panel.classList.toggle('info', on); sw.setAttribute('aria-pressed', String(on)); paint(); });
    paint();
  },
};
