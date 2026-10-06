// Train driver's combined power/brake controller with driver's safety device (DSD, the "dead-man").
// Press and hold the T-handle to keep the DSD down and drag it through B3…OFF…P4. Let go out of the
// brake notches and the amber DSD warning sounds; after 1.5 s the emergency brake trips (red lamp,
// brake cylinder gauge to full). To reset, hold the handle and bring it back to EB.
const N = ['P4', 'P3', 'P2', 'P1', 'OFF', 'B1', 'B2', 'B3', 'EB'];
const BAR = { B1: 1.0, B2: 1.9, B3: 2.8, EB: 3.8 };
const TICKS = Array.from({ length: 9 }, (_, i) => { const a = (-120 + i * 30) * Math.PI / 180; return `<line x1="${(30 + 20 * Math.sin(a)).toFixed(1)}" y1="${(30 - 20 * Math.cos(a)).toFixed(1)}" x2="${(30 + 24 * Math.sin(a)).toFixed(1)}" y2="${(30 - 24 * Math.cos(a)).toFixed(1)}"/>${i % 2 ? '' : `<text x="${(30 + 15 * Math.sin(a)).toFixed(1)}" y="${(32.5 - 15 * Math.cos(a)).toFixed(1)}">${i / 2}</text>`}`; }).join('');
export default {
  id: 'nd-dsd-controller',
  credit: 'Train combined power/brake controller with dead-man (DSD) — hold the T-handle, release out of brake and the DSD warning then emergency brake trip; reset in EB',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; gap: 14px; padding: 12px 16px; border-radius: 12px; overflow: hidden; user-select: none; -webkit-user-select: none;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.035) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #4d5a55, #36403c); box-shadow: inset 0 1px 0 rgba(255,255,255,.15); }
    .quad { position: relative; width: 108px; height: 176px; }
    .slot { position: absolute; left: 44px; top: 8px; width: 12px; height: 160px; border-radius: 6px; background: #0b0d0c; box-shadow: inset 0 2px 3px #000, 0 1px 0 rgba(255,255,255,.18); }
    .nt { position: absolute; left: 84px; font: 700 8px/1 "DM Sans", Inter, Arial, sans-serif; color: #e7ece9; letter-spacing: .4px; }
    .nt.eb { color: #ff6b5b; }
    .h { position: absolute; left: 20px; top: 0; width: 60px; height: 22px; border: 0; padding: 0; background: transparent; cursor: grab; touch-action: none; transform: translateY(var(--y)); transition: transform .12s ease-out; }
    .h.drag { transition: none; cursor: grabbing; }
    .h::before { content: ''; position: absolute; left: 27px; top: 6px; width: 6px; height: 10px; background: linear-gradient(90deg, #6d7277, #e9ecee, #7d8287); }
    .h b { position: absolute; left: 2px; top: 0; width: 56px; height: 16px; border-radius: 8px; transition: transform .06s;
      background: linear-gradient(#4a4e52, #17191b 60%, #0b0c0d); box-shadow: 0 4px 5px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.2); }
    .h.held b { transform: translateY(2px) scaleY(.92); background: linear-gradient(#3a3e42, #121416 60%); box-shadow: 0 1px 2px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.12); }
    .h:focus-visible b { outline: 2px solid #9fe0c0; outline-offset: 2px; }
    .side { display: flex; flex-direction: column; align-items: center; gap: 10px; padding-top: 4px; }
    .g { width: 74px; height: 74px; border-radius: 50%; background: radial-gradient(circle, #fbfaf4 0 62%, #1a1b1c 64%, #8d9298 70%, #3a3e42); box-shadow: 0 2px 4px rgba(0,0,0,.5); }
    .g svg { width: 74px; height: 74px; }
    .g line { stroke: #1a1b1c; stroke-width: 1; } .g text { font: 700 5.5px Inter, Arial, sans-serif; fill: #1a1b1c; text-anchor: middle; }
    .g .u { font-size: 4.5px; font-weight: 600; }
    .ndl { transition: transform .5s cubic-bezier(.3,1.4,.5,1); transform-origin: 30px 30px; }
    .lamp { display: flex; flex-direction: column; align-items: center; gap: 4px; font: 700 6.5px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .5px; color: #e7ece9; }
    .lamp i { width: 22px; height: 22px; border-radius: 50%; background: radial-gradient(circle at 50% 38%, var(--c1), var(--c0) 70%); box-shadow: 0 0 0 3px #a9afb3, 0 0 0 4px #4b5155; }
    .am { --c0: #5a3500; --c1: #8a5a10; } .rd { --c0: #4a0b08; --c1: #7a1812; }
    .am.on i { --c0: #ff9800; --c1: #ffe1a0; box-shadow: 0 0 0 3px #a9afb3, 0 0 0 4px #4b5155, 0 0 12px 3px rgba(255,160,20,.75); animation: fl .3s steps(2, jump-none) infinite; }
    .rd.on i { --c0: #ff2a1a; --c1: #ffb0a0; box-shadow: 0 0 0 3px #a9afb3, 0 0 0 4px #4b5155, 0 0 12px 3px rgba(255,50,30,.75); }
    @keyframes fl { 50% { --c0: #5a3500; --c1: #8a5a10; box-shadow: 0 0 0 3px #a9afb3, 0 0 0 4px #4b5155; } }
    .lamps { display: flex; gap: 12px; }
  `,
  html: `
    <div class="stage">
      <div class="quad"><div class="slot"></div>${N.map((n, i) => `<span class="nt${n === 'EB' ? ' eb' : ''}" style="top:${12 + i * 18.5}px">${n}</span>`).join('')}
        <button class="h" type="button" role="slider" aria-label="Power brake controller, hold to keep the driver's safety device down" aria-valuemin="0" aria-valuemax="8"><b></b></button></div>
      <div class="side">
        <div class="g"><svg viewBox="0 0 60 60" aria-hidden="true">${TICKS}<text class="u" x="30" y="44">bar</text><g class="ndl"><path d="M30 33V10" stroke="#d2201a" stroke-width="1.6" stroke-linecap="round"/></g><circle cx="30" cy="30" r="2.6" fill="#1a1b1c"/></svg></div>
        <div class="lamps"><span class="lamp am"><i></i>DSD</span><span class="lamp rd"><i></i>EMERG</span></div>
      </div>
    </div>`,
  init(root) {
    const h = root.querySelector('.h'), ndl = root.querySelector('.ndl'), am = root.querySelector('.am'), rd = root.querySelector('.rd');
    let notch = 7, held = false, tripped = false, warn = 0, drag = null;
    const yOf = (i) => 4 + i * 18.5;
    const draw = (y) => {
      h.style.setProperty('--y', (y ?? yOf(notch)) + 'px'); h.classList.toggle('held', held);
      h.setAttribute('aria-valuenow', notch); h.setAttribute('aria-valuetext', N[notch] + (held ? ', DSD held' : ''));
      const bar = tripped ? 3.8 : BAR[N[notch]] || 0;
      ndl.style.transform = `rotate(${-120 + bar * 60}deg)`; rd.classList.toggle('on', tripped);
    };
    const supervise = () => {
      clearTimeout(warn); am.classList.remove('on');
      if (!held && !tripped && notch <= 4) { am.classList.add('on'); warn = setTimeout(() => { am.classList.remove('on'); tripped = true; draw(); }, 1500); }
    };
    const setNotch = (i) => { notch = Math.max(0, Math.min(8, i)); if (tripped && held && notch === 8) tripped = false; draw(); };
    const grab = () => { held = true; supervise(); draw(); };
    const drop = () => { held = false; supervise(); draw(); };
    h.addEventListener('pointerdown', (e) => { drag = { y: e.clientY, n: notch }; h.setPointerCapture(e.pointerId); h.classList.add('drag'); grab(); });
    h.addEventListener('pointermove', (e) => {
      if (!drag) return; const y = Math.max(yOf(0), Math.min(yOf(8), yOf(drag.n) + e.clientY - drag.y));
      const n = Math.round((y - 4) / 18.5); if (n !== notch) setNotch(n); draw(y);
    });
    const end = () => { if (!drag) return; drag = null; h.classList.remove('drag'); drop(); };
    h.addEventListener('pointerup', end); h.addEventListener('pointercancel', end);
    h.addEventListener('keydown', (e) => {
      if (e.key === ' ' && !e.repeat) { e.preventDefault(); grab(); }
      const d = e.key === 'ArrowUp' ? -1 : e.key === 'ArrowDown' ? 1 : 0;
      if (d) { e.preventDefault(); setNotch(notch + d); supervise(); }
    });
    h.addEventListener('keyup', (e) => { if (e.key === ' ') drop(); });
    h.addEventListener('blur', () => { if (held) drop(); });
    draw();
    return () => clearTimeout(warn);
  },
};
