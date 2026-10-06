export default {
  id: 'lb-shadcn-switch',
  credit: 'shadcn/ui — Switch (Radix) with label, zinc theme: 44×24 track, 20px thumb, ring offset on focus',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 8px; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; color: #09090b; }
    .sw { position: relative; width: 44px; height: 24px; flex: none; border-radius: 9999px; border: 2px solid transparent; background: #e4e4e7; padding: 0; cursor: pointer; transition: background .15s; -webkit-tap-highlight-color: transparent; }
    .sw:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #18181b; }
    .sw[aria-checked="true"] { background: #18181b; }
    .sw[disabled] { opacity: .5; cursor: not-allowed; }
    .th { position: absolute; top: 0; left: 0; width: 20px; height: 20px; border-radius: 50%; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.1); transition: transform .15s cubic-bezier(.4,0,.2,1); pointer-events: none; }
    .sw[aria-checked="true"] .th { transform: translateX(20px); }
    .lbl { cursor: pointer; user-select: none; }
    .dark { display: inline-flex; align-items: center; gap: 8px; margin-left: 20px; padding: 12px 16px; border-radius: 12px; background: #09090b; color: #fafafa; }
    .dark .sw { background: #27272a; }
    .dark .sw[aria-checked="true"] { background: #fafafa; }
    .dark .sw[aria-checked="true"] .th { background: #18181b; }
    .dark .sw:focus-visible { box-shadow: 0 0 0 2px #09090b, 0 0 0 4px #d4d4d8; }
  `,
  html: `
    <div class="row">
      <button class="sw" type="button" role="switch" aria-checked="false" id="a"><span class="th"></span></button>
      <label class="lbl" for="a">Airplane Mode</label>
      <span class="dark">
        <button class="sw" type="button" role="switch" aria-checked="true" id="b"><span class="th"></span></button>
        <label class="lbl" for="b">Dark</label>
      </span>
    </div>`,
  init(root) {
    root.querySelectorAll('.sw').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true')));
  },
};
