export default {
  id: 'lb-untitled-button',
  credit: 'Untitled UI — Primary (brand-600 violet) and Secondary gray buttons with leading icon, shadow-xs and the 4px brand-100 focus ring',
  size: 'auto',
  css: `
    :host { display: inline-block; }
    .row { display: inline-flex; align-items: center; gap: 12px; flex-wrap: wrap; font: 600 14px/20px Inter, -apple-system, system-ui, sans-serif; }
    .uu { height: 40px; padding: 0 16px; border-radius: 8px; border: 1px solid transparent; cursor: pointer; font: inherit; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; box-shadow: 0 1px 2px rgba(16,24,40,.05); transition: background .15s, border-color .15s, color .15s, box-shadow .15s; -webkit-tap-highlight-color: transparent; }
    .uu svg { width: 20px; height: 20px; stroke: currentColor; fill: none; stroke-width: 1.67; stroke-linecap: round; stroke-linejoin: round; }
    .pri { background: #7f56d9; border-color: #7f56d9; color: #fff; }
    .pri:hover { background: #6941c6; border-color: #6941c6; }
    .pri:focus-visible { outline: 0; box-shadow: 0 1px 2px rgba(16,24,40,.05), 0 0 0 4px #f4ebff; }
    .pri[aria-pressed="true"] { background: #53389e; border-color: #53389e; }
    .sec { background: #fff; border-color: #d0d5dd; color: #344054; }
    .sec:hover { background: #f9fafb; color: #182230; }
    .sec:focus-visible { outline: 0; box-shadow: 0 1px 2px rgba(16,24,40,.05), 0 0 0 4px #f2f4f7; }
    .sec[aria-pressed="true"] { background: #f2f4f7; border-color: #98a2b3; }
    .sc { background: #f9f5ff; border-color: #f9f5ff; color: #6941c6; box-shadow: none; }
    .sc:hover { background: #f4ebff; border-color: #f4ebff; }
    .sc:focus-visible { outline: 0; box-shadow: 0 0 0 4px #f4ebff; }
    .sc[aria-pressed="true"] { background: #e9d7fe; border-color: #e9d7fe; }
    .uu:active { transform: translateY(.5px); }
    .pri .l::after { content: 'Add user'; }
    .pri[aria-pressed="true"] .l::after { content: 'Added'; }
  `,
  html: `
    <div class="row">
      <button class="uu sec" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-6.2-8.6M22 4l-10 10-3-3"/></svg>Mark as done</button>
      <button class="uu sc" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>Grid</button>
      <button class="uu pri" type="button" aria-pressed="false"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M19 8v6M22 11h-6"/><circle cx="9" cy="7" r="4"/></svg><span class="l"></span></button>
    </div>`,
  init(root) {
    root.querySelectorAll('.uu').forEach((b) => b.addEventListener('click', () => b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true')));
  },
};
