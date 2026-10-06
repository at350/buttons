const TUNE = [0, 0, 4, 4, 5, 5, 4, -1, 3, 3, 2, 2, 1, 1, 0, -1];
const FREQ = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5];
const STEP = 9;
const PINS = [0, 1, 2].map((rep) => TUNE.map((n, i) => (n < 0 ? '' : `<circle cx="${14 + n * 15}" cy="${(rep * TUNE.length + i) * STEP}" r="2.4" fill="#fffdf2" stroke="#5a4208" stroke-width=".8"/>`)).join('')).join('');
const TEETH = FREQ.map((_, i) => `<span class="tooth" style="left:${8 + i * 15}px;height:${40 - i * 2.4}px"></span>`).join('');

export default {
  id: 'ty2-music-box',
  credit: 'Wind-up cylinder music box (Swiss/Sankyo movement) — turn the crank and the pinned brass drum plucks the steel comb: Twinkle Twinkle',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; display: inline-block; padding: 14px; border-radius: 12px; overflow: hidden; background: linear-gradient(#f6e6d0, #e2c6a2); }
    .box { position: relative; width: 236px; height: 140px; border-radius: 10px;
      background: repeating-linear-gradient(92deg, rgba(0,0,0,.06) 0 2px, transparent 2px 9px), linear-gradient(#9a6332, #6e4120 70%, #57321a);
      box-shadow: 0 6px 0 #3b2010, 0 10px 14px rgba(60,30,0,.35), inset 0 2px 0 rgba(255,255,255,.2); }
    .well { position: absolute; left: 12px; top: 12px; width: 150px; height: 116px; border-radius: 6px; background: linear-gradient(#3a2412, #2a180a); box-shadow: inset 0 3px 8px #000; }
    .drum { position: absolute; left: 10px; top: 10px; width: 130px; height: 50px; border-radius: 8px; overflow: hidden;
      background: linear-gradient(#7a5a10, #e8c661 25%, #fff0b0 42%, #d4a937 60%, #7a5a10); box-shadow: 0 3px 4px rgba(0,0,0,.6); }
    .drum svg { position: absolute; left: 0; top: 0; width: 130px; height: ${STEP * TUNE.length * 3}px; transition: transform .18s ease-out; }
    .drum::after { content: ''; position: absolute; inset: 0; background: linear-gradient(rgba(0,0,0,.45), transparent 30%, transparent 70%, rgba(0,0,0,.45)); }
    .comb { position: absolute; left: 10px; top: 58px; width: 130px; height: 50px; }
    .comb::before { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 10px; border-radius: 2px; background: linear-gradient(#e5e7eb, #9aa0a8); }
    .tooth { position: absolute; bottom: 8px; width: 10px; border-radius: 2px 2px 0 0; background: linear-gradient(90deg, #8d939b, #f3f4f6 45%, #b8bdc4); transform-origin: 50% 100%; }
    .tooth.pl { animation: pl .3s ease-out; }
    @keyframes pl { 10% { transform: skewX(-12deg); } 30% { transform: skewX(8deg); } 55% { transform: skewX(-4deg); } }
    .crank { position: absolute; left: 172px; top: 34px; width: 56px; height: 56px; border-radius: 50%; cursor: grab; touch-action: none;
      background: radial-gradient(circle, #d8b45a 0 9px, #8a6a20 10px 12px, transparent 13px); }
    .crank.drag { cursor: grabbing; }
    .crank:focus-visible { outline: 2px solid #ffd27a; outline-offset: 2px; }
    .arm { position: absolute; left: 24px; top: 2px; width: 8px; height: 28px; border-radius: 3px; background: linear-gradient(90deg, #8a6a20, #f2d27a, #8a6a20); }
    .knob { position: absolute; left: 17px; top: -4px; width: 22px; height: 22px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #fff4d6, #c9a050 60%, #7a5a10); box-shadow: 0 2px 3px rgba(0,0,0,.5); }
  `,
  html: `
    <div class="stage"><div class="box">
      <div class="well"><div class="drum"><svg viewBox="0 0 130 ${STEP * TUNE.length * 3}" aria-hidden="true">${PINS}</svg></div><div class="comb">${TEETH}</div></div>
      <div class="crank" role="slider" tabindex="0" aria-label="crank" aria-valuemin="0" aria-valuemax="${TUNE.length}" aria-valuenow="0"><span class="arm"></span><span class="knob"></span></div>
    </div></div>`,
  init(root) {
    const crank = root.querySelector('.crank'), drum = root.querySelector('.drum svg'), teeth = [...root.querySelectorAll('.tooth')];
    let ctx = null, acc = 0, prev = 0, drag = false, step = 0;
    const play = (f) => { try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); const n = ctx.currentTime, g = ctx.createGain(); g.connect(ctx.destination);
      g.gain.setValueAtTime(0.0001, n); g.gain.exponentialRampToValueAtTime(0.16, n + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, n + 1.4);
      [1, 2.76].forEach((m, i) => { const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f * m; const h = ctx.createGain(); h.gain.value = i ? 0.25 : 1; o.connect(h).connect(g); o.start(n); o.stop(n + 1.5); });
    } catch (e) { /* no audio */ } };
    const tick = () => {
      const n = TUNE[step % TUNE.length];
      if (n >= 0) { const tt = teeth[n]; tt.classList.remove('pl'); void tt.offsetWidth; tt.classList.add('pl'); play(FREQ[n]); }
      step++; drum.style.transform = `translateY(${-((step % TUNE.length) + TUNE.length) * STEP + 24}px)`; crank.setAttribute('aria-valuenow', step % TUNE.length);
    };
    const turn = (d) => { if (d <= 0) return; const before = Math.floor(acc / 40); acc += d; crank.style.transform = `rotate(${acc}deg)`; for (let k = before; k < Math.floor(acc / 40); k++) tick(); };
    const ang = (e) => { const r = crank.getBoundingClientRect(); return Math.atan2(e.clientX - r.left - r.width / 2, -(e.clientY - r.top - r.height / 2)) * 180 / Math.PI; };
    crank.addEventListener('pointerdown', (e) => { drag = true; prev = ang(e); crank.setPointerCapture(e.pointerId); crank.classList.add('drag'); });
    crank.addEventListener('pointermove', (e) => { if (!drag) return; const a = ang(e); let d = a - prev; if (d > 180) d -= 360; if (d < -180) d += 360; prev = a; turn(d); });
    const up = () => { drag = false; crank.classList.remove('drag'); };
    crank.addEventListener('pointerup', up); crank.addEventListener('pointercancel', up); crank.addEventListener('lostpointercapture', up);
    crank.addEventListener('keydown', (e) => { if (['ArrowRight', 'ArrowDown', 'Enter', ' '].includes(e.key)) { e.preventDefault(); turn(40); } });
    drum.style.transform = `translateY(${-TUNE.length * STEP + 24}px)`;
    return () => { if (ctx) ctx.close(); };
  },
};
