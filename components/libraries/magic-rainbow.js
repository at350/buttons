export default {
  id: 'lb-magic-rainbow',
  credit: 'Magic UI — Rainbow Button: #121213 fill with a 2px gradient border-box (oklch red → lime → blue → sky → violet) streaming at bg-size 200% / 2s linear, plus a blurred (0.75rem) copy glowing under the bottom edge; click for the outline variant',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 36px 32px; border-radius: 12px; background: #fff; display: inline-block; }
    .rb { --color-1: oklch(66.2% 0.225 25.9); --color-2: oklch(60.4% 0.26 302); --color-3: oklch(69.6% 0.165 251); --color-4: oklch(80.2% 0.134 225); --color-5: oklch(90.7% 0.231 133);
      --rainbow: linear-gradient(90deg, var(--color-1), var(--color-5), var(--color-3), var(--color-4), var(--color-2));
      position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 36px; padding: 8px 16px; border-radius: 6px; cursor: pointer; outline: none;
      font: 500 14px/20px Inter, -apple-system, system-ui, sans-serif; white-space: nowrap; color: #fafafa; -webkit-tap-highlight-color: transparent;
      border: 2px solid transparent; background-image: linear-gradient(#121213, #121213), linear-gradient(#121213 50%, rgba(18,18,19,.6) 80%, rgba(18,18,19,0)), var(--rainbow);
      background-size: 200%; background-clip: padding-box, border-box, border-box; background-origin: border-box;
      animation: rainbow 2s infinite linear; transition: all .15s cubic-bezier(.4,0,.2,1); }
    .rb::before { content: ''; position: absolute; bottom: -20%; left: 50%; z-index: 0; height: 20%; width: 60%; transform: translateX(-50%); background: var(--rainbow); background-size: 200%; filter: blur(.75rem); animation: rainbow 2s infinite linear; }
    .rb span { position: relative; z-index: 1; }
    .rb:focus-visible { box-shadow: 0 0 0 3px rgba(161,161,161,.5); }
    .rb[aria-pressed="true"] { color: #171717; border: 1px solid #e5e5e5; border-bottom-color: transparent; background-image: linear-gradient(#fff, #fff), linear-gradient(#fff 50%, rgba(18,18,19,.6) 80%, rgba(18,18,19,0)), var(--rainbow); }
    @keyframes rainbow { 0% { background-position: 0%; } 100% { background-position: 200%; } }
  `,
  html: `
    <div class="stage">
      <button class="rb" type="button" aria-pressed="false"><span>Get Unlimited Access</span></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.rb');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
