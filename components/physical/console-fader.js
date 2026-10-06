// SSL 4000-style long-throw channel fader: 100 mm slot, dB legend printed beside it (0 dB about
// three-quarters up), and a dark Penny & Giles-style cap with two sloped faces and a white index line.
const MARKS = [['+10', 0, 10], ['5', .11, 5], ['0', .26, 0], ['5', .39, -5], ['10', .51, -10], ['15', .6, -15], ['20', .68, -20], ['30', .79, -30], ['40', .87, -40], ['50', .93, -50], ['∞', 1, -80]];
const T = 14, L = 196; // top inset and usable throw in px
const SCALE = MARKS.map(([t, f]) => `<span style="top:${(T + f * L).toFixed(1)}px"${t === '0' ? ' class="u"' : ''}>${t}</span>`).join('');

export default {
  id: 'ph-console-fader',
  credit: 'SSL 4000-style channel fader — 100 mm throw, real dB legend, P&G-style cap; drag it or use arrow keys',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 12px 14px; border-radius: 12px; background: linear-gradient(#2f3136, #1d1f23); }
    .strip {
      position: relative; width: 82px; height: ${L + T * 2}px; border-radius: 3px;
      background: repeating-linear-gradient(90deg, rgba(255,255,255,.025) 0 1px, transparent 1px 3px), linear-gradient(90deg, #474b52, #575c64 50%, #474b52);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.14), inset 0 -1px 0 rgba(0,0,0,.45), 0 1px 2px rgba(0,0,0,.6);
    }
    .scale { position: absolute; left: 0; top: 0; width: 30px; height: 100%; font: 600 8px/1 Inter, Arial, sans-serif; color: #e6e7e9; }
    .scale span { position: absolute; right: 0; transform: translateY(-50%); padding-right: 7px; white-space: nowrap; }
    .scale span::after { content: ''; position: absolute; right: 0; top: 50%; width: 4px; height: 1px; background: #d9dadd; }
    .scale span.u { font-weight: 800; }
    .scale span.u::after { width: 5px; height: 1.5px; }
    .slot { position: absolute; left: 49px; top: ${T - 4}px; height: ${L + 8}px; width: 5px; border-radius: 2.5px; background: #050506; box-shadow: inset 0 1px 2px #000, 0 0 0 1px rgba(255,255,255,.06), 0 1px 0 rgba(255,255,255,.08); }
    .cap {
      position: absolute; left: 34px; top: ${T}px; width: 35px; height: 44px; margin-top: -22px; border-radius: 3px; cursor: grab; touch-action: none; outline: none;
      background:
        linear-gradient(180deg, #4a4c51 0%, #2c2d31 46%, #0f1012 50%, #1f2024 54%, #121315 100%);
      box-shadow:
        0 1px 0 rgba(0,0,0,.9), 0 4px 3px rgba(0,0,0,.55), 0 10px 10px -2px rgba(0,0,0,.45),
        inset 1px 0 0 rgba(255,255,255,.07), inset -1px 0 0 rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.22);
      transition: box-shadow .12s;
    }
    .cap::before { content: ''; position: absolute; left: 3px; right: 3px; top: 50%; height: 2px; margin-top: -1px; background: #f4f4f2; border-radius: 1px; box-shadow: 0 0 2px rgba(255,255,255,.25); }
    .cap::after { content: ''; position: absolute; left: 4px; right: 4px; top: 4px; height: 14px; border-radius: 2px; background: repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 3px); }
    .cap.drag { cursor: grabbing; box-shadow: 0 1px 0 rgba(0,0,0,.9), 0 3px 2px rgba(0,0,0,.6), 0 7px 8px -2px rgba(0,0,0,.45), inset 1px 0 0 rgba(255,255,255,.07), inset -1px 0 0 rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.22); }
    .cap:focus-visible { box-shadow: 0 0 0 2px #7cc4ff, 0 4px 3px rgba(0,0,0,.55); }
  `,
  html: `
    <div class="stage">
      <div class="strip">
        <div class="scale" aria-hidden="true">${SCALE}</div>
        <div class="slot"></div>
        <div class="cap" role="slider" tabindex="0" aria-label="Channel fader" aria-valuemin="0" aria-valuemax="100" aria-valuenow="74" aria-valuetext="0 dB"></div>
      </div>
    </div>`,
  init(root) {
    const cap = root.querySelector('.cap');
    let pos = 0.26, startY = 0, startPos = 0, dragging = false, raf = 0;
    const db = () => { // interpolate along the printed legend
      if (pos >= 0.995) return '-∞ dB';
      const i = MARKS.findIndex((m) => m[1] >= pos), [, fb, vb] = MARKS[Math.max(1, i)], [, fa, va] = MARKS[Math.max(1, i) - 1];
      const v = Math.round(va + (vb - va) * (pos - fa) / (fb - fa));
      return `${v > 0 ? '+' : ''}${v} dB`;
    };
    const render = () => { cap.style.top = `${(T + pos * L).toFixed(1)}px`; cap.setAttribute('aria-valuenow', Math.round((1 - pos) * 100)); cap.setAttribute('aria-valuetext', db()); };
    cap.addEventListener('pointerdown', (e) => { dragging = true; startY = e.clientY; startPos = pos; cap.setPointerCapture(e.pointerId); cap.classList.add('drag'); });
    cap.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      pos = Math.max(0, Math.min(1, startPos + (e.clientY - startY) / L));
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); });
    });
    const end = () => { dragging = false; cap.classList.remove('drag'); };
    cap.addEventListener('pointerup', end); cap.addEventListener('pointercancel', end);
    cap.addEventListener('keydown', (e) => {
      const s = e.key === 'ArrowUp' ? -0.02 : e.key === 'ArrowDown' ? 0.02 : e.key === 'PageUp' ? -0.1 : e.key === 'PageDown' ? 0.1 : 0;
      if (!s) return; e.preventDefault(); pos = Math.max(0, Math.min(1, pos + s)); render();
    });
    render();
    return () => { if (raf) cancelAnimationFrame(raf); };
  },
};
