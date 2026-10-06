export default {
  id: 'lb-mantine-chips',
  credit: 'Mantine v7 — Chip.Group (outline / filled / light, multiple): pill chips whose border turns blue.6 and a check icon grows in when checked',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .grp { display: inline-flex; gap: 8px; flex-wrap: wrap; font: 500 14px/1 Inter, -apple-system, "Segoe UI", system-ui, sans-serif; }
    .ch { height: 32px; padding: 0 16px; display: inline-flex; align-items: center; border-radius: 32px; border: 1px solid #ced4da; background: #fff; color: #000; cursor: pointer; font: inherit; white-space: nowrap; transition: border-color .1s, background .1s, color .1s; -webkit-tap-highlight-color: transparent; user-select: none; }
    .ch:hover { background: #f8f9fa; }
    .ch:focus-visible { outline: 2px solid #228be6; outline-offset: 2px; }
    .ch svg { width: 0; height: 14px; stroke: #228be6; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; margin-right: 0; opacity: 0; transition: width .15s, margin .15s, opacity .1s; }
    .ch[aria-checked="true"] { border-color: #228be6; color: #228be6; }
    .ch[aria-checked="true"] svg { width: 14px; margin-right: 8px; opacity: 1; }
    .ch.filled[aria-checked="true"] { background: #228be6; color: #fff; border-color: #228be6; }
    .ch.filled[aria-checked="true"] svg { stroke: #fff; }
    .ch.light[aria-checked="true"] { background: #e7f5ff; border-color: transparent; }
  `,
  html: `
    <div class="grp" role="group" aria-label="Frameworks">
      <button class="ch" type="button" role="checkbox" aria-checked="true"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>React</button>
      <button class="ch" type="button" role="checkbox" aria-checked="false"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Angular</button>
      <button class="ch filled" type="button" role="checkbox" aria-checked="true"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Svelte</button>
      <button class="ch light" type="button" role="checkbox" aria-checked="false"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>Vue</button>
    </div>`,
  init(root) {
    root.querySelectorAll('.ch').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-checked', b.getAttribute('aria-checked') !== 'true')));
  },
};
