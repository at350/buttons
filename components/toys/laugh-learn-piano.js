export default {
  id: 'ty2-laugh-learn-piano',
  credit: 'Fisher-Price Laugh & Learn light-up piano — chunky rainbow keys that sink, light and sing a note',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; position: relative; display: inline-block; padding: 16px; border-radius: 12px; overflow: hidden;
      background: linear-gradient(160deg, #dff1ff, #b9dcf7); }
    .piano { position: relative; width: 236px; padding: 46px 12px 14px; border-radius: 30px 30px 22px 22px;
      background: radial-gradient(ellipse at 30% 0, #6fa1ea, #1a5fb4 45%, #0f3f7f);
      box-shadow: 0 7px 0 #0b2e5c, 0 12px 18px rgba(10,40,90,.35), inset 0 2px 0 rgba(255,255,255,.35); }
    .top { position: absolute; left: 14px; right: 14px; top: 10px; height: 28px; border-radius: 14px;
      background: linear-gradient(#ffe25a, #f7c600 60%, #d9a900); box-shadow: inset 0 -3px 0 rgba(0,0,0,.12), 0 2px 0 rgba(0,0,0,.2);
      display: flex; align-items: center; justify-content: center; gap: 10px; }
    .lamp { width: 14px; height: 14px; border-radius: 50%; background: #c99800; box-shadow: inset 0 2px 2px rgba(0,0,0,.3); transition: background .12s, box-shadow .12s; }
    .lamp.on { background: #fffbe0; box-shadow: 0 0 10px 3px #fff4a0, inset 0 -2px 2px rgba(0,0,0,.1); }
    .keys { display: flex; gap: 4px; padding: 6px; border-radius: 16px; background: #0b2e5c; box-shadow: inset 0 3px 5px rgba(0,0,0,.5); }
    .key { flex: 1; height: 86px; border: 0; padding: 0; border-radius: 6px 6px 14px 14px; cursor: pointer; position: relative;
      background: linear-gradient(180deg, rgba(255,255,255,.55) 0, rgba(255,255,255,0) 30%), var(--c);
      box-shadow: 0 6px 0 var(--d), inset 0 -4px 6px rgba(0,0,0,.15);
      transform: translateY(-4px); transition: transform .06s, box-shadow .06s, filter .15s; }
    .key::after { content: ''; position: absolute; left: 50%; bottom: 12px; width: 12px; height: 12px; margin-left: -6px; border-radius: 50%;
      background: rgba(255,255,255,.45); transition: background .12s, box-shadow .12s; }
    .key:hover { filter: brightness(1.08); }
    .key:active, .key.down { transform: translateY(1px); box-shadow: 0 1px 0 var(--d), inset 0 -2px 4px rgba(0,0,0,.2); }
    .key.down::after { background: #fff; box-shadow: 0 0 12px 4px rgba(255,255,255,.85); }
    .key:focus-visible { outline: 3px solid #fff; outline-offset: 1px; }
    .note { position: absolute; top: 40px; font: 800 18px/1 'Unbounded', system-ui, sans-serif; color: #fff; pointer-events: none;
      text-shadow: 0 2px 0 rgba(0,0,0,.25); animation: float .7s ease-out forwards; }
    @keyframes float { from { transform: translateY(0) scale(.6); opacity: 1; } to { transform: translateY(-34px) scale(1.1); opacity: 0; } }
  `,
  html: `
    <div class="stage"><div class="piano">
      <div class="top"><span class="lamp"></span><span class="lamp"></span><span class="lamp"></span><span class="lamp"></span><span class="lamp"></span></div>
      <div class="keys">
        <button class="key" type="button" aria-label="C" style="--c:#e3262d;--d:#9b1015"></button>
        <button class="key" type="button" aria-label="D" style="--c:#ff8a00;--d:#b65f00"></button>
        <button class="key" type="button" aria-label="E" style="--c:#f7c600;--d:#b08b00"></button>
        <button class="key" type="button" aria-label="F" style="--c:#3cb44a;--d:#237a2d"></button>
        <button class="key" type="button" aria-label="G" style="--c:#2b8be8;--d:#1a5fb4"></button>
        <button class="key" type="button" aria-label="A" style="--c:#8e44c8;--d:#5c2589"></button>
      </div>
    </div></div>`,
  init(root) {
    const keys = [...root.querySelectorAll('.key')], lamps = [...root.querySelectorAll('.lamp')], piano = root.querySelector('.piano');
    const F = [261.63, 293.66, 329.63, 349.23, 392, 440];
    let ctx = null; const timers = new Set();
    const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };
    const tone = (f) => {
      try {
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator(), g = ctx.createGain(), n = ctx.currentTime;
        o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, n);
        g.gain.exponentialRampToValueAtTime(0.18, n + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, n + 0.5);
        o.connect(g).connect(ctx.destination); o.start(n); o.stop(n + 0.55);
      } catch (e) { /* audio unavailable */ }
    };
    keys.forEach((k, i) => {
      k.addEventListener('click', () => {
        tone(F[i]); k.classList.add('down');
        lamps.forEach((l, j) => l.classList.toggle('on', (j + i) % 2 === 0));
        const n = document.createElement('span'); n.className = 'note'; n.textContent = '♪';
        n.style.left = (k.offsetLeft + k.offsetWidth / 2 - 7) + 'px'; piano.appendChild(n);
        later(() => n.remove(), 720);
        later(() => { k.classList.remove('down'); lamps.forEach((l) => l.classList.remove('on')); }, 260);
      });
    });
    return () => { timers.forEach(clearTimeout); if (ctx) ctx.close(); };
  },
};
