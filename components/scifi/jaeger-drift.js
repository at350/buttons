// Pacific Rim (2013) — Jaeger Conn-Pod HUD: hold to initiate the neural handshake; both hemispheres must climb together into the Drift.
// Brain scan: Material Symbols "neurology" (Apache 2.0), split into its two hemispheres so each pilot's half can light up.
const BRAIN = 'M385-120q-51 0-86.5-38T258-244q-59-5-98.5-49.5T120-402q0-22 5.5-42.5T142-484q-11-18-16.5-38t-5.5-43q0-60 41.5-103t98.5-50q2-51 38.5-86.5T386-840q29 0 51.5 10.5T480-799q20-20 42-30.5t51-10.5q50 0 86 35.5t39 86.5q58 5 100 48.5T840-565q0 23-6 43.5T817-483q11 20 17 42t6 43q0 64-39.5 106.5T702-244q-5 48-41 86t-86 38q-30 0-52-10t-43-30q-21 20-43 30t-52 10Zm125-600v480q0 25 19.5 42.5T576-180q26 0 45-23t21-47q-23-8-43-21.5T565-305q-8-11-6-22.5t13-19.5q11-8 22.5-6t19.5 13q13 18 32 27.5t42 9.5q38 0 65-26t27-69q0-9-2-18.5t-4-19.5q-18 13-39.5 19.5T690-410q-13 0-21.5-8.5T660-440q0-13 8.5-21.5T690-470q38 0 64-28t26-67q0-38-28-65t-64-29q-10 24-28.5 42.5T617-589q-12 5-23-.5T579-607q-4-12 1-23.5t17-15.5q18-6 29.5-24t11.5-41q0-29-19-49t-45-20q-26 0-45 17.5T510-720Zm-60 480v-480q0-25-18.5-42.5T386-780q-26 0-45.5 20T321-711q0 23 11 40.5t29 23.5q12 4 17.5 15.5T380-609q-5 12-16.5 18t-23.5 1q-24-8-42-26.5T270-659q-35 3-62.5 29.5T180-565q0 39 26 67t64 28q13 0 21.5 8.5T300-440q0 13-8.5 21.5T270-410q-23 0-44.5-7T186-436q-3 8-4.5 17t-1.5 18q0 43 26.5 70.5T271-303q22 0 41.5-10t32.5-27q8-10 20-12.5t22 5.5q10 8 12.5 20t-5.5 22q-14 20-33.5 33.5T318-250q2 24 21 47t46 23q27 0 46-17.5t19-42.5Z';
const HEMI = ['M450-240v-480q0-25-18.5-42.5T386-780q-26 0-45.5 20T321-711q0 23 11 40.5t29 23.5q12 4 17.5 15.5T380-609q-5 12-16.5 18t-23.5 1q-24-8-42-26.5T270-659q-35 3-62.5 29.5T180-565q0 39 26 67t64 28q13 0 21.5 8.5T300-440q0 13-8.5 21.5T270-410q-23 0-44.5-7T186-436q-3 8-4.5 17t-1.5 18q0 43 26.5 70.5T271-303q22 0 41.5-10t32.5-27q8-10 20-12.5t22 5.5q10 8 12.5 20t-5.5 22q-14 20-33.5 33.5T318-250q2 24 21 47t46 23q27 0 46-17.5t19-42.5Z', 'M510-720v480q0 25 19.5 42.5T576-180q26 0 45-23t21-47q-23-8-43-21.5T565-305q-8-11-6-22.5t13-19.5q11-8 22.5-6t19.5 13q13 18 32 27.5t42 9.5q38 0 65-26t27-69q0-9-2-18.5t-4-19.5q-18 13-39.5 19.5T690-410q-13 0-21.5-8.5T660-440q0-13 8.5-21.5T690-470q38 0 64-28t26-67q0-38-28-65t-64-29q-10 24-28.5 42.5T617-589q-12 5-23-.5T579-607q-4-12 1-23.5t17-15.5q18-6 29.5-24t11.5-41q0-29-19-49t-45-20q-26 0-45 17.5T510-720Z'];
export default {
  id: 'sf-jaeger-drift',
  credit: 'Pacific Rim (2013) — Gipsy Danger Conn-Pod HUD: hold INITIATE to start the neural handshake; left and right hemisphere loads climb (watch for the rabbit), let go early and the Drift collapses; reach 100% and it locks',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 300px; height: 200px; max-width: 100%; border-radius: 12px; overflow: hidden; padding: 14px 16px; background: radial-gradient(ellipse at 50% 30%, #0b2433, #02080d 70%);
      color: #5fd4ff; font-family: 'Space Grotesk', system-ui, sans-serif; text-shadow: 0 0 6px rgba(95,212,255,.5); }
    .stage::before { content: ''; position: absolute; inset: 8px; border: 1px solid rgba(95,212,255,.25); clip-path: polygon(0 0, 30% 0, 30% 2px, 70% 2px, 70% 0, 100% 0, 100% 100%, 0 100%); pointer-events: none; }
    .hd { display: flex; justify-content: space-between; font-size: 8px; letter-spacing: .3em; opacity: .8; }
    .hs { display: grid; grid-template-columns: 1fr 74px 1fr; align-items: end; gap: 10px; margin-top: 10px; height: 104px; }
    .col { display: grid; gap: 4px; font: 500 7px 'JetBrains Mono', monospace; letter-spacing: .14em; text-align: center; white-space: nowrap; }
    .scan { position: relative; height: 84px; display: grid; place-items: center; overflow: hidden;
      background: linear-gradient(rgba(95,212,255,.07) 1px, transparent 1px) 0 0 / 100% 7px, linear-gradient(90deg, rgba(95,212,255,.07) 1px, transparent 1px) 0 0 / 7px 100%, rgba(4,22,32,.6); }
    .scan::before { content: ''; position: absolute; inset: 0; pointer-events: none;
      background: linear-gradient(#5fd4ff, #5fd4ff) 0 0 / 8px 1px, linear-gradient(#5fd4ff, #5fd4ff) 0 0 / 1px 8px, linear-gradient(#5fd4ff, #5fd4ff) 100% 0 / 8px 1px, linear-gradient(#5fd4ff, #5fd4ff) 100% 0 / 1px 8px,
        linear-gradient(#5fd4ff, #5fd4ff) 0 100% / 8px 1px, linear-gradient(#5fd4ff, #5fd4ff) 0 100% / 1px 8px, linear-gradient(#5fd4ff, #5fd4ff) 100% 100% / 8px 1px, linear-gradient(#5fd4ff, #5fd4ff) 100% 100% / 1px 8px; background-repeat: no-repeat; }
    .scan::after { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 14px; opacity: 0; pointer-events: none; background: linear-gradient(transparent, rgba(150,230,255,.35)); border-bottom: 1px solid rgba(200,245,255,.8); }
    .hold .scan::after { opacity: 1; animation: sw 1.1s linear infinite; }
    @keyframes sw { from { transform: translateY(-14px); } to { transform: translateY(84px); } }
    .scan svg { width: 74px; height: 74px; overflow: visible; filter: drop-shadow(0 0 3px rgba(95,212,255,.55)); }
    .scan .o { fill: rgba(95,212,255,.16); stroke: #5fd4ff; stroke-width: 9; }
    .scan .h { fill: rgba(95,212,255,.06); }
    .l .lv { fill: url(#gl); } .r .lv { fill: url(#gr); }
    .rab .r .lv { fill: url(#go); } .rab .r .o { stroke: #ff6a1a; fill: rgba(255,106,26,.14); }
    .rd { position: absolute; top: 4px; font-size: 7px; letter-spacing: .1em; font-variant-numeric: tabular-nums; }
    .l .rd { left: 5px; } .r .rd { right: 5px; }
    .mid { text-align: center; align-self: center; }
    .pct { font: 600 26px/1 'Unbounded', 'Space Grotesk', sans-serif; font-variant-numeric: tabular-nums; color: #e6f8ff; }
    .lbl { margin-top: 4px; font-size: 7px; letter-spacing: .24em; line-height: 1.4; }
    .lock .pct { color: #fff; text-shadow: 0 0 12px #5fd4ff; }
    .rab .lbl { color: #ff6a1a; }
    .go { display: block; width: 100%; height: 30px; margin-top: 12px; border: 1px solid #5fd4ff; background: rgba(95,212,255,.08); color: #e6f8ff; cursor: pointer; font: 600 10px 'Space Grotesk', sans-serif; letter-spacing: .3em; text-shadow: inherit;
      clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%); user-select: none; -webkit-user-select: none; touch-action: none; }
    .go:hover { background: rgba(95,212,255,.2); }
    .go.on { background: #5fd4ff; color: #02121a; text-shadow: none; }
    .lock .go { background: #e6f8ff; color: #02121a; }
    .go:focus-visible { outline: 1px solid #fff; outline-offset: 3px; }
  `,
  html: `<div class="stage"><div class="hd"><span>GIPSY DANGER</span><span>MARK-3</span></div>
    <div class="hs"><div class="col"><div class="scan l"><span class="rd">00</span><svg viewBox="110 -850 740 740" aria-hidden="true"><defs><clipPath id="cl"><rect x="100" y="-120" width="760" height="0"/></clipPath><linearGradient id="gl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6f8ff"/><stop offset="1" stop-color="#2aa7e0"/></linearGradient></defs><path class="h" d="${HEMI[0]}"/><path class="h" d="${HEMI[1]}"/><path class="lv" clip-path="url(#cl)" d="${HEMI[0]}"/><path class="o" d="${BRAIN}"/></svg></div>LEFT HEMISPHERE</div>
      <div class="mid"><div class="pct">0%</div><div class="lbl">NEURAL<br>HANDSHAKE</div></div>
      <div class="col"><div class="scan r"><span class="rd">00</span><svg viewBox="110 -850 740 740" aria-hidden="true"><defs><clipPath id="cr"><rect x="100" y="-120" width="760" height="0"/></clipPath><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6f8ff"/><stop offset="1" stop-color="#2aa7e0"/></linearGradient><linearGradient id="go" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd0b8"/><stop offset="1" stop-color="#ff6a1a"/></linearGradient></defs><path class="h" d="${HEMI[0]}"/><path class="h" d="${HEMI[1]}"/><path class="lv" clip-path="url(#cr)" d="${HEMI[1]}"/><path class="o" d="${BRAIN}"/></svg></div>RIGHT HEMISPHERE</div></div>
    <button class="go" type="button" aria-pressed="false">INITIATE</button></div>`,
  init(root) {
    const st = root.querySelector('.stage'), go = root.querySelector('.go'), L = root.querySelector('#cl rect'), R = root.querySelector('#cr rect'), rd = [...root.querySelectorAll('.rd')], pct = root.querySelector('.pct'), lbl = root.querySelector('.lbl');
    let l = 0, r = 0, hold = false, lock = false, raf = 0, last = 0, rabbit = 0, t = 0;
    const paint = () => {
      [[L, l], [R, r]].forEach(([el, v], k) => { const h = 720 * v; el.setAttribute('height', h.toFixed(1)); el.setAttribute('y', (-120 - h).toFixed(1)); rd[k].textContent = String(Math.round(v * 99)).padStart(2, '0'); });
      const sync = Math.max(0, Math.min(l, r) - Math.abs(l - r) * 1.5); pct.textContent = `${Math.round(lock ? 100 : sync * 100)}%`;
      st.classList.toggle('rab', rabbit > 0); st.classList.toggle('lock', lock); st.classList.toggle('hold', hold && !lock);
      lbl.innerHTML = lock ? 'DRIFT<br>ESTABLISHED' : rabbit > 0 ? 'CHASING<br>THE RABBIT' : 'NEURAL<br>HANDSHAKE';
      go.textContent = lock ? 'DISENGAGE' : 'INITIATE'; go.setAttribute('aria-pressed', String(lock));
    };
    const tick = (now) => {
      raf = 0; const dt = Math.min(.1, (now - last) / 1000); last = now; t += dt;
      if (hold && !lock) {
        if (!rabbit && l > .35 && l < .4 && Math.random() < .06) rabbit = .9;
        rabbit = Math.max(0, rabbit - dt);
        l = Math.min(1, l + dt * (.32 + Math.sin(t * 9) * .12)); r = rabbit ? Math.max(0, r - dt * .5) : Math.min(1, r + dt * (.3 + Math.cos(t * 7) * .14));
        if (l >= 1 && r >= 1) { lock = true; hold = false; go.classList.remove('on'); }
      } else if (!lock) { l = Math.max(0, l - dt * .7); r = Math.max(0, r - dt * .7); rabbit = 0; }
      paint();
      if ((hold && !lock) || (!lock && (l > 0 || r > 0))) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const down = (e) => { if (e) e.preventDefault(); if (lock) { lock = false; paint(); kick(); return; } hold = true; go.classList.add('on'); kick(); };
    const up = () => { if (!hold) return; hold = false; go.classList.remove('on'); kick(); };
    go.addEventListener('pointerdown', (e) => { go.setPointerCapture && go.setPointerCapture(e.pointerId); down(e); });
    go.addEventListener('pointerup', up); go.addEventListener('pointercancel', up); go.addEventListener('lostpointercapture', up);
    go.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) down(e); });
    go.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') up(); });
    paint();
    return () => { cancelAnimationFrame(raf); raf = 0; hold = false; };
  },
};
