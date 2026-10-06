export default {
  id: 'lb-shadcn-toggle-group',
  credit: 'shadcn/ui — ToggleGroup (outline, multiple): joined bold / italic / underline toggles, data-state=on fills zinc-100',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 16px; }
    .grp { display: inline-flex; border-radius: 6px; box-shadow: 0 1px 2px rgba(0,0,0,.05); }
    .tg { height: 36px; min-width: 36px; padding: 0 10px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; border: 1px solid #e4e4e7; background: #fff; color: #09090b; cursor: pointer; font: 500 14px Inter, -apple-system, system-ui, sans-serif; transition: background .15s, color .15s; -webkit-tap-highlight-color: transparent; margin-left: -1px; }
    .tg:first-child { margin-left: 0; border-radius: 6px 0 0 6px; }
    .tg:last-child { border-radius: 0 6px 6px 0; }
    .tg:hover { background: #f4f4f5; color: #18181b; }
    .tg[aria-pressed="true"] { background: #f4f4f5; color: #18181b; }
    .tg:focus-visible { outline: 0; position: relative; z-index: 1; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #18181b; }
    .tg svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .solo .tg { border-radius: 6px; margin: 0; border-color: transparent; box-shadow: none; }
    .solo .tg:hover { background: #f4f4f5; }
    .solo .tg[aria-pressed="true"] { background: #e4e4e7; }
    .solo .tg[disabled] { opacity: .5; pointer-events: none; }
  `,
  html: `
    <div class="row">
      <div class="grp" role="group" aria-label="Text formatting">
        <button class="tg" type="button" aria-pressed="true" aria-label="Toggle bold"><svg viewBox="0 0 24 24"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg></button>
        <button class="tg" type="button" aria-pressed="false" aria-label="Toggle italic"><svg viewBox="0 0 24 24"><path d="M19 4h-9M14 20H5M15 4 9 20"/></svg></button>
        <button class="tg" type="button" aria-pressed="false" aria-label="Toggle underline"><svg viewBox="0 0 24 24"><path d="M6 4v6a6 6 0 0 0 12 0V4M4 20h16"/></svg></button>
      </div>
      <div class="grp solo" role="group" aria-label="Alignment">
        <button class="tg" type="button" aria-pressed="false" data-one aria-label="Align left"><svg viewBox="0 0 24 24"><path d="M15 12H3M17 18H3M21 6H3"/></svg></button>
        <button class="tg" type="button" aria-pressed="true" data-one aria-label="Align center"><svg viewBox="0 0 24 24"><path d="M17 12H7M19 18H5M21 6H3"/></svg></button>
        <button class="tg" type="button" aria-pressed="false" data-one aria-label="Align right"><svg viewBox="0 0 24 24"><path d="M21 12H9M21 18H7M21 6H3"/></svg></button>
      </div>
    </div>`,
  init(root) {
    const ones = [...root.querySelectorAll('[data-one]')];
    root.querySelectorAll('.tg').forEach((b) => b.addEventListener('click', () => {
      if (b.hasAttribute('data-one')) ones.forEach((o) => o.setAttribute('aria-pressed', o === b));
      else b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true');
    }));
  },
};
