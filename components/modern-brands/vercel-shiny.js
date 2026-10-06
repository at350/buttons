export default {
  id: 'mb-vercel-shiny',
  credit: 'Vercel / Geist 2024 — "shiny" dark button with a sweeping rim highlight, then the three-dot Geist loader while deploying',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 22px 26px; border-radius: 12px; background: #000; }
    .sh { position: relative; height: 40px; padding: 0 18px; border-radius: 8px; border: 0; cursor: pointer; overflow: hidden; isolation: isolate;
      background: #0a0a0a; color: #ededed; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; letter-spacing: -.01em;
      display: inline-flex; align-items: center; gap: 8px; min-width: 132px; justify-content: center; -webkit-tap-highlight-color: transparent;
      box-shadow: inset 0 0 0 1px #2a2a2a, 0 1px 2px rgba(0,0,0,.6); transition: transform .15s cubic-bezier(.2,.8,.2,1), box-shadow .2s, color .2s; }
    .rim { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; z-index: -1; }
    .rim::before { content: ''; position: absolute; inset: -400px; background: conic-gradient(transparent 0 70%, #fff 82%, transparent 92%);
      animation: sweep 2.8s linear infinite; opacity: .9; }
    .rim::after { content: ''; position: absolute; inset: 1px; border-radius: 7px; background: #0a0a0a; }
    .sh::after { content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
      background: linear-gradient(110deg, transparent 35%, rgba(255,255,255,.08) 50%, transparent 65%); background-size: 250% 100%;
      animation: shine 2.8s linear infinite; }
    @keyframes sweep { to { transform: rotate(360deg); } }
    @keyframes shine { from { background-position: 120% 0; } to { background-position: -120% 0; } }
    .sh:hover { color: #fff; box-shadow: inset 0 0 0 1px #3a3a3a, 0 0 0 1px rgba(255,255,255,.04), 0 8px 24px rgba(255,255,255,.06); }
    .sh:active { transform: scale(.97); }
    .sh:focus-visible { outline: none; box-shadow: inset 0 0 0 1px #2a2a2a, 0 0 0 2px #000, 0 0 0 4px #0072f5; }
    .sh svg { width: 14px; height: 14px; fill: currentColor; }
    .dots { display: none; gap: 4px; }
    .dots i { width: 5px; height: 5px; border-radius: 50%; background: #a1a1a1; animation: dot 1s ease-in-out infinite; }
    .dots i:nth-child(2) { animation-delay: .15s; } .dots i:nth-child(3) { animation-delay: .3s; }
    @keyframes dot { 0%,80%,100% { opacity: .25; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-2px); } }
    .sh.busy .lbl, .sh.busy .tri { display: none; } .sh.busy .dots { display: inline-flex; }
    .sh.done { color: #fff; background: #0072f5; box-shadow: inset 0 0 0 1px #0072f5; }
    .sh.done .rim, .sh.done::after { animation: none; opacity: 0; }
    .sh .chk { display: none; } .sh.done .chk { display: block; } .sh.done .tri { display: none; }
  `,
  html: `
    <div class="stage">
      <button class="sh" type="button" aria-live="polite">
        <span class="rim"></span>
        <svg class="tri" viewBox="0 0 76 65"><path d="M37.5 0 75 65H0z"/></svg>
        <svg class="chk" viewBox="0 0 16 16" fill="none"><path d="M3 8.5 6.5 12 13 4.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span class="lbl">Deploy</span>
        <span class="dots" aria-label="Deploying"><i></i><i></i><i></i></span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.sh');
    const lbl = root.querySelector('.lbl');
    let t;
    b.addEventListener('click', () => {
      if (b.classList.contains('busy')) return;
      if (b.classList.contains('done')) { b.classList.remove('done'); lbl.textContent = 'Deploy'; return; }
      b.classList.add('busy');
      t = setTimeout(() => { b.classList.remove('busy'); b.classList.add('done'); lbl.textContent = 'Deployed'; }, 1500);
    });
    return () => clearTimeout(t);
  },
};
