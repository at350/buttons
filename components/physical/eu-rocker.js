// Gira System 55-style switch: 80 mm pure-white frame, 55 mm square rocker on a centre pivot.
// The rocker tips about 4 deg each way — the pressed half sinks into shadow, the other catches the light.
export default {
  id: 'ph-eu-rocker',
  credit: 'European wide rocker light switch (Gira System 55 / Busch-Jaeger style) — the whole square rocks on its pivot',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 20px; border-radius: 12px; background: linear-gradient(160deg, #eceae4, #dcd9d1); }
    .frame {
      position: relative; width: 104px; height: 104px; border-radius: 6px; padding: 16px;
      background: linear-gradient(160deg, #ffffff, #f3f3f0 70%, #ebebe7);
      box-shadow: 0 1px 1px rgba(0,0,0,.14), 0 10px 18px -6px rgba(0,0,0,.25), inset 0 1px 0 #fff, inset 0 -1px 1px rgba(0,0,0,.06);
    }
    .well { position: relative; width: 72px; height: 72px; border-radius: 3px; background: #dedfdb; box-shadow: inset 0 1px 2px rgba(0,0,0,.28); perspective: 220px; }
    .rocker {
      position: absolute; inset: 1px; border: 0; padding: 0; border-radius: 3px; cursor: pointer;
      background: linear-gradient(180deg, #ffffff 0%, #f9f9f7 46%, #e9e9e5 54%, #f4f4f1 100%);
      box-shadow: 0 1px 0 rgba(0,0,0,.08), 0 3px 3px -1px rgba(0,0,0,.22), inset 0 1px 0 #fff, inset 0 0 0 1px rgba(0,0,0,.035);
      transform: rotateX(4deg);
      transition: transform .12s cubic-bezier(.3,1.9,.5,1), background .12s, box-shadow .12s; -webkit-tap-highlight-color: transparent;
    }
    .rocker[aria-pressed="true"] {
      transform: rotateX(-4deg);
      background: linear-gradient(180deg, #f4f4f1 0%, #e9e9e5 46%, #f9f9f7 54%, #ffffff 100%);
      box-shadow: 0 -1px 0 rgba(0,0,0,.06), 0 -3px 3px -1px rgba(0,0,0,.15), inset 0 -1px 0 #fff, inset 0 0 0 1px rgba(0,0,0,.035);
    }
    .rocker:active { transform: rotateX(0deg) translateZ(-1px); transition-duration: .05s; }
    .rocker:focus-visible { outline: 2px solid #2563eb; outline-offset: 5px; }
  `,
  html: `
    <div class="stage">
      <div class="frame"><div class="well"><button class="rocker" type="button" aria-pressed="false" aria-label="Light switch"></button></div></div>
    </div>`,
  init(root) {
    const b = root.querySelector('.rocker');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
