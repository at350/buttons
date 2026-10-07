export default {
  id: 'cr-pixel-dissolve',
  credit: 'Pixel dissolve hover — an 8-bit mosaic breaks up cell-by-cell in random order to reveal the button (pixel transition, Awwwards / Codrops)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      position: relative; overflow: hidden; cursor: pointer; border: 0; border-radius: 8px;
      width: 192px; height: 56px; background: #22c55e; color: #f0fdf4;
      font: 700 15px/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: .2em; text-transform: uppercase;
    }
    .grid { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(12, 1fr); grid-template-rows: repeat(4, 1fr); pointer-events: none; }
    .c { background: var(--c); opacity: 1; transform: scale(1); transition: opacity .25s ease, transform .25s ease; transition-delay: var(--d); }
    .btn:hover .c, .btn:focus-visible .c, .btn[aria-pressed="true"] .c { opacity: 0; transform: scale(.2); }
    .btn > .lbl { position: relative; z-index: 1; text-shadow: 0 1px 0 rgba(5, 46, 22, .55); transition: color .3s ease .25s, text-shadow .3s ease .25s; }
    .btn:hover > .lbl, .btn:focus-visible > .lbl, .btn[aria-pressed="true"] > .lbl { color: #052e16; text-shadow: none; }
    .btn:active { transform: scale(.98); }
    .btn:focus-visible { outline: 2px solid #15803d; outline-offset: 3px; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false"><span class="grid" aria-hidden="true"></span><span class="lbl">Reveal</span></button>`,
  init(root) {
    const b = root.querySelector('.btn'), g = root.querySelector('.grid');
    const shades = ['#14532d', '#166534', '#15803d', '#0f4a26', '#1b6e3a'];
    const order = Array.from({ length: 48 }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    for (let i = 0; i < 48; i++) {
      const c = document.createElement('span');
      c.className = 'c';
      c.style.setProperty('--c', shades[Math.floor(Math.random() * shades.length)]);
      c.style.setProperty('--d', (order[i] * 9) + 'ms');
      g.appendChild(c);
    }
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
