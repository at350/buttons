export default {
  id: 'lb-carbon-toggle',
  credit: 'IBM Carbon v11 — Toggle (default 48×24 and small 32×16): gray-60 off, support-success green on, small size draws a check inside the handle',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 32px; font: 400 14px/1.29 "IBM Plex Sans", Inter, -apple-system, system-ui, sans-serif; letter-spacing: .16px; color: #161616; }
    .tg { display: inline-flex; align-items: center; gap: 8px; border: 0; background: none; padding: 0; cursor: pointer; font: inherit; color: inherit; -webkit-tap-highlight-color: transparent; }
    .tr { position: relative; width: 48px; height: 24px; border-radius: 15px; background: #8d8d8d; transition: background 70ms cubic-bezier(.2,0,.38,.9); }
    .tg:hover .tr { background: #6f6f6f; }
    .tg[aria-checked="true"] .tr { background: #24a148; }
    .tg[aria-checked="true"]:hover .tr { background: #198038; }
    .tg:focus-visible { outline: 0; }
    .tg:focus-visible .tr { box-shadow: 0 0 0 1px #fff, 0 0 0 3px #0f62fe; }
    .hd { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform 70ms cubic-bezier(.2,0,.38,.9); display: grid; place-items: center; }
    .tg[aria-checked="true"] .hd { transform: translateX(24px); }
    .hd svg { width: 6px; height: 5px; fill: #24a148; display: none; }
    .sm .tr { width: 32px; height: 16px; }
    .sm .hd { top: 3px; left: 3px; width: 10px; height: 10px; }
    .sm[aria-checked="true"] .hd { transform: translateX(16px); }
    .sm[aria-checked="true"] .hd svg { display: block; }
    .lbl { min-width: 24px; text-align: left; }
  `,
  html: `
    <div class="row">
      <button class="tg" type="button" role="switch" aria-checked="true"><span class="tr"><span class="hd"></span></span><span class="lbl">On</span></button>
      <button class="tg sm" type="button" role="switch" aria-checked="false"><span class="tr"><span class="hd"><svg viewBox="0 0 6 5"><path d="M2.2 2.7L5 0l.8.8L2.2 4.3 0 2.2l.8-.8z"/></svg></span></span><span class="lbl">Off</span></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.tg').forEach((b) => b.addEventListener('click', () => {
      const on = b.getAttribute('aria-checked') !== 'true';
      b.setAttribute('aria-checked', on);
      b.querySelector('.lbl').textContent = on ? 'On' : 'Off';
    }));
  },
};
