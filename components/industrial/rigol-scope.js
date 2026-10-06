// Rigol DS1054Z vertical section: CH1–CH4 keys backlit in the channel colours (yellow, cyan,
// magenta, blue) and the vertical SCALE knob. Press an off channel to turn it on and select it,
// press the selected one to turn it off; drag the knob (or arrow keys) to step the selected
// channel's V/div through 1-2-5. Traces run while the pointer is over the instrument.
const COL = ['#f7e01b', '#18e3ff', '#ff3fe0', '#3f86ff'];
const STEPS = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10];
const fmtV = (v) => (v < 1 ? Math.round(v * 1000) + 'mV' : v + 'V');
const GRID = Array.from({ length: 11 }, (_, i) => `<path d="M${(i + 1) * 10} 0V80"/>`).join('') + Array.from({ length: 7 }, (_, i) => `<path d="M0 ${(i + 1) * 10}H120"/>`).join('');
export default {
  id: 'nd-rigol-ds1054z',
  credit: 'Rigol DS1054Z oscilloscope — CH1–CH4 keys that light in their trace colours and the vertical SCALE knob (1-2-5 V/div)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-flex; gap: 12px; padding: 12px; border-radius: 12px; overflow: hidden; background: linear-gradient(170deg, #3b3f44, #23262a);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.12); }
    .scr { width: 186px; height: 143px; padding: 4px; border-radius: 4px; background: #0d0f12; box-shadow: inset 0 0 0 1px #000, 0 0 0 2px #50555b; }
    .scr svg { display: block; width: 178px; height: 135px; }
    .grid { stroke: #3c4148; stroke-width: .35; stroke-dasharray: .6 1.4; }
    .frame { fill: none; stroke: #5d636b; stroke-width: .5; }
    .tr { fill: none; stroke-width: .9; stroke-linejoin: round; animation: run 1s linear infinite; animation-play-state: paused; }
    .stage:hover .tr { animation-play-state: running; }
    @keyframes run { to { transform: translateX(-30px); } }
    .tag { font: 600 4.6px "IBM Plex Mono", ui-monospace, monospace; }
    .tag rect { stroke-width: .5; fill: #0d0f12; }
    .side { display: flex; flex-direction: column; align-items: center; gap: 9px; padding-top: 2px; }
    .lbl { font: 700 7px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: 1px; color: #c7cbd0; }
    .knob { position: relative; width: 44px; height: 44px; border-radius: 50%; border: 0; padding: 0; cursor: grab; touch-action: none;
      background: radial-gradient(circle at 45% 35%, #c9ced3, #8d9399 60%, #6a7076); box-shadow: 0 3px 4px rgba(0,0,0,.6), inset 0 1px 1px rgba(255,255,255,.6); }
    .knob .rot { position: absolute; inset: 0; border-radius: 50%; background: repeating-conic-gradient(rgba(0,0,0,.25) 0 4deg, transparent 4deg 10deg); -webkit-mask: radial-gradient(circle, transparent 62%, #000 64%); mask: radial-gradient(circle, transparent 62%, #000 64%); }
    .knob::after { content: ''; position: absolute; inset: 9px; border-radius: 50%; background: radial-gradient(circle at 45% 35%, #e3e6e9, #a2a8ae); box-shadow: inset 0 -1px 2px rgba(0,0,0,.3); }
    .knob:focus-visible, .ch:focus-visible { outline: 2px solid #9fd0ff; outline-offset: 2px; }
    .chs { display: grid; grid-template-columns: repeat(2, 34px); gap: 6px; }
    .ch { height: 24px; border-radius: 4px; padding: 0; cursor: pointer; font: 700 8px/1 "DM Sans", Inter, Arial, sans-serif; letter-spacing: .5px;
      color: #c9cdd2; background: linear-gradient(#55595f, #3c4045); border: 1px solid #1d1f22; box-shadow: 0 2px 0 #141619, inset 0 1px 0 rgba(255,255,255,.15); transition: color .1s, box-shadow .1s; }
    .ch:active { transform: translateY(1px); box-shadow: 0 1px 0 #141619; }
    .ch.on { color: var(--c); box-shadow: 0 2px 0 #141619, inset 0 0 0 1px var(--c), 0 0 8px -1px var(--c), inset 0 0 8px -3px var(--c); text-shadow: 0 0 4px var(--c); }
    .ch.sel { background: linear-gradient(#62676d, #474b51); }
  `,
  html: `
    <div class="stage">
      <div class="scr"><svg viewBox="0 0 120 92" aria-hidden="true">
        <g class="grid">${GRID}</g><rect class="frame" x=".25" y=".25" width="119.5" height="79.5"/>
        <svg x="0" y="0" width="120" height="80" viewBox="0 0 120 80"><g class="traces"></g></svg><g class="tags"></g>
      </svg></div>
      <div class="side">
        <span class="lbl">SCALE</span>
        <button class="knob" type="button" role="slider" aria-label="Vertical scale"><span class="rot"></span></button>
        <div class="chs">${COL.map((c, i) => `<button class="ch" type="button" style="--c:${c}" aria-pressed="false">CH${i + 1}</button>`).join('')}</div>
      </div>
    </div>`,
  init(root) {
    const chs = [...root.querySelectorAll('.ch')], knob = root.querySelector('.knob'), rot = knob.firstElementChild;
    const traces = root.querySelector('.traces'), tags = root.querySelector('.tags');
    const amp = [1.0, 2.0, 0.5, 1.5], off = [22, 42, 56, 70];
    const ch = [{ on: true, s: 6 }, { on: true, s: 7 }, { on: false, s: 5 }, { on: false, s: 6 }];
    let sel = 0, ang = 0, last = 0, acc = 0, drag = false;
    const wave = (k, x) => { const p = (x % 30 + 30) % 30 / 30; return k === 0 ? Math.sin(p * 2 * Math.PI) : k === 1 ? (p < .5 ? 1 : -1) : k === 2 ? 1 - 4 * Math.abs(p - .5) : 2 * p - 1; };
    const draw = () => {
      traces.innerHTML = ch.map((c, k) => {
        if (!c.on) return '';
        const a = amp[k] / STEPS[c.s] * 10; let d = '';
        for (let x = 0; x <= 150; x += 1) { const y = Math.max(-40, Math.min(120, off[k] - a * wave(k, x))); d += (x ? 'L' : 'M') + x + ' ' + y.toFixed(1); }
        return `<path class="tr" stroke="${COL[k]}" d="${d}"/>`;
      }).join('');
      tags.innerHTML = ch.map((c, k) => c.on ? `<g class="tag" transform="translate(${2 + k * 29.5} 83)"><rect width="27.5" height="7.5" rx="1" stroke="${COL[k]}"/><text x="2" y="5.6" fill="${COL[k]}">${k + 1} ${fmtV(STEPS[c.s])}</text></g>` : '').join('');
      chs.forEach((b, k) => { b.classList.toggle('on', ch[k].on); b.classList.toggle('sel', k === sel && ch[k].on); b.setAttribute('aria-pressed', ch[k].on); });
      knob.setAttribute('aria-valuetext', `CH${sel + 1} ${fmtV(STEPS[ch[sel].s])}/div`);
    };
    chs.forEach((b, k) => b.addEventListener('click', () => {
      if (!ch[k].on) { ch[k].on = true; sel = k; } else if (sel === k) { ch[k].on = false; const n = ch.findIndex((c) => c.on); sel = n < 0 ? k : n; } else sel = k;
      draw();
    }));
    const stepScale = (d) => { if (!ch[sel].on) return; ch[sel].s = Math.max(0, Math.min(STEPS.length - 1, ch[sel].s + d)); draw(); };
    const angleAt = (e) => { const r = knob.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; };
    knob.addEventListener('pointerdown', (e) => { drag = true; last = angleAt(e); acc = 0; knob.setPointerCapture(e.pointerId); });
    knob.addEventListener('pointermove', (e) => {
      if (!drag) return; const a = angleAt(e); let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
      ang += d; acc += d; rot.style.transform = `rotate(${ang}deg)`;
      while (acc > 24) { acc -= 24; stepScale(-1); } while (acc < -24) { acc += 24; stepScale(1); }
    });
    const end = () => { drag = false; }; knob.addEventListener('pointerup', end); knob.addEventListener('pointercancel', end);
    knob.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? -1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? 1 : 0;
      if (d) { e.preventDefault(); ang -= d * 24; rot.style.transform = `rotate(${ang}deg)`; stepScale(d); }
    });
    draw();
  },
};
