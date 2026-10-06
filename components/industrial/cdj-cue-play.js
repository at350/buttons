// Pioneer CDJ-2000NXS2 transport: the big rubber CUE (orange LED ring) and PLAY/PAUSE (green LED
// ring) buttons with the elapsed-time readout. Real CDJ logic: paused off the cue point → CUE blinks,
// press it to set the cue there; paused on the cue → hold CUE to preview, release to snap back (press
// PLAY while holding to keep playing); CUE while playing = back-cue (jump back and pause). PLAY
// blinks while paused.
export default {
  id: 'nd-cdj-cue-play',
  credit: 'Pioneer CDJ-2000NXS2 — CUE (orange ring) and PLAY/PAUSE (green ring) with real cue logic: set cue, hold-to-preview, back-cue, blinking pause',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; flex-direction: column; align-items: center; gap: 12px; padding: 14px 18px 16px; border-radius: 12px; overflow: hidden; user-select: none; -webkit-user-select: none;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.025) 0 .6px, transparent 1px) 0 0 / 3px 3px, linear-gradient(170deg, #2a2b2d, #121314); box-shadow: inset 0 1px 0 rgba(255,255,255,.1); }
    .lcd { width: 152px; display: flex; justify-content: space-between; align-items: baseline; padding: 6px 8px; border-radius: 3px; background: #05070a; box-shadow: inset 0 1px 3px #000, 0 0 0 1px #2e3135; }
    .lcd small { font: 700 6.5px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .8px; color: #8a96a3; }
    .lcd b { font: 500 17px/1 "IBM Plex Mono", ui-monospace, monospace; color: #e8f1ff; letter-spacing: .5px; }
    .lcd { position: relative; } .lcd i { position: absolute; left: 8px; right: 8px; bottom: 3px; height: 2px; background: #1c2633; }
    .lcd i::after { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: var(--p, 0%); background: #e8f1ff; }
    .lcd { padding-bottom: 9px; }
    .row { display: flex; gap: 22px; }
    .b { position: relative; width: 62px; height: 62px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; display: grid; place-items: center; touch-action: none; -webkit-tap-highlight-color: transparent;
      background: radial-gradient(circle at 50% 35%, #3b3d40, #18191b 70%); color: #f1f2f3;
      box-shadow: 0 0 0 3px #0a0b0c, 0 0 0 5px var(--ring-off), 0 0 0 7px #0a0b0c, 0 4px 6px rgba(0,0,0,.6), inset 0 1px 1px rgba(255,255,255,.18); transition: transform .05s; }
    .b.lit { box-shadow: 0 0 0 3px #0a0b0c, 0 0 0 5px var(--ring), 0 0 12px 5px var(--glow), 0 4px 6px rgba(0,0,0,.6), inset 0 1px 1px rgba(255,255,255,.18); }
    .b.blink { animation: bl .5s steps(2, jump-none) infinite; }
    @keyframes bl { 0% { box-shadow: 0 0 0 3px #0a0b0c, 0 0 0 5px var(--ring), 0 0 12px 5px var(--glow), 0 4px 6px rgba(0,0,0,.6), inset 0 1px 1px rgba(255,255,255,.18); } }
    .b.down { transform: scale(.96); }
    .b:focus-visible { outline: 2px solid #fff; outline-offset: 9px; }
    .cue { --ring: #ff8a1a; --ring-off: #3a2208; --glow: rgba(255,140,30,.45); font: 800 13px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: 1px; }
    .play { --ring: #2dff7a; --ring-off: #0d3a1c; --glow: rgba(45,255,120,.4); }
    .play svg { width: 30px; height: 16px; fill: #f1f2f3; }
  `,
  html: `
    <div class="stage">
      <div class="lcd" aria-live="off"><small>ELAPSED</small><b class="tm">00:00.0</b><i></i></div>
      <div class="row">
        <button class="b cue" type="button" aria-label="Cue">CUE</button>
        <button class="b play" type="button" aria-pressed="false" aria-label="Play / pause"><svg viewBox="0 0 30 16" aria-hidden="true"><path d="M1 1l11 7-11 7z"/><path d="M15 3h1.6l-3.4 12h-1.6z"/><rect x="19" y="1" width="3.5" height="14"/><rect x="25.5" y="1" width="3.5" height="14"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const cueB = root.querySelector('.cue'), playB = root.querySelector('.play'), tm = root.querySelector('.tm'), bar = root.querySelector('.lcd i');
    const LEN = 221.4;
    let t = 0, cue = 0, playing = false, preview = false, latched = false, tick = 0;
    const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${(s % 60).toFixed(1).padStart(4, '0')}`;
    const draw = () => {
      tm.textContent = fmt(t); bar.style.setProperty('--p', (t / LEN * 100).toFixed(2) + '%');
      const atCue = Math.abs(t - cue) < 0.05;
      playB.classList.toggle('lit', playing); playB.classList.toggle('blink', !playing); playB.setAttribute('aria-pressed', playing);
      cueB.classList.toggle('lit', playing || atCue); cueB.classList.toggle('blink', !playing && !atCue);
    };
    const run = (on) => {
      playing = on; clearInterval(tick); tick = 0;
      if (on) tick = setInterval(() => { t = Math.min(LEN, t + 0.1); if (t >= LEN) run(false); draw(); }, 100);
      draw();
    };
    const cueDown = () => {
      cueB.classList.add('down');
      if (playing && !preview) { t = cue; run(false); return; }
      if (Math.abs(t - cue) >= 0.05) { cue = t; draw(); return; }
      preview = true; latched = false; run(true);
    };
    const cueUp = () => { cueB.classList.remove('down'); if (preview) { preview = false; if (!latched) { t = cue; run(false); } } };
    cueB.addEventListener('pointerdown', (e) => { cueB.setPointerCapture(e.pointerId); cueDown(); });
    cueB.addEventListener('pointerup', cueUp); cueB.addEventListener('pointercancel', cueUp); cueB.addEventListener('lostpointercapture', cueUp);
    cueB.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); cueDown(); } });
    cueB.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') cueUp(); });
    playB.addEventListener('click', () => { if (preview) { latched = true; return; } run(!playing); });
    draw();
    return () => clearInterval(tick);
  },
};
