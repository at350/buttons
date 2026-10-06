const P = [['Freshness', '#2fd4ff'], ['Warmth', '#ff6a2b'], ['Vitality', '#ffd23a'], ['Joy', '#ff3d9a'], ['Comfort', '#9a6bff'], ['Training', '#3dff9e']];

export default {
  id: 'au-mbux-energizing',
  credit: 'Mercedes-Benz MBUX Hyperscreen — ENERGIZING COMFORT program pills on black glass; the chosen program floods the ambient light strip with its colour',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; width: 320px; max-width: 100%; padding: 16px 14px 22px; border-radius: 12px; overflow: hidden; background: radial-gradient(120% 90% at 50% 120%, color-mix(in srgb, var(--c, #3a3a3a) 22%, #000), #000 60%), #000; color: #fff; font: 300 12px/1 Inter, 'Helvetica Neue', system-ui, sans-serif; transition: background .6s; }
    .hd { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px; letter-spacing: .14em; font-size: 10px; color: #b8bcc4; }
    .hd b { font-weight: 500; color: #fff; }
    .hd span { font-variant-numeric: tabular-nums; letter-spacing: .04em; min-width: 46px; text-align: right; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .p { position: relative; height: 38px; border: 0; border-radius: 19px; background: rgba(255,255,255,.07); box-shadow: inset 0 0 0 1px rgba(255,255,255,.12); color: #d9dce2; font: 400 12px/1 Inter, system-ui, sans-serif; letter-spacing: .02em; cursor: pointer; overflow: hidden; transition: background .3s, box-shadow .3s, color .3s, transform .12s; }
    .p::before { content: ''; position: absolute; inset: 0; border-radius: inherit; background: linear-gradient(100deg, transparent, color-mix(in srgb, var(--k) 70%, transparent), transparent); opacity: 0; transform: translateX(-60%); transition: opacity .3s, transform .6s cubic-bezier(.2,0,0,1); }
    .p span { position: relative; }
    .p:hover { background: rgba(255,255,255,.12); }
    .p:active { transform: scale(.96); }
    .p:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .p[aria-checked="true"] { color: #fff; background: color-mix(in srgb, var(--k) 30%, #0a0a0a); box-shadow: inset 0 0 0 1.5px var(--k), 0 0 18px color-mix(in srgb, var(--k) 55%, transparent); }
    .p[aria-checked="true"]::before { opacity: 1; transform: translateX(0); }
    .amb { position: absolute; left: 14px; right: 14px; bottom: 9px; height: 3px; border-radius: 2px; background: #222; overflow: hidden; }
    .amb i { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, var(--c, #444) 30%, #fff 50%, var(--c, #444) 70%, transparent); background-size: 200% 100%; opacity: 0; transition: opacity .5s; }
    .on .amb i { opacity: 1; animation: sweep 3s linear infinite; box-shadow: 0 0 10px var(--c); }
    @keyframes sweep { to { background-position: -200% 0; } }
  `,
  html: `
    <div class="stage">
      <div class="hd"><b>ENERGIZING COMFORT</b><span>10 min</span></div>
      <div class="grid" role="radiogroup" aria-label="ENERGIZING COMFORT">${P.map(([n, c]) => `<button class="p" type="button" role="radio" aria-checked="false" style="--k:${c}"><span>${n}</span></button>`).join('')}</div>
      <div class="amb"><i></i></div>
    </div>`,
  init(root) {
    const stage = root.querySelector('.stage'), ps = [...root.querySelectorAll('.p')];
    const time = root.querySelector('.hd span');
    const pick = (i, on) => {
      ps.forEach((o, j) => {
        o.setAttribute('aria-checked', String(on && i === j));
        o.tabIndex = i === j ? 0 : -1;
      });
      stage.classList.toggle('on', on);
      stage.style.setProperty('--c', on ? P[i][1] : '#3a3a3a');
      time.textContent = on ? '10:00' : '10 min';
    };
    ps.forEach((p, i) => {
      p.tabIndex = i ? -1 : 0;
      p.addEventListener('click', () => pick(i, p.getAttribute('aria-checked') !== 'true'));
      p.addEventListener('keydown', (e) => {
        const d = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 3, ArrowUp: -3 }[e.key];
        if (!d) return;
        e.preventDefault();
        const n = (i + d + ps.length) % ps.length;
        ps[n].focus();
        pick(n, true);
      });
    });
  },
};
