export default {
  id: 'bt-material-buttons',
  credit: 'Google Material 3 — filled, tonal and outlined buttons with ripple',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
    .m3 {
      position: relative; overflow: hidden; isolation: isolate;
      height: 40px; padding: 0 24px; border: 0; border-radius: 20px;
      font: 500 14px/40px Roboto, system-ui, sans-serif; letter-spacing: .1px;
      cursor: pointer; -webkit-tap-highlight-color: transparent;
      transition: box-shadow .2s;
    }
    .m3::before {
      content: ''; position: absolute; inset: 0; border-radius: inherit;
      background: currentColor; opacity: 0; transition: opacity .15s;
    }
    .m3:hover::before { opacity: .08; }
    .m3:focus-visible::before, .m3:active::before { opacity: .12; }
    .m3:focus-visible { outline: 3px solid #6750a4; outline-offset: 2px; }
    .filled { background: #6750a4; color: #fff; }
    .filled:hover { box-shadow: 0 1px 3px 1px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.3); }
    .tonal { background: #e8def8; color: #1d192b; }
    .tonal:hover { box-shadow: 0 1px 3px 1px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.3); }
    .outlined { background: transparent; color: #6750a4; border: 1px solid #79747e; line-height: 38px; }
    .ripple {
      position: absolute; border-radius: 50%; background: currentColor; opacity: .18;
      transform: scale(0); pointer-events: none; animation: rip .5s ease-out forwards;
    }
    @keyframes rip { to { transform: scale(1); opacity: 0; } }
  `,
  html: `
    <div class="row">
      <button class="m3 filled" type="button">Filled</button>
      <button class="m3 tonal" type="button">Tonal</button>
      <button class="m3 outlined" type="button">Outlined</button>
    </div>`,
  init(root) {
    root.querySelectorAll('.m3').forEach((b) => {
      b.addEventListener('pointerdown', (e) => {
        const r = b.getBoundingClientRect();
        const d = Math.max(r.width, r.height) * 2;
        const s = document.createElement('span');
        s.className = 'ripple';
        s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
        b.appendChild(s);
        s.addEventListener('animationend', () => s.remove());
      });
    });
  },
};
