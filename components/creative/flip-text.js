export default {
  id: 'cr-flip-text',
  credit: 'Per-letter 3D flip label — staggered rotateX letter cubes (Codrops "Letter hover" effects)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      cursor: pointer; background: #18181b; color: #fafafa; border: 0; border-radius: 10px; padding: 16px 26px;
      font: 700 17px/1 'Space Grotesk', system-ui, sans-serif; letter-spacing: 0;
      transition: background .2s ease, transform .15s ease;
    }
    .btn:hover { background: #27272a; }
    .btn:active { transform: scale(.97); }
    .btn:focus-visible { outline: 2px solid #a3e635; outline-offset: 3px; }
    .w { display: inline-flex; perspective: 300px; white-space: pre; }
    .ch { position: relative; display: inline-block; transform-style: preserve-3d; transform-origin: 50% 50% -.6em;
      transition: transform .6s cubic-bezier(.65, 0, .35, 1); transition-delay: calc(var(--i) * 35ms); }
    .f, .k { display: block; height: 1.2em; line-height: 1.2em; backface-visibility: hidden; }
    .k { position: absolute; left: 0; top: 0; color: #a3e635; transform-origin: 50% 50% -.6em; transform: rotateX(90deg); }
    .btn:hover .ch, .btn:focus-visible .ch { transform: rotateX(-90deg); }
  `,
  html: `<button class="btn" type="button" aria-label="Get started"><span class="w" data-label="Get started" aria-hidden="true"></span></button>`,
  init(root) {
    const w = root.querySelector('.w');
    let i = 0;
    for (const c of w.dataset.label) {
      const ch = document.createElement('span');
      ch.className = 'ch';
      ch.style.setProperty('--i', String(i++));
      const t = c === ' ' ? ' ' : c;
      const f = document.createElement('span'); f.className = 'f'; f.textContent = t;
      const k = document.createElement('span'); k.className = 'k'; k.textContent = t;
      ch.append(f, k);
      w.appendChild(ch);
    }
  },
};
