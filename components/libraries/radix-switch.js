export default {
  id: 'lb-radix-switch',
  credit: 'Radix Themes — Switch size 2 (35×20): soft gray inset track, surface variant, and the high-contrast variant that fills indigo-12 when on',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 20px; }
    .sw { position: relative; width: 35px; height: 20px; border-radius: 9999px; border: 0; padding: 0; cursor: pointer; background: rgba(0,0,27,.07); box-shadow: inset 0 0 0 1px rgba(0,0,30,.12), inset 0 1px 2px rgba(0,0,30,.1); transition: background .18s, box-shadow .18s; -webkit-tap-highlight-color: transparent; }
    .sw:focus-visible { outline: 2px solid #8da4ef; outline-offset: 2px; }
    .sw[aria-checked="true"] { background: #3e63dd; box-shadow: none; }
    .sw.hc[aria-checked="true"] { background: #1f2d5c; }
    .sw.surface { background: rgba(255,255,255,.9); box-shadow: inset 0 0 0 1px #abbdf9; }
    .sw.surface[aria-checked="true"] { background: #e1e9ff; box-shadow: inset 0 0 0 1px #abbdf9; }
    .th { position: absolute; top: 1px; left: 1px; width: 18px; height: 18px; border-radius: 50%; background: #fff; box-shadow: 0 1px 3px rgba(0,0,30,.2), 0 0 0 1px rgba(0,0,30,.08); transition: transform .18s cubic-bezier(.45,.05,.55,.95), background .18s; pointer-events: none; }
    .sw[aria-checked="true"] .th { transform: translateX(15px); }
    .sw.surface[aria-checked="true"] .th { background: #3e63dd; box-shadow: 0 1px 3px rgba(0,0,30,.2); }
    .sw:active .th { transform: scale(.94); }
    .sw[aria-checked="true"]:active .th { transform: translateX(15px) scale(.94); }
    .sw[disabled] { opacity: .5; cursor: not-allowed; }
  `,
  html: `
    <div class="row">
      <button class="sw" type="button" role="switch" aria-checked="true" aria-label="Default"><span class="th"></span></button>
      <button class="sw surface" type="button" role="switch" aria-checked="false" aria-label="Surface"><span class="th"></span></button>
      <button class="sw hc" type="button" role="switch" aria-checked="true" aria-label="High contrast"><span class="th"></span></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.sw').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true')));
  },
};
