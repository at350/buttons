// Teenage Engineering OP-1: the brushed-aluminium top panel with its black OLED, the four colour-coded endless encoders
// (blue, green, white, orange — no pointer line, a knurled grey skirt under a flat coloured cap) and the light-grey
// transport keys with printed record / play / stop symbols. Each encoder drives the matching coloured bar on screen.
const ENC = [['b', '#2f6fe6', 62], ['g', '#2fb35a', 38], ['w', '#e9e9e4', 74], ['o', '#ff6a13', 50]];
export default {
  id: 'ob-op1-knob',
  credit: 'Teenage Engineering OP-1 — the four colour-coded encoders (drag, scroll or arrow keys to turn) driving their bars on the OLED, and the record / play / stop transport keys',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .body { display: grid; grid-template-columns: auto auto; gap: 12px 16px; padding: 14px 16px; border-radius: 10px;
      background: linear-gradient(180deg, #e3e3e0, #cfcfcb); box-shadow: inset 0 1px 0 #fff, 0 2px 0 #b2b2ae, 0 6px 14px rgba(0,0,0,.18); }
    .oled { width: 112px; height: 52px; border-radius: 4px; background: #000; box-shadow: inset 0 0 0 2px #2a2a2a; display: flex; align-items: flex-end; gap: 8px; padding: 8px 12px; }
    .bar { flex: 1; height: 100%; display: flex; align-items: flex-end; background: rgba(255,255,255,.06); border-radius: 1px; }
    .bar i { display: block; width: 100%; height: var(--v); background: var(--c); border-radius: 1px; transition: height .08s; }
    .encs { display: flex; align-items: center; gap: 10px; }
    .enc { position: relative; width: 36px; height: 36px; border-radius: 50%; border: 0; padding: 0; cursor: grab; touch-action: none;
      background: repeating-conic-gradient(#9a9a96 0 6deg, #c4c4c0 6deg 12deg); box-shadow: 0 2px 0 #8d8d89, 0 4px 6px rgba(0,0,0,.25); }
    .enc::before { content: ""; position: absolute; inset: 5px; border-radius: 50%; background: radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--c) 80%, #fff), var(--c) 70%); box-shadow: inset 0 -1px 2px rgba(0,0,0,.25), 0 0 0 1px rgba(0,0,0,.12); }
    .enc::after { content: ""; position: absolute; inset: 0; border-radius: 50%; background: repeating-conic-gradient(transparent 0 6deg, rgba(0,0,0,.08) 6deg 12deg); transform: rotate(var(--r, 0deg)); -webkit-mask: radial-gradient(circle, transparent 13px, #000 13.5px); mask: radial-gradient(circle, transparent 13px, #000 13.5px); }
    .enc:active { cursor: grabbing; }
    .enc:focus-visible { outline: 2px solid #1e5bff; outline-offset: 3px; }
    .keys { grid-column: 1 / -1; display: flex; gap: 6px; }
    .key { width: 40px; height: 34px; border-radius: 5px; border: 0; cursor: pointer; padding: 0; display: grid; place-items: center;
      background: linear-gradient(#f4f4f1, #dcdcd8); box-shadow: 0 3px 0 #a9a9a5, 0 5px 8px rgba(0,0,0,.2), inset 0 1px 0 #fff; transition: transform .06s, box-shadow .06s; }
    .key:active, .key.on { transform: translateY(2px); box-shadow: 0 1px 0 #a9a9a5, 0 2px 4px rgba(0,0,0,.2), inset 0 1px 0 #fff; }
    .key:focus-visible { outline: 2px solid #1e5bff; outline-offset: 3px; }
    .key svg { width: 14px; height: 14px; fill: #4a4a4a; }
    .key.rec svg { fill: #4a4a4a; }
    .key.rec.on svg { fill: #e8301c; }
  `,
  html: `
    <div class="body">
      <div class="oled" aria-hidden="true">${ENC.map(([k, c, v]) => `<span class="bar"><i class="v-${k}" style="--c:${c};--v:${v}%"></i></span>`).join('')}</div>
      <div class="encs">${ENC.map(([k, c, v]) => `<button class="enc" type="button" role="slider" data-k="${k}" style="--c:${c}" aria-label="${{ b: 'Blue', g: 'Green', w: 'White', o: 'Orange' }[k]} encoder" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${v}"></button>`).join('')}</div>
      <div class="keys">
        <button class="key rec" type="button" aria-pressed="false" aria-label="Record"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7"/></svg></button>
        <button class="key play" type="button" aria-pressed="false" aria-label="Play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg></button>
        <button class="key stop" type="button" aria-label="Stop"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const val = {}; ENC.forEach(([k, , v]) => { val[k] = v; });
    root.querySelectorAll('.enc').forEach((enc) => {
      const k = enc.dataset.k, bar = root.querySelector('.v-' + k); let drag = null;
      const set = (n) => { val[k] = Math.max(0, Math.min(100, Math.round(n))); bar.style.setProperty('--v', val[k] + '%'); enc.style.setProperty('--r', (val[k] * 3.6) + 'deg'); enc.setAttribute('aria-valuenow', String(val[k])); };
      enc.addEventListener('pointerdown', (e) => { drag = { y: e.clientY, v: val[k] }; enc.setPointerCapture(e.pointerId); e.preventDefault(); });
      enc.addEventListener('pointermove', (e) => { if (drag) set(drag.v + (drag.y - e.clientY) / 1.2); });
      const end = () => { drag = null; }; enc.addEventListener('pointerup', end); enc.addEventListener('pointercancel', end);
      enc.addEventListener('wheel', (e) => { e.preventDefault(); set(val[k] - Math.sign(e.deltaY) * 3); }, { passive: false });
      enc.addEventListener('keydown', (e) => { const d = { ArrowUp: 3, ArrowRight: 3, ArrowDown: -3, ArrowLeft: -3 }[e.key]; if (d) { e.preventDefault(); set(val[k] + d); } });
    });
    const rec = root.querySelector('.rec'), play = root.querySelector('.play'), stop = root.querySelector('.stop');
    const latch = (b, on) => { b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); };
    rec.addEventListener('click', () => latch(rec, !rec.classList.contains('on')));
    play.addEventListener('click', () => latch(play, !play.classList.contains('on')));
    stop.addEventListener('click', () => { latch(play, false); latch(rec, false); });
  },
};
