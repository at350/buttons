export default {
  id: 'lb-carbon-toggle',
  credit: 'IBM Carbon v11 — Toggle default (48×24, 18px handle) and small (32×16 with the 6×5 checkmark in the handle): $toggle-off #8d8d8d, $support-success #24a148, On / Off state text',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 32px; flex-wrap: wrap; font: 400 14px/18px "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif; letter-spacing: .16px; color: #161616; }
    .tg { display: inline-flex; align-items: center; gap: 8px; border: 0; background: none; padding: 0; cursor: pointer; font: inherit; color: inherit; letter-spacing: inherit; -webkit-tap-highlight-color: transparent; }
    .tr { position: relative; flex: none; width: 48px; height: 24px; border-radius: 12px; background: #8d8d8d; transition: background-color 70ms cubic-bezier(.2,0,1,.9); }
    .tg[aria-checked="true"] .tr { background: #24a148; transition-timing-function: cubic-bezier(0,0,.38,.9); }
    .tg:focus-visible { outline: 0; }
    .tg:focus-visible .tr { box-shadow: 0 0 0 1px #fff, 0 0 0 3px #0f62fe; }
    .hd { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; display: grid; place-items: center; transition: transform 70ms cubic-bezier(.2,0,1,.9); }
    .tg[aria-checked="true"] .hd { transform: translateX(24px); transition-timing-function: cubic-bezier(0,0,.38,.9); }
    .hd svg { width: 6px; height: 5px; fill: #24a148; visibility: hidden; }
    .sm .tr { width: 32px; height: 16px; border-radius: 8px; }
    .sm .hd { width: 10px; height: 10px; }
    .sm[aria-checked="true"] .hd { transform: translateX(16px); }
    .sm[aria-checked="true"] .hd svg { visibility: visible; }
    .lbl { display: grid; }
    .lbl > span { grid-area: 1 / 1; }
    .tg[aria-checked="true"] .off, .tg[aria-checked="false"] .on { visibility: hidden; }
  `,
  html: `
    <div class="row">
      <button class="tg" type="button" role="switch" aria-checked="true" aria-label="Toggle"><span class="tr"><span class="hd"></span></span><span class="lbl"><span class="on">On</span><span class="off">Off</span></span></button>
      <button class="tg sm" type="button" role="switch" aria-checked="false" aria-label="Small toggle"><span class="tr"><span class="hd"><svg viewBox="0 0 6 5"><path d="M2.2 2.7L5 0 6 1 2.2 5 0 2.7 1 1.5z"/></svg></span></span><span class="lbl"><span class="on">On</span><span class="off">Off</span></span></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.tg').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true')));
  },
};
