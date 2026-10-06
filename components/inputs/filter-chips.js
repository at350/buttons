export default {
  id: 'in-filter-chips',
  credit: 'Google Material 3 filter chips — outlined pill that fills and grows a leading check when selected',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; flex-wrap: wrap; gap: 8px; }
    .chip {
      display: inline-flex; align-items: center; height: 32px; padding: 0 16px 0 8px; border-radius: 8px; border: 1px solid #79747e; background: #fff;
      font: 500 14px system-ui, sans-serif; color: #49454f; cursor: pointer; transition: background .2s, border-color .2s, color .2s, box-shadow .2s; -webkit-tap-highlight-color: transparent;
    }
    .chip:hover { background: #f3edf7; }
    .chip:focus-visible { outline: 2px solid #6750a4; outline-offset: 1px; }
    .chip[aria-pressed="true"] { background: #e8def8; border-color: #e8def8; color: #1d192b; }
    .chip[aria-pressed="true"]:hover { box-shadow: 0 1px 3px rgba(0,0,0,.2); }
    .chip svg { width: 18px; height: 18px; margin-right: 0; fill: none; stroke: #1d192b; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; transition: width .2s, margin .2s; }
    .chip:not([aria-pressed="true"]) svg { width: 0; margin-left: 8px; }
    .chip[aria-pressed="true"] svg { margin-right: 8px; }
    .chip svg path { stroke-dasharray: 20; stroke-dashoffset: 20; transition: stroke-dashoffset .25s .1s; }
    .chip[aria-pressed="true"] svg path { stroke-dashoffset: 0; }
  `,
  html: `<div class="row">
    <button class="chip" type="button" aria-pressed="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Free</button>
    <button class="chip" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Open</button>
    <button class="chip" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>Nearby</button>
  </div>`,
  init(root) {
    root.querySelectorAll('.chip').forEach((c) => c.addEventListener('click', () => c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true')));
  },
};
