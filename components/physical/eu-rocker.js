export default {
  id: 'ph-eu-rocker',
  credit: 'European wide rocker light switch (Gira / Busch-Jaeger style) — click rocks it',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 20px; border-radius: 12px; background: linear-gradient(#f1f1ee, #e1e1dc); }
    .frame {
      position: relative; width: 84px; height: 84px; border-radius: 3px; padding: 11px;
      background: linear-gradient(160deg, #ffffff, #eef0ee);
      box-shadow: 0 1px 2px rgba(0,0,0,.2), 0 8px 18px rgba(0,0,0,.12), inset 0 0 0 1px rgba(0,0,0,.04);
      perspective: 300px;
    }
    .rocker {
      display: block; width: 62px; height: 62px; border: 0; padding: 0; border-radius: 2px; cursor: pointer;
      background: linear-gradient(180deg, #fff 0%, #f6f7f5 50%, #dadcd8 100%);
      box-shadow: 0 -1px 0 rgba(0,0,0,.1), 0 3px 3px rgba(0,0,0,.25), inset 0 1px 0 #fff;
      transform: rotateX(12deg); transform-origin: 50% 50%;
      transition: transform .08s cubic-bezier(.3,1.4,.6,1), background .08s, box-shadow .08s;
      -webkit-tap-highlight-color: transparent;
    }
    .rocker[aria-pressed="true"] {
      transform: rotateX(-12deg);
      background: linear-gradient(0deg, #fff 0%, #f6f7f5 50%, #dadcd8 100%);
      box-shadow: 0 1px 0 rgba(0,0,0,.1), 0 -3px 3px rgba(0,0,0,.2), inset 0 -1px 0 #fff;
    }
    .rocker:active { transform: rotateX(0deg); }
    .rocker:focus-visible { outline: 2px solid #3b82f6; outline-offset: 4px; }
  `,
  html: `
    <div class="stage">
      <div class="frame">
        <button class="rocker" type="button" aria-pressed="false" aria-label="rocker switch"></button>
      </div>
    </div>`,
  init(root) {
    const b = root.querySelector('.rocker');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
