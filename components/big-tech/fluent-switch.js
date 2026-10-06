export default {
  id: 'bt-fluent-switch',
  credit: 'Microsoft Fluent 2 / Windows 11 — toggle switch (knob stretches while pressed)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 12px; font: 400 14px "Segoe UI Variable", "Segoe UI", system-ui, sans-serif; color: #1a1a1a; }
    .sw {
      position: relative; width: 40px; height: 20px; border-radius: 10px; padding: 0; cursor: pointer;
      border: 1px solid #616161; background: transparent; transition: background .15s, border-color .15s;
      -webkit-tap-highlight-color: transparent;
    }
    .sw:hover { border-color: #424242; }
    .sw:hover .knob { background: #424242; }
    .sw:focus-visible { outline: 2px solid #000; outline-offset: 1px; }
    .knob {
      position: absolute; top: 3px; left: 3px; width: 12px; height: 12px; border-radius: 6px; background: #616161;
      transition: left .18s cubic-bezier(.33,0,.67,1), width .18s cubic-bezier(.33,0,.67,1), background .15s;
    }
    .sw:active .knob { width: 17px; }
    .sw[aria-checked="true"] { background: #0f6cbd; border-color: #0f6cbd; }
    .sw[aria-checked="true"]:hover { background: #115ea3; border-color: #115ea3; }
    .sw[aria-checked="true"] .knob, .sw[aria-checked="true"]:hover .knob { left: 23px; background: #fff; }
    .sw[aria-checked="true"]:active .knob { left: 18px; width: 17px; }
    .lbl::after { content: 'Off'; }
    .sw[aria-checked="true"] + .lbl::after { content: 'On'; }
  `,
  html: `
    <label class="row">
      <button class="sw" type="button" role="switch" aria-checked="false" aria-label="Fluent toggle"><span class="knob"></span></button>
      <span class="lbl"></span>
    </label>`,
  init(root) {
    const b = root.querySelector('.sw');
    b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true'));
  },
};
