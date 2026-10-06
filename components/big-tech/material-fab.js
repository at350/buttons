export default {
  id: 'bt-material-fab',
  credit: 'Google Material 3 — floating action button (FAB) with ripple',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .fab {
      position: relative; overflow: hidden; isolation: isolate;
      width: 56px; height: 56px; border: 0; border-radius: 16px;
      background: #ffd8e4; color: #31111d; cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center;
      box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px rgba(0,0,0,.14), 0 1px 18px rgba(0,0,0,.12);
      transition: box-shadow .2s, background .2s;
      -webkit-tap-highlight-color: transparent;
    }
    .fab::before { content: ''; position: absolute; inset: 0; background: #31111d; opacity: 0; transition: opacity .15s; }
    .fab:hover { box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12); }
    .fab:hover::before { opacity: .08; }
    .fab:active::before { opacity: .12; }
    .fab:focus-visible { outline: 3px solid #6750a4; outline-offset: 2px; }
    .fab svg { width: 24px; height: 24px; position: relative; transition: transform .3s cubic-bezier(.2,0,0,1); }
    .fab[aria-pressed="true"] svg { transform: rotate(135deg); }
    .ripple {
      position: absolute; border-radius: 50%; background: #31111d; opacity: .16;
      transform: scale(0); pointer-events: none; animation: rip .55s ease-out forwards;
    }
    @keyframes rip { to { transform: scale(1); opacity: 0; } }
  `,
  html: `
    <button class="fab" type="button" aria-label="Add" aria-pressed="false">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/></svg>
    </button>`,
  init(root) {
    const b = root.querySelector('.fab');
    b.addEventListener('pointerdown', (e) => {
      const r = b.getBoundingClientRect();
      const d = Math.max(r.width, r.height) * 2;
      const s = document.createElement('span');
      s.className = 'ripple';
      s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
      b.appendChild(s);
      s.addEventListener('animationend', () => s.remove());
    });
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
