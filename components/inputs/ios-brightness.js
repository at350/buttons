// iOS Control Center brightness module: 1×2 tall module with a continuous-corner (~22pt) radius, dark translucent
// material over the blurred wallpaper, white level rising from the bottom, sun glyph in gray at its foot.
// Real iOS behaviours: the level follows the finger relatively (drag, not jump-to-tap), and pulling past either end
// rubber-bands the whole module (stretches from the opposite end) before it springs back on release.
const SUN = 'M338.5-338.5Q280-397 280-480t58.5-141.5Q397-680 480-680t141.5 58.5Q680-563 680-480t-58.5 141.5Q563-280 480-280t-141.5-58.5ZM70-450q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32Q57.25-510 70-510h100q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H70Zm720 0q-12.75 0-21.37-8.68-8.63-8.67-8.63-21.5 0-12.82 8.63-21.32 8.62-8.5 21.37-8.5h100q12.75 0 21.38 8.68 8.62 8.67 8.62 21.5 0 12.82-8.62 21.32-8.63 8.5-21.38 8.5H790ZM458.5-768.63Q450-777.25 450-790v-100q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v100q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63Zm0 720Q450-57.25 450-70v-100q0-12.75 8.68-21.38 8.67-8.62 21.5-8.62 12.82 0 21.32 8.62 8.5 8.63 8.5 21.38v100q0 12.75-8.68 21.37-8.67 8.63-21.5 8.63-12.82 0-21.32-8.63ZM240-678l-57-56q-9-9-8.63-21.6.37-12.61 8.53-21.5 8.89-8.9 21.5-8.9 12.6 0 21.6 9l56 57q8 9 8 21t-8 20.5q-8 8.5-20.5 8.5t-21.5-8Zm494 495-56-57q-8-9-8-21.38 0-12.37 8.5-20.62 8.5-9 20.5-9t21 9l57 56q9 9 8.63 21.6-.37 12.61-8.53 21.5-8.89 8.9-21.5 8.9-12.6 0-21.6-9Zm-56-495q-9-9-9-21t9-21l56-57q9-9 21.6-8.63 12.61.37 21.5 8.53 8.9 8.89 8.9 21.5 0 12.6-9 21.6l-57 56q-8 8-20.36 8-12.37 0-21.64-8ZM182.9-182.9q-8.9-8.89-8.9-21.5 0-12.6 9-21.6l57-56q8.8-9 20.9-9 12.1 0 20.71 9 9.39 9 9.39 21t-9 21l-56 57q-9 9-21.6 8.63-12.61-.37-21.5-8.53Z';

export default {
  id: 'in-ios-brightness',
  credit: 'Apple iOS Control Center brightness slider — tall frosted module, white level, sun glyph, rubber-bands past the ends',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage {
      position: relative; isolation: isolate; display: grid; place-items: center; width: 128px; height: 236px; border-radius: 12px; overflow: hidden; background: #3a3236;
    }
    .stage::before { content: ''; position: absolute; inset: -24px; z-index: -1; background: url(assets/tall/09.webp) center / cover; filter: blur(14px) brightness(.62) saturate(1.3); }
    .sl {
      position: relative; width: 72px; height: 160px; border-radius: 24px; overflow: hidden; cursor: pointer;
      background: rgba(40,40,46,.42); -webkit-backdrop-filter: blur(30px) saturate(1.8); backdrop-filter: blur(30px) saturate(1.8);
      box-shadow: inset 0 0 0 .5px rgba(255,255,255,.12); touch-action: none; user-select: none; outline: 0;
      transform: scale(var(--sx, 1), var(--sy, 1)); transform-origin: var(--o, 50% 100%);
      transition: transform .5s cubic-bezier(.32,.72,0,1);
    }
    .sl:hover { --sx: 1.02; --sy: 1.02; }
    .sl.active { transition: transform .08s linear; }
    .sl:focus-visible { box-shadow: 0 0 0 3px rgba(255,255,255,.9); }
    .fill { position: absolute; left: 0; right: 0; bottom: 0; height: var(--p, 60%); background: #fff; transition: height .2s cubic-bezier(.32,.72,0,1); }
    .sl.active .fill { transition: none; }
    .ic { position: absolute; left: 0; right: 0; bottom: 16px; display: grid; place-items: center; }
    .ic svg { width: 28px; height: 28px; fill: #7c7c80; transform: scale(var(--s, 1)); transition: transform .2s; }
  `,
  html: `<div class="stage">
    <div class="sl" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="60" aria-orientation="vertical" aria-label="Brightness" style="--p:60%">
      <div class="fill"></div>
      <span class="ic"><svg viewBox="0 -960 960 960"><path d="${SUN}"/></svg></span>
    </div>
  </div>`,
  init(root) {
    const sl = root.querySelector('.sl'), ic = root.querySelector('.ic svg');
    let v = 60, startY = 0, startV = 60;
    const paint = () => {
      sl.style.setProperty('--p', v + '%'); sl.setAttribute('aria-valuenow', Math.round(v));
      ic.style.setProperty('--s', (0.8 + v / 500).toFixed(3));
    };
    const band = (over) => {
      // rubber band: diminishing stretch, anchored at the opposite end
      const s = 1 + Math.min(0.09, Math.abs(over) / 900);
      sl.style.setProperty('--sy', over ? s : ''); sl.style.setProperty('--sx', over ? (1 / Math.sqrt(s)).toFixed(4) : '');
      sl.style.setProperty('--o', over > 0 ? '50% 100%' : '50% 0%');
    };
    sl.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      sl.setPointerCapture(e.pointerId); sl.classList.add('active'); e.preventDefault();
      startY = e.clientY; startV = v;
      const h = sl.getBoundingClientRect().height;
      const mv = (ev) => {
        const raw = startV + ((startY - ev.clientY) / h) * 100;
        v = Math.max(0, Math.min(100, raw)); paint();
        band(raw > 100 ? (raw - 100) * h / 100 : raw < 0 ? raw * h / 100 : 0);
      };
      const up = () => {
        sl.classList.remove('active'); band(0);
        sl.removeEventListener('pointermove', mv); sl.removeEventListener('pointerup', up); sl.removeEventListener('pointercancel', up);
      };
      sl.addEventListener('pointermove', mv); sl.addEventListener('pointerup', up); sl.addEventListener('pointercancel', up);
    });
    sl.addEventListener('keydown', (e) => {
      const d = { ArrowUp: 6.25, ArrowRight: 6.25, ArrowDown: -6.25, ArrowLeft: -6.25 }[e.key];
      if (d) { e.preventDefault(); v = Math.max(0, Math.min(100, v + d)); paint(); }
    });
    paint();
  },
};
