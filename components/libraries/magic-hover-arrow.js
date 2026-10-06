export default {
  id: 'lb-magic-hover-arrow',
  credit: 'Magic UI — Interactive Hover Button: the 8px primary dot scales ×100.8 to flood the pill while "Hover Me" slides out right and the copy + Lucide arrow slides in (300ms)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 24px 36px; border-radius: 12px; background: #fff; display: inline-block; }
    .ih { position: relative; overflow: hidden; display: block; width: auto; padding: 8px 24px; border-radius: 9999px; border: 1px solid #e5e5e5; background: #fff; color: #0a0a0a; font: 600 16px/24px Inter, -apple-system, system-ui, sans-serif; text-align: center; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .ih:focus-visible { outline: 0; box-shadow: 0 0 0 3px rgba(161,161,161,.5); }
    .row { display: flex; align-items: center; justify-content: center; gap: 8px; }
    .dot { width: 8px; height: 8px; border-radius: 9999px; background: #171717; transition: all .3s cubic-bezier(.4,0,.2,1); }
    .t1 { display: inline-block; transition: all .3s cubic-bezier(.4,0,.2,1); }
    .t2 { position: absolute; top: 0; left: 24px; z-index: 10; display: flex; width: 100%; height: 100%; align-items: center; justify-content: center; gap: 8px; color: #fafafa; opacity: 0; transform: translateX(48px); transition: all .3s cubic-bezier(.4,0,.2,1); }
    .t2 svg { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .ih:hover .dot, .ih:focus-visible .dot { transform: scale(100.8); }
    .ih:hover .t1, .ih:focus-visible .t1 { transform: translateX(48px); opacity: 0; }
    .ih:hover .t2, .ih:focus-visible .t2 { transform: translateX(-20px); opacity: 1; }
  `,
  html: `
    <div class="stage">
      <button class="ih" type="button">
        <span class="row"><span class="dot"></span><span class="t1">Hover Me</span></span>
        <span class="t2"><span>Hover Me</span><svg viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span>
      </button>
    </div>`,
};
