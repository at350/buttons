export default {
  id: 'mb-liquid-glass-tabbar',
  credit: 'Apple iOS 26 Liquid Glass — floating Music tab bar plus the detached search orb; the selection lens lifts into a clear refracting glass drop with a specular rim as it glides, then settles',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { --bg: radial-gradient(circle at 14% 34%, #ff5f6d 0 15%, transparent 15.5%), radial-gradient(circle at 44% 18%, #ffc371 0 11%, transparent 11.5%),
        radial-gradient(circle at 82% 30%, #4facfe 0 17%, transparent 17.5%), radial-gradient(circle at 30% 92%, #43e97b 0 14%, transparent 14.5%),
        radial-gradient(circle at 66% 88%, #a18cd1 0 19%, transparent 19.5%), radial-gradient(circle at 94% 96%, #ff8fb1 0 12%, transparent 12.5%),
        repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 1px, transparent 1px 22px), linear-gradient(135deg, #fbe7ec, #e4ecfb);
      position: relative; width: 356px; max-width: 100%; height: 132px; border-radius: 12px; overflow: hidden; background: var(--bg);
      font: 600 10px/1 -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
    .glass { position: absolute; bottom: 14px; height: 62px; border-radius: 31px; isolation: isolate;
      background: rgba(255,255,255,.42); backdrop-filter: blur(5px) saturate(190%) brightness(1.06); -webkit-backdrop-filter: blur(5px) saturate(190%) brightness(1.06);
      box-shadow: inset 0 0 0 .5px rgba(255,255,255,.6), inset 1.5px 1.5px 1px -1px rgba(255,255,255,.95), inset -1px -1px 1px -.5px rgba(255,255,255,.55), inset 0 0 14px rgba(255,255,255,.35), 0 10px 28px rgba(40,30,80,.16), 0 1px 3px rgba(40,30,80,.1); }
    .glass::after { content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px; pointer-events: none; z-index: 3;
      background: linear-gradient(135deg, rgba(255,255,255,.95), rgba(255,255,255,.1) 30%, rgba(255,255,255,0) 55%, rgba(255,255,255,.7) 100%);
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0); }
    .bar { left: 14px; width: 256px; padding: 4px; display: flex; }
    .orb { left: 280px; width: 62px; border: 0; padding: 0; cursor: pointer; color: rgba(0,0,0,.82); display: grid; place-items: center; -webkit-tap-highlight-color: transparent; transition: transform .45s cubic-bezier(.32,.72,0,1); }
    .orb:active { transform: scale(1.1); }
    .orb svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2.3; stroke-linecap: round; }
    .orb[aria-pressed="true"] { color: #fa2d48; }
    .lens { --i: 0; position: absolute; top: 4px; left: calc(4px + var(--i) * 62px); width: 62px; height: 54px; border-radius: 27px; overflow: hidden; z-index: 0; pointer-events: none;
      background: rgba(0,0,0,.07); box-shadow: inset 0 0 0 .5px rgba(255,255,255,.4);
      transition: left .55s linear(0, 0.22 6%, 0.6 15%, 0.88 25%, 1.03 35%, 1.06 43%, 1.03 55%, 0.995 72%, 1), transform .32s cubic-bezier(.32,.72,0,1), background .25s, box-shadow .25s; }
    .refr { position: absolute; width: 356px; height: 132px; top: -60px; left: calc(-18px - var(--i) * 62px); background: var(--bg); opacity: 0;
      transform: scale(1.22); transform-origin: calc(49px + var(--i) * 62px) 87px; filter: saturate(1.35) brightness(1.04);
      transition: left .55s linear(0, 0.22 6%, 0.6 15%, 0.88 25%, 1.03 35%, 1.06 43%, 1.03 55%, 0.995 72%, 1), transform-origin .55s linear(0, 0.22 6%, 0.6 15%, 0.88 25%, 1.03 35%, 1.06 43%, 1.03 55%, 0.995 72%, 1), opacity .25s; }
    .lens::after { content: ''; position: absolute; inset: 0; border-radius: inherit; opacity: 0; transition: opacity .25s;
      box-shadow: inset 2px 2px 1px -1px rgba(255,255,255,1), inset -2px -2px 1px -1px rgba(255,255,255,.7), inset 0 0 8px 1px rgba(255,255,255,.55), inset 0 -6px 10px -6px rgba(0,0,0,.12); }
    .bar.moving .lens { transform: scale(1.14, 1.2); background: transparent; box-shadow: 0 8px 20px rgba(40,30,80,.22); }
    .bar.moving .refr, .bar.moving .lens::after { opacity: 1; }
    .tab { position: relative; z-index: 1; width: 62px; height: 54px; border: 0; padding: 0; border-radius: 27px; background: transparent; color: rgba(0,0,0,.82); cursor: pointer;
      display: grid; place-items: center; align-content: center; gap: 3px; font: inherit; -webkit-tap-highlight-color: transparent; transition: color .2s; }
    .tab svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform .45s cubic-bezier(.32,.72,0,1); }
    .tab:active svg { transform: scale(.88); transition-duration: .12s; }
    .tab[aria-selected="true"] { color: #fa2d48; }
    .tab[aria-selected="true"] svg { stroke-width: 2.3; }
    .tab:focus-visible, .orb:focus-visible { outline: 2px solid #0a84ff; outline-offset: -3px; }
  `,
  html: `
    <div class="stage">
      <div class="glass bar" role="tablist" aria-label="Music">
        <span class="lens"><span class="refr"></span></span>
        <button class="tab" type="button" role="tab" aria-selected="true"><svg viewBox="0 0 24 24"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>Home</button>
        <button class="tab" type="button" role="tab" aria-selected="false"><svg viewBox="0 0 24 24"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>New</button>
        <button class="tab" type="button" role="tab" aria-selected="false"><svg viewBox="0 0 24 24"><path d="M16.247 7.761a6 6 0 0 1 0 8.478"/><path d="M19.075 4.933a10 10 0 0 1 0 14.134"/><path d="M4.925 19.067a10 10 0 0 1 0-14.134"/><path d="M7.753 16.239a6 6 0 0 1 0-8.478"/><circle cx="12" cy="12" r="2"/></svg>Radio</button>
        <button class="tab" type="button" role="tab" aria-selected="false"><svg viewBox="0 0 24 24"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>Library</button>
      </div>
      <button class="glass orb" type="button" aria-pressed="false" aria-label="Search"><svg viewBox="0 0 24 24"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></button>
    </div>`,
  init(root) {
    const bar = root.querySelector('.bar'), lens = root.querySelector('.lens'), orb = root.querySelector('.orb');
    const tabs = [...root.querySelectorAll('.tab')];
    let t;
    const select = (i) => {
      tabs.forEach((b, j) => b.setAttribute('aria-selected', String(i === j)));
      lens.style.setProperty('--i', i);
      bar.classList.add('moving');
      clearTimeout(t); t = setTimeout(() => bar.classList.remove('moving'), 480);
    };
    tabs.forEach((b, i) => {
      b.addEventListener('click', () => select(i));
      b.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault(); const n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length; tabs[n].focus(); select(n);
      });
    });
    orb.addEventListener('click', () => orb.setAttribute('aria-pressed', String(orb.getAttribute('aria-pressed') !== 'true')));
    return () => clearTimeout(t);
  },
};
