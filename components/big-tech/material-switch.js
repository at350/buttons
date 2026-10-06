// Material 3 switch (Material Web tokens): 52×32 track, 16dp handle that grows to 24dp when selected (28dp while
// pressed), check icon on the selected handle, 40dp state layer around the handle, overshoot travel curve.
export default {
  id: 'bt-material-switch',
  credit: 'Google Material 3 — switch with growing handle, check icon and state layer (Material Web)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sw {
      position: relative; width: 52px; height: 32px; margin: 4px; border-radius: 16px; padding: 0;
      border: 2px solid #79747e; background: #e6e0e9; cursor: pointer; outline: none;
      transition: background-color 67ms linear, border-color 67ms linear; -webkit-tap-highlight-color: transparent;
    }
    .sw:focus-visible { box-shadow: 0 0 0 2px #fef7ff, 0 0 0 5px #625b71; }
    .hc { position: absolute; top: 50%; left: 14px; width: 0; height: 0; transition: left 300ms cubic-bezier(.175,.885,.32,1.275); }
    .sl { position: absolute; left: -20px; top: -20px; width: 40px; height: 40px; border-radius: 50%; background: #1d1b20; opacity: 0; transition: opacity 15ms linear; }
    .sw:hover .sl { opacity: .08; }
    .sw:active .sl, .sw:focus-visible .sl { opacity: .1; }
    .hd {
      position: absolute; left: -8px; top: -8px; width: 16px; height: 16px; border-radius: 50%; background: #79747e;
      display: flex; align-items: center; justify-content: center;
      transition: all 250ms cubic-bezier(.2,0,0,1);
    }
    .hd svg { width: 16px; height: 16px; fill: #21005d; opacity: 0; transform: rotate(-45deg); transition: opacity 67ms linear, transform 167ms cubic-bezier(.2,0,0,1); }
    .sw:hover .hd { background: #49454f; }
    .sw:active .hd { left: -14px; top: -14px; width: 28px; height: 28px; background: #49454f; }
    .sw[aria-checked="true"] { background: #6750a4; border-color: #6750a4; }
    .sw[aria-checked="true"] .hc { left: 34px; }
    .sw[aria-checked="true"] .sl { background: #6750a4; }
    .sw[aria-checked="true"] .hd { left: -12px; top: -12px; width: 24px; height: 24px; background: #fff; }
    .sw[aria-checked="true"]:hover .hd { background: #eaddff; }
    .sw[aria-checked="true"]:active .hd { left: -14px; top: -14px; width: 28px; height: 28px; background: #eaddff; }
    .sw[aria-checked="true"] .hd svg { opacity: 1; transform: none; }
  `,
  html: `
    <button class="sw" type="button" role="switch" aria-checked="false" aria-label="Wi-Fi">
      <span class="hc"><span class="sl"></span><span class="hd"><svg viewBox="0 -960 960 960" aria-hidden="true"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></span></span>
    </button>`,
  init(root) {
    const b = root.querySelector('.sw');
    b.addEventListener('click', () => b.setAttribute('aria-checked', String(b.getAttribute('aria-checked') !== 'true')));
  },
};
