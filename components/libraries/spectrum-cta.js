export default {
  id: 'lb-spectrum-cta',
  credit: 'Adobe Spectrum 2 — Accent (CTA) pill button, Primary outline button and the emphasized Switch (blue-900 track) with a label',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 16px; flex-wrap: wrap; font: 700 14px/1 "Adobe Clean", Inter, -apple-system, system-ui, sans-serif; color: #222; }
    .sp { height: 32px; padding: 0 16px; border-radius: 16px; border: 2px solid transparent; cursor: pointer; font: inherit; display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; transition: background .13s ease-out, border-color .13s, color .13s, transform .13s; -webkit-tap-highlight-color: transparent; }
    .sp:active { transform: scale(.97); }
    .sp:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #1473e6; }
    .acc { background: #0265dc; color: #fff; }
    .acc:hover { background: #0054b6; }
    .acc:active, .acc[aria-pressed="true"] { background: #004491; }
    .pri { background: transparent; color: #222; border-color: #222; }
    .pri:hover { background: #222; color: #fff; }
    .pri[aria-pressed="true"] { background: #222; color: #fff; }
    .sw { display: inline-flex; align-items: center; gap: 10px; border: 0; background: none; padding: 0; cursor: pointer; font: 400 14px/1 "Adobe Clean", Inter, system-ui, sans-serif; color: #222; -webkit-tap-highlight-color: transparent; }
    .tr { position: relative; width: 26px; height: 14px; border-radius: 7px; background: #b3b3b3; transition: background .13s; }
    .sw:hover .tr { background: #909090; }
    .sw[aria-checked="true"] .tr { background: #0265dc; }
    .sw[aria-checked="true"]:hover .tr { background: #0054b6; }
    .sw:focus-visible { outline: 0; }
    .sw:focus-visible .tr { box-shadow: 0 0 0 2px #fff, 0 0 0 4px #1473e6; }
    .hd { position: absolute; top: -2px; left: -2px; width: 18px; height: 18px; border-radius: 50%; background: #fff; border: 2px solid #b3b3b3; transition: transform .13s ease-out, border-color .13s; }
    .sw:hover .hd { border-color: #909090; }
    .sw[aria-checked="true"] .hd { transform: translateX(12px); border-color: #0265dc; }
    .sw[aria-checked="true"]:hover .hd { border-color: #0054b6; }
  `,
  html: `
    <div class="row">
      <button class="sp acc" type="button" aria-pressed="false">Get started</button>
      <button class="sp pri" type="button" aria-pressed="false">Learn more</button>
      <button class="sw" type="button" role="switch" aria-checked="true"><span class="tr"><span class="hd"></span></span>Notifications</button>
    </div>`,
  init(root) {
    root.querySelectorAll('.sp').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
    const sw = root.querySelector('.sw');
    sw.addEventListener('click', () => sw.setAttribute('aria-checked', sw.getAttribute('aria-checked') !== 'true'));
  },
};
