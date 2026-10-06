export default {
  id: 'mb-siri-glow',
  credit: 'Apple Intelligence (iOS 18) — Siri button with the rotating rainbow rim that blooms and breathes while listening',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 26px 34px; border-radius: 12px; background: #0a0a0c; }
    .siri { position: relative; width: 72px; height: 72px; border-radius: 50%; border: 0; padding: 0; background: #0a0a0c; cursor: pointer;
      display: grid; place-items: center; -webkit-tap-highlight-color: transparent; isolation: isolate;
      transition: transform .35s cubic-bezier(.2,.8,.2,1); }
    .siri:active { transform: scale(.93); }
    .siri:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }
    .rim, .halo { position: absolute; inset: -3px; border-radius: 50%; z-index: -1;
      background: conic-gradient(#ff5f8f, #ff9f3f, #ffe25a, #5ad8ff, #7b61ff, #ff5fd8, #ff5f8f);
      animation: spin 6s linear infinite paused; }
    .halo { inset: -6px; filter: blur(14px); opacity: .35; transition: opacity .4s, inset .4s; }
    .siri:hover .rim, .siri:hover .halo { animation-play-state: running; }
    .siri:hover .halo { opacity: .6; }
    .siri[aria-pressed="true"] .rim, .siri[aria-pressed="true"] .halo { animation: spin 2.2s linear infinite, breathe 1.6s ease-in-out infinite; }
    .siri[aria-pressed="true"] .halo { inset: -12px; opacity: .9; }
    .core { position: relative; width: 62px; height: 62px; border-radius: 50%; background: #0a0a0c; display: grid; place-items: center; overflow: hidden;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.06); }
    .orb { width: 34px; height: 34px; border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, #ffd4e8, #ff5fd8 30%, #7b61ff 60%, #27c2ff 100%);
      filter: blur(.6px) saturate(140%); box-shadow: 0 0 24px rgba(123,97,255,.6);
      transition: transform .45s cubic-bezier(.2,.8,.2,1), border-radius .45s; }
    .siri:hover .orb { transform: scale(1.08); }
    .siri[aria-pressed="true"] .orb { animation: wobble 1.1s ease-in-out infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes breathe { 50% { opacity: .55; } }
    @keyframes wobble { 0%,100% { border-radius: 50%; transform: scale(1); } 33% { border-radius: 60% 40% 55% 45%; transform: scale(1.14) rotate(8deg); } 66% { border-radius: 45% 55% 40% 60%; transform: scale(.96) rotate(-6deg); } }
  `,
  html: `
    <div class="stage">
      <button class="siri" type="button" aria-pressed="false" aria-label="Siri">
        <span class="halo"></span><span class="rim"></span>
        <span class="core"><span class="orb"></span></span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.siri');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  },
};
