export default {
  id: 'lb-spectrum-cta',
  credit: 'Adobe Spectrum 2 (React Spectrum S2) — accent fill button (blue-900 #3B63FB → blue-1000), primary outline button (2px gray-800), and the emphasized Switch: 26×16 outlined track whose 8px handle grows to 10px and slides on selection, with S2 press scale',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 16px; flex-wrap: wrap; font: 700 14px/18px "Adobe Clean Spectrum VF", "Adobe Clean", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; color: #292929; }
    .sp { height: 32px; padding: 0 14px; border-radius: 9999px; border: 2px solid transparent; cursor: pointer; font: inherit; display: inline-flex; align-items: center; justify-content: center; gap: 8px; white-space: nowrap; user-select: none;
      transition: background-color .13s ease-in-out, border-color .13s ease-in-out, color .13s ease-in-out, transform .13s ease-in-out; -webkit-tap-highlight-color: transparent; }
    .sp:active { transform: perspective(64px) translateZ(-2px); }
    .sp:focus-visible { outline: 2px solid #4b75ff; outline-offset: 2px; }
    .acc { background: #3b63fb; color: #fff; }
    .acc:hover, .acc:focus-visible, .acc:active { background: #274dea; }
    .pri { background: transparent; color: #292929; border-color: #292929; }
    .pri:hover, .pri:focus-visible, .pri:active { background: #e9e9e9; border-color: #131313; color: #131313; }
    .sw { display: inline-flex; align-items: center; gap: 10px; border: 0; background: none; padding: 0; cursor: pointer; font: 400 14px/18px "Adobe Clean Spectrum VF", "Adobe Clean", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; color: #292929; -webkit-tap-highlight-color: transparent; }
    .sw:hover { color: #131313; }
    .tr { position: relative; flex: none; width: 26px; height: 16px; box-sizing: border-box; border: 2px solid #292929; border-radius: 9999px; background: #fff; transition: background-color .13s ease-in-out, border-color .13s ease-in-out; }
    .sw:hover .tr { border-color: #131313; }
    .sw[aria-checked="true"] .tr { background: #3b63fb; border-color: transparent; }
    .sw[aria-checked="true"]:hover .tr { background: #274dea; }
    .sw:focus-visible { outline: 0; }
    .sw:focus-visible .tr { outline: 2px solid #4b75ff; outline-offset: 2px; }
    .hd { position: absolute; top: 0; left: 0; width: 12px; height: 12px; border-radius: 9999px; background: #292929; transform: perspective(8px) translateZ(-4px); transition: transform .13s ease-in-out, background-color .13s ease-in-out; }
    .sw:hover .hd { background: #131313; }
    .sw[aria-checked="true"] .hd { background: #fff; transform: translateX(10px) perspective(20px) translateZ(-4px); }
    .sw:active .hd { transform: perspective(8px) translateZ(-5px); }
    .sw[aria-checked="true"]:active .hd { transform: translateX(10px) perspective(20px) translateZ(-5px); }
  `,
  html: `
    <div class="row">
      <button class="sp acc" type="button">Get started</button>
      <button class="sp pri" type="button">Learn more</button>
      <button class="sw" type="button" role="switch" aria-checked="true"><span class="tr"><span class="hd"></span></span>Notifications</button>
    </div>`,
  init(root) {
    const sw = root.querySelector('.sw');
    sw.addEventListener('click', () => sw.setAttribute('aria-checked', sw.getAttribute('aria-checked') !== 'true'));
  },
};
