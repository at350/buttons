export default {
  id: 'lb-magic-rainbow',
  credit: 'Magic UI — Rainbow Button: #121213 fill with a 2px gradient border-box (oklch red → lime → blue → sky → violet) streaming at bg-size 200% / 2s linear, plus a blurred (0.75rem) copy glowing under the bottom edge; click for the outline variant',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 36px 32px; border-radius: 12px; background: #fff; display: inline-block; isolation: isolate; }
    .rb { --color-1: oklch(66.2% 0.225 25.9); --color-2: oklch(60.4% 0.26 302); --color-3: oklch(69.6% 0.165 251); --color-4: oklch(80.2% 0.134 225); --color-5: oklch(90.7% 0.231 133);
      --rainbow: linear-gradient(90deg, var(--color-1), var(--color-5), var(--color-3), var(--color-4), var(--color-2));
      position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 36px; padding: 8px 16px; border-radius: 6px; cursor: pointer; outline: none;
      font: 500 14px/20px Inter, -apple-system, system-ui, sans-serif; white-space: nowrap; color: #fafafa; -webkit-tap-highlight-color: transparent;
      border: 2px solid transparent; background-color: transparent; background-image: linear-gradient(#121213, #121213), linear-gradient(#121213 50%, rgba(18,18,19,.6) 80%, rgba(18,18,19,0));
      background-size: 200%; background-clip: padding-box, border-box; background-origin: border-box;
      transition: all .15s cubic-bezier(.4,0,.2,1); }
    /* The streaming rainbow under the border: the label span is stretched over the button's border box (negative margins
       = border + padding) and clips a 4x-wide rainbow strip (2x tile, as bg-size 200%) that slides one tile per 2s with
       transform; no per-frame style recalc. z-index -1 puts it in the .stage stacking context, i.e. under the button's own
       fill + fade layers, exactly where the third background layer used to be. The strip only covers the lower half: the
       fade is opaque over the top half anyway, and this keeps the rainbow out of the anti-aliased top corners. */
    .rb span { position: relative; display: flex; align-items: center; align-self: stretch; margin: -10px -18px; padding: 10px 18px; border-radius: 6px; overflow: hidden;
      transition: margin .15s cubic-bezier(.4,0,.2,1), padding .15s cubic-bezier(.4,0,.2,1); }
    .rb span::before { content: ''; position: absolute; z-index: -1; top: 50%; left: 0; width: 400%; height: 50%; background: var(--rainbow) 0 0 / 50% 100%; animation: rainbow-x 2s infinite linear; }
    @keyframes rainbow-x { to { transform: translateX(-50%); } }
    /* The blurred glow: .glow is the 60% x 20% window (clips, then blurs) and its ::before is the same 4x-wide strip sliding
       one tile per 2s, so the glow keeps drifting with the border at rest without a per-frame style recalc. */
    .glow { position: absolute; bottom: -20%; left: 50%; z-index: 0; height: 20%; width: 60%; transform: translateX(-50%); overflow: hidden; filter: blur(.75rem); pointer-events: none; }
    .glow::before { content: ''; position: absolute; top: 0; left: 0; width: 400%; height: 100%; background: var(--rainbow) 0 0 / 50% 100%; animation: rainbow-x 2s infinite linear; }
    .rb:focus-visible { box-shadow: 0 0 0 3px rgba(161,161,161,.5); }
    .rb[aria-pressed="true"] { color: #171717; border: 1px solid #e5e5e5; border-bottom-color: transparent; background-image: linear-gradient(#fff, #fff), linear-gradient(#fff 50%, rgba(18,18,19,.6) 80%, rgba(18,18,19,0)); }
    .rb[aria-pressed="true"] span { margin: -9px -17px; padding: 9px 17px; }
  `,
  html: `
    <div class="stage">
      <button class="rb" type="button" aria-pressed="false"><i class="glow" aria-hidden="true"></i><span>Get Unlimited Access</span></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.rb');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
