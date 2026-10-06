export default {
  id: 'cr-flip-text',
  credit: 'Per-letter 3D flip label — staggered rotateX letter cubes (Codrops hover effects)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      cursor: pointer; background: #18181b; color: #fff; border: 0; border-radius: 10px; padding: 16px 28px;
      font: 700 18px/1 system-ui, sans-serif; letter-spacing: .04em; perspective: 400px;
      transition: background .2s;
    }
    .btn:hover { background: #27272a; }
    .btn:active { transform: scale(.98); }
    .btn:focus-visible { outline: 2px solid #a3e635; outline-offset: 3px; }
    .w { display: inline-flex; }
    .ch { position: relative; display: inline-block; height: 1em; width: .62em; transform-style: preserve-3d;
      transition: transform .5s cubic-bezier(.34, 1.3, .64, 1); transition-delay: calc(var(--i) * 45ms); }
    .ch.sp { width: .35em; }
    .f, .k { position: absolute; inset: 0; display: grid; place-items: center; backface-visibility: hidden; }
    .f { transform: translateZ(.5em); }
    .k { color: #a3e635; transform: rotateX(90deg) translateZ(.5em); }
    .btn:hover .ch, .btn:focus-visible .ch { transform: rotateX(-90deg); }
  `,
  html: `<button class="btn" type="button" aria-label="Flip it"><span class="w" data-label="Flip it" aria-hidden="true"></span></button>`,
  init(root) {
    const w = root.querySelector('.w');
    const label = w.dataset.label;
    let i = 0;
    for (const c of label) {
      const ch = document.createElement('span');
      ch.className = 'ch' + (c === ' ' ? ' sp' : '');
      ch.style.setProperty('--i', String(i++));
      const f = document.createElement('span'); f.className = 'f'; f.textContent = c;
      const k = document.createElement('span'); k.className = 'k'; k.textContent = c;
      ch.append(f, k);
      w.appendChild(ch);
    }
  },
};
