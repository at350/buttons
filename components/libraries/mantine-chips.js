export default {
  id: 'lb-mantine-chips',
  credit: 'Mantine — Chip (size sm, 28px, radius xl) in outline / filled / light: checking swaps the 20px side padding for 10px plus a 20px CheckIcon slot, so the chip never changes width',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .grp { display: inline-flex; gap: 12px; flex-wrap: wrap; font: 400 14px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    .ch { display: inline-flex; align-items: center; height: 28px; padding-inline: 20px; border-radius: 1000rem; border: 1px solid transparent; cursor: pointer; font: inherit; color: #000; white-space: nowrap; user-select: none; -webkit-tap-highlight-color: transparent; }
    .ch:focus-visible { outline: 2px solid #228be6; outline-offset: 2px; }
    .iw { display: none; align-items: center; width: 20px; max-width: 20px; height: 12px; overflow: hidden; }
    .iw svg { width: 12px; height: 12px; display: block; fill: var(--ic, currentColor); }
    .ch[aria-checked="true"] { padding-inline: 10px; }
    .ch[aria-checked="true"] .iw { display: flex; }
    .out { background: #fff; border-color: #dee2e6; }
    .out:hover { background: #f8f9fa; }
    .out[aria-checked="true"] { border-color: #228be6; --ic: #228be6; }
    .out[aria-checked="true"]:hover { background: rgba(34,139,230,.05); }
    .fil, .lig { background: #f1f3f5; }
    .fil:hover, .lig:hover { background: #e9ecef; }
    .fil[aria-checked="true"] { background: #228be6; color: #fff; }
    .fil[aria-checked="true"]:hover { background: #1c7ed6; }
    .lig[aria-checked="true"] { background: #d0ebff; color: #1864ab; }
    .lig[aria-checked="true"]:hover { background: #a5d8ff; }
  `,
  html: `
    <div class="grp" role="group" aria-label="Chips">
      <button class="ch out" type="button" role="checkbox" aria-checked="true"><span class="iw"><svg viewBox="0 0 10 7"><path d="M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z" fill-rule="evenodd" clip-rule="evenodd"/></svg></span>Multiple chips</button>
      <button class="ch out" type="button" role="checkbox" aria-checked="false"><span class="iw"><svg viewBox="0 0 10 7"><path d="M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z" fill-rule="evenodd" clip-rule="evenodd"/></svg></span>Can be selected</button>
      <button class="ch fil" type="button" role="checkbox" aria-checked="true"><span class="iw"><svg viewBox="0 0 10 7"><path d="M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z" fill-rule="evenodd" clip-rule="evenodd"/></svg></span>At a time</button>
      <button class="ch lig" type="button" role="checkbox" aria-checked="false"><span class="iw"><svg viewBox="0 0 10 7"><path d="M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z" fill-rule="evenodd" clip-rule="evenodd"/></svg></span>Awesome chip</button>
    </div>`,
  init(root) {
    root.querySelectorAll('.ch').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true')));
  },
};
