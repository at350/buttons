const SPRING = 'linear(0, 0.144, 0.433, 0.717, 0.926, 1.046, 1.091, 1.09, 1.066, 1.038, 1.014, 1, 0.992, 0.991, 0.993, 0.995, 0.998, 1, 1.001)';

export default {
  id: 'mo-skeleton-reveal',
  credit: 'Skeleton → content — shimmering placeholders crossfade into real content with a staggered blur-to-sharp reveal (Vercel / Linear loading states)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .card { position: relative; width: 270px; max-width: 100%; height: 150px; border-radius: 16px; background: #fff; border: 1px solid #e5e5e0; padding: 16px; font-family: Inter, system-ui, sans-serif; overflow: hidden; }
    .layer { position: absolute; inset: 16px; display: grid; grid-template-columns: 44px 1fr; grid-template-rows: 44px auto; gap: 8px 12px; align-items: center; align-content: start; }
    .sk i { display: block; border-radius: 6px; background: linear-gradient(90deg, #efefeb 25%, #f8f8f5 50%, #efefeb 75%); background-size: 200% 100%; }
    .card.loading .sk i { animation: sh 1.2s linear infinite; }
    @keyframes sh { from { background-position: 150% 0; } to { background-position: -50% 0; } }
    .sk .a { width: 44px; height: 44px; border-radius: 50%; } .sk .b { height: 12px; width: 60%; } .sk .c { height: 10px; width: 85%; margin-top: 6px; }
    .sk .d { grid-column: 1 / -1; height: 10px; width: 100%; } .sk .e { grid-column: 1 / -1; height: 10px; width: 70%; }
    .sk { opacity: 1; transition: opacity .3s; }
    .card.ready .sk { opacity: 0; }
    .ct > * { opacity: 0; transform: translateY(6px); filter: blur(6px); transition: opacity .35s, transform .55s ${SPRING}, filter .35s; }
    .card.ready .ct > * { opacity: 1; transform: none; filter: none; }
    .card.ready .ct > :nth-child(1) { transition-delay: .05s; } .card.ready .ct > :nth-child(2) { transition-delay: .12s; } .card.ready .ct > :nth-child(3) { transition-delay: .2s; }
    .ct .av { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #fb7185, #f59e0b); }
    .ct b { display: block; font-size: 14px; font-weight: 600; color: #111; } .ct b small { display: block; font-size: 12px; font-weight: 500; color: #888; margin-top: 2px; }
    .ct p { grid-column: 1 / -1; margin: 0; font-size: 12.5px; line-height: 1.5; color: #555; }
    .btn { position: absolute; right: 12px; bottom: 12px; height: 30px; padding: 0 12px; border-radius: 8px; border: 1px solid #e2e2de; background: #fff; color: #111; font: 600 12px Inter, system-ui, sans-serif; cursor: pointer; transition: background .2s, transform .15s; }
    .btn:hover { background: #f5f5f3; } .btn:active { transform: scale(.95); }
    .btn:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
    .btn svg { width: 12px; height: 12px; vertical-align: -1px; margin-right: 5px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
    .card.loading .btn svg { animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `,
  html: `
    <div class="card loading">
      <div class="layer sk" aria-hidden="true"><i class="a"></i><span><i class="b"></i><i class="c"></i></span><i class="d"></i><i class="e"></i></div>
      <div class="layer ct"><span class="av"></span><b>Jordan Lee<small>Product designer · Berlin</small></b><p>Working on motion systems and the little details that make interfaces feel alive.</p></div>
      <button class="btn" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5"/></svg>Reload</button>
    </div>`,
  init(root) {
    const card = root.querySelector('.card');
    let t = 0;
    const load = () => { card.classList.remove('ready'); card.classList.add('loading'); clearTimeout(t); t = setTimeout(() => { card.classList.remove('loading'); card.classList.add('ready'); }, 1400); };
    root.querySelector('.btn').addEventListener('click', load);
    load();
    return () => clearTimeout(t);
  },
};
