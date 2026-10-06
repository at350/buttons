export default {
  id: 'lb-magic-rainbow',
  credit: 'Magic UI — Rainbow Button: five-hue gradient streams along the bottom edge and blurs out beneath a near-black rounded-xl button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 36px 32px; border-radius: 12px; background: #fff; display: inline-block; }
    .rb { --c1: hsl(0 100% 63%); --c2: hsl(270 100% 63%); --c3: hsl(210 100% 63%); --c4: hsl(195 100% 63%); --c5: hsl(90 100% 63%);
      position: relative; display: inline-flex; align-items: center; justify-content: center; height: 44px; padding: 0 32px; border-radius: 12px; cursor: pointer; color: #fff; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; white-space: nowrap; -webkit-tap-highlight-color: transparent;
      border: 2px solid transparent; background-size: 200%; background-clip: padding-box, border-box, border-box; background-origin: border-box; animation: rainbow 2s linear infinite;
      background-image: linear-gradient(#121213, #121213), linear-gradient(#121213 50%, rgba(18,18,19,.6) 80%, rgba(18,18,19,0)), linear-gradient(90deg, var(--c1), var(--c5), var(--c3), var(--c4), var(--c2));
      transition: transform .15s, filter .2s; }
    .rb::before { content: ''; position: absolute; bottom: -20%; left: 50%; z-index: 0; height: 20%; width: 60%; transform: translateX(-50%); background: linear-gradient(90deg, var(--c1), var(--c5), var(--c3), var(--c4), var(--c2)); background-size: 200%; filter: blur(12.8px); animation: rainbow 2s linear infinite; }
    @keyframes rainbow { 0% { background-position: 0; } 100% { background-position: 200%; } }
    .rb:hover { filter: brightness(1.1); }
    .rb:active { transform: scale(.97); }
    .rb:focus-visible { outline: 2px solid #121213; outline-offset: 3px; }
    .rb span { position: relative; z-index: 1; }
    .rb[aria-pressed="true"] { animation-duration: .6s; }
    .rb[aria-pressed="true"]::before { animation-duration: .6s; filter: blur(16px); }
    .rb[aria-pressed="true"] span::after { content: 'Got it'; }
    .rb span::after { content: 'Get Unlimited Access'; }
  `,
  html: `
    <div class="stage">
      <button class="rb" type="button" aria-pressed="false"><span></span></button>
    </div>`,
  init(root) {
    const b = root.querySelector('.rb');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
