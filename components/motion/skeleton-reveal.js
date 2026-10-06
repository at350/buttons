// Vercel (Geist) skeleton → content. Skeleton CSS as Vercel ships it: linear-gradient(270deg, accents-1, accents-2,
// accents-2, accents-1) at background-size 400% 100%, `skeleton_loading 8s ease-in-out infinite` (200% → -200%).
// Content then blurs in the way Vercel/Linear lists do: opacity 0, blur(4px), y 4px → rest, 300ms, 50ms stagger.
export default {
  id: 'mo-skeleton-reveal',
  credit: 'Vercel dashboard loading — Geist skeleton shimmer (270° accents gradient, 400% size, 8s), then the project card blurs in row by row',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .card { position: relative; width: 300px; max-width: 100%; height: 150px; border-radius: 12px; background: #fff; border: 1px solid #eaeaea; box-shadow: 0 2px 4px rgba(0,0,0,.04); font-family: Inter, 'Geist', system-ui, sans-serif; overflow: hidden; }
    .layer { position: absolute; inset: 0; padding: 18px; display: flex; flex-direction: column; gap: 14px; }
    .hd { display: flex; align-items: center; gap: 12px; height: 32px; }
    .sk i { display: block; border-radius: 6px; background-image: linear-gradient(270deg, #fafafa, #eaeaea, #eaeaea, #fafafa); background-size: 400% 100%; animation: skeleton_loading 8s ease-in-out infinite paused; }
    .card.loading .sk i { animation-play-state: running; }
    @keyframes skeleton_loading { from { background-position: 200% 0; } to { background-position: -200% 0; } }
    .sk .lg { width: 32px; height: 32px; border-radius: 50%; } .sk .t { width: 96px; height: 14px; } .sk .u { width: 140px; height: 12px; margin-top: 6px; }
    .sk .l1 { width: 82%; height: 12px; } .sk .l2 { width: 56%; height: 12px; }
    .sk { transition: opacity .2s; } .card.ready .sk { opacity: 0; }
    .ct > * { opacity: 0; filter: blur(4px); transform: translateY(4px); transition: opacity .3s cubic-bezier(.215, .61, .355, 1), filter .3s cubic-bezier(.215, .61, .355, 1), transform .3s cubic-bezier(.215, .61, .355, 1); }
    .card.ready .ct > * { opacity: 1; filter: none; transform: none; transition-delay: calc(var(--i) * 50ms + 60ms); }
    .lg2 { display: block; width: 32px; height: 32px; border-radius: 50%; flex: none; box-shadow: 0 0 0 1px rgba(0,0,0,.08); }
    .nm { display: flex; flex-direction: column; } .nm b { font-size: 14px; font-weight: 600; color: #000; letter-spacing: -.01em; } .nm span { font-size: 13px; color: #666; }
    .cm { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #000; } .cm svg { width: 14px; height: 14px; flex: none; fill: none; stroke: #666; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .meta { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #666; } .meta b { font-weight: 500; color: #000; }
    .meta img { display: block; width: 18px; height: 18px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 0 1px rgba(0,0,0,.08); }
    .btn { position: absolute; right: 14px; bottom: 14px; height: 32px; padding: 0 10px; border-radius: 6px; border: 1px solid #eaeaea; background: #fff; color: #000; font: 500 13px Inter, system-ui, sans-serif; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: background .15s, border-color .15s; z-index: 2; }
    .btn:hover { background: #fafafa; border-color: #d4d4d4; } .btn:active { transform: scale(.97); }
    .btn:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #0070f3; }
    .btn svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .card.loading .btn svg { animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `,
  html: `
    <div class="card loading" aria-busy="true">
      <div class="layer sk" aria-hidden="true"><div class="hd"><i class="lg"></i><span><i class="t"></i><i class="u"></i></span></div><i class="l1"></i><i class="l2"></i></div>
      <div class="layer ct">
        <div class="hd" style="--i:0"><svg class="lg2" viewBox="0 0 180 180" aria-hidden="true"><clipPath id="nx"><circle cx="90" cy="90" r="90"/></clipPath><linearGradient id="nxa" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><linearGradient id="nxb" x1="121" y1="54" x2="120.8" y2="106.9" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><g clip-path="url(#nx)"><circle cx="90" cy="90" r="90" fill="#000"/><path d="M149.5 157.5 69.1 54H54v72h12.1V69.4l73.9 95.5a90 90 0 0 0 9.5-7.4Z" fill="url(#nxa)"/><rect x="115" y="54" width="12" height="72" fill="url(#nxb)"/></g></svg><span class="nm"><b>acme-web</b><span>acme-web.vercel.app</span></span></div>
        <div class="cm" style="--i:1"><svg viewBox="0 0 24 24" aria-hidden="true"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>feat: new checkout flow</div>
        <div class="meta" style="--i:2"><img src="assets/portraits/women-37.jpg" alt="" width="18" height="18"><span>2h ago on <b>main</b></span></div>
      </div>
      <button class="btn" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>Refresh</button>
    </div>`,
  init(root) {
    const card = root.querySelector('.card');
    let t = 0;
    const load = () => { card.classList.remove('ready'); card.classList.add('loading'); card.setAttribute('aria-busy', 'true'); clearTimeout(t); t = setTimeout(() => { card.classList.remove('loading'); card.classList.add('ready'); card.setAttribute('aria-busy', 'false'); }, 1600); };
    root.querySelector('.btn').addEventListener('click', load);
    load();
    return () => clearTimeout(t);
  },
};
