// Vercel / Geist "Deploy" button. Idle, building (Geist 12-bar spinner) and ready states share one grid cell,
// so the button keeps the widest label's width throughout.
const BARS = Array.from({ length: 12 }, (_, i) => `<i style="transform:rotate(${i * 30}deg) translate(146%);animation-delay:${-1.2 + i * 0.1}s"></i>`).join('');
export default {
  id: 'bt-vercel-deploy',
  credit: 'Vercel / Geist — "Deploy" button with the triangle, Geist spinner while building, then Ready',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 8px; white-space: nowrap; }
    .v {
      height: 40px; padding: 0 16px; border-radius: 6px; cursor: pointer; border: 0;
      font: 500 14px/20px Geist, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; letter-spacing: -.006em;
      display: inline-flex; align-items: center; justify-content: center; transition: background .15s ease, box-shadow .15s ease, color .15s ease;
      -webkit-tap-highlight-color: transparent;
    }
    .pri { background: #171717; color: #fff; }
    .pri:hover { background: #383838; }
    .sec { background: #fff; color: #171717; box-shadow: 0 0 0 1px rgba(0,0,0,.08); }
    .sec:hover { background: #f2f2f2; }
    .v:active { transform: scale(.98); }
    .v:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px hsl(212,100%,48%); }
    .st { display: grid; }
    .st > span { grid-area: 1 / 1; display: inline-flex; align-items: center; gap: 8px; visibility: hidden; }
    .pri[data-s="idle"] .idle, .pri[data-s="busy"] .busy, .pri[data-s="ready"] .ready { visibility: visible; }
    .pri[data-s="busy"] { background: #f2f2f2; color: #8f8f8f; cursor: default; box-shadow: 0 0 0 1px rgba(0,0,0,.08); }
    .pri[data-s="ready"] { background: #fff; color: #171717; box-shadow: 0 0 0 1px rgba(0,0,0,.08); }
    .pri[data-s="ready"]:hover { background: #f2f2f2; }
    .logo { width: 16px; height: 16px; fill: currentColor; display: block; }
    .spin { position: relative; width: 16px; height: 16px; display: block; }
    .spin i { position: absolute; left: 50%; top: 50%; width: 24%; height: 8%; margin: -4% 0 0 -12%; border-radius: 6px; background: #8f8f8f; }
    .pri[data-s="busy"] .spin i { animation: fade 1.2s linear infinite; }
    @keyframes fade { 0% { opacity: 1; } 100% { opacity: .15; } }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: #50e3c2; }
  `,
  html: `
    <div class="row">
      <button class="v pri" type="button" data-s="idle" aria-live="polite">
        <span class="st">
          <span class="idle"><svg class="logo" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 1.608 12 20.784H0Z"/></svg>Deploy</span>
          <span class="busy"><span class="spin" aria-hidden="true">${BARS}</span>Building</span>
          <span class="ready"><span class="dot" aria-hidden="true"></span>Ready</span>
        </span>
      </button>
      <button class="v sec" type="button">Learn More</button>
    </div>`,
  init(root) {
    const b = root.querySelector('.pri');
    let t;
    b.addEventListener('click', () => {
      const s = b.dataset.s;
      if (s === 'busy') return;
      if (s === 'ready') { b.dataset.s = 'idle'; return; }
      b.dataset.s = 'busy';
      t = setTimeout(() => { b.dataset.s = 'ready'; }, 1600);
    });
    return () => clearTimeout(t);
  },
};
