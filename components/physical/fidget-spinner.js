export default {
  id: 'ph-fidget-spinner',
  credit: 'Tri-bar fidget spinner — flick it (click) and it coasts down on its bearing',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 14px; border-radius: 12px; background: linear-gradient(#e9e6df, #d6d2c8); }
    .wrap { position: relative; width: 132px; height: 132px; }
    .spin {
      position: absolute; inset: 0; border: 0; padding: 0; background: transparent; cursor: pointer; border-radius: 50%;
      transform: rotate(0deg); transition: transform 3s cubic-bezier(.15,.7,.25,1); -webkit-tap-highlight-color: transparent;
    }
    .spin:focus-visible { outline: 2px solid #1a73e8; outline-offset: 2px; }
    .spin svg { width: 100%; height: 100%; display: block; filter: drop-shadow(0 4px 4px rgba(0,0,0,.35)); }
    .body { fill: #d93b2b; }
    .arms { fill: none; stroke: #d93b2b; stroke-width: 30; stroke-linecap: round; }
    .body2 { fill: #f05a4a; }
    .weight { fill: #cfd3d8; stroke: #7a7f86; stroke-width: 1.5; }
    .weight2 { fill: #8d9299; }
    .cap { position: absolute; left: 50%; top: 50%; width: 36px; height: 36px; margin: -18px; border-radius: 50%; pointer-events: none; background: radial-gradient(circle at 40% 35%, #ffffff, #c9ccd1 55%, #777c83 100%); box-shadow: 0 1px 2px rgba(0,0,0,.6), inset 0 0 0 4px rgba(0,0,0,.08); }
    .cap::after { content: ''; position: absolute; left: 50%; top: 50%; width: 10px; height: 10px; margin: -5px; border-radius: 50%; background: radial-gradient(circle, #555 0 40%, #bbb 60%); }
  `,
  html: `
    <div class="stage">
      <div class="wrap">
        <button class="spin" type="button" aria-label="spin">
          <svg viewBox="0 0 132 132" aria-hidden="true">
            <path class="arms" d="M66 66 L66 22 M66 66 L104 88 M66 66 L28 88"/>
            <circle class="body" cx="66" cy="22" r="21"/><circle class="body" cx="104" cy="88" r="21"/><circle class="body" cx="28" cy="88" r="21"/>
            <circle class="body2" cx="66" cy="66" r="27"/>
            <circle class="weight" cx="66" cy="22" r="11"/><circle class="weight" cx="104" cy="88" r="11"/><circle class="weight" cx="28" cy="88" r="11"/>
            <circle class="weight2" cx="66" cy="22" r="4"/><circle class="weight2" cx="104" cy="88" r="4"/><circle class="weight2" cx="28" cy="88" r="4"/>
          </svg>
        </button>
        <span class="cap"></span>
      </div>
    </div>`,
  init(root) {
    const s = root.querySelector('.spin');
    let rot = 0;
    s.addEventListener('click', () => { rot += 720 + Math.round(Math.random() * 360); s.style.transform = `rotate(${rot}deg)`; });
  },
};
