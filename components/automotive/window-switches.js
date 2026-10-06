const CELL = (n) => `
  <div class="cell">
    <div class="rk" tabindex="0" role="slider" aria-label="${n} window" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="lip"></span></div>
    <svg class="win" viewBox="0 0 44 32" aria-hidden="true"><path class="fr" d="M3 30V12Q3 4 12 3h26q3 0 3 3v24z"/><clipPath id="c${n.replace(' ', '')}"><path d="M5 29V12q0-6 7-7h26q1 0 1 1v23z"/></clipPath><rect class="gl" clip-path="url(#c${n.replace(' ', '')})" x="4" y="4" width="36" height="26"/></svg>
  </div>`;

export default {
  id: 'au-window-switches',
  credit: 'Driver-door power window switch pack — four rockers: push down to lower, pull up to raise, push through the second detent for one-touch AUTO; window lock kills the rears',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; gap: 12px; align-items: center; width: 290px; max-width: 100%; padding: 14px; border-radius: 12px; background: radial-gradient(circle at 30% 20%, #34302c, #1b1816 70%); user-select: none; }
    .pack { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 10px; border-radius: 10px; background: linear-gradient(#141414, #0b0b0b); box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 2px 4px rgba(0,0,0,.6); }
    .cell { display: flex; align-items: center; gap: 8px; }
    .rk { position: relative; width: 30px; height: 46px; flex: none; border-radius: 6px 6px 8px 8px; cursor: ns-resize; touch-action: none; background: linear-gradient(#4a4a4a, #232323 30%, #1a1a1a 70%, #2f2f2f); box-shadow: 0 3px 0 #000, 0 4px 5px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.18); transition: transform .12s, background .12s; }
    .lip { position: absolute; left: 3px; right: 3px; top: 3px; height: 9px; border-radius: 4px 4px 2px 2px; background: linear-gradient(#6a6a6a, #333); }
    .rk.dn { transform: perspective(80px) rotateX(16deg); background: linear-gradient(#2c2c2c, #1a1a1a 40%, #202020 80%, #3b3b3b); }
    .rk.up { transform: perspective(80px) rotateX(-16deg); background: linear-gradient(#5a5a5a, #2b2b2b 30%, #1a1a1a 80%, #262626); }
    .rk.lock { opacity: .5; cursor: not-allowed; }
    .rk:focus-visible, .lk:focus-visible { outline: 2px solid #ffb84d; outline-offset: 3px; }
    .win { width: 44px; height: 32px; }
    .fr { fill: #0c0c0c; stroke: #5d5a56; stroke-width: 1.5; }
    .gl { fill: rgba(140,190,230,.45); transition: none; }
    .lk { position: relative; width: 38px; height: 46px; flex: none; border: 0; border-radius: 8px; cursor: pointer; background: linear-gradient(#3a3a3a, #161616); box-shadow: 0 3px 0 #000, inset 0 1px 0 rgba(255,255,255,.15); color: #bdbdbd; display: grid; place-items: center; align-content: center; gap: 4px; }
    .lk svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .lk i { width: 12px; height: 3px; border-radius: 2px; background: #3a2a10; transition: background .2s, box-shadow .2s; }
    .lk[aria-pressed="true"] i { background: #ffb84d; box-shadow: 0 0 6px #ffb84d; }
    .lk:active { transform: translateY(2px); box-shadow: 0 1px 0 #000, inset 0 1px 0 rgba(255,255,255,.1); }
  `,
  html: `
    <div class="stage">
      <div class="pack">${CELL('Front left')}${CELL('Front right')}${CELL('Rear left')}${CELL('Rear right')}</div>
      <button class="lk" type="button" aria-pressed="false" aria-label="Window lock"><svg viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><i></i></button>
    </div>`,
  init(root) {
    const rks = [...root.querySelectorAll('.rk')], gls = [...root.querySelectorAll('.gl')], lk = root.querySelector('.lk');
    const pos = [0, 0, 0, 0], dir = [0, 0, 0, 0], auto = [false, false, false, false];
    let raf = 0, last = 0;
    const paint = (i) => { gls[i].setAttribute('y', (4 + pos[i] * 26).toFixed(1)); rks[i].setAttribute('aria-valuenow', Math.round(pos[i] * 100)); };
    const loop = (t) => {
      const dt = Math.min(50, t - (last || t)) / 1000; last = t;
      let any = false;
      for (let i = 0; i < 4; i++) {
        if (!dir[i]) continue;
        pos[i] = Math.max(0, Math.min(1, pos[i] + dir[i] * dt * .55));
        if ((pos[i] === 1 && dir[i] > 0) || (pos[i] === 0 && dir[i] < 0)) { dir[i] = 0; auto[i] = false; }
        else any = true;
        paint(i);
      }
      raf = any ? requestAnimationFrame(loop) : 0; if (!any) last = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const locked = (i) => i > 1 && lk.getAttribute('aria-pressed') === 'true';
    rks.forEach((rk, i) => {
      let y0 = 0, on = false, moved = 0;
      const tilt = (d) => { rk.classList.toggle('dn', d > 0); rk.classList.toggle('up', d < 0); };
      rk.addEventListener('pointerdown', (e) => { if (locked(i)) return; on = true; y0 = e.clientY; moved = 0; rk.setPointerCapture(e.pointerId); });
      rk.addEventListener('pointermove', (e) => {
        if (!on) return;
        const d = e.clientY - y0; moved = Math.max(moved, Math.abs(d));
        const s = Math.abs(d) < 4 ? 0 : Math.sign(d);
        tilt(s);
        if (s) { dir[i] = s; auto[i] = Math.abs(d) > 18; kick(); } else if (!auto[i]) dir[i] = 0;
      });
      const end = () => {
        if (!on) return; on = false; tilt(0);
        if (moved < 4) { dir[i] = pos[i] > .98 ? -1 : 1; auto[i] = true; kick(); }
        else if (!auto[i]) dir[i] = 0;
      };
      rk.addEventListener('pointerup', end); rk.addEventListener('pointercancel', end);
      rk.addEventListener('keydown', (e) => {
        if (locked(i)) return;
        const d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
        if (d) { e.preventDefault(); dir[i] = d; auto[i] = true; kick(); }
      });
    });
    lk.addEventListener('click', () => {
      const on = lk.getAttribute('aria-pressed') !== 'true'; lk.setAttribute('aria-pressed', String(on));
      rks.slice(2).forEach((r) => r.classList.toggle('lock', on));
    });
    rks.forEach((_, i) => paint(i));
    return () => cancelAnimationFrame(raf);
  },
};
