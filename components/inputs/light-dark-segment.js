export default {
  id: 'in-light-dark-segment',
  credit: 'Light / Dark segmented theme toggle — the control re-themes itself as the pill slides (Vercel / Linear style)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .seg {
      position: relative; display: inline-flex; padding: 4px; border-radius: 999px; background: #f1f1f0; border: 1px solid #d9d9d5;
      transition: background .3s, border-color .3s; font: 600 13px system-ui, sans-serif;
    }
    .seg.dark { background: #1c1c1e; border-color: #3a3a3c; }
    .pill {
      position: absolute; top: 4px; left: 4px; width: calc(50% - 4px); height: calc(100% - 8px); border-radius: 999px; background: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,.18); transition: transform .3s cubic-bezier(.4,0,.2,1), background .3s;
    }
    .seg.dark .pill { transform: translateX(100%); background: #3a3a3c; box-shadow: 0 1px 3px rgba(0,0,0,.5); }
    .opt {
      position: relative; z-index: 1; flex: 1 1 0; min-width: 88px; border: 0; background: none; padding: 7px 14px; border-radius: 999px;
      color: #8a8a8e; cursor: pointer; display: flex; gap: 6px; align-items: center; justify-content: center; transition: color .3s;
      font: inherit; -webkit-tap-highlight-color: transparent;
    }
    .opt:focus-visible { outline: 2px solid #0a84ff; outline-offset: -2px; }
    .opt[aria-checked="true"] { color: #111; }
    .seg.dark .opt[aria-checked="true"] { color: #fff; }
    .opt svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `,
  html: `<div class="seg" role="radiogroup" aria-label="Theme">
    <span class="pill"></span>
    <button class="opt" type="button" role="radio" aria-checked="true" data-v="light">
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>Light
    </button>
    <button class="opt" type="button" role="radio" aria-checked="false" data-v="dark">
      <svg viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>Dark
    </button>
  </div>`,
  init(root) {
    const seg = root.querySelector('.seg');
    const opts = [...root.querySelectorAll('.opt')];
    const set = (v) => {
      seg.classList.toggle('dark', v === 'dark');
      opts.forEach((o) => o.setAttribute('aria-checked', o.dataset.v === v));
    };
    opts.forEach((o) => o.addEventListener('click', () => set(o.dataset.v)));
    seg.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const v = seg.classList.contains('dark') ? 'light' : 'dark';
        set(v); opts.find((o) => o.dataset.v === v).focus({ preventScroll: true });
      }
    });
  },
};
