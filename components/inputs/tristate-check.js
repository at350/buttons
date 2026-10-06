export default {
  id: 'in-tristate-check',
  credit: 'Tri-state checkbox — click cycles unchecked, indeterminate (dash), checked (Gmail "select all" style)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .cb { width: 40px; height: 40px; border: 0; background: none; padding: 0; cursor: pointer; display: grid; place-items: center; border-radius: 50%; -webkit-tap-highlight-color: transparent; transition: background .15s; }
    .cb:hover { background: rgba(0,0,0,.06); }
    .cb:focus-visible { outline: 3px solid #1a73e8; outline-offset: -2px; }
    .box { position: relative; width: 20px; height: 20px; border-radius: 3px; border: 2px solid #5f6368; background: #fff; transition: background .15s, border-color .15s; }
    .cb[aria-checked="true"] .box, .cb[aria-checked="mixed"] .box { background: #1a73e8; border-color: #1a73e8; }
    .box svg { position: absolute; inset: -2px; width: 20px; height: 20px; fill: none; stroke: #fff; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
    .box path { transition: stroke-dashoffset .2s ease, opacity .1s; }
    .ck { stroke-dasharray: 20; stroke-dashoffset: 20; }
    .dash { stroke-dasharray: 12; stroke-dashoffset: 12; }
    .cb[aria-checked="true"] .ck { stroke-dashoffset: 0; }
    .cb[aria-checked="mixed"] .dash { stroke-dashoffset: 0; }
  `,
  html: `<button class="cb" type="button" role="checkbox" aria-checked="false" aria-label="Tri-state checkbox">
    <span class="box"><svg viewBox="0 0 20 20"><path class="ck" d="M4.5 10.5l3.5 3.5 7.5-8"/><path class="dash" d="M4.5 10h11"/></svg></span>
  </button>`,
  init(root) {
    const b = root.querySelector('.cb');
    const next = { false: 'mixed', mixed: 'true', true: 'false' };
    b.addEventListener('click', () => b.setAttribute('aria-checked', next[b.getAttribute('aria-checked')] || 'false'));
  },
};
