// Material 3 switch (Android) — values from @material/web md-switch tokens (baseline scheme):
// track 52×32, 2px outline, handle 16 → 24 (selected) → 28 (pressed), 40px state layer,
// handle travel 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275) (the overshoot "squash"),
// handle size 250ms cubic-bezier(0.2, 0, 0, 1), icons = md-switch's own check / close paths.
export default {
  id: 'in-squash-toggle',
  credit: 'Google Material 3 switch (Android) — handle grows 16 → 24 → 28dp and overshoots across the track, check / close icons',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .w { display: inline-flex; gap: 20px; padding: 4px; }
    .sw {
      position: relative; width: 52px; height: 32px; border: 0; padding: 0; background: none; cursor: pointer; outline: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .track {
      position: absolute; inset: 0; border-radius: 9999px; background: #e6e0e9; box-shadow: inset 0 0 0 2px #79747e;
      transition: background-color 67ms linear, box-shadow 67ms linear;
    }
    .sw[aria-checked="true"] .track { background: #6750a4; box-shadow: none; }
    .sw:focus-visible .track { outline: 3px solid #625b71; outline-offset: 2px; }
    .hc {
      position: absolute; top: 0; left: 0; width: 32px; height: 32px; display: grid; place-items: center;
      transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .sw[aria-checked="true"] .hc { transform: translateX(20px); }
    .hc::before {
      content: ''; position: absolute; left: -4px; top: -4px; width: 40px; height: 40px; border-radius: 50%;
      background: #1d1b20; opacity: 0; transition: opacity 15ms linear, background-color 67ms linear;
    }
    .sw[aria-checked="true"] .hc::before { background: #6750a4; }
    .sw:hover .hc::before { opacity: .08; }
    .sw:active .hc::before { opacity: .12; }
    .h {
      position: relative; width: 16px; height: 16px; border-radius: 9999px; background: #79747e; display: grid; place-items: center;
      transition: width 250ms cubic-bezier(0.2, 0, 0, 1), height 250ms cubic-bezier(0.2, 0, 0, 1), background-color 67ms linear;
    }
    .sw:hover .h { background: #49454f; }
    .sw.icons .h { width: 24px; height: 24px; }
    .sw[aria-checked="true"] .h { width: 24px; height: 24px; background: #fff; }
    .sw[aria-checked="true"]:hover .h { background: #eaddff; }
    .sw:active .h, .sw[aria-checked="true"]:active .h { width: 28px; height: 28px; transition-duration: 100ms; transition-timing-function: linear; }
    .sw[aria-checked="true"]:active .h { background: #eaddff; }
    .h svg { position: absolute; width: 16px; height: 16px; transition: opacity 33ms linear, transform 167ms cubic-bezier(0.2, 0, 0, 1); }
    .on { fill: #6750a4; opacity: 0; transform: rotate(-45deg); }
    .off { fill: #e6e0e9; opacity: 0; }
    .sw[aria-checked="true"] .on { opacity: 1; transform: none; }
    .sw.icons[aria-checked="false"] .off { opacity: 1; }
  `,
  html: `<div class="w">
    <button class="sw" type="button" role="switch" aria-checked="true" aria-label="Wi-Fi">
      <span class="track"></span><span class="hc"><span class="h">
        <svg class="on" viewBox="0 0 24 24"><path d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z"/></svg>
        <svg class="off" viewBox="0 0 24 24"><path d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z"/></svg>
      </span></span>
    </button>
    <button class="sw icons" type="button" role="switch" aria-checked="false" aria-label="Bluetooth">
      <span class="track"></span><span class="hc"><span class="h">
        <svg class="on" viewBox="0 0 24 24"><path d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z"/></svg>
        <svg class="off" viewBox="0 0 24 24"><path d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z"/></svg>
      </span></span>
    </button>
  </div>`,
  init(root) {
    root.querySelectorAll('.sw').forEach((b) =>
      b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true')));
  },
};
