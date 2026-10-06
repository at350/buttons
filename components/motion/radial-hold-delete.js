const SPRING = 'linear(0, 0.143, 0.453, 0.779, 1.028, 1.168, 1.205, 1.173, 1.109, 1.043, 0.992, 0.965, 0.958, 0.965, 0.978, 0.992, 1.002, 1.007, 1.009, 1.007, 1.004, 1.002, 1)';

export default {
  id: 'mo-radial-hold-delete',
  credit: 'Hold-to-delete (the long-press confirm pattern from iOS / Linear) — an @property-animated conic ring fills while the Lucide bin trembles, completes with a burst; let go early and it rewinds',
  size: 'auto',
  css: `
    @property --p { syntax: '<percentage>'; inherits: false; initial-value: 0%; }
    :host { display: inline-block; }
    .wrap { position: relative; width: 120px; height: 120px; display: grid; place-items: center; }
    .btn {
      position: relative; width: 72px; height: 72px; border-radius: 50%; border: 0; cursor: pointer; color: #dc2626; touch-action: none; user-select: none; -webkit-user-select: none;
      background: conic-gradient(#ef4444 var(--p), #fee2e2 0); --p: 0%; transition: --p .4s cubic-bezier(.4, 0, .2, 1), transform .5s ${SPRING};
      display: grid; place-items: center;
    }
    .btn::before { content: ''; position: absolute; inset: 5px; border-radius: 50%; background: #fff; transition: background .3s; }
    .btn:hover { transform: scale(1.05); }
    .btn:focus-visible { outline: 2px solid #dc2626; outline-offset: 3px; }
    .btn.hold { --p: 100%; transition: --p 1.4s linear, transform .5s ${SPRING}; transform: scale(.95); }
    .btn.hold .bin { animation: wobble .25s ease-in-out infinite alternate; }
    @keyframes wobble { from { transform: rotate(-6deg) translateX(-1px); } to { transform: rotate(6deg) translateX(1px); } }
    .btn.done { --p: 100%; transform: scale(1.1); color: #fff; } .btn.done::before { background: #ef4444; }
    .bin { position: relative; width: 26px; height: 26px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .4s ${SPRING}, color .2s; }
    .lid { transform-origin: 3px 6px; transition: transform .3s ${SPRING}; }
    .btn.done .lid { transform: rotate(-30deg) translate(-3px, -4px); }
    .burst { position: absolute; inset: 0; pointer-events: none; }
    .burst i { position: absolute; left: 50%; top: 50%; width: 6px; height: 6px; margin: -3px; border-radius: 50%; background: #ef4444; opacity: 0; transform: rotate(calc(var(--a) * 1deg)) translateX(0); }
    .wrap.boom .burst i { animation: burst .7s cubic-bezier(.2, .7, .3, 1) forwards; }
    @keyframes burst { 0% { opacity: 1; transform: rotate(calc(var(--a) * 1deg)) translateX(30px) scale(1); } 100% { opacity: 0; transform: rotate(calc(var(--a) * 1deg)) translateX(52px) scale(.2); } }
  `,
  html: `
    <div class="wrap">
      <span class="burst" aria-hidden="true"><i style="--a:0"></i><i style="--a:45"></i><i style="--a:90"></i><i style="--a:135"></i><i style="--a:180"></i><i style="--a:225"></i><i style="--a:270"></i><i style="--a:315"></i></span>
      <button class="btn" type="button" aria-label="Hold to delete">
        <svg class="bin" viewBox="0 0 24 24" aria-hidden="true"><g class="lid"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></g><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
      </button>
    </div>`,
  init(root) {
    try { CSS.registerProperty({ name: '--p', syntax: '<percentage>', inherits: false, initialValue: '0%' }); } catch (e) { /* already registered */ }
    const wrap = root.querySelector('.wrap'), btn = root.querySelector('.btn');
    let t = 0, r = 0;
    const start = () => {
      if (btn.classList.contains('done')) return;
      btn.classList.add('hold'); clearTimeout(t);
      t = setTimeout(() => {
        btn.classList.remove('hold'); btn.classList.add('done'); wrap.classList.add('boom');
        clearTimeout(r); r = setTimeout(() => { btn.classList.remove('done'); wrap.classList.remove('boom'); }, 1600);
      }, 1400);
    };
    const stop = () => { clearTimeout(t); btn.classList.remove('hold'); };
    btn.addEventListener('pointerdown', (e) => { e.preventDefault(); btn.setPointerCapture(e.pointerId); start(); });
    btn.addEventListener('pointerup', stop); btn.addEventListener('pointercancel', stop); btn.addEventListener('lostpointercapture', stop); btn.addEventListener('blur', stop);
    btn.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); start(); } });
    btn.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') stop(); });
    return () => { clearTimeout(t); clearTimeout(r); };
  },
};
