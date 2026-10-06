export default {
  id: 'ty-kinetic-spin',
  credit: 'Kinetic headline — each letter does a staggered 3D rotateY turn while hovered, like type on a spinning sign (Codrops kinetic type)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    *, *::before, *::after { font-kerning: normal; text-rendering: optimizeLegibility; font-synthesis: none; -webkit-font-smoothing: antialiased; }
    .stage { background: #0b0b0f; border-radius: 12px; padding: 20px 26px; perspective: 500px; }
    .btn {
      cursor: pointer; background: transparent; color: #f8fafc; border: 0; padding: 4px 0;
      font: 900 40px/1 Unbounded, Syne, system-ui, sans-serif; letter-spacing: .02em; display: inline-flex;
      transform-style: preserve-3d;
    }
    .btn:focus-visible { outline: 2px solid #f8fafc; outline-offset: 6px; border-radius: 4px; }
    .ch { display: inline-block; transform-style: preserve-3d; backface-visibility: visible; animation: none; transition: color .3s; }
    .ch.sp { width: .3em; }
    .btn:hover .ch, .btn:focus-visible .ch, .btn.on .ch {
      animation: spin 1.6s cubic-bezier(.45, 0, .2, 1) infinite; animation-delay: calc(var(--i) * 90ms);
    }
    .btn:hover .ch, .btn.on .ch { color: #a3e635; }
    .btn.on .ch { animation-duration: 3.2s; }
    .btn:active .ch { animation-play-state: paused; }
    @keyframes spin { 0% { transform: rotateY(0); } 40% { transform: rotateY(180deg) translateZ(10px); } 70%, 100% { transform: rotateY(360deg); } }
    @media (prefers-reduced-motion: reduce) { .ch { animation: none !important; } }
  `,
  html: `<div class="stage"><button class="btn" type="button" aria-pressed="false" aria-label="Spin"><span class="w" data-label="SPIN" aria-hidden="true" style="display:contents"></span></button></div>`,
  init(root) {
    const btn = root.querySelector('.btn');
    const w = root.querySelector('.w');
    let i = 0;
    for (const c of w.dataset.label) {
      const ch = document.createElement('span');
      ch.className = 'ch' + (c === ' ' ? ' sp' : '');
      ch.style.setProperty('--i', String(i++));
      ch.textContent = c;
      w.appendChild(ch);
    }
    btn.addEventListener('click', () => {
      const on = btn.classList.toggle('on');
      btn.setAttribute('aria-pressed', String(on));
    });
  },
};
