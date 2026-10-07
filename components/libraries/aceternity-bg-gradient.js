export default {
  id: 'lb-aceternity-bg-gradient',
  credit: 'Aceternity UI — Background Gradient: two layers of teal / violet / amber / sky radial gradients drift (bg-position 0 → 100%, 5s, reversing); the blur-xl halo goes 60% → 100% on hover behind the zinc-900 "Air Jordan" card',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 30px 36px; border-radius: 12px; background: #000; display: inline-block; }
    .bg { position: relative; display: block; padding: 4px; border-radius: 24px; width: 236px; cursor: pointer; border: 0; background: transparent; text-align: left; color: inherit; font: inherit; -webkit-tap-highlight-color: transparent; }
    .bg:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
    /* The gradient field is 4x the card in each direction; only its middle band (bg-position y 50%) is ever shown, so the
       moving layer is a 4x-wide strip of that band, slid with transform inside the clipped .g (compositor-only; same
       frames as animating background-position 0 50% -> 100% 50%). The halo's blur stays on .g.blur, which never repaints. */
    .g { position: absolute; inset: 0; z-index: 1; border-radius: 24px; overflow: hidden; }
    .g::before { content: ''; position: absolute; top: 0; left: 0; width: 400%; height: 100%; background: radial-gradient(circle farthest-side at 0 100%, #00ccb1, transparent), radial-gradient(circle farthest-side at 100% 0, #7b61ff, transparent), radial-gradient(circle farthest-side at 100% 100%, #ffc414, transparent), radial-gradient(circle farthest-side at 0 0, #1ca0fb, #141316); background-size: 100% 400%; background-position: 0 50%; animation: drift 5s ease-in-out infinite; }
    .g.blur { filter: blur(24px); opacity: .6; transition: opacity .5s cubic-bezier(.4,0,.2,1); }
    .bg:hover .g.blur, .bg:focus-visible .g.blur { opacity: 1; }
    @keyframes drift { 0%, 100% { transform: none; } 50% { transform: translateX(-75%); } }
    /* with motion reduced (animation cut to one instant iteration) show the same still frame as before: bg-position 0 0 */
    @media (prefers-reduced-motion: reduce) { .g::before { background-position: 0 0; } }
    .card { position: relative; z-index: 10; display: flex; flex-direction: column; border-radius: 22px; background: #18181b; padding: 16px; color: #e5e5e5; font: 400 16px/24px Inter, -apple-system, system-ui, sans-serif; }
    .t { margin: 0 0 8px; }
    .pill { align-self: flex-start; display: inline-flex; align-items: center; gap: 4px; padding: 4px 4px 4px 16px; border-radius: 9999px; background: #27272a; color: #fff; font-size: 12px; line-height: 16px; font-weight: 700; white-space: nowrap; transition: background .2s; }
    .pill .p { display: grid; background: #3f3f46; border-radius: 9999px; font-size: .6rem; line-height: 16px; padding: 0 8px; }
    .pill .lb { display: grid; }
    .pill .lb > span { grid-area: 1 / 1; transition: opacity .15s; }
    .pill .lb .on { opacity: 0; }
    .bg[aria-pressed="true"] .pill .lb .on { opacity: 1; }
    .bg[aria-pressed="true"] .pill .lb .off { opacity: 0; }
    .bg:hover .pill { background: #3f3f46; }
    .bg:hover .pill .p { background: #52525b; }
  `,
  html: `
    <div class="stage">
      <button class="bg" type="button" aria-pressed="false">
        <span class="g blur"></span><span class="g"></span>
        <span class="card">
          <span class="t">Air Jordan 4 Retro Reimagined</span>
          <span class="pill"><span class="lb"><span class="off">Buy now</span><span class="on">In cart</span></span><span class="p">$100</span></span>
        </span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.bg');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
