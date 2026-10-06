export default {
  id: 'ph-radio-piano-keys',
  credit: '1950s Bakelite radio piano keys (Telefunken style) — ivory keys, one latches down at a time',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: inline-block; padding: 16px 20px 14px; border-radius: 12px; background: radial-gradient(ellipse at 30% 20%, #7a4a2e, #4a2a18 70%, #331b0f); box-shadow: inset 0 1px 0 rgba(255,255,255,.12); }
    .strip { height: 6px; margin: 0 -4px 6px; border-radius: 3px; background: linear-gradient(#fdfdfd, #a7a7a7 50%, #e6e6e6 55%, #6f6f6f); box-shadow: 0 1px 2px rgba(0,0,0,.6); }
    .row { display: flex; gap: 4px; padding: 0 2px 6px; border-radius: 3px; background: #1a0d06; box-shadow: inset 0 3px 6px rgba(0,0,0,.9); }
    .k {
      position: relative; width: 26px; height: 44px; border: 0; padding: 0; margin-top: -8px; border-radius: 3px 3px 2px 2px; cursor: pointer;
      background: linear-gradient(#fff8e6 0%, #efe3c4 60%, #d3c39d 100%);
      box-shadow: inset 0 1px 0 #fff, inset -1px 0 0 rgba(0,0,0,.08), 0 6px 0 #b8a67c, 0 8px 5px rgba(0,0,0,.6);
      transition: transform .08s cubic-bezier(.3,1.3,.6,1), box-shadow .08s, background .08s; -webkit-tap-highlight-color: transparent;
    }
    .k::after { content: ''; position: absolute; left: 4px; right: 4px; top: 6px; height: 2px; border-radius: 1px; background: rgba(0,0,0,.18); }
    .k:hover { background: linear-gradient(#fffcf0, #f4e9cf 60%, #d8c8a3 100%); }
    .k[aria-checked="true"] { transform: translateY(6px); background: linear-gradient(#efe4c9, #e0d2ae 60%, #c7b58d 100%); box-shadow: inset 0 1px 0 #fff, inset -1px 0 0 rgba(0,0,0,.08), 0 1px 0 #b8a67c, 0 2px 2px rgba(0,0,0,.6); }
    .k:active { transform: translateY(7px); }
    .k:focus-visible { outline: 2px solid #ffd27a; outline-offset: 2px; }
  `,
  html: `
    <div class="stage">
      <div class="strip"></div>
      <div class="row" role="radiogroup" aria-label="radio bands">
        <button class="k" type="button" role="radio" aria-checked="true" aria-label="band 1"></button>
        <button class="k" type="button" role="radio" aria-checked="false" aria-label="band 2"></button>
        <button class="k" type="button" role="radio" aria-checked="false" aria-label="band 3"></button>
        <button class="k" type="button" role="radio" aria-checked="false" aria-label="band 4"></button>
        <button class="k" type="button" role="radio" aria-checked="false" aria-label="band 5"></button>
      </div>
    </div>`,
  init(root) {
    const keys = [...root.querySelectorAll('.k')];
    keys.forEach((k) => k.addEventListener('click', () => keys.forEach((o) => o.setAttribute('aria-checked', o === k))));
  },
};
