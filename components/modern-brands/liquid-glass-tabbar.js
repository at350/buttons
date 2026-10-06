export default {
  id: 'mb-liquid-glass-tabbar',
  credit: 'Apple iOS 26 Liquid Glass — tab bar whose glass lens stretches, glides and settles between tabs',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; padding: 28px 22px; border-radius: 12px; overflow: hidden;
      background: radial-gradient(120% 90% at 15% 10%, #ff9a62 0%, transparent 55%),
                  radial-gradient(90% 90% at 85% 15%, #7a5cff 0%, transparent 55%),
                  radial-gradient(100% 80% at 60% 110%, #27c2ff 0%, transparent 60%), #1b0f3a; }
    .bar { position: relative; display: flex; align-items: center; gap: 4px; padding: 6px; border-radius: 999px;
      background: rgba(255,255,255,.14); backdrop-filter: blur(18px) saturate(160%); -webkit-backdrop-filter: blur(18px) saturate(160%);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.55), inset 0 -1px 0 rgba(255,255,255,.12), 0 12px 30px rgba(0,0,0,.25); }
    .lens { position: absolute; top: 6px; left: 6px; width: 60px; height: 44px; border-radius: 999px; pointer-events: none;
      background: linear-gradient(160deg, rgba(255,255,255,.62), rgba(255,255,255,.18) 45%, rgba(255,255,255,.38));
      box-shadow: inset 0 1px 1px rgba(255,255,255,.95), inset 0 -2px 4px rgba(255,255,255,.3), 0 6px 16px rgba(0,0,0,.2);
      transition: transform .6s linear(0, 0.3 7%, 0.62 14%, 0.86 21%, 1.03 30%, 1.07 38%, 1.03 50%, 0.99 64%, 1.005 80%, 1),
                  width .32s cubic-bezier(.2,.8,.2,1), margin-left .32s cubic-bezier(.2,.8,.2,1); }
    .bar.stretch .lens { width: 78px; margin-left: -9px; }
    .tab { position: relative; z-index: 1; width: 60px; height: 44px; border: 0; border-radius: 999px; background: transparent;
      color: rgba(255,255,255,.72); cursor: pointer; display: grid; place-items: center; -webkit-tap-highlight-color: transparent;
      transition: color .25s; }
    .tab svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round;
      transition: transform .45s linear(0, 0.4 10%, 0.82 20%, 1.1 32%, 1.18 40%, 1.06 55%, 0.98 70%, 1); }
    .tab:hover { color: #fff; }
    .tab:active svg { transform: scale(.82); transition-duration: .1s; }
    .tab[aria-selected="true"] { color: #1b0f3a; }
    .tab[aria-selected="true"] svg { transform: scale(1.08); stroke-width: 2.2; }
    .tab:focus-visible { outline: 2px solid #fff; outline-offset: -4px; }
  `,
  html: `
    <div class="stage">
      <div class="bar" role="tablist">
        <span class="lens"></span>
        <button class="tab" type="button" role="tab" aria-selected="true" aria-label="Home"><svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5M5.5 10v10h13V10"/><path d="M10 20v-5h4v5"/></svg></button>
        <button class="tab" type="button" role="tab" aria-selected="false" aria-label="Search"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/></svg></button>
        <button class="tab" type="button" role="tab" aria-selected="false" aria-label="Library"><svg viewBox="0 0 24 24"><path d="M4 5h5v15H4zM10 5h5v15h-5zM16.5 5.5l3.5 1-3 13.5-3.5-1z"/></svg></button>
        <button class="tab" type="button" role="tab" aria-selected="false" aria-label="Profile"><svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const bar = root.querySelector('.bar');
    const lens = root.querySelector('.lens');
    const tabs = [...root.querySelectorAll('.tab')];
    let t;
    const select = (i) => {
      tabs.forEach((b, j) => b.setAttribute('aria-selected', String(i === j)));
      lens.style.transform = `translateX(${i * 64}px)`;
      bar.classList.add('stretch');
      clearTimeout(t);
      t = setTimeout(() => bar.classList.remove('stretch'), 260);
    };
    tabs.forEach((b, i) => {
      b.addEventListener('click', () => select(i));
      b.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const n = (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
          tabs[n].focus(); select(n);
        }
      });
    });
    return () => clearTimeout(t);
  },
};
