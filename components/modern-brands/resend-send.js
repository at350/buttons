export default {
  id: 'mb-resend-send',
  credit: 'Resend homepage — the frosted glass "Get started" (2px white/5 border, rounded-2xl) that flips to white-on-black on hover, beside the muted "Documentation" link-button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { position: relative; padding: 26px 28px; border-radius: 12px; overflow: hidden; display: flex; align-items: center; gap: 4px;
      background: radial-gradient(60% 120% at 50% -30%, rgba(255,255,255,.16), transparent 70%), conic-gradient(from 200deg at 50% -20%, transparent 0deg, rgba(255,255,255,.05) 20deg, transparent 40deg, rgba(255,255,255,.04) 70deg, transparent 90deg), #000;
      font: 600 16px/1 Inter, -apple-system, system-ui, sans-serif; letter-spacing: -.01em; -webkit-font-smoothing: antialiased; }
    .logo { width: 22px; height: 22px; fill: #fff; margin-right: 16px; flex: none; }
    .b { position: relative; height: 48px; padding: 0 20px; border-radius: 16px; cursor: pointer; font: inherit; white-space: nowrap; display: inline-flex; align-items: center; gap: 4px;
      transition: all .2s ease-in-out; -webkit-tap-highlight-color: transparent; }
    .pri { color: #fff; border: 2px solid rgba(255,255,255,.05); background: linear-gradient(104deg, rgba(253,253,253,.05) 5%, rgba(240,240,228,.1) 100%) border-box;
      backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px); box-shadow: 0 1px 2px rgba(0,0,0,.05); }
    .pri:hover, .pri[aria-pressed="true"] { background: rgba(255,255,255,.9); color: #000; box-shadow: 0 0 0 1px rgba(255,255,255,.1), 0 8px 30px -6px rgba(255,255,255,.35); }
    .pri:active { transform: scale(.98); }
    .b:focus-visible { outline: none; box-shadow: 0 0 0 4px rgba(255,255,255,.3); }
    .pri:focus-visible { background: rgba(255,255,255,.9); color: #000; }
    .ghost { border: 1px solid transparent; background: transparent; color: #a1a4a5; }
    .ghost:hover { color: #f0f0f0; }
  `,
  html: `
    <div class="stage">
      <svg class="logo" viewBox="0 0 24 24" role="img" aria-label="Resend"><path d="M14.679 0c4.648 0 7.413 2.765 7.413 6.434s-2.765 6.434-7.413 6.434H12.33L24 24h-8.245l-8.88-8.44c-.636-.588-.93-1.273-.93-1.86 0-.831.587-1.565 1.713-1.883l4.574-1.224c1.737-.465 2.936-1.81 2.936-3.572 0-2.153-1.761-3.4-3.939-3.4H0V0z"/></svg>
      <button class="b pri" type="button" aria-pressed="false">Get started</button>
      <button class="b ghost" type="button">Documentation</button>
    </div>`,
  init(root) {
    const b = root.querySelector('.pri');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
