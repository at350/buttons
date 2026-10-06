export default {
  id: 'cr-particle-trail',
  credit: 'Particle trail cursor stage — sparkles spawned along the pointer path (Awwwards cursor trails)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; height: 150px; max-width: 100%; overflow: hidden; border-radius: 12px; background: #020617; display: grid; place-items: center; cursor: none; }
    .btn {
      position: relative; z-index: 1; cursor: none; border: 1px solid rgba(255, 255, 255, .25); border-radius: 999px; padding: 14px 30px;
      background: rgba(255, 255, 255, .06); color: #fff; font: 600 15px/1 system-ui, sans-serif; letter-spacing: .06em;
      transition: background .2s, box-shadow .3s, transform .15s;
    }
    .btn:hover { background: rgba(255, 255, 255, .14); box-shadow: 0 0 30px rgba(168, 85, 247, .5); }
    .btn:active { transform: scale(.96); }
    .btn[aria-pressed="true"] { background: #a855f7; border-color: #a855f7; }
    .btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; cursor: auto; }
    .p { position: absolute; width: 6px; height: 6px; border-radius: 50%; pointer-events: none; background: var(--c);
      box-shadow: 0 0 8px var(--c); animation: fade .7s ease-out forwards; }
    .cur { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: #fff; pointer-events: none; opacity: 0; transform: translate(-50%, -50%); box-shadow: 0 0 12px #fff; }
    .stage:hover .cur { opacity: 1; }
    @keyframes fade { 0% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0); opacity: 0; } }
  `,
  html: `<div class="stage"><span class="cur"></span><button class="btn" type="button" aria-pressed="false">Sparkle</button></div>`,
  init(root) {
    const stage = root.querySelector('.stage'), cur = root.querySelector('.cur'), btn = root.querySelector('.btn');
    const cols = ['#a855f7', '#22d3ee', '#f472b6', '#facc15', '#fff'];
    let lx = 0, ly = 0;
    stage.addEventListener('mousemove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      cur.style.left = x + 'px'; cur.style.top = y + 'px';
      if (Math.hypot(x - lx, y - ly) < 7 || stage.childElementCount > 70) return;
      lx = x; ly = y;
      const p = document.createElement('span');
      p.className = 'p';
      p.style.left = x + 'px'; p.style.top = y + 'px';
      p.style.setProperty('--c', cols[Math.floor(Math.random() * cols.length)]);
      p.style.setProperty('--dx', (Math.random() * 40 - 20).toFixed(0) + 'px');
      p.style.setProperty('--dy', (Math.random() * 40 - 20).toFixed(0) + 'px');
      p.addEventListener('animationend', () => p.remove());
      setTimeout(() => p.remove(), 900);
      stage.appendChild(p);
    });
    btn.addEventListener('click', () => btn.setAttribute('aria-pressed', String(btn.getAttribute('aria-pressed') !== 'true')));
  },
};
