export default {
  id: 'mo-gradient-flow',
  credit: 'Upgrade button — @property-registered gradient angle sweeps on hover so the conic border and inner glow actually animate (Magic UI "Shimmer / Rainbow Button")',
  size: 'auto',
  css: `
    @property --ang { syntax: '<angle>'; inherits: false; initial-value: 120deg; }
    @property --glow { syntax: '<number>'; inherits: false; initial-value: 0; }
    :host { display: inline-block; }
    .stage { padding: 22px 28px; border-radius: 12px; background: #09090b; }
    .btn {
      position: relative; height: 46px; padding: 0 22px; border: 0; border-radius: 999px; cursor: pointer; color: #fff; isolation: isolate;
      font: 600 14.5px Inter, system-ui, sans-serif; letter-spacing: -.01em; background: #18181b; display: inline-flex; align-items: center; gap: 9px;
      --ang: 120deg; --glow: 0; transition: --ang 1.2s cubic-bezier(.3, .7, .2, 1), --glow .5s, transform .2s cubic-bezier(.34, 1.56, .64, 1);
    }
    .btn::before {
      content: ''; position: absolute; inset: -2px; border-radius: inherit; z-index: -2;
      background: conic-gradient(from var(--ang), #f472b6, #a78bfa, #60a5fa, #34d399, #fbbf24, #f472b6);
    }
    .btn::after { content: ''; position: absolute; inset: 0; border-radius: inherit; z-index: -1; background: linear-gradient(calc(var(--ang) + 60deg), #27272a, #18181b 60%); }
    .btn:hover { --ang: 480deg; --glow: 1; transform: translateY(-1px); }
    .btn:active { transform: scale(.97); }
    .btn:focus-visible { outline: 2px solid #a78bfa; outline-offset: 4px; }
    .halo { position: absolute; inset: -14px; border-radius: 999px; z-index: -3; opacity: var(--glow); filter: blur(18px); pointer-events: none;
      background: conic-gradient(from var(--ang), #f472b6, #a78bfa, #60a5fa, #34d399, #fbbf24, #f472b6); }
    .btn:hover .halo { opacity: .7; }
    .btn svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; transition: transform .6s cubic-bezier(.34, 1.56, .64, 1); }
    .btn:hover svg { transform: rotate(180deg) scale(1.15); }
    .sheen { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; z-index: 0; pointer-events: none; }
    .sheen::before { content: ''; position: absolute; top: -50%; bottom: -50%; width: 40%; left: -60%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.35), transparent); transform: skewX(-20deg); transition: left 0s; }
    .btn:hover .sheen::before { left: 130%; transition: left .9s .15s cubic-bezier(.3, .7, .3, 1); }
    .btn span, .btn svg { position: relative; z-index: 1; }
  `,
  html: `
    <div class="stage">
      <button class="btn" type="button">
        <span class="halo" aria-hidden="true"></span><span class="sheen" aria-hidden="true"></span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z"/></svg>
        <span>Upgrade to Pro</span>
      </button>
    </div>`,
  init() {
    try { CSS.registerProperty({ name: '--ang', syntax: '<angle>', inherits: false, initialValue: '120deg' }); } catch (e) { /* already registered */ }
    try { CSS.registerProperty({ name: '--glow', syntax: '<number>', inherits: false, initialValue: '0' }); } catch (e) { /* already registered */ }
  },
};
