export default {
  id: 'lb-magic-shimmer',
  credit: 'Magic UI — Shimmer Button: a conic-gradient spark spins around the rim of a black pill, inset highlight on top, presses down 1px',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 36px; border-radius: 12px; background: #fafafa; display: inline-block; }
    .sh { --spread: 90deg; --shimmer: #fff; --speed: 3s; --cut: .05em; --bg: rgba(0,0,0,1);
      position: relative; z-index: 0; display: inline-flex; align-items: center; justify-content: center; overflow: hidden; white-space: nowrap; padding: 12px 24px; border-radius: 100px; border: 1px solid rgba(255,255,255,.1); background: var(--bg); color: #fff; font: 500 14px/20px Inter, -apple-system, system-ui, sans-serif; cursor: pointer; transform: translateY(0); transition: transform .3s ease-in-out, background .3s; -webkit-tap-highlight-color: transparent; }
    .sh:active { transform: translateY(1px); }
    .sh:focus-visible { outline: 2px solid #000; outline-offset: 3px; }
    .spark { position: absolute; inset: 0; z-index: -3; overflow: visible; container-type: size; filter: blur(2px); }
    .spin { position: absolute; inset: 0; height: 100cqh; aspect-ratio: 1; border-radius: 0; animation: spin calc(var(--speed) * 2) linear infinite; }
    .cone { position: absolute; inset: -100%; width: auto; animation: spin var(--speed) linear infinite; background: conic-gradient(from calc(270deg - (var(--spread) * .5)), transparent 0, var(--shimmer) var(--spread), transparent var(--spread)); transform: rotate(0deg) translate(50%, 0); transform-origin: center; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .hl { position: absolute; inset: 0; border-radius: 100px; z-index: -1; box-shadow: inset 0 -8px 10px rgba(255,255,255,.12); transition: box-shadow .3s ease-in-out; }
    .sh:hover .hl { box-shadow: inset 0 -6px 10px rgba(255,255,255,.25); }
    .sh:active .hl { box-shadow: inset 0 -10px 10px rgba(255,255,255,.25); }
    .fill { position: absolute; inset: var(--cut); border-radius: 100px; background: var(--bg); z-index: -2; }
    .sh[aria-pressed="true"] { --bg: #1d4ed8; --shimmer: #bfdbfe; }
    .sh svg { width: 16px; height: 16px; margin-left: 8px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; display: none; }
    .sh[aria-pressed="true"] svg { display: block; }
  `,
  html: `
    <div class="stage">
      <button class="sh" type="button" aria-pressed="false">
        <span class="spark"><span class="spin"><span class="cone"></span></span></span>
        <span class="lbl">Shimmer Button</span>
        <svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
        <span class="hl"></span><span class="fill"></span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.sh');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
