export default {
  id: 'cr-heart-explode',
  credit: 'Like button that bursts into hearts — Twitter heart animation reimagined with DOM particles',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 140px; height: 140px; display: grid; place-items: center; }
    .btn { position: relative; width: 64px; height: 64px; border: 0; border-radius: 50%; background: #fff; cursor: pointer;
      box-shadow: 0 4px 14px rgba(0, 0, 0, .12); display: grid; place-items: center; transition: transform .15s, box-shadow .2s; }
    .btn:hover { transform: scale(1.08); box-shadow: 0 8px 22px rgba(0, 0, 0, .16); }
    .btn:active { transform: scale(.92); }
    .btn:focus-visible { outline: 2px solid #e0245e; outline-offset: 3px; }
    .h { width: 30px; height: 30px; fill: none; stroke: #777; stroke-width: 2; transition: fill .2s, stroke .2s; }
    .btn[aria-pressed="true"] .h { fill: #e0245e; stroke: #e0245e; animation: beat .5s cubic-bezier(.34, 1.56, .64, 1); }
    .ring { position: absolute; inset: 0; border-radius: 50%; border: 3px solid #e0245e; opacity: 0; pointer-events: none; }
    .btn[aria-pressed="true"] .ring { animation: ring .6s ease-out; }
    .p { position: absolute; left: 50%; top: 50%; width: 14px; height: 14px; pointer-events: none; fill: var(--c);
      animation: fly .8s cubic-bezier(.2, .7, .3, 1) forwards; }
    @keyframes beat { 0% { transform: scale(0); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
    @keyframes ring { 0% { transform: scale(.6); opacity: .9; } 100% { transform: scale(1.8); opacity: 0; } }
    @keyframes fly { 0% { transform: translate(-50%, -50%) scale(.4); opacity: 1; } 100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1); opacity: 0; } }
  `,
  html: `
    <div class="stage">
      <button class="btn" type="button" aria-pressed="false" aria-label="like">
        <span class="ring"></span>
        <svg class="h" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.5-9.3C1 7.8 3.6 4 7.3 4c2 0 3.5 1.1 4.7 2.6C13.2 5.1 14.7 4 16.7 4c3.7 0 6.3 3.8 4.8 7.7C19.5 16.4 12 21 12 21z"/></svg>
      </button>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), b = root.querySelector('.btn');
    const path = 'M12 21s-7.5-4.6-9.5-9.3C1 7.8 3.6 4 7.3 4c2 0 3.5 1.1 4.7 2.6C13.2 5.1 14.7 4 16.7 4c3.7 0 6.3 3.8 4.8 7.7C19.5 16.4 12 21 12 21z';
    const cols = ['#e0245e', '#f472b6', '#fb7185', '#f9a8d4', '#be123c'];
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on));
      if (!on) return;
      for (let i = 0; i < 10; i++) {
        const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('class', 'p');
        const a = (Math.PI * 2 * i) / 10 + Math.random() * .4, v = 44 + Math.random() * 20;
        s.style.setProperty('--dx', (Math.cos(a) * v).toFixed(0) + 'px');
        s.style.setProperty('--dy', (Math.sin(a) * v).toFixed(0) + 'px');
        s.style.setProperty('--c', cols[i % cols.length]);
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', path);
        s.appendChild(p); s.addEventListener('animationend', () => s.remove()); setTimeout(() => s.remove(), 1100);
        stage.appendChild(s);
      }
    });
  },
};
