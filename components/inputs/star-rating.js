function star(cls) {
  return '<svg class="' + cls + '" viewBox="0 0 24 24"><path d="M12 2.5l2.95 6.3 6.85.85-5.05 4.75 1.3 6.8L12 17.9l-6.05 3.3 1.3-6.8L2.2 9.65l6.85-.85z"/></svg>';
}

export default {
  id: 'in-star-rating',
  credit: '5-star rating with hover preview and half-star precision — hover the left or right half of a star (Amazon / IMDb)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .r { display: inline-flex; gap: 2px; padding: 4px; cursor: pointer; outline: 0; border-radius: 8px; touch-action: none; }
    .r:focus-visible { box-shadow: 0 0 0 3px #f5b301; }
    .s { position: relative; width: 32px; height: 32px; }
    .s svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .bg { fill: #d9d9d9; }
    .fg { fill: #f5b301; clip-path: inset(0 100% 0 0); transition: clip-path .12s, transform .15s; }
    .s.half .fg { clip-path: inset(0 50% 0 0); }
    .s.full .fg { clip-path: inset(0 0 0 0); }
    .r:hover .s.full .fg, .r:hover .s.half .fg { transform: scale(1.12); }
    .r.hover .fg { fill: #ffc83d; }
  `,
  html: `<div class="r" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="5" aria-valuenow="3.5" aria-label="Rating">
    <span class="s">${star('bg')}${star('fg')}</span><span class="s">${star('bg')}${star('fg')}</span><span class="s">${star('bg')}${star('fg')}</span><span class="s">${star('bg')}${star('fg')}</span><span class="s">${star('bg')}${star('fg')}</span>
  </div>`,
  init(root) {
    const r = root.querySelector('.r'), stars = [...root.querySelectorAll('.s')];
    let v = 3.5;
    const paint = (x) => stars.forEach((s, i) => { s.classList.toggle('full', x >= i + 1); s.classList.toggle('half', x >= i + 0.5 && x < i + 1); });
    const fromEvent = (e) => {
      const i = stars.findIndex((s) => { const b = s.getBoundingClientRect(); return e.clientX < b.right; });
      if (i < 0) return 5;
      const b = stars[i].getBoundingClientRect();
      return i + (e.clientX - b.left < b.width / 2 ? 0.5 : 1);
    };
    r.addEventListener('pointermove', (e) => { r.classList.add('hover'); paint(fromEvent(e)); });
    r.addEventListener('pointerleave', () => { r.classList.remove('hover'); paint(v); });
    r.addEventListener('click', (e) => { const n = fromEvent(e); v = n === v ? 0 : n; r.setAttribute('aria-valuenow', v); paint(v); });
    r.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 0.5, ArrowUp: 0.5, ArrowLeft: -0.5, ArrowDown: -0.5 }[e.key];
      if (d) { e.preventDefault(); v = Math.max(0, Math.min(5, v + d)); r.setAttribute('aria-valuenow', v); paint(v); }
    });
    paint(v);
  },
};
