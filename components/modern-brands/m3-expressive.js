export default {
  id: 'mb-m3-expressive',
  credit: 'Google Material 3 Expressive (Pixel, 2025) — connected button group: the selected segment bounces from rounded-square into a wide pill while its neighbours squeeze',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 22px 26px; border-radius: 12px; background: #fef7ff; }
    .grp { display: flex; gap: 4px; }
    .m3 { position: relative; height: 48px; width: 56px; border: 0; border-radius: 12px; background: #e8def8; color: #4a4458; cursor: pointer; display: grid; place-items: center; -webkit-tap-highlight-color: transparent; overflow: hidden;
      transition: width .55s linear(0, 0.3 7%, 0.62 14%, 0.86 21%, 1.04 30%, 1.09 38%, 1.03 50%, 0.99 64%, 1.005 80%, 1),
                  border-radius .45s linear(0, 0.4 10%, 0.85 22%, 1.1 35%, 1.03 50%, 0.98 65%, 1),
                  background .25s, color .25s, transform .15s cubic-bezier(.2,.8,.2,1); }
    .m3:first-child { border-radius: 24px 12px 12px 24px; }
    .m3:last-child { border-radius: 12px 24px 24px 12px; }
    .m3:hover { background: #ddd0f0; }
    .m3:active { transform: scale(.94); border-radius: 8px; }
    .m3:focus-visible { outline: 3px solid #6750a4; outline-offset: 2px; }
    .m3[aria-checked="true"] { width: 108px; border-radius: 24px; background: #6750a4; color: #fff; }
    .m3[aria-checked="true"]:hover { background: #5b4595; }
    .m3.squish { width: 44px; }
    .m3 svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 2.1; stroke-linecap: round; stroke-linejoin: round;
      transition: transform .4s linear(0, 0.45 12%, 1.2 35%, 0.95 55%, 1.02 75%, 1); }
    .m3[aria-checked="true"] svg { transform: scale(1.1); }
    .m3::after { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(255,255,255,.35), transparent 60%); opacity: 0; transition: opacity .3s; pointer-events: none; }
    .m3:active::after { opacity: 1; transition: none; }
  `,
  html: `
    <div class="stage">
      <div class="grp" role="radiogroup" aria-label="Alignment">
        <button class="m3" type="button" role="radio" aria-checked="true" aria-label="Align left"><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h14"/></svg></button>
        <button class="m3" type="button" role="radio" aria-checked="false" aria-label="Align center"><svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M5 18h14"/></svg></button>
        <button class="m3" type="button" role="radio" aria-checked="false" aria-label="Align right"><svg viewBox="0 0 24 24"><path d="M4 6h16M10 12h10M6 18h14"/></svg></button>
        <button class="m3" type="button" role="radio" aria-checked="false" aria-label="Justify"><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const btns = [...root.querySelectorAll('.m3')];
    let t;
    const pick = (i) => {
      btns.forEach((b, j) => { b.setAttribute('aria-checked', String(i === j)); b.classList.toggle('squish', Math.abs(i - j) === 1); });
      clearTimeout(t); t = setTimeout(() => btns.forEach((b) => b.classList.remove('squish')), 320);
    };
    btns.forEach((b, i) => {
      b.addEventListener('click', () => pick(i));
      b.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const n = (i + (e.key === 'ArrowRight' ? 1 : btns.length - 1)) % btns.length; btns[n].focus(); pick(n); }
      });
    });
    return () => clearTimeout(t);
  },
};
