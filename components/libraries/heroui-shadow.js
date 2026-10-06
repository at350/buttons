export default {
  id: 'lb-heroui-shadow',
  credit: 'HeroUI (NextUI) — Button variant="shadow" in primary / secondary / success: rounded-medium 12px, shadow-lg tinted /40, hover opacity .8, press scale .97 with the bg-current ripple (scale 0 → 2, opacity .35 → 0)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 16px; flex-wrap: wrap; padding: 4px 4px 16px; font: 400 14px/20px Inter, -apple-system, system-ui, sans-serif; }
    .hu { position: relative; z-index: 0; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 40px; min-width: 80px; padding: 0 16px; border-radius: 12px; border: 0; cursor: pointer; font: inherit; color: var(--fg); background: var(--c); white-space: nowrap; user-select: none; -webkit-font-smoothing: subpixel-antialiased;
      box-shadow: 0 10px 15px -3px color-mix(in srgb, var(--c) 40%, transparent), 0 4px 6px -4px color-mix(in srgb, var(--c) 40%, transparent);
      transition: transform .25s ease, background .25s ease, color .25s ease, opacity .25s ease; -webkit-tap-highlight-color: transparent; }
    .hu:hover { opacity: .8; }
    .hu:active { transform: scale(.97); }
    .hu:focus-visible { z-index: 10; outline: 2px solid #006fee; outline-offset: 2px; }
    .p { --c: #006fee; --fg: #fff; }
    .s { --c: #7828c8; --fg: #fff; }
    .g { --c: #17c964; --fg: #000; }
    .rp { position: absolute; z-index: 0; border-radius: 9999px; background: currentColor; opacity: .35; transform: scale(0); pointer-events: none; animation: rip var(--d, .5s) cubic-bezier(.4,0,.2,1) forwards; }
    @keyframes rip { to { transform: scale(2); opacity: 0; } }
  `,
  html: `
    <div class="row">
      <button class="hu p" type="button">Primary</button>
      <button class="hu s" type="button">Secondary</button>
      <button class="hu g" type="button">Success</button>
    </div>`,
  init(root) {
    const timers = new Set();
    root.querySelectorAll('.hu').forEach((b) => b.addEventListener('pointerdown', (e) => {
      const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height);
      const rp = document.createElement('span'); rp.className = 'rp';
      const d = Math.min(Math.max(0.01 * s, 0.2), s > 100 ? 0.75 : 0.5);
      rp.style.cssText = `left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px;width:${s}px;height:${s}px;--d:${d}s`;
      b.appendChild(rp);
      const k = setTimeout(() => { rp.remove(); timers.delete(k); }, d * 1000 + 50); timers.add(k);
    }));
    return () => timers.forEach(clearTimeout);
  },
};
