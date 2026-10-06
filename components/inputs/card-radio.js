export default {
  id: 'in-card-radio',
  credit: 'Card-select radio group — three device cards, the chosen one gets a colored border and a check badge (Stripe / Tailwind UI)',
  size: 'wide',
  css: `
    :host { display: block; }
    .g { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; max-width: 360px; margin: 0 auto; }
    .c {
      position: relative; aspect-ratio: 1 / 1; border-radius: 14px; border: 2px solid #e4e4e7; background: #fff; cursor: pointer; padding: 0;
      display: grid; place-items: center; color: #71717a; transition: border-color .2s, background .2s, color .2s, transform .15s, box-shadow .2s;
      -webkit-tap-highlight-color: transparent;
    }
    .c:hover { border-color: #a1a1aa; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,.08); }
    .c:focus-visible { outline: 3px solid #4f46e5; outline-offset: 2px; }
    .c[aria-checked="true"] { border-color: #4f46e5; background: #eef2ff; color: #4f46e5; }
    .c svg.ic { width: 36%; height: 36%; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .badge {
      position: absolute; top: -8px; right: -8px; width: 22px; height: 22px; border-radius: 50%; background: #4f46e5; display: grid; place-items: center;
      transform: scale(0); transition: transform .25s cubic-bezier(.34,1.56,.64,1); box-shadow: 0 0 0 2px #fff;
    }
    .c[aria-checked="true"] .badge { transform: scale(1); }
    .badge svg { width: 12px; height: 12px; fill: none; stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `<div class="g" role="radiogroup" aria-label="Device">
    <button class="c" type="button" role="radio" aria-checked="false" aria-label="Phone">
      <svg class="ic" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/></svg>
      <span class="badge"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
    </button>
    <button class="c" type="button" role="radio" aria-checked="true" aria-label="Laptop">
      <svg class="ic" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M1 20h22"/></svg>
      <span class="badge"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
    </button>
    <button class="c" type="button" role="radio" aria-checked="false" aria-label="Desktop">
      <svg class="ic" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
      <span class="badge"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
    </button>
  </div>`,
  init(root) {
    const g = root.querySelector('.g'), cs = [...root.querySelectorAll('.c')];
    let idx = 1;
    const set = (i, focus) => {
      idx = (i + cs.length) % cs.length;
      cs.forEach((c, j) => c.setAttribute('aria-checked', j === idx));
      if (focus) cs[idx].focus({ preventScroll: true });
    };
    cs.forEach((c, i) => c.addEventListener('click', () => set(i)));
    g.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); set(idx + 1, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); set(idx - 1, true); }
    });
  },
};
