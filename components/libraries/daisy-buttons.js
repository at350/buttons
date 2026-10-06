export default {
  id: 'lb-daisy-buttons',
  credit: 'daisyUI v5 — btn-primary / btn-secondary / btn-accent / btn-ghost in the default light theme (oklch palette, 0.25rem field radius, depth shadow)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap; font: 600 14px/1 Inter, -apple-system, "Segoe UI", system-ui, sans-serif; }
    .btn { --bg: #fff; --fg: #1d232a; --sh: rgba(0,0,0,.3); height: 40px; padding: 0 16px; border-radius: 0.25rem; border: 1px solid var(--bg); background: var(--bg); color: var(--fg); cursor: pointer; font: inherit; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; user-select: none; -webkit-tap-highlight-color: transparent;
      box-shadow: 0 .5px 0 .5px rgba(255,255,255,.1) inset, 0 3px 2px -2px color-mix(in oklab, var(--bg) 30%, transparent), 0 4px 3px -2px color-mix(in oklab, var(--bg) 30%, transparent);
      transition: background .2s, border-color .2s, box-shadow .2s, transform .2s; }
    .btn:hover, .btn[aria-pressed="true"] { background: color-mix(in oklab, var(--bg), #000 7%); border-color: color-mix(in oklab, var(--bg), #000 7%); }
    .btn:active { transform: translateY(.5px); box-shadow: 0 0 0 0 transparent inset, 0 0 0 0 transparent; background: color-mix(in oklab, var(--bg), #000 10%); }
    .btn:focus-visible { outline: 2px solid var(--bg); outline-offset: 2px; }
    .pri { --bg: #422ad5; --fg: #e0e4ff; }
    .sec { --bg: #f43098; --fg: #fdf2fa; }
    .acc { --bg: #00d3bb; --fg: #084d49; }
    .neu { --bg: #09090b; --fg: #e4e4e7; }
    .gho { --bg: transparent; --fg: #1d232a; box-shadow: none; border-color: transparent; }
    .gho:hover, .gho[aria-pressed="true"] { background: rgba(29,35,42,.2); border-color: transparent; }
    .gho:focus-visible { outline-color: #1d232a; }
    .gho:active { background: rgba(29,35,42,.3); }
  `,
  html: `
    <div class="row">
      <button class="btn pri" type="button" aria-pressed="false">Primary</button>
      <button class="btn sec" type="button" aria-pressed="false">Secondary</button>
      <button class="btn acc" type="button" aria-pressed="false">Accent</button>
      <button class="btn neu" type="button" aria-pressed="false">Neutral</button>
      <button class="btn gho" type="button" aria-pressed="false">Ghost</button>
    </div>`,
  init(root) {
    root.querySelectorAll('.btn').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
  },
};
