export default {
  id: 'mb-linear-checkbox',
  credit: 'Linear — issue list rows with priority icons and the workflow status circle: click cycles Todo → In Progress (yellow pie) → Done (indigo check)',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .stage { width: 300px; max-width: 100%; padding: 8px; border-radius: 12px; background: #08090a; border: 1px solid #23252a; display: grid; grid-template-columns: minmax(0, 1fr); gap: 1px; }
    .row { display: flex; align-items: center; gap: 10px; height: 38px; padding: 0 10px; border-radius: 6px; cursor: pointer; user-select: none;
      font: 510 13px/1 Inter, -apple-system, system-ui, sans-serif; color: #f7f8f8; letter-spacing: -.01em; transition: background .15s cubic-bezier(.25,.46,.45,.94); }
    .row:hover { background: #141516; }
    .row:focus-visible { outline: none; background: #1c1c1f; box-shadow: inset 0 0 0 1px #5e6ad2; }
    .pri { width: 14px; height: 14px; flex: none; }
    .id { color: #8a8f98; font-weight: 400; width: 60px; flex: none; white-space: nowrap; font-variant-numeric: tabular-nums; }
    .st { width: 14px; height: 14px; flex: none; overflow: visible; }
    .st .ring { fill: none; stroke: #8a8f98; stroke-width: 1.5; transition: stroke .15s; }
    .st .pie { fill: none; stroke: #f2c94c; stroke-width: 4; stroke-dasharray: 0 100; transform: rotate(-90deg); transform-origin: 7px 7px; transition: stroke-dasharray .25s cubic-bezier(.25,.46,.45,.94); }
    .st .fill { fill: #5e6ad2; transform: scale(0); transform-origin: 7px 7px; transition: transform .2s cubic-bezier(.25,.46,.45,.94); }
    .st .ck { fill: none; stroke: #08090a; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 8; stroke-dashoffset: 8; transition: stroke-dashoffset .18s .08s ease-out; }
    .row[aria-checked="mixed"] .ring { stroke: #f2c94c; }
    .row[aria-checked="mixed"] .pie { stroke-dasharray: 6.28 100; }
    .row[aria-checked="true"] .ring { stroke: #5e6ad2; }
    .row[aria-checked="true"] .fill { transform: scale(1); }
    .row[aria-checked="true"] .ck { stroke-dashoffset: 0; }
    .row[aria-checked="true"] .st { animation: pop .3s cubic-bezier(.25,.46,.45,.94); }
    @keyframes pop { 50% { transform: scale(1.18); } }
    .t { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color .15s; }
    .row[aria-checked="true"] .t { color: #8a8f98; }
  `,
  html: `
    <div class="stage" role="group" aria-label="Issues">
      <div class="row" role="checkbox" aria-checked="false" tabindex="0">
        <svg class="pri" viewBox="0 0 16 16" aria-label="Urgent"><rect x="1" y="1" width="14" height="14" rx="3" fill="#fc7840"/><rect x="7.1" y="3.5" width="1.8" height="6" rx=".9" fill="#08090a"/><rect x="7.1" y="10.8" width="1.8" height="1.8" rx=".9" fill="#08090a"/></svg>
        <span class="id">ENG-142</span>
        <svg class="st" viewBox="0 0 14 14"><circle class="ring" cx="7" cy="7" r="6"/><circle class="pie" cx="7" cy="7" r="2"/><circle class="fill" cx="7" cy="7" r="6.75"/><path class="ck" d="M4.4 7.2 6.2 9 9.7 5.3"/></svg>
        <span class="t">Fix sync on reconnect</span>
      </div>
      <div class="row" role="checkbox" aria-checked="mixed" tabindex="0">
        <svg class="pri" viewBox="0 0 16 16" aria-label="High"><rect x="1.5" y="8" width="3" height="6" rx="1" fill="#8a8f98"/><rect x="6.5" y="5" width="3" height="9" rx="1" fill="#8a8f98"/><rect x="11.5" y="2" width="3" height="12" rx="1" fill="#8a8f98"/></svg>
        <span class="id">ENG-143</span>
        <svg class="st" viewBox="0 0 14 14"><circle class="ring" cx="7" cy="7" r="6"/><circle class="pie" cx="7" cy="7" r="2"/><circle class="fill" cx="7" cy="7" r="6.75"/><path class="ck" d="M4.4 7.2 6.2 9 9.7 5.3"/></svg>
        <span class="t">Command menu keyboard nav</span>
      </div>
      <div class="row" role="checkbox" aria-checked="true" tabindex="0">
        <svg class="pri" viewBox="0 0 16 16" aria-label="Medium"><rect x="1.5" y="8" width="3" height="6" rx="1" fill="#8a8f98"/><rect x="6.5" y="5" width="3" height="9" rx="1" fill="#8a8f98"/><rect x="11.5" y="2" width="3" height="12" rx="1" fill="#8a8f98" opacity=".35"/></svg>
        <span class="id">ENG-139</span>
        <svg class="st" viewBox="0 0 14 14"><circle class="ring" cx="7" cy="7" r="6"/><circle class="pie" cx="7" cy="7" r="2"/><circle class="fill" cx="7" cy="7" r="6.75"/><path class="ck" d="M4.4 7.2 6.2 9 9.7 5.3"/></svg>
        <span class="t">Dark theme contrast pass</span>
      </div>
    </div>`,
  init(root) {
    const next = { false: 'mixed', mixed: 'true', true: 'false' };
    root.querySelectorAll('.row').forEach((r) => {
      const flip = () => r.setAttribute('aria-checked', next[r.getAttribute('aria-checked')]);
      r.addEventListener('click', flip);
      r.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } });
    });
  },
};
