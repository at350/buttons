// Magic UI "Rainbow Button" — straight from the registry: #121213 fill over a 2px transparent border whose
// border-box layers carry a 90° gradient of --color-1,5,3,4,2 (oklch), background-size 200%, animated by
// `rainbow 2s infinite linear` (background-position 0% → 200%), plus a blurred (.75rem) copy glowing under the
// bottom edge. h-11 rounded-xl px-8, text-sm font-medium. The animation runs while hovered/focused.
const RAINBOW = 'linear-gradient(90deg, var(--c1), var(--c5), var(--c3), var(--c4), var(--c2))';

export default {
  id: 'mo-gradient-flow',
  credit: 'Magic UI "Rainbow Button" — the rainbow border and the blurred glow under it flow sideways (background-position 0 → 200% over 2s)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { padding: 10px 16px 26px; }
    .btn {
      --c1: oklch(66.2% .225 25.9); --c2: oklch(60.4% .26 302); --c3: oklch(69.6% .165 251); --c4: oklch(80.2% .134 225); --c5: oklch(90.7% .231 133);
      position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 44px; padding: 0 32px; border-radius: 12px; cursor: pointer;
      border: 2px solid transparent; color: #fafafa; font: 500 14px Inter, system-ui, sans-serif; white-space: nowrap;
      background: linear-gradient(#121213, #121213), linear-gradient(#121213 50%, rgba(18,18,19,.6) 80%, rgba(18,18,19,0)), ${RAINBOW};
      background-size: 200%; background-clip: padding-box, border-box, border-box; background-origin: border-box;
      animation: rainbow 2s infinite linear paused; transition: transform .15s cubic-bezier(.4, 0, .2, 1);
    }
    .btn::before {
      content: ''; position: absolute; bottom: -20%; left: 50%; z-index: 0; width: 60%; height: 20%; transform: translateX(-50%);
      background: ${RAINBOW}; background-size: 200%; filter: blur(.75rem); animation: rainbow 2s infinite linear paused;
    }
    .btn:hover, .btn:hover::before, .btn:focus-visible, .btn:focus-visible::before { animation-play-state: running; }
    .btn:active { transform: scale(.98); }
    .btn:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(161, 161, 170, .5); }
    .btn span { position: relative; z-index: 1; }
    @keyframes rainbow { 0% { background-position: 0%; } 100% { background-position: 200%; } }
  `,
  html: `<div class="wrap"><button class="btn" type="button"><span>Get Unlimited Access</span></button></div>`,
};
