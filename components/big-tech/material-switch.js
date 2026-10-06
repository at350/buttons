export default {
  id: 'bt-material-switch',
  credit: 'Google Material 3 — switch (handle grows and shows a check when on)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .sw {
      position: relative; width: 52px; height: 32px; border-radius: 16px;
      border: 2px solid #79747e; background: #e6e0e9; cursor: pointer; padding: 0;
      transition: background .2s, border-color .2s; -webkit-tap-highlight-color: transparent;
    }
    .sw:focus-visible { outline: 3px solid #6750a4; outline-offset: 2px; }
    .knob {
      position: absolute; top: 50%; left: 6px; width: 16px; height: 16px; border-radius: 50%;
      background: #79747e; transform: translateY(-50%);
      transition: left .2s cubic-bezier(.2,0,0,1), width .2s cubic-bezier(.2,0,0,1), height .2s, background .2s;
      display: flex; align-items: center; justify-content: center;
    }
    .knob svg { width: 16px; height: 16px; opacity: 0; transform: scale(.5); transition: opacity .15s, transform .2s; color: #6750a4; }
    .sw:hover .knob { background: #49454f; }
    .sw:active .knob { width: 28px; height: 28px; left: 0; }
    .sw[aria-checked="true"] { background: #6750a4; border-color: #6750a4; }
    .sw[aria-checked="true"] .knob { left: 22px; width: 24px; height: 24px; background: #fff; }
    .sw[aria-checked="true"]:hover .knob { background: #e8def8; }
    .sw[aria-checked="true"]:active .knob { width: 28px; height: 28px; left: 20px; }
    .sw[aria-checked="true"] .knob svg { opacity: 1; transform: scale(1); }
  `,
  html: `
    <button class="sw" type="button" role="switch" aria-checked="false" aria-label="Material switch">
      <span class="knob"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.55 18 3.85 12.3l1.4-1.4 4.3 4.3 9.2-9.2 1.4 1.4z"/></svg></span>
    </button>`,
  init(root) {
    const b = root.querySelector('.sw');
    b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true'));
  },
};
