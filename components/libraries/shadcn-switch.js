export default {
  id: 'lb-shadcn-switch',
  credit: 'shadcn/ui (new-york v4) — Switch with Label "Airplane Mode": 32×18.4 track (bg-input → bg-primary), size-4 thumb sliding calc(100% − 2px), shadow-xs, 3px ring/50 focus; plus the dark-theme rendering',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 20px; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; color: #0a0a0a; }
    .it { display: inline-flex; align-items: center; gap: 8px; }
    .sw { display: inline-flex; flex: none; align-items: center; width: 32px; height: 1.15rem; padding: 0; border-radius: 9999px; border: 1px solid transparent; background: #e5e5e5; box-shadow: 0 1px 2px rgba(0,0,0,.05); cursor: pointer; outline: none; transition: all .15s cubic-bezier(.4,0,.2,1); -webkit-tap-highlight-color: transparent; }
    .sw[aria-checked="true"] { background: #171717; }
    .sw:focus-visible { border-color: #a1a1a1; box-shadow: 0 0 0 3px rgba(161,161,161,.5); }
    .th { display: block; width: 16px; height: 16px; border-radius: 9999px; background: #fff; pointer-events: none; transition: transform .15s cubic-bezier(.4,0,.2,1); }
    .sw[aria-checked="true"] .th { transform: translateX(calc(100% - 2px)); }
    .lbl { cursor: pointer; user-select: none; line-height: 1; }
    .dark { padding: 12px 16px; border-radius: 12px; background: #0a0a0a; color: #fafafa; }
    .dark .sw { background: rgba(255,255,255,.12); }
    .dark .sw[aria-checked="true"] { background: #e5e5e5; }
    .dark .th { background: #fafafa; }
    .dark .sw[aria-checked="true"] .th { background: #171717; }
    .dark .sw:focus-visible { border-color: #737373; box-shadow: 0 0 0 3px rgba(115,115,115,.5); }
  `,
  html: `
    <div class="row">
      <span class="it"><button class="sw" type="button" role="switch" aria-checked="false" id="a"><span class="th"></span></button><label class="lbl" for="a">Airplane Mode</label></span>
      <span class="it dark"><button class="sw" type="button" role="switch" aria-checked="true" id="b"><span class="th"></span></button><label class="lbl" for="b">Airplane Mode</label></span>
    </div>`,
  init(root) {
    root.querySelectorAll('.sw').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true')));
  },
};
