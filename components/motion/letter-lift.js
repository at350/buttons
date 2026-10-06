const SPRING = 'linear(0, 0.143, 0.453, 0.779, 1.028, 1.168, 1.205, 1.173, 1.109, 1.043, 0.992, 0.965, 0.958, 0.965, 0.978, 0.992, 1.002, 1.007, 1.009, 1.007, 1.004, 1.002, 1)';

export default {
  id: 'mo-letter-lift',
  credit: 'Staggered letter lift — each glyph hops up with a spring in sequence, the duplicate row underneath rolls into place (Codrops / Awwwards nav hover)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .btn {
      position: relative; display: inline-block; height: 48px; padding: 0 26px; border: 1.5px solid #111; border-radius: 999px; background: #fff; color: #111; cursor: pointer;
      font: 600 15px/48px 'Space Grotesk', Inter, system-ui, sans-serif; letter-spacing: .01em; overflow: hidden;
      transition: background .35s cubic-bezier(.3, .7, .3, 1), color .35s, transform .2s ${SPRING};
    }
    .btn:hover { background: #111; color: #fff; }
    .btn:active { transform: scale(.96); }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 3px; }
    .row { display: block; height: 48px; position: relative; }
    .row i { display: inline-block; font-style: normal; white-space: pre; transition: transform .5s ${SPRING}, opacity .25s; transition-delay: calc(var(--i) * 28ms); will-change: transform; }
    .row.b { position: absolute; left: 0; top: 0; width: 100%; text-align: center; }
    .row.b i { transform: translateY(110%); opacity: 0; }
    .btn:hover .row.a i, .btn.lift .row.a i { transform: translateY(-110%); opacity: 0; }
    .btn:hover .row.b i, .btn.lift .row.b i { transform: none; opacity: 1; }
    .btn.lift { background: #111; color: #fff; }
    .row.b i { color: #fff; }
  `,
  html: `<button class="btn" type="button" aria-pressed="false"><span class="row a"></span><span class="row b" aria-hidden="true"></span></button>`,
  init(root) {
    const btn = root.querySelector('.btn'), text = 'Explore work';
    const fill = (el) => { el.innerHTML = [...text].map((c, i) => `<i style="--i:${i}">${c === ' ' ? ' ' : c}</i>`).join(''); };
    fill(root.querySelector('.row.a')); fill(root.querySelector('.row.b'));
    // keyboard users get the same lift: focus-visible mirrors hover, click latches it
    btn.addEventListener('focus', () => btn.matches(':focus-visible') && btn.classList.add('lift'));
    // blur only drops the focus lift; a latched (aria-pressed) lift survives
    btn.addEventListener('blur', () => { if (btn.getAttribute('aria-pressed') !== 'true') btn.classList.remove('lift'); });
    btn.addEventListener('click', () => {
      const on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on)); btn.classList.toggle('lift', on);
    });
  },
};
