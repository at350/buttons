export default {
  id: 'bt-ios-toggle',
  credit: 'Apple iOS — Settings "Airplane Mode" row with the UISwitch (51×31, system green, knob stretches while pressed)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; align-items: center; gap: 12px; width: 300px; max-width: 100%; min-height: 44px; padding: 6px 16px 6px 16px; border-radius: 10px; background: #fff; font: 400 17px/22px -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif; letter-spacing: -.41px; color: #000; -webkit-font-smoothing: antialiased; }
    .ic { flex: none; width: 29px; height: 29px; border-radius: 7px; background: #ff9500; display: grid; place-items: center; }
    .ic svg { width: 19px; height: 19px; fill: #fff; transform: rotate(90deg); }
    .lb { flex: 1; min-width: 0; white-space: nowrap; }
    .sw { flex: none; }
    .sw {
      position: relative; width: 51px; height: 31px; border-radius: 16px; border: 0; padding: 0;
      background: #e9e9eb; cursor: pointer; -webkit-tap-highlight-color: transparent;
      transition: background-color .35s cubic-bezier(.32,.72,0,1);
    }
    .sw:focus-visible { outline: 3px solid rgba(0,122,255,.6); outline-offset: 2px; }
    .knob {
      position: absolute; top: 2px; left: 2px; width: 27px; height: 27px; border-radius: 13.5px;
      background: #fff; box-shadow: 0 3px 8px rgba(0,0,0,.15), 0 3px 1px rgba(0,0,0,.06);
      transition: transform .35s cubic-bezier(.32,.72,0,1), width .25s cubic-bezier(.32,.72,0,1);
    }
    .sw:active .knob { width: 34px; }
    .sw[aria-checked="true"] { background: #34c759; }
    .sw[aria-checked="true"] .knob { transform: translateX(20px); }
    .sw[aria-checked="true"]:active .knob { transform: translateX(13px); }
  `,
  html: `<div class="row"><span class="ic" aria-hidden="true"><svg viewBox="0 -960 960 960"><path d="M480-120 377-91q-14 4-25.5-4.5T340-118q0-12 3-19.5t8-11.5l69-51v-220l-291 86q-19 5-34-6t-15-31q0-15 5-25t14-15l321-189v-220q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v220l321 189q9 5 14 15t5 25q0 20-15 31t-34 6l-291-86v220l69 51q5 4 8 11.5t3 19.5q0 14-11.5 22.5T583-91l-103-29Z"/></svg></span><span class="lb">Airplane Mode</span><button class="sw" type="button" role="switch" aria-checked="false" aria-label="Airplane Mode"><span class="knob"></span></button></div>`,
  init(root) {
    const b = root.querySelector('.sw');
    b.addEventListener('click', () => b.setAttribute('aria-checked', String(b.getAttribute('aria-checked') !== 'true')));
  },
};
