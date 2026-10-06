// Eppendorf 5424 microcentrifuge: white housing, lid with a smoked window over the 24-place rotor,
// segment LCD and the soft keys (lowercase legends as on the real panel). Lid-lock interlock:
// "start stop" with the lid up flashes OPEn and refuses; once running, "open" is refused (lock
// blinks). After the rotor coasts to 0 rpm the lid unlocks and pops open by itself.
const SEG = { 0: 'abcdef', 1: 'bc', 2: 'abdeg', 3: 'abcdg', 4: 'bcfg', 5: 'acdfg', 6: 'acdefg', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg', ' ': '', O: 'abcdef', P: 'abefg', E: 'adefg', n: 'ceg' };
const hs = (y) => `1,${y} 2.2,${y - 1.2} 9.8,${y - 1.2} 11,${y} 9.8,${y + 1.2} 2.2,${y + 1.2}`;
const vs = (x, a, b) => `${x},${a + 1} ${x + 1.2},${a + 2.2} ${x + 1.2},${b - 2.2} ${x},${b - 1} ${x - 1.2},${b - 2.2} ${x - 1.2},${a + 2.2}`;
const POLY = [hs(1.2), vs(10.8, 0, 11), vs(10.8, 11, 22), hs(20.8), vs(1.2, 11, 22), vs(1.2, 0, 11), hs(11)];
const digits = (n) => Array.from({ length: n }, (_, i) => `<g class="dg" transform="translate(${i * 15 + 2} 0) skewX(-6)">${POLY.map((p) => `<polygon points="${p}"/>`).join('')}</g>`).join('');
const paint = (svg, s) => { const gs = svg.querySelectorAll('.dg'), cs = s.padStart(gs.length, ' ').split(''); gs.forEach((g, i) => { const on = SEG[cs[i]] || ''; [...g.children].forEach((p, k) => p.classList.toggle('on', on.includes('abcdefg'[k]))); }); };
const HOLES = Array.from({ length: 24 }, (_, i) => { const a = i * 15 * Math.PI / 180; return `<i style="left:${(40 + 32 * Math.sin(a)).toFixed(1)}px;top:${(40 - 32 * Math.cos(a)).toFixed(1)}px"></i>`; }).join('');
export default {
  id: 'nd-eppendorf-5424',
  credit: 'Eppendorf 5424 microcentrifuge — lid-lock interlock, "open" and "start stop" keys, speed ▲▼, rotor spins up and the lid auto-opens at standstill',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; align-items: center; gap: 14px; padding: 14px; border-radius: 12px; overflow: hidden;
      background: linear-gradient(170deg, #f7f8f6, #dfe2df); box-shadow: inset 0 1px 0 #fff, inset 0 -2px 0 rgba(0,0,0,.06); }
    .well { position: relative; width: 108px; height: 108px; border-radius: 50%; background: radial-gradient(circle, #3a3f44 0 60%, #23272b 100%); box-shadow: inset 0 3px 8px rgba(0,0,0,.7), 0 0 0 4px #e9ebe8, 0 0 0 5px #c3c8c6; }
    .rotor { position: absolute; left: 10px; top: 10px; width: 88px; height: 88px; border-radius: 50%;
      background: radial-gradient(circle, #8d9399 0 9%, #d6dadd 11%, #aab0b5 30%, #e3e6e8 55%, #9aa1a6 75%, #c8ccd0 100%); box-shadow: 0 2px 4px rgba(0,0,0,.6); }
    .rotor i { position: absolute; width: 8px; height: 8px; margin: -4px 0 0 -4px; border-radius: 50%; background: #2a2e32; box-shadow: inset 0 1px 1px #000, 0 .5px 0 rgba(255,255,255,.6); }
    .rotor b { position: absolute; left: 40px; top: 36px; width: 8px; height: 16px; border-radius: 3px; background: #6d747a; }
    .blur { position: absolute; inset: 10px; border-radius: 50%; pointer-events: none; opacity: 0;
      background: radial-gradient(circle, transparent 0 27%, rgba(190,196,200,.95) 30% 46%, transparent 48%), radial-gradient(circle, #b9bfc4 0 25%, transparent 26%); }
    .lid { position: absolute; inset: -4px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; transform-origin: 50% 0;
      background: radial-gradient(circle, rgba(30,38,46,.55) 0 30%, #f1f2f0 31%, #e2e5e3 60%, #c9cdcb 100%);
      box-shadow: 0 3px 6px rgba(0,0,0,.35), inset 0 1px 0 #fff; transition: transform .35s cubic-bezier(.3,1.2,.5,1), box-shadow .35s; }
    .lid[aria-pressed="false"] { transform: translateY(-2px) scaleY(.16); box-shadow: 0 -1px 2px rgba(0,0,0,.25); }
    .lid:focus-visible, .k:focus-visible { outline: 2px solid #0a5aa8; outline-offset: 2px; }
    .panel { width: 120px; padding: 8px; border-radius: 6px; background: linear-gradient(#5b6670, #46505a); box-shadow: inset 0 1px 0 rgba(255,255,255,.18); }
    .lcd { position: relative; height: 44px; border-radius: 3px; background: linear-gradient(#c6ccbe, #aeb5a5); box-shadow: inset 0 2px 4px rgba(0,0,0,.45); }
    .lcd svg.rd { position: absolute; left: 6px; top: 6px; width: 76px; height: 22px; }
    .rd .dg > * { fill: rgba(25,30,20,.06); } .rd .dg > .on { fill: #1b2015; }
    .lcd.err svg.rd { animation: err .3s steps(2, jump-none) 4; } @keyframes err { 50% { opacity: 0; } }
    .lcd span { position: absolute; font: 700 7px/1 "DM Sans", Inter, Arial, sans-serif; color: #1b2015; }
    .lcd .u { right: 6px; top: 16px; } .ic { position: absolute; bottom: 4px; width: 14px; height: 10px; fill: none; stroke: #1b2015; stroke-width: 1.4; opacity: 0; }
    .ic.lk { left: 8px; } .ic.op { left: 28px; } .ic.on { opacity: 1; } .ic.blink { animation: err .25s steps(2, jump-none) 4; }
    .keys { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 8px; }
    .k { height: 24px; border: 0; padding: 0; border-radius: 4px; cursor: pointer; font: 600 8px/1 "DM Sans", Inter, Arial, sans-serif; color: #f3f5f6;
      background: linear-gradient(#77838e, #5f6a74); box-shadow: 0 2px 0 #2c3339, inset 0 1px 0 rgba(255,255,255,.25); }
    .k svg { width: 10px; height: 10px; fill: currentColor; }
    .k.go { grid-column: 1 / -1; height: 28px; background: linear-gradient(#2f75b8, #1d5a97); box-shadow: 0 2px 0 #0f355a, inset 0 1px 0 rgba(255,255,255,.3); }
    .k:hover { filter: brightness(1.1); }
    .k:active { transform: translateY(2px); box-shadow: 0 0 0 #2c3339, inset 0 1px 2px rgba(0,0,0,.35); }
  `,
  html: `
    <div class="stage">
      <div class="well"><div class="rotor">${HOLES}<b></b></div><div class="blur"></div>
        <button class="lid" type="button" aria-pressed="false" aria-label="Lid"></button></div>
      <div class="panel">
        <div class="lcd"><svg class="rd" viewBox="0 0 77 22">${digits(5)}</svg><span class="u">rpm</span>
          <svg class="ic lk" viewBox="0 0 14 10"><rect x="3" y="4.5" width="8" height="5" rx="1"/><path d="M5 4.5V3a2 2 0 0 1 4 0v1.5"/></svg>
          <svg class="ic op" viewBox="0 0 14 10"><path d="M1 9h12M2 9V6h10v3M2 5L10 1"/></svg></div>
        <div class="keys">
          <button class="k up" type="button" aria-label="Speed up"><svg viewBox="0 0 10 10"><path d="M5 2l4 6H1z"/></svg></button>
          <button class="k dn" type="button" aria-label="Speed down"><svg viewBox="0 0 10 10"><path d="M5 8l4-6H1z"/></svg></button>
          <button class="k op" type="button">open</button><button class="k short" type="button">short</button>
          <button class="k go" type="button">start stop</button>
        </div>
      </div>
    </div>`,
  init(root) {
    const $ = (s) => root.querySelector(s);
    const lid = $('.lid'), rotor = $('.rotor'), blur = $('.blur'), rd = $('.rd'), lcd = $('.lcd'), lk = $('.ic.lk'), opI = $('.ic.op');
    let closed = false, running = false, short = false, rpm = 0, set = 14000, ang = 0, raf = 0, t0 = 0, err = 0;
    const MAX = 14680;
    const draw = () => {
      if (!lcd.classList.contains('err')) paint(rd, String(rpm > 0 ? Math.round(rpm / 10) * 10 : set));
      lid.setAttribute('aria-pressed', closed); lk.classList.toggle('on', closed); opI.classList.toggle('on', !closed);
      rotor.style.transform = `rotate(${ang}deg)`; blur.style.opacity = Math.min(1, rpm / 3000);
    };
    const flash = (el) => { el.classList.remove('blink', 'err'); void el.offsetWidth; el.classList.add(el === lcd ? 'err' : 'blink'); };
    lcd.addEventListener('animationend', () => { lcd.classList.remove('err'); draw(); });
    const tick = (t) => {
      const dt = t0 ? Math.min(0.05, (t - t0) / 1000) : 0; t0 = t;
      const goal = running ? set : 0;
      rpm = rpm < goal ? Math.min(goal, rpm + 7000 * dt) : Math.max(goal, rpm - 5000 * dt);
      ang = (ang + (rpm / MAX) * 1440 * dt) % 360; draw();
      if (running || rpm > 0) raf = requestAnimationFrame(tick);
      else { raf = 0; t0 = 0; closed = false; draw(); }
    };
    const start = () => { running = true; if (!raf) raf = requestAnimationFrame(tick); };
    lid.addEventListener('click', () => { if (!closed) { closed = true; draw(); } else flash(lk); });
    $('.op').addEventListener('click', () => { if (running || rpm > 0) flash(lk); else { closed = false; draw(); } });
    $('.go').addEventListener('click', () => {
      if (running) { running = false; return; }
      if (!closed) { paint(rd, 'OPEn'); flash(lcd); return; }
      short = false; start();
    });
    const sh = $('.short');
    const shortOn = () => { if (closed && !running) { short = true; start(); } else if (!closed) { paint(rd, 'OPEn'); flash(lcd); } };
    const shortOff = () => { if (short) { short = false; running = false; } };
    sh.addEventListener('pointerdown', shortOn); sh.addEventListener('pointerup', shortOff); sh.addEventListener('pointerleave', shortOff); sh.addEventListener('pointercancel', shortOff);
    sh.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) shortOn(); });
    sh.addEventListener('keyup', shortOff);
    $('.up').addEventListener('click', () => { set = Math.min(MAX, set + 500); draw(); });
    $('.dn').addEventListener('click', () => { set = Math.max(500, (set === MAX ? 14500 : set - 500)); draw(); });
    draw();
    return () => { cancelAnimationFrame(raf); clearTimeout(err); };
  },
};
