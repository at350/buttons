// shadcn/ui Button (v4, zinc): default, destructive (with Lucide trash-2) and ghost. State labels are stacked in one
// grid cell so a label change never changes a button's width.
export default {
  id: 'bt-shadcn-trio',
  credit: 'shadcn/ui — default, destructive and ghost Button variants (zinc theme, Lucide icons)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: flex; gap: 8px; align-items: center; white-space: nowrap; }
    .sc {
      height: 36px; padding: 0 16px; border-radius: 8px; border: 1px solid transparent; cursor: pointer;
      font: 500 14px/20px Geist, Inter, ui-sans-serif, system-ui, sans-serif;
      display: inline-flex; align-items: center; justify-content: center; gap: 8px; outline: none;
      transition: all .15s cubic-bezier(.4,0,.2,1); -webkit-tap-highlight-color: transparent;
    }
    .sc:focus-visible { border-color: #9f9fa9; box-shadow: 0 0 0 3px rgba(159,159,169,.5); }
    .def { background: #18181b; color: #fafafa; box-shadow: 0 1px 2px 0 rgba(0,0,0,.05); }
    .def:hover { background: rgba(24,24,27,.9); }
    .des { background: #e7000b; color: #fff; box-shadow: 0 1px 2px 0 rgba(0,0,0,.05); }
    .des:hover { background: rgba(231,0,11,.9); }
    .des:focus-visible { border-color: transparent; box-shadow: 0 0 0 3px rgba(231,0,11,.2); }
    .gho { background: transparent; color: #18181b; }
    .gho:hover, .gho[aria-pressed="true"] { background: #f4f4f5; color: #18181b; }
    .sc svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex: none; }
    .stk { display: grid; }
    .stk > span { grid-area: 1 / 1; text-align: center; }
    .stk .b { visibility: hidden; }
    .on .stk .a { visibility: hidden; }
    .on .stk .b { visibility: visible; }
    .def.on { background: #fff; color: #18181b; border-color: #e4e4e7; }
    .des:disabled { opacity: .5; pointer-events: none; }
    .spin { animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .des .ld { display: none; }
    .des:disabled .ld { display: block; }
    .des:disabled .tr { display: none; }
  `,
  html: `
    <div class="row">
      <button class="sc def" type="button" aria-pressed="false"><span class="stk"><span class="a">Continue</span><span class="b">Done</span></span></button>
      <button class="sc des" type="button">
        <svg class="tr" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        <svg class="ld spin" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        <span class="stk"><span class="a">Delete</span><span class="b">Deleting</span></span>
      </button>
      <button class="sc gho" type="button" aria-pressed="false">Cancel</button>
    </div>`,
  init(root) {
    const def = root.querySelector('.def');
    const des = root.querySelector('.des');
    const gho = root.querySelector('.gho');
    let t;
    def.addEventListener('click', () => { const on = def.classList.toggle('on'); def.setAttribute('aria-pressed', String(on)); });
    des.addEventListener('click', () => {
      des.disabled = true; des.classList.add('on');
      clearTimeout(t); t = setTimeout(() => { des.disabled = false; des.classList.remove('on'); }, 1500);
    });
    gho.addEventListener('click', () => gho.setAttribute('aria-pressed', String(gho.getAttribute('aria-pressed') !== 'true')));
    return () => clearTimeout(t);
  },
};
