export default {
  id: 'bt-shadcn-trio',
  credit: 'shadcn/ui — default, destructive and ghost button variants (zinc theme)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
    .sc {
      height: 36px; padding: 0 16px; border-radius: 6px; border: 0; cursor: pointer; white-space: nowrap;
      font: 500 14px/36px Inter, -apple-system, "Segoe UI", system-ui, sans-serif;
      display: inline-flex; align-items: center; gap: 8px; transition: background .15s, color .15s; -webkit-tap-highlight-color: transparent;
    }
    .sc:focus-visible { outline: none; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #18181b; }
    .def { background: #18181b; color: #fafafa; }
    .def:hover { background: rgba(24,24,27,.9); }
    .des { background: #ef4444; color: #fafafa; }
    .des:hover { background: rgba(239,68,68,.9); }
    .des:focus-visible { box-shadow: 0 0 0 2px #fff, 0 0 0 4px #ef4444; }
    .gho { background: transparent; color: #18181b; }
    .gho:hover { background: #f4f4f5; }
    .sc svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .def[aria-pressed="true"] { background: #fafafa; color: #18181b; box-shadow: inset 0 0 0 1px #e4e4e7; }
    .def .lbl::after { content: 'Continue'; }
    .def[aria-pressed="true"] .lbl::after { content: 'Done'; }
    .des.gone { opacity: .35; pointer-events: none; }
    .des .lbl::after { content: 'Delete'; }
    .des.gone .lbl::after { content: 'Deleted'; }
    .gho[aria-pressed="true"] { background: #e4e4e7; }
  `,
  html: `
    <div class="row">
      <button class="sc def" type="button" aria-pressed="false"><span class="lbl"></span></button>
      <button class="sc des" type="button"><svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6h12z"/></svg><span class="lbl"></span></button>
      <button class="sc gho" type="button" aria-pressed="false">Ghost</button>
    </div>`,
  init(root) {
    const def = root.querySelector('.def');
    const des = root.querySelector('.des');
    const gho = root.querySelector('.gho');
    let t;
    def.addEventListener('click', () => def.setAttribute('aria-pressed', def.getAttribute('aria-pressed') !== 'true'));
    des.addEventListener('click', () => { des.classList.add('gone'); clearTimeout(t); t = setTimeout(() => des.classList.remove('gone'), 1500); });
    gho.addEventListener('click', () => gho.setAttribute('aria-pressed', gho.getAttribute('aria-pressed') !== 'true'));
    return () => clearTimeout(t);
  },
};
