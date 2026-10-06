export default {
  id: 'ph-hazard-button',
  credit: 'Car dashboard hazard-light button — red triangle latches on and blinks at 90 per minute',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 18px 24px; border-radius: 12px; background: linear-gradient(#2a2b2e, #17181a); }
    .dash { position: relative; padding: 6px; border-radius: 8px; background: radial-gradient(ellipse at 30% 20%, #3a3b3f, #1f2023); box-shadow: inset 0 1px 0 rgba(255,255,255,.08), inset 0 -2px 3px rgba(0,0,0,.6); }
    .btn {
      position: relative; display: flex; align-items: center; justify-content: center; width: 72px; height: 44px; border: 0; padding: 0; border-radius: 5px; cursor: pointer;
      background: linear-gradient(#2c2d31, #1a1b1e 60%, #111214); box-shadow: 0 3px 0 #060607, 0 4px 5px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.12);
      transition: transform .06s, box-shadow .06s; -webkit-tap-highlight-color: transparent;
    }
    .btn:hover { background: linear-gradient(#33343a, #1e1f23 60%, #131416); }
    .btn:active { transform: translateY(2px); box-shadow: 0 1px 0 #060607, 0 1px 2px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.1); }
    .btn[aria-pressed="true"] { transform: translateY(1px); box-shadow: 0 2px 0 #060607, 0 2px 3px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.1); }
    .btn:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 3px; }
    svg { width: 34px; height: 30px; }
    .tri { fill: none; stroke: #7a1114; stroke-width: 3.2; stroke-linejoin: round; transition: stroke .1s; }
    .tri2 { fill: none; stroke: #7a1114; stroke-width: 2; stroke-linejoin: round; transition: stroke .1s; }
    .btn[aria-pressed="true"] .tri, .btn[aria-pressed="true"] .tri2 { stroke: #ff3b30; animation: blink .667s steps(1) infinite; }
    .btn[aria-pressed="true"] svg { animation: glow .667s steps(1) infinite; }
    @keyframes blink { 50% { stroke: #7a1114; } }
    @keyframes glow { 0% { filter: drop-shadow(0 0 6px rgba(255,60,50,.9)); } 50% { filter: none; } }
  `,
  html: `
    <div class="stage">
      <div class="dash">
        <button class="btn" type="button" aria-pressed="false" aria-label="hazard lights">
          <svg viewBox="0 0 34 30" aria-hidden="true"><path class="tri" d="M17 3 31 27H3z"/><path class="tri2" d="M17 11 24 23H10z"/></svg>
        </button>
      </div>
    </div>`,
  init(root) {
    const b = root.querySelector('.btn');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
