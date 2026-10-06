const WOBBLE = 'linear(0, 0.125, 0.424, 0.778, 1.088, 1.292, 1.371, 1.34, 1.237, 1.105, 0.985, 0.901, 0.864, 0.869, 0.904, 0.952, 0.999, 1.033, 1.049, 1.05, 1.039, 1.021, 1.003, 0.99, 0.982, 0.981, 0.985, 0.991, 0.998, 1.003, 1.006)';

export default {
  id: 'mo-spring-like',
  credit: 'Spring-loaded like — press squashes the heart flat, release lets a real spring curve (linear() easing) overshoot it back; the count rolls',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { padding: 13px 14px; }
    .btn {
      display: inline-flex; align-items: center; gap: 8px; height: 42px; padding: 0 16px 0 12px; border-radius: 999px; border: 1px solid #e5e5e0;
      background: #fff; color: #444; font: 600 14px Inter, system-ui, sans-serif; cursor: pointer; font-variant-numeric: tabular-nums;
      transition: background .3s, border-color .3s, color .3s, transform .6s ${WOBBLE};
    }
    .btn:hover { background: #fdf2f4; border-color: #fbcfe8; }
    .btn:active { transform: scale(1.1, .85); transition: transform .12s cubic-bezier(.4, 0, .6, 1); }
    .btn:focus-visible { outline: 2px solid #e11d48; outline-offset: 2px; }
    .btn[aria-pressed="true"] { color: #e11d48; border-color: #fda4af; background: #fff1f2; }
    .heart { width: 20px; height: 20px; fill: transparent; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transform-origin: center; transition: fill .25s, transform .7s ${WOBBLE}; }
    .btn:active .heart { transform: scale(.75); transition: transform .12s; }
    .btn[aria-pressed="true"] .heart { fill: #e11d48; stroke: #e11d48; transform: scale(1); }
    .btn.pop .heart { animation: pop .7s ${WOBBLE}; }
    @keyframes pop { 0% { transform: scale(.7); } 40% { transform: scale(1.25); } 100% { transform: scale(1); } }
    .cnt { display: inline-grid; height: 18px; width: 22px; overflow: hidden; text-align: left; }
    .cnt span { grid-area: 1 / 1; line-height: 18px; transition: transform .5s cubic-bezier(.34, 1.4, .64, 1), opacity .3s; }
    .cnt .n { transform: translateY(120%); opacity: 0; }
    .btn[aria-pressed="true"] .cnt .o { transform: translateY(-120%); opacity: 0; }
    .btn[aria-pressed="true"] .cnt .n { transform: none; opacity: 1; }
    .ring { position: absolute; inset: -4px; border-radius: inherit; border: 2px solid #e11d48; opacity: 0; pointer-events: none; }
    .btn { position: relative; }
    .btn.pop .ring { animation: ring .6s ease-out; }
    @keyframes ring { 0% { opacity: .7; transform: scale(.94); } 100% { opacity: 0; transform: scale(1.14, 1.3); } }
  `,
  html: `
    <div class="wrap"><button class="btn" type="button" aria-pressed="false" aria-label="Like, 48 likes">
      <span class="ring"></span>
      <svg class="heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
      <span class="cnt" aria-hidden="true"><span class="o">48</span><span class="n">49</span></span>
    </button></div>`,
  init(root) {
    const b = root.querySelector('.btn');
    let t = 0;
    b.addEventListener('click', () => {
      const on = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', 'Like, ' + (on ? 49 : 48) + ' likes');
      if (on) { b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); clearTimeout(t); t = setTimeout(() => b.classList.remove('pop'), 700); }
    });
    return () => clearTimeout(t);
  },
};
