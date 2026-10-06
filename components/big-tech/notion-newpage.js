export default {
  id: 'bt-notion-newpage',
  credit: 'Notion — blue "New page" button beside its light-gray hover-block button',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { display: flex; gap: 6px; align-items: center; padding: 14px 16px; border-radius: 12px; background: #fff; border: 1px solid rgba(55,53,47,.09); }
    .nb {
      height: 28px; padding: 0 10px; border-radius: 6px; border: 0; cursor: pointer; white-space: nowrap;
      font: 500 14px/28px ui-sans-serif, -apple-system, "Segoe UI", system-ui, sans-serif;
      display: inline-flex; align-items: center; gap: 6px; transition: background 20ms ease-in; -webkit-tap-highlight-color: transparent;
    }
    .blue { background: #2383e2; color: #fff; }
    .blue:hover { background: #0077d4; }
    .blue:active { background: #0070c9; }
    .gray { background: transparent; color: rgba(55,53,47,.65); }
    .gray:hover { background: rgba(55,53,47,.08); }
    .gray:active, .gray[aria-pressed="true"] { background: rgba(55,53,47,.16); color: #37352f; }
    .nb:focus-visible { outline: none; box-shadow: 0 0 0 2px rgba(35,131,226,.57); }
    .nb svg { width: 16px; height: 16px; fill: currentColor; }
    .blue[aria-pressed="true"] { background: #e8f3ff; color: #2383e2; }
    .blue .lbl::after { content: 'New page'; }
    .blue[aria-pressed="true"] .lbl::after { content: 'Untitled'; }
  `,
  html: `
    <div class="stage">
      <button class="nb gray" type="button" aria-pressed="false"><svg viewBox="0 0 16 16"><path d="M4.5 2A1.5 1.5 0 0 0 3 3.5v9A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V6.207a1.5 1.5 0 0 0-.44-1.06l-2.706-2.708A1.5 1.5 0 0 0 8.793 2H4.5Zm.5 4.75c0-.414.336-.75.75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 5 6.75Zm0 3c0-.414.336-.75.75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 9.75Z"/></svg>Templates</button>
      <button class="nb blue" type="button" aria-pressed="false"><svg viewBox="0 0 16 16"><path d="M8 2.25a.75.75 0 0 1 .75.75v4.25H13a.75.75 0 0 1 0 1.5H8.75V13a.75.75 0 0 1-1.5 0V8.75H3a.75.75 0 0 1 0-1.5h4.25V3A.75.75 0 0 1 8 2.25Z"/></svg><span class="lbl"></span></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.nb').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
  },
};
