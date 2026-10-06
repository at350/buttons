const BONE = '<svg viewBox="0 0 40 24" aria-hidden="true"><path d="M20 22 C18 15 12 9 5 4 a2.6 2.6 0 1 1 3-3.6 C13 5 18 9 20 13 C22 9 27 5 32 .4 a2.6 2.6 0 1 1 3 3.6 C28 9 22 15 20 22 Z" fill="#fbf8ef" stroke="#c9c2ad" stroke-width="1.2"/></svg>';

export default {
  id: 'ty2-operation',
  credit: 'Milton Bradley Operation (1965) — lift the wishbone out of Cavity Sam: hold it steady to pull it, touch the metal edge and his red nose lights and buzzes',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; width: 236px; height: 212px; border-radius: 12px; overflow: hidden;
      background: linear-gradient(#f6e7b8, #ead38a); box-shadow: inset 0 0 0 8px #1a5fb4, inset 0 0 0 11px #0b2e5c; }
    .stage.buzz { animation: buzz .07s linear 4; }
    @keyframes buzz { 50% { transform: translate(1px, -1px); } }
    .sam { position: absolute; left: 58px; top: 14px; width: 120px; height: 96px; }
    .nose { position: absolute; left: 105px; top: 54px; width: 26px; height: 26px; border-radius: 50%; z-index: 2;
      background: radial-gradient(circle at 38% 32%, #ff8a80, #b3121a 55%, #6f0a0e); box-shadow: 0 2px 3px rgba(0,0,0,.35); transition: background .05s, box-shadow .05s; }
    .buzz .nose, .nose.on { background: radial-gradient(circle at 38% 32%, #fff, #ff3030 40%, #e0000c); box-shadow: 0 0 14px 6px rgba(255,40,40,.85); }
    .torso { position: absolute; left: 50px; top: 104px; width: 136px; height: 98px; border-radius: 30px 30px 14px 14px; background: linear-gradient(#f8c7b0, #eda98d); }
    .rim { position: absolute; left: 24px; top: 18px; width: 88px; height: 62px; border-radius: 46% 54% 50% 50% / 52% 48% 52% 48%;
      background: radial-gradient(ellipse, transparent 60%, #e7e9ee 62%, #8e939c 80%, #d7dae0); }
    .hole { position: absolute; left: 6px; top: 6px; right: 6px; bottom: 6px; border-radius: inherit; background: radial-gradient(ellipse at 50% 40%, #b41620, #5c0a0e); box-shadow: inset 0 4px 8px rgba(0,0,0,.6); }
    .piece { position: absolute; left: 24px; top: 20px; width: 40px; height: 24px; border: 0; padding: 0; background: none; cursor: grab; touch-action: none; z-index: 3;
      transition: transform .25s cubic-bezier(.3,1.5,.5,1), filter .2s; }
    .piece svg { width: 100%; height: 100%; display: block; }
    .piece.drag { transition: none; cursor: grabbing; }
    .piece.lift { filter: drop-shadow(0 8px 4px rgba(0,0,0,.4)); }
    .piece.out { visibility: hidden; }
    .piece:focus-visible { outline: 2px solid #1a5fb4; outline-offset: 2px; }
    .tray { position: absolute; left: 18px; top: 150px; width: 40px; height: 28px; border-radius: 6px; border: 0; padding: 2px; cursor: pointer; background: rgba(26,95,180,.15); box-shadow: inset 0 0 0 2px rgba(26,95,180,.3); }
    .tray svg { width: 100%; height: 100%; opacity: 0; transition: opacity .2s; }
    .tray.has svg { opacity: 1; }
  `,
  html: `
    <div class="stage">
      <svg class="sam" viewBox="0 0 120 96" aria-hidden="true">
        <ellipse cx="14" cy="50" rx="10" ry="14" fill="#eda98d"/><ellipse cx="106" cy="50" rx="10" ry="14" fill="#eda98d"/>
        <ellipse cx="60" cy="50" rx="46" ry="44" fill="#f8c7b0"/>
        <path d="M52 8 q4 -8 6 0 M60 7 q4 -9 6 0 M44 10 q3 -7 6 0" fill="none" stroke="#5a3a20" stroke-width="2"/>
        <path d="M30 38 q8 -6 16 0 M74 38 q8 -6 16 0" fill="none" stroke="#5a3a20" stroke-width="3" stroke-linecap="round"/>
        <path d="M32 72 q28 16 56 0 q-28 8 -56 0 Z" fill="#7a1018" stroke="#5a3a20" stroke-width="2"/>
      </svg>
      <span class="nose"></span>
      <div class="torso"><div class="rim"><span class="hole"></span><button class="piece" type="button" aria-label="wishbone">${BONE}</button></div></div>
      <button class="tray" type="button" aria-label="put the wishbone back">${BONE}</button>
    </div>`,
  init(root) {
    const st = root.querySelector('.stage'), rim = root.querySelector('.rim'), piece = root.querySelector('.piece'), tray = root.querySelector('.tray');
    let ctx = null, drag = false, sx = 0, sy = 0, x = 0, y = 0, hold = 0, t = 0;
    const RX = 38 - 20, RY = 25 - 12;
    const tone = () => { try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); const o = ctx.createOscillator(), g = ctx.createGain(), n = ctx.currentTime;
      o.type = 'square'; o.frequency.value = 110; g.gain.setValueAtTime(0.06, n); g.gain.setValueAtTime(0.0001, n + 0.28); o.connect(g).connect(ctx.destination); o.start(n); o.stop(n + 0.3); } catch (e) { /* no audio */ } };
    const buzz = () => { st.classList.remove('buzz'); void st.offsetWidth; st.classList.add('buzz'); tone(); clearTimeout(t); t = setTimeout(() => st.classList.remove('buzz'), 320); };
    const place = () => { piece.style.transform = `translate(${x}px, ${y}px)`; };
    const drop = () => { drag = false; clearTimeout(hold); piece.classList.remove('drag', 'lift'); x = 0; y = 0; place(); };
    const extract = () => { drag = false; clearTimeout(hold); piece.classList.remove('drag', 'lift'); piece.classList.add('out'); tray.classList.add('has'); x = 0; y = 0; place(); };
    rim.addEventListener('pointerenter', (e) => { if (!drag && e.target === rim && !piece.matches(':hover')) buzz(); });
    piece.addEventListener('pointerdown', (e) => {
      drag = true; sx = e.clientX; sy = e.clientY; piece.setPointerCapture(e.pointerId); piece.classList.add('drag');
      hold = setTimeout(() => { piece.classList.add('lift'); hold = setTimeout(extract, 260); }, 650);
    });
    piece.addEventListener('pointermove', (e) => {
      if (!drag) return; x = e.clientX - sx; y = e.clientY - sy; place();
      if ((x / RX) ** 2 + (y / RY) ** 2 > 1) { buzz(); drop(); }
    });
    const up = () => { if (drag) drop(); };
    piece.addEventListener('pointerup', up); piece.addEventListener('pointercancel', up); piece.addEventListener('lostpointercapture', up);
    piece.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); piece.classList.add('lift'); clearTimeout(hold); hold = setTimeout(extract, 300); } });
    tray.addEventListener('click', () => { if (!tray.classList.contains('has')) return; tray.classList.remove('has'); piece.classList.remove('out'); });
    return () => { clearTimeout(t); clearTimeout(hold); if (ctx) ctx.close(); };
  },
};
