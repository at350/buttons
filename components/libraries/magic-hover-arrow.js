export default {
  id: 'lb-magic-hover-arrow',
  credit: 'Magic UI — Interactive Hover Button: the little dot blows up to fill the pill while the label and an arrow slide in from the left',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 24px 36px; border-radius: 12px; background: #fff; display: inline-block; }
    .ih { position: relative; overflow: hidden; display: inline-flex; align-items: center; width: 160px; height: 44px; padding: 0 24px; border-radius: 9999px; border: 1px solid #e4e4e7; background: #fff; color: #18181b; font: 600 14px/1 Inter, -apple-system, system-ui, sans-serif; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .ih:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fff, 0 0 0 4px #18181b; }
    .ih:active { transform: scale(.98); }
    .dot { position: absolute; left: 24px; top: 50%; width: 8px; height: 8px; margin-top: -4px; border-radius: 50%; background: #18181b; transition: transform .3s cubic-bezier(.4,0,.2,1), background .3s; transform-origin: center; }
    .t1 { position: relative; z-index: 1; margin-left: 20px; transition: transform .3s, opacity .3s; }
    .t2 { position: absolute; inset: 0; z-index: 2; display: flex; align-items: center; justify-content: center; gap: 8px; color: #fafafa; transform: translateX(48px); opacity: 0; transition: transform .3s cubic-bezier(.4,0,.2,1), opacity .3s; }
    .t2 svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .ih:hover .dot, .ih[aria-pressed="true"] .dot { transform: scale(60); }
    .ih:hover .t1, .ih[aria-pressed="true"] .t1 { transform: translateX(48px); opacity: 0; }
    .ih:hover .t2, .ih[aria-pressed="true"] .t2 { transform: translateX(0); opacity: 1; }
    .ih[aria-pressed="true"] .dot { background: #2563eb; }
  `,
  html: `
    <div class="stage">
      <button class="ih" type="button" aria-pressed="false">
        <span class="dot"></span>
        <span class="t1">Hover Me</span>
        <span class="t2">Hover Me<svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.ih');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
