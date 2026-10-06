// Path (2011) "add moment" menu — the quarter-circle fan later cloned as AwesomeMenu. Icons: Lucide (ISC).
const L = (p) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const items = [
  ['Photo', '<path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/>'],
  ['People', '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>'],
  ['Place', '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>'],
  ['Music', '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>'],
  ['Thought', '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>'],
  ['Sleep', '<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>'],
];
const R = 158;
export default {
  id: 'mn-radial-menu',
  credit: 'Path app (2011) quarter-circle "+" menu — items spin out with overshoot, chosen one blows up (a.k.a. AwesomeMenu)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { position: relative; width: 240px; height: 240px; border-radius: 12px; background: #f4f1ec; overflow: hidden; }
    .c { position: absolute; left: 12px; bottom: 12px; z-index: 2; width: 50px; height: 50px; border-radius: 50%; border: 3px solid #fff; background: linear-gradient(#f0563f, #d8341f); color: #fff; cursor: pointer; display: grid; place-items: center; padding: 0; box-shadow: 0 2px 6px rgba(0,0,0,.35); }
    .c:active { background: linear-gradient(#d8341f, #c42c19); }
    .c:focus-visible { outline: 2px solid #d8341f; outline-offset: 2px; }
    .c svg { transition: transform .25s cubic-bezier(.4,0,.2,1); }
    .c[aria-expanded="true"] svg { transform: rotate(-45deg); }
    .s { position: absolute; left: 18px; bottom: 18px; z-index: 1; width: 38px; height: 38px; border-radius: 50%; border: 0; background: radial-gradient(circle at 50% 30%, #fff, #ecebe8); color: #5a5651; cursor: pointer; display: grid; place-items: center; padding: 0; box-shadow: 0 1px 3px rgba(0,0,0,.35), inset 0 0 0 1px rgba(0,0,0,.05); opacity: 0; pointer-events: none; transform: translate(0,0) rotate(-360deg) scale(.6); transition: transform .3s cubic-bezier(.6,-.28,.735,.045), opacity .1s .2s; }
    .s:hover { color: #d8341f; }
    .s:focus-visible { outline: 2px solid #d8341f; outline-offset: 2px; }
    .open .s { opacity: 1; pointer-events: auto; transform: translate(var(--x), var(--y)) rotate(0) scale(1); transition: transform .5s cubic-bezier(.34,1.56,.64,1) var(--d), opacity .05s var(--d); }
    .wrap .s.blow { transform: translate(var(--x), var(--y)) scale(2.2); opacity: 0; transition: transform .25s ease-out, opacity .25s ease-out; }
    .wrap .s.shrink { transform: translate(var(--x), var(--y)) scale(.01); opacity: 0; transition: transform .25s ease-out, opacity .25s ease-out; }
    .wrap.reset .s { transition: none; }
  `,
  html: `
    <div class="wrap" role="menu" aria-label="Add a moment">
      ${items.map(([n, p], i) => { const a = (Math.PI / 2) * (i / (items.length - 1)); return `<button class="s" type="button" role="menuitem" tabindex="-1" aria-label="${n}" style="--x:${(Math.sin(a) * R).toFixed(1)}px;--y:${(-Math.cos(a) * R).toFixed(1)}px;--d:${i * 36}ms">${L(p)}</button>`; }).join('')}
      <button class="c" type="button" aria-expanded="false" aria-haspopup="menu" aria-label="Add a moment"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
    </div>`,
  init(root, host) {
    const wrap = root.querySelector('.wrap'), c = root.querySelector('.c');
    const ss = [...root.querySelectorAll('.s')];
    let t = 0;
    const onDoc = (e) => { if (!host.contains(e.target)) set(false); };
    const set = (v) => {
      c.setAttribute('aria-expanded', String(v)); wrap.classList.toggle('open', v);
      ss.forEach((s) => (s.tabIndex = v ? 0 : -1));
      document[v ? 'addEventListener' : 'removeEventListener']('pointerdown', onDoc, true);
    };
    c.addEventListener('click', () => set(c.getAttribute('aria-expanded') !== 'true'));
    ss.forEach((s, i) => {
      s.addEventListener('click', () => {
        ss.forEach((x) => x.classList.add(x === s ? 'blow' : 'shrink'));
        clearTimeout(t);
        t = setTimeout(() => { wrap.classList.add('reset'); set(false); ss.forEach((x) => x.classList.remove('blow', 'shrink')); void wrap.offsetWidth; wrap.classList.remove('reset'); c.focus({ preventScroll: true }); }, 280);
      });
      s.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (d) { e.preventDefault(); ss[(i + d + ss.length) % ss.length].focus({ preventScroll: true }); }
      });
    });
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && wrap.classList.contains('open')) { set(false); c.focus({ preventScroll: true }); } });
    return () => { clearTimeout(t); set(false); };
  },
};
