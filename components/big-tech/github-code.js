export default {
  id: 'bt-github-code',
  credit: 'GitHub — green "<> Code" dropdown button (opens clone menu)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .wrap { position: relative; display: inline-block; font: 500 14px/20px -apple-system, "Segoe UI", system-ui, sans-serif; }
    .gh {
      height: 32px; padding: 5px 12px; border: 1px solid rgba(31,35,40,.15); border-radius: 6px; color: #fff; cursor: pointer;
      background: #1f883d; box-shadow: 0 1px 0 rgba(31,35,40,.1); font: inherit;
      display: inline-flex; align-items: center; gap: 6px; transition: background .08s; -webkit-tap-highlight-color: transparent;
    }
    .gh:hover { background: #1a7f37; }
    .gh:active, .gh[aria-expanded="true"] { background: #197935; }
    .gh:focus-visible { outline: 2px solid #0969da; outline-offset: -2px; }
    .gh svg { width: 16px; height: 16px; fill: currentColor; }
    .gh .dd { transition: transform .15s; }
    .gh[aria-expanded="true"] .dd { transform: rotate(180deg); }
    .menu {
      position: absolute; top: calc(100% + 6px); left: 0; z-index: 5; width: 240px; max-width: 100%; padding: 8px 0;
      background: #fff; border: 1px solid #d0d7de; border-radius: 12px; box-shadow: 0 8px 24px rgba(140,149,159,.2);
      display: none; font-weight: 400; color: #1f2328;
    }
    .gh[aria-expanded="true"] + .menu { display: block; }
    .tabs { display: flex; gap: 4px; padding: 0 8px 8px; border-bottom: 1px solid #d8dee4; }
    .tabs button { font: 500 12px/1 inherit; padding: 6px 8px; border: 0; background: none; border-radius: 6px; color: #656d76; cursor: pointer; }
    .tabs button[aria-selected="true"] { color: #1f2328; box-shadow: inset 0 -2px 0 #fd8c73; border-radius: 0; }
    .tabs button:hover { background: #f3f4f6; }
    .item { display: flex; align-items: center; gap: 8px; padding: 6px 16px; font-size: 14px; cursor: pointer; }
    .item:hover { background: #f3f4f6; }
    .item svg { width: 16px; height: 16px; fill: #656d76; flex: none; }
    .url { margin: 8px 16px 0; height: 28px; border: 1px solid #d0d7de; border-radius: 6px; background: #f6f8fa; font: 12px ui-monospace, monospace; color: #1f2328; display: flex; align-items: center; padding: 0 8px; overflow: hidden; white-space: nowrap; }
  `,
  html: `
    <div class="wrap">
      <button class="gh" type="button" aria-expanded="false" aria-haspopup="menu">
        <svg viewBox="0 0 16 16"><path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/></svg>
        Code
        <svg class="dd" viewBox="0 0 16 16"><path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"/></svg>
      </button>
      <div class="menu" role="menu">
        <div class="tabs" role="tablist">
          <button type="button" role="tab" aria-selected="true">Local</button>
          <button type="button" role="tab" aria-selected="false">Codespaces</button>
        </div>
        <div class="url">https://github.com/octocat/Hello-World.git</div>
        <div class="item" role="menuitem" tabindex="0"><svg viewBox="0 0 16 16"><path d="M2.75 14A1.75 1.75 0 0 1 1 12.25v-2.5a.75.75 0 0 1 1.5 0v2.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 14Z"/><path d="M7.25 7.689V2a.75.75 0 0 1 1.5 0v5.689l1.97-1.969a.749.749 0 1 1 1.06 1.06l-3.25 3.25a.749.749 0 0 1-1.06 0L4.22 6.78a.749.749 0 1 1 1.06-1.06l1.97 1.969Z"/></svg>Download ZIP</div>
      </div>
    </div>`,
  init(root) {
    const btn = root.querySelector('.gh');
    const tabs = root.querySelectorAll('[role="tab"]');
    btn.addEventListener('click', () => btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') !== 'true'));
    tabs.forEach((t) => t.addEventListener('click', () => tabs.forEach((x) => x.setAttribute('aria-selected', x === t))));
    root.querySelector('.item').addEventListener('click', () => btn.setAttribute('aria-expanded', 'false'));
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape') btn.setAttribute('aria-expanded', 'false'); });
  },
};
