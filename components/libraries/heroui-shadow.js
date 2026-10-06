export default {
  id: 'lb-heroui-shadow',
  credit: 'HeroUI (NextUI) — Button variant="shadow" in primary / secondary / success: 12px radius, colored shadow-lg glow, press scales to .97 and ripples',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 16px; flex-wrap: wrap; padding: 8px 4px 16px; font: 400 14px/1 Inter, -apple-system, system-ui, sans-serif; }
    .hu { position: relative; overflow: hidden; height: 40px; min-width: 80px; padding: 0 16px; border-radius: 12px; border: 0; cursor: pointer; font: inherit; color: #fff; background: var(--c); box-shadow: 0 10px 15px -3px color-mix(in srgb, var(--c) 40%, transparent), 0 4px 6px -4px color-mix(in srgb, var(--c) 40%, transparent); transition: transform .15s cubic-bezier(.4,0,.2,1), opacity .15s, box-shadow .15s; -webkit-tap-highlight-color: transparent; white-space: nowrap; }
    .hu:hover { opacity: .9; }
    .hu:active { transform: scale(.97); }
    .hu:focus-visible { outline: 2px solid #006fee; outline-offset: 2px; }
    .hu[aria-pressed="true"] { background: #fff; color: var(--c); box-shadow: inset 0 0 0 2px var(--c), 0 10px 15px -3px color-mix(in srgb, var(--c) 30%, transparent); }
    .p { --c: #006fee; }
    .s { --c: #7828c8; }
    .g { --c: #17c964; }
    .g:not([aria-pressed="true"]) { color: #000; }
    .rp { position: absolute; border-radius: 50%; background: currentColor; opacity: .35; transform: translate(-50%, -50%) scale(0); animation: rip .5s ease-out forwards; pointer-events: none; }
    @keyframes rip { to { transform: translate(-50%, -50%) scale(4); opacity: 0; } }
  `,
  html: `
    <div class="row">
      <button class="hu p" type="button" aria-pressed="false">Primary</button>
      <button class="hu s" type="button" aria-pressed="false">Secondary</button>
      <button class="hu g" type="button" aria-pressed="false">Success</button>
    </div>`,
  init(root) {
    const timers = new Set();
    root.querySelectorAll('.hu').forEach((b) => b.addEventListener('click', (e) => {
      const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height);
      const rp = document.createElement('span');
      rp.className = 'rp';
      rp.style.cssText = `left:${(e.clientX || r.left + r.width / 2) - r.left}px;top:${(e.clientY || r.top + r.height / 2) - r.top}px;width:${s / 2}px;height:${s / 2}px`;
      b.appendChild(rp);
      const k = setTimeout(() => { rp.remove(); timers.delete(k); }, 500); timers.add(k);
      b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true');
    }));
    return () => timers.forEach(clearTimeout);
  },
};
