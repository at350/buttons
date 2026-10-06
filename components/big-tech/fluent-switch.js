// Windows 11 (WinUI 3) ToggleSwitch, light theme: 40×20 pill, 12px knob that grows to 14px on hover and stretches to
// 17px while pressed, accent fill when on, "Off" / "On" content beside it (stacked so the row width never changes).
export default {
  id: 'bt-fluent-switch',
  credit: 'Microsoft Windows 11 / Fluent — WinUI ToggleSwitch (knob grows on hover, stretches while pressed)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 12px; font: 400 14px/20px "Segoe UI Variable Text", "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif; color: rgba(0,0,0,.894); cursor: pointer; white-space: nowrap; }
    .sw {
      position: relative; width: 40px; height: 20px; border-radius: 10px; padding: 0; cursor: pointer; flex: none;
      border: 1px solid rgba(0,0,0,.6063); background: rgba(0,0,0,.0241); outline: none;
      transition: background-color .083s linear, border-color .083s linear; -webkit-tap-highlight-color: transparent;
    }
    .sw:hover { background: rgba(0,0,0,.0578); }
    .sw:active { background: rgba(0,0,0,.0924); }
    .sw:focus-visible { box-shadow: 0 0 0 1px #fff, 0 0 0 3px rgba(0,0,0,.8956); }
    .knob {
      position: absolute; top: 50%; left: 3px; width: 12px; height: 12px; margin-top: -6px; border-radius: 7px; background: rgba(0,0,0,.6063);
      transition: left .167s cubic-bezier(0,0,0,1), width .167s cubic-bezier(0,0,0,1), height .167s cubic-bezier(0,0,0,1), margin .167s cubic-bezier(0,0,0,1), background-color .083s linear;
    }
    .sw:hover .knob { width: 14px; height: 14px; margin-top: -7px; left: 2px; }
    .sw:active .knob { width: 17px; height: 14px; margin-top: -7px; left: 2px; }
    .sw[aria-checked="true"] { background: #005fb8; border-color: #005fb8; }
    .sw[aria-checked="true"]:hover { background: rgba(0,95,184,.9); border-color: transparent; }
    .sw[aria-checked="true"]:active { background: rgba(0,95,184,.8); }
    .sw[aria-checked="true"] .knob { left: 23px; background: #fff; }
    .sw[aria-checked="true"]:hover .knob { left: 22px; }
    .sw[aria-checked="true"]:active .knob { left: 19px; }
    .lbl { display: grid; }
    .lbl span { grid-area: 1 / 1; }
    .lbl .b { visibility: hidden; }
    .sw[aria-checked="true"] + .lbl .a { visibility: hidden; }
    .sw[aria-checked="true"] + .lbl .b { visibility: visible; }
  `,
  html: `
    <label class="row">
      <button class="sw" type="button" role="switch" aria-checked="false" aria-label="Bluetooth"><span class="knob"></span></button>
      <span class="lbl" aria-hidden="true"><span class="a">Off</span><span class="b">On</span></span>
    </label>`,
  init(root) {
    const b = root.querySelector('.sw');
    b.addEventListener('click', () => b.setAttribute('aria-checked', String(b.getAttribute('aria-checked') !== 'true')));
  },
};
