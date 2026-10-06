export default {
  id: 'lb-aceternity-moving-border',
  credit: 'Aceternity UI — "Moving Border" button: a sky-blue radial blob rides the rounded outline (offset-path) around a slate-900 pill',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 36px; border-radius: 12px; background: #000; display: inline-block; }
    .mb { position: relative; width: 160px; height: 64px; padding: 1px; border-radius: 1.75rem; background: transparent; border: 0; cursor: pointer; overflow: visible; -webkit-tap-highlight-color: transparent; }
    .mb:focus-visible { outline: 2px solid #38bdf8; outline-offset: 3px; }
    .rail { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; }
    .blob { position: absolute; width: 80px; height: 80px; border-radius: 50%; background: radial-gradient(#0ea5e9 40%, transparent 60%); offset-path: inset(0 round 1.75rem); offset-distance: 0%; offset-anchor: 50% 50%; animation: ride 4s linear infinite; opacity: .9; transition: background .3s; }
    .mb[aria-pressed="true"] .blob { background: radial-gradient(#ec4899 40%, transparent 60%); animation-duration: 1.6s; }
    @keyframes ride { to { offset-distance: 100%; } }
    .in { position: relative; display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; height: 100%; border-radius: calc(1.75rem - 1px); background: rgba(15,23,42,.8); border: 1px solid #1e293b; color: #fff; font: 500 14px Inter, -apple-system, system-ui, sans-serif; backdrop-filter: blur(20px); transition: background .2s; }
    .mb:hover .in { background: rgba(15,23,42,.65); }
    .mb:active .in { transform: scale(.98); }
    .in svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; display: none; }
    .mb[aria-pressed="true"] .in svg { display: block; }
    .mb[aria-pressed="true"] .in .l::after { content: 'Pinned'; }
    .in .l::after { content: 'Borders are cool'; }
  `,
  html: `
    <div class="stage">
      <button class="mb" type="button" aria-pressed="false">
        <span class="rail"><span class="blob"></span></span>
        <span class="in"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><span class="l"></span></span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.mb');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
