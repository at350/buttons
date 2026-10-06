export default {
  id: 'mo-number-ticker',
  credit: 'Number ticker — every digit is a rolling column, staggered right to left (Family / Magic UI "NumberTicker")',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { display: inline-flex; align-items: center; gap: 14px; padding: 12px 14px 12px 18px; border-radius: 16px; background: #fff; border: 1px solid #e5e5e0; box-shadow: 0 1px 3px rgba(0,0,0,.06); font-family: Inter, system-ui, sans-serif; }
    .num { display: inline-flex; align-items: center; font-weight: 600; font-size: 34px; letter-spacing: -.03em; color: #111; font-variant-numeric: tabular-nums; line-height: 1; }
    .num .sym { margin-right: 2px; color: #999; font-weight: 500; }
    .digits { display: inline-flex; align-items: center; }
    .col { position: relative; display: block; height: 36px; width: .62em; overflow: hidden; mask-image: linear-gradient(transparent, #000 20%, #000 80%, transparent); -webkit-mask-image: linear-gradient(transparent, #000 20%, #000 80%, transparent); }
    .col i { position: absolute; left: 0; top: 0; display: flex; flex-direction: column; font-style: normal; transform: translateY(calc(var(--d, 0) * -36px)); transition: transform .9s cubic-bezier(.2, .9, .2, 1); transition-delay: calc(var(--k) * 60ms); }
    .col i span { height: 36px; display: grid; place-items: center; }
    .comma { width: .25em; height: 36px; display: grid; place-items: end center; padding-bottom: 4px; }
    .comma::after { content: ','; }
    .btn { height: 40px; width: 40px; border-radius: 12px; border: 0; background: #111; color: #fff; cursor: pointer; display: grid; place-items: center; transition: transform .2s cubic-bezier(.34, 1.56, .64, 1), background .2s; }
    .btn:hover { background: #2a2a2a; } .btn:active { transform: scale(.9) rotate(-20deg); }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .btn svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; transition: transform .6s cubic-bezier(.34, 1.56, .64, 1); }
    .btn.spin svg { transform: rotate(360deg); }
  `,
  html: `
    <div class="wrap">
      <div class="num" aria-live="polite"><span class="sym">$</span><span class="digits"></span></div>
      <button class="btn" type="button" aria-label="New value"><svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5"/></svg></button>
    </div>`,
  init(root) {
    const digits = root.querySelector('.digits'), btn = root.querySelector('.btn');
    const col = (k) => { const c = document.createElement('span'); c.className = 'col'; c.innerHTML = '<i style="--k:' + k + '">' + '0123456789'.split('').map((d) => '<span>' + d + '</span>').join('') + '</i>'; return c; };
    const cols = [];
    for (let i = 0; i < 5; i++) { if (i === 2) { const c = document.createElement('span'); c.className = 'comma'; digits.appendChild(c); } const c = col(4 - i); digits.appendChild(c); cols.push(c.firstChild); }
    const show = (n) => { const s = String(n).padStart(5, '0'); cols.forEach((c, i) => c.style.setProperty('--d', s[i])); };
    show(12840);
    let t = 0;
    btn.addEventListener('click', () => {
      show(10000 + Math.floor(Math.random() * 89999));
      btn.classList.add('spin'); clearTimeout(t); t = setTimeout(() => btn.classList.remove('spin'), 600);
    });
    return () => clearTimeout(t);
  },
};
