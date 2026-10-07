const SL = (cls, label, ic, min, max, v) => `
  <div class="sl ${cls}" tabindex="0" role="slider" aria-label="${label}" aria-valuemin="${min}" aria-valuemax="${max}" aria-valuenow="${v}">
    <span class="g">−</span><svg viewBox="0 0 24 24">${ic}</svg><span class="g">+</span><i class="dot"></i>
  </div>`;

export default {
  id: 'au-vw-id-slider',
  credit: 'Volkswagen ID.3 / ID.4 — the capacitive temperature and volume touch sliders under the screen (illuminated 2024 version): slide or tap − / + and the value pops up',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 320px; max-width: 100%; padding: 12px; border-radius: 12px; background: linear-gradient(#202326, #121416); font: 400 12px/1 'DM Sans', system-ui, sans-serif; color: #fff; user-select: none; }
    .scr { position: relative; height: 72px; border-radius: 6px 6px 2px 2px; background: #0c1014; box-shadow: inset 0 0 0 1px #1f262c; overflow: hidden; }
    .pop { z-index: 1; position: absolute; left: 50%; top: 9px; display: flex; align-items: center; gap: 10px; height: 40px; padding: 0 16px; border-radius: 20px; background: #1d2731; transform: translate(-50%, 8px); opacity: 0; transition: opacity .2s, transform .25s cubic-bezier(.2,0,0,1); white-space: nowrap; }
    .pop.show { opacity: 1; transform: translate(-50%, 0); }
    .map { position: absolute; inset: 0 0 20px; width: 100%; height: calc(100% - 20px); object-fit: cover; object-position: 40% 70%; opacity: .85; }
    .cb { position: absolute; left: 0; right: 0; bottom: 0; height: 20px; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; background: #0c1014; border-top: 1px solid #1f262c; }
    .st { color: #c7d0d8; font-size: 11px; font-variant-numeric: tabular-nums; }
    .st.r { color: #7d8a96; letter-spacing: .08em; font-size: 10px; }
    .mid { display: flex; align-items: center; gap: 6px; color: #7d8a96; font-size: 10px; letter-spacing: .06em; }
    .mid svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .pop svg { width: 18px; height: 18px; fill: none; stroke: #8fd3ff; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .pop b { min-width: 52px; font: 500 20px/1 'DM Sans', system-ui, sans-serif; font-variant-numeric: tabular-nums; }
    .meter { width: 70px; height: 4px; border-radius: 2px; background: #33404c; overflow: hidden; }
    .meter i { display: block; height: 100%; background: #8fd3ff; transition: width .1s; }
    .bar { display: flex; gap: 12px; margin-top: 8px; padding: 8px 10px; border-radius: 4px; background: linear-gradient(#0a0b0c, #16181a); box-shadow: inset 0 1px 0 rgba(255,255,255,.06), 0 1px 2px rgba(0,0,0,.6); }
    .sl { position: relative; flex: 1; height: 34px; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; border-radius: 4px; cursor: ew-resize; touch-action: none; color: #5d646a; transition: color .2s, background .2s; }
    .sl::before { content: ''; position: absolute; left: 22px; right: 22px; bottom: 5px; height: 1px; background: linear-gradient(90deg, transparent, currentColor, transparent); opacity: .5; }
    .sl svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .g { font: 300 20px/1 'DM Sans', system-ui, sans-serif; }
    .sl:hover, .sl.on { color: #f4f8fb; text-shadow: 0 0 8px rgba(143,211,255,.8); }
    .sl.on { background: rgba(143,211,255,.06); }
    .sl.on svg { filter: drop-shadow(0 0 4px rgba(143,211,255,.8)); }
    .sl:focus-visible { outline: 2px solid #8fd3ff; outline-offset: 2px; }
    .dot { position: absolute; bottom: 3px; left: 50%; width: 6px; height: 6px; margin-left: -3px; border-radius: 50%; background: #8fd3ff; box-shadow: 0 0 8px #8fd3ff; opacity: 0; transition: opacity .2s; }
    .sl.on .dot { opacity: 1; }
  `,
  html: `
    <div class="stage">
      <div class="scr"><img class="map" src="assets/real/map-bmw-munich.svg" alt="" width="300" height="180"><div class="cb"><span class="st l">21.5°</span><span class="mid"><svg viewBox="0 0 24 24"><path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><path d="M12 12v.01"/></svg><span>A/C</span></span><span class="st r">AUTO</span></div><div class="pop"><svg viewBox="0 0 24 24"></svg><b>21.5°</b><span class="meter"><i></i></span></div></div>
      <div class="bar">${SL('t', 'Temperature', '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>', 16, 29.5, 21.5)}${SL('v', 'Volume', '<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/>', 0, 40, 14)}</div>
    </div>`,
  init(root) {
    const pop = root.querySelector('.pop'), pIc = pop.querySelector('svg'), pV = pop.querySelector('b'), mt = pop.querySelector('.meter i');
    const sls = [...root.querySelectorAll('.sl')];
    const cfg = [{ min: 16, max: 29.5, step: .5, v: 21.5, f: (v) => (v <= 16 ? 'LO' : v >= 29.5 ? 'HI' : v.toFixed(1) + '°') }, { min: 0, max: 40, step: 1, v: 14, f: (v) => String(v) }];
    let hide = 0;
    const show = (i) => {
      const c = cfg[i];
      pIc.innerHTML = sls[i].querySelector('svg').innerHTML; pV.textContent = c.f(c.v);
      mt.style.width = ((c.v - c.min) / (c.max - c.min) * 100) + '%';
      sls[i].setAttribute('aria-valuenow', c.v); if (!i) root.querySelector('.st.l').textContent = c.f(c.v); sls[i].querySelector('.dot').style.left = (12 + (c.v - c.min) / (c.max - c.min) * 76) + '%';
      pop.classList.add('show'); clearTimeout(hide); hide = setTimeout(() => { pop.classList.remove('show'); sls.forEach((s) => s.classList.remove('on')); }, 1500);
    };
    const nudge = (i, d) => { const c = cfg[i]; c.v = Math.max(c.min, Math.min(c.max, +(c.v + d * c.step).toFixed(1))); sls[i].classList.add('on'); show(i); };
    sls.forEach((s, i) => {
      let x0 = 0, acc = 0, moved = 0, on = false;
      s.addEventListener('pointerdown', (e) => { on = true; x0 = e.clientX; acc = 0; moved = 0; s.setPointerCapture(e.pointerId); s.classList.add('on'); show(i); });
      s.addEventListener('pointermove', (e) => { if (!on) return; const d = e.clientX - x0; x0 = e.clientX; acc += d; moved += Math.abs(d); while (acc > 8) { acc -= 8; nudge(i, 1); } while (acc < -8) { acc += 8; nudge(i, -1); } });
      s.addEventListener('pointerup', (e) => {
        if (!on) return; on = false;
        if (moved < 4) { const r = s.getBoundingClientRect(); nudge(i, e.clientX < r.left + r.width / 2 ? -1 : 1); }
      });
      s.addEventListener('keydown', (e) => { const d = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0; if (d) { e.preventDefault(); nudge(i, d); } });
    });
    return () => clearTimeout(hide);
  },
};
