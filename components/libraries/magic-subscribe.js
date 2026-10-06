export default {
  id: 'lb-magic-subscribe',
  credit: 'Magic UI — Animated Subscribe Button: "Follow" slides up and out while "Subscribed ✓" springs in from below (framer-motion y swap)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { padding: 24px 36px; border-radius: 12px; background: #fafafa; display: inline-block; }
    .as { position: relative; overflow: hidden; display: inline-flex; align-items: center; justify-content: center; height: 40px; width: 160px; border-radius: 8px; border: 0; padding: 0; cursor: pointer; background: #18181b; color: #fafafa; font: 500 14px/1 Inter, -apple-system, system-ui, sans-serif; transition: background .3s, color .3s; -webkit-tap-highlight-color: transparent; }
    .as:hover { background: #27272a; }
    .as:active { transform: scale(.98); }
    .as:focus-visible { outline: 0; box-shadow: 0 0 0 2px #fafafa, 0 0 0 4px #18181b; }
    .as[aria-pressed="true"] { background: #fff; color: #18181b; box-shadow: inset 0 0 0 1px #e4e4e7; }
    .as[aria-pressed="true"]:hover { background: #f4f4f5; }
    .ly { position: absolute; inset: 0; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: transform .35s cubic-bezier(.34,1.56,.64,1), opacity .25s; }
    .ly svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .a { transform: translateY(0); opacity: 1; }
    .b { transform: translateY(50px); opacity: 0; }
    .as[aria-pressed="true"] .a { transform: translateY(-50px); opacity: 0; }
    .as[aria-pressed="true"] .b { transform: translateY(0); opacity: 1; }
    .b svg { color: #16a34a; }
  `,
  html: `
    <div class="stage">
      <button class="as" type="button" aria-pressed="false">
        <span class="ly a"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M19 8v6M22 11h-6"/><circle cx="9" cy="7" r="4"/></svg>Follow</span>
        <span class="ly b"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Subscribed</span>
      </button>
    </div>`,
  init(root) {
    const b = root.querySelector('.as');
    b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'));
  },
};
