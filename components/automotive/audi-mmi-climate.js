const roll = (cls, label) => `
  <div class="roll ${cls}" tabindex="0" role="spinbutton" aria-label="${label}" aria-valuemin="16" aria-valuemax="28" aria-valuenow="22">
    <span class="p"></span><span class="c"></span><span class="n"></span>
  </div>`;
const key = (label, on) => `<button class="k" type="button" aria-pressed="${on}"><span>${label}</span></button>`;

export default {
  id: 'au-audi-mmi-climate',
  credit: 'Audi MMI touch response — lower climate display: swipe the temperature rollers, and AUTO / A/C / SYNC keys that click with haptic feedback and light the Audi red bar',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; align-items: stretch; gap: 8px; width: 330px; max-width: 100%; height: 132px; padding: 10px; border-radius: 12px; background: #000; color: #fff; font: 400 13px/1 'DM Sans', 'Helvetica Neue', system-ui, sans-serif; user-select: none; box-shadow: inset 0 0 0 1px #1c1c1c; }
    .roll { position: relative; flex: none; width: 80px; border-radius: 6px; background: linear-gradient(#000, #111 30%, #111 70%, #000); overflow: hidden; cursor: ns-resize; touch-action: none; display: grid; grid-template-rows: 1fr 1.3fr 1fr; place-items: center; font-variant-numeric: tabular-nums; }
    .roll::before { content: ''; position: absolute; left: 10px; right: 10px; top: 50%; height: 40px; margin-top: -20px; border-top: 1px solid #2a2a2a; border-bottom: 1px solid #2a2a2a; }
    .roll:focus-visible { outline: 2px solid #f50537; outline-offset: -2px; }
    .p, .n { color: #555; font-size: 15px; }
    .c { font: 300 28px/1 'DM Sans', system-ui, sans-serif; letter-spacing: -.02em; transition: transform .15s; }
    .roll.bump .c { transform: scale(1.08); }
    .mid { flex: 1; display: grid; grid-template-rows: repeat(3, 1fr); gap: 6px; min-width: 0; }
    .k { position: relative; border: 0; border-radius: 4px; background: #161616; color: #bdbdbd; font: 500 12px/1 'DM Sans', system-ui, sans-serif; letter-spacing: .08em; cursor: pointer; overflow: hidden; transition: background .1s, color .15s; -webkit-tap-highlight-color: transparent; }
    .k::after { content: ''; position: absolute; left: 50%; bottom: 4px; width: 22px; height: 2px; margin-left: -11px; border-radius: 1px; background: #333; transition: background .15s, box-shadow .15s; }
    .k[aria-pressed="true"] { color: #fff; }
    .k[aria-pressed="true"]::after { background: #f50537; box-shadow: 0 0 6px #f50537; }
    .k:hover { background: #1e1e1e; }
    .k.hap { animation: hap .14s steps(2) 1; background: #262626; }
    @keyframes hap { 0% { transform: translateY(1px); } 50% { transform: translateY(-1px); } 100% { transform: none; } }
    .k:focus-visible { outline: 2px solid #f50537; outline-offset: -2px; }
  `,
  html: `
    <div class="stage">
      ${roll('l', 'Driver temperature')}
      <div class="mid">${key('AUTO', true)}${key('A/C', true)}${key('SYNC', false)}</div>
      ${roll('r', 'Passenger temperature')}
    </div>`,
  init(root) {
    const rolls = [...root.querySelectorAll('.roll')], keys = [...root.querySelectorAll('.k')];
    const temps = [22, 22], tm = [0, 0];
    const fmt = (v) => (v <= 16 ? 'LO' : v >= 28 ? 'HI' : v.toFixed(1));
    const paint = (i) => {
      const r = rolls[i], v = temps[i];
      r.querySelector('.p').textContent = v >= 28 ? '' : fmt(v + .5);
      r.querySelector('.c').textContent = fmt(v);
      r.querySelector('.n').textContent = v <= 16 ? '' : fmt(v - .5);
      r.setAttribute('aria-valuenow', v);
      r.classList.add('bump'); clearTimeout(tm[i]); tm[i] = setTimeout(() => r.classList.remove('bump'), 150);
    };
    const sync = () => keys[2].getAttribute('aria-pressed') === 'true';
    const change = (i, d) => {
      temps[i] = Math.max(16, Math.min(28, temps[i] + d)); paint(i);
      if (sync()) { if (i === 0) { temps[1] = temps[0]; paint(1); } else keys[2].setAttribute('aria-pressed', 'false'); }
    };
    rolls.forEach((r, i) => {
      let y = 0, acc = 0, on = false;
      r.addEventListener('pointerdown', (e) => { on = true; y = e.clientY; acc = 0; r.setPointerCapture(e.pointerId); });
      r.addEventListener('pointermove', (e) => { if (!on) return; acc += y - e.clientY; y = e.clientY; while (acc > 14) { acc -= 14; change(i, .5); } while (acc < -14) { acc += 14; change(i, -.5); } });
      r.addEventListener('pointerup', () => { on = false; });
      r.addEventListener('keydown', (e) => { const d = e.key === 'ArrowUp' ? .5 : e.key === 'ArrowDown' ? -.5 : 0; if (d) { e.preventDefault(); change(i, d); } });
      paint(i);
    });
    keys.forEach((k, i) => k.addEventListener('click', () => {
      const on = k.getAttribute('aria-pressed') !== 'true';
      k.setAttribute('aria-pressed', String(on));
      k.classList.remove('hap'); void k.offsetWidth; k.classList.add('hap');
      if (i === 2 && on) { temps[1] = temps[0]; paint(1); }
    }));
    return () => tm.forEach(clearTimeout);
  },
};
