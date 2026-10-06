export default {
  id: 'lb-carbon-buttons',
  credit: 'IBM Carbon v11 — Primary / Secondary / Tertiary / Ghost buttons: 0 radius, 48px, label left with the 16px ArrowRight glyph pinned 16px from the right, 70ms productive motion',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: flex-start; flex-wrap: wrap; gap: 1px; font: 400 14px/18px "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", sans-serif; letter-spacing: .16px; }
    .cb { position: relative; min-height: 48px; max-width: 20rem; padding: 11px 63px 11px 15px; border: 1px solid transparent; border-radius: 0; cursor: pointer; font: inherit; letter-spacing: inherit; text-align: left; display: inline-flex; align-items: center; white-space: nowrap; transition: background 70ms cubic-bezier(0,0,.38,.9), box-shadow 70ms cubic-bezier(0,0,.38,.9), border-color 70ms cubic-bezier(0,0,.38,.9), outline 70ms cubic-bezier(0,0,.38,.9); -webkit-tap-highlight-color: transparent; }
    .cb svg { position: absolute; right: 16px; top: 50%; margin-top: -8px; width: 16px; height: 16px; fill: currentColor; flex: none; }
    .cb:focus-visible { outline: 0; border-color: #0f62fe; box-shadow: inset 0 0 0 1px #0f62fe, inset 0 0 0 2px #fff; }
    .pri { background: #0f62fe; color: #fff; }
    .pri:hover { background: #0050e6; }
    .pri:active { background: #002d9c; }
    .sec { background: #393939; color: #fff; }
    .sec:hover { background: #474747; }
    .sec:active { background: #6f6f6f; }
    .ter { background: transparent; color: #0f62fe; border-color: #0f62fe; }
    .ter:hover { background: #0050e6; color: #fff; border-color: #0050e6; }
    .ter:active { background: #002d9c; color: #fff; border-color: #002d9c; }
    .ter:focus-visible { background: #0f62fe; color: #fff; }
    .gho { background: transparent; color: #0f62fe; padding-right: 15px; }
    .gho svg { position: static; margin: 0 0 0 8px; }
    .gho:hover { background: #e8e8e8; color: #0043ce; }
    .gho:active { background: #c6c6c6; }
  `,
  html: `
    <div class="row">
      <button class="cb pri" type="button">Primary<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6z"/></svg></button>
      <button class="cb sec" type="button">Secondary<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6z"/></svg></button>
      <button class="cb ter" type="button">Tertiary<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6z"/></svg></button>
      <button class="cb gho" type="button">Ghost<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6z"/></svg></button>
    </div>`,
};
