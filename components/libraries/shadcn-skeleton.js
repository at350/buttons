export default {
  id: 'lb-shadcn-skeleton',
  credit: 'shadcn/ui — Skeleton (pulsing zinc-100 blocks) that resolves into the real card content; click to reload',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .card { position: relative; width: 300px; max-width: 100%; padding: 16px; border: 1px solid #e4e4e7; border-radius: 12px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.05); font: 14px/20px Inter, -apple-system, system-ui, sans-serif; color: #09090b; cursor: pointer; text-align: left; display: block; -webkit-tap-highlight-color: transparent; }
    .card:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #18181b; }
    .card:hover { border-color: #d4d4d8; }
    .hd { display: flex; align-items: center; gap: 12px; }
    .av { width: 40px; height: 40px; border-radius: 50%; flex: none; }
    .ln { height: 12px; border-radius: 4px; }
    .sk { background: #f4f4f5; animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite; }
    @keyframes pulse { 50% { opacity: .5; } }
    .lines { display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .img { height: 96px; border-radius: 8px; margin-top: 12px; }
    .real { position: absolute; inset: 16px; opacity: 0; transition: opacity .3s; pointer-events: none; }
    .card.done .real { opacity: 1; }
    .card.done .sk { opacity: 0; animation: none; transition: opacity .3s; }
    .real .av { background: linear-gradient(135deg, #a78bfa, #60a5fa); display: grid; place-items: center; color: #fff; font-weight: 600; font-size: 13px; }
    .real .name { font-weight: 500; }
    .real .sub { color: #71717a; font-size: 13px; }
    .real .img { background: linear-gradient(135deg, #fdf2f8, #e0e7ff 60%, #dbeafe); display: grid; place-items: center; color: #6366f1; }
    .real .img svg { width: 28px; height: 28px; stroke: currentColor; fill: none; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <button class="card" type="button" aria-pressed="false" aria-label="Load content">
      <div class="hd"><div class="av sk"></div><div class="lines"><div class="ln sk" style="width:60%"></div><div class="ln sk" style="width:85%"></div></div></div>
      <div class="img sk"></div>
      <div class="real">
        <div class="hd"><div class="av">JD</div><div class="lines"><div class="name">Jane Doe</div><div class="sub">Posted 2 hours ago</div></div></div>
        <div class="img"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></svg></div>
      </div>
    </button>`,
  init(root) {
    const c = root.querySelector('.card');
    let t;
    const load = () => { c.classList.remove('done'); c.setAttribute('aria-pressed', 'false'); clearTimeout(t); t = setTimeout(() => { c.classList.add('done'); c.setAttribute('aria-pressed', 'true'); }, 1400); };
    c.addEventListener('click', load);
    load();
    return () => clearTimeout(t);
  },
};
