export default {
  id: 'lb-aceternity-hover-gradient',
  credit: 'Aceternity UI — "Hover Border Gradient": a white highlight rotates top → left → bottom → right along the border; on hover it floods blue',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 36px; border-radius: 12px; background: #09090b; display: inline-block; }
    .hb { position: relative; display: inline-flex; padding: 1px; border-radius: 9999px; border: 1px solid rgba(255,255,255,.2); background: #000; cursor: pointer; overflow: visible; -webkit-tap-highlight-color: transparent; }
    .hb:focus-visible { outline: 2px solid #3275f8; outline-offset: 3px; }
    .glow { position: absolute; inset: 0; border-radius: inherit; z-index: 0; filter: blur(2px); overflow: hidden; background: radial-gradient(20.7% 50% at 50% 0%, #fff 0%, rgba(255,255,255,0) 100%); animation: orbit 4s steps(1, end) infinite; transition: background .5s; }
    @keyframes orbit {
      0% { background: radial-gradient(20.7% 50% at 50% 0%, #fff 0%, rgba(255,255,255,0) 100%); }
      25% { background: radial-gradient(16.6% 43.1% at 0% 50%, #fff 0%, rgba(255,255,255,0) 100%); }
      50% { background: radial-gradient(20.7% 50% at 50% 100%, #fff 0%, rgba(255,255,255,0) 100%); }
      75% { background: radial-gradient(16.2% 41.2% at 100% 50%, #fff 0%, rgba(255,255,255,0) 100%); }
    }
    .hb:hover .glow, .hb[aria-pressed="true"] .glow { animation-play-state: paused; background: radial-gradient(75% 181% at 50% 50%, #3275f8 0%, rgba(255,255,255,0) 100%); }
    .bg { position: absolute; inset: 2px; border-radius: 9999px; background: #000; z-index: 1; }
    .in { position: relative; z-index: 2; display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: inherit; color: #fff; font: 500 14px Inter, -apple-system, system-ui, sans-serif; background: #000; }
    .in svg { width: 20px; height: 20px; }
    .hb[aria-pressed="true"] .in { background: #0b1120; }
  `,
  html: `
    <div class="stage">
      <button class="hb" type="button" aria-pressed="false">
        <span class="glow"></span><span class="bg"></span>
        <span class="in"><svg viewBox="0 0 66 65" fill="none" stroke="currentColor" stroke-width="15" stroke-linecap="round"><path d="M8 8.05v48.65M34.6 8.05 8 56.7M58 8.05 32 56.7"/></svg>Aceternity UI</span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.hb');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
