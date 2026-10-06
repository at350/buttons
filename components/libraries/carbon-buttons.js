export default {
  id: 'lb-carbon-buttons',
  credit: 'IBM Carbon v11 — Primary / Secondary / Tertiary / Ghost buttons: square corners, 48px, label left + ArrowRight glyph pinned right',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: flex-start; gap: 1px; flex-wrap: wrap; font: 400 14px/1.29 "IBM Plex Sans", Inter, -apple-system, system-ui, sans-serif; letter-spacing: .16px; }
    .cb { position: relative; height: 48px; min-width: 128px; padding: 0 63px 0 15px; border: 1px solid transparent; border-radius: 0; cursor: pointer; font: inherit; letter-spacing: inherit; text-align: left; display: inline-flex; align-items: center; white-space: nowrap; transition: background 70ms cubic-bezier(0,0,.38,.9), border-color 70ms, color 70ms; -webkit-tap-highlight-color: transparent; }
    .cb svg { position: absolute; right: 15px; top: 50%; margin-top: -8px; width: 16px; height: 16px; fill: currentColor; }
    .cb:focus-visible { outline: 0; border-color: #0f62fe; box-shadow: inset 0 0 0 1px #fff; }
    .pri { background: #0f62fe; color: #fff; }
    .pri:hover { background: #0353e9; }
    .pri:active, .pri[aria-pressed="true"] { background: #002d9c; }
    .sec { background: #393939; color: #fff; }
    .sec:hover { background: #4c4c4c; }
    .sec:active, .sec[aria-pressed="true"] { background: #6f6f6f; }
    .ter { background: transparent; color: #0f62fe; border-color: #0f62fe; }
    .ter:hover { background: #0353e9; color: #fff; border-color: #0353e9; }
    .ter:active, .ter[aria-pressed="true"] { background: #002d9c; color: #fff; border-color: #002d9c; }
    .gho { background: transparent; color: #0f62fe; padding-right: 15px; min-width: 0; }
    .gho svg { position: static; margin: 0 0 0 8px; }
    .gho:hover { background: #e5e5e5; color: #0043ce; }
    .gho:active, .gho[aria-pressed="true"] { background: #c6c6c6; }
  `,
  html: `
    <div class="row">
      <button class="cb pri" type="button" aria-pressed="false">Primary<svg viewBox="0 0 16 16"><path d="M9 3l-.7.7L12.6 8H2v1h10.6l-4.3 4.3.7.7L14 9z"/></svg></button>
      <button class="cb sec" type="button" aria-pressed="false">Secondary<svg viewBox="0 0 16 16"><path d="M9 3l-.7.7L12.6 8H2v1h10.6l-4.3 4.3.7.7L14 9z"/></svg></button>
      <button class="cb ter" type="button" aria-pressed="false">Tertiary<svg viewBox="0 0 16 16"><path d="M9 3l-.7.7L12.6 8H2v1h10.6l-4.3 4.3.7.7L14 9z"/></svg></button>
      <button class="cb gho" type="button" aria-pressed="false">Ghost<svg viewBox="0 0 16 16"><path d="M9 3l-.7.7L12.6 8H2v1h10.6l-4.3 4.3.7.7L14 9z"/></svg></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.cb').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
  },
};
