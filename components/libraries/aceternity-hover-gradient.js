export default {
  id: 'lb-aceternity-hover-gradient',
  credit: 'Aceternity UI — Hover Border Gradient: a white radial highlight hops TOP → RIGHT → BOTTOM → LEFT once a second (linear tween between the four radial-gradient states, blur 2px); hovering floods it with the #3275F8 highlight',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 28px 36px; border-radius: 12px; background: #000; display: inline-block; }
    .hb { position: relative; display: flex; width: fit-content; align-items: center; justify-content: center; padding: 1px; border-radius: 9999px; border: 1px solid rgba(255,255,255,.2); background: rgba(255,255,255,.2); cursor: pointer; overflow: visible; transition: background .5s cubic-bezier(.4,0,.2,1); -webkit-tap-highlight-color: transparent; }
    .hb:focus-visible { outline: 2px solid #3275f8; outline-offset: 3px; }
    .glow { position: absolute; inset: 0; z-index: 0; border-radius: inherit; overflow: hidden; filter: blur(2px); }
    .dot { position: absolute; left: 50%; top: 0; width: 41.4%; height: 100%; translate: -50% -50%; background: radial-gradient(closest-side, #fff 0%, rgba(255,255,255,0) 100%); animation: orbit 4s linear infinite; transition: opacity 1s linear; }
    @keyframes orbit {
      0%, 100% { left: 50%; top: 0%; width: 41.4%; height: 100%; }
      25% { left: 100%; top: 50%; width: 32.4%; height: 82.4%; }
      50% { left: 50%; top: 100%; width: 41.4%; height: 100%; }
      75% { left: 0%; top: 50%; width: 33.2%; height: 86.2%; }
    }
    .flood { position: absolute; inset: 0; background: radial-gradient(75% 181.16% at 50% 50%, #3275f8 0%, rgba(255,255,255,0) 100%); opacity: 0; transition: opacity 1s linear; }
    .hb:hover .dot, .hb:focus-visible .dot { animation-play-state: paused; opacity: 0; }
    .hb:hover .flood, .hb:focus-visible .flood { opacity: 1; }
    .mask { position: absolute; inset: 2px; z-index: 1; border-radius: 100px; background: #000; }
    .in { position: relative; z-index: 10; display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: inherit; background: #000; color: #fff; font: 400 16px/24px Inter, -apple-system, system-ui, sans-serif; white-space: nowrap; }
    .in svg { width: 12px; height: 12px; }
  `,
  html: `
    <div class="stage">
      <button class="hb" type="button">
        <span class="in"><svg viewBox="0 0 66 65" fill="none"><path d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696" stroke="currentColor" stroke-width="15" stroke-miterlimit="3.86874" stroke-linecap="round"/></svg><span>Aceternity UI</span></span>
        <span class="glow"><span class="dot"></span><span class="flood"></span></span>
        <span class="mask"></span>
      </button>
    </div>`,
};
