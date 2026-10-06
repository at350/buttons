// Pacific Rim (2013) — Jaeger Conn-Pod HUD: hold to initiate the neural handshake; both hemispheres must climb together into the Drift.
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
    .col { display: grid; gap: 4px; font: 500 7px 'JetBrains Mono', monospace; letter-spacing: .14em; text-align: center; }
    .bar { position: relative; height: 84px; border: 1px solid rgba(95,212,255,.5); background: repeating-linear-gradient(0deg, rgba(95,212,255,.08) 0 1px, transparent 1px 6px); }
    .bar i { position: absolute; left: 2px; right: 2px; bottom: 2px; height: calc((100% - 4px) * var(--v, 0)); background: linear-gradient(#e6f8ff, #5fd4ff); box-shadow: 0 0 8px #5fd4ff; }
    .rab .bar.r i { background: linear-gradient(#ffd0b8, #ff6a1a); box-shadow: 0 0 8px #ff6a1a; }
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
    <div class="hs"><div class="col"><div class="bar l"><i></i></div>LEFT HEMISPHERE</div>
      <div class="mid"><div class="pct">0%</div><div class="lbl">NEURAL<br>HANDSHAKE</div></div>
      <div class="col"><div class="bar r"><i></i></div>RIGHT HEMISPHERE</div></div>
    <button class="go" type="button" aria-pressed="false">INITIATE</button></div>`,
  init(root) {
    const st = root.querySelector('.stage'), go = root.querySelector('.go'), L = root.querySelector('.l i'), R = root.querySelector('.r i'), pct = root.querySelector('.pct'), lbl = root.querySelector('.lbl');
    let l = 0, r = 0, hold = false, lock = false, raf = 0, last = 0, rabbit = 0, t = 0;
    const paint = () => {
      L.style.setProperty('--v', l.toFixed(3)); R.style.setProperty('--v', r.toFixed(3));
      const sync = Math.max(0, Math.min(l, r) - Math.abs(l - r) * 1.5); pct.textContent = `${Math.round(lock ? 100 : sync * 100)}%`;
      st.classList.toggle('rab', rabbit > 0); st.classList.toggle('lock', lock);
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
