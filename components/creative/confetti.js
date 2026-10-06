export default {
  id: 'cr-confetti',
  credit: 'Confetti burst on click — DOM particles with CSS keyframes (canvas-confetti vibe, no canvas)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 280px; height: 150px; max-width: 100%; overflow: hidden; border-radius: 12px; background: #fff7ed; display: grid; place-items: center; }
    .btn {
      position: relative; z-index: 1; cursor: pointer; border: 0; border-radius: 12px; padding: 16px 30px;
      background: #f97316; color: #fff; font: 800 16px/1 system-ui, sans-serif; letter-spacing: .02em;
      box-shadow: 0 6px 0 #c2410c; transition: transform .1s, box-shadow .1s, background .2s;
    }
    .btn:hover { background: #fb923c; }
    .btn:active { transform: translateY(5px); box-shadow: 0 1px 0 #c2410c; }
    .btn.pop { animation: pop .4s cubic-bezier(.34, 1.56, .64, 1); }
    .btn:focus-visible { outline: 3px solid #c2410c; outline-offset: 3px; }
    .p {
      position: absolute; left: 50%; top: 50%; width: 8px; height: 12px; pointer-events: none;
      background: var(--c); border-radius: var(--br, 2px);
      animation: fly .9s cubic-bezier(.15, .7, .3, 1) forwards;
    }
    @keyframes fly {
      0% { transform: translate(-50%, -50%) rotate(0) scale(1); opacity: 1; }
      100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) rotate(var(--r)) scale(.6); opacity: 0; }
    }
    @keyframes pop { 0% { transform: scale(1); } 40% { transform: scale(1.12); } 100% { transform: scale(1); } }
  `,
  html: `<div class="stage"><button class="btn" type="button">Celebrate</button></div>`,
  init(root) {
    const stage = root.querySelector('.stage'), btn = root.querySelector('.btn');
    const colors = ['#f97316', '#22c55e', '#3b82f6', '#eab308', '#ec4899', '#a855f7'];
    btn.addEventListener('click', () => {
      btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop');
      for (let i = 0; i < 28; i++) {
        const p = document.createElement('span');
        p.className = 'p';
        const a = (Math.PI * 2 * i) / 28 + Math.random() * .3, v = 70 + Math.random() * 70;
        p.style.setProperty('--dx', (Math.cos(a) * v).toFixed(0) + 'px');
        p.style.setProperty('--dy', (Math.sin(a) * v * .8 + 40).toFixed(0) + 'px');
        p.style.setProperty('--r', (Math.random() * 720 - 360).toFixed(0) + 'deg');
        p.style.setProperty('--c', colors[i % colors.length]);
        if (i % 3 === 0) p.style.setProperty('--br', '50%');
        p.addEventListener('animationend', () => p.remove());
        setTimeout(() => p.remove(), 1200);
        stage.appendChild(p);
      }
    });
  },
};
