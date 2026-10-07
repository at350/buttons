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
    .sam { position: absolute; left: 58px; top: 10px; width: 120px; height: 96px; }
    .body { position: absolute; left: 0; top: 0; width: 236px; height: 212px; }
    .nose { position: absolute; left: 105px; top: 47px; width: 26px; height: 26px; border-radius: 50%; z-index: 2;
      background: radial-gradient(circle at 38% 32%, #ff8a80, #b3121a 55%, #6f0a0e); box-shadow: 0 2px 3px rgba(0,0,0,.35); transition: background .05s, box-shadow .05s; }
    .buzz .nose, .nose.on { background: radial-gradient(circle at 38% 32%, #fff, #ff3030 40%, #e0000c); box-shadow: 0 0 14px 6px rgba(255,40,40,.85); }
    .torso { position: absolute; left: 50px; top: 104px; width: 136px; height: 98px; }
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
    .tray { position: absolute; left: 16px; top: 22px; width: 40px; height: 56px; border-radius: 3px; border: 0; padding: 18px 3px 14px; cursor: pointer; transform: rotate(-8deg);
      background: linear-gradient(#e3262d 0 12px, #fff 12px); box-shadow: 0 2px 4px rgba(0,0,0,.3), inset 0 0 0 2px #fff; }
    .tray::before { content: ''; position: absolute; left: 8px; right: 8px; top: 4px; height: 4px; border-radius: 2px; background: #fff; }
    .tray::after { content: '$100'; position: absolute; left: 0; right: 0; bottom: 3px; text-align: center; font: 800 7px/1 'DM Sans', Arial, sans-serif; color: #1a5fb4; }
    .tray svg { width: 100%; height: 100%; opacity: .22; filter: grayscale(1); transition: opacity .2s, filter .2s; }
    .tray.has svg { opacity: 1; filter: none; }
    .tray:focus-visible { outline: 2px solid #1a5fb4; outline-offset: 2px; }
    .tweez { position: absolute; left: 186px; top: 24px; width: 40px; height: 90px; pointer-events: none; }
  `,
  html: `
    <div class="stage">
      <svg class="body" viewBox="0 0 236 212" aria-hidden="true">
        <defs><radialGradient id="osk" cx=".5" cy=".35" r=".75"><stop offset="0" stop-color="#fbd3bf"/><stop offset="1" stop-color="#e8a184"/></radialGradient>
          <radialGradient id="ocav" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#b41620"/><stop offset="1" stop-color="#4c070b"/></radialGradient></defs>
        <!-- arms and shoulders -->
        <path d="M36 212c2-40 8-74 26-96c10-10 26-14 56-14s46 4 56 14c18 22 24 56 26 96z" fill="url(#osk)"/>
        <path d="M62 140c-6 22-8 46-8 72M174 140c6 22 8 46 8 72" fill="none" stroke="#d9876a" stroke-width="2" opacity=".7"/>
        <path d="M88 112c8 6 20 8 30 8s22-2 30-8" fill="none" stroke="#d9876a" stroke-width="1.6" opacity=".6"/>
        <!-- neck -->
        <path d="M104 92h28v18c-4 4-24 4-28 0z" fill="#efb196"/>
        <!-- Adam's apple and butterflies-in-stomach cavities (decorative) -->
        <ellipse cx="118" cy="104" rx="7" ry="5" fill="url(#ocav)" stroke="#c7cbd2" stroke-width="2"/>
        <path d="M108 196c0-8 6-10 10-6 4-4 10-2 10 6-3 6-7 8-10 9-3-1-7-3-10-9z" fill="url(#ocav)" stroke="#c7cbd2" stroke-width="2"/>
      </svg>
      <svg class="sam" viewBox="0 0 120 96" aria-hidden="true">
        <defs><radialGradient id="ohd" cx=".5" cy=".38" r=".7"><stop offset="0" stop-color="#fcd8c6"/><stop offset="1" stop-color="#eba487"/></radialGradient></defs>
        <ellipse cx="15" cy="52" rx="9" ry="13" fill="#eba487"/><ellipse cx="105" cy="52" rx="9" ry="13" fill="#eba487"/>
        <path d="M13 46c3 2 4 8 1 12M107 46c-3 2-4 8-1 12" fill="none" stroke="#c9775a" stroke-width="1.5"/>
        <ellipse cx="60" cy="50" rx="45" ry="43" fill="url(#ohd)"/>
        <!-- the famous three-curl tuft -->
        <path d="M50 10c-2-8 6-11 8-5M58 8c0-9 9-10 9-3M66 9c3-7 10-5 8 1" fill="none" stroke="#2a1a10" stroke-width="2.4" stroke-linecap="round"/>
        <!-- startled eyes and raised brows -->
        <path d="M28 24q9-7 18-1M74 23q9-6 18 1" fill="none" stroke="#2a1a10" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="38" cy="38" rx="9" ry="11" fill="#fff" stroke="#2a1a10" stroke-width="1.4"/><ellipse cx="82" cy="38" rx="9" ry="11" fill="#fff" stroke="#2a1a10" stroke-width="1.4"/>
        <circle cx="40" cy="35" r="4.2" fill="#2a1a10"/><circle cx="80" cy="35" r="4.2" fill="#2a1a10"/><circle cx="41.3" cy="33.6" r="1.3" fill="#fff"/><circle cx="81.3" cy="33.6" r="1.3" fill="#fff"/>
        <!-- grimace: open mouth, gritted teeth -->
        <path d="M30 70q30 20 60 0q-4 14-30 16q-26-2-30-16z" fill="#6d0f16" stroke="#2a1a10" stroke-width="1.6"/>
        <path d="M34 72q26 12 52 0v4q-26 10-52 0z" fill="#fff"/>
        <path d="M44 75.5v5M52 77v5M60 77.5v5M68 77v5M76 75.5v5" stroke="#cfcfcf" stroke-width="1"/>
        <ellipse cx="22" cy="58" rx="7" ry="4" fill="#f08a8a" opacity=".45"/><ellipse cx="98" cy="58" rx="7" ry="4" fill="#f08a8a" opacity=".45"/>
      </svg>
      <span class="nose"></span>
      <div class="torso"><div class="rim"><span class="hole"></span><button class="piece" type="button" aria-label="wishbone">${BONE}</button></div></div>
      <button class="tray" type="button" aria-label="put the wishbone back">${BONE}</button>
      <svg class="tweez" viewBox="0 0 40 90" aria-hidden="true">
        <path d="M24 4c6 20 4 50-8 84" fill="none" stroke="#c81e1e" stroke-width="2" opacity=".8"/>
        <path d="M18 6l-5 58 2 2 6-58z" fill="#c9cdd3" stroke="#6b7078" stroke-width=".8"/><path d="M22 6l-1 58 2 1 3-58z" fill="#e4e7eb" stroke="#6b7078" stroke-width=".8"/>
        <rect x="16" y="2" width="12" height="8" rx="2" fill="#2a2d31"/>
      </svg>
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
