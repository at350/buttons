export default {
  id: 'bt-material-fab',
  credit: 'Google Material 3 — tertiary FAB (56dp, 16dp corners, level-3 elevation) with ripple',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .fab {
      position: relative; overflow: hidden; isolation: isolate;
      width: 56px; height: 56px; border: 0; border-radius: 16px;
      background: #ffd8e4; color: #31111d; cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center;
      box-shadow: 0 1px 3px rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15);
      transition: box-shadow 280ms cubic-bezier(.2,0,0,1);
      -webkit-tap-highlight-color: transparent;
    }
    .fab::before { content: ''; position: absolute; inset: 0; background: #31111d; opacity: 0; transition: opacity .15s; }
    .fab:hover { box-shadow: 0 2px 3px rgba(0,0,0,.3), 0 6px 10px 4px rgba(0,0,0,.15); }
    .fab:active { box-shadow: 0 1px 3px rgba(0,0,0,.3), 0 4px 8px 3px rgba(0,0,0,.15); }
    .fab:hover::before { opacity: .08; }
    .fab:focus-visible::before { opacity: .1; }
    .fab:focus-visible { outline: 3px solid #625b71; outline-offset: 2px; }
    .fab svg { width: 24px; height: 24px; position: relative; transition: transform .3s cubic-bezier(.2,0,0,1); }
    .fab[aria-pressed="true"] svg { transform: rotate(135deg); }
    .rp { position: absolute; border-radius: 50%; background: #31111d; opacity: .1; pointer-events: none; transform: scale(.2); transition: transform 450ms cubic-bezier(.2,0,0,1); }
    .rp.grow { transform: scale(1); }
    .rp.out { opacity: 0; transition: transform 450ms cubic-bezier(.2,0,0,1), opacity 375ms linear; }
  `,
  html: `
    <button class="fab" type="button" aria-label="Add" aria-pressed="false">
      <svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
    </button>`,
  init(root) {
    const b = root.querySelector('.fab');
    let cur = null;
    const release = () => { const r = cur; cur = null; if (!r) return; r.classList.add('out'); setTimeout(() => r.remove(), 450); };
    b.addEventListener('pointerdown', (e) => {
      release();
      const rect = b.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const d = 2 * Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));
      const r = document.createElement('span');
      r.className = 'rp';
      r.style.cssText = `width:${d}px;height:${d}px;left:${x - d / 2}px;top:${y - d / 2}px`;
      b.insertBefore(r, b.firstChild); cur = r;
      requestAnimationFrame(() => r.classList.add('grow'));
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((t) => b.addEventListener(t, release));
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
    return release;
  },
};
