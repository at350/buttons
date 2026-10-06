const WOBBLE = 'linear(0, 0.125, 0.424, 0.778, 1.088, 1.292, 1.371, 1.34, 1.237, 1.105, 0.985, 0.901, 0.864, 0.869, 0.904, 0.952, 0.999, 1.033, 1.049, 1.05, 1.039, 1.021, 1.003, 0.99, 0.982, 0.981, 0.985, 0.991, 0.998, 1.003, 1.006)';

export default {
  id: 'mo-rubber-input',
  credit: 'Rubber-band field — drag the grip sideways and the pill stretches against UIScrollView-style diminishing resistance, then snaps back on an underdamped spring',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { width: 300px; max-width: 100%; padding: 8px 30px; font-family: Inter, system-ui, sans-serif; }
    .field {
      display: flex; align-items: center; height: 46px; border-radius: 999px; background: #fff; border: 1.5px solid #e2e2de; padding: 0 6px 0 4px; gap: 6px;
      transform-origin: 100% 50%; transform: translateX(var(--tx, 0px)) scale(var(--sx, 1), var(--sy, 1));
      transition: transform .9s ${WOBBLE}, border-color .2s, box-shadow .2s; touch-action: none;
    }
    .field.drag { transition: border-color .2s; }
    .field:focus-within { border-color: #111; box-shadow: 0 0 0 4px rgba(0,0,0,.06); }
    .grip { width: 36px; height: 36px; border-radius: 50%; border: 0; background: #f1f1ee; color: #777; cursor: grab; display: grid; place-items: center; flex: none; transition: background .2s, color .2s; }
    .grip:hover { background: #e6e6e2; color: #111; } .grip:active { cursor: grabbing; }
    .grip:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .grip svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
    input { flex: 1; min-width: 0; height: 100%; border: 0; background: transparent; font: 500 14px Inter, system-ui, sans-serif; color: #111; outline: none; }
    input::placeholder { color: #aaa; }
    .go { height: 34px; padding: 0 14px; border-radius: 999px; border: 0; background: #111; color: #fff; font: 600 13px Inter, system-ui, sans-serif; cursor: pointer; transition: transform .2s cubic-bezier(.34, 1.56, .64, 1), background .2s; }
    .go:hover { background: #2a2a2a; } .go:active { transform: scale(.94); }
    .go:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
  `,
  html: `
    <div class="wrap">
      <div class="field">
        <button class="grip" type="button" aria-label="Drag to stretch"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg></button>
        <input type="text" placeholder="Search" aria-label="Search">
        <button class="go" type="button">Go</button>
      </div>
    </div>`,
  init(root) {
    const field = root.querySelector('.field'), grip = root.querySelector('.grip');
    let sx = 0;
    // stretch stays inside the 30px gutters the wrap reserves
    const band = (d) => Math.sign(d) * 28 * (1 - Math.exp(-Math.abs(d) / 60));
    grip.addEventListener('pointerdown', (e) => { grip.setPointerCapture(e.pointerId); sx = e.clientX; field.classList.add('drag'); });
    grip.addEventListener('pointermove', (e) => {
      if (!grip.hasPointerCapture(e.pointerId)) return;
      const d = band(e.clientX - sx);
      const W = field.offsetWidth || 240;
      if (d < 0) { field.style.setProperty('--tx', '0px'); field.style.setProperty('--sx', 1 - d / W); }
      else { field.style.setProperty('--tx', d * .3 + 'px'); field.style.setProperty('--sx', 1 - d / 400); }
      field.style.setProperty('--sy', 1 - Math.abs(d) / 260);
    });
    const end = () => { field.classList.remove('drag'); field.style.setProperty('--tx', '0px'); field.style.setProperty('--sx', 1); field.style.setProperty('--sy', 1); };
    grip.addEventListener('pointerup', end); grip.addEventListener('pointercancel', end);
  },
};
