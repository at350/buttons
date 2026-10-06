export default {
  id: 'mb-vercel-shiny',
  credit: 'Vercel / Geist (dark) — the ▲ "Deploy" primary button: Geist 12-bar spinner while the deployment status dot goes Building (amber) → Ready (green)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 22px 24px; border-radius: 12px; background: #0a0a0a; box-shadow: inset 0 0 0 1px #1f1f1f; display: flex; align-items: center; gap: 16px;
      font: 500 14px/1 Geist, Inter, -apple-system, system-ui, sans-serif; color: #ededed; -webkit-font-smoothing: antialiased; }
    .dp { height: 40px; padding: 0 14px; border-radius: 6px; border: 0; background: #ededed; color: #0a0a0a; cursor: pointer; font: inherit; display: grid; place-items: center; min-width: 112px;
      transition: background .15s ease, transform .15s ease; -webkit-tap-highlight-color: transparent; }
    .dp > span { grid-area: 1 / 1; display: inline-flex; align-items: center; gap: 8px; transition: opacity .15s; }
    .dp:hover { background: #cccccc; }
    .dp:active { transform: scale(.98); }
    .dp:focus-visible { outline: none; box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px #52a8ff; }
    .dp .tri { width: 14px; height: 14px; fill: currentColor; }
    .dp .b { opacity: 0; }
    .dp.busy { background: #1a1a1a; color: #8f8f8f; box-shadow: inset 0 0 0 1px #2e2e2e; cursor: not-allowed; }
    .dp.busy .a { opacity: 0; } .dp.busy .b { opacity: 1; }
    .spin { position: relative; width: 16px; height: 16px; }
    .spin i { position: absolute; left: 7.2px; top: 0; width: 1.6px; height: 4.4px; border-radius: 1px; background: #8f8f8f; transform-origin: .8px 8px; animation: fade 1.2s linear infinite; }
    .spin i:nth-child(1) { transform: rotate(0deg); animation-delay: -1.2s; } .spin i:nth-child(2) { transform: rotate(30deg); animation-delay: -1.1s; }
    .spin i:nth-child(3) { transform: rotate(60deg); animation-delay: -1s; } .spin i:nth-child(4) { transform: rotate(90deg); animation-delay: -.9s; }
    .spin i:nth-child(5) { transform: rotate(120deg); animation-delay: -.8s; } .spin i:nth-child(6) { transform: rotate(150deg); animation-delay: -.7s; }
    .spin i:nth-child(7) { transform: rotate(180deg); animation-delay: -.6s; } .spin i:nth-child(8) { transform: rotate(210deg); animation-delay: -.5s; }
    .spin i:nth-child(9) { transform: rotate(240deg); animation-delay: -.4s; } .spin i:nth-child(10) { transform: rotate(270deg); animation-delay: -.3s; }
    .spin i:nth-child(11) { transform: rotate(300deg); animation-delay: -.2s; } .spin i:nth-child(12) { transform: rotate(330deg); animation-delay: -.1s; }
    @keyframes fade { 0% { opacity: 1; } 100% { opacity: .15; } }
    .stat { display: grid; font-size: 14px; font-weight: 400; color: #a1a1a1; }
    .stat > span { grid-area: 1 / 1; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; transition: opacity .2s; }
    .stat i { width: 9px; height: 9px; border-radius: 50%; }
    .stat [data-s="idle"] i { background: #8f8f8f; }
    .stat [data-s="build"] i { background: #f5a623; animation: pulse 1s ease-in-out infinite; }
    .stat [data-s="ready"] i { background: #50e3c2; }
    .stat [data-s="ready"] { color: #ededed; }
    @keyframes pulse { 50% { opacity: .35; } }
    .stat > span:not(.on) { opacity: 0; }
  `,
  html: `
    <div class="stage">
      <button class="dp" type="button"><span class="a"><svg class="tri" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 1.608 12 20.784H0Z"/></svg>Deploy</span><span class="b"><span class="spin" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>Deploying</span></button>
      <span class="stat" aria-live="polite"><span class="on" data-s="idle"><i></i>Not deployed</span><span data-s="build"><i></i>Building</span><span data-s="ready"><i></i>Ready</span></span>
    </div>`,
  init(root) {
    const b = root.querySelector('.dp'), st = [...root.querySelectorAll('.stat > span')];
    const show = (s) => st.forEach((x) => x.classList.toggle('on', x.dataset.s === s));
    let t;
    b.addEventListener('click', () => {
      if (b.classList.contains('busy')) return;
      b.classList.add('busy'); b.setAttribute('aria-busy', 'true'); show('build');
      t = setTimeout(() => { b.classList.remove('busy'); b.removeAttribute('aria-busy'); show('ready'); }, 1800);
    });
    return () => clearTimeout(t);
  },
};
