export default {
  id: 'lb-shadcn-skeleton',
  credit: 'shadcn/ui (new-york v4) — Skeleton card demo: animate-pulse bg-accent blocks (125px rounded-xl image, two h-4 lines) that resolve into the loaded content; click to reload',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .card { position: relative; display: flex; flex-direction: column; gap: 12px; width: 282px; max-width: 100%; padding: 16px; border: 1px solid #e5e5e5; border-radius: 14px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.05); font: 400 14px/20px Inter, -apple-system, system-ui, sans-serif; color: #0a0a0a; cursor: pointer; text-align: left; -webkit-tap-highlight-color: transparent; }
    .card:focus-visible { outline: 0; border-color: #a1a1a1; box-shadow: 0 0 0 3px rgba(161,161,161,.5); }
    .layer { display: flex; flex-direction: column; gap: 12px; transition: opacity .3s; }
    .lines { display: flex; flex-direction: column; gap: 8px; }
    .sk { border-radius: 8px; background: #f5f5f5; animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite; }
    @keyframes pulse { 50% { opacity: .5; } }
    .img { height: 125px; border-radius: 14px; }
    .ln { height: 16px; }
    .real { position: absolute; inset: 16px; opacity: 0; pointer-events: none; }
    .card.done .real { opacity: 1; }
    .card.done .ghost { opacity: 0; }
    .real .img { display: grid; place-items: center; background: #f5f5f5; color: #737373; }
    .real .img svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .real .t { height: 16px; font-weight: 500; line-height: 16px; }
    .real .s { height: 16px; color: #737373; line-height: 16px; }
  `,
  html: `
    <button class="card" type="button" aria-busy="true" aria-label="Reload">
      <span class="layer ghost"><span class="sk img"></span><span class="lines"><span class="sk ln" style="width:250px;max-width:100%"></span><span class="sk ln" style="width:200px"></span></span></span>
      <span class="layer real"><span class="img"><svg viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></span><span class="lines"><span class="t">shadcn</span><span class="s">m@example.com</span></span></span>
    </button>`,
  init(root) {
    const c = root.querySelector('.card');
    let t;
    const load = () => { c.classList.remove('done'); c.setAttribute('aria-busy', 'true'); clearTimeout(t); t = setTimeout(() => { c.classList.add('done'); c.setAttribute('aria-busy', 'false'); }, 1600); };
    c.addEventListener('click', load);
    load();
    return () => clearTimeout(t);
  },
};
