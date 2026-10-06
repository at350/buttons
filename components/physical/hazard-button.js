// Dashboard hazard-warning switch: soft-touch black push-push button in a centre-console bezel with
// the ISO 7000-0085 double-triangle symbol. Latched on, the symbol and lamps flash at 90 per minute.
export default {
  id: 'ph-hazard-button',
  credit: 'Car dashboard hazard-light switch — ISO double-triangle, push-push latch, flashes at 90 per minute',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 18px 24px; border-radius: 12px;
      background: radial-gradient(circle at 1px 1px, rgba(255,255,255,.03) 0 .7px, transparent 1px) 0 0 / 3px 3px, linear-gradient(#2a2b2e, #151618); }
    .bezel { padding: 4px; border-radius: 9px; background: linear-gradient(#0c0c0d, #1d1e21); box-shadow: inset 0 2px 3px rgba(0,0,0,.9), 0 1px 0 rgba(255,255,255,.08); }
    .btn {
      position: relative; display: flex; align-items: center; justify-content: center; width: 78px; height: 46px; border: 0; padding: 0; border-radius: 6px; cursor: pointer;
      background: radial-gradient(ellipse 90% 70% at 50% 20%, #34363b, #222327 60%, #18191c);
      box-shadow: 0 4px 0 #050506, 0 5px 3px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.12), inset 0 -1px 0 rgba(0,0,0,.6);
      transition: transform .13s cubic-bezier(.3,1.8,.5,1), box-shadow .13s cubic-bezier(.3,1.8,.5,1); -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: radial-gradient(ellipse 90% 70% at 50% 20%, #3a3c42, #26272b 60%, #1a1b1e); }
    .btn:active { transform: translateY(3px); box-shadow: 0 1px 0 #050506, 0 1px 1px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.08), inset 0 -1px 0 rgba(0,0,0,.6); transition-duration: .04s; }
    .btn[aria-pressed="true"] { transform: translateY(2px); box-shadow: 0 2px 0 #050506, 0 2px 2px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.1), inset 0 -1px 0 rgba(0,0,0,.6); }
    .btn:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 5px; }
    svg { width: 34px; height: 30px; overflow: visible; }
    .tri { fill: none; stroke: #9c1a17; stroke-linejoin: miter; }
    .o { stroke-width: 3.6; } .i { stroke-width: 2.2; }
    .btn[aria-pressed="true"] svg { animation: flash .667s steps(1) infinite; }
    @keyframes flash {
      0% { filter: drop-shadow(0 0 3px rgba(255,50,30,.95)) drop-shadow(0 0 8px rgba(255,40,20,.6)); }
      50% { filter: none; }
    }
    .btn[aria-pressed="true"] .tri { animation: lamp .667s steps(1) infinite; }
    @keyframes lamp { 0% { stroke: #ff3b2a; } 50% { stroke: #9c1a17; } }
  `,
  html: `
    <div class="stage">
      <div class="bezel">
        <button class="btn" type="button" aria-pressed="false" aria-label="Hazard warning lights">
          <svg viewBox="0 0 34 30" aria-hidden="true"><path class="tri o" d="M17 2.2 32 28H2z"/><path class="tri i" d="M17 11.2 24.6 24.2H9.4z"/></svg>
        </button>
      </div>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
