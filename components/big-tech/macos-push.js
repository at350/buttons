export default {
  id: 'bt-macos-push',
  credit: 'Apple macOS Big Sur / Sonoma — NSButton push buttons (default blue gradient + plain)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; gap: 12px; padding: 18px 20px; background: #ececec; border-radius: 12px; border: 1px solid #d8d8d8; }
    .pb {
      min-width: 72px; height: 22px; padding: 0 14px; border-radius: 6px;
      font: 400 13px/22px -apple-system, system-ui, sans-serif; cursor: default; letter-spacing: -.1px;
      -webkit-tap-highlight-color: transparent;
    }
    .plain {
      background: #fff; color: #1d1d1f; border: 0;
      box-shadow: 0 0 0 .5px rgba(0,0,0,.12), 0 1px 1px rgba(0,0,0,.14);
    }
    .plain:active { background: #e6e6e6; }
    .default {
      border: 0; color: #fff;
      background: linear-gradient(#2d8cf7, #0b6ff0);
      box-shadow: 0 0 0 .5px rgba(0,0,0,.08), 0 1px 1px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.22);
    }
    .default:active { background: linear-gradient(#1f6ed3, #0557c6); }
    .default.pulse { animation: pulse .9s ease-in-out infinite alternate; }
    @keyframes pulse { to { filter: brightness(1.18); } }
    .pb:focus-visible { outline: none; box-shadow: 0 0 0 3.5px rgba(0,122,255,.5); }
    .pb.done { background: linear-gradient(#34c759, #28a745); }
  `,
  html: `
    <div class="stage">
      <button class="pb plain" type="button">Cancel</button>
      <button class="pb default" type="button">OK</button>
    </div>`,
  init(root) {
    const ok = root.querySelector('.default');
    const cancel = root.querySelector('.plain');
    ok.addEventListener('click', () => { ok.classList.toggle('pulse'); });
    cancel.addEventListener('click', () => { ok.classList.remove('pulse'); });
  },
};
