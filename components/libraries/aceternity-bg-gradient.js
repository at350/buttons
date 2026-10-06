export default {
  id: 'lb-aceternity-bg-gradient',
  credit: 'Aceternity UI — "Background Gradient" wrapper: blurred animated blue → purple → pink → orange halo behind a zinc-900 "Buy now" card',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 36px; border-radius: 12px; background: #000; display: inline-block; }
    .bg { position: relative; padding: 4px; border-radius: 22px; width: 220px; cursor: pointer; border: 0; background: transparent; text-align: left; -webkit-tap-highlight-color: transparent; }
    .bg:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
    .g { position: absolute; inset: 0; border-radius: inherit; background: radial-gradient(circle farthest-side at 0 100%, #00ccb1, transparent), radial-gradient(circle farthest-side at 100% 0, #7b61ff, transparent), radial-gradient(circle farthest-side at 100% 100%, #ffc414, transparent), radial-gradient(circle farthest-side at 0 0, #1ca0fb, #141316); background-size: 400% 400%; animation: shift 5s ease infinite; transition: opacity .5s; will-change: background-position; }
    .g.blur { filter: blur(16px); opacity: .6; }
    .bg:hover .g.blur, .bg[aria-pressed="true"] .g.blur { opacity: 1; }
    .bg:hover .g { animation-duration: 2s; }
    @keyframes shift { 0%, 100% { background-position: 0 50%; } 50% { background-position: 100% 50%; } }
    .card { position: relative; z-index: 1; border-radius: 18px; background: #18181b; padding: 14px 16px; color: #fff; font: 14px/20px Inter, -apple-system, system-ui, sans-serif; display: flex; flex-direction: column; gap: 10px; }
    .card .t { font-weight: 600; font-size: 16px; }
    .card .p { color: #a1a1aa; font-size: 13px; }
    .pill { align-self: flex-start; display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 12px 0 14px; border-radius: 9999px; background: #000; color: #fff; font-size: 12px; font-weight: 600; transition: background .2s; }
    .pill b { background: #27272a; border-radius: 9999px; padding: 2px 8px; font-weight: 700; }
    .bg[aria-pressed="true"] .pill { background: #16a34a; }
    .bg[aria-pressed="true"] .pill .lb::after { content: 'Added'; }
    .pill .lb::after { content: 'Buy now'; }
    .bg:active .card { transform: scale(.985); }
  `,
  html: `
    <div class="stage">
      <button class="bg" type="button" aria-pressed="false">
        <span class="g blur"></span><span class="g"></span>
        <span class="card">
          <span class="t">Air Jordan 4 Retro</span>
          <span class="p">Reimagined Bred</span>
          <span class="pill"><span class="lb"></span><b>$100</b></span>
        </span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.bg');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
