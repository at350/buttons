// Google Nest Learning Thermostat face: stainless bezel, round display that is black when idle, orange while
// HEATING and blue while COOLING; a 300° ring of hairline ticks where the span between the room temperature
// and the target lights up, a small room-temperature figure riding the ring, and the big thin target number.
// Turn it by dragging around the ring (like the real outer ring) or with the arrow keys; 50–90 °F.
const N = 120, SWEEP = 300, R1 = 66, R2 = 58;
const ticks = () => {
  let s = '';
  for (let i = 0; i <= N; i++) {
    const a = (-SWEEP / 2 + (SWEEP * i) / N) * Math.PI / 180;
    s += '<line data-i="' + i + '" x1="' + (80 + R1 * Math.sin(a)).toFixed(2) + '" y1="' + (80 - R1 * Math.cos(a)).toFixed(2) + '" x2="' + (80 + R2 * Math.sin(a)).toFixed(2) + '" y2="' + (80 - R2 * Math.cos(a)).toFixed(2) + '"/>';
  }
  return s;
};
const AMBIENT = 68, LO = 50, HI = 90;

export default {
  id: 'in-circular-dial',
  credit: 'Google Nest Learning Thermostat — black / heating-orange / cooling-blue face, lit tick span to the target, drag around to turn',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .bezel {
      width: 176px; height: 176px; padding: 8px; border-radius: 50%;
      background: conic-gradient(from 200deg, #f4f4f4, #9ea0a3, #e9e9ea, #7d7f82, #f2f2f2, #a7a9ac, #f4f4f4);
      box-shadow: 0 6px 16px rgba(0,0,0,.25), inset 0 0 0 1px rgba(0,0,0,.15);
    }
    .d {
      position: relative; width: 160px; height: 160px; border-radius: 50%; overflow: hidden; cursor: grab; touch-action: none; user-select: none; outline: 0;
      background: #101010; box-shadow: inset 0 0 0 2px #000; color: #fff; font-family: "Roboto Flex", Roboto, system-ui, sans-serif;
    }
    .d::before { content: ''; position: absolute; inset: 0; border-radius: 50%; opacity: 0; transition: opacity .6s ease, background .6s ease; }
    .d.heat::before { opacity: 1; background: radial-gradient(circle at 50% 40%, #fb8a2e 0%, #ee5a1d 70%, #d9481a 100%); }
    .d.cool::before { opacity: 1; background: radial-gradient(circle at 50% 40%, #3d9cf0 0%, #1d6ed6 70%, #1556b5 100%); }
    .d.active { cursor: grabbing; }
    .d:focus-visible { box-shadow: inset 0 0 0 2px #000, 0 0 0 3px #fff, 0 0 0 5px #1a73e8; }
    svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    line { stroke: rgba(255,255,255,.28); stroke-width: 1.2; stroke-linecap: round; transition: stroke .15s; }
    line.on { stroke: #fff; stroke-width: 1.6; }
    line.tg { stroke: #fff; stroke-width: 3; }
    .mode { position: absolute; left: 0; right: 0; top: 44px; text-align: center; font: 600 9px/1 "Roboto Flex", Roboto, system-ui, sans-serif; letter-spacing: .14em; opacity: .9; height: 9px; }
    .n { position: absolute; left: 0; right: 0; top: 57px; text-align: center; font-size: 54px; line-height: 54px; font-weight: 250; font-variation-settings: "wdth" 90; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
    .amb { position: absolute; width: 20px; margin: -6px 0 0 -10px; text-align: center; font: 600 10px/12px "Roboto Flex", Roboto, system-ui, sans-serif; }
    .d:hover:not(.active) .n { opacity: .92; }
  `,
  html: `<div class="bezel"><div class="d" role="slider" tabindex="0" aria-valuemin="${LO}" aria-valuemax="${HI}" aria-valuenow="72" aria-label="Target temperature">
    <svg viewBox="0 0 160 160">${ticks()}</svg>
    <div class="mode"></div><div class="n">72</div><div class="amb">${AMBIENT}</div>
  </div></div>`,
  init(root) {
    const d = root.querySelector('.d'), n = root.querySelector('.n'), mode = root.querySelector('.mode'), amb = root.querySelector('.amb');
    const lines = [...root.querySelectorAll('line')];
    const idx = (t) => Math.round(((t - LO) / (HI - LO)) * N);
    let t = 72;
    const ia = idx(AMBIENT), a = (-SWEEP / 2 + (SWEEP * ia) / N) * Math.PI / 180, ra = 51;
    amb.style.left = (80 + ra * Math.sin(a)) + 'px'; amb.style.top = (80 - ra * Math.cos(a)) + 'px';
    const paint = () => {
      const it = idx(t), lo = Math.min(ia, it), hi = Math.max(ia, it);
      lines.forEach((l, i) => { l.classList.toggle('on', i >= lo && i <= hi); l.classList.toggle('tg', i === it); });
      d.classList.toggle('heat', t > AMBIENT); d.classList.toggle('cool', t < AMBIENT);
      mode.textContent = t > AMBIENT ? 'HEATING' : t < AMBIENT ? 'COOLING' : '';
      n.textContent = t; d.setAttribute('aria-valuenow', t);
      amb.style.visibility = t === AMBIENT ? 'hidden' : 'visible';
    };
    const set = (x) => { t = Math.max(LO, Math.min(HI, Math.round(x))); paint(); };
    let last = null;
    const angle = (e) => { const r = d.getBoundingClientRect(); return Math.atan2(e.clientX - (r.left + r.width / 2), -(e.clientY - (r.top + r.height / 2))) * 180 / Math.PI; };
    d.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      d.setPointerCapture(e.pointerId); d.classList.add('active'); e.preventDefault(); last = angle(e);
      let acc = t;
      const mv = (ev) => {
        const ang = angle(ev); let delta = ang - last; if (delta > 180) delta -= 360; if (delta < -180) delta += 360; last = ang;
        acc = Math.max(LO, Math.min(HI, acc + delta / (SWEEP / (HI - LO)))); set(acc);
      };
      const up = () => { d.classList.remove('active'); d.removeEventListener('pointermove', mv); d.removeEventListener('pointerup', up); d.removeEventListener('pointercancel', up); };
      d.addEventListener('pointermove', mv); d.addEventListener('pointerup', up); d.addEventListener('pointercancel', up);
    });
    d.addEventListener('keydown', (e) => {
      const k = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 }[e.key];
      if (k) { e.preventDefault(); set(t + k); }
    });
    paint();
  },
};
