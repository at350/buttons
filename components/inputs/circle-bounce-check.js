// Todoist task checkbox (priority 1): 18px circle with a 2px #d1453b ring over a 10% tint; hovering previews
// the check in the priority color; completing fills the circle red with a white check, then the title greys and
// strikes through like a completed Todoist task. Todoist red #dc4c3e for focus, text #202020 / #808080.
export default {
  id: 'in-circle-bounce-check',
  credit: 'Todoist task checkbox (priority 1) — red ring with tint, hover previews the check, completing fills it with a pop',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row {
      display: inline-flex; align-items: center; gap: 10px; padding: 8px 14px 8px 10px; border: 0; border-radius: 8px; background: #fff; cursor: pointer;
      font: 400 14px/20px -apple-system, system-ui, "Segoe UI", Roboto, sans-serif; color: #202020; box-shadow: 0 0 0 1px #f0f0f0;
      -webkit-tap-highlight-color: transparent; white-space: nowrap;
    }
    .row:focus-visible { outline: 2px solid #dc4c3e; outline-offset: 2px; }
    .cb {
      position: relative; width: 18px; height: 18px; flex: none; border-radius: 50%; border: 2px solid #d1453b; background: rgba(209,69,59,.1);
      display: grid; place-items: center; color: #d1453b; transition: background-color .15s ease, transform .15s ease;
    }
    .cb svg { width: 10px; height: 10px; fill: none; stroke: currentColor; stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; opacity: 0; transition: opacity .15s ease; }
    .row:hover .cb svg { opacity: 1; }
    .row[aria-checked="true"] .cb { background: #d1453b; color: #fff; animation: pop .3s cubic-bezier(.34,1.56,.64,1); }
    .row[aria-checked="true"] .cb svg { opacity: 1; }
    .row:active .cb { transform: scale(.88); }
    @keyframes pop { 0% { transform: scale(.7); } 60% { transform: scale(1.18); } 100% { transform: scale(1); } }
    .t { position: relative; transition: color .25s ease; }
    .t::after { content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform .25s ease; }
    .row[aria-checked="true"] .t { color: #808080; }
    .row[aria-checked="true"] .t::after { transform: scaleX(1); }
  `,
  html: `<button class="row" type="button" role="checkbox" aria-checked="false">
    <span class="cb"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg></span><span class="t">Review Q4 roadmap</span>
  </button>`,
  init(root) {
    const b = root.querySelector('.row');
    b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true'));
  },
};
