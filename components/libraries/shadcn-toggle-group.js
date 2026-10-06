export default {
  id: 'lb-shadcn-toggle-group',
  credit: 'shadcn/ui (new-york v4) — ToggleGroup variant="outline" type="multiple" (joined, h-9 min-w-9 px-2, hover bg-muted, data-state=on bg-accent) with Lucide bold / italic / underline, plus a default single-select alignment group',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 16px; flex-wrap: wrap; }
    .grp { display: flex; width: fit-content; align-items: center; border-radius: 8px; }
    .grp.ol { box-shadow: 0 1px 2px rgba(0,0,0,.05); }
    .tg { height: 36px; min-width: 36px; padding: 0 8px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; border-radius: 0; background: transparent; color: #0a0a0a; cursor: pointer; font: 500 14px/20px Inter, -apple-system, system-ui, sans-serif; white-space: nowrap; outline: none; transition: color .15s cubic-bezier(.4,0,.2,1), box-shadow .15s cubic-bezier(.4,0,.2,1), background-color .15s; -webkit-tap-highlight-color: transparent; }
    .tg:first-child { border-radius: 8px 0 0 8px; } .tg:last-child { border-radius: 0 8px 8px 0; }
    .ol .tg { border: 1px solid #e5e5e5; border-left-width: 0; }
    .ol .tg:first-child { border-left-width: 1px; }
    .tg:hover { background: #f5f5f5; color: #737373; }
    .ol .tg:hover { color: #171717; }
    .tg[aria-pressed="true"] { background: #f5f5f5; color: #171717; }
    .tg:focus-visible { position: relative; z-index: 1; border-color: #a1a1a1; box-shadow: 0 0 0 3px rgba(161,161,161,.5); }
    .tg svg { width: 16px; height: 16px; flex: none; pointer-events: none; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `
    <div class="row">
      <div class="grp ol" role="group" aria-label="Text formatting">
        <button class="tg" type="button" aria-pressed="true" aria-label="Toggle bold"><svg viewBox="0 0 24 24"><path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg></button>
        <button class="tg" type="button" aria-pressed="false" aria-label="Toggle italic"><svg viewBox="0 0 24 24"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg></button>
        <button class="tg" type="button" aria-pressed="false" aria-label="Toggle underline"><svg viewBox="0 0 24 24"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg></button>
      </div>
      <div class="grp" role="group" aria-label="Alignment">
        <button class="tg" type="button" aria-pressed="false" data-one aria-label="Align left"><svg viewBox="0 0 24 24"><path d="M21 5H3"/><path d="M15 12H3"/><path d="M17 19H3"/></svg></button>
        <button class="tg" type="button" aria-pressed="true" data-one aria-label="Align center"><svg viewBox="0 0 24 24"><path d="M21 5H3"/><path d="M17 12H7"/><path d="M19 19H5"/></svg></button>
        <button class="tg" type="button" aria-pressed="false" data-one aria-label="Align right"><svg viewBox="0 0 24 24"><path d="M21 5H3"/><path d="M21 12H9"/><path d="M21 19H7"/></svg></button>
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
